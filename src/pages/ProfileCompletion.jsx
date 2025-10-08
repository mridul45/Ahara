import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import FormField from "../components/FormField";
import {
  MAX_BIO,
  MAX_AVATAR_MB,
  ACCEPTED_IMAGE_TYPES,
  GENDER_OPTIONS,
  classNames,
  bytesToMB,
  helper,
  GenderChips,
  AvatarUploader,
} from "../utils/profileFormUtils";

/**
 * Ahara — ProfileCompletion (Modern Redesign)
 * Change button fix:
 * - Use a real <button> that calls inputRef.current.click()
 * - Bigger hit area (padding, rounded) so clicking anywhere on it opens picker
 * - Keeps the transparent file input only over the avatar circle (no reopen loop)
 */

export default function ProfileCompletion() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const bioLeft = useMemo(() => Math.max(0, MAX_BIO - formData.bio.length), [formData.bio]);

  const updateField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") {
      updateField(name, value.slice(0, MAX_BIO));
    } else {
      updateField(name, value);
    }
  };

  const handleGenderChange = (value) => updateField("gender", value);

  const handleAvatarFile = (file) => {
    const typeOk = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const sizeOk = bytesToMB(file.size) <= MAX_AVATAR_MB;
    if (!typeOk) {
      setErrors((e) => ({ ...e, avatar: "Please upload PNG, JPG, GIF, or WEBP." }));
      return;
    }
    if (!sizeOk) {
      setErrors((e) => ({ ...e, avatar: `Max file size is ${MAX_AVATAR_MB} MB.` }));
      return;
    }
    setErrors((e) => ({ ...e, avatar: undefined }));
    updateField("avatar", file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    updateField("avatar", null);
    setAvatarPreview(null);
  };

  const validate = () => {
    const next = {};
    if (!formData.gender) next.gender = "Select your gender (or Prefer not to say).";
    if (!formData.city.trim()) next.city = "City is required.";
    if (!formData.country.trim()) next.country = "Country is required.";
    if (formData.bio.trim().length < 12) next.bio = "Tell us a little more (min 12 chars).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      // TODO: send to backend (e.g., FormData with avatar file)
      console.log("Form data:", formData);
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  const skip = () => navigate("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="background-3d-effect" />

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surface-2 text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 8 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left rail */}
        <aside className="md:col-span-2 glass rounded-2xl border border-dark p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold">Your Avatar</h2>
          <p className="text-subtle text-sm mt-1">Make it easy for your Ahara companion to recognize you.</p>

          <div className="mt-6">
            <AvatarUploader
              file={formData.avatar}
              preview={avatarPreview}
              onFile={handleAvatarFile}
              onRemove={removeAvatar}
              dragActive={dragActive}
              setDragActive={setDragActive}
              error={errors.avatar}
            />
          </div>

          <div className="mt-6 w-full">
            <div className="rounded-xl border border-dark p-4 bg-surface-2 text-left">
              <p className="text-sm text-subtle">
                Tip: Clear, front-facing photos work best. Max {MAX_AVATAR_MB} MB. Supported: PNG, JPG, WEBP, GIF.
              </p>
            </div>
          </div>
        </aside>

        {/* Right rail */}
        <section className="md:col-span-3 glass rounded-2xl border border-dark p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Complete your profile</h1>
              <p className="text-subtle mt-1">Personalize recommendations for yoga, meditation, and nutrition.</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-subtle text-sm">Step 1 of 1</span>
              <div className="mt-2 h-1 w-32 bg-white/10 rounded-full">
                <div className="h-1 bg-brand-gradient rounded-full w-3/4" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Bio */}
            <div>
              <FormField
                id="bio"
                name="bio"
                label="Bio"
                type="textarea"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="A sentence about you, your goals, or preferences…"
              />
              <div className="flex items-center justify-between">
                {errors.bio ? <p className="text-rose-400 text-sm mt-1">{errors.bio}</p> : helper("This helps tailor your Ahara experience.")}
                <span className="text-subtle text-xs mt-1">{bioLeft}/{MAX_BIO}</span>
              </div>
            </div>

            {/* Gender chips */}
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <GenderChips value={formData.gender} onChange={handleGenderChange} />
              {errors.gender ? (
                <p className="text-rose-400 text-sm mt-2">{errors.gender}</p>
              ) : (
                helper("Used to improve pose cues and content tone. Optional.")
              )}
              <select
                aria-hidden
                tabIndex={-1}
                className="hidden"
                value={formData.gender}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <option value="" />
                {GENDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Location grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  id="city"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Shimla"
                />
                {errors.city ? <p className="text-rose-400 text-sm mt-1">{errors.city}</p> : helper("We localize ingredients within 10–12 km.")}
              </div>
              <div>
                <FormField
                  id="state"
                  name="state"
                  label="State / Province"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g., Himachal Pradesh"
                />
              </div>
            </div>

            <div>
              <FormField
                id="country"
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g., India"
              />
              {errors.country ? <p className="text-rose-400 text-sm mt-1">{errors.country}</p> : helper("Needed for units, pricing, and availability.")}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end pt-2">
              <button
                type="button"
                onClick={skip}
                className="btn-ghost w-full sm:w-auto"
              >
                Skip for now
              </button>
              <button
                type="submit"
                className={classNames("btn-brand w-full sm:w-auto", saving && "opacity-80 cursor-not-allowed")}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save and Continue"}
              </button>
            </div>

            <p className="text-subtle text-xs text-center sm:text-right">
              Your data stays private. We only use it to personalize your Ahara experience.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
