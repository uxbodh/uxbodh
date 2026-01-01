import PageShell from "../components/PageShell";
import RelaxHero from "../components/RelaxHero";

export default function AboutRoute() {
  return (
    <PageShell>
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[660px]">
          <p className="text-6xl font-medium text-neutral-900">About</p>
          <h1 className="mt-2 text-[160px] font-extrabold tracking-tight text-neutral-900 ">
            <span className="text-neutral-900">UX</span>
            <span className="text-[#E94166]">bodh</span>
          </h1>

          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-10 ">
            At UXbodh, we help businesses uncover what&apos;s really stopping users from
            converting.
          </p>

          <div className="mt-5 space-y-4 text-base leading-loose text-neutral-600">
            <p className="mb-16">
              We specialize in conducting in-depth UI and UX audits to identify
              design gaps, usability issues, and areas for improvement — helping
              businesses enhance user satisfaction and conversion rates.
            </p>
            <p>
              Beyond audits, we also design intuitive, high-performing websites
              and mobile apps that align with your brand, engage your users, and
              drive real results. With years of professional experience, we blend
              data-driven insights with creative design thinking to deliver
              products that are both beautiful and functional.
            </p>
          </div>

          <div className="mt-14 mb-20">
            <h2 className="text-7xl font-semibold text-black mb-16">Our Mission</h2>
            <div className="space-y-4 text-base leading-loose text-neutral-600">
               <p className="mb-16">
                To help brands create digital experiences that are clear,
                accessible, and conversion-focused. We aim to simplify complex
                user journeys and turn them into intuitive, enjoyable
                interactions that drive measurable growth.
              </p>
              <p>
                We become a trusted global partner for UX excellence, empowering
                businesses to connect better with their audiences through
                seamless design, usability, and innovation. We envision a
                digital world where every interaction feels effortless and every
                user feels understood.
              </p>
            </div>
          </div>
 </div>
 <RelaxHero  bgClass="bg-[#f9f5f5]" />

       
      </section>
    </PageShell>
  );
}
