import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo3Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [segurancaAberta, setSegurancaAberta] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanCompleto, setScanCompleto] = useState(false);
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
    navigate(createPageUrl("Modulo3Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o reconhecimento facial?"
        opcoes={[
          "📸 Para tirar selfies automáticas",
          "🔐 Para usar seu rosto como senha do celular ✅",
          "🎥 Para fazer videochamadas",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Seu rosto pode ser sua senha! Vamos configurar! Toque em CONFIGURAÇÕES ⚙️",
      audio: "Seu rosto pode ser sua senha! Vamos configurar! Toque em configurações!",
    },
    {
      instrucao: "Toque em SEGURANÇA E PRIVACIDADE para encontrar o reconhecimento facial 🔐",
      audio: "Toque em segurança e privacidade para encontrar o reconhecimento facial!",
    },
    {
      instrucao: "Encontrou! Toque em RECONHECIMENTO FACIAL para ativar 😊",
      audio: "Encontrou! Toque em reconhecimento facial para ativar!",
    },
    {
      instrucao: "Olhe para a câmera e centralize seu rosto no círculo! Toque em INICIAR 📸",
      audio: "Olhe para a câmera e centralize seu rosto no círculo! Toque em iniciar!",
    },
    {
      instrucao: "Pronto! Agora seu rosto desbloqueia o celular! Toque em CONCLUIR 🎉",
      audio: "Pronto! Agora seu rosto desbloqueia o celular! Toque em concluir!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!configAberta && !segurancaAberta && !cameraAberta && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
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

      {configAberta && !segurancaAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Configurações</h2>
          </div>
          <div className="space-y-2">
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setSegurancaAberta(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">🔐</div>
                  <span className="text-lg font-bold text-gray-700">Segurança e Privacidade</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "📶", nome: "Wi-Fi" },
              { emoji: "🔆", nome: "Tela" },
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

      {segurancaAberta && !cameraAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setSegurancaAberta(false)} className="text-blue-600 font-bold mb-4">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800">Segurança e Privacidade</h2>
          </div>
          <div className="space-y-2">
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setCameraAberta(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">😊</div>
                  <span className="text-lg font-bold text-gray-700">Reconhecimento Facial</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "👆", nome: "Impressão Digital" },
              { emoji: "🔒", nome: "Bloqueio de Tela" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-lg font-bold text-gray-700">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {cameraAberta && (
        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 pt-12 relative">
          <div className="absolute top-16 left-0 right-0 text-center">
            <p className="text-white font-bold text-lg px-4">Posicione seu rosto no círculo</p>
          </div>

          <div className="flex items-center justify-center h-full">
            {!scanning && !scanCompleto && (
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-4 border-white/50 flex items-center justify-center">
                  <div className="text-8xl">😊</div>
                </div>
                {passo === 4 && (
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
                    <ElementoClicavel
                      onClick={() => {
                        setScanning(true);
                        setTimeout(() => {
                          setScanning(false);
                          setScanCompleto(true);
                          setPasso(5);
                        }, 2500);
                      }}
                      posicao="top"
                    >
                      <button className="px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold text-lg">
                        Iniciar
                      </button>
                    </ElementoClicavel>
                  </div>
                )}
              </div>
            )}

            {scanning && (
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-4 border-green-400 flex items-center justify-center">
                  <div className="text-8xl">😊</div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.3) 50%, transparent 100%)",
                  }}
                  animate={{ y: [-120, 120] }}
                  transition={{ duration: 2, repeat: 1 }}
                />
              </div>
            )}

            {scanCompleto && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-8xl mb-4">✅</div>
                <p className="text-2xl font-bold text-white mb-6">Rosto cadastrado com sucesso!</p>
                {passo === 5 && (
                  <ElementoClicavel
                    onClick={() => setMostrarValidacao(true)}
                    posicao="top"
                  >
                    <button className="px-8 py-3 bg-green-500 text-white rounded-2xl font-bold text-lg">
                      Concluir 🎉
                    </button>
                  </ElementoClicavel>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}