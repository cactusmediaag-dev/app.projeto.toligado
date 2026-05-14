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

      {/* Cena acolhedora — idosos conectados */}
      <div style={{
        opacity: fase >= 0 ? 1 : 0,
        transform: fase >= 0 ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Ilustração — avatares conectados */}
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          animation: 'gentleFloat 3s ease-in-out infinite'
        }}>
          {/* Círculo de fundo suave */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}/>

          {/* Avatares */}
          <div style={{
            position: 'relative',
            width: '100%', height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Idosa */}
            <div style={{
              position: 'absolute',
              left: '20px', top: '50%',
              transform: 'translateY(-50%)',
              width: '70px', height: '70px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              animation: 'gentleBounce 2s ease infinite'
            }}>
              👵
            </div>

            {/* Coração conectando */}
            <div style={{
              fontSize: '32px',
              animation: 'heartBeat 1.2s ease infinite',
              zIndex: 2
            }}>
              💜
            </div>

            {/* Idoso */}
            <div style={{
              position: 'absolute',
              right: '20px', top: '50%',
              transform: 'translateY(-50%)',
              width: '70px', height: '70px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              animation: 'gentleBounce 2s ease infinite 0.3s'
            }}>
              👴
            </div>
          </div>
        </div>

        {/* Título */}
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
          fontSize: '18px',
          fontWeight: '700',
          margin: 0,
          lineHeight: 1.4
        }}>
          Inclusão digital que<br/>
          transforma vidas 💜
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
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.05); }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}