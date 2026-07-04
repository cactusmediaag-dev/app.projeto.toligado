import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { Landmark, Receipt, Zap, ScanBarcode, FileText, ArrowDownCircle, ArrowUpCircle, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Modulo8Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

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
    navigate(createPageUrl("Modulo8Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Onde você confere se recebeu um PIX?"
        opcoes={[
          "📱 No WhatsApp",
          "📊 No extrato do app do banco",
          "📞 Ligando para o banco"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Você recebeu um PIX! Vamos ver no extrato! Toque em EXTRATO 📊", audio: "Você recebeu um PIX! Vamos ver no extrato! Toque em extrato!" },
    { instrucao: "Aqui estão todas as movimentações! Toque no PIX recebido para ver detalhes 👆", audio: "Aqui estão todas as movimentações! Toque no PIX recebido para ver detalhes!" },
    { instrucao: "Está tudo registrado! Toque em COMPARTILHAR para avisar o João ✅", audio: "Está tudo registrado! Toque em compartilhar para avisar o João!" },
    { instrucao: "Comprovante enviado para o João! Toque em VOLTAR para ir ao banco ⬅️", audio: "Comprovante enviado para o João! Toque em voltar para ir ao banco!" }
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Home do banco com PIX recebido destacado */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Landmark size={24} color="#fff" />
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>Olá, Maria!</p>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>R$ 850,00</p>
            </div>
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '16px', padding: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ArrowDownCircle size={32} color="#27AE60" />
                <div>
                  <p style={{ fontWeight: '700', color: '#1E8449', margin: 0 }}>Você recebeu</p>
                  <p style={{ fontSize: '22px', fontWeight: '900', color: '#1B5E20', margin: 0 }}>R$ 200,00</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>de João Silva</p>
                </div>
              </div>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                <Receipt size={28} color="#999" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Pagar Conta</p>
              </div>
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                <Zap size={28} color="#999" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>PIX</p>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
                <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FileText size={28} color="#4A148C" />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#4A148C', margin: 0 }}>Extrato</p>
                </div>
              </ElementoClicavel>
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                <ScanBarcode size={28} color="#999" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Boleto</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 2: Extrato - lista de movimentações */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setPasso(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <FileText size={22} color="#fff" />
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Extrato</p>
          </div>
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ArrowDownCircle size={24} color="#27AE60" />
                    <div>
                      <p style={{ fontWeight: '700', color: '#1E8449', margin: 0 }}>PIX recebido</p>
                      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>João Silva</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '900', fontSize: '20px', color: '#1E8449', margin: 0 }}>+R$ 200,00</p>
                    <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>14:22</p>
                  </div>
                </div>
              </div>
            </ElementoClicavel>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ArrowUpCircle size={24} color="#999" />
                  <div>
                    <p style={{ fontWeight: '700', color: '#666', margin: 0 }}>Conta água</p>
                    <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>SANEMAT</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', fontSize: '20px', color: '#999', margin: 0 }}>-R$ 45,80</p>
                  <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>13/08</p>
                </div>
              </div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ArrowUpCircle size={24} color="#999" />
                  <div>
                    <p style={{ fontWeight: '700', color: '#666', margin: 0 }}>Mercadinho João</p>
                    <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>PIX</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', fontSize: '20px', color: '#999', margin: 0 }}>-R$ 32,50</p>
                  <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>12/08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 3: Detalhe do PIX recebido */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ background: '#fff', border: '2px solid #66BB6A', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '320px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <CheckCircle2 size={40} color="#27AE60" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '900', fontSize: '22px', color: '#1E8449', margin: 0 }}>PIX Recebido</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>De</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>João Silva</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Valor</p>
                <p style={{ fontWeight: '900', fontSize: '30px', color: '#1E8449', margin: 0 }}>R$ 200,00</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Mensagem</p>
                <p style={{ fontWeight: '600', color: '#444', margin: 0 }}>Obrigado pela ajuda! 😊</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Data</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>15/08/2025 às 14:22</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>ID</p>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#666', margin: 0 }}>PIX20240815002</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                <Share2 size={20} color="#fff" /> Compartilhar Comprovante
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {/* Passo 4: WhatsApp - compartilhar com João */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#075E54', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                <ArrowLeft size={22} color="#fff" />
              </button>
            </ElementoClicavel>
            <div style={{ width: '40px', height: '40px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px', flexShrink: 0 }}>JS</div>
            <div>
              <p style={{ fontWeight: '700', color: '#fff', margin: 0 }}>João Silva</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>online</p>
            </div>
          </div>
          <div style={{ flex: 1, background: '#ECE5DD', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '12px', maxWidth: '80%', alignSelf: 'flex-start' }}>
              <p style={{ fontSize: '14px', color: '#333', margin: 0 }}>Oi! Conseguiu ver o PIX?</p>
              <p style={{ fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '4px', margin: '4px 0 0' }}>14:20</p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ background: '#DCF8C6', borderRadius: '12px', padding: '12px', maxWidth: '80%', alignSelf: 'flex-end' }}
            >
              <div style={{ background: '#fff', borderRadius: '12px', padding: '12px', marginBottom: '8px' }}>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle2 size={24} color="#27AE60" style={{ margin: '0 auto 4px' }} />
                  <p style={{ fontWeight: '700', color: '#1E8449', margin: 0 }}>PIX Recebido</p>
                  <p style={{ fontSize: '22px', fontWeight: '900', color: '#1E8449', margin: 0 }}>R$ 200,00</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#333', margin: 0 }}>Sim! Recebi sim! 😊</p>
              <p style={{ fontSize: '11px', color: '#667781', textAlign: 'right', marginTop: '4px', margin: '4px 0 0' }}>14:23 ✓✓</p>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}