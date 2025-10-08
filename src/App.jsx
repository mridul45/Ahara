import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import BusinessPage from './pages/BusinessPage'
import DetailsPage from './pages/DetailsPage'
import TutorialPlayerPage from './pages/TutorialPlayerPage'
import ProfileCompletion from './pages/ProfileCompletion'
import OtpVerify from './pages/OTPVerification'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import VyasLanding from './pages/VyasLanding'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/player/:id" element={<TutorialPlayerPage />} />
        <Route path="/profile-completion" element={<ProfileCompletion />} />
        <Route path="/otp-verification" element={<OtpVerify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/vland" element={<VyasLanding />} />
      </Routes>
    </>
  )
}

export default App