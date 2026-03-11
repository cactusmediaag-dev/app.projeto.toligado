import React from "react";
import { motion } from "framer-motion";

export default function ActionButton({ children, onClick, disabled, variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-gradient-to-r from-[#F3984B] to-[#FFD080] text-white shadow-lg shadow-orange-200/50",
    secondary: "bg-gradient-to-r from-[#5C2E7F] to-[#9B59B6] text-white shadow-lg shadow-purple-200/50",
    outline: "bg-white border-2 border-[#5C2E7F] text-[#5C2E7F]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={`ripple-btn w-full min-h-[56px] rounded-2xl font-bold text-lg px-6 py-4 transition-all duration-200
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}