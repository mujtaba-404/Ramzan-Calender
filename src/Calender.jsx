import React, { useState } from "react";
import { TimeTable } from "./RamzanData/Data"
import "./index.css";

function Calender() {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(
    TimeTable.find((item) => item.Date === todayFormatted) || null
  );

  // Function to find the next upcoming day
  const getNextUpcomingDay = (day) => {
    const todayIndex = today.getDay(); // Get current day index (0=Sunday, 6=Saturday)
    const searchIndex = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
      day.toLowerCase().slice(0, 3)
    );

    if (searchIndex === -1) return null; // Invalid day input

    let daysToAdd = (searchIndex - todayIndex + 7) % 7; // Find the next upcoming day
    if (daysToAdd === 0) daysToAdd = 7; // Ensure it always picks the future day

    const nextDate = new Date();
    nextDate.setDate(today.getDate() + daysToAdd);

    const formattedNextDate = nextDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    return TimeTable.find((item) => item.Date === formattedNextDate) || null;
  };

  // Search function
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();

    // Check if user searches by date
    const dateResult = TimeTable.find((item) => item.Date.toLowerCase() === searchValue);
    if (dateResult) return setFilteredData(dateResult);

    // Check if user searches by day (e.g., "Tuesday")
    const nextDayResult = getNextUpcomingDay(searchValue);
    setFilteredData(nextDayResult || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
        Ramadan Timetable 2025
      </h1>
      <h2 className="text-xl md:text-2xl mb-2">📍 City: Rawalpindi</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Date (March 10) or Day (Tuesday)"
        value={search}
        onChange={handleSearch}
        className="p-2 text-white w-full max-w-md rounded-lg  border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
      />

      {/* Display Results */}
      {filteredData ? (
        <div className="bg-green-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center border-2 border-yellow-500">
          <h3 className="text-2xl md:text-3xl font-semibold">
            {filteredData.Date} ({filteredData.Day})
          </h3>
          <p className="text-lg mt-2">
            🌙 Suhoor: <span className="text-yellow-300">{filteredData.Suhoor}</span>
          </p>
          <p className="text-lg">
            🌅 Iftar: <span className="text-yellow-300">{filteredData.Iftari}</span>
          </p>
        </div>
      ) :  ( alert("Annii deyaa Pagal hai?? ")
      
      )}
    </div>
  );
}

export default Calender;
