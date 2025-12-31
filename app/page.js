"use client";

import PageShell from "./components/PageShell";
import Hero from "./components/Hero";
import SamplesSlider from "./components/SamplesSlider";
import AuditSection from "./components/AuditSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSlider from "./components/TestimonialsSlider";
import FAQAccordion from "./components/FAQAccordion";
import BenefitsPage from "./components/BenefitsPage";
import SamplesSection from "./components/SamplesSlider";

export default function Home() {
  return (
    <PageShell withCTA>
      {({ openCta }) => (
        <>
          <Hero onOpenCTA={openCta} />
         
          <SamplesSection />
          <AuditSection onOpenCTA={openCta} />
          <ProcessSection />
          <TestimonialsSlider />
          {/* <FAQAccordion /> */}
        </>
      )}
    </PageShell>
  );
}
