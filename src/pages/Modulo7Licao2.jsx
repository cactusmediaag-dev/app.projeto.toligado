import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2, Zap, Camera } from 'lucide-react';

const QR_PATTERN = [
  1,1,1,0,1,0,1,1,1,
  1,0,0,1,0,1,1,0,1,
  1,0,1,0,1,0,0,0,1,
  0,1,0,1,1,0,1,1,0,
  1,0,1,0,0,1,0,0,1,
  0,1,0,1,0,1,1,0,0,
  1,0,1,0,1,0,0,1,1,
  1,0,0,1,0,1,1,0,1,
  1,1,1,0,1,0,1,1,1,
];

export default function Modulo7Licao2() {
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
    navigate(createPageUrl("Modulo7Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você faz com o QR Code para pagar?"
        opcoes={[
          "🖨️ Imprime e leva ao banco",
          "📱 Aponta a câmera e o app lê os dados automaticamente",
          "📞 Liga para o número do QR Code"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O QR Code é um quadradinho que guarda informações! Vamos aprender a usar 📱",
      audio: "O QR Code é um quadradinho que guarda informações! Vamos aprender a usar!"
    },
    {
      instrucao: "Aponte a câmera para o QR Code! Toque em ESCANEAR para ler 🔍",
      audio: "Aponte a câmera para o QR Code! Toque em escanear para ler!"
    },
    {
      instrucao: "QR Code lido! Os dados vieram automaticamente. Toque em PAGAR COM PIX 💚",
      audio: "QR Code lido! Os dados vieram automaticamente. Toque em pagar com PIX!"
    },
    {
      instrucao: "Confirme o pagamento! Toque em CONFIRMAR para pagar ✅",
      audio: "Confirme o pagamento! Toque em confirmar para pagar!"
    }
  ];

  const renderQR = (size = 144) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '2px', width: `${size}px`, height: `${size}px` }}>
      {QR_PATTERN.map((v, i) => (
        <div key={i} style={{ background: v ? '#000' : '#fff' }} />
      ))}
    </div>
  );

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Cena do mercadinho */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', background: '#FFF8E1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <QrCode size={40} color="#F57F17" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '16px', margin: '0 0 16px' }}>Mercadinho do Seu João</p>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {renderQR(144)}
              </div>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#666' }}>Escaneie para pagar</p>
            </div>
          </motion.div>
          <div style={{ marginTop: '24px' }}>
            <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
              <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(74,20,140,0.4)' }}>
                Entendi! Vamos lá
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 2: Câmera com QR Code */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '32px', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Aponte para o QR Code</p>
          </div>
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: '#fff', padding: '16px', borderRadius: '16px' }}
            >
              {renderQR(176)}
            </motion.div>
            <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '28px', height: '28px', borderTop: '4px solid #4A148C', borderLeft: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '28px', height: '28px', borderTop: '4px solid #4A148C', borderRight: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '28px', height: '28px', borderBottom: '4px solid #4A148C', borderLeft: '4px solid #4A148C' }} />
            <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '28px', height: '28px', borderBottom: '4px solid #4A148C', borderRight: '4px solid #4A148C' }} />
            <motion.div
              animate={{ y: [-70, 70] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: '8px', right: '8px', top: '50%', height: '2px', background: '#EF4444' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '32px' }}>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <button style={{ background: '#4A148C', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '999px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={22} color="#fff" /> Escanear QR Code
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 3: Dados do QR Code */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '320px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <CheckCircle2 size={40} color="#27AE60" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1E8449', margin: 0 }}>QR Code lido!</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Estabelecimento</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Mercadinho do Seu João</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Valor</p>
                <p style={{ fontWeight: '900', fontSize: '28px', color: '#1E8449', margin: 0 }}>R$ 23,50</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Chave PIX</p>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#444', margin: 0 }}>mercadinho@email.com</p>
              </div>
            </div>
          </motion.div>
          <div style={{ marginTop: '24px' }}>
            <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
              <button style={{ background: '#27AE60', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', minHeight: '56px' }}>
                <Zap size={22} color="#fff" /> Pagar com PIX
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 4: Confirmação */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '320px', border: '2px solid #e0e0e0' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Zap size={36} color="#27AE60" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', margin: 0 }}>Confirmar Pagamento</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Você vai pagar</p>
                <p style={{ fontWeight: '900', fontSize: '30px', color: '#1E8449', margin: 0 }}>R$ 23,50</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Para</p>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Mercadinho do Seu João</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '16px', margin: '0 0 16px' }}>Confirma?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, background: '#e0e0e0', color: '#666', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'default' }}>
                Cancelar
              </button>
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
                <button style={{ flex: 1, background: '#27AE60', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', minHeight: '48px' }}>
                  Confirmar
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}