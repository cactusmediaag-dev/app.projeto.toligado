import React from "react";
import { motion } from "framer-motion";

export default function ElementoClicavel({ 
  children, 
  onClick, 
  isCorrect, 
  posicao = "bottom",
  className = "",
  mostrarSeta = true
}) {
  const arrowPositions = {
    top: "top-[-40px] left-1/2 -translate-x-1/2 rotate-180",
    bottom: "bottom-[-40px] left-1/2 -translate-x-1/2",
    left: "left-[-40px] top-1/2 -translate-y-1/2 -rotate-90",
    right: "right-[-40px] top-1/2 -translate-y-1/2 rotate-90",
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {/* Seta Animada */}
      {mostrarSeta && (
        <motion.div
          className={`absolute ${arrowPositions[posicao]} text-4xl pointer-events-none z-20`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      )}

      {/* Elemento com Pulse - área clicável expandida */}
      <div
        onClick={onClick}
        className="cursor-pointer animate-pulse-border p-2"
        style={{
          animation: "pulse-border 2s infinite",
          minWidth: "48px",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(243, 152, 75, 0); }
          100% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0); }
        }
        .animate-pulse-border {
          border-radius: 1rem;
        }
      `}</style>
    </motion.div>
  );
}