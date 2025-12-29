"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * FullPagePopupSlider Component
 * 
 * A full-screen modal with a carousel slider for displaying design images.
 * Features:
 * - Full-screen overlay with blur
 * - Centered white card with rounded corners
 * - Bottom navigation buttons (prev, close, next)
 * - Keyboard navigation (Esc, ArrowLeft, ArrowRight)
 * - Click outside to close
 * - Disables body scroll when open
 */
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

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log("Modal isOpen:", isOpen);
      console.log("Slides count:", slides.length);
      console.log("Active index:", activeIndex);
    }
  }, [isOpen, slides.length, activeIndex]);

  if (!isOpen) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  if (slides.length === 0) {
    const emptyContent = (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Slider Card */}
      <div
        className="relative mx-4 w-full max-w-4xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slide Indicator (Top Right) */}
        {slides.length > 1 && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {activeIndex + 1} / {slides.length}
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-neutral-50 sm:aspect-[4/3]">
          <Image
            src={currentSlide.image}
            alt={currentSlide.title || `Slide ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>

        {/* Slide Info (Optional) */}
        {(currentSlide.title || currentSlide.description) && (
          <div className="border-t border-neutral-200 px-6 py-4">
            {currentSlide.title && (
              <h3 className="text-lg font-semibold text-neutral-900">
                {currentSlide.title}
              </h3>
            )}
            {currentSlide.description && (
              <p className="mt-1 text-sm text-neutral-600">
                {currentSlide.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-105 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
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

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-105 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-105 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
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
    </div>
  );

  // Use portal to render at document body level
  if (typeof window !== "undefined" && document.body) {
    return createPortal(modalContent, document.body);
  }

  return null;
}
