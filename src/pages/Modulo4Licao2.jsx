import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo4Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [facebookAberto, setFacebookAberto] = useState(false);
  const [postAberto, setPostAberto] = useState(false);
  const [curtido, setCurtido] = useState(false);
  const [comentando, setComentando] = useState(false);
  const [comentarioEnviado, setComentarioEnviado] = useState(false);
  const [pedidoRecusado, setPedidoRecusado] = useState(false);
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
    navigate(createPageUrl("Modulo4Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer com pedido de amizade de desconhecido?"
        opcoes={[
          "✅ Aceitar sempre para ter mais amigos",
          "🚫 Recusar — só aceite quem você conhece ✅",
          "🤷 Deixar sem responder para sempre",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O Facebook conecta você com amigos e família! Toque no ícone azul do Facebook 👥", audio: "O Facebook conecta você com amigos e família! Toque no ícone azul do Facebook!" },
    { instrucao: "Esse é o Feed! Aqui aparecem novidades dos seus amigos. Toque na FOTO para ver 📸", audio: "Esse é o Feed! Aqui aparecem novidades dos seus amigos. Toque na foto para ver!" },
    { instrucao: "Você pode CURTIR a foto! Toque no botão de curtir (dedão) 👍", audio: "Você pode curtir a foto! Toque no botão de curtir, o dedão!" },
    { instrucao: "Ótimo! Agora toque em COMENTAR para deixar uma mensagem 💬", audio: "Ótimo! Agora toque em comentar para deixar uma mensagem!" },
    { instrucao: "Comentário escrito! Toque em ENVIAR para publicar seu comentário ✅", audio: "Comentário escrito! Toque em enviar para publicar seu comentário!" },
    { instrucao: "Cuidado! Você não conhece essa pessoa! Toque em RECUSAR para se proteger ⛔", audio: "Cuidado! Você não conhece essa pessoa! Toque em recusar para se proteger!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!facebookAberto && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setFacebookAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white font-bold">f</div>
                </div>
              </ElementoClicavel>
            )}
            {["G", "💬", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {facebookAberto && !postAberto && (
        <div className="w-full h-full bg-gray-100 pt-12 overflow-y-auto">
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">facebook</h2>
            <div className="flex gap-3 text-white text-xl">
              <span>🔍</span>
              <span>💬</span>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setPostAberto(true))} posicao="right">
                <div className="bg-white rounded-2xl p-4 shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">👤</div>
                    <div>
                      <p className="font-bold text-gray-800">Ana Silva</p>
                      <p className="text-xs text-gray-400">2 horas atrás</p>
                    </div>
                  </div>
                  <div className="w-full h-48 bg-gradient-to-br from-green-200 to-blue-300 rounded-xl flex items-center justify-center text-6xl mb-3">🏞️</div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>❤️ 12 curtidas</span>
                    <span>2 comentários</span>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">🎂</div>
                <div>
                  <p className="font-bold text-gray-800">Aniversário da sua amiga Ana hoje!</p>
                  <p className="text-xs text-gray-400">Envie uma mensagem</p>
                </div>
              </div>
            </div>

            {passo === 6 && !pedidoRecusado && (
              <ElementoClicavel onClick={() => { setPedidoRecusado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="right">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 shadow animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">👤</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">Marcos Souza</p>
                      <p className="text-xs text-gray-500">0 amigos em comum</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold">Recusar</button>
                    <button className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl font-bold">Aceitar</button>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            {pedidoRecusado && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-100 border-2 border-green-400 rounded-2xl p-4 shadow">
                <div className="text-center">
                  <div className="text-5xl mb-2">✅</div>
                  <p className="text-lg font-bold text-green-700">Certo!</p>
                  <p className="text-sm text-green-600">Só aceite amizade de quem você conhece!</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {postAberto && (
        <div className="w-full h-full bg-white pt-12 flex flex-col">
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <button onClick={() => setPostAberto(false)} className="text-xl">←</button>
            <p className="font-bold text-gray-800">Publicação</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">👤</div>
              <div>
                <p className="font-bold text-gray-800">Ana Silva</p>
                <p className="text-xs text-gray-400">2 horas atrás</p>
              </div>
            </div>

            <div className="w-full h-64 bg-gradient-to-br from-green-200 to-blue-300 rounded-xl flex items-center justify-center text-8xl mb-4">🏞️</div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b">
              <span>❤️ {curtido ? "13" : "12"} curtidas</span>
              <span>{comentarioEnviado ? "3" : "2"} comentários</span>
            </div>

            <div className="flex items-center justify-around py-3 border-b mb-4">
              {passo === 3 && !curtido && (
                <ElementoClicavel onClick={() => { setCurtido(true); handleCliqueCerto(4, null); }} posicao="top">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100">
                    <span className="text-2xl">👍</span>
                    <span className="font-semibold text-gray-600">Curtir</span>
                  </button>
                </ElementoClicavel>
              )}
              {curtido && (
                <motion.button initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100">
                  <motion.span initial={{ y: -20 }} animate={{ y: 0 }} className="text-2xl">❤️</motion.span>
                  <span className="font-bold text-blue-600">Curtido</span>
                </motion.button>
              )}

              {passo === 4 && curtido && !comentando && (
                <ElementoClicavel onClick={() => { setComentando(true); handleCliqueCerto(5, null); }} posicao="top">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100">
                    <span className="text-2xl">💬</span>
                    <span className="font-semibold text-gray-600">Comentar</span>
                  </button>
                </ElementoClicavel>
              )}
              {(passo < 4 || comentando || comentarioEnviado) && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold text-gray-600">Comentar</span>
                </button>
              )}

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
                <span className="text-2xl">📤</span>
                <span className="font-semibold text-gray-600">Compartilhar</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-sm">👤</div>
                <div className="flex-1 bg-gray-100 rounded-2xl p-3">
                  <p className="font-bold text-sm">João Costa</p>
                  <p className="text-sm text-gray-700">Linda paisagem!</p>
                </div>
              </div>

              {comentarioEnviado && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                  <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-sm">👤</div>
                  <div className="flex-1 bg-blue-50 rounded-2xl p-3">
                    <p className="font-bold text-sm">Você</p>
                    <p className="text-sm text-gray-700">Que foto linda! 😍</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {comentando && !comentarioEnviado && (
            <div className="p-4 border-t flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                <p className="text-gray-800">Que foto linda! 😍</p>
              </div>
              {passo === 5 && (
                <ElementoClicavel onClick={() => { setComentarioEnviado(true); setComentando(false); handleCliqueCerto(6, null); }} posicao="top">
                  <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">➤</button>
                </ElementoClicavel>
              )}
            </div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}