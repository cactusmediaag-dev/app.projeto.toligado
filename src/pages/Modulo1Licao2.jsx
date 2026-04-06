import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

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
      <span style={{ fontSize:'52px' }}>{status === 'error' ? '😅' : '🎤'}</span>
      <p style={{ fontSize:'16px' }}>{status === 'error' ? 'Não consegui ouvir. Fale mais alto! 🔊' : 'Microfone não disponível. Pode continuar! 😊'}</p>
      {status === 'error' && (
        <button onClick={startListening} style={{ background:'#4285F4', color:'#fff', border:'none', borderRadius:'14px', padding:'14px 28px', fontSize:'16px', fontWeight:'700', cursor:'pointer' }}>🎤 Tentar de novo</button>
      )}
      <button onClick={onSkip} style={{ background: status === 'error' ? 'transparent' : '#F3984B', color: status === 'error' ? 'rgba(255,255,255,0.5)' : '#fff', border:'none', borderRadius:'14px', padding:'12px 24px', fontSize:'14px', cursor:'pointer' }}>{status === 'error' ? 'Pular →' : 'Continuar a lição ➜'}</button>
    </div>
  );

  if (status === 'heard') return (
    <div style={{ height:'100%', background:'#1a1a2e', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff', padding:'24px', textAlign:'center', gap:'20px' }}>
      <div style={{ display:'flex', gap:'6px' }}>{['#4285F4','#EA4335','#FBBC05','#34A853'].map((c,i)=>(<div key={i} style={{ width:'14px', height:'14px', borderRadius:'50%', background:c }}/>))}</div>
      <span style={{ fontSize:'52px' }}>✅</span>
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
      <button onClick={startListening} style={{ width:'88px', height:'88px', borderRadius:'50%', border:'none', cursor:'pointer', background: status === 'listening' ? 'radial-gradient(circle, #EA4335, #c0392b)' : 'rgba(255,255,255,0.15)', fontSize:'36px', boxShadow: status === 'listening' ? '0 0 0 12px rgba(234,67,53,0.2)' : 'none', transition:'all 0.3s ease' }}>🎤</button>
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
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!assistenteAberto && !buscaAberta && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 4 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(999, () => setBuscaAberta(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    G
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Google</span>
                </div>
              </ElementoClicavel>
            )}
            {passo !== 4 && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  G
                </div>
                <span className="text-xs text-gray-600 font-semibold">Google</span>
              </div>
            )}
            {["📷", "📱", "⚙️", "📧", "🎵", "📍"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {assistenteAberto && !resposta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6"
        >
          {passo === 1 && (
            <motion.div
              animate={{ scale: escutando ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: escutando ? Infinity : 0 }}
              className="mb-8"
            >
              <div className="flex gap-1">
                {['#EA4335', '#FBBC05', '#34A853', '#4285F4'].map((cor, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-16 rounded-full"
                    style={{ backgroundColor: cor }}
                    animate={escutando ? { scaleY: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          {passo === 2 && (
            <div className="w-full h-full" style={{ margin:'-24px', width:'calc(100% + 48px)', height:'100%' }}>
              <AssistenteVoz
                onSuccess={() => { setPasso(3); setEscutando(true); setTimeout(() => setResposta(true), 800); }}
                onSkip={() => { setPasso(3); setEscutando(true); setTimeout(() => setResposta(true), 800); }}
              />
            </div>
          )}
          <p className="text-white text-center mt-6 font-semibold">
            {escutando ? "Ouvindo..." : "Toque no microfone"}
          </p>
        </motion.div>
      )}

      {resposta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 p-6 pt-12"
        >
          <div className="bg-gray-700 rounded-3xl p-5 mb-4">
            <p className="text-white text-lg font-semibold text-center">
              São 14h30 de terça-feira, 15 de julho ☀️
            </p>
          </div>
          <ElementoClicavel
            onClick={() => handleCliqueCerto(4, () => { setAssistenteAberto(false); setResposta(false); })}
            posicao="top"
          >
            <button className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold text-lg">
              OK
            </button>
          </ElementoClicavel>
        </motion.div>
      )}

      {buscaAberta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full bg-white pt-12"
        >
          <div className="px-4">
            <div className="bg-gray-100 rounded-full px-4 py-3 mb-6 flex items-center gap-2">
              <span>🔍</span>
              <span className="text-gray-600 font-semibold">Digite sua pesquisa...</span>
            </div>
          </div>
          <button
            onClick={() => setMostrarValidacao(true)}
            className="mx-4 mt-8 w-[calc(100%-32px)] bg-[#F3984B] text-white py-3 rounded-2xl font-bold text-lg"
          >
            Continuar
          </button>
        </motion.div>
      )}

      {passo === 1 && !assistenteAberto && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <ElementoClicavel
            onClick={() => handleCliqueCerto(2, () => setAssistenteAberto(true))}
            posicao="top"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl cursor-pointer border-4 border-gray-200">
              🏠
            </div>
          </ElementoClicavel>
        </div>
      )}
      {passo > 1 && !assistenteAberto && !buscaAberta && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl border-4 border-gray-200">
            🏠
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}