// Sistema de voz híbrido — funciona em browser E APK Android

const VozSistema = {

  isAndroid() {
    return /Android/i.test(navigator.userAgent);
  },

  isAndroidAPK() {
    return /wv/.test(navigator.userAgent) ||
           window.Android !== undefined ||
           (/Android/.test(navigator.userAgent) &&
            !/Chrome\/[.0-9]*\s/.test(navigator.userAgent));
  },

  async getVozes() {
    return new Promise((resolve) => {
      const vozes = window.speechSynthesis.getVoices();
      if (vozes.length > 0) { resolve(vozes); return; }
      let tentativas = 0;
      const interval = setInterval(() => {
        const v = window.speechSynthesis.getVoices();
        tentativas++;
        if (v.length > 0 || tentativas > 20) {
          clearInterval(interval);
          resolve(v);
        }
      }, 100);
      window.speechSynthesis.onvoiceschanged = () => {
        clearInterval(interval);
        resolve(window.speechSynthesis.getVoices());
      };
    });
  },

  async falar(texto) {
    if (!texto) return;
    const textoLimpo = texto
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/[⚡🔊📱💡🔋]/g, '')
      .trim();

    // Android Bridge nativa (Capacitor/Cordova)
    if (window.Android && window.Android.speak) {
      try { window.Android.speak(textoLimpo); return; } catch(e) {}
    }

    if ('speechSynthesis' in window) {
      try { await this.falarSpeechSynthesis(textoLimpo); return; } catch(e) {}
    }

    this.falarVisual(textoLimpo);
  },

  async falarSpeechSynthesis(texto) {
    window.speechSynthesis.cancel();
    await new Promise(r => setTimeout(r, 100));

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    const vozes = await this.getVozes();
    const vozPT = vozes.find(v =>
      v.lang === 'pt-BR' || v.lang === 'pt_BR' || v.lang.startsWith('pt')
    );
    if (vozPT) utterance.voice = vozPT;

    // Fix Android WebView — mantém fala ativa
    const fixAndroid = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(fixAndroid);
      }
    }, 5000);

    return new Promise((resolve, reject) => {
      utterance.onend = () => { clearInterval(fixAndroid); resolve(); };
      utterance.onerror = (e) => { clearInterval(fixAndroid); reject(e); };
      try {
        window.speechSynthesis.speak(utterance);
        // Workaround Android: se não começar em 1s, fala vazio primeiro
        if (this.isAndroid()) {
          setTimeout(() => {
            if (!window.speechSynthesis.speaking) {
              const u0 = new SpeechSynthesisUtterance('');
              window.speechSynthesis.speak(u0);
              window.speechSynthesis.speak(utterance);
            }
          }, 1000);
        }
      } catch(e) { reject(e); }
    });
  },

  // Fallback visual quando TTS falha totalmente
  falarVisual(texto) {
    const existente = document.getElementById('voz-fallback');
    if (existente) existente.remove();
    const div = document.createElement('div');
    div.id = 'voz-fallback';
    div.style.cssText = `
      position: fixed;
      bottom: 120px;
      left: 16px; right: 16px;
      background: rgba(92,46,127,0.95);
      color: white;
      padding: 14px 18px;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      z-index: 99999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      animation: slideUpFeedback 0.3s ease;
      text-align: center;
    `;
    div.innerHTML = `🧓 ${texto}`;
    document.body.appendChild(div);
    setTimeout(() => div?.remove(), 4000);
  },

  parar() {
    try { window.speechSynthesis?.cancel(); } catch(e) {}
  },

  // Compatibilidade com AudioSystem antigo
  async speak(text) { return this.falar(text); },
  stop() { this.parar(); }
};

// Desbloqueio de áudio no primeiro toque (obrigatório no Android)
let audioDesbloqueado = false;
const desbloquearAudio = () => {
  if (audioDesbloqueado) return;
  audioDesbloqueado = true;
  try {
    const u = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(u);
    window.speechSynthesis.cancel();
  } catch(e) {}
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.resume();
  } catch(e) {}
};
document.addEventListener('touchstart', desbloquearAudio, { once: true, passive: true });
document.addEventListener('click', desbloquearAudio, { once: true, passive: true });

export default VozSistema;
export { VozSistema };