"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    company: "AMBAK",
    quote:
      "Webaudit allows us to look at our data across platforms — web and app — to understand the full journey of our users. We’ve been able to cut our reporting time by 50%",
    name: "Rameshwar Gupta",
    role: "Co-Founder",
    metric: "15%",
    metricLabel: "growth",
    subLabel: "on lead conversion",
  },
  {
    company: "Northbeam",
    quote:
      "The audit gave us an actionable, prioritized plan. The team moved quickly from findings to improvements.",
    name: "Aaron Chen",
    role: "Head of Growth",
    metric: "2x",
    metricLabel: "conversion",
    subLabel: "from primary flow",
  },
  {
    company: "Latitude",
    quote:
      "Clear guidance, fast iteration, and detailed documentation that engineering could ship immediately.",
    name: "Marie Dubois",
    role: "Director of UX",
    metric: "30%",
    metricLabel: "drop-off",
    subLabel: "reduction",
  },
  {
    company: "Helio",
    quote:
      "A focused UX audit that found the issues blocking adoption. The deck was clear and the fixes shipped fast.",
    name: "Priya Patel",
    role: "VP Product",
    metric: "18%",
    metricLabel: "activation",
    subLabel: "lift",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="contact"
      className="bg-[#f5f0e8] px-6 lg:px-8 py-32 "
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="text-[38px] font-bold tracking-tight text-black sm:text-[40px]">
          Trusted by leaders
        </h2>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-[1200px] items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-[-32px] top-1/2 z-10 -translate-y-1/2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-neutral-800 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200 transition hover:bg-gray-100 sm:left-[-46px]"
          aria-label="Previous testimonial"
        >
          <ArrowLeft />
        </button>

        <div className="mx-auto flex h-full min-h-[430px] w-full max-w-[1200px] items-center overflow-hidden rounded-[30px] bg-white px-12 py-12 shadow-[0_80px_120px_-70px_rgba(0,0,0,0.35)] ring-1 ring-neutral-100 sm:min-h-[440px]">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.6fr_auto_1fr]">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5f4b8b]">
                  <Image src="/triangle-icon.svg" alt="icon" width={18} height={18} />
                </span>
                <span className="text-[20px] font-semibold uppercase tracking-tight text-black">
                  {testimonials[current].company}
                </span>
              </div>
              <p className="max-w-xl text-base leading-[1.65] text-[#3a3a3a]">
                {testimonials[current].quote}
              </p>
              <div className="pt-2">
                <p className="text-[15px] font-semibold text-neutral-900">
                  {testimonials[current].name}
                </p>
                <p className="text-[13px] text-neutral-500">{testimonials[current].role}</p>
              </div>
            </div>

            <div className="hidden h-[70%] w-px bg-[#e5e5e5]/70 md:block" />

            <div className="flex flex-col items-start justify-center md:items-center">
              <p className="text-[48px] font-bold text-[#f5426c] leading-none">
                {testimonials[current].metric}
              </p>
              <p className="mt-3 text-[36px] font-semibold text-black leading-none">
                {testimonials[current].metricLabel}
              </p>
              <p className="mt-3 text-[16px] text-neutral-600 leading-tight">
                {testimonials[current].subLabel}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[-32px] top-1/2 z-10 -translate-y-1/2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-neutral-800 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200 transition hover:bg-gray-100 sm:right-[-46px]"
          aria-label="Next testimonial"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[6px] w-[6px] rounded-full transition ${current === index ? "bg-black" : "bg-[#cdcbcb] hover:bg-neutral-500"
              }`}
            aria-label={`Testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
