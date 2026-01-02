import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GetStartToday from "./GetStartedToday";
import Modal from "./Modal";
import CTAFormModal from "./CtaformButton";

export default function Hero({ onOpenCTA }) {
    const sectionRef = useRef(null);
    const [showTitle, setShowTitle] = useState(false);
    const [showBody, setShowBody] = useState(false);
    const [showVisual, setShowVisual] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimatedRef.current) {
                        setShowTitle(true);
                        setShowBody(true);
                        setShowVisual(true);
                        setShowButton(true);
                        hasAnimatedRef.current = true;
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleCTAClick = (val) => {
        setIsModalOpen(val);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="bg-white px-6 pb-0 pt-16 lg:px-8"
        >
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
                <h1
                    className={`text-6xl font-semibold  tracking-tight text-neutral-900  lg:text-6xl lg:leading-tight transition-all duration-700 ease-out ${
                        showTitle
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                    }`}
                >
                    Get essential
                    <br />
                    customer insights
                </h1>
                <p
                    className={`mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg transition-all duration-700 ease-out delay-100 ${
                        showBody
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                    }`}
                >
                    Get expert UI/UX analysis that reveals hidden issues and
                    unlocks your website&apos;s full potential
                </p>
                <div
                    className={`mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 transition-all duration-700 ease-out delay-200 ${
                        showButton
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                    }`}
                >
                    <GetStartToday isOpen={handleCTAClick} />
                </div>

                <div className="relative w-full max-w-[1200px]">
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/images/hero-image-left.png"
                            alt="Left sticky note"
                            width={200}
                            height={180}
                            className={`absolute left-12 top-16 hidden z-10 -rotate-6 sm:block transition-all duration-800 ease-out ${
                                showVisual
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-6"
                            }`}
                            priority
                        />
                        <Image
                            src="/images/hero-image.png"
                            alt="Keyboard with hands"
                            width={720}
                            height={360}
                            className={`h-auto w-full max-w-3xl transition-all duration-800 ease-out ${
                                showVisual
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            }`}
                            priority
                        />
                        <Image
                            src="/images/hero-image-right.png"
                            alt="Right sticky note"
                            width={200}
                            height={180}
                            className={`absolute right-5 top-16 hidden z-10 rotate-6 sm:block transition-all duration-800 ease-out ${
                                showVisual
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-6"
                            }`}
                            priority
                        />
                    </div>
                </div>
            </div>
            <Modal
                // title="Get started"
                isOpen={isModalOpen}
                onClose={handleClose}
                width={940}
                height={640}
                borderRadius={26}
                className="enquiry-form-modal"
                children={<CTAFormModal isOpen={handleCTAClick} />}
            />
        </section>
    );
}
