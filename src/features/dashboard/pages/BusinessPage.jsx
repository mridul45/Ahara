import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Video, Users, Sun, Moon, History, CalendarPlus, Zap, Clock3, Clock, Star, Check
} from 'lucide-react';

import { useQuery } from '@tanstack/react-query';

import Footer from '@shared/components/Footer.jsx';
import { useTheme } from '@shared/hooks/useTheme.js';
import { fetchFeaturedPlaylists, pct } from '@shared/api/reactQueryClient.js';
import { ContinueWatchingCard, TutorialCard } from '@features/dashboard/components/TutorialsAndClasses.jsx';
import { tutorials, instructors } from '@features/dashboard/data/appData.js';
import { continueWatching, liveClasses } from '@features/dashboard/data/classData.js';

/* ================= Toast Capsule ================= */
function UpdateCapsule({ show, onClose, text = 'Playlists updated' }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="px-4 py-2 rounded-full glass border border-cyan-400/40 shadow-lg flex items-center gap-2">
        <Check size={16} className="text-cyan-400" />
        <span className="text-sm text-text-primary">{text}</span>
      </div>
    </div>
  );
}

/* ================= UI-only components ================= */
const PlaylistSkeleton = () => (
  <div className="glass rounded-2xl overflow-hidden border border-dark">
    <div className="aspect-[16/10] bg-white/5 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
      <div className="h-5 w-3/4 bg-white/5 animate-pulse rounded" />
      <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
      <div className="h-8 w-32 bg-white/5 animate-pulse rounded" />
    </div>
  </div>
);

const FeaturedPlaylistCard = ({ p }) => (
  <div className="group relative glass rounded-2xl overflow-hidden border border-dark hover:border-cyan-400/50 transition-all duration-300">
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={p.thumbnail}
        alt={p.title}
        width={640}
        height={400}
        fetchpriority="high"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="p-4">
      <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
        <span className="px-2 py-1 rounded-full bg-white/5 border border-dark">
          {p.playlist_type?.replaceAll('_', ' ')}
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border border-dark">
          {p.language}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-text-primary line-clamp-2">{p.title}</h3>
      <p className="mt-1 text-sm text-text-secondary line-clamp-2">{p.description}</p>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="px-2 py-1 rounded-md bg-surface-2 border border-dark">
          CTR: {pct(p.ctr ?? p.computed_ctr ?? 0, 1)}
        </span>
        <span className="px-2 py-1 rounded-md bg-surface-2 border border-dark">
          Completion: {pct(p.completion_rate ?? p.computed_completion_rate ?? 0, 1)}
        </span>
        <span className="px-2 py-1 rounded-md bg-surface-2 border border-dark flex items-center gap-1">
          <Star size={14} className="text-cyan-400" />
          {(p.average_rating ?? (p.rating_count ? p.rating_sum / p.rating_count : 0)).toFixed(1)}
        </span>
      </div>

      <div className="mt-4">
        <Link to={`/details/${p.id}`} className="inline-flex items-center justify-center btn-brand rounded-xl">
          Open Playlist
        </Link>
      </div>
    </div>
  </div>
);

