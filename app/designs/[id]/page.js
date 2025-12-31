"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import PageShell from "../../components/PageShell";
import DesignDetailHero from "../../components/DesignDetailHero";
import ChallengesSolutions from "../../components/ChallengesSolutions";
import { designs } from "../../data/designs";

/**
 * IMPORTANT:
 * FullPagePopupSlider uses DOM / window internally
 * → Disable SSR for this component
 */
const FullPagePopupSlider = dynamic(
  () => import("../../components/FullPagePopupSlider"),
  { ssr: false }
);

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Ensure client-side rendering only
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Find design safely
   */
  const design = useMemo(() => {
    if (!params?.id) return null;
    return designs.find((d) => d.id === params.id) || null;
  }, [params?.id]);

  /**
   * Redirect ONLY on client
   */
  useEffect(() => {
    if (mounted && !design) {
      router.replace("/");
    }
  }, [mounted, design, router]);

  /**
   * Prepare slides safely
   */
  const slides = useMemo(() => {
    if (!design) return [];
    return [
      {
        id: 1,
        title: design.title,
        image: design.image,
        description: design.description,
      },
      {
        id: 2,
        title: `${design.title} – View 2`,
        image: design.image,
        description: "Alternative design view",
      },
      {
        id: 3,
        title: `${design.title} – View 3`,
        image: design.image,
        description: "Additional design perspective",
      },
    ];
  }, [design]);

  /**
   * Prevent rendering during SSR / export
   */
  if (!mounted || !design) return null;

  return (
    <PageShell>
      <DesignDetailHero
        title={design.title}
        description={design.description}
        image={design.image}
      />

      <ChallengesSolutions solutionImage={design.image} />

      {/* CTA */}
      <section className="bg-black py-12">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-[10px] bg-[#e64169] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#d83b61]"
          >
            View Improved Design
          </button>
        </div>
      </section>

      {/* Client-only Modal */}
      <FullPagePopupSlider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={slides}
        startIndex={0}
      />
    </PageShell>
  );
}
