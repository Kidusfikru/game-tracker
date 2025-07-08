const { getSteamDBFollowers } = require("./steamdb");
const { getRedditMentions } = require("./reddit");
const { alignData } = require("./dataProcessor");
const { outputData } = require("./output");
const { APP_ID, GAME_NAME, STEAMDB_URL } = require("./config");

async function main() {
  try {
    console.log(`Tracking ${GAME_NAME} (AppID: ${APP_ID})...`);
    const followersData = await getSteamDBFollowers(STEAMDB_URL);
    const mentionsData = await getRedditMentions(GAME_NAME);
    const alignedData = alignData(followersData, mentionsData);
    outputData(alignedData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
