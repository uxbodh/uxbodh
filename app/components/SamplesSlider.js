"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  // WEB UX AUDIT SLIDES
  {
    id: 1,
    type: "Web UX Audit",
    title: "Web UX – Version 1",
    image: "/images/home-popup.png",
    points: [
      "Users are unable to understand where to click or what actions to take due to the cluttered layout. No clear CTA is visible above the fold, leaving users without guidance on the next step.",
      "Content plays a crucial role in the overall UX. Currently, the content quality is quite poor and lacks clarity. Incorporating relevant SEO keywords would also help improve both user engagement and search visibility.",
      "The “WhatsApp” and “Schedule a Call” CTAs can be positioned as sticky elements at the top, rather than floating in the middle of the page without context.",
    ],
  },
  {
    id: 2,
    type: "Web UX Audit",
    title: "Web UX – Version 2",
    image: "/images/home-popup-2.png",
    points: [
      "Header spacing improved for better scannability.",
      "Hero section CTA made more prominent with stronger contrast.",
      "Forms have clearer labels and inline validation messages.",
    ],
  },

  // APP UX AUDIT SLIDES
  {
    id: 3,
    type: "App UX Audit",
    title: "App UX – Screen 1",
    image: "/images/home-popup.png",
    points: [
      "Navigation feels inconsistent across different sections of the app.",
      "Microcopy can be improved to reduce user confusion.",
      "Primary actions should be visually stronger than secondary ones.",
    ],
  },
  {
    id: 4,
    type: "App UX Audit",
    title: "App UX – Screen 2",
    image: "/images/home-popup-2.png",
    points: [
      "Onboarding screens now give clearer expectations.",
      "Button hierarchy better reflects task frequency.",
      "Error messages are more contextual and actionable.",
    ],
  },
];

const tabs = ["Web UX Audit", "App UX Audit"];

const SamplesSlider = () => {
  const [activeTab, setActiveTab] = useState("Web UX Audit");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter slides based on active tab
  const filteredSlides = slides.filter((s) => s.type === activeTab);
  const currentSlide = filteredSlides[currentIndex];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredSlides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredSlides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full flex justify-center bg-[#f7f0e7] py-16 px-4">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-5xl font-semibold text-neutral-900 mb-8">
          Some samples
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative rounded-full px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-md"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="pointer-events-none absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[10px] border-x-transparent border-t-[10px] border-t-neutral-900" />
                )}
              </button>
            );
          })}
        </div>

        {/* Slider container (1040px) */}
        <div className="relative w-[1040px] max-w-full mx-auto">
          {/* Slide box */}
              {/* Browser mock top bar */}
              <div className="h-8 flex items-center gap-2 px-5 bg-[#444444] text-white text-xs rounded-tl-[25px] rounded-tr-[25px]">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 rounded-full bg-black px-3 py-1 text-[10px] text-neutral-200 w-[100%]">
                  www.ambak.com
                </div>
              </div>
          <div className="h-[590px] w-full rounded-bl-[28px] rounded-br-[28px] bg-[#444444] shadow-[0_18px_40px_rgba(0,0,0,0.15)] overflow-hidden flex p-1 pt-o">
            {/* Left side (710px) */}
            <div className="w-[710px] h-full bg-white border-r border-neutral-200 flex flex-col overflow-hidden rounded-bl-[20px]">
          

              {/* Screenshot area */}
              <div className="flex-1 relative">
                <Image
                  src={currentSlide.image}
                  alt="Sample UX"
                 width={710}
                 height={590}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right side (remaining width) */}
            <div className="flex-1 h-full bg-[#fff5e5] p-8 pl-4 pr-4 flex flex-col rounded-br-[20px]">
              <h3 className="text-base font-semibold text-black mb-4">
                {currentSlide.title}
              </h3>
              <ol className="space-y-4 text-sm text-neutral-800 leading-relaxed overflow-y-auto">
                {currentSlide.points.map((point, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-0.5 text-[13px] font-semibold">
                      {index + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Left arrow (main slider) */}
          <button
            onClick={handlePrev}
            className="absolute left-[-80px] top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-neutral-100 transition"
          >
            <span className="text-xl">&lt;</span>
          </button>

          {/* Right arrow (main slider) */}
          <button
            onClick={handleNext}
            className="absolute right-[-80px] top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-neutral-100 transition"
          >
            <span className="text-xl">&gt;</span>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {filteredSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "w-4 bg-neutral-900" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-neutral-800"
        >
          View Improved Design
        </button>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] bg-black">
            {/* Centered popup */}
            <button
  onClick={() => setIsModalOpen(false)}
  className="fixed right-6 top-6 z-[10000] text-3xl text-white hover:text-neutral-200"
>
   &times;
</button>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] max-w-[95vw] max-h-[95vh] rounded-3xl bg-white p-1 shadow-2xl overflow-auto">
              {/* Close button */}
              {/* Modal image */}
              <div className="relative w-full">
                <Image
                  src={currentSlide.image}
                  alt="Improved design"
                  width={1150}
                  height={1260}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* SCREEN EDGE PREV (modal) */}
            <button
              onClick={handlePrev}
              className="fixed left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-md hover:bg-neutral-100 transition"
            >
              <span className="text-xl">&lt;</span>
            </button>

            {/* SCREEN EDGE NEXT (modal) */}
            <button
              onClick={handleNext}
              className="fixed right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-md hover:bg-neutral-100 transition"
            >
              <span className="text-xl">&gt;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SamplesSlider;
