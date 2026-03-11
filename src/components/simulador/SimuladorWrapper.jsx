import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2 } from "lucide-react";

export default function SimuladorWrapper({
  children,
  instrucao,
  audioText,
  passoAtual,
  totalPassos,
  onVoltar,
  showMascote = true,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes('pt') && v.name.toLowerCase().includes('female'));
      if (femaleVoice) utterance.voice = femaleVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioText) speakText(audioText);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [audioText]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F8F0FF] to-[#EDE0FF] pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <button
          onClick={onVoltar}
          className="p-2 rounded-xl bg-white/80 text-[#5C2E7F] active:scale-90 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 mx-4">
          <div className="bg-white/60 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#5C2E7F] to-[#9B59B6]"
              initial={{ width: 0 }}
              animate={{ width: `${(passoAtual / totalPassos) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-[#5C2E7F] font-semibold mt-1 text-center">
            Passo {passoAtual} de {totalPassos}
          </p>
        </div>
        <button
          onClick={() => audioText && speakText(audioText)}
          className={`p-2 rounded-xl bg-white/80 active:scale-90 transition-all shadow-sm
            ${isPlaying ? "text-[#F3984B] animate-pulse" : "text-[#5C2E7F]"}
          `}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Celular Simulado */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black rounded-[3rem] p-4 shadow-2xl"
            style={{ width: "320px", height: "600px" }}
          >
            <div className="bg-white rounded-[2.5rem] w-full h-full overflow-hidden relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
              {children}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Balão de Instrução */}
      <AnimatePresence>
        {instrucao && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="mx-4 mb-4"
          >
            <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-[#EDE0FF]">
              <div className="flex gap-3 items-start">
                {showMascote && (
                  <div className="text-4xl flex-shrink-0">🧓</div>
                )}
                <p className="text-lg text-[#5C2E7F] font-semibold leading-relaxed flex-1">
                  {instrucao}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}