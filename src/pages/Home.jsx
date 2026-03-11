import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import HeaderHome from "@/components/home/HeaderHome";
import BannerDestaque from "@/components/home/BannerDestaque";
import ActionCards from "@/components/home/ActionCards";
import ModuloAtivo from "@/components/home/ModuloAtivo";
import BottomNav from "@/components/shared/BottomNav";

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (!userId) {
        navigate(createPageUrl("Entrar"));
        return;
      }
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length === 0) {
        localStorage.removeItem("toligado_user_id");
        localStorage.removeItem("toligado_user_nome");
        navigate(createPageUrl("Entrar"));
        return;
      }
      setUsuario(users[0]);
      setLoading(false);
    };
    loadUser();
  }, [navigate]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #F8F0FF 0%, #EDE0FF 100%)" }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl"
        >
          ⚡
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-4"
      style={{ background: "linear-gradient(180deg, #F8F0FF 0%, #FFFFFF 40%, #F8F0FF 100%)" }}
    >
      <HeaderHome usuario={usuario} />
      <div className="mt-2">
        <BannerDestaque usuario={usuario} />
      </div>
      <ActionCards />
      <ModuloAtivo usuario={usuario} />
      <BottomNav />
    </div>
  );
}