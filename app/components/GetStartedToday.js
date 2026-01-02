"use client";

import React from "react";

const GetStartToday = ({ isOpen }) => {

    const handleClick = () => {
        isOpen(true);
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex h-12 w-[280px] items-center justify-center rounded-[10px] bg-[#F5426C] px-7 text-[16px] font-semibold text-white shadow-md transition hover:bg-[#e33b64]"
        >
            Get Started Today
        </button>
    );
};

export default GetStartToday;
