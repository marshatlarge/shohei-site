import React from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";

const ReleasePointChart = ({ data }) => {
  // Function to round a number to 2 decimal places
  const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#a4de6c",
    "#d0ed57",
    "#ffc0cb",
    "#8e44ad",
    "#3498db",
    "#2ecc71",
  ];

  // Get unique pitch types
  const pitchTypes = [...new Set(data.map((item) => item.pitchType))];

  // Assign color and prepare datasets for each pitch type
  const datasets = pitchTypes.map((pitchType, index) => ({
    label: pitchType,
    data: data
      .filter((item) => item.pitchType === pitchType)
      .map((item) => ({
        x: roundToTwoDecimals(item.releaseSide),
        y: roundToTwoDecimals(item.releaseHeight),
      })),
    backgroundColor: colors[index % colors.length],
    pointRadius: 5,
  }));

  const chartData = {
    datasets,
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: -7,
        max: 7,
        title: {
          display: true,
          text: "Release Side (in)",
        },
      },
      y: {
        min: 4,
        max: 8,
        title: {
          display: true,
          text: "Release Height (in)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: data.length <= 150,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: (${context.parsed.x}, ${context.parsed.y})`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Scatter data={chartData} options={options} />;
};

export default ReleasePointChart;
