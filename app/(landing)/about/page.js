import PageShell from "../components/PageShell";
import RelaxHero from "../components/RelaxHero";

export default function AboutRoute() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[680px]">
          {/* About Title */}
          <p className="text-[40px] lg:text-[56px] font-medium text-black leading-tight">
            About
          </p>
          
          {/* UXbodh Logo Text */}
          <h1 className="mt-0 text-[80px] lg:text-[165px] font-semibold tracking-tight leading-[0.85]">
            <span className="text-black">UX</span>
            <span className="text-[#E94166]">bodh</span>
          </h1>

          {/* Main Tagline */}
          <p className="mt-8 text-[18px] lg:text-[20px] font-medium leading-[1.6] text-black">
            At UXbodh, we help businesses uncover what&apos;s really stopping users from
            converting.
          </p>

          {/* First Paragraph */}
          <div className="mt-8 text-[15px] lg:text-[16px] leading-[1.75] text-neutral-700">
            <p>
              We specialize in conducting in-depth UI and UX audits to identify
              design gaps, usability issues, and areas for improvement — helping
              businesses enhance user satisfaction and conversion rates.
            </p>
          </div>

          {/* Second Paragraph */}
          <div className="mt-6 text-[15px] lg:text-[16px] leading-[1.75] text-neutral-700">
            <p>
              Beyond audits, we also design intuitive, high-performing websites
              and mobile apps that align with your brand, engage your users, and
              drive real results. With years of professional experience, we blend
              data-driven insights with creative design thinking to deliver
              products that are both beautiful and functional.
            </p>
          </div>

          {/* Our Mission Section */}
          <div className="mt-20 lg:mt-28">
            <h2 className="text-[40px] lg:text-[56px] font-semibold text-black leading-tight mb-8">
              Our Mission
            </h2>
            
            {/* Mission Paragraph 1 */}
            <div className="text-[15px] lg:text-[16px] leading-[1.75] text-neutral-700">
              <p>
                To help brands create digital experiences that are clear,
                accessible, and conversion-focused. We aim to simplify complex
                user journeys and turn them into intuitive, enjoyable
                interactions that drive measurable growth.
              </p>
            </div>

            {/* Mission Paragraph 2 */}
            <div className="mt-6 text-[15px] lg:text-[16px] leading-[1.75] text-neutral-700">
              <p>
                To become a trusted global partner for UX excellence, empowering
                businesses to connect better with their audiences through
                seamless design, usability, and innovation. We envision a
                digital world where every interaction feels effortless and every
                user feels understood.
              </p>
            </div>
          </div>
        </div>

        {/* Relax Hero Section */}
        <div className="mt-20 lg:mt-32">
          <RelaxHero bgClass="bg-[#f9f5f5]" />
        </div>
      </section>
    </PageShell>
  );
}