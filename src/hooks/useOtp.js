import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/api";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 45;

export function useOtp(emailProp) {
  const navigate = useNavigate();
  const location = useLocation();

  // email priority: prop > location.state.email > ?email=
  const qsEmail = new URLSearchParams(location.search).get("email") || undefined;
  const email = emailProp || location.state?.email || qsEmail || "";

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef(Array.from({ length: OTP_LENGTH }, () => React.createRef()));

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = code.length === OTP_LENGTH && /^\d{4}$/.test(code);

  useEffect(() => { inputsRef.current[0]?.current?.focus(); }, []);
  useEffect(() => {
    if (secondsLeft <= 0) return; const t = setInterval(() => setSecondsLeft(s => s - 1), 1000); return () => clearInterval(t);
  }, [secondsLeft]);

  const onChange = (i, val) => {
    setError(""); setNotice("");
    const v = (val || "").replace(/\D/g, "");
    if (!v) { setDigits(d => { const nd = [...d]; nd[i] = ""; return nd; }); return; }
    const chars = v.split("").slice(0, OTP_LENGTH);
    setDigits(prev => { const next = [...prev]; let idx = i; for (const c of chars) { if (idx > OTP_LENGTH - 1) break; next[idx++] = c; } return next; });
    const focusIndex = Math.min(i + (chars.length || 1), OTP_LENGTH - 1); inputsRef.current[focusIndex]?.current?.focus();
  };

  const onKeyDown = (i, e) => {
    setError(""); setNotice("");
    if (e.key === "Backspace") { e.preventDefault(); if (digits[i]) { setDigits(d => { const nd = [...d]; nd[i] = ""; return nd; }); } else if (i > 0) { inputsRef.current[i - 1]?.current?.focus(); setDigits(d => { const nd = [...d]; nd[i - 1] = ""; return nd; }); } }
    else if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); inputsRef.current[i - 1]?.current?.focus(); }
    else if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) { e.preventDefault(); inputsRef.current[i + 1]?.current?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); inputsRef.current[0]?.current?.focus(); }
    else if (e.key === "End") { e.preventDefault(); inputsRef.current[OTP_LENGTH - 1]?.current?.focus(); }
  };

  const onPaste = (i, e) => {
    const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, ""); if (!text) return; e.preventDefault();
    const chars = text.slice(0, OTP_LENGTH).split("");
    setDigits(prev => { const next = [...prev]; let idx = i; for (const c of chars) { if (idx > OTP_LENGTH - 1) break; next[idx++] = c; } return next; });
    const focusIndex = Math.min(i + chars.length, OTP_LENGTH - 1); inputsRef.current[focusIndex]?.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setNotice("");
    if (!isComplete) { setError("Enter the 4-digit code sent to your email."); return; }
    try { 
      setVerifying(true); 
      await verifyOtp(email, code);
      navigate("/dashboard"); 
    }
    catch { setError("Invalid or expired code. Please try again or resend a new one."); }
    finally { setVerifying(false); }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return; setError(""); setNotice("");
    try { 
      await resendOtp(email);
      setSecondsLeft(RESEND_SECONDS); 
      setNotice("A new code has been sent to your email."); 
    }
    catch { setError("We couldn't resend the code right now. Please try again."); }
  };

  return {
    OTP_LENGTH,
    email,
    digits,
    inputsRef,
    secondsLeft,
    verifying,
    error,
    notice,
    isComplete,
    onChange,
    onKeyDown,
    onPaste,
    handleSubmit,
    handleResend,
    navigate
  }
}