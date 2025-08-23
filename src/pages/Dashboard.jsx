import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie
} from 'recharts';
import {
  BoltIcon,
  FireIcon,
  UserGroupIcon,
  PlusIcon,
  BellIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  BookOpenIcon,
  CheckCircleIcon,
  TrophyIcon,
  SparklesIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';

// --- 3D BACKGROUND EFFECT (from Landing.jsx) ---
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden u-perspective-900">
      {/* existing glows, now gently parallaxed */}
      <div
        className="absolute left-[-20%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-3xl"
        style={{ transform: `translate3d(${(pos.x - 0.5) * 40}px, ${(pos.y - 0.5) * 40}px, 0)` }}
      />
      <div
        className="absolute right-[-15%] bottom-[-10%] h-[35rem] w-[35rem] rounded-full bg-purple-500/10 blur-3xl"
        style={{ transform: `translate3d(${(0.5 - pos.x) * 50}px, ${(0.5 - pos.y) * 50}px, 0)` }}
      />
    </div>
  );
}

// --- MOCK DATA ---
const weeklyProgressData = [
  { name: 'Mon', minutes: 20 },
  { name: 'Tue', minutes: 30 },
  { name: 'Wed', minutes: 25 },
  { name: 'Thu', minutes: 45 },
  { name: 'Fri', minutes: 35 },
  { name: 'Sat', minutes: 55 },
  { name: 'Sun', minutes: 60 },
];

const sleepData = [
  { name: 'Mon', hours: 6.5 },
  { name: 'Tue', hours: 7 },
  { name: 'Wed', hours: 8 },
  { name: 'Thu', hours: 7.5 },
  { name: 'Fri', hours: 6 },
  { name: 'Sat', hours: 8.5 },
  { name: 'Sun', hours: 7 },
];

const wellnessData = [
    { subject: 'Body', A: 85, fullMark: 100 },
    { subject: 'Mind', A: 90, fullMark: 100 },
    { subject: 'Nutrition', A: 75, fullMark: 100 },
    { subject: 'Sleep', A: 80, fullMark: 100 },
    { subject: 'Consistency', A: 95, fullMark: 100 },
];

const sessionDistributionData = [
    { name: 'Yoga', value: 40, color: '#2dd4bf' },
    { name: 'Meditation', value: 35, color: '#22d3ee' },
    { name: 'Breathing', value: 25, color: '#a78bfa' },
];

const goalsData = [
    { text: "Meditate 5 times this week", current: 4, target: 5, icon: MoonIcon },
    { text: "Complete 3 yoga sessions", current: 3, target: 3, icon: SunIcon },
    { text: "Log meals for 7 consecutive days", current: 6, target: 7, icon: BoltIcon },
    { text: "Read 10 pages of Sutras", current: 5, target: 10, icon: BookOpenIcon },
    { text: "Try one new healthy recipe", current: 0, target: 1, icon: SparklesIcon },
];

const activityFeed = [
    { icon: SunIcon, text: "Completed 'Sunrise Yoga' session.", time: "2h ago" },
    { icon: BoltIcon, text: "Logged a meal: Paneer Salad.", time: "4h ago" },
    { icon: CheckCircleIcon, text: "Completed weekly yoga goal!", time: "8h ago" },
    { icon: UserGroupIcon, text: "Joined the 'Mindful Month' challenge.", time: "1d ago" },
    { icon: BookOpenIcon, text: "Read Chapter 2 of the Yoga Sutras.", time: "1d ago" },
    { icon: MoonIcon, text: "Completed 'Evening Meditation'.", time: "2d ago" },
    { icon: FireIcon, text: "Reached a 12-day active streak!", time: "2d ago" },
    { icon: TrophyIcon, text: "New personal best in meditation: 25 mins.", time: "3d ago" },
    { icon: SunIcon, text: "Completed 'Vinyasa Flow'.", time: "3d ago" },
    { icon: BoltIcon, text: "Logged a meal: Oatmeal & Berries.", time: "4d ago" },
];

// --- Reusable Components ---

const DashboardCard = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-dark bg-surface-2/70 backdrop-blur-sm p-4 sm:p-6 shadow-xl shadow-black/20 ${className}`}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].name;
    return (
      <div className="glass rounded-lg p-3 text-sm border border-dark">
        <p className="label text-slate-200">{`${label || name} : ${value}`}</p>
      </div>
    );
  }
  return null;
};

const GoalItem = ({ icon, text, current, target }) => {
    const progress = Math.min((current / target) * 100, 100);
    const isComplete = current >= target;
    const IconComponent = icon;

    return (
        <li className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
                <IconComponent className={`h-5 w-5 ${isComplete ? 'text-teal-400' : 'text-cyan-400'}`} />
                <span className={isComplete ? 'text-slate-400 line-through' : 'text-slate-300'}>{text}</span>
                <span className="ml-auto font-mono text-xs text-subtle">{current}/{target}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className={`${isComplete ? 'bg-teal-400' : 'bg-brand-gradient'} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
        </li>
    );
};


