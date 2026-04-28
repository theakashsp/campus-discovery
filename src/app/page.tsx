"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollegeCard, { College } from "../components/CollegeCard";
import FilterBar from "../components/FilterBar";

function CollegePlatform() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Global search
  const [searchInput, setSearchInput] = useState(searchParams.get("query") || "");

  // URL state
  const query = searchParams.get("query") || "";
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const course = searchParams.get("course") || "";
  const maxFees = searchParams.get("maxFees") || "";

  const [allStates, setAllStates] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<string[]>([]);

  // Derived cities
  const availableCities = state ? allCities.filter(() => true) : allCities;

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/colleges/filters`);
        const data = await res.json();
        
        setAllStates(data.states);
        setAllCities(data.cities);
        setAllTypes(data.types);
        setAllCourses(data.courses);
      } catch (err) {
        console.error("Could not fetch metadata");
      }
    };
    fetchMetadata();
  }, []);

  const fetchColleges = async (pageNum: number, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      params.append("limit", "12");
      if (query) params.append("query", query);
      if (state) params.append("state", state);
      if (city) params.append("city", city);
      if (type) params.append("type", type);
      if (course) params.append("course", course);
      if (maxFees) params.append("maxFees", maxFees);

      const res = await fetch(`${apiUrl}/colleges?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const { data, meta } = await res.json();
      
      if (isLoadMore) {
        setColleges(prev => [...prev, ...data]);
      } else {
        setColleges(data);
      }
      
      setTotalCount(meta.total);
      setHasMore(pageNum < meta.totalPages);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      fetchColleges(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, state, city, type, course, maxFees]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchColleges(nextPage, true);
  };

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === 'state') params.delete('city');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleGlobalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    updateFilters("query", val);
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Massive Hero Banner */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 shadow-lg relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute rounded-full w-96 h-96 bg-white -top-20 -left-20 blur-3xl"></div>
          <div className="absolute rounded-full w-96 h-96 bg-blue-400 bottom-0 right-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md">
            Search Colleges, Courses and Exams
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-medium">
            Discover the best path for your future career among 100+ top institutions.
          </p>
          
          <div className="relative max-w-3xl mx-auto shadow-2xl">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <span className="text-3xl">🔍</span>
            </div>
            <input
              type="text"
              className="w-full pl-16 pr-6 py-5 rounded-xl text-gray-900 text-xl border-4 border-transparent focus:border-blue-400 focus:outline-none transition-all"
              placeholder="Search by college name, city, or course (e.g., IIT Delhi, Mumbai, MBA)..."
              value={searchInput}
              onChange={handleGlobalSearch}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wider mb-4">Refine Your Search</h3>
          <FilterBar 
            state={state} setState={(v) => updateFilters('state', v)}
            city={city} setCity={(v) => updateFilters('city', v)}
            type={type} setType={(v) => updateFilters('type', v)}
            maxFees={maxFees} setMaxFees={(v) => updateFilters('maxFees', v)}
            course={course} setCourse={(v) => updateFilters('course', v)}
            states={allStates}
            cities={availableCities}
            types={allTypes}
            courses={allCourses}
          />
        </div>

        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {query ? `Search Results for "${query}"` : 'Top Rated Colleges'}
          </h2>
          <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
            {totalCount} Found
          </span>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-xl text-center text-lg font-medium border border-red-200">
            {error}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-72 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-auto flex gap-2 pt-4 border-t">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center shadow-sm">
            <span className="text-6xl block mb-6">🏜️</span>
            <h3 className="text-2xl font-bold text-gray-800">No colleges matched your criteria</h3>
            <p className="text-gray-500 mt-2 text-lg">Try searching for broader terms or clearing your filters.</p>
            <button 
              onClick={clearFilters}
              className="mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow"
            >
              Clear All Filters & Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg px-12 py-4 rounded-full hover:bg-blue-50 transition focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 shadow-md"
                >
                  {loadingMore ? 'Loading more colleges...' : 'Explore More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div></div>}>
      <CollegePlatform />
    </Suspense>
  );
}