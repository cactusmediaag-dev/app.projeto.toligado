import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

const LensCamera = ({ onCapture, onSkip }) => {
  const videoRef = useRef(null);
  const [streamAtivo, setStreamAtivo] = useState(null);
  const [captured, setCaptured] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        setStreamAtivo(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setDenied(true));
    return () => {
      setStreamAtivo((prev) => {
        if (prev) prev.getTracks().forEach((t) => t.stop());
        return null;
      });
    };
  }, []);

  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg", 0.8));
    setAnalyzing(true);
    if (streamAtivo) streamAtivo.getTracks().forEach((t) => t.stop());
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2500);
  };

  if (denied) {
    return (
      <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "24px", textAlign: "center", gap: "16px" }}>
        <span style={{ fontSize: "52px" }}>📷</span>
        <p style={{ fontSize: "15px", opacity: 0.8, lineHeight: 1.5 }}>Câmera não disponível neste dispositivo. Tudo bem, pode continuar! 😊</p>
        <button onClick={onSkip} style={{ background: "#F3984B", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 28px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
          Continuar a lição ➜
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div style={{ height: "100%", background: "#fff", display: "flex", flexDirection: "column" }}>
        <img src={captured} style={{ width: "100%", height: "52%", objectFit: "cover" }} />
        <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ background: "#e8f4fd", borderRadius: "14px", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🔍</span>
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#1a73e8" }}>Google Lens identificou!</div>
              <div style={{ fontSize: "13px", color: "#555", marginTop: "3px" }}>Objeto capturado e analisado ✅</div>
            </div>
          </div>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6, flex: 1 }}>
            Incrível! O Google Lens usa a câmera para identificar qualquer coisa ao seu redor. Plantas, produtos, textos e muito mais! 🌟
          </p>
          <button onClick={onCapture} style={{ background: "#4285F4", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
            ✅ Entendi! Continuar
          </button>
        </div>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div style={{ height: "100%", background: "#000", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {captured && <img src={captured} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff" }}>
          <div style={{ width: "56px", height: "56px", border: "4px solid #4285F4", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "16px" }}>🔍 Analisando com Google Lens...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", background: "#000", position: "relative", overflow: "hidden" }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ width: "180px", height: "180px", border: "2px solid rgba(66,133,244,0.8)", borderRadius: "16px", position: "relative", boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)" }}>
          {[
            { top: -2, left: -2, borderWidth: "3px 0 0 3px" },
            { top: -2, right: -2, borderWidth: "3px 3px 0 0" },
            { bottom: -2, left: -2, borderWidth: "0 0 3px 3px" },
            { bottom: -2, right: -2, borderWidth: "0 3px 3px 0" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: "22px", height: "22px", borderColor: "#4285F4", borderStyle: "solid", ...s }} />
          ))}
        </div>
        <p style={{ color: "#fff", fontSize: "14px", textShadow: "0 1px 4px rgba(0,0,0,0.9)", textAlign: "center" }}>Aponte para qualquer objeto 📷</p>
      </div>
      <div style={{ position: "absolute", bottom: "32px", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <button onClick={capture} style={{ width: "72px", height: "72px", background: "#fff", borderRadius: "50%", border: "5px solid rgba(255,255,255,0.4)", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
        <button onClick={onSkip} style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px", padding: "8px 20px", fontSize: "13px", cursor: "pointer" }}>
          Pular →
        </button>
      </div>
    </div>
  );
};

export default function Modulo1Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [lensAberto, setLensAberto] = useState(false);
  const [resultado, setResultado] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [feedbackAcerto, setFeedbackAcerto] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);
  const [mostrarMoedas, setMostrarMoedas] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp"
    );
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
    navigate(createPageUrl("Modulo1Licao4"));
  };

  const avancarPasso = () => {
    setResultado(true);
    setLensAberto(false);
    setPasso((p) => p + 1);
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o Google Lens?"
        opcoes={[
          "📸 Só para tirar selfies",
          "🔍 Para identificar plantas, produtos e textos pela câmera ✅",
          "📞 Para fazer videochamadas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Google Lens lê o mundo pela câmera! Toque no ícone do Lens para abrir 📷",
      audio: "O Google Lens lê o mundo pela câmera! Toque no ícone do Lens para abrir!",
    },
    {
      instrucao: "A câmera está aberta! Aponte para algo e toque no botão para capturar 🌿",
      audio: "A câmera está aberta! Aponte para algo e toque no botão para capturar!",
    },
    {
      instrucao: "Que incrível! O Lens identificou! Toque em VOLTAR para tentar com outra coisa 😄",
      audio: "Que incrível! O Lens identificou! Toque em voltar para tentar com outra coisa!",
    },
    {
      instrucao: "Agora aponte para um produto! Toque em CAPTURAR de novo 📦",
      audio: "Agora aponte para um produto! Toque em capturar de novo!",
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
      {!lensAberto && !resultado && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 ? (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setLensAberto(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    📷
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Lens</span>
                </div>
              </ElementoClicavel>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  📷
                </div>
                <span className="text-xs text-gray-600 font-semibold">Lens</span>
              </div>
            )}
            {["G", "📱", "⚙️", "📧", "🎵", "📍"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lensAberto && !resultado && (
        <LensCamera onCapture={avancarPasso} onSkip={avancarPasso} />
      )}

      {resultado && passo === 3 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-full bg-white p-6 pt-12"
        >
          <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 mb-4">
            <div className="text-5xl mb-3 text-center">🌿</div>
            <h3 className="text-xl font-bold text-green-700 mb-2 text-center">
              Identificado: Babosa (Aloe Vera)
            </h3>
            <p className="text-sm text-gray-600 font-medium text-center">
              Planta medicinal usada para tratar queimaduras e pele seca
            </p>
          </div>
          <ElementoClicavel
            onClick={() =>
              handleCliqueCerto(4, () => {
                setResultado(false);
                setLensAberto(true);
              })
            }
            posicao="top"
          >
            <button className="w-full bg-[#5C2E7F] text-white py-4 rounded-2xl font-bold text-lg">
              ← Voltar
            </button>
          </ElementoClicavel>
        </motion.div>
      )}

      {resultado && passo >= 5 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-full bg-white p-6 pt-12"
        >
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 mb-4">
            <div className="text-5xl mb-3 text-center">🛍️</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
              Arroz Tipo 1 — 5kg
            </h3>
            <p className="text-2xl text-green-600 font-black text-center mb-2">R$ 25,90</p>
            <p className="text-sm text-gray-600 font-medium text-center">
              Encontrado em 3 mercados próximos
            </p>
          </div>
          <button
            onClick={() => setMostrarValidacao(true)}
            className="w-full bg-[#F3984B] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
          >
            Continuar 🚀
          </button>
        </motion.div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}