import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo5Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [postAberto, setPostAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [emojiAberto, setEmojiAberto] = useState(false);
  const [publicado, setPublicado] = useState(false);
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
    navigate(createPageUrl("Modulo5Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você cria uma publicação no Facebook ou Instagram?"
        opcoes={[
          "📞 Ligando para alguém",
          "✏️ Tocando no campo de texto e escrevendo ✅",
          "🔍 Pesquisando no Google",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos fazer sua primeira publicação! Toque no campo O QUE VOCÊ ESTÁ PENSANDO? ✏️", audio: "Vamos fazer sua primeira publicação! Toque no campo o que você está pensando?" },
    { instrucao: "Escreva algo! Toque no campo e veja o texto aparecer ✏️", audio: "Escreva algo! Toque no campo e veja o texto aparecer!" },
    { instrucao: "Que tal adicionar um EMOJI? Toque no ícone de carinha 😊", audio: "Que tal adicionar um emoji? Toque no ícone de carinha!" },
    { instrucao: "Escolha um emoji bonito! Toque em qualquer um para adicionar 🌸", audio: "Escolha um emoji bonito! Toque em qualquer um para adicionar!" },
    { instrucao: "Sua publicação está pronta! Toque em PUBLICAR para compartilhar 📤", audio: "Sua publicação está pronta! Toque em publicar para compartilhar!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!postAberto && !publicado && (
        <div className="w-full h-full bg-gray-100 pt-12 overflow-y-auto">
          <div className="bg-blue-600 px-4 py-3">
            <h2 className="text-xl font-bold text-white">facebook</h2>
          </div>

          <div className="p-4 space-y-4">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setPostAberto(true))} posicao="bottom">
                <div className="bg-white rounded-2xl p-4 shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">👤</div>
                    <p className="text-gray-400">O que você está pensando?</p>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">👤</div>
                <div>
                  <p className="font-bold text-gray-800">Ana Silva</p>
                  <p className="text-xs text-gray-400">2 horas atrás</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">Que dia maravilhoso! ☀️</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>❤️ 15 curtidas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {postAberto && !emojiAberto && !publicado && (
        <div className="w-full h-full bg-white pt-12 flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => setPostAberto(false)} className="text-gray-600 font-semibold">✕ Cancelar</button>
            <p className="font-bold text-gray-800">Criar publicação</p>
            {passo === 5 && texto && (
              <ElementoClicavel onClick={() => { setPublicado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="left">
                <button className="text-blue-600 font-bold">Publicar</button>
              </ElementoClicavel>
            )}
            {passo !== 5 && <button className="text-gray-300 font-bold">Publicar</button>}
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">👤</div>
              <div>
                <p className="font-bold text-gray-800">Você</p>
                <p className="text-xs text-gray-500">Público · Agora</p>
              </div>
            </div>

            {passo === 2 && !texto && (
              <ElementoClicavel onClick={() => { setTexto("Que dia lindo hoje! Gratidão pela vida! 🌅"); handleCliqueCerto(3, null); }} posicao="top">
                <div className="min-h-32 border-2 border-gray-200 rounded-xl p-4 cursor-pointer">
                  <p className="text-gray-400">O que você está pensando?</p>
                </div>
              </ElementoClicavel>
            )}

            {texto && (
              <div className="min-h-32 p-4">
                <p className="text-gray-800 text-lg leading-relaxed">{texto}</p>
              </div>
            )}
          </div>

          <div className="mt-auto border-t p-4">
            <p className="text-sm font-semibold text-gray-600 mb-3">Adicionar à publicação:</p>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100">
                <span className="text-xl">📷</span>
                <span className="text-sm font-semibold">Foto</span>
              </button>
              {passo === 3 && texto && (
                <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setEmojiAberto(true))} posicao="top">
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 cursor-pointer">
                    <span className="text-xl">😊</span>
                    <span className="text-sm font-semibold">Emoji</span>
                  </button>
                </ElementoClicavel>
              )}
              {passo !== 3 && (
                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100">
                  <span className="text-xl">😊</span>
                  <span className="text-sm font-semibold">Emoji</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {emojiAberto && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="absolute inset-0 bg-white pt-12 z-50">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => setEmojiAberto(false)} className="text-gray-600 text-xl">←</button>
            <p className="font-bold text-gray-800">Escolha um emoji</p>
            <div />
          </div>
          <div className="p-6 grid grid-cols-6 gap-4">
            {passo === 4 && ["☀️", "🌅", "🌸", "🌻", "💐", "🌺", "❤️", "💖", "💝", "🎉", "✨", "⭐"].map((emoji, i) => (
              <ElementoClicavel key={i} onClick={() => { setTexto(texto + " " + emoji); setEmojiAberto(false); handleCliqueCerto(5, null); }} posicao="bottom">
                <div className="aspect-square flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-100 rounded-xl transition-all active:scale-95">
                  {emoji}
                </div>
              </ElementoClicavel>
            ))}
          </div>
        </motion.div>
      )}

      {publicado && (
        <div className="w-full h-full bg-gray-100 pt-12 overflow-y-auto">
          <div className="bg-blue-600 px-4 py-3">
            <h2 className="text-xl font-bold text-white">facebook</h2>
          </div>

          <div className="p-4 space-y-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-100 border-2 border-green-400 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-5xl mb-2">✅</div>
                <p className="font-bold text-green-700">Publicação feita com sucesso!</p>
              </div>
            </motion.div>

            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-4 shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">👤</div>
                <div>
                  <p className="font-bold text-gray-800">Você</p>
                  <p className="text-xs text-gray-400">Agora</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{texto}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>0 curtidas</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}