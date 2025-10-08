import { useCallback, useRef } from "react";

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Chip({ active, children, onClick, onKeyDown, role = "radio", tabIndex = 0, ariaChecked, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      role={role}
      aria-checked={ariaChecked}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={classNames(
        "px-3 py-2 rounded-xl border transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
        active
          ? "bg-brand-gradient text-[#0b1020] border-transparent shadow-brand"
          : "btn-ghost border-dark hover:border-cyan-400/50"
      )}
    >
      <span className="text-sm font-medium">{children}</span>
    </button>
  );
}

export const MAX_BIO = 240;
export const MAX_AVATAR_MB = 4;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

export function helper(text) {
  return <p className="text-subtle text-sm mt-1">{text}</p>;
}

export function GenderChips({ value, onChange }) {
  const onKey = useCallback(
    (e, option) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(option.value);
      }
    },
    [onChange]
  );

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Gender">
      {GENDER_OPTIONS.map((opt) => (
        <Chip
          key={opt.value}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
          onKeyDown={(e) => onKey(e, opt)}
          ariaChecked={value === opt.value}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}

export function AvatarUploader({ file, preview, onFile, onRemove, dragActive, setDragActive, error }) {
  const inputRef = useRef(null);
  const inputIdRef = useRef(`avatar-input-${Math.random().toString(36).slice(2)}`);
  const INPUT_ID = inputIdRef.current;

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) onFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onInputChange = (e) => {
    const picked = e.target.files && e.target.files[0];
    if (picked) {
      onFile(picked);
      if (inputRef.current) inputRef.current.value = ""; // allow reselecting same file
    }
  };

  return (
    <div className="relative">
      {/* glow ring behind avatar */}
      <div
        className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400/20 via-purple-400/20 to-transparent blur-2xl"
        aria-hidden
      />

      {/* Drop zone — NO programmatic click here (prevents double-open loops) */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={classNames(
          "relative w-36 h-36 rounded-full border border-dark glass bg-surface-2",
          "flex items-center justify-center overflow-hidden",
          dragActive ? "ring-2 ring-cyan-400/60" : ""
        )}
      >
        {preview ? (
          <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center px-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              className="mx-auto mb-2 h-7 w-7 text-slate-400"
              fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <path d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h2.129c.621 0 1.214.246 1.652.684l.585.585c.438.438 1.031.684 1.652.684H18.75A2.25 2.25 0 0121 8.703V16.5" />
              <path d="M3 16.5A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5M3 16.5l3.75-3.75a2.25 2.25 0 013.182 0l2.318 2.318m0 0 1.182-1.182a2.25 2.25 0 013.182 0L21 16.5" />
              <path d="M16.5 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <p className="text-xs text-subtle">Drop or use Change</p>
          </div>
        )}

        {/* Full-coverage input so circle is clickable on all browsers */}
        <input
          id={INPUT_ID}
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={onInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-hidden={false}
        />
      </div>

      <div className="flex gap-2 justify-center mt-3">
        {/* CHANGE → clicking anywhere on this button opens the picker */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-ghost text-sm px-3 py-1.5 rounded-lg inline-flex items-center justify-center"
          aria-label="Change avatar"
        >
          Change
        </button>

        {preview && (
          <button type="button" onClick={onRemove} className="btn-ghost text-sm px-3 py-1.5 rounded-lg">
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm mt-2 text-rose-400">{error}</p>}
    </div>
  );
}