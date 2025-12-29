import Image from "next/image";

export default function Hero({ onOpenCTA }) {
  return (
    <section id="hero" className="bg-white px-6 pb-0 pt-16 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
          Get essential
          <br />
          customer insights
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
          Get expert UI/UX analysis that reveals hidden issues and unlocks your
          website&apos;s full potential
        </p>
        <button
          type="button"
          onClick={() => onOpenCTA?.()}
          className="mt-8 inline-flex h-12 w-[280px] items-center justify-center rounded-[10px] bg-[#F5426C] px-7 text-[16px] font-semibold text-white shadow-md transition hover:bg-[#e33b64]"
        >
          Get Started Today
        </button>

        <div className="relative mt-14 w-full max-w-[1200px]">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/hero-image-left.png"
              alt="Left sticky note"
              width={200}
              height={180}
              className="absolute -left-4 top-10 hidden -rotate-6 sm:block md:-left-10"
              priority
            />
            <Image
              src="/images/hero-image.png"
              alt="Keyboard with hands"
              width={720}
              height={360}
              className="h-auto w-full max-w-3xl "
              priority
            />
            <Image
              src="/images/hero-image-right.png"
              alt="Right sticky note"
              width={200}
              height={180}
              className="absolute -right-4 top-10 hidden rotate-6 sm:block md:-right-10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
