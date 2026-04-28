import Link from 'next/link';

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

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 p-6 border border-gray-100 flex flex-col h-full relative group">
      
      {/* Badges */}
      <div className="absolute -top-3 -right-3 flex flex-col gap-1 items-end z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {college.rating >= 4.7 && (
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
            ⭐ Top Rated
          </span>
        )}
        {college.placements.placement_percent >= 95 && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            🚀 Highly Placed
          </span>
        )}
      </div>

      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {college.type}
        </span>
      </div>

      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2 pr-4 mb-4">{college.name}</h2>
        
        <div className="space-y-3 text-gray-600 text-sm">
          <div className="flex items-center">
            <span className="text-lg mr-2">📍</span>
            <span className="truncate">{college.location}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">💰</span>
            <span className="font-semibold text-gray-900">
              ₹{(college.fees_min / 100000).toFixed(1)}L - ₹{(college.fees_max / 100000).toFixed(1)}L
            </span> / year
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">⭐</span>
            <span className="font-semibold text-gray-900">{college.rating}</span> / 5.0
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">📈</span>
            <span className="font-semibold text-green-600">{college.placements.placement_percent}%</span> Placed ({college.placements.avg_package})
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {college.courses.slice(0, 3).map(course => (
            <span key={course.name} className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 text-xs font-medium rounded-full">
              {course.name}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
              +{college.courses.length - 3} more
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link 
            href={`/college/${college.id}`}
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm flex justify-center items-center text-center"
          >
            View Details
          </Link>
          {college.website_url && (
            <button 
              className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition font-medium text-sm flex justify-center items-center gap-2"
              onClick={openWebsite}
            >
              Website
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
