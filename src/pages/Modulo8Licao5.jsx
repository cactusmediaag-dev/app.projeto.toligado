import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { Sparkles, Send, Brain, CheckCircle2 } from 'lucide-react';

export default function Modulo8Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [digitando, setDigitando] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    setDigitando(false);
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
    navigate(createPageUrl("Modulo8Licao6"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que é Inteligência Artificial?"
        opcoes={[
          "👾 Um jogo de videogame",
          "🤖 Um assistente digital que responde perguntas e ajuda nas tarefas",
          "📺 Um canal de televisão"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "A Inteligência Artificial é como um assistente muito inteligente! Toque para abrir 🤖", audio: "A Inteligência Artificial é como um assistente muito inteligente! Toque para abrir!" },
    { instrucao: "Você pode PERGUNTAR qualquer coisa! Toque no campo e veja a mágica 💬", audio: "Você pode perguntar qualquer coisa! Toque no campo e veja a mágica!" },
    { instrucao: "Viu como ela responde rápido? Toque em FAZER OUTRA PERGUNTA 💬", audio: "Viu como ela responde rápido? Toque em fazer outra pergunta!" },
    { instrucao: "Ela até conta piadas! Mas lembre: a IA pode errar! Sempre confirme informações 🧠", audio: "Ela até conta piadas! Mas lembre, a IA pode errar! Sempre confirme informações!" }
  ];

  const headerIA = (status) => (
    <div style={{ background: 'linear-gradient(135deg, #1565C0, #7B1FA2)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Sparkles size={22} color="#fff" />
      </div>
      <div>
        <p style={{ fontWeight: '800', fontSize: '17px', color: '#fff', margin: 0 }}>Assistente IA</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>{status}</p>
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
      {/* Passo 1: Ícone do app IA */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', background: 'linear-gradient(180deg, #E8F0FE, #F3E5F5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
              <div style={{ background: 'linear-gradient(135deg, #1565C0, #7B1FA2)', width: '120px', height: '120px', borderRadius: '28px', boxShadow: '0 12px 40px rgba(123,31,162,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '16px' }}>
                <Sparkles size={56} color="#fff" />
              </div>
            </ElementoClicavel>
            <p style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', textAlign: 'center', margin: 0 }}>Assistente IA</p>
            <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '6px', margin: '6px 0 0' }}>Toque para abrir</p>
          </motion.div>
        </div>
      )}

      {/* Passo 2: Chat - pergunta do usuário */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerIA('Online')}
          <div style={{ flex: 1, background: 'linear-gradient(180deg, #E8F0FE, #fff)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Resposta da IA - balão esquerda */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', maxWidth: '85%', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', alignSelf: 'flex-start' }}>
              <Sparkles size={18} color="#7B1FA2" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: '#333', fontWeight: '600', margin: 0 }}>Olá! Como posso te ajudar hoje? 😊</p>
            </div>
            {/* Campo de pergunta - balão direita */}
            <ElementoClicavel onClick={() => {
              setDigitando(true);
              setTimeout(() => handleAvancar(3), 1500);
            }} mostrarSeta={false}>
              <div style={{ background: '#E3F2FD', borderRadius: '16px', padding: '14px', maxWidth: '85%', cursor: 'pointer', border: '2px solid #42A5F5', alignSelf: 'flex-end' }}>
                {!digitando ? (
                  <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>Toque para perguntar...</p>
                ) : (
                  <p style={{ color: '#1a1a1a', fontWeight: '600', margin: 0 }}>Qual é um remédio caseiro para dor de cabeça?</p>
                )}
              </div>
            </ElementoClicavel>
          </div>
          {/* Campo de digitação */}
          <div style={{ background: '#fff', padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ flex: 1, background: '#f5f5f5', borderRadius: '20px', padding: '10px 16px' }}>
              <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>Digite sua pergunta...</p>
            </div>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #1565C0, #7B1FA2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} color="#fff" />
            </div>
          </div>
        </div>
      )}

      {/* Passo 3: Resposta da IA */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerIA('Digitando...')}
          <div style={{ flex: 1, background: 'linear-gradient(180deg, #E8F0FE, #fff)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
            {/* Pergunta do usuário - direita */}
            <div style={{ background: '#E3F2FD', borderRadius: '16px', padding: '14px', maxWidth: '85%', alignSelf: 'flex-end' }}>
              <p style={{ color: '#1a1a1a', fontWeight: '600', margin: 0 }}>Qual é um remédio caseiro para dor de cabeça?</p>
            </div>
            {/* Resposta da IA - esquerda */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', maxWidth: '90%', display: 'flex', alignItems: 'flex-start', gap: '8px', alignSelf: 'flex-start' }}>
              <Sparkles size={18} color="#7B1FA2" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ color: '#333', fontWeight: '600', marginBottom: '10px', margin: '0 0 10px' }}>🌿 Para dor de cabeça leve você pode:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '4px' }}>
                  <p style={{ color: '#444', margin: 0 }}>☕ Chá de gengibre com limão</p>
                  <p style={{ color: '#444', margin: 0 }}>🧊 Compressa fria na testa</p>
                  <p style={{ color: '#444', margin: 0 }}>😴 Descanso em ambiente escuro</p>
                </div>
                <div style={{ background: '#FFF8E1', borderLeft: '4px solid #FFB74D', padding: '10px', marginTop: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>
                    <strong>⚠️ Importante:</strong> Se a dor persistir, consulte um médico!
                  </p>
                </div>
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
                <button style={{ background: 'linear-gradient(135deg, #1565C0, #7B1FA2)', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '999px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(123,31,162,0.3)' }}>
                  Fazer outra pergunta
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Piada + aviso */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {headerIA('Online')}
          <div style={{ flex: 1, background: 'linear-gradient(180deg, #E8F0FE, #fff)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
            {/* Pergunta do usuário */}
            <div style={{ background: '#E3F2FD', borderRadius: '16px', padding: '14px', maxWidth: '85%', alignSelf: 'flex-end' }}>
              <p style={{ color: '#1a1a1a', fontWeight: '600', margin: 0 }}>Me conta uma piada engraçada! 😄</p>
            </div>
            {/* Resposta da IA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', maxWidth: '90%', display: 'flex', alignItems: 'flex-start', gap: '8px', alignSelf: 'flex-start' }}>
              <Sparkles size={18} color="#7B1FA2" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ color: '#333', fontWeight: '600', textAlign: 'center', margin: 0 }}>Por que o livro de matemática estava triste?</p>
                <p style={{ color: '#444', textAlign: 'center', marginTop: '8px', fontSize: '18px', fontWeight: '700', margin: '8px 0 0' }}>Porque tinha muitos problemas!</p>
              </div>
            </motion.div>
            {/* Aviso */}
            <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
              <Brain size={22} color="#1565C0" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: '700', color: '#1565C0', marginBottom: '2px', margin: '0 0 2px' }}>Lembre-se:</p>
                <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>A IA pode errar! Sempre confirme informações importantes.</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
                <button style={{ background: 'linear-gradient(135deg, #1565C0, #7B1FA2)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#fff" /> Entendi!
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}