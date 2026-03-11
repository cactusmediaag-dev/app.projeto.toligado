import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Star, Coins, BookOpen, Calendar } from "lucide-react";
import BottomNav from "../components/shared/BottomNav";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (!userId) { navigate(createPageUrl("Entrar")); return; }
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) setUsuario(users[0]);
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("toligado_user_id");
    localStorage.removeItem("toligado_user_nome");
    navigate(createPageUrl("Entrar"));
  };

  if (!usuario) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #F8F0FF, #EDE0FF)" }}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <span className="text-6xl">⚡</span>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { icon: Star, label: "Nível", value: usuario.nivel_atual || 1, color: "#F3984B" },
    { icon: Coins, label: "Moedas", value: usuario.moedas || 0, color: "#FFD080" },
    { icon: BookOpen, label: "Módulos", value: (usuario.modulos_completos || []).length, color: "#5C2E7F" },
  ];

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(180deg, #5C2E7F 0%, #A67EC8 30%, #F8F0FF 60%, #FFFFFF 100%)" }}
    >
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="p-2 rounded-xl bg-white/20 text-white active:scale-90 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-black text-white">👤 Perfil</h1>
        <div className="w-9" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center mt-4 mb-8"
      >
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-white"
          style={{ background: "linear-gradient(135deg, #EDE0FF, #FFFFFF)" }}
        >
          {usuario.sexo === "Homem" ? "👨" : "👩"}
        </div>
        <h2 className="text-2xl font-black text-white mt-4">{usuario.nome}</h2>
        <p className="text-white/70 font-semibold text-base mt-1">
          Membro desde {new Date(usuario.created_date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>
      </motion.div>

      <div className="px-5">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl p-4 text-center shadow-md"
            >
              <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-2xl font-black text-[#5C2E7F]">{s.value}</p>
              <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-5 shadow-md space-y-4"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#5C2E7F]" />
            <div>
              <p className="text-sm text-gray-400 font-medium">Data de nascimento</p>
              <p className="font-bold text-[#5C2E7F]">
                {usuario.data_nascimento
                  ? new Date(usuario.data_nascimento + "T00:00:00").toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🪙</span>
            <div>
              <p className="text-sm text-gray-400 font-medium">XP Total</p>
              <p className="font-bold text-[#5C2E7F]">{usuario.xp_total || 0} pontos</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="ripple-btn w-full mt-6 py-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-500 font-bold text-lg flex items-center justify-center gap-2 active:bg-red-100 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sair da conta
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}