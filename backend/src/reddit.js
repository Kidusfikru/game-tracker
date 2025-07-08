const snoowrap = require("snoowrap");
const {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD,
} = require("./config");

const reddit = new snoowrap({
  userAgent: "game_tracker/1.0",
  clientId: REDDIT_CLIENT_ID,
  clientSecret: REDDIT_CLIENT_SECRET,
  username: REDDIT_USERNAME,
  password: REDDIT_PASSWORD,
});

const fetch = require("node-fetch");

async function getRedditMentions(gameName, days = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days + 1);
  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  // Try Pushshift API first
  try {
    const url = `https://api.pushshift.io/reddit/search/submission/?q=${encodeURIComponent(
      gameName
    )}&after=${startTimestamp}&before=${endTimestamp}&size=1000&fields=created_utc,title`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Pushshift API error");
    const data = await resp.json();
    const mentionsByDate = {};
    for (const post of data.data) {
      const postDate = new Date(post.created_utc * 1000)
        .toISOString()
        .split("T")[0];
      mentionsByDate[postDate] = (mentionsByDate[postDate] || 0) + 1;
    }
    return { mentionsByDate, pushshiftDown: false };
  } catch (e) {
    // fallback to snoowrap if Pushshift fails
    console.warn("Pushshift failed, falling back to Reddit API:", e.message);
    let allPosts = [];
    let after = null;
    let results = [];
    let keepGoing = true;
    while (keepGoing) {
      results = await reddit.search({
        query: gameName,
        sort: "new",
        time: "all",
        limit: 50,
        after: after,
      });
      if (!results || results.length === 0) break;
      allPosts = allPosts.concat(results);
      after = results.length > 0 ? results[results.length - 1].name : null;
      const oldest = results[results.length - 1];
      if (
        !after ||
        (oldest && oldest.created_utc * 1000 < startDate.getTime())
      ) {
        keepGoing = false;
      }
      if (allPosts.length > 1000) keepGoing = false;
    }
    const mentionsByDate = {};
    for (const post of allPosts) {
      const postDate = new Date(post.created_utc * 1000)
        .toISOString()
        .split("T")[0];
      if (post.created_utc >= startTimestamp) {
        mentionsByDate[postDate] = (mentionsByDate[postDate] || 0) + 1;
      }
    }
    // Indicate Pushshift is down so the frontend can show a message
    return { mentionsByDate, pushshiftDown: true };
  }
}

module.exports = { getRedditMentions };
