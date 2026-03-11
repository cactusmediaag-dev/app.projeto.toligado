import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import PinInput from "../components/auth/PinInput";
import ActionButton from "../components/shared/ActionButton";

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
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #5C2E7F 0%, #A67EC8 100%)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center mb-10"
        >
          <div className="text-7xl mb-4">⚡</div>
          <h1 className="text-4xl font-black text-white mb-2">Tô Ligado</h1>
          <p className="text-xl text-white/80 font-semibold">
            Bem-vindo de volta! 👋
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm space-y-6"
        >
          <div>
            <label className="text-white/80 text-sm font-semibold mb-2 block">
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
            <label className="text-white/80 text-sm font-semibold mb-3 block">
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
        </motion.div>
      </div>
    </div>
  );
}