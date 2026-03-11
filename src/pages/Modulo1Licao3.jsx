import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo1Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [lensAberto, setLensAberto] = useState(false);
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [imagem, setImagem] = useState("planta");
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    if (acao) acao();
    setTimeout(() => setPasso(proximoPasso), 600);
  };

  const handleConcluirValidacao = async () => {
    const userId = localStorage.getItem("toligado_user_id");
    if (userId) {
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) {
        const user = users[0];
        await base44.entities.Usuario.update(userId, {
          moedas: (user.moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo1Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o Google Lens?"
        opcoes={[
          "📸 Só para tirar selfies",
          "🔍 Para identificar plantas, produtos e textos pela câmera ✅",
          "📞 Para fazer videochamadas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Google Lens lê o mundo pela câmera! Toque no ícone do Lens para abrir 📷",
      audio: "O Google Lens lê o mundo pela câmera! Toque no ícone do Lens para abrir!",
    },
    {
      instrucao: "A câmera está aberta! Toque no botão de CAPTURAR para identificar a planta 🌿",
      audio: "A câmera está aberta! Toque no botão de capturar para identificar a planta!",
    },
    {
      instrucao: "Que incrível! O Lens identificou a planta! Toque em VOLTAR para tentar com outra coisa 😄",
      audio: "Que incrível! O Lens identificou a planta! Toque em voltar para tentar com outra coisa!",
    },
    {
      instrucao: "Agora aponte para um produto! Toque em CAPTURAR de novo 📦",
      audio: "Agora aponte para um produto! Toque em capturar de novo!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!lensAberto && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setLensAberto(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    📷
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Lens</span>
                </div>
              </ElementoClicavel>
            )}
            {passo !== 1 && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  📷
                </div>
                <span className="text-xs text-gray-600 font-semibold">Lens</span>
              </div>
            )}
            {["G", "📱", "⚙️", "📧", "🎵", "📍"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lensAberto && !resultado && (
        <div className="w-full h-full bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {imagem === "planta" && (
              <div className="text-9xl">🌿</div>
            )}
            {imagem === "produto" && (
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-6xl mb-2">🍚</div>
                <p className="text-sm font-bold text-gray-700">Arroz Tipo 1</p>
                <p className="text-xs text-gray-500">5kg</p>
              </div>
            )}
          </div>

          {analisando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {!resultado && (
            <div className="absolute bottom-6 left-0 right-0 px-6">
              {(passo === 2 || passo === 4) && (
                <ElementoClicavel
                  onClick={() => {
                    setAnalisando(true);
                    setTimeout(() => {
                      setAnalisando(false);
                      setResultado(true);
                      setPasso(passo + 1);
                    }, 1500);
                  }}
                  posicao="top"
                >
                  <div className="w-20 h-20 bg-white rounded-full mx-auto shadow-xl border-4 border-gray-200 cursor-pointer active:scale-95 transition-all" />
                </ElementoClicavel>
              )}
            </div>
          )}

          <button className="absolute top-8 left-4 text-white text-2xl">←</button>
        </div>
      )}

      {resultado && passo === 3 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-full bg-white p-6 pt-12"
        >
          <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 mb-4">
            <div className="text-5xl mb-3 text-center">🌿</div>
            <h3 className="text-xl font-bold text-green-700 mb-2 text-center">
              Identificado: Babosa (Aloe Vera)
            </h3>
            <p className="text-sm text-gray-600 font-medium text-center">
              Planta medicinal usada para tratar queimaduras e pele seca
            </p>
          </div>
          <ElementoClicavel
            onClick={() => handleCliqueCerto(4, () => { setResultado(false); setImagem("produto"); setLensAberto(true); })}
            posicao="top"
          >
            <button className="w-full bg-[#5C2E7F] text-white py-4 rounded-2xl font-bold text-lg">
              ← Voltar
            </button>
          </ElementoClicavel>
        </motion.div>
      )}

      {resultado && passo === 5 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-full bg-white p-6 pt-12"
        >
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 mb-4">
            <div className="text-5xl mb-3 text-center">🛍️</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
              Arroz Tipo 1 — 5kg
            </h3>
            <p className="text-2xl text-green-600 font-black text-center mb-2">
              R$ 25,90
            </p>
            <p className="text-sm text-gray-600 font-medium text-center">
              Encontrado em 3 mercados próximos
            </p>
          </div>
          <button
            onClick={() => setMostrarValidacao(true)}
            className="w-full bg-[#F3984B] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
          >
            Continuar 🚀
          </button>
        </motion.div>
      )}
    </SimuladorWrapper>
  );
}