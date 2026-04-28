"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazily load the 3D component with SSR disabled
const Hero3D = dynamic(() => import("../components/Hero3D"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* 3D Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        
        {/* 3D Canvas Background (Lazy Loaded) */}
        <Hero3D />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-xl">
              Find and Compare the <span className="text-blue-400">Best Colleges</span> in India
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
                className="w-full pl-16 pr-32 py-5 rounded-2xl text-gray-900 text-xl md:text-2xl border-4 border-transparent focus:border-blue-400 focus:outline-none transition-all shadow-inner"
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

      {/* Feature Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Why Choose Campus Compare?</h2>
            <p className="text-gray-600 text-lg">We provide authentic, data-driven insights to help you make the most important decision of your career.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "🏛️", title: "Authentic Data", desc: "Direct links to official college websites and verified institutional data." },
              { icon: "📊", title: "Deep Analytics", desc: "Compare placement records, fee structures, and course availabilities effortlessly." },
              { icon: "⚡", title: "Real-time Search", desc: "Instant filtering across hundreds of colleges, courses, and cities." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button 
              onClick={() => router.push('/search')}
              className="bg-gray-900 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl hover:bg-blue-600 transition-colors duration-300"
            >
              Explore All Institutions
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-auto relative z-20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-extrabold text-white mb-4 tracking-tight">Campus Compare</div>
          <p>© 2026 Campus Compare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}