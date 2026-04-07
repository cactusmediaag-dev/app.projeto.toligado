import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from '@/components/shared/PullToRefresh';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';

const MODULOS = [
  { id: 'mod1', nome: 'Ferramentas Google', icone: '📱', rota: 'Modulo1Licao1' },
  { id: 'mod2', nome: 'Configurações e Segurança', icone: '🔒', rota: 'Modulo2Licao1' },
  { id: 'mod3', nome: 'Segurança Avançada', icone: '🛡️', rota: 'Modulo3Licao1' },
  { id: 'mod4', nome: 'Redes Sociais', icone: '📲', rota: 'Modulo4Licao1' },
  { id: 'mod5', nome: 'Criação de Conteúdo', icone: '🎬', rota: 'Modulo5Licao1' },
  { id: 'mod6', nome: 'Serviços Públicos', icone: '🏛️', rota: 'Modulo6Licao1' },
  { id: 'mod7', nome: 'Finanças I', icone: '💰', rota: 'Modulo7Licao1' },
  { id: 'mod8', nome: 'Finanças e Segurança', icone: '🔐', rota: 'Modulo8Licao1' },
];

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [saudacao, setSaudacao] = useState('');

  const carregarDados = () => {
    const userId = localStorage.getItem('toligado_user_id');
    if (!userId) { navigate(createPageUrl('Entrar')); return; }
    return base44.entities.Usuario.filter({ id: userId }).then(users => {
      if (users.length === 0) { navigate(createPageUrl('Entrar')); return; }
      setUsuario(users[0]);
    });
  };

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) setSaudacao('Bom dia');
    else if (h >= 12 && h < 18) setSaudacao('Boa tarde');
    else setSaudacao('Boa noite');
    carregarDados();
  }, []);

  if (!usuario) return (
    <div style={{ height: '100dvh', background: 'linear-gradient(160deg, #5C2E7F, #A67EC8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const primeiroNome = (nome) => nome ? nome.split(' ')[0] : 'Amigo';
  const avatar = usuario.sexo === 'Mulher' ? '👩' : '👨';
  const nivel = usuario.nivel_atual || 1;
  const moedas = usuario.moedas || 0;
  const modulosFeitos = (usuario.modulos_completos || []).length;
  const progresso = Math.round((modulosFeitos / 8) * 100);
  const moduloAtivo = MODULOS.find(m => !(usuario.modulos_completos || []).includes(m.id));

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(160deg, #5C2E7F 0%, #7B3FA0 40%, #A67EC8 100%)', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: '0 0 2px', fontWeight: '600' }}>{saudacao}! ☀️</p>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>
              {primeiroNome(usuario.nome)} {avatar}
            </h1>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ fontSize: '18px' }}>🪙</span>
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '16px' }}>{moedas}</span>
          </div>
        </div>
      </div>

      {/* CONTEÚDO SCROLLÁVEL */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
      <PullToRefresh onRefresh={carregarDados}>
      <div style={{ padding: '0 16px 100px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* CARD NÍVEL + PROGRESSO */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '24px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '0 0 2px', fontWeight: '600' }}>Seu nível atual</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '28px' }}>⭐</span>
                <span style={{ color: '#FFD700', fontSize: '28px', fontWeight: '900' }}>{nivel}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '0 0 2px', fontWeight: '600' }}>Jornada</p>
              <p style={{ color: '#fff', fontSize: '22px', fontWeight: '900', margin: 0 }}>{modulosFeitos}/8</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '600' }}>Progresso total</span>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '800' }}>{progresso}%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progresso}%`, background: 'linear-gradient(90deg, #F3984B, #FFD700)', borderRadius: '5px', boxShadow: '0 0 8px rgba(243,152,75,0.6)' }} />
            </div>
          </div>
        </div>

        {/* CONTINUAR APRENDENDO */}
        {moduloAtivo ? (
          <div onClick={() => navigate(createPageUrl(moduloAtivo.rota))} style={{ background: 'linear-gradient(135deg, #F3984B, #e67e22)', borderRadius: '24px', padding: '20px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(243,152,75,0.4)', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
              {moduloAtivo.icone}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', margin: '0 0 4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📖 Continuar aprendendo</p>
              <p style={{ color: '#fff', fontSize: '17px', fontWeight: '800', margin: '0 0 8px', lineHeight: 1.2 }}>{moduloAtivo.nome}</p>
              <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '12px', padding: '6px 14px', display: 'inline-flex' }}>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '800' }}>Continuar →</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #27AE60, #2ECC71)', borderRadius: '24px', padding: '24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(39,174,96,0.4)' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎓</div>
            <p style={{ color: '#fff', fontSize: '18px', fontWeight: '800', margin: '0 0 4px' }}>Parabéns! Você concluiu tudo!</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0 }}>Você é um campeão digital! 🏆</p>
          </div>
        )}

        {/* AÇÕES RÁPIDAS */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '700', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Menu rápido</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { icon: '📚', label: 'Módulos', rota: 'Modulos' },
              { icon: '🏆', label: 'Ranking', rota: 'Ranking' },
              { icon: '🎖️', label: 'Conquistas', rota: 'Conquistas' },
            ].map((item, i) => (
              <div key={i} onClick={() => navigate(createPageUrl(item.rota))} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '18px', padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '28px' }}>{item.icon}</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '24px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📊 Suas estatísticas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '🪙', label: 'Moedas ganhas', valor: moedas },
              { icon: '📚', label: 'Módulos feitos', valor: `${modulosFeitos} de 8` },
              { icon: '⭐', label: 'Nível atual', valor: nivel },
              { icon: '🎯', label: 'Conclusão', valor: `${progresso}%` },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>{stat.valor}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: '600', marginTop: '2px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DICA DO DIA */}
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '20px', padding: '16px', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ color: '#FFD700', fontSize: '13px', fontWeight: '800', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dica do dia</p>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
              Complete módulos para ganhar moedas e subir no ranking! 🚀
            </p>
          </div>
        </div>

      </div>
      </PullToRefresh>
      </div>

      <BottomNav />
    </div>
  );
}