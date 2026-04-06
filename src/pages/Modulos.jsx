import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/shared/BottomNav';
import { base44 } from '@/api/base44Client';

export default function Modulos() {
  const navigate = useNavigate();
  const [modulosCompletos, setModulosCompletos] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('toligado_user_id');
    if (!userId) { navigate(createPageUrl('Entrar')); return; }
    base44.entities.Usuario.filter({ id: userId }).then(users => {
      if (users.length > 0) setModulosCompletos(users[0].modulos_completos || []);
    });
  }, []);

  const modulos = [
    { id: 'mod1', numero: 1, titulo: 'Ferramentas Google\ne Introdução ao Celular', descricao: 'Aprenda a usar seu celular', aulas: 5, icone: '📱', gradiente: 'linear-gradient(135deg, #5C2E7F, #9B59B6)', primeiraLicao: 'Modulo1Licao1' },
    { id: 'mod2', numero: 2, titulo: 'Configurações e\nSegurança Inicial', descricao: 'Mantenha seu celular seguro', aulas: 8, icone: '🔒', gradiente: 'linear-gradient(135deg, #1A8A5A, #2ECC71)', primeiraLicao: 'Modulo2Licao1' },
    { id: 'mod3', numero: 3, titulo: 'Acesso e\nSegurança Avançada', descricao: 'Reconhecimento facial e voz', aulas: 5, icone: '🛡️', gradiente: 'linear-gradient(135deg, #2471A3, #5DADE2)', primeiraLicao: 'Modulo3Licao1' },
    { id: 'mod4', numero: 4, titulo: 'Uso de\nRedes Sociais', descricao: 'WhatsApp, Facebook e Instagram', aulas: 3, icone: '📲', gradiente: 'linear-gradient(135deg, #8E44AD, #D7BDE2)', primeiraLicao: 'Modulo4Licao1' },
    { id: 'mod5', numero: 5, titulo: 'Criação de\nConteúdo Digital', descricao: 'Posts, vídeos e fotos', aulas: 5, icone: '🎬', gradiente: 'linear-gradient(135deg, #E74C3C, #F1948A)', primeiraLicao: 'Modulo5Licao1' },
    { id: 'mod6', numero: 6, titulo: 'Aplicativos Públicos\ne Serviços', descricao: 'Gov.br, INSS e contas', aulas: 3, icone: '🏛️', gradiente: 'linear-gradient(135deg, #2E86C1, #85C1E9)', primeiraLicao: 'Modulo6Licao1' },
    { id: 'mod7', numero: 7, titulo: 'Operações\nFinanceiras I', descricao: 'PIX, boletos e QR Code', aulas: 4, icone: '💰', gradiente: 'linear-gradient(135deg, #27AE60, #82E0AA)', primeiraLicao: 'Modulo7Licao1' },
    { id: 'mod8', numero: 8, titulo: 'Operações Financeiras\nII e Segurança', descricao: 'Transferências e proteção', aulas: 6, icone: '🔐', gradiente: 'linear-gradient(135deg, #922B21, #E59866)', primeiraLicao: 'Modulo8Licao1' },
  ];

  const getStatus = (modulo, index) => {
    if (modulosCompletos.includes(modulo.id)) return 'completo';
    if (index === 0) return 'disponivel';
    if (modulosCompletos.includes(modulos[index - 1].id)) return 'disponivel';
    return 'bloqueado';
  };

  const handleModulo = (modulo, status) => {
    if (status === 'bloqueado') {
      const toast = document.createElement('div');
      toast.textContent = 'Complete o módulo anterior primeiro! 💪';
      toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 20px;border-radius:20px;font-size:14px;font-weight:600;z-index:9999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.3);';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
      return;
    }
    navigate(createPageUrl(modulo.primeiraLicao));
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#f5f0ff', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER com safe area */}
      <div style={{
        background: '#fff',
        padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 16px',
        borderBottom: '1px solid #f0e8ff',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 2px 12px rgba(92,46,127,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate(createPageUrl('Home'))} style={{ background: '#f0e8ff', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#5C2E7F', flexShrink: 0 }}>
            ←
          </button>
          <span style={{ fontSize: '24px' }}>📚</span>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#5C2E7F', margin: 0, letterSpacing: '-0.3px' }}>Módulos</h1>
        </div>
      </div>

      {/* LISTA */}
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '100px' }}>
        {modulos.map((modulo, index) => {
          const status = getStatus(modulo, index);
          const bloqueado = status === 'bloqueado';
          const completo = status === 'completo';

          return (
            <div
              key={modulo.id}
              onClick={() => handleModulo(modulo, status)}
              style={{
                background: '#fff', borderRadius: '20px', padding: '16px',
                display: 'flex', alignItems: 'center', gap: '16px',
                cursor: bloqueado ? 'not-allowed' : 'pointer',
                opacity: bloqueado ? 0.6 : 1,
                border: completo ? '2px solid #2ECC71' : bloqueado ? '2px solid transparent' : '2px solid rgba(92,46,127,0.15)',
                boxShadow: bloqueado ? 'none' : '0 2px 12px rgba(92,46,127,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px', flexShrink: 0,
                background: bloqueado ? '#f0f0f0' : modulo.gradiente,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px',
                boxShadow: bloqueado ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {bloqueado ? '🔒' : modulo.icone}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: bloqueado ? '#aaa' : '#333', lineHeight: 1.3, marginBottom: '4px', whiteSpace: 'pre-line' }}>
                  {modulo.titulo}
                </div>
                <div style={{ fontSize: '12px', color: bloqueado ? '#bbb' : '#999', marginBottom: '4px' }}>
                  {modulo.descricao}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: bloqueado ? '#ccc' : '#5C2E7F' }}>
                  {modulo.aulas} aulas
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                {completo ? (
                  <div style={{ background: '#2ECC71', borderRadius: '20px', padding: '6px 12px', color: '#fff', fontSize: '12px', fontWeight: '700' }}>✅ Feito</div>
                ) : bloqueado ? (
                  <div style={{ background: '#f0f0f0', borderRadius: '20px', padding: '6px 12px', color: '#bbb', fontSize: '12px', fontWeight: '700' }}>🔒</div>
                ) : (
                  <div style={{ background: 'linear-gradient(135deg, #F3984B, #e67e22)', borderRadius: '20px', padding: '6px 14px', color: '#fff', fontSize: '13px', fontWeight: '800', boxShadow: '0 2px 8px rgba(243,152,75,0.4)' }}>Iniciar</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}