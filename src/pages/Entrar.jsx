import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';

const simpleHash = async (text) => {
  const msgBuffer = new TextEncoder().encode(text + 'toligado_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const formatarCelular = (valor) => {
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7) return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 11) return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
  return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`;
};

const somenteNumeros = (valor) => valor.replace(/\D/g, '');

export default function Entrar() {
  const navigate = useNavigate();
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const eCelular = (valor) => /^\d/.test(valor.trim());

  const handleIdentificador = (valor) => {
    if (eCelular(valor)) {
      setIdentificador(formatarCelular(valor));
    } else {
      setIdentificador(valor);
    }
    setErro('');
  };

  const handleLogin = async () => {
    if (!identificador.trim() || senha.length < 6) {
      setErro('Preencha todos os campos! 😊');
      return;
    }
    setLoading(true);
    setErro('');

    const hash = await simpleHash(senha);
    let user = null;

    if (eCelular(identificador)) {
      const celularLimpo = somenteNumeros(identificador);
      const users = await base44.entities.Usuario.filter({ celular: celularLimpo });
      user = users.find(u => u.senha_hash === hash);

      if (!user) {
        setErro('Celular não encontrado ou senha incorreta. Se você se cadastrou antes, use seu nome! 😊');
        setLoading(false);
        return;
      }
    } else {
      const users = await base44.entities.Usuario.filter({ nome: identificador.trim() });
      user = users.find(u => u.senha_hash === hash);

      if (!user) {
        setErro('Nome ou senha incorretos. Tente novamente! 😊');
        setLoading(false);
        return;
      }
    }

    localStorage.setItem('toligado_user_id', user.id);
    localStorage.setItem('toligado_user_nome', user.nome);
    setLoading(false);
    navigate(createPageUrl('Home'));
  };

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #5C2E7F 0%, #7B3FA0 50%, #A67EC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0 24px',
      boxSizing: 'border-box'
    }}>

      {/* TOPO — Logo */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'calc(env(safe-area-inset-top, 44px) + 24px)',
        paddingBottom: '20px'
      }}>
        <img
          src="/logo_to_ligado.png"
          alt="Tô Ligado"
          style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '8px' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
          Tô Ligado
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0, fontWeight: '600' }}>
          Bem-vindo de volta! 👋
        </p>
      </div>

      {/* MEIO — Formulário */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '16px' }}>

        {/* Campo identificador */}
        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
            Celular ou nome completo
          </label>
          <input
            value={identificador}
            onChange={e => handleIdentificador(e.target.value)}
            placeholder="Ex: (65) 99999-9999 ou seu nome"
            inputMode={eCelular(identificador) ? 'numeric' : 'text'}
            style={{
              width: '100%', padding: '16px 18px',
              borderRadius: '16px', border: 'none',
              fontSize: '17px', outline: 'none',
              boxSizing: 'border-box',
              background: '#fff', color: '#333',
              fontWeight: '600'
            }}
          />
          {identificador.length > 0 && (
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: '6px 0 0', fontWeight: '600' }}>
              {eCelular(identificador) ? '📱 Entrando com celular' : '👤 Entrando com nome'}
            </p>
          )}
        </div>

        {/* Campo senha PIN */}
        <div>
          <label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
            Sua senha (6 números)
          </label>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{
                width: '44px', height: '52px',
                borderRadius: '12px',
                background: senha.length > i ? 'rgba(243,152,75,0.9)' : 'rgba(255,255,255,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', fontWeight: '800', color: '#5C2E7F',
                transition: 'all 0.2s ease',
                boxShadow: senha.length > i ? '0 2px 8px rgba(243,152,75,0.4)' : 'none'
              }}>
                {senha.length > i ? '●' : ''}
              </div>
            ))}
          </div>
          <input
            type="number"
            value={senha}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '');
              if (val.length <= 6) setSenha(val);
              setErro('');
            }}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}
            id="pin-input"
          />
          <div
            onClick={() => document.getElementById('pin-input')?.focus()}
            style={{ textAlign: 'center', marginTop: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer' }}
          >
            👆 Toque aqui para digitar a senha
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div style={{
            background: 'rgba(231,76,60,0.2)',
            border: '1px solid rgba(231,76,60,0.4)',
            borderRadius: '12px', padding: '10px 14px',
            color: '#fff', fontSize: '14px', fontWeight: '600'
          }}>
            ⚠️ {erro}
          </div>
        )}
      </div>

      {/* RODAPÉ — Botões */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)'
      }}>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '18px',
            borderRadius: '16px', border: 'none',
            background: loading ? 'rgba(255,255,255,0.3)' : 'linear-gradient(135deg, #F3984B, #e67e22)',
            color: '#fff', fontSize: '18px', fontWeight: '800',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(243,152,75,0.5)',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? 'Entrando...' : 'Entrar 🔓'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.25)' }}/>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '600' }}>ou</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.25)' }}/>
        </div>

        <button
          onClick={() => navigate(createPageUrl('Cadastro'))}
          style={{
            width: '100%', padding: '18px',
            borderRadius: '16px',
            border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff', fontSize: '17px', fontWeight: '800',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <span>✨</span>
          <span>Criar minha conta</span>
        </button>
      </div>
    </div>
  );
}