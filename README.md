# Performance Hyosung — Landing Page (demo)

Landing page de demonstração para venda de site à **Performance Hyosung**, oficina especializada em motos Kasinski, Hyosung e Daelim em Porto Alegre/RS.

**Demo online:** [tofariasti.github.io/performance-hyosung](https://tofariasti.github.io/performance-hyosung/)

## Stack

- HTML estático
- Tailwind CSS 3.x
- JavaScript vanilla (config centralizado)
- Moldura de apresentação (preview desktop/tablet/mobile)

## Início rápido

```bash
npm install
npm run sync:instagram   # baixa fotos do @performancehyosung
npm run build
npx serve . -p 3333
```

Abrir [http://localhost:3333](http://localhost:3333) — a moldura de demo fica em `/`, o site em `/site/`.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run build:css` | Compila Tailwind → `assets/css/output.css` |
| `npm run sync:instagram` | Sincroniza fotos do Instagram |
| `npm run build` | Build de produção |
| `npm run capture:marketing` | Gera prints em `docs/marketing/` |

## Estrutura

```
├── index.html              # Demo com moldura (apresentação)
├── site/index.html         # Landing page
├── assets/
│   ├── css/                # Tailwind + tema + preview
│   ├── js/
│   │   ├── config.js       # Dados da empresa
│   │   └── main.js         # Interações e animações
│   └── images/             # Hero, galeria, logo
└── docs/
    ├── pesquisa.md         # Briefing e presença digital
    └── marketing/          # Prints para WhatsApp
```

## Personalizar

Edite [`assets/js/config.js`](assets/js/config.js) para alterar:

- Instagram, WhatsApp (quando disponível), endereço
- Serviços, FAQ, galeria, marcas
- SEO local (coordenadas, CEP)

## Depoimentos (Google)

Edite [`assets/data/google-reviews.json`](assets/data/google-reviews.json) para atualizar textos, nota média e link do Google Maps.

## SEO

- Meta tags, Open Graph, Twitter Cards e geo tags em `site/index.html`
- JSON-LD unificado (`WebSite`, `AutoRepair`, `WebPage`, `FAQPage`, `BreadcrumbList`, `ItemList`, `Review`)
- [`robots.txt`](robots.txt) — indexa `/site/`, bloqueia moldura de demo
- [`sitemap.xml`](sitemap.xml) — URL canônica da landing
- Configuração em [`assets/js/config.js`](assets/js/config.js) → bloco `seo`

Ao publicar no domínio do cliente, atualize `siteUrl`, `seo.canonicalUrl` e defina `modoDemo: false`.

Valide em [Rich Results Test](https://search.google.com/test/rich-results) e [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Documentação

- [Pesquisa da empresa](docs/pesquisa.md)
