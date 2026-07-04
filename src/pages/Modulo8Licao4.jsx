import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Ban, Phone, PhoneOff, Trash2, Mail, MessageSquare, ShieldAlert, XCircle } from 'lucide-react';

export default function Modulo8Licao4() {
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
    navigate(createPageUrl("Modulo8Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que fazer ao receber mensagem pedindo PIX urgente?"
        opcoes={[
          "💸 Pagar logo para resolver o problema",
          "🚫 Ignorar, bloquear e nunca pagar",
          "📤 Encaminhar para os amigos verem"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  };

  const passos = [
    { instrucao: "GOLPE CLÁSSICO! Nunca ligue para números assim! Toque em ANALISAR ⚠️", audio: "Golpe clássico! Nunca ligue para números assim! Toque em analisar!" },
    { instrucao: "Viu todos os sinais? Toque em DENUNCIAR E BLOQUEAR para se proteger 🚫", audio: "Viu todos os sinais? Toque em denunciar e bloquear para se proteger!" },
    { instrucao: "Recebeu ligação suspeita do banco? DESLIGUE e ligue no número do seu cartão! 📞", audio: "Recebeu ligação suspeita do banco? Desligue e ligue no número do seu cartão!" },
    { instrucao: "E-mail suspeito! Ninguém te dá dinheiro de graça! Toque em EXCLUIR 🗑️", audio: "E-mail suspeito! Ninguém te dá dinheiro de graça! Toque em excluir!" }
  ];

  const headerSMS = (titulo, subtitulo, onBack) => (
    <div style={{ background: '#0B57D0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <ArrowLeft size={22} color="#fff" />
        </button>
      )}
      <div style={{ width: '36px', height: '36px', background: '#1B6DE0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <MessageSquare size={18} color="#fff" />
      </div>
      <div>
        <p style={{ fontWeight: '700', color: '#fff', margin: 0 }}>{titulo}</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{subtitulo}</p>
      </div>
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
      {/* Passo 1: SMS do golpe */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerSMS('Número Desconhecido', 'Mensagem')}
          <div style={{ flex: 1, background: '#E8F0FE', padding: '16px' }}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxWidth: '85%' }}
            >
              <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', color: '#C62828', fontSize: '17px', marginBottom: '8px', margin: '0 0 8px' }}>📢 URGENTE!</p>
                <p style={{ fontSize: '14px', color: '#333', marginBottom: '6px', margin: '0 0 6px' }}>Seu CPF foi bloqueado!</p>
                <p style={{ fontSize: '14px', color: '#333', marginBottom: '6px', margin: '0 0 6px' }}>Ligue AGORA: <strong>0800-123-456</strong></p>
                <p style={{ fontSize: '14px', color: '#333', margin: 0 }}>ou pague <strong style={{ color: '#C62828' }}>R$ 49,90</strong> via PIX!</p>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#E65100', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '48px' }}>
                  <AlertTriangle size={18} color="#fff" /> Analisar mensagem
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}

      {/* Passo 2: Análise - sinais de golpe */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', maxWidth: '320px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <ShieldAlert size={48} color="#C62828" style={{ margin: '0 auto' }} />
              <p style={{ fontWeight: '800', fontSize: '20px', color: '#C62828', marginTop: '8px', margin: '8px 0 0' }}>Sinais de GOLPE!</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {[
                'CPF não é bloqueado por mensagem',
                'Urgência = técnica de pressão',
                'Número desconhecido = suspeito',
                'Pedir PIX = golpe confirmado'
              ].map((texto, i) => (
                <div key={i} style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <XCircle size={20} color="#C62828" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#333', margin: 0 }}>{texto}</p>
                </div>
              ))}
            </div>
            <ElementoClicavel onClick={() => handleAvancar(3)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#C62828', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                <Ban size={20} color="#fff" /> Denunciar e Bloquear
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {/* Passo 3: Ligação suspeita */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', maxWidth: '320px', border: '2px solid #42A5F5' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                <Phone size={48} color='#1565C0' style={{ margin: '0 auto' }} />
              </motion.div>
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginTop: '8px', margin: '8px 0 0' }}>Chamada recebida</p>
            </div>
            <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px', margin: '0 0 4px' }}>Número:</p>
              <p style={{ fontWeight: '700', fontSize: '18px', color: '#1a1a1a', marginBottom: '8px', margin: '0 0 8px' }}>011-4002-8922</p>
              <p style={{ fontSize: '13px', color: '#C62828', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <AlertTriangle size={16} color="#C62828" /> Suposto banco ligando...
              </p>
            </div>
            <div style={{ background: '#FFF8E1', border: '2px solid #FFB74D', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#333', margin: 0 }}>
                💡 DICA: O número do banco fica no VERSO do seu cartão!
              </p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#C62828', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                <PhoneOff size={20} color="#fff" /> Desligar
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {/* Passo 4: E-mail de golpe */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', maxWidth: '320px', border: '2px solid #AB47BC' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <Mail size={48} color="#7B1FA2" style={{ margin: '0 auto' }} />
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginTop: '8px', margin: '8px 0 0' }}>E-mail Recebido</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFE0B2)', border: '3px solid #FFB74D', borderRadius: '16px', padding: '18px', marginBottom: '14px' }}>
              <div style={{ textAlign: 'center', fontSize: '40px', marginBottom: '8px' }}>🎁</div>
              <p style={{ fontWeight: '800', fontSize: '20px', color: '#E65100', marginBottom: '6px', textAlign: 'center', margin: '0 0 6px' }}>PARABÉNS!</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '6px', margin: '0 0 6px' }}>Você foi sorteado!</p>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#27AE60', marginBottom: '6px', margin: '0 0 6px' }}>Clique para receber R$ 5.000,00</p>
              <p style={{ fontSize: '13px', color: '#C62828', fontWeight: '700', margin: 0 }}>⏰ Oferta expira em 10 minutos!</p>
            </div>
            <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '12px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#C62828" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#C62828', margin: 0 }}>Ninguém te dá dinheiro de graça!</p>
            </div>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#424242', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                <Trash2 size={20} color="#fff" /> Excluir e-mail
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}
    </SimuladorImersivo>
  );
}