import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Fingerprint, ScanFace, Lock, ChevronRight, CheckCircle } from 'lucide-react';

export default function Modulo3Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [digitalAberta, setDigitalAberta] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [concluido, setConcluido] = useState(false);
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
    navigate(createPageUrl("Modulo3Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Por que a impressão digital é uma boa senha?"
        opcoes={[
          "😅 Porque é fácil de copiar",
          "👆 Porque é única para cada pessoa no mundo ✅",
          "🤷 Não é segura",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Sua digital é única no mundo! Toque em IMPRESSÃO DIGITAL para configurar 👆",
      audio: "Sua digital é única no mundo! Toque em impressão digital para configurar!",
    },
    {
      instrucao: "Posicione o dedo no sensor indicado! Toque no SENSOR para registrar 👆",
      audio: "Posicione o dedo no sensor indicado! Toque no sensor para registrar!",
    },
    {
      instrucao: "Ótimo! Continue tocando no sensor até completar 100%! Toque novamente 🔄",
      audio: "Ótimo! Continue tocando no sensor até completar 100%!",
    },
    {
      instrucao: "Cadastrada com sucesso! Toque em CONCLUIR para terminar 🎉",
      audio: "Cadastrada com sucesso! Toque em concluir para terminar!",
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
      {!digitalAberta && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Segurança</h2>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passo === 1 && (
              <ElementoClicavel
                onClick={() => handleCliqueCerto(2, () => setDigitalAberta(true))}
                mostrarSeta={false}
              >
                <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#34A853', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Fingerprint size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>Impressão Digital</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              </ElementoClicavel>
            )}
            {[
              { Icon: ScanFace, nome: "Reconhecimento Facial", cor: '#4285F4' },
              { Icon: Lock, nome: "Bloqueio de Tela", cor: '#FF9800' },
            ].map((item, i) => {
              const Ic = item.Icon;
              return (
                <div key={i} style={{ background:! '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', flex: 1 }}>{item.nome}</span>
                  <ChevronRight size={20} color="#bbb" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {digitalAberta && !concluido && (
        <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center', margin: '0 0 24px' }}>
            {progresso === 0 ? "Cadastrar Impressão Digital" : "Leitura em andamento..."}
          </h2>

          <p style={{ color: '#666', fontWeight: '600', marginBottom: '32px', fontSize: '16px' }}>Toque no sensor com o dedo indicador</p>

          {passo === 2 && progresso === 0 && (
            <ElementoClicavel
              onClick={() => {
                setScanning(true);
                setProgresso(40);
                handleCliqueCerto(3, null);
              }}
              mostrarSeta={false}
            >
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#E3F2FD', border: '4px solid #4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Fingerprint size={48} color="#4285F4" />
              </div>
            </ElementoClicavel>
          )}

          {passo === 3 && progresso === 40 && (
            <ElementoClicavel
              onClick={() => {
                setProgresso(100);
                setTimeout(() => {
                  setConcluido(true);
                  setPasso(4);
                }, 800);
              }}
              mostrarSeta={false}
            >
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#E3F2FD', border: '4px solid #4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  <Fingerprint size={48} color="#4285F4" />
                </motion.div>
              </div>
            </ElementoClicavel>
          )}

          {progresso > 0 && (
            <div style={{ width: '100%', maxWidth: '280px', marginTop: '32px' }}>
              <div style={{ background: '#fff', borderRadius: '4px', height: '16px', overflow: 'hidden', marginBottom: '12px' }}>
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #4285F4, #1a73e8)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progresso}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '700', color: '#4285F4', margin: 0 }}>{progresso}%</p>
              {progresso < 100 && (
                <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '8px' }}>Levante e reposicione o dedo</p>
              )}
            </div>
          )}
        </div>
      )}

      {concluido && (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <CheckCircle size={72} color="#34A853" />
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Impressão digital cadastrada!</h3>
            <p style={{ color: '#666', fontSize: '16px' }}>Sua digital é única no mundo inteiro</p>
            {passo === 4 && (
              <ElementoClicavel
                onClick={() => setMostrarValidacao(true)}
                mostrarSeta={false}
              >
                <button style={{ padding: '16px 32px', borderRadius: '16px', border: 'none', background: '#34A853', color: '#fff', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}>
                  Concluir 🎉
                </button>
              </ElementoClicavel>
            )}
          </motion.div>
        </div>
      )}
    </SimuladorImersivo>
  );
}