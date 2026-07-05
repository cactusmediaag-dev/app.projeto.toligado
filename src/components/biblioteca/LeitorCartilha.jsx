import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2 } from 'lucide-react';
import VozSistema from '@/components/shared/AudioSystem';
import ValidacaoQuiz from '@/components/simulador/ValidacaoQuiz';
import Confetti from '@/components/shared/Confetti';
import CenaIlustrada from '@/components/biblioteca/CenaIlustrada';
import { base44 } from '@/api/base44Client';

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

function Equalizador() {
  if (reducedMotion) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '20px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: '3px', background: '#fff', borderRadius: '2px',
          animation: `eqBar${i} ${0.4 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
        }} />
      ))}
      <style>{`
        @keyframes eqBar0 { 0% { height: 4px; } 100% { height: 18px; } }
        @keyframes eqBar1 { 0% { height: 8px; } 100% { height: 16px; } }
        @keyframes eqBar2 { 0% { height: 5px; } 100% { height: 14px; } }
      `}</style>
    </div>
  );
}

export default function LeitorCartilha({ cartilha, usuario, onConcluir, onVoltar }) {
  const [tela, setTela] = useState('capa');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [concluida, setConcluida] = useState(false);
  const [falando, setFalando] = useState(false);
  const [moedasAnimadas, setMoedasAnimadas] = useState(0);
  const totalPaginas = cartilha.paginas.length;
  const pagina = cartilha.paginas[paginaAtual];
  const jaConcluida = (usuario?.cartilhas_completas || []).includes(cartilha.id);
  const corClara = lighten(cartilha.cor, 0.35);

  // Narração da capa
  useEffect(() => {
    if (tela !== 'capa') return;
    setFalando(true);
    const t = setTimeout(async () => {
      await VozSistema.falar(`${cartilha.titulo}. ${cartilha.descricao}`, true);
      setFalando(false);
    }, 200);
    return () => { clearTimeout(t); VozSistema.parar(); setFalando(false); };
  }, [tela]);

  // Narração das páginas
  useEffect(() => {
    if (tela !== 'paginas') return;
    setFalando(true);
    const t = setTimeout(async () => {
      await VozSistema.falar(pagina.audio, true);
      setFalando(false);
    }, 200);
    return () => { clearTimeout(t); VozSistema.parar(); setFalando(false); };
  }, [paginaAtual, tela]);

  // Cleanup total ao desmontar
  useEffect(() => () => VozSistema.parar(), []);

  // Contador animado de moedas na celebração
  useEffect(() => {
    if (tela !== 'celebracao') return;
    setMoedasAnimadas(0);
    let v = 0;
    const intervalo = setInterval(() => {
      v += 1;
      setMoedasAnimadas(v);
      if (v >= 20) clearInterval(intervalo);
    }, 40);
    return () => clearInterval(intervalo);
  }, [tela]);

  const comecar = () => { setTela('paginas'); };

  const irProxima = () => {
    if (paginaAtual < totalPaginas - 1) {
      setDirecao(1);
      setPaginaAtual(paginaAtual + 1);
    } else {
      setMostrarQuiz(true);
    }
  };

  const irAnterior = () => {
    if (paginaAtual > 0) {
      setDirecao(-1);
      setPaginaAtual(paginaAtual - 1);
    } else {
      VozSistema.parar();
      setTela('capa');
    }
  };

  const repetirAudio = () => {
    setFalando(true);
    VozSistema.falarForcado(pagina.audio).then(() => setFalando(false));
  };

  const repetirCapa = () => {
    setFalando(true);
    VozSistema.falarForcado(`${cartilha.titulo}. ${cartilha.descricao}`).then(() => setFalando(false));
  };

  const handleConcluirQuiz = async () => {
    setMostrarQuiz(false);

    if (jaConcluida || concluida) {
      setTela('celebracao');
      return;
    }

    try {
      const novasMoedas = (usuario.moedas || 0) + 20;
      const novoXp = (usuario.xp_total || 0) + 25;
      const cartilhasAtuais = usuario.cartilhas_completas || [];

      await base44.entities.Usuario.update(usuario.id, {
        moedas: novasMoedas,
        xp_total: novoXp,
        cartilhas_completas: [...cartilhasAtuais, cartilha.id]
      });

      setConcluida(true);
    } catch (e) {
      console.error('Erro ao salvar conclusão:', e);
    }

    setTela('celebracao');
  };

  // === QUIZ ===
  if (mostrarQuiz) {
    return (
      <ValidacaoQuiz
        pergunta={cartilha.quiz.pergunta}
        opcoes={cartilha.quiz.opcoes}
        respostaCorreta={cartilha.quiz.respostaCorreta}
        onConcluir={handleConcluirQuiz}
        moedas={20}
      />
    );
  }

  // === CELEBRAÇÃO ===
  if (tela === 'celebracao') {
    return (
      <div style={{ minHeight: '100dvh', background: `linear-gradient(135deg, ${cartilha.cor}, ${corClara})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <Confetti active={true} />
        <motion.div
          initial={reducedMotion ? false : { scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '56px', marginBottom: '20px',
          }}
        >
          {cartilha.emoji}
        </motion.div>
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 24px' }}
        >
          Cartilha concluída!
        </motion.h2>
        <motion.div
          initial={reducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: '16px', padding: '16px 28px',
            marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <span style={{ fontSize: '32px' }}>🪙</span>
          <span style={{ fontSize: '32px', fontWeight: '900', color: '#FFD700' }}>+{moedasAnimadas}</span>
        </motion.div>
        <button
          onClick={() => onConcluir(true)}
          style={{
            padding: '18px 36px', borderRadius: '16px', border: 'none', background: '#fff',
            color: cartilha.cor, fontSize: '17px', fontWeight: '800', cursor: 'pointer', minHeight: '56px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          Voltar à Biblioteca
        </button>
      </div>
    );
  }

  // === CAPA ===
  if (tela === 'capa') {
    return (
      <div style={{ minHeight: '100dvh', background: `linear-gradient(135deg, ${cartilha.cor}, ${corClara})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <button
          onClick={() => { VozSistema.parar(); onVoltar(); }}
          style={{
            position: 'absolute', top: 'calc(env(safe-area-inset-top, 44px) + 12px)', left: '16px',
            width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <ArrowLeft size={22} color="#fff" strokeWidth={2.5} />
        </button>

        <button
          onClick={repetirCapa}
          style={{
            position: 'absolute', top: 'calc(env(safe-area-inset-top, 44px) + 12px)', right: '16px',
            minWidth: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', padding: '0 10px',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Volume2 size={20} color="#fff" strokeWidth={2.5} />
          {falando && <Equalizador />}
        </button>

        {/* Emoji grande com estrelinhas orbitando */}
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '96px',
            }}
          >
            {cartilha.emoji}
          </motion.div>
          {!reducedMotion && [
            { angle: 0, delay: 0, size: 16 },
            { angle: 120, delay: 1, size: 12 },
            { angle: 240, delay: 2, size: 14 },
          ].map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const radius = 100;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <motion.div
                key={i}
                animate={{ y: [y, y - 6, y], x: [x, x + 3, x], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-8px', marginTop: '-8px', fontSize: s.size, color: 'rgba(255,255,255,0.8)' }}
              >✦</motion.div>
            );
          })}
        </div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}
        >
          {cartilha.titulo}
        </motion.h1>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', margin: '0 0 36px', fontWeight: '600', maxWidth: '320px' }}
        >
          {cartilha.descricao}
        </motion.p>

        <motion.button
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileTap={{ scale: 0.96 }}
          onClick={comecar}
          style={{
            padding: '18px 48px', borderRadius: '16px', border: 'none', background: '#fff',
            color: cartilha.cor, fontSize: '18px', fontWeight: '900', cursor: 'pointer', minHeight: '56px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span style={{ animation: reducedMotion ? 'none' : 'pulseBtn 2s ease-in-out infinite', display: 'inline-block' }}>
            Começar →
          </span>
        </motion.button>
        <style>{`@keyframes pulseBtn { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }`}</style>
      </div>
    );
  }

  // === PÁGINAS ===
  return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER com faixa gradiente da cor da cartilha */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 16px 12px',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px',
        background: `linear-gradient(135deg, ${cartilha.cor}, ${corClara})`,
      }}>
        <button
          onClick={() => { VozSistema.parar(); onVoltar(); }}
          style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <ArrowLeft size={22} color="#fff" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Página {paginaAtual + 1} de {totalPaginas}
          </p>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {cartilha.titulo}
          </h2>
        </div>
        <button
          onClick={repetirAudio}
          style={{
            minWidth: '44px', height: '44px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', padding: '0 10px', flexShrink: 0,
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Volume2 size={20} color="#fff" strokeWidth={2.5} />
          {falando && <Equalizador />}
        </button>
      </div>

      {/* Barra de progresso segmentada (8 segmentos com spring) */}
      <div style={{ padding: '10px 16px', background: '#fff', flexShrink: 0, display: 'flex', gap: '4px' }}>
        {cartilha.paginas.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#EFE9F5', overflow: 'hidden' }}>
            <motion.div
              initial={false}
              animate={{ scaleX: i <= paginaAtual ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ height: '100%', background: cartilha.cor, borderRadius: '3px', transformOrigin: 'left', width: '100%' }}
            />
          </div>
        ))}
      </div>

      {/* Conteúdo com AnimatePresence — slide de página */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 20px', overflowY: 'auto', position: 'relative',
      }}>
        <AnimatePresence mode="wait" custom={direcao}>
          <motion.div
            key={paginaAtual}
            custom={direcao}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direcao * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direcao * -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
            }}
          >
            {/* Ilustração flutuante com sparkles */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <motion.div
                initial={reducedMotion ? false : { scale: 0.6 }}
                animate={reducedMotion ? {} : { scale: 1, y: [0, -6, 0] }}
                transition={{ scale: { type: 'spring', stiffness: 200, damping: 15 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
                style={{
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: pagina.corFundo, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {pagina.cena
                  ? <CenaIlustrada cena={pagina.cena} cor={cartilha.cor} tamanho={180} fallbackEmoji={pagina.ilustracao} />
                  : <span style={{ fontSize: '64px' }}>{pagina.ilustracao}</span>}
              </motion.div>
              {!reducedMotion && [
                { top: '10%', left: '-10%', delay: 0 },
                { top: '70%', right: '-10%', delay: 0.8 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                  style={{ position: 'absolute', top: s.top, left: s.left, right: s.right, fontSize: 14, color: cartilha.cor, pointerEvents: 'none' }}
                >✦</motion.div>
              ))}
            </div>

            <motion.h3
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{ fontSize: '22px', fontWeight: '900', color: '#333', margin: '0 0 16px', lineHeight: 1.3 }}
            >
              {pagina.titulo}
            </motion.h3>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              style={{ fontSize: '20px', color: '#333', lineHeight: 1.6, margin: 0, fontWeight: '500' }}
            >
              {pagina.texto}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação */}
      <div style={{
        padding: '12px 16px calc(env(safe-area-inset-bottom, 20px) + 12px)',
        background: '#fff', borderTop: '1px solid #EFE9F5', display: 'flex', gap: '12px', flexShrink: 0,
      }}>
        <button
          onClick={irAnterior}
          style={{
            flex: 1, padding: '18px', borderRadius: '16px',
            border: '1px solid #EFE9F5', background: '#fff',
            color: '#5C2E7F', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
            minHeight: '56px',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={irProxima}
          style={{
            flex: 2, padding: '18px', borderRadius: '16px', border: 'none', background: cartilha.cor,
            color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', minHeight: '56px',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
            boxShadow: `0 4px 16px ${cartilha.cor}40`,
          }}
        >
          {paginaAtual === totalPaginas - 1 ? '✋ Responder pergunta' : 'Próxima →'}
        </button>
      </div>
    </div>
  );
}