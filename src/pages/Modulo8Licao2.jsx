import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";

export default function Modulo8Licao2() {
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
    navigate(createPageUrl("Modulo8Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você sabe se um site é seguro para comprar?"
        opcoes={[
          "💰 Pelo preço baixo dos produtos",
          "🔒 Pelo cadeado na barra do navegador",
          "🎨 Pela aparência bonita do site"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos aprender a comprar com segurança na internet! Toque em COMPRAR 🛒", audio: "Vamos aprender a comprar com segurança na internet! Toque em comprar!" },
    { instrucao: "Antes de pagar, veja o CADEADO 🔒 na barra do navegador! Toque nele para ver ✅", audio: "Antes de pagar, veja o cadeado na barra do navegador! Toque nele para ver!" },
    { instrucao: "CUIDADO! Esse site é suspeito! Sem cadeado = PERIGO! Toque em SAIR ⛔", audio: "Cuidado! Esse site é suspeito! Sem cadeado significa perigo! Toque em sair!" },
    { instrucao: "Guarde essas dicas! Toque em PRÓXIMO para continuar aprendendo 👆", audio: "Guarde essas dicas! Toque em próximo para continuar aprendendo!" },
    { instrucao: "NUNCA entregue seu cartão para estranhos! Toque em RECUSAR 🚫", audio: "Nunca entregue seu cartão para estranhos! Toque em recusar!" }
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
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-gray-100 p-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">🔒 https://loja-segura.com.br</span>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
              <h3 className="font-black text-xl text-gray-800 mb-2">Smartphone XYZ</h3>
              <p className="text-gray-600 mb-3">128GB • 6GB RAM</p>
              <p className="text-3xl font-black text-[#922B21] mb-4">R$ 1.299,00</p>
              <ElementoClicavel onClick={() => handleAvancar(2)} posicao="bottom">
                <button className="w-full bg-gradient-to-r from-[#922B21] to-[#E59866] text-white py-4 rounded-2xl font-black shadow-lg">
                  🛒 Comprar
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-green-50 p-3 flex items-center gap-2 border-b-2 border-green-300">
            <ElementoClicavel onClick={() => handleAvancar(3)} posicao="bottom">
              <div className="flex items-center gap-2 cursor-pointer bg-green-100 px-3 py-2 rounded-lg">
                <span className="text-xl">🔒</span>
                <span className="text-sm font-bold text-green-700">https://loja-segura.com.br</span>
              </div>
            </ElementoClicavel>
          </div>
          <div className="flex-1 p-6">
            <h3 className="font-black text-2xl text-gray-800 mb-6">Pagamento</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Número do Cartão</label>
                <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-xl" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Validade</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-xl" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">CVV</label>
                  <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-xl" placeholder="123" />
                </div>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold text-green-700 mb-1">Conexão Segura</p>
                  <p className="text-sm text-gray-600">Seus dados estão protegidos!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="bg-red-50 p-3 flex items-center gap-2 border-b-2 border-red-300">
            <span className="text-xl">⚠️</span>
            <span className="text-sm font-bold text-red-700">http://loja-barata-123.com</span>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-yellow-50 border-4 border-red-500 rounded-3xl p-6 max-w-sm"
            >
              <div className="text-center mb-4">
                <span className="text-6xl">⚠️</span>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4">
                <span className="text-5xl">📱</span>
                <p className="font-black text-2xl text-gray-800 mt-2">iPhone 15 Pro</p>
                <p className="text-4xl font-black text-red-600 mt-2">R$ 50,00!!!</p>
                <p className="text-xs text-red-600 font-bold mt-1">OFERTA IMPERDÍVEL!!!</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-red-700">
                  <span>🚫</span>
                  <p className="text-sm font-bold">SEM CADEADO</p>
                </div>
                <div className="flex items-center gap-2 text-red-700">
                  <span>🚫</span>
                  <p className="text-sm font-bold">PREÇO ABSURDO</p>
                </div>
                <div className="flex items-center gap-2 text-red-700">
                  <span>🚫</span>
                  <p className="text-sm font-bold">SITE SUSPEITO</p>
                </div>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(4)} posicao="bottom">
                <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg">
                  ⛔ Sair deste site
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}

      {passo === 4 && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🛡️
          </motion.div>
          <p className="font-black text-2xl text-green-700 mb-6 text-center">Você se protegeu de um golpe!</p>
          <div className="space-y-3 w-full max-w-sm mb-6">
            <div className="bg-white border-2 border-green-300 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold text-gray-800">Site com cadeado = seguro</p>
              </div>
            </div>
            <div className="bg-white border-2 border-orange-300 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-bold text-gray-800">Preço muito baixo = suspeito</p>
              </div>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-bold text-gray-800">Prefira sites conhecidos</p>
              </div>
            </div>
            <div className="bg-white border-2 border-purple-300 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-bold text-gray-800">Use o app oficial do banco</p>
              </div>
            </div>
          </div>
          <ElementoClicavel onClick={() => handleAvancar(5)} posicao="bottom">
            <button className="bg-gradient-to-r from-[#922B21] to-[#E59866] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
              ➡️ Próximo
            </button>
          </ElementoClicavel>
        </div>
      )}

      {passo === 5 && (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm">
            <div className="text-center mb-4">
              <span className="text-6xl">🏧</span>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <div className="bg-gray-700 h-12 rounded mb-3"></div>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9,'C',0,'OK'].map((n, i) => (
                  <div key={i} className="bg-gray-600 h-10 rounded flex items-center justify-center text-white font-bold">
                    {n}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👤</span>
                <p className="font-bold text-red-700">Estranho oferecendo ajuda:</p>
              </div>
              <p className="text-sm text-gray-700 italic">"Posso te ajudar a sacar? Me dá seu cartão!"</p>
            </div>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="bottom">
              <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg">
                🚫 Recusar e pedir ajuda ao banco
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}