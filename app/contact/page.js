import PageShell from "../components/PageShell";
import ContactForm from "../components/ContactForm";

export default function ContactRoute() {
  return (
    <PageShell>
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <h1 className="text-5xl font-semibold text-black sm:text-5xl">
              Lets Connect
            </h1>

            <div className="mt-10 max-w-md space-y-6 text-lg text-neutral-700">
              <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M3 7l9 6 9-6"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      strokeWidth="1.6"
                    />
                  </svg>
                </span>
                <div className="flex items-center gap-2">
                  <span>connect@uxbodh.com</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 w-4 text-neutral-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M8 8h9a2 2 0 012 2v9a2 2 0 01-2 2h-9a2 2 0 01-2-2v-9a2 2 0 012-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12.9.32 1.78.6 2.63a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.11 6.11l1.27-1.27a2 2 0 012.11-.45c.85.28 1.73.48 2.63.6A2 2 0 0122 16.92z"
                    />
                  </svg>
                </span>
                <div className="flex items-center gap-2">
                  <span>9718902345</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 w-4 text-neutral-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M8 8h9a2 2 0 012 2v9a2 2 0 01-2 2h-9a2 2 0 01-2-2v-9a2 2 0 012-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z"
                    />
                    <circle cx="12" cy="11" r="2.5" strokeWidth="1.6" />
                  </svg>
                </span>
                <div className="space-y-1">
                  <p>4065, K Block, Sector 49, Faridabad, Haryana,</p>
                  <p>Pin-121001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-[22px] bg-[#f7f3ea] px-6 py-10 sm:px-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
