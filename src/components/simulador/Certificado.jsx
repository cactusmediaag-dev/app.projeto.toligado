import React from "react";
import { motion } from "framer-motion";
import { Download, Share2, X } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";

export default function Certificado({ 
  moduloNumero, 
  moduloTitulo, 
  nomeUsuario,
  onFechar,
}) {
  const dataAtual = new Date().toLocaleDateString("pt-BR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  });

  const handleSalvar = () => {
    alert("Certificado salvo! (Em breve você poderá baixá-lo em PDF)");
  };

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu Certificado - Tô Ligado',
        text: `Acabei de concluir o ${moduloTitulo} no Tô Ligado! 🎉`,
      });
    } else {
      alert("Certificado copiado! (Em breve você poderá compartilhar)");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
      >
        <button
          onClick={onFechar}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 active:scale-90 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-4 border-[#F3984B] rounded-2xl p-6 bg-gradient-to-br from-[#FFF9F0] to-white">
          <div className="text-center">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="text-xl font-black text-[#5C2E7F] mb-1">Tô Ligado</h3>
            <div className="w-16 h-1 bg-[#F3984B] mx-auto rounded-full mb-4" />
            
            <h2 className="text-2xl font-black text-[#5C2E7F] mb-6">
              Certificado de Conclusão
            </h2>

            <div className="bg-[#EDE0FF] rounded-2xl p-4 mb-4">
              <p className="text-sm text-[#5C2E7F]/70 font-semibold mb-1">Concedido a:</p>
              <p className="text-2xl font-black text-[#5C2E7F]">{nomeUsuario}</p>
            </div>

            <p className="text-base text-gray-600 font-semibold mb-4 leading-relaxed">
              Concluiu com sucesso:
            </p>
            <p className="text-lg font-bold text-[#5C2E7F] mb-4">
              {moduloTitulo}
            </p>

            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-6xl mb-4"
            >
              🏅
            </motion.div>

            <p className="text-sm text-gray-500 font-semibold">
              Conclusão em: {dataAtual}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSalvar}
            className="flex-1 py-3 rounded-2xl bg-[#5C2E7F] text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Download className="w-5 h-5" />
            Salvar
          </button>
          <button
            onClick={handleCompartilhar}
            className="flex-1 py-3 rounded-2xl bg-[#F3984B] text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar
          </button>
        </div>
      </motion.div>
    </div>
  );
}