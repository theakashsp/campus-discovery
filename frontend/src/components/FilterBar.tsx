interface FilterBarProps {
  state: string;
  setState: (s: string) => void;
  city: string;
  setCity: (c: string) => void;
  type: string;
  setType: (t: string) => void;
  maxFees: string;
  setMaxFees: (f: string) => void;
  course: string;
  setCourse: (c: string) => void;
  
  states: string[];
  cities: string[];
  types: string[];
  courses: string[];
}

export default function FilterBar({
  state, setState,
  city, setCity,
  type, setType,
  maxFees, setMaxFees,
  course, setCourse,
  states, cities, types, courses
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col lg:flex-row gap-4 items-center flex-wrap">
      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={state}
          onChange={(e) => { setState(e.target.value); setCity(""); }}
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}
        >
          <option value="">{state ? "All Cities" : "Select State First"}</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      
      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Institutions</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map(crs => <option key={crs} value={crs}>{crs}</option>)}
        </select>
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <input
          type="number"
          placeholder="Max Fees (₹)"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
        />
      </div>
    </div>
  );
}
