import { useEffect, useRef } from "react";

/**
 * InteractiveBackdrop
 * --------------------
 * Renders a trio of animated aurora orbs that react to pointer movement.
 * Uses CSS custom properties driven by requestAnimationFrame to avoid layout thrash.
 */
export default function InteractiveBackdrop({
  className = "",
  colors = [
    "rgba(34,211,238,0.55)",
    "rgba(168,85,247,0.5)",
    "rgba(56,189,248,0.45)",
  ],
  radii = [34, 32, 24], // rem units → converted to px below
  pointerStrength = 260,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: 0.5, y: 0.45 };
    const current = { x: 0.5, y: 0.45 };
    const base = [
      { x: -180, y: -200, wobble: 70, scale: 1.05 },
      { x: 220, y: 160, wobble: 80, scale: 0.95 },
      { x: -40, y: 220, wobble: 60, scale: 0.9 },
    ];

    let raf = 0;
    let t = 0;

    const updatePointer = (event) => {
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
    }

    const step = () => {
      t += 0.016;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      const influenceX = (current.x - 0.5) * pointerStrength;
      const influenceY = (current.y - 0.5) * pointerStrength;

      base.forEach((origin, idx) => {
        const x = origin.x + influenceX * (0.35 + idx * 0.2) + Math.sin(t * (0.6 + idx * 0.15)) * origin.wobble;
        const y = origin.y + influenceY * (0.3 + idx * 0.18) + Math.cos(t * (0.5 + idx * 0.17)) * origin.wobble;
        const scale = origin.scale + Math.sin(t * (0.9 + idx * 0.12)) * 0.08;

        node.style.setProperty(`--orb-${idx}-x`, `${x}px`);
        node.style.setProperty(`--orb-${idx}-y`, `${y}px`);
        node.style.setProperty(`--orb-${idx}-scale`, scale.toFixed(3));
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [pointerStrength]);

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {colors.slice(0, 3).map((color, idx) => {
        const sizeRem = radii[idx] ?? radii[0];
        const sizePx = `${sizeRem}rem`;
        return (
          <span
            key={idx}
            aria-hidden="true"
            className="absolute rounded-full mix-blend-screen blur-[140px] opacity-80 transition-opacity duration-500"
            style={{
              width: sizePx,
              height: sizePx,
              background: `radial-gradient(circle at center, ${color}, rgba(255,255,255,0.02) 68%, transparent 80%)`,
              transform: `translate3d(var(--orb-${idx}-x, 0px), var(--orb-${idx}-y, 0px), 0) scale(var(--orb-${idx}-scale, 1))`,
            }}
          />
        );
      })}
    </div>
  );
}
