export default function DesignsHero() {
  return (
    <section
      className="
        relative flex h-[550px] items-center justify-center
        px-6 py-12 sm:py-16
        bg-[url('/images/design-bg.png')]
        bg-cover bg-center bg-no-repeat
        overflow-hidden
      "
    >
      {/* Dark overlay (left side darkness like design) */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Extra soft vignette for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <h1 className="mb-3 text-5xl font-bold leading-[1.1] tracking-tight sm:mb-4 sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-[#e64169] via-[#f8843f] to-[#f3d461] bg-clip-text text-transparent">
            Our designs
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed tracking-[0.02em] text-white sm:text-[30px] sm:tracking-[0.03em] lg:text-[30px]">
          That speaks. experiences and connect
        </p>
      </div>
    </section>
  );
}
