import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function PullToRefresh({ onRefresh, children }) {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const scrollContainer = useRef(null);

  const handleTouchStart = (e) => {
    if (scrollContainer.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (startY.current === 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;
    
    if (distance > 0 && scrollContainer.current?.scrollTop === 0) {
      setPullDistance(Math.min(distance, 100));
      setPulling(distance > 60);
    }
  };

  const handleTouchEnd = async () => {
    if (pulling && onRefresh) {
      await onRefresh();
    }
    setPullDistance(0);
    setPulling(false);
    startY.current = 0;
  };

  return (
    <div
      ref={scrollContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-full overflow-auto"
    >
      <motion.div
        animate={{ y: pullDistance * 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {pullDistance > 0 && (
          <div className="flex justify-center py-2">
            <motion.div
              animate={{ rotate: pulling ? 180 : 0 }}
              className="text-2xl"
            >
              {pulling ? "🔄" : "⬇️"}
            </motion.div>
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}