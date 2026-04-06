import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ProgressBar from "@/components/auth/ProgressBar";
import PinInput from "@/components/auth/PinInput";
import ActionButton from "@/components/shared/ActionButton";
import Confetti from "@/components/shared/Confetti";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Cadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [sexo, setSexo] = useState("");
  const [nome, setNome] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const simpleHash = async (pin) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + "toligado_salt_2024");
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const validateStep = () => {
    setError("");
    switch (step) {
      case 0:
        if (!sexo) { setError("Selecione como você se identifica 😊"); return false; }
        return true;
      case 1:
        if (nome.trim().length < 3) { setError("Digite seu nome completo (mínimo 3 letras) ✏️"); return false; }
        return true;
      case 2: {
        const d = parseInt(dia), m = parseInt(mes), a = parseInt(ano);
        if (!d || !m || !a || d < 1 || d > 31 || m < 1 || m > 12 || a < 1900 || a > 2000) {
          setError("Data de nascimento inválida 📅"); return false;
        }
        const birthDate = new Date(a, m - 1, d);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 45) { setError("Você precisa ter pelo menos 45 anos 🎂"); return false; }
        return true;
      }
      case 3:
        if (senha.length !== 6) { setError("A senha precisa ter 6 números 🔢"); return false; }
        if (senha !== confirmarSenha) { setError("As senhas não são iguais 🔐"); return false; }
        return true;
      default: return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
      setError("");
    } else {
      setLoading(true);
      const hash = await simpleHash(senha);
      const dataNasc = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

      const existing = await base44.entities.Usuario.filter({ nome: nome.trim() });
      if (existing.length > 0) {
        setError("Já existe alguém cadastrado com esse nome 😊");
        setLoading(false);
        return;
      }

      const user = await base44.entities.Usuario.create({
        nome: nome.trim(),
        sexo,
        data_nascimento: dataNasc,
        senha_hash: hash,
        nivel_atual: 1,
        moedas: 0,
        modulos_completos: [],
        xp_total: 0,
      });

      localStorage.setItem("toligado_user_id", user.id);
      localStorage.setItem("toligado_user_nome", nome.trim());
      setLoading(false);
      setShowConfetti(true);
      setShowSuccess(true);

      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 0) { setStep(step - 1); setError(""); }
  };

  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const podeAvancar = (() => {
    if (step === 0) return !!sexo;
    if (step === 1) return nome.trim().length >= 3;
    if (step === 2) return !!(dia && mes && ano);
    if (step === 3) return senha.length === 6 && confirmarSenha.length === 6;
    return true;
  })();

  if (showSuccess) {
    return (
      <div
        style={{ height: '100dvh', background: 'linear-gradient(135deg, #5C2E7F 0%, #A67EC8 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}
      >
        <Confetti active={showConfetti} />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎉</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
            Parabéns, {nome.split(' ')[0]}!
          </h2>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
            Bem-vindo ao Tô Ligado! ⚡
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #5C2E7F 0%, #A67EC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>

      {/* TOPO — Progress + voltar */}
      <div style={{ flex: '0 0 auto', padding: '52px 24px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          {step > 0 && (
            <button
              onClick={handleBack}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft style={{ width: '24px', height: '24px' }} />
            </button>
          )}
        </div>
        <ProgressBar currentStep={step} totalSteps={4} />
      </div>

      {/* MEIO — Conteúdo do step */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', gap: '16px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {step === 0 && (
              <>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: 0 }}>Você é? 😊</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[{ value: 'Homem', emoji: '🧔', label: 'Homem' }, { value: 'Mulher', emoji: '👩', label: 'Mulher' }].map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => { setSexo(opt.value); setError(''); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '16px 20px', borderRadius: '16px',
                        background: sexo === opt.value ? 'rgba(243,152,75,0.3)' : 'rgba(255,255,255,0.15)',
                        border: sexo === opt.value ? '2px solid #F3984B' : '2px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer', transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '36px' }}>{opt.emoji}</span>
                      <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>{opt.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: 0 }}>Qual é o seu nome? 🌟</h2>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setError(''); }}
                  placeholder="Digite seu nome completo"
                  style={{
                    width: '100%', padding: '18px', borderRadius: '16px',
                    fontSize: '18px', fontWeight: '600',
                    background: 'rgba(255,255,255,0.95)', color: '#5C2E7F',
                    border: '2px solid transparent', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: 0 }}>Quando você nasceu? 🎂</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Dia</label>
                    <input
                      type="tel" inputMode="numeric" value={dia} maxLength={2} placeholder="DD"
                      onChange={(e) => { setDia(e.target.value.replace(/\D/g, '').slice(0, 2)); setError(''); }}
                      style={{ width: '100%', padding: '16px 8px', borderRadius: '14px', fontSize: '20px', fontWeight: '700', textAlign: 'center', background: 'rgba(255,255,255,0.95)', color: '#5C2E7F', border: '2px solid transparent', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Mês</label>
                    <input
                      type="tel" inputMode="numeric" value={mes} maxLength={2} placeholder="MM"
                      onChange={(e) => { setMes(e.target.value.replace(/\D/g, '').slice(0, 2)); setError(''); }}
                      style={{ width: '100%', padding: '16px 8px', borderRadius: '14px', fontSize: '20px', fontWeight: '700', textAlign: 'center', background: 'rgba(255,255,255,0.95)', color: '#5C2E7F', border: '2px solid transparent', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ flex: 1.5 }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Ano</label>
                    <input
                      type="tel" inputMode="numeric" value={ano} maxLength={4} placeholder="AAAA"
                      onChange={(e) => { setAno(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                      style={{ width: '100%', padding: '16px 8px', borderRadius: '14px', fontSize: '20px', fontWeight: '700', textAlign: 'center', background: 'rgba(255,255,255,0.95)', color: '#5C2E7F', border: '2px solid transparent', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>Crie sua senha 🔐</h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', margin: 0 }}>Use 6 números que você vai lembrar</p>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Senha:</label>
                  <PinInput value={senha} onChange={(v) => { setSenha(v); setError(''); }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Confirmar:</label>
                  <PinInput value={confirmarSenha} onChange={(v) => { setConfirmarSenha(v); setError(''); }} />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '14px', padding: '12px 16px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', margin: 0 }}>{error}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* RODAPÉ — Botão sempre visível */}
      <div style={{ flex: '0 0 auto', padding: '16px 24px 40px' }}>
        <button
          onClick={handleNext}
          disabled={loading}
          style={{
            width: '100%', padding: '18px', borderRadius: '16px', border: 'none',
            background: podeAvancar && !loading
              ? 'linear-gradient(135deg, #F3984B, #e67e22)'
              : 'rgba(255,255,255,0.2)',
            color: '#fff', fontSize: '18px', fontWeight: '800',
            cursor: podeAvancar && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: podeAvancar && !loading ? '0 4px 20px rgba(243,152,75,0.4)' : 'none'
          }}
        >
          {loading ? 'Criando sua conta...' : step === 3 ? 'Criar minha conta! 🚀' : 'Próximo →'}
        </button>
      </div>

    </div>
  );
}