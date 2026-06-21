import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import Confetti from "@/components/shared/Confetti";
import AudioSystem from "@/components/shared/AudioSystem";

export default function ValidacaoQuiz({
  pergunta,
  opcoes,
  respostaCorreta,
  onConcluir,
  moedas = 10
}) {
  const [selecionada, setSelecionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [acertou, setAcertou] = useState(false);

  const handleSelecionar = (idx) => {
    if (selecionada !== null) return;
    setSelecionada(idx);
    const certo = idx === respostaCorreta;
    setAcertou(certo);

    setTimeout(() => {
      setMostrarResultado(true);
      if (certo) {
        AudioSystem.speak(`Perfeito! Você ganhou ${moedas} moedas!`);
      } else {
        AudioSystem.speak('Quase! Tente de novo na próxima!');
      }
    }, 600);
  };

  const handleTentarNovamente = () => {
    setSelecionada(null);
    setMostrarResultado(false);
    setAcertou(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(92,46,127,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        {!mostrarResultado && (
          <motion.div
            key="quiz"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            style={{
              width: '100%',
              maxWidth: '420px',
              maxHeight: '90dvh',
              background: '#fff',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* HEADER */}
            <div style={{
              padding: '24px 24px 16px',
              background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
              color: '#fff',
              textAlign: 'center',
              flexShrink: 0
            }}>
              <div style={{ fontSize: '40px', lineHeight: 1, marginBottom: '8px' }}>❓</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Pergunta rápida!
              </h2>
              <p style={{ fontSize: '15px', margin: 0, opacity: 0.95, lineHeight: 1.4, fontWeight: '500' }}>
                {pergunta}
              </p>
            </div>

            {/* OPÇÕES */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {opcoes.map((opcao, idx) => {
                const isSelecionada = selecionada === idx;
                const isCorreta = idx === respostaCorreta;
                const mostrarFeedback = selecionada !== null;

                let bgCor = '#f5f0fa';
                let bordaCor = 'transparent';
                let textoCor = '#333';

                if (mostrarFeedback && isSelecionada) {
                  if (isCorreta) { bgCor = '#d4edda'; bordaCor = '#27ae60'; textoCor = '#1e7e34'; }
                  else { bgCor = '#f8d7da'; bordaCor = '#dc3545'; textoCor = '#a71d2a'; }
                } else if (mostrarFeedback && isCorreta) {
                  bgCor = '#d4edda'; bordaCor = '#27ae60'; textoCor = '#1e7e34';
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelecionar(idx)}
                    disabled={selecionada !== null}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 18px',
                      borderRadius: '16px',
                      background: bgCor,
                      border: `2.5px solid ${bordaCor}`,
                      color: textoCor,
                      fontSize: '16px',
                      fontWeight: '700',
                      textAlign: 'left',
                      cursor: selecionada !== null ? 'default' : 'pointer',
                      transition: 'all 0.3s ease',
                      lineHeight: 1.4,
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: '54px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {opcao}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {mostrarResultado && acertou && (
          <motion.div
            key="acertou"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: '#fff',
              borderRadius: '28px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
              position: 'relative'
            }}
          >
            <Confetti />

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                width: '90px', height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #27AE60, #2ecc71)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(39,174,96,0.5)'
              }}
            >
              <CheckCircle2 size={56} color="#fff" strokeWidth={2.5} />
            </motion.div>

            <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#27ae60', margin: '0 0 8px' }}>
              Perfeito!
            </h2>
            <p style={{ fontSize: '15px', color: '#666', margin: '0 0 16px', lineHeight: 1.5 }}>
              Você respondeu corretamente!
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{
                background: 'linear-gradient(135deg, #FFF3CD, #FFE69C)',
                borderRadius: '16px',
                padding: '14px',
                marginBottom: '20px',
                border: '2px solid #F3984B'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Trophy size={32} color="#F3984B" />
                <div>
                  <p style={{ fontSize: '13px', color: '#856404', margin: 0, fontWeight: '700' }}>Você ganhou</p>
                  <p style={{ fontSize: '24px', color: '#5C2E7F', margin: 0, fontWeight: '900' }}>+{moedas} moedas 🪙</p>
                </div>
              </div>
            </motion.div>

            <button
              onClick={onConcluir}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #F3984B, #e67e22)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(243,152,75,0.5)',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              Continuar →
            </button>
          </motion.div>
        )}

        {mostrarResultado && !acertou && (
          <motion.div
            key="errou"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: '#fff',
              borderRadius: '28px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{
              width: '90px', height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F3984B, #e67e22)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(243,152,75,0.5)'
            }}>
              <XCircle size={56} color="#fff" strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#F3984B', margin: '0 0 8px' }}>
              Quase lá!
            </h2>
            <p style={{ fontSize: '15px', color: '#666', margin: '0 0 24px', lineHeight: 1.5 }}>
              Não foi dessa vez, mas você consegue! Tente de novo 💪
            </p>

            <button
              onClick={handleTentarNovamente}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(92,46,127,0.5)',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              🔄 Tentar novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}