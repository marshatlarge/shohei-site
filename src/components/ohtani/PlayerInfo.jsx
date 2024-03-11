import headshot from "/ohtani.png";

export default function PlayerInfo() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-center my-16">
        <img src={headshot} className="w-40 h-auto"></img>

        <p className="text-lg font-semibold">Shohei Ohtani</p>
        <p className="text-sm">Los Angeles Dodgers</p>

        <div className="flex gap-5">
          <div>
            <label className="font-bold">Age</label>
            <p>29</p>
          </div>
          <div>
            <label className="font-bold">Throws</label>
            <p>Right</p>
          </div>

          <div>
            <label className="font-bold">Size</label>
            <p>6'4" 210lbs</p>
          </div>
        </div>
      </div>
    </>
  );
}
