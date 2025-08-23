import React, { useRef, useState } from "react";

export default function Tilt3D({ children, className = "", max = 12, glare = true, shine = true }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg) translateZ(0)" });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const rx = (py - 0.5) * -2 * max;                 // invert X for natural feel
    const ry = (px - 0.5) * 2 * max;

    setStyle({
      transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      "--mx": `${px * 100}%`,
      "--my": `${py * 100}%`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg) translateZ(0)" });
  };

  return (
    <div className={`group u-perspective-1200 u-will-change-transform ${className}`}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative transition-transform duration-300 u-preserve-3d"
        style={style}
      >
        {shine && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 depth-z-30"
            style={{
              background:
                "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.20), transparent 40%)",
            }}
          />
        )}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 depth-z-20"
            style={{
              background:
                "conic-gradient(from 180deg at var(--mx) var(--my), rgba(255,255,255,0.08), rgba(255,255,255,0.0) 30% 70%, rgba(255,255,255,0.08))",
              filter: "blur(8px)",
            }}
          />
        )}
        <div className="relative depth-z-10">{children}</div>
      </div>
    </div>
  );
}
