import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo3Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [digitalAberta, setDigitalAberta] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [scanning, setScanning] = useState(false);
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
        await base44.entities.Usuario.update(userId, {
          moedas: (users[0].moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo3Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que a impressão digital é uma boa senha?"
        opcoes={[
          "😅 Porque é fácil de copiar",
          "👆 Porque é única para cada pessoa no mundo ✅",
          "🤷 Não é segura",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Sua digital é única no mundo! Toque em IMPRESSÃO DIGITAL para configurar 👆",
      audio: "Sua digital é única no mundo! Toque em impressão digital para configurar!",
    },
    {
      instrucao: "Posicione o dedo no sensor indicado! Toque no SENSOR para registrar 👆",
      audio: "Posicione o dedo no sensor indicado! Toque no sensor para registrar!",
    },
    {
      instrucao: "Ótimo! Continue tocando no sensor até completar 100%! Toque novamente 🔄",
      audio: "Ótimo! Continue tocando no sensor até completar 100%!",
    },
    {
      instrucao: "Cadastrada com sucesso! Toque em CONCLUIR para terminar 🎉",
      audio: "Cadastrada com sucesso! Toque em concluir para terminar!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!digitalAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Segurança</h2>
          </div>
          <div className="space-y-2">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setDigitalAberta(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">👆</div>
                  <span className="text-lg font-bold text-gray-700">Impressão Digital</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "😊", nome: "Reconhecimento Facial" },
              { emoji: "🔒", nome: "Bloqueio de Tela" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {digitalAberta && !concluido && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 pt-12 p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black text-gray-800 mb-8 text-center">
            {progresso === 0 ? "Cadastrar Impressão Digital" : "Leitura em andamento..."}
          </h2>

          <div className="text-center mb-8">
            <p className="text-gray-600 font-semibold mb-6">Toque no sensor com o dedo indicador</p>
            <div className="text-9xl mb-6">👆</div>
          </div>

          {progresso > 0 && (
            <div className="w-full max-w-sm mb-6">
              <div className="bg-white rounded-full h-4 overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progresso}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-center text-lg font-bold text-blue-600">{progresso}%</p>
              {progresso < 100 && (
                <p className="text-center text-sm text-gray-600 mt-2">Levante e reposicione o dedo</p>
              )}
            </div>
          )}

          {passo === 2 && progresso === 0 && (
            <ElementoClicavel
              onClick={() => {
                setScanning(true);
                setProgresso(40);
                handleCliqueCerto(3, null);
              }}
              posicao="top"
            >
              <div className="w-24 h-24 rounded-full bg-blue-500/20 border-4 border-blue-500 flex items-center justify-center cursor-pointer animate-pulse">
                <div className="w-16 h-16 rounded-full bg-blue-500" />
              </div>
            </ElementoClicavel>
          )}

          {passo === 3 && progresso === 40 && (
            <ElementoClicavel
              onClick={() => {
                setProgresso(100);
                setTimeout(() => {
                  setConcluido(true);
                  setPasso(4);
                }, 800);
              }}
              posicao="top"
            >
              <div className="w-24 h-24 rounded-full bg-blue-500/20 border-4 border-blue-500 flex items-center justify-center cursor-pointer">
                <motion.div
                  className="w-16 h-16 rounded-full bg-blue-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </ElementoClicavel>
          )}
        </div>
      )}

      {concluido && (
        <div className="w-full h-full bg-white pt-12 p-6 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Impressão digital cadastrada!</h3>
            <p className="text-gray-600 mb-8">Sua digital é única no mundo inteiro</p>
            {passo === 4 && (
              <ElementoClicavel
                onClick={() => setMostrarValidacao(true)}
                posicao="top"
              >
                <button className="px-8 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg">
                  Concluir 🎉
                </button>
              </ElementoClicavel>
            )}
          </motion.div>
        </div>
      )}
    </SimuladorImersivo>
  );
}