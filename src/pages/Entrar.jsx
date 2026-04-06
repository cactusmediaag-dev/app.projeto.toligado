import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import PinInput from "@/components/auth/PinInput";

const LOGO_URL = "https://media.base44.com/images/public/69b16b8ddfea424f48cdda92/2f9229046_logo_to_ligado.png";

export default function Entrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

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

      {/* TOPO — Logo compacto */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'calc(env(safe-area-inset-top, 44px) + 16px)',
        paddingBottom: '16px'
      }}>
        {!logoError ? (
          <img
            src={LOGO_URL}
            alt="Tô Ligado"
            onError={() => setLogoError(true)}
            style={{ width: '130px', height: '130px', objectFit: 'contain', marginBottom: '6px' }}
          />
        ) : (
          <div style={{ fontSize: '60px', marginBottom: '8px' }}>⚡</div>
        )}
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
          Tô Ligado
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0, fontWeight: '600' }}>
          Bem-vindo de volta! 👋
        </p>
      </div>

      {/* MEIO — Formulário */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '16px'
      }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
            Seu nome completo
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => { setNome(e.target.value); setError(""); }}
            placeholder="Digite seu nome"
            style={{
              width: '100%', padding: '16px 18px', borderRadius: '16px',
              border: 'none', fontSize: '18px', outline: 'none',
              boxSizing: 'border-box', background: '#fff',
              color: '#333', fontWeight: '600'
            }}
          />
        </div>

        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
            Sua senha
          </label>
          <PinInput value={senha} onChange={(v) => { setSenha(v); setError(""); }} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(231,76,60,0.2)', border: '1px solid rgba(231,76,60,0.4)', borderRadius: '12px', padding: '10px 14px' }}
          >
            <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', margin: 0 }}>⚠️ {error}</p>
          </motion.div>
        )}
      </div>

      {/* RODAPÉ — botões sempre visíveis */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)'
      }}>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '18px', borderRadius: '16px', border: 'none',
            background: loading ? 'rgba(255,255,255,0.3)' : 'linear-gradient(135deg, #F3984B, #e67e22)',
            color: '#fff', fontSize: '18px', fontWeight: '800',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(243,152,75,0.5)',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? 'Entrando...' : 'Entrar 🔓'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.25)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '600' }}>ou</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.25)' }} />
        </div>

        <button
          onClick={() => navigate(createPageUrl("Cadastro"))}
          style={{
            width: '100%', padding: '18px', borderRadius: '16px',
            border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff', fontSize: '17px', fontWeight: '800',
            cursor: 'pointer', transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <span>✨</span>
          <span>Criar minha conta</span>
        </button>
      </div>

    </div>
  );
}