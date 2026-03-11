import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo2Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [configAberta, setConfigAberta] = useState(false);
  const [bluetoothAberto, setBluetoothAberto] = useState(false);
  const [bluetoothLigado, setBluetoothLigado] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [conectado, setConectado] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Para que serve o Bluetooth?"
        opcoes={[
          "📶 Para conectar ao Wi-Fi",
          "🎧 Para conectar fones e aparelhos sem usar fio ✅",
          "📸 Para tirar fotos melhores",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Bluetooth conecta aparelhos sem fio! Toque em CONFIGURAÇÕES e depois em Bluetooth 📡",
      audio: "O Bluetooth conecta aparelhos sem fio! Toque em configurações e depois em Bluetooth!",
    },
    {
      instrucao: "Encontrou! Agora toque em BLUETOOTH para abrir as opções 📡",
      audio: "Encontrou! Agora toque em Bluetooth para abrir as opções!",
    },
    {
      instrucao: "O Bluetooth está desligado! Toque no botão para LIGAR 🔵",
      audio: "O Bluetooth está desligado! Toque no botão para ligar!",
    },
    {
      instrucao: "Um fone de ouvido foi encontrado! Toque nele para CONECTAR 🎧",
      audio: "Um fone de ouvido foi encontrado! Toque nele para conectar!",
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
      {!configAberta && !bluetoothAberto && (
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
                </div>
              </ElementoClicavel>
            )}
            {["G", "📷", "📱", "📧", "🎵", "📍", "💬"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {configAberta && !bluetoothAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Configurações</h2>
          </div>
          <div className="space-y-2">
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setBluetoothAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">📡</div>
                  <span className="text-lg font-bold text-gray-700">Bluetooth</span>
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

      {bluetoothAberto && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => setBluetoothAberto(false)} className="text-blue-600 font-bold mb-6">← Voltar</button>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-800">Bluetooth</h2>
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => {
                  setBluetoothLigado(true);
                  setTimeout(() => {
                    setDispositivos([{ nome: "🎧 Fone JBL", id: 1 }]);
                    setPasso(4);
                  }, 1000);
                }}
                posicao="right"
              >
                <div className={`w-16 h-8 rounded-full relative cursor-pointer transition-all ${bluetoothLigado ? "bg-green-500" : "bg-gray-300"}`}>
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${bluetoothLigado ? "left-9" : "left-1"}`} />
                </div>
              </ElementoClicavel>
            )}
            {passo !== 3 && (
              <div className={`w-16 h-8 rounded-full relative ${bluetoothLigado ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow ${bluetoothLigado ? "left-9" : "left-1"}`} />
              </div>
            )}
          </div>

          {!bluetoothLigado && (
            <div className="text-center text-gray-400 py-16">
              <div className="text-6xl mb-4">📡</div>
              <p className="font-semibold">Bluetooth desligado</p>
            </div>
          )}

          {bluetoothLigado && dispositivos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-16"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                📡
              </motion.div>
              <p className="font-semibold">Procurando dispositivos...</p>
            </motion.div>
          )}

          {dispositivos.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 font-semibold mb-3">Dispositivos disponíveis:</p>
              {passo === 4 && !conectado && (
                <ElementoClicavel
                  onClick={() => {
                    setConectado(true);
                    setTimeout(() => setMostrarValidacao(true), 1000);
                  }}
                  posicao="right"
                >
                  <div className="p-4 bg-gray-100 rounded-2xl cursor-pointer active:scale-95 transition-all">
                    <p className="text-lg font-bold text-gray-700">🎧 Fone JBL</p>
                  </div>
                </ElementoClicavel>
              )}
              {conectado && (
                <div className="p-4 bg-green-100 border-2 border-green-400 rounded-2xl">
                  <p className="text-lg font-bold text-green-700">✅ Fone JBL - Conectado</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </SimuladorWrapper>
  );
}