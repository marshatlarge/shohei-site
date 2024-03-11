import React from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(...registerables, annotationPlugin);

const SprayChart = ({ data }) => {
  // Process data to identify hits and outs
  const processedData = data
    .filter(({ isInPlay }) => isInPlay)
    .map((item) => ({
      x: item.landingLocationX,
      y: item.landingLocationY,
      inPlayTB: item.inPlayTB,
      isOut: item.inPlayTB === 0,
    }));

  const datasets = [
    {
      label: "All Events",
      data: processedData,
      backgroundColor: processedData.map(
        (item) => (item.isOut ? "#000000" : getHitTypeColor(item.inPlayTB)) // Color for outs
      ),
      pointRadius: 5,
    },
  ];

  const chartData = {
    datasets,
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        title: {
          display: false,
          text: "",
        },

        min: 0,
        max: 500,
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        type: "linear",
        title: {
          display: false,
          text: "",
        },

        min: 0,
        max: 500,
        grid: {
          display: false, // Remove grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Enable legend
        position: "bottom",
        labels: {
          generateLabels: (chart) =>
            [
              { text: "Single", color: getHitTypeColor(1) },
              { text: "Double", color: getHitTypeColor(2) },
              { text: "Triple", color: getHitTypeColor(3) },
              { text: "Home Run", color: getHitTypeColor(4) },
              { text: "Out", color: "black" },
            ].map((label) => ({
              ...label,
              fillStyle: label.color,
              strokeStyle: label.color,
              lineWidth: 2,
              hidden: false,
              dataIndex: 0,
            })),
        },
        onClick: (e, legendItem, legend) => {},
      },
      tooltip: {
        enabled: false,
      },
      annotation: {
        annotations: {
          xLine: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "red",
            borderWidth: 2,
          },
          yLine: {
            type: "line",
            xMin: 0,
            xMax: 0,
            borderColor: "red",
            borderWidth: 2,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Scatter data={chartData} options={options} />;
};

function getHitTypeColor(inPlayTB) {
  const colorMap = {
    1: "#82ca9d", // Single
    2: "#8884d8", // Double
    3: "#ffc658", // Triple
    4: "#ff8042", // Home Run
  };
  return colorMap[inPlayTB] || "#cccccc"; // Use a default color for undefined hit types
}

export default SprayChart;
