"use client";

import { useEffect, useMemo, useState } from "react";

import { countryDialCodes } from "../constants/countryDialCodes";

const initialState = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  brief: "",
  interests: [],
};

const labelClasses =
  "pointer-events-none absolute left-4 transition-all text-neutral-500 font-medium";

export default function ContactForm({ onSuccess, resetSignal }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const hasInterest = useMemo(() => form.interests.length > 0, [form.interests]);

  useEffect(() => {
    setForm(initialState);
    setErrors({});
    setMessage(null);
  }, [resetSignal]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setMessage(null);
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      const nextInterests = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: nextInterests };
    });
    setErrors((prev) => ({ ...prev, interests: undefined }));
    setMessage(null);
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    const digitsOnly = form.phone.replace(/\\D/g, "");
    if (!digitsOnly) {
      nextErrors.phone = "Phone is required.";
    } else if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      nextErrors.phone = "Phone must be 8-15 digits.";
    }

    if (!hasInterest) {
      nextErrors.interests = "Select at least one option.";
    }

    if (!form.brief.trim()) nextErrors.brief = "Project brief is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          countryCode: form.countryCode.trim(),
          phone: form.phone.trim(),
          interests: form.interests,
          brief: form.brief.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data?.error || "Failed to send. Please try again." });
      } else {
        setMessage({ type: "success", text: "Message sent successfully. We'll get back shortly." });
        onSuccess?.();
        setForm(initialState);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[520px] space-y-5 text-left">
      <h3 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-[28px]">
        Get start here
      </h3>

      <div className="space-y-4">
        <FloatingInput
          label="Your Name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <FloatingInput
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />
        <PhoneRow
          countryCode={form.countryCode}
          phone={form.phone}
          onCountryChange={handleChange("countryCode")}
          onPhoneChange={handleChange("phone")}
          error={errors.phone}
        />
      </div>

      <div className="flex flex-row  gap-4">
        <p className="text-sm font-semibold text-neutral-900">Interested in?</p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-neutral-900">
          <Checkbox
            label="UX Audit"
            checked={form.interests.includes("UX Audit")}
            onChange={() => toggleInterest("UX Audit")}
          />
          <Checkbox
            label="Design & Development"
            checked={form.interests.includes("Design & Development")}
            onChange={() => toggleInterest("Design & Development")}
          />
        </div>
        {errors.interests && (
          <p className="w-full text-center text-xs text-red-500">{errors.interests}</p>
        )}
      </div>

      <FloatingTextarea
        label="Share project brief"
        value={form.brief}
        onChange={handleChange("brief")}
        error={errors.brief}
      />

      <div className="space-y-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#E94166] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(233,65,102,0.9)] transition hover:bg-[#da395c] disabled:cursor-not-allowed disabled:opacity-80"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {message && (
          <p
            className={`text-sm ${message.type === "success" ? "text-emerald-600" : "text-red-500"}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}

function FloatingInput({ label, value, onChange, type = "text", error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || (value?.length > 0);
  return (
    <div className="space-y-1">
      <label className="block">
        <div className="relative">
          <span
            className={`${labelClasses} ${active ? "top-2 text-[11px]" : "top-1/2 -translate-y-1/2 text-sm"}`}
          >
            {label}
          </span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-[52px] w-full rounded-[10px] border border-neutral-200 bg-white px-4 pb-2 pt-5 text-sm font-medium text-neutral-900 outline-none transition focus:border-neutral-400"
          />
        </div>
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PhoneRow({ countryCode, phone, onCountryChange, onPhoneChange, error }) {
  const [focused, setFocused] = useState(false);
  const activePhone = focused || (phone?.length > 0);
  return (
    <div className="space-y-1">
      <div className="flex w-full overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
        <div className="flex w-[160px] min-w-[160px] items-center gap-2 border-r border-neutral-200 px-3">
          <select
            value={countryCode}
            onChange={onCountryChange}
            className="w-full appearance-none border-none bg-transparent text-sm font-medium text-neutral-900 outline-none"
          >
            {countryDialCodes.map((entry) => (
              <option key={entry.code + entry.dial_code} value={entry.dial_code}>
                {entry.dial_code} {entry.label}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-3 w-3 text-neutral-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div className="relative flex-1 border-l border-neutral-200">
          <span
            className={`${labelClasses} ${activePhone ? "top-2 text-[11px]" : "top-1/2 -translate-y-1/2 text-xs"}`}
          >
            Phone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-[52px] w-full rounded-none px-4 pb-2 pt-5 text-sm font-medium text-neutral-900 outline-none transition focus:border-neutral-400"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-[3px] border border-neutral-400 accent-neutral-900 focus:ring-0"
      />
      {label}
    </label>
  );
}

function FloatingTextarea({ label, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || (value?.length > 0);
  return (
    <div className="space-y-1">
      <label className="block">
        <div className="relative">
          <span
            className={`${labelClasses} ${active ? "top-2 text-[11px]" : "top-4 text-xs"}`}
          >
            {label}
          </span>
          <textarea
            rows={3}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-[10px] border border-neutral-200 bg-white px-4 pb-3 pt-6 text-sm font-medium text-neutral-900 outline-none transition focus:border-neutral-400"
          />
        </div>
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
