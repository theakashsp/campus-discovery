interface FilterBarProps {
  query: string;
  setQuery: (q: string) => void;
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
  query, setQuery,
  state, setState,
  city, setCity,
  type, setType,
  maxFees, setMaxFees,
  course, setCourse,
  states, cities, types, courses
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col lg:flex-row gap-4 items-center flex-wrap">
      <div className="w-full lg:flex-1 relative min-w-[200px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search colleges..."
          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={state}
          onChange={(e) => { setState(e.target.value); setCity(""); }}
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      
      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="w-full sm:w-auto flex-1 min-w-[150px]">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
        />
      </div>
    </div>
  );
}
