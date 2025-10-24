import React, { useEffect, useMemo, useRef } from "react";
import { User, Camera } from "lucide-react";

/* -------------------------- small utils -------------------------- */
export const cx = (...xs) => xs.filter(Boolean).join(" ");
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/* -------------------------- Circular Avatar with Halo -------------------------- */
export function HaloAvatar({ src, alt = "avatar", size = 112 }) {
  const haloId = useMemo(() => `halo-${Math.random().toString(36).slice(2)}`, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Subtle cyan-purple halo glow */}
      <svg
        width={size + 30}
        height={size + 30}
        className="absolute -inset-[6px] -z-10"
        viewBox="0 0 100 100"
      >
        <defs>
          <radialGradient id={haloId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
            <stop offset="60%" stopColor="rgba(168,85,247,0.5)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill={`url(#${haloId})`} />
      </svg>

      {/* ✅ Circular avatar */}
      <div className="rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-brand w-full h-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-white/5 rounded-full">
            <User size={36} className="opacity-70" />
          </div>
        )}
      </div>

      {/* Camera button */}
      <button
        className="absolute -bottom-2 -right-2 btn-brand grid place-items-center !p-2 rounded-full shadow-md"
        title="Change photo"
      >
        <Camera size={14} />
      </button>
    </div>
  );
}

/* -------------------------- Ring Gauge -------------------------- */
export function Gauge({ value = 0, size = 120, label, sub, stroke = 10 }) {
  const pct = clamp(value, 0, 100);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id="gaugeBrand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-cyan-400)" />
            <stop offset="100%" stopColor="var(--color-purple-400)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gaugeBrand)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="drop-shadow-[0_8px_24px_rgba(34,211,238,0.3)]"
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-semibold">{Math.round(pct)}%</div>
          {label && <div className="text-xs text-subtle">{label}</div>}
          {sub && <div className="text-[11px] text-subtle/80 mt-0.5">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Metric card -------------------------- */
export const Metric = ({ icon: Icon, label, value, hint }) => (
  <div className="glass rounded-2xl p-5 border border-dark hover:border-cyan-400/40 transition-all">
    <div className="flex items-center justify-between">
      <div className="text-xs text-subtle">{label}</div>
      <div className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-dark">
        <Icon size={16} className="text-cyan-400" />
      </div>
    </div>
    <div className="mt-2 text-2xl font-semibold">{value}</div>
    {hint && <div className="mt-1 text-[11px] text-subtle">{hint}</div>}
  </div>
);

/* -------------------------- Timeline Item -------------------------- */
export const LineItem = ({ icon: Icon, title, meta }) => (
  <div className="relative pl-8 pb-6">
    <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-white/10" />
    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white/6 border border-dark grid place-items-center">
      <Icon size={12} className="text-cyan-300" />
    </div>
    <div className="text-sm font-medium">{title}</div>
    {meta && <div className="text-xs text-subtle">{meta}</div>}
  </div>
);

/* -------------------------- Segmented Control -------------------------- */
export function Segments({ value, onChange, items }) {
  const pillRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const i = items.findIndex((x) => x.key === value);
    const container = containerRef.current;
    const pill = pillRef.current;
    if (!container || !pill || i < 0) return;
    const btn = container.querySelectorAll("button")[i];
    if (!btn) return;
    const { offsetLeft, offsetWidth } = btn;
    pill.style.transform = `translateX(${offsetLeft}px)`;
    pill.style.width = `${offsetWidth}px`;
  }, [value, items]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-full p-1 bg-white/5 border border-dark inline-flex gap-1"
    >
      <div
        ref={pillRef}
        className="absolute top-1 bottom-1 rounded-full bg-brand-gradient shadow-brand transition-transform duration-300"
        style={{ width: 0, transform: "translateX(0px)" }}
        aria-hidden
      />
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={cx(
            "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            value === it.key ? "text-slate-900" : "text-text-secondary hover:text-text-primary"
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
