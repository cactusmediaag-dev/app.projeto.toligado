import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo1Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [escutando, setEscutando] = useState(false);
  const [resposta, setResposta] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
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
            <ElementoClicavel
              onClick={() => handleCliqueCerto(3, () => { setEscutando(true); setTimeout(() => setResposta(true), 1500); })}
              posicao="bottom"
            >
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-4xl shadow-lg cursor-pointer">
                🎤
              </div>
            </ElementoClicavel>
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
    </SimuladorWrapper>
  );
}