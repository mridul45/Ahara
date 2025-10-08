

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