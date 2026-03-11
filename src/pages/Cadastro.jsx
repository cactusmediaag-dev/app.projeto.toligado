import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ProgressBar from "../components/auth/ProgressBar";
import PinInput from "../components/auth/PinInput";
import ActionButton from "../components/shared/ActionButton";
import Confetti from "../components/shared/Confetti";

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

  if (showSuccess) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(135deg, #5C2E7F 0%, #A67EC8 100%)" }}
      >
        <Confetti active={showConfetti} />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="text-7xl mb-6">🎉</div>
          <h2 className="text-3xl font-black text-white mb-3">
            Parabéns, {nome.split(" ")[0]}!
          </h2>
          <p className="text-xl text-white/90 font-semibold">
            Bem-vindo ao Tô Ligado! ⚡
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #5C2E7F 0%, #A67EC8 100%)" }}
    >
      <div className="pt-4">
        <div className="flex items-center px-4 mb-2">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl text-white/80 hover:text-white active:scale-90 transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
        <ProgressBar currentStep={step} totalSteps={4} />
      </div>

      <div className="flex-1 px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {step === 0 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-black text-white mb-8">
                  Como você se identifica? 😊
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    { value: "Homem", emoji: "👨", label: "Homem" },
                    { value: "Mulher", emoji: "👩", label: "Mulher" },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setSexo(opt.value); setError(""); }}
                      className={`ripple-btn p-6 rounded-3xl text-left flex items-center gap-4 transition-all duration-300 border-3
                        ${sexo === opt.value
                          ? "bg-[#F3984B] border-[#FFD080] text-white shadow-lg shadow-orange-300/40"
                          : "bg-white/15 border-white/20 text-white hover:bg-white/25"
                        }
                      `}
                    >
                      <span className="text-5xl">{opt.emoji}</span>
                      <span className="text-2xl font-bold">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-black text-white mb-8">
                  Qual é o seu nome? 🌟
                </h2>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setError(""); }}
                  placeholder="Digite seu nome completo"
                  className="w-full p-5 rounded-2xl text-xl font-semibold bg-white/95 text-[#5C2E7F] placeholder-gray-400 border-2 border-transparent focus:border-[#F3984B] focus:outline-none transition-all"
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-black text-white mb-8">
                  Quando você nasceu? 🎂
                </h2>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-white/80 text-sm font-semibold mb-2 block">Dia</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={dia}
                      onChange={(e) => { setDia(e.target.value.replace(/\D/g, "").slice(0, 2)); setError(""); }}
                      placeholder="DD"
                      maxLength={2}
                      className="w-full p-4 rounded-2xl text-xl font-bold text-center bg-white/95 text-[#5C2E7F] border-2 border-transparent focus:border-[#F3984B] focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-white/80 text-sm font-semibold mb-2 block">Mês</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={mes}
                      onChange={(e) => { setMes(e.target.value.replace(/\D/g, "").slice(0, 2)); setError(""); }}
                      placeholder="MM"
                      maxLength={2}
                      className="w-full p-4 rounded-2xl text-xl font-bold text-center bg-white/95 text-[#5C2E7F] border-2 border-transparent focus:border-[#F3984B] focus:outline-none"
                    />
                  </div>
                  <div className="flex-[1.5]">
                    <label className="text-white/80 text-sm font-semibold mb-2 block">Ano</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={ano}
                      onChange={(e) => { setAno(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }}
                      placeholder="AAAA"
                      maxLength={4}
                      className="w-full p-4 rounded-2xl text-xl font-bold text-center bg-white/95 text-[#5C2E7F] border-2 border-transparent focus:border-[#F3984B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-black text-white mb-3">
                  Crie sua senha secreta 🔐
                </h2>
                <p className="text-lg text-white/80 font-semibold mb-8">
                  Use 6 números que você vai lembrar
                </p>
                <div className="mb-6">
                  <label className="text-white/80 text-sm font-semibold mb-3 block">Senha:</label>
                  <PinInput value={senha} onChange={(v) => { setSenha(v); setError(""); }} />
                </div>
                <div>
                  <label className="text-white/80 text-sm font-semibold mb-3 block">Confirmar senha:</label>
                  <PinInput value={confirmarSenha} onChange={(v) => { setConfirmarSenha(v); setError(""); }} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mb-2"
        >
          <div className="bg-red-500/20 border border-red-300/30 rounded-2xl px-4 py-3 text-center">
            <p className="text-white font-semibold text-base">{error}</p>
          </div>
        </motion.div>
      )}

      <div className="px-6 pb-8 pt-2">
        <ActionButton
          onClick={handleNext}
          disabled={loading}
          variant={step === 3 ? "primary" : "primary"}
        >
          {loading ? "Criando sua conta..." : step === 3 ? "Criar minha conta! 🚀" : "Próximo →"}
        </ActionButton>
      </div>
    </div>
  );
}