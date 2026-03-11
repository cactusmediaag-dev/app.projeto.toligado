import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-6 py-4">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${i < currentStep ? "bg-[#F3984B] text-white scale-110" : 
                i === currentStep ? "bg-[#5C2E7F] text-white scale-110" : 
                "bg-[#EDE0FF] text-[#5C2E7F]"}
            `}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-[#EDE0FF] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #5C2E7F, #F3984B)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}