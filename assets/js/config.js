/**
 * Performance Hyosung — Configuração central
 */
const HyosungConfig = {
  nomeEmpresa: 'Performance Hyosung',
  modoDemo: true,
  previewUrl: '../',

  paleta: {
    azul: '#0057B8',
    azulEscuro: '#003D82',
    azulClaro: '#4DA3FF',
    branco: '#FFFFFF',
    navy: '#0A2463',
    vermelho: '#E63946',
  },

  logoUrl: '/assets/images/instagram-profile.jpg',
  instagram: '@performancehyosung',
  instagramUrl: 'https://www.instagram.com/performancehyosung/',
  instagramDmUrl: 'https://ig.me/m/performancehyosung',

  whatsappNumero: '555193883149',
  telefoneCelular: '(51) 9388-3149',
  whatsappMensagem: `Olá! Vi o site da Performance Hyosung e gostaria de um orçamento.

Para agilizar, poderia informar:
1. Marca e modelo da moto (ex: Kasinski Comet 650, Hyosung GT650):
2. Qual o problema ou serviço necessário?
3. Ano da moto:

Obrigado!`,
  whatsappRastrearOrigem: true,

  telefoneFixo: '',
  endereco: 'Av. Saturnino de Brito, 385',
  bairro: 'Vila Jardim',
  cidadeRegiao: 'Porto Alegre e região',
  cidadeHero: 'Porto Alegre',
  cep: '91320-000',
  horario: 'Segunda a sábado — consulte horário no Instagram',
  siteUrl: 'https://performancehyosung.com.br',
  githubPagesUrl: 'https://tofariasti.github.io/performance-hyosung/site/',

  marcas: ['Kasinski', 'Hyosung', 'Daelim', 'Comet', 'GT650', 'GV650', 'Mirage', 'CRZ'],

  seo: {
    indexavel: true,
    title: 'Performance Hyosung | Oficina de motos Kasinski, Hyosung e Daelim — Porto Alegre',
    description:
      'Oficina mecânica especializada em Kasinski, Hyosung e Daelim na Vila Jardim, Porto Alegre/RS. Revisão, performance, elétrica, freios e peças. Av. Saturnino de Brito, 385. Orçamento pelo WhatsApp (51) 9388-3149 ou Instagram @performancehyosung.',
    keywords: [
      'oficina de motos Porto Alegre',
      'mecânica Hyosung Porto Alegre',
      'oficina Kasinski Porto Alegre',
      'oficina Daelim RS',
      'manutenção moto Vila Jardim',
      'revisão moto Hyosung',
      'oficina moto coreana Porto Alegre',
      'Performance Hyosung',
    ].join(', '),
    themeColor: '#0057B8',
    twitterSite: '@performancehyosung',
    canonicalUrl: '',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Saturnino+de+Brito+385,+Vila+Jardim,+Porto+Alegre,+RS',
    knowsAbout: [
      'Manutenção de motocicletas',
      'Kasinski',
      'Hyosung',
      'Daelim',
      'Revisão de motos',
      'Performance de motos',
      'Mecânica de motos',
    ],
  },

  heroCollage: [
    {
      imagem: '/assets/images/instagram/07-DCM2-2Ixvpf.jpg',
      shortcode: 'DCM2-2Ixvpf',
      alt: 'Motos na Performance Hyosung — oficina em Porto Alegre',
    },
    {
      imagem: '/assets/images/instagram/09-DBlvtvKuqyj.jpg',
      shortcode: 'DBlvtvKuqyj',
      alt: 'Fachada Performance Hyosung — oficina Kasinski e Hyosung, Vila Jardim',
      main: true,
    },
    {
      imagem: '/assets/images/instagram/12-DBUbtRBxSaT.jpg',
      shortcode: 'DBUbtRBxSaT',
      alt: 'Hyosung Performance — especializada em Kasinski e Hyosung',
    },
  ],
  sobreImagem: '/assets/images/instagram/11-C_5-k7SxRJd.jpg',
  sobreImagemShortcode: 'C_5-k7SxRJd',
  instagramPostsJson: '/assets/data/instagram-posts.json',
  ogImage: '/assets/images/og-social.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  seoLocal: {
    streetAddress: 'Av. Saturnino de Brito, 385',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    addressCountry: 'BR',
    postalCode: '91320-000',
    geo: { latitude: -30.0285, longitude: -51.1682 },
    geoRadiusMeters: 30000,
    neighborhood: 'Vila Jardim',
    openingHours: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '20:00' },
      { dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
  },

  servicos: [
    {
      titulo: 'Mecânica especializada',
      descricao: 'Manutenção preventiva e corretiva com foco em motos Kasinski, Hyosung e Daelim — do básico ao motor completo.',
      icone: 'wrench',
    },
    {
      titulo: 'Revisão completa',
      descricao: 'Troca de óleo, filtros, velas, cabos, embreagem e checklist completo para sua moto rodar com segurança.',
      icone: 'clipboard',
    },
    {
      titulo: 'Performance & preparação',
      descricao: 'Ajustes de motor, escapamento, injeção e upgrades para quem busca mais potência e resposta.',
      icone: 'bolt',
    },
    {
      titulo: 'Elétrica e injeção',
      descricao: 'Diagnóstico eletrônico, bateria, alternador, ignição e sistema de injeção eletrônica.',
      icone: 'chip',
    },
    {
      titulo: 'Freios e suspensão',
      descricao: 'Pastilhas, discos, fluido de freio, amortecedores e regulagens para pilotagem precisa.',
      icone: 'shield',
    },
    {
      titulo: 'Peças e acessórios',
      descricao: 'Peças originais e compatíveis para linha coreana — consulte disponibilidade pelo Instagram.',
      icone: 'parts',
    },
  ],

  diferenciais: [
    'Especialistas em Kasinski, Hyosung e Daelim',
    'Oficina na Vila Jardim — Porto Alegre/RS',
    'Atendimento por WhatsApp e Instagram',
    'Mecânica com paixão por motos coreanas',
    'Galeria com trabalhos reais publicados no perfil',
  ],

  galeria: [
    {
      imagem: 'assets/images/instagram/01-DKLGTEdOzxN.jpg',
      alt: 'Dia prometendo chuva! Enviamos a motoca do nosso cliente diretamente para sua casa!',
      instagramUrl: 'https://www.instagram.com/p/DKLGTEdOzxN/',
      shortcode: 'DKLGTEdOzxN',
    },
    {
      imagem: 'assets/images/instagram/02-DHcNxSvOk57.jpg',
      alt: 'Performance Hyosung — oficina de motos',
      instagramUrl: 'https://www.instagram.com/p/DHcNxSvOk57/',
      shortcode: 'DHcNxSvOk57',
    },
    {
      imagem: 'assets/images/instagram/03-DFlvMhYO1_v.jpg',
      alt: 'Performance Hyosung — oficina de motos',
      instagramUrl: 'https://www.instagram.com/p/DFlvMhYO1_v/',
      shortcode: 'DFlvMhYO1_v',
    },
    {
      imagem: 'assets/images/instagram/04-DFBKsxNxV4R.jpg',
      alt: 'Mas uma! Revisão e mecânica de motos coreanas',
      instagramUrl: 'https://www.instagram.com/p/DFBKsxNxV4R/',
      shortcode: 'DFBKsxNxV4R',
    },
    {
      imagem: 'assets/images/instagram/05-DFBKcgCR5BY.jpg',
      alt: 'Cometera entregue — chega rebocada e sai rodando',
      instagramUrl: 'https://www.instagram.com/p/DFBKcgCR5BY/',
      shortcode: 'DFBKcgCR5BY',
    },
    {
      imagem: 'assets/images/instagram/06-DEvpJ8Oub71.jpg',
      alt: 'Serviço de revisão elétrica Triumph Speed Triple 1050cc',
      instagramUrl: 'https://www.instagram.com/p/DEvpJ8Oub71/',
      shortcode: 'DEvpJ8Oub71',
    },
    {
      imagem: 'assets/images/instagram/07-DCM2-2Ixvpf.jpg',
      alt: 'Pessoas não respeitam ideias, mas sim resultados!',
      instagramUrl: 'https://www.instagram.com/p/DCM2-2Ixvpf/',
      shortcode: 'DCM2-2Ixvpf',
    },
    {
      imagem: 'assets/images/instagram/08-DBz3fwrOQUn.jpg',
      alt: 'Encerrando a quinta-feira na oficina Performance Hyosung',
      instagramUrl: 'https://www.instagram.com/p/DBz3fwrOQUn/',
      shortcode: 'DBz3fwrOQUn',
    },
    {
      imagem: 'assets/images/instagram/09-DBlvtvKuqyj.jpg',
      alt: 'Fachada Performance Hyosung — Av. Saturnino de Brito, Vila Jardim',
      instagramUrl: 'https://www.instagram.com/p/DBlvtvKuqyj/',
      shortcode: 'DBlvtvKuqyj',
    },
    {
      imagem: 'assets/images/instagram/10-DBi1w_nONXw.jpg',
      alt: 'Higienização e organização na área de reparação da motocicleta',
      instagramUrl: 'https://www.instagram.com/p/DBi1w_nONXw/',
      shortcode: 'DBi1w_nONXw',
    },
    {
      imagem: 'assets/images/instagram/11-C_5-k7SxRJd.jpg',
      alt: 'Equipe Performance Hyosung — oficina de motos na Vila Jardim, Porto Alegre',
      instagramUrl: 'https://www.instagram.com/p/C_5-k7SxRJd/',
      shortcode: 'C_5-k7SxRJd',
    },
    {
      imagem: 'assets/images/instagram/12-DBUbtRBxSaT.jpg',
      alt: 'Hyosung Performance — oficina especializada em Kasinski e Hyosung',
      instagramUrl: 'https://www.instagram.com/p/DBUbtRBxSaT/',
      shortcode: 'DBUbtRBxSaT',
    },
  ],

  googleReviewsJson: '/assets/data/google-reviews.json',
  googleReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=Hyosung+Performance,+Av.+Saturnino+de+Brito,+385,+Vila+Jardim,+Porto+Alegre,+RS',
  googleNotaMedia: 4.6,
  googleTotalAvaliacoes: 20,

  depoimentos: [
    {
      nome: 'Sergio Lima Carvalho',
      meta: 'Local Guide · Google',
      quando: 'há 1 mês',
      estrelas: 5,
      texto: 'Excelente profissional, trabalho de primeira, preço justo, serviços com garantia.',
    },
    {
      nome: 'Gerson Júnior',
      meta: 'Local Guide · Google',
      quando: 'há 2 meses',
      estrelas: 5,
      texto:
        'Os guris são nota 1000, cuidam cada detalhe da moto, realmente entendem do que falam — diferente dos mecânicos que costumamos encontrar. Sempre com transparência; já trouxe motos para eles e as duas ficaram 100% (uma delas era um verdadeiro desafio).',
    },
    {
      nome: 'Rafael Andrade',
      meta: 'Local Guide · Google',
      quando: 'há 9 meses',
      estrelas: 5,
      texto: 'Excelente mecânico, oficina de grande profissional.',
    },
    {
      nome: 'J. Klaus',
      meta: 'Local Guide · Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto:
        'Melhor mecânico de Hyosung / Kasinski não tem. Cuidadoso, capacitado e meticuloso ao extremo. Cuida até dos mínimos detalhes e não engabela adaptações inusitadas como geralmente os mecânicos fazem. Nota 1000.',
    },
    {
      nome: 'Wesley Santos',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto:
        'Melhor oficina especializada em Kasinski/Hyosung da região sul do Brasil! Mão de obra extremamente qualificada e de alta competência no assunto. Recomendo de olhos fechados.',
    },
    {
      nome: 'Gabriel Ferretti',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto: 'Só indico esse cara. Duvido igual nessa marca. Serviço top.',
    },
    {
      nome: 'Ederson Colvero',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto: 'O único que acertou minha Mirage, ótimo profissional e de confiança.',
    },
    {
      nome: 'Vitor AS',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto: 'Melhor mecânico das coreanas! Excelente atendimento e preço!!',
    },
    {
      nome: 'Carlos Bock',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto: 'Bom profissional, gente fina demais.',
    },
    {
      nome: 'Fabio Ferreira',
      meta: 'Cliente Google',
      quando: 'há 1 ano',
      estrelas: 5,
      texto: 'Estávamos há anos precisando de um mecânico bom para nossas Hyosung.',
    },
  ],

  faq: [
    {
      pergunta: 'Vocês atendem quais marcas de moto?',
      resposta:
        'Somos especializados em Kasinski, Hyosung e Daelim — incluindo modelos como Comet, GT650, GV650, Mirage e CRZ. Para outras marcas, consulte pelo WhatsApp ou Instagram.',
    },
    {
      pergunta: 'Como solicito um orçamento?',
      resposta:
        'Chame no WhatsApp (51) 9388-3149 ou no Instagram @performancehyosung. Informe marca, modelo, ano e o problema ou serviço desejado.',
    },
    {
      pergunta: 'Onde fica a oficina?',
      resposta:
        'Estamos na Av. Saturnino de Brito, 385, bairro Vila Jardim, Porto Alegre/RS — CEP 91320-000.',
    },
    {
      pergunta: 'Vocês fazem revisão preventiva?',
      resposta:
        'Sim. Revisão completa com troca de óleo, filtros, velas e checklist geral. Ideal para quem quer rodar tranquilo no dia a dia ou na estrada.',
    },
    {
      pergunta: 'Trabalham com peças originais?',
      resposta:
        'Trabalhamos com peças originais e compatíveis de qualidade para a linha coreana. Consulte disponibilidade e prazo pelo WhatsApp ou Instagram.',
    },
    {
      pergunta: 'Preciso agendar ou posso ir direto?',
      resposta:
        'Recomendamos chamar no WhatsApp antes para confirmar horário e agilizar o atendimento.',
    },
  ],
};

if (typeof window !== 'undefined') {
  window.HyosungConfig = HyosungConfig;
}
