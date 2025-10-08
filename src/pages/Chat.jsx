// src/pages/Chat.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageSquare,
  Plus,
  Send,
  StopCircle,
  RotateCcw,
  Trash2,
  Paperclip,
  Loader2,
  Settings,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Clock,
  Search,
  MoreVertical,
  Copy,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const spring = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 };

const STORAGE_KEY = "vyas_chat_threads_v1";
const CURRENT_KEY = "vyas_current_thread_v1";

function uid() { return Math.random().toString(36).slice(2, 10); }
function nowISO() { return new Date().toISOString(); }

/* ----------------------------- LocalStorage utils ----------------------------- */
function loadThreads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveThreads(threads) { localStorage.setItem(STORAGE_KEY, JSON.stringify(threads)); }
function loadCurrentId() { return localStorage.getItem(CURRENT_KEY); }
function saveCurrentId(id) { localStorage.setItem(CURRENT_KEY, id || ""); }

/* ------------------------------ API (mock stream) ----------------------------- */
async function* mockStreamResponse() {
  const fake =
    "Absolutely. Here’s a sharpened response from **Vyas**.\n\n" +
    "• Clear structure\n• Actionable steps\n• Copy-ready code\n\n" +
    "```python\nfrom math import hypot\n\ndef hyp(a, b):\n    return hypot(a, b)\n```\n\n" +
    "Ask me anything to continue.";
  const tokens = fake.split(/(\s+)/);
  for (let i = 0; i < tokens.length; i++) {
    await new Promise((r) => setTimeout(r, 14));
    yield tokens[i];
  }
}
async function* fetchVyasStream({ messages, signal }) {
  // Replace with your real streaming endpoint (NDJSON / SSE / chunked fetch)
  // const resp = await fetch("/api/ai/vyas/chat", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ messages }) });
  // const reader = resp.body.getReader(); const dec = new TextDecoder();
  // while (true) { const { value, done } = await reader.read(); if (done) break; yield dec.decode(value); }

  for await (const t of mockStreamResponse()) {
    if (signal?.aborted) break;
    yield t;
  }
}

/* --------------------------------- Helpers ---------------------------------- */
function formatDay(d) {
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });
}
const DayDivider = ({ when }) => (
  <div className="sticky top-0 z-10 flex items-center justify-center py-2">
    <span className="text-[11px] tracking-wide uppercase bg-black/30 backdrop-blur rounded-full px-3 py-1 border border-white/10 text-white/70 shadow">
      {formatDay(when)}
    </span>
  </div>
);

