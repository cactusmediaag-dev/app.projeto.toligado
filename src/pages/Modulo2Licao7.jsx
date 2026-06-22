import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo2Licao7() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [smsAberto, setSmsAberto] = useState(false);
  const [smsLido, setSmsLido] = useState(false);
  const [spam, setSpam] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao8"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer com o código que chegou por SMS?"
        opcoes={[
          "📤 Compartilhar com um amigo para guardar",
          "🤫 Guardar só para você e nunca compartilhar ✅",
          "🗑️ Apagar sem ler",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Chegou uma mensagem de texto! Toque na notificação para ler 📩",
      audio: "Chegou uma mensagem de texto! Toque na notificação para ler!",
    },
    {
      instrucao: "É um código do banco! Esse número é SECRETO — nunca conte para ninguém 🤫",
      audio: "É um código do banco! Esse número é secreto, nunca conte para ninguém!",
    },
    {
      instrucao: "Cuidado! Esse SMS é SUSPEITO! Toque em DENUNCIAR para bloquear ⛔",
      audio: "Cuidado! Esse SMS é suspeito! Toque em denunciar para bloquear!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={3}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!smsAberto && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 relative pt-12">
          {passo === 1 && (
            <ElementoClicavel
              onClick={() => handleCliqueCerto(2, () => setSmsAberto(true))}
              posicao="bottom"
            >
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="absolute top-12 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg cursor-pointer border-2 border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📩</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">1 nova mensagem</p>
                    <p className="text-sm text-gray-500">Banco Seguro</p>
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

      {smsAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setSmsAberto(false)} className="text-blue-600 font-bold">← Voltar</button>
          </div>
          <div className="px-4 py-4">
            <h2 className="text-xl font-black text-gray-800 mb-6">Mensagens</h2>

            <div className={`bg-green-50 rounded-2xl p-4 mb-4 ${smsLido ? "border-2 border-green-400" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏦</span>
                <p className="font-bold text-gray-800">Banco Seguro</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                Seu código de acesso é <span className="font-black text-xl">7823</span>.
                Válido por 5 minutos. Não compartilhe.
              </p>
              {passo === 2 && !smsLido && (
                <ElementoClicavel
                  onClick={() => { setSmsLido(true); handleCliqueCerto(3, null); }}
                  posicao="top"
                >
                  <button className="w-full bg-green-500 text-white py-2 rounded-xl font-bold">
                    Entendi, é meu segredo! 🤫
                  </button>
                </ElementoClicavel>
              )}
              {smsLido && (
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <span>🔒</span>
                  <span className="text-sm">Código secreto guardado</span>
                </div>
              )}
            </div>

            {passo === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-red-50 rounded-2xl p-4 ${spam ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📱</span>
                  <p className="font-bold text-gray-800">Número desconhecido</p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Parabéns! Você ganhou R$5.000! Clique aqui: bit.ly/xxxx
                </p>
                {!spam && (
                  <ElementoClicavel
                    onClick={() => { setSpam(true); setTimeout(() => setMostrarValidacao(true), 1000); }}
                    posicao="top"
                  >
                    <button className="w-full bg-red-500 text-white py-2 rounded-xl font-bold">
                      ⛔ Denunciar como Spam
                    </button>
                  </ElementoClicavel>
                )}
                {spam && (
                  <div className="text-center">
                    <p className="text-red-600 font-bold">✅ Bloqueado e denunciado</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}