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
    }, 200);
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
        background: 'linear-gradient(180deg, #F1E9F7 0%, #E8DDF0 100%)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflowX: 'hidden',
        overflowY: 'hidden'
      }}
    >
      {/* HEADER REFINADO */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          padding: 'calc(env(safe-area-inset-top, 44px) + 14px) 16px 14px',
          background: 'transparent',
          zIndex: 50,
          position: 'relative'
        }}
      >
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onVoltar}
          style={{
            width: '44px', height: '44px',
            borderRadius: '14px',
            background: '#fff',
            color: '#5C2E7F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(92,46,127,0.08)',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

        <div className="flex-1 mx-3">
          <div
            style={{
              background: 'rgba(255,255,255,0.6)',
              borderRadius: '999px',
              height: '8px',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #5C2E7F, #9B59B6)',
                borderRadius: '999px',
                boxShadow: '0 0 8px rgba(155,89,182,0.4)'
              }}
              initial={{ width: 0 }}
              animate={{
                width: `${(passoAtual / totalPassos) * 100}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p
            className="text-center mt-1.5"
            style={{
              fontSize: '12px',
              color: '#5C2E7F',
              fontWeight: '800',
              letterSpacing: '0.3px'
            }}
          >
            Passo {passoAtual} de {totalPassos}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => audioText && speakText(audioText)}
          style={{
            width: '44px', height: '44px',
            borderRadius: '14px',
            background: isPlaying
              ? 'linear-gradient(135deg, #F3984B, #e67e22)'
              : '#fff',
            color: isPlaying ? '#fff' : '#5C2E7F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying
              ? '0 4px 16px rgba(243,152,75,0.4)'
              : '0 2px 10px rgba(92,46,127,0.08)',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'all 0.3s ease'
          }}
        >
          <Volume2 className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* CARD CONTEÚDO — com profundidade */}
      <div
        className="flex-1 flex flex-col"
        style={{
          position: 'relative',
          padding: '0 12px',
          paddingBottom: showMascote ? '130px' : '20px',
          overflow: 'hidden'
        }}
      >
        <motion.div
          style={{
            opacity: screenOpacity,
            flex: 1,
            background: contentTheme === 'dark' ? '#000' : '#fff',
            color: contentTheme === 'dark' ? '#fff' : '#1a1a1a',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: contentTheme === 'dark'
              ? '0 20px 50px rgba(0,0,0,0.4)'
              : '0 10px 40px rgba(92,46,127,0.12)',
            border: contentTheme === 'dark'
              ? '1px solid #222'
              : '1px solid rgba(255,255,255,0.6)'
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Container scroll INTERNO sem barra visível */}
          <div
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            className="hide-scrollbar"
          >
            <div className="sim-screen-fill"
                 style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
          </div>
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
            background: 'linear-gradient(180deg, transparent 0%, rgba(232,221,240,0.95) 30%)',
            color: '#1a1a1a'
          }}
        >
          <InstructionBalloon
            text={instrucao}
            onRepeat={() => audioText && speakText(audioText)}
          />
        </div>
      )}

      {/* CSS global para esconder scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .sim-screen-fill > * {
          flex: 1 0 auto;
        }
      `}</style>
    </div>
  );
}