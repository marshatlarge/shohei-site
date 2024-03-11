import React from "react";

const PerformanceTable = ({ data }) => {
  const aggregatedData = data.reduce(
    (acc, pitch) => {
      // Destructuring assignment for pitch properties
      const {
        inPlayHit,
        inPlayTB,
        balls,
        exitVelocity,
        isSwing,
        isMiss,
        isFoul,
        isInPlay,
        isBall,
        isCalledStrike,
        isSwingingStrike,
        isBuntAttempt,
      } = pitch;

      // Aggregation logic
      acc.TotalPitches += 1;
      if (inPlayHit) {
        acc.Hits += 1;
        if (exitVelocity >= 95) acc.HardHits += 1;
      }
      if (isBall) acc.Balls += 1;
      if (isCalledStrike) acc.CalledStrikes += 1;
      if (isSwingingStrike) acc.SwingingStrikes += 1;
      if (isSwing && isMiss) acc.SwingAndMiss += 1;
      if (isFoul) acc.Fouls += 1;
      if (isInPlay) acc.InPlay += 1;
      if (isBuntAttempt) acc.BuntAttempts += 1;

      // Handling different types of hits
      switch (inPlayTB) {
        case 1:
          acc.Singles += 1;
          break;
        case 2:
          acc.Doubles += 1;
          break;
        case 3:
          acc.Triples += 1;
          break;
        case 4:
          acc.HomeRuns += 1;
          break;
        default:
          break;
      }

      return acc;
    },
    {
      TotalPitches: 0,
      Hits: 0,
      HardHits: 0,
      Singles: 0,
      Doubles: 0,
      Triples: 0,
      HomeRuns: 0,
      Balls: 0,
      CalledStrikes: 0,
      SwingingStrikes: 0,
      SwingAndMiss: 0,
      Fouls: 0,
      InPlay: 0,
      BuntAttempts: 0,
    }
  );

  //Calculate more metrics
  aggregatedData.SwingAndMissRate = (
    (aggregatedData.SwingAndMiss / aggregatedData.TotalPitches) *
    100
  ).toFixed(2);
  if (aggregatedData.Hits > 0) {
    aggregatedData.HardHitPercentage = (
      (aggregatedData.HardHits / aggregatedData.Hits) *
      100
    ).toFixed(2);
  } else {
    aggregatedData.HardHitPercentage = 0;
  }
  // Same calculations for additional metrics as before...

  return (
    <div className="overflow-x-auto shadow-sm shadow-gray-300">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Metric
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        {data.length > 0 && (
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(aggregatedData)
              .filter(([key, value]) => value !== null && value !== "")
              .map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {isNaN(value)
                      ? value
                      : key.endsWith("Rate") || key.endsWith("Percentage")
                      ? value + "%"
                      : value}
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default PerformanceTable;
