import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, ChevronRight } from "lucide-react";

const MODULOS = [
  { id: "mod1", titulo: "Primeiros Passos no Celular", emoji: "📱", desc: "Aprenda a usar seu celular com confiança" },
  { id: "mod2", titulo: "Internet Segura", emoji: "🔒", desc: "Navegue com segurança na internet" },
  { id: "mod3", titulo: "Dinheiro Digital", emoji: "💰", desc: "Entenda PIX, contas e finanças" },
  { id: "mod4", titulo: "Cidadania Online", emoji: "🏛️", desc: "Acesse serviços públicos digitais" },
];

export default function ModuloAtivo({ usuario }) {
  const completados = usuario?.modulos_completos || [];
  const proximo = MODULOS.find((m) => !completados.includes(m.id)) || MODULOS[0];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mx-5 mt-6 mb-28"
    >
      <h3 className="text-lg font-bold text-[#5C2E7F] mb-3">Continue aprendendo</h3>
      <Link to={createPageUrl("Modulos")}>
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="ripple-btn rounded-3xl p-5 shadow-lg border-2 border-[#EDE0FF] bg-white"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "linear-gradient(135deg, #EDE0FF, #F8F0FF)" }}
            >
              {proximo.emoji}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#5C2E7F]">{proximo.titulo}</h4>
              <p className="text-sm text-gray-500 font-medium">{proximo.desc}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-[#F3984B]" />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="ripple-btn w-full mt-4 py-3 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(90deg, #F3984B, #FFD080)" }}
          >
            Continuar aprendendo! 📖
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  );
}