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
import { Facebook, ThumbsUp, MessageCircle, Share2, Search, ArrowLeft, MoreVertical, CheckCircle, Send } from 'lucide-react';

export default function Modulo4Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [facebookAberto, setFacebookAberto] = useState(false);
  const [postAberto, setPostAberto] = useState(false);
  const [curtido, setCurtido] = useState(false);
  const [comentando, setComentando] = useState(false);
  const [comentarioEnviado, setComentarioEnviado] = useState(false);
  const [pedidoRecusado, setPedidoRecusado] = useState(false);
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
    navigate(createPageUrl("Modulo4Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer com pedido de amizade de desconhecido?"
        opcoes={[
          "✅ Aceitar sempre para ter mais amigos",
          "🚫 Recusar — só aceite quem você conhece ✅",
          "🤷 Deixar sem responder para sempre",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O Facebook conecta você com amigos e família! Toque no ícone azul do Facebook 👥", audio: "O Facebook conecta você com amigos e família! Toque no ícone azul do Facebook!" },
    { instrucao: "Esse é o Feed! Aqui aparecem novidades dos seus amigos. Toque na FOTO para ver 📸", audio: "Esse é o Feed! Aqui aparecem novidades dos seus amigos. Toque na foto para ver!" },
    { instrucao: "Você pode CURTIR a foto! Toque no botão de curtir (dedão) 👍", audio: "Você pode curtir a foto! Toque no botão de curtir, o dedão!" },
    { instrucao: "Ótimo! Agora toque em COMENTAR para deixar uma mensagem 💬", audio: "Ótimo! Agora toque em comentar para deixar uma mensagem!" },
    { instrucao: "Comentário escrito! Toque em ENVIAR para publicar seu comentário ✅", audio: "Comentário escrito! Toque em enviar para publicar seu comentário!" },
    { instrucao: "Cuidado! Você não conhece essa pessoa! Toque em RECUSAR para se proteger ⛔", audio: "Cuidado! Você não conhece essa pessoa! Toque em recusar para se proteger!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!facebookAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'facebook', label: 'Facebook', bg: '#1877F2', id: 'facebook' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'mapa', label: 'Mapas', bg: '#34A853', id: 'maps' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
            ]}
            appDestacado={passo === 1 ? 'facebook' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'facebook') handleCliqueCerto(2, () => setFacebookAberto(true));
            }}
          />
        </div>
      )}

      {facebookAberto && !postAberto && (
        <div style={{ height: '100%', background: '#F0F2F5', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#1877F2', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Facebook size={28} color="#fff" />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>facebook</h2>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Search size={22} color="#fff" />
              <MessageCircle size={22} color="#fff" />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setPostAberto(true))} mostrarSeta={false}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>A</div>
                    <div>
                      <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Ana Silva</p>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>2 horas atrás</p>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #81C784, #64B5F6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', marginBottom: '12px' }}>🏞️</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#65676B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={14} color="#1877F2" fill="#1877F2" /> 12 curtidas</span>
                    <span>2 comentários</span>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFB74D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🎂</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '14px' }}>Aniversário da sua amiga Ana hoje!</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Envie uma mensagem</p>
                </div>
              </div>
            </div>

            {passo === 6 && !pedidoRecusado && (
              <ElementoClicavel onClick={() => { setPedidoRecusado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <div style={{ background: '#FEF2F2', border: '2px solid #FECACA', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#BDBDBD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '20px', flexShrink: 0 }}>M</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Marcos Souza</p>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>0 amigos em comum</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ flex: 1, background: '#EF4444', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Recusar</button>
                    <button style={{ flex: 1, background: '#E5E7EB', color: '#666', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700' }}>Aceitar</button>
                  </div>
                </div>
              </ElementoClicavel>
            )}

            {pedidoRecusado && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <CheckCircle size={48} color="#27AE60" style={{ margin: '0 auto 8px' }} />
                <p style={{ fontSize: '18px', fontWeight: '800', color: '#27AE60', margin: '0 0 4px' }}>Certo!</p>
                <p style={{ fontSize: '14px', color: '#2E7D32', margin: 0 }}>Só aceite amizade de quem você conhece!</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {postAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            <button onClick={() => setPostAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#1877F2" />
            </button>
            <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '16px' }}>Publicação</p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>A</div>
              <div>
                <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Ana Silva</p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>2 horas atrás</p>
              </div>
            </div>

            <div style={{ width: '100%', height: '240px', background: 'linear-gradient(135deg, #81C784, #64B5F6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px', marginBottom: '16px' }}>🏞️</div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#65676B', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e5e5' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={16} color={curtido ? "#1877F2" : "#65676B"} fill={curtido ? "#1877F2" : "none"} /> {curtido ? "13" : "12"} curtidas</span>
              <span>{comentarioEnviado ? "3" : "2"} comentários</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0', borderBottom: '1px solid #e5e5e5', marginBottom: '16px' }}>
              {passo === 3 && !curtido && (
                <ElementoClicavel onClick={() => { setCurtido(true); handleCliqueCerto(4, null); }} mostrarSeta={false}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', minHeight: '44px' }}>
                    <ThumbsUp size={22} color="#65676B" />
                    <span style={{ fontWeight: '600', color: '#65676B', fontSize: '14px' }}>Curtir</span>
                  </button>
                </ElementoClicavel>
              )}
              {curtido && (
                <motion.button initial={{ scale: 1.2 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: '#E7F0FD', border: 'none', cursor: 'pointer', minHeight: '44px' }}>
                  <motion.span initial={{ y: -20 }} animate={{ y: 0 }}>
                    <ThumbsUp size={22} color="#1877F2" fill="#1877F2" />
                  </motion.span>
                  <span style={{ fontWeight: '700', color: '#1877F2', fontSize: '14px' }}>Curtido</span>
                </motion.button>
              )}

              {passo === 4 && curtido && !comentando && (
                <ElementoClicavel onClick={() => { setComentando(true); handleCliqueCerto(5, null); }} mostrarSeta={false}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', minHeight: '44px' }}>
                    <MessageCircle size={22} color="#65676B" />
                    <span style={{ fontWeight: '600', color: '#65676B', fontSize: '14px' }}>Comentar</span>
                  </button>
                </ElementoClicavel>
              )}
              {(passo < 4 || comentando || comentarioEnviado) && (
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'none', border: 'none', minHeight: '44px' }}>
                  <MessageCircle size={22} color="#65676B" />
                  <span style={{ fontWeight: '600', color: '#65676B', fontSize: '14px' }}>Comentar</span>
                </button>
              )}

              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'none', border: 'none', minHeight: '44px' }}>
                <Share2 size={22} color="#65676B" />
                <span style={{ fontWeight: '600', color: '#65676B', fontSize: '14px' }}>Compartilhar</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>J</div>
                <div style={{ flex: 1, background: '#F0F2F5', borderRadius: '16px', padding: '12px' }}>
                  <p style={{ fontWeight: '700', fontSize: '13px', color: '#1a1a1a', margin: '0 0 4px' }}>João Costa</p>
                  <p style={{ fontSize: '14px', color: '#1a1a1a', margin: 0 }}>Linda paisagem!</p>
                </div>
              </div>

              {comentarioEnviado && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>V</div>
                  <div style={{ flex: 1, background: '#E7F0FD', borderRadius: '16px', padding: '12px' }}>
                    <p style={{ fontWeight: '700', fontSize: '13px', color: '#1a1a1a', margin: '0 0 4px' }}>Você</p>
                    <p style={{ fontSize: '14px', color: '#1a1a1a', margin: 0 }}>Que foto linda! 😍</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {comentando && !comentarioEnviado && (
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <div style={{ flex: 1, background: '#F0F2F5', borderRadius: '24px', padding: '10px 16px' }}>
                <p style={{ color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Que foto linda! 😍</p>
              </div>
              {passo === 5 && (
                <ElementoClicavel onClick={() => { setComentarioEnviado(true); setComentando(false); handleCliqueCerto(6, null); }} mostrarSeta={false}>
                  <button style={{ width: '44px', height: '44px', background: '#1877F2', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Send size={20} color="#fff" />
                  </button>
                </ElementoClicavel>
              )}
            </div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}