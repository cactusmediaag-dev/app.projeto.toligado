import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import CelebracaoModulo from "@/components/simulador/CelebracaoModulo";
import Certificado from "@/components/simulador/Certificado";

export default function Modulo9Celebracao() {
  const [mostrarCertificado, setMostrarCertificado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (userId) {
        const users = await base44.entities.Usuario.filter({ id: userId });
        if (users.length > 0) {
          const user = users[0];
          setNomeUsuario(user.nome);

          const modulosCompletos = user.modulos_completos || [];
          if (!modulosCompletos.includes("mod9")) {
            await base44.entities.Usuario.update(userId, {
              modulos_completos: [...modulosCompletos, "mod9"],
              moedas: (user.moedas || 0) + 50,
              xp_total: (user.xp_total || 0) + 100,
            });
          }
        }
      }
    };
    loadUser();
  }, []);

  return (
    <>
      <CelebracaoModulo
        moduloNumero={9}
        moduloTitulo="e-Título: Título de Eleitor Digital"
        moedasGanhas={100}
        nomeUsuario={nomeUsuario}
        onVerCertificado={() => setMostrarCertificado(true)}
      />
      {mostrarCertificado && (
        <Certificado
          moduloNumero={9}
          moduloTitulo="e-Título: Título de Eleitor Digital"
          nomeUsuario={nomeUsuario}
          onFechar={() => setMostrarCertificado(false)}
        />
      )}
    </>
  );
}