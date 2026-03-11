import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import CelebracaoModulo from "@/components/simulador/CelebracaoModulo";
import Certificado from "@/components/simulador/Certificado";

export default function Modulo2Celebracao() {
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
        moduloNumero={2}
        moduloTitulo="Configurações e Segurança Inicial"
        moedasGanhas={130}
        nomeUsuario={nomeUsuario}
        onVerCertificado={() => setMostrarCertificado(true)}
      />
      {mostrarCertificado && (
        <Certificado
          moduloNumero={2}
          moduloTitulo="Configurações e Segurança Inicial"
          nomeUsuario={nomeUsuario}
          onFechar={() => setMostrarCertificado(false)}
        />
      )}
    </>
  );
}