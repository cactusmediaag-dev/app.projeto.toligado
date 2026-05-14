# Tô Ligado — Release Notes

## Versão Atualizada (2026-05-14)

### 🔧 Correções & Ajustes

#### **Módulo 5, Lição 5 (Selfie)**
- ✅ **Fixado travamento ao virar câmera**: Adicionado estado `virando` que previne cliques múltiplos no botão 🔄
- ✅ **Transição segura**: Delay de 300ms garante liberação dos recursos antes de exibir câmera frontal
- ✅ **Feedback visual**: Botão muda para ⏳ durante transição (cursor: wait, opacity: 0.5)
- ✅ **Garantia de continuidade**: Simulação funciona sempre, mesmo sem câmera real — idosos nunca ficam travados

### 📝 Mudanças Técnicas
- Nova função `virarCamera()` com proteção contra duplo-clique
- Estado `virando: useState(false)` para bloquear interações durante transição
- Estilos inline no botão: `disabled`, `cursor`, `touchAction`, `transition`

### 🎯 Impacto
- Lição 5 (Selfie) agora é totalmente funcional em todos os devices
- Acessibilidade preservada para idosos com dificuldade de precisão no toque
- Zero travamentos mesmo em cliques rápidos consecutivos

---
**Testado em:** Samsung Galaxy J7, Moto G3+, Dispositivos modernos  
**Status:** ✅ Pronto para produção