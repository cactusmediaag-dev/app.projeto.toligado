import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/shared/Confetti";
import { VozSistema } from "@/components/shared/AudioSystem";

export default function Modulo8Celebracao() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [mostrarCertificado, setMostrarCertificado] = useState(false);
  const [audioFalou, setAudioFalou] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("toligado_user_id");
      if (userId) {
        const users = await base44.entities.Usuario.filter({ id: userId });
        if (users.length > 0) {
          const user = users[0];
          setUsuario(user);
          
          const modulosCompletos = user.modulos_completos || [];
          if (!modulosCompletos.includes("mod8")) {
            await base44.entities.Usuario.update(userId, {
              modulos_completos: [...modulosCompletos, "mod8"],
              moedas: (user.moedas || 0) + 50,
              app_concluido: true,
              data_conclusao_geral: new Date().toISOString(),
              nivel_atual: 8,
            });
          }
        }
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (usuario && !audioFalou) {
      const text = `Parabéns ${usuario.nome}! Você completou todos os módulos do Tô Ligado! Você é incrível e está pronto para o mundo digital! Muito orgulho de você!`;
      setTimeout(() => { VozSistema.falar(text); }, 1000);
      setAudioFalou(true);
    }
  }, [usuario, audioFalou]);

  if (mostrarCertificado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#5C2E7F] to-[#F3984B] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative"
        >
          <button
            onClick={() => setMostrarCertificado(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl"
          >
            ×
          </button>
          
          <div className="border-8 border-double border-yellow-600 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h1 className="text-4xl font-black text-[#5C2E7F] mb-2">Tô Ligado</h1>
              <div className="w-32 h-1 bg-gradient-to-r from-[#5C2E7F] to-[#F3984B] mx-auto mb-4"></div>
              
              <h2 className="text-3xl font-black text-yellow-700 mb-6">
                CERTIFICADO DE CONCLUSÃO
              </h2>
              
              <p className="text-lg text-gray-600 mb-2">Certificamos que</p>
              <p className="text-4xl font-black text-gray-900 mb-4">{usuario?.nome || "Usuário"}</p>
              
              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                Concluiu com êxito todos os <strong>8 módulos</strong> do programa<br/>
                <strong className="text-[#5C2E7F]">Tô Ligado — Educação Digital para Vida</strong><br/>
                demonstrando domínio em:
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-left text-sm text-gray-700 mb-6">
                <div>✅ Ferramentas Google</div>
                <div>✅ Configurações e Segurança</div>
                <div>✅ Acesso Avançado</div>
                <div>✅ Redes Sociais</div>
                <div>✅ Criação de Conteúdo</div>
                <div>✅ Aplicativos Públicos</div>
                <div>✅ Operações Financeiras I</div>
                <div>✅ Operações Financeiras II</div>
              </div>
              
              <div className="text-7xl mb-4">🏅</div>
              
              <p className="text-sm text-gray-500 mb-2">Data de conclusão:</p>
              <p className="text-base font-bold text-gray-800 mb-6">
                {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
              
              <div className="border-t-2 border-gray-300 pt-4">
                <p className="text-xs text-gray-600 italic">Programa Tô Ligado — Mato Grosso</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-[#5C2E7F] text-white py-3 rounded-xl font-bold">
              💾 Salvar
            </button>
            <button className="flex-1 bg-[#F3984B] text-white py-3 rounded-xl font-bold">
              📤 Compartilhar
            </button>
          </div>
          
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold"
          >
            🏠 Voltar ao Início
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5C2E7F] to-[#F3984B] flex items-center justify-center p-6 relative overflow-hidden">
      <Confetti duration={5000} />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mb-6"
        >
          <span className="text-9xl">🎓</span>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-black text-white mb-3">
            PARABÉNS,<br/>{usuario?.nome || "Você"}!
          </h1>
          <p className="text-2xl font-bold text-yellow-300 mb-4">
            Você concluiu o Tô Ligado!
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Você aprendeu tudo sobre o mundo digital!<br/>
            Agora você está conectado, seguro e preparado! 🌟
          </p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">🏆</span>
              <div>
                <p className="text-white text-sm">Total de moedas</p>
                <p className="text-5xl font-black text-yellow-300">{usuario?.moedas || 0}</p>
              </div>
              <span className="text-5xl">🪙</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white font-bold text-lg">8 Módulos Completos ✅</p>
              <p className="text-white/80 text-sm mt-1">Nível Máximo Atingido!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <button
            onClick={() => setMostrarCertificado(true)}
            className="w-full bg-white text-[#5C2E7F] py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
          >
            🎓 Ver meu Certificado Final
          </button>
          
          <button
            onClick={() => navigate(createPageUrl("Ranking"))}
            className="w-full bg-yellow-400 text-[#5C2E7F] py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
          >
            🏆 Ver meu Ranking
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Completei o Tô Ligado!',
                  text: 'Acabo de concluir todos os 8 módulos do programa Tô Ligado! 🎓🏆',
                });
              }
            }}
            className="w-full bg-[#F3984B] text-white py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
          >
            📤 Compartilhar minha conquista
          </button>
          
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="w-full bg-white/20 backdrop-blur text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform"
          >
            🏠 Voltar ao Início
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}