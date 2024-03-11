import React from "react";
import { Scatter } from "react-chartjs-2";
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
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const ZoneChart = ({ data }) => {
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

  const pitchTypes = [...new Set(data.map((item) => item.pitchType))];

  const datasets = pitchTypes.map((pitchType, index) => ({
    label: pitchType,
    data: data
      .filter((item) => item.pitchType === pitchType)
      .map((item) => ({
        x: item.plateX,
        y: item.plateZ,
      })),
    backgroundColor: colors[index % colors.length],
    pointRadius: 5,
    borderDash: [5, 5], // Dashes for datasets
  }));

  const chartData = {
    datasets,
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Plate X Location (ft)",
        },
        min: -2,
        max: 2,
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Plate Z Location (ft)",
        },
        min: 0,
        max: 6,
      },
    },
    plugins: {
      tooltip: {
        enabled: data.length <= 150,
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 8, // Smaller text for legend labels
          },
          padding: 10, // Adds padding between legend items
          usePointStyle: true, // Uses point style for legend items (optional for smaller legend appearance)
          boxWidth: 5, // Smaller box width for legend color boxes
        },
      },

      annotation: {
        annotations: {
          strikeZone: {
            type: "box",
            xMin: -0.708,
            xMax: 0.708,
            yMin: 1.5,
            yMax: 3.5,
            backgroundColor: "rgba(255, 99, 132, 0.25)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              content: "Strike Zone",
              enabled: true,
              position: "center",
            },
          },
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return <Scatter data={chartData} options={options} />;
};

export default ZoneChart;
