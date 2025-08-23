import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import BusinessPage from './pages/BusinessPage'
import DetailsPage from './pages/DetailsPage'


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
      </Routes>
    </>
  )
}

export default App