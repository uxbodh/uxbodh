import Image from "next/image";

/**
 * ChallengesSolutions Component
 * 
 * A two-section component displaying:
 * 1. Challenges section - Two-column text layout
 * 2. Solutions section - Two-column layout with gradient heading, text content, and image
 */

const challengesData = {
  heading: "Challenges",
  subHeading: "Teaching Kids Smart Money Habits Isn't Easy",
  paragraphs: [
    "Managing money responsibly is a critical life skill, but teaching it to kids can be overwhelming for parents. Traditional methods like cash allowances and piggy banks don't provide the visibility, control, or educational value needed in today's digital age.",
    "Parents often struggle to monitor their kids' spending, set appropriate limits, and teach financial responsibility in a way that's engaging and meaningful. Without proper tools, children miss out on developing essential money management skills early in life.",
  ],
};

const solutionsData = {
  heading: "Solutions",
  subHeading: "PocketFree empowers parents and kids with a secure digital wallet that enables real-time tracking.",
  paragraphs: [
    "PocketFree solves this problem by providing a secure and intelligent digital wallet designed specifically for families. Parents can monitor expenses, set budgets, send money instantly, and receive real-time notifications about their children's spending activities.",
    "Children learn how to budget, spend responsibly, and understand the value of money through an intuitive interface that makes financial education engaging and practical. With PocketFree, families can build healthy financial habits together.",
  ],
  
};

export default function ChallengesSolutions({ solutionImage }) {
  return (
    <section className="relative  bg-black">
      {/* Background gradient effect */}
      <div
        className="a"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-8 sm:py-20">
        {/* Challenges Section */}
        <div className="mb-20 sm:mb-24">
          <div className="grid gap-[180px] md:grid-cols-2 md:items-start">
            {/* Left Column - Heading and Sub-heading */}
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl text-white font-bold sm:text-5xl lg:text-6xl">
                {challengesData.heading}
              </h2>
              <h3 className="text-3xl font-normal leading-relaxed text-white sm:text-[26px] lg:text-[26px]">
                {challengesData.subHeading}
              </h3>
            </div>

            {/* Right Column - Body Text */}
            <div className="space-y-5">
              {challengesData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base font-normal leading-relaxed text-white sm:text-lg lg:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <div className="grid gap-[180px] md:grid-cols-2 md:items-start">
            {/* Left Column - Heading and Sub-heading */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
              {/* Main Heading with Gradient */}
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-[#e64169] via-[#f8843f] to-[#f3d461] bg-clip-text text-transparent">
                  {solutionsData.heading}
                </span>
              </h2>

              {/* Sub-heading */}
              <p className="text-xl font-normal leading-relaxed tracking-[0.02em] text-white sm:text-2xl sm:tracking-[0.03em] lg:text-[26px]">
                {solutionsData.subHeading}
              </p>
            </div>

            {/* Right Column - Body Text */}
            <div className="space-y-5">
              {solutionsData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base font-normal leading-relaxed text-white sm:text-lg lg:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

