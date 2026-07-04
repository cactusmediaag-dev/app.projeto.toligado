import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { MessageCircle, ArrowLeft, Lock, Ban, ShieldAlert } from 'lucide-react';

export default function Modulo2Licao7() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [smsAberto, setSmsAberto] = useState(false);
  const [smsLido, setSmsLido] = useState(false);
  const [spam, setSpam] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao8"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer com o código que chegou por SMS?"
        opcoes={[
          "📤 Compartilhar com um amigo para guardar",
          "🤫 Guardar só para você e nunca compartilhar ✅",
          "🗑️ Apagar sem ler",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Chegou uma mensagem de texto! Toque na notificação para ler 📩",
      audio: "Chegou uma mensagem de texto! Toque na notificação para ler!",
    },
    {
      instrucao: "É um código do banco! Esse número é SECRETO — nunca conte para ninguém 🤫",
      audio: "É um código do banco! Esse número é secreto, nunca conte para ninguém!",
    },
    {
      instrucao: "Cuidado! Esse SMS é SUSPEITO! Toque em DENUNCIAR para bloquear ⛔",
      audio: "Cuidado! Esse SMS é suspeito! Toque em denunciar para bloquear!",
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
      {!smsAberto && (
        <div style={{ height: '100%', background: '#F8F9FA', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {passo === 1 && (
            <ElementoClicavel
              onClick={() => handleCliqueCerto(2, () => setSmsAberto(true))}
              mostrarSeta={false}
            >
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ position: 'absolute', top: '12px', left: '16px', right: '16px', background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={22} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '16px', margin: 0 }}>1 nova mensagem</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Banco Seguro</p>
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

      {smsAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, borderBottom: '1px solid #f0f0f0' }}>
            <button onClick={() => setSmsAberto(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Mensagens</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ background: '#E8F5E9', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: smsLido ? '2px solid #4CAF50' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '16px' }}>🏦</span>
                </div>
                <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '18px', margin: 0 }}>Banco Seguro</p>
              </div>
              <p style={{ color: '#1a1a1a', lineHeight: 1.5, marginBottom: '12px', fontSize: '16px' }}>
                Seu código de acesso é <span style={{ fontWeight: '800', fontSize: '20px' }}>7823</span>.
                Válido por 5 minutos. Não compartilhe.
              </p>
              {passo === 2 && !smsLido && (
                <ElementoClicavel
                  onClick={() => { setSmsLido(true); handleCliqueCerto(3, null); }}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                    Entendi, é meu segredo! 🤫
                  </button>
                </ElementoClicavel>
              )}
              {smsLido && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: '700' }}>
                  <Lock size={16} color="#2E7D32" />
                  <span style={{ fontSize: '14px' }}>Código secreto guardado</span>
                </div>
              )}
            </div>

            {passo === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#FEF2F2', borderRadius: '16px', padding: '16px', opacity: spam ? 0.5 : 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldAlert size={18} color="#fff" />
                  </div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '18px', margin: 0 }}>Número desconhecido</p>
                </div>
                <p style={{ color: '#1a1a1a', lineHeight: 1.5, marginBottom: '12px', fontSize: '16px' }}>
                  Parabéns! Você ganhou R$5.000! Clique aqui: bit.ly/xxxx
                </p>
                {!spam && (
                  <ElementoClicavel
                    onClick={() => { setSpam(true); setTimeout(() => setMostrarValidacao(true), 1000); }}
                    mostrarSeta={false}
                  >
                    <button style={{ width: '100%', background: '#EF4444', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <Ban size={18} color="#fff" /> Denunciar como Spam
                    </button>
                  </ElementoClicavel>
                )}
                {spam && (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#EF4444', fontWeight: '700' }}>✅ Bloqueado e denunciado</p>
                  </div>
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