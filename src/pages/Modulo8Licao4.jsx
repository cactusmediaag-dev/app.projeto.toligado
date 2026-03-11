import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao4() {
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

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-gray-50 flex flex-col pt-8">
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl">❓</span>
            </div>
            <div>
              <p className="font-bold">Número Desconhecido</p>
              <p className="text-xs opacity-80">Mensagem</p>
            </div>
          </div>
          <div className="flex-1 bg-[#ECE5DD] p-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-5 shadow-lg max-w-[85%]"
            >
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-3">
                <p className="font-bold text-red-700 text-lg mb-2">📢 URGENTE!</p>
                <p className="text-sm text-gray-800 mb-2">Seu CPF foi bloqueado!</p>
                <p className="text-sm text-gray-800 mb-2">Ligue AGORA: <strong>0800-123-456</strong></p>
                <p className="text-sm text-gray-800">ou pague <strong className="text-red-600">R$ 49,90</strong> via PIX!</p>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
                <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
                  ⚠️ Analisar mensagem
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full"
          >
            <div className="text-center mb-4">
              <span className="text-6xl">🚨</span>
              <p className="font-black text-2xl text-red-700 mt-2">Sinais de GOLPE!</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <p className="text-sm font-bold text-gray-800">CPF não é bloqueado por mensagem</p>
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <p className="text-sm font-bold text-gray-800">Urgência = técnica de pressão</p>
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <p className="text-sm font-bold text-gray-800">Número desconhecido = suspeito</p>
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <p className="text-sm font-bold text-gray-800">Pedir PIX = golpe confirmado</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg">
                🚫 Denunciar e Bloquear
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-b from-blue-50 to-white rounded-3xl p-6 shadow-xl max-w-sm border-2 border-blue-300"
          >
            <div className="text-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl mb-2"
              >
                📞
              </motion.div>
              <p className="font-black text-xl text-gray-800">Chamada recebida</p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Número:</p>
              <p className="font-bold text-lg text-gray-800 mb-2">011-4002-8922</p>
              <p className="text-xs text-red-700 font-bold">⚠️ Suposto banco ligando...</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-gray-800">
                💡 DICA: O número do banco fica no VERSO do seu cartão!
              </p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2">
                <span className="text-2xl">🔴</span>
                Desligar
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl max-w-md border-2 border-purple-300"
          >
            <div className="text-center mb-4">
              <span className="text-6xl">📧</span>
              <p className="font-black text-xl text-gray-800 mt-2">E-mail Recebido</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-2xl p-5 mb-4">
              <div className="text-center mb-3">
                <span className="text-5xl">🎁</span>
              </div>
              <p className="font-black text-2xl text-orange-700 mb-2 text-center">PARABÉNS!</p>
              <p className="text-lg font-bold text-gray-800 mb-2">Você foi sorteado!</p>
              <p className="text-xl font-black text-green-600 mb-2">Clique para receber R$ 5.000,00</p>
              <p className="text-sm text-red-600 font-bold">⏰ Oferta expira em 10 minutos!</p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <p className="text-sm font-bold text-red-700">Ninguém te dá dinheiro de graça!</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
              <button className="w-full bg-gray-700 text-white py-4 rounded-2xl font-black shadow-lg">
                🗑️ Excluir e-mail
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}
    </SimuladorWrapper>
  );
}