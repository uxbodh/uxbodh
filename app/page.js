"use client";

import PageShell from "./components/PageShell";
import Hero from "./components/Hero";
import SamplesSlider from "./components/SamplesSlider";
import AuditSection from "./components/AuditSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSlider from "./components/TestimonialsSlider";
import FAQAccordion from "./components/FAQAccordion";
import BenefitsPage from "./components/BenefitsPage";
// import SamplesSection from "./components/SamplesSlider";
import dynamic from "next/dynamic";
import RelaxHero from "./components/RelaxHero";
import CTAFormModal from "./components/CtaformButton";

const SamplesSection = dynamic(() => import("./components/SamplesSlider"), { ssr: false });

export default function Home() {
  return (
    <>
      <div style={{width: '100%', textAlign: 'center', marginTop: 300}}>
        <h1>Welcome to UXbodh</h1>
        <br />
        <h6>Coming Soon...</h6>
      </div>
    </>
    // <PageShell withCTA>

    //   {({ openCta }) => (
    //     <>
    //       <Hero onOpenCTA={openCta} />
    //       <SamplesSection />
    //       <AuditSection onOpenCTA={openCta} />
    //       <ProcessSection />
    //       <TestimonialsSlider />
    //       <FAQAccordion />
    //       {/* <CTAFormModal /> */}
         
    //     </>
    //   )}
    // </PageShell>
  );
}
