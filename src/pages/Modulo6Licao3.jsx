import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { CheckCircle2, Landmark } from 'lucide-react';

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
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!appAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'govbr', label: 'CadÚnico', bg: '#1351B4', id: 'cadunico' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
            ]}
            appDestacado={passo === 1 ? 'cadunico' : null}
            onAppClick={(id) => { if (passo === 1 && id === 'cadunico') handleCliqueCerto(2, () => setAppAberto(true)); }}
          />
        </div>
      )}

      {appAberto && !cadastroEnviado && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#1351B4', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Landmark size={28} color="#fff" />
            <div>
              <h2 style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '20px' }}>CadÚnico Digital</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Governo Federal</p>
            </div>
          </div>

          <div style={{ flex: 1, background: '#fff', padding: '24px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px', margin: '0 0 8px' }}>Cadastro de Usuário</h3>
            <p style={{ color: '#999', marginBottom: '24px', fontSize: '15px', margin: '0 0 24px' }}>Preencha seus dados para criar sua conta</p>

            {passo === 2 && !nomePreenchido && (
              <ElementoClicavel onClick={() => { setNomePreenchido("Maria Silva"); handleCliqueCerto(3, null); }} mostrarSeta={false}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Nome completo</label>
                  <input type="text" placeholder="Digite seu nome completo" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
                </div>
              </ElementoClicavel>
            )}

            {nomePreenchido && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Nome completo</label>
                <input type="text" value={nomePreenchido} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #90CAF9', background: '#E3F2FD', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
              </div>
            )}

            {passo >= 3 && nomePreenchido && !cpfPreenchido && (
              <ElementoClicavel onClick={() => { setCpfPreenchido(true); handleCliqueCerto(4, null); }} mostrarSeta={false}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>CPF</label>
                  <input type="text" placeholder="000.000.000-00" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
                </div>
              </ElementoClicavel>
            )}

            {cpfPreenchido && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>CPF</label>
                <input type="text" value="123.456.789-00" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #90CAF9', background: '#E3F2FD', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
              </div>
            )}

            {passo >= 4 && cpfPreenchido && !seletorData && !dataPreenchida && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => setSeletorData(true))} mostrarSeta={false}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Data de nascimento</label>
                  <input type="text" placeholder="DD/MM/AAAA" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
                </div>
              </ElementoClicavel>
            )}

            {dataPreenchida && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '15px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Data de nascimento</label>
                <input type="text" value="15/03/1960" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #90CAF9', background: '#E3F2FD', minHeight: '48px', fontSize: '18px', boxSizing: 'border-box' }} readOnly />
              </div>
            )}

            {passo === 6 && dataPreenchida && (
              <ElementoClicavel onClick={() => { setCadastroEnviado(true); setTimeout(() => setMostrarValidacao(true), 2000); }} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#1351B4', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', minHeight: '48px' }}>
                  Enviar Cadastro
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {seletorData && !dataPreenchida && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <button onClick={() => setSeletorData(false)} style={{ background: 'none', border: 'none', color: '#999', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>Cancelar</button>
            <p style={{ fontWeight: '700', color: '#1a1a1a' }}>Selecione a data</p>
            {passo === 5 && (
              <ElementoClicavel onClick={() => { setSeletorData(false); setDataPreenchida(true); handleCliqueCerto(6, null); }} mostrarSeta={false}>
                <button style={{ background: 'none', border: 'none', color: '#1351B4', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>OK</button>
              </ElementoClicavel>
            )}
            {passo !== 5 && <span style={{ color: '#ccc', fontWeight: '700', fontSize: '15px' }}>OK</span>}
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px', margin: '0 0 8px' }}>Dia</p>
                <div style={{ height: '128px', overflow: 'hidden' }}>
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>14</p>
                    <p style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>15</p>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>16</p>
                  </motion.div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px', margin: '0 0 8px' }}>Mês</p>
                <div style={{ height: '128px', overflow: 'hidden' }}>
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>02</p>
                    <p style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>03</p>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>04</p>
                  </motion.div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px', margin: '0 0 8px' }}>Ano</p>
                <div style={{ height: '128px', overflow: 'hidden' }}>
                  <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>1959</p>
                    <p style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>1960</p>
                    <p style={{ fontSize: '22px', color: '#ccc', margin: 0 }}>1961</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {cadastroEnviado && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle2 size={64} color="#27AE60" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', textAlign: 'center', margin: '0 0 16px' }}>Cadastro realizado!</h3>
            <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', padding: '24px', maxWidth: '320px' }}>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '8px', margin: '0 0 8px' }}>Número de protocolo:</p>
              <p style={{ textAlign: 'center', fontSize: '30px', fontWeight: '900', color: '#1351B4', margin: 0 }}>2025-08741</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}