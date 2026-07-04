import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { MessageCircle, AlertTriangle, Ban, Shield, Lock, ArrowLeft, CheckCircle } from 'lucide-react';

export default function Modulo3Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [analisado, setAnalisado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [confirmacao, setConfirmacao] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

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
        if (!modulosCompletos.includes("mod3")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod3"],
            xp_total: (users[0].xp_total || 0) + 100,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo3Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que fazer se alguém pedir sua senha por mensagem?"
        opcoes={[
          "🔑 Enviar a senha rapidamente",
          "🚫 Nunca enviar — bloquear e ligar para o banco ✅",
          "📤 Pedir para um amigo responder",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "ATENÇÃO! Essa mensagem é um golpe! Bancos NUNCA pedem senha! Toque em LER MAIS 👀",
      audio: "Atenção! Essa mensagem é um golpe! Bancos nunca pedem senha! Toque em ler mais!",
    },
    {
      instrucao: "Viu os sinais? Agora toque em BLOQUEAR E DENUNCIAR esse contato 🚫",
      audio: "Viu os sinais? Agora toque em bloquear e denunciar esse contato!",
    },
    {
      instrucao: "Confirme o bloqueio! Toque em BLOQUEAR para se proteger 🔒",
      audio: "Confirme o bloqueio! Toque em bloquear para se proteger!",
    },
    {
      instrucao: "Se tiver dúvida, sempre ligue para o banco! Toque em ENTENDI para continuar ✅",
      audio: "Se tiver dúvida, sempre ligue para o banco! Toque em entendi para continuar!",
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
      <div style={{ height: '100%', background: '#ECE5DD', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* SMS header */}
        <div style={{ background: '#0B57D0', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MessageCircle size={22} color="#0B57D0" />
          </div>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>+55 11 99999-9999</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', border: analisado ? '2px solid #EF4444' : 'none' }}>
            <p style={{ color: '#1a1a1a', fontWeight: '600', lineHeight: 1.5, marginBottom: '12px', fontSize: '16px' }}>
              Olá! Sou do <span style={{ background: analisado ? '#FEE2E2' : 'transparent' }}>suporte do banco</span>. Precisamos confirmar sua <span style={{ background: analisado ? '#FEE2E2' : 'transparent' }}>senha</span> para liberar seu acesso. Qual é sua senha?
            </p>
            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Recebida agora</p>
          </div>

          {passo === 1 && !analisado && (
            <div style={{ marginTop: '16px' }}>
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setAnalisado(true))}
                mostrarSeta={false}
              >
                <button style={{ width: '100%', background: '#F3984B', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <AlertTriangle size={20} color="#fff" /> Entender o golpe
                </button>
              </ElementoClicavel>
            </div>
          )}

          {analisado && !bloqueado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '16px' }}
            >
              <div style={{ background: '#FEF2F2', border: '2px solid #FECACA', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#B91C1C', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} color="#EF4444" /> Sinais de Alerta:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#DC2626' }}>
                  <li>• Banco NUNCA pede senha por mensagem</li>
                  <li>• Número desconhecido — não é do banco</li>
                  <li>• Pressão para responder rápido = golpe</li>
                </ul>
              </div>

              {passo === 2 && !confirmacao && (
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setConfirmacao(true))}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#EF4444', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Ban size={20} color="#fff" /> Bloquear e Denunciar
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}

          {confirmacao && !bloqueado && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' }}
            >
              <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', maxWidth: '320px', width: '100%' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>Deseja bloquear este contato?</h3>
                <p style={{ color: '#666', fontSize: '15px', marginBottom: '24px' }}>Este número será bloqueado e denunciado como spam</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setConfirmacao(false)}
                    style={{ flex: 1, padding: '14px', background: '#e0e0e0', borderRadius: '12px', border: 'none', fontWeight: '700', color: '#666', fontSize: '15px', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                  {passo === 3 && (
                    <ElementoClicavel
                      onClick={() => {
                        setBloqueado(true);
                        setPasso(4);
                      }}
                      mostrarSeta={false}
                    >
                      <button style={{ flex: 1, padding: '14px', background: '#EF4444', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                        Bloquear
                      </button>
                    </ElementoClicavel>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {bloqueado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '16px' }}
            >
              <div style={{ background: '#E8F5E9', border: '2px solid #4CAF50', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Shield size={48} color="#34A853" />
                  <p style={{ fontSize: '20px', fontWeight: '800', color: '#2E7D32', margin: 0 }}>Contato bloqueado!</p>
                  <p style={{ fontSize: '14px', color: '#34A853' }}>Você está seguro</p>
                </div>
              </div>

              <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1565C0', marginBottom: '8px' }}>💡 Dica importante:</p>
                <p style={{ fontSize: '14px', color: '#1565C0' }}>
                  Em caso de dúvida, ligue para o número oficial do seu banco no verso do cartão 📞
                </p>
              </div>

              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#34A853', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <CheckCircle size={20} color="#fff" /> Entendi!
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </SimuladorImersivo>
  );
}