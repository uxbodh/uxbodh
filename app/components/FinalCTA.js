"use client";

import { useEffect } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import RelaxHero from "./RelaxHero";

const checklist = [
  "Find Hidden Usability Issues",
  "Improve Conversions & Sales",
  "Enhance User Satisfaction",
  "Save Time & Cost in Future Development",
];

export default function FinalCTA({ open, onOpenCTA, onCloseCTA, resetSignal }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <section id="cta" className="bg-white px-6 py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <Image
          src="/images/relex.png"
          alt="Person relaxing on a couch"
          width={443}
          height={325}
        />
       
      </div>

 <RelaxHero />




      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4 sm:px-4 sm:py-6 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-[1120px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_36px_120px_-60px_rgba(0,0,0,0.55)] ring-1 ring-neutral-200/70 sm:h-auto sm:flex-row sm:rounded-[30px]">
            <button
              type="button"
              onClick={() => onCloseCTA?.()}
              aria-label="Close form"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-800 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200 transition hover:bg-neutral-50 sm:right-5 sm:top-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            <div className="relative hidden w-[44%] flex-none bg-neutral-900 sm:block">
              <Image
                src="/images/popup-bg.jpg"
                alt="Coffee meeting"
                fill
                className=""
                sizes="(max-width: 640px) 0px, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
              <div className="relative z-10 flex h-full flex-col justify-center gap-4 px-10 text-white">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-lg font-medium leading-relaxed">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-4 py-6 sm:px-12 sm:py-12 overflow-y-auto">
              <ContactForm onSuccess={onCloseCTA} resetSignal={resetSignal} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
