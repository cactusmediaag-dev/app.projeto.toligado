import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PullToRefresh from '@/components/shared/PullToRefresh';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';

export default function Ranking() {
  const navigate = useNavigate();
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('moedas');
  const [minhaPos, setMinhaPos] = useState(null);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    carregarRanking();
  }, [filtro]);

  const carregarRanking = async () => {
    setLoading(true);
    setAnimando(false);
    try {
      const userId = localStorage.getItem('toligado_user_id');
      const todos = await base44.entities.Usuario.list(`-${filtro}`);

      const formatados = todos
        .filter(u => u.nome)
        .map((u, i) => ({
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
      const eu = formatados.find(j => j.sou_eu);
      setMinhaPos(eu || null);

      setTimeout(() => setAnimando(true), 100);

      if (eu && eu.posicao > 3) {
        setTimeout(() => {
          document.getElementById(`jogador-${eu.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 700);
      }
    } catch (e) {
      console.error('Erro ranking:', e);
    }
    setLoading(false);
  };

  const labelFiltro = (j) => {
    if (filtro === 'moedas') return `🪙 ${j.moedas}`;
    if (filtro === 'nivel_atual') return `⭐ Nível ${j.nivel}`;
    return `📚 ${j.modulos}`;
  };

  const avatar = (sexo) => sexo === 'Mulher' ? '👩' : '👨';

  const corPodio = (pos) => {
    if (pos === 1) return { bg: 'linear-gradient(135deg,#FFD700,#FFA500)', border: '#FFD700', glow: 'rgba(255,215,0,0.6)' };
    if (pos === 2) return { bg: 'linear-gradient(135deg,#C0C0C0,#A0A0A0)', border: '#C0C0C0', glow: 'rgba(192,192,192,0.5)' };
    return { bg: 'linear-gradient(135deg,#CD7F32,#A0522D)', border: '#CD7F32', glow: 'rgba(205,127,50,0.5)' };
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #5C2E7F 0%, #7B3FA0 40%, #A67EC8 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* HEADER */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 8px) 20px 16px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <button onClick={() => navigate(createPageUrl('Home'))} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#fff', flexShrink: 0
          }}>←</button>
          <div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>
              🏆 Ranking
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0, fontWeight: '600' }}>
              {jogadores.length} participantes
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { key: 'moedas', label: '🪙 Moedas' },
            { key: 'nivel_atual', label: '⭐ Nível' },
            { key: 'modulos_completos', label: '📚 Módulos' },
          ].map(f => (
            <button key={f.key} onClick={() => setFiltro(f.key)} style={{
              padding: '8px 18px', borderRadius: '20px', border: 'none',
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              fontWeight: '800', fontSize: '13px',
              background: filtro === f.key ? '#F3984B' : 'rgba(255,255,255,0.2)',
              color: '#fff',
              transform: filtro === f.key ? 'scale(1.05)' : 'scale(1)',
              boxShadow: filtro === f.key ? '0 4px 12px rgba(243,152,75,0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                animation: `bounce 0.5s ease ${i * 0.15}s infinite alternate`
              }} />
            ))}
          </div>
          <p style={{ color: '#fff', fontSize: '15px', opacity: 0.8 }}>Carregando ranking...</p>
        </div>
      )}

      {/* Conteúdo */}
      {!loading && (
        <div style={{ flex: 1, overflow: 'hidden' }}>
        <PullToRefresh onRefresh={carregarRanking}>
        <div style={{ paddingBottom: '90px' }}>

          {jogadores.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#fff' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌱</div>
              <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Seja o primeiro!</p>
              <p style={{ fontSize: '14px', opacity: 0.7 }}>Complete módulos para aparecer no ranking! 🚀</p>
            </div>
          )}

          {jogadores.length >= 1 && (
            <div style={{ padding: '8px 16px 24px' }}>

              {/* PÓDIO TOP 3 */}
              {jogadores.length >= 3 && (
                <div style={{
                  display: 'flex', alignItems: 'flex-end',
                  justifyContent: 'center', gap: '8px', marginBottom: '20px'
                }}>
                  {[jogadores[1], jogadores[0], jogadores[2]].map((j, idx) => {
                    const posReal = [2, 1, 3][idx];
                    const alturas = [65, 90, 50];
                    const tamanhos = [60, 72, 54];
                    const medals = ['🥈', '🥇', '🥉'];
                    const cor = corPodio(posReal);

                    return (
                      <div key={j.id} style={{
                        flex: 1, textAlign: 'center',
                        animation: animando ? `slideUp 0.5s ease ${idx * 0.1}s both` : 'none'
                      }}>
                        <div style={{
                          width: `${tamanhos[idx]}px`, height: `${tamanhos[idx]}px`,
                          borderRadius: '50%',
                          background: j.sou_eu ? 'linear-gradient(135deg,#F3984B,#e67e22)' : cor.bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 6px',
                          fontSize: `${tamanhos[idx] * 0.45}px`,
                          border: `3px solid ${cor.border}`,
                          boxShadow: `0 0 20px ${cor.glow}`,
                          position: 'relative'
                        }}>
                          {avatar(j.sexo)}
                          <div style={{ position: 'absolute', top: '-8px', right: '-4px', fontSize: posReal === 1 ? '22px' : '18px' }}>
                            {medals[idx]}
                          </div>
                        </div>
                        <p style={{
                          color: j.sou_eu ? '#FFD700' : '#fff',
                          fontSize: posReal === 1 ? '14px' : '12px',
                          fontWeight: '800', margin: '0 0 4px'
                        }}>
                          {j.nome.split(' ')[0]}{j.sou_eu ? ' ⭐' : ''}
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: '700', margin: '0 0 6px' }}>
                          {labelFiltro(j)}
                        </p>
                        <div style={{
                          height: `${alturas[idx]}px`, background: cor.bg,
                          borderRadius: '12px 12px 0 0', boxShadow: `0 -4px 16px ${cor.glow}`
                        }} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Minha posição fora do top 3 */}
              {minhaPos && minhaPos.posicao > 3 && (
                <div style={{
                  background: 'rgba(243,152,75,0.25)', borderRadius: '18px',
                  padding: '14px 16px', border: '2px solid #F3984B',
                  marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#FFD700', minWidth: '44px', textAlign: 'center' }}>
                    #{minhaPos.posicao}
                  </div>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#F3984B,#e67e22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', flexShrink: 0, border: '2px solid #FFD700'
                  }}>
                    {avatar(minhaPos.sexo)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: '800', fontSize: '15px', margin: '0 0 2px' }}>
                      {minhaPos.nome.split(' ')[0]} — Você! ⭐
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0 }}>
                      🪙 {minhaPos.moedas} • ⭐ Nível {minhaPos.nivel} • 📚 {minhaPos.modulos} módulos
                    </p>
                  </div>
                </div>
              )}

              {/* Lista completa */}
              <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 16px 8px', borderBottom: '1px solid #f0e8ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#5C2E7F', margin: 0 }}>
                    Todos os participantes
                  </p>
                  <span style={{ background: '#f0e8ff', color: '#5C2E7F', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700' }}>
                    {jogadores.length} pessoas
                  </span>
                </div>

                {jogadores.map((j, i) => (
                  <div
                    key={j.id}
                    id={`jogador-${j.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px',
                      background: j.sou_eu
                        ? 'linear-gradient(135deg,rgba(92,46,127,0.08),rgba(243,152,75,0.08))'
                        : i % 2 === 0 ? '#fff' : '#fafafa',
                      borderBottom: '1px solid #f5f0ff',
                      borderLeft: j.sou_eu ? '4px solid #F3984B' : '4px solid transparent',
                      animation: animando ? `slideIn 0.3s ease ${i * 0.04}s both` : 'none',
                    }}
                  >
                    <div style={{
                      minWidth: '36px', textAlign: 'center',
                      fontWeight: '900', fontSize: '16px',
                      color: j.posicao <= 3 ? ['#FFD700','#C0C0C0','#CD7F32'][j.posicao-1] : '#ccc'
                    }}>
                      {j.posicao <= 3 ? ['🥇','🥈','🥉'][j.posicao-1] : `#${j.posicao}`}
                    </div>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: j.sou_eu
                        ? 'linear-gradient(135deg,#F3984B,#e67e22)'
                        : 'linear-gradient(135deg,#5C2E7F,#9B59B6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', border: j.sou_eu ? '2px solid #F3984B' : 'none'
                    }}>
                      {avatar(j.sexo)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: '800', fontSize: '14px',
                        color: j.sou_eu ? '#5C2E7F' : '#333',
                        margin: '0 0 2px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {j.nome}
                        {j.sou_eu && <span style={{ color: '#F3984B', fontSize: '11px', marginLeft: '6px' }}>(Você)</span>}
                      </p>
                      <p style={{ fontSize: '11px', color: '#aaa', margin: 0, fontWeight: '600' }}>
                        ⭐ Nível {j.nivel} • 📚 {j.modulos} módulos
                      </p>
                    </div>
                    <div style={{ fontWeight: '900', fontSize: '15px', color: j.sou_eu ? '#F3984B' : '#5C2E7F', flexShrink: 0 }}>
                      {labelFiltro(j)}
                    </div>
                  </div>
                ))}

                <div style={{ padding: '16px', textAlign: 'center', background: '#f9f5ff' }}>
                  <p style={{ color: '#5C2E7F', fontSize: '13px', fontWeight: '700', margin: 0 }}>
                    🚀 Continue aprendendo para subir no ranking!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        </PullToRefresh>
        </div>
      )}

      <BottomNav />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}