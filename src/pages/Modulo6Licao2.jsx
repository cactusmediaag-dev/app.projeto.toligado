import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import SimuladorImersivo from "@/components/simulador/SimuladorImersivo";
import ElementoClicavel from "@/components/simulador/ElementoClicavel";
import AndroidHomeScreen from "@/components/simulador/AndroidHomeScreen";
import ValidacaoQuiz from "@/components/simulador/ValidacaoQuiz";
import { ArrowLeft, Landmark, Home, Receipt, FileText, ScanBarcode, Zap, Droplet, Smartphone, Camera, CheckCircle2, Lock } from 'lucide-react';

export default function Modulo6Licao2() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [bancoAberto, setBancoAberto] = useState(false);
  const [telaPagamento, setTelaPagamento] = useState(false);
  const [opcoesPagamento, setOpcoesPagamento] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [codigoLido, setCodigoLido] = useState(false);
  const [resumo, setResumo] = useState(false);
  const [confirmacaoSenha, setConfirmacaoSenha] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [comprovante, setComprovante] = useState(false);
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
    navigate(createPageUrl("Modulo6Licao3"));
  };

  if (mostrarValidacao) {
    return (
      <ValidacaoQuiz
        pergunta="Como você paga uma conta de luz pelo celular?"
        opcoes={[
          "📞 Ligando para a empresa de energia",
          "💸 Pelo app do banco, escaneando o código de barras ✅",
          "🏪 Só na loja física",
        ]}
        respostaCorreta={1}
        onConcluir={handleConcluirValidacao}
        moedas={10}
      />
    );
  };

  const passos = [
    { instrucao: "Chegou a conta de luz! Vamos pagar pelo celular. Toque no app do BANCO 🏦", audio: "Chegou a conta de luz! Vamos pagar pelo celular. Toque no app do banco!" },
    { instrucao: "Toque em PAGAR no menu inferior para pagar a conta 💸", audio: "Toque em pagar no menu inferior para pagar a conta!" },
    { instrucao: "Toque em CONTA DE LUZ para pagar sua fatura ⚡", audio: "Toque em conta de luz para pagar sua fatura!" },
    { instrucao: "Você pode ESCANEAR a conta com a câmera! Toque em Escanear 📷", audio: "Você pode escanear a conta com a câmera! Toque em escanear!" },
    { instrucao: "Aponte para o código de barras da conta! Ele vai ser lido 📊", audio: "Aponte para o código de barras da conta! Ele vai ser lido!" },
    { instrucao: "Confira os dados! Toque em CONFIRMAR PAGAMENTO para pagar ✅", audio: "Confira os dados! Toque em confirmar pagamento para pagar!" },
    { instrucao: "Digite sua senha do banco para confirmar o pagamento 🔐", audio: "Digite sua senha do banco para confirmar o pagamento!" },
    { instrucao: "Conta paga! Toque em VER COMPROVANTE para guardar o recibo 📄", audio: "Conta paga! Toque em ver comprovante para guardar o recibo!" },
  ];

  return (
    <SimuladorImersivo
      instrucao={passos[passo - 1]?.instrucao}
      audioText={passos[passo - 1]?.audio}
      passoAtual={passo}
      totalPassos={8}
      onVoltar={() => navigate(createPageUrl("Modulos"))}
    >
      {!bancoAberto && (
        <div style={{ height: '100%', position: 'relative' }}>
          <AndroidHomeScreen
            appsCustom={[
              { nome: 'banco', label: 'Meu Banco', bg: '#4A148C', id: 'banco' },
              { nome: 'mensagem', label: 'WhatsApp', bg: '#25D366', id: 'whatsapp' },
              { nome: 'email', label: 'Email', bg: '#EA4335', id: 'email' },
              { nome: 'camera', label: 'Câmera', bg: '#37474F', id: 'camera' },
              { nome: 'chrome', label: 'Chrome', bg: '#4285F4', id: 'chrome' },
              { nome: 'musica', label: 'Música', bg: '#E91E63', id: 'music' },
              { nome: 'config', label: 'Config.', bg: '#607D8B', id: 'settings' },
              { nome: 'fotos', label: 'Fotos', bg: '#FF7043', id: 'photos' },
            ]}
            appDestacado={passo === 1 ? 'banco' : null}
            onAppClick={(id) => { if (passo === 1 && id === 'banco') handleCliqueCerto(2, () => setBancoAberto(true)); }}
          />
        </div>
      )}

      {bancoAberto && !telaPagamento && !opcoesPagamento && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Landmark size={24} color="#fff" />
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>Olá, Maria!</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0 }}>R$ 850,00</p>
            </div>
          </div>

          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexShrink: 0 }}>
            {passo === 2 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(3, () => { setTelaPagamento(true); setOpcoesPagamento(true); })} mostrarSeta={false}>
                <div style={{ background: '#F3E5F5', border: '2px solid #9C27B0', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Receipt size={28} color="#4A148C" />
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#4A148C', margin: 0 }}>Pagar</p>
                </div>
              </ElementoClicavel>
            )}
            {passo !== 2 && (
              <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Receipt size={28} color="#999" />
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Pagar</p>
              </div>
            )}
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Zap size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>PIX</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <ScanBarcode size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Boleto</p>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <FileText size={28} color="#999" />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#999', margin: 0 }}>Extrato</p>
            </div>
          </div>

          <div style={{ flex: 1, padding: '16px' }}>
            <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '16px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', margin: '0 0 12px' }}>Últimas transações</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ color: '#444', fontWeight: '600', margin: 0 }}>Mercado Central</p>
                  <p style={{ color: '#E74C3C', fontWeight: '700', margin: 0 }}>-R$ 45,00</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ color: '#444', fontWeight: '600', margin: 0 }}>Farmácia Saúde</p>
                  <p style={{ color: '#E74C3C', fontWeight: '700', margin: 0 }}>-R$ 28,50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {opcoesPagamento && !cameraAberta && !codigoLido && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setOpcoesPagamento(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Pagamentos</h2>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ScanBarcode size={28} color="#666" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#444' }}>Boleto / Código de Barras</span>
            </div>
            {passo === 3 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(4, () => setCameraAberta(true))} mostrarSeta={false}>
                <div style={{ padding: '16px', background: '#FFF8E1', border: '2px solid #F9A825', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <Zap size={28} color="#F9A825" />
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#444' }}>Conta de Luz</span>
                </div>
              </ElementoClicavel>
            )}
            <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Droplet size={28} color="#666" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#444' }}>Conta de Água</span>
            </div>
            <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Smartphone size={28} color="#666" />
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#444' }}>Recarga de Celular</span>
            </div>
          </div>
        </div>
      )}

      {cameraAberta && passo === 4 && !codigoLido && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setCameraAberta(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Conta de Luz</h2>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {passo === 4 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(5, () => {})} mostrarSeta={false}>
                <button style={{ width: '100%', padding: '20px', background: '#4A148C', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '700', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                  <Camera size={28} color="#fff" />
                  Escanear código de barras
                </button>
              </ElementoClicavel>
            )}
            <button style={{ width: '100%', padding: '20px', background: '#f1f3f4', color: '#666', border: 'none', borderRadius: '16px', fontWeight: '700', fontSize: '17px' }}>
              Digitar o código manualmente
            </button>
          </div>
        </div>
      )}

      {passo === 5 && cameraAberta && !codigoLido && (
        <div style={{ minHeight: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '60px', justifyContent: 'center' }}>
                {[4,8,3,6,10,2,7,5,9,3,6,4,8,2,7,5,10,3,6,4,8,2,7,5,9,3,6,4,8,2].map((h,i) => (
                  <div key={i} style={{ width: '3px', height: `${h*5}px`, background: '#000' }} />
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#999', marginTop: '12px', letterSpacing: '1px' }}>34191.79001 01043.510047 91020.150008 1 99990000008750</p>
            </div>
            <motion.div animate={{ y: [-40, 40] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ height: '2px', background: '#EF4444', width: '240px', margin: '0 auto' }} />
          </div>

          <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, padding: '0 16px' }}>
            {passo === 5 && (
              <ElementoClicavel onClick={() => { setCodigoLido(true); setResumo(true); setCameraAberta(false); handleCliqueCerto(6, null); }} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '17px', cursor: 'pointer' }}>
                  Escanear Agora
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {resumo && !confirmacaoSenha && !sucesso && (
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setResumo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Confirmar Pagamento</h2>
          </div>

          <div style={{ padding: '16px', flex: 1 }}>
            <div style={{ background: '#FFF8E1', border: '2px solid #F9A825', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Zap size={28} color="#F9A825" />
                <p style={{ fontSize: '30px', fontWeight: '900', color: '#1a1a1a', margin: 0 }}>R$ 87,50</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Empresa:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Energisa MT</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Vencimento:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>15/08/2026</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Código:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '12px', margin: 0 }}>34191.79001 01043...</p>
                </div>
              </div>
            </div>

            {passo === 6 && (
              <ElementoClicavel onClick={() => handleCliqueCerto(7, () => { setResumo(false); setConfirmacaoSenha(true); })} mostrarSeta={false}>
                <button style={{ width: '100%', background: '#27AE60', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', minHeight: '56px' }}>
                  Confirmar Pagamento
                </button>
              </ElementoClicavel>
            )}
          </div>
        </div>
      )}

      {confirmacaoSenha && !sucesso && (
        <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <Lock size={48} color="#4A148C" style={{ marginBottom: '24px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px', margin: '0 0 8px' }}>Digite sua senha</h3>
          <p style={{ color: '#999', marginBottom: '32px', margin: '0 0 32px' }}>Para confirmar o pagamento</p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ width: '44px', height: '44px', background: '#4A148C', borderRadius: '12px' }} />
            ))}
          </div>

          {passo === 7 && (
            <ElementoClicavel onClick={() => { setConfirmacaoSenha(false); setSucesso(true); handleCliqueCerto(8, null); }} mostrarSeta={false}>
              <button style={{ width: '100%', maxWidth: '320px', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '17px', cursor: 'pointer' }}>
                Confirmar
              </button>
            </ElementoClicavel>
          )}
        </div>
      )}

      {sucesso && !comprovante && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle2 size={72} color="#27AE60" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px', textAlign: 'center', margin: '0 0 8px' }}>Pagamento realizado!</h3>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '24px', margin: '0 0 24px' }}>Conta de Luz — R$ 87,50</p>
          </motion.div>

          {passo === 8 && (
            <ElementoClicavel onClick={() => { setComprovante(true); setTimeout(() => setMostrarValidacao(true), 1500); }} mostrarSeta={false}>
              <button style={{ width: '100%', maxWidth: '320px', background: '#4A148C', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '700', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                <FileText size={22} color="#fff" />
                Ver Comprovante
              </button>
            </ElementoClicavel>
          )}
        </motion.div>
      )}

      {comprovante && (
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ background: '#4A148C', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button onClick={() => setComprovante(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ArrowLeft size={22} color="#fff" />
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Comprovante</h2>
          </div>

          <div style={{ padding: '16px', flex: 1 }}>
            <div style={{ background: '#f8f9fa', border: '2px solid #e0e0e0', borderRadius: '16px', padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <CheckCircle2 size={48} color="#27AE60" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '14px', color: '#999' }}>PAGAMENTO APROVADO</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Valor:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>R$ 87,50</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Empresa:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Energisa MT</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Data:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>11/03/2026</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: '#666', margin: 0 }}>Protocolo:</p>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: 0 }}>2026031187451</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </SimuladorImersivo>
  );
}