/* ================= Page ================= */
function BusinessPageInner() {
  const [activeTab, setActiveTab] = useState('tutorials');
  const { theme, toggleTheme } = useTheme();

  // Defer below-the-fold for faster first paint
  const [deferBelowFold, setDeferBelowFold] = useState(true);
  useEffect(() => {
    const run = () => setDeferBelowFold(false);
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(run, { timeout: 500 });
    } else {
      setTimeout(run, 0);
    }
  }, []);

  // Featured playlists query
  const prevIdsRef = useRef(null);
  const [plUpdated, setPlUpdated] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['featuredPlaylists'],
    queryFn: fetchFeaturedPlaylists,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const ids = (data?.items || []).map((x) => x.id).join(',');
    const prev = prevIdsRef.current;
    if (ids && prev && ids !== prev) setPlUpdated(true);
    if (ids) prevIdsRef.current = ids;
  }, [data]);

  const closePlUpdated = () => setPlUpdated(false);

  // Local slices for demo sections
  const latestTutorials = useMemo(
    () => [...tutorials].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4),
    []
  );
  const popularTutorials = useMemo(
    () => [...tutorials].sort((a, b) => b.popularity - a.popularity).slice(0, 4),
    []
  );
  const quickTutorials = useMemo(() => tutorials.filter((t) => t.duration <= 20), []);
  const mediumTutorials = useMemo(() => tutorials.filter((t) => t.duration > 20 && t.duration <= 45), []);
  const longTutorials = useMemo(() => tutorials.filter((t) => t.duration > 45), []);

  const renderFeaturedPlaylists = () => (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-text-primary flex items-center gap-2">
          <Zap className="text-cyan-400" /> Featured Playlists
        </h2>
        <Link to="/business" className="btn-ghost rounded-xl hover:border-cyan-400/50 transition-colors">
          View All
        </Link>
      </div>

      {isError && (
        <div className="glass border border-dark rounded-xl p-4 text-rose-300">
          {(error && error.message) || 'Could not load playlists.'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(isLoading && !(data?.items?.length))
          ? Array.from({ length: 4 }).map((_, i) => <PlaylistSkeleton key={i} />)
          : (data?.items || []).map((p) => <FeaturedPlaylistCard key={p.id} p={p} />)}
      </div>
    </section>
  );

  const renderTutorials = () => (
    <div className="space-y-16">
      {renderFeaturedPlaylists()}

      {!deferBelowFold && (
        <>
          {/* Continue Watching */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <History className="text-cyan-400" /> Continue Watching
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {continueWatching.map((tutorial) => (
                <ContinueWatchingCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>

          {/* Latest */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <CalendarPlus className="text-cyan-400" /> Latest Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>

          {/* Popular */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Zap className="text-cyan-400" /> Most Popular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>

          {/* Duration */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Clock3 className="text-cyan-400" /> Browse by Duration
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Quick Sessions (Under 20 mins)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {quickTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Medium Sessions (20–45 mins)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-4 gap-8">
                  {mediumTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Long Sessions (45+ mins)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {longTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );

  const renderLiveClasses = () => (
    <div className="space-y-4">
      {liveClasses.map((cls) => (
        <div
          key={cls.id}
          className="glass rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-lg font-bold text-text-primary">{cls.title}</h3>
            <p className="text-sm text-text-secondary">with {cls.instructor}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-text-secondary mt-2">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {cls.time} ({cls.duration} min)
              </span>
              <span className="flex items-center gap-1">
                <Star size={14} /> {cls.difficulty}
              </span>
            </div>
          </div>
          <button className="btn-brand w-full md:w-auto shrink-0">Join Live</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <header className="text-center my-12 relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-zen-gradient text-transparent bg-clip-text mb-4">
            Explore Our Tutorials
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find the perfect session to fit your goals, schedule, and mood. New content added weekly.
          </p>
          <button
            onClick={toggleTheme}
            className="absolute top-0 right-0 p-2 rounded-full bg-surface-2 text-text-primary hover:bg-surface-1 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Search + Tabs */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search for yoga, HIIT, meditation..."
              className="w-full bg-surface-2 border border-dark rounded-full py-3 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
          <div className="flex justify-center items-center gap-4 p-1 rounded-full bg-surface-2 max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`w-full py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'tutorials' ? 'bg-brand-gradient text-slate-900' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Video className="inline-block mr-2" size={16} />
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`w-full py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'live' ? 'bg-brand-gradient text-slate-900' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Users className="inline-block mr-2" size={16} />
              Live Classes
            </button>
          </div>
        </div>

        <main className="my-16">
          {activeTab === 'tutorials' ? renderTutorials() : renderLiveClasses()}
        </main>

        {/* Instructors (below the fold) */}
        {!deferBelowFold && (
          <section className="my-16" style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
            <h2 className="text-3xl font-bold text-center text-text-primary mb-10">Browse by Instructor</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="text-center glass p-6 rounded-xl hover:border-cyan-400/50 border border-transparent transition-colors"
                >
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-xl font-bold text-text-primary">{instructor.name}</h3>
                  <p className="text-text-secondary">{instructor.specialty}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <UpdateCapsule show={plUpdated} onClose={closePlUpdated} text="Playlists updated" />
      <Footer />
    </div>
  );
}

export default function BusinessPage() {
  return <BusinessPageInner />;
}
