"use client";
const [query, setQuery] = useState("");
const [location, setLocation] = useState("");
const [maxFees, setMaxFees] = useState<number | "">("");
import { useEffect, useState } from "react";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  const toggleSelect = (college: any) => {
    if (selected.find((c) => c.id === college.id)) {
      setSelected(selected.filter((c) => c.id !== college.id));
    } else {
      if (selected.length < 3) {
        setSelected([...selected, college]);
      } else {
        alert("You can compare up to 3 colleges only");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">College Discovery</h1>

      {/* College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {colleges.map((college: any) => (
          <div key={college.id} className="border p-4 rounded shadow">
            <input
              type="checkbox"
              onChange={() => toggleSelect(college)}
              checked={selected.some((c) => c.id === college.id)}
            />
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p>📍 {college.location}</p>
            <p>💰 Fees: ₹{college.fees}</p>
            <p>⭐ Rating: {college.rating}</p>
          </div>
        ))}
      </div>

      {/* Compare Section */}
      {selected.length >= 2 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Compare Colleges</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Feature</th>
                {selected.map((c) => (
                  <th key={c.id} className="border p-2">{c.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-2">Location</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">{c.location}</td>
                ))}
              </tr>

              <tr>
                <td className="border p-2">Fees</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">₹{c.fees}</td>
                ))}
              </tr>

              <tr>
                <td className="border p-2">Rating</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">{c.rating}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  const filtered = colleges.filter((c: any) => {
    const q = query.toLowerCase();
    const matchName = c.name.toLowerCase().includes(q);
    const matchLoc = location ? c.location === location : true;
    const matchFees = maxFees ? c.fees <= maxFees : true;
    return matchName && matchLoc && matchFees;
  });
}