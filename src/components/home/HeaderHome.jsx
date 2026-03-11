import React from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function getGreetingEmoji() {
  const h = new Date().getHours();
  if (h < 12) return "☀️";
  if (h < 18) return "🌤️";
  return "🌙";
}

export default function HeaderHome({ usuario }) {
  const firstName = usuario?.nome?.split(" ")[0] || "Visitante";
  const isMale = usuario?.sexo === "Homem";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-5 pt-6 pb-3"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md"
          style={{ background: "linear-gradient(135deg, #EDE0FF, #FFFFFF)" }}
        >
          {isMale ? "👨" : "👩"}
        </div>
        <div>
          <p className="text-sm text-[#5C2E7F]/60 font-semibold">
            {getGreeting()} {getGreetingEmoji()}
          </p>
          <h2 className="text-xl font-black text-[#5C2E7F]">{firstName}!</h2>
        </div>
      </div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-2 bg-gradient-to-r from-[#FFD080] to-[#F3984B] px-4 py-2 rounded-2xl shadow-md"
      >
        <span className="text-xl">🪙</span>
        <span className="text-lg font-black text-white">{usuario?.moedas || 0}</span>
      </motion.div>
    </motion.div>
  );
}