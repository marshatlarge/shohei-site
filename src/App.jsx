import "./App.css";
import pitchesData from "./Ohtani_Pitches_2022-2023.json";
import { useState } from "react";
import logo from "/logo.svg";
import Biomechanics from "./Biomechanics";
import PitchDesign from "./PitchDesign";
import PitchTable from "./PitchTable";
import Performance from "./Performance";

export default function App() {
  const [view, setView] = useState("Pitch Table");

  console.log(view);

  return (
    <>
      <div className="flex items-center justify-between h-24 bg-black text-pYellow px-10">
        <img src={logo} className="w-7 h-auto hover:scale-105"></img>
        <span className="font-bold text-md text-wrap border-pYellow border-4 p-2">
          Pittsburgh Pirates
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <img src="/ohtani.png" className="w-40 h-auto"></img>

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

      <div className="flex text-sm font-semibold justify-center">
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Pitch Table" ? "bg-pYellow" : "hover:bg-yellow-200"
          } transition duration-300`}
          onClick={() => setView("Pitch Table")}
        >
          Pitch Table
        </button>
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Performance" ? "bg-pYellow" : "hover:bg-yellow-200"
          }  transition duration-300`}
          onClick={() => setView("Performance")}
        >
          Performance
        </button>
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Biomechanics" ? "bg-pYellow" : "hover:bg-yellow-200"
          } transition duration-300`}
          onClick={() => setView("Biomechanics")}
        >
          Biomechanics
        </button>
        <button
          className={`p-1 border-pYellow border-2 ${
            view === "Pitch Design" ? "bg-pYellow" : "hover:bg-yellow-200"
          } transition duration-300`}
          onClick={() => setView("Pitch Design")}
        >
          Pitch Design
        </button>
      </div>

      {view === "Pitch Table" && <PitchTable />}
      {view === "Performance" && <Performance />}
      {view === "Biomechanics" && <Biomechanics />}
      {view === "PitchDesign" && <PitchDesign />}
    </>
  );
}
