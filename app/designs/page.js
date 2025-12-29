import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import DesignsHero from "../components/DesignsHero";
import { designs } from "../data/designs";

export default function DesignsRoute() {
  const featured = designs.filter((d) => d.featured);
  const rest = designs.filter((d) => !d.featured);

  return (
    <PageShell>
      {/* Full-height Hero Section */}
      <DesignsHero />

      {/* Designs Grid Section */}
      <section className="relative overflow-hidden bg-[#050505] text-white">
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
          

          <div className="mt-8 grid gap-10 md:grid-cols-2 sm:mt-10">
            {rest.map((item, index) => (
              <DesignCard key={item.id} item={item} topSpace={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function DesignCard({ item, topSpace = false }) {
  return (
    <Link
      href={`/designs/${item.id}`}
      className={`
    group block overflow-hidden rounded-[16px]
    bg-[#0f0f10]
    ring-1 ring-white/5
    shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]
    transition-all hover:-translate-y-1
    ${topSpace ? "mt-8" : ""}  
  `}
    >
      {/* IMAGE WRAPPER */}
      <div
        className={`
          relative w-full overflow-hidden bg-[#1a1a1c]
          ${topSpace ? "pt-8 sm:pt-10" : ""}
        `}
      >
        <div className="relative mx-auto aspect-[16/10] w-[92%] rounded-[14px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-3">
        <h3 className="text-lg font-semibold text-white sm:text-xl">
          {item.title}
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-neutral-400 sm:text-base">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
