const fs = require("fs");
const path = require("path");

// By default, use static CSV for reliability
async function getSteamDBFollowers(url) {
  try {
    const csvPath = path.join(__dirname, "followers.csv");
    const csv = fs.readFileSync(csvPath, "utf-8");
    const lines = csv.trim().split("\n");
    const data = lines.slice(1).map((line) => {
      const [date, followers] = line.split(",");
      return { date, followers: parseInt(followers, 10) };
    });
    return data;
  } catch (error) {
    console.error("Error reading followers.csv:", error);
    return [];
  }
}

/*
// ADVANCED: Enable this function if you want to scrape live data from SteamDB (requires Chrome, manual login, and may not work for all reviewers)
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fsExtra = require("fs-extra");
puppeteer.use(StealthPlugin());
const COOKIES_PATH = path.join(__dirname, "steamdb_cookies.json");
async function saveCookies(page) {
  const cookies = await page.cookies();
  await fsExtra.writeJson(COOKIES_PATH, cookies, { spaces: 2 });
  console.log("Cookies saved to", COOKIES_PATH);
}
async function loadCookies(page) {
  if (await fsExtra.pathExists(COOKIES_PATH)) {
    const cookies = await fsExtra.readJson(COOKIES_PATH);
    await page.setCookie(...cookies);
    console.log("Cookies loaded from", COOKIES_PATH);
  }
}
async function getSteamDBFollowers(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  await loadCookies(page);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  if (page.url().includes("login") || page.url().includes("just-a-moment")) {
    console.log("Please log in or solve CAPTCHA in the browser, then press Enter here...");
    process.stdin.resume();
    await new Promise((resolve) => process.stdin.once("data", resolve));
    await saveCookies(page);
  }
  await page.waitForSelector("#followershistory", { timeout: 30000 });
  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll("#followershistory tbody tr");
    return Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      const date = cells[0]?.textContent.trim() || "Unknown";
      const followers = parseInt(cells[1]?.textContent.replace(/,/g, "") || "0", 10);
      return { date, followers };
    });
  });
  await browser.close();
  return data;
}
*/

module.exports = { getSteamDBFollowers };
