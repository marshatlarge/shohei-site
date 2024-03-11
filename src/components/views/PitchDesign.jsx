import MovementProfileChart from "../visuals/MovementProfileChart";
import PitchDesignTable from "../tables/PitchDesignTable";
import ReleasePointChart from "../visuals/ReleasePointChart";
import ReleasePointTable from "../tables/ReleasePointTable";

export default function PitchDesign({ data }) {
  return (
    <div className="flex flex-col gap-10">
      <p className="font-semibold text-md px-10">Ball Flight Metrics</p>
      <PitchDesignTable data={data} />
      {data.length === 0 ? (
        <p className="my-5 text-center">No pitches match these filters...</p>
      ) : (
        ""
      )}
      <p className="font-semibold text-md px-10 text-center">
        Movement Profile
      </p>
      <div className="max-w-lg h-96 mx-auto mb-10">
        <MovementProfileChart data={data} />
      </div>

      <p className="font-semibold text-md px-10">Release Metrics</p>
      <ReleasePointTable data={data} />
      {data.length === 0 ? (
        <p className="my-5 text-center">No pitches match these filters...</p>
      ) : (
        ""
      )}

      <p className="font-semibold text-md px-10 text-center">Release Points</p>
      <div className="max-w-lg h-96 mx-auto mb-44">
        <ReleasePointChart data={data} />
      </div>
    </div>
  );
}
