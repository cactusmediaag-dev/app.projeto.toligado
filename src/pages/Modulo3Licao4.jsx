import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { Search, ChevronRight, ArrowLeft, AlertTriangle, Ban, CheckCircle, Shield } from 'lucide-react';
import AppIcon from "@/components/simulador/AppIcon";

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
    <SimuladorImersivo
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
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <button onClick={() => setSegurancaAberta(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowLeft size={24} color="#4285F4" />
              </button>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Apps com acesso</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, paddingLeft: '56px' }}>Revise periodicamente</p>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '16px', background: '#E8F5E9', border: '2px solid #A5D6A7', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <AppIcon nome="fotos" cor="#FF7043" tamanho={40} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '16px', margin: 0 }}>Google Fotos</p>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Acesso desde 2024</p>
              </div>
              <CheckCircle size={24} color="#34A853" />
            </div>

            <div style={{ padding: '16px', background: '#E8F5E9', border: '2px solid #A5D6A7', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <AppIcon nome="email" cor="#EA4335" tamanho={40} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '16px', margin: 0 }}>Gmail</p>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Acesso desde 2024</p>
              </div>
              <CheckCircle size={24} color="#34A853" />
            </div>

            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => setAppSelecionado(true))}
                mostrarSeta={false}
              >
                <div style={{ padding: '16px', background: '#FEF2F2', border: '2px solid #FCA5A5', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlertTriangle size={20} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#B91C1C', fontSize: '16px', margin: 0 }}>App Desconhecido</p>
                    <p style={{ fontSize: '12px', color: '#DC2626', margin: 0 }}>Acesso suspeito</p>
                  </div>
                  <AlertTriangle size={24} color="#EF4444" />
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {appSelecionado && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setAppSelecionado(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
          </div>

          {!removido ? (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <AlertTriangle size={36} color="#fff" />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px', margin: '0 0 8px' }}>App Desconhecido</h2>
                <p style={{ color: '#EF4444', fontWeight: '600', fontSize: '16px' }}>Acesso suspeito detectado</p>
              </div>

              <div style={{ background: '#FEF2F2', border: '2px solid #FECACA', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#B91C1C', marginBottom: '12px' }}>Este app tem acesso a:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', color: '#DC2626' }}>
                  <li>• Ler seus e-mails</li>
                  <li>• Ver seus contatos</li>
                  <li>• Acessar suas fotos</li>
                  <li>• Ver sua localização</li>
                </ul>
              </div>

              {passo === 4 && (
                <ElementoClicavel
                  onClick={() => {
                    setRemovido(true);
                    setTimeout(() => setMostrarValidacao(true), 2000);
                  }}
                  mostrarSeta={false}
                >
                  <button style={{ width: '100%', background: '#EF4444', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Ban size={20} color="#fff" /> Remover Acesso
                  </button>
                </ElementoClicavel>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}
            >
              <CheckCircle size={72} color="#34A853" />
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#34A853', margin: 0 }}>Acesso removido com sucesso!</h3>
              <p style={{ color: '#666', fontWeight: '600', fontSize: '16px' }}>Sua conta está limpa e segura</p>
            </motion.div>
          )}
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}