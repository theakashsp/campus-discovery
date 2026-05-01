"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";

function AbstractShape() {
  const meshRef = useRef<any>(null);
  
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
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Reduced polygon count for performance: 64x16 instead of 128x32 */}
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshPhysicalMaterial 
          color="#3b82f6" 
          metalness={0.6}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return null; // Disable 3D on mobile devices
  }

  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-auto">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} castShadow />
        <PresentationControls
          global
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <AbstractShape />
        </PresentationControls>
        {/* Use simplified environment */}
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={15} blur={2.5} far={8} />
      </Canvas>
    </div>
  );
}
