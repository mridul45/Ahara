// src/services/api.js
// Fetch-only client for Ahara (access in memory, refresh via HttpOnly cookie)

export const API_BASE =
  (import.meta?.env?.VITE_API_BASE) ||
  "https://ahara-be.onrender.com";

// ---------------- In-memory tokens (DO NOT persist) ----------------
let ACCESS_TOKEN = null; // short-lived access (Authorization header)
let CSRF_TOKEN = null;   // value returned by /users/auth/csrf/ in JSON

export function setAccessToken(token) {
  ACCESS_TOKEN = token || null;
}
export function getAccessToken() {
  return ACCESS_TOKEN;
}

// ---------------- Utilities ----------------
async function parseJsonSafe(response) {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

// Unwrap our standard API envelope { status, data, errors, ... }
function unwrap(payload) {
  if (!payload) return payload;
  return Object.prototype.hasOwnProperty.call(payload, "data") ? payload.data : payload;
}

function extractApiErrorMessage(payload) {
  if (!payload) return null;
  if (typeof payload === "string") return payload;

  // Prefer our envelope fields if present
  if (payload.status && (payload.status.message || payload.status.text)) {
    return payload.status.message || payload.status.text;
  }
  if (payload.errors && (payload.errors.detail || payload.errors.message)) {
    return payload.errors.detail || payload.errors.message;
  }

  // DRF defaults
  if (payload.detail) return payload.detail;
  if (payload.message) return payload.message;

  // Field errors
  if (payload.errors && typeof payload.errors === "object") {
    const parts = Object.entries(payload.errors).map(([k, v]) =>
      Array.isArray(v) ? `${k}: ${v.join(", ")}` : `${k}: ${v}`
    );
    if (parts.length) return parts.join("\n");
  }
  return null;
}

// ---------------- CSRF handling ----------------
const CSRF_SEED_URL = `${API_BASE}/users/auth/csrf/`;

/**
 * Ensures we have a CSRF token in memory.
 * Backend returns { ok: true, csrfToken: "<token>" } and also sets csrftoken cookie.
 * We don't read the cookie (3rd-party); we just keep csrfToken in memory.
 */
export async function ensureCsrf() {
  if (CSRF_TOKEN) return CSRF_TOKEN;
  try {
    const res = await fetch(CSRF_SEED_URL, { credentials: "include" });
    const payload = await parseJsonSafe(res);
    if (payload?.csrfToken) CSRF_TOKEN = payload.csrfToken;
  } catch {
    // swallow; POSTs without CSRF will 403 and bubble the error
  }
  return CSRF_TOKEN;
}

function csrfHeadersIfNeeded(method) {
  if (!/post|put|patch|delete/i.test(method)) return {};
  return CSRF_TOKEN ? { "X-CSRFToken": CSRF_TOKEN } : {};
}

// ---------------- Core wrapper: fetch with auth + single 401 refresh ----------------
export async function fetchWithAuth(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const method = (options.method || "GET").toUpperCase();

  // For unsafe methods, make sure we have CSRF in memory
  if (/post|put|patch|delete/i.test(method)) {
    await ensureCsrf();
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(csrfHeadersIfNeeded(method)),
  };

  if (ACCESS_TOKEN) headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;

  const first = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: "include", // send refresh cookie
  });

  if (first.status !== 401) return first;

  // 401 -> try refresh once
  const ok = await tryRefreshAccess();
  if (!ok) return first; // propagate original 401

  // retry original request with new access
  const retryHeaders = { ...headers, Authorization: `Bearer ${ACCESS_TOKEN}` };
  return fetch(url, {
    ...options,
    method,
    headers: retryHeaders,
    credentials: "include",
  });
}

