import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo3Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [analisado, setAnalisado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [confirmacao, setConfirmacao] = useState(false);
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
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod3")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod3"],
            xp_total: (users[0].xp_total || 0) + 100,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo3Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que fazer se alguém pedir sua senha por mensagem?"
        opcoes={[
          "🔑 Enviar a senha rapidamente",
          "🚫 Nunca enviar — bloquear e ligar para o banco ✅",
          "📤 Pedir para um amigo responder",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "ATENÇÃO! Essa mensagem é um golpe! Bancos NUNCA pedem senha! Toque em LER MAIS 👀",
      audio: "Atenção! Essa mensagem é um golpe! Bancos nunca pedem senha! Toque em ler mais!",
    },
    {
      instrucao: "Viu os sinais? Agora toque em BLOQUEAR E DENUNCIAR esse contato 🚫",
      audio: "Viu os sinais? Agora toque em bloquear e denunciar esse contato!",
    },
    {
      instrucao: "Confirme o bloqueio! Toque em BLOQUEAR para se proteger 🔒",
      audio: "Confirme o bloqueio! Toque em bloquear para se proteger!",
    },
    {
      instrucao: "Se tiver dúvida, sempre ligue para o banco! Toque em ENTENDI para continuar ✅",
      audio: "Se tiver dúvida, sempre ligue para o banco! Toque em entendi para continuar!",
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
      <div className="w-full h-full bg-gradient-to-b from-green-50 to-white pt-12 overflow-y-auto">
        <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <span className="text-white font-bold">+55 11 99999-9999</span>
        </div>

        <div className="p-4">
          <div className={`bg-white rounded-2xl p-4 shadow-md ${analisado ? "border-2 border-red-400" : ""}`}>
            <p className="text-gray-800 font-semibold leading-relaxed mb-3">
              Olá! Sou do <span className={analisado ? "bg-red-100" : ""}>suporte do banco</span>. Precisamos confirmar sua <span className={analisado ? "bg-red-100" : ""}>senha</span> para liberar seu acesso. Qual é sua senha?
            </p>
            <p className="text-xs text-gray-400">Recebida agora</p>
          </div>

          {passo === 1 && !analisado && (
            <div className="mt-4">
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setAnalisado(true))}
                posicao="top"
              >
                <button className="w-full bg-orange-500 text-white py-3 rounded-2xl font-bold text-lg">
                  ⚠️ Entender o golpe
                </button>
              </ElementoClicavel>
            </div>
          )}

          {analisado && !bloqueado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
                <p className="text-sm font-bold text-red-700 mb-3">🚨 Sinais de Alerta:</p>
                <ul className="space-y-2 text-sm text-red-600">
                  <li>🔴 Banco NUNCA pede senha por mensagem</li>
                  <li>🔴 Número desconhecido — não é do banco</li>
                  <li>🔴 Pressão para responder rápido = golpe</li>
                </ul>
              </div>

              {passo === 2 && !confirmacao && (
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setConfirmacao(true))}
                  posicao="top"
                >
                  <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                    🚫 Bloquear e Denunciar
                  </button>
                </ElementoClicavel>
              )}
            </motion.div>
          )}

          {confirmacao && !bloqueado && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            >
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Deseja bloquear este contato?</h3>
                <p className="text-gray-600 mb-6">Este número será bloqueado e denunciado como spam</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmacao(false)}
                    className="flex-1 py-3 bg-gray-200 rounded-xl font-bold text-gray-700"
                  >
                    Cancelar
                  </button>
                  {passo === 3 && (
                    <ElementoClicavel
                      onClick={() => {
                        setBloqueado(true);
                        setPasso(4);
                      }}
                      posicao="top"
                    >
                      <button className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold cursor-pointer">
                        Bloquear
                      </button>
                    </ElementoClicavel>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {bloqueado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="bg-green-100 border-2 border-green-400 rounded-2xl p-6 mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-3">🛡️</div>
                  <p className="text-xl font-bold text-green-700 mb-2">✅ Contato bloqueado!</p>
                  <p className="text-sm text-green-600">Você está seguro</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
                <p className="text-sm font-bold text-blue-700 mb-2">💡 Dica importante:</p>
                <p className="text-sm text-blue-600">
                  Em caso de dúvida, ligue para o número oficial do seu banco no verso do cartão 📞
                </p>
              </div>

              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  posicao="top"
                >
                  <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg">
                    ✅ Entendi!
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