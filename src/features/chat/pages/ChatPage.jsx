import React, { useState, useEffect, useRef } from 'react';
import {
  Infinity,
  Plus,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Square,
  ArrowUp,
  Download,
  Trash2,
} from 'lucide-react';
import { useTheme } from '@shared/hooks/useTheme.js';

const ChatPage = () => {
  /* ===== CONFIG ===== */
  const API_BASE = "http://localhost:8080";
  const STREAM_URL = `${API_BASE}/v1/ask/stream`;

  /* ===== STATE ===== */
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [selectedModel, setSelectedModel] = useState('vyas-pro');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const controllerRef = useRef(null);
  const messageInputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const modelSelectorRef = useRef(null);

  const modelNameMap = {
    'vyas-pro': 'Vyas Pro',
    'vyas-lite': 'Vyas Lite',
    'vyas-creative': 'Vyas Creative'
  };

  /* ===== STORAGE & THEME ===== */
  useEffect(() => {
    // Load initial state from localStorage
    const savedConvos = localStorage.getItem('vyas_conversations');
    const savedModel = localStorage.getItem('vyas_selected_model');
    const savedCollapsed = localStorage.getItem('vyas_sidebar_collapsed');

    if (savedConvos) setConversations(JSON.parse(savedConvos));
    if (savedModel) setSelectedModel(savedModel);
    if (savedCollapsed) setIsSidebarCollapsed(JSON.parse(savedCollapsed));
  }, []);

  useEffect(() => {
    // Persist app state
    localStorage.setItem('vyas_conversations', JSON.stringify(conversations));
    localStorage.setItem('vyas_selected_model', selectedModel);
    localStorage.setItem('vyas_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
  }, [conversations, selectedModel, isSidebarCollapsed]);

  // Load Inter font
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  /* ===== CHAT LOGIC ===== */
  const stopStream = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
      setStreaming(false);
    }
  };

  const handleSend = async (inputText) => {
    const text = inputText.trim();
    if (!text || streaming) return;

    let currentConvoId = activeConversationId;
    if (!currentConvoId) {
      currentConvoId = Date.now();
      setActiveConversationId(currentConvoId);
      setConversations(prev => [...prev, { id: currentConvoId, messages: [] }]);
    }

    setConversations(prev => prev.map(c =>
      c.id === currentConvoId
        ? { ...c, messages: [...c.messages, { role: 'user', content: text }] }
        : c
    ));

    if (messageInputRef.current) {
      messageInputRef.current.value = "";
      adjustTextareaHeight();
    }
    setStreaming(true);
    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    try {
      // Add empty assistant message
      setConversations(prev => prev.map(c =>
        c.id === currentConvoId
          ? { ...c, messages: [...c.messages, { role: 'assistant', content: '' }] }
          : c
      ));

      const res = await fetch(STREAM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
        body: JSON.stringify({ prompt: text, model: selectedModel }),
        signal
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n\n")) >= 0) {
          const frame = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          let data = "";
          for (const ln of frame.split("\n")) {
            if (ln.startsWith("data:")) data += `${ln.slice(5)}\n`;
          }
          data = data.trimEnd();
          if (!data) continue;
          if (data === "[DONE]") {
            stopStream();
            return;
          }

          // Immutable update of last assistant message
          setConversations(prev => prev.map(c => {
            if (c.id === currentConvoId) {
              const newMessages = [...c.messages];
              const lastMsgIndex = newMessages.length - 1;
              if (lastMsgIndex >= 0) {
                const lastMsg = newMessages[lastMsgIndex];
                if (lastMsg.role === 'assistant') {
                  newMessages[lastMsgIndex] = {
                    ...lastMsg,
                    content: lastMsg.content + data
                  };
                }
              }
              return { ...c, messages: newMessages };
            }
            return c;
          }));
        }
      }
    } catch (err) {
      if (!signal.aborted) {
        console.error(err);
        setConversations(prev => prev.map(c => {
          if (c.id === currentConvoId) {
            const newMessages = [...c.messages];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg?.role === 'assistant' && lastMsg.content === '') {
              newMessages[newMessages.length - 1] = {
                ...lastMsg,
                content: `[Error] ${err.message || err}`
              };
            }
            return { ...c, messages: newMessages };
          }
          return c;
        }));
      }
    } finally {
      setStreaming(false);
      controllerRef.current = null;
    }
  };

  /* ===== HELPERS ===== */
  const adjustTextareaHeight = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 160);
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > 160 ? 'auto' : 'hidden';
  };

  const handleNewChat = () => {
    stopStream();
    setActiveConversationId(null);
  };

  const handleDeleteChat = (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      stopStream();
      setConversations(prev => prev.filter(c => c.id !== idToDelete));
      if (activeConversationId === idToDelete) {
        setActiveConversationId(null);
      }
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Delete ALL conversations? This cannot be undone.')) {
      stopStream();
      setConversations([]);
      setActiveConversationId(null);
      setIsSettingsModalOpen(false);
    }
  };

  /* ===== EFFECTS ===== */
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversations, activeConversationId]);

  // Close model selector on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target)) {
        setIsModelSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && streaming) {
        stopStream();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [streaming]);

  /* ===== RENDER ===== */
  const renderHistory = () => {
    const sortedConvos = [...conversations].sort((a, b) => b.id - a.id);
    if (sortedConvos.length === 0) {
      return <p className="px-2 py-4 text-sm text-center text-gray-500 collapsible-text">No chats yet.</p>;
    }
    return sortedConvos.map(convo => {
      const firstUserMessage = convo.messages.find(m => m.role === 'user');
      const title = firstUserMessage ? firstUserMessage.content : 'New Chat';
      const truncatedTitle = title.length > 25 ? `${title.substring(0, 25)}...` : title;
      return (
        <div
          key={convo.id}
          className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${convo.id === activeConversationId ? 'bg-gray-300/70 dark:bg-gray-700/70' : ''}`}
          onClick={() => { stopStream(); setActiveConversationId(convo.id); setIsMobileSidebarOpen(false); }}
        >
          <span className="text-sm flex-grow pr-2 truncate collapsible-text">{truncatedTitle}</span>
          <button
            data-id={convo.id}
            onClick={(e) => { e.stopPropagation(); handleDeleteChat(convo.id); }}
            className="delete-chat-btn opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500 hover:text-white transition-opacity shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      );
    });
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <>
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #f9fafb;
          color: #111827;
        }
        html.dark body {
          background-color: #111827;
          color: #f9fafb;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background-color: transparent; }
        ::-webkit-scrollbar-thumb { background-color: #374151; border-radius: 4px; }
        html.dark ::-webkit-scrollbar-thumb { background-color: #4b5563; }
        ::-webkit-scrollbar-thumb:hover { background-color: #4b5563; }
        html.dark ::-webkit-scrollbar-thumb:hover { background-color: #5a6678; }

        .message-content { white-space: pre-wrap; word-wrap: break-word; }

        .modal-hidden { opacity: 0; visibility: hidden; transform: scale(0.95); transition: opacity .2s ease, visibility 0s .2s linear, transform .2s ease; }
        .modal-visible { opacity: 1; visibility: visible; transform: scale(1); transition: opacity .2s ease, transform .2s ease; }

        .model-btn.active { background-color: #ffffff90; color: #111827; }
        html.dark .model-btn.active { background-color: #00000050; color: #f9fafb; }

        .glow-blob { pointer-events: none; position: absolute; filter: blur(60px); opacity: .65; transform: translateZ(0); will-change: transform, opacity; }
        .glow-blob--brand {
          background:
            radial-gradient(60% 60% at 50% 40%, rgba(99,102,241,.65), transparent 60%),
            radial-gradient(40% 40% at 70% 60%, rgba(168,85,247,.58), transparent 60%),
            radial-gradient(40% 40% at 30% 70%, rgba(34,197,94,.46), transparent 60%);
          opacity: .85;
        }
        html.dark .glow-blob--brand {
          background:
            radial-gradient(60% 60% at 50% 40%, rgba(99,102,241,.65), transparent 60%),
            radial-gradient(40% 40% at 70% 60%, rgba(168,85,247,.58), transparent 60%),
            radial-gradient(40% 40% at 30% 70%, rgba(34,197,94,.46), transparent 60%);
          opacity: .85;
        }
        @media (prefers-reduced-motion: reduce) { .glow-blob { filter: blur(50px); } }

        #sidebar { transition: width 300ms ease-in-out; }
        .collapsible-text { transition: opacity 150ms ease, width 150ms ease; overflow: hidden; white-space: nowrap; }
        #app.sidebar-collapsed #sidebar { width: 5rem; }
        #app.sidebar-collapsed #sidebar .collapsible-text { opacity: 0; width: 0; pointer-events: none; }
        #app.sidebar-collapsed #sidebar .justify-between { justify-content: center; }
        #app.sidebar-collapsed #sidebar .gap-3 { gap: 0; }
      `}</style>

      <div
        id="app"
        className={`flex h-screen w-full bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-300 ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`bg-gray-200 dark:bg-gray-800 w-72 p-4 flex flex-col fixed inset-y-0 left-0 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 font-bold text-xl brand-container">
              <Infinity className="w-7 h-7 text-indigo-500 shrink-0" />
              <span className="collapsible-text">Vyas Chat</span>
            </div>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <button onClick={handleNewChat} className="w-full bg-indigo-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors">
              <Plus className="w-5 h-5 shrink-0" />
              <span className="collapsible-text">New Chat</span>
            </button>
          </div>

          <p className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider collapsible-text">History</p>
          <div id="history-container" className="flex-grow overflow-y-auto -mr-2 pr-2 space-y-1 py-2">
            {renderHistory()}
          </div>

          <div className="mt-auto border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex w-full items-center justify-between p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {isSidebarCollapsed ? <ChevronsRight className="w-5 h-5 shrink-0" /> : <ChevronsLeft className="w-5 h-5 shrink-0" />}
                <span className="text-sm collapsible-text">Collapse</span>
              </div>
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {theme === 'light' ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
                <span className="text-sm collapsible-text">Theme</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 collapsible-text capitalize">{theme}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="flex w-full items-center justify-between p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 shrink-0" />
                <span className="text-sm collapsible-text">Settings</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col h-screen">
          <div className="p-4 flex items-center justify-center relative">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 absolute left-4 top-1/2 -translate-y-1/2">
              <Menu className="w-6 h-6" />
            </button>
            <div
              ref={modelSelectorRef}
              className={`flex items-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg rounded-full shadow-lg border border-white/40 dark:border-gray-500/30 p-1 text-sm font-medium transition-all duration-300 ${isModelSelectorOpen ? 'expanded' : ''}`}
            >
              <div onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)} className="px-4 py-1.5 cursor-pointer flex items-center gap-2">
                <span className="dark:text-gray-200">{modelNameMap[selectedModel]}</span>
                <ChevronsUpDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isModelSelectorOpen ? 'rotate-180' : ''}`} />
              </div>
              <div className={`flex items-center gap-1 max-w-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap ${isModelSelectorOpen ? 'max-w-xs opacity-100' : ''}`}>
                <div className="w-px h-5 bg-gray-200/50 dark:bg-gray-600/50 mx-1"></div>
                {Object.keys(modelNameMap).map(modelKey => (
                  <button
                    key={modelKey}
                    data-model={modelKey}
                    onClick={() => { setSelectedModel(modelKey); setIsModelSelectorOpen(false); }}
                    className={`model-btn rounded-full px-4 py-1.5 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors ${selectedModel === modelKey ? 'active' : ''}`}
                  >
                    {modelNameMap[modelKey].split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!activeConversationId ? (
            <div id="welcome-screen" className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
              <div className="relative w-full max-w-3xl mx-auto text-center">
                <div aria-hidden="true" className="glow-blob glow-blob--brand left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 md:w-[520px] h-32 md:h-40"></div>

                <h1 className="relative text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Hola friend!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">How can I support you today?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => handleSend('Suggest a 10-minute yoga routine to energize my morning')} className="suggestion-card text-left p-4 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-300/50 dark:border-gray-700/50">
                    <p className="font-semibold">Suggest a 10-minute yoga routine</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">to energize my morning</p>
                  </button>
                  <button onClick={() => handleSend('What is box breathing? Explain it like I\'m five')} className="suggestion-card text-left p-4 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-300/50 dark:border-gray-700/50">
                    <p className="font-semibold">What is box breathing?</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explain it like I'm five</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="chat-window" ref={chatWindowRef} className="flex-1 overflow-y-auto p-4 md:p-6">
              <div id="message-container" className="max-w-3xl mx-auto w-full flex flex-col gap-4">
                {activeConversation?.messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                        <Infinity className="w-5 h-5" />
                      </div>
                    )}
                    <div
                      className={`message-content p-3 rounded-2xl max-w-full md:max-w-[75%] break-words ${msg.role === 'user'
                        ? 'bg-indigo-500 text-white rounded-br-none'
                        : 'bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-bl-none border border-white/30 dark:border-gray-600/30'}`}
                      dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }}
                    />
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm shrink-0">U</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id="chat-form-container" className="relative p-4 md:p-6 bg-transparent">
            <form
              id="chat-form"
              className="relative max-w-3xl mx-auto"
              onSubmit={(e) => { e.preventDefault(); handleSend(messageInputRef.current.value); }}
            >
              <div className="relative flex items-end gap-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 dark:border-gray-600/50 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow duration-200 p-2">
                <textarea
                  ref={messageInputRef}
                  id="message-input"
                  placeholder="Ask about nutrition, yoga, breathwork…"
                  className="flex-1 bg-transparent p-2 resize-none outline-none text-sm max-h-40"
                  rows="1"
                  onInput={adjustTextareaHeight}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(messageInputRef.current.value);
                    }
                  }}
                />
                {streaming ? (
                  <button type="button" onClick={stopStream} className="bg-red-500 text-white rounded-xl p-3 self-end hover:bg-red-600 transition-colors" title="Stop response (Esc)">
                    <Square className="w-5 h-5" />
                  </button>
                ) : (
                  <button type="submit" className="bg-indigo-500 text-white rounded-xl p-3 self-end hover:bg-indigo-600 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed" disabled={streaming}>
                    <ArrowUp className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40 ${isSettingsModalOpen ? 'modal-visible' : 'modal-hidden'}`} onClick={() => setIsSettingsModalOpen(false)}>
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-6 border border-white/30 dark:border-gray-600/50" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Settings</h3>
            <button onClick={() => setIsSettingsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Model Settings</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="api-key-input" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">API Key</label>
                  <input type="password" id="api-key-input" placeholder="Enter your API key (optional)" className="w-full bg-gray-200/50 dark:bg-gray-900/50 text-sm rounded-lg p-2 border border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none transition" />
                </div>
                <div>
                  <label htmlFor="temp-slider" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Creativity</label>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>Precise</span>
                    <input type="range" id="temp-slider" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-500" />
                    <span>Creative</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Manage Data</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button className="w-full bg-gray-500/20 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-500/30 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  <span>Export Chat</span>
                </button>
                <button onClick={handleDeleteAll} className="w-full bg-red-600 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete All Chats</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">About</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Vyas Chat v1.1. A simple and elegant chat interface.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