let refreshInFlight = null;
async function tryRefreshAccess() {
  if (refreshInFlight) return refreshInFlight; // de-dupe parallel 401s

  refreshInFlight = (async () => {
    await ensureCsrf();
    const headers = { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") };

    const res = await fetch(`${API_BASE}/users/auth/refresh/`, {
      method: "POST",
      headers,
      credentials: "include", // send refresh cookie
      body: JSON.stringify({}), // server reads cookie only
    });

    const payload = await parseJsonSafe(res);
    const data = unwrap(payload);

    // Debug (optional)
    console.groupCollapsed("Refresh Debug");
    console.log("Status:", res.status, res.statusText);
    console.log("Payload:", payload);
    console.log("Unwrapped:", data);
    console.groupEnd();

    refreshInFlight = null;

    if (!res.ok || !data?.access) return false;
    setAccessToken(data.access);
    return true;
  })();

  return refreshInFlight;
}

// ---------------- Auth APIs ----------------
export const signup = async (email, password) => {
  await ensureCsrf();
  const response = await fetch(`${API_BASE}/users/auth/register/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") },
    body: JSON.stringify({ email, password }),
  });

  const payload = await parseJsonSafe(response);
  const data = unwrap(payload);

  // Debug (optional)
  console.groupCollapsed("Signup Debug");
  console.log("Status:", response.status, response.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  if (!response.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${response.status} ${response.statusText}` ||
      "Signup failed. Please try again.";
    const err = new Error(msg);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }
  return data; // no tokens yet; OTP sent
};

export const verifyOtp = async (email, otp) => {
  await ensureCsrf();
  const response = await fetch(`${API_BASE}/users/auth/verify-otp/`, {
    method: "POST",
    credentials: "include", // allow Set-Cookie of refresh
    headers: { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") },
    body: JSON.stringify({ email, otp }),
  });

  const payload = await parseJsonSafe(response);
  const data = unwrap(payload);

  console.groupCollapsed("Verify OTP Debug");
  console.log("Status:", response.status, response.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  if (!response.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${response.status} ${response.statusText}` ||
      "OTP verification failed. Please try again.";
    const err = new Error(msg);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }

  if (data?.access) setAccessToken(data.access); // refresh set as cookie
  return data;
};

export const resendOtp = async (email) => {
  await ensureCsrf();
  const response = await fetch(`${API_BASE}/users/auth/resend-otp/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") },
    body: JSON.stringify({ email }),
  });

  const payload = await parseJsonSafe(response);
  const data = unwrap(payload);

  console.groupCollapsed("Resend OTP Debug");
  console.log("Status:", response.status, response.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  if (!response.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${response.status} ${response.statusText}` ||
      "Failed to resend OTP. Please try again.";
    const err = new Error(msg);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }
  return data;
};

export const login = async (email, password) => {
  await ensureCsrf();
  const response = await fetch(`${API_BASE}/users/auth/login/`, {
    method: "POST",
    credentials: "include", // allow Set-Cookie of refresh
    headers: { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") },
    body: JSON.stringify({ email, password }),
  });

  const payload = await parseJsonSafe(response);
  const data = unwrap(payload);

  // Debug (your earlier logs showed 200 with data.access present)
  console.groupCollapsed("Login Debug");
  console.log("Status:", response.status, response.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  if (!response.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${response.status} ${response.statusText}` ||
      "Login failed. Please try again.";
    const err = new Error(msg);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }

  if (data?.access) setAccessToken(data.access); // refresh set as cookie
  else {
    // If backend ever changes format again, fail loudly for visibility
    console.warn("Login succeeded but no access token found in response `data`.");
  }
  return data;
};

export const getProfile = async () => {
  const res = await fetchWithAuth(`/users/auth/me/`, { method: "GET" });
  const payload = await parseJsonSafe(res);
  const data = unwrap(payload);

  console.groupCollapsed("Profile Debug");
  console.log("Status:", res.status, res.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  if (!res.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${res.status} ${res.statusText}` ||
      "Failed to fetch profile.";
    const err = new Error(msg);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return data;
};

export const logout = async () => {
  await ensureCsrf();
  const res = await fetch(`${API_BASE}/users/auth/logout/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...csrfHeadersIfNeeded("POST") },
    body: JSON.stringify({}),
  });

  const payload = await parseJsonSafe(res);
  const data = unwrap(payload);

  console.groupCollapsed("Logout Debug");
  console.log("Status:", res.status, res.statusText);
  console.log("Payload:", payload);
  console.log("Unwrapped:", data);
  console.groupEnd();

  setAccessToken(null); // drop access in memory
  if (!res.ok) {
    const msg =
      extractApiErrorMessage(payload) ||
      `${res.status} ${res.statusText}` ||
      "Logout failed.";
    const err = new Error(msg);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return true;
};
