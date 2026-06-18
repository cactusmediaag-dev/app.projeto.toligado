import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo5Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [instagramAberto, setInstagramAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [gravando, setGravando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [gravacaoParada, setGravacaoParada] = useState(false);
  const [legendaAberta, setLegendaAberta] = useState(false);
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
    navigate(createPageUrl("Modulo5Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você começa a gravar um Reel no Instagram?"
        opcoes={[
          "🔍 Pesquisando no Google",
          "🎬 Tocando no ícone de câmera e escolhendo Reels ✅",
          "📞 Ligando para o Instagram",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos gravar um vídeo no Instagram! Toque no ícone de câmera no topo ➕", audio: "Vamos gravar um vídeo no Instagram! Toque no ícone de câmera no topo!" },
    { instrucao: "Escolha REELS para gravar um vídeo curto e divertido! 🎬", audio: "Escolha reels para gravar um vídeo curto e divertido!" },
    { instrucao: "A câmera está pronta! Toque no botão REDONDO para começar a gravar 🔴", audio: "A câmera está pronta! Toque no botão redondo para começar a gravar!" },
    { instrucao: "Está gravando! Toque novamente para PARAR a gravação ⏹️", audio: "Está gravando! Toque novamente para parar a gravação!" },
    { instrucao: "Vídeo gravado! Toque em AVANÇAR para publicar seu vídeo 🚀", audio: "Vídeo gravado! Toque em avançar para publicar seu vídeo!" },
    { instrucao: "Escreva uma legenda e toque em COMPARTILHAR para publicar! 🎉", audio: "Escreva uma legenda e toque em compartilhar para publicar!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instagramAberto && !menuAberto && (
        <div className="w-full h-full bg-gradient-to-b from-purple-50 to-pink-50 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setInstagramAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-md text-white">📷</div>
                </div>
              </ElementoClicavel>
            )}
            {["📘", "💬", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {instagramAberto && !menuAberto && !cameraAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Instagram</h2>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setMenuAberto(true))} posicao="left">
                <button className="text-2xl">➕</button>
              </ElementoClicavel>
            )}
            {passo !== 2 && <button className="text-2xl">➕</button>}
          </div>
        </div>
      )}

      {menuAberto && !cameraAberta && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="absolute inset-0 bg-white pt-12 z-50">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => setMenuAberto(false)} className="text-xl">✕</button>
            <p className="font-bold text-gray-800">Criar</p>
            <div />
          </div>
          <div className="p-4 space-y-3">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">📷</span>
              <span className="text-lg font-bold text-gray-700">Foto</span>
            </div>
            {passo === 3 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => { setMenuAberto(false); setCameraAberta(true); })} posicao="right">
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-center gap-3 cursor-pointer">
                  <span className="text-3xl">🎬</span>
                  <span className="text-lg font-bold text-gray-700">Reels</span>
                </div>
              </ElementoClicavel>
            )}
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">📺</span>
              <span className="text-lg font-bold text-gray-700">Vídeo</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">📖</span>
              <span className="text-lg font-bold text-gray-700">Story</span>
            </div>
          </div>
        </motion.div>
      )}

      {cameraAberta && !gravacaoParada && !legendaAberta && (
        <div className="w-full h-full bg-gradient-to-b from-blue-200 to-purple-300 pt-12 relative flex items-center justify-center">
          <div className="absolute top-16 left-0 right-0 text-center">
            <p className="text-white font-bold text-lg">🎬 Reels</p>
            {gravando && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white font-black text-3xl mt-2"
              >
                0:0{tempo}
              </motion.p>
            )}
            {!gravando && <p className="text-white/70 font-semibold mt-2">0:00</p>}
          </div>

          <div className="text-9xl">🎥</div>

          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
            {passo === 4 && !gravando && (
              <ElementoClicavel onClick={() => {
                setGravando(true);
                let t = 0;
                const intervalo = setInterval(() => {
                  t++;
                  setTempo(t);
                  if (t >= 5) {
                    clearInterval(intervalo);
                    setPasso(5);
                  }
                }, 1000);
              }} posicao="top">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center cursor-pointer">
                  <div className="w-14 h-14 bg-red-500 rounded-full" />
                </div>
              </ElementoClicavel>
            )}
            {gravando && passo === 5 && (
              <ElementoClicavel onClick={() => { setGravando(false); setGravacaoParada(true); handleCliqueCerto(6, null); }} posicao="top">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-20 h-20 bg-red-500 rounded-2xl cursor-pointer"
                />
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {gravacaoParada && !legendaAberta && !publicado && (
        <div className="w-full h-full bg-black pt-12 flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between bg-black/80">
            <p className="text-white font-bold">Prévia do Reel</p>
          </div>

          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-200 to-purple-300">
            <div className="text-center">
              <div className="text-8xl mb-4">🎥</div>
              <p className="text-white font-bold text-xl">Gravação: 0:05</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between bg-black/90">
            <button className="text-white font-bold">⬅️ Descartar</button>
            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setLegendaAberta(true))} posicao="top">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold">➡️ Avançar</button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {legendaAberta && !publicado && (
        <div className="w-full h-full bg-white pt-12 flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => setLegendaAberta(false)} className="text-gray-600">← Voltar</button>
            <p className="font-bold text-gray-800">Novo Reel</p>
            {passo === 7 && (
              <ElementoClicavel onClick={() => { setPublicado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="left">
                <button className="text-blue-600 font-bold">Compartilhar</button>
              </ElementoClicavel>
            )}
          </div>

          <div className="p-4">
            <div className="flex gap-4 mb-6">
              <div className="w-24 h-32 bg-gradient-to-b from-blue-200 to-purple-300 rounded-xl flex items-center justify-center text-4xl">
                🎥
              </div>
              <div className="flex-1">
                <p className="text-gray-400 mb-2">Escreva uma legenda...</p>
                <p className="text-gray-700">Meu primeiro Reel! 🎬✨</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {publicado && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-white pt-12 flex items-center justify-center p-6">
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <div className="text-8xl mb-6">🎬</div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">✅ Seu Reel foi publicado!</h3>
              <p className="text-gray-600 font-semibold">Agora todos podem ver seu vídeo</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorWrapper>
  );
}