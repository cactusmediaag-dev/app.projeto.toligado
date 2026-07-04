import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShieldCheck, AlertTriangle, Ban, ArrowLeft, MessageSquare } from 'lucide-react';

export default function Modulo8Licao3() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);
  const [virarCartao, setVirarCartao] = useState(false);

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
    navigate(createPageUrl("Modulo8Licao4"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="O que é o CVV do cartão?"
        opcoes={[
          "📅 A data de validade",
          "🔐 O código de 3 dígitos no verso — nunca compartilhe",
          "💳 O número principal do cartão"
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos conhecer os números do cartão! Toque no cartão para ver os detalhes 💳", audio: "Vamos conhecer os números do cartão! Toque no cartão para ver os detalhes!" },
    { instrucao: "Esses são os números da FRENTE! Toque na DATA DE VALIDADE para saber mais 📅", audio: "Esses são os números da frente! Toque na data de validade para saber mais!" },
    { instrucao: "Esse número de 3 dígitos é o CVV! É o código secreto do cartão! Toque nele 🔐", audio: "Esse número de 3 dígitos é o CVV! É o código secreto do cartão! Toque nele!" },
    { instrucao: "Em compras online o site pede o CVV! Digite apenas em sites SEGUROS com 🔒", audio: "Em compras online o site pede o CVV! Digite apenas em sites seguros com cadeado!" },
    { instrucao: "GOLPE! O banco NUNCA pede CVV por mensagem! Toque em BLOQUEAR ⛔", audio: "Golpe! O banco nunca pede CVV por mensagem! Toque em bloquear!" }
  ];

  // Cartão de crédito desenhado em CSS — gradiente roxo, chip dourado
  const CartaoFrente = ({ destacarNumero, destacarValidade, onClickNumero, onClickValidade }) => (
    <div style={{ width: '280px', height: '176px', background: 'linear-gradient(135deg, #4A148C, #7B1FA2)', borderRadius: '18px', boxShadow: '0 12px 40px rgba(74,20,140,0.4)', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <CreditCard size={28} color="#fff" />
        <span style={{ fontSize: '12px', opacity: 0.8, fontWeight: '600' }}>CARTÃO</span>
      </div>
      {/* Chip dourado */}
      <div style={{ width: '40px', height: '30px', background: 'linear-gradient(135deg, #FFD54F, #FFB300)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '28px', height: '20px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px' }} />
      </div>
      <div onClick={onClickNumero} style={{ cursor: onClickNumero ? 'pointer' : 'default' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '20px', letterSpacing: '2px', margin: 0, background: destacarNumero ? 'rgba(255,213,79,0.3)' : 'transparent', padding: destacarNumero ? '2px 6px' : '2px 0', borderRadius: '4px', display: 'inline-block' }}>•••• •••• •••• 1234</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '10px', opacity: 0.7, margin: 0 }}>TITULAR</p>
          <p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>MARIA SILVA</p>
        </div>
        <div onClick={onClickValidade} style={{ cursor: onClickValidade ? 'pointer' : 'default', background: destacarValidade ? '#FFF9C4' : 'transparent', padding: destacarValidade ? '4px 8px' : '4px 0', borderRadius: '6px', color: destacarValidade ? '#4A148C' : '#fff' }}>
          <p style={{ fontSize: '10px', opacity: 0.8, margin: 0 }}>VALIDADE</p>
          <p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>08/28</p>
        </div>
      </div>
    </div>
  );

  const CartaoVerso = ({ onClickCvv }) => (
    <div style={{ width: '280px', height: '176px', background: 'linear-gradient(135deg, #4A148C, #7B1FA2)', borderRadius: '18px', boxShadow: '0 12px 40px rgba(74,20,140,0.4)', overflow: 'hidden', color: '#fff' }}>
      {/* Faixa preta */}
      <div style={{ background: '#000', height: '40px', marginTop: '20px' }} />
      <div style={{ padding: '16px 20px' }}>
        {/* Faixa de assinatura + CVV */}
        <div style={{ background: '#fff', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', color: '#999', marginRight: '8px' }}>CVV</span>
          <div onClick={onClickCvv} style={{ cursor: onClickCvv ? 'pointer' : 'default', background: '#4A148C', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: '700', fontSize: '18px' }}>123</div>
        </div>
        <p style={{ fontSize: '10px', opacity: 0.7, margin: 0 }}>CENTRAL DE ATENDIMENTO: 0800-123-4567</p>
      </div>
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
      {/* Passo 1: Cartão frente */}
      {passo === 1 && (
        <div style={{ minHeight: '100%', background: '#f5f0fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <ElementoClicavel onClick={() => handleAvancar(2)} mostrarSeta={false}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <CartaoFrente />
            </motion.div>
          </ElementoClicavel>
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#666', fontWeight: '600', margin: '20px 0 0' }}>Toque no cartão para ver os detalhes</p>
        </div>
      )}

      {/* Passo 2: Cartão com número e validade destacados */}
      {passo === 2 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <CartaoFrente
              destacarNumero={true}
              destacarValidade={true}
              onClickValidade={() => {
                setVirarCartao(true);
                setTimeout(() => handleAvancar(3), 1000);
              }}
            />
          </div>
          {virarCartao && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '14px', padding: '14px', maxWidth: '280px' }}
            >
              <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>
                <strong>📅 Data de validade:</strong> Mostra até quando o cartão é válido. Ex: 08/28 = válido até agosto de 2028
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Passo 3: Cartão verso com CVV */}
      {passo === 3 && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <CartaoVerso onClickCvv={() => handleAvancar(4)} />
          </div>
          <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: '14px', padding: '14px', maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Lock size={22} color="#C62828" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: '700', color: '#C62828', marginBottom: '4px', margin: '0 0 4px' }}>CVV = Código de segurança</p>
                <p style={{ fontSize: '14px', color: '#444', margin: '0 0 2px' }}>• Usado em compras online</p>
                <p style={{ fontSize: '14px', color: '#444', margin: 0 }}>• NUNCA compartilhe com ninguém!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 4: Compra online segura */}
      {passo === 4 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#E8F5E9', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #66BB6A', flexShrink: 0 }}>
            <Lock size={18} color="#1E8449" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E8449' }}>https://loja-segura.com</span>
          </div>
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontWeight: '800', fontSize: '20px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center', margin: '0 0 20px' }}>Finalizar Compra</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '300px', margin: '0 auto', width: '100%' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>Número do Cartão</label>
                <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }} value="•••• •••• •••• 1234" readOnly />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>Validade</label>
                  <input type="text" style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }} value="08/28" readOnly />
                </div>
                <ElementoClicavel onClick={() => handleAvancar(5)} mostrarSeta={false}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '700', color: '#555', display: 'block', marginBottom: '6px' }}>CVV 🔐</label>
                    <input type="password" style={{ width: '100%', padding: '14px', border: '2px solid #4A148C', borderRadius: '12px', fontSize: '16px', cursor: 'pointer', boxSizing: 'border-box' }} value="123" readOnly />
                  </div>
                </ElementoClicavel>
              </div>
              <div style={{ background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#27AE60" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1E8449', margin: 0 }}>CVV aceito — transação segura</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passo 5: Golpe do CVV por mensagem */}
      {passo === 5 && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#0B57D0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setPasso(4)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <div style={{ width: '36px', height: '36px', background: '#1B6DE0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: '700', color: '#fff', margin: 0 }}>Banco</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Mensagem automática</p>
            </div>
          </div>
          <div style={{ flex: 1, background: '#E8F0FE', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ background: '#fff', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '3px solid #EF5350' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <AlertTriangle size={40} color="#C62828" style={{ margin: '0 auto' }} />
              </div>
              <div style={{ background: '#FFEBEE', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
                <p style={{ fontSize: '14px', color: '#444', marginBottom: '10px', margin: '0 0 10px' }}>
                  <strong style={{ color: '#C62828' }}>Mensagem recebida:</strong>
                </p>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#333', margin: 0 }}>
                  "Olá! Sou do banco. Preciso do número do seu cartão e CVV para liberar seu limite!"
                </p>
              </div>
              <div style={{ background: '#FFF8E1', border: '2px solid #FFB74D', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <AlertTriangle size={22} color='#C62828' style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '700', color: '#C62828', marginBottom: '2px', margin: '0 0 2px' }}>ISSO É UM GOLPE!</p>
                    <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>O banco NUNCA pede CVV por mensagem!</p>
                  </div>
                </div>
              </div>
              <ElementoClicavel onClick={() => setMostrarValidacao(true)} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#C62828', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px' }}>
                  <Ban size={20} color="#fff" /> Bloquear contato
                </button>
              </ElementoClicavel>
            </motion.div>
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}