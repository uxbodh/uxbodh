"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { navLinks } from "../constants/navLinks";

export default function Header({
  onOpenCTA,
  className = "",
  isTransparentOverride,
  headerBgOverride,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isDesignsPage = pathname === "/designs";
  const isDesignDetailPage = pathname?.startsWith("/designs/") && pathname !== "/designs";
  const needsScrollEffect = isDesignsPage || isDesignDetailPage;
  const isActiveLink = (href) => {
    if (href === "/designs") {
      return pathname === "/designs" || pathname?.startsWith("/designs/");
    }
    return pathname === href;
  };

  useEffect(() => {
    if (!needsScrollEffect) {
      setScrolled(false);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [needsScrollEffect]);

  const isTransparent = needsScrollEffect && !scrolled;
  const isPink = needsScrollEffect && scrolled;
  const headerBg = isTransparent
    ? "bg-transparent"
    : isPink
    ? "bg-[#f74d7b]"
    : "bg-white/80 backdrop-blur-md";

  return (
    <header
      className={`  top-0 z-30 transition-all duration-300 ${
        needsScrollEffect ? "fixed left-0 right-0" : ""
      } ${headerBg}`}
    >
      <div className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-8 lg:px-8 ${
            needsScrollEffect ? "text-white" : "text-neutral-800"
          }`}>
        <Link href="#top" className="flex items-center gap-2">
          <div className="flex items-center justify-center text-sm font-semibold">
            <Image
              src="/images/logo.svg"
              alt="UXbodh logo"
              width={96}
              height={24}
              priority
            />
          </div>
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium md:flex transition-colors ${
            needsScrollEffect ? "text-white" : "text-neutral-800"
          }`}
        >
          {navLinks.map((item) => {
            const active = isActiveLink(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative pb-1 transition-colors ${
                  needsScrollEffect ? "hover:text-white" : "hover:text-neutral-900"
                } ${
                  active
                    ? `after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:rounded-full ${
                        needsScrollEffect
                          ? "text-white after:bg-white"
                          : "text-[#f74d7b] after:bg-[#f74d7b]"
                      }`
                    : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
         
        </nav>

        <button
          type="button"
          className={`relative z-20 flex h-10 w-10 items-center justify-center rounded-[10px] border shadow-sm md:hidden transition-colors ${
            needsScrollEffect
              ? "border-white/30 bg-black/20 text-white"
              : isTransparent
              ? "border-white/30 bg-black/40 text-white"
              : "border-neutral-300 bg-white text-neutral-800"
          }`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 transition ${
                needsScrollEffect ? "bg-white" : isTransparent ? "bg-white" : "bg-neutral-800"
              } ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition ${
                needsScrollEffect ? "bg-white" : isTransparent ? "bg-white" : "bg-neutral-800"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition ${
                needsScrollEffect ? "bg-white" : isTransparent ? "bg-white" : "bg-neutral-800"
              } ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="mx-auto block w-full max-w-[1200px] px-6 pb-4 md:hidden">
          <div
            className={`rounded-2xl border shadow-lg transition-colors ${
              isPink
                ? "border-white/20 bg-[#f74d7b]"
                : isTransparent
                ? "border-white/15 bg-black/80"
                : "border-neutral-200 bg-white"
            }`}
          >
            <div
              className={`flex flex-col divide-y ${
                isPink || isTransparent
                  ? "divide-white/10 text-neutral-50"
                  : "divide-neutral-100"
              }`}
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-5 py-3 text-sm font-medium transition ${
                    isPink || isTransparent
                      ? "hover:bg-white/5"
                      : "text-neutral-800 hover:bg-neutral-50"
                  } ${
                    isActiveLink(item.href)
                      ? isPink || isTransparent
                        ? "text-white"
                        : "text-[#f74d7b]"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className={`px-5 py-4 text-center text-sm font-semibold transition rounded-[10px] ${
                  isPink || isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-[#f74d7b] hover:bg-neutral-50"
                }`}
                onClick={() => {
                  setOpen(false);
                  onOpenCTA?.();
                }}
              >
                Get started today
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
