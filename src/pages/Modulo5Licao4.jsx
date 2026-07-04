import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { MessageCircle, Video, Mic, MicOff, PhoneOff, ArrowLeft, MoreVertical, CheckCircle } from 'lucide-react';

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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!whatsappAberto && !conversaAberta && (
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
            onAppClick={() => {
              if (passo === 1) { setWhatsappAberto(true); setConversaAberta(true); setPasso(1); }
            }}
          />
        </div>
      )}

      {!conversaAberta && !conectado && !encerrado && whatsappAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#25D366', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <MessageCircle size={22} color="#fff" />
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>WhatsApp</h2>
          </div>
          <div style={{ flex: 1, padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '12px', cursor: 'pointer' }} onClick={() => { setConversaAberta(true); }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>M</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Maria (filha)</p>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Toque para abrir</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {conversaAberta && !conectado && !encerrado && (
        <div style={{ height: '100%', background: '#ECE5DD', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#25D366', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setConversaAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#fff" />
            </button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700', flexShrink: 0 }}>M</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '700', color: '#fff', margin: 0, fontSize: '16px' }}>Maria</p>
            </div>
            {passo === 1 && (
              <ElementoClicavel onClick={() => { setChamando(true); setTimeout(() => { setChamando(false); setConectado(true); setPasso(2); }, 2000); }} mostrarSeta={false}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <Video size={24} color="#fff" />
                </button>
              </ElementoClicavel>
            )}
            {passo !== 1 && <Video size={24} color="rgba(255,255,255,0.5)" />}
          </div>
        </div>
      )}

      {chamando && !conectado && (
        <div style={{ height: '100%', background: 'linear-gradient(180deg, #25D366, #128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '48px', fontWeight: '700', marginBottom: '24px', margin: '0 auto 24px' }}>M</motion.div>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '22px', marginBottom: '8px', margin: '0 0 8px' }}>Maria</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px' }}>Chamando...</p>
          </div>
        </div>
      )}

      {conectado && !encerrado && (
        <div style={{ height: '100%', background: '#000', position: 'relative' }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #F8BBD0, #CE93D8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '48px', fontWeight: '700' }}>M</div>
          </div>

          <div style={{ position: 'absolute', top: '60px', right: '16px', width: '90px', height: '120px', background: 'linear-gradient(180deg, #90CAF9, #42A5F5)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            <div style={{ color: '#fff', fontSize: '32px', fontWeight: '700' }}>V</div>
          </div>

          {mudo && (
            <div style={{ position: 'absolute', top: '60px', left: '16px', background: 'rgba(30,30,30,0.8)', color: '#fff', padding: '8px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MicOff size={16} color="#fff" /> Microfone desligado
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            {passo === 2 && !mudo && (
              <ElementoClicavel onClick={() => { setMudo(true); handleCliqueCerto(3, null); }} mostrarSeta={false}>
                <button style={{ width: '60px', height: '60px', background: 'rgba(30,30,30,0.7)', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <MicOff size={26} color="#fff" />
                </button>
              </ElementoClicavel>
            )}
            {passo === 3 && mudo && (
              <ElementoClicavel onClick={() => { setMudo(false); handleCliqueCerto(4, null); }} mostrarSeta={false}>
                <button style={{ width: '60px', height: '60px', background: 'rgba(30,30,30,0.7)', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Mic size={26} color="#fff" />
                </button>
              </ElementoClicavel>
            )}
            {passo !== 2 && passo !== 3 && (
              <button style={{ width: '60px', height: '60px', background: 'rgba(30,30,30,0.7)', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={26} color="#fff" />
              </button>
            )}

            <button style={{ width: '60px', height: '60px', background: 'rgba(30,30,30,0.7)', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={26} color="#fff" />
            </button>

            {passo === 4 && (
              <ElementoClicavel onClick={() => { setEncerrado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <button style={{ width: '60px', height: '60px', background: '#EF4444', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <PhoneOff size={26} color="#fff" />
                </button>
              </ElementoClicavel>
            )}
            {passo !== 4 && <button style={{ width: '60px', height: '60px', background: '#EF4444', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PhoneOff size={26} color="#fff" /></button>}
          </div>
        </div>
      )}

      {encerrado && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', background: 'linear-gradient(180deg, #1a1a1a, #333)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle size={64} color="#27AE60" style={{ margin: '0 auto 24px' }} />
              <p style={{ color: '#fff', fontWeight: '700', fontSize: '22px', marginBottom: '12px', margin: '0 0 12px' }}>Chamada encerrada</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px' }}>Duração: 0:45</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}