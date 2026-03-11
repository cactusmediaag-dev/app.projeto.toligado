import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo7Licao2() {
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

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Cena do mercadinho */}
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">🏪</div>
            <p className="font-black text-xl text-gray-800 mb-2">Mercadinho do Seu João</p>
            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <div className="w-32 h-32 bg-black mx-auto mb-3 relative">
                <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}></div>
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-600">Escaneie para pagar</p>
            </div>
          </motion.div>
          <div className="mt-6">
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg">
                Entendi! Vamos lá 👍
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 2: Câmera com QR Code */}
      {passo === 2 && (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-0 right-0 text-center">
            <p className="text-white font-bold text-sm">Aponte para o QR Code</p>
          </div>
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-48 h-48 bg-white p-4 rounded-2xl"
            >
              <div className="w-full h-full bg-black relative">
                <div className="absolute inset-3 grid grid-cols-5 grid-rows-5 gap-1">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}></div>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="absolute inset-0 border-4 border-green-400 rounded-2xl"></div>
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
          </div>
          <div className="absolute bottom-12">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-full font-black text-lg shadow-lg">
                🔍 Escanear QR Code
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 3: Dados do QR Code */}
      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-green-50 border-2 border-green-300 rounded-3xl p-6 w-full max-w-sm"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">✅</div>
              <p className="font-black text-xl text-green-700">QR Code lido!</p>
            </div>
            <div className="bg-white rounded-2xl p-4 space-y-2">
              <div>
                <p className="text-xs text-gray-500">Estabelecimento</p>
                <p className="font-bold text-gray-800">Mercadinho do Seu João</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valor</p>
                <p className="font-black text-2xl text-[#1E8449]">R$ 23,50</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Chave PIX</p>
                <p className="font-mono text-sm text-gray-700">mercadinho@email.com</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-6">
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg flex items-center gap-2">
                💚 Pagar com PIX
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {/* Passo 4: Confirmação */}
      {passo === 4 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm border-2 border-gray-200">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">💰</div>
              <p className="font-black text-lg text-gray-800">Confirmar Pagamento</p>
            </div>
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Você vai pagar</p>
                <p className="font-black text-2xl text-[#1E8449]">R$ 23,50</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Para</p>
                <p className="font-bold text-gray-800">Mercadinho do Seu João</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mb-4">Confirma?</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold">
                Cancelar
              </button>
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
                <button className="flex-1 bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white py-3 rounded-xl font-black">
                  ✅ Confirmar
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}