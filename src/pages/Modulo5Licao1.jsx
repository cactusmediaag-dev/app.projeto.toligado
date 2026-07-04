import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Facebook, ThumbsUp, X, Camera, Smile, ArrowLeft, CheckCircle, MoreVertical, Image as ImageIcon } from 'lucide-react';

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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!postAberto && !publicado && (
        <div style={{ height: '100%', background: '#F0F2F5', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#1877F2', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Facebook size={28} color="#fff" />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>facebook</h2>
            </div>
            <MoreVertical size={22} color="#fff" />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setPostAberto(true))} mostrarSeta={false}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>V</div>
                  <p style={{ color: '#999', margin: 0, fontSize: '16px' }}>O que você está pensando?</p>
                </div>
              </ElementoClicavel>
            )}

            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>A</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Ana Silva</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>2 horas atrás</p>
                </div>
              </div>
              <p style={{ color: '#1a1a1a', marginBottom: '12px', margin: '0 0 12px', fontSize: '15px' }}>Que dia maravilhoso! ☀️</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#65676B' }}>
                <ThumbsUp size={14} color="#1877F2" fill="#1877F2" /> 15 curtidas
              </div>
            </div>
          </div>
        </div>
      )}

      {postAberto && !emojiAberto && !publicado && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <button onClick={() => setPostAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#65676B', fontWeight: '600', fontSize: '15px', padding: 0 }}>
              <X size={20} color="#65676B" /> Cancelar
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Criar publicação</p>
            {passo === 5 && texto && (
              <ElementoClicavel onClick={() => { setPublicado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <button style={{ background: '#1877F2', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Publicar</button>
              </ElementoClicavel>
            )}
            {passo !== 5 && <button style={{ background: '#E5E7EB', color: '#BDBDBD', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '15px' }}>Publicar</button>}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>V</div>
              <div>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Você</p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Público · Agora</p>
              </div>
            </div>

            {passo === 2 && !texto && (
              <ElementoClicavel onClick={() => { setTexto("Que dia lindo hoje! Gratidão pela vida! 🌅"); handleCliqueCerto(3, null); }} mostrarSeta={false}>
                <div style={{ minHeight: '120px', border: '2px solid #e5e5e5', borderRadius: '12px', padding: '16px', cursor: 'pointer' }}>
                  <p style={{ color: '#999', margin: 0, fontSize: '16px' }}>O que você está pensando?</p>
                </div>
              </ElementoClicavel>
            )}

            {texto && (
              <div style={{ minHeight: '120px', padding: '16px 0' }}>
                <p style={{ color: '#1a1a1a', fontSize: '18px', lineHeight: 1.6, margin: 0 }}>{texto}</p>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid #e5e5e5', padding: '12px 16px', flexShrink: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#65676B', marginBottom: '12px', margin: '0 0 12px' }}>Adicionar à publicação:</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', background: '#F0F2F5', border: 'none', minHeight: '44px' }}>
                <ImageIcon size={20} color="#00806D" />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#65676B' }}>Foto</span>
              </button>
              {passo === 3 && texto && (
                <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setEmojiAberto(true))} mostrarSeta={false}>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', background: '#F0F2F5', border: 'none', cursor: 'pointer', minHeight: '44px' }}>
                    <Smile size={20} color="#F3984B" />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#65676B' }}>Emoji</span>
                  </button>
                </ElementoClicavel>
              )}
              {passo !== 3 && (
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', background: '#F0F2F5', border: 'none', minHeight: '44px' }}>
                  <Smile size={20} color="#F3984B" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#65676B' }}>Emoji</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {emojiAberto && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <button onClick={() => setEmojiAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#1a1a1a" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Escolha um emoji</p>
            <div />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {passo === 4 && ["☀️", "🌅", "🌸", "🌻", "💐", "🌺", "❤️", "💖", "💝", "🎉", "✨", "⭐"].map((emoji, i) => (
              <ElementoClicavel key={i} onClick={() => { setTexto(texto + " " + emoji); setEmojiAberto(false); handleCliqueCerto(5, null); }} mostrarSeta={false}>
                <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', cursor: 'pointer', borderRadius: '12px' }}>
                  {emoji}
                </div>
              </ElementoClicavel>
            ))}
          </div>
        </motion.div>
      )}

      {publicado && (
        <div style={{ height: '100%', background: '#F0F2F5', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#1877F2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Facebook size={28} color="#fff" />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>facebook</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '12px' }}>
              <CheckCircle size={48} color="#27AE60" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '700', color: '#27AE60', margin: 0 }}>Publicação feita com sucesso!</p>
            </motion.div>

            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>V</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Você</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Agora</p>
                </div>
              </div>
              <p style={{ color: '#1a1a1a', marginBottom: '12px', margin: '0 0 12px', fontSize: '15px', lineHeight: 1.5 }}>{texto}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#65676B' }}>
                <ThumbsUp size={14} color="#65676B" /> 0 curtidas
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}