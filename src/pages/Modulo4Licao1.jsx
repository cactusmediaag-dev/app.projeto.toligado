import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo4Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [whatsappAberto, setWhatsappAberto] = useState(false);
  const [conversaAberta, setConversaAberta] = useState(false);
  const [textoDigitado, setTextoDigitado] = useState("");
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [audioEnviado, setAudioEnviado] = useState(false);
  const [gravandoAudio, setGravandoAudio] = useState(false);
  const [galeriaAberta, setGaleriaAberta] = useState(false);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [fotoEnviada, setFotoEnviada] = useState(false);
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
    navigate(createPageUrl("Modulo4Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você pode enviar pelo WhatsApp?"
        opcoes={[
          "📝 Apenas texto",
          "💬 Texto, áudio, foto, vídeo e muito mais ✅",
          "📞 Apenas ligações",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O WhatsApp é o app de mensagens mais usado no Brasil! Toque no ícone verde 💬", audio: "O WhatsApp é o app de mensagens mais usado no Brasil! Toque no ícone verde!" },
    { instrucao: "Você tem mensagens! Toque na conversa da MARIA para responder 👩", audio: "Você tem mensagens! Toque na conversa da Maria para responder!" },
    { instrucao: "Vamos responder! Toque no campo de texto na parte de baixo ✏️", audio: "Vamos responder! Toque no campo de texto na parte de baixo!" },
    { instrucao: "Mensagem pronta! Toque na SETA VERDE para enviar 📤", audio: "Mensagem pronta! Toque na seta verde para enviar!" },
    { instrucao: "Você também pode mandar ÁUDIO! Segure o microfone e fale 🎤", audio: "Você também pode mandar áudio! Segure o microfone e fale!" },
    { instrucao: "Incrível! Agora vamos mandar uma FOTO! Toque no ícone de câmera 📷", audio: "Incrível! Agora vamos mandar uma foto! Toque no ícone de câmera!" },
    { instrucao: "Escolha uma foto para enviar! Toque em qualquer foto 🖼️", audio: "Escolha uma foto para enviar! Toque em qualquer foto!" },
    { instrucao: "Foto selecionada! Toque em ENVIAR para mandar para a Maria 📤", audio: "Foto selecionada! Toque em enviar para mandar para a Maria!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!whatsappAberto && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setWhatsappAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-md text-white">
                    💬
                  </div>
                </div>
              </ElementoClicavel>
            )}
            {["G", "📷", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {whatsappAberto && !conversaAberta && !galeriaAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">WhatsApp</h2>
            <div className="text-white text-2xl">⋮</div>
          </div>
          <div className="p-4 space-y-3">
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setConversaAberta(true))} posicao="right">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100">
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-2xl">👩</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Maria (filha)</p>
                    <p className="text-sm text-gray-500">Bom dia mãe! ☀️</p>
                  </div>
                  <span className="text-xs text-gray-400">09:30</span>
                </div>
              </ElementoClicavel>
            )}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-2xl">👨</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">José (filho)</p>
                <p className="text-sm text-gray-500">Como você está?</p>
              </div>
              <span className="text-xs text-gray-400">Ontem</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-2xl">👥</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Família Silva</p>
                <p className="text-sm text-gray-500">3 mensagens</p>
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            </div>
          </div>
        </div>
      )}

      {conversaAberta && !galeriaAberta && !fotoSelecionada && (
        <div className="w-full h-full bg-[#ECE5DD] pt-12 flex flex-col">
          <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setConversaAberta(false)} className="text-white text-xl">←</button>
            <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-xl">👩</div>
            <div className="flex-1">
              <p className="font-bold text-white">Maria</p>
              <p className="text-xs text-white/80">online</p>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-xs shadow">
                <p className="text-gray-800">Bom dia mãe! ☀️</p>
                <p className="text-xs text-gray-400 mt-1">09:30</p>
              </div>
            </div>
            {mensagemEnviada && (
              <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                <div className="bg-green-100 rounded-2xl rounded-tr-none p-3 max-w-xs shadow">
                  <p className="text-gray-800">Bom dia filha! 😊</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">09:31 <span className="text-blue-500">✓✓</span></p>
                </div>
              </motion.div>
            )}
            {audioEnviado && (
              <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                <div className="bg-green-100 rounded-2xl rounded-tr-none p-3 max-w-xs shadow flex items-center gap-2">
                  <div className="text-2xl">🎤</div>
                  <div className="flex-1 h-2 bg-green-300 rounded-full" />
                  <span className="text-xs text-gray-600">0:03</span>
                  <p className="text-xs text-gray-400 flex items-center gap-1">09:32 <span className="text-blue-500">✓✓</span></p>
                </div>
              </motion.div>
            )}
            {fotoEnviada && (
              <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                <div className="bg-green-100 rounded-2xl rounded-tr-none p-2 max-w-xs shadow">
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-xl flex items-center justify-center text-4xl">🌅</div>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">09:33 <span className="text-blue-500">✓✓</span></p>
                </div>
              </motion.div>
            )}
          </div>

          {gravandoAudio && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500 px-4 py-3 flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-white text-2xl">🎤</motion.div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => (<motion.div key={i} className="w-1 h-8 bg-white rounded-full" animate={{ scaleY: [1, 2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />))}</div>
                <span className="text-white font-bold">0:03</span>
              </div>
            </motion.div>
          )}

          {!gravandoAudio && (
            <div className="bg-white px-4 py-3 flex items-center gap-3">
              {passo >= 6 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setGaleriaAberta(true))} posicao="top">
                  <button className="text-2xl">📷</button>
                </ElementoClicavel>
              )}
              {passo < 6 && <button className="text-2xl text-gray-400">📷</button>}
              
              {passo === 3 && !textoDigitado && (
                <ElementoClicavel onClick={() => { setTextoDigitado("Bom dia filha! 😊"); handleCliqueCerto(4, null); }} posicao="top">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-pointer">
                    <p className="text-gray-400">Digite uma mensagem</p>
                  </div>
                </ElementoClicavel>
              )}
              {(passo > 3 || textoDigitado) && passo < 5 && (
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <p className="text-gray-800">{textoDigitado || "Digite uma mensagem"}</p>
                </div>
              )}
              {passo >= 5 && (
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <p className="text-gray-400">Digite uma mensagem</p>
                </div>
              )}

              {passo === 4 && textoDigitado && (
                <ElementoClicavel onClick={() => { setMensagemEnviada(true); setTextoDigitado(""); handleCliqueCerto(5, null); }} posicao="top">
                  <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">➤</button>
                </ElementoClicavel>
              )}
              {passo === 5 && !audioEnviado && (
                <ElementoClicavel onClick={() => { setGravandoAudio(true); setTimeout(() => { setGravandoAudio(false); setAudioEnviado(true); setPasso(6); }, 3000); }} posicao="top">
                  <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">🎤</button>
                </ElementoClicavel>
              )}
              {(passo < 4 || (passo > 5)) && <button className="text-2xl text-gray-400">🎤</button>}
            </div>
          )}
        </div>
      )}

      {galeriaAberta && !fotoSelecionada && (
        <div className="w-full h-full bg-black pt-12">
          <div className="px-4 py-3 flex items-center justify-between bg-black/80">
            <button onClick={() => setGaleriaAberta(false)} className="text-white text-xl">✕</button>
            <p className="text-white font-bold">Galeria</p>
            <div />
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {passo === 7 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(8, () => setFotoSelecionada("🌅"))} posicao="bottom">
                <div className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-xl flex items-center justify-center text-6xl cursor-pointer">🌅</div>
              </ElementoClicavel>
            )}
            {["🌻", "🏖️", "🐶"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-blue-200 to-purple-300 rounded-xl flex items-center justify-center text-6xl">{emoji}</div>
            ))}
          </div>
        </div>
      )}

      {fotoSelecionada && (
        <div className="w-full h-full bg-black pt-12 flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between bg-black/80">
            <button onClick={() => { setFotoSelecionada(null); setGaleriaAberta(true); }} className="text-white text-xl">←</button>
            <p className="text-white font-bold">Enviar foto</p>
            <div />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center text-9xl">{fotoSelecionada}</div>
          </div>
          <div className="p-4">
            {passo === 8 && (
              <ElementoClicavel onClick={() => { setFotoEnviada(true); setFotoSelecionada(null); setGaleriaAberta(false); setTimeout(() => setMostrarValidacao(true), 1500); }} posicao="top">
                <button className="w-full bg-green-500 text-white py-4 rounded-full font-bold text-lg">Enviar 📤</button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}