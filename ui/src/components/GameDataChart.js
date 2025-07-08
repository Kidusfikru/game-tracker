import React from "react";
import { Typography, Box } from "@mui/material";
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
  ScatterController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

function GameDataChart({ data, gameName }) {
  // Detect screen size for responsive chart options
  const isMobile = window.innerWidth < 768; // MUI md breakpoint
  
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
    maintainAspectRatio: false, // Allow custom height control
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "top",
        labels: {
          color: "#00aff4",
          font: { size: isMobile ? 12 : 16, weight: "bold" },
          boxWidth: isMobile ? 16 : 24,
          padding: isMobile ? 12 : 20,
        },
      },
      title: {
        display: true,
        text: `Steam Followers & Reddit Mentions for ${gameName}`,
        color: "#fff",
        font: { size: isMobile ? 16 : 22, weight: "bold" },
        padding: { top: isMobile ? 8 : 10, bottom: isMobile ? 12 : 20 },
      },
      tooltip: {
        backgroundColor: "#232837",
        titleColor: "#00aff4",
        bodyColor: "#fff",
        borderColor: "#00aff4",
        borderWidth: 1,
        padding: isMobile ? 8 : 12,
        caretSize: isMobile ? 6 : 8,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#b0b8c1",
          font: { size: isMobile ? 10 : 13 },
          maxTicksLimit: isMobile ? 5 : undefined, // Limit ticks on mobile
        },
        grid: {
          color: "#232837",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { 
          display: !isMobile, // Hide axis titles on mobile to save space
          text: "Steam Followers", 
          color: "#00aff4",
          font: { size: isMobile ? 10 : 12 }
        },
        ticks: { 
          color: "#00aff4", 
          font: { size: isMobile ? 9 : 13 },
          maxTicksLimit: isMobile ? 5 : undefined,
        },
        grid: { color: "#232837" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { 
          display: !isMobile, // Hide axis titles on mobile to save space
          text: "Reddit Mentions", 
          color: "#d32f2f",
          font: { size: isMobile ? 10 : 12 }
        },
        ticks: { 
          color: "#d32f2f", 
          font: { size: isMobile ? 9 : 13 },
          maxTicksLimit: isMobile ? 5 : undefined,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 300, sm: 400, md: 450 }, // Responsive height
        padding: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        overflow: 'hidden', // Prevent overflow on small screens
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        sx={{ 
          color: "#00aff4", 
          textShadow: "0 2px 8px #000",
          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }, // Responsive font size
          textAlign: { xs: 'center', md: 'left' }, // Center on mobile
          marginBottom: { xs: 1, md: 2 },
        }}
      >
        {gameName} Analytics
      </Typography>
      <Box
        sx={{
          height: 'calc(100% - 40px)', // Account for typography height
          minHeight: { xs: 250, sm: 320, md: 380 }, // Ensure minimum height
        }}
      >
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
}

export default GameDataChart;
