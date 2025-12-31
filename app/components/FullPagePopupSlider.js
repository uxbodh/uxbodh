"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function FullPagePopupSlider({
  isOpen,
  onClose,
  slides = [],
  startIndex = 0,
}) {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update active index when startIndex changes
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  if (slides.length === 0) {
    const emptyContent = (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="rounded-2xl bg-white p-8 text-center">
          <p className="text-neutral-900">No slides available</p>
          <button
            onClick={onClose}
            className="mt-4 rounded bg-black px-4 py-2 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
    return createPortal(emptyContent, document.body);
  }

  const currentSlide = slides[activeIndex];

  if (!currentSlide) {
    console.error("Current slide is undefined", { activeIndex, slides });
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Slider Card */}
      <div
        className="relative h-[94vh] w-[94vw] overflow-hidden rounded-[28px] bg-[#EEF2F8] shadow-2xl ring-1 ring-black/5 sm:h-[92vh] sm:w-[92vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/10"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative h-full w-full overflow-auto bg-white">
          <Image
            src={currentSlide.image}
            alt={currentSlide.title || `Slide ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Side Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60 sm:left-6 sm:h-12 sm:w-12"
        aria-label="Previous slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60 sm:right-6 sm:h-12 sm:w-12"
        aria-label="Next slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );

  // Use portal to render at document body level
  if (typeof window !== "undefined" && document.body) {
    return createPortal(modalContent, document.body);
  }

  return null;
}
