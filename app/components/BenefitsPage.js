"use client";

import Image from "next/image";
import RelaxHero from "./RelaxHero";

const features = [
  {
    title: "Discover hidden UX issues",
    body:
      "Pinpoint what's really stopping your users from converting. We uncover usability pain points and design changes that directly improve performance. We remove usability pain points, broken flows, and design gaps that silently affect your performance.",
  },
  {
    title: "Boost conversions & engagement",
    body:
      "Our audits are built to make your website or app more intuitive and enjoyable. When users find what they need faster, your engagement goes up and drop-offs naturally drop. Our audits are built to make your website or app more intuitive and enjoyable. When users find what they need faster, your engagement and conversions naturally grow. Our audits are built to make your site easier for visitors.",
  },
  {
    title: "Backed by real user insights",
    body:
      "Our audits use both the science of UX and the realities of your users—so recommendations resonate. We focus on changes that improve your KPIs and conversions measurably. With real user insight, our audits can lift the value for your website.",
  },
  {
    title: "Actionable, visual recommendations",
    body:
      "Get more than a checklist. We provide clear, prioritized suggestions with visuals, showing exactly what to fix, why it matters, and how it improves your user flow.",
  },
  {
    title: "Strengthen your brand",
    body:
      "A consistent, well-structured design doesn’t just look good—it builds trust. We ensure your digital presence feels polished, professional, and aligned with your brand values.",
  },
  {
    title: "Expertise that delivers results",
    body:
      "A consistent, well-structured design doesn’t just look good—it builds trust. We ensure your digital presence feels polished, professional, and aligned with your brand values.",
  },
];

export default function BenefitsPage() {
  return (
    <section id="benefits" className="bg-white px-6 py-20">
      <div className="mx-auto w-full max-w-[780px] text-center">
        <Heading />
        <ImageBlock />
        <FeatureList />
        <BottomCta />
      </div>
    </section>
  );
}

function Heading() {
  return (
    <div className="space-y-2 mb-20">
      <h2
        className="font-semibold text-neutral-900 text-center"
        style={{
          fontSize: "60px",
          lineHeight: "80px",
        }}
      >
        We will make your online
        <br />
        presence{" "}
        <span className="font-bold" style={{ color: "#e64169" }}>
          STRONG
        </span>
      </h2>

      <p
        className="mt-2 text-neutral-500 text-center"
        style={{
          fontSize: "18px",
          lineHeight: "26px",
        }}
      >
        Get expert UI/UX analysis that reveals hidden issues and unlocks your
        website’s full potential
      </p>
    </div>
  );
}

function ImageBlock() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="relative flex w-full">
        <div className="flex w-full items-center justify-between gap-">
         
            <Image
              src="/images/benefits.jpg"
              alt="Pixel T-Rex dinosaur"
              width={780}
              height={450}
              className="object-contain"
            />
         
        
        </div>
      </div>
    </div>
  );
}

function FeatureList() {
  return (
    <div className="w-[660px] mx-auto  mt-16 space-y-8 text-left mb-32">
      {features.map((feature) => (
        <div key={feature.title} className="space-y-2">
          <h3
            className="font-[500] text-black"
            style={{
              fontSize: "40px",
              lineHeight: "60px",
            }}
          >
            {feature.title}
          </h3>

          <p
            className="text-black font-[400]"
            style={{
              fontSize: "16px",
              lineHeight: "30px",
            }}
          >
            {feature.body}
          </p>
        </div>
      ))}
    </div>
  );
}


function BottomCta() {
  return (
   <RelaxHero  bgClass="bg-[#f9f5f5]" />
  );
}
