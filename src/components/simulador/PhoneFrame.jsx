import React from "react";
import { motion } from "framer-motion";

const StatusBar = ({ theme = "light" }) => {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const color = theme === "dark" ? "#fff" : "#000";

  return (
    <div className="flex justify-between items-center px-5 py-2 text-xs font-semibold" style={{ color, height: '28px', marginTop: '28px' }}>
      <span>{time}</span>
      <div className="flex gap-1.5 items-center">
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
        <div className="relative flex items-center px-0.5" style={{ width: '22px', height: '11px', border: `1.5px solid ${color}`, borderRadius: '2px' }}>
          <div style={{ width: '75%', height: '100%', background: '#4CAF50', borderRadius: '1px' }}/>
          <div className="absolute" style={{ right: '-4px', width: '3px', height: '5px', background: color, borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  );
};

const AndroidNavBar = () => (
  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-8" style={{ height: '32px', background: 'rgba(245,245,245,0.95)', borderTop: '0.5px solid #e0e0e0' }}>
    <button className="text-xl text-gray-700 bg-transparent border-none cursor-pointer">‹</button>
    <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
    <div className="w-3 h-3 border-2 border-gray-600 rounded" style={{ boxShadow: '2px 2px 0 #555' }}></div>
  </div>
);

export default function PhoneFrame({ children, statusBarTheme = "light" }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative mx-auto"
      style={{
        width: '320px',
        height: '650px',
        background: '#1a1a1a',
        borderRadius: '45px',
        padding: '12px',
        boxShadow: '0 0 0 2px #333, 0 0 0 4px #555, 0 25px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)'
      }}
    >
      {/* Notch */}
      <div className="absolute flex items-center justify-center gap-1.5" style={{
        width: '120px', height: '28px',
        background: '#1a1a1a',
        borderRadius: '0 0 18px 18px',
        top: '12px', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full border border-gray-600"></div>
      </div>

      {/* Phone Screen */}
      <div className="w-full h-full bg-white rounded-[36px] relative" style={{ fontSize: '13px' }}>
        <StatusBar theme={statusBarTheme} />
        <div className="absolute left-0 right-0" style={{ top: '56px', bottom: '32px', overflow: 'visible' }}>
          {children}
        </div>
        <AndroidNavBar />
      </div>

      {/* Physical Buttons */}
      <div className="absolute w-1 h-9 bg-gray-700 rounded-l" style={{ left: '-4px', top: '120px' }}></div>
      <div className="absolute w-1 h-9 bg-gray-700 rounded-l" style={{ left: '-4px', top: '165px' }}></div>
      <div className="absolute w-1 h-14 bg-gray-700 rounded-r" style={{ right: '-4px', top: '140px' }}></div>
    </motion.div>
  );
}

export { StatusBar, AndroidNavBar };