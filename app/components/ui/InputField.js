"use client";

export default function FloatingInput({
  label,
  value = "",
  onChange,
  type = "text",
  error,
}) {
  return (
    <div className="w-full">
      {/* INPUT CONTAINER (fixed height) */}
      <div className="relative h-[60px] w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "   // 🔑 REQUIRED
          className="
            peer
            h-full w-full
            rounded-[12px]
            border
            border-gray-300
            bg-white
            px-4
            pt-5
            pb-2
            text-[15px]
            outline-none
            focus:border-gray-400
          "
        />

        {/* FLOATING LABEL */}
        <span
          className="
            pointer-events-none
            absolute left-4
            text-gray-400
            transition-all duration-200
            top-1/2 -translate-y-1/2 text-[15px]
            peer-focus:top-2
            peer-focus:-translate-y-0
            peer-focus:text-[11px]
            peer-focus:text-gray-500
            peer-[&:not(:placeholder-shown)]:top-2
            peer-[&:not(:placeholder-shown)]:-translate-y-0
            peer-[&:not(:placeholder-shown)]:text-[11px]
            peer-[&:not(:placeholder-shown)]:text-gray-500
          "
        >
          {label}
        </span>
      </div>

      {/* ERROR SLOT (no layout shift) */}
      <div className="h-[14px] mt-1">
        <p className="text-xs text-red-500">{error || ""}</p>
      </div>
    </div>
  );
}
