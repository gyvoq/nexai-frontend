'use strict';

const VIRAL_VIDEOS = [
  { n: 1, title: 'Sérum que virou febre: o antes e depois em 7 dias',        url: 'https://www.tiktok.com/tag/tiktokmademebuyit' },
  { n: 2, title: 'Achadinhos que todo mundo está comprando essa semana',      url: 'https://www.tiktok.com/tag/achadinhos' },
  { n: 3, title: 'Mini projetor 4K: a sala de cinema mais barata do TikTok',  url: 'https://www.tiktok.com/tag/produtosviral' }
];

const VV_COVER_DIR = 'assets/videos/';
const VV_LOADING_MS = 1500;
const VV_REFRESH_AFTER_MS = 60 * 1000;

let vvRun = 0;
let vvLastMined = 0;
let vvMining = false;

function vvEsc(s) { return (window.Sanitize && Sanitize.escapeHTML) ? Sanitize.escapeHTML(s) : String(s); }
function vvSafeUrl(u) { return /^https:\/\/([a-z0-9-]+\.)?tiktok\.com\//i.test(u) ? u : '#'; }
function vvCoverSrc(n) { return VV_COVER_DIR + 'V' + n + '.avif'; }

const VV_ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
const VV_ICON_VIDEO = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>';
const VV_ICON_OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

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
  card.className = 'vv-card';
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
  Array.from(grid.children).forEach((el, i) => vvRevealCard(el, VIRAL_VIDEOS[i]));
  vvSetRadar('done', VIRAL_VIDEOS.length + ' vídeos em alta encontrados', '');
}

function startViralMining(force) {
  const grid = document.getElementById('vv-grid');
  if (!grid || vvMining) return;
  if (!force && vvLastMined && Date.now() - vvLastMined < VV_REFRESH_AFTER_MS) return;
  vvLastMined = Date.now();

  const run = ++vvRun;
  vvMining = true;
  grid.innerHTML = '<div class="vv-loading" role="status" aria-label="Carregando"><div class="vv-spinner"></div></div>';
  vvSetRadar('mining', 'Buscando vídeos em alta…', '');

  setTimeout(() => {
    if (run !== vvRun) return;
    vvMining = false;
    vvShowAll();
  }, VV_LOADING_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('vv-remine');
  if (btn) btn.addEventListener('click', () => startViralMining(true));
});
