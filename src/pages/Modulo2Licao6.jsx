import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo2Licao6() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [verificacaoAtiva, setVerificacaoAtiva] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [protecaoAtiva, setProtecaoAtiva] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [feedbackAcerto, setFeedbackAcerto] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);
  const [mostrarMoedas, setMostrarMoedas] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');

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
    navigate(createPageUrl("Modulo2Licao7"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que é a verificação em duas etapas?"
        opcoes={[
          "🔐 Uma proteção extra com código enviado no celular ✅",
          "📱 Ter dois celulares",
          "🔑 Digitar a senha duas vezes seguidas",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "A verificação em duas etapas é uma proteção extra! Vamos ativar juntos 🛡️",
      audio: "A verificação em duas etapas é uma proteção extra! Vamos ativar juntos!",
    },
    {
      instrucao: "Encontrou! Toque para ATIVAR essa proteção extra 🔐",
      audio: "Encontrou! Toque para ativar essa proteção extra!",
    },
    {
      instrucao: "O app vai enviar um código no seu celular! Toque em ENVIAR CÓDIGO 📲",
      audio: "O app vai enviar um código no seu celular! Toque em enviar código!",
    },
    {
      instrucao: "O código chegou! Toque nos campos e digite o código que chegou no SMS 📩",
      audio: "O código chegou! Toque nos campos e digite o código que chegou no SMS!",
    },
    {
      instrucao: "Agora toque em CONFIRMAR para ativar a proteção! ✅",
      audio: "Agora toque em confirmar para ativar a proteção!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      <div className="w-full h-full bg-white pt-12 p-6">
        {passo === 1 && (
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Banco Seguro</h2>
            <div className="bg-gray-50 rounded-3xl p-6">
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, null)}
                posicao="bottom"
              >
                <button className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold">
                  ⚙️ Configurações de Segurança
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 2 && (
          <div>
            <button onClick={() => setPasso(1)} className="text-blue-600 font-bold mb-6">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800 mb-6">Segurança</h2>
            <div className="bg-gray-50 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800 mb-1">Verificação em 2 etapas</p>
                  <p className="text-sm text-gray-500">Proteção extra para sua conta</p>
                </div>
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(3, () => setVerificacaoAtiva(true))}
                  posicao="right"
                >
                  <div className={`w-16 h-8 rounded-full relative cursor-pointer ${verificacaoAtiva ? "bg-green-500" : "bg-gray-300"}`}>
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow ${verificacaoAtiva ? "left-9" : "left-1"}`} />
                  </div>
                </ElementoClicavel>
              </div>
            </div>
          </div>
        )}

        {passo === 3 && (
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-6">Confirmar Número</h2>
            <div className="bg-gray-50 rounded-3xl p-6 mb-4">
              <p className="text-gray-700 font-semibold mb-4">Vamos enviar um código para:</p>
              <p className="text-2xl font-bold text-gray-800 mb-6 text-center">(65) 99999-9999</p>
              <ElementoClicavel
                onClick={() => {
                  setCodigoEnviado(true);
                  handleCliqueCerto(4, null);
                }}
                posicao="top"
              >
                <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold">
                  📲 Enviar Código
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 4 && (
          <div>
            {codigoEnviado && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-3 mb-6"
              >
                <p className="text-sm font-bold text-blue-700">📩 SMS: Seu código é 4 8 2 1 5 3</p>
              </motion.div>
            )}
            <h2 className="text-2xl font-black text-gray-800 mb-6">Digite o Código</h2>
            <div className="bg-gray-50 rounded-3xl p-6">
              <div className="flex gap-2 justify-center mb-6">
                {["4", "8", "2", "1", "5", "3"].map((num, i) => (
                  <div key={i} className="w-12 h-14 rounded-xl bg-white border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">{codigo[i] || ""}</span>
                  </div>
                ))}
              </div>
              <ElementoClicavel
                onClick={() => {
                  setCodigo("482153");
                  handleCliqueCerto(5, null);
                }}
                posicao="top"
              >
                <button className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold">
                  Digitar código
                </button>
              </ElementoClicavel>
            </div>
          </div>
        )}

        {passo === 5 && codigo === "482153" && (
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-6">Confirmar</h2>
            <div className="bg-gray-50 rounded-3xl p-6 mb-4">
              <div className="flex gap-2 justify-center mb-6">
                {["4", "8", "2", "1", "5", "3"].map((num, i) => (
                  <div key={i} className="w-12 h-14 rounded-xl bg-green-100 border-2 border-green-400 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-700">{num}</span>
                  </div>
                ))}
              </div>
              <ElementoClicavel
                onClick={() => {
                  setProtecaoAtiva(true);
                  setTimeout(() => setMostrarValidacao(true), 1500);
                }}
                posicao="top"
              >
                <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold">
                  ✅ Confirmar
                </button>
              </ElementoClicavel>
            </div>

            {protecaoAtiva && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-7xl mb-4">🛡️</div>
                <p className="text-2xl font-bold text-green-600">Proteção Ativada!</p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}