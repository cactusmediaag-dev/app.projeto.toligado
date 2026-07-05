import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';
import AvatarUsuario from '@/components/shared/AvatarUsuario';
import PullToRefresh from '@/components/shared/PullToRefresh';
import LeitorCartilha from '@/components/biblioteca/LeitorCartilha';
import { CARTILHAS } from '@/components/biblioteca/cartilhas';
import { CheckCircle } from 'lucide-react';

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function lighten(hex, amount) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const nr = Math.round(r + (255 - r) * amount);
  const ng = Math.round(g + (255 - g) * amount);
  const nb = Math.round(b + (255 - b) * amount);
  return `#${nr.toString(16).padStart(2,'0')}${ng.toString(16).padStart(2,'0')}${nb.toString(16).padStart(2,'0')}`;
}

export default function Biblioteca() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cartilhaAtiva, setCartilhaAtiva] = useState(null);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [feedback, setFeedback] = useState('');

  const carregarDados = () => {
    const userId = localStorage.getItem('toligado_user_id');
    if (!userId) { navigate(createPageUrl('Entrar')); return; }
    setCarregandoUsuario(true);
    return base44.entities.Usuario.filter({ id: userId }).then(users => {
      if (users.length > 0) setUsuario(users[0]);
      setCarregandoUsuario(false);
    }).catch(() => setCarregandoUsuario(false));
  };

  useEffect(() => { carregarDados(); }, []);

  if (cartilhaAtiva && usuario) {
    return (
      <LeitorCartilha
        cartilha={cartilhaAtiva}
        usuario={usuario}
        onVoltar={() => setCartilhaAtiva(null)}
        onConcluir={() => {
          setCartilhaAtiva(null);
          carregarDados();
          setFeedback('Cartilha concluída!');
          setTimeout(() => setFeedback(''), 3000);
        }}
      />
    );
  }

  const cartilhasCompletas = usuario?.cartilhas_completas || [];

  return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

      {/* HEADER HERO */}
      <div style={{
        position: 'relative',
        padding: 'calc(env(safe-area-inset-top, 44px) + 20px) 20px 20px',
        background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
        borderRadius: '0 0 28px 28px',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Estrelinhas flutuando */}
        {!reducedMotion && [
          { left: '15%', top: '20%', delay: 0, size: 14 },
          { left: '80%', top: '30%', delay: 0.5, size: 10 },
          { left: '60%', top: '15%', delay: 1, size: 12 },
        ].map((s, i) => (
          <motion.div key={i} style={{ position: 'absolute', left: s.left, top: s.top, fontSize: s.size, color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          >✦</motion.div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>
              Biblioteca
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '4px 0 0', fontWeight: '600' }}>
              Leia, ouça e ganhe moedas
            </p>
          </div>
          <div onClick={() => navigate(createPageUrl('Perfil'))} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <AvatarUsuario usuario={usuario || {}} tamanho={40} />
          </div>
        </div>
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            margin: '12px 16px 0', padding: '14px 18px', borderRadius: '14px',
            background: '#27AE60', color: '#fff', fontSize: '15px', fontWeight: '700',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <CheckCircle size={20} color="#fff" /> {feedback}
        </motion.div>
      )}

      {/* GRADE DE CARTILHAS — render imediato dos dados estáticos */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PullToRefresh onRefresh={carregarDados}>
          <div style={{ padding: '16px', paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 100px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {CARTILHAS.map((cartilha, i) => {
                const concluida = cartilhasCompletas.includes(cartilha.id);
                const corClara = lighten(cartilha.cor, 0.35);
                return (
                  <motion.div
                    key={cartilha.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.08, duration: 0.4, ease: 'easeOut' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCartilhaAtiva(cartilha)}
                    style={{
                      background: '#fff', borderRadius: '18px', overflow: 'hidden',
                      border: '1px solid #EFE9F5', boxShadow: '0 2px 8px rgba(92,46,127,0.08)',
                      cursor: 'pointer', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    {/* Topo com gradiente da cor da cartilha */}
                    <div style={{
                      background: `linear-gradient(135deg, ${cartilha.cor}, ${corClara})`,
                      padding: '20px 16px 16px', display: 'flex', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <motion.div
                        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: '44px', lineHeight: 1 }}
                      >
                        {cartilha.emoji}
                      </motion.div>
                    </div>
                    {/* Corpo branco */}
                    <div style={{ padding: '12px 14px 14px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#333', margin: 0, lineHeight: 1.2 }}>
                        {cartilha.titulo}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: 1.3 }}>
                        {cartilha.descricao}
                      </p>
                      <div style={{ marginTop: '4px' }}>
                        {carregandoUsuario ? (
                          <div style={{
                            width: '80px', height: '24px', borderRadius: '10px',
                            background: 'linear-gradient(90deg, #EFE9F5, #F6F3FA, #EFE9F5)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmerBib 1.5s ease-in-out infinite',
                          }} />
                        ) : concluida ? (
                          <motion.span
                            initial={reducedMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            style={{
                              background: '#E8F8F0', color: '#27AE60', fontSize: '12px', fontWeight: '800',
                              padding: '4px 10px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px',
                            }}
                          >
                            <CheckCircle size={14} color="#27AE60" /> Concluída
                          </motion.span>
                        ) : (
                          <span style={{
                            background: '#FFF8E1', color: '#F3984B', fontSize: '12px', fontWeight: '800',
                            padding: '4px 10px', borderRadius: '10px',
                            boxShadow: '0 0 8px rgba(243,152,75,0.3)',
                          }}>
                            +20 🪙
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </PullToRefresh>
      </div>

      <BottomNav />
      <style>{`@keyframes shimmerBib { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}