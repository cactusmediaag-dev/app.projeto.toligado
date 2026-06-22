import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo6Licao1() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [playStoreAberta, setPlayStoreAberta] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [resultadoBusca, setResultadoBusca] = useState(false);
  const [instalando, setInstalando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [instalado, setInstalado] = useState(false);
  const [appAberto, setAppAberto] = useState(false);
  const [cpfPreenchido, setCpfPreenchido] = useState(false);
  const [senhaPreenchida, setSenhaPreenchida] = useState(false);
  const [logado, setLogado] = useState(false);
  const [extratoAberto, setExtratoAberto] = useState(false);
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
    navigate(createPageUrl("Modulo6Licao2"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Onde você encontra o app Meu INSS para instalar?"
        opcoes={[
          "🌐 No site de qualquer empresa",
          "🏪 Na Play Store — loja oficial de apps ✅",
          "📧 Por e-mail",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Você sabia que pode consultar seu INSS pelo celular? Toque na Play Store 🏪", audio: "Você sabia que pode consultar seu INSS pelo celular? Toque na Play Store!" },
    { instrucao: "Vamos buscar o app do INSS! Toque na barra de busca e pesquise 🔍", audio: "Vamos buscar o app do INSS! Toque na barra de busca e pesquise!" },
    { instrucao: "Encontrou! Toque em INSTALAR para baixar o app oficial do INSS 📲", audio: "Encontrou! Toque em instalar para baixar o app oficial do INSS!" },
    { instrucao: "Instalado! Agora toque em ABRIR para entrar no app do INSS 🎉", audio: "Instalado! Agora toque em abrir para entrar no app do INSS!" },
    { instrucao: "Para entrar use seu CPF! Toque no campo CPF para digitar 🪪", audio: "Para entrar use seu CPF! Toque no campo CPF para digitar!" },
    { instrucao: "Agora toque no campo SENHA e digite sua senha do Gov.br 🔐", audio: "Agora toque no campo senha e digite sua senha do Gov.br!" },
    { instrucao: "Pronto! Toque em ENTRAR para acessar seus dados do INSS ✅", audio: "Pronto! Toque em entrar para acessar seus dados do INSS!" },
    { instrucao: "Aqui você vê seu extrato e muito mais! Toque em EXTRATO DE PAGAMENTO 💰", audio: "Aqui você vê seu extrato e muito mais! Toque em extrato de pagamento!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
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

      {playStoreAberta && !buscando && !resultadoBusca && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setPlayStoreAberta(false)} className="text-xl">←</button>
              {passo === 2 && (
                <ElementoClicavel onClick={() => { setBuscando(true); setTimeout(() => { setBuscando(false); setResultadoBusca(true); setPasso(3); }, 1500); }} posicao="right">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-pointer">
                    <p className="text-gray-400">Pesquisar apps...</p>
                  </div>
                </ElementoClicavel>
              )}
              {passo !== 2 && (
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <p className="text-gray-400">Pesquisar apps...</p>
                </div>
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

      {buscando && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button className="text-xl">←</button>
              <div className="flex-1 bg-blue-100 rounded-full px-4 py-2">
                <p className="text-gray-800 font-semibold">Meu INSS</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        </div>
      )}

      {resultadoBusca && !instalando && !instalado && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setResultadoBusca(false)} className="text-xl">←</button>
              <div className="flex-1 bg-blue-100 rounded-full px-4 py-2">
                <p className="text-gray-800 font-semibold">Meu INSS</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            {passo === 3 && (
              <ElementoClicavel onClick={() => {
                setInstalando(true);
                let prog = 0;
                const intervalo = setInterval(() => {
                  prog += 20;
                  setProgresso(prog);
                  if (prog >= 100) {
                    clearInterval(intervalo);
                    setInstalando(false);
                    setInstalado(true);
                    setPasso(4);
                  }
                }, 400);
              }} posicao="right">
                <div className="flex items-start gap-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-2xl cursor-pointer">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                    🏛️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">Meu INSS</p>
                    <p className="text-sm text-gray-500 mb-2">Governo Federal</p>
                    <p className="text-xs text-gray-400">★★★★☆ 4.3 • 10M+ downloads</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
                    Instalar
                  </button>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {instalando && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <p className="font-bold text-gray-800">Instalando...</p>
          </div>
          <div className="p-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                🏛️
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg mb-3">Meu INSS</p>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div className="h-full bg-blue-600" style={{ width: `${progresso}%` }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">{progresso}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {instalado && !appAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b">
            <p className="font-bold text-gray-800">Meu INSS</p>
          </div>
          <div className="p-4">
            {passo === 4 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setAppAberto(true))} posicao="right">
                <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-400 rounded-2xl cursor-pointer">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                    🏛️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">Meu INSS</p>
                    <p className="text-sm text-green-600 font-semibold mb-2">✅ Instalado</p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold">
                    Abrir
                  </button>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {appAberto && !logado && (
        <div className="w-full h-full bg-gradient-to-b from-blue-600 to-blue-800 pt-12 flex flex-col">
          <div className="text-center py-8">
            <div className="text-7xl mb-4">🏛️</div>
            <h2 className="text-2xl font-black text-white mb-2">Meu INSS</h2>
            <p className="text-white/80">Governo Federal</p>
          </div>

          <div className="flex-1 bg-white rounded-t-3xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Entre com seus dados</h3>
            
            {passo === 5 && !cpfPreenchido && (
              <ElementoClicavel onClick={() => { setCpfPreenchido(true); handleCliqueCerto(6, null); }} posicao="top">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer" readOnly />
                </div>
              </ElementoClicavel>
            )}

            {cpfPreenchido && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">CPF</label>
                <input type="text" value="123.456.789-00" className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 bg-blue-50" readOnly />
              </div>
            )}

            {passo >= 6 && cpfPreenchido && !senhaPreenchida && (
              <ElementoClicavel onClick={() => { setSenhaPreenchida(true); handleCliqueCerto(7, null); }} posicao="top">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Senha</label>
                  <input type="password" placeholder="••••••" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer" readOnly />
                </div>
              </ElementoClicavel>
            )}

            {senhaPreenchida && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Senha</label>
                <input type="password" value="••••••" className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 bg-blue-50" readOnly />
              </div>
            )}

            {passo === 7 && cpfPreenchido && senhaPreenchida && (
              <ElementoClicavel onClick={() => handleCliqueCerto(8, () => setLogado(true))} posicao="top">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg">
                  Entrar
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {logado && !extratoAberto && (
        <div className="w-full h-full bg-white pt-12">
          <div className="bg-blue-600 px-4 py-4">
            <h2 className="text-xl font-bold text-white">Meu INSS</h2>
            <p className="text-white/80 text-sm">Olá, Maria!</p>
          </div>

          <div className="p-4 grid grid-cols-2 gap-3">
            {passo === 8 && (
              <ElementoClicavel onClick={() => { setExtratoAberto(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="bottom">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-center cursor-pointer">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="font-bold text-gray-800 text-sm">Extrato de Pagamento</p>
                </div>
              </ElementoClicavel>
            )}
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">📅</div>
              <p className="font-bold text-gray-800 text-sm">Agendamentos</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="font-bold text-gray-800 text-sm">Certidões</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">💰</div>
              <p className="font-bold text-gray-800 text-sm">Empréstimo</p>
            </div>
          </div>
        </div>
      )}

      {extratoAberto && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-white pt-12">
          <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
            <button onClick={() => setExtratoAberto(false)} className="text-white text-xl">←</button>
            <h2 className="text-xl font-bold text-white">Extrato de Pagamento</h2>
          </div>

          <div className="p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
              <p className="text-sm mb-2 opacity-90">Benefício</p>
              <p className="text-2xl font-black mb-4">Aposentadoria</p>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm mb-1">Valor do benefício:</p>
                <p className="text-4xl font-black">R$ 1.412,00</p>
                <p className="text-sm mt-3 opacity-90">Próximo pagamento: 25/08/2026</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}