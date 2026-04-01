import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';

export default function Ranking() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('moedas');
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [minhaPos, setMinhaPos] = useState(null);

  useEffect(() => {
    carregarRanking();
  }, [filtro]);

  const carregarRanking = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('toligado_user_id');

      const todos = await base44.entities.Usuario.list(`-${filtro}`);

      const formatados = todos.map((u, i) => ({
        posicao: i + 1,
        id: u.id,
        nome: u.nome || 'Participante',
        sexo: u.sexo || 'Homem',
        moedas: u.moedas || 0,
        nivel: u.nivel_atual || 1,
        modulos: (u.modulos_completos || []).length,
        sou_eu: u.id === userId,
      }));

      setJogadores(formatados);

      const eu = formatados.find((j) => j.sou_eu);
      setMinhaPos(eu || null);
      setUsuarioAtual(eu || null);
    } catch (e) {
      console.error('Erro ranking:', e);
    }
    setLoading(false);
  };

  const valorFiltro = (j) => {
    if (filtro === 'moedas') return `🪙 ${j.moedas}`;
    if (filtro === 'nivel_atual') return `⭐ Nível ${j.nivel}`;
    return `📚 ${j.modulos} módulos`;
  };

  const corPosicao = (pos) => {
    if (pos === 1) return '#FFD700';
    if (pos === 2) return '#C0C0C0';
    if (pos === 3) return '#CD7F32';
    return '#999';
  };

  const avatar = (sexo) => (sexo === 'Mulher' ? '👩' : '👨');

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #5C2E7F 0%, #A67EC8 100%)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 16px', color: '#fff' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>🏆 Ranking</h1>
        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>Veja como você está entre os participantes!</p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 20px', overflowX: 'auto' }}>
        {[
          { key: 'moedas', label: '🪙 Moedas' },
          { key: 'nivel_atual', label: '⭐ Nível' },
          { key: 'modulos_completos', label: '📚 Módulos' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              background: filtro === f.key ? '#F3984B' : 'rgba(255,255,255,0.2)',
              color: '#fff', fontWeight: '700', fontSize: '13px',
              whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s ease',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: '#fff', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: '15px', opacity: 0.8 }}>Carregando participantes...</p>
        </div>
      )}

      {/* Sem usuários */}
      {!loading && jogadores.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#fff' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🌱</div>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>Ainda não há participantes no ranking.</p>
          <p style={{ fontSize: '14px', opacity: 0.6, marginTop: '8px' }}>Complete módulos para aparecer aqui!</p>
        </div>
      )}

      {/* Pódio TOP 3 */}
      {!loading && jogadores.length >= 3 && (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', padding: '0 16px 24px' }}>
          {[jogadores[1], jogadores[0], jogadores[2]].map((j, idx) => {
            const alturas = [60, 85, 45];
            const tamanhos = [56, 68, 52];
            const medals = ['🥈', '🥇', '🥉'];
            const isFirst = idx === 1;
            return (
              <div key={j.id} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: `${tamanhos[idx]}px`, height: `${tamanhos[idx]}px`,
                  borderRadius: '50%',
                  background: j.sou_eu
                    ? 'linear-gradient(135deg, #F3984B, #e67e22)'
                    : 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', fontSize: `${tamanhos[idx] * 0.42}px`,
                  border: `3px solid ${corPosicao(j.posicao)}`,
                  boxShadow: isFirst ? '0 0 20px rgba(255,215,0,0.5)' : 'none',
                }}>
                  {avatar(j.sexo)}
                </div>
                <div style={{
                  background: isFirst ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                  borderRadius: '12px 12px 0 0',
                  padding: `${isFirst ? 16 : 10}px 8px`,
                  color: '#fff',
                }}>
                  <div style={{ fontSize: isFirst ? '26px' : '20px' }}>{medals[idx]}</div>
                  <div style={{ fontSize: isFirst ? '13px' : '11px', fontWeight: '800', marginTop: '4px', color: j.sou_eu ? '#FFD700' : '#fff' }}>
                    {j.nome.split(' ')[0]}{j.sou_eu ? ' ⭐' : ''}
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px', fontWeight: '600' }}>{valorFiltro(j)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', height: `${alturas[idx]}px`, borderRadius: '0 0 8px 8px' }} />
              </div>
            );
          })}
        </div>
      )}

      {/* Minha posição destacada (fora do top 3) */}
      {!loading && minhaPos && minhaPos.posicao > 3 && (
        <div style={{
          margin: '0 16px 16px',
          background: 'rgba(243,152,75,0.25)', borderRadius: '16px',
          padding: '14px 16px', border: '2px solid #F3984B',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#FFD700', minWidth: '40px', textAlign: 'center' }}>
            #{minhaPos.posicao}
          </div>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #F3984B, #e67e22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', border: '2px solid #FFD700', flexShrink: 0,
          }}>
            {avatar(minhaPos.sexo)}
          </div>
          <div style={{ flex: 1, color: '#fff' }}>
            <div style={{ fontWeight: '700', fontSize: '14px' }}>{minhaPos.nome} — Você! ⭐</div>
            <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
              🪙 {minhaPos.moedas} moedas • ⭐ Nível {minhaPos.nivel} • 📚 {minhaPos.modulos} módulos
            </div>
          </div>
        </div>
      )}

      {/* Lista completa */}
      {!loading && jogadores.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px 16px', minHeight: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#5C2E7F', margin: 0 }}>Todos os participantes</h3>
            <span style={{ background: '#f0e8ff', color: '#5C2E7F', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700' }}>
              {jogadores.length} pessoas
            </span>
          </div>

          {jogadores.map((j) => (
            <div key={j.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
              background: j.sou_eu ? 'linear-gradient(135deg, rgba(92,46,127,0.08), rgba(243,152,75,0.08))' : 'transparent',
              borderRadius: '14px', marginBottom: '4px',
              border: j.sou_eu ? '1.5px solid rgba(92,46,127,0.2)' : '1.5px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              <div style={{ fontSize: j.posicao <= 3 ? '20px' : '15px', fontWeight: '800', color: corPosicao(j.posicao), minWidth: '36px', textAlign: 'center' }}>
                {j.posicao <= 3 ? ['🥇', '🥈', '🥉'][j.posicao - 1] : `#${j.posicao}`}
              </div>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: j.sou_eu ? 'linear-gradient(135deg, #F3984B, #e67e22)' : 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', border: j.sou_eu ? '2px solid #F3984B' : 'none',
              }}>
                {avatar(j.sexo)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: j.sou_eu ? '#5C2E7F' : '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {j.nome}
                  {j.sou_eu && <span style={{ color: '#F3984B', fontSize: '12px', marginLeft: '6px' }}>(Você)</span>}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  ⭐ Nível {j.nivel} • 📚 {j.modulos} módulos
                </div>
              </div>
              <div style={{ fontWeight: '800', fontSize: '14px', color: '#F3984B', flexShrink: 0 }}>
                {valorFiltro(j)}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', padding: '20px 0 8px', color: '#999', fontSize: '13px' }}>
            Continue aprendendo para subir no ranking! 🚀
          </div>
        </div>
      )}

      <BottomNav />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}