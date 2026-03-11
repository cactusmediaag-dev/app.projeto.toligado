import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const cards = [
  { emoji: "📚", label: "Módulos", color: "#5C2E7F", page: "Modulos" },
  { emoji: "🏆", label: "Ranking", color: "#2ECC71", page: "Ranking" },
  { emoji: "🎖️", label: "Conquistas", color: "#F3984B", page: "Conquistas" },
];

export default function ActionCards() {
  return (
    <div className="px-5 mt-6">
      <h3 className="text-lg font-bold text-[#5C2E7F] mb-3">Explorar</h3>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Link to={createPageUrl(card.page)}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="ripple-btn rounded-3xl p-5 flex flex-col items-center gap-2 shadow-lg transition-all active:shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)`,
                }}
              >
                <span className="text-4xl">{card.emoji}</span>
                <span className="text-sm font-bold text-white">{card.label}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}