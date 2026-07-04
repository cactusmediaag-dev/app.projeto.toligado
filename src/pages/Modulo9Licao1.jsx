import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const SOM_CLIQUE = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp';

export default function Modulo9Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [playStoreAberta, setPlayStoreAberta] = useState(false);
  const [buscaDigitada, setBuscaDigitada] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [resultadoBusca, setResultadoBusca] = useState(false);
  const [appDetalhe, setAppDetalhe] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio(SOM_CLIQUE);
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
    navigate(createPageUrl("Modulo9Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como reconhecer o e-Título verdadeiro?"
        opcoes={[
          "💰 Ele cobra uma taxa para baixar",
          "🏛️ É gratuito e feito pelo TSE ✅",
          "📩 Ele chega por link no WhatsApp",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O e-Título é o título de eleitor dentro do celular! Vamos baixar? Toque na PLAY STORE ▶️", audio: "O e-Título é o título de eleitor dentro do celular! Vamos baixar? Toque na Play Store!" },
    { instrucao: "Toque na barra de busca lá em cima 🔍", audio: "Toque na barra de busca lá em cima!" },
    { instrucao: "Digite e-Título e toque na LUPA para buscar ⌨️", audio: "Digite e-Título e toque na lupa para buscar!" },
    { instrucao: "Esse é o oficial, do Tribunal Superior Eleitoral! É GRATUITO! Toque nele ✅", audio: "Esse é o oficial, do Tribunal Superior Eleitoral! É gratuito! Toque nele!" },
    { instrucao: "Agora toque em INSTALAR. Pronto, o app é seu! 📲", audio: "Agora toque em instalar. Pronto, o app é seu!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Home Android com Play Store */}
      {!playStoreAberta && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setPlayStoreAberta(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <div className="text-3xl">▶️</div>
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">Play Store</p>
                </div>
              </ElementoClicavel>
            )}
            {["📱", "💬", "📧", "🎵", "📷", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passos 2-3: Play Store — busca */}
      {playStoreAberta && !buscando && !resultadoBusca && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setPlayStoreAberta(false)} className="text-xl">←</button>
              {passo === 2 && (
                <ElementoClicavel onClick={() => { setBuscaDigitada(true); handleCliqueCerto(3, null); }} posicao="right">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-pointer">
                    <p className="text-gray-400">Pesquisar apps...</p>
                  </div>
                </ElementoClicavel>
              )}
              {passo === 3 && buscaDigitada && (
                <ElementoClicavel onClick={() => {
                  setBuscando(true);
                  setTimeout(() => { setBuscando(false); setResultadoBusca(true); setPasso(4); }, 1500);
                }} posicao="right">
                  <div className="flex-1 bg-blue-100 rounded-full px-4 py-2 cursor-pointer flex items-center gap-2">
                    <p className="text-gray-800 font-semibold flex-1">e-Título</p>
                    <span className="text-gray-600 text-lg">🔍</span>
                  </div>
                </ElementoClicavel>
              )}
            </div>
          </div>
          <div className="p-4">
            <p className="text-lg font-bold text-gray-800 mb-4">Apps populares</p>
            <div className="space-y-3">
              {["WhatsApp", "Instagram", "TikTok"].map((app, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-700">{app}</p>
                    <p className="text-xs text-gray-400">★★★★☆ 4.5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Buscando */}
      {buscando && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button className="text-xl">←</button>
              <div className="flex-1 bg-blue-100 rounded-full px-4 py-2">
                <p className="text-gray-800 font-semibold">e-Título</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 rounded-full" style={{ borderColor: '#1E5A9C', borderTopColor: 'transparent' }} />
          </div>
        </div>
      )}

      {/* Passo 4: Resultado da busca */}
      {resultadoBusca && !appDetalhe && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setResultadoBusca(false)} className="text-xl">←</button>
              <div className="flex-1 bg-blue-100 rounded-full px-4 py-2">
                <p className="text-gray-800 font-semibold">e-Título</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            {passo === 4 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setAppDetalhe(true))} posicao="right">
                <div className="flex items-start gap-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-2xl cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#1E5A9C' }}>
                    🗳️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800" style={{ fontSize: '18px' }}>e-Título</p>
                    <p className="text-sm text-gray-500 mb-2">Tribunal Superior Eleitoral</p>
                    <p className="text-xs text-gray-400">★★★★☆ 4.8 • 50M+ downloads</p>
                    <span className="inline-block mt-2 text-xs font-bold px-2 py-1 rounded" style={{ background: '#E8F5E9', color: '#2E7D32' }}>GRATUITO</span>
                  </div>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {/* Passo 5: Detalhe do app — INSTALAR */}
      {appDetalhe && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <button onClick={() => setAppDetalhe(false)} className="text-xl">←</button>
          </div>
          <div className="p-6 text-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4" style={{ background: '#1E5A9C' }}>
              🗳️
            </div>
            <h2 className="font-black text-gray-800 mb-1" style={{ fontSize: '22px' }}>e-Título</h2>
            <p className="text-base text-gray-500 mb-2">Tribunal Superior Eleitoral</p>
            <p className="text-sm text-gray-400 mb-4">★★★★☆ 4.8 • 50M+ downloads</p>
            <span className="inline-block text-sm font-bold px-3 py-1 rounded mb-6" style={{ background: '#E8F5E9', color: '#2E7D32' }}>GRATUITO</span>

            {passo === 5 && (
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} posicao="top">
                <button className="w-full py-4 rounded-xl font-bold text-lg text-white" style={{ background: '#2E7D32', minHeight: '48px' }}>
                  INSTALAR
                </button>
              </ElementoClicavel>
            )}

            <div className="mt-6 p-4 rounded-xl" style={{ background: '#FFF8E1', border: '1px solid #F9A825' }}>
              <p className="text-sm text-gray-700" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                ⚠️ <strong>Alerta anti-golpe:</strong> O e-Título nunca cobra taxa e nunca chega por link de WhatsApp!
              </p>
            </div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}