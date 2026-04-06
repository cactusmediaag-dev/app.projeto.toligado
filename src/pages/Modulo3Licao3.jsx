import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo3Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [googleAberto, setGoogleAberto] = useState(false);
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [voiceMatchAberto, setVoiceMatchAberto] = useState(false);
  const [gravando, setGravando] = useState(false);
  const [concluido, setConcluido] = useState(false);
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
    navigate(createPageUrl("Modulo3Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que o Voice Match faz?"
        opcoes={[
          "🎵 Grava músicas",
          "🗣️ Faz o assistente reconhecer só a sua voz ✅",
          "📞 Faz ligações automáticas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Você pode treinar o Google a reconhecer só a SUA voz! Toque em GOOGLE nas configurações 🎤",
      audio: "Você pode treinar o Google a reconhecer só a sua voz! Toque em Google nas configurações!",
    },
    {
      instrucao: "Toque em ASSISTENTE para configurar o reconhecimento de voz 🤖",
      audio: "Toque em assistente para configurar o reconhecimento de voz!",
    },
    {
      instrucao: "Toque em HEY GOOGLE para ensinar sua voz ao assistente 🗣️",
      audio: "Toque em hey Google para ensinar sua voz ao assistente!",
    },
    {
      instrucao: "Agora fale! Toque no MICROFONE e diga Ok Google 🎤",
      audio: "Agora fale! Toque no microfone e diga Ok Google!",
    },
    {
      instrucao: "Agora só a sua voz ativa o assistente! Toque em CONCLUIR 🎉",
      audio: "Agora só a sua voz ativa o assistente! Toque em concluir!",
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
      {!googleAberto && !assistenteAberto && !voiceMatchAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Configurações</h2>
          </div>
          <div className="space-y-2">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setGoogleAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">G</div>
                  <span className="text-lg font-bold text-gray-700">Google</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "📶", nome: "Wi-Fi" },
              { emoji: "🔐", nome: "Segurança" },
              { emoji: "🔋", nome: "Bateria" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {googleAberto && !assistenteAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setGoogleAberto(false)} className="text-blue-600 font-bold mb-4">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800">Google</h2>
          </div>
          <div className="space-y-2">
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setAssistenteAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">🤖</div>
                  <span className="text-lg font-bold text-gray-700">Assistente</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "🔍", nome: "Pesquisa" },
              { emoji: "☁️", nome: "Backup" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {assistenteAberto && !voiceMatchAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setAssistenteAberto(false)} className="text-blue-600 font-bold mb-4">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800">Google Assistente</h2>
          </div>
          <div className="space-y-2">
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setVoiceMatchAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">🗣️</div>
                  <span className="text-lg font-bold text-gray-700">Hey Google e Voice Match</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "⚙️", nome: "Configurações gerais" },
              { emoji: "🔔", nome: "Notificações" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {voiceMatchAberto && (
        <div className="w-full h-full bg-gradient-to-b from-purple-50 to-purple-100 pt-12 p-6 flex flex-col items-center justify-center">
          {!gravando && !concluido && (
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-800 mb-6">Ensine sua voz</h2>
              <p className="text-gray-600 font-semibold mb-8">Diga: "Ok Google"</p>
              <div className="mb-8">
                <motion.div
                  className="text-9xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎤
                </motion.div>
              </div>
              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => {
                    setGravando(true);
                    setTimeout(() => {
                      setGravando(false);
                      setConcluido(true);
                      setPasso(5);
                    }, 3000);
                  }}
                  posicao="top"
                >
                  <button className="px-8 py-4 bg-purple-500 text-white rounded-full font-bold text-lg">
                    Iniciar Gravação
                  </button>
                </ElementoClicavel>
              )}
            </div>
          )}

          {gravando && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-8">Ouvindo...</h3>
              <motion.div
                className="text-9xl mb-6"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🎤
              </motion.div>
              <div className="flex gap-2 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-16 bg-purple-500 rounded-full"
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <p className="text-purple-600 font-bold">Falando: "Ok Google"</p>
            </div>
          )}

          {concluido && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">✅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Voz reconhecida e salva!</h3>
              <p className="text-gray-600 mb-8">Só você pode ativar o assistente agora</p>
              {passo === 5 && (
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
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}