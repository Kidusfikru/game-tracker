const express = require("express");
const cors = require("cors");
const { getSteamDBFollowers } = require("./steamdb");
const { getRedditMentions } = require("./reddit");
const { alignData } = require("./dataProcessor");
const { APP_ID, GAME_NAME, STEAMDB_URL } = require("./config");

const app = express();
app.use(cors());

app.get("/api/game-data", async (req, res) => {
  try {
    // Support ?gameName= and ?appId= query params
    const gameName = req.query.gameName || GAME_NAME;
    const appId = req.query.appId || APP_ID;
    const steamdbUrl = `https://steamdb.info/app/${appId}/charts/`;

    const followersData = await getSteamDBFollowers(steamdbUrl);
    const redditResult = await getRedditMentions(gameName);
    const mentionsData = redditResult.mentionsByDate || {};
    const alignedData = alignData(followersData, mentionsData);
    // Pass pushshiftDown to frontend for info banner
    res.setHeader("x-game-name", gameName);
    res.json({
      data: alignedData,
      reddit: { pushshiftDown: redditResult.pushshiftDown },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
