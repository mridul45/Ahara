import React from 'react';
import Tilt3D from "../utils/Tilt3D";

export default function FeatureCard({ title, desc, iconPath }) {
  return (
    <Tilt3D className="h-full">
      <div className="group relative rounded-2xl border border-dark bg-surface-2 p-6 shadow-xl shadow-black/20 transition hover:shadow-brand">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-teal-400/10 via-cyan-500/10 to-purple-500/10 opacity-0 blur transition duration-500 group-hover:opacity-100" />
        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 depth-z-18">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-cyan-400" fill="currentColor"><path d={iconPath} /></svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 depth-z-14">{title}</h3>
          <p className="mt-2 text-subtle text-sm leading-relaxed depth-z-10">{desc}</p>
        </div>
      </div>
    </Tilt3D>
  );
}
