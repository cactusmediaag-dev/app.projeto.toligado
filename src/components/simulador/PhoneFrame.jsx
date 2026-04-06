import React from "react";
import { motion } from "framer-motion";

const StatusBar = ({ theme = "light" }) => {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const color = theme === "dark" ? "#fff" : "#000";

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', height: '28px', marginTop: '28px', color }}>
      <span style={{ fontSize: '11px', fontWeight: '600' }}>{time}</span>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <rect x="0" y="8" width="3" height="4" fill={color} rx="0.5"/>
          <rect x="4" y="5" width="3" height="7" fill={color} rx="0.5"/>
          <rect x="8" y="2" width="3" height="10" fill={color} rx="0.5"/>
          <rect x="12" y="0" width="3" height="12" fill={color} rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 10 L8 10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 7.5 Q8 5 11 7.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M2.5 5 Q8 1 13.5 5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '22px', height: '11px', border: `1.5px solid ${color}`, borderRadius: '2px', padding: '0 1px' }}>
          <div style={{ width: '75%', height: '100%', background: '#4CAF50', borderRadius: '1px' }}/>
          <div style={{ position: 'absolute', right: '-4px', width: '3px', height: '5px', background: color, borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  );
};

const AndroidNavBar = () => (
  <div style={{
    width: '100%',
    height: '32px',
    background: 'rgba(245,245,245,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 30px',
    borderTop: '0.5px solid #e0e0e0',
    flexShrink: 0,
    boxSizing: 'border-box'
  }}>
    <span style={{ fontSize: '16px', color: '#555', cursor: 'pointer', padding: '4px 8px' }}>‹</span>
    <div style={{ width: '16px', height: '16px', border: '2px solid #555', borderRadius: '3px' }}/>
    <div style={{ width: '13px', height: '13px', border: '2px solid #555', borderRadius: '2px', boxShadow: '2px 2px 0 #555' }}/>
  </div>
);

export default function PhoneFrame({ children, statusBarTheme = "light" }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        position: 'relative',
        width: '320px',
        margin: '0 auto'
      }}
    >
      {/* Moldura externa */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '45px',
        padding: '12px',
        boxShadow: '0 0 0 2px #333, 0 0 0 4px #555, 0 25px 60px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '28px',
          background: '#1a1a1a',
          borderRadius: '0 0 18px 18px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '10px', height: '10px', background: '#222', borderRadius: '50%', border: '1px solid #444' }}/>
        </div>

        {/* Botão Volume + */}
        <div style={{ position: 'absolute', left: '-6px', top: '120px', width: '6px', height: '35px', background: '#444', borderRadius: '3px 0 0 3px' }}/>
        {/* Botão Volume - */}
        <div style={{ position: 'absolute', left: '-6px', top: '165px', width: '6px', height: '35px', background: '#444', borderRadius: '3px 0 0 3px' }}/>
        {/* Botão Power */}
        <div style={{ position: 'absolute', right: '-6px', top: '140px', width: '6px', height: '55px', background: '#444', borderRadius: '0 3px 3px 0' }}/>

        {/* Tela interna */}
        <div style={{
          width: '100%',
          background: '#fff',
          borderRadius: '36px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '580px'
        }}>
          <StatusBar theme={statusBarTheme} />

          {/* Conteúdo principal */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {children}
          </div>

          {/* NavBar Android — dentro da tela, no fundo */}
          <AndroidNavBar />
        </div>
      </div>
    </motion.div>
  );
}

export { StatusBar, AndroidNavBar };