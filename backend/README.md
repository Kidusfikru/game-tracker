# Game Tracker Backend

This folder contains the Node.js/Express API server and all backend logic for the Game Tracker project.

## How to Run

1. Open a terminal in the `backend` directory:
   ```bash
   npm install
   npm start
   ```
2. The backend server will run on [http://localhost:5000](http://localhost:5000)

## How to Change Parameters

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

## Technical Details & Notes

- **Steam Followers Data:**

  - By default, uses a static CSV file (`backend/src/followers.csv`) for reliability and to avoid SteamDB anti-bot protection.
  - Advanced users can enable live scraping from SteamDB using Puppeteer (see commented code in `backend/src/steamdb.js`).

- **Reddit Mentions Data:**

  - Tries Pushshift API first for full 30-day coverage. If Pushshift is down, falls back to the official Reddit API (recent days only).
  - The frontend will show a subtle info message if only partial Reddit data is available.

- **Reddit API Credentials:**

  - For full Reddit API support, set up your credentials in a `.env` file in the `backend` folder:
    ```env
    REDDIT_CLIENT_ID=your_id
    REDDIT_CLIENT_SECRET=your_secret
    REDDIT_USERNAME=your_username
    REDDIT_PASSWORD=your_password
    ```

- **Project Structure:**
  - All backend code is in `backend/`, all frontend code is in `ui/`.
