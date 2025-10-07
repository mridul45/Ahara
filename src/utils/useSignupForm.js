import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

export const useSignupForm = () => {
  const navigate = useNavigate();

  
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCfm, setShowCfm]   = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errorDialog, setErrorDialog] = useState(null);


  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm: "",
    terms: "",
    
  });

  

  const validate = () => {
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      setLoading(true);
      await signup(email, password);
      setLoading(false);
      navigate("/otp-verification", { state: { email } });
    } catch (error) {
      setLoading(false);
      setErrorDialog(error.message || "An unexpected error occurred.");
    }
  };

  const closeErrorDialog = () => {
    setErrorDialog(null);
  };

  const handleGoogle = () => {
    // TODO: wire to your Google OAuth endpoint (e.g., /api/auth/google-login)
    console.log("Google sign-up clicked");
  };

  return {
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
    handleSubmit,
    handleGoogle,
    errorDialog,
    closeErrorDialog,
  };
};