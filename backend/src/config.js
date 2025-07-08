require("dotenv").config();

module.exports = {
  APP_ID: process.argv[2] || "367520", // game ; Hollow Knight
  GAME_NAME: process.argv[3] || "Hollow Knight",
  STEAMDB_URL: `https://steamdb.info/app/${
    process.argv[2] || "367520"
  }/charts/`,
  REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME: process.env.REDDIT_USERNAME,
  REDDIT_PASSWORD: process.env.REDDIT_PASSWORD,
};
