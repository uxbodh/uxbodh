"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  // WEB UX AUDIT SLIDES
  {
    id: 1,
    type: "Web UX Audit",
    title: "Web UX – Version 1",
    // OLD / AUDIT IMAGE (shown in slider)
    image: "/images/old-image.jpg",
    // ORIGINAL / IMPROVED IMAGE (shown in modal)
    modalImage: "/images/home-popup.png",
    points: [
     "At first glance, the page feels visually heavy due to excessive use of blue colors and background gradients. Within the first five seconds, it is difficult to understand what the website is about.",
"The menu item “Tool” can be changed to “Calculator”, as it is a more commonly used and understandable keyword, such as “Home Loan EMI Calculator.” The word “Tool” does not clearly explain what is being offered. Changing it to “Calculator” gives users better clarity that this section is about a home loan EMI calculator.",
"There is no clear primary CTA, making it hard for users to know what to do next. The loan category tabs currently look like CTAs, which creates confusion.",
"The content flow feels uneven and difficult to follow, appearing more like a zig-zag layout rather than a structured progression.",
"The image of a man with a baby does not add meaningful value in this context.",
"The H1 content lacks emotional impact, and using two colors in the headline feels unnecessary.",
"In the “Select your city” section, the red location icon draws excessive attention.",
"The WhatsApp and “Schedule a Call” options should be placed at the top and made sticky.",
"The heading “Hidden charges? High EMI? Managing it alone?” is not aligned with the supporting points such as “0% commission,” “lowest rate,” and “support during and after the loan.”",
"The points 0% commission, lowest rate, and support during and after the loan should be placed closer to the “Select your city” section, as these are strong decision-making factors that encourage users to proceed.",
"In the bank minimum and maximum interest rate section, too many colors are used in headings and subheadings, making it difficult to read.",
"Users are not aware of what the red “LIVE” tag represents or what value it adds.",
"The search bar is almost hidden and not easily discoverable.",
"Popular banks such as HDFC, ICICI, and Axis should be shown first, as they handle most home loans and build instant trust."
    ],
    hotspots: [
      { top: "28%", left: "70%" },
      { top: "55%", left: "52%" },
      { top: "78%", left: "34%" },
    ],
  },
  {
    id: 2,
    type: "Web UX Audit",
    title: "Web UX – Version 2",
    image: "/images/home-popup-2-old.png",
    modalImage: "/images/home-popup-2.png",
    points: [
      "Header spacing improved for better scannability.",
      "Hero section CTA made more prominent with stronger contrast.",
      "Forms have clearer labels and inline validation messages.",
    ],
    hotspots: [
      { top: "22%", left: "60%" },
      { top: "40%", left: "58%" },
      { top: "70%", left: "45%" },
    ],
  },

  // APP UX AUDIT SLIDES
  {
    id: 3,
    type: "App UX Audit",
    title: "App UX – Screen 1",
    image: "/images/app-screen-1-old.png",
    modalImage: "/images/app-screen-1.png",
    points: [
      "Navigation feels inconsistent across different sections of the app.",
      "Microcopy can be improved to reduce user confusion.",
      "Primary actions should be visually stronger than secondary ones.",
    ],
    hotspots: [
      { top: "26%", left: "40%" },
      { top: "52%", left: "55%" },
      { top: "78%", left: "60%" },
    ],
  },
  {
    id: 4,
    type: "App UX Audit",
    title: "App UX – Screen 2",
    image: "/images/app-screen-2-old.png",
    modalImage: "/images/app-screen-2.png",
    points: [
      "Onboarding screens now give clearer expectations.",
      "Button hierarchy better reflects task frequency.",
      "Error messages are more contextual and actionable.",
    ],
    hotspots: [
      { top: "24%", left: "30%" },
      { top: "50%", left: "62%" },
      { top: "76%", left: "45%" },
    ],
  },
];

const tabs = ["Web UX Audit", "App UX Audit"];

const SamplesSlider = () => {
  const [activeTab, setActiveTab] = useState("Web UX Audit");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  // Filter slides based on active tab
  const filteredSlides = slides.filter((s) => s.type === activeTab);
  const currentSlide = filteredSlides[currentIndex];

  const activeHotspotIndex =
    hoveredPointIndex !== null ? hoveredPointIndex : 0;

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
    setHoveredPointIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredSlides.length - 1 : prev - 1
    );
    setHoveredPointIndex(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredSlides.length - 1 ? 0 : prev + 1
    );
    setHoveredPointIndex(null);
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

          <div className="h-[590px] w-full rounded-bl-[28px] rounded-br-[28px] bg-[#444444] shadow-[0_18px_40px_rgba(0,0,0,0.15)] overflow-hidden flex p-1 pt-0">
            {/* Left side (710px) */}
            <div className="w-[710px] h-full bg-white border-r border-neutral-200 flex flex-col overflow-hidden rounded-bl-[20px]">
              {/* Screenshot area */}
              <div className="flex-1 relative">
                {/* OLD / AUDIT IMAGE */}
                <Image
                  src={currentSlide.image}
                  alt="Sample UX old"
                  width={710}
                  height={590}
                  className="object-cover w-full h-full"
                />

                {/* Hotspots over old image */}
                {currentSlide.hotspots &&
                  currentSlide.hotspots.map((spot, index) => {
                    const isActive = index === activeHotspotIndex;
                    return (
                      <div
                        key={index}
                        className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75"
                        }`}
                        style={{ top: spot.top, left: spot.left }}
                      >
                        <div className="flex items-center gap-2">
                          <div className=" h-8 w-8 rounded-full 
    text-white 
    flex items-center justify-center 
    text-xs font-semibold 
    shadow-md 
    zoom-3color">
                            {index + 1}
                          </div>
                          <div className="w-10 h-[2px] bg-black" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right side (remaining width) */}
            <div className="flex-1 h-full bg-[#fff5e5] p-8 pl-4 pr-4 flex flex-col rounded-br-[20px]">
              <h3 className="text-base font-semibold text-black mb-4">
                {currentSlide.title}
              </h3>
              <ol className="space-y-4 text-sm text-neutral-800 leading-relaxed overflow-y-auto">
                {currentSlide.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex gap-2 cursor-pointer group"
                    onMouseEnter={() => setHoveredPointIndex(index)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  >
                    <span
                      className={`mt-0.5 text-[13px] font-semibold transition-colors ${
                        index === activeHotspotIndex
                          ? "text-black"
                          : "text-neutral-500"
                      }`}
                    >
                      {index + 1}.
                    </span>
                    <span
                      className={`transition-colors ${
                        index === activeHotspotIndex
                          ? "text-black"
                          : "text-neutral-700 group-hover:text-black"
                      }`}
                    >
                      {point}
                    </span>
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
              onClick={() => {
                setCurrentIndex(index);
                setHoveredPointIndex(null);
              }}
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
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed right-6 top-6 z-[10000] text-3xl text-white hover:text-neutral-200"
            >
              &times;
            </button>

            {/* Centered popup – ORIGINAL / IMPROVED IMAGE */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] max-w-[95vw] max-h-[95vh] rounded-3xl bg-white p-1 shadow-2xl overflow-auto">
              <div className="relative w-full">
                <Image
                  src={currentSlide.modalImage || currentSlide.image}
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
