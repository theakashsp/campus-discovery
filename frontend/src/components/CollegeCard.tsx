import Link from "next/link";

export interface Course {
  name: string;
  fees: string;
  duration: string;
  eligibility: string;
}

export interface Placements {
  highest_package: string;
  avg_package: string;
  placement_percent: number;
  recruiters: string[];
}

export interface Admission {
  exams: string[];
  dates: string;
  process: string;
}

export interface College {
  id: number;
  name: string;
  logo_url: string;
  image_url: string;
  city: string;
  state: string;
  location: string;
  type: string;
  fees_min: number;
  fees_max: number;
  rating: number;
  description: string;
  establishment_year: number;
  accreditation: string;
  ranking: number | null;
  courses: Course[];
  placements: Placements;
  admission: Admission;
  website_url?: string;
}

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const openWebsite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (college.website_url) {
      window.open(college.website_url, "_blank");
    }
  };

  const typeColor =
    college.type === "Government"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 flex flex-col h-full relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200">
      {/* Badges — always visible */}
      <div className="absolute top-3 left-3 flex gap-1.5 items-start z-10">
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-sm ${typeColor}`}
        >
          {college.type}
        </span>
        {college.rating >= 4.7 && (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
            ⭐ Top Rated
          </span>
        )}
      </div>

      {/* Image & Logo */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {college.image_url ? (
          <img
            src={college.image_url}
            alt={college.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-end gap-3 w-full pr-12">
          {college.logo_url && (
            <img
              src={college.logo_url}
              alt="logo"
              className="w-12 h-12 rounded-xl border-2 border-white/80 shadow-lg bg-white flex-shrink-0 backdrop-blur-sm"
              loading="lazy"
            />
          )}
          <div className="text-white overflow-hidden">
            <h2 className="text-base font-bold line-clamp-1 drop-shadow-sm">
              {college.name}
            </h2>
            <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
              📍 {college.location}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        {/* Stats */}
        <div className="space-y-2.5 text-sm mb-4 flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs font-medium">Avg. Fees</span>
            <span className="font-semibold text-emerald-600 text-xs">
              ₹{(college.fees_min / 100000).toFixed(1)}L – ₹
              {(college.fees_max / 100000).toFixed(1)}L / yr
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs font-medium">Rating</span>
            <span className="font-semibold text-gray-900 flex items-center gap-1 text-xs">
              ⭐ {college.rating}{" "}
              <span className="text-gray-400 font-normal">/ 5.0</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs font-medium">Placements</span>
            <span className="font-semibold text-blue-600 text-xs">
              {college.placements.placement_percent}% Placed
            </span>
          </div>
        </div>

        {/* Course tags */}
        <div className="border-t border-gray-50 pt-3 flex flex-col gap-3 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {college.courses.slice(0, 3).map((course) => (
              <span
                key={course.name}
                className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 text-[11px] font-medium rounded-md"
              >
                {course.name}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[11px] font-medium rounded-md">
                +{college.courses.length - 3}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/college/${college.id}`}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold text-xs flex justify-center items-center text-center shadow-sm hover:shadow-md"
            >
              View Details
            </Link>
            {college.website_url && (
              <button
                className="w-full bg-white border border-gray-200 text-gray-600 px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-xs flex justify-center items-center"
                onClick={openWebsite}
              >
                Website ↗
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
