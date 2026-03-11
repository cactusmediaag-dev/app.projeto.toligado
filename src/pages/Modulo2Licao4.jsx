import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo2Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [analisado, setAnalisado] = useState(false);
  const [verificado, setVerificado] = useState(false);
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
        await base44.entities.Usuario.update(userId, {
          moedas: (users[0].moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo2Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer ao receber notícia alarmante?"
        opcoes={[
          "📤 Compartilhar imediatamente com todos",
          "🔍 Verificar se é verdade antes de compartilhar ✅",
          "😱 Ficar com medo e pagar",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Cuidado! Essa mensagem parece suspeita! Leia com atenção antes de fazer qualquer coisa 👀",
      audio: "Cuidado! Essa mensagem parece suspeita! Leia com atenção antes de fazer qualquer coisa!",
    },
    {
      instrucao: "Viu os sinais de alerta? Toque em NÃO COMPARTILHAR para fazer certo! 🚫",
      audio: "Viu os sinais de alerta? Toque em não compartilhar para fazer certo!",
    },
    {
      instrucao: "Você pode verificar notícias em sites de checagem! Toque em VERIFICAR para ver 🔎",
      audio: "Você pode verificar notícias em sites de checagem! Toque em verificar para ver!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={3}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      <div className="w-full h-full bg-gradient-to-b from-green-50 to-white pt-12 overflow-y-auto">
        {/* WhatsApp header */}
        <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <span className="text-white font-bold">Grupo Família</span>
        </div>

        {/* Mensagem suspeita */}
        <div className="p-4">
          <div className={`bg-white rounded-2xl p-4 shadow-md ${analisado ? "border-2 border-red-400" : ""}`}>
            <p className="text-gray-800 font-semibold leading-relaxed mb-3">
              ⚠️ <span className={analisado ? "bg-red-100" : ""}>URGENTE</span>: O governo vai cobrar taxa de R$500 de todos os aposentados até <span className={analisado ? "bg-red-100" : ""}>amanhã</span>! 
              <span className={analisado ? "bg-red-100" : ""}> Compartilhe para avisar todos!</span>
            </p>
            <p className="text-xs text-gray-400">Recebida há 5 min</p>
          </div>

          {passo === 1 && !analisado && (
            <div className="mt-4">
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setAnalisado(true))}
                posicao="top"
              >
                <button className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold text-lg">
                  Ler com calma 🔍
                </button>
              </ElementoClicavel>
            </div>
          )}

          {analisado && !verificado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-red-700 mb-2">⚠️ Sinais de Alerta:</p>
                <ul className="space-y-2 text-sm text-red-600">
                  <li>🔴 Palavra "URGENTE" — usado para assustar</li>
                  <li>🔴 Prazo curtíssimo — pressão para agir rápido</li>
                  <li>🔴 Pede para compartilhar — sinal de fake</li>
                </ul>
              </div>

              {passo === 2 && (
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setVerificado(true))}
                  posicao="top"
                >
                  <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                    🚫 Não Compartilhar
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}

          {verificado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="bg-green-100 border-2 border-green-400 rounded-2xl p-4 mb-4">
                <p className="text-2xl mb-2">✅</p>
                <p className="text-lg font-bold text-green-700">Muito bem! Você não caiu no golpe!</p>
              </div>

              {passo === 3 && (
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  posicao="top"
                >
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg">
                    Verificar no Comprova 🔎
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </SimuladorWrapper>
  );
}