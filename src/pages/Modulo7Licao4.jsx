import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo7Licao4() {
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
    navigate(createPageUrl("Modulo7Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você paga um boleto pelo celular?"
        opcoes={[
          "✉️ Enviando o boleto pelo correio",
          "📷 Escaneando o código de barras no app do banco",
          "🏃 Indo pessoalmente ao banco"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Boleto é uma forma de pagamento muito comum! Vamos aprender a pagar 📄", audio: "Boleto é uma forma de pagamento muito comum! Vamos aprender a pagar!" },
    { instrucao: "Você pode escanear ou digitar o código! Toque em ESCANEAR para usar a câmera 📷", audio: "Você pode escanear ou digitar o código! Toque em escanear para usar a câmera!" },
    { instrucao: "Enquadre o código de barras do boleto na câmera! Toque em LER 📄", audio: "Enquadre o código de barras do boleto na câmera! Toque em ler!" },
    { instrucao: "Dados do boleto lidos! Confira e toque em PAGAR para quitar 💊", audio: "Dados do boleto lidos! Confira e toque em pagar para quitar!" },
    { instrucao: "Boleto pago! Sempre guarde o comprovante! Toque em SALVAR 🧾", audio: "Boleto pago! Sempre guarde o comprovante! Toque em salvar!" }
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-gradient-to-b from-[#1E8449] to-[#58D68D] flex flex-col pt-8">
          <div className="text-center text-white mb-6">
            <div className="text-4xl mb-2">🏦</div>
            <p className="font-black text-xl">Meu Banco</p>
          </div>
          <div className="flex-1 bg-white rounded-t-3xl p-6 space-y-3">
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-5 rounded-2xl flex items-center gap-4 shadow-md cursor-pointer">
                <span className="text-3xl">💳</span>
                <span className="font-black text-lg">Pagar Boleto</span>
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
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💳</div>
            <p className="font-black text-xl text-[#1E8449]">Pagar Boleto</p>
          </div>
          <div className="flex-1 px-6 space-y-4">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <div className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white p-6 rounded-2xl flex items-center gap-4 shadow-lg cursor-pointer">
                <span className="text-4xl">📷</span>
                <div>
                  <p className="font-black text-lg">Escanear código de barras</p>
                  <p className="text-sm opacity-90">Use a câmera</p>
                </div>
              </div>
            </ElementoClicavel>
            <div className="bg-gray-100 p-6 rounded-2xl flex items-center gap-4 opacity-50">
              <span className="text-4xl">⌨️</span>
              <div>
                <p className="font-bold text-gray-600">Digitar linha digitável</p>
                <p className="text-sm text-gray-500">Digite manualmente</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-0 right-0 text-center">
            <p className="text-white font-bold text-sm">Enquadre o código de barras</p>
          </div>
          <div className="relative">
            <motion.div
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white p-8 rounded-2xl"
            >
              <div className="text-center mb-4">
                <p className="text-xs text-gray-600 mb-2">FARMÁCIA POPULAR</p>
                <p className="text-sm font-bold text-gray-800">R$ 120,00</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-2 bg-black w-56"></div>
                <div className="h-2 bg-black w-40"></div>
                <div className="h-2 bg-black w-56"></div>
                <div className="h-2 bg-black w-48"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Vencimento: 18/08/2025</p>
            </motion.div>
            <div className="absolute inset-0 border-4 border-red-500 rounded-2xl"></div>
          </div>
          <div className="absolute bottom-12">
            <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-full font-black text-lg shadow-lg">
                📄 Ler Boleto
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-green-50 border-2 border-green-300 rounded-3xl p-6 w-full max-w-sm"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">✅</div>
              <p className="font-black text-xl text-green-700">Boleto identificado!</p>
            </div>
            <div className="bg-white rounded-2xl p-4 space-y-2">
              <div>
                <p className="text-xs text-gray-500">Beneficiário</p>
                <p className="font-bold text-gray-800">Farmácia Popular</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valor</p>
                <p className="font-black text-2xl text-[#1E8449]">R$ 120,00</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vencimento</p>
                <p className="font-bold text-gray-800">18/08/2025</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-6">
            <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
              <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg">
                💳 Pagar
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 5 && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>
          <p className="font-black text-2xl text-[#1E8449] mb-2">Boleto pago!</p>
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 w-full max-w-sm border-2 border-green-200">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Farmácia Popular</span>
                <span className="font-black text-[#1E8449]">R$ 120,00</span>
              </div>
              <div className="border-t pt-2">
                <p className="text-xs text-gray-500">Comprovante</p>
                <p className="font-mono text-sm text-gray-700">#2025081500045</p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-2">
                <p className="text-xs text-green-700 font-bold">✅ Pagamento confirmado</p>
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#1E8449] to-[#58D68D] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
              💾 Salvar Comprovante
            </button>
          </ElementoClicavel>
        </div>
      )}
    </SimuladorImersivo>
  );
}