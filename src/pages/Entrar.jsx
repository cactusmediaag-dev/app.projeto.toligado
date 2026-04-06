import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import PinInput from "@/components/auth/PinInput";
import ActionButton from "@/components/shared/ActionButton";

export default function Entrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const simpleHash = async (pin) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + "toligado_salt_2024");
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleLogin = async () => {
    setError("");
    if (nome.trim().length < 3) {
      setError("Digite seu nome completo ✏️");
      return;
    }
    if (senha.length !== 6) {
      setError("A senha precisa ter 6 números 🔢");
      return;
    }

    setLoading(true);
    const users = await base44.entities.Usuario.filter({ nome: nome.trim() });

    if (users.length === 0) {
      setError("Não encontramos esse nome. Tente de novo 😊");
      setLoading(false);
      return;
    }

    const hash = await simpleHash(senha);
    const user = users.find((u) => u.senha_hash === hash);

    if (!user) {
      setError("Senha incorreta. Tente mais uma vez 🔐");
      setLoading(false);
      return;
    }

    localStorage.setItem("toligado_user_id", user.id);
    localStorage.setItem("toligado_user_nome", user.nome);
    setLoading(false);
    navigate(createPageUrl("Home"));
  };

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #5C2E7F 0%, #7B3FA0 50%, #A67EC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0 24px',
      boxSizing: 'border-box'
    }}>

      {/* TOPO — Logo e título */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '48px',
        paddingBottom: '24px'
      }}>
        <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '12px' }}>⚡</div>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Tô Ligado
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', margin: 0, fontWeight: '600' }}>
          Bem-vindo de volta! 👋
        </p>
      </div>

      {/* MEIO — Formulário */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Seu nome completo
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => { setNome(e.target.value); setError(""); }}
            placeholder="Digite seu nome"
            className="w-full p-4 rounded-2xl text-lg font-semibold bg-white/95 text-[#5C2E7F] placeholder-gray-400 border-2 border-transparent focus:border-[#F3984B] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Sua senha
          </label>
          <PinInput value={senha} onChange={(v) => { setSenha(v); setError(""); }} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-300/30 rounded-2xl px-4 py-3 text-center"
          >
            <p className="text-white font-semibold text-base">{error}</p>
          </motion.div>
        )}
      </div>

      {/* RODAPÉ — Botão e link */}
      <div style={{ flex: '0 0 auto', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ActionButton onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar 🔓"}
        </ActionButton>

        <div className="text-center">
          <Link
            to={createPageUrl("Cadastro")}
            className="text-white/70 font-semibold text-base hover:text-white transition-colors underline underline-offset-4"
          >
            Ainda não tem conta? Cadastre-se aqui
          </Link>
        </div>
      </div>

    </div>
  );
}