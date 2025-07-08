function alignData(followersData, mentionsData, days = 30) {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);

  const dateRange = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dateRange.push(new Date(d).toISOString().split("T")[0]);
  }

  return dateRange.map((date) => {
    const followerEntry = followersData.find((entry) => entry.date === date);
    const followers = followerEntry ? followerEntry.followers : null;
    const mentions = mentionsData[date] || 0;
    return { date, followers, mentions };
  });
}

module.exports = { alignData };
