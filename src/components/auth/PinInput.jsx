import React, { useRef, useEffect } from "react";

export default function PinInput({ value, onChange, length = 6, error }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange(val);
  };

  const digits = value.split("");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-200
              ${digits[i] ? "border-[#5C2E7F] bg-[#EDE0FF] text-[#5C2E7F] scale-105" : "border-gray-300 bg-white text-gray-400"}
              ${error ? "border-red-400 bg-red-50" : ""}
            `}
          >
            {digits[i] ? "●" : ""}
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        className="opacity-0 absolute -z-10 h-0 w-0"
        autoComplete="off"
      />
      {error && (
        <p className="text-red-500 text-base font-semibold animate-pulse">{error}</p>
      )}
    </div>
  );
}