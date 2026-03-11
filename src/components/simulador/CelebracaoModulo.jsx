import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ActionButton from "@/components/shared/ActionButton";
import Confetti from "@/components/shared/Confetti";

export default function CelebracaoModulo({ 
  moduloNumero, 
  moduloTitulo, 
  moedasGanhas, 
  nomeUsuario,
  onVerCertificado,
}) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      speakText(`Parabéns! Você concluiu o módulo ${moduloNumero}! Você é incrível!`);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5C2E7F] to-[#9B59B6] flex flex-col items-center justify-center px-5 py-8">
      <Confetti active={showConfetti} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="text-8xl mb-6"
        >
          🏆
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-3">
          Módulo {moduloNumero} Concluído!
        </h1>
        <p className="text-xl text-white/90 font-semibold mb-6">
          {moduloTitulo}
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 border-2 border-white/30"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">🪙</span>
          <div className="text-center">
            <p className="text-4xl font-black text-[#FFD080]">+{moedasGanhas}</p>
            <p className="text-sm text-white/80 font-semibold">moedas ganhas!</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm space-y-3"
      >
        <ActionButton onClick={onVerCertificado} variant="primary">
          Ver meu Certificado 📜
        </ActionButton>
        <ActionButton 
          onClick={() => navigate(createPageUrl("Modulos"))} 
          variant="outline"
          className="bg-white/20 border-white/40 text-white hover:bg-white/30"
        >
          Voltar aos Módulos
        </ActionButton>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-white/70 text-center font-semibold mt-8 text-lg"
      >
        Continue assim, você está arrasando! 🌟
      </motion.p>
    </div>
  );
}