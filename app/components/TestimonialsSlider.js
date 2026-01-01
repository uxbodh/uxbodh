"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is a UX Audit and why do I need one?",
    answer:
      "A UX Audit is a detailed evaluation of your website or app to uncover usability issues, design inconsistencies, and conversion barriers. It helps you understand what's confusing users and what's stopping them from taking action, so you can improve engagement and ROI.",
  },
  {
    question: "What do you check during a UX Audit?",
    answer:
      "We examine navigation, content clarity, accessibility, performance, forms, and conversion paths to highlight friction and opportunities.",
  },
  {
    question: "How long does a UX Audit take?",
    answer: "Most audits take 10-14 days depending on complexity and scope.",
  },
  {
    question: "Will I get actionable recommendations?",
    answer:
      "Yes. You'll receive prioritized, ready-to-implement tasks with examples, references, and acceptance criteria.",
  },
  {
    question: "Do you also audit mobile apps?",
    answer:
      "Absolutely. Every audit includes responsive checks to ensure great experiences on mobile, tablet, and desktop.",
  },
  {
    question: "Can you fix the issues after the audit?",
    answer:
      "We can collaborate with your team or lead implementation sprints to ship improvements quickly.",
  },
];

export default function TestimonialsSlider() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-[740px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-5xl font-bold tracking-tight text-black sm:text-[48px]">
            No dumb questions
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-[900px] divide-y divide-[#e5e5e5]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="py-6">
                <button
                  className="flex w-full items-center justify-between py-2 text-left"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-semibold text-[#000000]">
                    {faq.question}
                  </span>

                  {/* NEW ARROW ICON */}
                  <span
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    <ArrowDownIcon />
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="mt-2 w-[80%] text-[14px] leading-[1.65] text-[#000000] pb-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========= arrow icon component ========= */

function ArrowDownIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
