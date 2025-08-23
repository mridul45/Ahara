import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const NAV = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Features", href: "#features" },
  { label: "Zen Mode", href: "#zen" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

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
            <button
              onClick={handleLogin}
              className="px-4 py-2 rounded-xl text-slate-100 border border-dark hover:border-cyan-400/50 transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="px-4 py-2 rounded-xl text-slate-100 border border-dark hover:border-cyan-400/50 transition-colors"
            >
              Sign up
            </button>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-brand-gradient text-slate-900 font-semibold shadow-brand transition"
            >
              Try Zen Mode
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile menu */}
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
              <button onClick={() => { handleLogin(); setOpen(false); }} className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left">
                Login
              </button>
              <button onClick={() => { handleSignup(); setOpen(false); }} className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left">
                Sign up
              </button>
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-left"
              >
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
