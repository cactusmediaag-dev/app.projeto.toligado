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
import { Bluetooth, ChevronRight, ArrowLeft, Wifi, Sun, Battery } from 'lucide-react';

export default function Modulo2Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [bluetoothAberto, setBluetoothAberto] = useState(false);
  const [bluetoothLigado, setBluetoothLigado] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [conectado, setConectado] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o Bluetooth?"
        opcoes={[
          "📶 Para conectar ao Wi-Fi",
          "🎧 Para conectar fones e aparelhos sem usar fio ✅",
          "📸 Para tirar fotos melhores",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Bluetooth conecta aparelhos sem fio! Toque em CONFIGURAÇÕES e depois em Bluetooth 📡",
      audio: "O Bluetooth conecta aparelhos sem fio! Toque em configurações e depois em Bluetooth!",
    },
    {
      instrucao: "Encontrou! Agora toque em BLUETOOTH para abrir as opções 📡",
      audio: "Encontrou! Agora toque em Bluetooth para abrir as opções!",
    },
    {
      instrucao: "O Bluetooth está desligado! Toque no botão para LIGAR 🔵",
      audio: "O Bluetooth está desligado! Toque no botão para ligar!",
    },
    {
      instrucao: "Um fone de ouvido foi encontrado! Toque nele para CONECTAR 🎧",
      audio: "Um fone de ouvido foi encontrado! Toque nele para conectar!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!configAberta && !bluetoothAberto && (
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

      {configAberta && !bluetoothAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Configurações</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setBluetoothAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bluetooth size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Bluetooth</span>
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

      {bluetoothAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setBluetoothAberto(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Bluetooth</h2>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>Usar Bluetooth</span>
            {passo === 3 ? (
              <ElementoClicavel
                onClick={() => {
                  setBluetoothLigado(true);
                  setTimeout(() => {
                    setDispositivos([{ nome: "Fone JBL", id: 1 }]);
                    setPasso(4);
                  }, 1000);
                }}
                mostrarSeta={false}
              >
                <div style={{ width: '52px', height: '32px', borderRadius: '16px', background: bluetoothLigado ? '#34A853' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease' }}>
                  <div style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease', left: bluetoothLigado ? '24px' : '4px' }} />
                </div>
              </ElementoClicavel>
            ) : (
              <div style={{ width: '52px', height: '32px', borderRadius: '16px', background: bluetoothLigado ? '#34A853' : '#ccc', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', left: bluetoothLigado ? '24px' : '4px' }} />
              </div>
            )}
          </div>

          {!bluetoothLigado && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Bluetooth size={56} color="#ccc" />
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#aaa' }}>Bluetooth desligado</p>
            </div>
          )}

          {bluetoothLigado && dispositivos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <Bluetooth size={56} color="#4285F4" />
              </motion.div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#666' }}>Procurando dispositivos...</p>
            </motion.div>
          )}

          {dispositivos.length > 0 && (
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '12px' }}>Dispositivos disponíveis:</p>
              {passo === 4 && !conectado && (
                <ElementoClicavel
                  onClick={() => {
                    setConectado(true);
                    setTimeout(() => setMostrarValidacao(true), 1000);
                  }}
                  mostrarSeta={false}
                >
                  <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bluetooth size={20} color="#4285F4" />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>Fone JBL</span>
                  </div>
                </ElementoClicavel>
              )}
              {conectado && (
                <div style={{ background: '#E8F5E9', border: '2px solid #4CAF50', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bluetooth size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#2E7D32' }}>Fone JBL - Conectado</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}