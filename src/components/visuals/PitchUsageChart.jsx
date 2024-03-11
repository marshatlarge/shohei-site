import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PitchUsageChart = ({ data }) => {
  const pitchCounts = data.reduce((acc, { pitchType }) => {
    acc[pitchType] = (acc[pitchType] || 0) + 1;
    return acc;
  }, {});

  const totalPitches = Object.values(pitchCounts).reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const backgroundColors = [
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

  const chartData = {
    labels: Object.keys(pitchCounts),
    datasets: [
      {
        label: "Pitch Usage",
        data: Object.values(pitchCounts),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          pointStyle: "rect",
          usePointStyle: true,
          padding: 10,
          font: {
            size: 10,
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => {
              const value = datasets[0].data[i];
              const percentage = ((value / totalPitches) * 100).toFixed(2);
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: datasets[0].backgroundColor[i],
              };
            });
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PitchUsageChart;
