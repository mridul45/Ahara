# Ahara — AI Wellness Companion

Ahara is a modern wellness platform that blends AI-guided yoga and meditation, a contextual nutrition planner, and an on-demand conversational coach named **Vyas**. The project is built with React 19, Vite 7, Tailwind CSS 4, and a modular architecture focused on feature isolation and reusability.

---

## Key Product Highlights

- **Immersive Landing Experience** – Depth-parallax hero, interactive cards, and multi-plan pricing with theme toggle.
- **Auth Suite** – Modern login, signup, OTP verification, and profile completion flows that plug into the shared API client.
- **Vyas Chat** – Streaming assistant UI with conversation management, model selection, and settings drawer.
- **Dashboard & Business Hub** – Rich analytics, curated tutorials, and playlist integrations powered by TanStack Query.
- **Profile Center** – Gamified overview, achievements, and editable profile with accessible form controls.

---

## Tech Stack & Tooling

- **Core**: React 19, Vite 7, ES modules
- **Styling**: Tailwind CSS 4, custom tokens in `src/app/styles/global.css`
- **State**: Redux Toolkit (`@app/store`), TanStack Query (shared query client with persistence)
- **Routing**: React Router v7 with lazy-loaded feature pages
- **3D & Motion**: `@react-three/fiber`, `@react-three/drei`, Framer Motion
- **Icons**: Lucide, Heroicons, React Icons
- **Utility**: ESLint 9, Tailwind/Vite plugins, npm scripts

---

## Project Structure

```
src/
├── app/
│   ├── App.jsx                 # Root component delegating to route definitions
│   ├── providers/              # Global providers (Redux, Router, Query)
│   ├── routes/                 # Lazy route configuration
│   ├── store/                  # Redux store + slices
│   └── styles/                 # Global Tailwind theme and tokens
├── assets/                     # Static assets (backgrounds, media, icons)
├── features/                   # Feature-first modules (landing, auth, chat, etc.)
│   ├── auth/                   # Authentication flows (pages, hooks, components)
│   ├── chat/                   # Vyas chat experience
│   ├── dashboard/              # Dashboard + business analytics interfaces
│   ├── landing/                # Marketing site components, hooks, data
│   └── profile/                # Profile overview and completion flows
├── shared/                     # Cross-cutting concerns
│   ├── api/                    # API client + React Query utilities
│   ├── components/             # Global UI primitives (Navbar, Footer, ErrorDialog, etc.)
│   └── hooks/                  # Shared hooks (theme controller, etc.)
└── main.jsx                    # App bootstrap (CSS import, provider mounting)
```

> Path aliases are configured in `vite.config.js` and `jsconfig.json`:
> - `@app/*` → `src/app/*`
> - `@features/*` → `src/features/*`
> - `@shared/*` → `src/shared/*`
> - `@assets/*` → `src/assets/*`

---

## Architectural Overview

- **Entry Point** – `src/main.jsx` loads global styles, mounts `<AppProviders>` (Redux + Router + React Query), and renders `<App />`.
- **Routing** – `src/app/routes/AppRoutes.jsx` defines all routes via `React.lazy` to enable code-splitting by feature.
- **State Management** – Central Redux store lives in `src/app/store/index.js` with slices under `store/slices`. React Query lives in `src/shared/api/reactQueryClient.js` and is initialised once in the provider layer with optional localStorage persistence.
- **API Access** – `src/shared/api/client.js` encapsulates auth headers, CSRF bootstrap, token refresh, and exposes helpers such as `login`, `signup`, and `verifyOtp`.
- **Styling System** – Tailwind tokens and bespoke CSS helpers are defined in `src/app/styles/global.css`. Components stay utility-first with minimal custom CSS.
- **Feature Isolation** – Each feature includes its own `pages`, `components`, `data`, and `hooks` where relevant, keeping dependencies local and predictable.
- **Shared Primitives** – Components used across features (Navbar, Footer, form fields, dialogs) and hooks (theme toggler) reside under `src/shared`.

---

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173 by default)
npm run dev

# Type-aware production build
npm run build

# Preview production build locally
npm run preview

# Lint JavaScript/JSX sources
npm run lint

# Deploy to GitHub Pages (requires remote setup)
npm run deploy
```

---

## Environment Configuration

- API base URL defaults to `https://ahara-be.onrender.com`. Override with `VITE_API_BASE` in an `.env` file.
- React Query persistence is browser-aware and will no-op during SSR/pre-render contexts.

Optional `.env.local` example:

```
VITE_API_BASE=https://your-api.com
```

---

## Feature Breakdown

- **Landing (`@features/landing`)**
  - Components: `Tilt3D`, `DepthParallax`, `FeatureCard`
  - Page modules: `LandingPage`, `VyasLandingPage`
  - Data: `pricingPlans.js`
  - Hook: `useLandingPage` (leverages shared `useTheme`)
- **Auth (`@features/auth`)**
  - Pages: `LoginPage`, `SignupPage`, `OtpVerificationPage`, `ProfileCompletionPage`
  - Components: `AuthLayout`
  - Hooks: `useLoginForm`, `useSignupForm`, `useOtp`
  - Utils: `otp.js`
- **Dashboard (`@features/dashboard`)**
  - Pages: `DashboardPage`, `BusinessPage`, `DetailsPage`, `TutorialPlayerPage`
  - Components: `TutorialsAndClasses`
  - Data: `appData.js`, `cardData.js`, `classData.js`
- **Chat (`@features/chat`)**
  - Page: `ChatPage` with streaming UI, sidebar management, theme persistence
- **Profile (`@features/profile`)**
  - Pages: `ProfilePage`, `ProfileCompletionPage`
  - Components: `ProfileHelpers.jsx`, `ProfileFormControls.jsx`

---

## Styling & Theming

- Dark-first palette with light-mode overrides controlled via `useTheme`.
- Tailwind 4 `@theme` tokens define typography, colours, gradients, and custom utilities.
- Utility helpers (e.g., `.glass`, `.btn-brand`, `.btn-ghost`) live alongside Tailwind imports in `global.css`.

---

## Data & API Notes

- API client handles:
  - CSRF initialisation (`ensureCsrf`)
  - Access token refresh (`tryRefreshAccess`)
  - JSON parsing and standard payload unwrapping
- React Query `fetchFeaturedPlaylists` caches ETag responses and gracefully handles offline/304/404 scenarios.

---

## Deployment & Docker

- Production build emits static assets in `dist/`.
- Docker scripts live under `scripts/` (`build.sh`, `start.sh`) for container-based workflows.
- GitHub Pages workflow uses `npm run deploy` (build + `gh-pages` publish with base path `/Ahara/`).

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-update`)
3. Commit with clear messages (`git commit -m "feat: add xyz"`)
4. Push and open a Pull Request

Lint (`npm run lint`) and build (`npm run build`) before submitting changes.

---

## License & Contact

- **License**: Add your preferred license text/link here.
- **Contact**: Replace with your preferred contact information (email, website, etc.).

---

Made with care to help people nurture mind, body, and nutrition through intelligent guidance. Namaste. 🙏
