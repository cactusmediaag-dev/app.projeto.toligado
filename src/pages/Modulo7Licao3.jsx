import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { Landmark, Zap, Receipt, ScanBarcode, FileText, ArrowLeft, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Modulo7Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
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
    navigate(createPageUrl("Modulo7Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual a vantagem do PIX?"
        opcoes={[
          "⏳ Demora 3 dias para chegar",
          "⚡ O dinheiro chega em segundos, qualquer hora do dia",
          "🏦 Só funciona dentro do banco"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O PIX é a forma mais rápida de transferir dinheiro! Toque em PIX 💸", audio: "O PIX é a forma mais rápida de transferir dinheiro! Toque em PIX!" },
    { instrucao: "Para enviar dinheiro, toque em ENVIAR PIX 📤", audio: "Para enviar dinheiro, toque em enviar PIX!" },
    { instrucao: "Digite a chave PIX de quem vai receber! Toque no campo 🔑", audio: "Digite a chave PIX de quem vai receber! Toque no campo!" },
    { instrucao: "Chave digitada! Toque em BUSCAR para encontrar o destinatário 🔍", audio: "Chave digitada! Toque em buscar para encontrar o destinatário!" },
    { instrucao: "É a pessoa certa! Agora toque no campo VALOR e digite o valor 💵", audio: "É a pessoa certa! Agora toque no campo valor e digite o valor!" },
    { instrucao: "Valor digitado! Toque em CONTINUAR para confirmar o envio ➡️", audio: "Valor digitado! Toque em continuar para confirmar o envio!" },
    { instrucao: "Confira tudo! Os dados estão certos? Toque em CONFIRMAR PIX ✅", audio: "Confira tudo! Os dados estão certos? Toque em confirmar PIX!" },
    { instrucao: "PIX enviado! O dinheiro chegou na hora! Toque em CONCLUIR 🎊", audio: "PIX enviado! O dinheiro chegou na hora! Toque em concluir!" }
  ];

  const headerBanco = (onBack) => (
    <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <ArrowLeft size={22} color="#fff" />
        </button>
      )}
      <Landmark size={22} color="#fff" />
      <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Meu Banco</p>
    </div>
  );

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Menu do banco */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Landmark size={24} color="#fff" />
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>Olá, Maria!</p>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>R$ 850,00</p>
            </div>
          </div>
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <Receipt size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Pagar Conta</p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
              <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Zap size={28} color="#4A148C" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#4A148C', margin: 0 }}>PIX</p>
              </div>
            </ElementoClicavel>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <ScanBarcode size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Boleto</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <FileText size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Extrato</p>
            </div>
          </div>
        </div>
      )}

      {/* Passo 2: Menu PIX */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(1))}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                <Zap size={32} color="#4A148C" />
                <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '17px', margin: 0 }}>Enviar PIX</p>
              </div>
            </ElementoClicavel>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
              <FileText size={32} color="#999" />
              <p style={{ fontWeight: '700', color: '#666', fontSize: '17px', margin: 0 }}>Receber PIX</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
              <Landmark size={32} color="#999" />
              <p style={{ fontWeight: '700', color: '#666', fontSize: '17px', margin: 0 }}>Minhas Chaves</p>
            </div>
          </div>
        </div>
      )}

      {/* Passo 3: Digitar chave PIX */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(2))}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <Zap size={40} color="#4A148C" style={{ margin: '0 auto 16px' }} />
              <p style={{ textAlign: 'center', fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '24px', margin: '0 0 24px' }}>Digite a chave PIX</p>
              <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
                <div style={{ background: '#f8f9fa', border: '2px solid #e0e0e0', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                  <p style={{ color: '#999', fontSize: '14px', marginBottom: '8px', margin: '0 0 8px' }}>Chave PIX</p>
                  <p style={{ color: '#bbb', fontFamily: 'monospace' }}>CPF, telefone, e-mail...</p>
                </div>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Buscar destinatário */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(3))}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <Search size={40} color="#4A148C" style={{ margin: '0 auto 16px' }} />
              <p style={{ textAlign: 'center', fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '24px', margin: '0 0 24px' }}>Buscar destinatário</p>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px', margin: '0 0 4px' }}>Chave digitada</p>
                <p style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>(65) 99999-1234</p>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(5)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Search size={20} color="#fff" /> Buscar
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 5: Destinatário confirmado + campo valor */}
      {passo === 5 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(4))}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', maxWidth: '320px' }}>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '24px', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#4A148C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '800', flexShrink: 0 }}>JS</div>
                  <div>
                    <p style={{ fontWeight: '800', fontSize: '17px', color: '#1a1a1a', margin: 0 }}>José da Silva</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Banco XYZ</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#27AE60" />
                  <span style={{ fontWeight: '700', fontSize: '14px', color: '#1E8449' }}>Destinatário confirmado</span>
                </div>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(6)} mostrarSeta={false}>
                <div style={{ background: '#f8f9fa', border: '2px solid #4A148C', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px', margin: '0 0 8px' }}>Valor</p>
                  <p style={{ fontSize: '36px', fontWeight: '900', color: '#ccc', margin: 0 }}>R$ ___</p>
                </div>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}

      {/* Passo 6: Valor digitado */}
      {passo === 6 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(5))}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '24px', padding: '20px', marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px', margin: '0 0 4px' }}>Para: José da Silva</p>
                <p style={{ fontSize: '42px', fontWeight: '900', color: '#1E8449', marginBottom: '8px', margin: '0 0 8px' }}>R$ 50,00</p>
                <p style={{ fontSize: '12px', color: '#999' }}>Chave: (65) 99999-1234</p>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(7)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                  Continuar <ArrowRight size={20} color="#fff" />
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 7: Resumo do PIX */}
      {passo === 7 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerBanco(() => setPasso(6))}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <FileText size={36} color="#4A148C" style={{ margin: '0 auto 12px' }} />
              <p style={{ textAlign: 'center', fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '16px', margin: '0 0 16px' }}>Resumo do PIX</p>
              <div style={{ background: '#fff', border: '2px solid #e0e0e0', borderRadius: '24px', padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Para</span>
                  <span style={{ fontWeight: '700' }}>José da Silva</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Valor</span>
                  <span style={{ fontWeight: '900', fontSize: '28px', color: '#1E8449' }}>R$ 50,00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#999' }}>Chave</span>
                  <span style={{ fontFamily: 'monospace', color: '#444' }}>(65) 99999-1234</span>
                </div>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(8)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#27AE60', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', minHeight: '56px' }}>
                  Confirmar PIX
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 8: Sucesso */}
      {passo === 8 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6 }}>
            <CheckCircle2 size={64} color="#27AE60" style={{ margin: '0 auto 16px' }} />
          </motion.div>
          <p style={{ fontWeight: '900', fontSize: '22px', color: '#27AE60', marginBottom: '16px', margin: '0 0 16px' }}>PIX enviado!</p>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', marginBottom: '24px', width: '100%', maxWidth: '320px', border: '2px solid #C8E6C9' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontSize: '32px', fontWeight: '900', color: '#1E8449', margin: 0 }}>R$ 50,00</p>
              <p style={{ color: '#1a1a1a', fontWeight: '700', margin: 0 }}>para José da Silva</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                <Zap size={18} color="#F3984B" />
                <p style={{ fontSize: '14px', color: '#666', fontWeight: '600', margin: 0 }}>Em menos de 1 segundo!</p>
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
            <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer' }}>
              Concluir
            </button>
          </ElementoClicavel>
        </div>
      )}
    </SimuladorImersivo>
  );
}