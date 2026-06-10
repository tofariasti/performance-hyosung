/**
 * Fallback: sincroniza posts do Instagram via Puppeteer quando a API retorna 429.
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
const PROFILE_FILE = path.join(ROOT, 'assets/images/instagram-profile.jpg');

const BROWSER_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
];

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
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

async function main() {
  const executablePath = findBrowser();
  if (!executablePath) {
    console.error('Chromium não encontrado. Instale chromium-browser ou use sync-instagram.py.');
    process.exit(1);
  }

  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  await page.goto(`https://www.instagram.com/${USERNAME}/`, {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  const data = await page.evaluate(() => {
    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    for (const script of scripts) {
      try {
        const json = JSON.parse(script.textContent);
        if (json?.mainEntityofPage?.['@id']) return null;
      } catch (_) {}
    }

    const shared = window._sharedData || window.__additionalDataLoaded;
    if (shared) return shared;

    const html = document.documentElement.innerHTML;
    const match = html.match(/"xdt_api__v1__feed__user_timeline_graphql_connection":(\{.*?\})\s*,\s*"/s)
      || html.match(/"edge_owner_to_timeline_media":(\{.*?\})\s*,\s*"edge_saved_media"/s);

    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (_) {}
    }

    const imgs = [...document.querySelectorAll('article img[src*="cdninstagram"]')];
    return {
      edges: imgs.slice(0, 12).map((img, i) => ({
        node: {
          shortcode: `post${i}`,
          display_url: img.src,
          edge_media_to_caption: { edges: [{ node: { text: img.alt || '' } }] },
        },
      })),
    };
  });

  let edges = [];
  if (data?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges) {
    edges = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
  } else if (data?.edges) {
    edges = data.edges;
  } else if (data?.edge_owner_to_timeline_media?.edges) {
    edges = data.edge_owner_to_timeline_media.edges;
  }

  const profilePic = await page.$eval('header img', (img) => img.src).catch(() => null);
  if (profilePic) {
    await download(profilePic, PROFILE_FILE);
    console.log('Perfil salvo');
  }

  const galeria = [];
  let index = 0;

  for (const edge of edges.slice(0, 12)) {
    const node = edge.node || edge;
    const shortcode = node.shortcode || `img${index}`;
    const imageUrl = node.display_url || node.thumbnail_src || node.displayUrl;
    if (!imageUrl) continue;

    index += 1;
    const fname = `${String(index).padStart(2, '0')}-${shortcode}.jpg`;
    const dest = path.join(IMG_DIR, fname);
    await download(imageUrl, dest);

    let caption = '';
    const capEdges = node.edge_media_to_caption?.edges;
    if (capEdges?.[0]?.node?.text) caption = capEdges[0].node.text;

    galeria.push({
      imagem: `assets/images/instagram/${fname}`,
      alt: cleanCaption(caption),
      instagramUrl: shortcode.startsWith('post') || shortcode.startsWith('img')
        ? `https://www.instagram.com/${USERNAME}/`
        : `https://www.instagram.com/p/${shortcode}/`,
      shortcode,
    });
    console.log(`Baixado: ${fname}`);
  }

  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ username: USERNAME, posts: galeria }, null, 2),
    'utf8'
  );

  await browser.close();
  console.log(`Concluído: ${galeria.length} imagens`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
