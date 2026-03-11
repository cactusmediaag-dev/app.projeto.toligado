import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2 } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import InstructionBalloon from "./InstructionBalloon";
import AudioSystem from "@/components/shared/AudioSystem";

export default function SimuladorWrapper({
  children,
  instrucao,
  audioText,
  passoAtual,
  totalPassos,
  onVoltar,
  showMascote = true,
  statusBarTheme = "light",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);

  const speakText = async (text) => {
    setIsPlaying(true);
    try {
      await AudioSystem.speak(text);
    } catch (e) {
      console.error('Audio error:', e);
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioText) speakText(audioText);
    }, 500);
    return () => {
      clearTimeout(timer);
      AudioSystem.stop();
    };
  }, [audioText]);

  // Transition effect when changing steps
  useEffect(() => {
    setScreenOpacity(0);
    const timer = setTimeout(() => setScreenOpacity(1), 150);
    return () => clearTimeout(timer);
  }, [passoAtual]);

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

      {/* Phone Simulator */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <PhoneFrame statusBarTheme={statusBarTheme}>
          <motion.div
            style={{ opacity: screenOpacity }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </PhoneFrame>
      </div>

      {/* Instruction Balloon */}
      {instrucao && showMascote && (
        <InstructionBalloon
          text={instrucao}
          onRepeat={() => audioText && speakText(audioText)}
        />
      )}
    </div>
  );
}