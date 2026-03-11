// Sistema de áudio híbrido com ElevenLabs + Web Speech API fallback

const AudioSystem = {
  elevenLabsConfig: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - natural
    modelId: 'eleven_multilingual_v2',
  },

  currentAudio: null,

  async speak(text) {
    try {
      await this.speakElevenLabs(text);
    } catch (e) {
      console.log('ElevenLabs fallback to Web Speech API:', e.message);
      this.speakFallback(text);
    }
  },

  async speakElevenLabs(text) {
    const apiKey = window.ELEVENLABS_API_KEY || localStorage.getItem('elevenlabs_key');
    if (!apiKey) throw new Error('No API key');

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${this.elevenLabsConfig.voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: this.elevenLabsConfig.modelId,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.3,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) throw new Error('ElevenLabs failed');

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.playbackRate = 0.95;

    this.currentAudio = audio;
    await audio.play();

    return new Promise(resolve => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        resolve();
      };
    });
  },

  speakFallback(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v =>
      v.lang.includes('pt') || v.lang.includes('BR')
    );

    const femaleVoice = ptVoices.find(v =>
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('luciana') ||
      v.name.toLowerCase().includes('vitoria') ||
      v.name.toLowerCase().includes('francisca')
    );

    if (femaleVoice) utterance.voice = femaleVoice;
    else if (ptVoices.length > 0) utterance.voice = ptVoices[0];

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
};

if (typeof window !== 'undefined') {
  window.AudioSystem = AudioSystem;
  
  const savedKey = localStorage.getItem('elevenlabs_key');
  if (savedKey) {
    window.ELEVENLABS_API_KEY = savedKey;
  }
}

export default AudioSystem;