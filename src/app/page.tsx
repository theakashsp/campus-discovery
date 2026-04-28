"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollegeCard, { College } from "../components/CollegeCard";
import FilterBar from "../components/FilterBar";
import CompareTable from "../components/CompareTable";

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

  // Sync state from URL
  const query = searchParams.get("name") || "";
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const course = searchParams.get("course") || "";
  const maxFees = searchParams.get("maxFees") || "";

  const [selected, setSelected] = useState<College[]>([]);

  // Local state for dropdowns
  const [allStates, setAllStates] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<string[]>([]);

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
      if (query) params.append("name", query);
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
    // Whenever URL params change, reset to page 1 and fetch
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
    // If state changes, reset city
    if (key === 'state') params.delete('city');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("/", { scroll: false });
  };

  const toggleSelect = (college: College) => {
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

  const clearSelection = () => {
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Campus Compare</h1>
          <p className="mt-2 text-blue-100">Find and compare the best colleges for your future.</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        
        <FilterBar 
          query={query} setQuery={(v) => updateFilters('name', v)}
          state={state} setState={(v) => updateFilters('state', v)}
          city={city} setCity={(v) => updateFilters('city', v)}
          type={type} setType={(v) => updateFilters('type', v)}
          maxFees={maxFees} setMaxFees={(v) => updateFilters('maxFees', v)}
          course={course} setCourse={(v) => updateFilters('course', v)}
          states={allStates}
          cities={state ? allCities.filter(c => true /* Backend filter handles this optimally later */) : allCities} // Simple fallback, usually API handles dynamic dropdowns
          types={allTypes}
          courses={allCourses}
        />

        {selected.length >= 2 && (
          <CompareTable 
            selectedColleges={selected}
            onClear={clearSelection}
          />
        )}

        <div className="mt-8 flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {totalCount > 0 ? `${totalCount} Colleges Found` : 'Top Colleges'}
          </h2>
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            {selected.length}/3 selected for comparison
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-64 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="mt-8 h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-700">No colleges found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search filters to find more results.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colleges.map((college) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  isSelected={selected.some(c => c.id === college.id)}
                  onToggle={toggleSelect}
                />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-white border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load More Colleges'}
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <CollegePlatform />
    </Suspense>
  );
}