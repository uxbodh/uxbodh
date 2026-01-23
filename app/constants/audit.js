const Audits = [
    {
        title: "UI/UX audit",
        description:
            "We evaluate how design and experience impact conversions, retention, and task completion.",
        points: [
            "Navigation clarity",
            "Information architecture",
            "Visual hierarchy",
            "Content readability",
            "Design system consistency",
            "Brand alignment across screens",
            "Form & checkout usability",
            "Responsive experience check",
            "Customer feedback",
            "Customer opinion analysis",
            "First-impression review",
            "Competitor UX/UI comparison",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49"
                height="40"
                viewBox="0 0 49 40"
                fill="none"
            >
                <rect
                    x="1.25"
                    y="1.25"
                    width="46.5"
                    height="37.3145"
                    rx="4.75"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <path
                    d="M6 1.25H43C45.6234 1.25 47.75 3.37665 47.75 6V7.81348C47.75 8.77997 46.9665 9.56348 46 9.56348H3C2.0335 9.56348 1.25 8.77998 1.25 7.81348V6C1.25 3.37665 3.37665 1.25 6 1.25Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <path
                    d="M32.7834 18.5583L22.4146 28.892L17.2228 23.9708"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <ellipse
                    cx="6.16661"
                    cy="5.20592"
                    rx="1.72228"
                    ry="1.72228"
                    fill="black"
                />
                <ellipse
                    cx="11.9078"
                    cy="5.20592"
                    rx="1.72228"
                    ry="1.72228"
                    fill="black"
                />
            </svg>
        ),
    },
    {
        title: "Accessibility audit",
        description:
            "Evaluate how usable your product is for people of all abilities and ensure accessibility compliance.",
        points: [
            "WCAG 2.1 guideline compliance review",
            "Read the page properly",
            "Proper heading structure (H1–H6 hierarchy)",
            "Color contrast ratio validation",
            "Check if error messages are clear easy to notice",
            "Focus states visible",
            "Touch target size (tap area not too small)",
            "Video captions & transcripts availability",
            "Time-limited interactions alternatives",
            "Accessible dropdowns, modals, dialogs",
            "Consistent navigation patterns",
            "Avoiding content that causes seizures (flashing content)",
            "Mobile screen reader gesture support",
            "Add confirmations before important actions like payments",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
            >
                <path
                    d="M16.9788 16.6087C18.2275 15.3601 20.2517 15.3603 21.5005 16.6087L25.6485 20.7568C29.2608 24.369 35.1176 24.3689 38.73 20.7568L42.5086 16.9782C43.7574 15.7297 45.7822 15.7302 47.0309 16.9788C48.2795 18.2275 48.2793 20.2517 47.0309 21.5005L43.2523 25.2791C39.6402 28.8914 39.6402 34.7482 43.2523 38.3605L47.0309 42.1391C48.2793 43.3879 48.2795 45.4121 47.0309 46.6608C45.7822 47.9094 43.7574 47.9099 42.5086 46.6615L38.73 42.8828C35.1176 39.2707 29.2608 39.2706 25.6485 42.8828L21.5005 47.0309C20.2517 48.2793 18.2275 48.2795 16.9788 47.0309C15.7302 45.7822 15.7297 43.7574 16.9782 42.5086L21.1262 38.3605C24.7385 34.7482 24.7385 28.8914 21.1262 25.2791L16.9782 21.131C15.7297 19.8822 15.7302 17.8574 16.9788 16.6087Z"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <circle
                    cx="31.8182"
                    cy="10.3596"
                    r="3.98256"
                    transform="rotate(-45 31.8182 10.3596)"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <circle
                    cx="53.2798"
                    cy="31.8198"
                    r="3.98256"
                    transform="rotate(-45 53.2798 31.8198)"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <circle
                    cx="10.3609"
                    cy="31.8198"
                    r="3.98256"
                    transform="rotate(-45 10.3609 31.8198)"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <circle
                    cx="31.8182"
                    cy="53.28"
                    r="3.98256"
                    transform="rotate(-45 31.8182 53.28)"
                    stroke="black"
                    strokeWidth="2.5"
                />
            </svg>
        ),
    },
    {
        title: "Performance audit",
        description:
            "Identify what slows your site/app down and provide fixes to improve real-world speed and Core Web Vitals.",
        points: [
            "Overall page/app load time",
            "Core Web Vitals (LCP, CLS, INP)",
            "First Contentful Paint & Time to Interactive",
            "Server response time (TTFB)",
            "Mobile vs desktop speed comparison",
            "Large image sizes or wrong image formats",
            "Heavy scripts and third-party plugins slowing the site",
            "Render-blocking CSS and JavaScript",
            "Unused CSS and JavaScript removal opportunities",
            "Caching setup (browser cache, server cache, CDN)",
            "API response time and backend latency",
            "Lazy loading for images and videos",
        ],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="36"
                viewBox="0 0 51 36"
                fill="none"
            >
                <path
                    d="M49.25 30.8905C49.25 17.6344 38.506 6.89038 25.25 6.89038C11.994 6.89038 1.25 17.6344 1.25 30.8905"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.0549 29.3842C20.0549 26.5175 22.3803 24.1921 25.2469 24.1921C28.1136 24.1921 30.4416 26.5175 30.4416 29.3842C30.4416 32.2535 28.1136 34.5762 25.2469 34.5762C22.3803 34.5762 20.0549 32.2535 20.0549 29.3842Z"
                    stroke="black"
                    strokeWidth="2.5"
                />
                <path
                    d="M32.8859 1.25024L26.5471 24.3584"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
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
        className="h-5 w-5 text-[#0B980E] flex-shrink-0 "
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
        />
    </svg>
);
export { Audits, Check };
