import React, { useState, useEffect } from "react";

export default function DepthParallax() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.4 });
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden u-perspective-900">
      {/* existing glows, now gently parallaxed */}
      <div
        className="absolute left-1/2 top-[-10%] -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-cyan-500/20 blur-3xl"
        style={{ transform: `translate3d(${(pos.x - 0.5) * 40}px, ${(pos.y - 0.5) * 40}px, 0)` }}
      />
      <div
        className="absolute right-[-10%] bottom-[-10%] h-[35rem] w-[35rem] rounded-full bg-purple-500/10 blur-3xl"
        style={{ transform: `translate3d(${(0.5 - pos.x) * 50}px, ${(0.5 - pos.y) * 50}px, 0)` }}
      />
      {/* a faint 3D grid plate */}
      <div
        className="absolute left-[8%] bottom-[6%] w-[32rem] h-[18rem] rounded-3xl border border-cyan-400/10"
        style={{
          transform: `rotateX(${(pos.y - 0.5) * 8}deg) rotateY(${(0.5 - pos.x) * 8}deg) translateZ(60px)`,
          background:
            "linear-gradient(transparent, rgba(0,0,0,0.3)), repeating-linear-gradient(90deg, rgba(12,25,35,0.5) 0 1px, transparent 1px 24px), repeating-linear-gradient(0deg, rgba(12,25,35,0.5) 0 1px, transparent 1px 24px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}
