import React, { useEffect, useRef, useState } from "react";

/* -------------------------------------------
   3D UTILITIES (no deps)
-------------------------------------------- */
function Tilt3D({ children, className = "", max = 12, glare = true, shine = true }) {
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
    <div className={`group [perspective:1200px] will-change-transform ${className}`}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative transition-transform duration-300 [transform-style:preserve-3d]"
        style={style}
      >
        {shine && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.20), transparent 40%)",
              transform: "translateZ(30px)",
            }}
          />
        )}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "conic-gradient(from 180deg at var(--mx) var(--my), rgba(255,255,255,0.08), rgba(255,255,255,0.0) 30% 70%, rgba(255,255,255,0.08))",
              filter: "blur(8px)",
              transform: "translateZ(20px)",
            }}
          />
        )}
        <div className="[transform:translateZ(10px)] relative">{children}</div>
      </div>
    </div>
  );
}

function DepthParallax() {
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [perspective:900px]">
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

/* -------------------------------------------
   NAV + FOOTER (unchanged)
-------------------------------------------- */
const NAV = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Features", href: "#features" },
  { label: "Zen Mode", href: "#zen" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-dark backdrop-blur bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black">A</span>
            <span className="font-semibold tracking-wide text-slate-100">Ahara</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="text-slate-300 hover:text-white transition-colors duration-200 relative group"
              >
                {it.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-brand-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 rounded-xl text-slate-100 border border-dark hover:border-cyan-400/50 transition-colors"
            >
              Login / Sign up
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-brand-gradient text-slate-900 font-semibold shadow-brand transition"
            >
              Try Zen Mode
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              {open ? (
                <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.414 10.586l4.36 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.361-4.36-4.36a1 1 0 0 1 0-1.415Z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-dark py-3">
            <nav className="grid gap-2">
              {NAV.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ))}
              <a href="/login" className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setOpen(false)}>
                Login / Sign up
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-dark bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black">A</span>
              <span className="font-semibold tracking-wide text-slate-100">Ahara</span>
            </div>
            <p className="mt-4 text-sm text-subtle max-w-xs">
              A holistic wellness companion with AI-powered posture correction, personalized nutrition, and authentic mindfulness.
            </p>
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-subtle">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#zen" className="hover:text-white">Zen Mode</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-subtle">
              <li><a href="#vision" className="hover:text-white">Vision</a></li>
              <li><a href="#about" className="hover:text-white">About Ahara</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold">Follow</h4>
            <div className="mt-4 flex gap-3">
              {[
                { label: "X / Twitter", path: "M5 3h14l-7 18L5 3z" },
                { label: "GitHub", path: "M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.25.82-.57v-2c-3.34.73-4-1.6-4-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.82 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.1.81 2.22v3.29c0 .31.21.67.82.56A12 12 0 0 0 12 .5Z" },
                { label: "LinkedIn", path: "M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V21H18v-4.9c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.6V21H10V9Z" },
              ].map((ico) => (
                <a key={ico.label} href="#" aria-label={ico.label} className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d={ico.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-dark pt-6 text-center text-sm text-subtle">© {new Date().getFullYear()} Ahara. All rights reserved.</div>
      </div>
    </footer>
  );
}

/* -------------------------------------------
   FEATURE CARD (now 3D)
-------------------------------------------- */
function FeatureCard({ title, desc, iconPath }) {
  return (
    <Tilt3D className="h-full">
      <div className="group relative rounded-2xl border border-dark bg-surface-2 p-6 shadow-xl shadow-black/20 transition hover:shadow-brand">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-teal-400/10 via-cyan-500/10 to-purple-500/10 opacity-0 blur transition duration-500 group-hover:opacity-100" />
        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 [transform:translateZ(18px)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-cyan-400" fill="currentColor"><path d={iconPath} /></svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 [transform:translateZ(14px)]">{title}</h3>
          <p className="mt-2 text-subtle text-sm leading-relaxed [transform:translateZ(10px)]">{desc}</p>
        </div>
      </div>
    </Tilt3D>
  );
}

/* -------------------------------------------
   PAGE
-------------------------------------------- */
export default function Landing() {
  return (
    <div id="top" className="min-h-screen scroll-smooth bg-[var(--color-bg-dark)] text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <DepthParallax />

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 py-16 md:py-24">
            <div className="flex flex-col justify-center">
              <p className="inline-flex items-center gap-2 self-start rounded-full border border-dark bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-gradient" />
                AI-powered Wellness
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Your holistic companion for <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">mind, body, and nourishment</span>
              </h1>
              <p className="mt-5 max-w-xl text-subtle">
                Ahara unifies yoga & meditation tutorials, <span className="text-slate-200">real-time posture correction</span>, a <span className="text-slate-200">hyper-personalized diet planner</span> using local ingredients, and an engaging AI companion with memory.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 4.5a1 1 0 0 1 1.707-.707l5 5a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 13.5 14.5V13h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6V5.207Z"/></svg>
                </a>
                <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-xl btn-ghost px-5 py-3 font-medium">
                  Explore Features
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-subtle">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-400" /> Real-time voice feedback</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400" /> Local, budget-friendly meals</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-400" /> Zen Mode content</div>
              </div>
            </div>

            {/* Right hero: 3D glass cards */}
            <div className="relative [perspective:1200px]">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[var(--gradient-surface-glow)] blur-2xl" />

              <div className="grid gap-4">
                <Tilt3D>
                  <div className="rounded-2xl border border-dark glass p-5 animate-levitate" style={{ "--z": "0px" }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-100">Pose Accuracy</h3>
                      <span className="text-xs text-subtle">Live</span>
                    </div>
                    <div className="mt-4 h-28 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 p-4 [transform:translateZ(14px)]">
                      <div className="flex h-full items-end gap-1">
                        {[60, 75, 68, 82, 90, 94, 97].map((v, i) => (
                          <div key={i} className="flex-1">
                            <div className="mx-auto w-3 rounded bg-cyan-500/70" style={{ height: `${Math.max(18, v / 1.4)}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-subtle">AI posture correction progressively improves your alignment.</p>
                  </div>
                </Tilt3D>

                <Tilt3D>
                  <div className="rounded-2xl border border-dark glass p-5 animate-levitate-slow" style={{ "--z": "0px" }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-100">Today’s Meal Plan</h3>
                      <span className="text-xs text-subtle">Within 10–12 km</span>
                    </div>
                    <ul className="mt-3 grid gap-2 text-sm text-slate-300 [transform:translateZ(12px)]">
                      <li className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                        <span>Oats upma + curd</span>
                        <span className="text-xs text-subtle">₹</span>
                      </li>
                      <li className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                        <span>Moong dal khichdi</span>
                        <span className="text-xs text-subtle">₹₹</span>
                      </li>
                      <li className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                        <span>Grilled paneer salad</span>
                        <span className="text-xs text-subtle">₹₹</span>
                      </li>
                    </ul>
                    <p className="mt-3 text-xs text-subtle">Ingredients matched to your location and budget.</p>
                  </div>
                </Tilt3D>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / VISION */}
      <section id="about" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">What is Ahara?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-subtle">
            A next-gen wellness platform that blends modern AI with authentic mindfulness. Practice yoga, meditate, eat better, and chat with a caring AI companion that remembers your preferences.
          </p>
        </div>
      </section>

      <section id="vision" className="py-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-dark bg-surface-2 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold text-slate-100">Our Vision</h3>
                <p className="mt-3 text-subtle">
                  Enable sustainable habit change by removing real-world barriers: real-time pose feedback, location-aware meal planning, and delightful guidance that feels like a companion—not an app.
                </p>
              </div>
              <ul className="grid gap-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-400"/> AI-driven personalization</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400"/> Integrated mind-body-nutrition</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-400"/> Authentic spiritual content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Everything you need in one place</h2>
          <p className="mt-3 text-center text-subtle">From posture to plates to peace of mind—beautifully integrated.</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Yoga & Meditation Tutorials" desc="Guided sessions for all levels with calm visuals and mindful pacing." iconPath="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm0 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 12a7 7 0 0 1-5.65-2.82A5 5 0 0 1 12 13a5 5 0 0 1 5.65 3.18A7 7 0 0 1 12 19Z" />
            <FeatureCard title="Real-time Posture Correction" desc="Vision AI gives instant voice & visual cues as you practice." iconPath="M4 4h16v4H4V4Zm0 6h10v10H4V10Zm12 6h4v4h-4v-4Z" />
            <FeatureCard title="Personalized Diet Plans" desc="Smart plans based on your goals, preferences, and routines." iconPath="M4 7h16v2H4V7Zm0 4h16v2H4v-2Zm0 4h10v2H4v-2Z" />
            <FeatureCard title="Local Ingredient Sourcing" desc="Find affordable ingredients available within 10–12 km." iconPath="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            <FeatureCard title="AI Companion with Memory" desc="Chat with a companion that learns your style and keeps context." iconPath="M12 3a9 9 0 0 0-9 9 9.01 9.01 0 0 0 6 8.485V21l3-1 3 1v-.515A9.01 9.01 0 0 0 21 12a9 9 0 0 0-9-9Z" />
            <FeatureCard title="AI-powered Meal Tracker" desc="Log meals effortlessly and get adaptive nutrition nudges." iconPath="M7 4h10v2H7V4Zm-2 4h14v12H5V8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z" />
          </div>
        </div>
      </section>

      {/* ZEN MODE */}
      <section id="zen" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-surface-2 p-8 md:p-12">
            <div className="absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" aria-hidden />
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-bold text-slate-100">Zen Mode</h3>
                <p className="mt-3 text-subtle">Unlock advanced meditations, sutras, and mantras taught by verified monastic teachers. Designed for deeper practice and stillness.</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-400"/> Authentic spiritual content</li>
                  <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400"/> Progressive courses & rituals</li>
                  <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-400"/> Distraction-free mode</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <a href="#pricing" className="inline-flex items-center justify-center rounded-xl bg-zen-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand">Get Zen Mode</a>
                  <a href="#features" className="inline-flex items-center justify-center rounded-xl btn-ghost px-5 py-3">See features</a>
                </div>
              </div>
              <Tilt3D>
                <div className="rounded-2xl border border-dark glass p-6 animate-levitate">
                  <div className="text-sm text-slate-300">Monk-led mantra • 12 min</div>
                  <div className="mt-3 h-36 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 [transform:translateZ(12px)]" />
                  <p className="mt-3 text-xs text-subtle">Binaural serenity • Offline access • No ads</p>
                </div>
              </Tilt3D>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Simple pricing</h2>
          <p className="mt-3 text-center text-subtle">Start free. Upgrade when you want the full experience.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="relative rounded-3xl border border-dark bg-surface-2 p-8">
              <h3 className="text-xl font-semibold text-slate-100">Basic</h3>
              <p className="mt-1 text-subtle">Core tutorials, meal planner, and chat companion.</p>
              <div className="mt-6 text-4xl font-black">₹0<span className="text-base font-medium text-subtle"> / forever</span></div>
              <ul className="mt-6 grid gap-2 text-sm text-slate-300">
                <li>• Yoga & meditation library (starter)</li>
                <li>• AI posture tips (lite)</li>
                <li>• Personalized diet plan (basic)</li>
                <li>• Meal tracker</li>
              </ul>
              <a href="/login" className="mt-8 inline-flex w-full items-center justify-center rounded-xl btn-ghost px-5 py-3">Get started</a>
            </div>

            <div className="relative rounded-3xl border border-cyan-400/20 bg-surface-2 p-8 ring-1 ring-inset ring-cyan-400/10">
              <div className="absolute right-6 top-6 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-slate-900">Popular</div>
              <h3 className="text-xl font-semibold text-slate-100">Zen Mode</h3>
              <p className="mt-1 text-subtle">Advanced content, voice coaching, and deeper analytics.</p>
              <div className="mt-6 text-4xl font-black">₹299<span className="text-base font-medium text-subtle"> / month</span></div>
              <ul className="mt-6 grid gap-2 text-sm text-slate-300">
                <li>• Advanced monk-led meditations</li>
                <li>• Real-time voice corrections</li>
                <li>• Local ingredient optimizer</li>
                <li>• Practice analytics & streaks</li>
                <li>• Offline mode</li>
              </ul>
              <a href="/login" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand">Start Zen</a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-dark bg-surface-2 p-10 text-center">
            <h3 className="text-3xl font-bold text-slate-100">Ready to begin your practice?</h3>
            <p className="mt-2 text-subtle">Join Ahara and experience posture-perfect yoga, mindful nutrition, and a caring AI companion.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="/login" className="inline-flex items-center justify-center rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-slate-900 shadow-brand">Create free account</a>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl btn-ghost px-6 py-3">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* tiny CSS for float animations */}
      <style>{`
        @keyframes levitate {
          0%,100% { transform: translateY(0) translateZ(var(--z,0)); }
          50%     { transform: translateY(-8px) translateZ(var(--z,0)); }
        }
        @keyframes levitate-slow {
          0%,100% { transform: translateY(0) translateZ(var(--z,0)); }
          50%     { transform: translateY(-5px) translateZ(var(--z,0)); }
        }
        .animate-levitate { animation: levitate 6s ease-in-out infinite; }
        .animate-levitate-slow { animation: levitate-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}