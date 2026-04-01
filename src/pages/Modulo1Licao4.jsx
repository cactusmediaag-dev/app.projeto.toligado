import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const PesquisaReal = ({ onClose }) => {
  const [query, setQuery] = useState('remédio caseiro para dor de cabeça');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1&no_redirect=1`
      );
      const data = await res.json();
      const items = [];
      if (data.AbstractText) {
        items.push({
          title: data.Heading || q,
          snippet: data.AbstractText.slice(0, 160) + '...',
          source: data.AbstractSource || 'Wikipedia'
        });
      }
      (data.RelatedTopics || [])
        .filter(t => t.Text).slice(0, 3)
        .forEach(t => items.push({
          title: t.Text.split(' - ')[0].slice(0, 60),
          snippet: t.Text.slice(0, 120) + '...',
          source: 'Resultado relacionado'
        }));
      if (items.length === 0) items.push(
        { title: `${q}`, snippet: `Informações sobre "${q}".`, source: 'Google' },
        { title: `${q} — Dicas`, snippet: `Veja dicas sobre "${q}".`, source: 'Saúde' }
      );
      setResults(items);
    } catch {
      setResults([{ title: q, snippet: `Resultados para "${q}" encontrados.`, source: 'Google' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ height:'100%', background:'#fff', display:'flex', flexDirection:'column', fontSize:'13px' }}>
      <div style={{ padding:'10px 12px', borderBottom:'1px solid #e0e0e0', display:'flex', alignItems:'center', gap:'8px' }}>
        <button onClick={onClose} style={{ background:'#5C2E7F', color:'#fff', border:'none', borderRadius:'8px', padding:'6px 12px', fontSize:'12px', fontWeight:'700', cursor:'pointer' }}>← Voltar</button>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:'6px', background:'#f1f3f4', borderRadius:'22px', padding:'7px 14px', border:'1px solid #dfe1e5' }}>
          <span>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search(query)} style={{ flex:1, border:'none', background:'transparent', fontSize:'13px', outline:'none', color:'#202124' }}/>
          <button onClick={() => search(query)} style={{ background:'none', border:'none', color:'#4285F4', fontSize:'12px', fontWeight:'700', cursor:'pointer' }}>Buscar</button>
        </div>
      </div>
      {!searched && !loading && (
        <div style={{ padding:'16px' }}>
          <button onClick={() => search(query)} style={{ width:'100%', background:'#4285F4', color:'#fff', border:'none', borderRadius:'12px', padding:'14px', fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>🔍 Buscar agora</button>
        </div>
      )}
      {loading && (
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:'32px', height:'32px', border:'3px solid #4285F4', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
        </div>
      )}
      {!loading && searched && (
        <div style={{ flex:1, overflowY:'auto' }}>
          <div style={{ padding:'8px 12px', borderBottom:'1px solid #f0f0f0' }}>
            <p style={{ color:'#70757a', fontSize:'11px' }}>{results.length * 1240} resultados</p>
          </div>
          {results.map((r, i) => (
            <div key={i} style={{ padding:'12px', borderBottom:'1px solid #f8f8f8' }}>
              <div style={{ color:'#70757a', fontSize:'11px', marginBottom:'3px' }}>🌐 {r.source}</div>
              <div style={{ color:'#1a0dab', fontSize:'15px', fontWeight:'500', marginBottom:'4px', lineHeight:1.3 }}>{r.title}</div>
              <div style={{ color:'#4d5156', fontSize:'12px', lineHeight:1.5 }}>{r.snippet}</div>
            </div>
          ))}
          <div style={{ padding:'16px' }}>
            <button onClick={onClose} style={{ width:'100%', background:'#5C2E7F', color:'#fff', border:'none', borderRadius:'12px', padding:'14px', fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>✅ Entendi! Continuar a lição</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Modulo1Licao4() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [chromeAberto, setChromeAberto] = useState(false);
  const [digitando, setDigitando] = useState(false);
  const [textoBusca, setTextoBusca] = useState("");
  const [resultados, setResultados] = useState(false);
  const [artigo, setArtigo] = useState(false);
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
    navigate(createPageUrl("Modulo1Licao5"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você pesquisa algo no Google?"
        opcoes={[
          "📱 Abrindo o WhatsApp",
          "🔍 Tocando na barra de pesquisa e digitando ✅",
          "📞 Ligando para o Google",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos pesquisar no Google! Toque no aplicativo do Chrome (bolinha colorida) 🌐",
      audio: "Vamos pesquisar no Google! Toque no aplicativo do Chrome, a bolinha colorida!",
    },
    {
      instrucao: "Toque na barra de pesquisa no topo para digitar sua busca 🔍",
      audio: "Toque na barra de pesquisa no topo para digitar sua busca!",
    },
    {
      instrucao: "Os resultados apareceram! Toque no PRIMEIRO resultado para ler 📖",
      audio: "Os resultados apareceram! Toque no primeiro resultado para ler!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={3}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!chromeAberto && (
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 pt-12">
          <div className="grid grid-cols-4 gap-6 mt-8">
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setChromeAberto(true))}
                posicao="bottom"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md relative">
                    <div className="absolute inset-1 rounded-full" style={{
                      background: "conic-gradient(from 0deg, #EA4335 0deg 90deg, #FBBC05 90deg 180deg, #34A853 180deg 270deg, #4285F4 270deg 360deg)",
                    }} />
                    <div className="absolute inset-3 bg-white rounded-full" />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Chrome</span>
                </div>
              </ElementoClicavel>
            )}
            {["G", "📷", "📱", "⚙️", "📧", "🎵", "📍"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
                  {emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chromeAberto && !resultados && (
        <div className="w-full h-full bg-white pt-12">
          <div className="px-4 mb-6">
            {passo === 2 && !digitando && (
              <ElementoClicavel
                onClick={() => {
                  setDigitando(true);
                  let texto = "";
                  const frase = "remédio para dor de cabeça";
                  let i = 0;
                  const intervalo = setInterval(() => {
                    if (i < frase.length) {
                      texto += frase[i];
                      setTextoBusca(texto);
                      i++;
                    } else {
                      clearInterval(intervalo);
                      setTimeout(() => {
                        setResultados(true);
                        setPasso(3);
                      }, 500);
                    }
                  }, 100);
                }}
                posicao="bottom"
              >
                <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2 cursor-pointer">
                  <span>🔍</span>
                  <span className="text-gray-400 font-semibold">Digite sua pesquisa...</span>
                </div>
              </ElementoClicavel>
            )}
            {digitando && (
              <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2">
                <span>🔍</span>
                <span className="text-gray-700 font-semibold">{textoBusca}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-gray-700"
                >
                  |
                </motion.span>
              </div>
            )}
          </div>
          {!digitando && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-400">
                <div className="text-8xl mb-4">G</div>
                <p className="font-semibold">Google</p>
              </div>
            </div>
          )}
        </div>
      )}

      {resultados && (
        <PesquisaReal onClose={() => setMostrarValidacao(true)} />
      )}
    </SimuladorWrapper>
  );
}