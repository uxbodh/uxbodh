"use client";

import Image from "next/image";
import RelaxHero from "./RelaxHero";

const features = [
  {
    title: "Discover hidden UX issues",
    body:
      "Find out what's really stopping your users from converting. Through deep UX analysis, we uncover:",
    bullets: [
      "Confusing navigation",
      "Unclear call-to-actions",
      "Broken user journeys",
      "Cognitive overload and layout clutter",
      "Form usability issues",
      "Visual hierarchy problems",
    ],
    footer:
      "These hidden friction points silently hurt conversions, sign-ups, and overall user satisfaction. Fixing them leads to happier users and better business results.",
  },
  {
    title: "Boost conversions & engagement",
    body:
      "Our audits are designed to make your website or app intuitive, simple, and enjoyable to use. You do not just make things look better. We help your product perform better. When users can:",
    bullets: [
      "Find information faster",
      "Trust your brand",
      "Complete tasks with fewer steps",
    ],
  },
  {
    title: "Backed by real user insights",
    body:
      "No guesswork, no fluffy suggestions. Just insights rooted in how people actually think, feel, and interact with your product. Every recommendation is grounded in:",
    bullets: [
      "User behavior analysis",
      "Heuristic evaluations",
      "Accessibility and usability principles",
      "Real-world conversion psychology",
    ],
  },
  {
    title: "Actionable, visual recommendations",
    body:
      "Get more than a checklist. Your team can act on implementing changes immediately without confusion. You receive a clear, prioritized action plan that shows:",
    bullets: [
      "Exactly what to fix",
      "Why it matters",
      "What impact it creates",
      "Visual references highlighting issues",
      "Recommended redesign direction",
    ],
  },
  {
    title: "Strengthen your brand",
    body:
      "Great UX builds trust. We ensure your digital presence reflects the quality of your business, not just aesthetically but experientially. A consistent, well-structured design:",
    bullets: [
      "Increases credibility",
      "Improves brand perception",
      "Makes you look professional and reliable",
    ],
  },
  {
    title: "Expertise that delivers results",
    body:
      "We combine UX strategy, psychology, and conversion optimization to deliver measurable impact. Our approach ensures your website:",
    bullets: [
      "Aligns with business goals",
      "Supports marketing and SEO",
      "Scales with your product roadmap",
      "Reduces support queries and drop-offs",
    ],
    footer:
      "Beautiful design is good. Effective design is better. We help you achieve both.",
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
        website's full potential
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

          {feature.bullets ? (
            <ul className="list-disc pl-5 space-y-2 text-black font-[400]">
              {feature.bullets.map((item) => (
                <li key={item} style={{ fontSize: "16px", lineHeight: "28px" }}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {feature.footer ? (
            <p
              className="text-black font-[400]"
              style={{
                fontSize: "16px",
                lineHeight: "30px",
              }}
            >
              {feature.footer}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function BottomCta() {
  return <RelaxHero bgClass="bg-[#f9f5f5]" />;
}
