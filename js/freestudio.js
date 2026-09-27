'use strict';
function fsEscape(str) {
  return (window.Sanitize && Sanitize.escapeHTML) ? Sanitize.escapeHTML(str) : String(str);
}
function fsToast(msg) {
  if (typeof showToast === 'function') showToast(msg);
}
function fsCopy(text, btn) {
  navigator.clipboard?.writeText(text).then(() => fsToast('Copiado!')).catch(() => {});
}

function toggleNicheFilter(forceClose) {
  const wrap = document.getElementById('niche-filter-wrap');
  if (!wrap) return;
  if (forceClose === true) { wrap.classList.remove('open'); return; }
  wrap.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('niche-filter-wrap');
  if (!wrap) return;
  if (!wrap.contains(e.target)) wrap.classList.remove('open');
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mining-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const label = document.getElementById('niche-filter-label');
      if (label) label.textContent = chip.textContent.trim() || 'Todos os nichos';
      toggleNicheFilter(true);
    });
  });
});

const INVENTORY_KEY = 'viralyze-selected-products';
function getSelectedInventory() {
  try { return JSON.parse(localStorage.getItem(INVENTORY_KEY) || '[]'); } catch (e) { return []; }
}
function addToInventory(id, name) {
  const list = getSelectedInventory();
  if (!list.includes(id)) {
    list.push(id);
    try { localStorage.setItem(INVENTORY_KEY, JSON.stringify(list)); } catch (e) {}
  }
  fsToast('Produto adicionado!');
}

const FS_PROJECTS_KEY = 'viralyze-fs-projects';
function fsLoadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(FS_PROJECTS_KEY) || 'null');
    if (saved && saved.length) return saved;
  } catch (e) {}
  return [
    { id: 'p1', title: 'Sérum Facial — vídeo UGC' },
    { id: 'p2', title: 'Ideias para o lançamento de verão' },
    { id: 'p3', title: 'Roteiro unboxing tech' },
    { id: 'p4', title: 'Prompt para avatar novo' }
  ];
}
let fsProjects = fsLoadProjects();
function fsSaveProjects() {
  try { localStorage.setItem(FS_PROJECTS_KEY, JSON.stringify(fsProjects)); } catch (e) {}
}

let fsActiveProject = null;
let fsMode = 'imagem';
let fsVideoStep = 0;
let fsVideoAnswers = {};

function renderFsProjects() {
  const grid = document.getElementById('fs-project-grid');
  if (!grid) return;
  grid.innerHTML =
    `<div class="fs-new-project-card" onclick="fsCreateProject()" role="button" tabindex="0">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>Novo projeto</span>
    </div>` +
    fsProjects.map(p => `<div class="fs-project-card" onclick="fsOpenProject('${p.id}')" role="button" tabindex="0">
      <div class="fs-project-card-title">${fsEscape(p.title)}</div>
      <div class="fs-project-card-meta">Estúdio Livre</div>
    </div>`).join('');
}

function fsCreateProject() {
  const id = 'p' + Date.now();
  const project = { id, title: 'Novo projeto' };
  fsProjects.unshift(project);
  fsSaveProjects();
  fsOpenProject(id);
}

function fsOpenProject(id) {
  fsActiveProject = fsProjects.find(p => p.id === id) || { id, title: 'Novo projeto' };
  document.getElementById('fs-projects-view').style.display = 'none';
  document.getElementById('fs-chat-view').style.display = 'flex';
  document.getElementById('fs-chat-title').textContent = fsActiveProject.title;
  fsSetMode('imagem');
}

function fsBackToProjects() {
  document.getElementById('fs-chat-view').style.display = 'none';
  document.getElementById('fs-projects-view').style.display = 'block';
  renderFsProjects();
}

