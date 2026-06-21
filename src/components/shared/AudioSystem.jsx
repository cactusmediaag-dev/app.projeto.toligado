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
    if (!texto) return;

    if (!this.usuarioInteragiu && !forcado) {
      this._textosPendentes.push(texto);
      return;
    }

    const textoLimpo = this.limparTexto(texto);
    if (!textoLimpo) return;
    this.parar();

    if (this.temApiKey()) {
      try {
        await this.falarElevenLabs(textoLimpo);
        return;
      } catch(e) {
        console.warn('ElevenLabs falhou:', e.message);
      }
    }

    try {
      await this.falarWebSpeech(textoLimpo);
    } catch(e) {
      this.mostrarTextoVisual(texto);
    }
  },

  async falarForcado(texto) {
    this.marcarInteracao();
    return this.falar(texto, true);
  },

  async falarElevenLabs(texto) {
    const cacheKey = texto.substring(0, 50);
    if (audioCache.has(cacheKey)) {
      await this.tocarAudio(audioCache.get(cacheKey));
      return;
    }

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

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`ElevenLabs: ${response.status} — ${err}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    if (audioCache.size > 20) {
      const primeiraChave = audioCache.keys().next().value;
      URL.revokeObjectURL(audioCache.get(primeiraChave));
      audioCache.delete(primeiraChave);
    }
    audioCache.set(cacheKey, url);

    await this.tocarAudio(url);
  },

  tocarAudio(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.playbackRate = 1.0;
      this.audioAtual = audio;
      audio.onended = () => { this.audioAtual = null; resolve(); };
      audio.onerror = reject;
      audio.play().catch(reject);
    });
  },

  async falarWebSpeech(texto) {
    if (!('speechSynthesis' in window)) throw new Error('speechSynthesis não suportado');

    window.speechSynthesis.cancel();
    await new Promise(r => setTimeout(r, 150));

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    const vozes = window.speechSynthesis.getVoices();
    const prioridade = ['Google português do Brasil', 'Microsoft Maria', 'pt-BR', 'pt_BR', 'pt'];
    for (const pref of prioridade) {
      const voz = vozes.find(v => v.name.includes(pref) || v.lang === pref);
      if (voz) { utterance.voice = voz; break; }
    }

    const fixTimer = setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 2000);

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(fixTimer);
        reject(new Error('Timeout'));
      }, 15000);

      utterance.onend = () => { clearInterval(fixTimer); clearTimeout(timeout); resolve(); };
      utterance.onerror = (e) => { clearInterval(fixTimer); clearTimeout(timeout); reject(e); };
      window.speechSynthesis.speak(utterance);
    });
  },

  mostrarTextoVisual(_texto) {
    // desativado — texto já visível no balão branco
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