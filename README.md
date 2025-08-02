# Ahara - Wellness & Mindfulness Platform

A modern wellness platform built with Vite, React, and Tailwind CSS that combines AI-powered yoga assistance, meditation guidance, and personalized meal planning.

## Features

- **Yoga and Meditation Tutorials**: Expert-led sessions with real-time posture correction
- **AI-Powered Meal Planning**: Personalized diet charts with local ingredient sourcing
- **PosturePerfect™**: Real-time AI-driven posture correction
- **The Zen Mode**: Exclusive monastery-led meditation sessions and spiritual content

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **3D Visualization**: Three.js
- **Icons**: React Icons

## Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── layouts/        # Layout components (Auth, Dashboard)
├── pages/          # Page components
├── routes/         # Route configurations
├── services/       # API and external services
├── store/          # Redux store and slices
└── utils/          # Utility functions
```

## Getting Started

1. **Clone the repository**

```bash
git clone [repository-url]
cd ahara
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

## Docker Support

The project includes Docker configuration for containerized deployment:

```bash
# Build Docker image
./scripts/build.sh

# Start containers
./scripts/start.sh
```

## Color Theme

The project uses a custom color palette defined in `tailwind.config.js`:

- Primary Background: #F9FAFB
- Shiva Blue: #2E4A78
- Secondary White: #FFFFFF
- Shiva Black: #1C2B39

## Project Pages

- **Landing**: Homepage with feature showcase
- **Login/Signup**: Authentication pages
- **Dashboard**: User dashboard with progress tracking
- **Features**: Detailed feature demonstrations

## 3D Wireframes

The project includes several 3D wireframe models:
- Meditating Person
- Human Brain
- Helper Bot
- Shiva Model

## Routing and Navigation

The application uses React Router v7 for client-side routing. The routing configuration is set up in `src/App.jsx` and includes the following routes:

- `/` - Landing page with feature showcase and pricing
- `/login` - User authentication page
- `/signup` - New user registration
- `/dashboard` - User dashboard with progress tracking

### Navigation Implementation

- The app wraps the root component with `BrowserRouter` in `src/main.jsx`
- Navigation is handled using the `useNavigate` hook from `react-router-dom`
- The Navbar component in `layouts/components/Navbar.jsx` handles primary navigation
- Example of programmatic navigation:
  ```jsx
  const navigate = useNavigate();
  navigate('/login'); // Navigate to login page
  ```

### Protected Routes
Currently, all routes are public. If you need to add authentication:

1. Create a `PrivateRoute` component
2. Wrap protected routes with authentication checks
3. Redirect unauthenticated users to the login page

### Route Structure
```
/
├── /login
├── /signup
└── /dashboard
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License]

## Contact

[Your Contact Information]
