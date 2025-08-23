// src/pages/Signup.jsx
import React from "react";
import { useSignupForm } from "../utils/useSignupForm";
import Authlayout from "../layouts/Authlayout";

function Signup() {
  const {
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
  } = useSignupForm();

  return (
    <Authlayout>
      <div className="w-full max-w-md glass border border-dark rounded-2xl p-6 sm:p-8 shadow-brand bg-surface-1 backdrop-blur">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="mt-1 text-sm text-subtle">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline decoration-dotted underline-offset-4 hover:text-slate-200"
            >
              Sign in
            </a>
          </p>
        </header>

        {/* OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          className="btn-ghost w-full flex items-center justify-center gap-3 transition hover:brightness-110"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5C17 16.9 14.8 18.3 12 18.3c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.3 12 5.3c1.7 0 3.2.6 4.4 1.7l2.7-2.7C17.6 2.5 14.9 1.5 12 1.5 6.8 1.5 2.5 5.8 2.5 11s4.3 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.1 0-.6-.1-1.1-.2-1.7H12z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-subtle">
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          or
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full name */}
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm">
              Full name
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                  />
                </svg>
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow"
                placeholder="Your name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "name-err" : undefined}
              />
            </div>
            {errors.fullName && (
              <p id="name-err" className="mt-1 text-xs text-red-400">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Email
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
                  />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow"
                placeholder="you@domain.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-err" className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 pr-12 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "pw-err" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-dark bg-surface-2 px-2 py-1 text-xs text-subtle hover:text-slate-200 transition"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-1 text-xs">
              <span className={strength.className}>Strength: {strength.label}</span>
            </div>
            {errors.password && (
              <p id="pw-err" className="mt-1 text-xs text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm">
              Confirm password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Z"
                  />
                </svg>
              </span>
              <input
                id="confirm"
                type={showCfm ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 pr-12 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow"
                placeholder="••••••••"
                aria-invalid={!!errors.confirm}
                aria-describedby={errors.confirm ? "cfm-err" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowCfm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-dark bg-surface-2 px-2 py-1 text-xs text-subtle hover:text-slate-200 transition"
                aria-label={showCfm ? "Hide confirm password" : "Show confirm password"}
              >
                {showCfm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && (
              <p id="cfm-err" className="mt-1 text-xs text-red-400">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="inline-flex items-start gap-3 text-sm text-subtle">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border border-dark bg-surface-2 accent-teal-400"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                I agree to Ahara’s{" "}
                <a href="/terms" className="underline underline-offset-4">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4">Privacy Policy</a>.
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-xs text-red-400">{errors.terms}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-brand w-full active:translate-y-[1px] transition"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          {errors.form && (
            <p role="alert" className="mt-2 text-center text-sm text-red-400">
              {errors.form}
            </p>
          )}
        </form>
      </div>
    </Authlayout>
  );
}

export default Signup;
