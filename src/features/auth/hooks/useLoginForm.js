import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@shared/api/client.js";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false); // UX-only (doesn't touch tokens)
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [errorDialog, setErrorDialog] = useState(null);

  const validate = () => {
    if (!email || !password) {
      setErrors((p) => ({ ...p, form: "Please enter email and password." }));
      return false;
    }
    return true;
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((p) => ({ ...p, form: "" }));
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await login(email, password); // sets access in memory, sets refresh cookie server-side
      if (data?.access) {
        // Adjust route as needed
        navigate("/dashboard");
      } else {
        setErrorDialog(data?.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      // surface server details if available
      const payload = error?.payload;
      let extra = "";
      if (payload?.errors && typeof payload.errors === "object") {
        extra = Object.entries(payload.errors)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join("\n");
      } else if (payload?.detail) {
        extra = payload.detail;
      }
      const msg = [error.message, extra].filter(Boolean).join("\n");
      setErrorDialog(msg || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const closeErrorDialog = () => setErrorDialog(null);

  const handleGoogle = () => {
    // Wire to your OAuth endpoint when ready
    console.log("Google login clicked");
  };

  return {
    email, setEmail,
    password, setPassword,
    showPw, setShowPw,
    remember, setRemember,
    loading, errors,
    handleSubmit, handleGoogle,
    errorDialog, closeErrorDialog,
  };
};
