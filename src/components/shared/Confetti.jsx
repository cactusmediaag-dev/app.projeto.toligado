import React, { useEffect, useState } from "react";

const COLORS = ["#5C2E7F", "#F3984B", "#FFD080", "#9B59B6", "#EDE0FF", "#2ECC71", "#FF6B6B"];

function ConfettiPiece({ delay, left }) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = 8 + Math.random() * 12;
  const duration = 2 + Math.random() * 2;
  const shape = Math.random() > 0.5 ? "rounded-full" : "rounded-sm";

  return (
    <div
      className={`fixed ${shape} pointer-events-none z-50`}
      style={{
        left: `${left}%`,
        top: "-20px",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
      }}
    />
  );
}

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 0.8,
        left: Math.random() * 100,
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} delay={p.delay} left={p.left} />
      ))}
    </div>
  );
}