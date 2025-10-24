import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const isBrowser = typeof window !== 'undefined';

const safeLocalStorage = isBrowser
  ? window.localStorage
  : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };

const safeSessionStorage = isBrowser
  ? window.sessionStorage
  : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };

/* ================= React Query client (shared) ================= */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,      // 10 min
      gcTime: 1000 * 60 * 60 * 24,    // 24h
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

/* ================= localStorage persister ================= */
const PERSIST_KEY = 'rq:ahara:v1';

const localStoragePersister = {
  persistClient: async (client) => {
    if (!isBrowser) return;
    try {
      safeLocalStorage.setItem(PERSIST_KEY, JSON.stringify(client));
    } catch (_) { /* ignore quota/private mode */ }
  },
  restoreClient: async () => {
    if (!isBrowser) return null;
    try {
      const raw = safeLocalStorage.getItem(PERSIST_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  },
  removeClient: async () => {
    if (!isBrowser) return;
    try {
      safeLocalStorage.removeItem(PERSIST_KEY);
    } catch (_) {}
  },
};

/** Call once in any module that loads on this route to enable persistence */
export function initReactQueryPersistence(maxAgeMs = 1000 * 60 * 60 * 24) {
  if (!isBrowser) return;
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: maxAgeMs,
  });
}

/* ================= API (ETag-aware) ================= */
// Primary URL you shared (no trailing slash)
const FEATURED_URL_PRIMARY =
  'https://ahara-be.onrender.com/api/content/playlist/featured';

// Fallback with trailing slash (for DRF strict routers/redirects)
const FEATURED_URL_FALLBACK = FEATURED_URL_PRIMARY.endsWith('/')
  ? FEATURED_URL_PRIMARY
  : FEATURED_URL_PRIMARY + '/';

const ETAG_KEY = 'etag:featured:v1';

async function doFetch(url, etag) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(etag ? { 'If-None-Match': etag } : {}),
    },
    mode: 'cors',
  });
}

async function parseFeaturedResponse(res) {
  // Accept either { data: { items: [...] } } or { items: [...] }
  const json = await res.json().catch(() => null);
  if (!json) return { items: [] };
  if (Array.isArray(json.items)) return { items: json.items };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items };
  return { items: [] };
}

export async function fetchFeaturedPlaylists() {
  const etag = safeSessionStorage.getItem(ETAG_KEY);

  // 1) Try primary
  let res = await doFetch(FEATURED_URL_PRIMARY, etag);

  // If 404 or redirect oddities, try fallback with trailing slash
  if ([404].includes(res.status) || (res.redirected && !FEATURED_URL_PRIMARY.endsWith('/'))) {
    try {
      res = await doFetch(FEATURED_URL_FALLBACK, etag);
    } catch (_) { /* fall through */ }
  }

  // 304 → use cache already in QueryClient
  if (res.status === 304) {
    const cached = queryClient.getQueryData(['featuredPlaylists']);
    if (cached && Array.isArray(cached.items)) return cached;
    return { items: [] };
  }

  // Be forgiving on 404
  if (res.status === 404) {
    console.warn('Featured playlists endpoint returned 404. Check the route on BE.');
    return { items: [] };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Featured fetch failed (${res.status}): ${text || 'unknown error'}`);
  }

  const data = await parseFeaturedResponse(res);
  const newEtag = res.headers.get('ETag') || res.headers.get('Etag');
  if (newEtag) safeSessionStorage.setItem(ETAG_KEY, newEtag);

  return data; // { items: [...] }
}

/* ================= Tiny helpers ================= */
export function pct(v, digits = 1) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '—';
  const p = n <= 1 ? n * 100 : n;
  return `${p.toFixed(digits)}%`;
}
