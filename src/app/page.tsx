/** @format */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState<{ MakeId: number; MakeName: string }[]>(
    []
  );
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => 2015 + i
  );

  useEffect(() => {
    const fetchMakes = async () => {
      const res = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await res.json();
      setMakes(data.Results);
    };
    fetchMakes();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Car Dealer App</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="makes" className="block mb-2 dark:text-gray-300">
            Select Vehicle Make:
          </label>
          <select
            id="makes"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">-- Select Make --</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block mb-2 dark:text-gray-300">
            Select Model Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link
          href={`/result/${selectedMake}/${selectedYear}`}
          className="block">
          <button
            disabled={!selectedMake || !selectedYear}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded transition-colors duration-200
              ${
                !selectedMake || !selectedYear
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}>
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
