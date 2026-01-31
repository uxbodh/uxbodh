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
  const [open, setOpen] = useState(false);
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${headerBg} ${className}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-8 lg:px-8 ${
          needsScrollEffect ? "text-white" : "text-neutral-800"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="UXbodh logo"
            width={96}
            height={24}
            priority
          />
        </Link>

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

        {/* Mobile toggle */}
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
                needsScrollEffect
                  ? "bg-white"
                  : isTransparent
                  ? "bg-white"
                  : "bg-neutral-800"
              } ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition ${
                needsScrollEffect
                  ? "bg-white"
                  : isTransparent
                  ? "bg-white"
                  : "bg-neutral-800"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition ${
                needsScrollEffect
                  ? "bg-white"
                  : isTransparent
                  ? "bg-white"
                  : "bg-neutral-800"
              } ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu (same as before) */}
      {open && (
        <div className="mx-auto block w-full max-w-[1200px] px-6 pb-4 md:hidden">
          <div
            className={`rounded-2xl border shadow-lg transition-colors ${
              isPink
                ? "border-white/20 bg-[#232323]"
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
              {navLinks.map((item) => {
                const active = isActiveLink(item.href);
                const darkMode = isPink || isTransparent;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-5 py-3 text-sm font-medium transition ${
                      darkMode
                        ? "hover:bg-white/5 text-neutral-50 hover:text-[#EA3B67]"
                        : "text-neutral-800 hover:bg-neutral-50 hover:text-[#EA3B67]"
                    } ${active ? "text-[#EA3B67]" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`h-4 w-[3px] rounded-full transition ${
                        active
                          ? "bg-[#EA3B67]"
                          : "bg-transparent group-hover:bg-[#EA3B67]/60"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                className={`px-5 py-4 text-center text-sm font-semibold transition rounded-[10px] hover:text-[#EA3B67] ${
                  isPink || isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-neutral-50"
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
