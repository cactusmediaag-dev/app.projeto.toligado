import React from 'react';
import { Sun, Flower2, Star, Heart, Music, Bird, Coffee, Sprout } from 'lucide-react';

export const AVATARES = [
  { id: 'avatar_1', icon: Sun, gradient: 'linear-gradient(135deg, #5C2E7F, #9B59B6)' },
  { id: 'avatar_2', icon: Flower2, gradient: 'linear-gradient(135deg, #F3984B, #e67e22)' },
  { id: 'avatar_3', icon: Star, gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)' },
  { id: 'avatar_4', icon: Heart, gradient: 'linear-gradient(135deg, #2471A3, #5DADE2)' },
  { id: 'avatar_5', icon: Music, gradient: 'linear-gradient(135deg, #8E44AD, #D7BDE2)' },
  { id: 'avatar_6', icon: Bird, gradient: 'linear-gradient(135deg, #16A085, #1ABC9C)' },
  { id: 'avatar_7', icon: Coffee, gradient: 'linear-gradient(135deg, #D35400, #E67E22)' },
  { id: 'avatar_8', icon: Sprout, gradient: 'linear-gradient(135deg, #1E8449, #58D68D)' },
];

export default function AvatarUsuario({ usuario = {}, tamanho = 48, style }) {
  const size = tamanho;
  const iconSize = Math.round(tamanho * 0.5);
  const fontSize = Math.round(tamanho * 0.55);

  // Prioridade: foto_url → avatar → fallback (emoji por sexo)
  if (usuario.foto_url) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%', overflow: 'hidden',
        background: '#f0e8ff', flexShrink: 0, ...style
      }}>
        <img src={usuario.foto_url} alt="Foto de perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  if (usuario.avatar) {
    const av = AVATARES.find(a => a.id === usuario.avatar);
    if (av) {
      const Icon = av.icon;
      return (
        <div style={{
          width: size, height: size, borderRadius: '50%',
          background: av.gradient, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...style
        }}>
          <Icon size={iconSize} color="#fff" strokeWidth={2} />
        </div>
      );
    }
  }

  // Fallback: emoji por sexo (mesmo visual de hoje)
  const emoji = usuario.sexo === 'Mulher' ? '👩' : '👨';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: `${fontSize}px`, ...style
    }}>
      {emoji}
    </div>
  );
}