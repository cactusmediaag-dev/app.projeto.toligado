import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons } from "@/components/shared/GameFeedback";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { Camera, X, RefreshCw, Image as ImageIcon, CheckCircle } from 'lucide-react';

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
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'mapa', label: 'Mapas', bg: '#34A853', id: 'maps' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
            ]}
            appDestacado={passo === 1 ? 'camera' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'camera') handleCliqueCerto(2, () => setCameraAberta(true));
            }}
          />
        </div>
      )}

      {cameraAberta && !cameraFrontal && (
        <div style={{ height: '100%', background: '#111', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 100 }}>
            <button onClick={() => setCameraAberta(false)} style={{ width: '44px', height: '44px', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={22} color="#fff" />
            </button>
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
              cursor: (virando || passo < 3) ? 'default' : 'pointer',
              opacity: (virando || passo < 3) ? 0.5 : 1,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: passo === 3 ? '0 4px 16px rgba(243,152,75,0.6)' : 'none',
              zIndex: 100,
              transition: 'all 0.3s ease'
            }}
          >
            {virando ? <RefreshCw size={24} color="#fff" className="animate-spin" /> : <RefreshCw size={24} color="#fff" />}
          </button>

          <div style={{ fontSize: '72px' }}>🏞️</div>

          {fotoTirada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0, background: '#fff' }}
            />
          )}

          {fotoTirada && (
            <div style={{ position: 'absolute', bottom: '100px', left: '16px' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                🏞️
              </motion.div>
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {passo === 2 && !fotoTirada && (
              <ElementoClicavel onClick={() => { setFotoTirada(true); handleCliqueCerto(3, null); }} mostrarSeta={false}>
                <div style={{ width: '72px', height: '72px', background: '#fff', borderRadius: '50%', border: '4px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '50%', border: '2px solid #ddd' }} />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {cameraFrontal && (
        <div style={{ height: '100%', background: '#111', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 100 }}>
            <button onClick={() => setCameraFrontal(false)} style={{ width: '44px', height: '44px', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={22} color="#fff" />
            </button>
          </div>

          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <button style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.4)', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={22} color="#fff" />
            </button>
          </div>

          <div style={{ fontSize: '72px' }}>😊</div>

          {selfieTirada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0, background: '#fff' }}
            />
          )}

          {selfieTirada && (
            <div style={{ position: 'absolute', bottom: '100px', left: '16px' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                😊
              </motion.div>
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {passo === 4 && !selfieTirada && (
              <ElementoClicavel onClick={() => { setSelfieTirada(true); setTimeout(() => setMostrarValidacao(true), 1500); }} mostrarSeta={false}>
                <div style={{ width: '72px', height: '72px', background: '#fff', borderRadius: '50%', border: '4px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '50%', border: '2px solid #ddd' }} />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}