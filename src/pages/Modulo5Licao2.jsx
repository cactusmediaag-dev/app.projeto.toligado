import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo5Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [instrucaoAberta, setInstrucaoAberta] = useState(false);
  const [printTirado, setPrintTirado] = useState(false);
  const [fotosAberto, setFotosAberto] = useState(false);
  const [printAberto, setPrintAberto] = useState(false);
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
    navigate(createPageUrl("Modulo5Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você tira um print da tela no celular?"
        opcoes={[
          "🎤 Falando 'Ok Google, print'",
          "⚡ Pressionando botão Ligar + Volume Baixo ao mesmo tempo ✅",
          "📷 Abrindo a câmera",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Essa mensagem é importante! Vamos salvar com um PRINT DA TELA 📸", audio: "Essa mensagem é importante! Vamos salvar com um print da tela!" },
    { instrucao: "Para tirar print: pressione o botão LIGAR e VOLUME BAIXO ao mesmo tempo! 📸", audio: "Para tirar print: pressione o botão ligar e volume baixo ao mesmo tempo!" },
    { instrucao: "Print tirado! Toque na NOTIFICAÇÃO para ver onde ficou salvo 👀", audio: "Print tirado! Toque na notificação para ver onde ficou salvo!" },
    { instrucao: "Seus prints ficam salvos aqui! Toque no print para ver maior 🖼️", audio: "Seus prints ficam salvos aqui! Toque no print para ver maior!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instrucaoAberta && !printTirado && !fotosAberto && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-white pt-12">
          <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <span className="text-white font-bold">Dr. Silva</span>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <p className="text-gray-800 font-semibold leading-relaxed mb-2">
                Olá! Sua consulta está marcada para:
              </p>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mt-3">
                <p className="text-2xl font-black text-blue-700 text-center mb-2">15/08/2026</p>
                <p className="text-xl font-bold text-blue-600 text-center">10:00 🏥</p>
              </div>
            </div>

            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setInstrucaoAberta(true))} posicao="top">
                <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg">
                  Como fazer print? 📖
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {instrucaoAberta && !printTirado && (
        <div className="w-full h-full bg-white pt-12 p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black text-gray-800 mb-8 text-center">Como tirar print da tela</h2>
          
          <div className="mb-8">
            <div className="relative w-48 h-96 bg-gray-800 rounded-3xl mx-auto shadow-2xl p-4 flex items-center justify-center">
              <div className="text-6xl">📱</div>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-8 right-2 w-12 h-3 bg-gray-600 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-bold">⚡</span>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="absolute top-16 left-2 w-3 h-12 bg-gray-600 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-bold rotate-90 inline-block">🔊</span>
              </motion.div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6 max-w-sm">
            <p className="text-center font-bold text-blue-700 mb-2">Pressione os dois juntos:</p>
            <p className="text-center text-lg text-blue-600">⚡ Botão Ligar + 🔊 Volume Baixo</p>
          </div>

          {passo === 2 && (
            <ElementoClicavel onClick={() => {
              setPrintTirado(true);
              setInstrucaoAberta(false);
              handleCliqueCerto(3, null);
            }} posicao="top">
              <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg max-w-sm">
                Tirar Print Agora 📸
              </button>
            </ElementoClicavel>
          )}
        </div>
      )}

      {printTirado && !fotosAberto && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.3 }} className="w-full h-full bg-gradient-to-b from-green-50 to-white pt-12 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white"
            transition={{ duration: 0.1 }}
          />

          <div className="relative bg-green-600 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <span className="text-white font-bold">Dr. Silva</span>
          </div>

          <div className="relative p-4">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <p className="text-gray-800 font-semibold leading-relaxed mb-2">
                Olá! Sua consulta está marcada para:
              </p>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mt-3">
                <p className="text-2xl font-black text-blue-700 text-center mb-2">15/08/2026</p>
                <p className="text-xl font-bold text-blue-600 text-center">10:00 🏥</p>
              </div>
            </div>
          </div>

          {passo === 3 && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-12 left-4 right-4 z-50"
            >
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setFotosAberto(true))} posicao="bottom">
                <div className="bg-white rounded-2xl p-4 shadow-2xl cursor-pointer border-2 border-green-400 flex items-center gap-3">
                  <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-2xl">
                    📸
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Captura de tela salva</p>
                    <p className="text-sm text-gray-500">Toque para ver</p>
                  </div>
                </div>
              </ElementoClicavel>
            </motion.div>
          )}
        </motion.div>
      )}

      {fotosAberto && !printAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <h2 className="text-xl font-bold text-gray-800">Google Fotos</h2>
          </div>

          <div className="p-4">
            <p className="text-lg font-bold text-gray-800 mb-4">📁 Capturas de Tela</p>
            <div className="grid grid-cols-3 gap-2">
              {passo === 4 && (
                <ElementoClicavel onClick={() => { setPrintAberto(true); setTimeout(() => setMostrarValidacao(true), 1500); }} posicao="bottom">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer border-2 border-green-400">
                    <p className="text-xs font-bold text-gray-600 mb-1">15/08</p>
                    <p className="text-2xl">🏥</p>
                    <p className="text-xs text-gray-500">Agora</p>
                  </div>
                </ElementoClicavel>
              )}
              {["📱", "🌅", "🎂"].map((emoji, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-3xl">{emoji}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {printAberto && (
        <div className="w-full h-full bg-black pt-12 flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between bg-black/80">
            <button onClick={() => setPrintAberto(false)} className="text-white text-xl">←</button>
            <p className="text-white font-bold">Captura de tela</p>
            <button className="text-white text-xl">⋮</button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-sm bg-gradient-to-b from-green-50 to-white rounded-2xl p-6 shadow-2xl"
            >
              <div className="bg-green-600 px-4 py-2 rounded-t-xl -mx-6 -mt-6 mb-4">
                <p className="text-white font-bold text-sm">Dr. Silva</p>
              </div>
              <p className="text-gray-700 font-semibold mb-3">Olá! Sua consulta está marcada para:</p>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                <p className="text-xl font-black text-blue-700 text-center mb-1">15/08/2026</p>
                <p className="text-lg font-bold text-blue-600 text-center">10:00 🏥</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorWrapper>
  );
}