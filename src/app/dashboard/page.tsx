"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CollegeCard, { College } from "../../components/CollegeCard";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [nearbyColleges, setNearbyColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const fetchNearby = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/colleges/nearby?city=${encodeURIComponent(parsedUser.city)}`);
        const data = await res.json();
        setNearbyColleges(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="bg-blue-600 text-white pb-24 pt-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Hello, {user.name} 👋
            </h1>
            <button 
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg font-bold transition-colors"
            >
              Sign Out
            </button>
          </div>
          <p className="text-blue-100 text-lg">
            Welcome to your personalized dashboard. We found some amazing institutions near {user.city}.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 max-w-6xl -mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Colleges Near {user.city}</h2>
          
          {loading ? (
            <div className="flex justify-center p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
          ) : nearbyColleges.length === 0 ? (
            <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-4xl block mb-3">📍</span>
              <p className="text-gray-600 font-medium">We couldn't find any premium colleges directly in {user.city} right now.</p>
              <button onClick={() => router.push('/search')} className="mt-4 text-blue-600 font-bold hover:underline">
                Explore All Colleges
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Searches</h2>
          <div className="flex gap-4">
            <button onClick={() => router.push('/search?query=B.Tech')} className="px-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-medium text-gray-700 transition">B.Tech Programs</button>
            <button onClick={() => router.push('/search?query=IIT')} className="px-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-medium text-gray-700 transition">IIT Institutions</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
