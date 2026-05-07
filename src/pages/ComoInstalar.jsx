import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function ComoInstalar() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #5C2E7F 0%, #A67EC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>

      {/* Header */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 20px',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => navigate(createPageUrl('Home'))}
            style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px', color: '#fff'
            }}
          >
            ←
          </button>
          <h1 style={{
            color: '#fff', fontSize: '22px',
            fontWeight: '800', margin: 0
          }}>
            Como Instalar o App
          </h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '0 16px 40px'
      }}>

        {/* Aviso tranquilizador */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '16px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'flex', gap: '12px',
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: '32px', flexShrink: 0 }}>
              🛡️
            </span>
            <div>
              <p style={{
                color: '#fff', fontSize: '17px',
                fontWeight: '800', margin: '0 0 6px'
              }}>
                Nosso app é 100% seguro!
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '14px', margin: 0,
                lineHeight: 1.6
              }}>
                O aviso que aparece no celular é
                automático do Android para qualquer
                app instalado pelo navegador.
                Não se preocupe — o Tô Ligado é
                um projeto educacional oficial! ✅
              </p>
            </div>
          </div>
        </div>

        {/* Passo a passo */}
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '17px', fontWeight: '800',
            color: '#5C2E7F', margin: '0 0 16px'
          }}>
            📱 Como instalar no Android:
          </h2>

          {[
            {
              num: '1',
              titulo: 'Abra o Chrome',
              desc: 'Acesse o app pelo navegador Chrome do seu celular Android'
            },
            {
              num: '2',
              titulo: 'Toque nos 3 pontinhos',
              desc: 'No canto superior direito do Chrome, toque nos três pontinhos ⋮'
            },
            {
              num: '3',
              titulo: 'Toque em "Adicionar à tela inicial"',
              desc: 'Role o menu e encontre a opção "Adicionar à tela inicial" ou "Instalar app"'
            },
            {
              num: '4',
              titulo: 'Se aparecer aviso — toque em "Instalar assim mesmo"',
              desc: 'O Android pode mostrar um aviso. Isso é normal! Toque em "Instalar assim mesmo" para continuar'
            },
            {
              num: '5',
              titulo: 'Pronto! 🎉',
              desc: 'O Tô Ligado aparecerá na sua tela inicial como um app normal!'
            },
          ].map((passo, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '14px',
              marginBottom: i < 4 ? '16px' : '0',
              paddingBottom: i < 4 ? '16px' : '0',
              borderBottom: i < 4
                ? '1px solid #f0e8ff' : 'none'
            }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                color: '#fff', fontSize: '14px',
                fontWeight: '800', flexShrink: 0
              }}>
                {passo.num}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '15px', fontWeight: '700',
                  color: '#333', margin: '0 0 4px'
                }}>
                  {passo.titulo}
                </p>
                <p style={{
                  fontSize: '13px', color: '#666',
                  margin: 0, lineHeight: 1.5
                }}>
                  {passo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Por que o aviso aparece */}
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '17px', fontWeight: '800',
            color: '#5C2E7F', margin: '0 0 12px'
          }}>
            ❓ Por que aparece o aviso?
          </h2>
          <p style={{
            fontSize: '14px', color: '#555',
            margin: 0, lineHeight: 1.7,
            whiteSpace: 'pre-line'
          }}>
            {`O Android mostra este aviso automaticamente para QUALQUER aplicativo instalado pelo navegador — mesmo apps completamente seguros.\n\nÉ como uma placa de "Cuidado" numa estrada normal — ela existe para proteger, não porque há perigo real.\n\nO Tô Ligado é um projeto educacional desenvolvido para inclusão digital de idosos em Mato Grosso. Seus dados estão 100% seguros!`}
          </p>
        </div>

        {/* Botão voltar */}
        <button
          onClick={() => navigate(createPageUrl('Home'))}
          style={{
            width: '100%', padding: '18px',
            borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, #F3984B, #e67e22)',
            color: '#fff', fontSize: '17px',
            fontWeight: '800', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(243,152,75,0.4)'
          }}
        >
          ✅ Entendi! Voltar ao app
        </button>
      </div>
    </div>
  );
}