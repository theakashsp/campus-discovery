"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function AbstractShape() {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
      meshRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshPhysicalMaterial 
          color="#3b82f6" 
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

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
      <section className="relative h-[85vh] flex items-center bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
            <pointLight position={[-10, -10, -10]} />
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <AbstractShape />
            </PresentationControls>
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
              Find and Compare the <span className="text-blue-400">Best Colleges</span> in India
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl font-medium">
              Your gateway to 100+ premium institutions. Real data, real websites, real futures.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-3xl shadow-2xl group">
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
                className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white font-bold px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                Search
              </button>
            </form>

            <div className="mt-8 flex gap-4 text-blue-200 text-sm font-medium">
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