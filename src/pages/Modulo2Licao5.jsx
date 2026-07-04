import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { Sons, MoedasAnimadas, FeedbackAcerto, FeedbackErro } from "@/components/shared/GameFeedback";
import { Lock, KeyRound, Trash2, CheckCircle } from 'lucide-react';

export default function Modulo2Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [forca, setForca] = useState(0);
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
    navigate(createPageUrl("Modulo2Licao6"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual dessas senhas é mais segura?"
        opcoes={[
          "🔴 123456",
          "🟢 071985 ou mistura de números ✅",
          "🔴 0000",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos criar uma senha forte! Uma boa senha tem números E letras juntos 🔐",
      audio: "Vamos criar uma senha forte! Uma boa senha tem números e letras juntos!",
    },
    {
      instrucao: "Essa senha é muito fácil de descobrir! Toque em APAGAR e vamos criar uma melhor 🗑️",
      audio: "Essa senha é muito fácil de descobrir! Toque em apagar e vamos criar uma melhor!",
    },
    {
      instrucao: "Agora vamos digitar uma senha mais segura: use o mês e ano do seu nascimento! Ex: 0719 🔑",
      audio: "Agora vamos digitar uma senha mais segura! Use o mês e ano do seu nascimento como exemplo!",
    },
    {
      instrucao: "Ótimo! Agora confirme a senha! Toque no campo abaixo e repita 📝",
      audio: "Ótimo! Agora confirme a senha! Toque no campo abaixo e repita!",
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
      <div style={{ height: '100%', background: '#F8F9FA', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexShrink: 0 }}>
          <Lock size={32} color="#5C2E7F" />
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Criar Senha Segura</h2>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', marginBottom: '24px' }}>
          <label style={{ fontSize: '14px', fontWeight: '700', color: '#666', marginBottom: '12px', display: 'block' }}>Digite sua senha:</label>
          <div style={{ background: '#F8F9FA', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '2px solid #e0e0e0' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ width: '40px', height: '48px', borderRadius: '12px', background: '#fff', border: '2px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>{senha[i] ? "●" : ""}</span>
                </div>
              ))}
            </div>
          </div>

          {senha && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: forca >= 1 ? '#EF4444' : '#e0e0e0' }} />
                <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: forca >= 2 ? '#F59E0B' : '#e0e0e0' }} />
                <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: forca >= 3 ? '#10B981' : '#e0e0e0' }} />
              </div>
              <p style={{ fontSize: '14px', fontWeight: '700', textAlign: 'center', color: forca === 1 ? '#EF4444' : forca === 2 ? '#F59E0B' : '#10B981', margin: 0 }}>
                {forca === 1 ? "FRACA" : forca === 2 ? "MÉDIA" : "FORTE"}
              </p>
            </div>
          )}

          {passo === 1 && senha === "" && (
            <ElementoClicavel
              onClick={() => {
                setSenha("123456");
                setForca(1);
                handleCliqueCerto(2, null);
              }}
              mostrarSeta={false}
            >
              <button style={{ width: '100%', background: '#4285F4', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', minHeight: '48px' }}>
                Digitar senha
              </button>
            </ElementoClicavel>
          )}

          {passo === 2 && (
            <ElementoClicavel
              onClick={() => {
                setSenha("");
                setForca(0);
                handleCliqueCerto(3, null);
              }}
              mostrarSeta={false}
            >
              <button style={{ width: '100%', background: '#EF4444', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Trash2 size={20} color="#fff" /> Apagar
              </button>
            </ElementoClicavel>
          )}

          {passo === 3 && senha === "" && (
            <ElementoClicavel
              onClick={() => {
                let s = "";
                const numeros = "071985";
                let i = 0;
                const intervalo = setInterval(() => {
                  if (i < numeros.length) {
                    s += numeros[i];
                    setSenha(s);
                    setForca(s.length > 2 ? 3 : 2);
                    i++;
                  } else {
                    clearInterval(intervalo);
                    handleCliqueCerto(4, null);
                  }
                }, 300);
              }}
              mostrarSeta={false}
            >
              <button style={{ width: '100%', background: '#10B981', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <KeyRound size={20} color="#fff" /> Digitar senha forte
              </button>
            </ElementoClicavel>
          )}
        </div>

        {passo === 4 && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#666', marginBottom: '12px', display: 'block' }}>Confirme sua senha:</label>
            <div style={{ background: '#F8F9FA', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '2px solid #e0e0e0' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ width: '40px', height: '48px', borderRadius: '12px', background: '#fff', border: '2px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>{senhaConfirm[i] ? "●" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            <ElementoClicavel
              onClick={() => {
                setSenhaConfirm(senha);
                setTimeout(() => setMostrarValidacao(true), 800);
              }}
              mostrarSeta={false}
            >
              <button style={{ width: '100%', background: '#10B981', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle size={20} color="#fff" /> Confirmar
              </button>
            </ElementoClicavel>
          </div>
        )}
      </div>

      {mostrarMoedas && <MoedasAnimadas quantidade={10} onFim={() => setMostrarMoedas(false)} />}
      {feedbackAcerto && <FeedbackAcerto mensagem={mensagemFeedback} onContinuar={() => { setFeedbackAcerto(false); setMostrarMoedas(true); Sons.avancar(); }} />}
      {feedbackErro && <FeedbackErro dica={mensagemFeedback} onTentar={() => setFeedbackErro(false)} />}
    </SimuladorImersivo>
  );
}