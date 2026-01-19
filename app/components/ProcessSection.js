"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01.",
    title: "Discovery",
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
    title: "Data-driven insights",
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

  const toggleStep = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="process" className="bg-white py-24 px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            UX audit process
          </h2>
          <p className="mt-3 text-xl text-neutral-600 max-w-3xl mx-auto">
            A proven, structured methodology ensures every recommendation is
            practical, prioritised, and backed by real user behaviour.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-3xl bg-white p-10 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-neutral-100 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center w-[410px]">
              <Image
                src="/images/process.svg"
                alt="Process illustration"
                width={410}
                height={540}
                className=" w-[380px] sm:w-[410px] sm:h-[540px]"
                priority
              />
            </div>

            {/* Accordion */}
            <div className="relative">
              <div className="space-y-0">
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
                          <p className="text-xl font-medium text-black" 
                           style={{
                                color: isActive ? "#000000" : "#000000",
                              }}
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
                                color: isActive ? "#000000" : "#000000",
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
                            <div className="space-y-2">
                              {step.checklist.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-sm font-medium text-black"
                                >
                                  <CheckIcon />
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* <div className="mt-4 h-px bg-gray-200/60" /> */}
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
        color: isActive ? "#ffffff" : "#000000", // white when active
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
