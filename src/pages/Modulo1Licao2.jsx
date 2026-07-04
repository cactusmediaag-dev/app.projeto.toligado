import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { Mic, ChevronLeft, Circle, Square, Search, CheckCircle, AlertCircle } from 'lucide-react';

const AssistenteVoz = ({ onSuccess, onSkip }) => {
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setStatus('notsupported'); return; }
    const r = new SR();
    recognitionRef.current = r;
    r.lang = 'pt-BR';
    r.continuous = false;
    r.interimResults = true;
    r.onstart = () => setStatus('listening');
    r.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      if (e.results[0].isFinal) {
        setStatus('heard');
        setTimeout(() => onSuccess(text), 1200);
      }
    };
    r.onerror = () => setStatus('error');
    r.start();
  };

  useEffect(() => () => recognitionRef.current?.stop(), []);

  if (status === 'notsupported' || status === 'error') return (
    <div style={{ height:'100%', background:'#1a1a2e', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff', padding:'24px', textAlign:'center', gap:'16px' }}>
      <AlertCircle size={52} color="#fff" />
      <p style={{ fontSize:'16px' }}>{status === 'error' ? 'Não consegui ouvir. Fale mais alto! 🔊' : 'Microfone não disponível. Pode continuar! 😊'}</p>
      {status === 'error' && (
        <button onClick={startListening} style={{ background:'#4285F4', color:'#fff', border:'none', borderRadius:'14px', padding:'14px 28px', fontSize:'16px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}><Mic size={20} color="#fff" /> Tentar de novo</button>
      )}
      <button onClick={onSkip} style={{ background: status === 'error' ? 'transparent' : '#F3984B', color: status === 'error' ? 'rgba(255,255,255,0.5)' : '#fff', border:'none', borderRadius:'14px', padding:'12px 24px', fontSize:'14px', cursor:'pointer' }}>{status === 'error' ? 'Pular →' : 'Continuar a lição ➜'}</button>
    </div>
  );

  if (status === 'heard') return (
    <div style={{ height:'100%', background:'#1a1a2e', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff', padding:'24px', textAlign:'center', gap:'20px' }}>
      <div style={{ display:'flex', gap:'6px' }}>{['#4285F4','#EA4335','#FBBC05','#34A853'].map((c,i)=>(<div key={i} style={{ width:'14px', height:'14px', borderRadius:'50%', background:c }}/>))}</div>
      <CheckCircle size={52} color="#34A853" />
      <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'16px', padding:'16px 24px' }}>
        <p style={{ fontSize:'13px', opacity:0.7, marginBottom:'6px' }}>Você disse:</p>
        <p style={{ fontSize:'18px', fontWeight:'700' }}>&#34;{transcript}&#34;</p>
      </div>
      <p style={{ fontSize:'15px', color:'#34A853', fontWeight:'600' }}>O Assistente ouviu você! 🎉</p>
    </div>
  );

  return (
    <div style={{ height:'100%', background:'#1a1a2e', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff', padding:'24px', textAlign:'center', gap:'24px' }}>
      <div style={{ display:'flex', gap:'6px' }}>{['#4285F4','#EA4335','#FBBC05','#34A853'].map((c,i)=>(<div key={i} style={{ width:'14px', height:'14px', borderRadius:'50%', background:c, animation: status === 'listening' ? `bounce 0.6s ease ${i*0.1}s infinite alternate` : 'none' }}/>))}</div>
      <p style={{ fontSize:'17px', lineHeight:1.5, maxWidth:'260px' }}>{status === 'listening' ? 'Ouvindo... fale agora! 🎤' : 'Toque no microfone e diga: "Ok Google!"'}</p>
      <button onClick={() => {
        if (status === 'listening') {
          recognitionRef.current?.stop();
          setStatus('heard');
          setTranscript(t => t || 'Ok Google');
          setTimeout(() => onSuccess(transcript || 'Ok Google'), 800);
        } else {
          startListening();
        }
      }} style={{ width:'88px', height:'88px', borderRadius:'50%', border:'none', cursor:'pointer', background: status === 'listening' ? 'radial-gradient(circle, #EA4335, #c0392b)' : 'rgba(255,255,255,0.15)', boxShadow: status === 'listening' ? '0 0 0 12px rgba(234,67,53,0.2)' : 'none', transition:'all 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center' }}><Mic size={36} color="#fff" /></button>
      {status === 'listening' && (
        <div style={{ display:'flex', gap:'4px', alignItems:'center', height:'36px' }}>{[1,2,3,4,5,4,3,2,1].map((h,i)=>(<div key={i} style={{ width:'4px', borderRadius:'2px', background:'#4285F4', height:`${h*6}px`, animation:`audioWave 0.5s ease ${i*0.06}s infinite alternate` }}/>))}</div>
      )}
      {transcript && (<div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'12px', padding:'10px 18px', fontSize:'15px', fontStyle:'italic' }}>&#34;{transcript}&#34;</div>)}
      <button onClick={onSkip} style={{ background:'transparent', color:'rgba(255,255,255,0.4)', border:'none', fontSize:'13px', cursor:'pointer' }}>Pular esta etapa →</button>
    </div>
  );
};

export default function Modulo1Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [escutando, setEscutando] = useState(false);
  const [resposta, setResposta] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
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
        await base44.entities.Usuario.update(userId, {
          moedas: (user.moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo1Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você chama o Google Assistente?"
        opcoes={[
          "📞 Ligando para um número",
          "🏠 Segurando o botão Home ✅",
          "✉️ Mandando uma mensagem",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos chamar o Google Assistente! Toque e segure o botão HOME (botão redondo no fundo) 🏠",
      audio: "Vamos chamar o Google Assistente! Toque e segure o botão home na parte de baixo!",
    },
    {
      instrucao: "O Assistente está pronto! Toque no MICROFONE e fale sua pergunta 🎤",
      audio: "O Assistente está pronto! Toque no microfone e fale sua pergunta!",
    },
    {
      instrucao: "Viu como é fácil? Ele respondeu! Toque em OK para fechar 😊",
      audio: "Viu como é fácil? O assistente respondeu! Toque em ok para fechar!",
    },
    {
      instrucao: "Agora tente você! Toque no ícone do Google na tela para pesquisar 🔍",
      audio: "Agora tente você! Toque no ícone do Google na tela para pesquisar!",
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
      {!assistenteAberto && !buscaAberta && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, position: 'relative' }}>
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
              appDestacado={passo === 4 ? 'google' : null}
              onAppClick={(id) => {
                if (passo === 4 && id === 'google') handleCliqueCerto(4, () => setBuscaAberta(true));
              }}
            />
          </div>
          <div style={{ height: '48px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexShrink: 0 }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={24} color="#fff" />
            </div>
            {passo === 1 ? (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setAssistenteAberto(true))} mostrarSeta={false}>
                <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Circle size={22} color="#fff" strokeWidth={1.5} />
                </div>
              </ElementoClicavel>
            ) : (
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Circle size={22} color="#fff" strokeWidth={1.5} />
              </div>
            )}
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Square size={18} color="#fff" strokeWidth={2} />
            </div>
          </div>
        </div>
      )}

      {assistenteAberto && !resposta && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column' }}
        >
          {passo === 2 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <AssistenteVoz
                onSuccess={() => { setPasso(3); setEscutando(true); setTimeout(() => setResposta(true), 800); }}
                onSkip={() => { setPasso(3); setEscutando(true); setTimeout(() => setResposta(true), 800); }}
              />
            </div>
          )}
          {passo !== 2 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>{['#4285F4','#EA4335','#FBBC05','#34A853'].map((c,i) => (<div key={i} style={{ width:'14px', height:'14px', borderRadius:'50%', background:c }}/>))}</div>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>Ouvindo...</p>
            </div>
          )}
        </motion.div>
      )}

      {resposta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}
        >
          <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '24px', paddingBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
              {['#4285F4','#EA4335','#FBBC05','#34A853'].map((c,i) => (<div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }}/>))}
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
              <p style={{ fontSize: '20px', fontWeight: '600', color: '#333', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                São 14h30 de terça-feira, 15 de julho ☀️
              </p>
            </div>
            <ElementoClicavel
              onClick={() => handleCliqueCerto(4, () => { setAssistenteAberto(false); setResposta(false); })}
              mostrarSeta={false}
            >
              <button style={{ width: '100%', padding: '18px', borderRadius: '16px', border: 'none', background: '#4285F4', color: '#fff', fontSize: '18px', fontWeight: '800', cursor: 'pointer' }}>
                OK
              </button>
            </ElementoClicavel>
          </div>
        </motion.div>
      )}

      {buscaAberta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eaed', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F3F4', borderRadius: '22px', padding: '10px 16px' }}>
              <Search size={18} color="#5f6368" />
              <span style={{ color: '#5f6368', fontWeight: '500', fontSize: '15px' }}>Digite sua pesquisa...</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '32px' }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
              <button style={{ padding: '14px 32px', borderRadius: '24px', border: '1px solid #dadce0', background: '#f8f9fa', color: '#3c4043', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                Continuar
              </button>
            </ElementoClicavel>
          </div>
        </motion.div>
      )}



      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}