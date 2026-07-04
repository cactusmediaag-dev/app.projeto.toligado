import React from "react";
import {
  Camera, Phone, MessageCircle, Globe, Settings, Image,
  Search, Music, Play, Vote, Mail, MapPin, Chrome as ChromeIcon,
  Mic, Home, Aperture, Clock, Video, Calculator,
  Bluetooth, Lock, Shield, Bell, RefreshCw, KeyRound, Wifi, Cloud,
  Fingerprint, ScanFace, Eye, AlertTriangle, Landmark,
  Facebook, Instagram, Heart, ThumbsUp, Send, Plus,
  Zap, ScanBarcode, Receipt, FileText, QrCode, HeartHandshake
} from 'lucide-react';

const ICONES = {
  camera: Camera,
  telefone: Phone,
  mensagem: MessageCircle,
  navegador: Globe,
  config: Settings,
  fotos: Image,
  busca: Search,
  musica: Music,
  playstore: Play,
  etitulo: Vote,
  email: Mail,
  mapa: MapPin,
  chrome: ChromeIcon,
  mic: Mic,
  casa: Home,
  lente: Aperture,
  relogio: Clock,
  video: Video,
  calculadora: Calculator,
  bluetooth: Bluetooth,
  cadeado: Lock,
  escudo: Shield,
  sino: Bell,
  atualizar: RefreshCw,
  chave: KeyRound,
  wifi: Wifi,
  nuvem: Cloud,
  digital: Fingerprint,
  rosto: ScanFace,
  olho: Eye,
  alerta: AlertTriangle,
  banco: Landmark,
  facebook: Facebook,
  instagram: Instagram,
  coracao: Heart,
  curtir: ThumbsUp,
  enviar: Send,
  mais: Plus,
  pix: Zap,
  boleto: ScanBarcode,
  recibo: Receipt,
  extrato: FileText,
  qrcode: QrCode,
  inss: HeartHandshake,
  govbr: Landmark,
};

export default function AppIcon({
  nome,
  cor,
  corIcone = '#fff',
  tamanho = 56,
  rotulo,
  rotuloCor = '#fff',
  onClick,
  destacado = false
}) {
  const IconeComp = ICONES[nome] || Search;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        minHeight: '44px'
      }}
    >
      <div style={{
        width: `${tamanho}px`,
        height: `${tamanho}px`,
        borderRadius: `${tamanho * 0.25}px`,
        background: cor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: destacado
          ? '0 0 0 0 rgba(243,152,75,0.7)'
          : '0 2px 6px rgba(0,0,0,0.25)',
        animation: destacado ? 'pulse-border-appicon 2s infinite' : 'none'
      }}>
        <IconeComp
          size={tamanho * 0.5}
          color={corIcone}
          strokeWidth={2}
        />
      </div>
      {rotulo && (
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: rotuloCor,
          textAlign: 'center',
          textShadow: rotuloCor === '#fff' ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
          lineHeight: 1.2
        }}>
          {rotulo}
        </span>
      )}
      <style>{`
        @keyframes pulse-border-appicon {
          0% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(243, 152, 75, 0); }
          100% { box-shadow: 0 0 0 0 rgba(243, 152, 75, 0); }
        }
      `}</style>
    </div>
  );
}