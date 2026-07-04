import { useState } from 'react';
import { motion } from 'framer-motion';
import VozSistema from '../shared/AudioSystem';

export default function InstructionBalloon({ text, onRepeat, mascot = "🧓" }) {
  const [falando, setFalando] = useState(false);

  const falar = async () => {
    setFalando(true);
    if (onRepeat) {
      onRepeat();
    } else {
      await VozSistema.falarForcado(text);
    }
    setTimeout(() => setFalando(false), 500);
  };

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

      <p style={{
        flex: 1, margin: 0,
        fontSize: '15px', lineHeight: 1.5,
        color: '#333', fontWeight: '600'
      }}>
        {text}
      </p>

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