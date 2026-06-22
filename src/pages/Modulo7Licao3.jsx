import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo7Licao3() {
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
    navigate(createPageUrl("Modulo7Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual a vantagem do PIX?"
        opcoes={[
          "⏳ Demora 3 dias para chegar",
          "⚡ O dinheiro chega em segundos, qualquer hora do dia",
          "🏦 Só funciona dentro do banco"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O PIX é a forma mais rápida de transferir dinheiro! Toque em PIX 💸", audio: "O PIX é a forma mais rápida de transferir dinheiro! Toque em PIX!" },
    { instrucao: "Para enviar dinheiro, toque em ENVIAR PIX 📤", audio: "Para enviar dinheiro, toque em enviar PIX!" },
    { instrucao: "Digite a chave PIX de quem vai receber! Toque no campo 🔑", audio: "Digite a chave PIX de quem vai receber! Toque no campo!" },
    { instrucao: "Chave digitada! Toque em BUSCAR para encontrar o destinatário 🔍", audio: "Chave digitada! Toque em buscar para encontrar o destinatário!" },
    { instrucao: "É a pessoa certa! Agora toque no campo VALOR e digite o valor 💵", audio: "É a pessoa certa! Agora toque no campo valor e digite o valor!" },
    { instrucao: "Valor digitado! Toque em CONTINUAR para confirmar o envio ➡️", audio: "Valor digitado! Toque em continuar para confirmar o envio!" },
    { instrucao: "Confira tudo! Os dados estão certos? Toque em CONFIRMAR PIX ✅", audio: "Confira tudo! Os dados estão certos? Toque em confirmar PIX!" },
    { instrucao: "PIX enviado! O dinheiro chegou na hora! Toque em CONCLUIR 🎊", audio: "PIX enviado! O dinheiro chegou na hora! Toque em concluir!" }
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-[#1E8449] to-[#58D68D] flex flex-col pt-8">
          <div className="text-center text-white mb-6">
            <div className="text-4xl mb-2">🏦</div>
            <p className="font-black text-xl">Meu Banco</p>
          </div>
          <div className="flex-1 bg-white rounded-t-3xl p-6 space-y-3">
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">💳</span>
              <span className="font-bold text-gray-600">Pagar Conta</span>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-5 rounded-2xl flex items-center gap-4 shadow-md cursor-pointer">
                <span className="text-3xl">📲</span>
                <span className="font-black text-lg">PIX</span>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">💸</span>
              <span className="font-bold text-gray-600">Transferir</span>
            </div>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">📲</div>
            <p className="font-black text-xl text-[#1E8449]">Menu PIX</p>
          </div>
          <div className="flex-1 px-6 space-y-3">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg cursor-pointer">
                <span className="text-3xl">📤</span>
                <span className="font-black text-lg">Enviar PIX</span>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">📥</span>
              <span className="font-bold text-gray-600">Receber PIX</span>
            </div>
            <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-3xl">🔑</span>
              <span className="font-bold text-gray-600">Minhas Chaves</span>
            </div>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🔑</div>
              <p className="font-black text-xl text-gray-800">Digite a chave PIX</p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-4 cursor-pointer">
                <p className="text-gray-400 text-sm mb-2">Chave PIX</p>
                <p className="text-gray-600 font-mono">CPF, telefone, e-mail...</p>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🔍</div>
              <p className="font-black text-xl text-gray-800">Buscar destinatário</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 mb-4">
              <p className="text-gray-600 text-sm mb-1">Chave digitada</p>
              <p className="font-mono text-lg font-bold text-gray-800">(65) 99999-1234</p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
              <button className="w-full bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white py-4 rounded-2xl font-black text-lg shadow-lg">
                🔍 Buscar
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 5 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm"
          >
            <div className="bg-green-50 border-2 border-green-300 rounded-3xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E8449] to-[#58D68D] rounded-full flex items-center justify-center text-white text-xl font-black">
                  JS
                </div>
                <div>
                  <p className="font-black text-lg text-gray-800">José da Silva</p>
                  <p className="text-sm text-gray-600">Banco: Bradesco</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <span>✅</span>
                <span className="font-bold text-sm">Destinatário confirmado</span>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(6)} posicao="bottom">
              <div className="bg-gray-50 border-2 border-[#1E8449] rounded-2xl p-4 cursor-pointer">
                <p className="text-gray-600 text-sm mb-2">Valor</p>
                <p className="text-4xl font-black text-gray-400">R$ ___</p>
              </div>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {passo === 6 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-300 rounded-3xl p-5 mb-6">
              <p className="text-sm text-gray-600 mb-1">Para: José da Silva</p>
              <p className="text-5xl font-black text-[#1E8449] mb-2">R$ 50,00</p>
              <p className="text-xs text-gray-500">Chave: (65) 99999-1234</p>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(7)} posicao="bottom">
              <button className="w-full bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white py-4 rounded-2xl font-black text-lg shadow-lg">
                ➡️ Continuar
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 7 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📋</div>
              <p className="font-black text-xl text-gray-800">Resumo do PIX</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-5 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Para</span>
                <span className="font-bold">José da Silva</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor</span>
                <span className="font-black text-xl text-[#1E8449]">R$ 50,00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Chave</span>
                <span className="font-mono text-gray-700">(65) 99999-1234</span>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(8)} posicao="bottom">
              <button className="w-full bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white py-4 rounded-2xl font-black text-lg shadow-lg">
                ✅ Confirmar PIX
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 8 && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>
          <p className="font-black text-2xl text-[#1E8449] mb-2">PIX enviado!</p>
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 w-full max-w-sm border-2 border-green-200">
            <div className="text-center space-y-2">
              <p className="text-3xl font-black text-[#1E8449]">R$ 50,00</p>
              <p className="text-gray-700 font-bold">para José da Silva</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-2xl">⚡</span>
                <p className="text-sm text-gray-600 font-semibold">Em menos de 1 segundo!</p>
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
              🎊 Concluir
            </button>
          </ElementoClicavel>
        </div>
      )}
    </SimuladorImersivo>
  );
}