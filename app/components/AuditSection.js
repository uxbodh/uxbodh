const audits = [
  {
    title: "UI/UX audit",
    description:
      "Comprehensive visual design analysis covering typography, color, spacing, and brand consistency.",
    points: [
      "Customer journey review",
      "Design System Review",
      "Visual Hierarchy",
      "Brand Alignment",
      "Form friction analysis",
      "Conversion heuristic checks",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6l4 2"
        />
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Accessibility audit",
    description:
      "Compliance check to ensure your website is accessible to all users, including those with disabilities.",
    points: [
      "Color contrast checks",
      "Design System Review",
      "Visual Hierarchy",
      "Brand Alignment",
      "Focus states & skip links",
      "Responsive readability",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.9-6.9l-1.4 1.4M7.5 16.5l-1.4 1.4m12.2 0l-1.4-1.4M7.5 7.5L6.1 6.1"
        />
      </svg>
    ),
  },
  {
    title: "Performance audit",
    description:
      "Technical performance analysis identifying speed bottlenecks and optimization opportunities.",
    points: [
      "Core Web Vitals review",
      "Design System Review",
      "Visual Hierarchy",
      "Brand Alignment",
      "Caching strategy",
      "Third-party scripts",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v6l4 2"
        />
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
      </svg>
    ),
  },
];

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="h-4 w-4 text-emerald-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function AuditSection({ onOpenCTA }) {
  return (
    <section
      id="about"
      className="bg-white px-6 text-center py-24 text-neutral-900 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Comprehensive website audits
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">
            We analyze every aspect of your website to uncover opportunities for improvement
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audits.map((audit) => (
            <div
              key={audit.title}
              className="relative flex h-full flex-col rounded-[18px] border border-neutral-300 bg-white px-7 py-8 text-left shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-4 flex items-center gap-3 text-neutral-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  {audit.icon}
                </div>
                <h3 className="text-lg font-semibold leading-tight">{audit.title}</h3>
              </div>
              <p className="text-sm text-neutral-700">{audit.description}</p>
              <ul className="mt-5 space-y-3">
                {audit.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-neutral-900">
                    <span className="mt-0.5 inline-block">
                      <Check />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => onOpenCTA?.()}
            className="rounded-[10px] bg-[#f74d7b] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e0416e]"
          >
            Get started today
          </button>
        </div>
      </div>
    </section>
  );
}
