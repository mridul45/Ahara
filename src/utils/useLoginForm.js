import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });

  const validate = () => {
    const next = { email: "", password: "", form: "" };
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) next.email = "Please enter a valid email address.";
    if (password.trim().length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return !next.email && !next.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((p) => ({ ...p, form: "" }));
    if (!validate()) return;

    try {
      setLoading(true);
      // TODO: Call your real auth API here.
      setTimeout(() => {
        setLoading(false);
        navigate("/business"); // update to your route
      }, 500);
    } catch (err) {
      setLoading(false);
      setErrors((p) => ({ ...p, form: "Login failed. Please try again." }));
    }
  };

  const handleGoogle = () => {
    // TODO: wire to your Google OAuth endpoint (/api/auth/google-login or similar)
    console.log("Google sign-in clicked");
  };

  return {
    email, setEmail,
    password, setPassword,
    showPw, setShowPw,
    remember, setRemember,
    loading, 
    errors, 
    handleSubmit,
    handleGoogle
  };
};
