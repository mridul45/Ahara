import { useTheme } from "../hooks/useTheme";
import { classNames, maskEmail } from "../utils/otp";
import { useOtp } from "../hooks/useOtp";

/**
 * Ahara — OTP Verification (Fullscreen, Centered, Two Boxes)
 * Variant: More transparent OTP panel on the right
 */

export default function OtpVerifyFullscreenSplit({ email: emailProp }) {
  const { theme, toggleTheme } = useTheme();
  const {
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
  } = useOtp(emailProp);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated background */}
      <div className="background-3d-effect" />

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surface-2 text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 8 0z" /></svg>
          )}
        </button>
      </div>

      {/* Fullscreen two-box grid */}
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 w-full h-full">
        {/* LEFT BOX: Brand panel */}
        <aside className="relative h-full w-full glass border border-dark bg-surface-1 flex items-center justify-center rounded-none">
          <div className="absolute -inset-32 bg-zen-gradient opacity-10 blur-3xl" aria-hidden />
          <div className="relative w-full max-w-md p-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark bg-surface-2 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundImage: "var(--gradient-brand)" }} />
              <span className="text-xs text-subtle">Welcome to</span>
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Ahara</h1>
            <p className="text-subtle mt-2">Yoga &amp; meditation guidance with hyper-personalized local diet plans.</p>

            <ul className="mt-6 space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-md bg-brand-gradient" aria-hidden />
                <div>
                  <p className="font-semibold">Real-time posture guidance</p>
                  <p className="text-subtle text-sm">Vision-powered corrections while you practice.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-md bg-zen-gradient" aria-hidden />
                <div>
                  <p className="font-semibold">Localized meal plans</p>
                  <p className="text-subtle text-sm">Ingredients within 10–12 km, matched to your budget.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-md bg-brand-gradient" aria-hidden />
                <div>
                  <p className="font-semibold">Zen Mode</p>
                  <p className="text-subtle text-sm">Advanced meditations, sutras &amp; mantras by monks.</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        {/* RIGHT BOX: OTP form (more transparent) */}
        <main
          className="relative h-full w-full glass border border-dark flex items-center justify-center rounded-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="w-full max-w-md p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Verify your email</h2>
              <p className="text-subtle mt-1">
                Enter the 4-digit code sent to <span className="font-medium">{maskEmail(email) || "your email"}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex justify-between gap-2 sm:gap-3">
                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                  <input
                    key={i}
                    ref={inputsRef.current[i]}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    type="text"
                    maxLength={1}
                    className={classNames(
                      "glass border border-dark rounded-xl",
                      "w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-semibold",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    )}
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    value={digits[i]}
                    onChange={(e) => onChange(i, e.target.value)}
                    onKeyDown={(e) => onKeyDown(i, e)}
                    onPaste={(e) => onPaste(i, e)}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </div>

              <div className="min-h-[24px] mt-3 text-center" aria-live="polite">
                {error && <p className="text-rose-400 text-sm">{error}</p>}
                {!error && notice && <p className="text-emerald-500 text-sm">{notice}</p>}
              </div>

              {/* ---- RESEND ROW (first thing) ---- */}
              <div className="mt-4 text-sm text-subtle text-center sm:text-left w-full">
                Didn’t get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className={classNames(
                    "underline underline-offset-2",
                    secondsLeft > 0 ? "opacity-60 cursor-not-allowed" : "hover:opacity-100"
                  )}
                  disabled={secondsLeft > 0}
                >
                  Resend
                </button>
                {secondsLeft > 0 && (
                  <span className="ml-2">
                    in {String(Math.floor(secondsLeft / 60)).padStart(1, "0")}:
                    {String(secondsLeft % 60).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* ---- BUTTONS ON NEW LINE ---- */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                {/* Ghost / Secondary */}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className={classNames(
                    "relative group overflow-hidden",
                    "inline-flex items-center justify-center w-full sm:w-auto",
                    "px-5 py-2 min-h-[44px] rounded-2xl font-semibold",
                    "bg-white/5 border border-white/10 text-text-primary text-center leading-tight break-words",
                    "transition-all duration-200 ease-out",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/40",
                    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98]"
                  )}
                >
                  {/* Shine sweep */}
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/10 blur-md opacity-0
                               group-hover:left-full group-hover:opacity-100 transition-all duration-700"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Use a different email</span>
                </button>

                {/* Brand / Primary — CYAN NEON */}
                <button
                  type="submit"
                  disabled={!isComplete || verifying}
                  aria-busy={verifying ? "true" : "false"}
                  className={classNames(
                    "relative group overflow-hidden",
                    "inline-flex items-center justify-center w-full sm:w-auto",
                    "px-5 py-2 min-h-[44px] rounded-2xl font-semibold text-white",
                    // neon cyan base
                    "bg-gradient-to-tr from-cyan-400 via-cyan-500 to-cyan-400",
                    "border border-cyan-200/30",
                    // cyan glow + depth
                    "shadow-[0_0_24px_rgba(34,211,238,.35),0_8px_24px_rgba(0,0,0,.35)]",
                    "transition-all duration-200 ease-out",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
                    (!isComplete || verifying)
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,.55),0_12px_32px_rgba(0,0,0,.45)] active:translate-y-0 active:scale-[.98]"
                  )}
                >
                  {/* Outer cyan glow layer */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-2xl bg-cyan-400/25 blur-xl opacity-0
                               group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Shine sweep */}
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/30 blur-md opacity-0
                               group-hover:left-full group-hover:opacity-100 transition-all duration-700"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">
                    {verifying ? (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        Verifying…
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </span>
                </button>
              </div>

              <p className="text-subtle text-xs mt-4 text-center">
                We’ll only use your email to secure your account and personalize your Ahara experience.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
