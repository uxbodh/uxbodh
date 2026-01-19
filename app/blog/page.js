import PageShell from "../components/PageShell";
import Image from "next/image";

export default function BlogRoute() {
  return (
    <PageShell>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
    
        <div className="mt-8 w-full max-w-5xl">
          <div className="w-full overflow-hidden bg-white ">
            <Image
              src="/images/comingsoon.jpg"
              alt="Coming soon Big News banner"
              width={1300}
              height={520}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
