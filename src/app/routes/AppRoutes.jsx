import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LandingPage = lazy(() => import('@features/landing/pages/LandingPage.jsx'));
const VyasLandingPage = lazy(() => import('@features/landing/pages/VyasLandingPage.jsx'));
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('@features/auth/pages/SignupPage.jsx'));
const OtpVerificationPage = lazy(() => import('@features/auth/pages/OtpVerificationPage.jsx'));
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage.jsx'));
const BusinessPage = lazy(() => import('@features/dashboard/pages/BusinessPage.jsx'));
const DetailsPage = lazy(() => import('@features/dashboard/pages/DetailsPage.jsx'));
const TutorialPlayerPage = lazy(() => import('@features/dashboard/pages/TutorialPlayerPage.jsx'));
const ProfileCompletionPage = lazy(() => import('@features/profile/pages/ProfileCompletionPage.jsx'));
const ProfilePage = lazy(() => import('@features/profile/pages/ProfilePage.jsx'));
const ChatPage = lazy(() => import('@features/chat/pages/ChatPage.jsx'));

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-surface-2 text-subtle">
    Loading…
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vland" element={<VyasLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/profile-completion" element={<ProfileCompletionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/player/:id" element={<TutorialPlayerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
