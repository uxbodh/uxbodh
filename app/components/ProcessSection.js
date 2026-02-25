"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01.",
    title: "Discovery",
    image: "/images/discovery.jpg",
    content:
      "We understand your business goals, audience, and current challenges, and align the audit with what actually matters for your product, market, and success metrics.",
    checklist: [
      "Understand business model",
      "Identify target audience",
      "Review user flows",
    ],
  },
  {
    number: "02.",
    title: "Deep Analysis",
    image: "/images/deep-analysis.jpg",
    content:
      "We analyse user journeys, conversion funnels, heatmaps, navigation flow, and interaction behaviour to uncover where users get confused, drop off, or feel friction.",
    checklist: [
      "Key Pages UX heuristic evaluation",
      "Funnel report analysis",
      "Information architecture review",
    ],
  },
  {
    number: "03.",
    title: "UX Audit Process",
    image: "/images/detailed-report.jpg",
    content:
      "You receive clear findings with severity levels and impact on business metrics, backed by real user data rather than opinions or guesswork.",
    checklist: [
      "Prioritised list of issues",
      "Severity levels and estimated business impact",
      "Quick wins improvement recommendations",
    ],
  },
  {
    number: "04.",
    title: "Implementation plan",
    image: "/images/implementation.jpg",
    content:
      "We give actionable fixes your team or developer can implement immediately, along with priorities and quick wins so improvements start showing measurable results faster.",
    checklist: [
      "Step-by-step fixes recommendations",
      "Design & UX best-practice guidelines",
      "Developer-ready task list with priorities",
    ],
  },
];

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  // For animation direction (optional bonus)
  const [prevIndex, setPrevIndex] = useState(1);
  const direction = useMemo(() => {
    if (activeIndex === null) return "down";
    return activeIndex > prevIndex ? "down" : "up";
  }, [activeIndex, prevIndex]);

  useEffect(() => {
    if (activeIndex !== null) setPrevIndex(activeIndex);
  }, [activeIndex]);

  const toggleStep = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  const activeStep = activeIndex !== null ? steps[activeIndex] : steps[1];

  return (
    <section id="process" className="bg-white pb-[130px] pt-[50px] px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-black mb-8">
            UX audit process
          </h2>
          <p className="mt-3 text-xl text-black max-w-3xl mx-auto">
            A proven, structured methodology ensures every recommendation is
            practical, prioritised, and backed by real user behaviour.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-3xl bg-white p-6  sm:p-10 lg:p-12 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-neutral-100">
          <div className="grid gap-10 lg:grid-cols-[40%_60%] lg:items-center">
            {/* Image (changes with accordion) */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-[410px] h-[420px] sm:h-[460px] lg:h-[540px] overflow-hidden">
                <div
                  key={activeStep.image}
                  className={`absolute inset-0 ${
                    direction === "down"
                      ? "animate-fadeSlideDown"
                      : "animate-fadeSlideUp"
                  }`}
                >
                  <Image
                    src={activeStep.image}
                    alt={`${activeStep.title} illustration`}
                    width={410}
                    height={540}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Accordion */}
            <div className="relative">
              <div className="space-y-0 pr-12 max-h-[300px] overflow-y-auto lg:max-h-none">
                {steps.map((step, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <div key={step.title} className="py-7 border-b last:border-0">
                      <button
                        type="button"
                        onClick={() => toggleStep(idx)}
                        className="flex w-full items-start justify-between gap-4 text-left"
                      >
                        <div className="flex items-start gap-6">
                          <p
                            className="text-xl font-medium text-black"
                            style={{ color: "#000000" }}
                          >
                            {step.number}
                          </p>

                          <div>
                            <h3
                              className={`transition-all ${
                                isActive
                                  ? "text-2xl sm:text-5xl font-bold tracking-tight"
                                  : "text-xl font-medium text-black"
                              }`}
                              style={{
                                color: "#000000",
                              }}
                            >
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {/* arrow circle */}
                        <span
                          className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border transition-transform ${
                            isActive
                              ? "rotate-180 text-white border-transparent"
                              : "text-gray-700 border-gray-200"
                          }`}
                          style={{
                            backgroundColor: isActive ? "#000000" : "#ffffff",
                          }}
                          aria-hidden="true"
                        >
                          <ChevronDown isActive={isActive} />
                        </span>
                      </button>

                      {isActive && (
                        <div className="mt-6 pl-[3.2rem] space-y-3 text-base text-gray-600 leading-relaxed pr-10">
                          <p>{step.content}</p>

                          {step.checklist.length > 0 && (
                            <div className="space-y-2 py-7">
                              {step.checklist.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-sm font-normal text-black"
                                >
                                  <CheckIcon />
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Local CSS (works even without tailwind.config change) */}
          <style jsx global>{`
            @keyframes fadeSlideDown {
              0% {
                opacity: 0;
                transform: translateY(10px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes fadeSlideUp {
              0% {
                opacity: 0;
                transform: translateY(-10px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-fadeSlideDown {
              animation: fadeSlideDown 350ms ease-out;
            }
            .animate-fadeSlideUp {
              animation: fadeSlideUp 350ms ease-out;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5 text-green-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function ChevronDown({ isActive }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4"
      style={{
        color: isActive ? "#ffffff" : "#000000",  
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
