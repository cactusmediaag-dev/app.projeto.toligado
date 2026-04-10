import { useState, useEffect } from 'react';
import BotaoVoltar from '../components/shared/BotaoVoltar';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import VozSistema from '../components/shared/AudioSystem';
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from '../components/shared/GameFeedback';

export default function Modulo1Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [telaAcesa, setTelaAcesa] = useState(false);
  const [volumeAtivo, setVolumeAtivo] = useState(false);
  const [bateriaVisto, setBateriaVisto] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [mostrarMoedas, setMostrarMoedas] = useState(false);
  const [feedbackAcerto, setFeedbackAcerto] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const totalPassos = 3;

  const instrucoes = {
    1: 'Olá! Vou te mostrar os botões do celular. Toque no botão de LIGAR a tela! 💡',
    2: 'Ótimo! Agora toque no botão de VOLUME para aumentar o som! 🔊',
    3: 'Muito bem! Agora toque no ícone da BATERIA para ver a carga! 🔋',
  };

  useEffect(() => {
    setMostrarDica(false);
    const t = setTimeout(() => setMostrarDica(true), 5000);
    return () => clearTimeout(t);
  }, [passo]);

  useEffect(() => {
    const texto = instrucoes[passo];
    if (!texto) return;
    const t = setTimeout(() => VozSistema.falar(texto), 600);
    return () => clearTimeout(t);
  }, [passo]);

  const falar = (texto) => {
    VozSistema.falarForcado(texto);
  };

  const avancarPasso = () => {
    Sons.avancar();
    if (passo < totalPassos) {
      setPasso(p => p + 1);
    } else {
      setMensagemFeedback('Você conhece os botões do celular! 🎉');
      setFeedbackAcerto(true);
    }
  };

  const handleContinuar = () => {
    setFeedbackAcerto(false);
    setMostrarMoedas(true);
    Sons.avancar();
  };

  const handleMoedasFim = () => {
    setMostrarMoedas(false);
    navigate(createPageUrl('Modulo1Licao2'));
  };

  const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #ede8f5 0%, #d8cff0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>

      {/* HEADER */}
      <div style={{
        width: '100%',
        padding: 'calc(env(safe-area-inset-top,44px) + 4px) 16px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'transparent',
        flexShrink: 0
      }}>
        <BotaoVoltar destino="Modulos" cor="#5C2E7F" />

        <div style={{ flex: 1 }}>
          <div style={{
            height: '8px', background: 'rgba(92,46,127,0.15)',
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(passo / totalPassos) * 100}%`,
              background: 'linear-gradient(90deg, #5C2E7F, #9B59B6)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }}/>
          </div>
          <p style={{
            textAlign: 'center', fontSize: '13px',
            color: '#5C2E7F', fontWeight: '700',
            margin: '4px 0 0'
          }}>
            Passo {passo} de {totalPassos}
          </p>
        </div>

        <button onClick={() => VozSistema.falarForcado(instrucoes[passo])} style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#5C2E7F', border: 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer',
          fontSize: '20px', flexShrink: 0
        }}>🔊</button>
      </div>

      {/* MOCKUP DO CELULAR */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12px',
        paddingBottom: '140px',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', width: 'min(300px, 85vw)', flexShrink: 0 }}>

          {/* Moldura */}
          <div style={{
            width: '100%',
            background: '#1a1a1a',
            borderRadius: '40px',
            padding: '10px',
            boxShadow: '0 0 0 2px #333, 0 0 0 4px #555, 0 20px 50px rgba(0,0,0,0.4)',
            position: 'relative'
          }}>

            {/* BOTÃO POWER — lateral direita */}
            <div
              onClick={() => {
                if (passo === 1) {
                  setTelaAcesa(true);
                  setMostrarDica(false);
                  Sons.avancar();
                  if (navigator.vibrate) navigator.vibrate(50);
                  setTimeout(() => avancarPasso(), 800);
                }
              }}
              style={{
                position: 'absolute',
                right: '-10px', top: '32%',
                width: '10px', height: '52px',
                background: passo === 1 ? (mostrarDica ? '#F3984B' : '#666') : '#444',
                borderRadius: '0 5px 5px 0',
                cursor: passo === 1 ? 'pointer' : 'default',
                zIndex: 20,
                transition: 'background 0.3s ease',
                boxShadow: mostrarDica && passo === 1 ? '4px 0 16px rgba(243,152,75,0.9)' : 'none',
                animation: mostrarDica && passo === 1 ? 'buttonPulse 1s ease infinite' : 'none'
              }}
            />

            {/* BOTÃO VOLUME + — lateral esquerda */}
            <div
              onClick={() => {
                if (passo === 2) {
                  setVolumeAtivo(true);
                  setMostrarDica(false);
                  Sons.avancar();
                  if (navigator.vibrate) navigator.vibrate(50);
                  setTimeout(() => avancarPasso(), 800);
                }
              }}
              style={{
                position: 'absolute',
                left: '-10px', top: '26%',
                width: '10px', height: '40px',
                background: passo === 2 ? (mostrarDica ? '#F3984B' : '#666') : '#444',
                borderRadius: '5px 0 0 5px',
                cursor: passo === 2 ? 'pointer' : 'default',
                zIndex: 20,
                transition: 'background 0.3s ease',
                boxShadow: mostrarDica && passo === 2 ? '-4px 0 16px rgba(243,152,75,0.9)' : 'none',
                animation: mostrarDica && passo === 2 ? 'buttonPulse 1s ease infinite' : 'none'
              }}
            />

            {/* BOTÃO VOLUME - */}
            <div style={{
              position: 'absolute',
              left: '-10px', top: '36%',
              width: '10px', height: '40px',
              background: '#444',
              borderRadius: '5px 0 0 5px',
              zIndex: 20
            }}/>

            {/* Notch */}
            <div style={{
              position: 'absolute',
              top: '10px', left: '50%',
              transform: 'translateX(-50%)',
              width: '100px', height: '24px',
              background: '#1a1a1a',
              borderRadius: '0 0 16px 16px',
              zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ width: '8px', height: '8px', background: '#333', borderRadius: '50%' }}/>
            </div>

            {/* TELA */}
            <div style={{
              width: '100%', height: 'min(580px, calc(85vw * 1.93))',
              background: telaAcesa ? 'linear-gradient(160deg, #e8f0fe, #f0e8ff)' : '#000',
              borderRadius: '32px',
              overflow: 'hidden',
              position: 'relative',
              transition: 'background 0.6s ease',
              display: 'flex', flexDirection: 'column'
            }}>

              {/* Status bar */}
              {telaAcesa && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '28px 16px 4px',
                  fontSize: '12px', fontWeight: '600', color: '#333'
                }}>
                  <span>{hora}</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span>📶</span>
                    <span>🛜</span>
                    <div
                      onClick={() => {
                        if (passo === 3) {
                          setBateriaVisto(true);
                          Sons.avancar();
                          if (navigator.vibrate) navigator.vibrate(50);
                          setTimeout(() => avancarPasso(), 600);
                        }
                      }}
                      style={{
                        cursor: passo === 3 ? 'pointer' : 'default',
                        padding: '2px 4px', borderRadius: '6px',
                        background: passo === 3 ? 'rgba(243,152,75,0.3)' : 'transparent',
                        border: passo === 3 ? '2px solid #F3984B' : '2px solid transparent',
                        animation: mostrarDica && passo === 3 ? 'softPulse 1s ease infinite' : 'none',
                        transition: 'all 0.3s ease', fontSize: '14px'
                      }}
                    >🔋</div>
                  </div>
                </div>
              )}

              {/* Tela apagada */}
              {!telaAcesa && (
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                  <div style={{ fontSize: '28px', opacity: 0.2 }}>📵</div>
                  <p style={{ color: '#333', fontSize: '12px', opacity: 0.2 }}>Tela desligada</p>
                </div>
              )}

              {/* Apps */}
              {telaAcesa && (
                <div style={{
                  flex: 1, padding: '12px',
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px', alignContent: 'start'
                }}>
                  {[
                    { emoji: '⚙️', nome: 'Config', cor: '#607D8B' },
                    { emoji: '🔍', nome: 'Google', cor: '#4285F4' },
                    { emoji: '📷', nome: 'Câmera', cor: '#FF5722' },
                    { emoji: '📱', nome: 'Telefone', cor: '#4CAF50' },
                    { emoji: '💬', nome: 'WhatsApp', cor: '#25D366' },
                    { emoji: '📸', nome: 'Fotos', cor: '#E91E63' },
                    { emoji: '🎵', nome: 'Música', cor: '#9C27B0' },
                    { emoji: '🌐', nome: 'Chrome', cor: '#FF9800' },
                  ].map((app, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{
                        width: '44px', height: '44px', background: app.cor,
                        borderRadius: '12px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '22px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}>{app.emoji}</div>
                      <span style={{ fontSize: '9px', color: '#333', fontWeight: '600', textAlign: 'center' }}>{app.nome}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Nav bar Android */}
              <div style={{
                height: '30px', background: 'rgba(240,240,240,0.9)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-around',
                borderTop: '0.5px solid #ddd', flexShrink: 0
              }}>
                <span style={{ fontSize: '14px', color: '#555', cursor: 'pointer' }}>‹</span>
                <div style={{ width: '14px', height: '14px', border: '2px solid #555', borderRadius: '3px' }}/>
                <div style={{ width: '12px', height: '12px', border: '2px solid #555', borderRadius: '2px', boxShadow: '2px 2px 0 #555' }}/>
              </div>
            </div>
          </div>

          {/* Setas indicativas */}
          {mostrarDica && passo === 1 && (
            <div style={{
              position: 'absolute', right: '-44px', top: '38%',
              fontSize: '28px', animation: 'arrowPulse 0.7s ease infinite alternate',
              zIndex: 30, pointerEvents: 'none'
            }}>👉</div>
          )}
          {mostrarDica && passo === 2 && (
            <div style={{
              position: 'absolute', left: '-44px', top: '28%',
              fontSize: '28px', animation: 'arrowPulse2 0.7s ease infinite alternate',
              zIndex: 30, pointerEvents: 'none'
            }}>👈</div>
          )}
          {mostrarDica && passo === 3 && (
            <div style={{
              position: 'absolute', right: '16px', top: '28px',
              fontSize: '22px', animation: 'arrowPulse 0.7s ease infinite alternate',
              zIndex: 30, pointerEvents: 'none'
            }}>⬆️</div>
          )}
        </div>
      </div>

      {/* BALÃO DE INSTRUÇÃO */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '16px 20px calc(env(safe-area-inset-bottom,20px) + 16px)',
        boxShadow: '0 -4px 20px rgba(92,46,127,0.15)',
        display: 'flex', alignItems: 'center', gap: '12px', zIndex: 50
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', flexShrink: 0
        }}>🧓</div>
        <p style={{ flex: 1, margin: 0, fontSize: '15px', lineHeight: 1.5, color: '#333', fontWeight: '600' }}>
          {instrucoes[passo]}
        </p>
        <button onClick={() => falar(instrucoes[passo])} style={{
          width: '44px', height: '44px', borderRadius: '50%', border: 'none',
          background: 'linear-gradient(135deg, #F3984B, #e67e22)',
          color: '#fff', fontSize: '20px', cursor: 'pointer', flexShrink: 0,
          boxShadow: '0 2px 8px rgba(243,152,75,0.4)'
        }}>🔊</button>
      </div>

      {/* OVERLAYS */}
      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={handleMoedasFim}/>}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={handleContinuar}/>}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)}/>}

      <style>{`
        @keyframes arrowPulse {
          from { transform: translateX(0); }
          to   { transform: translateX(8px); }
        }
        @keyframes arrowPulse2 {
          from { transform: translateX(0); }
          to   { transform: translateX(-8px); }
        }
        @keyframes buttonPulse {
          0%   { box-shadow: 4px 0 8px rgba(243,152,75,0.4); }
          100% { box-shadow: 4px 0 20px rgba(243,152,75,1); }
        }
        @keyframes softPulse {
          0%   { box-shadow: 0 0 0 0 rgba(243,152,75,0.7); }
          100% { box-shadow: 0 0 0 8px rgba(243,152,75,0); }
        }
      `}</style>
    </div>
  );
}