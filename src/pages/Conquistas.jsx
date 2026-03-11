import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

const CONQUISTAS = [
  { id: "c1", titulo: "Primeiro Login", desc: "Entrou no app pela primeira vez", emoji: "🌟", req: "always" },
  { id: "c2", titulo: "Estudante Dedicado", desc: "Completou 1 módulo", emoji: "📚", req: 1 },
  { id: "c3", titulo: "Expert Digital", desc: "Completou 3 módulos", emoji: "🎓", req: 3 },
  { id: "c4", titulo: "Mestre Ligado", desc: "Completou todos os módulos", emoji: "👑", req: 6 },
  { id: "c5", titulo: "Colecionador", desc: "Ganhou 100 moedas", emoji: "🪙", req: "coins_100" },
  { id: "c6", titulo: "Nível 5", desc: "Chegou ao nível 5", emoji: "⭐", req: "level_5" },
];

export default function Conquistas() {
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

  const isUnlocked = (req) => {
    if (!usuario) return false;
    if (req === "always") return true;
    if (req === "coins_100") return (usuario.moedas || 0) >= 100;
    if (req === "level_5") return (usuario.nivel_atual || 1) >= 5;
    if (typeof req === "number") return (usuario.modulos_completos || []).length >= req;
    return false;
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(180deg, #F8F0FF 0%, #FFFFFF 40%, #F8F0FF 100%)" }}
    >
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="p-2 rounded-xl bg-[#EDE0FF] text-[#5C2E7F] active:scale-90 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-black text-[#5C2E7F]">🎖️ Conquistas</h1>
      </div>

      <div className="px-5 grid grid-cols-2 gap-4">
        {CONQUISTAS.map((c, i) => {
          const unlocked = isUnlocked(c.req);
          return (
            <motion.div
              key={c.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-3xl p-5 text-center shadow-md transition-all
                ${unlocked
                  ? "bg-white border-2 border-[#F3984B]"
                  : "bg-gray-100 opacity-50 border-2 border-gray-200"
                }
              `}
            >
              <span className={`text-5xl block mb-3 ${unlocked ? "" : "grayscale"}`}>
                {c.emoji}
              </span>
              <h4 className={`text-base font-bold ${unlocked ? "text-[#5C2E7F]" : "text-gray-400"}`}>
                {c.titulo}
              </h4>
              <p className="text-xs text-gray-400 font-medium mt-1">{c.desc}</p>
              {unlocked && (
                <div className="mt-3 px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-xs font-bold inline-block">
                  ✓ Desbloqueado
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}