import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { RefreshCw, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

export default function Modulo2Licao8() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [atualizacaoAberta, setAtualizacaoAberta] = useState(false);
  const [instalando, setInstalando] = useState(false);
  const [progresso, setProgresso] = useState(0);
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
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod2")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod2"],
            xp_total: (users[0].xp_total || 0) + 130,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo2Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que você deve aceitar as atualizações do celular?"
        opcoes={[
          "🔋 Para gastar mais bateria",
          "🛡️ Para manter a segurança e melhorar o funcionamento ✅",
          "🗑️ Para apagar seus aplicativos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Seu celular tem uma atualização! Toque na notificação para ver 🔄",
      audio: "Seu celular tem uma atualização! Toque na notificação para ver!",
    },
    {
      instrucao: "Essas atualizações protegem você! Toque em INSTALAR AGORA ✅",
      audio: "Essas atualizações protegem você! Toque em instalar agora!",
    },
    {
      instrucao: "Perfeito! Seu celular está atualizado e mais seguro agora! 🛡️",
      audio: "Perfeito! Seu celular está atualizado e mais seguro agora!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={3}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!atualizacaoAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {passo === 1 && (
            <ElementoClicavel
              onClick={() => handleCliqueCerto(2, () => setAtualizacaoAberta(true))}
              mostrarSeta={false}
            >
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ position: 'absolute', top: '12px', left: '16px', right: '16px', background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <RefreshCw size={22} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '16px', margin: 0 }}>Atualização disponível</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Android 14</p>
                  </div>
                </div>
              </motion.div>
            </ElementoClicavel>
          )}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#ccc', fontWeight: '600' }}>Tela Inicial</p>
          </div>
        </div>
      )}

      {atualizacaoAberta && !instalando && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setAtualizacaoAberta(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Atualização do Sistema</h2>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <RefreshCw size={48} color="#4285F4" style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '4px', margin: '0 0 4px' }}>Android 14</p>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Tamanho: 250 MB</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
                  <CheckCircle size={20} color="#34A853" />
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>Correções de segurança</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
                  <CheckCircle size={20} color="#34A853" />
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>Melhorias de desempenho</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
                  <CheckCircle size={20} color="#34A853" />
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>Novos recursos de acessibilidade</span>
                </div>
              </div>

              {passo === 2 && (
                <ElementoClicavel
                  onClick={() => {
                    setInstalando(true);
                    let p = 0;
                    const intervalo = setInterval(() => {
                      p += 10;
                      setProgresso(p);
                      if (p >= 100) {
                        clearInterval(intervalo);
                        setConcluido(true);
                        setPasso(3);
                      }
                    }, 200);
                  }}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer' }}>
                    Instalar Agora
                  </button>
                </ElementoClicavel>
              )}
            </div>
          </div>
        </div>
      )}

      {instalando && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
            >
              <RefreshCw size={64} color="#4285F4" />
            </motion.div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', margin: '0 0 24px' }}>
              {concluido ? "Atualização Concluída!" : "Instalando..."}
            </h3>
            <div style={{ width: '100%', background: '#e0e0e0', borderRadius: '4px', height: '16px', overflow: 'hidden', marginBottom: '16px' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, #4CAF50, #2E7D32)', borderRadius: '4px' }}
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
              />
            </div>
            <p style={{ color: '#666', fontWeight: '600', fontSize: '18px', margin: 0 }}>{progresso}%</p>

            {concluido && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '32px' }}
              >
                <Shield size={56} color="#34A853" style={{ marginBottom: '16px' }} />
                <p style={{ color: '#34A853', fontWeight: '800', fontSize: '20px', marginBottom: '24px', margin: '0 0 24px' }}>
                  ✅ Seu celular está protegido!
                </p>
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer' }}>
                    Ótimo! 😊
                  </button>
                </ElementoClicavel>
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