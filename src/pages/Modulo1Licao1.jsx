import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo1Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [telaAcesa, setTelaAcesa] = useState(false);
  const [volumeVisivel, setVolumeVisivel] = useState(false);
  const [bateriaVisivel, setBateriaVisivel] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [dica, setDica] = useState("");
  const [mostrarDica, setMostrarDica] = useState(false);
  const [feedbackAcerto, setFeedbackAcerto] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);
  const [mostrarMoedas, setMostrarMoedas] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');

  const handleCliqueCerto = (proximoPasso, acao) => {
    // Som de acerto
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    if (acao) acao();
    setTimeout(() => setPasso(proximoPasso), 600);
    setDica("");
  };

  const handleCliqueErrado = (mensagem) => {
    navigator.vibrate?.(200);
    setDica(mensagem);
    setTimeout(() => setDica(""), 3000);
  };

  useEffect(() => {
    if (passo === 1 && !telaAcesa) {
      const timer = setTimeout(() => setMostrarDica(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [passo, telaAcesa]);

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
    navigate(createPageUrl("Modulo1Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual botão você usa para ligar a tela do celular?"
        opcoes={[
          "🔊 O botão de volume",
          "⚡ O botão de ligar/desligar ✅",
          "🏠 O botão home",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Olá! Vou te mostrar os botões do celular. Toque no botão de LIGAR a tela! 💡",
      audio: "Olá! Vou te mostrar os botões do celular. Toque no botão de ligar a tela!",
    },
    {
      instrucao: "Ótimo! Agora toque no botão de AUMENTAR O VOLUME 🔊",
      audio: "Ótimo! Agora toque no botão de aumentar o volume!",
    },
    {
      instrucao: "Você viu? A bateria está fraca! Toque no ícone da bateria para ver o nível 🔋",
      audio: "Você viu? A bateria está fraca! Toque no ícone da bateria para ver o nível!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={3}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Tela simulada do celular */}
      <div className={`w-full h-full transition-all duration-500 ${telaAcesa ? "bg-gradient-to-b from-blue-50 to-blue-100" : "bg-black"}`}>
        {/* Status bar */}
        {telaAcesa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/90 px-4 py-2 flex justify-between items-center text-xs mt-6"
          >
            <span className="font-semibold text-gray-700">14:30</span>
            <div className="flex gap-2 items-center">
              {passo >= 3 ? (
                <ElementoClicavel
                  onClick={() => {
                    setBateriaVisivel(true);
                    setTimeout(() => {}, 100);
                  }}
                  posicao="bottom"
                >
                  <div className="flex items-center gap-1 text-red-500 font-bold cursor-pointer p-2">
                    <span className="text-lg">🔋</span>
                    <span className="text-sm">15%</span>
                  </div>
                </ElementoClicavel>
              ) : (
                <div className="flex items-center gap-1 text-gray-600">
                  <span>🔋</span>
                  <span className="text-xs">15%</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Conteúdo da tela */}
        {telaAcesa && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center h-[calc(100%-60px)] text-gray-400"
          >
            <div className="text-center">
              <div className="text-6xl mb-2">📱</div>
              <p className="text-sm font-semibold">Tela Inicial</p>
            </div>
          </motion.div>
        )}

        {/* Volume indicator */}
        {volumeVisivel && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-2xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🔊</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-2 h-8 bg-white rounded" />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bateria popup */}
        {bateriaVisivel && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl border-2 border-red-200"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">🔋</div>
              <p className="text-2xl font-bold text-red-500 mb-1">15%</p>
              <p className="text-sm text-gray-600 font-semibold">Bateria Baixa!</p>
              <p className="text-xs text-gray-500 mt-2">Conecte o carregador</p>
              <button
                onClick={() => setMostrarValidacao(true)}
                className="mt-4 bg-[#F3984B] text-white px-6 py-2 rounded-xl font-bold text-sm active:scale-95"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Botões físicos do celular */}
      <div className="absolute -right-2 top-32 flex flex-col gap-8" style={{ position: 'absolute' }}>
        {passo === 1 && (
          <>
            <div
              onClick={() => { setMostrarDica(false); handleCliqueCerto(2, () => setTelaAcesa(true)); }}
              style={{
                width: '8px', height: '52px',
                background: mostrarDica ? '#F3984B' : '#9ca3af',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer',
                animation: mostrarDica ? 'buttonPulse 1s ease infinite' : 'none',
                boxShadow: mostrarDica ? '4px 0 12px rgba(243,152,75,0.8)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
            {mostrarDica && !telaAcesa && (
              <div style={{
                position: 'absolute', right: '-42px', top: '10px',
                animation: 'arrowPulse 0.8s ease infinite alternate',
                fontSize: '20px', zIndex: 21, pointerEvents: 'none'
              }}>👉</div>
            )}
          </>
        )}
        {passo >= 2 && (
          <div className="w-8 h-16 bg-gray-300 rounded-l-lg" />
        )}
      </div>

      <div className="absolute -left-2 top-24 flex flex-col gap-3">
        {passo === 2 ? (
          <>
            <ElementoClicavel
              onClick={() => handleCliqueCerto(3, () => setVolumeVisivel(true))}
              posicao="left"
            >
              <div className="w-8 h-12 bg-gray-300 rounded-r-lg cursor-pointer active:bg-gray-400" />
            </ElementoClicavel>
            <div
              onClick={() => handleCliqueErrado("Quase lá! Tente o botão de cima, o de AUMENTAR 😊")}
              className="w-8 h-12 bg-gray-300 rounded-r-lg cursor-pointer active:bg-gray-400"
            />
          </>
        ) : (
          <>
            <div className="w-8 h-12 bg-gray-300 rounded-r-lg" />
            <div className="w-8 h-12 bg-gray-300 rounded-r-lg" />
          </>
        )}
      </div>

      {/* Dica de erro */}
      {dica && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-100 border-2 border-red-300 text-red-700 px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg z-20 max-w-[280px] text-center"
        >
          {dica}
        </motion.div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}