import "./App.css";
import rawPitches from "./data/Ohtani_Pitches_2022-2023.json";
import { useState } from "react";

import PitchDesign from "./components/views/PitchDesign";
import PitchTable from "./components/views/PitchTable";
import Performance from "./components/views/Performance";
import Header from "./components/Header";
import PlayerInfo from "./components/ohtani/PlayerInfo";
import Tabs from "./components/tools/Tabs";
import Filters from "./components/tools/Filters";

export default function App() {
  const [view, setView] = useState("Pitch Table");
  const [data, setData] = useState(rawPitches);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => setFiltersVisible(!filtersVisible); // Function to toggle Filters visibility

  return (
    <>
      <div className="fixed w-screen z-50">
        <Header toggleFilters={toggleFilters} filtersVisible={filtersVisible} />
      </div>
      {/*Did some messy stuf here to make everything responsive for mobile*/}
      <div className="flex">
        <div
          className={`${
            filtersVisible
              ? "flex flex-col items-center md:items-start z-40 fixed w-screen md:w-80 bg-white md:bg-none h-screen overflow-y-scroll overflow-x-hidden pl-5 pb-44 shadow-gray-300 shadow-lg mt-24"
              : "hidden md:block fixed w-80 h-screen overflow-y-scroll overflow-x-hidden pl-5 pb-20 shadow-gray-300 shadow-lg mt-24"
          }`}
        >
          <Filters rawPitches={rawPitches} setData={setData} />
        </div>
        <div
          className={`${
            !filtersVisible
              ? "ml-0 md:ml-80 flex-grow overflow-auto mt-24"
              : "hidden md:block ml-0 md:ml-80 flex-grow overflow-auto mt-24"
          }`}
        >
          <PlayerInfo />
          <Tabs view={view} setView={setView} />

          {view === "Pitch Table" && <PitchTable data={data} />}
          {view === "Performance" && <Performance data={data} />}

          {view === "Pitch Design" && <PitchDesign data={data} />}
        </div>
        )}
      </div>
    </>
  );
}
