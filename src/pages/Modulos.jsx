import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

const MODULOS = [
  { id: "mod1", titulo: "Ferramentas Google e Introdução ao Celular", emoji: "📱", desc: "Aprenda a usar seu celular", cor: "#5C2E7F", aulas: 5 },
  { id: "mod2", titulo: "Configurações e Segurança Inicial", emoji: "🔒", desc: "Mantenha seu celular seguro", cor: "#2ECC71", aulas: 8 },
  { id: "mod3", titulo: "Acesso e Segurança Avançada", emoji: "🛡️", desc: "Reconhecimento facial e voz", cor: "#2471A3", aulas: 5 },
  { id: "mod4", titulo: "Uso de Redes Sociais", emoji: "📲", desc: "WhatsApp, Facebook e Instagram", cor: "#8E44AD", aulas: 3 },
  { id: "mod5", titulo: "Criação de Conteúdo Digital", emoji: "🎬", desc: "Posts, vídeos e fotos", cor: "#E74C3C", aulas: 5 },
  { id: "mod6", titulo: "Aplicativos Públicos e Serviços", emoji: "🏛️", desc: "INSS, contas e cadastros", cor: "#1A5276", aulas: 3 },
  { id: "mod7", titulo: "Operações Financeiras I", emoji: "💰", desc: "PIX, boletos e QR Code", cor: "#1E8449", aulas: 4 },
  { id: "mod8", titulo: "Cidadania Online", emoji: "🗳️", desc: "Serviços públicos digitais", cor: "#3498DB", aulas: 4 },
  { id: "mod9", titulo: "Comunicação Digital", emoji: "💬", desc: "E-mail e videochamadas", cor: "#16A085", aulas: 5 },
  { id: "mod10", titulo: "Saúde Digital", emoji: "❤️", desc: "Bem-estar e tecnologia", cor: "#9B59B6", aulas: 3 },
];

export default function Modulos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (!userId) { navigate(createPageUrl("Entrar")); return; }
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) setUsuario(users[0]);
    };
    loadUser();
  }, []);

  const completados = usuario?.modulos_completos || [];

  const getStatus = (modId, index) => {
    if (completados.includes(modId)) return "done";
    const prevDone = index === 0 || completados.includes(MODULOS[index - 1].id);
    return prevDone ? "active" : "locked";
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
        <h1 className="text-2xl font-black text-[#5C2E7F]">📚 Módulos</h1>
      </div>

      <div className="px-5 space-y-4">
        {MODULOS.map((mod, i) => {
          const status = getStatus(mod.id, i);
          return (
            <motion.div
            key={mod.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => {
              if (status === "active") {
                if (mod.id === "mod1") {
                  navigate(createPageUrl("Modulo1Licao1"));
                } else if (mod.id === "mod2") {
                  navigate(createPageUrl("Modulo2Licao1"));
                } else if (mod.id === "mod3") {
                  navigate(createPageUrl("Modulo3Licao1"));
                } else if (mod.id === "mod4") {
                  navigate(createPageUrl("Modulo4Licao1"));
                } else if (mod.id === "mod5") {
                  navigate(createPageUrl("Modulo5Licao1"));
                } else if (mod.id === "mod6") {
                  navigate(createPageUrl("Modulo6Licao1"));
                } else if (mod.id === "mod7") {
                  navigate(createPageUrl("Modulo7Licao1"));
                }
              }
            }}
            className={`ripple-btn rounded-3xl p-5 flex items-center gap-4 shadow-md transition-all active:scale-[0.97]
              ${status === "locked" ? "opacity-50 bg-gray-100" : "bg-white border-2 border-[#EDE0FF]"}
              ${status === "active" && (mod.id === "mod1" || mod.id === "mod2" || mod.id === "mod3" || mod.id === "mod4" || mod.id === "mod5" || mod.id === "mod6" || mod.id === "mod7") ? "cursor-pointer" : ""}
            `}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                style={{
                  background: status === "locked"
                    ? "#E5E7EB"
                    : `linear-gradient(135deg, ${mod.cor}20, ${mod.cor}40)`,
                }}
              >
                {status === "locked" ? <Lock className="w-6 h-6 text-gray-400" /> : mod.emoji}
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-bold ${status === "locked" ? "text-gray-400" : "text-[#5C2E7F]"}`}>
                  {mod.titulo}
                </h4>
                <p className="text-sm text-gray-400 font-medium">{mod.desc}</p>
                <p className="text-xs text-gray-400 mt-1 font-semibold">{mod.aulas} aulas</p>
              </div>
              {status === "done" && (
                <CheckCircle className="w-7 h-7 text-[#2ECC71]" />
              )}
              {status === "active" && (
                <div className="px-3 py-1.5 rounded-xl bg-[#F3984B] text-white text-xs font-bold">
                  Iniciar
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