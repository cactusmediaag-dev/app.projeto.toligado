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
import { Shield, ScanFace, ChevronRight, ArrowLeft, Wifi, Sun, Battery, Fingerprint, Lock, CheckCircle } from 'lucide-react';

export default function Modulo3Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [segurancaAberta, setSegurancaAberta] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanCompleto, setScanCompleto] = useState(false);
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
    navigate(createPageUrl("Modulo3Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o reconhecimento facial?"
        opcoes={[
          "📸 Para tirar selfies automáticas",
          "🔐 Para usar seu rosto como senha do celular ✅",
          "🎥 Para fazer videochamadas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Seu rosto pode ser sua senha! Vamos configurar! Toque em CONFIGURAÇÕES ⚙️",
      audio: "Seu rosto pode ser sua senha! Vamos configurar! Toque em configurações!",
    },
    {
      instrucao: "Toque em SEGURANÇA E PRIVACIDADE para encontrar o reconhecimento facial 🔐",
      audio: "Toque em segurança e privacidade para encontrar o reconhecimento facial!",
    },
    {
      instrucao: "Encontrou! Toque em RECONHECIMENTO FACIAL para ativar 😊",
      audio: "Encontrou! Toque em reconhecimento facial para ativar!",
    },
    {
      instrucao: "Olhe para a câmera e centralize seu rosto no círculo! Toque em INICIAR 📸",
      audio: "Olhe para a câmera e centralize seu rosto no círculo! Toque em iniciar!",
    },
    {
      instrucao: "Pronto! Agora seu rosto desbloqueia o celular! Toque em CONCLUIR 🎉",
      audio: "Pronto! Agora seu rosto desbloqueia o celular! Toque em concluir!",
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
      {!configAberta && !segurancaAberta && !cameraAberta && (
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

      {configAberta && !segurancaAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Configurações</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setSegurancaAberta(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#5C2E7F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Segurança e Privacidade</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Wifi, nome: "Wi-Fi", cor: '#4285F4' },
              { Icon: Sun, nome: "Tela", cor: '#FF9800' },
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

      {segurancaAberta && !cameraAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setSegurancaAberta(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Segurança e Privacidade</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setCameraAberta(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ScanFace size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Reconhecimento Facial</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Fingerprint, nome: "Impressão Digital", cor: '#34A853' },
              { Icon: Lock, nome: "Bloqueio de Tela", cor: '#FF9800' },
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

      {cameraAberta && (
        <div style={{ height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ padding: '24px 16px', textAlign: 'center', flexShrink: 0 }}>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '18px', margin: 0 }}>Posicione seu rosto no círculo</p>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            {!scanning && !scanCompleto && (
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px dashed rgba(66,133,244,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScanFace size={96} color="rgba(255,255,255,0.8)" />
                </div>
                {passo === 4 && (
                  <ElementoClicavel
                    onClick={() => {
                      setScanning(true);
                      setTimeout(() => {
                        setScanning(false);
                        setScanCompleto(true);
                        setPasso(5);
                      }, 2500);
                    }}
                    mostrarSeta={false}
                  >
                    <button style={{ padding: '14px 32px', borderRadius: '16px', border: 'none', background: '#4285F4', color: '#fff', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}>
                      Iniciar
                    </button>
                  </ElementoClicavel>
                )}
              </div>
            )}

            {scanning && (
              <div style={{ position: 'relative' }}>
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScanFace size={96} color="#4CAF50" />
                </div>
                <motion.div
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(180deg, transparent 0%, rgba(76,175,80,0.3) 50%, transparent 100%)' }}
                  animate={{ y: [-100, 100] }}
                  transition={{ duration: 2, repeat: 1 }}
                />
              </div>
            )}

            {scanCompleto && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
              >
                <CheckCircle size={80} color="#4CAF50" />
                <p style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0 }}>Rosto cadastrado com sucesso!</p>
                {passo === 5 && (
                  <ElementoClicavel
                    onClick={() => setMostrarValidacao(true)}
                    mostrarSeta={false}
                  >
                    <button style={{ padding: '14px 32px', borderRadius: '16px', border: 'none', background: '#34A853', color: '#fff', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}>
                      Concluir 🎉
                    </button>
                  </ElementoClicavel>
                )}
              </motion.div>
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