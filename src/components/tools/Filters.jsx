import { useEffect, useState } from "react";
import defaultFilterValues from "../../data/Default_Filter_Values.json";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Filters({ rawPitches, setData }) {
  const [filters, setFilters] = useState(defaultFilterValues);

  useEffect(() => {
    let filteredPitches = rawPitches.filter((pitch) => {
      return (
        (filters.inPlayHit !== -1
          ? pitch.inPlayHit === filters.inPlayHit
          : true) &&
        (filters.isSwing !== -1 ? pitch.isSwing === filters.isSwing : true) &&
        (filters.isInPlay !== -1
          ? pitch.isInPlay === filters.isInPlay
          : true) &&
        (filters.isMiss !== -1 ? pitch.isMiss === filters.isMiss : true) &&
        (filters.pitchType ? pitch.pitchType === filters.pitchType : true) &&
        (filters.half
          ? (pitch.half === "TOP" ? "Away" : "Home") === filters.half
          : true) &&
        (filters.batSide ? pitch.batSide === filters.batSide : true) &&
        (filters.inning !== "0"
          ? pitch.inning === Number.parseInt(filters.inning)
          : true) &&
        (filters.batterName ? pitch.batterName === filters.batterName : true) &&
        (filters.gameDate
          ? pitch.gameDate.split("T")[0] === filters.gameDate
          : true) &&
        (filters.balls ? pitch.balls.toString() === filters.balls : true) &&
        (filters.strikes
          ? pitch.strikes.toString() === filters.strikes
          : true) &&
        pitch.exitVelocity >= filters.exitVelocity[0] &&
        pitch.exitVelocity <= filters.exitVelocity[1] &&
        pitch.launchAngle >= filters.launchAngle[0] &&
        pitch.launchAngle <= filters.launchAngle[1] &&
        pitch.distance >= filters.distance[0] &&
        pitch.distance <= filters.distance[1] &&
        pitch.velocity >= filters.velocity[0] &&
        pitch.velocity <= filters.velocity[1]
      );
    });
    setData(filteredPitches);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div className="flex flex-col w-64 justify-center pb-20 gap-5">
      <div className="flex p-5 justify-center items-center gap-3">
        <p className="text-xl font-semibold text-center">Filters</p>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <button
            onClick={() => setFilters(defaultFilterValues)}
            className={`p-2 ${
              JSON.stringify(filters) === JSON.stringify(defaultFilterValues)
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white"
            } rounded`}
            disabled={
              JSON.stringify(filters) === JSON.stringify(defaultFilterValues)
            }
          >
            Reset
          </button>
        </div>
      </div>
      {/* GAME INFO */}
      <p>General</p>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Game Date
        </label>
        <select
          value={filters.gameDate}
          onChange={(e) => handleFilterChange("gameDate", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select game date...</option>
          {Array.from(
            new Set(rawPitches.map((pitch) => pitch.gameDate.split("T")[0]))
          ).map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* BATTER */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Batter Name
        </label>
        <select
          value={filters.batterName}
          onChange={(e) => handleFilterChange("batterName", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select batter name...</option>
          {Array.from(new Set(rawPitches.map((pitch) => pitch.batterName))).map(
            (name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            )
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Bat Side
        </label>
        <select
          value={filters.batSide}
          onChange={(e) => handleFilterChange("batSide", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select bat side...</option>
          <option value="L">L</option>
          <option value="R">R</option>
        </select>
      </div>

      {/* SITUATION */}
      <p>Game Situation</p>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Inning Number
        </label>
        <select
          value={filters.inning}
          onChange={(e) => handleFilterChange("inning", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="0">Select inning...</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((inning, index) => (
            <option key={index} value={inning}>
              {inning}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Number of Balls
        </label>
        <select
          value={filters.balls}
          onChange={(e) => handleFilterChange("balls", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select balls...</option>
          {[0, 1, 2, 3].map((count, index) => (
            <option key={index} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Number of Strikes
        </label>
        <select
          value={filters.strikes}
          onChange={(e) => handleFilterChange("strikes", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select strikes...</option>
          {[0, 1, 2].map((count, index) => (
            <option key={index} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* PITCH METRICS */}
      <p>Pitch Metrics</p>
      <div className="mb-4 flex flex-col ">
        <label
          htmlFor="pitchVelocitySlider"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Pitch Velocity (mph)
        </label>
        <Slider
          id="pitchVelocitySlider"
          range
          min={60}
          max={110}
          value={filters.velocity}
          defaultValue={filters.velocity}
          onChange={(value) => handleFilterChange("velocity", value)}
          allowCross={false}
          className="max-w-lg"
        />
        <p className="text-sm text-gray-600 text-center">
          {filters.velocity[0]} mph to {filters.velocity[1]} mph
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Pitch Type
        </label>
        <select
          value={filters.pitchType}
          onChange={(e) => handleFilterChange("pitchType", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select pitch type...</option>
          {Array.from(new Set(rawPitches.map((pitch) => pitch.pitchType))).map(
            (type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            )
          )}
        </select>
      </div>

      {/* SWING INFO */}
      <p>Swing Outcomes</p>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Swing?
        </label>
        <select
          value={filters.isSwing}
          onChange={(e) =>
            handleFilterChange("isSwing", Number.parseInt(e.target.value))
          }
          className="p-2 border border-gray-300 rounded"
        >
          <option value="-1">Swing?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Swing and Miss?
        </label>
        <select
          value={filters.isMiss}
          onChange={(e) =>
            handleFilterChange("isMiss", Number.parseInt(e.target.value))
          }
          className="p-2 border border-gray-300 rounded"
        >
          <option value="-1">Swing and Miss?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Ball put in play?
        </label>
        <select
          value={filters.isInPlay}
          onChange={(e) =>
            handleFilterChange("isInPlay", Number.parseInt(e.target.value))
          }
          className="p-2 border border-gray-300 rounded"
        >
          <option value="-1">Ball put in play?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Hit?
        </label>
        <select
          value={filters.isInPlay}
          onChange={(e) =>
            handleFilterChange("inPlayHit", Number.parseInt(e.target.value))
          }
          className="p-2 border border-gray-300 rounded"
        >
          <option value="-1">Hit?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      {/* BATTED BALL INFORMATION */}
      <p>Batted Ball Metrics</p>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="exitVelocitySlider"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Exit Velocity (mph)
        </label>
        <Slider
          id="exitVelocitySlider"
          range
          min={0}
          max={140}
          value={filters.exitVelocity}
          defaultValue={filters.exitVelocity}
          onChange={(value) => handleFilterChange("exitVelocity", value)}
          allowCross={false}
          className="max-w-lg"
        />
        <p className="text-sm text-gray-600 text-center">
          {filters.exitVelocity[0]} mph to {filters.exitVelocity[1]} mph
        </p>
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="launchAngleSlider"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Launch Angle (degrees)
        </label>
        <Slider
          id="launchAngleSlider"
          range
          min={-90}
          max={90}
          value={filters.launchAngle}
          defaultValue={filters.launchAngle}
          onChange={(value) => handleFilterChange("launchAngle", value)}
          allowCross={false}
          className="max-w-lg"
        />
        <p className="text-sm text-gray-600 text-center">
          {filters.launchAngle[0]} degrees to {filters.launchAngle[1]} degrees
        </p>
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="distanceSlider"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Distance (feet)
        </label>
        <Slider
          id="distanceSlider"
          range
          min={0}
          max={520}
          value={filters.distance}
          defaultValue={filters.distance}
          onChange={(value) => handleFilterChange("distance", value)}
          allowCross={false}
          className="max-w-lg"
          trackStyle={[{ backgroundColor: "black" }]} // Note--went into node modules and changed the underlying code to make these black because this wasn't working
          handleStyle={[{ borderColor: "black" }, { borderColor: "black" }]}
          activeDotStyle={{ boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.5)" }}
        />
        <p className="text-sm text-gray-600 text-center">
          {filters.distance[0]} feet to {filters.distance[1]} feet
        </p>
      </div>
    </div>
  );
}
