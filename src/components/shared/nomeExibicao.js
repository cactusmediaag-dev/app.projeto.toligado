/**
 * Retorna um nome seguro para exibição pública.
 * Se o nome contiver uma sequência de 10+ dígitos (ex: número de celular),
 * substitui apenas a sequência por "Aluno(a)", preservando o restante.
 * - "" → "Aluno(a)"
 * - "65999751687" → "Aluno(a)"
 * - "65996640064 Dé" → "Aluno(a) Dé"
 * - "Maria Silva" → "Maria Silva"
 */
export function nomeExibicao(nome) {
  if (!nome || !nome.trim()) return 'Aluno(a)';
  const limpo = nome.replace(/\d{10,}/g, 'Aluno(a)').replace(/\s+/g, ' ').trim();
  return limpo || 'Aluno(a)';
}