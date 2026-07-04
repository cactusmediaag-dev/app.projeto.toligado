import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const SOM_CLIQUE = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp';

export default function Modulo9Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [menuAberto, setMenuAberto] = useState(false);
  const [ondeVotarAberto, setOndeVotarAberto] = useState(false);
  const [enderecoTocado, setEnderecoTocado] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio(SOM_CLIQUE);
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
    navigate(createPageUrl("Modulo9Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que o e-Título mostra em ONDE VOTAR?"
        opcoes={[
          "🏫 O endereço do local de votação, zona e seção ✅",
          "📺 Os candidatos da eleição",
          "🚌 O horário do ônibus",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos descobrir onde você vota! Toque em MAIS OPÇÕES no menu ☰", audio: "Vamos descobrir onde você vota! Toque em mais opções no menu!" },
    { instrucao: "Toque em ONDE VOTAR 📍", audio: "Toque em onde votar!" },
    { instrucao: "Olha aí! O endereço da sua escola, a zona e a seção! Toque no endereço 🏫", audio: "Olha aí! O endereço da sua escola, a zona e a seção! Toque no endereço!" },
    { instrucao: "E aqui mostra que sua situação está REGULAR. Tudo em dia! Toque em ✅", audio: "E aqui mostra que sua situação está regular. Tudo em dia! Toque em confirmar!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header e-Título com botão de menu */}
      <div style={{ background: '#1E5A9C', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🗳️</span>
          <div>
            <h2 style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '20px' }}>e-Título</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Justiça Eleitoral</p>
          </div>
        </div>
        {passo === 1 && !menuAberto && (
          <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setMenuAberto(true))} mostrarSeta={false} posicao="bottom">
            <span style={{ color: '#fff', fontSize: '28px' }}>☰</span>
          </ElementoClicavel>
        )}
        {menuAberto && (
          <span style={{ color: '#fff', fontSize: '28px' }}>☰</span>
        )}
      </div>

      {/* Passo 1: Tela principal do e-Título (sem menu aberto) */}
      {!menuAberto && !ondeVotarAberto && (
        <div className="flex-1 bg-gray-50 p-6">
          <div className="bg-white rounded-2xl shadow p-6 mb-4" style={{ border: '2px solid #1E5A9C' }}>
            <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>Olá,</p>
            <p className="font-bold mb-4" style={{ fontSize: '20px', color: '#1E5A9C' }}>Maria Silva Santos</p>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#E8F5E9' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <p style={{ fontSize: '16px', color: '#2E7D32', fontWeight: '700' }}>Situação: REGULAR</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>Toque no menu ☰ para mais opções</p>
          </div>
        </div>
      )}

      {/* Passo 2: Menu aberto */}
      {menuAberto && !ondeVotarAberto && (
        <div className="flex-1 bg-gray-50">
          {/* Overlay menu lateral */}
          <div className="bg-white p-4 shadow-lg" style={{ borderRight: '1px solid #eee' }}>
            <p className="font-bold text-gray-800 mb-4" style={{ fontSize: '18px' }}>Menu</p>
            <div className="space-y-2">
              {passo === 2 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setOndeVotarAberto(true))} mostrarSeta={false} posicao="right">
                  <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: '#E3F2FD', border: '2px solid #1E5A9C' }}>
                    <span style={{ fontSize: '24px' }}>📍</span>
                    <p className="font-bold" style={{ fontSize: '18px', color: '#1E5A9C' }}>Onde Votar</p>
                  </div>
                </ElementoClicavel>
              )}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f5f5f5' }}>
                <span style={{ fontSize: '24px' }}>🗳️</span>
                <p style={{ fontSize: '18px', color: '#666' }}>Meu Título</p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f5f5f5' }}>
                <span style={{ fontSize: '24px' }}>📝</span>
                <p style={{ fontSize: '18px', color: '#666' }}>Justificativa</p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f5f5f5' }}>
                <span style={{ fontSize: '24px' }}>⚙️</span>
                <p style={{ fontSize: '18px', color: '#666' }}>Configurações</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passos 3-4: Tela Onde Votar */}
      {ondeVotarAberto && (
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-5">
            <h3 className="font-bold text-gray-800 mb-4" style={{ fontSize: '20px' }}>📍 Onde Votar</h3>

            {/* Card de endereço */}
            {passo === 3 && !enderecoTocado && (
              <ElementoClicavel onClick={() => { setEnderecoTocado(true); handleCliqueCerto(4, null); }} mostrarSeta={false} posicao="bottom">
                <div className="rounded-2xl p-5 mb-4" style={{ background: '#E3F2FD', border: '2px solid #1E5A9C' }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span style={{ fontSize: '32px' }}>🏫</span>
                    <div>
                      <p className="font-bold" style={{ fontSize: '18px', color: '#1E5A9C' }}>Escola Estadual Marechal Rondon</p>
                      <p style={{ fontSize: '16px', color: '#555', marginTop: '4px' }}>Rua das Flores, 123 — Centro</p>
                      <p style={{ fontSize: '16px', color: '#555' }}>Cuiabá — MT</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: '1px solid #BBDEFB' }}>
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '14px' }}>Zona:</p>
                      <p className="font-bold" style={{ fontSize: '18px', color: '#333' }}>0001</p>
                    </div>
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '14px' }}>Seção:</p>
                      <p className="font-bold" style={{ fontSize: '18px', color: '#333' }}>0123</p>
                    </div>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            {enderecoTocado && (
              <div className="rounded-2xl p-5 mb-4" style={{ background: '#E3F2FD', border: '2px solid #1E5A9C' }}>
                <div className="flex items-start gap-3 mb-3">
                  <span style={{ fontSize: '32px' }}>🏫</span>
                  <div>
                    <p className="font-bold" style={{ fontSize: '18px', color: '#1E5A9C' }}>Escola Estadual Marechal Rondon</p>
                    <p style={{ fontSize: '16px', color: '#555', marginTop: '4px' }}>Rua das Flores, 123 — Centro</p>
                    <p style={{ fontSize: '16px', color: '#555' }}>Cuiabá — MT</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: '1px solid #BBDEFB' }}>
                  <div>
                    <p className="text-gray-500" style={{ fontSize: '14px' }}>Zona:</p>
                    <p className="font-bold" style={{ fontSize: '18px', color: '#333' }}>0001</p>
                  </div>
                  <div>
                    <p className="text-gray-500" style={{ fontSize: '14px' }}>Seção:</p>
                    <p className="font-bold" style={{ fontSize: '18px', color: '#333' }}>0123</p>
                  </div>
                </div>
              </div>
            )}

            {/* Card de situação */}
            {passo === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5 mb-4" style={{ background: '#E8F5E9', border: '2px solid #2E7D32' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontSize: '32px' }}>✅</span>
                  <div>
                    <p className="font-bold" style={{ fontSize: '18px', color: '#2E7D32' }}>Situação: REGULAR</p>
                    <p style={{ fontSize: '15px', color: '#555' }}>Seu título está em dia!</p>
                  </div>
                </div>
                <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false} posicao="top">
                  <button className="w-full py-4 rounded-xl font-bold text-white" style={{ background: '#2E7D32', minHeight: '48px', fontSize: '18px' }}>
                    ✅ Tudo certo!
                  </button>
                </ElementoClicavel>
              </motion.div>
            )}
          </div>
        </div>
      )}
      </div>
    </SimuladorImersivo>
  );
}