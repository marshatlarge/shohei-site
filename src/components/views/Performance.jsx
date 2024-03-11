import PerformanceTable from "../tables/PerformanceTable";
import PitchUsageChart from "../visuals/PitchUsageChart";
import SprayChart from "../visuals/SprayChart";
import ZoneChart from "../visuals/ZoneChart";

export default function Performance({ data }) {
  return (
    <>
      <div className="flex flex-col gap-10">
        <p className="font-semibold text-md px-10">
          Performance Metrics and Hits Allowed
        </p>
        <PerformanceTable data={data} />
        {data.length === 0 ? (
          <p className="my-5 text-center">No pitches match these filters...</p>
        ) : (
          ""
        )}

        <p className="font-semibold text-md px-10 text-center">Pitch Usage</p>
        <div className="w-80 mx-auto mb-10">
          <PitchUsageChart data={data} />
        </div>

        <p className="font-semibold text-md px-10 text-center">
          Pitch Locations
        </p>
        <div className="h-96 w-80 mx-auto mb-20">
          <ZoneChart data={data} />
        </div>

        <p className="font-semibold text-md px-10 text-center">
          Batted Balls Spray Chart
        </p>
        <div className="md:h-96 h-72 w-64 pl-10 md:pl-0 md:w-80 mx-auto mb-44 -rotate-45">
          <SprayChart data={data} />
        </div>
      </div>
    </>
  );
}
