import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import CelebracaoModulo from "@/components/simulador/CelebracaoModulo";
import Certificado from "@/components/simulador/Certificado";

export default function Modulo7Celebracao() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [mostrarCertificado, setMostrarCertificado] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (userId) {
        const users = await base44.entities.Usuario.filter({ id: userId });
        if (users.length > 0) {
          const user = users[0];
          setUsuario(user);
          
          const modulosCompletos = user.modulos_completos || [];
          if (!modulosCompletos.includes("mod7")) {
            await base44.entities.Usuario.update(userId, {
              modulos_completos: [...modulosCompletos, "mod7"],
              moedas: (user.moedas || 0) + 50,
            });
          }
        }
      }
    };
    loadUser();
  }, []);

  if (mostrarCertificado) {
    return (
      <Certificado
        nomeUsuario={usuario?.nome || "Usuário"}
        nomeModulo="Operações Financeiras I"
        numeroModulo={7}
        corBorda="#1E8449"
        onFechar={() => setMostrarCertificado(false)}
      />
    );
  }

  return (
    <CelebracaoModulo
      emoji="💰🎉"
      titulo="Módulo 7 Concluído!"
      subtitulo="Você domina as operações financeiras básicas!"
      moedasGanhas={90}
      corGradiente="from-[#1E8449] to-[#58D68D]"
      audioTexto="Parabéns! Você concluiu o módulo financeiro! Agora você paga contas, faz PIX e lê QR Code!"
      onVerCertificado={() => setMostrarCertificado(true)}
      onProximoModulo={() => navigate(createPageUrl("Modulos"))}
      textoProximoModulo="Ir para o Módulo 8"
    />
  );
}