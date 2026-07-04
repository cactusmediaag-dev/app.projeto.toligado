import React from "react";
import { motion } from "framer-motion";

export default function AndroidHomeScreen({ onAppClick, appsCustom = null, appDestacado = null }) {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const defaultApps = [
    { icon: '📷', label: 'Câmera', bg: '#1a1a2e', id: 'camera' },
    { icon: '📱', label: 'Telefone', bg: '#4CAF50', id: 'phone' },
    { icon: '💬', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
    { icon: '🌐', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
    { icon: '⚙️', label: 'Config.', bg: '#607D8B', id: 'settings' },
    { icon: '📸', label: 'Fotos', bg: '#FF5722', id: 'photos' },
    { icon: '🔍', label: 'Google', bg: '#4285F4', id: 'google' },
    { icon: '🎵', label: 'Música', bg: '#E91E63', id: 'music' },
  ];
  const apps = appsCustom || defaultApps;

  const dockApps = [
    { icon: '📱', label: 'Tel.' },
    { icon: '💬', label: 'Mens.' },
    { icon: '🌐', label: 'Web' },
    { icon: '📸', label: 'Fotos' },
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #1a3a6b 0%, #2d5aa0 50%, #1a3a6b 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Wallpaper gradients */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, rgba(100,150,255,0.3) 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 60%, rgba(200,100,255,0.2) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }} />

      {/* STATUS BAR compacta */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 16px 2px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#fff',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0
      }}>
        <span>{time}</span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '12px' }}>
          <span>📶</span>
          <span>🛜</span>
          <span>🔋</span>
        </div>
      </div>

      {/* RELÓGIO central */}
      <div style={{
        textAlign: 'center',
        color: '#fff',
        paddingTop: '8px',
        paddingBottom: '12px',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '40px', fontWeight: '200', letterSpacing: '-2px', lineHeight: 1 }}
        >
          {time}
        </motion.div>
        <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
          {date}
        </div>
      </div>

      {/* GRADE DE APPS */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        padding: '0 16px',
        alignContent: 'start',
        position: 'relative',
        zIndex: 10
      }}>
        {apps.map((app, i) => {
          const isDestacado = appDestacado && appDestacado === app.id;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onAppClick?.(app.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                minHeight: '44px'
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                background: app.bg,
                boxShadow: isDestacado
                  ? '0 0 0 0 rgba(243,152,75,0.7)'
                  : '0 2px 6px rgba(0,0,0,0.2)',
                animation: isDestacado ? 'pulse-border-ahs 2s infinite' : 'none'
              }}>
                {app.icon}
              </div>
              <span style={{
                fontSize: '12px',
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                lineHeight: 1.2
              }}>
                {app.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* DOCK — em fluxo, sem absolute */}
      <div style={{
        marginTop: 'auto',
        margin: '0 16px 16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0
      }}>
        {dockApps.map((app, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            minHeight: '44px',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              background: 'rgba(255,255,255,0.2)'
            }}>
              {app.icon}
            </div>
            <span style={{
              fontSize: '10px',
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
              {app.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse-border-ahs {
          0% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(243, 152, 75, 0); }
          100% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0); }
        }
      `}</style>
    </div>
  );
}