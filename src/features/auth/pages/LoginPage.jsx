import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@features/auth/components/AuthLayout.jsx";
import { useLoginForm } from "@features/auth/hooks/useLoginForm.js";
import ErrorDialog from "@shared/components/ErrorDialog.jsx";
import { ensureCsrf } from "@shared/api/client.js";

function LoginPage() {
  const {
    email, setEmail,
    password, setPassword,
    showPw, setShowPw,
    remember, setRemember,
    loading,
    errors,
    handleSubmit,
    handleGoogle,
    errorDialog,
    closeErrorDialog,
  } = useLoginForm();

  // Warm up CSRF on mount so the first POST never risks a 403
  useEffect(() => {
    ensureCsrf();
  }, []);

  return (
    <AuthLayout>
      <ErrorDialog message={errorDialog} onClose={closeErrorDialog} />

      <div className="w-full max-w-md glass border border-dark rounded-2xl p-6 sm:p-8 shadow-brand bg-surface-1 backdrop-blur">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-1 text-sm text-subtle">
            New to Ahara?{" "}
            <Link
              to="/signup"
              className="underline decoration-dotted underline-offset-4 hover:text-slate-200"
            >
              Create an account
            </Link>
          </p>
        </header>

        {/* OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="btn-ghost w-full flex items-center justify-center gap-3 transition hover:brightness-110 disabled:opacity-60"
          aria-label="Continue with Google"
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

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Email
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow disabled:opacity-60"
                placeholder="you@domain.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Z"
                  />
                </svg>
              </span>

              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-dark bg-surface-2 px-10 py-3 pr-12 text-sm placeholder:text-subtle focus:outline-none focus:shadow-brand transition-shadow disabled:opacity-60"
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
              />

              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-dark bg-surface-2 px-2 py-1 text-xs text-subtle hover:text-slate-200 transition disabled:opacity-60"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-subtle">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border border-dark bg-surface-2 accent-teal-400"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm underline decoration-dotted underline-offset-4 hover:text-slate-200"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-brand w-full active:translate-y-[1px] transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          {errors.form && (
            <p
              role="alert"
              className="mt-2 text-center text-sm text-red-400"
              aria-live="assertive"
            >
              {errors.form}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-subtle">
          By continuing, you agree to Ahara’s{" "}
          <Link to="/terms" className="underline underline-offset-4">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
