import React from "react";
import logo from "/logo.svg";
// Import FontAwesome components and the specific icon you need
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the faTimes icon

export default function Header({ toggleFilters, filtersVisible }) {
  return (
    <>
      <div className="flex items-center justify-between h-24 bg-black text-yellow-400 px-10 shadow-lg shadow-gray-300">
        <img
          src={logo}
          className="w-7 h-auto hover:scale-110 duration-200"
          alt="logo"
        ></img>
        <span className="font-bold text-md text-wrap border-yellow-400 border-4 p-2">
          Pittsburgh Pirates
        </span>
        {/* FontAwesome filter icon */}
        <div
          className="flex flex-col items-center justify-center md:hidden"
          onClick={toggleFilters}
        >
          <p className="text-xs">Filters</p>
          <FontAwesomeIcon
            icon={filtersVisible ? faTimes : faFilter}
            className="text-2xl"
          />
        </div>
      </div>
    </>
  );
}
