import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCfm, setShowCfm]   = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading]   = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    terms: "",
    form: "",
  });

  // Simple strength hint (for UX only)
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) return { label: "Weak", className: "text-red-400" };
    if (score === 3) return { label: "Medium", className: "text-yellow-400" };
    return { label: "Strong", className: "text-emerald-400" };
  }, [password]);

  const validate = () => {
    const next = { fullName: "", email: "", password: "", confirm: "", terms: "", form: "" };
    if (fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) next.email = "Please enter a valid email address.";
    if (password.trim().length < 6) next.password = "Password must be at least 6 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!acceptTerms) next.terms = "You must accept the Terms to continue.";
    setErrors(next);
    return !next.fullName && !next.email && !next.password && !next.confirm && !next.terms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((p) => ({ ...p, form: "" }));
    if (!validate()) return;

    try {
      setLoading(true);
      // TODO: Call your real signup API here (Django endpoint).
      setTimeout(() => {
        setLoading(false);
        navigate("/onboarding"); // or /dashboard after signup
      }, 600);
    } catch {
      setLoading(false);
      setErrors((p) => ({ ...p, form: "Signup failed. Please try again." }));
    }
  };

  const handleGoogle = () => {
    // TODO: wire to your Google OAuth endpoint (e.g., /api/auth/google-login)
    console.log("Google sign-up clicked");
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    showPw,
    setShowPw,
    showCfm,
    setShowCfm,
    acceptTerms,
    setAcceptTerms,
    loading,
    errors,
    strength,
    handleSubmit,
    handleGoogle,
  };
};