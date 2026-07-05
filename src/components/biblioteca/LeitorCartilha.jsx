import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2 } from 'lucide-react';
import VozSistema from '@/components/shared/AudioSystem';
import ValidacaoQuiz from '@/components/simulador/ValidacaoQuiz';
import { base44 } from '@/api/base44Client';

export default function LeitorCartilha({ cartilha, usuario, onConcluir, onVoltar }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [concluida, setConcluida] = useState(false);
  const totalPaginas = cartilha.paginas.length;
  const pagina = cartilha.paginas[paginaAtual];
  const jaConcluida = (usuario?.cartilhas_completas || []).includes(cartilha.id);

  useEffect(() => {
    const t = setTimeout(() => {
      VozSistema.falar(pagina.audio, true);
    }, 200);
    return () => { clearTimeout(t); VozSistema.parar(); };
  }, [paginaAtual]);

  useEffect(() => () => VozSistema.parar(), []);

  const irProxima = () => {
    if (paginaAtual < totalPaginas - 1) {
      setPaginaAtual(paginaAtual + 1);
    } else {
      setMostrarQuiz(true);
    }
  };

  const irAnterior = () => {
    if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
  };

  const repetirAudio = () => {
    VozSistema.falarForcado(pagina.audio);
  };

  const handleConcluirQuiz = async () => {
    setMostrarQuiz(false);

    if (jaConcluida || concluida) {
      onConcluir(true);
      return;
    }

    try {
      const novasMoedas = (usuario.moedas || 0) + 20;
      const novoXp = (usuario.xp_total || 0) + 25;
      const cartilhasAtuais = usuario.cartilhas_completas || [];

      await base44.entities.Usuario.update(usuario.id, {
        moedas: novasMoedas,
        xp_total: novoXp,
        cartilhas_completas: [...cartilhasAtuais, cartilha.id]
      });

      setConcluida(true);
    } catch (e) {
      console.error('Erro ao salvar conclusão:', e);
    }

    onConcluir(true);
  };

  if (mostrarQuiz) {
    return (
      <ValidacaoQuiz
        pergunta={cartilha.quiz.pergunta}
        opcoes={cartilha.quiz.opcoes}
        respostaCorreta={cartilha.quiz.respostaCorreta}
        onConcluir={handleConcluirQuiz}
        moedas={20}
      />
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#F6F3FA', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 16px 12px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#fff',
        borderBottom: '1px solid #EFE9F5'
      }}>
        <button
          onClick={() => { VozSistema.parar(); onVoltar(); }}
          style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: '#F6F3FA', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent'
          }}
        >
          <ArrowLeft size={22} color="#5C2E7F" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '11px', color: '#999', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Página {paginaAtual + 1} de {totalPaginas}
          </p>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#5C2E7F', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {cartilha.titulo}
          </h2>
        </div>
        <button
          onClick={repetirAudio}
          style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: '#F6F3FA', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent'
          }}
        >
          <Volume2 size={22} color="#5C2E7F" strokeWidth={2.5} />
        </button>
      </div>

      {/* Barra de progresso */}
      <div style={{ padding: '8px 16px', background: '#fff', flexShrink: 0 }}>
        <div style={{ height: '6px', background: '#EFE9F5', borderRadius: '3px', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: cartilha.cor, borderRadius: '3px' }}
            initial={{ width: 0 }}
            animate={{ width: `${((paginaAtual + 1) / totalPaginas) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Conteúdo da página */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        overflowY: 'auto'
      }}>
        <motion.div
          key={paginaAtual}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Ilustração */}
          <div style={{
            width: '120px', height: '120px', borderRadius: '50%',
            background: pagina.corFundo,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '64px', marginBottom: '24px', flexShrink: 0
          }}>
            {pagina.ilustracao}
          </div>

          <h3 style={{
            fontSize: '22px', fontWeight: '900', color: '#333',
            margin: '0 0 16px', lineHeight: 1.3
          }}>
            {pagina.titulo}
          </h3>

          <p style={{
            fontSize: '20px', color: '#333', lineHeight: 1.6,
            margin: 0, fontWeight: '500'
          }}>
            {pagina.texto}
          </p>
        </motion.div>
      </div>

      {/* Navegação */}
      <div style={{
        padding: '12px 16px calc(env(safe-area-inset-bottom, 20px) + 12px)',
        background: '#fff',
        borderTop: '1px solid #EFE9F5',
        display: 'flex',
        gap: '12px',
        flexShrink: 0
      }}>
        <button
          onClick={irAnterior}
          disabled={paginaAtual === 0}
          style={{
            flex: 1, padding: '18px', borderRadius: '16px',
            border: '1px solid #EFE9F5', background: '#fff',
            color: paginaAtual === 0 ? '#CCC' : '#5C2E7F',
            fontSize: '16px', fontWeight: '800', cursor: paginaAtual === 0 ? 'default' : 'pointer',
            minHeight: '56px',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent'
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={irProxima}
          style={{
            flex: 2, padding: '18px', borderRadius: '16px',
            border: 'none', background: cartilha.cor,
            color: '#fff', fontSize: '16px', fontWeight: '800',
            cursor: 'pointer', minHeight: '56px',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
            boxShadow: `0 4px 16px ${cartilha.cor}40`
          }}
        >
          {paginaAtual === totalPaginas - 1 ? '✋ Responder pergunta' : 'Próxima →'}
        </button>
      </div>
    </div>
  );
}