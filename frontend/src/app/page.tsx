"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CollegeCard, { College } from "@/components/CollegeCard";
import HeroBackground from "@/components/HeroBackground";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<{ name: string; email: string; city: string } | null>(null);
  const [nearbyColleges, setNearbyColleges] = useState<College[]>([]);
  const [topColleges, setTopColleges] = useState<College[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      fetchNearby(parsed.city);
    } else {
      fetchNearby("Bangalore");
    }

    const fetchTop = async () => {
      try {
        const res = await fetch(`/api/colleges?limit=6`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTopColleges(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTop();
  }, []);

  const fetchNearby = async (city: string) => {
    try {
      const res = await fetch(`/api/colleges?city=${encodeURIComponent(city)}&limit=4`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setNearbyColleges(data.data?.slice(0, 4) || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">

      {/* ----------------- TOP HERO ----------------- */}
      <section className="relative h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-xl">
              Find Colleges, Courses and <span className="text-blue-400">Exams</span> in India
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-medium drop-shadow-md">
              Your gateway to 100+ premium institutions. Real data, real websites, real futures.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-3xl shadow-2xl group transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <span className="text-3xl transition-transform group-hover:scale-110 duration-300">🔍</span>
              </div>
              <input
                type="text"
                className="w-full pl-16 pr-32 py-5 rounded-2xl text-gray-900 placeholder-gray-400 text-xl md:text-2xl border-4 border-transparent focus:border-blue-400 focus:outline-none transition-all shadow-inner"
                placeholder="Search colleges, cities, or courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white font-bold px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-md active:scale-95"
              >
                Search
              </button>
            </form>

            <div className="mt-8 flex gap-4 text-gray-300 text-sm font-medium">
              <span>Popular:</span>
              <button onClick={() => router.push('/search?query=IIT')} className="hover:text-white transition-colors underline decoration-blue-500/50 underline-offset-4">IITs</button>
              <button onClick={() => router.push('/search?query=MBA')} className="hover:text-white transition-colors underline decoration-blue-500/50 underline-offset-4">Top MBAs</button>
              <button onClick={() => router.push('/search?query=Medical')} className="hover:text-white transition-colors underline decoration-blue-500/50 underline-offset-4">Medical</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- SECTION 1: NEARBY COLLEGES ----------------- */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Top Colleges Near You</h2>
              <p className="text-gray-500 mt-2 font-medium">Recommendations based in {user ? user.city : "Bangalore"}</p>
            </div>
            <button onClick={() => router.push('/search')} className="text-blue-600 font-bold hover:underline hidden md:block">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyColleges.length > 0 ? (
              nearbyColleges.map((col) => <CollegeCard key={col.id} college={col} />)
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500">Loading nearby colleges...</div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: EXPLORE PROGRAMS ----------------- */}
      <section id="explore" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Explore Programs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Top Rankings", icon: "🏆", action: () => document.getElementById('rankings')?.scrollIntoView({ behavior: 'smooth' }) },
              { label: "Find Colleges", icon: "🔍", action: () => router.push('/search') },
              { label: "Compare", icon: "⚖️", action: () => router.push('/search') },
              { label: "Exams", icon: "📝", action: () => document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth' }) },
              { label: "Predictor", icon: "🎯", action: () => router.push('/search?query=JEE') },
              { label: "Course Finder", icon: "📚", action: () => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }) },
            ].map((item, idx) => (
              <div key={idx} onClick={item.action} className="bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-2xl p-6 text-center cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: TOP SPECIALIZATIONS ----------------- */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-extrabold mb-8">Top Specializations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Computer Science", "Mechanical", "Civil", "Electronics", "AI & ML", "Information Tech", "Data Science"].map((spec, idx) => (
              <button key={idx} onClick={() => router.push(`/search?query=${spec}`)} className="bg-white/10 hover:bg-white text-white hover:text-blue-600 border border-white/20 px-6 py-3 rounded-full font-bold transition-all shadow-sm">
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 4: RANKINGS TABLE ----------------- */}
      <section id="rankings" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Top Ranked Colleges in India</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-700">Rank</th>
                  <th className="p-4 font-bold text-gray-700">College</th>
                  <th className="p-4 font-bold text-gray-700 hidden md:table-cell">Rating</th>
                  <th className="p-4 font-bold text-gray-700 hidden lg:table-cell">Avg Fees</th>
                  <th className="p-4 font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topColleges.slice(0, 5).map((col, idx) => (
                  <tr key={col.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-extrabold text-gray-900">#{idx + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={col.logo_url} className="w-10 h-10 rounded border hidden sm:block" alt={col.name} />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{col.name}</p>
                          <p className="text-xs text-gray-500">{col.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-yellow-600 hidden md:table-cell">⭐ {col.rating}</td>
                    <td className="p-4 font-bold text-green-600 hidden lg:table-cell">₹{(col.fees_max / 100000).toFixed(1)}L</td>
                    <td className="p-4">
                      <button onClick={() => router.push(`/college/${col.id}`)} className="text-blue-600 font-bold hover:underline">Details &rarr;</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: GRID ----------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Institutions</h2>
            <button onClick={() => router.push('/search')} className="text-blue-600 font-bold hover:underline">See All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topColleges.map((col) => <CollegeCard key={col.id} college={col} />)}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 6: STUDY PLACES ----------------- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Top Study Places</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai", "Mumbai"].map((city) => (
              <div key={city} onClick={() => router.push(`/search?query=${city}`)} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">{city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 7: COURSES ----------------- */}
      <section id="courses" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "B.Tech", icon: "💻", desc: "Top engineering programs from IITs, NITs and leading private universities." },
              { name: "MBA", icon: "📊", desc: "Premier management programs from IIMs and top B-schools across India." },
              { name: "MBBS", icon: "🩺", desc: "Medical programs from AIIMS, government and private medical colleges." },
            ].map((course) => (
              <div key={course.name} onClick={() => router.push(`/search?query=${course.name}`)} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                <span className="text-3xl block mb-3">{course.icon}</span>
                <h3 className="text-xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.desc}</p>
                <span className="text-gray-900 font-bold text-sm group-hover:underline">View Colleges &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 8: EXAMS ----------------- */}
      <section id="exams" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Entrance Exams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "JEE Main", icon: "⚡", level: "National Level", desc: "Engineering" },
              { name: "CAT", icon: "📈", level: "National Level", desc: "Management" },
              { name: "NEET", icon: "🔬", level: "National Level", desc: "Medical" },
              { name: "GATE", icon: "🎓", level: "National Level", desc: "Postgraduate" },
            ].map((exam) => (
              <div key={exam.name} onClick={() => router.push(`/search?query=${exam.name}`)} className="bg-white border border-gray-200 p-6 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all cursor-pointer group">
                <span className="text-3xl block mb-2">{exam.icon}</span>
                <h3 className="font-extrabold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">{exam.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{exam.level}</p>
                <p className="text-xs text-blue-600 font-bold mt-2">{exam.desc} →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 9: NEWS ----------------- */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Latest News &amp; Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Top Universities Announce Early Application Deadlines", tag: "Admissions 2026", icon: "📅", query: "B.Tech" },
              { title: "NIRF Rankings 2026: IIT Madras Retains Top Spot", tag: "Rankings", icon: "🏆", query: "IIT" },
              { title: "New NEP Guidelines for Engineering Programs Released", tag: "Policy Update", icon: "📋", query: "Engineering" }
            ].map((item, i) => (
              <div key={i} onClick={() => router.push(`/search?query=${encodeURIComponent(item.query)}`)} className="group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl mb-4 flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-300 transition-all">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{item.icon}</span>
                </div>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-wide mb-2">{item.tag}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">Stay ahead of the curve by preparing your documents for the upcoming admission cycles across major universities.</p>
                <span className="text-blue-600 font-bold text-sm mt-2 inline-block group-hover:underline">Read more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 10: SUBSCRIPTION ----------------- */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">Never Miss an Update</h2>
          <p className="text-gray-400 mb-10 text-lg">Get the latest college admission notifications and exam alerts directly in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="text" placeholder="Full Name" className="px-5 py-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none flex-1" />
            <input type="email" placeholder="Email Address" className="px-5 py-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none flex-1" />
            <button type="submit" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-500 transition">Subscribe Now</button>
          </form>
        </div>
      </section>
    </div>
  );
}