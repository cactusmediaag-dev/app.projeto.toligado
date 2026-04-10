import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo1Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [fotosAberto, setFotosAberto] = useState(false);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [menuCompartilhar, setMenuCompartilhar] = useState(false);
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
        const user = users[0];
        const modulosCompletos = user.modulos_completos || [];
        if (!modulosCompletos.includes("mod1")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (user.moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod1"],
            xp_total: (user.xp_total || 0) + 100,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo1Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual a vantagem do Google Fotos?"
        opcoes={[
          "🗑️ Apaga as fotos automaticamente",
          "☁️ Guarda suas fotos com segurança, mesmo se perder o celular ✅",
          "📵 Não deixa tirar novas fotos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const fotos = ["🌅", "👨‍👩‍👧", "🌻", "🎂", "🏖️", "🐶"];

  const passos = [
    {
      instrucao: "Vamos conhecer o Google Fotos! Toque no ícone do Google Fotos 📸",
      audio: "Vamos conhecer o Google Fotos! Toque no ícone do Google Fotos!",
    },
    {
      instrucao: "Aqui estão suas fotos! Toque em uma foto para ver maior 🖼️",
      audio: "Aqui estão suas fotos! Toque em uma foto para ver maior!",
    },
    {
      instrucao: "Toque no ícone de COMPARTILHAR (seta saindo de uma caixa) para enviar a foto 📤",
      audio: "Toque no ícone de compartilhar para enviar a foto!",
    },
    {
      instrucao: "Viu? Você pode enviar pelo WhatsApp, email e muito mais! Toque em FECHAR para voltar 😊",
      audio: "Viu? Você pode enviar pelo WhatsApp, email e muito mais! Toque em fechar para voltar!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!fotosAberto && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setFotosAberto(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    📸
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Fotos</span>
                </div>
              </ElementoClicavel>
            )}
            {["G", "📷", "📱", "⚙️", "📧", "🎵", "📍"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fotosAberto && !fotoSelecionada && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-black text-gray-800">Fotos</h2>
            <p className="text-sm text-gray-500 font-semibold">6 fotos</p>
          </div>
          <div className="px-4 grid grid-cols-3 gap-2">
            {fotos.map((emoji, i) => (
              <div key={i}>
                {passo === 2 ? (
                  <ElementoClicavel
                    onClick={() => handleCliqueCerto(3, () => setFotoSelecionada(emoji))}
                    posicao={i < 3 ? "bottom" : "top"}
                  >
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl cursor-pointer active:scale-95 transition-all shadow-md">
                      {emoji}
                    </div>
                  </ElementoClicavel>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl shadow-md">
                    {emoji}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {fotoSelecionada && !menuCompartilhar && (
        <div style={{ width:'100%', height:'100%', background:'#000', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Foto */}
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', minHeight:0 }}>
            <div style={{ fontSize:'100px' }}>{fotoSelecionada}</div>
            <button
              onClick={() => { setFotoSelecionada(null); setPasso(2); }}
              style={{ position:'absolute', top:'8px', left:'12px', color:'#fff', background:'none', border:'none', fontSize:'24px', cursor:'pointer' }}
            >
              ←
            </button>
          </div>
          {/* Barra de ações */}
          <div style={{ flexShrink:0, background:'rgba(0,0,0,0.8)', padding:'12px 24px 20px', display:'flex', justifyContent:'space-around' }}>
            {passo === 3 ? (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setMenuCompartilhar(true))}
                posicao="top"
              >
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', cursor:'pointer' }}>
                  <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>📤</div>
                  <span style={{ color:'#fff', fontSize:'11px', fontWeight:'600' }}>Compartilhar</span>
                </div>
              </ElementoClicavel>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>📤</div>
                <span style={{ color:'#fff', fontSize:'11px', fontWeight:'600' }}>Compartilhar</span>
              </div>
            )}
            {['✏️','🗑️'].map((emoji, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {menuCompartilhar && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl"
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-800 mb-4">Compartilhar via:</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { emoji: "💬", nome: "WhatsApp" },
              { emoji: "📧", nome: "Email" },
              { emoji: "📱", nome: "SMS" },
              { emoji: "📋", nome: "Copiar" },
            ].map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                  {app.emoji}
                </div>
                <span className="text-xs text-gray-600 font-semibold text-center">{app.nome}</span>
              </div>
            ))}
          </div>
          {passo === 4 && (
            <ElementoClicavel
              onClick={() => {
                setMenuCompartilhar(false);
                setFotoSelecionada(null);
                setFotosAberto(true);
                setMostrarValidacao(true);
              }}
              posicao="top"
            >
              <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all">
                ✕ Fechar
              </button>
            </ElementoClicavel>
          )}
        </motion.div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}