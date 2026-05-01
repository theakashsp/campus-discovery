import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            About <span className="text-blue-400">Campus Compare</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We&apos;re building India&apos;s most comprehensive college discovery platform — helping
            students make informed decisions about their future with real data, real insights.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Choosing the right college is one of the most important decisions a student makes.
                Yet, finding reliable, comprehensive information about institutions across India remains a challenge.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Campus Compare aggregates data from 100+ premier institutions — covering fees, placements,
                courses, rankings, and admission processes — so you can compare and choose with confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { stat: "100+", label: "Colleges Listed" },
                { stat: "500+", label: "Courses Covered" },
                { stat: "50K+", label: "Students Helped" },
                { stat: "28", label: "States Covered" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-3xl font-extrabold text-blue-600 mb-1">{item.stat}</p>
                  <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Data-Driven",
                desc: "Every data point is sourced from official records, NIRF rankings, and verified placement reports.",
              },
              {
                icon: "🎯",
                title: "Student-First",
                desc: "We design every feature around what students actually need — no clutter, no bias, no paid rankings.",
              },
              {
                icon: "🔓",
                title: "Free & Open",
                desc: "Access to college information should be free. We don't gatekeep data behind paywalls or registrations.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Explore?</h2>
          <p className="text-gray-500 text-lg mb-8">
            Start comparing colleges today and find your perfect fit.
          </p>
          <Link
            href="/search"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all hover:-translate-y-0.5"
          >
            Explore Colleges →
          </Link>
        </div>
      </section>
    </div>
  );
}
