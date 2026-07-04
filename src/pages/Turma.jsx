import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import BottomNav from '@/components/shared/BottomNav';
import AvatarUsuario from '@/components/shared/AvatarUsuario';
import PullToRefresh from '@/components/shared/PullToRefresh';
import { Trophy, Flag, Heart, Zap, Hand, AlertCircle, Send, Lightbulb, MessageSquare } from 'lucide-react';
import { nomeExibicao } from '@/components/shared/nomeExibicao';

const NOMES_MODULOS = {
  mod1: '1', mod2: '2', mod3: '3', mod4: '4', mod5: '5',
  mod6: '6', mod7: '7', mod8: '8', mod9: '9'
};

function tempoRelativo(data) {
  if (!data) return '';
  const agora = new Date();
  const d = new Date(data);
  const diff = Math.floor((agora - d) / 1000);
  if (diff < 60) return 'agora';
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `há ${Math.floor(diff / 86400)} dia${Math.floor(diff / 86400) > 1 ? 's' : ''}`;
  return `há ${Math.floor(diff / 604800)} sem`;
}

export default function Turma() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState({});
  const [posts, setPosts] = useState([]);
  const [reacoes, setReacoes] = useState({});
  const [minhasReacoes, setMinhasReacoes] = useState({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  // Composer
  const [texto, setTexto] = useState('');
  const [tipoPost, setTipoPost] = useState('texto');
  const [composerExpandido, setComposerExpandido] = useState(false);
  const [publicando, setPublicando] = useState(false);
  const [msgComposer, setMsgComposer] = useState('');
  const composerRef = useRef(null);

  // Paginação
  const [limite, setLimite] = useState(30);

  useEffect(() => { carregarTudo(); }, []);

  const carregarTudo = async () => {
    setLoading(true);
    setErro(false);
    try {
      const userId = localStorage.getItem('toligado_user_id');
      if (!userId) { navigate(createPageUrl('Entrar')); return; }

      const [usersData, postsData, reacoesData] = await Promise.all([
        base44.entities.Usuario.list(),
        base44.entities.Post.list('-created_date', 100),
        base44.entities.Reacao.list('-created_date', 200),
      ]);

      const mapUsers = {};
      usersData.forEach(u => { mapUsers[u.id] = u; });
      setUsuarios(mapUsers);

      const eu = mapUsers[userId];
      setUsuario(eu);

      setPosts(postsData || []);

      // Agregar reações: { alvo: { aplauso: n, coracao: n, forca: n, denuncia: n } }
      const agg = {};
      const minhas = {};
      (reacoesData || []).forEach(r => {
        if (!agg[r.alvo]) agg[r.alvo] = { aplauso: 0, coracao: 0, forca: 0, denuncia: 0 };
        if (agg[r.alvo][r.tipo] !== undefined) agg[r.alvo][r.tipo]++;
        if (r.usuario_id === userId) {
          minhas[`${r.alvo}:${r.tipo}`] = true;
        }
      });
      setReacoes(agg);
      setMinhasReacoes(minhas);
    } catch (e) {
      console.error('Erro Turma:', e);
      setErro(true);
    }
    setLoading(false);
  };

  // Gerar cards de conquista a partir dos dados de Usuario
  const gerarCardsConquista = () => {
    if (!usuarios || Object.keys(usuarios).length === 0) return [];
    const cards = [];
    Object.values(usuarios).forEach(u => {
      const modulos = u.modulos_completos || [];
      if (modulos.length > 0) {
        const ultimoMod = modulos[modulos.length - 1];
        const numMod = NOMES_MODULOS[ultimoMod] || ultimoMod;
        cards.push({
          id: `conquista_${u.id}_${ultimoMod}`,
          tipo: 'conquista',
          autor_id: u.id,
          autor_nome: nomeExibicao(u.nome),
          autor_usuario: u,
          modulo: numMod,
          nivel: u.nivel_atual || 1,
          data: u.updated_date,
          alvo_reacao: `${u.id}:${ultimoMod}`,
        });
      }
    });
    return cards.sort((a, b) => new Date(b.data) - new Date(a.data));
  };

  // Mesclar feed
  const feed = [...posts.map(p => ({
    ...p,
    tipo_card: 'post',
    alvo_reacao: p.id,
    autor_usuario: usuarios[p.autor_id] || { nome: nomeExibicao(p.autor_nome), sexo: 'Homem' },
    autor_nome_exibicao: nomeExibicao(p.autor_nome),
  })), ...gerarCardsConquista().map(c => ({ ...c, tipo_card: c.tipo }))]
    .filter(item => {
      // Filtrar posts com 3+ denúncias
      if (item.tipo_card === 'post' || item.tipo_card === 'texto' || item.tipo_card === 'dica') {
        const denuncias = reacoes[item.alvo_reacao]?.denuncia || 0;
        if (denuncias >= 3) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.created_date || b.data) - new Date(a.created_date || a.data));

  const handlePublicar = async () => {
    const conteudo = texto.trim();
    if (!conteudo) return;
    if (conteudo.length > 280) return;

    // Anti-flood: último post do aluno há menos de 5 min
    const meusPosts = posts.filter(p => p.autor_id === usuario.id);
    if (meusPosts.length > 0) {
      const ultimo = meusPosts.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0];
      const diffMin = (Date.now() - new Date(ultimo.created_date)) / 60000;
      if (diffMin < 5) {
        setMsgComposer(`⏳ Aguarde ${Math.ceil(5 - diffMin)} min para publicar novamente`);
        return;
      }
    }

    setPublicando(true);
    setMsgComposer('');
    try {
      const novo = await base44.entities.Post.create({
        autor_id: usuario.id,
        autor_nome: nomeExibicao(usuario.nome),
        tipo: tipoPost,
        conteudo,
      });
      setPosts(prev => [novo, ...prev]);
      setTexto('');
      setComposerExpandido(false);
      setTipoPost('texto');
      setMsgComposer('✅ Publicado!');
      setTimeout(() => setMsgComposer(''), 2000);
    } catch (e) {
      console.error('Erro ao publicar:', e);
      setMsgComposer('❌ Erro ao publicar. Tente novamente.');
    }
    setPublicando(false);
  };

  const handleReagir = async (alvo, tipo) => {
    const chave = `${alvo}:${tipo}`;
    if (minhasReacoes[chave]) return; // já reagiu

    // Atualização otimista
    setReacoes(prev => ({
      ...prev,
      [alvo]: { ...(prev[alvo] || { aplauso: 0, coracao: 0, forca: 0, denuncia: 0 }), [tipo]: (prev[alvo]?.[tipo] || 0) + 1 }
    }));
    setMinhasReacoes(prev => ({ ...prev, [chave]: true }));

    try {
      await base44.entities.Reacao.create({
        alvo,
        usuario_id: usuario.id,
        tipo,
      });
    } catch (e) {
      // Reverter em caso de erro
      setReacoes(prev => ({
        ...prev,
        [alvo]: { ...prev[alvo], [tipo]: Math.max(0, prev[alvo][tipo] - 1) }
      }));
      setMinhasReacoes(prev => { const c = { ...prev }; delete c[chave]; return c; });
      console.error('Erro ao reagir:', e);
    }
  };

  const BotoesReacao = ({ alvo }) => {
    const reagido = (tipo) => minhasReacoes[`${alvo}:${tipo}`];
    const count = (tipo) => reacoes[alvo]?.[tipo] || 0;
    const botoes = [
      { tipo: 'aplauso', icon: Hand, cor: '#F3984B', bgTint: '#FFF6EC' },
      { tipo: 'coracao', icon: Heart, cor: '#E74C3C', bgTint: '#FFF0F0' },
      { tipo: 'forca', icon: Zap, cor: '#27AE60', bgTint: '#EFFAF3' },
    ];
    return (
      <div style={{ display: 'flex', gap: '6px' }}>
        {botoes.map(b => {
          const ativo = reagido(b.tipo);
          const temCount = count(b.tipo) > 0;
          const Icon = b.icon;
          return (
            <button
              key={b.tipo}
              onClick={() => handleReagir(alvo, b.tipo)}
              disabled={ativo}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '8px 14px', borderRadius: '20px',
                border: `1px solid ${ativo ? b.cor : '#EEE'}`,
                background: ativo ? b.bgTint : temCount ? b.bgTint : 'transparent',
                color: (ativo || temCount) ? b.cor : '#777',
                fontSize: '14px', fontWeight: '700',
                cursor: ativo ? 'default' : 'pointer',
                minHeight: '40px',
                touchAction: 'manipulation',
              }}
            >
              <Icon size={18} color={(ativo || temCount) ? b.cor : '#777'} />
              <span>{count(b.tipo)}</span>
            </button>
          );
        })}
      </div>
    );
  };

  if (loading) return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #EFE9F5', borderTopColor: '#5C2E7F', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#5C2E7F', fontSize: '15px', opacity: 0.7 }}>Carregando a turma...</p>
    </div>
  );

  if (erro) return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
      <AlertCircle size={48} color="#5C2E7F" />
      <p style={{ color: '#5C2E7F', fontSize: '16px', fontWeight: '700', textAlign: 'center' }}>Não foi possível carregar o feed.</p>
      <button onClick={carregarTudo} style={{ padding: '14px 28px', borderRadius: '16px', border: 'none', background: '#5C2E7F', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', minHeight: '48px' }}>
        Tentar de novo
      </button>
      <BottomNav />
    </div>
  );

  if (!usuario) return null;

  return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', overflowX: 'hidden' }}>

      {/* HEADER */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#5C2E7F', fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>
          Turma
        </h1>
        <div onClick={() => navigate(createPageUrl('Perfil'))} style={{ cursor: 'pointer', flexShrink: 0 }}>
          <AvatarUsuario usuario={usuario} tamanho={40} />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PullToRefresh onRefresh={carregarTudo}>
          <div style={{ padding: '0 16px', paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 100px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* COMPOSER */}
            <div style={{ background: '#fff', borderRadius: '18px', padding: '16px', border: '1px solid #EFE9F5', boxShadow: '0 1px 4px rgba(92,46,127,0.06)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <AvatarUsuario usuario={usuario} tamanho={40} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <textarea
                    ref={composerRef}
                    value={texto}
                    onChange={e => setTexto(e.target.value.slice(0, 280))}
                    onFocus={() => setComposerExpandido(true)}
                    placeholder="Escreva um pensamento ou uma dica..."
                    style={{
                      width: '100%', minHeight: composerExpandido ? '80px' : '48px',
                      padding: '12px', borderRadius: '14px', border: '1px solid #EFE9F5',
                      fontSize: '18px', fontFamily: 'inherit', resize: 'none',
                      outline: 'none', boxSizing: 'border-box', color: '#333',
                      transition: 'min-height 0.2s ease',
                    }}
                  />
                  {composerExpandido && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <span style={{ fontSize: '13px', color: texto.length > 250 ? '#e74c3c' : '#999', fontWeight: '600' }}>
                          {texto.length}/280
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button onClick={() => setTipoPost('texto')} style={{
                          flex: 1, padding: '12px', borderRadius: '12px',
                          border: `2px solid ${tipoPost === 'texto' ? '#5C2E7F' : '#f0e8ff'}`,
                          background: tipoPost === 'texto' ? '#5C2E7F' : '#f9f5ff',
                          color: tipoPost === 'texto' ? '#fff' : '#5C2E7F',
                          fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          minHeight: '48px',
                        }}>
                          <MessageSquare size={16} /> Pensamento
                        </button>
                        <button onClick={() => setTipoPost('dica')} style={{
                          flex: 1, padding: '12px', borderRadius: '12px',
                          border: `2px solid ${tipoPost === 'dica' ? '#F3984B' : '#f0e8ff'}`,
                          background: tipoPost === 'dica' ? '#F3984B' : '#fff8f0',
                          color: tipoPost === 'dica' ? '#fff' : '#F3984B',
                          fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          minHeight: '48px',
                        }}>
                          <Lightbulb size={16} /> Dica
                        </button>
                      </div>
                      <button
                        onClick={handlePublicar}
                        disabled={publicando || !texto.trim()}
                        style={{
                          width: '100%', marginTop: '10px', padding: '16px',
                          borderRadius: '14px', border: 'none',
                          background: (publicando || !texto.trim()) ? '#ccc' : 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
                          color: '#fff', fontSize: '16px', fontWeight: '800',
                          cursor: (publicando || !texto.trim()) ? 'default' : 'pointer',
                          minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}
                      >
                        {publicando ? (
                          <><div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Publicando...</>
                        ) : (
                          <><Send size={18} color="#fff" /> Publicar</>
                        )}
                      </button>
                      {msgComposer && (
                        <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px', fontWeight: '700', color: msgComposer.includes('✅') ? '#27AE60' : msgComposer.includes('⏳') ? '#F3984B' : '#e74c3c', margin: '8px 0 0' }}>
                          {msgComposer}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* FEED VAZIO */}
            {feed.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 24px', color: '#5C2E7F' }}>
                <Trophy size={48} color="#B39DDB" style={{ opacity: 0.6, margin: '0 auto 12px' }} />
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>A turma está começando!</p>
                <p style={{ fontSize: '14px', opacity: 0.6 }}>Seja o primeiro a compartilhar um pensamento ou dica.</p>
              </div>
            )}

            {/* FEED */}
            {feed.slice(0, limite).map(item => {
              const isConquista = item.tipo_card === 'conquista';
              const isDica = item.tipo === 'dica';

              return (
                <div key={item.id} style={{
                  background: '#fff',
                  borderRadius: '18px', padding: '16px',
                  border: '1px solid #EFE9F5',
                  boxShadow: '0 1px 4px rgba(92,46,127,0.06)',
                  borderLeft: isConquista ? '3px solid #B39DDB' : '1px solid #EFE9F5',
                  position: 'relative',
                }}>
                  {/* Header do card */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <AvatarUsuario usuario={item.autor_usuario} tamanho={44} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <p style={{ fontWeight: '700', fontSize: '16px', color: '#222', margin: 0 }}>
                          {item.tipo_card === 'conquista' ? nomeExibicao(item.autor_nome) : item.autor_nome_exibicao}
                        </p>
                        {isConquista && (
                          <span style={{ background: '#F3EEFA', color: '#5C2E7F', fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '8px' }}>
                            Nível {item.nivel}
                          </span>
                        )}
                        {isDica && (
                          <span style={{ background: '#FFF3E0', color: '#E65100', fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Lightbulb size={12} color="#E65100" /> DICA
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                        {tempoRelativo(item.created_date || item.data)}
                      </p>
                    </div>
                    {isConquista && (
                      <span style={{ background: '#F3EEFA', color: '#5C2E7F', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <Trophy size={14} color="#5C2E7F" /> Conquista
                      </span>
                    )}
                  </div>

                  {/* Conteúdo */}
                  {isConquista ? (
                    <p style={{ fontSize: '17px', color: '#333', fontWeight: '700', margin: '0 0 12px', lineHeight: 1.4 }}>
                      Concluiu o Módulo {item.modulo}!
                    </p>
                  ) : (
                    <p style={{ fontSize: '18px', color: '#333', margin: '0 0 12px', lineHeight: 1.5, wordBreak: 'break-word' }}>
                      {item.conteudo}
                    </p>
                  )}

                  {/* Reações */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <BotoesReacao alvo={item.alvo_reacao} />
                    {!isConquista && (
                      <button
                        onClick={() => { if (confirm('Deseja denunciar este post?')) handleReagir(item.alvo_reacao, 'denuncia'); }}
                        disabled={minhasReacoes[`${item.alvo_reacao}:denuncia`]}
                        style={{
                          background: 'none', border: 'none', color: '#CCC',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          minHeight: '36px', width: '36px', padding: '4px',
                        }}
                      >
                        <Flag size={14} color={minhasReacoes[`${item.alvo_reacao}:denuncia`] ? '#999' : '#CCC'} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ver mais */}
            {feed.length > limite && (
              <button onClick={() => setLimite(prev => prev + 30)} style={{
                width: '100%', padding: '14px', borderRadius: '16px',
                border: '1px solid #EFE9F5', background: '#fff',
                color: '#5C2E7F', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                minHeight: '48px',
              }}>
                Ver mais
              </button>
            )}

          </div>
        </PullToRefresh>
      </div>

      <BottomNav />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}