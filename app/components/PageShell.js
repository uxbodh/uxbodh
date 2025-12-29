"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FinalCTA from "./FinalCTA";

export default function PageShell({ children, withCTA = false }) {
  const [ctaOpen, setCtaOpen] = useState(false);
  const [ctaResetSignal, setCtaResetSignal] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname?.split("/").filter(Boolean) || [];
    const pageSlug = segments.join("-") || "home";
    const baseSlug = segments[0] || "home";
    const bodyClasses = [`page-${pageSlug}`, `page-${baseSlug}`];

    bodyClasses.forEach((cls) => document.body.classList.add(cls));
    return () => {
      bodyClasses.forEach((cls) => document.body.classList.remove(cls));
    };
  }, [pathname]);

  const openCta = () => {
    if (!withCTA) return;
    setCtaOpen(true);
    setCtaResetSignal((prev) => prev + 1);
  };

  const closeCta = () => {
    if (!withCTA) return;
    setCtaOpen(false);
  };

  const content = typeof children === "function" ? children({ openCta }) : children;

  return (
    <div className="min-h-screen text-neutral-900 flex flex-col page-shell-root">
      <Header onOpenCTA={withCTA ? openCta : undefined} />
      <main className="flex-1">{content}</main>
      {withCTA && (
        <FinalCTA
          open={ctaOpen}
          onOpenCTA={openCta}
          onCloseCTA={closeCta}
          resetSignal={ctaResetSignal}
        />
      )}
      <Footer />
    </div>
  );
}
