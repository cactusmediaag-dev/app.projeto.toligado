import React from "react";
import { motion } from "framer-motion";

export default function BannerDestaque({ usuario }) {
  const nivel = usuario?.nivel_atual || 1;
  const xp = usuario?.xp_total || 0;
  const xpParaProximo = nivel * 100;
  const progresso = Math.min((xp / xpParaProximo) * 100, 100);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mx-5 rounded-3xl p-6 relative overflow-hidden shadow-xl"
      style={{ background: "linear-gradient(135deg, #F3984B, #FFD080)" }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-6" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-4xl">⚡</span>
          <h3 className="text-2xl font-black text-white">Tô Ligado!</h3>
        </div>
        <p className="text-white/90 font-semibold text-base mb-4">
          Aprenda, jogue e cresça!
        </p>

        <div className="bg-white/25 rounded-full h-3 overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        <div className="flex justify-between text-sm text-white/80 font-semibold">
          <span>Nível {nivel}</span>
          <span>{xp}/{xpParaProximo} XP</span>
        </div>
      </div>
    </motion.div>
  );
}