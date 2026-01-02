import React, { useEffect, useRef, useState } from "react";

const SAMPLES_DATA = {
  web: [
    {
      id: 1,
      title: "Home Loans UX Audit - Ambak",
      image: "/images/slider1.jpg", // <- apni image path se replace karo
      points: [
        "Users are unable to understand where to click or what actions to take due to the cluttered layout. No clear CTA is visible above the fold, leaving users without guidance on the next step.",
        "Content plays a crucial role in the overall UX. Currently, the content quality is quite poor and lacks clarity. Incorporating relevant SEO keywords would also help improve both user engagement and search visibility.",
        "The WhatsApp and Schedule a Call CTAs can be positioned as sticky elements at the top, rather than floating in the middle of the page without context.",
      ],
    },
    {
      id: 2,
      title: "Loan Product Detail UX Audit",
      image: "/images/slider1.jpg",
      points: [
        "Interest rate comparison is hidden below the fold. Move critical decision elements above the fold.",
        "Add trust indicators such as ratings, testimonials, and RBI-compliant badges near the primary CTA.",
        "Simplify form fields to reduce cognitive load by grouping related inputs and adding helper text.",
      ],
    },
  ],
  app: [
    {
      id: 3,
      title: "Finance App Onboarding Audit",
      image: "/images/slider1.jpg",
      points: [
        "Onboarding screens are text-heavy. Use progressive disclosure and visuals to explain benefits.",
        "Request only mandatory permissions upfront and defer non-critical permissions.",
        "Highlight security and data protection in the first two screens to build trust.",
      ],
    },
    {
      id: 4,
      title: "Loan Tracking App Audit",
      image: "/images/slider1.jpg",
      points: [
        "EMI timeline can be visualized with a progress bar instead of plain text rows.",
        "Add clear labels for due dates, penalties, and auto-debit status.",
        "Introduce quick actions: Pay Now, Download Statement, and Raise a Query.",
      ],
    },
  ],
};

const SamplesSection = () => {
  const [activeTab, setActiveTab] = useState("web");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const wheelLockRef = useRef(false);

  const slides = SAMPLES_DATA[activeTab];
  const currentSlide = slides[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // Handle wheel/trackpad scroll to change slides within slider area
  const handleWheel = (e) => {
    if (wheelLockRef.current) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 20) return;
    if (delta > 0 && !isLast) {
      handleNext();
      wheelLockRef.current = true;
    } else if (delta < 0 && !isFirst) {
      handlePrev();
      wheelLockRef.current = true;
    } else {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      wheelLockRef.current = false;
    }, 400);
  };

  // Handle touch swipe to change slides on mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0 && !isLast) {
      handleNext();
    } else if (deltaX > 0 && !isFirst) {
      handlePrev();
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const isDesignPage = typeof window !== "undefined" && window.location?.pathname === "/designs";
      const pastThreshold = typeof window !== "undefined" && window.scrollY > 30;
      setShowStickyCta(isDesignPage && pastThreshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-5 md:px-6 lg:px-10 bg-[radial-gradient(circle_at_top,_#f4f4f4,_#fdfdfd)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 text-center mb-6">
          Some samples
        </h2>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-neutral-100 rounded-full p-1.5 mb-8 sm:mb-10 shadow-sm">
          <TabButton
            label="Web UX Audit"
            isActive={activeTab === "web"}
            onClick={() => handleTabChange("web")}
          />
          <TabButton
            label="App UX Audit"
            isActive={activeTab === "app"}
            onClick={() => handleTabChange("app")}
          />
        </div>

        {/* Slider + Mockup */}
        <div
          className="w-full relative flex flex-col items-center justify-center gap-4 lg:gap-0 lg:flex-row"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md absolute left-0 md:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-10 transition-all ${
              isFirst ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
            }`}
          >
            <span className="text-xl font-semibold">&lsaquo;</span>
          </button>

          {/* Mockup Card */}
          <div className="w-full max-w-6xl rounded-[26px] bg-black border border-black px-3 sm:px-4 lg:px-1 py-3 lg:py-1 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            {/* Browser top bar */}
            <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 px-3 p-1 ">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="w-2 h-2 rounded-full bg-amber-300" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 font-medium truncate">
                www.example-ux-audit.com
              </p>
            </div>

            {/* Main content: left mock + right list */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-3 items-stretch lg:h-[520px]">
              {/* Screenshot area */}
              <div className="flex-1 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200 bg-white aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full">
                {/* Replace with Next Image if you want */}
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Audit list */}
              <div className="w-full lg:w-[320px] shrink-0 bg-[#fffdf9] rounded-2xl border border-amber-100 px-4 py-4 sm:px-5 sm:py-5 h-auto lg:h-full flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:shadow-none">
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-3 sm:mb-4">
                  UX Audit List
                </h3>
                <ol className="space-y-3 sm:space-y-3.5 text-sm leading-relaxed text-neutral-700">
                  {currentSlide.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[11px] font-semibold text-neutral-700">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md absolute right-0 md:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-10 transition-all ${
              isLast ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
            }`}
          >
            <span className="text-xl font-semibold">&rsaquo;</span>
          </button>
        </div>

        {/* Mobile arrows (below card) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md transition-all ${
              isFirst ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
            }`}
          >
            <span className="text-lg font-semibold">&lsaquo;</span>
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md transition-all ${
              isLast ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
            }`}
          >
            <span className="text-lg font-semibold">&rsaquo;</span>
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="relative w-full flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-neutral-900 text-white text-sm md:text-base font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all ${
              showStickyCta
                ? "fixed top-0 left-0 right-0 z-30 duration-300"
                : "mt-10 md:mt-12 duration-300"
            }`}
          >
            View Improved Design
          </button>
        </div>
      </div>

      {/* Full-page modal */}


{isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="relative h-screen w-screen overflow-hidden bg-[#EEF2F8]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition hover:bg-neutral-50"
        aria-label="Close full view"
      >
        <span className="text-lg font-semibold">&times;</span>
      </button>

      <div className="relative h-full w-full overflow-auto bg-black/65 backdrop-blur-sm flex items-center justify-center">
        <img
          src={currentSlide.image}
          alt={`${currentSlide.title} full view`}
          className="h-full w-full object-contain"
        />
      </div>
    </div>

    {slides.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        disabled={isFirst}
        className={`absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition ${
          isFirst ? "opacity-40 cursor-not-allowed" : "hover:scale-105"
        }`}
        aria-label="Previous slide"
      >
        <span className="text-2xl font-semibold">&lsaquo;</span>
      </button>
    )}

    {slides.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        disabled={isLast}
        className={`absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition ${
          isLast ? "opacity-40 cursor-not-allowed" : "hover:scale-105"
        }`}
        aria-label="Next slide"
      >
        <span className="text-2xl font-semibold">&rsaquo;</span>
      </button>
    )}
  </div>
)}





    </section>
  );
};

const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 sm:px-6 md:px-7 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
        isActive
          ? "bg-neutral-900 text-white shadow-md"
          : "bg-transparent text-neutral-600 hover:bg-white hover:text-neutral-900"
      }`}
    >
      {label}
    </button>
  );
};

export default SamplesSection;
