import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";

export default function Modulo3Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [googleAberto, setGoogleAberto] = useState(false);
  const [segurancaAberta, setSegurancaAberta] = useState(false);
  const [appSelecionado, setAppSelecionado] = useState(false);
  const [removido, setRemovido] = useState(false);
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
    navigate(createPageUrl("Modulo3Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você deve fazer com apps desconhecidos na sua conta?"
        opcoes={[
          "🤷 Deixar como está",
          "🚫 Remover o acesso imediatamente ✅",
          "📤 Compartilhar com amigos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos revisar quais apps têm acesso à sua conta Google! Toque em GOOGLE ⚙️",
      audio: "Vamos revisar quais apps têm acesso à sua conta Google! Toque em Google!",
    },
    {
      instrucao: "Toque em SEGURANÇA para ver quem tem acesso à sua conta 🔍",
      audio: "Toque em segurança para ver quem tem acesso à sua conta!",
    },
    {
      instrucao: "Atenção! Tem um app suspeito aqui! Toque nele para VER OS DETALHES ⚠️",
      audio: "Atenção! Tem um app suspeito aqui! Toque nele para ver os detalhes!",
    },
    {
      instrucao: "Esse app não deveria ter acesso! Toque em REMOVER ACESSO para proteger 🚫",
      audio: "Esse app não deveria ter acesso! Toque em remover acesso para proteger!",
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
      {!googleAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <h2 className="text-2xl font-black text-gray-800">Configurações</h2>
          </div>
          <div className="space-y-2">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setGoogleAberto(true))}
                posicao="right"
              >
                <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                  <div className="text-3xl">G</div>
                  <span className="text-lg font-bold text-gray-700">Google</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { emoji: "📶", nome: "Wi-Fi" },
              { emoji: "🔐", nome: "Segurança" },
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

      {googleAberto && !segurancaAberta && !appSelecionado && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setGoogleAberto(false)} className="text-blue-600 font-bold mb-4">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800">Conta Google</h2>
          </div>
          <div className="flex gap-2 px-4 mb-6">
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-gray-600">Privacidade</button>
            {passo === 2 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setSegurancaAberta(true))}
                posicao="bottom"
              >
                <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold cursor-pointer">
                  Segurança
                </button>
              </ElementoClicavel>
            )}
            {passo !== 2 && (
              <button className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-gray-600">Segurança</button>
            )}
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-gray-600">Dados</button>
          </div>
        </div>
      )}

      {segurancaAberta && !appSelecionado && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-4">
            <button onClick={() => setSegurancaAberta(false)} className="text-blue-600 font-bold mb-4">← Voltar</button>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Apps com acesso</h2>
            <p className="text-sm text-gray-500">Revise periodicamente</p>
          </div>
          <div className="px-4 space-y-3">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center gap-3">
              <div className="text-3xl">📸</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Google Fotos</p>
                <p className="text-xs text-gray-500">Acesso desde 2024</p>
              </div>
              <div className="text-green-600 text-xl">✅</div>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center gap-3">
              <div className="text-3xl">📧</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Gmail</p>
                <p className="text-xs text-gray-500">Acesso desde 2024</p>
              </div>
              <div className="text-green-600 text-xl">✅</div>
            </div>

            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setAppSelecionado(true))}
                posicao="right"
              >
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-center gap-3 cursor-pointer animate-pulse">
                  <div className="text-3xl">⚠️</div>
                  <div className="flex-1">
                    <p className="font-bold text-red-700">App Desconhecido</p>
                    <p className="text-xs text-red-500">Acesso suspeito</p>
                  </div>
                  <div className="text-red-600 text-xl">⚠️</div>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {appSelecionado && (
        <div className="w-full h-full bg-white pt-12 p-6">
          <button onClick={() => setAppSelecionado(false)} className="text-blue-600 font-bold mb-6">← Voltar</button>
          
          {!removido ? (
            <>
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">⚠️</div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">App Desconhecido</h2>
                <p className="text-red-600 font-semibold">Acesso suspeito detectado</p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
                <p className="text-sm font-bold text-red-700 mb-3">Este app tem acesso a:</p>
                <ul className="space-y-2 text-sm text-red-600">
                  <li>🔴 Ler seus e-mails</li>
                  <li>🔴 Ver seus contatos</li>
                  <li>🔴 Acessar suas fotos</li>
                  <li>🔴 Ver sua localização</li>
                </ul>
              </div>

              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => {
                    setRemovido(true);
                    setTimeout(() => setMostrarValidacao(true), 2000);
                  }}
                  posicao="top"
                >
                  <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg">
                    🚫 Remover Acesso
                  </button>
                </ElementoClicavel>
              )}
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center flex flex-col items-center justify-center h-full"
            >
              <div className="text-8xl mb-6">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Acesso removido com sucesso!</h3>
              <p className="text-gray-600 font-semibold">Sua conta está limpa e segura</p>
            </motion.div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorWrapper>
  );
}