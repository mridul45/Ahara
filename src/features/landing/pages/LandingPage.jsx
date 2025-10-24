import React from "react";

import FeatureCard from "@features/landing/components/FeatureCard.jsx";
import { useLandingPage } from "@features/landing/hooks/useLandingPage.js";
import { pricingPlans } from "@features/landing/data/pricingPlans.js";
import Footer from "@shared/components/Footer.jsx";
import InteractiveBackdrop from "@shared/components/InteractiveBackdrop.jsx";
import Navbar from "@shared/components/Navbar.jsx";

const heroStats = [
  { label: "Pose accuracy", value: "94%", hint: "AI assisted" },
  { label: "Sessions completed", value: "128", hint: "This year" },
  { label: "Meal compliance", value: "76%", hint: "Local produce" },
];

export default function LandingPage() {
  const {
    theme,
    toggleTheme,
    selectedPlan,
    handlePlanSelect,
    handleLogin,
  } = useLandingPage();

  return (
    <div id="top" className="min-h-screen bg-[var(--color-bg-dark)] text-slate-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <InteractiveBackdrop
            pointerStrength={280}
            colors={[
              "rgba(34,211,238,0.55)",
              "rgba(168,85,247,0.5)",
              "rgba(56,189,248,0.45)",
            ]}
            radii={[36, 34, 28]}
          />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <article className="flex flex-col justify-center">
              <span className="inline-flex items-center self-start rounded-full border border-dark bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
                AI-powered wellness
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Your companion for{" "}
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  mind, body, and nourishment
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-subtle">
                Ahara blends guided yoga, meditation, personalised meal planning, and the Vyas AI coach
                into one calm workspace so you can focus on progress instead of juggling apps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-slate-900 shadow-brand transition-colors"
                >
                  Get started
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl btn-ghost px-5 py-3 font-medium"
                >
                  Explore features
                </a>
              </div>
              <dl className="mt-10 grid gap-4 text-sm text-subtle sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">{item.label}</dt>
                    <dd className="mt-1 text-xl font-semibold text-slate-100">{item.value}</dd>
                    <p className="text-xs text-slate-400">{item.hint}</p>
                  </div>
                ))}
              </dl>
            </article>

            <aside className="self-center">
              <div className="rounded-3xl border border-dark bg-surface-2 p-6 shadow-lg shadow-black/20 sm:p-8">
                <h2 className="text-lg font-semibold text-slate-100">Today&apos;s focus</h2>
                <p className="mt-2 text-sm text-subtle">
                  A balanced routine of movement, mindfulness, and nutrition keeps your streaks steady.
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-start gap-3 rounded-2xl border border-dark bg-white/5 p-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal-400" />
                    <div>
                      <p className="font-medium text-slate-100">Sunrise flow · 18 min</p>
                      <p className="text-xs text-subtle">Improve posture and mobility with coach feedback.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl border border-dark bg-white/5 p-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                    <div>
                      <p className="font-medium text-slate-100">Lunch planner · local produce</p>
                      <p className="text-xs text-subtle">Budget-friendly meals curated from nearby ingredients.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl border border-dark bg-white/5 p-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                    <div>
                      <p className="font-medium text-slate-100">Zen Mode · evening calm</p>
                      <p className="text-xs text-subtle">Unwind with a guided monastic meditation.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ABOUT / VISION */}
        <section id="about" className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              What is Ahara?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-subtle">
              Ahara is a next-generation wellness platform that merges authentic practice with helpful AI.
              Whether you are building consistency, looking for mindful recipes, or wanting a supportive
              coach, Ahara keeps everything organised and approachable.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-16 md:py-24 bg-surface-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Everything you need in one place
            </h2>
            <p className="mt-3 text-center text-subtle">
              From posture to plates to peace of mind—neatly integrated.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Yoga & Meditation Tutorials"
                desc="Guided sessions for all levels with calm visuals and mindful pacing."
                iconPath="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm0 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 12a7 7 0 0 1-5.65-2.82A5 5 0 0 1 12 13a5 5 0 0 1 5.65 3.18A7 7 0 0 1 12 19Z"
              />
              <FeatureCard
                title="Real-time Posture Correction"
                desc="Vision AI offers instant voice and visual cues while you practice."
                iconPath="M4 4h16v4H4V4Zm0 6h10v10H4V10Zm12 6h4v4h-4v-4Z"
              />
              <FeatureCard
                title="Personalised Diet Plans"
                desc="Smart plans tailored to goals, routines, and locally available ingredients."
                iconPath="M4 7h16v2H4V7Zm0 4h16v2H4v-2Zm0 4h10v2H4v-2Z"
              />
              <FeatureCard
                title="Local Ingredient Sourcing"
                desc="Find affordable ingredients within your neighbourhood radius."
                iconPath="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
              />
              <FeatureCard
                title="AI Companion with Memory"
                desc="Chat with Vyas—your on-demand mentor for practice, nutrition, and motivation."
                iconPath="M12 3a9 9 0 0 0-9 9 9.01 9.01 0 0 0 6 8.485V21l3-1 3 1v-.515A9.01 9.01 0 0 0 21 12a9 9 0 0 0-9-9Z"
              />
              <FeatureCard
                title="Adaptive Meal Tracker"
                desc="Log meals in seconds and receive nudges that keep you on track."
                iconPath="M7 4h10v2H7V4Zm-2 4h14v12H5V8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z"
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-center text-subtle">
              A simple journey to better routines and lasting calm.
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-4">
              {[
                ["Sign up", "Create your account and share your goals."],
                ["Practice", "Follow guided sessions with feedback tailored to you."],
                ["Nourish", "Receive local-first meal plans and smart reminders."],
                ["Connect", "Chat with Vyas and keep track of every milestone."],
              ].map(([title, description], index) => (
                <div key={title} className="text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-slate-900 font-black text-2xl">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                  <p className="mt-2 text-subtle text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-16 md:py-24 bg-surface-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Choose a plan that grows with you
              </h2>
              <p className="mt-3 text-subtle">
                Start with the essentials and upgrade when you are ready to unlock Zen Mode.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => {
                const isActive = selectedPlan === plan.name;
                return (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => handlePlanSelect(plan.name)}
                    className={[
                      "w-full rounded-2xl border bg-surface-2 p-6 text-left transition-colors",
                      isActive ? "border-cyan-400 shadow-lg shadow-cyan-500/20" : "border-dark",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-slate-100">{plan.name}</h3>
                      {plan.popular && (
                        <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-slate-900">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-subtle text-sm">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-100">{plan.price}</span>
                      <span className="text-sm text-subtle">{plan.priceSuffix}</span>
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-slate-300">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                      {plan.buttonText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-dark bg-surface-2 px-6 py-12 text-center sm:px-10">
            <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Ready to meet Vyas?</h2>
            <p className="mt-3 text-subtle">
              Start a conversation, plan your next week, or simply ground yourself in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/chat" className="rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-slate-900 shadow-brand">
                Launch chat
              </a>
              <a href="/signup" className="rounded-xl border border-dark px-6 py-3 font-semibold text-slate-100">
                Create account
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
