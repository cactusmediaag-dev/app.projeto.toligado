import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PoliticaPrivacidade() {
  const navigate = useNavigate();

  const secoes = [
    {
      icone: '🏛️',
      titulo: '1. Sobre o Projeto Tô Ligado',
      texto: `O aplicativo "Tô Ligado" é uma plataforma educacional gamificada desenvolvida para promover a inclusão digital de pessoas acima de 50 anos em situação de vulnerabilidade social em regiões ribeirinhas, pantaneiras e rurais do estado de Mato Grosso, Brasil.\n\nEste projeto é desenvolvido sem fins lucrativos, com foco em educação, autonomia digital e cidadania.`
    },
    {
      icone: '📋',
      titulo: '2. Dados que Coletamos',
      texto: `Coletamos apenas os dados necessários para o funcionamento do aplicativo:\n\n- Nome completo\n- Data de nascimento\n- Gênero (Homem ou Mulher)\n- Senha numérica de 6 dígitos (armazenada de forma segura)\n- Progresso nas lições e módulos\n- Moedas e pontuação acumuladas\n\nNão coletamos dados bancários, documentos, localização em tempo real ou qualquer informação financeira real.`
    },
    {
      icone: '🎯',
      titulo: '3. Como Usamos seus Dados',
      texto: `Seus dados são utilizados exclusivamente para:\n\n- Identificar você dentro do aplicativo\n- Salvar seu progresso nas lições\n- Exibir seu desempenho no Ranking\n- Personalizar sua experiência de aprendizado\n- Emitir certificados de conclusão de módulos\n\nSeus dados NUNCA serão vendidos, alugados ou compartilhados com terceiros para fins comerciais.`
    },
    {
      icone: '🔒',
      titulo: '4. Segurança dos seus Dados',
      texto: `Adotamos as seguintes medidas de segurança:\n\n- Senhas armazenadas com criptografia (hash)\n- Ambiente 100% simulado — sem transações reais\n- Nenhuma informação financeira real é processada\n- Dados armazenados em servidores seguros\n- Acesso restrito apenas à equipe do projeto\n\nO ambiente de simulação do Tô Ligado é seguro. Você nunca precisará inserir dados bancários reais, CPF ou qualquer documento oficial.`
    },
    {
      icone: '📷',
      titulo: '5. Câmera e Microfone',
      texto: `Algumas lições do aplicativo solicitam acesso à câmera e ao microfone do seu dispositivo para:\n\n- Câmera: simular o uso do Google Lens e tirar fotos durante as aulas práticas\n- Microfone: praticar comandos de voz com o Google Assistente\n\nEssas permissões são opcionais. Se você não autorizar, as lições continuam funcionando normalmente com recursos simulados. Nenhuma foto ou áudio é armazenado em nossos servidores.`
    },
    {
      icone: '👶',
      titulo: '6. Público-Alvo e Proteção',
      texto: `O Tô Ligado é desenvolvido especialmente para pessoas com 50 anos ou mais. Não coletamos dados de menores de idade.\n\nTodo o conteúdo é educacional, acessível e adequado para o público idoso, respeitando o Estatuto do Idoso (Lei nº 10.741/2003) e a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).`
    },
    {
      icone: '⚖️',
      titulo: '7. Lei Geral de Proteção de Dados (LGPD)',
      texto: `Em conformidade com a LGPD (Lei nº 13.709/2018), você tem os seguintes direitos:\n\n- Confirmar a existência de tratamento dos seus dados\n- Acessar seus dados pessoais\n- Corrigir dados incompletos ou incorretos\n- Solicitar a exclusão dos seus dados\n- Revogar seu consentimento a qualquer momento\n\nPara exercer qualquer um desses direitos, entre em contato conosco pelo e-mail abaixo.`
    },
    {
      icone: '🍪',
      titulo: '8. Armazenamento Local',
      texto: `O aplicativo utiliza o armazenamento local do seu dispositivo (localStorage e sessionStorage) para:\n\n- Manter sua sessão ativa entre acessos\n- Salvar preferências de uso\n- Garantir que seu progresso não seja perdido\n\nEsses dados ficam apenas no seu dispositivo e não são enviados para terceiros.`
    },
    {
      icone: '🔄',
      titulo: '9. Atualizações desta Política',
      texto: `Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias no aplicativo ou mudanças na legislação.\n\nSempre que houver mudanças significativas, você será informado dentro do próprio aplicativo.\n\nÚltima atualização: Janeiro de 2025`
    },
    {
      icone: '📬',
      titulo: '10. Fale Conosco',
      texto: `Em caso de dúvidas sobre esta política ou sobre seus dados pessoais, entre em contato:\n\n📧 E-mail: contato@projetotoligado.com.br\n🌐 Site: app.projetotoligado.com.br\n📍 Mato Grosso, Brasil\n\nResponderemos em até 5 dias úteis.`
    },
  ];

  return (
    <div style={{ minHeight: '100dvh', background: '#f5f0ff', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #5C2E7F, #7B3FA0)', padding: 'calc(env(safe-area-inset-top, 44px) + 12px) 20px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <button onClick={() => navigate(createPageUrl('Home'))} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#fff', flexShrink: 0 }}>
            ←
          </button>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0 }}>Política de Privacidade</h1>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>⚖️</span>
          <div>
            <p style={{ color: '#fff', fontSize: '13px', fontWeight: '700', margin: '0 0 2px' }}>Em conformidade com a LGPD</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', margin: 0 }}>Lei nº 13.709/2018 — Proteção de Dados</p>
          </div>
        </div>
      </div>

      {/* INTRODUÇÃO */}
      <div style={{ background: '#fff', margin: '16px 16px 0', borderRadius: '20px', padding: '16px', border: '2px solid rgba(92,46,127,0.1)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '28px', flexShrink: 0 }}>🛡️</span>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '800', color: '#5C2E7F', margin: '0 0 6px' }}>Seus dados estão seguros conosco!</p>
            <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.6 }}>
              O Tô Ligado é um ambiente 100% simulado e seguro. Nunca usamos informações reais para transações. Leia abaixo como cuidamos dos seus dados.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÕES */}
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '40px' }}>
        {secoes.map((secao, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '18px', boxShadow: '0 2px 8px rgba(92,46,127,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>{secao.icone}</span>
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#5C2E7F', margin: 0, lineHeight: 1.3 }}>{secao.titulo}</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#555', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{secao.texto}</p>
          </div>
        ))}

        {/* RODAPÉ */}
        <div style={{ background: 'linear-gradient(135deg, #5C2E7F, #7B3FA0)', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '32px' }}>⚡</span>
          <p style={{ color: '#fff', fontSize: '15px', fontWeight: '800', margin: '8px 0 4px' }}>Tô Ligado</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: '0 0 12px' }}>Inclusão Digital que Transforma Vidas</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0 }}>© 2025 Projeto Tô Ligado — Mato Grosso, Brasil</p>
        </div>
      </div>
    </div>
  );
}