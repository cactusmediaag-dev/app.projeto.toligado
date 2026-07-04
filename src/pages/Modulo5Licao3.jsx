import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { Heart, Send, Plus, Camera, X, ArrowLeft, CheckCircle, Film, Trash2, ArrowRight } from 'lucide-react';

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
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instagramAberto && !menuAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'instagram', label: 'Instagram', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)', id: 'instagram' },
              { nome: 'facebook', label: 'Facebook', bg: '#1877F2', id: 'facebook' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
            ]}
            appDestacado={passo === 1 ? 'instagram' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'instagram') handleCliqueCerto(2, () => setInstagramAberto(true));
            }}
          />
        </div>
      )}

      {instagramAberto && !menuAberto && !cameraAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, fontFamily: 'cursive' }}>Instagram</h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Heart size={24} color="#1a1a1a" />
              {passo === 2 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setMenuAberto(true))} mostrarSeta={false}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                    <Plus size={26} color="#1a1a1a" />
                  </button>
                </ElementoClicavel>
              )}
              {passo !== 2 && <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}><Plus size={26} color="#ccc" /></button>}
            </div>
          </div>
        </div>
      )}

      {menuAberto && !cameraAberta && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <button onClick={() => setMenuAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <X size={24} color="#1a1a1a" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Criar</p>
            <div />
          </div>
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '16px', background: '#F8F9FA', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Camera size={24} color="#1a1a1a" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>Foto</span>
            </div>
            {passo === 3 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => { setMenuAberto(false); setCameraAberta(true); })} mostrarSeta={false}>
                <div style={{ padding: '16px', background: '#FEF2F2', border: '2px solid #FCA5A5', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <Film size={24} color="#EF4444" />
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>Reels</span>
                </div>
              </ElementoClicavel>
            )}
            <div style={{ padding: '16px', background: '#F8F9FA', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Film size={24} color="#1a1a1a" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>Vídeo</span>
            </div>
            <div style={{ padding: '16px', background: '#F8F9FA', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Plus size={24} color="#1a1a1a" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>Story</span>
            </div>
          </div>
        </motion.div>
      )}

      {cameraAberta && !gravacaoParada && !legendaAberta && (
        <div style={{ height: '100%', background: '#111', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '60px', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>Reels</p>
            {gravando && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#fff', fontWeight: '900', fontSize: '28px', marginTop: '8px' }}
              >
                0:0{tempo}
              </motion.p>
            )}
            {!gravando && <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600', marginTop: '8px' }}>0:00</p>}
          </div>

          <div style={{ fontSize: '72px' }}>🎥</div>

          <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              }} mostrarSeta={false}>
                <div style={{ width: '72px', height: '72px', background: '#fff', borderRadius: '50%', border: '4px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <div style={{ width: '52px', height: '52px', background: '#EF4444', borderRadius: '50%' }} />
                </div>
              </ElementoClicavel>
            )}
            {gravando && passo === 5 && (
              <ElementoClicavel onClick={() => { setGravando(false); setGravacaoParada(true); handleCliqueCerto(6, null); }} mostrarSeta={false}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ width: '72px', height: '72px', background: '#EF4444', borderRadius: '16px', cursor: 'pointer' }}
                />
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {gravacaoParada && !legendaAberta && !publicado && (
        <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', flexShrink: 0 }}>
            <p style={{ color: '#fff', fontWeight: '700' }}>Prévia do Reel</p>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #90CAF9, #CE93D8)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎥</div>
              <p style={{ color: '#fff', fontWeight: '700', fontSize: '20px' }}>Gravação: 0:05</p>
            </div>
          </div>

          <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.9)', flexShrink: 0 }}>
            <button style={{ color: '#fff', fontWeight: '700', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '15px' }}>
              <Trash2 size={20} color="#fff" /> Descartar
            </button>
            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setLegendaAberta(true))} mostrarSeta={false}>
                <button style={{ background: '#0095F6', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '24px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px' }}>
                  Avançar <ArrowRight size={18} color="#fff" />
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {legendaAberta && !publicado && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <button onClick={() => setLegendaAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#1a1a1a', fontWeight: '600', fontSize: '15px', padding: 0 }}>
              <ArrowLeft size={20} color="#1a1a1a" /> Voltar
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Novo Reel</p>
            {passo === 7 && (
              <ElementoClicavel onClick={() => { setPublicado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <button style={{ color: '#0095F6', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Compartilhar</button>
              </ElementoClicavel>
            )}
            {passo !== 7 && <button style={{ color: '#BDBDBD', fontWeight: '700', background: 'none', border: 'none', fontSize: '15px' }}>Compartilhar</button>}
          </div>

          <div style={{ flex: 1, padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '88px', height: '120px', background: 'linear-gradient(180deg, #90CAF9, #CE93D8)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>
                🎥
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#999', marginBottom: '8px', margin: '0 0 8px' }}>Escreva uma legenda...</p>
                <p style={{ color: '#1a1a1a' }}>Meu primeiro Reel! 🎬✨</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {publicado && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle size={72} color="#27AE60" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', marginBottom: '12px', margin: '0 0 12px' }}>Seu Reel foi publicado!</h3>
              <p style={{ color: '#666', fontWeight: '600', fontSize: '16px' }}>Agora todos podem ver seu vídeo</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}