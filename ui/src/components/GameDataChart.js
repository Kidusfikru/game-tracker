import React from "react";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GameDataChart({ data, gameName }) {
  const chartData = {
    labels: data.map((row) => row.date),
    datasets: [
      {
        label: "Steam Followers",
        data: data.map((row) => row.followers),
        borderColor: "#00aff4",
        backgroundColor: "rgba(0,175,244,0.15)",
        yAxisID: "y",
        spanGaps: true,
        tension: 0.4,
        pointBackgroundColor: "#232837",
        pointBorderColor: "#00aff4",
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: true,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowBlur: 8,
        shadowColor: "#00aff4a0",
      },
      {
        label: "Reddit Mentions",
        data: data.map((row) => row.mentions),
        type: "scatter",
        borderColor: "#d32f2f",
        backgroundColor: "#d32f2f",
        yAxisID: "y1",
        showLine: false,
        pointRadius: 7,
        pointHoverRadius: 11,
        pointBackgroundColor: "#d32f2f",
        pointBorderColor: "#fff",
        pointStyle: "rectRounded",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#00aff4",
          font: { size: 16, weight: "bold" },
          boxWidth: 24,
        },
      },
      title: {
        display: true,
        text: `Steam Followers & Reddit Mentions for ${gameName}`,
        color: "#fff",
        font: { size: 22, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#232837",
        titleColor: "#00aff4",
        bodyColor: "#fff",
        borderColor: "#00aff4",
        borderWidth: 1,
        padding: 12,
        caretSize: 8,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#b0b8c1",
          font: { size: 13 },
        },
        grid: {
          color: "#232837",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Steam Followers", color: "#00aff4" },
        ticks: { color: "#00aff4", font: { size: 13 } },
        grid: { color: "#232837" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Reddit Mentions", color: "#d32f2f" },
        ticks: { color: "#d32f2f", font: { size: 13 } },
      },
    },
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        sx={{ color: "#00aff4", textShadow: "0 2px 8px #000" }}
      >
        {gameName} Analytics
      </Typography>
      <Line data={chartData} options={options} />
    </>
  );
}

export default GameDataChart;
