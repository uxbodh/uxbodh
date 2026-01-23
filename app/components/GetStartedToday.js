"use client";

import React from "react";

const GetStartToday = ({
    isOpen,
    buttontext = "Get Detailed UX Audit Report",
}) => {
    const handleClick = () => {
        isOpen(true);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex h-12 max-w-80 items-center justify-center rounded-[10px] bg-[#F5426C] px-7 text-[16px] font-semibold text-white shadow-md transition hover:bg-[#e33b64]"
        >
            {buttontext}
        </button>
    );
};

export default GetStartToday;
