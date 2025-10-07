import React, { useEffect, useRef, useState } from "react";

const ErrorDialog = ({ message, onClose, duration = 5000 }) => {
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (message) {
      setRender(true);
      requestAnimationFrame(() => setVisible(true));
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => handleClose(), duration);
    } else {
      if (render) setVisible(false);
    }
    return () => clearTimeout(closeTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setRender(false);
      onClose?.();
    }, 320);
  };

  if (!render) return null;

  // Split multi-line messages into array
  const messages = message?.split("\n").filter(Boolean) || [];

  // Capitalize field names (before colon if present)
  const formatLine = (line) => {
    if (line.includes(":")) {
      const [field, rest] = line.split(":", 2);
      return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${rest.trim()}`;
    }
    return line.charAt(0).toUpperCase() + line.slice(1);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-start justify-end p-4 sm:p-5">
      <div
        role="alert"
        aria-live="assertive"
        className={[
          "pointer-events-auto w-full max-w-sm rounded-2xl border border-dark bg-surface-1/80 backdrop-blur-lg shadow-brand",
          "p-4",
          "transform-gpu transition-[opacity,transform] duration-300 motion-safe:will-change-transform",
          visible
            ? "opacity-100 translate-y-0 translate-x-0 scale-100"
            : "opacity-0 translate-y-2 translate-x-2 scale-[0.98]",
        ].join(" ")}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg
              className="h-6 w-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="ml-3 w-0 flex-1 pt-0.5 text-sm font-medium text-red-400 text-justify">
            {messages.length > 1 ? (
              <ul className="list-disc list-inside space-y-1 text-justify">
                {messages.map((line, idx) => (
                  <li key={idx}>{formatLine(line)}</li>
                ))}
              </ul>
            ) : (
              <p className="text-justify">{formatLine(messages[0] || "")}</p>
            )}
          </div>

          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={handleClose}
              className="inline-flex rounded-md text-subtle hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Auto-dismiss progress bar */}
        <div
          className={[
            "mt-3 h-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]",
            "motion-safe:[&>span]:animate-[shrink_linear_forwards]",
          ].join(" ")}
        >
          <span
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              transformOrigin: "left center",
              animationDuration: `${duration}ms`,
            }}
            className="block bg-red-400/80"
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default ErrorDialog;
