import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Splash() {
  const navigate = useNavigate();
  const [fase, setFase] = useState(0); // 0=logo, 1=texto, 2=carregando

  useEffect(() => {
    // Fases progressivas para idosos — visual calmo e claro
    const t1 = setTimeout(() => setFase(1), 600);
    const t2 = setTimeout(() => setFase(2), 1400);
    const t3 = setTimeout(() => {
      const userId = localStorage.getItem("toligado_user_id");
      navigate(userId ? createPageUrl("Home") : createPageUrl("Entrar"));
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(160deg, #5C2E7F 0%, #7B3FA0 50%, #A67EC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '32px',
      // SEM pointer-events bloqueados, SEM z-index desnecessário
    }}>

      {/* Logo — transição suave via CSS, sem framer-motion */}
      <div style={{
        opacity: fase >= 0 ? 1 : 0,
        transform: fase >= 0 ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <img
          src="/logo_to_ligado.png"
          alt="Tô Ligado"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            borderRadius: '28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}
          onError={e => {
            // Fallback se logo não carregar: emoji amigável
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback de logo */}
        <div style={{
          display: 'none',
          width: '120px', height: '120px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '28px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px'
        }}>📱</div>

        <h1 style={{
          color: '#fff',
          fontSize: '36px',
          fontWeight: '900',
          margin: 0,
          letterSpacing: '-0.5px',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          Tô Ligado
        </h1>
      </div>

      {/* Subtítulo — aparece depois */}
      <div style={{
        opacity: fase >= 1 ? 1 : 0,
        transform: fase >= 1 ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: '20px',
          fontWeight: '700',
          margin: 0,
          lineHeight: 1.4
        }}>
          Aprender nunca teve idade! 🎓
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '15px',
          fontWeight: '600',
          margin: '8px 0 0'
        }}>
          Seu app de educação digital
        </p>
      </div>

      {/* Indicador de carregamento — simples e legível */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(env(safe-area-inset-bottom, 20px) + 40px)',
        opacity: fase >= 2 ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Barra de progresso — mais acessível que bolinhas */}
        <div style={{
          width: '160px',
          height: '6px',
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: '#F3984B',
            borderRadius: '3px',
            animation: 'splashProgress 1.4s ease forwards'
          }} />
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '14px',
          fontWeight: '600',
          margin: 0
        }}>
          Carregando...
        </p>
      </div>

      <style>{`
        @keyframes splashProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}