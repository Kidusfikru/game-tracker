# Game Tracker — Launch Guide

## How to Run the Project

### 1. Backend (API Server)

- Open a terminal in the `backend` folder:
  ```bash
  cd backend
  npm install
  npm start
  ```
- The backend server will run on [http://localhost:5000](http://localhost:5000)

### 2. Frontend (React UI)

- Open a new terminal in the `ui` folder:
  ```bash
  cd ui
  npm install
  npm start
  ```
- The frontend will run on [http://localhost:3000](http://localhost:3000) and proxy API requests to the backend.

---

## How to Change Parameters

### Change Game Name or AppID (Backend)

- By default, the backend tracks "Hollow Knight" (AppID: 367520).
- You can change the default game by editing `backend/src/config.js`:
  ```js
  module.exports = {
    APP_ID: "367520", // Change to your desired Steam AppID
    GAME_NAME: "Hollow Knight", // Change to your desired game name
    // ...other config
  };
  ```
- Or, you can pass parameters when starting the backend:
  ```bash
  node src/server.js <AppID> <GameName>
  # Example:
  node src/server.js 620 "Portal 2"
  ```
- The frontend UI also allows you to change the game name dynamically (top input box).

---

## Additional Notes & Technical Details

- **Steam Followers Data:**

  - By default, the backend uses a static CSV file (`backend/src/followers.csv`) for Steam followers data. This ensures reliability and avoids issues with SteamDB's anti-bot protection.
  - Advanced users can enable live scraping from SteamDB using Puppeteer (see commented code in `backend/src/steamdb.js`). This requires Chrome, manual login, and may not work for all reviewers.

- **Reddit Mentions Data:**

  - The backend first tries to fetch Reddit mentions using the Pushshift API for full 30-day coverage. However, Pushshift is often down or unreliable.
  - If Pushshift fails, the backend falls back to the official Reddit API (via `snoowrap`). This only provides recent Reddit mentions (typically 3-7 days).
  - The frontend will show a subtle info message if only partial Reddit data is available due to Pushshift being down.

- **Reddit API Credentials:**

  - For full Reddit API support, set up your credentials in a `.env` file in the `backend` folder:
    ```env
    REDDIT_CLIENT_ID=your_id
    REDDIT_CLIENT_SECRET=your_secret
    REDDIT_USERNAME=your_username
    REDDIT_PASSWORD=your_password
    ```

- **Frontend Features:**

  - The React UI is built with Material-UI and Chart.js, and features a modern, dark, game-themed look.
  - You can change the tracked game from the UI at any time.
  - If only partial Reddit data is available, a subtle info banner will appear above the chart and table.

- **Project Structure:**
  - All backend code is in `backend/`, all frontend code is in `ui/`.
  - See each folder's README for more details.

---

For more details, see comments in the code or reach out to me via email or telegram
saintfikru@gmail.com
