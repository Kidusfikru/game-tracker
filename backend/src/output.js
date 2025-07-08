const { createObjectCsvWriter } = require("csv-writer");

function outputData(data) {
  console.table(data);

  const csvWriter = createObjectCsvWriter({
    path: "game_data.csv",
    header: [
      { id: "date", title: "Date" },
      { id: "followers", title: "Steam Followers" },
      { id: "mentions", title: "Reddit Mentions" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log("CSV file written successfully"));
}

module.exports = { outputData };
