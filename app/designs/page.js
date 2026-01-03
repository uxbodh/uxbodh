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
      <section className="relative overflow-hidden  text-white bg-[#020406]">
        <div className="relative mx-auto w-full max-w-[1040px] px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
          

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
    transition-all hover:-translate-y-1
    ${topSpace ? "mt-10" : ""}  
  `}
    >
      {/* IMAGE WRAPPER */}
      <div
        className={`
          relative w-full overflow-hidden bg-[#201E24]  p-3  rounded-[20px]
          ${topSpace ? "mt-5 sm:mt-6" : ""}
        `}
      >
        <div className="relative mx-auto aspect-[540/389]  w-[100%] rounded-[20px] overflow-hidden">
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
      <div className="px-4 pb-4 pt-3 mt-6">
        <h3 className="text-lg  text-white sm:text-2xl">
          {item.title}
        </h3>

        <p className="mt-1 text-sm  text-neutral-400 sm:text-base leading-7">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
