import Link from "next/link";

export default function PlaceholderPage({ title, description }) {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-neutral-900">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center space-y-5">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-base text-neutral-600 sm:text-lg">{description}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-[10px] bg-[#f74d7b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e0416e]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
