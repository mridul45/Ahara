import{r,j as e}from"./index-CB-mNDZp.js";import{u as se}from"./useTheme-Bc_bN3WG.js";import{c as i}from"./createLucideIcon-86pJkcdx.js";import{S as ae,M as re}from"./sun-Co-oKzdy.js";import{S as ne}from"./settings-CaQnQYmg.js";/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],le=i("arrow-up",oe);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]],de=i("chevrons-left",ie);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]],me=i("chevrons-right",ce);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],he=i("chevrons-up-down",ge);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],pe=i("download",xe);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8",key:"18ogeb"}]],U=i("infinity",ue);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],fe=i("menu",be);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],we=i("plus",ye);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],ve=i("square",ke);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],q=i("trash-2",je);/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],W=i("x",Ne),$e=()=>{const F="http://localhost:8080/v1/ask/stream",[y,d]=r.useState([]),[g,w]=r.useState(null),[k,P]=r.useState("vyas-pro"),[v,V]=r.useState(!1),[B,N]=r.useState(!1),[S,$]=r.useState(!1),[X,A]=r.useState(!1),[j,O]=r.useState(!1),{theme:z,toggleTheme:Y}=se(),h=r.useRef(null),x=r.useRef(null),C=r.useRef(null),T=r.useRef(null),D={"vyas-pro":"Vyas Pro","vyas-lite":"Vyas Lite","vyas-creative":"Vyas Creative"};r.useEffect(()=>{const t=localStorage.getItem("vyas_conversations"),s=localStorage.getItem("vyas_selected_model"),a=localStorage.getItem("vyas_sidebar_collapsed");t&&d(JSON.parse(t)),s&&P(s),a&&V(JSON.parse(a))},[]),r.useEffect(()=>{localStorage.setItem("vyas_conversations",JSON.stringify(y)),localStorage.setItem("vyas_selected_model",k),localStorage.setItem("vyas_sidebar_collapsed",JSON.stringify(v))},[y,k,v]),r.useEffect(()=>{const t=document.createElement("link");return t.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",t.rel="stylesheet",document.head.appendChild(t),()=>{document.head.removeChild(t)}},[]);const c=()=>{h.current&&(h.current.abort(),h.current=null,O(!1))},M=async t=>{const s=t.trim();if(!s||j)return;let a=g;a||(a=Date.now(),w(a),d(n=>[...n,{id:a,messages:[]}])),d(n=>n.map(o=>o.id===a?{...o,messages:[...o.messages,{role:"user",content:s}]}:o)),x.current&&(x.current.value="",J()),O(!0),h.current=new AbortController;const{signal:p}=h.current;try{d(m=>m.map(b=>b.id===a?{...b,messages:[...b.messages,{role:"assistant",content:""}]}:b));const n=await fetch(F,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({prompt:s,model:k}),signal:p});if(!n.ok||!n.body)throw new Error(`HTTP ${n.status}`);const o=n.body.getReader(),u=new TextDecoder("utf-8");let l="";for(;;){const{value:m,done:b}=await o.read();if(b)break;l+=u.decode(m,{stream:!0});let H;for(;(H=l.indexOf(`

