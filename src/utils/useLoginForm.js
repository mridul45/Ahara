import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });

  const validate = () => {
    const next = { email: "", password: "", form: "" };
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) next.email = "Please enter a valid email address.";
    if (password.trim().length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return !next.email && !next.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((p) => ({ ...p, form: "" }));
    if (!validate()) return;

    try {
      setLoading(true);
      // TODO: Call your real login API here (Django endpoint).
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 600);
    } catch {
      setLoading(false);
      setErrors((p) => ({ ...p, form: "Login failed. Please try again." }));
    }
  };

  const handleGoogle = () => {
    // TODO: wire to your Google OAuth endpoint (e.g., /api/auth/google-login)
    console.log("Google login clicked");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPw,
    setShowPw,
    remember,
    setRemember,
    loading,
    errors,
    handleSubmit,
    handleGoogle,
  };
};