import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { ArrowLeft, Search, HeartHandshake, FileText, Calendar, FileCheck, Landmark } from 'lucide-react';

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
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'playstore', label: 'Play Store', bg: '#fff', corIcone: '#34A853', id: 'playstore' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
            ]}
            appDestacado={passo === 1 ? 'playstore' : null}
            onAppClick={(id) => { if (passo === 1 && id === 'playstore') handleCliqueCerto(2, () => setPlayStoreAberta(true)); }}
          />
        </div>
      )}

      {playStoreAberta && !buscando && !resultadoBusca && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setPlayStoreAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                <ArrowLeft size={22} color="#1a1a1a" />
              </button>
              {passo === 2 && (
                <ElementoClicavel onClick={() => { setBuscando(true); setTimeout(() => { setBuscando(false); setResultadoBusca(true); setPasso(3); }, 1500); }} mostrarSeta={false}>
                  <div style={{ flex: 1, background: '#f1f3f4', borderRadius: '999px', padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={18} color="#999" />
                    <p style={{ color: '#999', margin: 0 }}>Pesquisar apps...</p>
                  </div>
                </ElementoClicavel>
              )}
              {passo !== 2 && (
                <div style={{ flex: 1, background: '#f1f3f4', borderRadius: '999px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={18} color="#999" />
                  <p style={{ color: '#999', margin: 0 }}>Pesquisar apps...</p>
                </div>
              )}
            </div>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', margin: '0 0 16px' }}>Apps populares</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {["WhatsApp", "Instagram", "TikTok"].map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '12px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#e0e0e0', borderRadius: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#444', margin: 0 }}>{app}</p>
                    <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>★★★★☆ 4.5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {buscando && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ background: 'none', border: 'none' }}><ArrowLeft size={22} color="#1a1a1a" /></button>
              <div style={{ flex: 1, background: '#E3F2FD', borderRadius: '999px', padding: '8px 16px' }}>
                <p style={{ color: '#1a1a1a', fontWeight: '600', margin: 0 }}>Meu INSS</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: '48px', height: '48px', border: '4px solid #1351B4', borderTopColor: 'transparent', borderRadius: '50%' }} />
          </div>
        </div>
      )}

      {resultadoBusca && !instalando && !instalado && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setResultadoBusca(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                <ArrowLeft size={22} color="#1a1a1a" />
              </button>
              <div style={{ flex: 1, background: '#E3F2FD', borderRadius: '999px', padding: '8px 16px' }}>
                <p style={{ color: '#1a1a1a', fontWeight: '600', margin: 0 }}>Meu INSS</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
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
              }} mostrarSeta={false}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', cursor: 'pointer' }}>
                  <div style={{ width: '64px', height: '64px', background: '#1351B4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HeartHandshake size={32} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '18px', margin: 0 }}>Meu INSS</p>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px', margin: '0 0 8px' }}>Governo Federal</p>
                    <p style={{ fontSize: '12px', color: '#bbb' }}>★★★★☆ 4.3 • 10M+ downloads</p>
                  </div>
                  <button style={{ background: '#1351B4', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '999px', fontWeight: '700', cursor: 'pointer' }}>
                    Instalar
                  </button>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {instalando && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Instalando...</p>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '16px' }}>
              <div style={{ width: '64px', height: '64px', background: '#1351B4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HeartHandshake size={32} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '18px', marginBottom: '12px', margin: '0 0 12px' }}>Meu INSS</p>
                <div style={{ background: '#e0e0e0', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                  <motion.div style={{ height: '100%', background: '#1351B4', width: `${progresso}%` }} />
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>{progresso}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {instalado && !appAberto && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
            <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Meu INSS</p>
          </div>
          <div style={{ padding: '16px', flex: 1 }}>
            {passo === 4 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setAppAberto(true))} mostrarSeta={false}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '16px', cursor: 'pointer' }}>
                  <div style={{ width: '64px', height: '64px', background: '#1351B4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HeartHandshake size={32} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '18px', margin: 0 }}>Meu INSS</p>
                    <p style={{ fontSize: '14px', color: '#2E7D32', fontWeight: '600', marginBottom: '8px', margin: '0 0 8px' }}>Instalado</p>
                  </div>
                  <button style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '999px', fontWeight: '700', cursor: 'pointer' }}>
                    Abrir
                  </button>
                </div>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {appAberto && !logado && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1351B4, #0D3B8C)' }}>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ width: '72px', height: '72px', background: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <HeartHandshake size={40} color="#1351B4" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', marginBottom: '8px', margin: '0 0 8px' }}>Meu INSS</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Governo Federal</p>
          </div>

          <div style={{ flex: 1, background: '#fff', borderRadius: '24px 24px 0 0', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', margin: '0 0 24px' }}>Entre com seus dados</h3>
            
            {passo === 5 && !cpfPreenchido && (
              <ElementoClicavel onClick={() => { setCpfPreenchido(true); handleCliqueCerto(6, null); }} mostrarSeta={false}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', display: 'block', marginBottom: '8px' }}>CPF</label>
                  <input type="text" placeholder="000.000.000-00" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', fontSize: '16px', boxSizing: 'border-box' }} readOnly />
                </div>
              </ElementoClicavel>
            )}

            {cpfPreenchido && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', display: 'block', marginBottom: '8px' }}>CPF</label>
                <input type="text" value="123.456.789-00" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #90CAF9', background: '#E3F2FD', fontSize: '16px', boxSizing: 'border-box' }} readOnly />
              </div>
            )}

            {passo >= 6 && cpfPreenchido && !senhaPreenchida && (
              <ElementoClicavel onClick={() => { setSenhaPreenchida(true); handleCliqueCerto(7, null); }} mostrarSeta={false}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', display: 'block', marginBottom: '8px' }}>Senha</label>
                  <input type="password" placeholder="••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', fontSize: '16px', boxSizing: 'border-box' }} readOnly />
                </div>
              </ElementoClicavel>
            )}

            {senhaPreenchida && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#666', display: 'block', marginBottom: '8px' }}>Senha</label>
                <input type="password" value="••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #90CAF9', background: '#E3F2FD', fontSize: '16px', boxSizing: 'border-box' }} readOnly />
              </div>
            )}

            {passo === 7 && cpfPreenchido && senhaPreenchida && (
              <ElementoClicavel onClick={() => handleCliqueCerto(8, () => setLogado(true))} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#1351B4', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '17px', cursor: 'pointer' }}>
                  Entrar
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {logado && !extratoAberto && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#1351B4', padding: '16px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>Meu INSS</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Olá, Maria!</p>
          </div>

          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1 }}>
            {passo === 8 && (
              <ElementoClicavel onClick={() => { setExtratoAberto(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
                  <FileText size={32} color="#1351B4" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '14px', margin: 0 }}>Extrato de Pagamento</p>
                </div>
              </ElementoClicavel>
            )}
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <Calendar size={32} color="#666" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '14px', margin: 0 }}>Agendamentos</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <FileCheck size={32} color="#666" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '14px', margin: 0 }}>Certidões</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <Landmark size={32} color="#666" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '14px', margin: 0 }}>Empréstimo</p>
            </div>
          </div>
        </div>
      )}

      {extratoAberto && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#1351B4', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setExtratoAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#fff" />
            </button>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>Extrato de Pagamento</h2>
          </div>

          <div style={{ padding: '16px', flex: 1 }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ background: 'linear-gradient(135deg, #1351B4, #0D3B8C)', borderRadius: '16px', padding: '24px', color: '#fff' }}>
              <p style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9, margin: '0 0 8px' }}>Benefício</p>
              <p style={{ fontSize: '22px', fontWeight: '900', marginBottom: '16px', margin: '0 0 16px' }}>Aposentadoria</p>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '16px' }}>
                <p style={{ fontSize: '14px', marginBottom: '4px', margin: '0 0 4px' }}>Valor do benefício:</p>
                <p style={{ fontSize: '32px', fontWeight: '900' }}>R$ 1.412,00</p>
                <p style={{ fontSize: '14px', marginTop: '12px', opacity: 0.9 }}>Próximo pagamento: 25/08/2026</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}