`))>=0;){const te=l.slice(0,H);l=l.slice(H+2);let f="";for(const _ of te.split(`
`))_.startsWith("data:")&&(f+=`${_.slice(5)}
`);if(f=f.trimEnd(),!!f){if(f==="[DONE]"){c();return}d(_=>_.map(I=>{if(I.id===a){const E=[...I.messages],R=E.length-1;if(R>=0){const L=E[R];L.role==="assistant"&&(E[R]={...L,content:L.content+f})}return{...I,messages:E}}return I}))}}}}catch(n){p.aborted||(console.error(n),d(o=>o.map(u=>{if(u.id===a){const l=[...u.messages],m=l[l.length-1];return m?.role==="assistant"&&m.content===""&&(l[l.length-1]={...m,content:`[Error] ${n.message||n}`}),{...u,messages:l}}return u})))}finally{O(!1),h.current=null}},J=()=>{const t=x.current;if(!t)return;t.style.height="auto";const s=Math.min(t.scrollHeight,160);t.style.height=`${s}px`,t.style.overflowY=t.scrollHeight>160?"auto":"hidden"},Z=()=>{c(),w(null)},G=t=>{window.confirm("Are you sure you want to delete this chat?")&&(c(),d(s=>s.filter(a=>a.id!==t)),g===t&&w(null))},K=()=>{window.confirm("Delete ALL conversations? This cannot be undone.")&&(c(),d([]),w(null),N(!1))};r.useEffect(()=>{C.current&&(C.current.scrollTop=C.current.scrollHeight)},[y,g]),r.useEffect(()=>{const t=s=>{T.current&&!T.current.contains(s.target)&&$(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]),r.useEffect(()=>{const t=s=>{s.key==="Escape"&&j&&c()};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[j]);const Q=()=>{const t=[...y].sort((s,a)=>a.id-s.id);return t.length===0?e.jsx("p",{className:"px-2 py-4 text-sm text-center text-gray-500 collapsible-text",children:"No chats yet."}):t.map(s=>{const a=s.messages.find(o=>o.role==="user"),p=a?a.content:"New Chat",n=p.length>25?`${p.substring(0,25)}...`:p;return e.jsxs("div",{className:`group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${s.id===g?"bg-gray-300/70 dark:bg-gray-700/70":""}`,onClick:()=>{c(),w(s.id),A(!1)},children:[e.jsx("span",{className:"text-sm flex-grow pr-2 truncate collapsible-text",children:n}),e.jsx("button",{"data-id":s.id,onClick:o=>{o.stopPropagation(),G(s.id)},className:"delete-chat-btn opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500 hover:text-white transition-opacity shrink-0",children:e.jsx(q,{className:"w-4 h-4"})})]},s.id)})},ee=y.find(t=>t.id===g);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{id:"app",className:`flex h-screen w-full bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-300 ${v?"sidebar-collapsed":""}`,children:[e.jsxs("aside",{id:"sidebar",className:`bg-gray-200 dark:bg-gray-800 w-72 p-4 flex flex-col fixed inset-y-0 left-0 transform ${X?"translate-x-0":"-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3 font-bold text-xl brand-container",children:[e.jsx(U,{className:"w-7 h-7 text-indigo-500 shrink-0"}),e.jsx("span",{className:"collapsible-text",children:"Vyas Chat"})]}),e.jsx("button",{onClick:()=>A(!1),className:"md:hidden p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700",children:e.jsx(W,{className:"w-5 h-5"})})]}),e.jsx("div",{className:"flex flex-col gap-2 mb-4",children:e.jsxs("button",{onClick:Z,className:"w-full bg-indigo-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors",children:[e.jsx(we,{className:"w-5 h-5 shrink-0"}),e.jsx("span",{className:"collapsible-text",children:"New Chat"})]})}),e.jsx("p",{className:"px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider collapsible-text",children:"History"}),e.jsx("div",{id:"history-container",className:"flex-grow overflow-y-auto -mr-2 pr-2 space-y-1 py-2",children:Q()}),e.jsxs("div",{className:"mt-auto border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2",children:[e.jsx("button",{type:"button",onClick:()=>V(!v),className:"hidden md:flex w-full items-center justify-between p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer",children:e.jsxs("div",{className:"flex items-center gap-3",children:[v?e.jsx(me,{className:"w-5 h-5 shrink-0"}):e.jsx(de,{className:"w-5 h-5 shrink-0"}),e.jsx("span",{className:"text-sm collapsible-text",children:"Collapse"})]})}),e.jsxs("button",{type:"button",onClick:Y,className:"flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[z==="light"?e.jsx(ae,{className:"w-5 h-5 shrink-0"}):e.jsx(re,{className:"w-5 h-5 shrink-0"}),e.jsx("span",{className:"text-sm collapsible-text",children:"Theme"})]}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400 collapsible-text capitalize",children:z})]}),e.jsx("button",{type:"button",onClick:()=>N(!0),className:"flex w-full items-center justify-between p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ne,{className:"w-5 h-5 shrink-0"}),e.jsx("span",{className:"text-sm collapsible-text",children:"Settings"})]})})]})]}),e.jsxs("main",{className:"flex-1 flex flex-col h-screen",children:[e.jsxs("div",{className:"p-4 flex items-center justify-center relative",children:[e.jsx("button",{onClick:()=>A(!0),className:"md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 absolute left-4 top-1/2 -translate-y-1/2",children:e.jsx(fe,{className:"w-6 h-6"})}),e.jsxs("div",{ref:T,className:`flex items-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg rounded-full shadow-lg border border-white/40 dark:border-gray-500/30 p-1 text-sm font-medium transition-all duration-300 ${S?"expanded":""}`,children:[e.jsxs("div",{onClick:()=>$(!S),className:"px-4 py-1.5 cursor-pointer flex items-center gap-2",children:[e.jsx("span",{className:"dark:text-gray-200",children:D[k]}),e.jsx(he,{className:`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${S?"rotate-180":""}`})]}),e.jsxs("div",{className:`flex items-center gap-1 max-w-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap ${S?"max-w-xs opacity-100":""}`,children:[e.jsx("div",{className:"w-px h-5 bg-gray-200/50 dark:bg-gray-600/50 mx-1"}),Object.keys(D).map(t=>e.jsx("button",{"data-model":t,onClick:()=>{P(t),$(!1)},className:`model-btn rounded-full px-4 py-1.5 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors ${k===t?"active":""}`,children:D[t].split(" ")[1]},t))]})]})]}),g?e.jsx("div",{id:"chat-window",ref:C,className:"flex-1 overflow-y-auto p-4 md:p-6",children:e.jsx("div",{id:"message-container",className:"max-w-3xl mx-auto w-full flex flex-col gap-4",children:ee?.messages.map((t,s)=>e.jsxs("div",{className:`flex items-start gap-3 ${t.role==="user"?"justify-end":""}`,children:[t.role==="assistant"&&e.jsx("div",{className:"w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0",children:e.jsx(U,{className:"w-5 h-5"})}),e.jsx("div",{className:`message-content p-3 rounded-2xl max-w-full md:max-w-[75%] break-words ${t.role==="user"?"bg-indigo-500 text-white rounded-br-none":"bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-bl-none border border-white/30 dark:border-gray-600/30"}`,dangerouslySetInnerHTML:{__html:t.content.replace(/\n/g,"<br />")}}),t.role==="user"&&e.jsx("div",{className:"w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm shrink-0",children:"U"})]},s))})}):e.jsx("div",{id:"welcome-screen",className:"flex-1 flex flex-col items-center justify-center p-4 md:p-6",children:e.jsxs("div",{className:"relative w-full max-w-3xl mx-auto text-center",children:[e.jsx("div",{"aria-hidden":"true",className:"glow-blob glow-blob--brand left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 md:w-[520px] h-32 md:h-40"}),e.jsx("h1",{className:"relative text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",children:"Hola friend!"}),e.jsx("p",{className:"text-gray-500 dark:text-gray-400 mb-8",children:"How can I support you today?"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("button",{onClick:()=>M("Suggest a 10-minute yoga routine to energize my morning"),className:"suggestion-card text-left p-4 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-300/50 dark:border-gray-700/50",children:[e.jsx("p",{className:"font-semibold",children:"Suggest a 10-minute yoga routine"}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"to energize my morning"})]}),e.jsxs("button",{onClick:()=>M("What is box breathing? Explain it like I'm five"),className:"suggestion-card text-left p-4 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-300/50 dark:border-gray-700/50",children:[e.jsx("p",{className:"font-semibold",children:"What is box breathing?"}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Explain it like I'm five"})]})]})]})}),e.jsx("div",{id:"chat-form-container",className:"relative p-4 md:p-6 bg-transparent",children:e.jsx("form",{id:"chat-form",className:"relative max-w-3xl mx-auto",onSubmit:t=>{t.preventDefault(),M(x.current.value)},children:e.jsxs("div",{className:"relative flex items-end gap-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 dark:border-gray-600/50 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow duration-200 p-2",children:[e.jsx("textarea",{ref:x,id:"message-input",placeholder:"Ask about nutrition, yoga, breathwork…",className:"flex-1 bg-transparent p-2 resize-none outline-none text-sm max-h-40",rows:"1",onInput:J,onKeyDown:t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),M(x.current.value))}}),j?e.jsx("button",{type:"button",onClick:c,className:"bg-red-500 text-white rounded-xl p-3 self-end hover:bg-red-600 transition-colors",title:"Stop response (Esc)",children:e.jsx(ve,{className:"w-5 h-5"})}):e.jsx("button",{type:"submit",className:"bg-indigo-500 text-white rounded-xl p-3 self-end hover:bg-indigo-600 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed",disabled:j,children:e.jsx(le,{className:"w-5 h-5"})})]})})})]})]}),e.jsx("div",{className:`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40 ${B?"modal-visible":"modal-hidden"}`,onClick:()=>N(!1),children:e.jsxs("div",{className:"bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-6 border border-white/30 dark:border-gray-600/50",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("h3",{className:"text-xl font-bold",children:"Settings"}),e.jsx("button",{onClick:()=>N(!1),className:"p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700",children:e.jsx(W,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-medium text-gray-700 dark:text-gray-300",children:"Model Settings"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"api-key-input",className:"block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1",children:"API Key"}),e.jsx("input",{type:"password",id:"api-key-input",placeholder:"Enter your API key (optional)",className:"w-full bg-gray-200/50 dark:bg-gray-900/50 text-sm rounded-lg p-2 border border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"temp-slider",className:"block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2",children:"Creativity"}),e.jsxs("div",{className:"flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400",children:[e.jsx("span",{children:"Precise"}),e.jsx("input",{type:"range",id:"temp-slider",min:"0",max:"1",step:"0.1",defaultValue:"0.7",className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-500"}),e.jsx("span",{children:"Creative"})]})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-3 text-sm font-medium text-gray-700 dark:text-gray-300",children:"Manage Data"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[e.jsxs("button",{className:"w-full bg-gray-500/20 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-500/30 transition-colors text-sm",children:[e.jsx(pe,{className:"w-4 h-4"}),e.jsx("span",{children:"Export Chat"})]}),e.jsxs("button",{onClick:K,className:"w-full bg-red-600 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors text-sm",children:[e.jsx(q,{className:"w-4 h-4"}),e.jsx("span",{children:"Delete All Chats"})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 text-sm font-medium text-gray-700 dark:text-gray-300",children:"About"}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Vyas Chat v1.1. A simple and elegant chat interface."})]})]})]})})]})};export{$e as default};
