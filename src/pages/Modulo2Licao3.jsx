import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo2Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [fotosAberto, setFotosAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [backupAberto, setBackupAberto] = useState(false);
  const [backupAtivo, setBackupAtivo] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

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
    navigate(createPageUrl("Modulo2Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que acontece quando o backup do Google Fotos está ativo?"
        opcoes={[
          "🗑️ As fotos são apagadas",
          "☁️ Suas fotos ficam salvas mesmo se perder o celular ✅",
          "📵 Você não consegue mais tirar fotos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Google Fotos guarda suas fotos com segurança! Toque no ícone para abrir 📸",
      audio: "O Google Fotos guarda suas fotos com segurança! Toque no ícone para abrir!",
    },
    {
      instrucao: "Vamos ativar o backup automático! Toque nas três linhas no canto superior ☰",
      audio: "Vamos ativar o backup automático! Toque nas três linhas no canto superior!",
    },
    {
      instrucao: "Toque em BACKUP E SYNC para proteger suas fotos ☁️",
      audio: "Toque em backup e sync para proteger suas fotos!",
    },
    {
      instrucao: "Ative o backup! Toque no botão para LIGAR e suas fotos ficam sempre salvas ✅",
      audio: "Ative o backup! Toque no botão para ligar e suas fotos ficam sempre salvas!",
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
      {!fotosAberto && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setFotosAberto(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    📸
                  </div>
                </div>
              </ElementoClicavel>
            )}
            {["G", "⚙️", "📱", "📧", "🎵", "📍", "💬"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fotosAberto && !menuAberto && !backupAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4 flex items-center justify-between">
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setMenuAberto(true))}
                posicao="right"
              >
                <button className="text-3xl cursor-pointer">☰</button>
              </ElementoClicavel>
            )}
            {passo !== 2 && <button className="text-3xl">☰</button>}
            <h2 className="text-xl font-black text-gray-800">Google Fotos</h2>
            <div className="w-8" />
          </div>
          <div className="px-4 grid grid-cols-3 gap-2">
            {["🌅", "👨‍👩‍👧", "🌻", "🎂", "🏖️", "🐶"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl shadow-md">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {menuAberto && !backupAberto && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="absolute left-0 top-0 w-72 h-full bg-white shadow-2xl pt-12 z-20"
        >
          <div className="p-4">
            <h3 className="text-xl font-black text-gray-800 mb-6">Menu</h3>
            <div className="space-y-2">
              {passo === 3 && (
                <ElementoClicavel
                  onClick={() => handleCliqueCerto(4, () => { setMenuAberto(false); setBackupAberto(true); })}
                  posicao="right"
                >
                  <div className="p-4 hover:bg-gray-100 rounded-xl cursor-pointer">
                    <p className="font-bold text-gray-700">☁️ Backup e Sync</p>
                  </div>
                </ElementoClicavel>
              )}
              {[
                "⚙️ Configurações",
                "🗑️ Lixeira",
                "❓ Ajuda",
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl">
                  <p className="font-bold text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setMenuAberto(false)}
            className="absolute top-4 right-4 text-gray-600 text-2xl"
          >
            ✕
          </button>
        </motion.div>
      )}

      {backupAberto && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => setBackupAberto(false)} className="text-blue-600 font-bold mb-6">← Voltar</button>
          <h2 className="text-2xl font-black text-gray-800 mb-8">Backup e Sincronização</h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 mb-6">
            <p className="text-gray-700 font-semibold mb-4">
              Suas fotos e vídeos serão salvos automaticamente na nuvem do Google ☁️
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">Backup automático</span>
              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => {
                    setBackupAtivo(true);
                    setTimeout(() => setMostrarValidacao(true), 1500);
                  }}
                  posicao="right"
                >
                  <div className={`w-16 h-8 rounded-full relative cursor-pointer transition-all ${backupAtivo ? "bg-green-500" : "bg-gray-300"}`}>
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${backupAtivo ? "left-9" : "left-1"}`} />
                  </div>
                </ElementoClicavel>
              )}
            </div>
          </div>

          {backupAtivo && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [-20, 0] }}
                transition={{ duration: 1 }}
                className="text-7xl mb-4"
              >
                ☁️
              </motion.div>
              <p className="text-2xl font-bold text-green-600 mb-2">✅ Backup Ativado!</p>
              <p className="text-gray-600 font-semibold">Suas fotos estão protegidas</p>
            </motion.div>
          )}
        </div>
      )}
    </SimuladorWrapper>
  );
}