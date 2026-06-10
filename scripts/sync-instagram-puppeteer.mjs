/**
 * Sincroniza posts do Instagram via Puppeteer (intercepta API + fallback DOM).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const USERNAME = 'performancehyosung';
const IMG_DIR = path.join(ROOT, 'assets/images/instagram');
const DATA_FILE = path.join(ROOT, 'assets/data/instagram-posts.json');
const CONFIG_FILE = path.join(ROOT, 'assets/js/config.js');
const PROFILE_FILE = path.join(ROOT, 'assets/images/instagram-profile.jpg');

const BROWSER_PATHS = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findBrowser() {
  return BROWSER_PATHS.find((p) => fs.existsSync(p));
}

function cleanCaption(text) {
  return String(text || 'Performance Hyosung — oficina de motos')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.instagram.com/' },
  });
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url.slice(0, 80)}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

function extractPostsFromApiPayload(data) {
  const user = data?.data?.user || data?.graphql?.user || data?.user;
  if (!user) return { user: null, posts: [] };

  const edges = user.edge_owner_to_timeline_media?.edges || [];
  const posts = [];

  for (const edge of edges) {
    const node = edge.node || edge;
    const shortcode = node.shortcode;
    let caption = '';
    if (node.edge_media_to_caption?.edges?.[0]?.node?.text) {
      caption = node.edge_media_to_caption.edges[0].node.text;
    }

    const nodes =
      node.__typename === 'GraphSidecar'
        ? (node.edge_sidecar_to_children?.edges || []).map((e) => e.node)
        : [node];

    for (const child of nodes) {
      const imageUrl = child.display_url || child.displayUrl || child.thumbnail_src;
      if (imageUrl && shortcode) {
        posts.push({ shortcode, url: imageUrl, caption });
      }
    }
  }

  return {
    user,
    posts: posts.slice(0, 12),
  };
}

function parsePostsFromHtml(html) {
  const posts = [];
  const patterns = [
    /"display_url":"([^"]+)","edge_media_to_caption"/g,
    /"shortcode":"([A-Za-z0-9_-]+)"[^}]*?"display_url":"([^"]+)"/g,
  ];

  const shortcodeRe = /instagram\.com\/p\/([A-Za-z0-9_-]+)/g;
  const seen = new Set();

  let m;
  const scRe = /"shortcode":"([A-Za-z0-9_-]{5,})"/g;
  const urlRe = /"display_url":"(https:\\\/\\\/[^"]+)"/g;
  const shortcodes = [...html.matchAll(scRe)].map((x) => x[1]);
  const urls = [...html.matchAll(urlRe)].map((x) => x[1].replace(/\\\//g, '/'));

  for (let i = 0; i < Math.min(shortcodes.length, urls.length, 12); i++) {
    const key = shortcodes[i];
    if (seen.has(key)) continue;
    seen.add(key);
    posts.push({ shortcode: key, url: urls[i], caption: '' });
  }

  return posts;
}

async function main() {
  const executablePath = findBrowser();
  if (!executablePath) {
    console.error('Chrome/Chromium não encontrado.');
    process.exit(1);
  }

  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

  let apiPayload = null;
  let profileUrl = null;

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--lang=pt-BR',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  );
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8' });

  page.on('response', async (response) => {
    const url = response.url();
    if (
      !apiPayload &&
      (url.includes('web_profile_info') ||
        url.includes('graphql') ||
        url.includes('user_timeline'))
    ) {
      try {
        const json = await response.json();
        if (json?.data?.user || json?.graphql?.user) {
          apiPayload = json;
        }
      } catch (_) {}
    }
  });

  await page.goto(`https://www.instagram.com/${USERNAME}/`, {
    waitUntil: 'networkidle2',
    timeout: 90000,
  });

  await new Promise((r) => setTimeout(r, 3000));

  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise((r) => setTimeout(r, 1500));
  }

  let posts = [];
  let user = null;

  if (apiPayload) {
    ({ user, posts } = extractPostsFromApiPayload(apiPayload));
    console.log(`API interceptada: ${posts.length} imagens`);
  }

  if (!posts.length) {
    const html = await page.content();
    posts = parsePostsFromHtml(html);
    console.log(`HTML parseado: ${posts.length} imagens`);
  }

  if (!posts.length) {
    const domPosts = await page.evaluate((username) => {
      const links = [...document.querySelectorAll('a[href*="/p/"]')];
      const out = [];
      const seen = new Set();

      for (const link of links) {
        const m = link.href.match(/\/p\/([A-Za-z0-9_-]+)/);
        if (!m || seen.has(m[1])) continue;
        const img = link.querySelector('img[src*="cdninstagram"], img[src*="fbcdn"]');
        if (!img?.src) continue;
        seen.add(m[1]);
        out.push({
          shortcode: m[1],
          url: img.src,
          caption: img.alt || '',
        });
        if (out.length >= 12) break;
      }
      return out;
    }, USERNAME);
    posts = domPosts;
    console.log(`DOM scrape: ${posts.length} imagens`);
  }

  profileUrl =
    user?.profile_pic_url_hd ||
    user?.profile_pic_url ||
    (await page.$eval('header img', (img) => img.src).catch(() => null));

  if (profileUrl) {
    try {
      await download(profileUrl, PROFILE_FILE);
      console.log('Perfil salvo');
    } catch (e) {
      console.warn('Perfil:', e.message);
    }
  }

  const galeria = [];
  let index = 0;

  for (const post of posts.slice(0, 12)) {
    if (!post.url) continue;
    index += 1;
    const fname = `${String(index).padStart(2, '0')}-${post.shortcode}.jpg`;
    const dest = path.join(IMG_DIR, fname);
    try {
      await download(post.url, dest);
      galeria.push({
        imagem: `assets/images/instagram/${fname}`,
        alt: cleanCaption(post.caption),
        instagramUrl: `https://www.instagram.com/p/${post.shortcode}/`,
        shortcode: post.shortcode,
      });
      console.log(`Baixado: ${fname}`);
    } catch (e) {
      console.warn(`Falha ${fname}:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  if (!galeria.length) {
    await browser.close();
    console.error('Nenhuma imagem obtida. Instagram pode exigir login ou bloquear automação.');
    process.exit(1);
  }

  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      {
        username: USERNAME,
        syncedAt: new Date().toISOString().slice(0, 10),
        posts: galeria,
      },
      null,
      2
    ),
    'utf8'
  );

  syncGaleriaToConfig(galeria);

  await browser.close();
  console.log(`Concluído: ${galeria.length} imagens em ${IMG_DIR}`);
}

function syncGaleriaToConfig(posts) {
  if (!fs.existsSync(CONFIG_FILE)) return;
  const items = posts
    .map(
      (p) => `    {
      imagem: '${p.imagem}',
      alt: ${JSON.stringify(cleanCaption(p.alt || p.caption))},
      instagramUrl: 'https://www.instagram.com/p/${p.shortcode}/',
      shortcode: '${p.shortcode}',
    }`
    )
    .join(',\n');
  const block = `  galeria: [\n${items},\n  ],`;
  const src = fs.readFileSync(CONFIG_FILE, 'utf8');
  const next = src.replace(/  galeria: \[[\s\S]*?\],\n\n  googleReviewsJson:/, `${block}\n\n  googleReviewsJson:`);
  if (next !== src) {
    fs.writeFileSync(CONFIG_FILE, next, 'utf8');
    console.log('config.js galeria atualizada');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
