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

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {college.rating >= 4.7 && (
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
            ⭐ Top Rated
          </span>
        )}
      </div>

      {/* Image & Logo */}
      <div className="relative h-44 overflow-hidden bg-gray-200">
        {college.image_url ? (
          <img 
            src={college.image_url} 
            alt={college.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-blue-100"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 flex items-end gap-3 w-full pr-8">
          {college.logo_url && (
            <img 
              src={college.logo_url} 
              alt="logo" 
              className="w-14 h-14 rounded-xl border-2 border-white shadow-md bg-white flex-shrink-0"
            />
          )}
          <div className="text-white overflow-hidden">
            <h2 className="text-lg font-bold line-clamp-1">{college.name}</h2>
            <p className="text-xs text-gray-300 flex items-center gap-1">📍 {college.location}</p>
          </div>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="space-y-3 text-gray-600 text-sm mb-4 flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Avg. Fees</span>
            <span className="font-semibold text-green-600">
              ₹{(college.fees_min / 100000).toFixed(1)}L - ₹{(college.fees_max / 100000).toFixed(1)}L / yr
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Rating</span>
            <span className="font-semibold text-gray-900 flex items-center gap-1">
              ⭐ {college.rating} <span className="text-gray-400 font-normal">/ 5.0</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Placements</span>
            <span className="font-semibold text-blue-600">{college.placements.placement_percent}% Placed</span>
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-100 pt-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {college.courses.slice(0, 3).map(course => (
              <span key={course.name} className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 text-xs font-medium rounded-md">
                {course.name}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                +{college.courses.length - 3}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link 
              href={`/college/${college.id}`}
              className="w-full bg-blue-600 text-white px-3 py-2.5 rounded-lg hover:bg-blue-700 transition font-bold text-sm flex justify-center items-center text-center shadow-sm"
            >
              View Details
            </Link>
            {college.website_url && (
              <button 
                className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition font-bold text-sm flex justify-center items-center shadow-sm"
                onClick={openWebsite}
              >
                Website
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
