import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";

const SOM_CLIQUE = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp';

export default function Modulo9Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [appAberto, setAppAberto] = useState(false);
  const [cpfPreenchido, setCpfPreenchido] = useState(false);
  const [nomePreenchido, setNomePreenchido] = useState(false);
  const [dataPreenchida, setDataPreenchida] = useState(false);
  const [maePreenchida, setMaePreenchida] = useState(false);
  const [senhaPreenchida, setSenhaPreenchida] = useState(false);
  const [mostrarValidacao, setMostrarValidacao] = useState(false);

  const handleCliqueCerto = (proximoPasso, acao) => {
    const audio = new Audio(SOM_CLIQUE);
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
    navigate(createPageUrl("Modulo9Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Quais dados o e-Título pede no primeiro acesso?"
        opcoes={[
          "🪪 CPF ou título, nome, nascimento e nome da mãe ✅",
          "💳 Número do cartão do banco",
          "🏠 Apenas o endereço da sua casa",
        ]}
        respostaCorreta={0}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  }

  const passos = [
    { instrucao: "Vamos entrar no e-Título pela primeira vez! Toque no app 🗳️", audio: "Vamos entrar no e-Título pela primeira vez! Toque no app!" },
    { instrucao: "Digite o número do seu CPF. Se preferir, pode usar o número do título! 🪪", audio: "Digite o número do seu CPF. Se preferir, pode usar o número do título!" },
    { instrucao: "Agora toque no campo NOME e escreva seu nome completo ✏️", audio: "Agora toque no campo nome e escreva seu nome completo!" },
    { instrucao: "Toque em DATA DE NASCIMENTO e escolha o dia, mês e ano 📅", audio: "Toque em data de nascimento e escolha o dia, mês e ano!" },
    { instrucao: "Digite o NOME DA SUA MÃE. É para confirmar que é você mesmo! 👵", audio: "Digite o nome da sua mãe. É para confirmar que é você mesmo!" },
    { instrucao: "Crie uma SENHA e guarde bem. Não conte para ninguém! 🔒", audio: "Crie uma senha e guarde bem. Não conte para ninguém!" },
  ];

  const CampoForm = ({ label, valor, preenchido, onClick, passoAtual }) => {
    return (
      <div className="mb-4">
        <label className="block mb-2" style={{ fontSize: '15px', fontWeight: '600', color: '#555' }}>{label}</label>
        {passo === passoAtual && !preenchido && (
          <ElementoClicavel onClick={onClick} mostrarSeta={false} posicao="top">
            <input
              type="text"
              placeholder={label.includes('SENHA') ? '••••••' : label}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer"
              style={{ minHeight: '48px', fontSize: '18px' }}
              readOnly
            />
          </ElementoClicavel>
        )}
        {preenchido && (
          <input
            type={label.includes('SENHA') ? 'password' : 'text'}
            value={valor}
            className="w-full px-4 py-3 rounded-xl border-2"
            style={{ minHeight: '48px', fontSize: '18px', borderColor: '#1E5A9C', background: '#E3F2FD' }}
            readOnly
          />
        )}
      </div>
    );
  };

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={6}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {/* Passo 1: Tela inicial do celular com ícone e-Título */}
      {!appAberto && (
        <div style={{ height: '100%', minHeight: '480px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <AndroidHomeScreen
              appsCustom={[
                { icon: '📷', label: 'Câmera', bg: '#1a1a2e', id: 'camera' },
                { icon: '🗳️', label: 'e-Título', bg: '#1E5A9C', id: 'etitulo' },
                { icon: '💬', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
                { icon: '🌐', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
                { icon: '⚙️', label: 'Config.', bg: '#607D8B', id: 'settings' },
                { icon: '📸', label: 'Fotos', bg: '#FF5722', id: 'photos' },
                { icon: '🔍', label: 'Google', bg: '#4285F4', id: 'google' },
                { icon: '🎵', label: 'Música', bg: '#E91E63', id: 'music' },
              ]}
              appDestacado="etitulo"
              onAppClick={(id) => { if (id === 'etitulo') handleCliqueCerto(2, () => setAppAberto(true)); }}
            />
          </div>
        </div>
      )}

      {/* Passos 2-6: Formulário de primeiro acesso */}
      {appAberto && (
        <div className="w-full h-full flex flex-col">
          {/* Header e-Título */}
          <div style={{ background: '#1E5A9C', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🗳️</span>
            <div>
              <h2 style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '20px' }}>e-Título</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Justiça Eleitoral</p>
            </div>
          </div>

          {/* Formulário */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <h3 className="font-bold text-gray-800 mb-6" style={{ fontSize: '20px' }}>Primeiro acesso</h3>
            <p className="text-gray-500 mb-6" style={{ fontSize: '15px' }}>Preencha seus dados para criar sua conta</p>

            <CampoForm
              label="CPF ou número do título"
              valor="123.456.789-00"
              preenchido={cpfPreenchido}
              onClick={() => { setCpfPreenchido(true); handleCliqueCerto(3, null); }}
              passoAtual={2}
            />

            <CampoForm
              label="Nome completo"
              valor="Maria Silva Santos"
              preenchido={nomePreenchido}
              onClick={() => { setNomePreenchido(true); handleCliqueCerto(4, null); }}
              passoAtual={3}
            />

            <CampoForm
              label="Data de nascimento"
              valor="15/03/1955"
              preenchido={dataPreenchida}
              onClick={() => { setDataPreenchida(true); handleCliqueCerto(5, null); }}
              passoAtual={4}
            />

            <CampoForm
              label="Nome da mãe"
              valor="Joana Silva"
              preenchido={maePreenchida}
              onClick={() => { setMaePreenchida(true); handleCliqueCerto(6, null); }}
              passoAtual={5}
            />

            <CampoForm
              label="Crie sua SENHA"
              valor="••••••"
              preenchido={senhaPreenchida}
              onClick={() => { setSenhaPreenchida(true); setMostrarValidacao(true); }}
              passoAtual={6}
            />

            {passo === 6 && senhaPreenchida && null}
          </div>
        </div>
      )}
    </SimuladorImersivo>
  );
}