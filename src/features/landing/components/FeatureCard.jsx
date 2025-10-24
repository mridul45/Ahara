import React from 'react';

export default function FeatureCard({ title, desc, iconPath }) {
  return (
    <div className="h-full rounded-2xl border border-dark bg-surface-2 p-6 shadow-lg shadow-black/15 transition-colors hover:border-cyan-400/60">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-cyan-400"
          fill="currentColor"
        >
          <path d={iconPath} />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-3 text-subtle text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