function fsSetMode(mode) {
  fsMode = mode;
  document.querySelectorAll('.fs-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  const body = document.getElementById('fs-chat-body');
  const quick = document.getElementById('fs-quick-replies');
  const inputRow = document.getElementById('fs-chat-inputrow');
  const upload = document.getElementById('fs-upload-zone');
  const styleInput = document.getElementById('fs-style-input');
  const extractBtn = document.getElementById('fs-extract-btn');
  quick.innerHTML = '';
  body.innerHTML = '';
  upload.style.display = 'none';
  styleInput.style.display = 'none';
  extractBtn.style.display = 'none';
  inputRow.style.display = 'flex';

  if (mode === 'imagem') {
    fsAddMsg('bot', 'Esse é o gerador de imagem — ainda é só um protótipo. Descreva a imagem que você quer e clique em enviar pra ver como vai funcionar.');
    document.getElementById('fs-chat-input').placeholder = 'Descreva a imagem que você quer gerar...';
  } else if (mode === 'video') {
    fsVideoStep = 0;
    fsVideoAnswers = {};
    inputRow.style.display = 'flex';
    fsAskNextVideoQuestion();
  } else if (mode === 'extrair') {
    inputRow.style.display = 'none';
    upload.style.display = 'block';
    styleInput.style.display = 'block';
    extractBtn.style.display = 'inline-flex';
    upload.classList.remove('has-file');
    upload.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><div>Clique para enviar o vídeo de referência</div>`;
    fsAddMsg('bot', 'Envie o vídeo viral que você quer usar de referência e descreva o estilo dele. A IA "extrai" o movimento e te devolve um prompt pronto.');
  }
}

function fsAddMsg(who, html, opts = {}) {
  const body = document.getElementById('fs-chat-body');
  const div = document.createElement('div');
  div.className = 'fs-msg ' + who + (opts.final ? ' prompt-final' : '');
  div.innerHTML = (opts.label ? `<div class="fs-msg-label">${opts.label}</div>` : '') + `<div>${html}</div>`;
  if (opts.final) {
    const actions = document.createElement('div');
    actions.className = 'fs-msg-actions';
    actions.innerHTML = `<button class="fs-copy-btn" type="button"><svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar prompt</button>`;
    actions.querySelector('button').addEventListener('click', () => fsCopy(opts.rawText || html));
    div.appendChild(actions);
  }
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function fsQuickReplies(options) {
  const quick = document.getElementById('fs-quick-replies');
  quick.innerHTML = options.map(o => `<button type="button" class="fs-quick-reply">${fsEscape(o)}</button>`).join('');
  quick.querySelectorAll('.fs-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => fsHandleAnswer(btn.textContent));
  });
}

const FS_VIDEO_QUESTIONS = [
  { key: 'produto', q: 'Qual é o produto ou tema do vídeo?' },
  { key: 'tom', q: 'Qual tom o vídeo deve ter?', options: ['Empolgado', 'Natural', 'Humorístico', 'Educativo'] },
  { key: 'formato', q: 'Pra qual formato é o vídeo?', options: ['TikTok (9:16)', 'Reels (9:16)', 'YouTube Shorts'] },
  { key: 'duracao', q: 'Quantos segundos o vídeo deve ter?', options: ['7s', '15s', '30s', '60s'] }
];

function fsAskNextVideoQuestion() {
  const quick = document.getElementById('fs-quick-replies');
  quick.innerHTML = '';
  if (fsVideoStep >= FS_VIDEO_QUESTIONS.length) {
    fsFinishVideoPrompt();
    return;
  }
  const step = FS_VIDEO_QUESTIONS[fsVideoStep];
  fsAddMsg('bot', step.q);
  if (step.options) fsQuickReplies(step.options);
}

function fsHandleAnswer(text) {
  if (fsMode !== 'video') return;
  if (!text || !text.trim()) return;
  fsAddMsg('user', fsEscape(text));
  const step = FS_VIDEO_QUESTIONS[fsVideoStep];
  if (step) fsVideoAnswers[step.key] = text.trim();
  fsVideoStep++;
  document.getElementById('fs-quick-replies').innerHTML = '';
  setTimeout(fsAskNextVideoQuestion, 300);
}

function fsFinishVideoPrompt() {
  const a = fsVideoAnswers;
  const prompt = `Vertical ${a.formato || 'TikTok (9:16)'} video, ${a.duracao || '15s'} long, ${(a.tom || 'natural').toLowerCase()} tone. Product/theme: ${a.produto || 'product'}. Handheld selfie-style UGC shot, natural lighting, authentic delivery, quick hook in the first 2 seconds, clear call to action at the end.`;
  fsAddMsg('bot', 'Prontinho! Seu prompt de vídeo está pronto.');
  fsAddMsg('bot', fsEscape(prompt), { final: true, label: 'Prompt de vídeo', rawText: prompt });
  fsQuickReplies(['Recomeçar']);
  const quick = document.getElementById('fs-quick-replies');
  quick.querySelector('.fs-quick-reply').addEventListener('click', () => fsSetMode('video'), { once: true });
}

const FS_EXTRACT_PROMPTS = [
  'Handheld mirror selfie shot, natural indoor lighting, subject holding product at chest height, slow subtle sway, casual UGC energy, 9:16 vertical.',
  'Static tripod shot, subject enters frame from the side, product reveal at center, soft window light, minimal camera movement, clean background.',
  'POV hands-only shot, product being unboxed on a wooden table, warm lighting, close-up detail shots, gentle camera drift.',
  'Walking selfie shot, subject talking to camera while walking outdoors, golden hour light, natural bounce, casual clothing.',
  'Slow zoom-in on product placed on a bathroom counter, soft diffused light, steady tripod shot, minimalist aesthetic.',
  'Try-on mirror shot, full body, subject turning slowly to show the product from different angles, ring light setup.',
  'Close-up POV shot of hands applying/using the product, shallow depth of field, cozy home setting, natural light.',
  'Dynamic handheld shot following the subject from a low angle, energetic movement, outdoor urban background.',
  'Before/after style shot, static camera, subject stepping into frame, side-by-side comparison feel, bright even lighting.',
  'Studio-style shot on seamless backdrop, subject rotating product in hand, soft box lighting, slow orbit camera movement.'
];
let fsExtractFile = null;
function fsHandleUploadClick() {
  const input = document.getElementById('fs-video-file-input');
  input.click();
}
function fsHandleUploadChange(e) {
  const file = e.target.files && e.target.files[0];
  const zone = document.getElementById('fs-upload-zone');
  if (!file) return;
  fsExtractFile = file;
  zone.classList.add('has-file');
  zone.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><div>${fsEscape(file.name)}</div>`;
}
function fsRunExtract() {
  if (!fsExtractFile) { fsToast('Envie um vídeo primeiro'); return; }
  const style = (document.getElementById('fs-style-input').value || '').trim();
  fsAddMsg('user', `Vídeo: ${fsEscape(fsExtractFile.name)}${style ? ' · Estilo: ' + fsEscape(style) : ''}`);
  fsAddMsg('bot', 'Analisando o movimento do vídeo de referência...');
  setTimeout(() => {
    let hash = 0;
    const key = (style || fsExtractFile.name);
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    const prompt = FS_EXTRACT_PROMPTS[hash % FS_EXTRACT_PROMPTS.length];
    fsAddMsg('bot', 'Movimento extraído com sucesso!');
    fsAddMsg('bot', fsEscape(prompt), { final: true, label: 'Prompt extraído', rawText: prompt });
  }, 900);
}

function fsSendMessage() {
  const input = document.getElementById('fs-chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  if (fsMode === 'imagem') {
    fsAddMsg('user', fsEscape(text));
    setTimeout(() => {
      fsAddMsg('bot', '🖼️ Protótipo — a geração de imagem ainda não está ativa nesta versão. Em breve sua imagem aparecerá aqui.');
    }, 400);
  } else if (fsMode === 'video') {
    fsHandleAnswer(text);
  }
}

const VIRALIZE_PROMPTS = {
  beleza: 'UGC-style vertical video, subject applying skincare product in a bright bathroom, natural morning light, close-up on texture, upbeat trending audio, hook: "minha pele nunca ficou assim tão rápido", 15s TikTok format.',
  fitness: 'Handheld gym vertical video, subject holding product mid-workout, energetic pacing, quick cuts every 2s, hook: "o que eu uso antes de todo treino", upbeat trending audio, 15s TikTok format.',
  moda: 'Try-on haul vertical video, subject rotating in front of mirror showing outfit/product, trendy transition cuts, hook: "isso tá bombando no TikTok", 20s Reels format.',
  tech: 'Clean desk-setup vertical video, subject unboxing product with close-up detail shots, satisfying ASMR sounds, hook: "gadget que todo mundo devia ter", 25s TikTok format.',
  casa: 'Cozy home vertical video, subject using product in a styled living space, soft natural light, slow pans, hook: "transformou minha casa em 1 dia", 20s Reels format.',
  saude: 'Bright kitchen/bathroom vertical video, subject using wellness product as part of a morning routine, calm pacing, hook: "meu ritual de saúde matinal", 15s TikTok format.'
};
function fsNicheKeyFromAvatar(a) {
  const n = (a.nicho || '').toLowerCase();
  if (n.includes('beleza')) return 'beleza';
  if (n.includes('fitness')) return 'fitness';
  if (n.includes('moda')) return 'moda';
  if (n.includes('tech')) return 'tech';
  if (n.includes('casa') || n.includes('lifestyle')) return 'casa';
  if (n.includes('saúde') || n.includes('saude') || n.includes('wellness')) return 'saude';
  return 'moda';
}
function renderViralizeAvatars() {
  const grid = document.getElementById('viralize-avatar-grid');
  if (!grid || typeof avatars === 'undefined') return;
  grid.innerHTML = avatars.map(a => `<div class="viralize-avatar-card" data-id="${a.id}" onclick="selectViralizeAvatar(${a.id})" role="button" tabindex="0">
      <div class="viralize-avatar-photo"><img src="${a.img}" alt="${fsEscape(a.name)}" loading="lazy"></div>
      <div class="viralize-avatar-name">${fsEscape(a.name)}</div>
      <div class="viralize-avatar-nicho">${fsEscape(a.nicho)}</div>
    </div>`).join('');
  viralizeRenderLimitUI();
}

const VIRALIZE_DAILY_LIMIT = 4;
const VIRALIZE_USAGE_KEY = 'viralyze-viralize-usage';

function viralizeTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function viralizeGetUsage() {
  let usage;
  try { usage = JSON.parse(localStorage.getItem(VIRALIZE_USAGE_KEY) || 'null'); } catch (e) { usage = null; }
  const today = viralizeTodayStr();
  if (!usage || usage.date !== today) {
    usage = { date: today, count: 0, lastId: null };
    localStorage.setItem(VIRALIZE_USAGE_KEY, JSON.stringify(usage));
  }
  return usage;
}

function viralizeSaveUsage(usage) {
  localStorage.setItem(VIRALIZE_USAGE_KEY, JSON.stringify(usage));
}

function viralizeRenderLimitUI() {
  const usage = viralizeGetUsage();
  const grid = document.getElementById('viralize-avatar-grid');
  const limitReached = usage.count >= VIRALIZE_DAILY_LIMIT;
  if (grid) grid.classList.toggle('viralize-limit-reached', limitReached);
  let notice = document.getElementById('viralize-limit-notice');
  if (limitReached) {
    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'viralize-limit-notice';
      notice.className = 'viralize-limit-notice';
      grid.insertAdjacentElement('beforebegin', notice);
    }
    notice.innerHTML = `Você usou suas <strong>${VIRALIZE_DAILY_LIMIT} prévias grátis</strong> de hoje. Volte amanhã pra gerar mais combinações.`;
  } else if (notice) {
    notice.remove();
  }
}

function selectViralizeAvatar(id) {
  if (typeof avatars === 'undefined') return;
  const avatar = avatars.find(a => a.id === id);
  if (!avatar) return;

  const usage = viralizeGetUsage();
  const alreadyCurrent = usage.lastId === id;
  if (!alreadyCurrent && usage.count >= VIRALIZE_DAILY_LIMIT) {
    viralizeRenderLimitUI();
    showToast('Limite diário de prévias atingido. Volte amanhã!');
    return;
  }
  if (!alreadyCurrent) {
    usage.count += 1;
    usage.lastId = id;
    viralizeSaveUsage(usage);
    viralizeRenderLimitUI();
  }

  document.querySelectorAll('.viralize-avatar-card').forEach(c => c.classList.toggle('selected', Number(c.dataset.id) === id));
  const key = fsNicheKeyFromAvatar(avatar);
  const prompt = VIRALIZE_PROMPTS[key];
  const out = document.getElementById('viralize-output');
  out.classList.add('visible');
  document.getElementById('viralize-output-avatar').textContent = avatar.name;
  document.getElementById('viralize-output-text').textContent = prompt;
  out.dataset.rawText = prompt;
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function copyViralizeOutput() {
  const out = document.getElementById('viralize-output');
  if (out && out.dataset.rawText) fsCopy(out.dataset.rawText);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFsProjects();
  renderViralizeAvatars();

  document.querySelectorAll('.fs-mode-tab').forEach(tab => {
    tab.addEventListener('click', () => fsSetMode(tab.dataset.mode));
  });
  const chatInput = document.getElementById('fs-chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') fsSendMessage(); });
  }
  const sendBtn = document.getElementById('fs-send-btn');
  if (sendBtn) sendBtn.addEventListener('click', fsSendMessage);

  const uploadZone = document.getElementById('fs-upload-zone');
  if (uploadZone) uploadZone.addEventListener('click', fsHandleUploadClick);
  const fileInput = document.getElementById('fs-video-file-input');
  if (fileInput) fileInput.addEventListener('change', fsHandleUploadChange);
});
