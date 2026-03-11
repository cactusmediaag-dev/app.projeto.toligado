import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo2Licao8() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [atualizacaoAberta, setAtualizacaoAberta] = useState(false);
  const [instalando, setInstalando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [concluido, setConcluido] = useState(false);
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
        if (!modulosCompletos.includes("mod2")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod2"],
            xp_total: (users[0].xp_total || 0) + 130,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo2Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que você deve aceitar as atualizações do celular?"
        opcoes={[
          "🔋 Para gastar mais bateria",
          "🛡️ Para manter a segurança e melhorar o funcionamento ✅",
          "🗑️ Para apagar seus aplicativos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Seu celular tem uma atualização! Toque na notificação para ver 🔄",
      audio: "Seu celular tem uma atualização! Toque na notificação para ver!",
    },
    {
      instrucao: "Essas atualizações protegem você! Toque em INSTALAR AGORA ✅",
      audio: "Essas atualizações protegem você! Toque em instalar agora!",
    },
    {
      instrucao: "Perfeito! Seu celular está atualizado e mais seguro agora! 🛡️",
      audio: "Perfeito! Seu celular está atualizado e mais seguro agora!",
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
      {!atualizacaoAberta && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 relative pt-12">
          {passo === 1 && (
            <ElementoClicavel
              onClick={() => handleCliqueCerto(2, () => setAtualizacaoAberta(true))}
              posicao="bottom"
            >
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="absolute top-12 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg cursor-pointer border-2 border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⬇️</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Atualização disponível</p>
                    <p className="text-sm text-gray-500">Android 14</p>
                  </div>
                </div>
              </motion.div>
            </ElementoClicavel>
          )}
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="text-8xl mb-4">📱</div>
              <p className="font-semibold">Tela Inicial</p>
            </div>
          </div>
        </div>
      )}

      {atualizacaoAberta && !instalando && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => setAtualizacaoAberta(false)} className="text-blue-600 font-bold mb-6">← Voltar</button>
          <h2 className="text-2xl font-black text-gray-800 mb-6">Atualização do Sistema</h2>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🔄</div>
              <p className="text-xl font-bold text-gray-800 mb-2">Android 14</p>
              <p className="text-sm text-gray-500">Tamanho: 250 MB</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">✅</span>
                <span className="font-semibold">Correções de segurança</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">✅</span>
                <span className="font-semibold">Melhorias de desempenho</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">✅</span>
                <span className="font-semibold">Novos recursos de acessibilidade</span>
              </div>
            </div>

            {passo === 2 && (
              <ElementoClicavel
                onClick={() => {
                  setInstalando(true);
                  let p = 0;
                  const intervalo = setInterval(() => {
                    p += 10;
                    setProgresso(p);
                    if (p >= 100) {
                      clearInterval(intervalo);
                      setConcluido(true);
                      setPasso(3);
                    }
                  }, 200);
                }}
                posicao="top"
              >
                <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg">
                  Instalar Agora
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {instalando && (
        <div className="w-full h-full bg-white pt-12 p-6 flex flex-col items-center justify-center">
          <div className="text-center w-full max-w-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-7xl mb-6"
            >
              🔄
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {concluido ? "Atualização Concluída!" : "Instalando..."}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
              />
            </div>
            <p className="text-gray-600 font-semibold text-lg">{progresso}%</p>

            {concluido && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="text-6xl mb-4">🛡️</div>
                <p className="text-green-600 font-bold text-xl mb-6">
                  ✅ Seu celular está protegido!
                </p>
                <ElementoClicavel
                  onClick={() => setMostrarValidacao(true)}
                  posicao="top"
                >
                  <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg">
                    Ótimo! 😊
                  </button>
                </ElementoClicavel>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}