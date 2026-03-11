import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [digitando, setDigitando] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
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

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-32 h-32 rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer mb-4">
                <span className="text-7xl">🤖</span>
              </div>
            </ElementoClicavel>
            <p className="text-2xl font-black text-gray-800 text-center">Assistente IA</p>
            <p className="text-sm text-gray-600 text-center mt-2">Toque para abrir</p>
          </motion.div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <p className="font-black text-lg">Assistente IA</p>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-b from-purple-50 to-white p-4 flex flex-col justify-center">
            <div className="bg-white rounded-2xl p-5 shadow-lg max-w-[85%] mb-4">
              <p className="text-gray-800 font-semibold">Olá! Como posso te ajudar hoje? 😊</p>
            </div>
            <ElementoClicavel onClick={() => {
              setDigitando(true);
              setTimeout(() => handleAvancar(3), 1500);
            }} posicao="bottom">
              <div className="bg-purple-100 rounded-2xl p-4 max-w-[85%] ml-auto cursor-pointer border-2 border-purple-300">
                {!digitando ? (
                  <p className="text-gray-600 italic">Toque para perguntar...</p>
                ) : (
                  <p className="text-gray-800 font-semibold">Qual é um remédio caseiro para dor de cabeça?</p>
                )}
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <p className="font-black text-lg">Assistente IA</p>
              <p className="text-xs opacity-90">Digitando...</p>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-b from-purple-50 to-white p-4 space-y-4 overflow-auto">
            <div className="bg-purple-100 rounded-2xl p-4 max-w-[85%] ml-auto">
              <p className="text-gray-800 font-semibold">Qual é um remédio caseiro para dor de cabeça?</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-lg max-w-[90%]"
            >
              <p className="text-gray-800 font-semibold mb-3">🌿 Para dor de cabeça leve você pode:</p>
              <div className="space-y-2 ml-4">
                <p className="text-gray-700">☕ Chá de gengibre com limão</p>
                <p className="text-gray-700">🧊 Compressa fria na testa</p>
                <p className="text-gray-700">😴 Descanso em ambiente escuro</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-3 rounded">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Importante:</strong> Se a dor persistir, consulte um médico!
                </p>
              </div>
            </motion.div>
            <div className="flex justify-center">
              <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  💬 Fazer outra pergunta
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <p className="font-black text-lg">Assistente IA</p>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-b from-purple-50 to-white p-4 space-y-4 overflow-auto flex flex-col justify-center">
            <div className="bg-purple-100 rounded-2xl p-4 max-w-[85%] ml-auto">
              <p className="text-gray-800 font-semibold">Me conta uma piada engraçada! 😄</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-lg max-w-[90%]"
            >
              <div className="text-center mb-3">
                <span className="text-4xl">😂</span>
              </div>
              <p className="text-gray-800 font-semibold text-center">
                Por que o livro de matemática estava triste?
              </p>
              <p className="text-gray-700 text-center mt-2 text-lg">
                Porque tinha muitos problemas!
              </p>
            </motion.div>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 max-w-md mx-auto">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="font-bold text-blue-700 mb-1">Lembre-se:</p>
                  <p className="text-sm text-gray-700">A IA pode errar! Sempre confirme informações importantes.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
                <button className="bg-gradient-to-r from-[#922B21] to-[#E59866] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
                  ✅ Entendi!
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}