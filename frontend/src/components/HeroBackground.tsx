"use client";

/**
 * HeroBackground — Lightweight CSS-animated background for the homepage hero.
 * Replaces the heavy Three.js Hero3D component (~500KB savings).
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient base */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 25%, #1e40af 50%, #312e81 75%, #0f172a 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 animate-float"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute top-1/2 -left-32 w-80 h-80 rounded-full opacity-15 animate-float"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          animationDelay: "2s",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full opacity-10 animate-float"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          animationDelay: "4s",
          animationDuration: "10s",
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
