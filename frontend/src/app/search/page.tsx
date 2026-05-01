"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollegeCard, { College } from "@/components/CollegeCard";
import FilterBar from "@/components/FilterBar";
import { motion } from "framer-motion";

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [searchInput, setSearchInput] = useState(searchParams.get("query") || "");

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

  const [allCollegesCache, setAllCollegesCache] = useState<College[]>([]);

  const availableCities = state
    ? [...new Set(allCollegesCache.filter(c => c.state === state).map(c => c.city))].sort()
    : allCities;

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(`/api/colleges?limit=500`);
        const data = await res.json();
        const cols: College[] = data.data;

        setAllCollegesCache(cols);
        setAllStates([...new Set(cols.map(c => c.state))].sort());
        setAllCities([...new Set(cols.map(c => c.city))].sort());
        setAllTypes([...new Set(cols.map(c => c.type))].sort());
        const courseNames = new Set<string>();
        cols.forEach(c => c.courses.forEach(cr => courseNames.add(cr.name)));
        setAllCourses([...courseNames].sort());
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

      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      params.append("limit", "12");
      if (query) params.append("query", query);
      if (state) params.append("state", state);
      if (city) params.append("city", city);
      if (type) params.append("type", type);
      if (course) params.append("course", course);
      if (maxFees) params.append("maxFees", maxFees);

      const res = await fetch(`/api/colleges?${params.toString()}`);
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
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/search", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12 pt-6">
      <main className="container mx-auto px-6">

        {/* Search header / filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Explore Colleges</h1>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="relative max-w-full mx-auto mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-xl text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Search by college name, city, or course..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  updateFilters("query", e.target.value);
                }}
              />
            </div>

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
        </div>

        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-700">
            {query ? `Results for "${query}"` : 'All Colleges'}
          </h2>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-16 rounded-2xl border border-gray-200 text-center shadow-sm"
          >
            <span className="text-6xl block mb-6">🏜️</span>
            <h3 className="text-2xl font-bold text-gray-800">No colleges matched your criteria</h3>
            <p className="text-gray-500 mt-2 text-lg">Try searching for broader terms or clearing your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {colleges.map((college, index) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CollegeCard college={college} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg px-12 py-4 rounded-full hover:bg-blue-50 transition focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 shadow-md"
                >
                  {loadingMore ? 'Loading more...' : 'Explore More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div></div>}>
      <SearchPage />
    </Suspense>
  );
}