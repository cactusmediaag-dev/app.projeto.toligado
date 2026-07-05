export const CARTILHAS = [
  {
    id: 'golpes_mensagens',
    titulo: 'Golpes no WhatsApp e SMS',
    emoji: '🚨',
    cor: '#C0392B',
    descricao: 'Aprenda a reconhecer e se proteger',
    paginas: [
      {
        ilustracao: '🕵️',
        cena: 'mensagem_suspeita',
        corFundo: '#FADBD8',
        titulo: 'O que é um golpe?',
        texto: 'Golpistas mandam mensagens fingindo ser bancos, lojas ou até parentes. Eles querem seu dinheiro ou seus dados.',
        audio: 'Golpistas mandam mensagens fingindo ser bancos, lojas ou até parentes. Eles querem seu dinheiro ou seus dados.'
      },
      {
        ilustracao: '⏰',
        cena: 'relogio_pressa',
        corFundo: '#FDEBD0',
        titulo: 'Desconfie da pressa',
        texto: 'Golpe quase sempre tem pressa: é só hoje, é urgente! Quem apressa você quer que você não pense.',
        audio: 'Golpe quase sempre tem pressa: é só hoje, é urgente! Quem apressa você quer que você não pense.'
      },
      {
        ilustracao: '🎁',
        cena: 'premio_falso',
        corFundo: '#D5F5E3',
        titulo: 'Prêmio que você não pediu',
        texto: 'Você ganhou um prêmio! Se você não participou de nada, não ganhou nada. Pode apagar.',
        audio: 'Você ganhou um prêmio! Se você não participou de nada, não ganhou nada. Pode apagar.'
      },
      {
        ilustracao: '👨‍👩‍👧',
        cena: 'golpe_parente',
        corFundo: '#D6EAF8',
        titulo: 'O golpe do parente',
        texto: 'Mãe, troquei de número, me faz um PIX? Ligue para o número antigo do seu filho antes de qualquer coisa.',
        audio: 'Mãe, troquei de número, me faz um PIX? Ligue para o número antigo do seu filho antes de qualquer coisa.'
      },
      {
        ilustracao: '🏦',
        cena: 'banco_escudo',
        corFundo: '#D4EFDF',
        titulo: 'Banco não pede senha',
        texto: 'Nenhum banco liga ou manda mensagem pedindo senha ou código. Quem pede é golpista.',
        audio: 'Nenhum banco liga ou manda mensagem pedindo senha ou código. Quem pede é golpista.'
      },
      {
        ilustracao: '🔗',
        cena: 'link_perigoso',
        corFundo: '#EBDEF0',
        titulo: 'Cuidado com links',
        texto: 'Link estranho por mensagem pode roubar seus dados. Na dúvida, não toque.',
        audio: 'Link estranho por mensagem pode roubar seus dados. Na dúvida, não toque.'
      },
      {
        ilustracao: '🛡️',
        cena: 'bloquear_golpista',
        corFundo: '#D5DBDB',
        titulo: 'O que fazer?',
        texto: 'Não responda, não clique. Apague e bloqueie o número. Conte para alguém de confiança.',
        audio: 'Não responda, não clique. Apague e bloqueie o número. Conte para alguém de confiança.'
      },
      {
        ilustracao: '💪',
        cena: 'voce_esperto',
        corFundo: '#FDEDEC',
        titulo: 'Você é mais esperto',
        texto: 'Golpista tem pressa, você tem calma. Desconfiar não é falta de educação: é proteção.',
        audio: 'Golpista tem pressa, você tem calma. Desconfiar não é falta de educação: é proteção.'
      }
    ],
    quiz: {
      pergunta: 'Chegou mensagem: Mãe, troquei de número, faz um PIX urgente! O que fazer?',
      opcoes: [
        '💸 Fazer o PIX rapidinho',
        '📞 Ligar para o número antigo do seu filho para confirmar',
        '📢 Repassar para a família'
      ],
      respostaCorreta: 1
    }
  },
  {
    id: 'senhas_fortes',
    titulo: 'Senhas fortes e seguras',
    emoji: '🔐',
    cor: '#1E8449',
    descricao: 'A chave da sua vida digital',
    paginas: [
      {
        ilustracao: '🗝️',
        cena: 'chave_casa',
        corFundo: '#D5F5E3',
        titulo: 'Por que a senha importa',
        texto: 'A senha é a chave da sua casa digital. Quem tem a sua senha entra na sua vida.',
        audio: 'A senha é a chave da sua casa digital. Quem tem a sua senha entra na sua vida.'
      },
      {
        ilustracao: '⚠️',
        cena: 'senha_fraca',
        corFundo: '#FDEBD0',
        titulo: 'Senha fraca é perigo',
        texto: 'Data de nascimento, 123456 e nome de neto são as primeiras senhas que os golpistas tentam.',
        audio: 'Data de nascimento, 123456 e nome de neto são as primeiras senhas que os golpistas tentam.'
      },
      {
        ilustracao: '🧩',
        cena: 'frase_senha',
        corFundo: '#D6EAF8',
        titulo: 'Como criar senha forte',
        texto: 'Misture letras e números que só fazem sentido para você. Uma frase vira senha: MeuGatoPreto2Anos.',
        audio: 'Misture letras e números que só fazem sentido para você. Uma frase vira senha: MeuGatoPreto2Anos.'
      },
      {
        ilustracao: '🔑',
        cena: 'varias_chaves',
        corFundo: '#D5DBDB',
        titulo: 'Uma senha para cada coisa',
        texto: 'Se uma senha vazar, as outras continuam seguras. O banco nunca usa a mesma senha da rede social.',
        audio: 'Se uma senha vazar, as outras continuam seguras. O banco nunca usa a mesma senha da rede social.'
      },
      {
        ilustracao: '📓',
        cena: 'caderninho_casa',
        corFundo: '#FADBD8',
        titulo: 'Onde guardar',
        texto: 'Pode anotar num caderninho guardado em casa. Nunca em papel na carteira, nunca mande por mensagem.',
        audio: 'Pode anotar num caderninho guardado em casa. Nunca em papel na carteira, nunca mande por mensagem.'
      },
      {
        ilustracao: '🤫',
        cena: 'segredo_cadeado',
        corFundo: '#EBDEF0',
        titulo: 'Senha é segredo',
        texto: 'Nem atendente, nem banco, nem técnico precisam da sua senha. Quem pede, quer roubar.',
        audio: 'Nem atendente, nem banco, nem técnico precisam da sua senha. Quem pede, quer roubar.'
      },
      {
        ilustracao: '📱',
        cena: 'celular_digital',
        corFundo: '#D4EFDF',
        titulo: 'A senha do celular',
        texto: 'Use o bloqueio de tela: PIN, digital ou rosto. Se perder o celular, seus aplicativos ficam protegidos.',
        audio: 'Use o bloqueio de tela: PIN, digital ou rosto. Se perder o celular, seus aplicativos ficam protegidos.'
      },
      {
        ilustracao: '🔄',
        cena: 'renovar_senha',
        corFundo: '#D6EAF8',
        titulo: 'Revise de tempos em tempos',
        texto: 'Trocou de celular? Desconfiou de algo? Troque a senha. Custa pouco e protege muito.',
        audio: 'Trocou de celular? Desconfiou de algo? Troque a senha. Custa pouco e protege muito.'
      }
    ],
    quiz: {
      pergunta: 'Qual é a senha mais forte?',
      opcoes: [
        '📅 Sua data de nascimento',
        '🔢 123456',
        '🐱 Uma frase só sua, com letras e números'
      ],
      respostaCorreta: 2
    }
  },
  {
    id: 'redes_sociais',
    titulo: 'Boas maneiras nas redes',
    emoji: '💬',
    cor: '#2471A3',
    descricao: 'Conviver bem e fugir das mentiras',
    paginas: [
      {
        ilustracao: '🌐',
        cena: 'praca_pessoas',
        corFundo: '#D6EAF8',
        titulo: 'A rede é uma praça',
        texto: 'Rede social é como a praça da cidade: todo mundo vê o que você faz. Poste o que teria orgulho de mostrar na praça.',
        audio: 'Rede social é como a praça da cidade: todo mundo vê o que você faz. Poste o que teria orgulho de mostrar na praça.'
      },
      {
        ilustracao: '🤔',
        cena: 'pensar_postar',
        corFundo: '#EBDEF0',
        titulo: 'Pense antes de postar',
        texto: 'Depois que você publica, perde o controle: podem copiar e espalhar. Na dúvida, não poste.',
        audio: 'Depois que você publica, perde o controle: podem copiar e espalhar. Na dúvida, não poste.'
      },
      {
        ilustracao: '📰',
        cena: 'jornal_alerta',
        corFundo: '#FDEBD0',
        titulo: 'Nem tudo é verdade',
        texto: 'Notícia alarmante, cheia de pontos de exclamação, costuma ser mentira. Desconfie do que assusta demais.',
        audio: 'Notícia alarmante, cheia de pontos de exclamação, costuma ser mentira. Desconfie do que assusta demais.'
      },
      {
        ilustracao: '🔍',
        cena: 'lupa_verifica',
        corFundo: '#D4EFDF',
        titulo: 'Confira antes de repassar',
        texto: 'Antes de compartilhar, pergunte: quem escreveu? Saiu em algum jornal de verdade? Se não souber, não repasse.',
        audio: 'Antes de compartilhar, pergunte: quem escreveu? Saiu em algum jornal de verdade? Se não souber, não repasse.'
      },
      {
        ilustracao: '💬',
        cena: 'coracao_comentario',
        corFundo: '#D6EAF8',
        titulo: 'Respeito nos comentários',
        texto: 'Escreva para os outros como gosta que escrevam para você. Grosseria na internet machuca como na vida real.',
        audio: 'Escreva para os outros como gosta que escrevam para você. Grosseria na internet machuca como na vida real.'
      },
      {
        ilustracao: '🚫',
        cena: 'pare_briga',
        corFundo: '#FADBD8',
        titulo: 'Não alimente briga',
        texto: 'Viu discussão feia? Não entre. Bloqueie quem ofende. Paz vale mais que razão.',
        audio: 'Viu discussão feia? Não entre. Bloqueie quem ofende. Paz vale mais que razão.'
      },
      {
        ilustracao: '👀',
        cena: 'perfil_falso',
        corFundo: '#EBDEF0',
        titulo: 'Cuidado com desconhecidos',
        texto: 'Perfil bonito pedindo amizade e depois dinheiro? Golpista usa foto falsa. Não aceite qualquer convite.',
        audio: 'Perfil bonito pedindo amizade e depois dinheiro? Golpista usa foto falsa. Não aceite qualquer convite.'
      },
      {
        ilustracao: '🌻',
        cena: 'familia_conectada',
        corFundo: '#D4EFDF',
        titulo: 'Use para o bem',
        texto: 'Rede social boa é a que aproxima: família, amigos, aprendizado. O resto é ruído — pode pular.',
        audio: 'Rede social boa é a que aproxima: família, amigos, aprendizado. O resto é ruído — pode pular.'
      }
    ],
    quiz: {
      pergunta: 'Chegou uma notícia assustadora no grupo da família. O que fazer antes de repassar?',
      opcoes: [
        '📢 Repassar rápido para avisar todos',
        '🔍 Conferir se saiu em jornal de verdade',
        '😱 Responder com mais medo'
      ],
      respostaCorreta: 1
    }
  },
  {
    id: 'compras_seguras',
    titulo: 'Compras seguras na internet',
    emoji: '🛒',
    cor: '#E65100',
    descricao: 'Compre sem cair em cilada',
    paginas: [
      {
        ilustracao: '🛒',
        cena: 'loja_celular',
        corFundo: '#FDEBD0',
        titulo: 'Comprar sem sair de casa',
        texto: 'Pela internet você compra remédio, mercado e roupa. É seguro — desde que você saiba onde pisa.',
        audio: 'Pela internet você compra remédio, mercado e roupa. É seguro — desde que você saiba onde pisa.'
      },
      {
        ilustracao: '🔒',
        cena: 'cadeado_site',
        corFundo: '#D4EFDF',
        titulo: 'Procure o cadeado',
        texto: 'Antes de comprar, olhe a barra do site: precisa ter o cadeado fechado e o https. Sem cadeado, sem compra.',
        audio: 'Antes de comprar, olhe a barra do site: precisa ter o cadeado fechado e o https. Sem cadeado, sem compra.'
      },
      {
        ilustracao: '🏷️',
        cena: 'etiqueta_alerta',
        corFundo: '#FADBD8',
        titulo: 'Preço bom demais? Desconfie',
        texto: 'Celular pela metade do preço? Oferta milagrosa costuma ser golpe. Compare em outras lojas.',
        audio: 'Celular pela metade do preço? Oferta milagrosa costuma ser golpe. Compare em outras lojas.'
      },
      {
        ilustracao: '⭐',
        cena: 'estrelas_avaliacao',
        corFundo: '#D6EAF8',
        titulo: 'Leia as avaliações',
        texto: 'Veja o que outros compradores falam da loja. Muita reclamação? Fuja.',
        audio: 'Veja o que outros compradores falam da loja. Muita reclamação? Fuja.'
      },
      {
        ilustracao: '💳',
        cena: 'cartao_protegido',
        corFundo: '#EBDEF0',
        titulo: 'Prefira cartão',
        texto: 'Cartão tem proteção para contestar a compra. Evite depósito direto para gente desconhecida.',
        audio: 'Cartão tem proteção para contestar a compra. Evite depósito direto para gente desconhecida.'
      },
      {
        ilustracao: '📦',
        cena: 'comprovante_guardado',
        corFundo: '#D5F5E3',
        titulo: 'Guarde os comprovantes',
        texto: 'Print do pedido, e-mail de confirmação, número de rastreio. Se der problema, você tem prova.',
        audio: 'Print do pedido, e-mail de confirmação, número de rastreio. Se der problema, você tem prova.'
      },
      {
        ilustracao: '📣',
        cena: 'megafone_direitos',
        corFundo: '#FDEBD0',
        titulo: 'Deu problema? Reclame certo',
        texto: 'Fale primeiro com a loja. Não resolveu? O Procon é seu aliado.',
        audio: 'Fale primeiro com a loja. Não resolveu? O Procon é seu aliado.'
      },
      {
        ilustracao: '✅',
        cena: 'checklist_ok',
        corFundo: '#D4EFDF',
        titulo: 'O comprador esperto',
        texto: 'Cadeado no site, preço real, loja com boa fama, comprovante guardado. Assim a compra chega.',
        audio: 'Cadeado no site, preço real, loja com boa fama, comprovante guardado. Assim a compra chega.'
      }
    ],
    quiz: {
      pergunta: 'O que o site PRECISA ter antes de você comprar?',
      opcoes: [
        '🔒 Cadeado fechado e https na barra',
        '🎁 Muitas ofertas piscando',
        '🎵 Uma música bonita'
      ],
      respostaCorreta: 0
    }
  },
  {
    id: 'pix_sem_medo',
    titulo: 'PIX sem medo',
    emoji: '⚡',
    cor: '#16A085',
    descricao: 'Dinheiro na hora, com segurança',
    paginas: [
      {
        ilustracao: '⚡',
        cena: 'raio_dinheiro',
        corFundo: '#D1F2EB',
        titulo: 'O que é o PIX',
        texto: 'PIX é o jeito de mandar e receber dinheiro na hora, em qualquer dia e horário, sem pagar nada por isso.',
        audio: 'PIX é o jeito de mandar e receber dinheiro na hora, em qualquer dia e horário, sem pagar nada por isso.'
      },
      {
        ilustracao: '🔑',
        cena: 'chave_banco',
        corFundo: '#D6EAF8',
        titulo: 'Sua chave PIX',
        texto: 'A chave é o endereço do seu dinheiro: pode ser seu celular ou CPF. Cadastra no app do banco uma vez só.',
        audio: 'A chave é o endereço do seu dinheiro: pode ser seu celular ou CPF. Cadastra no app do banco uma vez só.'
      },
      {
        ilustracao: '👀',
        cena: 'conferir_nome',
        corFundo: '#D4EFDF',
        titulo: 'Confira antes de enviar',
        texto: 'Digitou a chave? O app mostra o NOME de quem vai receber. Leia com calma. Nome estranho? Pare.',
        audio: 'Digitou a chave? O app mostra o NOME de quem vai receber. Leia com calma. Nome estranho? Pare.'
      },
      {
        ilustracao: '📞',
        cena: 'telefone_banco',
        corFundo: '#D5DBDB',
        titulo: 'Errou? Aja rápido',
        texto: 'Mandou para a pessoa errada? Fale com o seu banco imediatamente e peça a devolução.',
        audio: 'Mandou para a pessoa errada? Fale com o seu banco imediatamente e peça a devolução.'
      },
      {
        ilustracao: '🚨',
        cena: 'golpe_parente',
        corFundo: '#FADBD8',
        titulo: 'O golpe do PIX urgente',
        texto: 'Parente com número novo pedindo PIX urgente é golpe até prova contrária. Ligue antes de pagar.',
        audio: 'Parente com número novo pedindo PIX urgente é golpe até prova contrária. Ligue antes de pagar.'
      },
      {
        ilustracao: '🌙',
        cena: 'lua_limite',
        corFundo: '#EBDEF0',
        titulo: 'Limite menor à noite',
        texto: 'Dá para reduzir o limite do PIX à noite, no app do banco. Se algo der errado, o estrago é menor.',
        audio: 'Dá para reduzir o limite do PIX à noite, no app do banco. Se algo der errado, o estrago é menor.'
      },
      {
        ilustracao: '🧾',
        cena: 'comprovante_pix',
        corFundo: '#D1F2EB',
        titulo: 'Comprovante é seu amigo',
        texto: 'Todo PIX gera comprovante. Guarde os importantes: é a sua prova de pagamento.',
        audio: 'Todo PIX gera comprovante. Guarde os importantes: é a sua prova de pagamento.'
      },
      {
        ilustracao: '🛡️',
        cena: 'escudo_pix',
        corFundo: '#D4EFDF',
        titulo: 'PIX é seguro, sim',
        texto: 'Com calma e conferência, o PIX é mais seguro que dinheiro no bolso. Você já sabe usar!',
        audio: 'Com calma e conferência, o PIX é mais seguro que dinheiro no bolso. Você já sabe usar!'
      }
    ],
    quiz: {
      pergunta: 'Antes de confirmar um PIX, o mais importante é:',
      opcoes: [
        '⚡ Enviar bem rápido',
        '👀 Conferir o NOME de quem vai receber',
        '🌙 Fazer sempre de madrugada'
      ],
      respostaCorreta: 1
    }
  }
];