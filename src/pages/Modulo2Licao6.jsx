import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { Shield, Settings, ArrowLeft, Send, ShieldCheck } from 'lucide-react';

export default function Modulo2Licao6() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [verificacaoAtiva, setVerificacaoAtiva] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [protecaoAtiva, setProtecaoAtiva] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao7"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que é a verificação em duas etapas?"
        opcoes={[
          "🔐 Uma proteção extra com código enviado no celular ✅",
          "📱 Ter dois celulares",
          "🔑 Digitar a senha duas vezes seguidas",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "A verificação em duas etapas é uma proteção extra! Vamos ativar juntos 🛡️",
      audio: "A verificação em duas etapas é uma proteção extra! Vamos ativar juntos!",
    },
    {
      instrucao: "Encontrou! Toque para ATIVAR essa proteção extra 🔐",
      audio: "Encontrou! Toque para ativar essa proteção extra!",
    },
    {
      instrucao: "O app vai enviar um código no seu celular! Toque em ENVIAR CÓDIGO 📲",
      audio: "O app vai enviar um código no seu celular! Toque em enviar código!",
    },
    {
      instrucao: "O código chegou! Toque nos campos e digite o código que chegou no SMS 📩",
      audio: "O código chegou! Toque nos campos e digite o código que chegou no SMS!",
    },
    {
      instrucao: "Agora toque em CONFIRMAR para ativar a proteção! ✅",
      audio: "Agora toque em confirmar para ativar a proteção!",
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
      <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
        {passo === 1 && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <Shield size={32} color="#5C2E7F" />
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Banco Seguro</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, null)}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#4285F4', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Settings size={20} color="#fff" /> Configurações de Segurança
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 2 && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setPasso(1)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowLeft size={24} color="#4285F4" />
              </button>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Segurança</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#5C2E7F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={22} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '4px', fontSize: '18px', margin: 0 }}>Verificação em 2 etapas</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Proteção extra para sua conta</p>
                  </div>
                </div>
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setVerificacaoAtiva(true))}
                  mostrarSeta={false}
                >
                  <div style={{ width: '52px', height: '32px', borderRadius: '16px', background: verificacaoAtiva ? '#34A853' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease' }}>
                    <div style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease', left: verificacaoAtiva ? '24px' : '4px' }} />
                  </div>
                </ElementoClicavel>
              </div>
            </div>
          </div>
        )}

        {passo === 3 && (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', margin: 0 }}>Confirmar Número</h2>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <p style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px', fontSize: '16px' }}>Vamos enviar um código para:</p>
              <p style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center' }}>(65) 99999-9999</p>
              <ElementoClicavel
                onClick={() => {
                  setCodigoEnviado(true);
                  handleCliqueCerto(4, null);
                }}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={20} color="#fff" /> Enviar Código
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 4 && (
          <div style={{ padding: '24px' }}>
            {codigoEnviado && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', padding: '12px 16px', marginBottom: '24px' }}
              >
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1565C0', margin: 0 }}>📩 SMS: Seu código é 4 8 2 1 5 3</p>
              </motion.div>
            )}
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', margin: 0 }}>Digite o Código</h2>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                {["4", "8", "2", "1", "5", "3"].map((num, i) => (
                  <div key={i} style={{ width: '48px', height: '56px', borderRadius: '12px', background: '#F8F9FA', border: '2px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a' }}>{codigo[i] || ""}</span>
                  </div>
                ))}
              </div>
              <ElementoClicavel
                onClick={() => {
                  setCodigo("482153");
                  handleCliqueCerto(5, null);
                }}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#4285F4', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer' }}>
                  Digitar código
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 5 && codigo === "482153" && (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', margin: 0 }}>Confirmar</h2>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                {["4", "8", "2", "1", "5", "3"].map((num, i) => (
                  <div key={i} style={{ width: '48px', height: '56px', borderRadius: '12px', background: '#E8F5E9', border: '2px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#2E7D32' }}>{num}</span>
                  </div>
                ))}
              </div>
              <ElementoClicavel
                onClick={() => {
                  setProtecaoAtiva(true);
                  setTimeout(() => setMostrarValidacao(true), 1500);
                }}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="#fff" /> Confirmar
                </button>
              </ElementoClicavel>
            </div>

            {protecaoAtiva && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <Shield size={64} color="#34A853" />
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#34A853', margin: 0 }}>Proteção Ativada!</p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}