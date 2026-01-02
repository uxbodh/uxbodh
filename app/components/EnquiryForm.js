import { useState } from "react";
import InputField from "./ui/InputField";
import { useForm } from "react-hook-form";

const EnquiryForm = () => {
    
    const [focused, setFocused] = useState(false);
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur", // 👈 validation runs on blur
        reValidateMode: "onBlur",
    });

    const onSubmit = (data) => {
        console.log("SUBMIT DATA:", data);
    };

    const isActive = focused || data.length > 0;

    return (
        <>
            <div className="grid h-full w-full grid-cols-[340px_minmax(0,1fr)]">
                {/* LEFT SIDE */}
                <div className="relative h-full bg-black">
                    <img
                        src="/images/popup.jpg"
                        alt="Popup illustration"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <ul className="absolute top-10 left-7 right-6 space-y-4 text-[15px] text-white leading-snug">
                        {[
                            "Find Hidden Usability Issues",
                            "Improve Conversions & Sales",
                            "Enhance User Satisfaction",
                            "Save Time & Cost in Future Development",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-[2px] text-lg">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT SIDE (form) */}
                <div className="px-10 py-8 flex flex-col">
                    <h2 className="text-[28px] leading-tight font-bold mb-5">
                        Get start here
                    </h2>

                    <div className="flex flex-col gap-4 flex-1">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative w-full">
                                <input
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    className="w-full h-[60px] rounded-[12px] border border-[#D1D5DB] bg-white px-4 pt-5 pb-2 text-[15px] text-black outline-none focus:border-[#9CA3AF]"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                <span
                                    className={
                                        "pointer-events-none absolute left-4 transition-all duration-200 " +
                                        (isActive
                                            ? "top-2 text-[11px] text-[#6B7280] font-medium"
                                            : "top-1/2 -translate-y-1/2 text-[15px] text-[#9CA3AF]")
                                    }
                                >
                                    Test
                                </span>
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="
                                mt-1
                                w-full
                                h-[52px]
                                rounded-[12px]
                                text-white
                                font-semibold
                                text-[16px]
                                shadow-lg
                                transition
                                hover:opacity-90
                            "
                                style={{ backgroundColor: "#F5426C" }}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EnquiryForm;
