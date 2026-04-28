"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { College } from "../../../components/CollegeCard";

import { AnimatePresence, motion } from "framer-motion";

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (!id) return;
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/colleges/${id}`);
        if (!res.ok) throw new Error("College not found");
        const data = await res.json();
        setCollege(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || "College not found"}</h2>
        <button onClick={() => router.push("/")} className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12"
    >
      {/* Header Banner */}
      <div className="bg-blue-600 text-white py-12 shadow-md">
        <div className="container mx-auto px-6 max-w-6xl">
          <button onClick={() => router.back()} className="text-blue-100 hover:text-white mb-6 flex items-center text-sm font-medium transition">
            &larr; Back to Listings
          </button>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                {college.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-blue-100">
                <p className="flex items-center gap-1">📍 {college.location}</p>
                <p className="flex items-center gap-1">⭐ {college.rating} / 5.0 Rating</p>
                <p className="flex items-center gap-1">🏆 Rank #{college.ranking || 'N/A'}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-3 w-full lg:w-auto"
            >
              {college.website_url && (
                <a 
                  href={college.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none text-center bg-white text-blue-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition"
                >
                  Visit Website
                </a>
              )}
              <button className="flex-1 lg:flex-none bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-orange-600 transition">
                Apply Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 mt-8 max-w-6xl">
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-8 hide-scrollbar relative">
          {['info', 'courses', 'placements', 'admission'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-4 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'info' ? 'Info' : tab === 'courses' ? 'Courses & Fees' : tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: INFO */}
            {activeTab === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">About {college.name}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{college.description}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Established</p>
                    <p className="text-xl font-bold text-gray-900">{college.establishment_year}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Accreditation</p>
                    <p className="text-xl font-bold text-gray-900">{college.accreditation || "N/A"}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium mb-1">Institution Type</p>
                    <p className="text-xl font-bold text-gray-900">{college.type}</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium mb-1">National Ranking</p>
                    <p className="text-2xl font-extrabold text-blue-900">#{college.ranking || "N/A"}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: COURSES & FEES */}
            {activeTab === 'courses' && (
              <motion.div 
                key="courses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Courses & Fee Structure</h2>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Course</th>
                        <th className="p-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Fees</th>
                        <th className="p-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Duration</th>
                        <th className="p-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {college.courses.map((course, idx) => (
                        <tr key={idx} className="hover:bg-blue-50 transition-colors">
                          <td className="p-4 font-bold text-gray-900">{course.name}</td>
                          <td className="p-4 font-medium text-blue-700">{course.fees}</td>
                          <td className="p-4 text-gray-600">{course.duration}</td>
                          <td className="p-4 text-gray-600">{course.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PLACEMENTS */}
            {activeTab === 'placements' && (
              <motion.div 
                key="placements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Placement Highlights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 rounded-xl border border-green-100 text-center">
                  <p className="text-sm text-green-800 font-bold uppercase tracking-wide mb-2">Highest Package</p>
                  <p className="text-4xl font-extrabold text-green-600">{college.placements.highest_package}</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <p className="text-sm text-blue-800 font-bold uppercase tracking-wide mb-2">Average Package</p>
                  <p className="text-4xl font-extrabold text-blue-600">{college.placements.avg_package}</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-xl border border-purple-100 text-center">
                  <p className="text-sm text-purple-800 font-bold uppercase tracking-wide mb-2">Placement Rate</p>
                  <p className="text-4xl font-extrabold text-purple-600">{college.placements.placement_percent}%</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Top Recruiters</h3>
                <div className="flex flex-wrap gap-3">
                  {college.placements.recruiters.map((recruiter, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-200 shadow-sm">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: ADMISSION */}
          {activeTab === 'admission' && (
            <motion.div 
              key="admission"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Admission Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                  <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                    📅 Important Dates
                  </h3>
                  <p className="text-orange-800 leading-relaxed font-medium">
                    {college.admission.dates}
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    📝 Accepted Exams
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.admission.exams.map((exam, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white text-blue-800 font-bold rounded shadow-sm">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Admission Process</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {college.admission.process}
                </p>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
