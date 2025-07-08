import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import DataSection from "./components/DataSection";
import GameDataTable from "./components/GameDataTable";
import GameDataChart from "./components/GameDataChart";
import { TextField, Button, Stack, Alert } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameName, setGameName] = useState("Hollow Knight");
  const [inputGame, setInputGame] = useState("");
  const [pushshiftDown, setPushshiftDown] = useState(false);

  const fetchData = (name = gameName) => {
    setLoading(true);
    setError(null);
    // fetch(
    //   `http://localhost:5000/api/game-data?gameName=${encodeURIComponent(name)}`
    // )
    fetch(
      `${
        process.env.REACT_APP_API_URL ||
        "https://game-tracker-s83b.onrender.com"
      }/api/game-data?gameName=${encodeURIComponent(name)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        const game = res.headers.get("x-game-name") || name;
        setGameName(game);
        return res.json();
      })
      .then((json) => {
        // If backend returns { data, reddit }, use that structure
        if (json && Array.isArray(json.data)) {
          setData(json.data);
          setPushshiftDown(!!(json.reddit && json.reddit.pushshiftDown));
        } else if (json && json.reddit && json.reddit.mentionsByDate) {
          setPushshiftDown(!!json.reddit.pushshiftDown);
          const arr = Object.entries(json.reddit.mentionsByDate).map(
            ([date, mentions]) => ({ date, mentions })
          );
          setData(arr);
        } else if (json && json.mentionsByDate) {
          setPushshiftDown(!!json.pushshiftDown);
          const arr = Object.entries(json.mentionsByDate).map(
            ([date, mentions]) => ({ date, mentions })
          );
          setData(arr);
        } else {
          setPushshiftDown(false);
          setData(json);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputGame.trim()) {
      fetchData(inputGame.trim());
      setInputGame("");
    }
  };

  const topContent = (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="Game Name"
          variant="outlined"
          size="small"
          value={inputGame}
          onChange={(e) => setInputGame(e.target.value)}
          sx={{ minWidth: 200, bgcolor: "background.paper" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700 }}
        >
          Change Game
        </Button>
      </Stack>
    </form>
  );

  return (
    <Layout
      title={
        <span>
          Game Tracker Analytics{" "}
          <span style={{ color: "#00aff4", fontWeight: 700 }}>{gameName}</span>
        </span>
      }
      topContent={topContent}
    >
      {pushshiftDown && !loading && !error && (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            background: "#232837",
            color: "#fff",
            border: "1px solid #00aff4",
          }}
        >
          Reddit historical data is limited right now because the Pushshift API
          is temporarily unavailable. Only the most recent Reddit mentions are
          shown.
        </Alert>
      )}
      <DataSection loading={loading} error={error}>
        <GameDataChart data={data} gameName={gameName} />
      </DataSection>
      <DataSection loading={loading} error={error}>
        <GameDataTable data={data} />
      </DataSection>
    </Layout>
  );
}

export default App;
