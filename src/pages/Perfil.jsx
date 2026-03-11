import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LogOut, Star, Coins, BookOpen, Calendar, Trash2 } from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import AudioSystem from "@/components/shared/AudioSystem";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (!userId) { navigate(createPageUrl("Entrar")); return; }
      const users = await base44.entities.Usuario.filter({ id: userId });
      if (users.length > 0) setUsuario(users[0]);
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("toligado_user_id");
    localStorage.removeItem("toligado_user_nome");
    navigate(createPageUrl("Entrar"));
  };

  const handleDeleteAccount = async () => {
    if (!usuario) return;
    try {
      await base44.entities.Usuario.delete(usuario.id);
      localStorage.removeItem("toligado_user_id");
      localStorage.removeItem("toligado_user_nome");
      navigate(createPageUrl("Entrar"));
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  if (!usuario) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #F8F0FF, #EDE0FF)" }}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <span className="text-6xl">⚡</span>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { icon: Star, label: "Nível", value: usuario.nivel_atual || 1, color: "#F3984B" },
    { icon: Coins, label: "Moedas", value: usuario.moedas || 0, color: "#FFD080" },
    { icon: BookOpen, label: "Módulos", value: (usuario.modulos_completos || []).length, color: "#5C2E7F" },
  ];

  return (
    <div
      className="min-h-screen pb-24 bg-background dark:bg-gray-900"
      style={{ background: "linear-gradient(180deg, #5C2E7F 0%, #A67EC8 30%, #F8F0FF 60%, #FFFFFF 100%)" }}
    >
      <div className="px-5 pt-6 pb-4 flex items-center justify-between pt-[env(safe-area-inset-top)]">
        <button
          onClick={() => navigate(createPageUrl("Home"))}
          className="p-2 rounded-xl bg-white/20 text-white active:scale-90 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-black text-white">👤 Perfil</h1>
        <div className="w-9" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center mt-4 mb-8"
      >
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-white"
          style={{ background: "linear-gradient(135deg, #EDE0FF, #FFFFFF)" }}
        >
          {usuario.sexo === "Homem" ? "👨" : "👩"}
        </div>
        <h2 className="text-2xl font-black text-white mt-4">{usuario.nome}</h2>
        <p className="text-white/70 font-semibold text-base mt-1">
          Membro desde {new Date(usuario.created_date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>
      </motion.div>

      <div className="px-5">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl p-4 text-center shadow-md"
            >
              <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-2xl font-black text-[#5C2E7F]">{s.value}</p>
              <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-5 shadow-md space-y-4"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#5C2E7F]" />
            <div>
              <p className="text-sm text-gray-400 font-medium">Data de nascimento</p>
              <p className="font-bold text-[#5C2E7F]">
                {usuario.data_nascimento
                  ? new Date(usuario.data_nascimento + "T00:00:00").toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🪙</span>
            <div>
              <p className="text-sm text-gray-400 font-medium">XP Total</p>
              <p className="font-bold text-[#5C2E7F]">{usuario.xp_total || 0} pontos</p>
            </div>
          </div>
        </motion.div>

        <VoiceSettings />

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="ripple-btn w-full mt-6 py-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 font-bold text-lg flex items-center justify-center gap-2 active:bg-red-100 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sair da conta
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDeleteDialog(true)}
          className="ripple-btn w-full mt-3 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-lg flex items-center justify-center gap-2 active:bg-gray-100 transition-all"
        >
          <Trash2 className="w-5 h-5" />
          Excluir conta
        </motion.button>
      </div>

      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5"
            onClick={() => setShowDeleteDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm w-full"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">⚠️</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Excluir conta?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Todos os seus dados e progresso serão permanentemente excluídos. Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-3 rounded-xl bg-red-500 text-white font-bold active:scale-95 transition-transform"
                >
                  Sim, excluir conta
                </button>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold active:scale-95 transition-transform"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

function VoiceSettings() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_key') || '');
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveKey = () => {
    window.ELEVENLABS_API_KEY = apiKey;
    localStorage.setItem('elevenlabs_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const testVoice = async () => {
    setTesting(true);
    try {
      await AudioSystem.speak('Olá! Estou aqui para te ajudar a aprender!');
    } catch (e) {
      console.error('Test voice error:', e);
    }
    setTesting(false);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.45 }}
      className="bg-white rounded-3xl p-5 shadow-md mt-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🔊</span>
        <h3 className="text-lg font-black text-[#5C2E7F]">Configurações de Voz</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Para uma voz mais natural, insira sua chave ElevenLabs (opcional)
      </p>
      <input
        type="password"
        placeholder="Chave API ElevenLabs (opcional)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-xl text-sm mb-3 focus:border-[#5C2E7F] focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={saveKey}
          className="flex-1 bg-[#5C2E7F] text-white py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform"
        >
          {saved ? "✅ Salvo!" : "💾 Salvar"}
        </button>
        <button
          onClick={testVoice}
          disabled={testing}
          className="flex-1 bg-[#F3984B] text-white py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform disabled:opacity-50"
        >
          {testing ? "🔊 Testando..." : "▶️ Testar"}
        </button>
      </div>
    </motion.div>
  );
}