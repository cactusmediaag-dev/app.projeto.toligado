import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo6Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [appAberto, setAppAberto] = useState(false);
  const [nomePreenchido, setNomePreenchido] = useState("");
  const [cpfPreenchido, setCpfPreenchido] = useState(false);
  const [seletorData, setSeletorData] = useState(false);
  const [dataPreenchida, setDataPreenchida] = useState(false);
  const [cadastroEnviado, setCadastroEnviado] = useState(false);
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
        const modulosCompletos = users[0].modulos_completos || [];
        if (!modulosCompletos.includes("mod6")) {
          await base44.entities.Usuario.update(userId, {
            moedas: (users[0].moedas || 0) + 60,
            modulos_completos: [...modulosCompletos, "mod6"],
            xp_total: (users[0].xp_total || 0) + 100,
          });
        }
      }
    }
    navigate(createPageUrl("Modulo6Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que você precisa para fazer um cadastro em um app?"
        opcoes={[
          "🖨️ Ir a uma impressora",
          "📝 Preencher seus dados como nome, CPF e data de nascimento ✅",
          "📞 Ligar para o governo",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Muitos serviços têm app! Vamos aprender a fazer um cadastro. Toque no app 📱", audio: "Muitos serviços têm app! Vamos aprender a fazer um cadastro. Toque no app!" },
    { instrucao: "Preencha seu NOME no primeiro campo! Toque nele para começar ✏️", audio: "Preencha seu nome no primeiro campo! Toque nele para começar!" },
    { instrucao: "Agora toque no campo CPF e digite seus números 🪪", audio: "Agora toque no campo CPF e digite seus números!" },
    { instrucao: "Ótimo! Agora toque em DATA DE NASCIMENTO 📅", audio: "Ótimo! Agora toque em data de nascimento!" },
    { instrucao: "Role as rodinhas para escolher sua data! Toque em OK quando terminar ✅", audio: "Role as rodinhas para escolher sua data! Toque em ok quando terminar!" },
    { instrucao: "Tudo preenchido! Toque em ENVIAR CADASTRO para finalizar 🚀", audio: "Tudo preenchido! Toque em enviar cadastro para finalizar!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!appAberto && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-purple-50 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setAppAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    🏛️
                  </div>
                  <p className="text-xs text-gray-600 font-semibold text-center">CadÚnico</p>
                </div>
              </ElementoClicavel>
            )}
            {["💬", "📧", "🎵", "📷", "📱", "📍", "⚙️"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {appAberto && !cadastroEnviado && (
        <div className="w-full h-full bg-gradient-to-b from-blue-600 to-blue-800 pt-12 flex flex-col">
          <div className="text-center py-6">
            <div className="text-6xl mb-3">🏛️</div>
            <h2 className="text-2xl font-black text-white mb-1">CadÚnico Digital</h2>
            <p className="text-white/80 text-sm">Governo Federal</p>
          </div>

          <div className="flex-1 bg-white rounded-t-3xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Cadastro de Usuário</h3>

            {passo === 2 && !nomePreenchido && (
              <ElementoClicavel onClick={() => { setNomePreenchido("Maria Silva"); handleCliqueCerto(3, null); }} posicao="top">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Nome completo</label>
                  <input type="text" placeholder="Digite seu nome completo" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer" readOnly />
                </div>
              </ElementoClicavel>
            )}

            {nomePreenchido && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Nome completo</label>
                <input type="text" value={nomePreenchido} className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 bg-blue-50" readOnly />
              </div>
            )}

            {passo >= 3 && nomePreenchido && !cpfPreenchido && (
              <ElementoClicavel onClick={() => { setCpfPreenchido(true); handleCliqueCerto(4, null); }} posicao="top">
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

            {passo >= 4 && cpfPreenchido && !seletorData && !dataPreenchida && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setSeletorData(true))} posicao="top">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Data de nascimento</label>
                  <input type="text" placeholder="DD/MM/AAAA" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer" readOnly />
                </div>
              </ElementoClicavel>
            )}

            {dataPreenchida && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Data de nascimento</label>
                <input type="text" value="15/03/1960" className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 bg-blue-50" readOnly />
              </div>
            )}

            {passo === 6 && dataPreenchida && (
              <ElementoClicavel onClick={() => { setCadastroEnviado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} posicao="top">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg">
                  Enviar Cadastro
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {seletorData && !dataPreenchida && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="absolute inset-0 bg-white pt-12 z-50 flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button onClick={() => setSeletorData(false)} className="text-gray-600">Cancelar</button>
            <p className="font-bold text-gray-800">Selecione a data</p>
            {passo === 5 && (
              <ElementoClicavel onClick={() => { setSeletorData(false); setDataPreenchida(true); handleCliqueCerto(6, null); }} posicao="left">
                <button className="text-blue-600 font-bold">OK</button>
              </ElementoClicavel>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Dia</p>
                <div className="h-32 overflow-hidden">
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="space-y-2">
                    <p className="text-2xl text-gray-400">14</p>
                    <p className="text-4xl font-bold text-gray-800">15</p>
                    <p className="text-2xl text-gray-400">16</p>
                  </motion.div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Mês</p>
                <div className="h-32 overflow-hidden">
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="space-y-2">
                    <p className="text-2xl text-gray-400">02</p>
                    <p className="text-4xl font-bold text-gray-800">03</p>
                    <p className="text-2xl text-gray-400">04</p>
                  </motion.div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Ano</p>
                <div className="h-32 overflow-hidden">
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="space-y-2">
                    <p className="text-2xl text-gray-400">1959</p>
                    <p className="text-4xl font-bold text-gray-800">1960</p>
                    <p className="text-2xl text-gray-400">1961</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {cadastroEnviado && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full bg-gradient-to-b from-green-50 to-white pt-12 flex flex-col items-center justify-center p-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <div className="text-8xl mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Cadastro realizado!</h3>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 max-w-sm">
              <p className="text-center text-gray-700 mb-2">Número de protocolo:</p>
              <p className="text-center text-3xl font-black text-blue-600">2025-08741</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </SimuladorWrapper>
  );
}