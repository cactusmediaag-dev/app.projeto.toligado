import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { Search, ChevronRight, ArrowLeft, Mic, CheckCircle, Bell, Settings } from 'lucide-react';

export default function Modulo3Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [googleAberto, setGoogleAberto] = useState(false);
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [voiceMatchAberto, setVoiceMatchAberto] = useState(false);
  const [gravando, setGravando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [feedbackAcerto, setFeedbackAcerto] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);
  const [mostrarMoedas, setMostrarMoedas] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    if (acao) acao();
    setTimeout(() => setPasso(proximoPasso), 600);
  };

  const handleConcluirValidacao = async () => {
    const userId = localStorage.getItem("toligado_user_id");
    if (userId) {
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) {
        await base44.entities.Usuario.update(userId, {
          moedas: (users[0].moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo3Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que o Voice Match faz?"
        opcoes={[
          "🎵 Grava músicas",
          "🗣️ Faz o assistente reconhecer só a sua voz ✅",
          "📞 Faz ligações automáticas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Você pode treinar o Google a reconhecer só a SUA voz! Toque em GOOGLE nas configurações 🎤",
      audio: "Você pode treinar o Google a reconhecer só a sua voz! Toque em Google nas configurações!",
    },
    {
      instrucao: "Toque em ASSISTENTE para configurar o reconhecimento de voz 🤖",
      audio: "Toque em assistente para configurar o reconhecimento de voz!",
    },
    {
      instrucao: "Toque em HEY GOOGLE para ensinar sua voz ao assistente 🗣️",
      audio: "Toque em hey Google para ensinar sua voz ao assistente!",
    },
    {
      instrucao: "Agora fale! Toque no MICROFONE e diga Ok Google 🎤",
      audio: "Agora fale! Toque no microfone e diga Ok Google!",
    },
    {
      instrucao: "Agora só a sua voz ativa o assistente! Toque em CONCLUIR 🎉",
      audio: "Agora só a sua voz ativa o assistente! Toque em concluir!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!googleAberto && !assistenteAberto && !voiceMatchAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', flexShrink: 0 }}>
           ! <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Configurações</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setGoogleAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '2px solid #4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Search size={20} color="#4285F4" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Google</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Settings, nome: "Wi-Fi", cor: '#4285F4' },
              { Icon: Settings, nome: "Segurança", cor: '#5C2E7F' },
              { Icon: Settings, nome: "Bateria", cor: '#34A853' },
            ].map((item, i) => {
              const Ic = item.Icon;
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>{item.nome}</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {googleAberto && !assistenteAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() =>! setGoogleAberto(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Google</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setAssistenteAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Assistente</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Search, nome: "Pesquisa", cor: '#34A853' },
              { Icon: Bell, nome: "Backup", cor: '#FBBC05' },
            ].map((item, i) => {
              const Ic = item.Icon;
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>{item.nome}</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {assistenteAberto && !voiceMatchAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setAssistenteAberto(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Google Assistente</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setVoiceMatchAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Hey Google e Voice Match</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Settings, nome: "Configurações gerais", cor: '#607D8B' },
              { Icon: Bell, nome: "Notificações", cor: '#EA4335' },
            ].map((item, i) => {
              const Ic = item.Icon;
              return (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>{item.nome}</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {voiceMatchAberto && (
        <div style={{ height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          {!gravando && !concluido && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>Ensine sua voz</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600', fontSize: '18px' }}>Diga: "Ok Google"</p>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mic size={48} color="#fff" />
                </div>
              </motion.div>
              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => {
                    setGravando(true);
                    setTimeout(() => {
                      setGravando(false);
                      setConcluido(true);
                      setPasso(5);
                    }, 3000);
                  }}
                  mostrarSeta={false}
                >
                  <button style={{ padding: '16px 32px', borderRadius: '24px', border: 'none', background: '#4285F4', color: '#fff', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}>
                    Iniciar Gravação
                  </button>
                </ElementoClicavel>
              )}
            </div>
          )}

          {gravando && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>Ouvindo...</h3>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mic size={48} color="#fff" />
                </div>
              </motion.div>
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    style={{ width: '8px', height: '64px', background: '#4285F4', borderRadius: '4px' }}
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <p style={{ color: '#4285F4', fontWeight: '700', fontSize: '16px' }}>Falando: "Ok Google"</p>
            </div>
          )}

          {concluido && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <CheckCircle size={72} color="#34A853" />
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>Voz reconhecida e salva!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>Só você pode ativar o assistente agora</p>
              {passo === 5 && (
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  mostrarSeta={false}
                >
                  <button style={{ padding: '16px 32px', borderRadius: '16px', border: 'none', background: '#34A853', color: '#fff', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}>
                    Concluir 🎉
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}