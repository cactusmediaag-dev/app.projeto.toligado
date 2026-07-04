import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { Sun, Type, Bell, Wifi, Battery, ChevronRight, ArrowLeft } from 'lucide-react';

export default function Modulo2Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [brilhoAberto, setBrilhoAberto] = useState(false);
  const [brilho, setBrilho] = useState(50);
  const [fonteAberta, setFonteAberta] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Onde você ajusta o brilho e o tamanho da letra?"
        opcoes={[
          "⚙️ Nas Configurações do celular ✅",
          "📱 No WhatsApp",
          "🌐 No Google",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos conhecer as Configurações do seu celular! Procure o ícone de engrenagem e toque nele ⚙️",
      audio: "Vamos conhecer as configurações do seu celular! Procure o ícone de engrenagem e toque nele!",
    },
    {
      instrucao: "Aqui você controla tudo! Toque em TELA E BRILHO para ajustar 🔆",
      audio: "Aqui você controla tudo! Toque em tela e brilho para ajustar!",
    },
    {
      instrucao: "Esta barra controla o brilho da tela! Arraste para a direita para aumentar ☀️",
      audio: "Esta barra controla o brilho da tela! Arraste para a direita para aumentar!",
    },
    {
      instrucao: "Agora vamos aumentar a letra do celular! Toque em TAMANHO DA FONTE 🔤",
      audio: "Agora vamos aumentar a letra do celular! Toque em tamanho da fonte!",
    },
    {
      instrucao: "Para enxergar melhor, toque em MUITO GRANDE! Seus olhos agradecem 👀",
      audio: "Para enxergar melhor, toque em muito grande! Seus olhos agradecem!",
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
      {!configAberta && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
            ]}
            appDestacado={passo === 1 ? 'settings' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'settings') handleCliqueCerto(2, () => setConfigAberta(true));
            }}
          />
        </div>
      )}

      {configAberta && !brilhoAberto && !fonteAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Configurações</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setBrilhoAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FF9800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sun size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Tela e Brilho</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {passo >= 4 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(5, () => setFonteAberta(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Type size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Tamanho da Fonte</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Bell, nome: "Notificações", cor: '#EA4335' },
              { Icon: Wifi, nome: "Wi-Fi", cor: '#4285F4' },
              { Icon: Battery, nome: "Bateria", cor: '#34A853' },
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

      {brilhoAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => { setBrilhoAberto(false); setPasso(4); }} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Brilho da Tela</h2>
          </div>
          <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', width: '100%', textAlign: 'center' }}>
              <Sun size={48} color="#FF9800" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px' }}>{brilho}%</p>
              {passo === 3 && (
                <ElementoClicavel
                  onClick={() => {
                    let val = 50;
                    const intervalo = setInterval(() => {
                      if (val < 100) {
                        val += 10;
                        setBrilho(val);
                      } else {
                        clearInterval(intervalo);
                        handleCliqueCerto(4, () => setBrilhoAberto(false));
                      }
                    }, 100);
                  }}
                  mostrarSeta={false}
                >
                  <div style={{ width: '100%', height: '48px', background: '#e0e0e0', borderRadius: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{ height: '100%', width: `${brilho}%`, background: 'linear-gradient(90deg, #FFC107, #FF9800)', borderRadius: '24px', transition: 'width 0.3s ease' }} />
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: `calc(${brilho}% - 24px)`, width: '48px', height: '48px', borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
                  </div>
                </ElementoClicavel>
              )}
            </div>
          </div>
        </div>
      )}

      {fonteAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setFonteAberta(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Tamanho da Fonte</h2>
          </div>
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { nome: "Pequena", size: '14px' },
              { nome: "Normal", size: '18px' },
              { nome: "Grande", size: '24px' },
            ].map((fonte, i) => (
              <div key={i} style={{ padding: '16px', background: '#fff', borderRadius: '16px' }}>
                <p style={{ fontSize: fonte.size, fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Aa {fonte.nome}</p>
              </div>
            ))}
            {passo === 5 && (
              <ElementoClicavel
                onClick={() => setMostrarValidacao(true)}
                mostrarSeta={false}
              >
                <div style={{ padding: '16px', background: '#E8F5E9', border: '2px solid #4CAF50', borderRadius: '16px', cursor: 'pointer' }}>
                  <p style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Aa Muito Grande</p>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}