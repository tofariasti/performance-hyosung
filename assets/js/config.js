/**
 * Performance Hyosung — Configuração central
 */
const HyosungConfig = {
  nomeEmpresa: 'Performance Hyosung',
  modoDemo: true,
  previewUrl: '../',

  paleta: {
    laranja: '#FF6B00',
    laranjaEscuro: '#E85D00',
    preto: '#0A0F1A',
    cinza: '#1E293B',
    vermelho: '#E63946',
    cyan: '#00D4FF',
  },

  logoUrl: '/assets/images/instagram-profile.jpg',
  instagram: '@performancehyosung',
  instagramUrl: 'https://www.instagram.com/performancehyosung/',
  instagramDmUrl: 'https://ig.me/m/performancehyosung',

  whatsappNumero: '',
  whatsappMensagem: `Olá! Vi o site da Performance Hyosung e gostaria de um orçamento.

Para agilizar, poderia informar:
1. Marca e modelo da moto (ex: Kasinski Comet 650, Hyosung GT650):
2. Qual o problema ou serviço necessário?
3. Ano da moto:

Obrigado!`,
  whatsappRastrearOrigem: true,

  telefoneFixo: '',
  telefoneCelular: '',
  endereco: 'Av. Saturnino de Brito, 385',
  bairro: 'Vila Jardim',
  cidadeRegiao: 'Porto Alegre e região',
  cidadeHero: 'Porto Alegre',
  cep: '91320-000',
  horario: 'Segunda a sábado — consulte horário no Instagram',
  siteUrl: 'https://performancehyosung.com.br',

  marcas: ['Kasinski', 'Hyosung', 'Daelim', 'Comet', 'GT650', 'GV650', 'Mirage', 'CRZ'],

  heroPoster: '/assets/images/instagram/01-hero.jpg',
  sobreImagem: '/assets/images/instagram/02-sobre.jpg',
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
    'Atendimento direto pelo Instagram',
    'Mecânica com paixão por motos coreanas',
    'Galeria com trabalhos reais publicados no perfil',
  ],

  galeria: [],

  faq: [
    {
      pergunta: 'Vocês atendem quais marcas de moto?',
      resposta:
        'Somos especializados em Kasinski, Hyosung e Daelim — incluindo modelos como Comet, GT650, GV650, Mirage e CRZ. Para outras marcas, consulte pelo Instagram.',
    },
    {
      pergunta: 'Como solicito um orçamento?',
      resposta:
        'O jeito mais rápido é chamar no Instagram @performancehyosung. Informe marca, modelo, ano e o problema ou serviço desejado.',
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
        'Trabalhamos com peças originais e compatíveis de qualidade para a linha coreana. Consulte disponibilidade e prazo pelo Instagram.',
    },
    {
      pergunta: 'Preciso agendar ou posso ir direto?',
      resposta:
        'Recomendamos chamar no Instagram antes para confirmar horário e agilizar o atendimento.',
    },
  ],
};

if (typeof window !== 'undefined') {
  window.HyosungConfig = HyosungConfig;
}
