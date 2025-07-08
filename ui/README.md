# Game Tracker UI

A modern, clean React UI for visualizing Steam followers and Reddit mentions for any game.

## How to Run

1. In the `ui/` directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How Data Works

- The UI fetches live, aligned data from the backend API (`/api/game-data`).
- You can change the tracked game at any time using the input box at the top.
- If the backend cannot fetch full Reddit history (Pushshift API is down), a subtle info banner will appear above the chart and table.

## Features

- Responsive, clean Material-UI design
- Table and chart visualization (Chart.js)
- Dark, game-themed look
- Change game dynamically from the UI
- Subtle info banner if only partial Reddit data is available
- Easy to extend for more analytics or data sources

## Troubleshooting

- If you see no Reddit data or a warning banner, the Pushshift API may be down (see backend README for details).
- Make sure the backend is running on port 5000 and accessible from the frontend.
