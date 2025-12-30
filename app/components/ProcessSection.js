"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01.",
    title: "Deep analysis",
    content:
      "We dig into flows, structure, and heuristics to find opportunities and blockers.",
    checklist: [],
  },
  {
    number: "02.",
    title: "Data analysis",
    content:
      "Compliance check to ensure your website is accessible to all users, including those with disabilities. Compliance check to ensure your website is accessible to all users, including those with disabilities.",
    checklist: ["Design System Review", "Visual Hierarchy", "Brand Alignment"],
  },
  {
    number: "03.",
    title: "Detailed report",
    content:
      "Clear, prioritized recommendations with visuals, examples, and supporting rationale.",
    checklist: [],
  },
  {
    number: "04.",
    title: "Implementation",
    content:
      "We work alongside your team to ship the improvements and measure outcomes.",
    checklist: [],
  },
];

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const toggleStep = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="process" className="bg-white py-24 px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Our process
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            A proven methodology to spot friction, fix it, and unlock growth.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-3xl bg-white p-10 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-neutral-100 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center">
              <Image
                src="/images/process.svg"
                alt="Process illustration"
                width={420}
                height={420}
                className="h-auto w-[380px] sm:w-[420px]"
                priority
              />
            </div>

            {/* Accordion */}
            <div className="relative">
              <div className="space-y-0">
                {steps.map((step, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <div key={step.title} className="py-2">
                      <button
                        type="button"
                        onClick={() => toggleStep(idx)}
                        className="flex w-full items-start justify-between gap-4 text-left"
                      >
                        <div className="flex items-start gap-4">
                          <p className="text-lg font-medium text-gray-600" 
                           style={{
                                color: isActive ? "#f74d7b" : "#000000",
                              }}
                          >
                            {step.number}
                          </p>

                          <div>
                            <h3
                              className={`transition-all ${
                                isActive
                                  ? "text-2xl sm:text-3xl font-bold tracking-tight"
                                  : "text-xl font-medium text-black"
                              }`}
                              style={{
                                color: isActive ? "#f74d7b" : "#000000",
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
                            backgroundColor: isActive ? "#f74d7b" : "#ffffff",
                          }}
                          aria-hidden="true"
                        >
                          <ChevronDown isActive={isActive} />
                        </span>
                      </button>

                      {isActive && (
                        <div className="mt-3 pl-[3.2rem] space-y-3 text-base text-gray-600 leading-relaxed">
                          <p>{step.content}</p>

                          {step.checklist.length > 0 && (
                            <div className="space-y-2">
                              {step.checklist.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-base font-medium text-gray-800"
                                >
                                  <CheckIcon />
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-4 h-px bg-gray-200/60" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
        color: isActive ? "#ffffff" : "#374151", // white when active
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
