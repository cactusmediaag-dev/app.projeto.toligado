import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
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
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-[#922B21] to-[#E59866] flex flex-col pt-8">
          <div className="text-center text-white mb-4">
            <div className="text-4xl mb-2">🏦</div>
            <p className="font-black text-xl">Banco Tô Ligado</p>
          </div>
          <div className="bg-white rounded-t-3xl flex-1 p-6">
            <div className="bg-gradient-to-r from-[#922B21] to-[#E59866] text-white rounded-2xl p-5 mb-4">
              <p className="text-sm opacity-90 mb-1">Saldo disponível</p>
              <p className="text-4xl font-black">R$ 850,00</p>
            </div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 mb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">💚</span>
                <div>
                  <p className="font-bold text-green-700">Você recebeu</p>
                  <p className="text-xl font-black text-green-800">R$ 200,00</p>
                  <p className="text-sm text-gray-600">de João Silva</p>
                </div>
              </div>
            </motion.div>
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#922B21] to-[#E59866] text-white p-5 rounded-2xl flex items-center gap-4 shadow-md cursor-pointer">
                <span className="text-3xl">📊</span>
                <span className="font-black text-lg">Extrato</span>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-black text-xl text-[#922B21]">Extrato</p>
          </div>
          <div className="flex-1 px-6 space-y-3 overflow-auto">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-bold text-green-700">PIX recebido</p>
                      <p className="text-sm text-gray-600">João Silva</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-green-700">+R$ 200,00</p>
                    <p className="text-xs text-gray-500">14:22</p>
                  </div>
                </div>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-gray-700">Conta água</p>
                    <p className="text-sm text-gray-500">SANEMAT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">-R$ 45,80</p>
                  <p className="text-xs text-gray-500">13/08</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-gray-700">Mercadinho João</p>
                    <p className="text-sm text-gray-500">PIX</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">-R$ 32,50</p>
                  <p className="text-xs text-gray-500">12/08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-green-300 rounded-3xl p-6 w-full max-w-sm shadow-xl"
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">💚</div>
              <p className="font-black text-2xl text-green-700">PIX Recebido</p>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-500">De</p>
                <p className="font-bold text-gray-800">João Silva</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valor</p>
                <p className="font-black text-3xl text-green-700">R$ 200,00</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Mensagem</p>
                <p className="font-semibold text-gray-700">Obrigado pela ajuda! 😊</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Data</p>
                <p className="font-bold text-gray-800">15/08/2025 às 14:22</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ID</p>
                <p className="font-mono text-sm text-gray-600">PIX20240815002</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <button className="w-full bg-gradient-to-r from-[#922B21] to-[#E59866] text-white py-4 rounded-2xl font-black shadow-lg">
                📤 Compartilhar Comprovante
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-gray-50 flex flex-col pt-8">
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="left">
              <span className="text-2xl cursor-pointer">⬅️</span>
            </ElementoClicavel>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-black">
              JS
            </div>
            <div>
              <p className="font-bold">João Silva</p>
              <p className="text-xs opacity-80">online</p>
            </div>
          </div>
          <div className="flex-1 bg-[#ECE5DD] p-4 space-y-3">
            <div className="bg-white rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-700">Oi! Conseguiu ver o PIX?</p>
              <p className="text-xs text-gray-400 text-right mt-1">14:20</p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#DCF8C6] rounded-lg p-3 max-w-[80%] ml-auto"
            >
              <div className="bg-white rounded-lg p-3 mb-2">
                <div className="text-center">
                  <div className="text-3xl mb-1">💚</div>
                  <p className="font-bold text-green-700">PIX Recebido</p>
                  <p className="text-2xl font-black text-green-700">R$ 200,00</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">Sim! Recebi sim! 😊</p>
              <p className="text-xs text-gray-600 text-right mt-1">14:23 ✓✓</p>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}