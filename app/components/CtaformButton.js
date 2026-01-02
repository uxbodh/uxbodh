"use client";

import React, { useState } from "react";

/* ------------ Floating text input ------------ */

const FloatingInput = ({ label, type = "text" }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="
          w-full
          h-[60px]
          rounded-[12px]
          border border-[#D1D5DB]
          bg-white
          px-4
          pt-5
          pb-2
          text-[15px]
          text-black
          outline-none
          focus:border-[#9CA3AF]
        "
      />
      <span
        className={
          "pointer-events-none absolute left-4 transition-all duration-200 " +
          (isActive
            ? "top-2 text-[11px] text-[#6B7280] font-medium"
            : "top-1/2 -translate-y-1/2 text-[15px] text-[#9CA3AF]")
        }
      >
        {label}
      </span>
    </div>
  );
};

/* ------------ Floating textarea ------------ */

const FloatingTextarea = ({ label }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="
          w-full
          min-h-[100px]
          rounded-[12px]
          border border-[#D1D5DB]
          bg-white
          px-4
          pt-6
          pb-3
          text-[15px]
          text-black
          outline-none
          resize-none
          focus:border-[#9CA3AF]
        "
      />
      <span
        className={
          "pointer-events-none absolute left-4 transition-all duration-200 " +
          (isActive
            ? "top-2 text-[11px] text-[#6B7280] font-medium"
            : "top-5 text-[15px] text-[#9CA3AF]")
        }
      >
        {label}
      </span>
    </div>
  );
};

/* ------------ Phone field with country code + floating label ------------ */

const PhoneField = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <div
      className="
        w-full
        h-[60px]
        rounded-[12px]
        border border-[#D1D5DB]
        bg-white
        px-4
        flex
        items-center
        gap-3
      "
    >
      {/* country code */}
      <div className="flex items-center gap-1 pt-2">
        <select className="bg-transparent outline-none text-[15px] font-medium cursor-pointer text-black">
          <option>+91</option>
          <option>+1</option>
          <option>+44</option>
        </select>
        <span className="text-[12px] text-gray-500">▼</span>
      </div>

      {/* divider */}
      <div className="h-8 w-[1px] bg-[#D1D5DB]" />

      {/* phone input with floating label */}
      <div className="relative flex-1 h-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            absolute
            inset-0
            w-full
            h-full
            bg-transparent
            outline-none
            text-[15px]
            text-black
            pt-5
            pb-2
            pr-2
          "
        />
        <span
          className={
            "pointer-events-none absolute left-0 transition-all duration-200 " +
            (isActive
              ? "top-1 text-[11px] text-[#6B7280] font-medium"
              : "top-1/2 -translate-y-1/2 text-[15px] text-[#9CA3AF]")
          }
        >
          Phone
        </span>
      </div>
    </div>
  );
};

/* ------------ MAIN MODAL ------------ */

const CTAFormModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* card: 940 x 640 */}
      <div
        className="
          relative
          bg-white
          rounded-[26px]
          shadow-2xl
          overflow-hidden
          w-[940px]
          h-[640px]
        "
      >
        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-6
            top-5
            h-8
            w-8
            flex
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[18px]
            shadow
            hover:bg-white
            z-10
          "
        >
          ✕
        </button>

        {/* grid: left 340px, right flexible */}
        <div className="grid h-full w-full grid-cols-[340px_minmax(0,1fr)]">
          {/* LEFT SIDE */}
          <div className="relative h-full bg-black">
            <img
              src="/images/popup.jpg"
              alt="Popup illustration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            <ul className="absolute top-10 left-7 right-6 space-y-4 text-[15px] text-white leading-snug">
              {[
                "Find Hidden Usability Issues",
                "Improve Conversions & Sales",
                "Enhance User Satisfaction",
                "Save Time & Cost in Future Development",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[2px] text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE (form) */}
          <div className="px-10 py-8 flex flex-col">
            <h2 className="text-[28px] leading-tight font-bold mb-5">
              Get start here
            </h2>

            <div className="flex flex-col gap-4 flex-1">
              <FloatingInput label="Your Name" />
              <FloatingInput label="Email" type="email" />
              <PhoneField />

              {/* interested in */}
              <div className="flex flex-wrap items-center gap-3 text-[14px] font-medium py-1">
                <span className="text-black">Interested in?</span>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-[18px] w-[18px] accent-black cursor-pointer"
                    defaultChecked
                  />
                  <span>UX Audit</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-[18px] w-[18px] accent-black cursor-pointer"
                  />
                  <span>Design &amp; Development</span>
                </label>
              </div>

              <FloatingTextarea label="Share project brief" />

              <button
                type="button"
                onClick={handleSubmit}
                className="
                  mt-1
                  w-full
                  h-[52px]
                  rounded-[12px]
                  text-white
                  font-semibold
                  text-[16px]
                  shadow-lg
                  transition
                  hover:opacity-90
                "
                style={{ backgroundColor: "#F5426C" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Open Form Modal
        </button>
      )}
      
      {showModal && <CTAFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
}