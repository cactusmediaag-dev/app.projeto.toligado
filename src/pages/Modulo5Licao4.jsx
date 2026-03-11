import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo5Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [whatsappAberto, setWhatsappAberto] = useState(false);
  const [conversaAberta, setConversaAberta] = useState(false);
  const [chamando, setChamando] = useState(false);
  const [conectado, setConectado] = useState(false);
  const [mudo, setMudo] = useState(false);
  const [encerrado, setEncerrado] = useState(false);
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
    navigate(createPageUrl("Modulo5Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você faz uma videochamada no WhatsApp?"
        opcoes={[
          "📝 Mandando uma mensagem de texto",
          "📹 Tocando no ícone de câmera dentro da conversa ✅",
          "📶 Ativando o Wi-Fi",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos fazer uma videochamada! Toque no ícone de câmera no canto superior 📹", audio: "Vamos fazer uma videochamada! Toque no ícone de câmera no canto superior!" },
    { instrucao: "Maria atendeu! Você está se vendo! Toque em MUDO para silenciar o microfone 🔇", audio: "Maria atendeu! Você está se vendo! Toque em mudo para silenciar o microfone!" },
    { instrucao: "Para voltar a falar, toque no MICROFONE novamente para ligar 🎤", audio: "Para voltar a falar, toque no microfone novamente para ligar!" },
    { instrucao: "Ótimo! Quando terminar, toque no botão VERMELHO para encerrar a chamada 🔴", audio: "Ótimo! Quando terminar, toque no botão vermelho para encerrar a chamada!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!whatsappAberto && !conversaAberta && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {["💬", "G", "📷", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!conversaAberta && !conectado && !encerrado && (
        <div className="w-full h-full bg-white pt-12">
          <div className="bg-green-600 px-4 py-3">
            <h2 className="text-xl font-bold text-white">WhatsApp</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl cursor-pointer" onClick={() => { setWhatsappAberto(true); setConversaAberta(true); setPasso(1); }}>
              <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-2xl">👩</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Maria (filha)</p>
                <p className="text-sm text-gray-500">Toque para abrir</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {conversaAberta && !conectado && !encerrado && (
        <div className="w-full h-full bg-[#ECE5DD] pt-12 flex flex-col">
          <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setConversaAberta(false)} className="text-white text-xl">←</button>
            <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-xl">👩</div>
            <div className="flex-1">
              <p className="font-bold text-white">Maria</p>
            </div>
            {passo === 1 && (
              <ElementoClicavel onClick={() => { setChamando(true); setTimeout(() => { setChamando(false); setConectado(true); setPasso(2); }, 2000); }} posicao="left">
                <button className="text-white text-2xl">📹</button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {chamando && !conectado && (
        <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-700 pt-12 flex items-center justify-center">
          <div className="text-center">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-32 h-32 bg-pink-200 rounded-full flex items-center justify-center text-6xl mb-6 mx-auto">👩</motion.div>
            <p className="text-white font-bold text-2xl mb-2">Maria</p>
            <p className="text-white/80 text-lg">Chamando...</p>
          </div>
        </div>
      )}

      {conectado && !encerrado && (
        <div className="w-full h-full bg-black pt-12 relative">
          <div className="w-full h-full bg-gradient-to-b from-pink-200 to-purple-300 flex items-center justify-center">
            <div className="text-9xl">👩</div>
          </div>

          <div className="absolute top-16 right-4 w-24 h-32 bg-gradient-to-b from-blue-200 to-blue-400 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white">
            <div className="text-4xl">😊</div>
          </div>

          {mudo && (
            <div className="absolute top-16 left-4 bg-gray-800/80 text-white px-3 py-2 rounded-full text-sm font-bold">
              🔇 Microfone desligado
            </div>
          )}

          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
            {passo === 2 && !mudo && (
              <ElementoClicavel onClick={() => { setMudo(true); handleCliqueCerto(3, null); }} posicao="top">
                <button className="w-16 h-16 bg-gray-800/70 rounded-full flex items-center justify-center text-2xl">🔇</button>
              </ElementoClicavel>
            )}
            {passo === 3 && mudo && (
              <ElementoClicavel onClick={() => { setMudo(false); handleCliqueCerto(4, null); }} posicao="top">
                <button className="w-16 h-16 bg-gray-800/70 rounded-full flex items-center justify-center text-2xl">🎤</button>
              </ElementoClicavel>
            )}
            {passo !== 2 && passo !== 3 && (
              <button className="w-16 h-16 bg-gray-800/70 rounded-full flex items-center justify-center text-2xl">🎤</button>
            )}

            <button className="w-16 h-16 bg-gray-800/70 rounded-full flex items-center justify-center text-2xl">📷</button>

            {passo === 4 && (
              <ElementoClicavel onClick={() => { setEncerrado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="top">
                <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl">📞</button>
              </ElementoClicavel>
            )}
            {passo !== 4 && <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl">📞</button>}
          </div>
        </div>
      )}

      {encerrado && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 pt-12 flex items-center justify-center">
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-8xl mb-6">✅</div>
              <p className="text-white font-bold text-2xl mb-3">Chamada encerrada</p>
              <p className="text-white/70 text-lg">Duração: 0:45</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorWrapper>
  );
}