export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary font-sans p-4 sm:p-6 lg:p-8 relative isolate">
      <DepthParallax />
      <div className="mx-auto max-w-screen-2xl relative z-10">

        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Wellness Dashboard</h1>
            <p className="text-subtle">Welcome back, let's make today count.</p>
          </div>
           <div className="flex items-center gap-2 sm:gap-4">
            <button className="btn-ghost p-2 rounded-full"><BellIcon className="h-6 w-6" /></button>
            <button className="btn-ghost p-2 rounded-full"><UserCircleIcon className="h-6 w-6" /></button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <button className="hidden sm:flex items-center gap-2 btn-brand px-4 py-2"><PlusIcon className="h-5 w-5" /><span>New Session</span></button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Primary Column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Top Row: Mindfulness Chart and Wellness Score */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <DashboardCard className="h-96 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-100 mb-2">Mindfulness Minutes</h3>
                        <p className="text-sm text-subtle mb-4">Last 7 days of practice.</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyProgressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-dark)" />
                                <XAxis dataKey="name" tick={{ fill: 'var(--color-text-secondary)' }} tickLine={false} axisLine={{ stroke: 'var(--color-border-dark)' }} />
                                <YAxis tick={{ fill: 'var(--color-text-secondary)' }} tickLine={false} axisLine={{ stroke: 'var(--color-border-dark)' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
                                <Line type="monotone" dataKey="minutes" stroke="var(--color-cyan-400)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-cyan-400)' }} activeDot={{ r: 8, fill: 'var(--color-cyan-400)', stroke: 'var(--color-bg-dark)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </DashboardCard>
                </div>
                <div>
                    <DashboardCard className="h-96 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-100 mb-4">Wellness Score</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={wellnessData}>
                                <PolarGrid stroke="var(--color-border-dark)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 14 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Mike" dataKey="A" stroke="var(--color-teal-400)" fill="var(--color-teal-400)" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </DashboardCard>
                </div>
            </div>

            {/* Second Row: Sleep Chart and Session Distribution */}
             <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <DashboardCard className="h-96 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-100 mb-2">Sleep Analysis</h3>
                        <p className="text-sm text-subtle mb-4">Hours slept over the last 7 days.</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sleepData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-dark)" />
                                <XAxis dataKey="name" tick={{ fill: 'var(--color-text-secondary)' }} tickLine={false} axisLine={{ stroke: 'var(--color-border-dark)' }} />
                                <YAxis tick={{ fill: 'var(--color-text-secondary)' }} tickLine={false} axisLine={{ stroke: 'var(--color-border-dark)' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
                                <Bar dataKey="hours" name="Hours Slept" radius={[4, 4, 0, 0]}>
                                    {sleepData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.hours > 7 ? 'var(--color-purple-400)' : 'var(--color-cyan-400)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </DashboardCard>
                </div>
                <div>
                    <DashboardCard className="h-96 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-100 mb-4">Session Types</h3>
                        <p className="text-sm text-subtle mb-4">Distribution of your practice.</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sessionDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                     {sessionDistributionData.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} stroke={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </DashboardCard>
                </div>
            </div>

            {/* Third Row: Goals, Bests, and Quick Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <DashboardCard className="xl:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Weekly Goals</h3>
                    <ul className="space-y-4">
                        {goalsData.map((goal, index) => (
                            <GoalItem key={index} {...goal} />
                        ))}
                    </ul>
                </DashboardCard>
                <DashboardCard>
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h3>
                    <ul className="space-y-3">
                        <li className="btn-ghost p-3 rounded-lg flex items-center gap-3 cursor-pointer"><PlayIcon className="h-5 w-5 text-teal-400"/> Start 5-min Meditation</li>
                        <li className="btn-ghost p-3 rounded-lg flex items-center gap-3 cursor-pointer"><SunIcon className="h-5 w-5 text-yellow-400"/> Begin Morning Yoga</li>
                        <li className="btn-ghost p-3 rounded-lg flex items-center gap-3 cursor-pointer"><BoltIcon className="h-5 w-5 text-cyan-400"/> Log a Meal</li>
                        <li className="btn-ghost p-3 rounded-lg flex items-center gap-3 cursor-pointer"><SparklesIcon className="h-5 w-5 text-purple-400"/> Discover New Content</li>
                    </ul>
                </DashboardCard>
            </div>
          </div>

          {/* Right Column (Activity Feed & Bests) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <DashboardCard className="flex-grow flex flex-col h-full">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h3>
              <ul className="space-y-3 flex-grow h-[30rem] overflow-y-auto pr-2">
                {activityFeed.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 rounded-lg p-3 bg-white/5 hover:bg-white/10 transition-colors">
                        <item.icon className={`h-5 w-5 ${item.icon === CheckCircleIcon ? 'text-teal-400' : 'text-cyan-400'}`} />
                        <p className="flex-grow text-sm text-slate-300">{item.text}</p>
                        <p className="text-xs text-subtle flex-shrink-0">{item.time}</p>
                    </li>
                ))}
              </ul>
               <button className="mt-4 w-full btn-ghost py-2 rounded-lg text-sm">
                View all activity
              </button>
            </DashboardCard>
             <DashboardCard>
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Personal Bests</h3>
                <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-white/5"><TrophyIcon className="h-5 w-5 text-yellow-400"/> Longest Streak: <span className="ml-auto font-semibold text-white">12 Days</span></li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-white/5"><TrophyIcon className="h-5 w-5 text-yellow-400"/> Longest Session: <span className="ml-auto font-semibold text-white">60 min</span></li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-white/5"><TrophyIcon className="h-5 w-5 text-yellow-400"/> Most Calories Burned: <span className="ml-auto font-semibold text-white">450 kcal</span></li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-white/5"><TrophyIcon className="h-5 w-5 text-yellow-400"/> Highest Pose Accuracy: <span className="ml-auto font-semibold text-white">98%</span></li>
                </ul>
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  );
}