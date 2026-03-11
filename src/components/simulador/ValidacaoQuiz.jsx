import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/components/shared/ActionButton";

export default function ValidacaoQuiz({ 
  pergunta, 
  opcoes, 
  respostaCorreta, 
  onConcluir,
  moedas = 10,
}) {
  const [selecionada, setSelecionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleSelecionar = (index) => {
    setSelecionada(index);
    setMostrarResultado(true);

    if (index === respostaCorreta) {
      // Som de acerto
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77eeeTRALUKjo77RgGgU7k9jxzHkrBSh+zPHajkILElyx6OyrWBUIRp/h8rBsGwU2idXx0n8qBSl5yO/bj0QKElqx5+iwWRQJP5jb8L90IAU2jdrzzoErByh1xe/akUALD1ap5earWRULRp7h8bJuHQU0hdLu0IEtBSh2yPDamT4JFlux6OanVxYLPJPY78p2KQUodMju2phACRZYr+XmqlgVCz2V2/DLdioFKHLG7tqZPwkWWLDn56lXFgk9ldrvy3cqBSl0yO/amkEJFVew5+aoVxYIPZXb78p3KgUqdsrw2plACBVWsOjnp1cWCT2V2+/KdioFKXbH79qZQAgVV7Dn56hYFQk9lNvvy3cqBSl2ye/amUAIFVew5+eoVxYJPJTa78t3KgUpdsjv2plACBVYsOjnqFgVCTyU2u/LdioFKXbJ79qZQQgVWLDo56hYFQk8lNrvy3cqBSl2yO/amUEIFVew6OeoWBUJPJPa78x4KgUpdsnu25lBCBVXsefnqFgVCTyU2u/MdyoFKXbI79uZQQgVWLHn56hYFQk8lNrvy3cqBSl2yO/bmUEIFVix5+eoWRUJPJPa78x3KgUpdsjv25lBCBVYsefnqFgVCTyT2u/MdyoFKXXI79uZQQgVWLHn56hZFQk8k9rvzHcqBSl1yO/bmUEIFVmx5+epWRUJO5Pa78x3KwUpdcjv25lBCBVYsejnqFgVCTuT2u/NdyoFKXXI79qZQQgVWLHn56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUpdcjv25lBCBVZsejnqFkVCTuT2u/MdyoFKXXI79uZQQgVWbHo56hZFQk7k9rvzHcqBSl1yO/bmUEIFVmx6OeoWRUJO5Pa78x3KgUp');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      // Vibração
      navigator.vibrate?.(200);
    }
  };

  const acertou = selecionada === respostaCorreta;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F0FF] to-[#EDE0FF] flex flex-col items-center justify-center px-5 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-black text-[#5C2E7F] mb-2">Validação</h2>
          <p className="text-lg text-gray-600 font-semibold">{pergunta}</p>
        </div>

        <div className="space-y-3 mb-6">
          {opcoes.map((opcao, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.97 }}
              onClick={() => !mostrarResultado && handleSelecionar(index)}
              disabled={mostrarResultado}
              className={`w-full p-5 rounded-2xl text-left font-bold text-lg transition-all shadow-md
                ${!mostrarResultado
                  ? "bg-white text-[#5C2E7F] border-2 border-[#EDE0FF] active:shadow-lg"
                  : selecionada === index
                  ? acertou
                    ? "bg-green-100 border-2 border-green-400 text-green-700"
                    : "bg-red-100 border-2 border-red-400 text-red-700"
                  : index === respostaCorreta
                  ? "bg-green-50 border-2 border-green-300 text-green-600"
                  : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                }
              `}
            >
              {opcao}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {mostrarResultado && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <div className={`p-6 rounded-3xl mb-4 ${acertou ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"}`}>
                <div className="text-5xl mb-3">{acertou ? "🎉" : "😅"}</div>
                <p className={`text-xl font-bold mb-2 ${acertou ? "text-green-700" : "text-red-600"}`}>
                  {acertou ? "Perfeito!" : "Quase lá!"}
                </p>
                <p className="text-base font-semibold text-gray-600">
                  {acertou ? `Você ganhou +${moedas} moedas! 🪙` : "Tente novamente! Você consegue! 💪"}
                </p>
              </div>

              {acertou && (
                <ActionButton onClick={onConcluir} variant="primary">
                  Continuar! 🚀
                </ActionButton>
              )}

              {!acertou && (
                <ActionButton onClick={() => { setSelecionada(null); setMostrarResultado(false); }} variant="secondary">
                  Tentar Novamente
                </ActionButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}