function renderMarkdownLite(text) {
  const parts = text.split(/```/g);
  const nodes = [];
  parts.forEach((chunk, i) => {
    if (i % 2 === 1) {
      nodes.push(
        <pre
          key={`code-${i}`}
          className="my-3 rounded-xl bg-zinc-950 text-zinc-100 p-4 overflow-x-auto border border-white/10 shadow-inner relative"
        >
          <code>{chunk.replace(/^\w+\n/, "")}</code>
        </pre>
      );
    } else {
      const paras = chunk.trim().split(/\n{2,}/);
      paras.forEach((p, j) => {
        if (!p.trim()) return;
        nodes.push(
          <p key={`p-${i}-${j}`} className="leading-7 whitespace-pre-wrap selection:bg-cyan-500/20">
            {p}
          </p>
        );
      });
    }
  });
  return nodes;
}

/* ------------------------------ Background FX -------------------------------- */
/* Dimmed soft-glow + faint grid + grain + vignette */
function BackgroundLayers() {
  return (
    <>
      {/* Soft, DIMMED glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 -top-24 -left-24 h-64 w-64 rounded-full blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.18), transparent 72%)" }}
        animate={{ x: [0, 8, -6, 0], y: [0, -5, 3, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 -bottom-24 -right-24 h-80 w-80 rounded-full blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.16), transparent 72%)" }}
        animate={{ x: [0, -6, 9, 0], y: [0, 5, -3, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-1/3 right-1/4 h-56 w-56 rounded-full blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.12), transparent 72%)" }}
        animate={{ x: [0, 5, -5, 0], y: [0, 3, -3, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint grid + grain */}
      <div className="absolute inset-0 -z-10 bg-grid pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
      <div className="absolute inset-0 -z-10 grain opacity-[0.06] pointer-events-none" />

      {/* Softer vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(80% 60% at 50% 120%, rgba(99,102,241,0.08), transparent 60%)" }}
      />
    </>
  );
}

/* -------------------------------- Components --------------------------------- */
const CodeCopy = ({ content, className = "" }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      title="Copy"
      onClick={async () => {
        try { await navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 900); } catch {}
      }}
      className={`absolute top-2 right-2 text-[11px] px-2 py-1 rounded-md border border-white/10 bg-black/40 hover:bg-black/60 ${className}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  const chunks = useMemo(() => msg.content.split(/```/g), [msg.content]);
  return (
    <div className="group w-full py-3">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div
          className={`rounded-2xl border transition shadow-3d-selected ${
            isUser ? "bg-cyan-500/8 border-cyan-300/20" : "liquid-glass"
          }`}
        >
          <div className="flex items-start gap-3 p-4">
            <div
              className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl grid place-items-center border ${
                isUser
                  ? "bg-cyan-500/15 border-cyan-400/30"
                  : "bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 border-white/10"
              }`}
              title={isUser ? "You" : "Vyas"}
            >
              {isUser ? <MessageSquare className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div className="min-w-0 flex-1">
              {chunks.map((chunk, i) => {
                if (i % 2 === 1) {
                  const codeOnly = chunk.replace(/^\w+\n/, "");
                  return (
                    <div key={`f-${i}`} className="relative my-3">
                      <CodeCopy content={codeOnly} />
                      <pre className="rounded-xl bg-zinc-950 text-zinc-100 p-4 overflow-x-auto border border-white/10 shadow-inner">
                        <code>{codeOnly}</code>
                      </pre>
                    </div>
                  );
                }
                return (
                  <div key={`t-${i}`} className="prose prose-invert max-w-none">
                    {renderMarkdownLite(chunk)}
                  </div>
                );
              })}
            </div>

            {!isUser && (
              <div className="opacity-0 group-hover:opacity-100 transition">
                <button
                  title="Copy message"
                  onClick={async () => { try { await navigator.clipboard.writeText(msg.content); } catch {} }}
                  className="p-2 rounded-lg border border-white/10 hover:bg-white/10"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="px-4 pb-3 text-[11px] text-white/55 flex items-center gap-2">
            <span>{isUser ? "You" : "Vyas"}</span>
            <span>•</span>
            <time dateTime={msg.created_at}>
              {new Date(msg.created_at).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true })}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

const EmptyState = ({ onExample }) => {
  const examples = [
    "Summarize a technical doc in bullet points",
    "Design a Postgres schema for a blog app",
    "Explain a traceback and propose fixes",
    "Draft a professional email response",
  ];
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        <div className="mx-auto mb-5 w-12 h-12 rounded-2xl grid place-items-center bg-white/5 border border-white/10 shadow">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">Chat with Vyas</h2>
        <p className="text-sm text-white/60 mt-1">Crisp, helpful and dependable — tuned for work.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => onExample(e)}
              className="text-left rounded-xl p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition shadow-sm"
            >
              <div className="flex items-center gap-2 text-[12px] text-white/60">
                <Clock className="w-3.5 h-3.5" /> Example
              </div>
              <div className="mt-1 text-sm leading-6">{e}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --------------------------------- Main Page --------------------------------- */
export default function Chat() {
  const [threads, setThreads] = useState(loadThreads());
  const [currentId, setCurrentId] = useState(loadCurrentId());
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const taRef = useRef(null);
  const searchRef = useRef(null);

  // Initialize a default thread on mount (nice to have)
  useEffect(() => {
    if (!threads.length) {
      const id = uid();
      const empty = { id, title: "New chat", created_at: nowISO(), updated_at: nowISO(), messages: [] };
      const next = [empty];
      setThreads(next); setCurrentId(id); saveThreads(next); saveCurrentId(id);
    } else if (!currentId) {
      setCurrentId(threads[0].id); saveCurrentId(threads[0].id);
    }
  }, []); // eslint-disable-line

  // Autosize textarea
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 260) + "px";
  }, [input]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); searchRef.current?.focus(); }
      if (mod && e.key.toLowerCase() === "n") { e.preventDefault(); newChat(); }
      if (e.key === "Escape" && isStreaming) { e.preventDefault(); stopStreaming(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isStreaming]);

  const current = useMemo(() => threads.find((t) => t.id === currentId) || null, [threads, currentId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [current?.messages?.length, isStreaming]);

  function updateThread(updater) {
    setThreads((prev) => {
      const next = updater(prev);
      saveThreads(next);
      return next;
    });
  }

  function newChat() {
    const id = uid();
    const thread = { id, title: "New chat", created_at: nowISO(), updated_at: nowISO(), messages: [] };
    const next = [thread, ...threads];
    setThreads(next);
    setCurrentId(id);
    saveThreads(next);
    saveCurrentId(id);
  }

  function deleteThread(id) {
    const next = threads.filter((t) => t.id !== id);
    setThreads(next);
    saveThreads(next);
    if (currentId === id) {
      const fallback = next[0]?.id || "";
      setCurrentId(fallback);
      saveCurrentId(fallback);
    }
  }

  function renameThreadTitleIfNeeded(threadId, firstUserMsg) {
    updateThread((prev) =>
      prev.map((t) =>
        t.id !== threadId || t.title !== "New chat" ? t : { ...t, title: firstUserMsg.slice(0, 48) || "New chat" }
      )
    );
  }

  /* -------------------------- FIXED send flow (robust) ------------------------- */
  async function sendMessage(text) {
    const cleaned = (text || "").trim();
    if (!cleaned) return false;

    // Ensure a thread exists (bootstrap if needed)
    let thread = current;
    if (!thread) {
      const id = uid();
      thread = { id, title: "New chat", created_at: nowISO(), updated_at: nowISO(), messages: [] };
      updateThread((prev) => [thread, ...prev]); // insert at top
      setCurrentId(thread.id);
      saveCurrentId(thread.id);
    }

    const userMsg = { id: uid(), role: "user", content: cleaned, created_at: nowISO() };
    const assistantMsg = { id: uid(), role: "assistant", content: "", created_at: nowISO() };

    // push user + placeholder assistant into THAT thread
    updateThread((prev) =>
      prev.map((t) =>
        t.id === thread.id ? { ...t, updated_at: nowISO(), messages: [...t.messages, userMsg, assistantMsg] } : t
      )
    );
    renameThreadTitleIfNeeded(thread.id, cleaned);

    setIsStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const messages = [...(thread.messages || []), userMsg].map((m) => ({ role: m.role, content: m.content }));
      for await (const token of fetchVyasStream({ messages, signal: controller.signal })) {
        if (controller.signal.aborted) break;
        updateThread((prev) =>
          prev.map((t) => {
            if (t.id !== thread.id) return t;
            const msgs = [...t.messages];
            const idx = msgs.findIndex((m) => m.id === assistantMsg.id);
            if (idx !== -1) {
              msgs[idx] = { ...msgs[idx], content: (msgs[idx].content || "") + token };
            }
            return { ...t, messages: msgs, updated_at: nowISO() };
          })
        );
      }
      return true; // streaming started successfully
    } catch (e) {
      updateThread((prev) =>
        prev.map((t) =>
          t.id === thread.id
            ? {
                ...t,
                messages: [
                  ...t.messages.filter((m) => m.id !== assistantMsg.id),
                  {
                    id: uid(),
                    role: "assistant",
                    created_at: nowISO(),
                    content: "Sorry, I hit a snag generating the response. Try again.",
                  },
                ],
              }
            : t
        )
      );
      return false;
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  function stopStreaming() { abortRef.current?.abort(); }

  function regenerateLast() {
    if (!current) return;
    const lastUser = [...current.messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      updateThread((prev) =>
        prev.map((t) =>
          t.id === current.id ? { ...t, messages: t.messages.filter((m, i, arr) => !(i === arr.length - 1 && m.role === "assistant")) } : t
        )
      );
      sendMessage(lastUser.content);
    }
  }

  function clearCurrent() {
    if (!current) return;
    updateThread((prev) =>
      prev.map((t) => (t.id === current.id ? { ...t, messages: [], updated_at: nowISO(), title: "New chat" } : t))
    );
  }

  function exportThread() {
    if (!current) return;
    const blob = new Blob([JSON.stringify(current, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(current.title || "chat").replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onExample(text) {
    setInput(text);
    setTimeout(() => { sendMessage(text).then((ok) => ok && setInput("")); }, 40);
  }

  const filteredThreads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((t) => (t.title || "").toLowerCase().includes(q));
  }, [threads, query]);

  // Day dividers
  const messageWithDividers = useMemo(() => {
    if (!current?.messages?.length) return [];
    const out = [];
    let lastDay = "";
    for (const m of current.messages) {
      const d = new Date(m.created_at);
      const key = d.toDateString();
      if (key !== lastDay) {
        out.push({ _divider: true, id: `div-${key}-${m.id}`, created_at: m.created_at });
        lastDay = key;
      }
      out.push(m);
    }
    return out;
  }, [current?.messages]);

  return (
    <div className="relative h-[100dvh] w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] bg-slate-950 text-slate-100 overflow-hidden">
      <BackgroundLayers />

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "block" : "hidden lg:block"} bg-transparent`}>
        <div className="h-full flex flex-col liquid-glass">
          <div className="h-14 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl grid place-items-center bg-white/5 border border-white/10 shadow">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-semibold tracking-tight">Vyas</div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-white/10" title="Hide sidebar">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3">
            <div className="flex gap-2">
              <button
                onClick={newChat}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2 shadow-sm"
                title="New chat (⌘/Ctrl + N)"
              >
                <Plus className="w-4 h-4" /> New chat
              </button>
            </div>
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chats"
                className="w-full pl-9 pr-3 h-9 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>
          </div>

          <div className="px-2 overflow-y-auto flex-1 space-y-1 custom-scrollbar">
            {filteredThreads.map((t) => {
              const active = currentId === t.id;
              const isEditing = editingId === t.id;
              const updatedTime = new Date(t.updated_at || t.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              return (
                <div
                  key={t.id}
                  className={`group relative rounded-xl border cursor-pointer ${
                    active ? "liquid-glass" : "bg-transparent hover:bg-white/5 border-transparent"
                  }`}
                  onClick={() => { setCurrentId(t.id); saveCurrentId(t.id); }}
                  onDoubleClick={() => { setEditingId(t.id); setEditTitle(t.title || ""); }}
                >
                  <div className="flex items-center gap-2 px-3 py-2">
                    <MessageSquare className="w-4 h-4 shrink-0 opacity-80" />
                    {isEditing ? (
                      <div className="flex items-center gap-1 flex-1">
                        <input
                          autoFocus
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.stopPropagation();
                              updateThread((prev) => prev.map((th) => th.id === t.id ? { ...th, title: editTitle || "New chat" } : th));
                              setEditingId(null);
                            }
                            if (e.key === "Escape") { setEditingId(null); }
                          }}
                          className="flex-1 h-8 rounded-md bg-white/5 border border-white/10 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                        />
                        <button
                          className="p-1 rounded hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateThread((prev) => prev.map((th) => th.id === t.id ? { ...th, title: editTitle || "New chat" } : th));
                            setEditingId(null);
                          }}
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded hover:bg-white/10" onClick={(e) => { e.stopPropagation(); setEditingId(null); }} title="Cancel">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="truncate text-sm flex-1">{t.title || "New chat"}</div>
                        <span className="text-[11px] text-white/45">{updatedTime}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingId(t.id); setEditTitle(t.title || ""); }}
                          className="ml-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10"
                          title="Rename"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteThread(t.id); }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {!filteredThreads.length && (
              <div className="text-center text-sm opacity-60 py-6">No matches</div>
            )}
          </div>

          <div className="p-3 flex items-center justify-between text-xs text-white/60 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Model: Vyas</span>
            </div>
            <button className="px-2 py-1 rounded-lg hover:bg-white/10 text-xs inline-flex items-center gap-1">
              <Settings className="w-3.5 h-3.5" /> Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 liquid-glass flex items-center justify-between px-3 md:px-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/10" title="Show sidebar">
              <PanelLeftOpen className="w-4 h-4" />
            </button>
            <div className="font-semibold">Chat</div>
            <div className="text-xs text-white/60">with Vyas</div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={exportThread} className="px-2 py-1 rounded-lg hover:bg-white/10 text-sm inline-flex items-center gap-1" title="Export chat (.json)">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={clearCurrent} className="px-2 py-1 rounded-lg hover:bg-white/10 text-sm inline-flex items-center gap-1" title="Clear messages">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10" title="More">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
          {messageWithDividers.length ? (
            <AnimatePresence initial={false} mode="popLayout">
              {messageWithDividers.map((m) =>
                m._divider ? (
                  <motion.div key={m.id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={spring} layout>
                    <DayDivider when={m.created_at} />
                  </motion.div>
                ) : (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={spring} layout>
                    <MessageBubble msg={m} />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          ) : (
            <EmptyState onExample={onExample} />
          )}

          {isStreaming && (
            <div className="max-w-3xl mx-auto px-4 md:px-6 pb-4">
              <div className="inline-flex items-center gap-2 text-xs text-white/70">
                <Loader2 className="w-4 h-4 animate-spin" /> Generating…
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="p-3 md:p-4">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl liquid-glass px-2.5 py-2 focus-within:ring-2 focus-within:ring-cyan-500/25">
              <div className="flex items-end gap-2">
                <button className="p-2 rounded-xl hover:bg-white/10 border border-white/10" title="Attach (coming soon)">
                  <Paperclip className="w-4 h-4" />
                </button>
                <textarea
                  ref={taRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const txt = input;
                      const ok = await sendMessage(txt);
                      if (ok) setInput("");
                    }
                  }}
                  placeholder="Ask anything…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent focus:outline-none text-sm md:text-base leading-6 md:leading-7 placeholder:text-white/40 py-2"
                />
                {!isStreaming ? (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={async () => {
                      const txt = input;
                      const ok = await sendMessage(txt);
                      if (ok) setInput("");
                    }}
                    className="p-2 md:p-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15"
                    title="Send"
                    transition={spring}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={stopStreaming}
                    className="p-2 md:p-2.5 rounded-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30"
                    title="Stop generating"
                    transition={spring}
                  >
                    <StopCircle className="w-4 h-4" />
                  </motion.button>
                )}
              </div>

              <div className="flex items-center justify-between px-1 pt-2">
                <div className="text-[11px] text-white/60">
                  <span>Enter</span> to send · <span>Shift+Enter</span> for newline · <span>⌘/Ctrl+K</span> search · <span>⌘/Ctrl+N</span> new chat
                </div>
                {!isStreaming && current?.messages?.length > 0 && (
                  <button
                    onClick={regenerateLast}
                    className="text-xs px-2 py-1 rounded-lg hover:bg-white/10 inline-flex items-center gap-1"
                    title="Regenerate last answer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2 text-center text-[11px] text-white/50">
              Vyas can make mistakes. Check important info.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------- Utilities CSS ------------------------------- */
/* If you don’t already have a global scrollbar style, keep this minimal class.
.custom-scrollbar::-webkit-scrollbar { height: 10px; width: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 9999px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
*/
