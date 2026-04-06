import { useEffect, useState } from 'react';

// ============================================
// SISTEMA DE SOM — Web Audio API
// ============================================
export const Sons = {
  ctx: null,

  getCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.ctx;
  },

  tocarNota(freq, duracao, tipo = 'sine', volume = 0.3) {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = tipo;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duracao);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duracao);
    } catch(e) {}
  },

  acerto() {
    this.tocarNota(523, 0.1);
    setTimeout(() => this.tocarNota(659, 0.1), 100);
    setTimeout(() => this.tocarNota(784, 0.2), 200);
    setTimeout(() => this.tocarNota(1047, 0.3), 300);
    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
  },

  erro() {
    this.tocarNota(200, 0.15, 'sawtooth', 0.2);
    setTimeout(() => this.tocarNota(150, 0.2, 'sawtooth', 0.15), 150);
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  },

  moeda() {
    this.tocarNota(988, 0.05);
    setTimeout(() => this.tocarNota(1319, 0.15), 60);
    if (navigator.vibrate) navigator.vibrate(20);
  },

  vitoria() {
    const notas = [523, 659, 784, 1047, 784, 1047, 1319];
    const tempos = [0, 100, 200, 300, 450, 550, 650];
    notas.forEach((n, i) => {
      setTimeout(() => this.tocarNota(n, 0.25), tempos[i]);
    });
    if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
  },

  avancar() {
    this.tocarNota(440, 0.08);
    setTimeout(() => this.tocarNota(554, 0.12), 80);
  },

  desbloquear() {
    this.tocarNota(330, 0.1);
    setTimeout(() => this.tocarNota(440, 0.1), 100);
    setTimeout(() => this.tocarNota(554, 0.1), 200);
    setTimeout(() => this.tocarNota(659, 0.25), 300);
  }
};

// ============================================
// ANIMAÇÃO DE MOEDAS VOANDO — estilo Duolingo
// ============================================
export const MoedasAnimadas = ({ quantidade = 10, onFim }) => {
  const [moedas, setMoedas] = useState([]);
  const [mostrarTotal, setMostrarTotal] = useState(false);

  useEffect(() => {
    const novas = Array.from({ length: Math.min(quantidade, 8) }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      delay: i * 80,
      rotacao: -20 + Math.random() * 40
    }));
    setMoedas(novas);

    novas.forEach((_, i) => {
      setTimeout(() => Sons.moeda(), i * 80);
    });

    setTimeout(() => setMostrarTotal(true), 600);
    setTimeout(() => { onFim && onFim(); }, 2000);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {moedas.map(m => (
        <div key={m.id} style={{
          position: 'absolute',
          left: `${m.x}%`,
          top: '60%',
          fontSize: '24px',
          animation: `moedasVoar 1.2s ease ${m.delay}ms both`,
          transform: `rotate(${m.rotacao}deg)`
        }}>
          🪙
        </div>
      ))}

      {mostrarTotal && (
        <div style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #F3984B, #e67e22)',
          borderRadius: '20px',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 8px 24px rgba(243,152,75,0.5)',
          animation: 'popIn 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)'
        }}>
          <span style={{ fontSize: '28px' }}>🪙</span>
          <span style={{ color: '#fff', fontSize: '28px', fontWeight: '900' }}>+{quantidade}</span>
        </div>
      )}
    </div>
  );
};

// ============================================
// BARRA DE PROGRESSO DA LIÇÃO — estilo Duolingo
// ============================================
export const ProgressoLicao = ({ passoAtual, totalPassos, modulo = 1 }) => {
  const progresso = (passoAtual / totalPassos) * 100;

  const cores = {
    1: '#5C2E7F', 2: '#1A8A5A', 3: '#2471A3',
    4: '#8E44AD', 5: '#E74C3C', 6: '#2E86C1',
    7: '#27AE60', 8: '#922B21'
  };
  const cor = cores[modulo] || '#5C2E7F';

  return (
    <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ flex: 1, height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progresso}%`,
          background: `linear-gradient(90deg, ${cor}, ${cor}dd)`,
          borderRadius: '6px',
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${cor}88`
        }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '800', color: '#666', minWidth: '48px', textAlign: 'right' }}>
        {passoAtual}/{totalPassos}
      </span>
    </div>
  );
};

// ============================================
// FEEDBACK DE ACERTO — overlay estilo Duolingo
// ============================================
export const FeedbackAcerto = ({ mensagem, onContinuar }) => {
  useEffect(() => {
    Sons.acerto();
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(135deg, #27AE60, #2ECC71)',
      borderRadius: '24px 24px 0 0',
      padding: '20px 24px calc(env(safe-area-inset-bottom,20px) + 20px)',
      zIndex: 1000,
      animation: 'slideUpFeedback 0.3s ease',
      boxShadow: '0 -4px 24px rgba(39,174,96,0.4)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          width: '52px', height: '52px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px'
        }}>✅</div>
        <div>
          <p style={{ color: '#fff', fontSize: '20px', fontWeight: '900', margin: '0 0 2px' }}>Muito bem!</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0 }}>
            {mensagem || 'Você acertou! Continue assim! 🌟'}
          </p>
        </div>
      </div>
      <button onClick={onContinuar} style={{
        width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
        background: '#fff', color: '#27AE60', fontSize: '17px',
        fontWeight: '900', cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        Continuar →
      </button>
    </div>
  );
};

// ============================================
// FEEDBACK DE ERRO — overlay estilo Duolingo
// ============================================
export const FeedbackErro = ({ dica, onTentar }) => {
  useEffect(() => {
    Sons.erro();
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(135deg, #E74C3C, #C0392B)',
      borderRadius: '24px 24px 0 0',
      padding: '20px 24px calc(env(safe-area-inset-bottom,20px) + 20px)',
      zIndex: 1000,
      animation: 'slideUpFeedback 0.3s ease',
      boxShadow: '0 -4px 24px rgba(231,76,60,0.4)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          width: '52px', height: '52px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px'
        }}>❌</div>
        <div>
          <p style={{ color: '#fff', fontSize: '20px', fontWeight: '900', margin: '0 0 2px' }}>Quase lá!</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0, lineHeight: 1.4 }}>
            {dica || 'Tente novamente! Você consegue! 💪'}
          </p>
        </div>
      </div>
      <button onClick={onTentar} style={{
        width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
        background: '#fff', color: '#E74C3C', fontSize: '17px',
        fontWeight: '900', cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        Tentar novamente 🔄
      </button>
    </div>
  );
};

// ============================================
// STREAK / SEQUÊNCIA — estilo Duolingo
// ============================================
export const StreakBadge = ({ quantidade }) => {
  if (!quantidade || quantidade < 2) return null;

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: 'linear-gradient(135deg, #F3984B, #e67e22)',
      borderRadius: '12px', padding: '4px 10px',
      animation: 'popIn 0.3s ease'
    }}>
      <span style={{ fontSize: '16px' }}>🔥</span>
      <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>
        {quantidade}x seguidos!
      </span>
    </div>
  );
};