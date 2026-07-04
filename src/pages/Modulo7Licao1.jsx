import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { Landmark, ScanBarcode, Zap, FileText, Receipt, Camera, CheckCircle2, Lock, ArrowLeft, FileCheck } from 'lucide-react';

export default function Modulo7Licao1() {
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
    navigate(createPageUrl("Modulo7Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o código de barras em uma conta?"
        opcoes={[
          "🎨 Para decorar a conta",
          "💳 Para o app ler e preencher os dados de pagamento",
          "📞 Para ligar para a empresa"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Você recebeu uma conta! O código de barras serve para pagar. Vamos aprender! 📄",
      audio: "Você recebeu uma conta! O código de barras serve para pagar. Vamos aprender!"
    },
    {
      instrucao: "Estamos no banco! Toque em PAGAR CONTA para começar 💳",
      audio: "Estamos no banco! Toque em pagar conta para começar!"
    },
    {
      instrucao: "Toque em LER CÓDIGO DE BARRAS para usar a câmera 📷",
      audio: "Toque em ler código de barras para usar a câmera!"
    },
    {
      instrucao: "Aponte para o código de barras da conta! Toque em ESCANEAR para ler 🔍",
      audio: "Aponte para o código de barras da conta! Toque em escanear para ler!"
    },
    {
      instrucao: "O código foi lido! Confira os dados e toque em CONFIRMAR PAGAMENTO ✅",
      audio: "O código foi lido! Confira os dados e toque em confirmar pagamento!"
    },
    {
      instrucao: "Digite sua senha para confirmar! Toque nos números 🔐",
      audio: "Digite sua senha para confirmar! Toque nos números!"
    },
    {
      instrucao: "Conta paga! Toque em VER COMPROVANTE para guardar o recibo 🧾",
      audio: "Conta paga! Toque em ver comprovante para guardar o recibo!"
    }
  ];

  const barras = [4,8,3,6,10,2,7,5,9,3,6,4,8,2,7,5,10,3,6,4,8,2,7,5,9,3,6,4,8,2];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={7}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Conta na mesa */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', background: '#f5f0fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', marginBottom: '24px', width: '100%', maxWidth: '320px' }}
          >
            <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#666', marginBottom: '12px', margin: '0 0 12px' }}>CONTA DE ÁGUA</p>
              <div style={{ background: '#fff', padding: '12px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '50px' }}>
                  {barras.map((h,i) => (
                    <div key={i} style={{ width: '3px', height: `${h*4}px`, background: '#000' }} />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#999', marginTop: '8px', margin: '8px 0 0' }}>Vencimento: 20/08/2025</p>
              <p style={{ fontSize: '22px', fontWeight: '900', color: '#1E8449', marginTop: '4px', margin: '4px 0 0' }}>R$ 45,80</p>
            </div>
          </motion.div>
          <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
            <button style={{ background: 'linear-gradient(135deg, #4A148C, #7B1FA2)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(74,20,140,0.4)' }}>
              Vamos lá!
            </button>
          </ElementoClicavel>
        </div>
      )}

      {/* Passo 2: Menu do banco */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Landmark size={24} color="#fff" />
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>Olá, Maria!</p>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>R$ 850,00</p>
            </div>
          </div>
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Receipt size={28} color="#4A148C" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#4A148C', margin: 0 }}>Pagar Conta</p>
              </div>
            </ElementoClicavel>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <Zap size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>PIX</p>
            </div>
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

      {/* Passo 3: Opções de leitura */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setPasso(2)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Pagar Conta</p>
          </div>
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
              <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                <Camera size={32} color="#4A148C" />
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '17px', margin: 0 }}>Ler Código de Barras</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Use a câmera</p>
                </div>
              </div>
            </ElementoClicavel>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
              <ScanBarcode size={32} color="#999" />
              <div>
                <p style={{ fontWeight: '700', color: '#666', fontSize: '17px', margin: 0 }}>Digitar Código</p>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Digite manualmente</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Câmera com código de barras */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '32px', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Enquadre o código de barras</p>
          </div>
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: '#fff', padding: '24px', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '80px' }}>
                {barras.map((h,i) => (
                  <div key={i} style={{ width: '4px', height: `${h*6}px`, background: '#000' }} />
                ))}
              </div>
            </motion.div>
            <div style={{ position: 'absolute', inset: 0, border: '3px solid #fff', borderRadius: '16px' }} />
            <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '24px', height: '24px', borderTop: '4px solid #4A148C', borderLeft: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', borderTop: '4px solid #4A148C', borderRight: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '24px', height: '24px', borderBottom: '4px solid #4A148C', borderLeft: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '24px', height: '24px', borderBottom: '4px solid #4A148C', borderRight: '4px solid #4A148C' }} />
            <motion.div
              animate={{ y: [-30, 30] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: '8px', right: '8px', top: '50%', height: '2px', background: '#EF4444' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '32px' }}>
            <ElementoClicavel onClick={() => handleAvancar(5)} mostrarSeta={false}>
              <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '999px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={22} color="#fff" /> Escanear
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 5: Dados lidos */}
      {passo === 5 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '320px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <CheckCircle2 size={40} color="#27AE60" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1E8449', margin: 0 }}>Código lido com sucesso!</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Empresa</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>SANEMAT — Água e Esgoto</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Valor</p>
                <p style={{ fontWeight: '900', fontSize: '28px', color: '#1E8449', margin: 0 }}>R$ 45,80</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Vencimento</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>20/08/2025</p>
              </div>
            </div>
          </motion.div>
          <div style={{ marginTop: '24px' }}>
            <ElementoClicavel onClick={() => handleAvancar(6)} mostrarSeta={false}>
              <button style={{ background: '#27AE60', color: '#fff', border: 'none', padding: '18px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', minHeight: '56px' }}>
                Confirmar Pagamento
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 6: Senha */}
      {passo === 6 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Lock size={48} color="#4A148C" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontWeight: '800', fontSize: '20px', color: '#1a1a1a', margin: 0 }}>Digite sua senha</p>
            <p style={{ fontSize: '14px', color: '#999', marginTop: '4px', margin: '4px 0 0' }}>Para confirmar o pagamento</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ width: '16px', height: '16px', background: '#4A148C', borderRadius: '50%' }} />
            ))}
          </div>
          <ElementoClicavel onClick={() => handleAvancar(7)} mostrarSeta={false}>
            <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 48px', borderRadius: '16px', fontWeight: '800', fontSize: '18px', cursor: 'pointer' }}>
              OK
            </button>
          </ElementoClicavel>
        </div>
      )}

      {/* Passo 7: Sucesso */}
      {passo === 7 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle2 size={64} color="#27AE60" style={{ margin: '0 auto 16px' }} />
          </motion.div>
          <p style={{ fontWeight: '900', fontSize: '22px', color: '#27AE60', marginBottom: '16px', margin: '0 0 16px' }}>Pagamento realizado!</p>
          <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '24px', width: '100%', maxWidth: '320px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Valor</span>
                <span style={{ fontWeight: '900', color: '#1E8449' }}>R$ 45,80</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Data</span>
                <span style={{ fontWeight: '700' }}>Hoje</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <FileCheck size={14} color="#27AE60" /> Comprovante disponível
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
            <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="#fff" /> Ver Comprovante
            </button>
          </ElementoClicavel>
        </div>
      )}
    </SimuladorImersivo>
  );
}