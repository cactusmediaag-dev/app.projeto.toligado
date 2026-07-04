import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { Search, AlertTriangle, ShieldCheck, Trash2, Ban } from 'lucide-react';

export default function Modulo2Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [analisado, setAnalisado] = useState(false);
  const [verificado, setVerificado] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer ao receber notícia alarmante?"
        opcoes={[
          "📤 Compartilhar imediatamente com todos",
          "🔍 Verificar se é verdade antes de compartilhar ✅",
          "😱 Ficar com medo e pagar",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Cuidado! Essa mensagem parece suspeita! Leia com atenção antes de fazer qualquer coisa 👀",
      audio: "Cuidado! Essa mensagem parece suspeita! Leia com atenção antes de fazer qualquer coisa!",
    },
    {
      instrucao: "Viu os sinais de alerta? Toque em NÃO COMPARTILHAR para fazer certo! 🚫",
      audio: "Viu os sinais de alerta? Toque em não compartilhar para fazer certo!",
    },
    {
      instrucao: "Você pode verificar notícias em sites de checagem! Toque em VERIFICAR para ver 🔎",
      audio: "Você pode verificar notícias em sites de checagem! Toque em verificar para ver!",
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
      <div style={{ height: '100%', background: '#ECE5DD', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* WhatsApp header */}
        <div style={{ background: '#25D366', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '20px' }}>👨‍👩‍👧</span>
          </div>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>Grupo Família</span>
        </div>

        {/* Mensagem suspeita */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', border: analisado ? '2px solid #EF4444' : 'none' }}>
            <p style={{ color: '#1a1a1a', fontWeight: '600', lineHeight: 1.5, marginBottom: '12px', fontSize: '16px' }}>
              <AlertTriangle size={16} color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              <span style={{ background: analisado ? '#FEE2E2' : 'transparent' }}>URGENTE</span>: O governo vai cobrar taxa de R$500 de todos os aposentados até <span style={{ background: analisado ? '#FEE2E2' : 'transparent' }}>amanhã</span>!
              <span style={{ background: analisado ? '#FEE2E2' : 'transparent' }}> Compartilhe para avisar todos!</span>
            </p>
            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Recebida há 5 min</p>
          </div>

          {passo === 1 && !analisado && (
            <div style={{ marginTop: '16px' }}>
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setAnalisado(true))}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#4285F4', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Search size={20} color="#fff" /> Ler com calma
                </button>
              </ElementoClicavel>
            </div>
          )}

          {analisado && !verificado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ background: '#FEF2F2', border: '2px solid #FECACA', borderRadius: '16px', padding: '16px' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#B91C1C', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} color="#EF4444" /> Sinais de Alerta:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#DC2626' }}>
                  <li>• Palavra "URGENTE" — usado para assustar</li>
                  <li>• Prazo curtíssimo — pressão para agir rápido</li>
                  <li>• Pede para compartilhar — sinal de fake</li>
                </ul>
              </div>

              {passo === 2 && (
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setVerificado(true))}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#EF4444', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Ban size={20} color="#fff" /> Não Compartilhar
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}

          {verificado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '16px' }}
            >
              <div style={{ background: '#E8F5E9', border: '2px solid #4CAF50', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <ShieldCheck size={32} color="#4CAF50" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#2E7D32', margin: 0 }}>Muito bem! Você não caiu no golpe!</p>
              </div>

              {passo === 3 && (
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#4285F4', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Search size={20} color="#fff" /> Verificar no Comprova
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}