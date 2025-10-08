// src/layouts/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Features", href: "#features" },
  { label: "Zen Mode", href: "#zen" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

/**
 * ClassKeeper:
 * Ensures Tailwind keeps the blur/opacity utilities we toggle.
 * This avoids production differences when classes are conditionally applied.
 * (Hidden, zero footprint.)
 */
function ClassKeeper() {
  return (
    <div className="hidden">
      {/* blur variants we might toggle */}
      <div className="backdrop-blur backdrop-blur-sm backdrop-blur-md backdrop-blur-lg backdrop-blur-xl" />
      {/* glass tints we might toggle */}
      <div className="bg-white/5 bg-white/10 bg-white/15 bg-white/20 bg-slate-900/10 bg-slate-900/20 bg-slate-900/30" />
      {/* borders we might toggle */}
      <div className="border-white/10 border-white/20 border-dark" />
      {/* generic tokens used in combinations */}
      <div className="liquid-glass shadow-brand bg-brand-gradient bg-zen-gradient" />
    </div>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (!scrolled && y > 12) setScrolled(true);
      if (scrolled && y < 6) setScrolled(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  const handleAnchorClick = () => setOpen(false);
  const Spacer = () => (
    <div className={scrolled ? "h-6 md:h-8" : "h-0"} aria-hidden />
  );

  return (
    <>
      <ClassKeeper />
      <Spacer />

      <header
        role="banner"
        className={
          scrolled
            ? "fixed inset-x-0 top-4 z-50 pointer-events-none"
            : // sticky state uses backdrop + surface tint (literal classes)
              "sticky top-0 z-50 border-b border-dark backdrop-blur bg-surface-2/80"
        }
      >
        <div
          className={[
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            "transition-all duration-300 ease-out",
            scrolled ? "pointer-events-none" : "pointer-events-auto",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center justify-between",
              scrolled
                ? // glass capsule (no dynamic class fragments)
                  "liquid-glass rounded-full border border-white/10 shadow-brand my-0 px-3 md:px-4 py-2 md:py-2.5 pointer-events-auto"
                : "px-0 py-0",
            ].join(" ")}
          >
            {/* BRAND + Vyas AI chip */}
            <div
              className={
                scrolled
                  ? "flex items-center gap-2 md:gap-3 px-1.5 md:px-2"
                  : "flex items-center gap-2 md:gap-3 py-3 md:py-4"
              }
            >
              <a href="#top" className="flex items-center gap-2" aria-label="Ahara - Home">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black">
                  A
                </span>
                <span className="font-semibold tracking-wide text-slate-100">
                  Ahara
                </span>
              </a>

              {/* Vyas AI logo-chip -> /vland */}
              <Link
                to="/vland"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition"
                aria-label="Open Vyas AI landing"
              >
                <span aria-hidden className="h-5 w-5 rounded-md bg-zen-gradient shadow-brand" />
                <span className="text-sm font-medium">Vyas</span>
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
              {NAV.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={handleAnchorClick}
                  className="relative group text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {it.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-brand-gradient transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-slate-100 border border-white/10 transition-all duration-200 hover:scale-105 hover:border-cyan-400/50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl text-slate-100 border border-white/10 transition-all duration-200 hover:scale-105 hover:border-cyan-400/50"
              >
                Sign up
              </Link>
              <a
                href="#pricing"
                className="px-4 py-2 rounded-xl bg-brand-gradient text-slate-900 font-semibold shadow-brand transition-all duration-200 hover:scale-105"
              >
                Try Zen Mode
              </a>
              <button
                onClick={toggleTheme}
                className="ml-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* MOBILE: hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                {open ? (
                  <path
                    fillRule="evenodd"
                    d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.414 10.586l4.36 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.361-4.36-4.36a1 1 0 0 1 0-1.415Z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* MOBILE DROPDOWN */}
          {open && (
            <div
              className={[
                "md:hidden mt-2",
                // same glass as desktop to avoid visual diff
                "liquid-glass rounded-2xl border border-white/10 p-2 pointer-events-auto",
              ].join(" ")}
            >
              <nav className="grid gap-1" aria-label="Mobile">
                <Link
                  to="/vland"
                  onClick={handleAnchorClick}
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition inline-flex items-center gap-2"
                >
                  <span aria-hidden className="h-5 w-5 rounded-md bg-zen-gradient" />
                  <span>Vyas</span>
                </Link>

                {NAV.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    onClick={handleAnchorClick}
                    className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    {it.label}
                  </a>
                ))}

                <Link
                  to="/login"
                  onClick={handleAnchorClick}
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={handleAnchorClick}
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
                >
                  Sign up
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    handleAnchorClick();
                  }}
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left"
                >
                  {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
