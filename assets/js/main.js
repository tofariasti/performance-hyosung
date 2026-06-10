(function () {
  'use strict';

  const config = window.HyosungConfig || {};
  const assetUrl = window.assetUrl || ((path) => path);

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getContactUrl(source) {
    if (config.whatsappNumero) {
      let msg = config.whatsappMensagem || '';
      if (source && config.whatsappRastrearOrigem !== false) {
        msg += `\n\n(Origem: ${source})`;
      }
      return `https://wa.me/${config.whatsappNumero}?text=${encodeURIComponent(msg)}`;
    }
    return config.instagramDmUrl || config.instagramUrl || '#';
  }

  function getServiceIcon(tipo) {
    const icons = {
      wrench:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
      clipboard:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>',
      bolt:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
      chip:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>',
      shield:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      parts:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>',
    };
    const path = icons[tipo] || icons.wrench;
    return `<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  }

  function applyContactLinks() {
    document.querySelectorAll('[data-contact]').forEach((el) => {
      const source = el.getAttribute('data-contact-source') || 'site';
      el.href = getContactUrl(source);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
    applyWhatsAppFloat();
  }

  const WHATSAPP_ICON =
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>';

  function applyWhatsAppFloat() {
    const float = document.querySelector('.contact-float');
    if (!float || !config.whatsappNumero) return;
    float.classList.add('contact-float--whatsapp');
    float.setAttribute('aria-label', 'WhatsApp');
    const svg = float.querySelector('svg');
    if (svg) svg.innerHTML = WHATSAPP_ICON;
  }

  function applyInstagramLinks() {
    document.querySelectorAll('[data-instagram]').forEach((el) => {
      if (el.hasAttribute('data-instagram-label')) {
        el.textContent = config.instagram || '';
      }
      if (el.tagName === 'A') el.href = config.instagramUrl || '#';
    });
  }

  function renderHeroMosaic() {
    const container = document.getElementById('hero-mosaic');
    const items = config.heroMosaic || [];
    if (!container || !items.length) return;

    container.innerHTML = items
      .map(
        (item, i) => `
      <div class="hero__bg-tile hero__bg-tile--${escapeHtml(item.shape || 'square')}" data-shape="${escapeHtml(item.shape || 'square')}">
        <img
          src="${escapeHtml(assetUrl(item.imagem))}"
          alt=""
          loading="${i < 6 ? 'eager' : 'lazy'}"
          ${i < 3 ? 'fetchpriority="high"' : ''}
          width="640"
          height="640"
          data-hero-tile="${escapeHtml(item.shortcode)}"
        />
      </div>`
      )
      .join('');
  }

  function applyHeroPoster() {
    renderHeroMosaic();

    const sobreImg = document.querySelector('.sobre-visual img');
    if (sobreImg && config.sobreImagem) {
      sobreImg.src = assetUrl(config.sobreImagem);
    }
  }

  function applyLogoImages() {
    const logo = config.logoUrl;
    if (!logo) return;
    document.querySelectorAll('.site-nav__brand img, .site-footer img').forEach((img) => {
      img.src = assetUrl(logo);
    });
  }

  function applyContactData() {
    document.querySelectorAll('[data-telefone-fixo]').forEach((el) => {
      el.textContent = config.telefoneFixo || 'Consulte no Instagram';
    });
    document.querySelectorAll('[data-telefone-celular]').forEach((el) => {
      el.textContent = config.telefoneCelular || '';
      el.closest('[data-contact-row]')?.classList.toggle('hidden', !config.telefoneCelular);
    });
    document.querySelectorAll('[data-endereco]').forEach((el) => {
      el.textContent = `${config.endereco || ''} — ${config.bairro || ''}, ${config.cidadeHero || 'Porto Alegre'}/RS`;
    });
    document.querySelectorAll('[data-horario]').forEach((el) => {
      el.textContent = config.horario || '';
    });
    document.querySelectorAll('[data-cidade-hero]').forEach((el) => {
      el.textContent = config.cidadeHero || 'Porto Alegre';
    });
    document.querySelectorAll('[data-cidade]').forEach((el) => {
      el.textContent = config.cidadeRegiao || '';
    });
  }

  function renderMarcas() {
    const track = document.getElementById('marcas-track');
    if (!track) return;
    const marcas = config.marcas || [];
    const items = marcas
      .map((m) => `<span class="marca-pill">${escapeHtml(m)}</span>`)
      .join('<span class="marca-sep" aria-hidden="true">◆</span>');
    track.innerHTML = items + items;
  }

  function renderServicos() {
    const grid = document.getElementById('servicos-grid');
    if (!grid) return;
    grid.innerHTML = (config.servicos || [])
      .map(
        (s, i) => `
      <article class="service-card reveal tilt-card" style="--reveal-delay:${i * 0.08}s">
        <span class="service-card__glow" aria-hidden="true"></span>
        <span class="service-card__icon" aria-hidden="true">${getServiceIcon(s.icone)}</span>
        <h3 class="service-card__title">${escapeHtml(s.titulo)}</h3>
        <p class="service-card__text">${escapeHtml(s.descricao)}</p>
      </article>`
      )
      .join('');
  }

  function renderGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;
    const fotos = config.galeria || [];
    if (!fotos.length) {
      grid.innerHTML = `
        <div class="gallery-placeholder reveal">
          <p>Fotos do Instagram em breve.</p>
          <a href="${escapeHtml(config.instagramUrl || '#')}" target="_blank" rel="noopener noreferrer" class="btn-instagram mt-4">
            Ver @performancehyosung
          </a>
        </div>`;
      return;
    }

    grid.innerHTML = fotos
      .map((f, i) => {
        const ig = f.instagramUrl
          ? `<a href="${escapeHtml(f.instagramUrl)}" target="_blank" rel="noopener noreferrer" class="gallery-item__ig" aria-label="Ver no Instagram" onclick="event.stopPropagation()">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>`
          : '';
        const imgUrl = assetUrl(f.imagem);
        return `
      <a href="${escapeHtml(imgUrl)}" class="gallery-item reveal gallery-item--animated" style="--reveal-delay:${(i % 6) * 0.1}s" data-lightbox>
        <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(f.alt)}" loading="lazy" width="400" height="300" />
        <span class="gallery-item__shine" aria-hidden="true"></span>
        ${ig}
      </a>`;
      })
      .join('');
  }

  function applyGaleriaPosts(posts) {
    if (!Array.isArray(posts) || !posts.length) return false;
    config.galeria = posts;
    if ((config.heroMosaic || []).length) {
      config.heroMosaic = config.heroMosaic.map((item) => {
        const fromJson = posts.find((p) => p.shortcode === item.shortcode);
        if (!fromJson) return item;
        return {
          ...item,
          imagem: '/' + fromJson.imagem.replace(/^\//, ''),
          alt: fromJson.alt || item.alt,
        };
      });
    }

    const sobrePost =
      (config.sobreImagemShortcode && posts.find((p) => p.shortcode === config.sobreImagemShortcode)) ||
      posts.find((p) => /oficina|reparação|organização|higienização|fachada/i.test(p.alt || '')) ||
      posts[1] ||
      posts[0];
    if (sobrePost) config.sobreImagem = '/' + sobrePost.imagem.replace(/^\//, '');
    return true;
  }

  async function loadGaleriaFromJson() {
    if ((config.galeria || []).length) {
      applyGaleriaPosts(config.galeria);
    }

    const inline = document.getElementById('instagram-posts-data');
    if (inline?.textContent?.trim()) {
      try {
        const data = JSON.parse(inline.textContent);
        if (data.posts?.length) applyGaleriaPosts(data.posts);
      } catch (_) {}
    }

    if (!config.instagramPostsJson) return;
    try {
      const res = await fetch(assetUrl(config.instagramPostsJson));
      if (!res.ok) return;
      const data = await res.json();
      if (data.posts?.length) applyGaleriaPosts(data.posts);
    } catch (_) {}
  }

  function reviewInitials(nome) {
    return String(nome || '?')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  function renderStars(count) {
    const n = Math.max(0, Math.min(5, Number(count) || 5));
    return '★★★★★'.slice(0, n);
  }

  function renderDepoimentos() {
    const grid = document.getElementById('depoimentos-grid');
    const lista = config.depoimentos || [];
    if (!grid || !lista.length) return;

    const googleIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';

    grid.innerHTML = lista
      .map(
        (item, i) => `
      <li class="review-card reveal" style="--reveal-delay:${(i % 3) * 0.1}s">
        <div class="review-card__header">
          <span class="review-card__avatar" aria-hidden="true">${escapeHtml(reviewInitials(item.nome))}</span>
          <div>
            <p class="review-card__name">${escapeHtml(item.nome)}</p>
            <p class="review-card__badge">${escapeHtml(item.meta || 'Cliente Google')}</p>
          </div>
        </div>
        <div class="review-card__stars" role="img" aria-label="${item.estrelas || 5} de 5 estrelas">${renderStars(item.estrelas)}</div>
        <p class="review-card__when">${escapeHtml(item.quando || '')}</p>
        <p class="review-card__text">${escapeHtml(item.texto)}</p>
        <p class="review-card__source">${googleIcon} Avaliação no Google</p>
      </li>`
      )
      .join('');
  }

  function applyGoogleReviewsData(data) {
    if (!data) return;
    if (Array.isArray(data.depoimentos) && data.depoimentos.length) {
      config.depoimentos = data.depoimentos;
    }
    if (data.notaMedia) config.googleNotaMedia = data.notaMedia;
    if (data.totalAvaliacoes) config.googleTotalAvaliacoes = data.totalAvaliacoes;
    if (data.googleReviewUrl) config.googleReviewUrl = data.googleReviewUrl;
  }

  async function loadDepoimentosFromJson() {
    if ((config.depoimentos || []).length) {
      applyGoogleReviewsData({
        depoimentos: config.depoimentos,
        notaMedia: config.googleNotaMedia,
        totalAvaliacoes: config.googleTotalAvaliacoes,
        googleReviewUrl: config.googleReviewUrl,
      });
    }

    if (!config.googleReviewsJson) return;
    try {
      const res = await fetch(assetUrl(config.googleReviewsJson));
      if (!res.ok) return;
      applyGoogleReviewsData(await res.json());
    } catch (_) {}
  }

  function applyGoogleReviewData() {
    document.querySelectorAll('[data-google-nota]').forEach((el) => {
      el.textContent = String(config.googleNotaMedia ?? '4.6');
    });
    document.querySelectorAll('[data-google-total]').forEach((el) => {
      el.textContent = String(config.googleTotalAvaliacoes ?? '20');
    });
    document.querySelectorAll('[data-google-review]').forEach((el) => {
      if (config.googleReviewUrl) {
        el.href = config.googleReviewUrl;
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  function initReviewsAutoScroll() {
    const grid = document.getElementById('depoimentos-grid');
    if (!grid || window.matchMedia('(min-width: 1024px)').matches) return;

    let direction = 1;
    let paused = false;

    grid.addEventListener('mouseenter', () => { paused = true; });
    grid.addEventListener('mouseleave', () => { paused = false; });
    grid.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    grid.addEventListener('touchend', () => { paused = false; }, { passive: true });

    setInterval(() => {
      if (paused || grid.scrollWidth <= grid.clientWidth) return;
      const max = grid.scrollWidth - grid.clientWidth;
      if (grid.scrollLeft >= max - 2) direction = -1;
      if (grid.scrollLeft <= 2) direction = 1;
      grid.scrollLeft += direction * 1.2;
    }, 30);
  }

  function renderDiferenciais() {
    const list = document.getElementById('diferenciais-list');
    if (!list) return;
    list.innerHTML = (config.diferenciais || [])
      .map((d, i) => `<li class="diferencial-item reveal" style="--reveal-delay:${i * 0.08}s">${escapeHtml(d)}</li>`)
      .join('');
  }

  function renderFaq() {
    const list = document.getElementById('faq-list');
    const items = config.faq || [];
    if (!list || !items.length) return;

    list.innerHTML = items
      .map(
        (item) => `
      <details class="faq-item reveal">
        <summary>${escapeHtml(item.pergunta)}</summary>
        <p class="faq-item__answer">${escapeHtml(item.resposta)}</p>
      </details>`
      )
      .join('');
  }

  function absoluteUrl(path, base) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const clean = String(path).replace(/^\//, '');
    const root = (base || '').replace(/\/$/, '');
    if (root.endsWith('/site')) return `${root}/${clean}`;
    return root ? `${root}/${clean}` : `/${clean}`;
  }

  function resolveSiteBase() {
    const seo = config.seo || {};
    if (seo.canonicalUrl) return seo.canonicalUrl.replace(/\/$/, '');

    if (location.hostname.endsWith('.github.io')) {
      const parts = location.pathname.split('/').filter(Boolean);
      const repo = parts[0];
      if (repo && repo !== 'site' && repo !== 'assets') {
        return `${location.origin}/${repo}/site`;
      }
      return `${location.origin}/site`;
    }

    if (config.siteUrl && !config.modoDemo) {
      return config.siteUrl.replace(/\/$/, '');
    }

    return (config.githubPagesUrl || location.href).replace(/\/$/, '');
  }

  function setMetaContent(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function applySeoMeta() {
    const seo = config.seo || {};
    const base = resolveSiteBase();

    if (seo.title) document.title = seo.title;
    if (seo.description) setMetaContent('meta[name="description"]', seo.description);
    if (seo.keywords) setMetaContent('#seo-keywords', seo.keywords);
    if (seo.themeColor) setMetaContent('meta[name="theme-color"]', seo.themeColor);

    const robots = document.getElementById('seo-robots');
    if (robots) {
      const indexavel = seo.indexavel !== false;
      robots.setAttribute(
        'content',
        indexavel
          ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          : 'noindex, nofollow'
      );
    }

    const canonical = document.getElementById('seo-canonical');
    if (canonical && base) canonical.setAttribute('href', `${base}/`);

    setMetaContent('#seo-og-url', base ? `${base}/` : '');
    setMetaContent('meta[property="og:title"]', seo.title || document.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    const assetRoot = base.replace(/\/site$/, '');
    const ogImageAbs = absoluteUrl(config.ogImage, assetRoot);
    if (ogImageAbs) {
      setMetaContent('#seo-og-image', ogImageAbs);
      setMetaContent('#seo-twitter-image', ogImageAbs);
    }
    if (seo.twitterSite) setMetaContent('meta[name="twitter:site"]', seo.twitterSite);
    setMetaContent('meta[name="twitter:title"]', seo.title || document.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
  }

  function applyStructuredData() {
    const schemaEl = document.getElementById('seo-jsonld');
    const local = config.seoLocal || {};
    const seo = config.seo || {};
    const base = resolveSiteBase();
    if (!schemaEl) return;

    try {
      const data = JSON.parse(schemaEl.textContent);
      const graph = data['@graph'];
      if (!graph) return;

      const assetRoot = base.replace(/\/site$/, '');

      graph.forEach((node) => {
        if (node['@id'] === '#website') {
          node.url = `${base}/`;
          node.name = config.nomeEmpresa || node.name;
        }

        if (node['@id'] === '#business') {
          node.url = `${base}/`;
          node.name = config.nomeEmpresa || node.name;
          if (config.ogImage) node.image = absoluteUrl(config.ogImage, assetRoot);
          if (config.logoUrl) node.logo = absoluteUrl(config.logoUrl, assetRoot);
          if (config.whatsappNumero) node.telephone = `+${config.whatsappNumero}`;
          if (config.instagramUrl) {
            node.sameAs = [config.instagramUrl];
            if (config.instagramDmUrl) node.sameAs.push(config.instagramDmUrl);
          }
          if (seo.googleMapsUrl || config.googleReviewUrl) {
            node.hasMap = seo.googleMapsUrl || config.googleReviewUrl;
          }
          if (seo.knowsAbout) node.knowsAbout = seo.knowsAbout;

          node.address = {
            '@type': 'PostalAddress',
            streetAddress: local.streetAddress || config.endereco,
            addressLocality: local.addressLocality || 'Porto Alegre',
            addressRegion: local.addressRegion || 'RS',
            addressCountry: local.addressCountry || 'BR',
            postalCode: local.postalCode || config.cep,
            neighborhood: local.neighborhood || config.bairro,
          };

          if (local.geo) {
            node.geo = {
              '@type': 'GeoCoordinates',
              latitude: local.geo.latitude,
              longitude: local.geo.longitude,
            };
            node.areaServed = {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: local.geo.latitude,
                longitude: local.geo.longitude,
              },
              geoRadius: local.geoRadiusMeters || 30000,
            };
          }

          if (local.openingHours) {
            node.openingHoursSpecification = local.openingHours.map((h) => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.dayOfWeek,
              opens: h.opens,
              closes: h.closes,
            }));
          }

          if (config.googleNotaMedia) {
            node.aggregateRating = {
              '@type': 'AggregateRating',
              ratingValue: config.googleNotaMedia,
              reviewCount: config.googleTotalAvaliacoes || config.depoimentos?.length || 1,
              bestRating: 5,
              worstRating: 1,
            };
          }

          const reviews = (config.depoimentos || []).slice(0, 5);
          if (reviews.length) {
            node.review = reviews.map((r) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.nome || 'Cliente Google' },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.estrelas || 5,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody: r.texto,
              publisher: { '@type': 'Organization', name: 'Google' },
            }));
          }
        }

        if (node['@id'] === '#webpage') {
          node.url = `${base}/`;
          node.name = seo.title || document.title;
          node.description = seo.description;
          if (config.ogImage) node.primaryImageOfPage = absoluteUrl(config.ogImage, assetRoot);
        }

        if (node['@id'] === '#faq') {
          const items = config.faq || [];
          if (items.length) {
            node.mainEntity = items.map((item) => ({
              '@type': 'Question',
              name: item.pergunta,
              acceptedAnswer: { '@type': 'Answer', text: item.resposta },
            }));
          }
        }

        if (node['@id'] === '#breadcrumb') {
          node.itemListElement = [
            { '@type': 'ListItem', position: 1, name: 'Início', item: `${base}/#inicio` },
            { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${base}/#servicos` },
            { '@type': 'ListItem', position: 3, name: 'Avaliações', item: `${base}/#depoimentos` },
            { '@type': 'ListItem', position: 4, name: 'Localização', item: `${base}/#localizacao` },
          ];
        }
      });

      const servicos = config.servicos || [];
      const hasItemList = graph.some((n) => n['@id'] === '#servicos');
      if (servicos.length && !hasItemList) {
        graph.push({
          '@type': 'ItemList',
          '@id': '#servicos',
          name: 'Serviços Performance Hyosung',
          itemListElement: servicos.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.titulo,
            description: s.descricao,
          })),
        });
      } else if (hasItemList) {
        const itemList = graph.find((n) => n['@id'] === '#servicos');
        if (itemList) {
          itemList.itemListElement = servicos.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.titulo,
            description: s.descricao,
          }));
        }
      }

      schemaEl.textContent = JSON.stringify(data);
    } catch (_) {}
  }

  function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    };

    btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const close = document.getElementById('lightbox-close');
    if (!lightbox || !img) return;

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (!trigger) return;
      e.preventDefault();
      img.src = trigger.getAttribute('href') || trigger.querySelector('img')?.src;
      img.alt = trigger.querySelector('img')?.alt || '';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });

    const hide = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      img.src = '';
      document.body.style.overflow = '';
    };

    close?.addEventListener('click', hide);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hide();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) hide();
    });
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = entry.target.style.getPropertyValue('--reveal-delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  function initParallax() {
    const heroBg = document.querySelector('.hero__bg--mosaic') || document.querySelector('.hero__bg');
    if (!heroBg) return;
    window.addEventListener(
      'scroll',
      () => {
        const offset = window.scrollY * 0.35;
        heroBg.style.transform = `translateY(${offset}px) scale(1.04)`;
      },
      { passive: true }
    );
  }

  function initSpeedLines() {
    const container = document.getElementById('speed-lines');
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const line = document.createElement('span');
      line.className = 'speed-line';
      line.style.top = `${8 + Math.random() * 84}%`;
      line.style.animationDelay = `${Math.random() * 2}s`;
      line.style.animationDuration = `${0.8 + Math.random() * 1.2}s`;
      container.appendChild(line);
    }
  }

  function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w;
    let h;
    const particles = [];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
      };
    }

    resize();
    for (let i = 0; i < 40; i++) particles.push(createParticle());

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > h) {
          p.y = -4;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 163, 255, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    draw();
  }

  function initDemoExitBar() {
    if (!config.modoDemo || window.self !== window.top) return;

    const bar = document.createElement('div');
    bar.className = 'demo-exit-bar';
    bar.setAttribute('role', 'banner');

    const label = document.createElement('span');
    label.className = 'demo-exit-bar__label';
    label.textContent = 'Concept demo — Performance Hyosung';

    const link = document.createElement('a');
    link.className = 'demo-exit-bar__link';
    link.href = config.previewUrl || '../';
    link.textContent = '← Voltar ao preview';

    bar.append(label, link);
    document.body.prepend(bar);
    document.body.classList.add('demo-standalone');
  }

  async function init() {
    await loadGaleriaFromJson();
    await loadDepoimentosFromJson();
    applyContactLinks();
    applyInstagramLinks();
    applyContactData();
    applyHeroPoster();
    applyLogoImages();
    applyGoogleReviewData();
    applySeoMeta();
    renderMarcas();
    renderServicos();
    renderGaleria();
    renderDepoimentos();
    renderDiferenciais();
    renderFaq();
    applyStructuredData();
    initDemoExitBar();
    initMobileMenu();
    initHeaderScroll();
    initLightbox();
    initScrollReveal();
    initTiltCards();
    initParallax();
    initSpeedLines();
    initParticles();
    initReviewsAutoScroll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
