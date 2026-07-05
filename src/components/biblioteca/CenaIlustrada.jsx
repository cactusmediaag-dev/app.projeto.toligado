import { motion } from 'framer-motion';

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CENAS = {
  // 1. Mensagem suspeita — balão vermelho com "?" pulsando, "!" laranja orbita
  mensagem_suspeita: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Celular */}
      <rect x="55" y="35" width="90" height="130" rx="18" fill="#3D1D5A" />
      <rect x="65" y="50" width="70" height="100" rx="8" fill="#F5F0FA" />
      <circle cx="100" cy="155" r="5" fill="#9B59B6" />
      {/* Balão de mensagem pulsando */}
      <motion.g animate={reducedMotion ? {} : { scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '100px 95px' }}>
        <rect x="70" y="70" width="60" height="50" rx="12" fill="#C0392B" />
        <path d="M85 120 L80 135 L95 120 Z" fill="#C0392B" />
        <text x="100" y="104" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900" fontFamily="sans-serif">?</text>
      </motion.g>
      {/* "!" laranja orbitando */}
      <motion.g animate={reducedMotion ? {} : { rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }}>
        <motion.g animate={reducedMotion ? {} : { scale: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '155px 50px' }}>
          <circle cx="155" cy="50" r="12" fill="#F3984B" />
          <text x="155" y="56" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="sans-serif">!</text>
        </motion.g>
      </motion.g>
    </svg>
  ),

  // 2. Relógio com ponteiro girando + tracinhos de pressa
  relogio_pressa: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Relógio */}
      <circle cx="85" cy="100" r="55" fill="#fff" stroke="#5C2E7F" strokeWidth="4" />
      <circle cx="85" cy="100" r="6" fill="#5C2E7F" />
      {/* Ponteiro girando */}
      <motion.g animate={reducedMotion ? {} : { rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '85px 100px' }}>
        <rect x="82" y="55" width="6" height="45" rx="3" fill="#5C2E7F" />
      </motion.g>
      {/* Tracinhos de movimento piscando */}
      {[0, 1, 2].map(i => (
        <motion.rect key={i} x="155" y={85 + i * 12} width="20" height="6" rx="3" fill="#F3984B"
          animate={reducedMotion ? {} : { opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }} />
      ))}
    </svg>
  ),

  // 3. Prêmio falso — caixa presente, tampa balança, "!" sobe/desce
  premio_falso: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* "!" vermelho atrás */}
      <motion.g animate={reducedMotion ? {} : { y: [0, -12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="100" cy="50" r="14" fill="#C0392B" />
        <text x="100" y="56" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900" fontFamily="sans-serif">!</text>
      </motion.g>
      {/* Caixa */}
      <rect x="60" y="95" width="80" height="60" rx="8" fill="#FFD700" />
      {/* Tampa balançando */}
      <motion.g animate={reducedMotion ? {} : { rotate: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '100px 85px' }}>
        <rect x="55" y="78" width="90" height="18" rx="6" fill="#F39C12" />
        <rect x="95" y="78" width="10" height="60" fill="#C0392B" />
        <rect x="55" y="78" width="10" height="60" fill="none" />
      </motion.g>
      {/* Fita vertical */}
      <rect x="95" y="95" width="10" height="60" fill="#C0392B" />
    </svg>
  ),

  // 4. Golpe do parente — dois celulares, ondas de ligação verdes
  golpe_parente: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Celular esquerdo com "PIX?" */}
      <rect x="20" y="55" width="55" height="90" rx="12" fill="#3D1D5A" />
      <rect x="27" y="65" width="41" height="60" rx="6" fill="#F5F0FA" />
      <rect x="32" y="78" width="31" height="18" rx="5" fill="#ECF0F1" />
      <text x="47" y="91" textAnchor="middle" fill="#5C2E7F" fontSize="10" fontWeight="900" fontFamily="sans-serif">PIX?</text>
      {/* Celular direito */}
      <rect x="125" y="55" width="55" height="90" rx="12" fill="#3D1D5A" />
      <rect x="132" y="65" width="41" height="60" rx="6" fill="#F5F0FA" />
      <circle cx="152" cy="95" r="8" fill="#2ECC71" />
      {/* Ondas de ligação aparecendo em sequência */}
      {[0, 1, 2].map(i => (
        <motion.path
          key={i}
          d={`M ${100 + i * 8} 95 Q ${115 + i * 8} 80, ${130 + i * 8} 95 Q ${115 + i * 8} 110, ${100 + i * 8} 95`}
          fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round"
          animate={reducedMotion ? {} : { opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  ),

  // 5. Banco com escudo e cadeado
  banco_escudo: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Fachada do banco */}
      <rect x="45" y="70" width="110" height="65" rx="4" fill="#D7BDE2" />
      <path d="M40 70 L100 35 L160 70 Z" fill="#D7BDE2" />
      <rect x="55" y="85" width="10" height="50" rx="2" fill="#B39DDB" />
      <rect x="75" y="85" width="10" height="50" rx="2" fill="#B39DDB" />
      <rect x="115" y="85" width="10" height="50" rx="2" fill="#B39DDB" />
      <rect x="135" y="85" width="10" height="50" rx="2" fill="#B39DDB" />
      {/* Escudo verde pulsando */}
      <motion.g animate={reducedMotion ? {} : { scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '100px 115px' }}>
        <path d="M100 80 L130 90 L130 115 Q130 140 100 150 Q70 140 70 115 L70 90 Z" fill="#2ECC71" />
        <rect x="90" y="105" width="20" height="18" rx="3" fill="#fff" />
        <path d="M93 105 L93 100 Q93 93 100 93 Q107 93 107 100 L107 105" fill="none" stroke="#fff" strokeWidth="3" />
      </motion.g>
      {/* Sparkles */}
      {[
        { x: 55, y: 55, delay: 0 },
        { x: 150, y: 65, delay: 0.8 },
      ].map((s, i) => (
        <motion.text key={i} x={s.x} y={s.y} fill="#FFD700" fontSize="14" textAnchor="middle"
          animate={reducedMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}>✦</motion.text>
      ))}
    </svg>
  ),

  // 6. Link perigoso — corrente quebrada com alerta balançando
  link_perigoso: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Elo de cima */}
      <ellipse cx="70" cy="85" rx="25" ry="15" fill="none" stroke="#95A5A6" strokeWidth="5" />
      <ellipse cx="70" cy="85" rx="25" ry="15" fill="none" stroke="#7F8C8D" strokeWidth="5" strokeDasharray="3 3" opacity="0.5" />
      {/* Elo de baixo quebrado — deslocado */}
      <ellipse cx="85" cy="130" rx="25" ry="15" fill="none" stroke="#95A5A6" strokeWidth="5" transform="rotate(20 85 130)" />
      <ellipse cx="130" cy="120" rx="25" ry="15" fill="none" stroke="#95A5A6" strokeWidth="5" transform="rotate(-15 130 120)" />
      {/* Triângulo de alerta balançando */}
      <motion.g animate={reducedMotion ? {} : { rotate: [-8, 8, -8] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '150px 60px' }}>
        <path d="M150 40 L170 75 L130 75 Z" fill="#F3984B" stroke="#E67E22" strokeWidth="3" strokeLinejoin="round" />
        <text x="150" y="70" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900" fontFamily="sans-serif">!</text>
      </motion.g>
    </svg>
  ),

  // 7. Bloquear golpista — mão PARE, X vira check em ciclo
  bloquear_golpista: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Círculo branco de fundo */}
      <circle cx="100" cy="100" r="60" fill="#fff" />
      {/* Mão (sinal de PARE) — palma roxa */}
      <g>
        <rect x="75" y="95" width="50" height="40" rx="8" fill="#5C2E7F" />
        <rect x="78" y="70" width="10" height="30" rx="4" fill="#5C2E7F" />
        <rect x="90" y="65" width="10" height="35" rx="4" fill="#5C2E7F" />
        <rect x="102" y="65" width="10" height="35" rx="4" fill="#5C2E7F" />
        <rect x="114" y="70" width="10" height="30" rx="4" fill="#5C2E7F" />
      </g>
      {/* X vermelho que vira check verde */}
      <motion.g animate={reducedMotion ? {} : { opacity: [1, 1, 0, 0, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1], ease: 'easeInOut' }}>
        <circle cx="100" cy="125" r="16" fill="#C0392B" />
        <path d="M93 118 L107 132 M107 118 L93 132" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
      <motion.g animate={reducedMotion ? {} : { opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1], ease: 'easeInOut' }}>
        <circle cx="100" cy="125" r="16" fill="#2ECC71" />
        <path d="M93 125 L99 131 L108 120" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  ),

  // 8. Você é mais esperto — bíceps + estrelas piscando
  voce_esperto: ({ cor }) => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill={cor} opacity="0.2" />
      {/* Braço flexionado (bíceps) */}
      <path d="M60 140 Q50 100 60 70 Q65 55 80 55 L85 80 Q80 90 82 100 Q90 95 100 100 Q110 110 105 130 Q100 145 80 145 Z" fill="#F3984B" />
      {/* Detalhe do bíceps */}
      <path d="M75 90 Q80 80 88 85" fill="none" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" />
      {/* Estrelas douradas piscando */}
      {[
        { x: 130, y: 60, delay: 0 },
        { x: 150, y: 100, delay: 0.5 },
        { x: 125, y: 140, delay: 1 },
      ].map((s, i) => (
        <motion.g key={i}
          animate={reducedMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}>
          <path d={`M${s.x} ${s.y - 10} L${s.x + 3} ${s.y - 3} L${s.x + 10} ${s.y - 3} L${s.x + 4} ${s.y + 2} L${s.x + 7} ${s.y + 9} L${s.x} ${s.y + 4} L${s.x - 7} ${s.y + 9} L${s.x - 4} ${s.y + 2} L${s.x - 10} ${s.y - 3} L${s.x - 3} ${s.y - 3} Z`} fill="#FFD700" />
        </motion.g>
      ))}
    </svg>
  ),
};

export default function CenaIlustrada({ cena, cor, tamanho = 180, fallbackEmoji }) {
  const CenaComponent = CENAS[cena];
  if (!CenaComponent) {
    // Fallback: renderiza o emoji da página (comportamento anterior)
    return (
      <div style={{ width: tamanho, height: tamanho, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: Math.round(tamanho * 0.53) }}>
        {fallbackEmoji}
      </div>
    );
  }
  return (
    <div style={{ width: tamanho, height: tamanho }}>
      <CenaComponent cor={cor} />
    </div>
  );
}