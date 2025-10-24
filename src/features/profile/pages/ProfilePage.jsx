import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit3, Flame, Apple, Trophy, Settings,
  Clock3, Dumbbell, BookOpenText, Calendar, Target
} from "lucide-react";

import {
  cx,
  clamp,
  HaloAvatar,
  Gauge,
  Metric,
  LineItem,
  Segments,
} from "@features/profile/components/ProfileHelpers.jsx";

/* -------------------------- Main Profile Page -------------------------- */
export default function ProfilePage() {
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const mock = {
      name: "Mridul Singhal",
      handle: "@mridul",
      location: "Ambala, H, India",
      bio: "Founder of Ahara — crafting mindful wellness with local-first intelligence.",
      // 🧠 AI-style 3D avatar placeholder
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=AIYogi&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50",
      streak: 12,
      minutes: 438,
      poses: 23,
      mealCompliance: 76,
      weeklyGoal: 64,
      zenProgress: 40,
      mealsToday: [
        { id: "b", name: "Poha + Fruit", meta: "✅ Logged · 320 kcal" },
        { id: "l", name: "Dal, Roti, Salad", meta: "✅ Logged · 540 kcal" },
        { id: "d", name: "Paneer + Veg", meta: "Add · target 500–650 kcal" },
      ],
    };
    const t = setTimeout(() => {
      setProfile(mock);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const switchTheme = () => document.documentElement.classList.toggle("light");

  /* -------------------------- Overview Section -------------------------- */
  const Overview = (
    <div className="space-y-8">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Metric icon={Flame} label="Streak" value={`${profile?.streak ?? 0} days`} hint="Keep it going!" />
        <Metric icon={Clock3} label="Minutes Practiced" value={`${profile?.minutes ?? 0}`} />
        <Metric icon={Dumbbell} label="Poses Mastered" value={`${profile?.poses ?? 0}`} />
        <Metric icon={Apple} label="Meal Compliance" value={`${profile?.mealCompliance ?? 0}%`} />
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl border border-dark p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex flex-wrap justify-center sm:justify-start gap-10">
            <div className="flex-shrink-0 min-w-[120px]">
              <Gauge value={profile?.weeklyGoal ?? 0} label="Weekly Goal" sub="of 5 sessions" />
            </div>
            <div className="flex-shrink-0 min-w-[120px]">
              <Gauge value={profile?.zenProgress ?? 0} label="Zen Progress" sub="to next unlock" />
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center sm:items-end w-full sm:w-auto">
            <button className="btn-brand inline-flex items-center justify-center gap-2 w-full sm:w-40">
              <Target size={16} /> Start Session
            </button>
            <button className="btn-ghost inline-flex items-center justify-center gap-2 w-full sm:w-40">
              <Calendar size={16} /> Plan Week
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl border border-dark p-5 md:col-span-2">
          <header className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Link to="/dashboard" className="text-sm text-subtle hover:underline">View all</Link>
          </header>
          <div className="grid sm:grid-cols-2 gap-3">
            <LineItem icon={BookOpenText} title="Evening Grounding — 12 min" meta="Yoga · Beginner" />
            <LineItem icon={Clock3} title="Breath & Calm — 8 min" meta="Meditation · Intro" />
            <LineItem icon={Dumbbell} title="Hamstring Flow — 16 min" meta="Yoga · Intermediate" />
            <LineItem icon={Calendar} title="Mindful Stretch — 10 min" meta="Tomorrow 7 AM" />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl border border-dark p-5">
          <header className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Trophy className="text-cyan-400 opacity-80" />
          </header>
          <div className="flex flex-wrap gap-3">
            {["Early Yogi", "7-day Streak", "Mindful Eater", "Pose Pro"].map((b) => (
              <span
                key={b}
                className="px-3 py-1.5 text-sm rounded-full glass border border-dark hover:border-cyan-400/40 transition-all"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-dark p-5 md:col-span-2">
          <header className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Today’s meals</h3>
            <Link to="/dashboard" className="text-sm text-subtle hover:underline">Open tracker</Link>
          </header>
          <div className="grid sm:grid-cols-3 gap-4">
            {profile?.mealsToday?.map((m) => (
              <div key={m.id} className="p-4 rounded-xl glass border border-dark">
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-xs text-subtle mt-1">{m.meta}</div>
                <button className="mt-3 btn-ghost text-sm">Quick add</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-primary overflow-hidden">
      <div className="background-3d-effect" />
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 400px at 10% -20%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(1200px 400px at 90% -30%, rgba(168,85,247,0.20), transparent 60%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-20">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <HaloAvatar src={profile?.avatar} />
              <div>
                <div className="text-2xl md:text-3xl font-semibold">
                  {loading ? "Loading…" : profile?.name}
                </div>
                <div className="text-sm text-subtle">
                  {profile?.handle} · {profile?.location}
                </div>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                  {profile?.bio}
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <button className="btn-brand inline-flex items-center gap-2">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                  <button onClick={switchTheme} className="btn-ghost inline-flex items-center gap-2">
                    <Settings size={16} /> Toggle Theme
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <Segments
                value={tab}
                onChange={setTab}
                items={[
                  { key: "overview", label: "Overview" },
                  { key: "practice", label: "Practice" },
                  { key: "nutrition", label: "Nutrition" },
                  { key: "achievements", label: "Achievements" },
                  { key: "settings", label: "Settings" },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <Segments
              value={tab}
              onChange={setTab}
              items={[
                { key: "overview", label: "Overview" },
                { key: "practice", label: "Practice" },
                { key: "nutrition", label: "Nutrition" },
                { key: "achievements", label: "Awards" },
                { key: "settings", label: "Settings" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 pb-24">
        <div className="glass rounded-3xl border border-dark p-8 md:p-10 shadow-3d-selected space-y-8">
          {tab === "overview" && Overview}
        </div>
      </div>
    </div>
  );
}
