"use client";

import Image from "next/image";

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
      <div className="mx-auto w-full max-w-[760px] text-center">
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
    <div className="space-y-2">
      <h2
        className="font-normal text-neutral-900 text-center"
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
          fontSize: "16px",
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
      <div className="relative flex w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[14px] bg-white shadow-[0_20px_80px_-50px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200/60">
        <div className="flex w-full items-center justify-between gap-6 px-10 py-8">
          <div className="relative h-28 w-28">
            <Image
              src="/images/hero-image-left.png"
              alt="Pixel T-Rex dinosaur"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-28 w-28">
            <Image
              src="/images/hero-image-right.png"
              alt="Dinosaur head"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureList() {
  return (
    <div className="mt-16 space-y-12 text-left">
      {features.map((feature) => (
        <div key={feature.title} className="space-y-2">
          <h3
            className="font-semibold text-neutral-900"
            style={{
              fontSize: "40px",
              lineHeight: "60px",
            }}
          >
            {feature.title}
          </h3>

          <p
            className="text-neutral-700 font-normal"
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
    <div className="mt-14 rounded-[16px] bg-[#f7f2ee] px-6 py-8 text-center sm:px-8 sm:py-9">
      <p className="text-[18px] font-semibold text-[#e64169]">
        Relax.
      </p>
      <h4 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-neutral-900">
        Your growth starts here
      </h4>
      <p className="mt-2 text-[14px] sm:text-[15px] text-neutral-600">
        Smart strategies. Real impact. Sustainable success.
      </p>
      <div className="mt-5 flex justify-center">
        <a
          href="#cta"
          className="inline-flex items-center justify-center rounded-[10px] bg-[#e64169] px-6 py-3 text-[13px] sm:text-[14px] font-semibold text-white shadow-[0_18px_46px_-22px_rgba(230,65,105,0.85)] transition hover:bg-[#d83b61]"
        >
          Get started today
        </a>
      </div>
    </div>
  );
}
