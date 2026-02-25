import PageShell from "../components/PageShell";
import ContactForm from "../components/ContactForm";
import Image from "next/image";

export default function ContactRoute() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 px-5">
            <h1 className="text-[48px] md:text-[55px] font-semibold text-black">
              Lets Connect
            </h1>

            <div className="mt-10 max-w-lg space-y-6 text-lg text-black">
              <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
               
                  <Image src={`/images/icons/email.svg`} title="email" alt="email" width={26} height={20} />
               
                <div className="flex items-center gap-2 text-lg">
                  <span>info@uxbodh.com</span>
               <Image src={`/images/icons/copy.svg`} title="email" alt="email" width={14} height={14} />
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
                 <Image src={`/images/icons/phone.svg`} title="phone" alt="phone" width={26} height={26} />
                <div className="flex items-center gap-2 text-lg">
                  <span>9718902345</span>
                  <Image src={`/images/icons/copy.svg`} title="copy" alt="copy" width={14} height={14} />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Image src={`/images/icons/location.svg`} title="location" alt="location" width={20} height={30} />
                <div className="space-y-1 text-lg">
                  <p>4065, K Block, Sector 49, Faridabad, Haryana,</p>
                  <p>Pin-121001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-[0px] lg:rounded-[20px] bg-[#F6F3ED] px-6 py-10 md:px-10 md:py-12 lg:px-[70px] lg:py-[70px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
