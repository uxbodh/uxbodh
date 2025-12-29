"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageShell from "../../components/PageShell";
import DesignDetailHero from "../../components/DesignDetailHero";
import ChallengesSolutions from "../../components/ChallengesSolutions";
import FullPagePopupSlider from "../../components/FullPagePopupSlider";
import { designs } from "../../data/designs";

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Debug: Log modal state changes
  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);
  
  const design = useMemo(
    () => designs.find((d) => d.id === params?.id),
    [params?.id]
  );

  // Dummy slide data - you can replace this with actual design slides
  const slides = useMemo(() => {
    if (!design) {
      console.log("No design found, slides will be empty");
      return [];
    }
    const slideData = [
      {
        id: 1,
        title: design.title,
        image: design.image,
        description: design.description,
      },
      {
        id: 2,
        title: `${design.title} - View 2`,
        image: design.image,
        description: "Alternative design view",
      },
      {
        id: 3,
        title: `${design.title} - View 3`,
        image: design.image,
        description: "Additional design perspective",
      },
    ];
    console.log("Slides created:", slideData.length, slideData);
    return slideData;
  }, [design]);

  if (!design) {
    // Designs section has been removed from navigation; redirect to home
    router.push("/");
    return null;
  }

  return (
    <PageShell>
      {/* Hero Section */}
      <DesignDetailHero 
        title={design.title} 
        description={design.description}
        image={design.image}
      />

      {/* Challenges & Solutions Section */}
      <ChallengesSolutions solutionImage={design.image} />

      {/* View Improved Design Button */}
      <section className="bg-black py-12">
        <div className="mx-auto w-full max-w-[1200px] px-6 text-center">
          <button
            type="button"
            onClick={() => {
              console.log("Button clicked, opening modal");
              console.log("Current isModalOpen state:", isModalOpen);
              console.log("Slides available:", slides.length);
              setIsModalOpen(true);
              console.log("Set isModalOpen to true");
            }}
            className="rounded-[10px] bg-[#e64169] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_46px_-22px_rgba(230,65,105,0.85)] transition hover:bg-[#d83b61] sm:text-lg"
          >
            View Improved Design
          </button>
        </div>
      </section>

      {/* Full Page Popup Slider Modal */}
      <FullPagePopupSlider
        isOpen={isModalOpen}
        onClose={() => {
          console.log("Closing modal");
          setIsModalOpen(false);
        }}
        slides={slides}
        startIndex={0}
      />
    </PageShell>
  );
}
