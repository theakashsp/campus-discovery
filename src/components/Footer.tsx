import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">C</div>
            <span className="font-extrabold text-xl text-gray-900">Campus Compare</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">The ultimate destination to discover, compare, and apply to top institutions across India.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Top Colleges</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/search?query=B.Tech" className="hover:text-blue-600">B.Tech Colleges</Link></li>
            <li><Link href="/search?query=MBA" className="hover:text-blue-600">MBA Colleges</Link></li>
            <li><Link href="/search?query=MBBS" className="hover:text-blue-600">Medical Colleges</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Exams</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/search?query=JEE" className="hover:text-blue-600">JEE Main</Link></li>
            <li><Link href="/search?query=NEET" className="hover:text-blue-600">NEET</Link></li>
            <li><Link href="/search?query=CAT" className="hover:text-blue-600">CAT</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Campus Compare. Built with Next.js &amp; Tailwind.
      </div>
    </footer>
  );
}
