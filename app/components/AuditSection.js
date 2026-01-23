import { useState } from "react";
import GetStartToday from "./GetStartedToday";
import Modal from "./Modal";
import CTAFormModal from "./CtaformButton";
import { Audits, Check } from "../constants/audit";

export default function AuditSection() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCTAClick = (val) => {
        setIsModalOpen(val);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <section
            id="about"
            className="bg-white px-6 text-center py-24 text-neutral-900 lg:px-8"
        >
            <div className="mx-auto w-full max-w-[1085px]">
                <div className="mx-auto max-w-4xl flex-row">
                    <h2 className="text-3xl font-semibold sm:text-4xl">
                        Comprehensive website/App audits
                    </h2>
                    <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                        We evaluate every key aspect of your website—usability,
                        accessibility, and performance—to identify friction
                        points stopping users from converting.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {Audits.map((audit) => (
                        <div
                            key={audit.title}
                            className="group relative flex h-full flex-col rounded-[20px] border border-black bg-white px-10 pt-12 pb-7 text-left  transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_22px_40px_-20px_rgba(0,0,0,0.25)] cursor-pointer"
                        >
                            {/* subtle glow frame */}
                            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 gap-6 " />

                            <div className="flex flex-col items-left  text-neutral-900 gap-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl  text-white transition-all duration-300">
                                    {audit.icon}
                                </div>

                                <h3 className="text-[22px] font-semibold leading-tight text-left">
                                    {audit.title}
                                </h3>
                            </div>

                            <p className="text-sm leading-6 text-neutral-700 mt-4 mb-7">
                                {audit.description}
                            </p>

                            <ul className="mb-4 gap-3">
                                {audit.points.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start text-sm pb-3 text-neutral-900 gap-[10px] font-semibold"
                                    >
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
                    <GetStartToday isOpen={handleCTAClick} />
                </div>
            </div>
            <Modal
                // title="Get started"
                isOpen={isModalOpen}
                onClose={handleClose}
                width={940}
                height={640}
                borderRadius={26}
                children={<CTAFormModal isOpen={handleCTAClick} />}
            />
        </section>
    );
}
