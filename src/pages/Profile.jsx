import { useEffect, useState } from "react";
import {
  Edit3,
  MapPin,
  Sparkles,
  Flame,
  Apple,
  CheckCircle2,
  Clock3,
  Dumbbell,
  BookOpenText,
  ShieldCheck,
} from "lucide-react";

/**
 * Ahara • Profile.jsx
 * -------------------------------------------------------
 * A modern, beautiful profile page built to match your index.css tokens.
 * - Uses glass surfaces, subtle gradients, and 3D accents.
 * - No external UI lib; only Tailwind + your CSS tokens.
 * - Mock loader + structure ready to attach to your real API.
 *
 * Plug-in: <Route path="/profile" element={<Profile/>} />
 */

/* ------------------------------ Helpers ------------------------------ */
const classNames = (...xs) => xs.filter(Boolean).join(" ");

// Simple circular progress via conic-gradient
function Ring({ size = 120, track = "rgba(255,255,255,0.06)", value = 0, label, sub }) {
  const pct = Math.max(0, Math.min(100, value));
  const style = {
    width: size,
    height: size,
    background: `conic-gradient(var(--color-cyan-400) ${pct * 3.6}deg, ${track} 0deg)`
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative grid place-items-center" style={{ width: size, height: size }}>
        <div className="rounded-full p-1 bg-white/5 border border-dark shadow-brand" style={{ width: size, height: size }}>
          <div className="rounded-full" style={style} />
        </div>
        <div className="absolute inset-0 m-auto grid place-items-center">
          <div className="rounded-full bg-surface-1 border border-dark w-[calc(100%-22px)] h-[calc(100%-22px)] grid place-items-center">
            <div className="text-center">
              <div className="text-2xl font-semibold">{pct}%</div>
              {label && <div className="text-xs text-subtle mt-0.5">{label}</div>}
            </div>
          </div>
        </div>
      </div>
      {sub && <div className="text-sm text-subtle">{sub}</div>}
    </div>
  );
}

function Chip({ children, icon: Icon, className }) {
  return (
    <div className={classNames("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-dark", className)}>
      {Icon && <Icon size={16} className="opacity-80" />}
      <span className="text-sm">{children}</span>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, accent = "var(--color-cyan-400)", hint }) {
  return (
    <div className="group glass rounded-2xl p-4 border border-dark shadow-3d-selected hover:shadow-brand transition-all">
      <div className="flex items-center justify-between">
        <div className="text-sm text-subtle">{title}</div>
        <div className="w-8 h-8 grid place-items-center rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)" }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-subtle">{hint}</div>}
    </div>
  );
}

function ListTile({ title, meta, icon: Icon, to }) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-cyan-400/30 transition-colors">
      <div className="w-10 h-10 grid place-items-center rounded-lg bg-white/5 border border-dark">
        <Icon size={18} className="opacity-90" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        {meta && <div className="text-xs text-subtle truncate">{meta}</div>}
      </div>
      <ChevronRight className="opacity-50" />
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

