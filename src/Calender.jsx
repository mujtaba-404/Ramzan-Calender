import React, { useState } from "react";
import { TimeTable } from "./RamzanData/Data";
import "./index.css";

function Calender() {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([
    TimeTable.find((item) => item.Date === todayFormatted) || null,
  ]);

  // Function to filter search results
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    if (searchValue === "") {
      setFilteredData([TimeTable.find((item) => item.Date === todayFormatted) || null]);
      return;
    }

    // Filter data that starts with the input (Date or Day)
    const searchResults = TimeTable.filter(
      (item) =>
        item.Date.toLowerCase().startsWith(searchValue) ||
        item.Day.toLowerCase().startsWith(searchValue)
    );

    setFilteredData(searchResults.length > 0 ? searchResults : []);
  };

  return (
    <div className="  min-h-screen bg-gradient-to-b from-green-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
        Ramadan Timetable 2025
      </h1>
      <h2 className="text-xl md:text-2xl mb-2">📍 City: Rawalpindi</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Date (Mar 10) or Day (Tue)"
        value={search}
        onChange={handleSearch}
        className="p-2 text-white w-full max-w-md rounded-lg border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
      />

      {/* Display Results */}
      {filteredData.length > 0 ? (
        filteredData.map((item, index) =>
          item ? (
            <div 
              key={index}
              className="bg-green-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center border-2 border-yellow-500 mb-3"
            >
              <h3 className=" text-2xl md:text-3xl font-semibold">
                {item.Date} ({item.Day})
              </h3>
              <p className="text-lg mt-2">
                🌙 Suhoor: <span className="text-yellow-300">{item.Suhoor}</span>
              </p>
              <p className="text-lg">
                🌅 Iftar: <span className="text-yellow-300">{item.Iftari}</span>
              </p>
            </div>
          ) : null
        )
      ) : (
        <p className="text-red-500 text-lg md:text-xl">
          Anni deyaaa Pagal hai?? "{search}" 😭
        </p>
      )}
    </div>
  );
}

export default Calender;
