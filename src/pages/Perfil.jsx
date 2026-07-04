import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import BottomNav from '@/components/shared/BottomNav';
import AvatarUsuario, { AVATARES } from '@/components/shared/AvatarUsuario';
import { Camera, Trash2, X, Check } from 'lucide-react';

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [novoCelular, setNovoCelular] = useState('');
  const [salvandoCelular, setSalvandoCelular] = useState(false);
  const [celularPerfilErro, setCelularPerfilErro] = useState('');
  const [modalFoto, setModalFoto] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const fileInputRef = useRef(null);

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

  const salvarCelular = async () => {
    const limpo = novoCelular.replace(/\D/g, '');
    if (limpo.length !== 11) {
      setCelularPerfilErro('Digite um celular válido com DDD!');
      return;
    }
    setSalvandoCelular(true);
    const existentes = await base44.entities.Usuario.filter({ celular: limpo });
    if (existentes.length > 0) {
      setCelularPerfilErro('Este celular já está cadastrado!');
      setSalvandoCelular(false);
      return;
    }
    await base44.entities.Usuario.update(usuario.id, { celular: limpo });
    setUsuario(prev => ({ ...prev, celular: limpo }));
    setNovoCelular('');
    setCelularPerfilErro('');
    setSalvandoCelular(false);
    alert('✅ Celular cadastrado! Agora você pode entrar com seu número.');
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

  const redimensionarImagem = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 256, 256);
          canvas.toBlob(resolve, 'image/jpeg', 0.8);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg('');
    try {
      const blob = await redimensionarImagem(file);
      const resizedFile = new File([blob], 'foto.jpg', { type: 'image/jpeg' });
      const { file_url } = await base44.integrations.Core.UploadFile({ file: resizedFile });
      await base44.entities.Usuario.update(usuario.id, { foto_url: file_url, avatar: null });
      setUsuario(prev => ({ ...prev, foto_url: file_url, avatar: null }));
      setUploadMsg('✅ Foto salva com sucesso!');
      setTimeout(() => { setModalFoto(false); setUploadMsg(''); }, 1200);
    } catch (err) {
      console.error('Erro upload:', err);
      setUploadMsg('Não foi possível enviar a foto. Tente escolher um avatar!');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSalvarAvatar = async (avatarId) => {
    try {
      await base44.entities.Usuario.update(usuario.id, { avatar: avatarId, foto_url: null });
      setUsuario(prev => ({ ...prev, avatar: avatarId, foto_url: null }));
      setModalFoto(false);
    } catch (err) {
      console.error('Erro ao salvar avatar:', err);
      setUploadMsg('Erro ao salvar avatar. Tente novamente.');
    }
  };

  const handleRemoverFoto = async () => {
    try {
      await base44.entities.Usuario.update(usuario.id, { foto_url: null, avatar: null });
      setUsuario(prev => ({ ...prev, foto_url: null, avatar: null }));
      setModalFoto(false);
    } catch (err) {
      console.error('Erro ao remover foto:', err);
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
  const modulos = (usuario.modulos_completos || []).length;
  const anivHoje = diasAniv === 0 || diasAniv === 365;

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(160deg, #5C2E7F 0%, #A67EC8 100%)', overflowX: 'hidden' }}>

      {/* HEADER com avatar */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <AvatarUsuario usuario={usuario} tamanho={112} style={{ border: '3px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />
        <button onClick={() => setModalFoto(true)} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '20px', padding: '8px 18px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', minHeight: '44px' }}>
          <Camera size={16} color="#fff" /> Mudar foto
        </button>
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

      {/* CONTEÚDO */}
      <div style={{ padding: '0 16px', paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 100px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Banner migração celular */}
        {!usuario.celular && (
          <div style={{ background: 'linear-gradient(135deg, #F3984B, #e67e22)', borderRadius: '20px', padding: '16px', border: '2px solid rgba(255,255,255,0.3)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px', flexShrink: 0 }}>📱</span>
              <div>
                <p style={{ color: '#fff', fontSize: '15px', fontWeight: '800', margin: '0 0 4px' }}>Cadastre seu celular!</p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                  Com o celular cadastrado, você entra no app sem precisar lembrar o nome. Muito mais fácil! 😊
                </p>
              </div>
            </div>
            {!salvandoCelular ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={novoCelular}
                  onChange={e => {
                    const n = e.target.value.replace(/\D/g, '');
                    if (n.length <= 2) setNovoCelular(n);
                    else if (n.length <= 7) setNovoCelular(`(${n.slice(0,2)}) ${n.slice(2)}`);
                    else if (n.length <= 11) setNovoCelular(`(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`);
                    else setNovoCelular(`(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7,11)}`);
                    setCelularPerfilErro('');
                  }}
                  placeholder="(65) 99999-9999"
                  inputMode="numeric"
                  maxLength={16}
                  style={{ flex: 1, padding: '12px 14px', borderRadius: '12px', border: 'none', fontSize: '16px', outline: 'none', background: '#fff', color: '#333', fontWeight: '600' }}
                />
                <button
                  onClick={salvarCelular}
                  style={{ padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#fff', color: '#F3984B', fontSize: '14px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Salvar 💾
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#fff', fontSize: '14px' }}>⏳ Salvando...</div>
            )}
            {celularPerfilErro && (
              <p style={{ color: '#fff', fontSize: '12px', marginTop: '8px', fontWeight: '600', margin: '8px 0 0' }}>⚠️ {celularPerfilErro}</p>
            )}
          </div>
        )}

        {/* Celular cadastrado — exibir mascarado */}
        {usuario.celular && (
          <div style={{ background: '#fff', borderRadius: '20px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: '#f0e8ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📱</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', color: '#999', fontWeight: '600', margin: '0 0 2px' }}>Celular (login)</p>
                <p style={{ fontSize: '15px', color: '#333', fontWeight: '700', margin: 0 }}>
                  ({usuario.celular.slice(0,2)}) {usuario.celular.slice(2,3)}****-{usuario.celular.slice(-4)}
                </p>
              </div>
              <span style={{ background: '#e8f8f0', color: '#27AE60', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '10px' }}>✅ Ativo</span>
            </div>
          </div>
        )}

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
              <span style={{ fontSize: '13px', color: '#5C2E7F', fontWeight: '800' }}>{modulos}/9</span>
            </div>
            <div style={{ height: '10px', background: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(modulos / 9) * 100}%`, background: 'linear-gradient(90deg, #5C2E7F, #F3984B)', borderRadius: '5px', transition: 'width 0.5s ease' }} />
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
          <button onClick={() => navigate(createPageUrl('ComoInstalar'))} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid rgba(92,46,127,0.2)', background: '#f9f5ff', color: '#5C2E7F', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '2px' }}>
            📱 Como instalar o app
          </button>
          <button onClick={() => navigate('/PoliticaPrivacidade')} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #eee', background: '#fafafa', color: '#5C2E7F', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            ⚖️ Política de Privacidade
          </button>
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

      {/* Modal Mudar Foto */}
      {modalFoto && (
        <div onClick={() => !uploading && setModalFoto(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '480px', maxHeight: '85dvh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#5C2E7F' }}>Editar foto</h3>
              <button onClick={() => setModalFoto(false)} style={{ background: '#f5f0ff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} color="#5C2E7F" />
              </button>
            </div>

            {/* Opção: Foto */}
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #f0e8ff', background: '#f9f5ff', color: '#5C2E7F', fontSize: '15px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', minHeight: '56px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#5C2E7F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Camera size={22} color="#fff" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: '800' }}>Tirar ou escolher foto</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>Da câmera ou galeria</p>
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />

            {uploading && (
              <div style={{ textAlign: 'center', padding: '16px', color: '#5C2E7F', fontSize: '14px', fontWeight: '600' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid #f0e8ff', borderTopColor: '#5C2E7F', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 8px' }} />
                Enviando foto...
              </div>
            )}
            {uploadMsg && !uploading && (
              <div style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '700', color: uploadMsg.includes('sucesso') ? '#27AE60' : '#e74c3c' }}>
                {uploadMsg}
              </div>
            )}

            {!uploading && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: '#f0e8ff' }} />
                  <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>ou escolha um avatar</span>
                  <div style={{ flex: 1, height: '1px', background: '#f0e8ff' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {AVATARES.map(av => {
                    const Icon = av.icon;
                    const selecionado = usuario.avatar === av.id;
                    return (
                      <button key={av.id} onClick={() => handleSalvarAvatar(av.id)} style={{ position: 'relative', borderRadius: '50%', border: selecionado ? '3px solid #27AE60' : '3px solid transparent', padding: 0, cursor: 'pointer', background: 'none', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: av.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={28} color="#fff" strokeWidth={2} />
                        </div>
                        {selecionado && (
                          <div style={{ position: 'absolute', bottom: '-2px', right: 'calc(50% - 34px)', width: '22px', height: '22px', borderRadius: '50%', background: '#27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                            <Check size={12} color="#fff" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {(usuario.foto_url || usuario.avatar) && (
                  <button onClick={handleRemoverFoto} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid rgba(231,76,60,0.3)', background: 'rgba(231,76,60,0.08)', color: '#e74c3c', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Trash2 size={18} color="#e74c3c" /> Remover foto
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <BottomNav />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}