/* ------------------------------ Page ------------------------------ */
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("overview");
  const [profile, setProfile] = useState(null);

  // Attach to your BE later: GET /api/profile/me
  useEffect(() => {
    let alive = true;
    setLoading(true);
    const mock = {
      id: 1,
      name: "Mridul Singhal",
      handle: "@mridul",
      location: "Mandi, HP, India",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=300&auto=format&fit=crop",
      bio: "Builder of Ahara — making wellness intelligent, local, and kind.",
      streak: 12,
      minutes: 438,
      poses: 23,
      mealCompliance: 76,
      weeklyGoal: 64,
      zenProgress: 40,
      badges: [
        { id: 1, name: "Early Yogi", icon: Sparkles },
        { id: 2, name: "7‑day Streak", icon: Flame },
        { id: 3, name: "Mindful Eater", icon: Apple },
        { id: 4, name: "Pose Pro", icon: Dumbbell },
      ],
      recent: [
        { id: 101, title: "Evening Grounding — 12 min", meta: "Yoga · Beginner", icon: BookOpenText },
        { id: 102, title: "Breath & Calm — 8 min", meta: "Meditation · Intro", icon: Clock3 },
        { id: 103, title: "Hamstring Flow — 16 min", meta: "Yoga · Intermediate", icon: Dumbbell },
      ],
      mealsToday: [
        { id: "b", name: "Poha + Fruit", meta: "✅ Logged · 320 kcal" },
        { id: "l", name: "Dal, Roti, Salad", meta: "✅ Logged · 540 kcal" },
        { id: "d", name: "Grilled Paneer + Veg", meta: "Add · target 500–650 kcal" },
      ],
    };
    const t = setTimeout(() => {
      if (!alive) return;
      setProfile(mock);
      setLoading(false);
    }, 650);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  const saveProfile = async (patch) => {
    setSaving(true);
    // PATCH /api/profile/me
    await new Promise((r) => setTimeout(r, 600));
    setProfile((p) => ({ ...p, ...patch }));
    setSaving(false);
  };

  const switchTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("light");
  };

  return (
    <div className="relative">
      <div className="background-3d-effect" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        {/* Header */}
        <section className="glass rounded-3xl border border-dark overflow-hidden card-3d-glow">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-brand">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-white/5">
                      <User size={36} className="opacity-70" />
                    </div>
                  )}
                </div>
                <button
                  className="absolute -bottom-2 -right-2 btn-brand grid place-items-center !p-2 rounded-xl"
                  title="Change photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* Identity */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {loading ? "Loading…" : profile?.name}
                  </h1>
                  <Chip icon={MapPin}>{loading ? "—" : profile?.location}</Chip>
                </div>
                <div className="mt-1 text-subtle">{loading ? "" : profile?.handle}</div>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300">
                  {loading ? "" : profile?.bio}
                </p>
                <div className="mt-4 flex gap-3 flex-wrap">
                  <button onClick={() => saveProfile({})} className="btn-brand inline-flex items-center gap-2">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                  <button onClick={switchTheme} className="btn-ghost inline-flex items-center gap-2">
                    <Settings size={16} /> Toggle Theme
                  </button>
                </div>
              </div>

              {/* Rings (desktop) */}
              <div className="hidden md:flex items-center gap-6">
                <Ring value={profile?.weeklyGoal ?? 0} label="Weekly Goal" sub="of 5 sessions" />
                <Ring value={profile?.zenProgress ?? 0} label="Zen Mode" sub="to next unlock" />
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-surface-2/40 border-t border-dark">
            <StatCard title="Streak" value={`${profile?.streak ?? 0} days`} icon={Flame} hint="Keep it going!" />
            <StatCard title="Minutes Practiced" value={`${profile?.minutes ?? 0} min`} icon={Clock3} />
            <StatCard title="Poses Mastered" value={profile?.poses ?? 0} icon={Dumbbell} />
            <StatCard title="Meal Compliance" value={`${profile?.mealCompliance ?? 0}%`} icon={Apple} />
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-2 flex-wrap">
          {[
            { key: "overview", label: "Overview" },
            { key: "practice", label: "Practice" },
            { key: "nutrition", label: "Nutrition" },
            { key: "achievements", label: "Achievements" },
            { key: "settings", label: "Settings" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={classNames(
                "px-4 py-2 rounded-xl border transition-all",
                tab === t.key
                  ? "bg-brand-gradient text-slate-900 shadow-brand"
                  : "glass border-dark hover:border-cyan-400/40"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="mt-6">
          {tab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent activity */}
              <section className="lg:col-span-2 glass rounded-2xl border border-dark p-4 md:p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent activity</h2>
                  <Link to="/dashboard" className="text-sm text-subtle hover:underline">View all</Link>
                </header>
                <div className="grid sm:grid-cols-2 gap-3">
                  {profile?.recent?.map((r) => (
                    <ListTile key={r.id} title={r.title} meta={r.meta} icon={r.icon} to={`/player/${r.id}`} />
                  ))}
                </div>
              </section>

              {/* Badges */}
              <section className="glass rounded-2xl border border-dark p-4 md:p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Badges</h2>
                  <Trophy className="opacity-70" />
                </header>
                <div className="flex flex-wrap gap-2">
                  {profile?.badges?.map((b) => (
                    <Chip key={b.id} icon={b.icon} className="shadow-3d-selected">{b.name}</Chip>
                  ))}
                </div>
              </section>

              {/* Rings (mobile) */}
              <section className="md:hidden glass rounded-2xl border border-dark p-4 grid grid-cols-2 gap-4">
                <Ring value={profile?.weeklyGoal ?? 0} label="Weekly Goal" sub="of 5 sessions" />
                <Ring value={profile?.zenProgress ?? 0} label="Zen Mode" sub="to next unlock" />
              </section>

              {/* Meals Today */}
              <section className="lg:col-span-3 glass rounded-2xl border border-dark p-4 md:p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Today’s meals</h2>
                  <Link to="/dashboard" className="text-sm text-subtle hover:underline">Open tracker</Link>
                </header>
                <div className="grid sm:grid-cols-3 gap-3">
                  {profile?.mealsToday?.map((m) => (
                    <div key={m.id} className="p-4 rounded-xl glass border border-dark">
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-subtle mt-1">{m.meta}</div>
                      <button className="mt-3 btn-ghost text-sm">Quick add</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {tab === "practice" && (
            <div className="grid md:grid-cols-2 gap-6">
              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your schedule</h2>
                  <Calendar className="opacity-70" />
                </header>
                <div className="space-y-2">
                  <ListTile title="Morning Mobility — 10 min" meta="Tomorrow 7:00 AM" icon={Dumbbell} />
                  <ListTile title="Midday Breath — 6 min" meta="Wed 1:00 PM" icon={Clock3} />
                  <ListTile title="Hamstring Flow — 16 min" meta="Fri 6:30 PM" icon={BookOpenText} />
                </div>
              </section>

              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Continue learning</h2>
                  <ShieldCheck className="opacity-70" />
                </header>
                <div className="space-y-2">
                  <ListTile title="Pose fundamentals — Module 1" meta="68% complete" icon={CheckCircle2} />
                  <ListTile title="Breathing basics — Module 2" meta="34% complete" icon={CheckCircle2} />
                </div>
              </section>
            </div>
          )}

          {tab === "nutrition" && (
            <div className="grid md:grid-cols-2 gap-6">
              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Plan snapshot</h2>
                  <Apple className="opacity-70" />
                </header>
                <p className="text-sm text-subtle">Hyper‑local ingredients, budget‑aware portions. You’re on a 2000 kcal/day plan.</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <StatCard title="Protein" value="94 g" icon={Dumbbell} />
                  <StatCard title="Carbs" value="210 g" icon={Flame} />
                  <StatCard title="Fats" value="62 g" icon={Apple} />
                </div>
              </section>

              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Nearby picks</h2>
                  <MapPin className="opacity-70" />
                </header>
                <div className="space-y-2">
                  <ListTile title="Sabzi Mandi — 1.2 km" meta="Fresh spinach, okra, tomatoes" icon={MapPin} />
                  <ListTile title="Daily Needs Store — 0.8 km" meta="Dahi, paneer, atta deals" icon={MapPin} />
                </div>
              </section>
            </div>
          )}

          {tab === "achievements" && (
            <div className="glass rounded-2xl border border-dark p-6">
              <header className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your trophies</h2>
                <Trophy className="opacity-70" />
              </header>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {profile?.badges?.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-dark glass">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 grid place-items-center rounded-xl bg-white/5 border border-dark">
                        <b.icon size={18} />
                      </div>
                      <div className="font-medium">{b.name}</div>
                    </div>
                    <div className="mt-2 text-xs text-subtle">Earned by consistent practice & tracking.</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="grid md:grid-cols-2 gap-6">
              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Account</h2>
                  <Settings className="opacity-70" />
                </header>
                <div className="space-y-2">
                  <ListTile title="Edit profile" meta="Name, bio, avatar" icon={Edit3} />
                  <ListTile title="Privacy & data" meta="Health data & permissions" icon={ShieldCheck} />
                </div>
              </section>

              <section className="glass rounded-2xl border border-dark p-6">
                <header className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Appearance</h2>
                  <Sparkles className="opacity-70" />
                </header>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Theme</div>
                    <div className="text-sm text-subtle">Toggle light/dark for better contrast</div>
                  </div>
                  <button onClick={switchTheme} className="btn-brand">Toggle</button>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Saving banner */}
        {saving && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-surface-2 border border-dark shadow-brand">
            <span className="text-sm">Saving changes…</span>
          </div>
        )}
      </div>
    </div>
  );
}
