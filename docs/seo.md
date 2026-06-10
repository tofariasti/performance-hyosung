# SEO — Performance Hyosung

## Palavras-chave alvo

| Intenção | Termos |
|----------|--------|
| Marca + local | oficina Hyosung Porto Alegre, mecânica Kasinski Porto Alegre |
| Serviço | revisão moto Hyosung, manutenção Daelim RS |
| Bairro | oficina moto Vila Jardim, mecânica moto Saturnino de Brito |

## URLs

| Ambiente | URL canônica |
|----------|----------------|
| GitHub Pages (demo) | https://tofariasti.github.io/performance-hyosung/site/ |
| Produção (futuro) | https://performancehyosung.com.br/ |

## Checklist pós-publicação

1. Criar/otimizar **Google Business Profile** com nome, endereço e fotos
2. Atualizar `seo.canonicalUrl` e `siteUrl` em `config.js`
3. Enviar sitemap no [Google Search Console](https://search.google.com/search-console)
4. Validar structured data no [Rich Results Test](https://search.google.com/test/rich-results)
5. Testar compartilhamento no [Facebook Debugger](https://developers.facebook.com/tools/debug/)
6. Sincronizar depoimentos reais em `google-reviews.json`

## Arquivos

- `site/index.html` — meta tags e JSON-LD estático (fallback sem JS)
- `assets/js/main.js` — `applySeoMeta()` e `applyStructuredData()` com URLs absolutas
- `robots.txt` / `sitemap.xml` — na raiz do repositório
