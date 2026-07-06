import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

export default function DemoAcesso() {
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const iniciarDemo = async () => {
      try {
        const usuarios = await base44.entities.Usuario.list();
        const demo = usuarios.find(u => u.nome === 'Dona Tereza')
          || usuarios.find(u => u.senha_hash === 'demo');

        if (!demo) { setErro(true); return; }

        localStorage.setItem('toligado_user_id', demo.id);
        localStorage.setItem('toligado_user_nome', demo.nome);
        localStorage.setItem('toligado_demo', '1');

        setTimeout(() => navigate(createPageUrl('Home'), { replace: true }), 800);
      } catch (e) {
        setErro(true);
      }
    };
    iniciarDemo();
  }, []);

  if (erro) return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(160deg, #5C2E7F, #A67EC8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
      <span style={{ fontSize: '48px' }}>😕</span>
      <p style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>Demonstração indisponível</p>
      <button onClick={() => navigate(createPageUrl('Entrar'))} style={{ padding: '14px 28px', borderRadius: '16px', border: 'none', background: '#fff', color: '#5C2E7F', fontSize: '16px', fontWeight: '800', cursor: 'pointer', minHeight: '48px' }}>
        Ir para entrada
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(160deg, #5C2E7F, #A67EC8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <div style={{ width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>Preparando demonstração...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}