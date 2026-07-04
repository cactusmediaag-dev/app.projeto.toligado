import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { MessageCircle, Mic, Send, ArrowLeft, MoreVertical, X, Camera } from 'lucide-react';

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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!whatsappAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'mapa', label: 'Mapas', bg: '#34A853', id: 'maps' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
            ]}
            appDestacado={passo === 1 ? 'whatsapp' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'whatsapp') handleCliqueCerto(2, () => setWhatsappAberto(true));
            }}
          />
        </div>
      )}

      {whatsappAberto && !conversaAberta && !galeriaAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#25D366', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={22} color="#fff" />
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>WhatsApp</h2>
            </div>
            <MoreVertical size={22} color="#fff" />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setConversaAberta(true))} mostrarSeta={false}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '12px', cursor: 'pointer' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>M</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Maria (filha)</p>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Bom dia mãe! ☀️</p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#999' }}>09:30</span>
                </div>
              </ElementoClicavel>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>J</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>José (filho)</p>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Como você está?</p>
              </div>
              <span style={{ fontSize: '12px', color: '#999' }}>Ontem</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>F</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Família Silva</p>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>3 mensagens</p>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700' }}>3</div>
            </div>
          </div>
        </div>
      )}

      {conversaAberta && !galeriaAberta && !fotoSelecionada && (
        <div style={{ height: '100%', background: '#ECE5DD', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#25D366', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setConversaAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#fff" />
            </button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700', flexShrink: 0 }}>M</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '700', color: '#fff', margin: 0, fontSize: '16px' }}>Maria</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>online</p>
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
                  <Mic size={24} color="#25D366" />
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
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Mic size={24} color="#fff" />
            </motion.div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => (<motion.div key={i} className="w-1 h-8 bg-white rounded-full" animate={{ scaleY: [1, 2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />))}</div>
                <span className="text-white font-bold">0:03</span>
              </div>
            </motion.div>
          )}

          {!gravandoAudio && (
            <div style={{ background: '#fff', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {passo >= 6 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setGaleriaAberta(true))} mostrarSeta={false}>
                  <button style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={24} color="#666" />
                  </button>
                </ElementoClicavel>
              )}
              {passo < 6 && <button style={{ width: '44px', height: '44px', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={24} color="#ccc" /></button>}
              
              {passo === 3 && !textoDigitado && (
                <ElementoClicavel onClick={() => { setTextoDigitado("Bom dia filha! 😊"); handleCliqueCerto(4, null); }} mostrarSeta={false}>
                  <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '24px', padding: '10px 16px', cursor: 'pointer' }}>
                    <p style={{ color: '#999', margin: 0, fontSize: '15px' }}>Digite uma mensagem</p>
                  </div>
                </ElementoClicavel>
              )}
              {(passo > 3 || textoDigitado) && passo < 5 && (
                <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '24px', padding: '10px 16px' }}>
                  <p style={{ color: '#333', margin: 0, fontSize: '15px' }}>{textoDigitado || "Digite uma mensagem"}</p>
                </div>
              )}
              {passo >= 5 && (
                <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '24px', padding: '10px 16px' }}>
                  <p style={{ color: '#999', margin: 0, fontSize: '15px' }}>Digite uma mensagem</p>
                </div>
              )}

              {passo === 4 && textoDigitado && (
                <ElementoClicavel onClick={() => { setMensagemEnviada(true); setTextoDigitado(""); handleCliqueCerto(5, null); }} mostrarSeta={false}>
                  <button style={{ width: '44px', height: '44px', background: '#25D366', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Send size={20} color="#fff" />
                  </button>
                </ElementoClicavel>
              )}
              {passo === 5 && !audioEnviado && (
                <ElementoClicavel onClick={() => { setGravandoAudio(true); setTimeout(() => { setGravandoAudio(false); setAudioEnviado(true); setPasso(6); }, 3000); }} mostrarSeta={false}>
                  <button style={{ width: '44px', height: '44px', background: '#25D366', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mic size={22} color="#fff" />
                  </button>
                </ElementoClicavel>
              )}
              {(passo < 4 || (passo > 5)) && <button style={{ width: '44px', height: '44px', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mic size={24} color="#ccc" /></button>}
            </div>
          )}
        </div>
      )}

      {galeriaAberta && !fotoSelecionada && (
        <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', flexShrink: 0 }}>
            <button onClick={() => setGaleriaAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <X size={24} color="#fff" />
            </button>
            <p style={{ color: '#fff', fontWeight: '700' }}>Galeria</p>
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
        <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', flexShrink: 0 }}>
            <button onClick={() => { setFotoSelecionada(null); setGaleriaAberta(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={24} color="#fff" />
            </button>
            <p style={{ color: '#fff', fontWeight: '700' }}>Enviar foto</p>
            <div />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center text-9xl">{fotoSelecionada}</div>
          </div>
          <div className="p-4">
            {passo === 8 && (
              <ElementoClicavel onClick={() => { setFotoEnviada(true); setFotoSelecionada(null); setGaleriaAberta(false); setTimeout(() => setMostrarValidacao(true), 1500); }} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '16px', borderRadius: '24px', fontWeight: '700', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={20} color="#fff" /> Enviar
                </button>
              </ElementoClicavel>
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