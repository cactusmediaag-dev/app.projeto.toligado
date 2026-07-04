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
import { Heart, Send, MessageCircle, Home, Search, Plus, ArrowLeft, X, Settings, Lock, Bell, User, CheckCircle, ChevronRight } from 'lucide-react';

export default function Modulo4Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [instagramAberto, setInstagramAberto] = useState(false);
  const [storyAberto, setStoryAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);
  const [privacidadeAberta, setPrivacidadeAberta] = useState(false);
  const [contaPrivada, setContaPrivada] = useState(false);
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
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod4")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod4"],
            xp_total: (users[0].xp_total || 0) + 80,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo4Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que é importante deixar o Instagram privado?"
        opcoes={[
          "🌐 Para todo mundo ver suas fotos",
          "🔒 Para só seus seguidores verem — mais segurança ✅",
          "📵 Para não conseguir mais postar",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O Instagram é para compartilhar fotos e momentos! Toque no ícone 📸", audio: "O Instagram é para compartilhar fotos e momentos! Toque no ícone!" },
    { instrucao: "Esses círculos no topo são os STORIES! Toque em um para ver 🔵", audio: "Esses círculos no topo são os stories! Toque em um para ver!" },
    { instrucao: "O story passa sozinho! Toque na tela para avançar ou feche com X ✕", audio: "O story passa sozinho! Toque na tela para avançar ou feche com X!" },
    { instrucao: "Vamos ao seu PERFIL! Toque no ícone de bonequinho no canto inferior direito 👤", audio: "Vamos ao seu perfil! Toque no ícone de bonequinho no canto inferior direito!" },
    { instrucao: "Seu perfil está PÚBLICO! Qualquer um pode ver. Vamos deixar PRIVADO! Toque em ⚙️", audio: "Seu perfil está público! Qualquer um pode ver. Vamos deixar privado! Toque em configurações!" },
    { instrucao: "Toque em PRIVACIDADE DA CONTA para proteger seu perfil 🔒", audio: "Toque em privacidade da conta para proteger seu perfil!" },
    { instrucao: "Ative a CONTA PRIVADA! Toque no botão para ligar 🔒", audio: "Ative a conta privada! Toque no botão para ligar!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={7}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instagramAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'instagram', label: 'Instagram', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)', id: 'instagram' },
              { nome: 'facebook', label: 'Facebook', bg: '#1877F2', id: 'facebook' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'mapa', label: 'Mapas', bg: '#34A853', id: 'maps' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
            ]}
            appDestacado={passo === 1 ? 'instagram' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'instagram') handleCliqueCerto(2, () => setInstagramAberto(true));
            }}
          />
        </div>
      )}

      {instagramAberto && !storyAberto && !perfilAberto && !configAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, fontFamily: 'cursive' }}>Instagram</h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Heart size={24} color="#1a1a1a" />
              <Send size={24} color="#1a1a1a" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', overflowX: 'auto', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setStoryAberto(true))} mostrarSeta={false}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #8134AF, #DD2A7B)', padding: '2px', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🏖️</div>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '600' }}>Ana</p>
                </div>
              </ElementoClicavel>
            )}
            {["🌻", "🎂", "🐶"].map((emoji, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #F58529, #E1306C)', padding: '2px', flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{emoji}</div>
                </div>
                <p style={{ fontSize: '12px', fontWeight: '600' }}>Story</p>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>M</div>
                <p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>maria_silva</p>
              </div>
              <div style={{ width: '100%', aspectRatio: '1', background: 'linear-gradient(135deg, #90CAF9, #CE93D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px' }}>🏔️</div>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <Heart size={26} color="#1a1a1a" />
                  <MessageCircle size={26} color="#1a1a1a" />
                  <Send size={26} color="#1a1a1a" />
                </div>
                <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>152 curtidas</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '8px 0', flexShrink: 0 }}>
            <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}><Home size={24} color="#1a1a1a" /></button>
            <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}><Search size={24} color="#1a1a1a" /></button>
            <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}><Plus size={24} color="#1a1a1a" /></button>
            <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}><Heart size={24} color="#1a1a1a" /></button>
            {passo === 4 && !perfilAberto && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setPerfilAberto(true))} mostrarSeta={false}>
                <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}>
                  <User size={24} color="#1a1a1a" />
                </button>
              </ElementoClicavel>
            )}
            {passo !== 4 && <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', minWidth: '44px' }}><User size={24} color="#999" /></button>}
          </div>
        </div>
      )}

      {storyAberto && (
        <div style={{ height: '100%', background: '#000', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '8px', left: 0, right: 0, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: '#fff' }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} />
            </div>
          </div>

          <div style={{ position: 'absolute', top: '24px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px' }}>A</div>
            <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Ana Silva</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>2h</p>
          </div>

          {passo === 3 && (
            <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setStoryAberto(false))} mostrarSeta={false}>
              <button style={{ position: 'absolute', top: '20px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 10 }}>
                <X size={28} color="#fff" />
              </button>
            </ElementoClicavel>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontSize: '80px' }}>🏖️</div>
          </div>
        </div>
      )}

      {perfilAberto && !configAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            <button onClick={() => setPerfilAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#1a1a1a" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>seu_perfil</p>
            <div />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #CE93D8, #F48FB1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: '700', flexShrink: 0 }}>V</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Seu Nome</p>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>seu_perfil</p>
              </div>
              {passo === 5 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(6, () => setConfigAberta(true))} mostrarSeta={false}>
                  <button style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Settings size={24} color="#1a1a1a" />
                  </button>
                </ElementoClicavel>
              )}
              {passo !== 5 && <button style={{ width: '44px', height: '44px', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Settings size={24} color="#ccc" /></button>}
            </div>

            <div style={{ background: '#FFF3E0', border: '2px solid #FFB74D', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ textAlign: 'center', fontWeight: '800', color: '#E65100', margin: 0 }}>Perfil Público</p>
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#EF6C00', marginTop: '4px', margin: '4px 0 0' }}>Qualquer pessoa pode ver suas fotos</p>
            </div>

            <button style={{ width: '100%', background: '#F0F2F5', color: '#1a1a1a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', marginBottom: '16px', cursor: 'pointer' }}>Editar Perfil</button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
              {["🌅", "🌻", "🏖️", "🐶", "🎂", "🏔️"].map((emoji, i) => (
                <div key={i} style={{ aspectRatio: '1', background: 'linear-gradient(135deg, #90CAF9, #CE93D8)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{emoji}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {configAberta && !privacidadeAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            <button onClick={() => setConfigAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#1a1a1a" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Configurações</p>
          </div>
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setPrivacidadeAberta(true))} mostrarSeta={false}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Lock size={22} color="#1a1a1a" />
                    <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>Privacidade da Conta</span>
                  </div>
                  <ChevronRight size={20} color="#ccc" />
                </div>
              </ElementoClicavel>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Bell size={22} color="#1a1a1a" />
                <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>Notificações</span>
              </div>
              <ChevronRight size={20} color="#ccc" />
            </div>
          </div>
        </div>
      )}

      {privacidadeAberta && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            <button onClick={() => setPrivacidadeAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#1a1a1a" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Privacidade</p>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1565C0', margin: '0 0 8px' }}>Conta Privada</p>
              <p style={{ fontSize: '14px', color: '#1976D2', margin: 0 }}>Quando sua conta é privada, somente pessoas que você aprovar podem ver suas fotos e vídeos.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#F8F9FA', borderRadius: '12px' }}>
              <div>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '16px' }}>Conta Privada</p>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Mais segurança para você</p>
              </div>
              {passo === 7 && !contaPrivada && (
                <ElementoClicavel onClick={() => { setContaPrivada(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                  <div style={{ width: '52px', height: '32px', background: '#D1D5DB', borderRadius: '16px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: '4px', left: '4px', width: '24px', height: '24px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                </ElementoClicavel>
              )}
              {contaPrivada && (
                <motion.div initial={{ backgroundColor: "#D1D5DB" }} animate={{ backgroundColor: "#22C55E" }} style={{ width: '52px', height: '32px', borderRadius: '16px', position: 'relative' }}>
                  <motion.div initial={{ left: 4 }} animate={{ left: 24 }} style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </motion.div>
              )}
            </div>

            {contaPrivada && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '12px', padding: '24px', marginTop: '24px', textAlign: 'center' }}>
                <Lock size={56} color="#27AE60" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '20px', fontWeight: '800', color: '#27AE60', margin: '0 0 8px' }}>Conta privada ativada!</p>
                <p style={{ fontSize: '14px', color: '#2E7D32', margin: 0 }}>Só seus seguidores veem suas fotos</p>
              </motion.div>
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