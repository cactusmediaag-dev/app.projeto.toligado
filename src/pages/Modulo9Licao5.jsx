import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const SOM_CLIQUE = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp';

export default function Modulo9Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [justificativaAberta, setJustificativaAberta] = useState(false);
  const [localizacaoPermitida, setLocalizacaoPermitida] = useState(false);
  const [justificativaEnviada, setJustificativaEnviada] = useState(false);
  const [debitosAberto, setDebitosAberto] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio(SOM_CLIQUE);
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
    navigate(createPageUrl("Modulo9Celebracao"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Se você estiver viajando no dia da eleição, o que pode fazer?"
        opcoes={[
          "😰 Nada, vai ficar irregular para sempre",
          "📍 Justificar pelo e-Título no mesmo dia, das 8h às 17h ✅",
          "💸 Pagar alguém para votar por você",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Viajou e não pôde votar? O e-Título resolve! Toque em JUSTIFICATIVA 📍", audio: "Viajou e não pôde votar? O e-Título resolve! Toque em justificativa!" },
    { instrucao: "No DIA da eleição, das 8h às 17h, quem está fora da sua cidade justifica pelo app! Toque em JUSTIFICAR AGORA ✅", audio: "No dia da eleição, das oito horas às dezessete horas, quem está fora da sua cidade justifica pelo app! Toque em justificar agora!" },
    { instrucao: "O app usa a LOCALIZAÇÃO do celular para comprovar que você está longe. Toque em PERMITIR 🛰️", audio: "O app usa a localização do celular para comprovar que você está longe. Toque em permitir!" },
    { instrucao: "Perdeu o prazo? Dá para justificar DEPOIS da eleição também, anexando um comprovante 📎", audio: "Perdeu o prazo? Dá para justificar depois da eleição também, anexando um comprovante!" },
    { instrucao: "Ficou com multa? Consulte seus DÉBITOS e pague pelo Pix, direto no app! Toque em DÉBITOS 💚", audio: "Ficou com multa? Consulte seus débitos e pague pelo Pix, direto no app! Toque em débitos!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header e-Título */}
      <div style={{ background: '#1E5A9C', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{ fontSize: '28px' }}>🗳️</span>
        <div>
          <h2 style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '20px' }}>e-Título</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Justiça Eleitoral</p>
        </div>
      </div>

      {/* Passo 1: Tela principal com botão Justificativa */}
      {!justificativaAberta && !debitosAberto && (
        <div className="flex-1 bg-gray-50 p-6">
          <div className="bg-white rounded-2xl shadow p-6 mb-4">
            <p className="font-bold mb-4" style={{ fontSize: '18px', color: '#1E5A9C' }}>Olá, Maria! 👋</p>
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: '#E8F5E9' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <p style={{ fontSize: '16px', color: '#2E7D32', fontWeight: '700' }}>Situação: REGULAR</p>
            </div>
          </div>

          {passo === 1 && (
            <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setJustificativaAberta(true))} mostrarSeta={false} posicao="bottom">
              <div className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer" style={{ background: '#FFF8E1', border: '2px solid #F9A825' }}>
                <span style={{ fontSize: '32px' }}>📍</span>
                <div>
                  <p className="font-bold" style={{ fontSize: '18px', color: '#F9A825' }}>Justificativa</p>
                  <p style={{ fontSize: '15px', color: '#666' }}>Não pôde votar? Justifique aqui</p>
                </div>
              </div>
            </ElementoClicavel>
          )}
        </div>
      )}

      {/* Passos 2-3: Tela de Justificativa */}
      {justificativaAberta && !debitosAberto && (
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-5">
            <h3 className="font-bold text-gray-800 mb-2" style={{ fontSize: '20px' }}>📍 Justificativa de Ausência</h3>
            <p className="text-gray-500 mb-5" style={{ fontSize: '15px' }}>No dia da eleição: das 8h às 17h</p>

            {/* Passo 2: Botão Justificar Agora */}
            {passo === 2 && !localizacaoPermitida && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, null)} mostrarSeta={false} posicao="top">
                <button className="w-full py-4 rounded-xl font-bold text-white mb-4" style={{ background: '#2E7D32', minHeight: '48px', fontSize: '18px' }}>
                  ✅ JUSTIFICAR AGORA
                </button>
              </ElementoClicavel>
            )}

            {/* Passo 3: Dialog de localização */}
            {passo === 3 && !localizacaoPermitida && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl p-5 mb-4" style={{ background: '#E3F2FD', border: '2px solid #1E5A9C' }}>
                <div className="text-center mb-4">
                  <span style={{ fontSize: '40px' }}>🛰️</span>
                  <p className="font-bold mt-2" style={{ fontSize: '18px', color: '#1E5A9C' }}>Permitir localização?</p>
                  <p className="text-gray-600 mt-1" style={{ fontSize: '15px' }}>O app precisa confirmar que você está fora da sua cidade</p>
                </div>
                <ElementoClicavel onClick={() => { setLocalizacaoPermitida(true); handleCliqueCerto(4, null); }} mostrarSeta={false} posicao="top">
                  <button className="w-full py-4 rounded-xl font-bold text-white" style={{ background: '#1E5A9C', minHeight: '48px', fontSize: '18px' }}>
                    🛰️ PERMITIR
                  </button>
                </ElementoClicavel>
              </motion.div>
            )}

            {/* Localização permitida */}
            {localizacaoPermitida && !justificativaEnviada && (
              <div className="rounded-2xl p-4 mb-4" style={{ background: '#E8F5E9', border: '2px solid #2E7D32' }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '24px' }}>✅</span>
                  <p style={{ fontSize: '16px', color: '#2E7D32', fontWeight: '700' }}>Localização confirmada!</p>
                </div>
              </div>
            )}

            {/* Passo 4: Justificar depois */}
            {passo === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5 mb-4" style={{ background: '#FFF8E1', border: '2px solid #F9A825' }}>
                <div className="flex items-start gap-3 mb-4">
                  <span style={{ fontSize: '28px' }}>📎</span>
                  <div>
                    <p className="font-bold" style={{ fontSize: '17px', color: '#F9A825' }}>Justificar depois da eleição</p>
                    <p className="text-gray-600 mt-1" style={{ fontSize: '15px', lineHeight: 1.4 }}>Perdeu o prazo? Sem problema! Você pode justificar depois, anexando um comprovante.</p>
                  </div>
                </div>
                <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setDebitosAberto(true))} mostrarSeta={false} posicao="bottom">
                  <button className="w-full py-4 rounded-xl font-bold" style={{ background: '#F9A825', color: '#fff', minHeight: '48px', fontSize: '18px' }}>
                    Continuar →
                  </button>
                </ElementoClicavel>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Passo 5: Débitos / Pix */}
      {debitosAberto && (
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-5">
            <h3 className="font-bold text-gray-800 mb-4" style={{ fontSize: '20px' }}>💚 Débitos Eleitorais</h3>

            <div className="rounded-2xl p-5 mb-4" style={{ background: '#E8F5E9', border: '2px solid #2E7D32' }}>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '28px' }}>💰</span>
                <div>
                  <p className="font-bold" style={{ fontSize: '17px', color: '#2E7D32' }}>Multa por ausência</p>
                  <p style={{ fontSize: '22px', color: '#333', fontWeight: '900' }}>R$ 3,51</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4" style={{ fontSize: '15px' }}>Pague pelo Pix direto no app!</p>

              {passo === 5 && (
                <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false} posicao="top">
                  <button className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2" style={{ background: '#2E7D32', minHeight: '48px', fontSize: '18px' }}>
                    💚 PAGAR COM PIX
                  </button>
                </ElementoClicavel>
              )}
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#FFF8E1' }}>
              <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                ⚠️ <strong>Alerta anti-golpe:</strong> O e-Título nunca cobra taxa e nunca chega por link de WhatsApp!
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </SimuladorImersivo>
  );
}