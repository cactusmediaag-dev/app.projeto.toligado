import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo6Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [bancoAberto, setBancoAberto] = useState(false);
  const [telaPagamento, setTelaPagamento] = useState(false);
  const [opcoesPagamento, setOpcoesPagamento] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [codigoLido, setCodigoLido] = useState(false);
  const [resumo, setResumo] = useState(false);
  const [confirmacaoSenha, setConfirmacaoSenha] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [comprovante, setComprovante] = useState(false);
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
    navigate(createPageUrl("Modulo6Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você paga uma conta de luz pelo celular?"
        opcoes={[
          "📞 Ligando para a empresa de energia",
          "💸 Pelo app do banco, escaneando o código de barras ✅",
          "🏪 Só na loja física",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  };

  const passos = [
    { instrucao: "Chegou a conta de luz! Vamos pagar pelo celular. Toque no app do BANCO 🏦", audio: "Chegou a conta de luz! Vamos pagar pelo celular. Toque no app do banco!" },
    { instrucao: "Toque em PAGAR no menu inferior para pagar a conta 💸", audio: "Toque em pagar no menu inferior para pagar a conta!" },
    { instrucao: "Toque em CONTA DE LUZ para pagar sua fatura ⚡", audio: "Toque em conta de luz para pagar sua fatura!" },
    { instrucao: "Você pode ESCANEAR a conta com a câmera! Toque em Escanear 📷", audio: "Você pode escanear a conta com a câmera! Toque em escanear!" },
    { instrucao: "Aponte para o código de barras da conta! Ele vai ser lido 📊", audio: "Aponte para o código de barras da conta! Ele vai ser lido!" },
    { instrucao: "Confira os dados! Toque em CONFIRMAR PAGAMENTO para pagar ✅", audio: "Confira os dados! Toque em confirmar pagamento para pagar!" },
    { instrucao: "Digite sua senha do banco para confirmar o pagamento 🔐", audio: "Digite sua senha do banco para confirmar o pagamento!" },
    { instrucao: "Conta paga! Toque em VER COMPROVANTE para guardar o recibo 📄", audio: "Conta paga! Toque em ver comprovante para guardar o recibo!" },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!bancoAberto && (
        <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setBancoAberto(true))} posicao="bottom">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    🏦
                  </div>
                  <p className="text-xs text-gray-600 font-semibold text-center">Banco Fácil</p>
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

      {bancoAberto && !telaPagamento && !opcoesPagamento && (
        <div className="w-full h-full bg-white pt-12 flex flex-col">
          <div className="bg-orange-500 px-4 py-4">
            <p className="text-white/80 text-sm mb-1">Olá, Maria!</p>
            <p className="text-3xl font-black text-white">R$ 850,00</p>
            <p className="text-white/80 text-sm">Saldo disponível</p>
          </div>

          <div className="flex-1 p-4">
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Últimas transações</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold">Mercado Central</p>
                  <p className="text-red-600 font-bold">-R$ 45,00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold">Farmácia Saúde</p>
                  <p className="text-red-600 font-bold">-R$ 28,50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-4 flex items-center justify-around">
            <button className="flex flex-col items-center gap-1">
              <div className="text-2xl">🏠</div>
              <p className="text-xs text-gray-500">Início</p>
            </button>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => { setTelaPagamento(true); setOpcoesPagamento(true); })} posicao="top">
                <button className="flex flex-col items-center gap-1">
                  <div className="text-2xl">💸</div>
                  <p className="text-xs font-bold text-orange-600">Pagar</p>
                </button>
              </ElementoClicavel>
            )}
            {passo !== 2 && (
              <button className="flex flex-col items-center gap-1">
                <div className="text-2xl">💸</div>
                <p className="text-xs text-gray-500">Pagar</p>
              </button>
            )}
            <button className="flex flex-col items-center gap-1">
              <div className="text-2xl">📊</div>
              <p className="text-xs text-gray-500">Extrato</p>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="text-2xl">👤</div>
              <p className="text-xs text-gray-500">Perfil</p>
            </button>
          </div>
        </div>
      )}

      {opcoesPagamento && !cameraAberta && !codigoLido && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <button onClick={() => setOpcoesPagamento(false)} className="text-xl">←</button>
            <h2 className="text-xl font-bold text-gray-800">Pagamentos</h2>
          </div>

          <div className="p-4 space-y-3">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <span className="text-lg font-bold text-gray-700">Boleto / Código de Barras</span>
            </div>
            {passo === 3 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setCameraAberta(true))} posicao="right">
                <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-2xl flex items-center gap-3 cursor-pointer">
                  <span className="text-3xl">⚡</span>
                  <span className="text-lg font-bold text-gray-700">Conta de Luz</span>
                </div>
              </ElementoClicavel>
            )}
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">💧</span>
              <span className="text-lg font-bold text-gray-700">Conta de Água</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">📱</span>
              <span className="text-lg font-bold text-gray-700">Recarga de Celular</span>
            </div>
          </div>
        </div>
      )}

      {cameraAberta && passo === 4 && !codigoLido && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <button onClick={() => setCameraAberta(false)} className="text-xl">←</button>
            <h2 className="text-xl font-bold text-gray-800">Conta de Luz</h2>
          </div>

          <div className="p-4 space-y-3">
            {passo === 4 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => {})} posicao="right">
                <button className="w-full p-5 bg-blue-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
                  <span className="text-3xl">📷</span>
                  Escanear código de barras
                </button>
              </ElementoClicavel>
            )}
            <button className="w-full p-5 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg">
              ⌨️ Digitar o código manualmente
            </button>
          </div>
        </div>
      )}

      {passo === 5 && cameraAberta && !codigoLido && (
        <div className="w-full h-full bg-black pt-12 flex items-center justify-center relative">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 mb-4">
              <div className="h-2 bg-black mb-1" />
              <div className="h-2 bg-black mb-1" />
              <div className="h-2 bg-black mb-1" />
              <p className="text-xs text-gray-500 mt-2">34191.79001 01043.510047 91020.150008 1 99990000008750</p>
            </div>
            <motion.div animate={{ y: [0, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-1 bg-red-500 w-64 mx-auto" />
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-4">
            {passo === 5 && (
              <ElementoClicavel onClick={() => { setCodigoLido(true); setResumo(true); setCameraAberta(false); handleCliqueCerto(6, null); }} posicao="top">
                <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg">
                  Escanear Agora
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {resumo && !confirmacaoSenha && !sucesso && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <button onClick={() => setResumo(false)} className="text-xl">←</button>
            <h2 className="text-xl font-bold text-gray-800">Confirmar Pagamento</h2>
          </div>

          <div className="p-4">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">⚡</span>
                <p className="text-2xl font-black text-gray-800">R$ 87,50</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600">Empresa:</p>
                  <p className="font-bold text-gray-800">Energisa MT</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Vencimento:</p>
                  <p className="font-bold text-gray-800">15/08/2026</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Código:</p>
                  <p className="font-bold text-gray-800 text-xs">34191.79001 01043...</p>
                </div>
              </div>
            </div>

            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => { setResumo(false); setConfirmacaoSenha(true); })} posicao="top">
                <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg">
                  Confirmar Pagamento
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {confirmacaoSenha && !sucesso && (
        <div className="w-full h-full bg-white pt-12 flex flex-col items-center justify-center p-6">
          <div className="text-6xl mb-6">🔐</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Digite sua senha</h3>
          <p className="text-gray-500 mb-8">Para confirmar o pagamento</p>

          <div className="flex gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-12 h-12 bg-orange-500 rounded-xl" />
            ))}
          </div>

          {passo === 7 && (
            <ElementoClicavel onClick={() => { setConfirmacaoSenha(false); setSucesso(true); handleCliqueCerto(8, null); }} posicao="top">
              <button className="w-full max-w-sm bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg">
                Confirmar
              </button>
            </ElementoClicavel>
          )}
        </div>
      )}

      {sucesso && !comprovante && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full bg-white pt-12 flex flex-col items-center justify-center p-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <div className="text-8xl mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Pagamento realizado!</h3>
            <p className="text-gray-600 text-center mb-6">Conta de Luz — R$ 87,50</p>
          </motion.div>

          {passo === 8 && (
            <ElementoClicavel onClick={() => { setComprovante(true); setTimeout(() => setMostrarValidacao(true), 1500); }} posicao="top">
              <button className="w-full max-w-sm bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                <span className="text-2xl">📄</span>
                Ver Comprovante
              </button>
            </ElementoClicavel>
          )}
        </motion.div>
      )}

      {comprovante && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="w-full h-full bg-white pt-12">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <button onClick={() => setComprovante(false)} className="text-xl">←</button>
            <h2 className="text-xl font-bold text-gray-800">Comprovante</h2>
          </div>

          <div className="p-4">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">✅</div>
                <p className="text-sm text-gray-500">PAGAMENTO APROVADO</p>
              </div>

              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Valor:</p>
                  <p className="font-bold text-gray-800">R$ 87,50</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Empresa:</p>
                  <p className="font-bold text-gray-800">Energisa MT</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Data:</p>
                  <p className="font-bold text-gray-800">11/03/2026</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Protocolo:</p>
                  <p className="font-bold text-gray-800">2026031187451</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </SimuladorWrapper>
  );
}