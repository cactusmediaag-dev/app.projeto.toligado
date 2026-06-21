import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2 } from "lucide-react";
import InstructionBalloon from "./InstructionBalloon";
import AudioSystem from "../shared/AudioSystem";

export default function SimuladorImersivo({
  children,
  instrucao,
  audioText,
  passoAtual,
  totalPassos,
  onVoltar,
  showMascote = true,
  contentTheme = "light",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);

  const speakText = async (text) => {
    setIsPlaying(true);
    try { await AudioSystem.speak(text); }
    catch (e) { console.error('Audio error:', e); }
    setIsPlaying(false);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (audioText) speakText(audioText);
    }, 500);
    return () => {
      clearTimeout(t);
      AudioSystem.stop();
    };
  }, [audioText]);

  useEffect(() => {
    setScreenOpacity(0);
    const t = setTimeout(() => setScreenOpacity(1), 150);
    return () => clearTimeout(t);
  }, [passoAtual]);

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: '100dvh',
        background: '#F1E9F7',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* HEADER — idêntico ao SimuladorWrapper */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 12px',
          background: '#F1E9F7',
          zIndex: 50
        }}
      >
        <button
          onClick={onVoltar}
          className="active:scale-90 transition-all"
          style={{
            width: '46px', height: '46px',
            borderRadius: '14px',
            background: '#fff',
            color: '#5C2E7F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(92,46,127,0.12)',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 mx-3">
          <div
            style={{
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '999px',
              height: '8px',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #5C2E7F, #9B59B6)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(passoAtual / totalPassos) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p
            className="text-center mt-1"
            style={{ fontSize: '13px', color: '#5C2E7F', fontWeight: '700' }}
          >
            Passo {passoAtual} de {totalPassos}
          </p>
        </div>

        <button
          onClick={() => audioText && speakText(audioText)}
          className="active:scale-90 transition-all"
          style={{
            width: '46px', height: '46px',
            borderRadius: '14px',
            background: '#fff',
            color: isPlaying ? '#F3984B' : '#5C2E7F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(92,46,127,0.12)',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            animation: isPlaying ? 'softPulse 1.5s ease infinite' : 'none'
          }}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* CONTEÚDO IMERSIVO — sem mockup do celular */}
      <div
        className="flex-1 flex flex-col"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: contentTheme === 'dark' ? '#000' : '#fff',
          color: contentTheme === 'dark' ? '#ffffff' : '#1a1a1a',
          paddingBottom: showMascote ? '120px' : '20px'
        }}
      >
        <motion.div
          style={{
            opacity: screenOpacity,
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>

      {/* BALÃO DO MASCOTE — fixo no fundo */}
      {instrucao && showMascote && (
        <div
          style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            zIndex: 100,
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(241,233,247,0.95) 30%)',
            color: '#1a1a1a'
          }}
        >
          <InstructionBalloon
            text={instrucao}
            onRepeat={() => audioText && speakText(audioText)}
          />
        </div>
      )}
    </div>
  );
}