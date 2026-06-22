import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo4Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [instagramAberto, setInstagramAberto] = useState(false);
  const [storyAberto, setStoryAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);
  const [privacidadeAberta, setPrivacidadeAberta] = useState(false);
  const [contaPrivada, setContaPrivada] = useState(false);
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
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod4")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod4"],
            xp_total: (users[0].xp_total || 0) + 80,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo4Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que é importante deixar o Instagram privado?"
        opcoes={[
          "🌐 Para todo mundo ver suas fotos",
          "🔒 Para só seus seguidores verem — mais segurança ✅",
          "📵 Para não conseguir mais postar",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "O Instagram é para compartilhar fotos e momentos! Toque no ícone 📸", audio: "O Instagram é para compartilhar fotos e momentos! Toque no ícone!" },
    { instrucao: "Esses círculos no topo são os STORIES! Toque em um para ver 🔵", audio: "Esses círculos no topo são os stories! Toque em um para ver!" },
    { instrucao: "O story passa sozinho! Toque na tela para avançar ou feche com X ✕", audio: "O story passa sozinho! Toque na tela para avançar ou feche com X!" },
    { instrucao: "Vamos ao seu PERFIL! Toque no ícone de bonequinho no canto inferior direito 👤", audio: "Vamos ao seu perfil! Toque no ícone de bonequinho no canto inferior direito!" },
    { instrucao: "Seu perfil está PÚBLICO! Qualquer um pode ver. Vamos deixar PRIVADO! Toque em ⚙️", audio: "Seu perfil está público! Qualquer um pode ver. Vamos deixar privado! Toque em configurações!" },
    { instrucao: "Toque em PRIVACIDADE DA CONTA para proteger seu perfil 🔒", audio: "Toque em privacidade da conta para proteger seu perfil!" },
    { instrucao: "Ative a CONTA PRIVADA! Toque no botão para ligar 🔒", audio: "Ative a conta privada! Toque no botão para ligar!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={7}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instagramAberto && (
        <div className="w-full h-full bg-gradient-to-b from-purple-50 to-pink-50 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setInstagramAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-md text-white">📷</div>
                </div>
              </ElementoClicavel>
            )}
            {["f", "💬", "📱", "📧", "🎵", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {instagramAberto && !storyAberto && !perfilAberto && !configAberta && (
        <div className="w-full h-full bg-white pt-12 flex flex-col">
          <div className="px-4 py-2 border-b">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Instagram</h2>
          </div>

          <div className="flex gap-3 px-4 py-3 overflow-x-auto border-b">
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => setStoryAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl">🏖️</div>
                  </div>
                  <p className="text-xs font-semibold">Ana</p>
                </div>
              </ElementoClicavel>
            )}
            {["🌻", "🎂", "🐶"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl">{emoji}</div>
                </div>
                <p className="text-xs font-semibold">Story</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">👤</div>
                <p className="font-bold text-sm">maria_silva</p>
              </div>
              <div className="w-full aspect-square bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center text-8xl">🏔️</div>
              <div className="px-4 py-3">
                <div className="flex gap-4 mb-2">
                  <span className="text-2xl">❤️</span>
                  <span className="text-2xl">💬</span>
                  <span className="text-2xl">📤</span>
                </div>
                <p className="font-semibold text-sm">152 curtidas</p>
              </div>
            </div>
          </div>

          <div className="border-t flex items-center justify-around py-2">
            <button className="text-2xl">🏠</button>
            <button className="text-2xl">🔍</button>
            <button className="text-2xl">➕</button>
            <button className="text-2xl">❤️</button>
            {passo === 4 && !perfilAberto && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setPerfilAberto(true))} posicao="top">
                <button className="text-2xl">👤</button>
              </ElementoClicavel>
            )}
            {passo !== 4 && <button className="text-2xl">👤</button>}
          </div>
        </div>
      )}

      {storyAberto && (
        <div className="w-full h-full bg-black pt-12 relative">
          <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 h-1 bg-white/50 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} />
            </div>
          </div>

          <div className="absolute top-20 left-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-sm">👤</div>
            <p className="text-white font-semibold text-sm">Ana Silva</p>
            <p className="text-white/70 text-xs">2h</p>
          </div>

          {passo === 3 && (
            <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setStoryAberto(false))} posicao="top">
              <button className="absolute top-16 right-4 text-white text-3xl">✕</button>
            </ElementoClicavel>
          )}

          <div className="flex items-center justify-center h-full">
            <div className="text-9xl">🏖️</div>
          </div>
        </div>
      )}

      {perfilAberto && !configAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 flex items-center justify-between border-b">
            <button onClick={() => setPerfilAberto(false)} className="text-xl">←</button>
            <p className="font-bold">seu_perfil</p>
            <div />
          </div>

          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center text-4xl">👤</div>
              <div className="flex-1">
                <p className="text-2xl font-bold">Seu Nome</p>
                <p className="text-sm text-gray-500">seu_perfil</p>
              </div>
              {passo === 5 && (
                <ElementoClicavel onClick={() => handleCliqueCerto(6, () => setConfigAberta(true))} posicao="left">
                  <button className="text-2xl">⚙️</button>
                </ElementoClicavel>
              )}
              {passo !== 5 && <button className="text-2xl">⚙️</button>}
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 mb-4">
              <p className="text-center font-bold text-orange-700">⚠️ Perfil Público 🌐</p>
              <p className="text-center text-sm text-orange-600 mt-1">Qualquer pessoa pode ver suas fotos</p>
            </div>

            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-xl font-semibold mb-4">Editar Perfil</button>

            <div className="grid grid-cols-3 gap-1">
              {["🌅", "🌻", "🏖️", "🐶", "🎂", "🏔️"].map((emoji, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-blue-200 to-purple-300 rounded-xl flex items-center justify-center text-5xl">{emoji}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {configAberta && !privacidadeAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <button onClick={() => setConfigAberta(false)} className="text-xl">←</button>
            <p className="font-bold">Configurações</p>
          </div>
          <div className="p-4 space-y-2">
            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => setPrivacidadeAberta(true))} posicao="right">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <span className="font-semibold text-gray-800">Privacidade da Conta</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </ElementoClicavel>
            )}
            <div className="flex items-center justify-between p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <span className="font-semibold text-gray-800">Notificações</span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>
      )}

      {privacidadeAberta && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <button onClick={() => setPrivacidadeAberta(false)} className="text-xl">←</button>
            <p className="font-bold">Privacidade</p>
          </div>
          <div className="p-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
              <p className="text-sm font-bold text-blue-700 mb-2">ℹ️ Conta Privada</p>
              <p className="text-sm text-blue-600">Quando sua conta é privada, somente pessoas que você aprovar podem ver suas fotos e vídeos.</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-800">Conta Privada</p>
                <p className="text-sm text-gray-500">Mais segurança para você</p>
              </div>
              {passo === 7 && !contaPrivada && (
                <ElementoClicavel onClick={() => { setContaPrivada(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="left">
                  <div className="w-14 h-8 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow" />
                  </div>
                </ElementoClicavel>
              )}
              {contaPrivada && (
                <motion.div initial={{ backgroundColor: "#D1D5DB" }} animate={{ backgroundColor: "#22C55E" }} className="w-14 h-8 rounded-full relative">
                  <motion.div initial={{ left: 4 }} animate={{ left: 28 }} className="absolute top-1 w-6 h-6 bg-white rounded-full shadow" />
                </motion.div>
              )}
            </div>

            {contaPrivada && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-100 border-2 border-green-400 rounded-2xl p-6 mt-6">
                <div className="text-center">
                  <div className="text-6xl mb-3">🔒</div>
                  <p className="text-xl font-bold text-green-700 mb-2">✅ Conta privada ativada!</p>
                  <p className="text-sm text-green-600">Só seus seguidores veem suas fotos</p>
                </div>
              </motion.div>
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