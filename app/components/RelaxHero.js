import React from "react";
import GetStartToday from "./GetStartedToday";

const RelaxHero = ({ bgClass = "bg-[#ffffff]" }) => {
  return (
    <section
      className={`w-[780px] mx-auto flex items-center justify-center py-16 px-4 ${bgClass}`}
    >
      <div className="max-w-2xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold md:leading-snug text-black">
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