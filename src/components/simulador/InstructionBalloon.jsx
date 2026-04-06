import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function InstructionBalloon({ text, onRepeat, mascot = "🧓" }) {
  const [falando, setFalando] = useState(false);

  const falar = () => {
    setFalando(true);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR';
    u.rate = 0.82;
    u.pitch = 1.05;
    const voices = speechSynthesis.getVoices();
    const ptVoz = voices.find(v => v.lang.includes('pt') && (v.name.includes('Luciana') || v.name.includes('Francisca') || v.name.includes('female'))) || voices.find(v => v.lang.includes('pt'));
    if (ptVoz) u.voice = ptVoz;
    u.onend = () => setFalando(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    onRepeat && onRepeat();
  };

  useEffect(() => {
    const timer = setTimeout(() => falar(), 500);
    return () => { clearTimeout(timer); speechSynthesis.cancel(); };
  }, [text]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        background: '#fff',
        borderRadius: '20px',
        margin: '0 16px 16px',
        padding: '14px 16px',
        boxShadow: '0 -2px 16px rgba(92,46,127,0.12)',
        border: '1.5px solid rgba(92,46,127,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Mascote animado */}
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '26px',
        flexShrink: 0,
        animation: falando ? 'mascoteFala 0.3s ease infinite alternate' : 'none',
        boxShadow: '0 2px 8px rgba(92,46,127,0.3)'
      }}>
        {mascot}
      </div>

      {/* Texto */}
      <p style={{
        flex: 1, margin: 0,
        fontSize: '15px', lineHeight: 1.5,
        color: '#333', fontWeight: '600'
      }}>
        {text}
      </p>

      {/* Botão repetir */}
      <button onClick={falar} style={{
        width: '40px', height: '40px',
        borderRadius: '50%', border: 'none',
        background: falando
          ? 'linear-gradient(135deg, #F3984B, #e67e22)'
          : 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
        color: '#fff', fontSize: '18px',
        cursor: 'pointer', flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        animation: falando ? 'speakerPulse 0.5s ease infinite alternate' : 'none'
      }}>
        🔊
      </button>
    </motion.div>
  );
}