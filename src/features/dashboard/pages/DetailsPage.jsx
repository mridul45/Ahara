import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, Languages, Layers, PlayCircle, Star, Sun, Moon, Globe2
} from 'lucide-react';

import Footer from '@shared/components/Footer.jsx';
import { useTheme } from '@shared/hooks/useTheme.js';

// ============================
// Config
// ============================
const API_BASE = "https://ahara-be.onrender.com"; // empty = same origin; change to "https://ahara-be.onrender.com" if needed

// ============================
// Helpers
// ============================
const pct = (v, digits = 1) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return '—';
  const p = n <= 1 ? n * 100 : n;
  return `${p.toFixed(digits)}%`;
};
const fmtDate = (v) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(+d) ? '—' : d.toLocaleDateString();
};

const normalizeVideos = (playlist) => {
  if (!playlist) return [];
  const raw = playlist.videos || playlist.items || playlist.lessons || [];
  if (!Array.isArray(raw)) return [];
  return raw.map((v, i) => ({
    id: v.id ?? i,
    title: v.title ?? v.name ?? `Lesson ${i + 1}`,
    duration: v.duration_minutes ?? v.duration ?? v.length_minutes ?? null,
    thumbnail: v.thumbnail ?? v.image ?? playlist.thumbnail ?? '',
    slug: v.slug ?? null,
  }));
};

// ============================
// Skeletons
// ============================
const HeroSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div className="relative rounded-xl overflow-hidden glass">
      <div className="w-full h-96 bg-white/5 animate-pulse" />
    </div>
    <div className="p-2 space-y-4">
      <div className="h-5 w-28 bg-white/5 animate-pulse rounded" />
      <div className="h-10 w-3/4 bg-white/5 animate-pulse rounded" />
      <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
      <div className="h-4 w-5/6 bg-white/5 animate-pulse rounded" />
      <div className="flex gap-2">
        <div className="h-8 w-24 bg-white/5 animate-pulse rounded" />
        <div className="h-8 w-24 bg-white/5 animate-pulse rounded" />
      </div>
      <div className="h-12 w-40 bg-white/5 animate-pulse rounded-xl" />
    </div>
  </div>
);

const VideoSkeleton = () => (
  <div className="glass rounded-xl overflow-hidden border border-dark flex">
    <div className="w-40 h-28 bg-white/5 animate-pulse" />
    <div className="p-4 flex-1 space-y-3">
      <div className="h-5 w-3/4 bg-white/5 animate-pulse rounded" />
      <div className="h-4 w-1/3 bg-white/5 animate-pulse rounded" />
    </div>
  </div>
);

// ============================
// Small UI bits
// ============================
const StatChip = ({ icon: Icon, label, value }) => (
  <div className="px-3 py-2 rounded-md bg-surface-2 border border-dark text-xs flex items-center gap-2">
    <Icon size={14} className="text-cyan-400" />
    <span className="text-text-secondary">{label}:</span>
    <span className="font-semibold text-text-primary">{value}</span>
  </div>
);

const VideoRow = memo(function VideoRow({ v, idx, playlistId }) {
  return (
    <Link
      to={v.slug ? `/player/${playlistId}/${v.slug}` : `/player/${playlistId}?i=${idx}`}
      className="glass rounded-xl overflow-hidden border border-dark flex hover:border-cyan-400/50 transition-all"
    >
      <div className="relative w-40 h-28 shrink-0">
        <img
          src={v.thumbnail}
          alt={v.title}
          className="w-40 h-28 object-cover"
          loading={idx < 2 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={idx < 2 ? 'high' : 'auto'}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity grid place-items-center">
          <PlayCircle className="text-white/90" size={36} />
        </div>
      </div>
      <div className="p-4 flex-1">
        <h4 className="text-sm md:text-base font-semibold text-text-primary line-clamp-2">
          {idx + 1}. {v.title}
        </h4>
        <p className="mt-2 text-xs text-text-secondary flex items-center gap-2">
          <Clock size={14} /> {v.duration ? `${v.duration} min` : '—'}
        </p>
      </div>
    </Link>
  );
});

// ============================
// Page
// ============================
export default function DetailsPage() {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();

  const [pl, setPl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setErr('');
    setLoading(true);

    const abort = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content/playlist/${id}/`, {
          signal: abort.signal,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json?.data ?? json;

        if (mounted.current) {
          setPl(data);
          setLoading(false);
        }
      } catch (e) {
        if (e.name !== 'AbortError' && mounted.current) {
          setErr('Could not load this playlist.');
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted.current = false;
      abort.abort();
    };
  }, [id]);

  const videos = useMemo(() => normalizeVideos(pl), [pl]);

  const avgRating = useMemo(() => {
    const v = pl?.average_rating ?? (pl?.rating_count ? (pl.rating_sum / pl.rating_count) : 0);
    return Number.isFinite(Number(v)) ? Number(v).toFixed(1) : '—';
  }, [pl]);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="relative flex justify-between items-center mb-8">
          <Link to="/playlists" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 z-10">
            <ArrowLeft size={20} /> Back to Playlists
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface-2 text-text-primary hover:bg-surface-1 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Hero */}
        <section className="my-10">
          {loading ? (
            <HeroSkeleton />
          ) : err || !pl ? (
            <div className="glass p-8 rounded-xl text-center">
              <h1 className="text-3xl font-bold mb-2">Playlist Not Found</h1>
              <p className="text-text-secondary">{err || 'This playlist may have been removed.'}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden shadow-lg glass">
                <img
                  src={pl.thumbnail}
                  alt={pl.title}
                  className="w-full h-96 object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="text-white/80" size={80} />
                </div>
              </div>

              <div className="p-2">
                <p className="text-sm font-semibold bg-zen-gradient text-transparent bg-clip-text mb-2">
                  {pl.playlist_type?.replaceAll?.('_', ' ') || 'Playlist'}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
                  {pl.title ?? 'Untitled Playlist'}
                </h1>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  {pl.description || 'No description provided.'}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <StatChip icon={Star} label="Rating" value={avgRating} />
                  <StatChip icon={Layers} label="Videos" value={videos.length || '—'} />
                  <StatChip icon={Languages} label="Language" value={pl.language || '—'} />
                  <StatChip icon={Globe2} label="Created" value={fmtDate(pl.created_at)} />
                  <StatChip icon={Globe2} label="Updated" value={fmtDate(pl.updated_at)} />
                  <StatChip icon={PlayCircle} label="CTR" value={pct(pl.ctr ?? pl.computed_ctr ?? 0)} />
                  <StatChip icon={Clock} label="Completion" value={pct(pl.completion_rate ?? pl.computed_completion_rate ?? 0)} />
                </div>

                <Link to={`/player/${pl.id}`} className="btn-brand px-8 py-3 text-lg inline-flex items-center gap-2">
                  <PlayCircle size={20} /> Start Playlist
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Video list */}
        {!loading && pl && (
          <section className="my-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Lessons</h2>
            {videos.length === 0 ? (
              <div className="text-text-secondary glass p-6 rounded-xl">No lessons available for this playlist.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {videos.map((v, i) => (
                  <VideoRow key={v.id ?? i} v={v} idx={i} playlistId={pl.id} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
