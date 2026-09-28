'use strict';
/* Aba "Vídeos Virais".
   As capas ficam em assets/videos e seguem o padrão V1.avif, V2.avif, V3.avif...
   ("V" maiúsculo, ".avif" minúsculo). Para adicionar um vídeo, inclua um item
   na lista abaixo com o próximo número e coloque a capa correspondente na pasta. */
const VIRAL_VIDEOS = [
  { n: 1, title: 'Sérum que virou febre: o antes e depois em 7 dias',        url: 'https://www.tiktok.com/tag/tiktokmademebuyit' },
  { n: 2, title: 'Achadinhos que todo mundo está comprando essa semana',      url: 'https://www.tiktok.com/tag/achadinhos' },
  { n: 3, title: 'Mini projetor 4K: a sala de cinema mais barata do TikTok',  url: 'https://www.tiktok.com/tag/produtosviral' }
];

const VV_COVER_DIR = 'assets/videos/';
const VV_STATUS_STEPS = [
  'Conectando ao TikTok…',
  'Varrendo vídeos em alta…',
  'Filtrando o que está bombando agora…'
];
const VV_REFRESH_AFTER_MS = 60 * 1000;

let vvRun = 0;
let vvLastMined = 0;
let vvMining = false;

function vvEsc(s) { return (window.Sanitize && Sanitize.escapeHTML) ? Sanitize.escapeHTML(s) : String(s); }
function vvSafeUrl(u) { return /^https:\/\/([a-z0-9-]+\.)?tiktok\.com\//i.test(u) ? u : '#'; }
function vvCoverSrc(n) { return VV_COVER_DIR + 'V' + n + '.avif'; }
function vvReducedMotion() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }

const VV_ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
const VV_ICON_VIDEO = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>';
const VV_ICON_OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

function vvSkeletonCard() {
  return '<div class="vv-card is-scanning" aria-hidden="true">' +
    '<div class="vv-cover"></div>' +
    '<div class="vv-body"><div class="vv-bar"></div><div class="vv-bar short"></div></div></div>';
}

function vvFoundCard(v) {
  const title = vvEsc(v.title);
  const href = vvSafeUrl(v.url);
  return '<a class="vv-cover" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="Abrir no TikTok: ' + title + '">' +
      '<img src="' + vvCoverSrc(v.n) + '" alt="Capa do vídeo: ' + title + '" loading="lazy">' +
      '<span class="vv-cover-fallback">' + VV_ICON_VIDEO + '<span>V' + v.n + '</span></span>' +
      '<span class="vv-hot">Em alta agora</span>' +
      '<span class="vv-play" aria-hidden="true">' + VV_ICON_PLAY + '</span>' +
    '</a>' +
    '<div class="vv-body">' +
      '<div class="vv-title">' + title + '</div>' +
      '<a class="vv-link" href="' + href + '" target="_blank" rel="noopener noreferrer">' + VV_ICON_OPEN + 'Ver no TikTok</a>' +
    '</div>';
}

function vvRevealCard(card, v) {
  card.className = 'vv-card is-found';
  card.removeAttribute('aria-hidden');
  card.innerHTML = vvFoundCard(v);
  const img = card.querySelector('.vv-cover img');
  const cover = card.querySelector('.vv-cover');
  if (img && cover) img.addEventListener('error', () => cover.classList.add('no-cover'), { once: true });
}

function vvSetRadar(state, status, count) {
  const radar = document.getElementById('vv-radar');
  if (!radar) return;
  radar.classList.toggle('is-mining', state === 'mining');
  radar.classList.toggle('is-done', state === 'done');
  const s = document.getElementById('vv-status');
  const c = document.getElementById('vv-count');
  if (s && status != null) s.textContent = status;
  if (c && count != null) c.textContent = count;
  const btn = document.getElementById('vv-remine');
  if (btn) btn.disabled = state === 'mining';
}

function vvShowAll() {
  const grid = document.getElementById('vv-grid');
  if (!grid) return;
  grid.innerHTML = VIRAL_VIDEOS.map(() => '<div></div>').join('');
  Array.from(grid.children).forEach((el, i) => { el.className = 'vv-card'; vvRevealCard(el, VIRAL_VIDEOS[i]); el.classList.remove('is-found'); });
  vvSetRadar('done', VIRAL_VIDEOS.length + ' vídeos em alta encontrados', 'Varredura concluída');
}

function startViralMining(force) {
  const grid = document.getElementById('vv-grid');
  if (!grid || vvMining) return;
  if (!force && vvLastMined && Date.now() - vvLastMined < VV_REFRESH_AFTER_MS) return;
  vvLastMined = Date.now();

  if (vvReducedMotion()) { vvShowAll(); return; }

  const run = ++vvRun;
  vvMining = true;
  const alive = () => run === vvRun;
  grid.innerHTML = VIRAL_VIDEOS.map(vvSkeletonCard).join('');
  const cards = Array.from(grid.children);

  const total = 900 + Math.floor(Math.random() * 700);
  const t0 = performance.now();
  const DURATION = 2600;
  let stepIdx = 0;
  vvSetRadar('mining', VV_STATUS_STEPS[0], '0 vídeos analisados');

  (function tick(now) {
    if (!alive()) return;
    const p = Math.min(1, ((now || performance.now()) - t0) / DURATION);
    const eased = 1 - Math.pow(1 - p, 3);
    const nextStep = Math.min(VV_STATUS_STEPS.length - 1, Math.floor(p * VV_STATUS_STEPS.length));
    if (nextStep !== stepIdx) { stepIdx = nextStep; vvSetRadar('mining', VV_STATUS_STEPS[stepIdx], null); }
    const c = document.getElementById('vv-count');
    if (c) c.textContent = Math.round(total * eased).toLocaleString('pt-BR') + ' vídeos analisados';
    if (p < 1) requestAnimationFrame(tick);
  })();

  cards.forEach((card, i) => {
    setTimeout(() => {
      if (!alive()) return;
      vvRevealCard(card, VIRAL_VIDEOS[i]);
      vvSetRadar('mining', (i + 1) + (i === 0 ? ' vídeo em alta encontrado' : ' vídeos em alta encontrados'), null);
    }, 1500 + i * 520);
  });

  setTimeout(() => {
    if (!alive()) return;
    vvMining = false;
    vvSetRadar('done', VIRAL_VIDEOS.length + ' vídeos em alta encontrados', total.toLocaleString('pt-BR') + ' vídeos analisados');
  }, 1500 + cards.length * 520 + 300);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('vv-remine');
  if (btn) btn.addEventListener('click', () => startViralMining(true));
});
