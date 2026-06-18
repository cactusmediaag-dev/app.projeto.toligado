import React from "react";
import { motion } from "framer-motion";

export default function AndroidHomeScreen({ onAppClick }) {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const apps = [
    { icon: '📷', label: 'Câmera', bg: '#1a1a2e', id: 'camera' },
    { icon: '📱', label: 'Telefone', bg: '#4CAF50', id: 'phone' },
    { icon: '💬', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
    { icon: '🌐', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
    { icon: '⚙️', label: 'Config.', bg: '#607D8B', id: 'settings' },
    { icon: '📸', label: 'Fotos', bg: '#FF5722', id: 'photos' },
    { icon: '🔍', label: 'Google', bg: '#4285F4', id: 'google' },
    { icon: '🎵', label: 'Música', bg: '#E91E63', id: 'music' },
  ];

  const dockApps = [
    { icon: '📱', label: 'Tel.' },
    { icon: '💬', label: 'Mens.' },
    { icon: '🌐', label: 'Web' },
    { icon: '📸', label: 'Fotos' },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #1a3a6b 0%, #2d5aa0 50%, #1a3a6b 100%)'
    }}>
      {/* Wallpaper gradients */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 40%, rgba(100,150,255,0.3) 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 60%, rgba(200,100,255,0.2) 0%, transparent 50%)`
      }}></div>

      {/* Clock widget */}
      <div className="text-center text-white pt-10 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '52px', fontWeight: '200', letterSpacing: '-2px', lineHeight: 1 }}
        >
          {time}
        </motion.div>
        <div className="text-xs opacity-80 mt-1" style={{ fontSize: '13px' }}>
          {date}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="absolute left-0 right-0" style={{ bottom: '80px' }}>
        <div className="grid grid-cols-4 gap-4 px-4">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onAppClick?.(app.id)}
              className="text-center cursor-pointer"
            >
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center text-[26px] mx-auto"
                style={{
                  background: app.bg,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                {app.icon}
              </div>
              <div className="text-[10px] text-white mt-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {app.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div
        className="absolute left-4 right-4 flex justify-around items-center px-2.5 py-2.5 rounded-2xl"
        style={{
          bottom: '36px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {dockApps.map((app, i) => (
          <div key={i} className="text-center">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px]" style={{ background: 'rgba(255,255,255,0.2)' }}>
              {app.icon}
            </div>
            <div className="text-[9px] text-white mt-0.5">{app.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}