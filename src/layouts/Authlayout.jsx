import React from "react";
import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function Authlayout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-surface-2">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </button>

      {/* Background glow + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-60"
        style={{ backgroundImage: "var(--gradient-surface-glow)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.03)_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left / Brand Panel */}
        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-dark bg-surface-1 px-3 py-2 text-xs text-subtle backdrop-blur hover:brightness-110 transition"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-brand-gradient" />
              Ahara
            </a>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back to{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Ahara
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-subtle">
              Continue your holistic journey—AI-guided yoga & meditation,
              hyper-personalized meals, and your always-on wellness companion.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Real-time posture correction", dot: "var(--color-dot-cyan)" },
                { label: "Hyper-local meal planning", dot: "var(--color-dot-teal)" },
                { label: "AI companion with memory", dot: "var(--color-dot-purple)" },
                { label: "Zen Mode premium content", dot: "var(--color-dot-cyan)" },
              ].map((f, i) => (
                <li
                  key={i}
                  className="glass border border-dark rounded-xl px-4 py-3 text-sm flex items-center gap-3"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: f.dot }}
                  />
                  {f.label}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-3 text-xs text-subtle">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Secure • Private • No spam</span>
            </div>
          </div>
        </section>

        {/* Right / Auth content slot */}
        <section className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          {/* Decorative corner glow for all auth pages */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full blur-2xl opacity-50"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          />
          {children}
        </section>
      </div>
    </main>
  );
}

export default Authlayout;
