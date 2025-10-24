import React from 'react';

export default function Footer() {
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
