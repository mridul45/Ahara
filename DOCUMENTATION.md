# Ahara Vite + React + Tailwind CSS Project

## Overview
This project is a production-ready React application bootstrapped with Vite and styled using Tailwind CSS. It follows best practices for scalable frontend development, with all main folders (assets, components, hooks, layouts, pages, routes, services, store, utils) located in the root `src` directory.

## Project Structure
- **src/**: Main source code
  - **assets/**: Contains static files such as images, SVGs, fonts, and other media used throughout the app. Example: `react.svg` for branding or UI elements.
  - **components/**: Houses reusable React components (buttons, modals, form elements, etc.) that can be shared across different pages and features.
  - **hooks/**: Custom React hooks for encapsulating logic that can be reused (e.g., data fetching, state management, event handling).
  - **layouts/**: Layout components that define the overall structure of pages (headers, footers, sidebars, etc.), ensuring consistent UI across the app.
  - **pages/**: Page-level components representing distinct views/routes in the app (e.g., Home, Dashboard, Profile).
  - **routes/**: Routing configuration, typically using React Router, to map URLs to page components and handle navigation.
  - **services/**: Contains business logic and API calls (e.g., functions for fetching data from a backend, authentication, etc.).
  - **store/**: State management logic, such as Redux slices and store configuration. Example: `counterSlice.js` and `store.js` for managing global state.
  - **utils/**: Utility functions and helpers used across the codebase (e.g., formatting, validation, calculations).

- **public/**: Static files served at the root, such as the main HTML file and public assets.

- **scripts/**: Shell scripts for automating tasks like building and starting the app (`build.sh`, `start.sh`).

- **Configuration files**:
  - **Dockerfile** and **docker-compose.yml**: For containerization and orchestration.
  - **postcss.config.cjs**: Tailwind CSS integration.
  - **tailwind.config.js**: Tailwind CSS customization.
  - **vite.config.js**: Vite build and dev server configuration.
  - **eslint.config.js**: Linting rules for code quality.

## Folder Usage Summary

- Organize code by feature/domain for scalability.
- Reusable components and hooks promote maintainability.
- Layouts ensure consistent UI.
- Pages and routes handle navigation and view rendering.
- Services abstract API and business logic.
- Store centralizes state management.
- Utils provide shared helper functions.
- Assets and public folders manage static resources.

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run locally:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview production build:**
   ```sh
   npm run preview
   ```

## Docker Usage
- **Build image:**
  ```sh
  ./scripts/build.sh
  ```
- **Start app:**
  ```sh
  ./scripts/start.sh
  ```

## Customization
- Add new features by creating files in the appropriate `src` subfolders.
- Update Tailwind styles in `src/index.css` and `tailwind.config.js`.
- Configure environment variables in `docker-compose.yml` as needed.

## Best Practices
- Use functional components and hooks.
- Organize code by feature/domain.
- Write reusable and testable components.
- Use ESLint for code quality.
- Containerize for consistent deployment.

## References
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---
For further details, see comments in individual source files and configuration files.
