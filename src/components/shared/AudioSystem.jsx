// Sistema de voz — ElevenLabs + fallback robusto
// Funciona em browser E APK Android

const ELEVENLABS_CONFIG = {
  voiceId: 'qPfM2laM0pRL4rrZtBGl', // Sandro Dutra — PT-BR
  modelId: 'eleven_multilingual_v2',
  apiUrl: 'https://api.elevenlabs.io/v1/text-to-speech',
};

// Cache local — limpa ao trocar voz
const audioCache = new Map();

const VozSistema = {

  apiKey: 'sk_9a19343954a7c36d8f6f2f0efbe085d1440e48532e45fcf6',
  audioAtual: null,
  usuarioInteragiu: false,
  _textosPendentes: [],
  _chamadaAtual: 0,

  setApiKey(key) {
    this.apiKey = key;
  },

  marcarInteracao() {
    this.usuarioInteragiu = true;
  },

  temApiKey() {
    return true;
  },

  limparTexto(texto) {
    return texto
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/[⚡🔊📱💡🔋🪙✅❌🎉🏆]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  async falar(texto, forcado = false) {
    console.log('[VOZ] falar chamado:', texto);
    console.log('[VOZ] usuarioInteragiu:', this.usuarioInteragiu);
    console.log('[VOZ] forcado:', forcado);
    console.log('[VOZ] apiKey existe:', !!this.apiKey);
    console.log('[VOZ] temApiKey():', this.temApiKey());

    if (!texto) return;

    if (!this.usuarioInteragiu && !forcado) {
      this._textosPendentes.push(texto);
      return;
    }

    const textoLimpo = this.limparTexto(texto);
    if (!textoLimpo) return;
    this.parar();

    this._chamadaAtual++;
    const minhaChamada = this._chamadaAtual;

    if (this.temApiKey()) {
      try {
        await this.falarElevenLabs(textoLimpo, minhaChamada);
        return;
      } catch(e) {
        console.warn('ElevenLabs falhou:', e.message);
      }
    }
    // Sem fallback de voz — se ElevenLabs falhar, app fica em silêncio
    // (o texto já aparece visualmente no balão de instrução)
  },

  async falarForcado(texto) {
    this.marcarInteracao();
    return this.falar(texto, true);
  },

  async falarElevenLabs(texto, minhaChamada) {
    console.log('[ELEVENLABS] Iniciando fetch...');
    console.log('[ELEVENLABS] voiceId:', ELEVENLABS_CONFIG.voiceId);
    console.log('[ELEVENLABS] URL:', `${ELEVENLABS_CONFIG.apiUrl}/${ELEVENLABS_CONFIG.voiceId}`);

    const cacheKey = texto.substring(0, 50);
    if (audioCache.has(cacheKey)) {
      console.log('[ELEVENLABS] Cache HIT — tocando do cache');
      if (this._chamadaAtual !== minhaChamada) {
        console.log('[ELEVENLABS] Chamada mais nova venceu — abortando cache');
        return;
      }
      await this.tocarAudio(audioCache.get(cacheKey));
      return;
    }
    console.log('[ELEVENLABS] Cache MISS — fazendo fetch');

    const response = await fetch(
      `${ELEVENLABS_CONFIG.apiUrl}/${ELEVENLABS_CONFIG.voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: texto,
          model_id: ELEVENLABS_CONFIG.modelId,
          voice_settings: {
            stability: 0.70,
            similarity_boost: 0.80,
            style: 0.15,
            use_speaker_boost: true,
            speed: 0.92
          }
        })
      }
    );

    console.log('[ELEVENLABS] Status:', response.status);
    console.log('[ELEVENLABS] Status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ELEVENLABS] ERRO:', errorText);
      throw new Error(`ElevenLabs: ${response.status} — ${errorText}`);
    }

    console.log('[ELEVENLABS] Fetch sucesso! Processando blob...');
    const blob = await response.blob();
    console.log('[ELEVENLABS] Blob size:', blob.size, 'bytes');
    console.log('[ELEVENLABS] Blob type:', blob.type);

    const url = URL.createObjectURL(blob);
    console.log('[ELEVENLABS] URL gerada:', url);

    if (audioCache.size > 20) {
      const primeiraChave = audioCache.keys().next().value;
      URL.revokeObjectURL(audioCache.get(primeiraChave));
      audioCache.delete(primeiraChave);
    }
    audioCache.set(cacheKey, url);

    if (this._chamadaAtual !== minhaChamada) {
      console.log('[ELEVENLABS] Chamada mais nova venceu — abortando antes de tocar');
      URL.revokeObjectURL(url);
      return;
    }
    console.log('[ELEVENLABS] Tentando tocar áudio...');
    await this.tocarAudio(url);
    console.log('[ELEVENLABS] Áudio finalizado!');
  },

  tocarAudio(url) {
    console.log('[AUDIO] Criando elemento Audio com URL:', url);
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.playbackRate = 1.0;
      this.audioAtual = audio;
      audio.oncanplay = () => console.log('[AUDIO] canplay disparado');
      audio.onplay = () => console.log('[AUDIO] play disparado');
      audio.onended = () => {
        console.log('[AUDIO] ended disparado');
        this.audioAtual = null;
        resolve();
      };
      audio.onerror = (e) => {
        console.error('[AUDIO] ERRO no audio:', e);
        console.error('[AUDIO] error.code:', audio.error?.code);
        console.error('[AUDIO] error.message:', audio.error?.message);
        reject(e);
      };
      console.log('[AUDIO] Chamando play()...');
      audio.play()
        .then(() => console.log('[AUDIO] play() resolved'))
        .catch(err => {
          console.error('[AUDIO] play() rejeitado:', err);
          reject(err);
        });
    });
  },

  parar() {
    try {
      this.audioAtual?.pause();
      this.audioAtual = null;
      window.speechSynthesis?.cancel();
    } catch(e) {}
  },

  async testar() {
    await this.falar('Olá! Sou a professora do Tô Ligado. Vou te ajudar a aprender o celular!');
  },

  // Compatibilidade com código antigo
  async speak(text) { return this.falar(text); },
  stop() { this.parar(); }
};

// Desbloquear áudio no primeiro toque (obrigatório Android)
const desbloquear = () => {
  if (VozSistema.usuarioInteragiu) return;
  VozSistema.marcarInteracao();

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch(e) {}

  try {
    const u = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(u);
    window.speechSynthesis.cancel();
  } catch(e) {}

  setTimeout(() => {
    const pendentes = VozSistema._textosPendentes;
    if (pendentes.length > 0) {
      const ultimo = pendentes[pendentes.length - 1];
      VozSistema._textosPendentes = [];
      VozSistema.falar(ultimo, true);
    }
  }, 300);
};

['touchstart', 'click', 'keydown'].forEach(ev =>
  document.addEventListener(ev, desbloquear, { once: true, passive: true })
);

export default VozSistema;
export { VozSistema };