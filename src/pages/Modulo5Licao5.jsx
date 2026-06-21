import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons } from "@/components/shared/GameFeedback";

export default function Modulo5Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [fotoTirada, setFotoTirada] = useState(false);
  const [cameraFrontal, setCameraFrontal] = useState(false);
  const [selfieTirada, setSelfieTirada] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [virando, setVirando] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    if (acao) acao();
    setTimeout(() => setPasso(proximoPasso), 600);
  };

  const virarCamera = () => {
    if (virando || passo !== 3) return;
    setVirando(true);
    Sons.avancar();
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => setCameraFrontal(true), 200);
    setTimeout(() => {
      setPasso(4);
      setVirando(false);
    }, 800);
  };

  const handleConcluirValidacao = async () => {
    const userId = localStorage.getItem("toligado_user_id");
    if (userId) {
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) {
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod5")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod5"],
            xp_total: (users[0].xp_total || 0) + 100,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo5Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você vira a câmera para tirar selfie?"
        opcoes={[
          "🔄 Tocando no ícone de duas setas ✅",
          "🔃 Virando o celular de cabeça para baixo",
          "📵 Não é possível virar a câmera",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos tirar uma foto! Toque no ícone da CÂMERA para abrir 📷", audio: "Vamos tirar uma foto! Toque no ícone da câmera para abrir!" },
    { instrucao: "Câmera aberta! Enquadre o que quer fotografar e toque no CÍRCULO BRANCO 📸", audio: "Câmera aberta! Enquadre o que quer fotografar e toque no círculo branco!" },
    { instrucao: "Quer tirar uma SELFIE? Toque no ícone de duas setas para virar a câmera 🤳", audio: "Quer tirar uma selfie? Toque no ícone de duas setas para virar a câmera!" },
    { instrucao: "Câmera da frente! Sorria e toque no CÍRCULO BRANCO para a selfie 😄", audio: "Câmera da frente! Sorria e toque no círculo branco para a selfie!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!cameraAberta && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-purple-50 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setCameraAberta(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">📷</div>
                </div>
              </ElementoClicavel>
            )}
            {["🔍", "💬", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cameraAberta && !cameraFrontal && (
        <div className="w-full h-full bg-gradient-to-b from-sky-200 to-green-300 pt-12 relative flex items-center justify-center">
          <div className="absolute top-16 left-4 right-4 flex items-center justify-between">
            <button onClick={() => setCameraAberta(false)} className="text-white text-2xl">✕</button>
          </div>

          {/* Botão virar câmera — direto, sem ElementoClicavel */}
          <button
            onClick={virarCamera}
            disabled={virando || passo < 3}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: passo === 3 ? 'rgba(243,152,75,0.95)' : 'rgba(255,255,255,0.4)',
              border: passo === 3 ? '3px solid #fff' : '2px solid rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              cursor: (virando || passo < 3) ? 'default' : 'pointer',
              opacity: (virando || passo < 3) ? 0.5 : 1,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: passo === 3 ? '0 4px 16px rgba(243,152,75,0.6)' : 'none',
              zIndex: 100,
              transition: 'all 0.3s ease'
            }}
          >
            {virando ? '⏳' : '🔄'}
          </button>

          <div className="text-9xl">🏞️</div>

          {fotoTirada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            />
          )}

          {fotoTirada && (
            <div className="absolute bottom-20 left-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg">
                🏞️
              </motion.div>
            </div>
          )}

          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
            {passo === 2 && !fotoTirada && (
              <ElementoClicavel onClick={() => { setFotoTirada(true); handleCliqueCerto(3, null); }} posicao="top">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-white rounded-full" />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {cameraFrontal && (
        <div className="w-full h-full bg-gradient-to-b from-pink-200 to-purple-300 pt-12 relative flex items-center justify-center">
          <div className="absolute top-16 left-4 right-4 flex items-center justify-between">
            <button onClick={() => setCameraFrontal(false)} className="text-white text-2xl">✕</button>
            <button className="text-white text-3xl">🔄</button>
          </div>

          <div className="text-9xl">😊</div>

          {selfieTirada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            />
          )}

          {selfieTirada && (
            <div className="absolute bottom-20 left-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg">
                😊
              </motion.div>
            </div>
          )}

          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
            {passo === 4 && !selfieTirada && (
              <ElementoClicavel onClick={() => { setSelfieTirada(true); setTimeout(() => setMostrarValidacao(true), 1500); }} posicao="top">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-white rounded-full" />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}