import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Crown } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import PullToRefresh from "@/components/shared/PullToRefresh";

export default function Ranking() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [myId, setMyId] = useState(null);

  const load = async () => {
    const userId = localStorage.getItem("toligado_user_id");
    if (!userId) { navigate(createPageUrl("Entrar")); return; }
    setMyId(userId);
    const all = await base44.entities.Usuario.list("-xp_total", 50);
    setUsuarios(all);
  };

  useEffect(() => {
    load();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <PullToRefresh onRefresh={load}>
      <div
        className="min-h-screen pb-24 bg-background dark:bg-gray-900"
        style={{ background: "linear-gradient(180deg, #F8F0FF 0%, #FFFFFF 40%, #F8F0FF 100%)" }}
      >
        <div className="px-5 pt-6 pb-4 flex items-center gap-3 pt-[env(safe-area-inset-top)]">
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="p-2 rounded-xl bg-[#EDE0FF] text-[#5C2E7F] active:scale-90 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-black text-[#5C2E7F]">🏆 Ranking</h1>
      </div>

      {/* Top 3 podium */}
      {usuarios.length >= 3 && (
        <div className="px-5 mb-6">
          <div className="flex items-end justify-center gap-3">
            {[1, 0, 2].map((pos) => {
              const u = usuarios[pos];
              if (!u) return null;
              const heights = ["h-28", "h-24", "h-20"];
              const sizes = ["text-5xl", "text-4xl", "text-4xl"];
              return (
                <motion.div
                  key={pos}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: pos * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <span className={`${sizes[pos]} mb-2`}>{u.sexo === "Homem" ? "👨" : "👩"}</span>
                  <span className="text-sm font-bold text-[#5C2E7F] text-center max-w-[80px] truncate">
                    {u.nome?.split(" ")[0]}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">{u.xp_total || 0} XP</span>
                  <div
                    className={`${heights[pos]} w-20 rounded-t-2xl mt-2 flex items-start justify-center pt-3`}
                    style={{
                      background: pos === 0
                        ? "linear-gradient(180deg, #FFD700, #FFA500)"
                        : pos === 1
                        ? "linear-gradient(180deg, #C0C0C0, #A0A0A0)"
                        : "linear-gradient(180deg, #CD7F32, #A0522D)",
                    }}
                  >
                    <span className="text-2xl">{medals[pos]}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-5 space-y-3">
        {usuarios.slice(3).map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`flex items-center gap-3 p-4 rounded-2xl shadow-sm
              ${u.id === myId ? "bg-[#EDE0FF] border-2 border-[#5C2E7F]" : "bg-white border border-gray-100"}
            `}
          >
            <span className="text-lg font-black text-gray-400 w-8 text-center">{i + 4}</span>
            <span className="text-2xl">{u.sexo === "Homem" ? "👨" : "👩"}</span>
            <div className="flex-1">
              <p className="font-bold text-[#5C2E7F] text-base">{u.nome?.split(" ")[0]}</p>
              <p className="text-xs text-gray-400 font-semibold">Nível {u.nivel_atual || 1}</p>
            </div>
            <span className="font-bold text-[#F3984B] text-base">{u.xp_total || 0} XP</span>
          </motion.div>
        ))}
      </div>

      {usuarios.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🏆</span>
          <p className="text-lg text-gray-400 font-semibold">Nenhum participante ainda</p>
        </div>
      )}

        <BottomNav />
      </div>
    </PullToRefresh>
  );
}