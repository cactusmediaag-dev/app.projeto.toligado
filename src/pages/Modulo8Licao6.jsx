import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao6() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [cartaoBloqueado, setCartaoBloqueado] = useState(false);

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
    navigate(createPageUrl("Modulo8Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer ao ver uma compra estranha no cartão?"
        opcoes={[
          "🤷 Ignorar e esperar",
          "🚨 Contestar no app do banco e bloquear o cartão",
          "💸 Pagar e não reclamar"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Essa é sua fatura! NUNCA pague só o mínimo! Toque para entender o porquê ⚠️", audio: "Essa é sua fatura! Nunca pague só o mínimo! Toque para entender o porquê!" },
    { instrucao: "Entendeu? Os juros são perigosos! Toque em PAGAR TOTAL para fazer certo 💚", audio: "Entendeu? Os juros são perigosos! Toque em pagar total para fazer certo!" },
    { instrucao: "Na maquininha: DÉBITO sai da conta na hora. CRÉDITO é uma dívida! Toque em DÉBITO 💙", audio: "Na maquininha: débito sai da conta na hora. Crédito é uma dívida! Toque em débito!" },
    { instrucao: "Na maquininha, CUBRA os números ao digitar a senha! Toque em COBRIR 🤚", audio: "Na maquininha, cubra os números ao digitar a senha! Toque em cobrir!" },
    { instrucao: "Uma compra estranha! Horário suspeito! Toque em CONTESTAR para reclamar 🚨", audio: "Uma compra estranha! Horário suspeito! Toque em contestar para reclamar!" },
    { instrucao: "Você pode BLOQUEAR seu cartão pelo app se perder ou suspeitar de golpe! Toque 🔒", audio: "Você pode bloquear seu cartão pelo app se perder ou suspeitar de golpe! Toque!" }
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {passo === 1 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">💳</div>
            <p className="font-black text-xl text-[#922B21]">Fatura do Cartão</p>
          </div>
          <div className="flex-1 px-6">
            <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-3xl p-6 cursor-pointer">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Fatura atual</p>
                    <p className="text-4xl font-black text-[#922B21]">R$ 340,00</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Vencimento</p>
                      <p className="font-bold text-gray-800">20/08/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Pagamento mínimo</p>
                      <p className="font-bold text-orange-600">R$ 34,00 ⚠️</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-red-100 border-2 border-red-400 rounded-xl p-3">
                  <p className="text-sm font-bold text-red-700">⚠️ Por que não pagar o mínimo?</p>
                </div>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md"
          >
            <div className="text-center mb-6">
              <span className="text-6xl">😱</span>
              <p className="font-black text-2xl text-red-700 mt-2">Cuidado com os juros!</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-300 mb-6">
              <p className="font-bold text-gray-800 mb-4">Se você pagar só R$ 34,00 (mínimo):</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <p className="text-sm text-gray-700">Juros de <strong className="text-red-600">15% ao mês!</strong></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">😱</span>
                  <p className="text-sm text-gray-700">R$ 340,00 vira <strong className="text-red-600">R$ 680,00</strong> em 6 meses!</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm text-gray-700">Pague sempre o valor <strong className="text-green-600">TOTAL!</strong></p>
                </div>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-black shadow-lg">
                💚 Pagar valor total
              </button>
            </ElementoClicavel>
          </motion.div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm">
            <div className="text-center mb-4">
              <span className="text-6xl">💳</span>
              <p className="font-black text-xl text-gray-800 mt-2">Forma de Pagamento</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4 mb-4">
              <p className="text-center font-bold text-2xl text-gray-800">R$ 50,00</p>
              <p className="text-center text-sm text-gray-600">Mercadinho do Seu João</p>
            </div>
            <div className="space-y-3">
              <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
                <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2">
                  <span className="text-2xl">💙</span>
                  Débito
                </button>
              </ElementoClicavel>
              <button className="w-full bg-gray-300 text-gray-700 py-4 rounded-2xl font-bold">
                💳 Crédito
              </button>
            </div>
            <div className="mt-4 bg-blue-50 border-2 border-blue-300 rounded-xl p-3">
              <p className="text-xs text-gray-700">
                <strong>✅ Débito:</strong> Mais seguro — não gera dívida!
              </p>
            </div>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm">
            <div className="text-center mb-4">
              <span className="text-5xl">🔐</span>
              <p className="font-black text-xl text-gray-800 mt-2">Digite sua senha</p>
            </div>
            <div className="bg-gray-200 rounded-2xl p-6 mb-4 relative">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1,2,3,4,5,6,7,8,9,'',0,'OK'].map((n, i) => (
                  <div key={i} className={`${n ? 'bg-gray-600' : 'bg-transparent'} h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {n}
                  </div>
                ))}
              </div>
              <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-blue-500/20 rounded-2xl flex items-center justify-center cursor-pointer"
                >
                  <div className="text-8xl">🤚</div>
                </motion.div>
              </ElementoClicavel>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3">
              <p className="text-xs text-gray-700">
                <strong>✅ Sempre cubra!</strong> Protege contra câmeras e espiões!
              </p>
            </div>
          </div>
        </div>
      )}

      {passo === 5 && (
        <div className="w-full h-full bg-white flex flex-col pt-8">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-black text-xl text-[#922B21]">Extrato do Cartão</p>
          </div>
          <div className="flex-1 px-6 space-y-3">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-700">Mercadinho João</p>
                  <p className="text-sm text-gray-500">15/08 - 14:30</p>
                </div>
                <p className="font-bold text-red-600">-R$ 32,50</p>
              </div>
            </div>
            <ElementoClicavel onClick={() => handleAvancar(6)} posicao="bottom">
              <div className="bg-red-50 border-4 border-red-400 rounded-2xl p-4 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      <p className="font-bold text-red-700">Loja Desconhecida</p>
                    </div>
                    <p className="text-sm text-red-600">15/08 - 03:14 (madrugada!)</p>
                  </div>
                  <p className="font-black text-xl text-red-600">-R$ 89,90</p>
                </div>
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-2">
                  <p className="text-xs font-bold text-gray-800">🚨 Compra suspeita! Toque para contestar</p>
                </div>
              </div>
            </ElementoClicavel>
          </div>
        </div>
      )}

      {passo === 6 && (
        <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-300 mb-4">
              <div className="text-center mb-4">
                <span className="text-5xl">🔒</span>
                <p className="font-black text-xl text-gray-800 mt-2">Controle do Cartão</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800">Status do cartão</p>
                    <p className="text-sm text-gray-600">{cartaoBloqueado ? 'Bloqueado' : 'Ativo'}</p>
                  </div>
                  <ElementoClicavel onClick={() => {
                    setCartaoBloqueado(true);
                    setTimeout(() => setMostrarValidacao(true), 1500);
                  }} posicao="right">
                    <div className={`w-16 h-8 rounded-full cursor-pointer transition-all ${cartaoBloqueado ? 'bg-red-500' : 'bg-gray-300'} flex items-center p-1`}>
                      <div className={`w-6 h-6 bg-white rounded-full transition-all ${cartaoBloqueado ? 'translate-x-8' : 'translate-x-0'}`}></div>
                    </div>
                  </ElementoClicavel>
                </div>
              </div>
              {cartaoBloqueado && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-300 rounded-xl p-4"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <p className="font-bold text-red-700 mb-1">Cartão bloqueado!</p>
                      <p className="text-sm text-gray-700">Nenhuma compra pode ser feita agora.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="text-xs text-gray-700">
                💡 <strong>Dica:</strong> Bloqueie o cartão imediatamente se suspeitar de golpe ou perda!
              </p>
            </div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}