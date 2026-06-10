import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs', 'marketing');

const baseUrl = process.env.SCREENSHOT_URL
  || 'https://tofariasti.github.io/performance-hyosung/site/index.html';

const demoUrl = process.env.DEMO_URL
  || 'https://tofariasti.github.io/performance-hyosung/';

const shots = [
  {
    file: '01-hero-mobile.png',
    url: baseUrl,
    viewport: { width: 390, height: 844, deviceScaleFactor: 2 },
    selector: '#inicio',
    padding: 0,
  },
  {
    file: '02-hero-desktop.png',
    url: baseUrl,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    selector: '#inicio',
    padding: 0,
  },
  {
    file: '03-servicos.png',
    url: baseUrl,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    selector: '#servicos',
    padding: 16,
  },
  {
    file: '04-galeria.png',
    url: baseUrl,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    selector: '#galeria',
    padding: 16,
  },
  {
    file: '05-depoimentos.png',
    url: baseUrl,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    selector: '#depoimentos',
    padding: 16,
  },
  {
    file: '06-localizacao.png',
    url: baseUrl,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    selector: '#localizacao',
    padding: 16,
  },
  {
    file: '07-contato-instagram.png',
    url: baseUrl,
    viewport: { width: 390, height: 844, deviceScaleFactor: 2 },
    selector: '#contato',
    padding: 0,
  },
  {
    file: '08-demo-moldura.png',
    url: demoUrl,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  },
];

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

async function capture(page, shot) {
  await page.setViewport(shot.viewport);
  await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  if (shot.selector) {
    const el = await page.$(shot.selector);
    if (!el) throw new Error(`Selector not found: ${shot.selector}`);
    await el.screenshot({
      path: path.join(outDir, shot.file),
      type: 'png',
      padding: shot.padding ?? 0,
    });
    return;
  }

  if (shot.clip) {
    await page.screenshot({
      path: path.join(outDir, shot.file),
      type: 'png',
      clip: shot.clip,
    });
    return;
  }

  await page.screenshot({
    path: path.join(outDir, shot.file),
    type: 'png',
    fullPage: shot.fullPage ?? false,
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const executablePath = findChrome();
  if (!executablePath) {
    console.error('Chrome/Chromium não encontrado.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    for (const shot of shots) {
      console.log(`Capturando ${shot.file}...`);
      await capture(page, shot);
    }
    console.log(`Concluído: ${shots.length} prints em ${outDir}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
