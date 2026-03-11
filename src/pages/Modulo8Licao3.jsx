import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [virarCartao, setVirarCartao] = useState(false);

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
    navigate(createPageUrl("Modulo8Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que é o CVV do cartão?"
        opcoes={[
          "📅 A data de validade",
          "🔐 O código de 3 dígitos no verso — nunca compartilhe",
          "💳 O número principal do cartão"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos conhecer os números do cartão! Toque no cartão para ver os detalhes 💳", audio: "Vamos conhecer os números do cartão! Toque no cartão para ver os detalhes!" },
    { instrucao: "Esses são os números da FRENTE! Toque na DATA DE VALIDADE para saber mais 📅", audio: "Esses são os números da frente! Toque na data de validade para saber mais!" },
    { instrucao: "Esse número de 3 dígitos é o CVV! É o código secreto do cartão! Toque nele 🔐", audio: "Esse número de 3 dígitos é o CVV! É o código secreto do cartão! Toque nele!" },
    { instrucao: "Em compras online o site pede o CVV! Digite apenas em sites SEGUROS com 🔒", audio: "Em compras online o site pede o CVV! Digite apenas em sites seguros com cadeado!" },
    { instrucao: "GOLPE! O banco NUNCA pede CVV por mensagem! Toque em BLOQUEAR ⛔", audio: "Golpe! O banco nunca pede CVV por mensagem! Toque em bloquear!" }
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
          <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-72 h-44 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-5 cursor-pointer"
            >
              <div className="text-white">
                <div className="text-3xl mb-6">💳</div>
                <p className="text-2xl font-mono tracking-wider mb-3">•••• •••• •••• 1234</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70">TITULAR</p>
                    <p className="font-bold">MARIA SILVA</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">VALIDADE</p>
                    <p className="font-bold">08/28</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ElementoClicavel>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <div className="w-80 h-52 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 mb-6 relative">
            <div className="text-white">
              <div className="text-3xl mb-6">💳</div>
              <div className="relative mb-4">
                <p className="text-2xl font-mono tracking-wider bg-yellow-200 text-yellow-900 p-2 rounded">•••• •••• •••• 1234</p>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold">
                    16 dígitos
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="bg-green-200 text-green-900 p-2 rounded">
                  <p className="text-xs font-bold">TITULAR</p>
                  <p className="font-bold">MARIA SILVA</p>
                </div>
                <ElementoClicavel onClick={() => {
                  setVirarCartao(true);
                  setTimeout(() => handleAvancar(3), 1000);
                }} posicao="bottom">
                  <div className="bg-blue-200 text-blue-900 p-2 rounded cursor-pointer">
                    <p className="text-xs font-bold">VALIDADE</p>
                    <p className="font-bold">08/28</p>
                  </div>
                </ElementoClicavel>
              </div>
            </div>
          </div>
          {virarCartao && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 max-w-xs"
            >
              <p className="text-sm text-gray-700">
                <strong>📅 Data de validade:</strong> Mostra até quando o cartão é válido. 
                Ex: 08/28 = válido até agosto de 2028
              </p>
            </motion.div>
          )}
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="w-80 h-52 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl mb-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-full h-full p-6" style={{ transform: 'rotateY(180deg)' }}>
              <div className="bg-black h-12 -mx-6 mb-6"></div>
              <div className="bg-white h-10 rounded mb-4 flex items-center justify-end px-3">
                <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
                  <div className="bg-gradient-to-r from-[#922B21] to-[#E59866] text-white px-4 py-2 rounded font-mono font-bold text-lg cursor-pointer">
                    123
                  </div>
                </ElementoClicavel>
              </div>
              <p className="text-white text-xs">
                CENTRAL DE ATENDIMENTO: 0800-123-4567
              </p>
            </div>
          </motion.div>
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 max-w-xs">
            <div className="flex items-start gap-2">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="font-bold text-red-700 mb-1">CVV = Código de segurança</p>
                <p className="text-sm text-gray-700">• Usado em compras online</p>
                <p className="text-sm text-gray-700">• NUNCA compartilhe com ninguém!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-green-50 p-3 flex items-center gap-2 border-b-2 border-green-300">
            <span className="text-xl">🔒</span>
            <span className="text-sm font-bold text-green-700">https://loja-segura.com</span>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <h3 className="font-black text-2xl text-gray-800 mb-6 text-center">Finalizar Compra</h3>
            <div className="space-y-4 max-w-sm mx-auto w-full">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Número do Cartão</label>
                <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-xl" value="•••• •••• •••• 1234" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Validade</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-xl" value="08/28" readOnly />
                </div>
                <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">CVV 🔐</label>
                    <input type="password" className="w-full p-4 border-2 border-[#922B21] rounded-xl cursor-pointer" value="123" readOnly />
                  </div>
                </ElementoClicavel>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <p className="text-sm font-bold text-green-700">CVV aceito — transação segura</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {passo === 5 && (
        <div className="w-full h-full bg-gray-50 flex flex-col pt-8">
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl">🏦</span>
            </div>
            <div>
              <p className="font-bold">Banco Tô Ligado</p>
              <p className="text-xs opacity-80">Mensagem automática</p>
            </div>
          </div>
          <div className="flex-1 bg-[#ECE5DD] p-4 flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-5 shadow-xl border-4 border-red-500"
            >
              <div className="text-center mb-4">
                <span className="text-5xl">⚠️</span>
              </div>
              <div className="bg-red-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 mb-3">
                  <strong className="text-red-700">Mensagem recebida:</strong>
                </p>
                <p className="text-sm italic text-gray-800">
                  "Olá! Sou do banco. Preciso do número do seu cartão e CVV para liberar seu limite!"
                </p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <p className="font-bold text-red-700 mb-1">ISSO É UM GOLPE!</p>
                    <p className="text-xs text-gray-700">O banco NUNCA pede CVV por mensagem!</p>
                  </div>
                </div>
              </div>
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
                <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg">
                  ⛔ Bloquear contato
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}