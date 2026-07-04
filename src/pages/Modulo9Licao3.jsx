import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const SOM_CLIQUE = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp';

export default function Modulo9Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [tituloAberto, setTituloAberto] = useState(false);
  const [fotoTocada, setFotoTocada] = useState(false);
  const [zonaSecaoTocada, setZonaSecaoTocada] = useState(false);
  const [pdfBaixado, setPdfBaixado] = useState(false);
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
    navigate(createPageUrl("Modulo9Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O e-Título serve como documento no dia da votação?"
        opcoes={[
          "❌ Não, nunca",
          "🗳️ Sim, quando ele tem a sua foto ✅",
          "📠 Só se imprimir em cartório",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Olha só! Esse é o seu TÍTULO DE ELEITOR digital! Toque nele para ver 🗳️", audio: "Olha só! Esse é o seu título de eleitor digital! Toque nele para ver!" },
    { instrucao: "Se você já fez a biometria no cartório, sua FOTO aparece aqui! Toque na foto 📷", audio: "Se você já fez a biometria no cartório, sua foto aparece aqui! Toque na foto!" },
    { instrucao: "Aqui estão sua ZONA e SEÇÃO eleitoral. Toque para ver 🔎", audio: "Aqui estão sua zona e seção eleitoral. Toque para ver!" },
    { instrucao: "Dá até para salvar em PDF e imprimir! Toque em BAIXAR PDF 📄", audio: "Dá até para salvar em PDF e imprimir! Toque em baixar PDF!" },
    { instrucao: "No dia da votação, o e-Título com foto vale como identificação! Toque em ENTENDI ✅", audio: "No dia da votação, o e-Título com foto vale como identificação! Toque em entendi!" },
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

      {/* Passo 1: Card do título na tela inicial */}
      {!tituloAberto && (
        <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
          {passo === 1 && (
            <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setTituloAberto(true))} mostrarSeta={false} posicao="bottom">
              <div className="bg-white rounded-2xl shadow-lg p-6" style={{ width: '280px', border: '2px solid #1E5A9C' }}>
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">🗳️</div>
                  <p className="font-bold" style={{ fontSize: '18px', color: '#1E5A9C' }}>Título de Eleitor</p>
                  <p className="text-sm text-gray-500">Toque para visualizar</p>
                </div>
              </div>
            </ElementoClicavel>
          )}
        </div>
      )}

      {/* Passos 2-5: Título digital aberto */}
      {tituloAberto && (
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          {/* Card do título digital */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-6" style={{ border: '2px solid #1E5A9C' }}>
            {/* Faixa superior */}
            <div style={{ background: '#1E5A9C', padding: '12px 20px', textAlign: 'center' }}>
              <p style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '18px' }}>TÍTULO DE ELEITOR</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Justiça Eleitoral Brasileira</p>
            </div>

            {/* Corpo do título */}
            <div className="p-5">
              <div className="flex gap-4 mb-4">
                {/* Foto */}
                <div style={{ width: '80px', height: '100px', flexShrink: 0 }}>
                  {passo === 2 && !fotoTocada && (
                    <ElementoClicavel onClick={() => { setFotoTocada(true); handleCliqueCerto(3, null); }} mostrarSeta={false} posicao="right">
                      <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD', border: '2px dashed #1E5A9C' }}>
                        <span className="text-3xl">👤</span>
                      </div>
                    </ElementoClicavel>
                  )}
                  {fotoTocada && (
                    <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD', border: '2px solid #2E7D32' }}>
                      <span className="text-3xl">👩</span>
                    </div>
                  )}
                </div>

                {/* Dados principais */}
                <div className="flex-1">
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Nome:</p>
                  <p className="font-bold text-gray-800 mb-2" style={{ fontSize: '17px' }}>Maria Silva Santos</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>CPF:</p>
                  <p className="font-bold text-gray-800" style={{ fontSize: '17px' }}>123.456.789-00</p>
                </div>
              </div>

              {/* Zona e Seção */}
              <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: '1px solid #eee' }}>
                <div>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Inscrição:</p>
                  <p className="font-bold text-gray-800" style={{ fontSize: '16px' }}>0123456/01</p>
                </div>
                <div>
                  {passo === 3 && !zonaSecaoTocada && (
                    <ElementoClicavel onClick={() => { setZonaSecaoTocada(true); handleCliqueCerto(4, null); }} mostrarSeta={false} posicao="bottom">
                      <div>
                        <p className="text-gray-500" style={{ fontSize: '13px' }}>Zona:</p>
                        <p className="font-bold" style={{ fontSize: '16px', color: '#1E5A9C' }}>0001</p>
                        <p className="text-gray-500 mt-1" style={{ fontSize: '13px' }}>Seção:</p>
                        <p className="font-bold" style={{ fontSize: '16px', color: '#1E5A9C' }}>0123</p>
                      </div>
                    </ElementoClicavel>
                  )}
                  {zonaSecaoTocada && (
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>Zona:</p>
                      <p className="font-bold text-gray-800" style={{ fontSize: '16px' }}>0001</p>
                      <p className="text-gray-500 mt-1" style={{ fontSize: '13px' }}>Seção:</p>
                      <p className="font-bold text-gray-800" style={{ fontSize: '16px' }}>0123</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Município:</p>
                  <p className="font-bold text-gray-800" style={{ fontSize: '16px' }}>CUIABÁ-MT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão BAIXAR PDF */}
          {passo === 4 && !pdfBaixado && (
            <ElementoClicavel onClick={() => { setPdfBaixado(true); handleCliqueCerto(5, null); }} mostrarSeta={false} posicao="top">
              <button className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2" style={{ background: '#F9A825', minHeight: '48px', fontSize: '18px' }}>
                📄 BAIXAR PDF
              </button>
            </ElementoClicavel>
          )}

          {pdfBaixado && (
            <div className="mb-4 p-3 rounded-xl flex items-center gap-2" style={{ background: '#E8F5E9' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <p style={{ fontSize: '15px', color: '#2E7D32', fontWeight: '600' }}>PDF salvo com sucesso!</p>
            </div>
          )}

          {/* Botão ENTENDI */}
          {passo === 5 && (
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false} posicao="top">
              <button className="w-full py-4 rounded-xl font-bold text-white" style={{ background: '#2E7D32', minHeight: '48px', fontSize: '18px' }}>
                ✅ ENTENDI
              </button>
            </ElementoClicavel>
          )}

          {/* Info sobre documento */}
          <div className="mt-4 p-4 rounded-xl" style={{ background: '#E3F2FD' }}>
            <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: 1.5 }}>
              💡 O e-Título com foto vale como documento no dia da votação!
            </p>
          </div>
        </div>
      )}
      </div>
    </SimuladorImersivo>
  );
}