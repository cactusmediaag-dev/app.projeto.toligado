import React from "react";
import { motion } from "framer-motion";

export default function InstructionBalloon({ text, onRepeat, mascot = "🧓" }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-3xl mx-4 mb-4 p-4 flex items-start gap-3 relative"
      style={{
        boxShadow: '0 -4px 20px rgba(92,46,127,0.15)',
        border: '2px solid rgba(92,46,127,0.1)'
      }}
    >
      {/* Triangle pointing up */}
      <div className="absolute" style={{
        top: '-10px',
        left: '40px',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid rgba(92,46,127,0.1)'
      }}></div>

      {/* Avatar */}
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
          boxShadow: '0 2px 8px rgba(92,46,127,0.3)'
        }}
      >
        {mascot}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[15px] leading-relaxed text-[#5C2E7F] font-semibold m-0">
          {text}
        </p>
      </div>

      {/* Repeat button */}
      <button
        onClick={onRepeat}
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base border-none cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
          boxShadow: '0 2px 8px rgba(92,46,127,0.4)'
        }}
      >
        🔊
      </button>
    </motion.div>
  );
}