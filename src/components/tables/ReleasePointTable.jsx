import React, { useEffect, useState } from "react";

// Reuse the calculateMetrics function without changes
const calculateMetrics = (values) => {
  const filteredValues = values.filter(
    (value) => value !== 0 && value !== null
  );
  const sum = filteredValues.reduce((acc, cur) => acc + cur, 0);
  const avg = sum / filteredValues.length || 0;
  const peak = Math.max(...filteredValues);
  const min = Math.min(...filteredValues);
  return { avg, peak, min };
};

// Specify units for each of your metrics (update this according to your actual units)
const units = {
  releaseHeight: "ft",
  releaseSide: "ft",
  extension: "ft",
  vertRelAngle: "deg",
  horzRelAngle: "deg",
};

export default function ReleasePointTable({ data }) {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const dataByPitchType = data.reduce((acc, pitch) => {
      const {
        pitchType,
        releaseHeight,
        releaseSide,
        extension,
        vertRelAngle,
        horzRelAngle,
      } = pitch;
      if (pitchType && pitchType !== "Unknown" && !acc[pitchType]) {
        acc[pitchType] = {
          releaseHeight: [],
          releaseSide: [],
          extension: [],
          vertRelAngle: [],
          horzRelAngle: [],
        };
      }
      if (pitchType && pitchType !== "Unknown") {
        acc[pitchType].releaseHeight.push(releaseHeight);
        acc[pitchType].releaseSide.push(releaseSide);
        acc[pitchType].extension.push(extension);
        acc[pitchType].vertRelAngle.push(vertRelAngle);
        acc[pitchType].horzRelAngle.push(horzRelAngle);
      }
      return acc;
    }, {});

    const metricsByPitchType = Object.entries(dataByPitchType).map(
      ([pitchType, metrics]) => {
        const calculatedMetrics = {};
        Object.keys(metrics).forEach((metric) => {
          calculatedMetrics[metric] = calculateMetrics(metrics[metric]);
        });
        return { pitchType, ...calculatedMetrics };
      }
    );

    setAggregatedData(metricsByPitchType);
  }, [data]);

  return (
    <>
      <div className="overflow-x-auto shadow-sm shadow-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pitch Type
              </th>
              {Object.keys(units).map((metric) => (
                <React.Fragment key={metric}>
                  <th
                    colSpan="3"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)} [
                    {units[metric]}]
                  </th>
                </React.Fragment>
              ))}
            </tr>
            <tr>
              {[
                "",
                ...Object.keys(units).flatMap((metric) =>
                  ["Avg", "Peak", "Min"].map((label) => `${metric} (${label})`)
                ),
              ].map((label, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aggregatedData.map((pitch, index) => (
              <tr key={index}>
                <td>{pitch.pitchType}</td>
                {Object.keys(units).flatMap((metric) => [
                  <td key={`${metric}-avg`}>{pitch[metric].avg.toFixed(2)}</td>,
                  <td key={`${metric}-peak`}>
                    {pitch[metric].peak.toFixed(2)}
                  </td>,
                  <td key={`${metric}-min`}>{pitch[metric].min.toFixed(2)}</td>,
                ])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
