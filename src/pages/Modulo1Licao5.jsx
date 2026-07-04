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
import { Image as ImageIcon, Share2, MessageCircle, Mail, Smartphone, Copy, Edit3, Trash2 } from 'lucide-react';

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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!fotosAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
            ]}
            appDestacado={passo === 1 ? 'photos' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'photos') handleCliqueCerto(2, () => setFotosAberto(true));
            }}
          />
        </div>
      )}

      {fotosAberto && !fotoSelecionada && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <ImageIcon size={28} color="#FF7043" />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#333', margin: 0 }}>Google Fotos</h2>
              <p style={{ fontSize: '13px', color: '#999', margin: 0, fontWeight: '600' }}>6 fotos</p>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {fotos.map((emoji, i) => (
              <div key={i}>
                {passo === 2 ? (
                  <ElementoClicavel
                    onClick={() => handleCliqueCerto(3, () => setFotoSelecionada(emoji))}
                    mostrarSeta={false}
                  >
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: '#f5f5f5' }}>
                      {emoji}
                    </div>
                  </ElementoClicavel>
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: '#f5f5f5' }}>
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
                  <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', }}><Share2 size={22} color="#fff" /></div>
                  <span style={{ color:'#fff', fontSize:'11px', fontWeight:'600' }}>Compartilhar</span>
                </div>
              </ElementoClicavel>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', }}><Share2 size={22} color="#fff" /></div>
                <span style={{ color:'#fff', fontSize:'11px', fontWeight:'600' }}>Compartilhar</span>
              </div>
            )}
            {[Edit3, Trash2].map((Ic, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'48px', height:'48px', background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}><Ic size={22} color="#fff" /></div>
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
              { Icon: MessageCircle, nome: "WhatsApp", cor: "#25D366" },
              { Icon: Mail, nome: "Email", cor: "#EA4335" },
              { Icon: Smartphone, nome: "SMS", cor: "#4285F4" },
              { Icon: Copy, nome: "Copiar", cor: "#607D8B" },
            ].map((app, i) => {
              const Ic = app.Icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Ic size={24} color={app.cor} />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold text-center">{app.nome}</span>
                </div>
              );
            })}
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
    </SimuladorImersivo>
  );
}