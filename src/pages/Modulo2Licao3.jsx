import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { Image as ImageIcon, Menu, Cloud, ChevronRight, ArrowLeft, Settings, Trash2, HelpCircle } from 'lucide-react';

export default function Modulo2Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [fotosAberto, setFotosAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [backupAberto, setBackupAberto] = useState(false);
  const [backupAtivo, setBackupAtivo] = useState(false);
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
    navigate(createPageUrl("Modulo2Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que acontece quando o backup do Google Fotos está ativo?"
        opcoes={[
          "🗑️ As fotos são apagadas",
          "☁️ Suas fotos ficam salvas mesmo se perder o celular ✅",
          "📵 Você não consegue mais tirar fotos",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "O Google Fotos guarda suas fotos com segurança! Toque no ícone para abrir 📸",
      audio: "O Google Fotos guarda suas fotos com segurança! Toque no ícone para abrir!",
    },
    {
      instrucao: "Vamos ativar o backup automático! Toque nas três linhas no canto superior ☰",
      audio: "Vamos ativar o backup automático! Toque nas três linhas no canto superior!",
    },
    {
      instrucao: "Toque em BACKUP E SYNC para proteger suas fotos ☁️",
      audio: "Toque em backup e sync para proteger suas fotos!",
    },
    {
      instrucao: "Ative o backup! Toque no botão para LIGAR e suas fotos ficam sempre salvas ✅",
      audio: "Ative o backup! Toque no botão para ligar e suas fotos ficam sempre salvas!",
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
      {!fotosAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
              { nome: 'busca', label: 'Google', bg: '#fff', corIcone: '#4285F4', id: 'google' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
            ]}
            appDestacado={passo === 1 ? 'photos' : null}
            onAppClick={(id) => {
              if (passo === 1 && id === 'photos') handleCliqueCerto(2, () => setFotosAberto(true));
            }}
          />
        </div>
      )}

      {fotosAberto && !menuAberto && !backupAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            {passo === 2 ? (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(3, () => setMenuAberto(true))}
                mostrarSeta={false}
              >
                <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Menu size={24} color="#5f6368" />
                </div>
              </ElementoClicavel>
            ) : (
              <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Menu size={24} color="#5f6368" />
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={24} color="#FF7043" />
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Google Fotos</h2>
            </div>
            <div style={{ width: '44px' }} />
          </div>
          <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', alignContent: 'flex-start' }}>
            {["🌅", "👨‍👩‍👧", "🌻", "🎂", "🏖️", "🐶"].map((emoji, i) => (
              <div key={i} style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: '#f5f5f5' }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {menuAberto && !backupAberto && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          style={{ position: 'absolute', left: 0, top: 0, width: '280px', height: '100%', background: '#fff', boxShadow: '4px 0 24px rgba(0,0,0,0.2)', zIndex: 20, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Menu</h3>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {passo === 3 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(4, () => { setMenuAberto(false); setBackupAberto(true); })}
                mostrarSeta={false}
              >
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', borderRadius: '12px' }}>
                  <Cloud size={24} color="#4285F4" />
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>Backup e Sync</span>
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: Settings, nome: "Configurações" },
              { Icon: Trash2, nome: "Lixeira" },
              { Icon: HelpCircle, nome: "Ajuda" },
            ].map((item, i) => {
              const Ic = item.Icon;
              return (
                <div key={i} style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '12px' }}>
                  <Ic size={24} color="#5f6368" />
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>{item.nome}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setMenuAberto(false)}
            style={{ position: 'absolute', top: '12px', right: '12px', width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontSize: '20px', color: '#666' }}>✕</span>
          </button>
        </motion.div>
      )}

      {backupAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, borderBottom: '1px solid #f0f0f0' }}>
            <button onClick={() => setBackupAberto(false)} style={{ width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowLeft size={24} color="#4285F4" />
            </button>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Backup e Sincronização</h2>
          </div>
          <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#E3F2FD', borderRadius: '24px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Cloud size={32} color="#4285F4" />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: 0, flex: 1 }}>
                  Suas fotos e vídeos serão salvos automaticamente na nuvem do Google ☁️
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>Backup automático</span>
                {passo === 4 ? (
                  <ElementoClicavel
                    onClick={() => {
                      setBackupAtivo(true);
                      setTimeout(() => setMostrarValidacao(true), 1500);
                    }}
                    mostrarSeta={false}
                  >
                    <div style={{ width: '52px', height: '32px', borderRadius: '16px', background: backupAtivo ? '#34A853' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease' }}>
                      <div style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease', left: backupAtivo ? '24px' : '4px' }} />
                    </div>
                  </ElementoClicavel>
                ) : (
                  <div style={{ width: '52px', height: '32px', borderRadius: '16px', background: backupAtivo ? '#34A853' : '#ccc', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', left: backupAtivo ? '24px' : '4px' }} />
                  </div>
                )}
              </div>
            </div>

            {backupAtivo && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px' }}
              >
                <motion.div animate={{ y: [-20, 0] }} transition={{ duration: 1 }}>
                  <Cloud size={64} color="#4285F4" />
                </motion.div>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#34A853', margin: 0 }}>Backup Ativado!</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#666', margin: 0 }}>Suas fotos estão protegidas</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}