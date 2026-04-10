import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Sons } from './GameFeedback';

export default function BotaoVoltar({ destino = 'Home', cor = '#5C2E7F' }) {
  const navigate = useNavigate();

  const handleVoltar = () => {
    try { Sons.avancar(); } catch(e) {}
    navigate(createPageUrl(destino));
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
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={cor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
  );
}