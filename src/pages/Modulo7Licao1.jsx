import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo7Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes('pt') && v.name.toLowerCase().includes('female'));
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

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

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={7}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Conta na mesa */}
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6"
          >
            <div className="text-6xl mb-4 text-center">💧</div>
            <div className="bg-gray-100 p-4 rounded-xl mb-3">
              <p className="text-sm font-bold text-gray-700 mb-2">CONTA DE ÁGUA</p>
              <div className="bg-white p-2 rounded">
                <div className="flex flex-col gap-1">
                  <div className="h-1 bg-black w-full"></div>
                  <div className="h-1 bg-black w-3/4"></div>
                  <div className="h-1 bg-black w-full"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Vencimento: 20/08/2025</p>
              <p className="text-lg font-black text-[#1E8449] mt-1">R$ 45,80</p>
            </div>
          </motion.div>
          <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg">
              Vamos lá! 💪
            </button>
          </ElementoClicavel>
        </div>
      )}

      {/* Passo 2: Menu do banco */}
      {passo === 2 && (
        <div className="w-full h-full bg-gradient-to-b from-[#1E8449] to-[#58D68D] flex flex-col pt-8">
          <div className="text-center text-white mb-6">
            <div className="text-4xl mb-2">🏦</div>
            <p className="font-black text-xl">Meu Banco</p>
          </div>
          <div className="flex-1 bg-white rounded-t-3xl p-6 space-y-3">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-5 rounded-2xl flex items-center gap-4 shadow-md cursor-pointer">
                <span className="text-3xl">💳</span>
                <span className="font-black text-lg">Pagar Conta</span>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">📲</span>
              <span className="font-bold text-gray-600">PIX</span>
            </div>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">💸</span>
              <span className="font-bold text-gray-600">Transferir</span>
            </div>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">📊</span>
              <span className="font-bold text-gray-600">Extrato</span>
            </div>
          </div>
        </div>
      )}

      {/* Passo 3: Opções de leitura */}
      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💳</div>
            <p className="font-black text-xl text-[#1E8449]">Pagar Conta</p>
          </div>
          <div className="flex-1 px-6 space-y-4">
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-6 rounded-2xl flex items-center gap-4 shadow-lg cursor-pointer">
                <span className="text-4xl">📷</span>
                <div>
                  <p className="font-black text-lg">Ler Código de Barras</p>
                  <p className="text-sm opacity-90">Use a câmera</p>
                </div>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-100 p-6 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-4xl">⌨️</span>
              <div>
                <p className="font-bold text-gray-600">Digitar Código</p>
                <p className="text-sm text-gray-500">Digite manualmente</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Câmera com código de barras */}
      {passo === 4 && (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-0 right-0 text-center">
            <p className="text-white font-bold text-sm">Enquadre o código de barras</p>
          </div>
          <div className="relative">
            <motion.div
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white p-6 rounded-2xl"
            >
              <div className="flex flex-col gap-1">
                <div className="h-2 bg-black w-48"></div>
                <div className="h-2 bg-black w-32"></div>
                <div className="h-2 bg-black w-48"></div>
                <div className="h-2 bg-black w-40"></div>
              </div>
            </motion.div>
            <div className="absolute inset-0 border-4 border-red-500 rounded-2xl"></div>
          </div>
          <div className="absolute bottom-12">
            <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-full font-black text-lg shadow-lg">
                🔍 Escanear
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 5: Dados lidos */}
      {passo === 5 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-green-50 border-2 border-green-300 rounded-3xl p-6 w-full max-w-sm"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">✅</div>
              <p className="font-black text-xl text-green-700">Código lido com sucesso!</p>
            </div>
            <div className="bg-white rounded-2xl p-4 space-y-2">
              <div>
                <p className="text-xs text-gray-500">Empresa</p>
                <p className="font-bold text-gray-800">SANEMAT — Água e Esgoto</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valor</p>
                <p className="font-black text-2xl text-[#1E8449]">R$ 45,80</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vencimento</p>
                <p className="font-bold text-gray-800">20/08/2025</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-6">
            <ElementoClicavel onClick={() => handleAvancar(6)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg">
                ✅ Confirmar Pagamento
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 6: Senha */}
      {passo === 6 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <p className="font-black text-xl text-gray-800">Digite sua senha</p>
            <p className="text-sm text-gray-500 mt-1">Para confirmar o pagamento</p>
          </div>
          <div className="flex gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-4 h-4 bg-[#1E8449] rounded-full"></div>
            ))}
          </div>
          <ElementoClicavel onClick={() => handleAvancar(7)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg">
              OK
            </button>
          </ElementoClicavel>
        </div>
      )}

      {/* Passo 7: Sucesso */}
      {passo === 7 && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>
          <p className="font-black text-2xl text-[#1E8449] mb-2">Pagamento realizado!</p>
          <div className="bg-white rounded-2xl p-5 shadow-lg mb-6 w-full max-w-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor</span>
                <span className="font-black text-[#1E8449]">R$ 45,80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data</span>
                <span className="font-bold">Hoje</span>
              </div>
              <div className="text-center text-xs text-gray-500 mt-3">
                ✅ Comprovante disponível
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
              🧾 Ver Comprovante
            </button>
          </ElementoClicavel>
        </div>
      )}
    </SimuladorWrapper>
  );
}