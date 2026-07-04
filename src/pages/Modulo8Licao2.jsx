import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { ShoppingCart, Lock, ShieldCheck, AlertTriangle, ShieldX, ArrowRight, CreditCard, Landmark, Smartphone, Ban, XCircle } from 'lucide-react';

export default function Modulo8Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleAvancar = (novoP) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79qZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    setPasso(novoP);
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
    navigate(createPageUrl("Modulo8Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você sabe se um site é seguro para comprar?"
        opcoes={[
          "💰 Pelo preço baixo dos produtos",
          "🔒 Pelo cadeado na barra do navegador",
          "🎨 Pela aparência bonita do site"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos aprender a comprar com segurança na internet! Toque em COMPRAR 🛒", audio: "Vamos aprender a comprar com segurança na internet! Toque em comprar!" },
    { instrucao: "Antes de pagar, veja o CADEADO 🔒 na barra do navegador! Toque nele para ver ✅", audio: "Antes de pagar, veja o cadeado na barra do navegador! Toque nele para ver!" },
    { instrucao: "CUIDADO! Esse site é suspeito! Sem cadeado = PERIGO! Toque em SAIR ⛔", audio: "Cuidado! Esse site é suspeito! Sem cadeado significa perigo! Toque em sair!" },
    { instrucao: "Guarde essas dicas! Toque em PRÓXIMO para continuar aprendendo 👆", audio: "Guarde essas dicas! Toque em próximo para continuar aprendendo!" },
    { instrucao: "NUNCA entregue seu cartão para estranhos! Toque em RECUSAR 🚫", audio: "Nunca entregue seu cartão para estranhos! Toque em recusar!" }
  ];

  const BarraChrome = ({ segura, url, destaque, onClick }) => (
    <div style={{ background: segura ? '#E8F5E9' : '#FFEBEE', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: segura ? '2px solid #66BB6A' : '2px solid #EF5350', flexShrink: 0 }}>
      {destaque ? (
        <ElementoClicavel onClick={onClick} mostrarSeta={false}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: segura ? '#C8E6C9' : '#FFCDD2', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>
            {segura ? <Lock size={18} color="#1E8449" /> : <AlertTriangle size={18} color="#C62828" />}
            <span style={{ fontSize: '13px', fontWeight: '700', color: segura ? '#1E8449' : '#C62828' }}>{url}</span>
          </div>
        </ElementoClicavel>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {segura ? <Lock size={18} color="#1E8449" /> : <AlertTriangle size={18} color="#C62828" />}
          <span style={{ fontSize: '13px', fontWeight: '600', color: segura ? '#1E8449' : '#C62828' }}>{url}</span>
        </div>
      )}
    </div>
  );

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1].instrucao}
      audioText={passos[passo - 1].audio}
      passoAtual={passo}
      totalPassos={5}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Loja segura com produto */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#E65100', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <ShoppingCart size={22} color="#fff" />
            <p style={{ fontSize: '17px', fontWeight: '800', color: '#fff', margin: 0 }}>Loja Online</p>
          </div>
          <BarraChrome segura={true} url="https://loja-segura.com.br" />
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '300px' }}>
              <div style={{ width: '100%', height: '140px', background: '#f0f0f0', borderRadius: '14px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px' }}>
                📱
              </div>
              <h3 style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', marginBottom: '6px', margin: '0 0 6px' }}>Smartphone XYZ</h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px', margin: '0 0 10px' }}>128GB • 6GB RAM</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#E65100', marginBottom: '14px', margin: '0 0 14px' }}>R$ 1.299,00</p>
              <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#E65100', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                  <ShoppingCart size={20} color="#fff" /> Comprar
                </button>
              </ElementoClicavel>
            </div>
          </div>
        </div>
      )}

      {/* Passo 2: Pagamento com cadeado seguro */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#E65100', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <ShoppingCart size={22} color="#fff" />
            <p style={{ fontSize: '17px', fontWeight: '800', color: '#fff', margin: 0 }}>Loja Online</p>
          </div>
          <BarraChrome segura={true} url="https://loja-segura.com.br" destaque={true} onClick={() => handleAvancar(3)} />
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <h3 style={{ fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '16px', margin: '0 0 16px' }}>Pagamento</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>Número do Cartão</label>
                <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }} placeholder="0000 0000 0000 0000" readOnly />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>Validade</label>
                  <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }} placeholder="MM/AA" readOnly />
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>CVV</label>
                  <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }} placeholder="123" readOnly />
                </div>
              </div>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <ShieldCheck size={24} color="#27AE60" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: '700', color: '#1E8449', marginBottom: '2px', margin: '0 0 2px' }}>Conexão Segura</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Seus dados estão protegidos!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 3: Site suspeito sem cadeado */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <BarraChrome segura={false} url="http://loja-barata-123.com" />
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ background: '#FFF8E1', border: '3px solid #EF5350', borderRadius: '24px', padding: '20px', maxWidth: '300px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <AlertTriangle size={48} color="#C62828" style={{ margin: '0 auto' }} />
              </div>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
                <div style={{ textAlign: 'center', fontSize: '48px', marginBottom: '8px' }}>📱</div>
                <p style={{ fontWeight: '800', fontSize: '18px', color: '#1a1a1a', margin: '0 0 6px' }}>iPhone 15 Pro</p>
                <p style={{ fontSize: '32px', fontWeight: '900', color: '#C62828', margin: '0 0 4px' }}>R$ 50,00!!!</p>
                <p style={{ fontSize: '12px', color: '#C62828', fontWeight: '700', margin: 0 }}>OFERTA IMPERDÍVEL!!!</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={18} color="#C62828" />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#C62828', margin: 0 }}>SEM CADEADO</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={18} color="#C62828" />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#C62828', margin: 0 }}>PREÇO ABSURDO</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={18} color="#C62828" />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#C62828', margin: 0 }}>SITE SUSPEITO</p>
                </div>
              </div>
              <ElementoClicavel onClick={() => handleAvancar(4)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#C62828', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', minHeight: '56px' }}>
                  Sair deste site
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}

      {/* Passo 4: Dicas de segurança */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <ShieldCheck size={56} color="#27AE60" style={{ margin: '0 auto 16px' }} />
          </motion.div>
          <p style={{ fontWeight: '800', fontSize: '20px', color: '#27AE60', marginBottom: '20px', textAlign: 'center', margin: '0 0 20px' }}>Você se protegeu de um golpe!</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px', marginBottom: '20px' }}>
            <div style={{ background: '#fff', border: '2px solid #66BB6A', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Lock size={22} color="#27AE60" style={{ flexShrink: 0 }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Site com cadeado = seguro</p>
            </div>
            <div style={{ background: '#fff', border: '2px solid #FFB74D', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <AlertTriangle size={22} color="#E65100" style={{ flexShrink: 0 }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Preço muito baixo = suspeito</p>
            </div>
            <div style={{ background: '#fff', border: '2px solid #42A5F5', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Landmark size={22} color="#1565C0" style={{ flexShrink: 0 }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Prefira sites conhecidos</p>
            </div>
            <div style={{ background: '#fff', border: '2px solid #AB47BC', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Smartphone size={22} color="#7B1FA2" style={{ flexShrink: 0 }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Use o app oficial do banco</p>
            </div>
          </div>
          <ElementoClicavel onClick={() => handleAvancar(5)} mostrarSeta={false}>
            <button style={{ background: '#E65100', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Próximo <ArrowRight size={20} color="#fff" />
            </button>
          </ElementoClicavel>
        </div>
      )}

      {/* Passo 5: Maquininha + estranho oferecendo ajuda */}
      {passo === 5 && (
        <div style={{ minHeight: '100%', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', maxWidth: '300px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <CreditCard size={36} color="#4A148C" style={{ margin: '0 auto' }} />
            </div>
            {/* Maquininha CSS */}
            <div style={{ background: '#37474F', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ background: '#1a1a1a', height: '40px', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4CAF50', fontFamily: 'monospace', fontSize: '16px', fontWeight: '700' }}>R$ 0,00</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[1,2,3,4,5,6,7,8,9,'C',0,'OK'].map((n, i) => (
                  <div key={i} style={{ background: n ? '#546E7A' : 'transparent', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px' }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertTriangle size={20} color="#C62828" />
                <p style={{ fontWeight: '700', color: '#C62828', margin: 0 }}>Estranho oferecendo ajuda:</p>
              </div>
              <p style={{ fontSize: '14px', color: '#444', fontStyle: 'italic', margin: 0 }}>"Posso te ajudar a sacar? Me dá seu cartão!"</p>
            </div>
            <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#C62828', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                <Ban size={20} color="#fff" /> Recusar e pedir ajuda ao banco
              </button>
            </ElementoClicavel>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}