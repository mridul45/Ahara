import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tilt3D from "../utils/Tilt3D";
import DepthParallax from "../utils/DepthParallax";
import Navbar from "../layouts/components/Navbar";
import Footer from "../layouts/components/Footer";
import FeatureCard from "../components/FeatureCard";

/* -------------------------------------------
   PAGE
-------------------------------------------- */
export default function Landing() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or system preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark'; // Default to dark if not in browser environment
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div id="top" className="min-h-screen scroll-smooth bg-[var(--color-bg-dark)] text-slate-200 selection:bg-cyan-500/30">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
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
                <button onClick={handleLogin} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 4.5a1 1 0 0 1 1.707-.707l5 5a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 13.5 14.5V13h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6V5.207Z"/></svg>
                </button>
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
            <div className="relative u-perspective-1200">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[var(--gradient-surface-glow)] blur-2xl" />

              <div className="grid gap-4">
                <Tilt3D>
                  <div className="rounded-2xl border border-dark glass p-5 animate-levitate" style={{ "--z": "0px" }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-100">Pose Accuracy</h3>
                      <span className="text-xs text-subtle">Live</span>
                    </div>
                    <div className="mt-4 h-28 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 p-4 depth-z-14">
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
                    <ul className="mt-3 grid gap-2 text-sm text-slate-300 depth-z-12">
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 md:py-24 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-center text-subtle">A simple and effective journey to wellness.</p>

          <div className="mt-10 grid gap-10 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black text-2xl">1</div>
              <h3 className="text-lg font-semibold text-slate-100">Sign Up</h3>
              <p className="mt-2 text-subtle text-sm leading-relaxed">Create your account and set your wellness goals.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black text-2xl">2</div>
              <h3 className="text-lg font-semibold text-slate-100">Practice</h3>
              <p className="mt-2 text-subtle text-sm leading-relaxed">Follow guided sessions with real-time feedback.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black text-2xl">3</div>
              <h3 className="text-lg font-semibold text-slate-100">Nourish</h3>
              <p className="mt-2 text-subtle text-sm leading-relaxed">Get personalized meal plans for your needs.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black text-2xl">4</div>
              <h3 className="text-lg font-semibold text-slate-100">Connect</h3>
              <p className="mt-2 text-subtle text-sm leading-relaxed">Chat with your AI companion and track your progress.</p>
            </div>
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
                  <div className="mt-3 h-36 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 depth-z-12" />
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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Free */}
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
              <button onClick={handleLogin} className="mt-8 inline-flex w-full items-center justify-center rounded-xl btn-ghost px-5 py-3">Get started</button>
            </div>

            {/* Pro */}
            <div className="relative rounded-3xl border border-purple-400/20 bg-surface-2 p-8 ring-1 ring-inset ring-purple-400/10">
              <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 px-3 py-1 text-xs font-semibold text-slate-900">Most Popular</div>
              <h3 className="text-xl font-semibold text-slate-100">Pro</h3>
              <p className="mt-1 text-subtle">Everything in Basic, plus advanced features.</p>
              <div className="mt-6 text-4xl font-black">₹199<span className="text-base font-medium text-subtle"> / month</span></div>
              <ul className="mt-6 grid gap-2 text-sm text-slate-300">
                <li>• Everything in Basic</li>
                <li>• Real-time voice corrections</li>
                <li>• Local ingredient optimizer</li>
                <li>• Practice analytics & streaks</li>
              </ul>
              <button onClick={handleLogin} className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand">Get Pro</button>
            </div>

            {/* Zen Mode */}
            <div className="relative rounded-3xl border border-dark bg-surface-2 p-8">
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
              <button onClick={handleLogin} className="mt-8 inline-flex w-full items-center justify-center rounded-xl btn-ghost px-5 py-3">Start Zen</button>
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
              <button onClick={handleLogin} className="inline-flex items-center justify-center rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-slate-900 shadow-brand">Create free account</button>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl btn-ghost px-6 py-3">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}