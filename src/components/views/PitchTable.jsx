import { useEffect, useState } from "react";

export default function PitchTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pitchesPerPage, setPitchesPerPage] = useState(25);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, pitchesPerPage]);

  // Define a helper function to safely apply .toFixed()
  const safeFixed = (value, digits = 2) => {
    return value !== null && value !== undefined ? value.toFixed(digits) : "";
  };

  const lastPitchIndex = currentPage * pitchesPerPage;
  const firstPitchIndex = lastPitchIndex - pitchesPerPage;
  const currentPitches = data.slice(firstPitchIndex, lastPitchIndex);

  return (
    <>
      <div className="flex px-5 py-2 gap-2 items-center justify-start">
        <label className="text-sm">Pitches per page: </label>
        <select
          value={pitchesPerPage}
          onChange={(e) => setPitchesPerPage(Number(e.target.value))}
          className="p-2 bg-white border-black-300 border-2 rounded"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="overflow-x-auto shadow-sm shadow-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Row
              </th>
              {[
                "Pitch ID",
                "Year",
                "Game ID",
                "Game Date",
                "Batter Name",
                "Bat Side",
                "Pitch Type",
                "Inning",
                "Home/Away",
                "Event Type",
                "Count",
                "Swing?",
                "In Play?",
                "Velocity",
                "Horizontal Break",
                "Vertical Break",
                "Spin Rate",
                "Initial Position X",
                "Initial Position Y",
                "Initial Position Z",
                "Plate X",
                "Plate Z",
                "Release Height",
                "Release Side",
                "Vertical Release Angle",
                "Horizontal Release Angle",
                "Vertical Approach Angle",
                "Horizontal Approach Angle",
                "Extension",
                "Spin Direction",
                "Foul?",
                "In Zone?",
                "Chase?",
                "Ball?",
                "Called Strike?",
                "Hit By Pitch?",
                "Hit?",
                "Total Bases",
                "Wild Pitch?",
                "Passed Ball?",
                "Swinging Strike?",
                "Batter Lineup Pos",
                "Sacrifice Fly?",
                "Sacrifice Bunt?",
                "Exit Velocity",
                "Launch Angle",
                "Distance",
                "Initial Position X (Hit)",
                "Initial Position Y (Hit)",
                "Initial Position Z (Hit)",
                "Landing Location X",
                "Landing Location Y",
              ].map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPitches.map((pitch, index) => (
              <tr key={index}>
                <td>{firstPitchIndex + index + 1}</td>
                <td>{pitch.pitchId}</td>
                <td>{pitch.year}</td>
                <td>{pitch.gameId}</td>
                <td>{pitch.gameDate.split("T")[0]}</td>
                <td>{pitch.batterName}</td>
                <td>{pitch.batSide}</td>
                <td>{pitch.pitchType}</td>
                <td>{pitch.inning}</td>
                <td>{pitch.half === "TOP" ? "Away" : "Home"}</td>
                <td>{pitch.pitchEventType}</td>
                <td>{`${pitch.balls}-${pitch.strikes}`}</td>
                <td>{pitch.isSwing ? "Yes" : "No"}</td>
                <td>{pitch.isInPlay ? "Yes" : "No"}</td>
                <td>{safeFixed(pitch.velocity)}</td>
                <td>{safeFixed(pitch.hBreak)}</td>
                <td>{safeFixed(pitch.vBreak)}</td>
                <td>{safeFixed(pitch.spinRate)}</td>
                <td>{safeFixed(pitch.initPosX)}</td>
                <td>{safeFixed(pitch.initPosY)}</td>
                <td>{safeFixed(pitch.initPosZ)}</td>
                <td>{safeFixed(pitch.plateX)}</td>
                <td>{safeFixed(pitch.plateZ)}</td>
                <td>{safeFixed(pitch.releaseHeight)}</td>
                <td>{safeFixed(pitch.releaseSide)}</td>
                <td>{safeFixed(pitch.vertRelAngle)}</td>
                <td>{safeFixed(pitch.horzRelAngle)}</td>
                <td>{safeFixed(pitch.vertApprAngle)}</td>
                <td>{safeFixed(pitch.horzApprAngle)}</td>
                <td>{safeFixed(pitch.extension)}</td>
                <td>{safeFixed(pitch.spinDirection)}</td>
                <td>{pitch.isFoul ? "Yes" : "No"}</td>

                <td>{pitch.isInZone ? "Yes" : "No"}</td>
                <td>{pitch.isChase ? "Yes" : "No"}</td>

                <td>{pitch.isBall ? "Yes" : "No"}</td>
                <td>{pitch.isCalledStrike ? "Yes" : "No"}</td>

                <td>{pitch.isHBP ? "Yes" : "No"}</td>
                <td>{pitch.inPlayHit ? "Yes" : "No"}</td>
                <td>{pitch.inPlayTB}</td>
                <td>{pitch.isWP ? "Yes" : "No"}</td>
                <td>{pitch.isPB ? "Yes" : "No"}</td>
                <td>{pitch.isSwingingStrike ? "Yes" : "No"}</td>
                <td>{pitch.batterLineupPos}</td>
                <td>
                  {pitch.isSF !== null ? (pitch.isSF ? "Yes" : "No") : ""}
                </td>
                <td>
                  {pitch.isSH !== null ? (pitch.isSH ? "Yes" : "No") : ""}
                </td>
                <td>{safeFixed(pitch.exitVelocity)}</td>
                <td>{safeFixed(pitch.launchAngle)}</td>
                <td>{safeFixed(pitch.distance)}</td>
                <td>{safeFixed(pitch.initPosXHit)}</td>
                <td>{safeFixed(pitch.initPosYHit)}</td>
                <td>{safeFixed(pitch.initPosZHit)}</td>
                <td>{safeFixed(pitch.landingLocationX)}</td>
                <td>{safeFixed(pitch.landingLocationY)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 ? (
        <p className="my-5 text-center pb-44">
          No pitches match these filters...
        </p>
      ) : (
        <div className="flex justify-center gap-5 items-center p-4 pb-44 md:pb-20 my-5">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-pYellow text-black rounded disabled:opacity-50 hover:scale-105"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(data.length / pitchesPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / pitchesPerPage)}
            className="p-2 bg-pYellow text-black rounded disabled:opacity-50 hover:scale-105"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
