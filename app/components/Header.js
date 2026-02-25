"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Sliding underline state (desktop)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const navRef = useRef(null);

  const pathname = usePathname();

  const isDesignsPage = pathname === "/designs";
  const isDesignDetailPage =
    pathname?.startsWith("/designs/") && pathname !== "/designs";
  const needsScrollEffect = isDesignsPage || isDesignDetailPage;

  const normalizePath = (p) => {
    if (!p) return "/";
    const x = p.replace(/\/+$/, "");
    return x === "" ? "/" : x;
  };

  const isActiveLink = (href) => {
    const current = normalizePath(pathname);
    const target = normalizePath(href);

    if (target === "/designs") {
      return current === "/designs" || current.startsWith("/designs/");
    }
    return current === target;
  };

  // active href (for underline default position)
  const activeHref = useMemo(() => {
    const current = normalizePath(pathname);
    const found = navLinks.find((l) => {
      const target = normalizePath(l.href);
      if (target === "/designs") return current === "/designs" || current.startsWith("/designs/");
      return current === target;
    });
    return found?.href || null;
  }, [pathname]);

  useEffect(() => {
    if (!needsScrollEffect) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [needsScrollEffect]);

  const isTransparent = needsScrollEffect && !scrolled;
  const isPink = needsScrollEffect && scrolled;

  const headerBg = headerBgOverride
    ? headerBgOverride
    : isTransparentOverride
    ? "bg-transparent"
    : isTransparent
    ? "bg-transparent"
    : isPink
    ? "bg-[#232323]"
    : "bg-white/80 backdrop-blur-md";

  // ✅ helper: set underline based on element position inside nav
  const moveIndicatorToEl = (el) => {
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - navRect.left,
      width: rect.width,
      visible: true,
    });
  };

  // ✅ when route changes OR on first render, move underline to active item
  useEffect(() => {
    if (!navRef.current) return;
    if (!activeHref) {
      setIndicator((p) => ({ ...p, visible: false }));
      return;
    }
    const activeEl = navRef.current.querySelector(`[data-href="${activeHref}"]`);
    if (activeEl) moveIndicatorToEl(activeEl);
  }, [activeHref]);

  // ✅ on resize, re-calc underline position
  useEffect(() => {
    const onResize = () => {
      if (!navRef.current || !activeHref) return;
      const activeEl = navRef.current.querySelector(`[data-href="${activeHref}"]`);
      if (activeEl) moveIndicatorToEl(activeEl);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref]);

  // when mouse leaves nav, underline returns to active item
  const handleNavMouseLeave = () => {
    if (!navRef.current) return;
    if (!activeHref) {
      setIndicator((p) => ({ ...p, visible: false }));
      return;
    }
    const activeEl = navRef.current.querySelector(`[data-href="${activeHref}"]`);
    if (activeEl) moveIndicatorToEl(activeEl);
  };

  // ✅ Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const logoSrc = needsScrollEffect ? "/images/logo-white.svg" : "/images/logo.svg";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${headerBg} ${className}`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-8 lg:px-8 ${
            needsScrollEffect ? "text-white" : "text-neutral-800"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`relative h-10 w-10 items-center justify-center  md:hidden transition-colors flex z-[102] ${
                needsScrollEffect
                  ? "border-white/30 bg-black/20 text-white"
                  : isTransparent
                  ? "border-white/30 bg-black/40 text-white"
                  : "border-neutral-300 bg-white text-neutral-800"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${
                    needsScrollEffect || isTransparent ? "bg-white" : "bg-neutral-800"
                  } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${
                    needsScrollEffect || isTransparent ? "bg-white" : "bg-neutral-800"
                  } ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${
                    needsScrollEffect || isTransparent ? "bg-white" : "bg-neutral-800"
                  } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>

            <Link href="/" className="flex items-center gap-2 z-[102]">

              <Image
                src={logoSrc}
                alt="UXbodh logo"
                width={96}
                height={24}
                priority
              />
            </Link>
          </div>

          {/* ✅ Desktop nav with sliding underline */}
          <nav
            ref={navRef}
            onMouseLeave={handleNavMouseLeave}
            className={`relative hidden items-center gap-8 text-sm font-medium md:flex ${
              needsScrollEffect ? "text-white" : "text-neutral-800"
            }`}
          >
            {/* sliding underline */}
            <span
              aria-hidden
              className={`absolute -bottom-[6px] h-[2px] rounded-full transition-all duration-300 ease-out ${
                indicator.visible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: indicator.left,
                width: indicator.width,
                backgroundColor: "#EA3B67",
              }}
            />

            {navLinks.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  data-href={item.href}
                  onMouseEnter={(e) => moveIndicatorToEl(e.currentTarget)}
                  className={`relative inline-flex pb-1 transition-colors hover:text-[#EA3B67] ${
                    active ? "text-[#EA3B67]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ✅ Mobile Menu - Left to Right Animation with Close Button & Logo */}
      <div
        className={`fixed inset-0 z-[101] md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Black Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        
        {/* White Menu Panel - slides from left to right */}
        <div
          className={`absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white shadow-[0_36px_120px_-36px_rgba(0,0,0,0.35)] transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Menu Content */}
          <div className="flex flex-col h-full">
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src={logoSrc}
                  alt="UXbodh logo"
                  width={96}
                  height={24}
                  priority
                />
              </Link>
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5 text-neutral-800"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
              {navLinks.map((item, index) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      active 
                        ? "text-[#EA3B67] bg-[#EA3B67]/5" 
                        : "text-neutral-800 hover:bg-neutral-50 hover:text-[#EA3B67]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      animation: menuOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : 'none'
                    }}
                  >
                    <span
                      className={`h-5 w-[3px] rounded-full transition-all ${
                        active ? "bg-[#EA3B67]" : "bg-transparent"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button at bottom */}
            <div className="px-6 py-6 border-t border-neutral-100">
              <button
                type="button"
                className="w-full rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCTA?.();
                }}
              >
                Get started today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Add keyframe animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
