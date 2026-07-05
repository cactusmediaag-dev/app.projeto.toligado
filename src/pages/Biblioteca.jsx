import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';
import AvatarUsuario from '@/components/shared/AvatarUsuario';
import PullToRefresh from '@/components/shared/PullToRefresh';
import LeitorCartilha from '@/components/biblioteca/LeitorCartilha';
import { CARTILHAS } from '@/components/biblioteca/cartilhas';
import { CheckCircle } from 'lucide-react';

export default function Biblioteca() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cartilhaAtiva, setCartilhaAtiva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  const carregarDados = () => {
    const userId = localStorage.getItem('toligado_user_id');
    if (!userId) { navigate(createPageUrl('Entrar')); return; }
    setLoading(true);
    return base44.entities.Usuario.filter({ id: userId }).then(users => {
      if (users.length > 0) setUsuario(users[0]);
      setLoading(false);
    });
  };

  useEffect(() => { carregarDados(); }, []);

  if (loading) return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #EFE9F5', borderTopColor: '#5C2E7F', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!usuario) return null;

  const cartilhasCompletas = usuario.cartilhas_completas || [];

  if (cartilhaAtiva) {
    return (
      <LeitorCartilha
        cartilha={cartilhaAtiva}
        usuario={usuario}
        onVoltar={() => setCartilhaAtiva(null)}
        onConcluir={() => {
          setCartilhaAtiva(null);
          carregarDados();
          setFeedback('Cartilha concluída!');
          setTimeout(() => setFeedback(''), 3000);
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

      {/* HEADER */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 12px',
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ color: '#5C2E7F', fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>
            Biblioteca
          </h1>
          <p style={{ color: '#999', fontSize: '13px', margin: '2px 0 0', fontWeight: '600' }}>
            Leia, ouça e ganhe moedas
          </p>
        </div>
        <div onClick={() => navigate(createPageUrl('Perfil'))} style={{ cursor: 'pointer', flexShrink: 0 }}>
          <AvatarUsuario usuario={usuario} tamanho={40} />
        </div>
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <div style={{
          margin: '0 16px 12px', padding: '14px 18px', borderRadius: '14px',
          background: '#27AE60', color: '#fff', fontSize: '15px', fontWeight: '700',
          display: 'flex', alignItems: 'center', gap: '8px',
          animation: 'slideDown 0.3s ease'
        }}>
          <CheckCircle size={20} color="#fff" /> {feedback}
          <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}

      {/* GRADE DE CARTILHAS */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PullToRefresh onRefresh={carregarDados}>
          <div style={{ padding: '0 16px', paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 100px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {CARTILHAS.map(cartilha => {
                const concluida = cartilhasCompletas.includes(cartilha.id);
                return (
                  <div
                    key={cartilha.id}
                    onClick={() => setCartilhaAtiva(cartilha)}
                    style={{
                      background: '#fff', borderRadius: '18px', padding: '16px',
                      border: '1px solid #EFE9F5', boxShadow: '0 1px 4px rgba(92,46,127,0.06)',
                      cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: '8px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: cartilha.cor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '32px', flexShrink: 0
                    }}>
                      {cartilha.emoji}
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#333', margin: 0, textAlign: 'center', lineHeight: 1.2 }}>
                      {cartilha.titulo}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#999', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
                      {cartilha.descricao}
                    </p>
                    <div style={{ marginTop: '4px' }}>
                      {concluida ? (
                        <span style={{
                          background: '#E8F8F0', color: '#27AE60', fontSize: '12px', fontWeight: '800',
                          padding: '4px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px'
                        }}>
                          <CheckCircle size={14} color="#27AE60" /> Concluída
                        </span>
                      ) : (
                        <span style={{
                          background: '#FFF8E1', color: '#F3984B', fontSize: '12px', fontWeight: '800',
                          padding: '4px 10px', borderRadius: '10px'
                        }}>
                          +20 🪙
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PullToRefresh>
      </div>

      <BottomNav />
    </div>
  );
}