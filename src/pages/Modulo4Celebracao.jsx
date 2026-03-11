import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import CelebracaoModulo from "@/components/simulador/CelebracaoModulo";
import Certificado from "@/components/simulador/Certificado";

export default function Modulo4Celebracao() {
  const [mostrarCertificado, setMostrarCertificado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (userId) {
        const users = await base44.entities.Usuario.filter({ id: userId });
        if (users.length > 0) {
          setNomeUsuario(users[0].nome);
        }
      }
    };
    loadUser();
  }, []);

  return (
    <>
      <CelebracaoModulo
        moduloNumero={4}
        moduloTitulo="Uso de Redes Sociais"
        moedasGanhas={80}
        nomeUsuario={nomeUsuario}
        onVerCertificado={() => setMostrarCertificado(true)}
      />
      {mostrarCertificado && (
        <Certificado
          moduloNumero={4}
          moduloTitulo="Uso de Redes Sociais"
          nomeUsuario={nomeUsuario}
          onFechar={() => setMostrarCertificado(false)}
        />
      )}
    </>
  );
}