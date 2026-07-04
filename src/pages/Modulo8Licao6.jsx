import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { Landmark, CreditCard, AlertTriangle, CheckCircle2, TrendingUp, Lock, ArrowLeft, FileText, ShieldAlert, Hand } from 'lucide-react';

export default function Modulo8Licao6() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [cartaoBloqueado, setCartaoBloqueado] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    setPasso(novoP);
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
    navigate(createPageUrl("Modulo8Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer ao ver uma compra estranha no cartão?"
        opcoes={[
          "🤷 Ignorar e esperar",
          "🚨 Contestar no app do banco e bloquear o cartão",
          "💸 Pagar e não reclamar"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Essa é sua fatura! NUNCA pague só o mínimo! Toque para entender o porquê ⚠️", audio: "Essa é sua fatura! Nunca pague só o mínimo! Toque para entender o porquê!" },
    { instrucao: "Entendeu? Os juros são perigosos! Toque em PAGAR TOTAL para fazer certo 💚", audio: "Entendeu? Os juros são perigosos! Toque em pagar total para fazer certo!" },
    { instrucao: "Na maquininha: DÉBITO sai da conta na hora. CRÉDITO é uma dívida! Toque em DÉBITO 💙", audio: "Na maquininha: débito sai da conta na hora. Crédito é uma dívida! Toque em débito!" },
    { instrucao: "Na maquininha, CUBRA os números ao digitar a senha! Toque em COBRIR 🤚", audio: "Na maquininha, cubra os números ao digitar a senha! Toque em cobrir!" },
    { instrucao: "Uma compra estranha! Horário suspeito! Toque em CONTESTAR para reclamar 🚨", audio: "Uma compra estranha! Horário suspeito! Toque em contestar para reclamar!" },
    { instrucao: "Você pode BLOQUEAR seu cartão pelo app se perder ou suspeitar de golpe! Toque 🔒", audio: "Você pode bloquear seu cartão pelo app se perder ou suspeitar de golpe! Toque!" }
  ];

  const headerBanco = (onBack, titulo) => (
    <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <ArrowLeft size={22} color="#fff" />
        </button>
      )}
      <Landmark size={22} color="#fff" />
      <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>{titulo || 'Meu Banco'}</p>
    </div>
  );

  // Maquininha de cartão desenhada em CSS
  const Maquininha = ({ children }) => (
    <div style={{ background: '#37474F', borderRadius: '16px', padding: '14px', maxWidth: '260px', margin: '0 auto' }}>
      {/* Visor */}
      <div style={{ background: '#1a1a1a', height: '48px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#4CAF50', fontFamily: 'monospace', fontSize: '18px', fontWeight: '700' }}>R$ 50,00</span>
      </div>
      {/* Teclado numérico */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        {[1,2,3,4,5,6,7,8,9,'C',0,'OK'].map((n, i) => (
          <div key={i} style={{ background: n ? '#546E7A' : 'transparent', height: '34px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '15px' }}>
            {n}
          </div>
        ))}
      </div>
      {children}
    </div>
  );

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Fatura do cartão */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco()}
          <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <CreditCard size={32} color="#4A148C" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#4A148C', margin: 0 }}>Fatura do Cartão</p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
              <div style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFEBEE)', border: '2px solid #FFB74D', borderRadius: '24px', padding: '20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Fatura atual</p>
                    <p style={{ fontSize: '34px', fontWeight: '900', color: '#4A148C', margin: 0 }}>R$ 340,00</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Vencimento</p>
                      <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>20/08/2025</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Pagamento mínimo</p>
                      <p style={{ fontWeight: '700', color: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', margin: 0 }}>
                        R$ 34,00 <AlertTriangle size={14} color="#E65100" />
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '14px', background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} color="#C62828" />
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#C62828', margin: 0 }}>Por que não pagar o mínimo?</p>
                </div>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 2: Juros - pagar total vs mínimo */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', maxWidth: '320px' }}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <TrendingUp size={48} color="#C62828" style={{ margin: '0 auto' }} />
              <p style={{ fontWeight: '800', fontSize: '20px', color: '#C62828', marginTop: '8px', margin: '8px 0 0' }}>Cuidado com os juros!</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', border: '2px solid #EF5350', marginBottom: '18px' }}>
              <p style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '12px', margin: '0 0 12px' }}>Se você pagar só R$ 34,00 (mínimo):</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={22} color="#C62828" />
                  <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>Juros de <strong style={{ color: '#C62828' }}>15% ao mês!</strong></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={22} color="#C62828" />
                  <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>R$ 340,00 vira <strong style={{ color: '#C62828' }}>R$ 680,00</strong> em 6 meses!</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={22} color="#27AE60" />
                  <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>Pague sempre o valor <strong style={{ color: '#27AE60' }}>TOTAL!</strong></p>
                </div>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#27AE60', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', minHeight: '56px' }}>
                Pagar valor total
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {/* Passo 3: Maquininha - débito vs crédito */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', maxWidth: '300px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <CreditCard size={36} color="#4A148C" style={{ margin: '0 auto' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginTop: '6px', margin: '6px 0 0' }}>Forma de Pagamento</p>
            </div>
            <div style={{ background: '#f5f5f5', borderRadius: '14px', padding: '12px', marginBottom: '14px' }}>
              <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '22px', color: '#1a1a1a', margin: 0 }}>R$ 50,00</p>
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', margin: 0 }}>Mercadinho do Seu João</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#1565C0', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', minHeight: '56px' }}>
                  Débito
                </button>
              </ElementoClicavel>
              <button style={{ width: '100%', background: '#e0e0e0', color: '#666', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '700', fontSize: '17px', cursor: 'default' }}>
                Crédito
              </button>
            </div>
            <div style={{ marginTop: '14px', background: '#E3F2FD', border: '2px solid #42A5F5', borderRadius: '12px', padding: '10px' }}>
              <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
                <strong>✅ Débito:</strong> Mais seguro — não gera dívida!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Maquininha - cobrir senha */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', maxWidth: '300px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <Lock size={36} color="#4A148C" style={{ margin: '0 auto' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginTop: '6px', margin: '6px 0 0' }}>Digite sua senha</p>
            </div>
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Maquininha />
              <ElementoClicavel onClick={() => handleAvancar(5)} mostrarSeta={false}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ position: 'absolute', inset: '14px', background: 'rgba(21,101,192,0.25)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Hand size={64} color="#1565C0" />
                </motion.div>
              </ElementoClicavel>
            </div>
            <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '12px', padding: '10px' }}>
              <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
                <strong>✅ Sempre cubra!</strong> Protege contra câmeras e espiões!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Passo 5: Extrato - compra suspeita */}
      {passo === 5 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(4), 'Extrato do Cartão')}
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: '700', color: '#666', margin: 0 }}>Mercadinho João</p>
                  <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>15/08 - 14:30</p>
                </div>
                <p style={{ fontWeight: '700', fontSize: '20px', color: '#999', margin: 0 }}>-R$ 32,50</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(6)} mostrarSeta={false}>
              <div style={{ background: '#FFEBEE', border: '3px solid #EF5350', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={22} color="#C62828" />
                      <p style={{ fontWeight: '700', color: '#C62828', margin: 0 }}>Loja Desconhecida</p>
                    </div>
                    <p style={{ fontSize: '14px', color: '#C62828', margin: 0 }}>15/08 - 03:14 (madrugada!)</p>
                  </div>
                  <p style={{ fontWeight: '900', fontSize: '20px', color: '#C62828', margin: 0 }}>-R$ 89,90</p>
                </div>
                <div style={{ background: '#FFF8E1', border: '2px solid #FFB74D', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={16} color="#C62828" />
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#333', margin: 0 }}>Compra suspeita! Toque para contestar</p>
                </div>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 6: Bloqueio de cartão */}
      {passo === 6 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '2px solid #e0e0e0', marginBottom: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Lock size={40} color="#4A148C" style={{ margin: '0 auto' }} />
                <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginTop: '8px', margin: '8px 0 0' }}>Controle do Cartão</p>
              </div>
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Status do cartão</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{cartaoBloqueado ? 'Bloqueado' : 'Ativo'}</p>
                  </div>
                  <ElementoClicavel onClick={() => {
                    setCartaoBloqueado(true);
                    setTimeout(() => setMostrarValidacao(true), 1500);
                  }} mostrarSeta={false}>
                    <div style={{ width: '56px', height: '32px', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.3s', background: cartaoBloqueado ? '#C62828' : '#ccc', padding: '4px', display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', transition: 'all 0.3s', transform: cartaoBloqueado ? 'translateX(24px)' : 'translateX(0)' }} />
                    </div>
                  </ElementoClicavel>
                </div>
              </div>
              {cartaoBloqueado && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Lock size={22} color="#C62828" style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: '700', color: '#C62828', marginBottom: '2px', margin: '0 0 2px' }}>Cartão bloqueado!</p>
                      <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>Nenhuma compra pode ser feita agora.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div style={{ background: '#E3F2FD', border: '2px solid #42A5F5', borderRadius: '14px', padding: '14px' }}>
              <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
                💡 <strong>Dica:</strong> Bloqueie o cartão imediatamente se suspeitar de golpe ou perda!
              </p>
            </div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}