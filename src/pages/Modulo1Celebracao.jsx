import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import CelebracaoModulo from "@/components/simulador/CelebracaoModulo";
import Certificado from "@/components/simulador/Certificado";

export default function Modulo1Celebracao() {
  const navigate = useNavigate();
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
        moduloNumero={1}
        moduloTitulo="Ferramentas Google e Introdução ao Celular"
        moedasGanhas={100}
        nomeUsuario={nomeUsuario}
        onVerCertificado={() => setMostrarCertificado(true)}
      />
      {mostrarCertificado && (
        <Certificado
          moduloNumero={1}
          moduloTitulo="Ferramentas Google e Introdução ao Celular"
          nomeUsuario={nomeUsuario}
          onFechar={() => setMostrarCertificado(false)}
        />
      )}
    </>
  );
}