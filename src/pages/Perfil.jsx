import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/shared/BottomNav';

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const userId = localStorage.getItem('toligado_user_id');
      if (!userId) { navigate(createPageUrl('Entrar')); return; }
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length === 0) { navigate(createPageUrl('Entrar')); return; }
      setUsuario(users[0]);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const calcularIdade = (dataNasc) => {
    if (!dataNasc) return null;
    const nasc = new Date(dataNasc + 'T00:00:00');
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  const calcularDiasAniversario = (dataNasc) => {
    if (!dataNasc) return null;
    const nasc = new Date(dataNasc + 'T00:00:00');
    const hoje = new Date();
    const proximo = new Date(hoje.getFullYear(), nasc.getMonth(), nasc.getDate());
    if (proximo < hoje) proximo.setFullYear(hoje.getFullYear() + 1);
    return Math.ceil((proximo - hoje) / (1000 * 60 * 60 * 24));
  };

  const formatarData = (data) => {
    if (!data) return '—';
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  const formatarDataCurta = (data) => {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const sair = () => {
    localStorage.removeItem('toligado_user_id');
    localStorage.removeItem('toligado_user_nome');
    navigate(createPageUrl('Entrar'));
  };

  const excluirConta = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    try {
      await base44.entities.Usuario.delete(usuario.id);
      localStorage.removeItem('toligado_user_id');
      localStorage.removeItem('toligado_user_nome');
      navigate(createPageUrl('Entrar'));
    } catch (e) {
      console.error('Erro ao excluir conta:', e);
    }
  };

  if (loading) return (
    <div style={{ height: '100dvh', background: 'linear-gradient(160deg, #5C2E7F, #A67EC8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', color: '#fff' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: '16px', opacity: 0.8 }}>Carregando perfil...</p>
    </div>
  );

  if (!usuario) return null;

  const idade = calcularIdade(usuario.data_nascimento);
  const diasAniv = calcularDiasAniversario(usuario.data_nascimento);
  const avatar = usuario.sexo === 'Mulher' ? '👩' : '👨';
  const modulos = (usuario.modulos_completos || []).length;
  const anivHoje = diasAniv === 0 || diasAniv === 365;

  return (
    <div style={{ height: '100dvh', background: 'linear-gradient(160deg, #5C2E7F 0%, #A67EC8 100%)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* HEADER com avatar */}
      <div style={{ flex: '0 0 auto', padding: '52px 24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          {avatar}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
            {usuario.nome}
          </h1>
          {idade && (
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0 }}>
              {idade} anos • {usuario.sexo}
            </p>
          )}
        </div>
        {diasAniv !== null && (
          <div style={{ background: anivHoje ? 'linear-gradient(135deg, #F3984B, #e67e22)' : 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>{anivHoje ? '🎂' : '🎁'}</span>
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>
              {anivHoje ? 'Feliz Aniversário! 🎉' : diasAniv === 1 ? 'Amanhã é seu aniversário! 🥳' : `Aniversário em ${diasAniv} dias`}
            </span>
          </div>
        )}
      </div>

      {/* CONTEÚDO SCROLLÁVEL */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Stats do jogo */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { icon: '⭐', valor: usuario.nivel_atual || 1, label: 'Nível' },
            { icon: '🪙', valor: usuario.moedas || 0, label: 'Moedas' },
            { icon: '📚', valor: modulos, label: 'Módulos' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '12px 8px', background: '#f8f5ff', borderRadius: '14px' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#5C2E7F', lineHeight: 1 }}>{s.valor}</div>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '4px', fontWeight: '600' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Informações pessoais */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: '#5C2E7F' }}>👤 Informações Pessoais</h3>
          {[
            { icon: '📛', label: 'Nome completo', valor: usuario.nome },
            { icon: '🎂', label: 'Data de nascimento', valor: formatarData(usuario.data_nascimento) },
            { icon: '🎁', label: 'Próximo aniversário', valor: diasAniv === 0 ? '🎉 Hoje!' : diasAniv === 1 ? 'Amanhã! 🥳' : diasAniv !== null ? `Em ${diasAniv} dias` : '—' },
            { icon: '👤', label: 'Gênero', valor: usuario.sexo || '—' },
            { icon: '📅', label: 'Membro desde', valor: formatarDataCurta(usuario.created_date) },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: i < arr.length - 1 ? '16px' : '0', marginBottom: i < arr.length - 1 ? '16px' : '0', borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ width: '40px', height: '40px', background: '#f0e8ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#999', fontWeight: '600', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontSize: '15px', color: '#333', fontWeight: '700' }}>{item.valor}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progresso no jogo */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: '#5C2E7F' }}>🎮 Progresso no Jogo</h3>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>Módulos concluídos</span>
              <span style={{ fontSize: '13px', color: '#5C2E7F', fontWeight: '800' }}>{modulos}/8</span>
            </div>
            <div style={{ height: '10px', background: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(modulos / 8) * 100}%`, background: 'linear-gradient(90deg, #5C2E7F, #F3984B)', borderRadius: '5px', transition: 'width 0.5s ease' }} />
            </div>
          </div>
          {modulos === 0 && (
            <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>Complete módulos para ver seu histórico! 📚</p>
          )}
          {modulos > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {(usuario.modulos_completos || []).map((m, i) => (
                <div key={i} style={{ background: '#f0e8ff', borderRadius: '8px', padding: '5px 10px', fontSize: '12px', color: '#5C2E7F', fontWeight: '700' }}>
                  ✅ {m}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões de conta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={sair} style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid rgba(231,76,60,0.3)', background: 'rgba(231,76,60,0.08)', color: '#e74c3c', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            🚪 Sair da conta
          </button>
          <button onClick={excluirConta} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: confirmDelete ? '2px solid #e74c3c' : '1px solid #eee', background: confirmDelete ? 'rgba(231,76,60,0.1)' : '#fafafa', color: confirmDelete ? '#e74c3c' : '#999', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            🗑️ {confirmDelete ? 'Confirmar exclusão da conta' : 'Excluir conta'}
          </button>
          {confirmDelete && (
            <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <BottomNav />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}