import React from "react";
import Image from "next/image";
import GetStartToday from "./GetStartedToday";

const RelaxHero = ({ bgClass = "bg-[#ffffff]", relaxImg }) => {
  return (
    <section
      className={`w-full lg:w-[780px] mx-auto py-20 px-4 mb-[160] ${bgClass} pt-[50px]`}
    >
     {relaxImg && (
      <div className="w-full flex w-full items-center justify-center">
      <Image
                    src="/images/relex.png"
                    alt="Keyboard with hands"
                     width={444}
                      height={325}
                     priority
                />
      </div>
     )}
      <div className="w-full w-full mt-10 mb-2 text-center items-center justify-center">
        <h2 className="text-2xl lg:text-5xl md:text-10xl font-semibold leading70 text-black ">
          <span className="text-[#EA3B67]">Relax.</span>{" "}
          Your growth
          <br />
          starts here
        </h2>

        <p className="mt-4 text-sm md:text-xl text-black mb-6">
          Smart strategies. Real impact. Sustainable success.
        </p>

       <GetStartToday />
      </div>
    </section>
  );
};

export default RelaxHero;