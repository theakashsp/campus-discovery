"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { College } from "../../../components/CollegeCard";

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header Banner */}
      <div className="bg-blue-600 text-white py-12 shadow-md">
        <div className="container mx-auto px-6 max-w-5xl">
          <button onClick={() => router.back()} className="text-blue-100 hover:text-white mb-6 flex items-center text-sm font-medium transition">
            &larr; Back to Listings
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                {college.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{college.name}</h1>
              <p className="text-xl text-blue-100 flex items-center gap-2">
                📍 {college.location}
              </p>
            </div>
            {college.website_url && (
              <a 
                href={college.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-800">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{college.rating} <span className="text-sm text-gray-500">/ 5</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Placement</p>
                  <p className="text-2xl font-bold text-green-600">{college.placement_percent}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Avg Package</p>
                  <p className="text-2xl font-bold text-gray-900">{college.avg_package} <span className="text-sm text-gray-500">LPA</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Accreditation</p>
                  <p className="text-xl font-bold text-gray-900">{college.accreditation || "N/A"}</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-800">Courses Offered</h2>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">Course Name</th>
                      <th className="p-4 font-semibold text-gray-600">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {college.courses.map((course, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-medium text-gray-900">{course.name}</td>
                        <td className="p-4 text-gray-600">{course.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Fee Structure</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Estimated Yearly Range</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{(college.fees_min / 100000).toFixed(1)}L - ₹{(college.fees_max / 100000).toFixed(1)}L
                </p>
                <p className="text-xs text-blue-700 mt-2">*Fees may vary based on the specific course and quota.</p>
              </div>
            </section>

            {college.ranking && (
              <section className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-sm border border-yellow-100">
                <h3 className="text-lg font-bold mb-2 text-yellow-900 flex items-center gap-2">
                  🏆 National Ranking
                </h3>
                <p className="text-3xl font-extrabold text-orange-600">
                  #{college.ranking}
                </p>
                <p className="text-sm text-yellow-800 mt-1 font-medium">in India</p>
              </section>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
