import { College } from './CollegeCard';

interface CompareTableProps {
  selectedColleges: College[];
  onClear: () => void;
}

export default function CompareTable({ selectedColleges, onClear }: CompareTableProps) {
  if (selectedColleges.length < 2) return null;

  // Find highlights
  const highestRating = Math.max(...selectedColleges.map(c => c.rating));
  const highestPlacement = Math.max(...selectedColleges.map(c => c.placement_percent));
  const lowestFees = Math.min(...selectedColleges.map(c => c.fees_min));
  const highestAvgPackage = Math.max(...selectedColleges.map(c => c.avg_package));

  return (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Compare Colleges</h2>
        <button
          onClick={onClear}
          className="text-sm px-4 py-2 bg-red-50 text-red-600 font-medium rounded hover:bg-red-100 transition"
        >
          Clear Selection
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-gray-200 bg-gray-50 text-gray-600 font-semibold w-1/4">Feature</th>
              {selectedColleges.map(c => (
                <th key={c.id} className="p-4 border-b-2 border-gray-200 bg-gray-50 text-gray-800 font-bold text-lg w-1/4">
                  {c.name}
                </th>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <th key={`empty-h-${i}`} className="p-4 border-b-2 border-gray-200 bg-gray-50 text-gray-400 font-medium italic w-1/4">
                  Add college to compare
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Type */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Type</td>
              {selectedColleges.map(c => (
                <td key={c.id} className="p-4 border-b border-gray-100 text-gray-800 font-medium">{c.type}</td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-t-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Location</td>
              {selectedColleges.map(c => (
                <td key={c.id} className="p-4 border-b border-gray-100 text-gray-800">{c.location}</td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-l-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>
            
            {/* Fees */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Fees (per year)</td>
              {selectedColleges.map(c => (
                <td 
                  key={c.id} 
                  className={`p-4 border-b border-gray-100 font-medium ${c.fees_min === lowestFees ? 'text-green-600 bg-green-50' : 'text-gray-800'}`}
                >
                  ₹{(c.fees_min / 100000).toFixed(1)}L - ₹{(c.fees_max / 100000).toFixed(1)}L
                  {c.fees_min === lowestFees && <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Lowest</span>}
                </td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-f-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>
            
            {/* Rating */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Rating (out of 5)</td>
              {selectedColleges.map(c => (
                <td 
                  key={c.id} 
                  className={`p-4 border-b border-gray-100 font-medium ${c.rating === highestRating ? 'text-blue-600 bg-blue-50' : 'text-gray-800'}`}
                >
                  {c.rating}
                  {c.rating === highestRating && <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Highest</span>}
                </td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-r-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>
            
            {/* Placement */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Placement %</td>
              {selectedColleges.map(c => (
                <td 
                  key={c.id} 
                  className={`p-4 border-b border-gray-100 font-medium ${c.placement_percent === highestPlacement ? 'text-green-600 bg-green-50' : 'text-gray-800'}`}
                >
                  {c.placement_percent}%
                  {c.placement_percent === highestPlacement && <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Best</span>}
                </td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-p-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>

            {/* Average Package */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Avg Package</td>
              {selectedColleges.map(c => (
                <td 
                  key={c.id} 
                  className={`p-4 border-b border-gray-100 font-medium ${c.avg_package === highestAvgPackage ? 'text-green-600 bg-green-50' : 'text-gray-800'}`}
                >
                  {c.avg_package} LPA
                  {c.avg_package === highestAvgPackage && <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Highest</span>}
                </td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-ap-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>

            {/* Courses */}
            <tr>
              <td className="p-4 border-b border-gray-100 font-medium text-gray-600 bg-gray-50">Courses Offered</td>
              {selectedColleges.map(c => (
                <td key={c.id} className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {c.courses.map(course => (
                      <span key={course.name} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {course.name}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                <td key={`empty-c-${i}`} className="p-4 border-b border-gray-100"></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
