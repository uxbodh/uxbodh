import Image from "next/image";

export default function DesignDetailHero({ title, description, image }) {
  return (
    <section
      className="
        relative flex min-h-[550px] items-center
        px-6 py-12 sm:px-8 sm:py-16
        bg-[url('/images/design-bg.png')]
        bg-cover bg-center bg-no-repeat
        overflow-hidden
      "
    >
      {/* Dark overlay (left side darkness like design) */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Extra soft vignette for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Small Heading in Pink */}
            <h2 className="text-lg font-semibold text-[#f74d7b] sm:text-xl lg:text-2xl">
              {title}
            </h2>

            {/* Description Paragraph */}
            <p className="max-w-xl text-base font-normal leading-relaxed text-white sm:text-[30px] sm:leading-[1.6] lg:leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Column - Laptop Mockup Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] lg:max-w-full">
              {image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

