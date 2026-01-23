"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is a UX audit and why is it important?",
    answer: (
      <>
        A UX audit is a detailed evaluation of your website or app to identify
        usability issues that prevent users from converting. It reveals design
        gaps, friction points, accessibility issues, and performance problems
        that directly affect revenue.
      </>
    ),
  },
  {
    question: "How long does a UX audit take?",
    answer: <>Most audits are completed within 5-10 working days depending on website size and complexity.</>,
  },
  {
    question: "What do I receive after the audit?",
    answer: (
      <>
        You receive a prioritized UX report including:
        <ul className="mt-2 list-disc pl-5">
          <li>screenshots and examples</li>
          <li>issue explanations</li>
          <li>business impact</li>
          <li>recommended fixes</li>
          <li>improvement checklist</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you also audit mobile apps?",
    answer: <>Yes, we audit websites, web apps, SaaS dashboards, and mobile applications.</>,
  },
  {
    question: "Will you fix issues as well?",
    answer: (
      <>
        We provide implementation guidance. If you need hands-on design or
        development support, that can be added as a separate service.
      </>
    ),
  },
  {
    question: "What types of websites do you audit?",
    answer: (
      <>
        We audit:
        <ul className="mt-2 list-disc pl-5">
          <li>corporate websites</li>
          <li>landing pages</li>
          <li>ecommerce stores</li>
          <li>SaaS dashboards</li>
          <li>mobile apps</li>
          <li>portfolio and personal brands</li>
          <li>blogs and content portals</li>
        </ul>
      </>
    ),
  },
  {
    question: "How much does a UX audit cost?",
    answer: (
      <>
        Pricing depends on:
        <ul className="mt-2 list-disc pl-5">
          <li>number of pages/screens</li>
          <li>website complexity</li>
          <li>whether analytics setup is included</li>
          <li>depth of deliverables (basic vs in-depth)</li>
        </ul>
      </>
    ),
  },
  {
    question: "Will a UX audit improve my conversion rate?",
    answer: (
      <>
        Yes - when implemented correctly. Our audits focus on:
        <ul className="mt-2 list-disc pl-5">
          <li>Removing friction from checkout & forms</li>
          <li>Improving CTA clarity</li>
          <li>Fixing confusing navigation</li>
          <li>Strengthening trust signals</li>
          <li>Reducing unnecessary steps</li>
        </ul>
      </>
    ),
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };



  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-[740px]">
        <div className="mx-auto max-w-[900px] text-center">
         
          <h2 className="text-5xl font-bold tracking-tight text-black sm:text-[48px]">
            Trusted by leaders
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
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-2 w-[80%] text-[14px] leading-[1.65] text-[#000000] pb-2">
                    {faq.answer}
                  </div>
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

