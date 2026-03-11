import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorWrapper from "@/components/simulador/SimuladorWrapper";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

export default function Modulo2Licao5() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [forca, setForca] = useState(0);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    if (acao) acao();
    setTimeout(() => setPasso(proximoPasso), 600);
  };

  const handleConcluirValidacao = async () => {
    const userId = localStorage.getItem("toligado_user_id");
    if (userId) {
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) {
        await base44.entities.Usuario.update(userId, {
          moedas: (users[0].moedas || 0) + 10,
        });
      }
    }
    navigate(createPageUrl("Modulo2Licao6"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Qual dessas senhas é mais segura?"
        opcoes={[
          "🔴 123456",
          "🟢 071985 ou mistura de números ✅",
          "🔴 0000",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    {
      instrucao: "Vamos criar uma senha forte! Uma boa senha tem números E letras juntos 🔐",
      audio: "Vamos criar uma senha forte! Uma boa senha tem números e letras juntos!",
    },
    {
      instrucao: "Essa senha é muito fácil de descobrir! Toque em APAGAR e vamos criar uma melhor 🗑️",
      audio: "Essa senha é muito fácil de descobrir! Toque em apagar e vamos criar uma melhor!",
    },
    {
      instrucao: "Agora vamos digitar uma senha mais segura: use o mês e ano do seu nascimento! Ex: 0719 🔑",
      audio: "Agora vamos digitar uma senha mais segura! Use o mês e ano do seu nascimento como exemplo!",
    },
    {
      instrucao: "Ótimo! Agora confirme a senha! Toque no campo abaixo e repita 📝",
      audio: "Ótimo! Agora confirme a senha! Toque no campo abaixo e repita!",
    },
  ];

  return (
    <SimuladorWrapper
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={4}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      <div className="w-full h-full bg-white pt-12 p-6 flex flex-col">
        <h2 className="text-2xl font-black text-gray-800 mb-8 text-center">Criar Senha Segura</h2>

        <div className="bg-gray-50 rounded-3xl p-6 mb-6">
          <label className="text-sm font-bold text-gray-600 mb-3 block">Digite sua senha:</label>
          <div className="bg-white rounded-2xl p-4 mb-4 border-2 border-gray-200">
            <div className="flex gap-2 justify-center mb-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">{senha[i] ? "●" : ""}</span>
                </div>
              ))}
            </div>
          </div>

          {senha && (
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <div className={`flex-1 h-2 rounded-full ${forca >= 1 ? "bg-red-400" : "bg-gray-200"}`} />
                <div className={`flex-1 h-2 rounded-full ${forca >= 2 ? "bg-yellow-400" : "bg-gray-200"}`} />
                <div className={`flex-1 h-2 rounded-full ${forca >= 3 ? "bg-green-400" : "bg-gray-200"}`} />
              </div>
              <p className={`text-sm font-bold text-center ${forca === 1 ? "text-red-500" : forca === 2 ? "text-yellow-600" : "text-green-600"}`}>
                {forca === 1 ? "FRACA" : forca === 2 ? "MÉDIA" : "FORTE"}
              </p>
            </div>
          )}

          {passo === 1 && senha === "" && (
            <ElementoClicavel
              onClick={() => {
                setSenha("123456");
                setForca(1);
                handleCliqueCerto(2, null);
              }}
              posicao="top"
            >
              <button className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold">
                Digitar senha
              </button>
            </ElementoClicavel>
          )}

          {passo === 2 && (
            <ElementoClicavel
              onClick={() => {
                setSenha("");
                setForca(0);
                handleCliqueCerto(3, null);
              }}
              posicao="top"
            >
              <button className="w-full bg-red-500 text-white py-3 rounded-2xl font-bold">
                🗑️ Apagar
              </button>
            </ElementoClicavel>
          )}

          {passo === 3 && senha === "" && (
            <ElementoClicavel
              onClick={() => {
                let s = "";
                const numeros = "071985";
                let i = 0;
                const intervalo = setInterval(() => {
                  if (i < numeros.length) {
                    s += numeros[i];
                    setSenha(s);
                    setForca(s.length > 2 ? 3 : 2);
                    i++;
                  } else {
                    clearInterval(intervalo);
                    handleCliqueCerto(4, null);
                  }
                }, 300);
              }}
              posicao="top"
            >
              <button className="w-full bg-green-500 text-white py-3 rounded-2xl font-bold">
                Digitar senha forte
              </button>
            </ElementoClicavel>
          )}
        </div>

        {passo === 4 && (
          <div className="bg-gray-50 rounded-3xl p-6">
            <label className="text-sm font-bold text-gray-600 mb-3 block">Confirme sua senha:</label>
            <div className="bg-white rounded-2xl p-4 mb-4 border-2 border-gray-200">
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl">{senhaConfirm[i] ? "●" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            <ElementoClicavel
              onClick={() => {
                setSenhaConfirm(senha);
                setTimeout(() => setMostrarValidacao(true), 800);
              }}
              posicao="top"
            >
              <button className="w-full bg-green-500 text-white py-3 rounded-2xl font-bold">
                Confirmar ✅
              </button>
            </ElementoClicavel>
          </div>
        )}
      </div>
    </SimuladorWrapper>
  );
}