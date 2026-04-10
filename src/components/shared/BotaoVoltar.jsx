import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Sons } from './GameFeedback';

const LICAO_ANTERIOR = {
  'Modulo1Licao2': 'Modulo1Licao1',
  'Modulo1Licao3': 'Modulo1Licao2',
  'Modulo1Licao4': 'Modulo1Licao3',
  'Modulo1Licao5': 'Modulo1Licao4',
  'Modulo1Celebracao': 'Modulo1Licao5',
  'Modulo2Licao2': 'Modulo2Licao1',
  'Modulo2Licao3': 'Modulo2Licao2',
  'Modulo2Licao4': 'Modulo2Licao3',
  'Modulo2Licao5': 'Modulo2Licao4',
  'Modulo2Licao6': 'Modulo2Licao5',
  'Modulo2Licao7': 'Modulo2Licao6',
  'Modulo2Licao8': 'Modulo2Licao7',
  'Modulo2Celebracao': 'Modulo2Licao8',
  'Modulo3Licao2': 'Modulo3Licao1',
  'Modulo3Licao3': 'Modulo3Licao2',
  'Modulo3Licao4': 'Modulo3Licao3',
  'Modulo3Licao5': 'Modulo3Licao4',
  'Modulo3Celebracao': 'Modulo3Licao5',
  'Modulo4Licao2': 'Modulo4Licao1',
  'Modulo4Licao3': 'Modulo4Licao2',
  'Modulo4Celebracao': 'Modulo4Licao3',
  'Modulo5Licao2': 'Modulo5Licao1',
  'Modulo5Licao3': 'Modulo5Licao2',
  'Modulo5Licao4': 'Modulo5Licao3',
  'Modulo5Licao5': 'Modulo5Licao4',
  'Modulo5Celebracao': 'Modulo5Licao5',
  'Modulo6Licao2': 'Modulo6Licao1',
  'Modulo6Licao3': 'Modulo6Licao2',
  'Modulo6Celebracao': 'Modulo6Licao3',
  'Modulo7Licao2': 'Modulo7Licao1',
  'Modulo7Licao3': 'Modulo7Licao2',
  'Modulo7Licao4': 'Modulo7Licao3',
  'Modulo7Celebracao': 'Modulo7Licao4',
  'Modulo8Licao2': 'Modulo8Licao1',
  'Modulo8Licao3': 'Modulo8Licao2',
  'Modulo8Licao4': 'Modulo8Licao3',
  'Modulo8Licao5': 'Modulo8Licao4',
  'Modulo8Licao6': 'Modulo8Licao5',
  'Modulo8Celebracao': 'Modulo8Licao6',
};

export default function BotaoVoltar({ destino, cor = '#5C2E7F' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoltar = () => {
    try { Sons.avancar(); } catch(e) {}

    if (destino) {
      navigate(createPageUrl(destino));
      return;
    }

    const path = location.pathname.replace('/', '');

    if (LICAO_ANTERIOR[path]) {
      navigate(createPageUrl(LICAO_ANTERIOR[path]));
      return;
    }

    navigate(createPageUrl('Modulos'));
  };

  return (
    <button
      onClick={handleVoltar}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#fff',
        border: `2px solid ${cor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
  );
}