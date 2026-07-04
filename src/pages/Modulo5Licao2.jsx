import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import { MessageCircle, ArrowLeft, X, Image as ImageIcon, CheckCircle, MoreVertical } from 'lucide-react';

export default function Modulo5Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [instrucaoAberta, setInstrucaoAberta] = useState(false);
  const [printTirado, setPrintTirado] = useState(false);
  const [fotosAberto, setFotosAberto] = useState(false);
  const [printAberto, setPrintAberto] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
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
    navigate(createPageUrl("Modulo5Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você tira um print da tela no celular?"
        opcoes={[
          "🎤 Falando 'Ok Google, print'",
          "⚡ Pressionando botão Ligar + Volume Baixo ao mesmo tempo ✅",
          "📷 Abrindo a câmera",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Essa mensagem é importante! Vamos salvar com um PRINT DA TELA 📸", audio: "Essa mensagem é importante! Vamos salvar com um print da tela!" },
    { instrucao: "Para tirar print: pressione o botão LIGAR e VOLUME BAIXO ao mesmo tempo! 📸", audio: "Para tirar print: pressione o botão ligar e volume baixo ao mesmo tempo!" },
    { instrucao: "Print tirado! Toque na NOTIFICAÇÃO para ver onde ficou salvo 👀", audio: "Print tirado! Toque na notificação para ver onde ficou salvo!" },
    { instrucao: "Seus prints ficam salvos aqui! Toque no print para ver maior 🖼️", audio: "Seus prints ficam salvos aqui! Toque no print para ver maior!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!instrucaoAberta && !printTirado && !fotosAberto && (
        <div style={{ height: '100%', background: '#ECE5DD', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#25D366', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#607D8B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>D</div>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>Dr. Silva</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
              <p style={{ color: '#1a1a1a', fontWeight: '600', lineHeight: 1.5, margin: '0 0 8px' }}>
                Olá! Sua consulta está marcada para:
              </p>
              <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
                <p style={{ fontSize: '22px', fontWeight: '900', color: '#1565C0', textAlign: 'center', margin: '0 0 8px' }}>15/08/2026</p>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#1976D2', textAlign: 'center', margin: 0 }}>10:00 🏥</p>
              </div>
            </div>

            {passo === 1 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(2, () => setInstrucaoAberta(true))} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#2196F3', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '17px', cursor: 'pointer' }}>
                  Como fazer print?
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {instrucaoAberta && !printTirado && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', marginBottom: '32px', textAlign: 'center' }}>Como tirar print da tela</h2>
          
          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'relative', width: '160px', height: '300px', background: '#1a1a1a', borderRadius: '24px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '48px' }}>📱</div>
              
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ position: 'absolute', top: '60px', right: '-6px', width: '8px', height: '40px', background: '#555', borderRadius: '4px' }}
              />

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                style={{ position: 'absolute', top: '80px', left: '-6px', width: '8px', height: '60px', background: '#555', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '16px', padding: '20px', marginBottom: '24px', maxWidth: '320px' }}>
            <p style={{ textAlign: 'center', fontWeight: '700', color: '#1565C0', margin: '0 0 8px' }}>Pressione os dois juntos:</p>
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#1976D2', margin: 0 }}>Botão Ligar + Volume Baixo</p>
          </div>

          {passo === 2 && (
            <ElementoClicavel onClick={() => {
              setPrintTirado(true);
              setInstrucaoAberta(false);
              handleCliqueCerto(3, null);
            }} mostrarSeta={false}>
              <button style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '16px', fontWeight: '700', fontSize: '17px', cursor: 'pointer', maxWidth: '320px' }}>
                Tirar Print Agora
              </button>
            </ElementoClicavel>
          )}
        </div>
      )}

      {printTirado && !fotosAberto && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.3 }} style={{ height: '100%', background: '#ECE5DD', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, background: '#fff' }}
            transition={{ duration: 0.1 }}
          />

          <div style={{ position: 'relative', background: '#25D366', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#607D8B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 }}>D</div>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>Dr. Silva</span>
          </div>

          <div style={{ position: 'relative', padding: '16px', flex: 1 }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#1a1a1a', fontWeight: '600', lineHeight: 1.5, margin: '0 0 8px' }}>
                Olá! Sua consulta está marcada para:
              </p>
              <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
                <p style={{ fontSize: '22px', fontWeight: '900', color: '#1565C0', textAlign: 'center', margin: '0 0 8px' }}>15/08/2026</p>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#1976D2', textAlign: 'center', margin: 0 }}>10:00 🏥</p>
              </div>
            </div>
          </div>

          {passo === 3 && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ position: 'absolute', top: '60px', left: '16px', right: '16px', zIndex: 50 }}
            >
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setFotosAberto(true))} mostrarSeta={false}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', cursor: 'pointer', border: '2px solid #25D366', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '64px', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ImageIcon size={24} color="#1565C0" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '15px' }}>Captura de tela salva</p>
                    <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>Toque para ver</p>
                  </div>
                </div>
              </ElementoClicavel>
            </motion.div>
          )}
        </motion.div>
      )}

      {fotosAberto && !printAberto && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Google Fotos</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', margin: '0 0 16px' }}>Capturas de Tela</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {passo === 4 && (
                <ElementoClicavel onClick={() => { setPrintAberto(true); setTimeout(() => setMostrarValidacao(true), 1500); }} mostrarSeta={false}>
                  <div style={{ aspectRatio: '1', background: 'linear-gradient(135deg, #E8F5E9, #E3F2FD)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px', cursor: 'pointer', border: '2px solid #25D366' }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: '#666', marginBottom: '4px', margin: '0 0 4px' }}>15/08</p>
                    <p style={{ fontSize: '24px' }}>🏥</p>
                    <p style={{ fontSize: '12px', color: '#999' }}>Agora</p>
                  </div>
                </ElementoClicavel>
              )}
              {["📱", "🌅", "🎂"].map((emoji, i) => (
                <div key={i} style={{ aspectRatio: '1', background: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{emoji}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {printAberto && (
        <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', flexShrink: 0 }}>
            <button onClick={() => setPrintAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={24} color="#fff" />
            </button>
            <p style={{ color: '#fff', fontWeight: '700' }}>Captura de tela</p>
            <MoreVertical size={22} color="#fff" />
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ width: '100%', maxWidth: '320px', background: '#ECE5DD', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
            >
              <div style={{ background: '#25D366', padding: '8px 16px', borderRadius: '12px 12px 0 0', margin: '-24px -24px 16px' }}>
                <p style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Dr. Silva</p>
              </div>
              <p style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '12px', margin: '0 0 12px' }}>Olá! Sua consulta está marcada para:</p>
              <div style={{ background: '#E3F2FD', border: '2px solid #90CAF9', borderRadius: '12px', padding: '16px' }}>
                <p style={{ fontSize: '20px', fontWeight: '900', color: '#1565C0', textAlign: 'center', marginBottom: '4px', margin: '0 0 4px' }}>15/08/2026</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#1976D2', textAlign: 'center', margin: 0 }}>10:00 🏥</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}