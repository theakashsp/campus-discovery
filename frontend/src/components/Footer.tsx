import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                C
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Campus Compare
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The ultimate destination to discover, compare, and apply to top
              institutions across India. Real data, real insights.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                { label: "Twitter", icon: "𝕏" },
                { label: "LinkedIn", icon: "in" },
                { label: "Instagram", icon: "📷" },
                { label: "YouTube", icon: "▶" },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">
              Top Colleges
            </h4>
            <ul className="space-y-3">
              {[
                { label: "B.Tech Colleges", href: "/search?query=B.Tech" },
                { label: "MBA Colleges", href: "/search?query=MBA" },
                { label: "Medical Colleges", href: "/search?query=MBBS" },
                { label: "All Colleges", href: "/search" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">
              Entrance Exams
            </h4>
            <ul className="space-y-3">
              {[
                { label: "JEE Main", href: "/search?query=JEE" },
                { label: "NEET", href: "/search?query=NEET" },
                { label: "CAT", href: "/search?query=CAT" },
                { label: "GATE", href: "/search?query=GATE" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Campus Compare. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-600">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
