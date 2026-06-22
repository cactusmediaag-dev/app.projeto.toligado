import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo2Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [brilhoAberto, setBrilhoAberto] = useState(false);
  const [brilho, setBrilho] = useState(50);
  const [fonteAberta, setFonteAberta] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Onde você ajusta o brilho e o tamanho da letra?"
        opcoes={[
          "⚙️ Nas Configurações do celular ✅",
          "📱 No WhatsApp",
          "🌐 No Google",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos conhecer as Configurações do seu celular! Procure o ícone de engrenagem e toque nele ⚙️",
      audio: "Vamos conhecer as configurações do seu celular! Procure o ícone de engrenagem e toque nele!",
    },
    {
      instrucao: "Aqui você controla tudo! Toque em TELA E BRILHO para ajustar 🔆",
      audio: "Aqui você controla tudo! Toque em tela e brilho para ajustar!",
    },
    {
      instrucao: "Esta barra controla o brilho da tela! Arraste para a direita para aumentar ☀️",
      audio: "Esta barra controla o brilho da tela! Arraste para a direita para aumentar!",
    },
    {
      instrucao: "Agora vamos aumentar a letra do celular! Toque em TAMANHO DA FONTE 🔤",
      audio: "Agora vamos aumentar a letra do celular! Toque em tamanho da fonte!",
    },
    {
      instrucao: "Para enxergar melhor, toque em MUITO GRANDE! Seus olhos agradecem 👀",
      audio: "Para enxergar melhor, toque em muito grande! Seus olhos agradecem!",
    },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!configAberta && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setConfigAberta(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    ⚙️
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Config</span>
                </div>
              </ElementoClicavel>
            )}
            {["🔍", "📷", "📱", "📧", "🎵", "📍", "💬"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {configAberta && !brilhoAberto && !fonteAberta && (
        <div className="w-full h-full bg-white pt-12 overflow-y-auto">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Configurações</h2>
          </div>
          <div className="space-y-2">
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setBrilhoAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">🔆</div>
                  <span className="text-lg font-bold text-gray-700">Tela e Brilho</span>
                </div>
              </ElementoClicavel>
            )}
            {passo >= 4 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(5, () => setFonteAberta(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">🔤</div>
                  <span className="text-lg font-bold text-gray-700">Tamanho da Fonte</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "🔔", nome: "Notificações" },
              { emoji: "📶", nome: "Wi-Fi" },
              { emoji: "🔋", nome: "Bateria" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {brilhoAberto && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => { setBrilhoAberto(false); setPasso(4); }} className="text-blue-600 font-bold mb-6">← Voltar</button>
          <h2 className="text-2xl font-black text-gray-800 mb-8">Brilho da Tela</h2>
          <div className="bg-gray-100 rounded-3xl p-8 text-center">
            <div className="text-6xl mb-6" style={{ fontSize: brilho > 70 ? "80px" : "60px" }}>☀️</div>
            <p className="text-4xl font-black text-gray-700 mb-6">{brilho}%</p>
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => {
                  let val = 50;
                  const intervalo = setInterval(() => {
                    if (val < 100) {
                      val += 10;
                      setBrilho(val);
                    } else {
                      clearInterval(intervalo);
                      handleCliqueCerto(4, () => setBrilhoAberto(false));
                    }
                  }, 100);
                }}
                posicao="top"
              >
                <div className="w-full h-12 bg-gray-300 rounded-full relative overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
                    style={{ width: `${brilho}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg"
                    style={{ left: `calc(${brilho}% - 16px)` }}
                  />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {fonteAberta && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => setFonteAberta(false)} className="text-blue-600 font-bold mb-6">← Voltar</button>
          <h2 className="text-2xl font-black text-gray-800 mb-8">Tamanho da Fonte</h2>
          <div className="space-y-3">
            {[
              { nome: "Pequena", size: "text-sm" },
              { nome: "Normal", size: "text-base" },
              { nome: "Grande", size: "text-xl" },
            ].map((fonte, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-2xl">
                <p className={`${fonte.size} font-semibold text-gray-700`}>Aa {fonte.nome}</p>
              </div>
            ))}
            {passo === 5 && (
              <ElementoClicavel
                onClick={() => setMostrarValidacao(true)}
                posicao="top"
              >
                <div className="p-4 bg-green-100 border-2 border-green-400 rounded-2xl cursor-pointer active:scale-95 transition-all">
                  <p className="text-2xl font-semibold text-gray-700">Aa Muito Grande</p>
                </div>
              </ElementoClicavel>
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