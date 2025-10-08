// src/pages/VyasLanding.jsx



/**
 * Vyas — AI Wellness Companion (Landing)
 * - Uses your index.css tokens: .background-3d-effect, .liquid-glass, .card-3d-glow, gradients
 * - No extra libs; responsive; accessible; dark-first; light overrides supported by your CSS
 * - Sections: Hero, Proof/Logos, Feature Grid, Live Demo CTA, How it works, FAQ, Footer
 */

export default function VyasLanding() {
  return (
    <div className="relative min-h-screen overflow-clip">
      {/* global animated 3D glow background (already defined in index.css) */}
      <div className="background-3d-effect" />

      {/* top nav */}
      <header className="sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-5 py-4">
          <div className="liquid-glass flex items-center justify-between rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Simple Vyas mark (pure CSS gradient dot) — replace with your asset if you have one */}
              <span
                aria-hidden
                className="h-7 w-7 rounded-lg bg-brand-gradient shadow-brand"
              />
              <span className="font-semibold tracking-tight">Vyas</span>
              <span className="text-subtle hidden sm:inline">by Ahara</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="hover:opacity-80 transition">Features</a>
              <a href="#how" className="hover:opacity-80 transition">How it works</a>
              <a href="#faq" className="hover:opacity-80 transition">FAQ</a>
              <Link
                to="/chat"
                className="btn-brand inline-flex items-center gap-2"
                aria-label="Open Vyas chat"
              >
                <Sparkles className="h-4 w-4" />
                Try the Chat
              </Link>
            </div>

            <div className="md:hidden">
              <Link
                to="/chat"
                className="btn-brand inline-flex items-center gap-2 text-sm"
              >
                Try
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-dark px-3 py-1 text-xs text-subtle mb-4">
              <Stars className="h-3.5 w-3.5" />
              AI Wellness Companion • Real-time guidance
            </div>

            <h1 className="font-bold tracking-tight text-4xl leading-tight md:text-6xl">
              Meet <span className="bg-brand-gradient bg-clip-text text-transparent">Vyas</span>, your calm,
              smart guide for<br className="hidden md:block" /> yoga, nutrition & mindfulness.
            </h1>

            <p className="mt-5 text-subtle text-base md:text-lg max-w-prose">
              Vyas blends posture-aware coaching, hyper-local diet plans, and soothing meditation prompts
              into one conversational companion. Built for real life, not just streaks.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/chat" className="btn-brand inline-flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Start a Session
              </Link>
              <a href="#features" className="btn-ghost inline-flex items-center gap-2">
                Explore Features
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* trust strip */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Pose-aware", <Move3D key="m" className="h-4 w-4" />],
                ["Voice cues", <AudioLines key="a" className="h-4 w-4" />],
                ["Private by design", <ShieldCheck key="s" className="h-4 w-4" />],
                ["Local ingredients", <MapPin key="p" className="h-4 w-4" />],
              ].map(([label, icon], i) => (
                <div
                  key={i}
                  className="liquid-glass rounded-xl px-3 py-2 text-sm flex items-center gap-2"
                >
                  {icon}
                  <span className="text-subtle">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* hero visual card */}
          <div className="card-3d-glow rounded-3xl p-2">
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              {/* gradient ring avatar for Vyas */}
              <div className="mx-auto mb-6 h-24 w-24 rounded-2xl bg-zen-gradient shadow-brand animate-levitate-slow" />
              <div className="text-center">
                <p className="text-subtle">
                  “Place your right knee directly above your ankle. Breathe into your chest, not your shoulders.”
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-dark px-3 py-1 text-xs">
                  <Mic className="h-3.5 w-3.5" />
                  Live voice guidance
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["Pose Accuracy", "92%"],
                  ["Meal Adherence", "76%"],
                  ["Mindful Minutes", "24"],
                ].map(([k, v], idx) => (
                  <div key={idx} className="rounded-xl border border-dark p-4 text-center">
                    <div className="text-sm text-subtle">{k}</div>
                    <div className="mt-1 text-2xl font-semibold">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-dark p-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-subtle" />
                  <div className="text-sm">
                    <div className="text-subtle">Today’s quick tip</div>
                    <div className="mt-1">
                      Swap dinner rice with <span className="font-medium">millet-veg khichdi</span> — same comfort, lighter on late-night digestion.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* feature grid */}
      <section id="features" className="mx-auto max-w-7xl px-5 pb-10 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Why Vyas feels different</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Move3D className="h-5 w-5" />}
            title="Real-time posture"
            desc="Computer vision watches alignment quietly and nudges with gentle voice cues when you drift."
          />
          <FeatureCard
            icon={<Brain className="h-5 w-5" />}
            title="Learns your rhythm"
            desc="Vyas remembers preferences, soreness notes, sleep & mood to pace sessions just right."
          />
          <FeatureCard
            icon={<MapPin className="h-5 w-5" />}
            title="Hyper-local nutrition"
            desc="Diet plans use budget-friendly ingredients available within ~10–12 km of you."
          />
          <FeatureCard
            icon={<AudioLines className="h-5 w-5" />}
            title="Zen Mode"
            desc="Unlock deeper meditations, sutras and mantras recorded with temple & monastery voices."
          />
        </div>
      </section>

      {/* live demo / CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="card-3d-glow rounded-3xl p-2">
          <div className="liquid-glass rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Talk to Vyas in the browser</h3>
              <p className="mt-2 text-subtle">
                Ask for a 7-min shoulder reset, a millet-first dinner, or a calming breath ladder. Vyas adapts instantly.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link to="/chat" className="btn-brand inline-flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Open Chat
                </Link>
                <Link to="/dashboard" className="btn-ghost inline-flex items-center gap-2">
                  See Progress
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* “mock chat bubble” for feel */}
            <div className="w-full md:w-[420px]">
              <div className="rounded-2xl border border-dark p-4">
                <div className="text-xs text-subtle mb-3">Preview</div>
                <ChatPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How Vyas works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Sense", "Camera + mic (optional) capture posture & breath cues locally when you practice."],
            ["Understand", "On-device + cloud AI interpret alignment, fatigue signals and intent."],
            ["Guide", "Vyas replies with short, human-sounding nudges — never spammy, always kind."],
          ].map(([t, d], i) => (
            <li key={i} className="liquid-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm text-subtle">
                <span className="h-6 w-6 rounded-md bg-brand-gradient" />
                Step {i + 1}
              </div>
              <div className="mt-3 text-lg font-medium">{t}</div>
              <p className="mt-1 text-sm text-subtle">{d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-subtle">
          <ShieldCheck className="h-4 w-4" />
          Privacy first: camera & mic are opt-in and clearly indicated. Nothing is sold. Ever.
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-5 pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 grid gap-4">
          <FaqItem q="Is Vyas a separate app?" a="Vyas is a core feature of Ahara. On web you can open it from the Chat page; on mobile it lives in the Companion tab." />
          <FaqItem q="Do I need a webcam?" a="Only for posture correction. You can still chat, plan meals and meditate without it." />
          <FaqItem q="What’s Zen Mode?" a="A premium space with advanced tutorials, authentic chants/mantras and deeper guidance from verified teachers." />
          <FaqItem q="Will it work with my budget?" a="Yes. Diet plans prioritize seasonal, affordable ingredients available within ~10–12 km of your location." />
        </div>
      </section>

      {/* footer */}
      <footer className="mx-auto max-w-7xl px-5 pb-10">
        <div className="liquid-glass rounded-2xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-6 w-6 rounded-md bg-zen-gradient shadow-brand" />
            <span className="text-sm text-subtle">© {new Date().getFullYear()} Ahara • Vyas</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a className="hover:opacity-80" href="#features">Features</a>
            <a className="hover:opacity-80" href="#how">How it works</a>
            <a className="hover:opacity-80" href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- small presentational helpers ---------- */

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="liquid-glass rounded-2xl p-5 hover:shadow-brand transition-shadow">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-dark">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-subtle">{desc}</p>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="space-y-3">
      <Bubble who="user">I have 10 minutes. Neck is stiff. Quick fix?</Bubble>
      <Bubble who="vyas">
        Try a 7-min shoulder ladder: roll → elevate → retract → wall angel.
        Keep ribs soft. I’ll cue pace.
      </Bubble>
      <div className="flex items-center gap-2">
        <input
          aria-label="Preview input"
          disabled
          placeholder="Type a message…"
          className="flex-1 rounded-xl border border-dark bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-500"
        />
        <button
          disabled
          className="rounded-xl border border-dark px-3 py-2 text-sm inline-flex items-center gap-2 opacity-70"
        >
          <Sparkles className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
}

function Bubble({ who, children }) {
  const isUser = who === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-brand-gradient text-slate-900 shadow-brand"
            : "liquid-glass"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="liquid-glass rounded-2xl p-5 group">
      <summary className="cursor-pointer list-none flex items-center justify-between">
        <span className="font-medium">{q}</span>
        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-subtle">{a}</p>
    </details>
  );
}
