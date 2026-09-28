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

const FS_TYPING_DELAY_MIN = 450;
const FS_TYPING_DELAY_MAX = 1000;

function fsShowTyping() {
  fsHideTyping();
  const body = document.getElementById('fs-chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'fs-msg bot fs-typing-msg';
  div.id = 'fs-typing-indicator';
  div.innerHTML = '<div class="fs-typing-dots"><span></span><span></span><span></span></div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function fsHideTyping() {
  const el = document.getElementById('fs-typing-indicator');
  if (el) el.remove();
}

function fsTypeDuration(text) {
  const len = (text || '').length;
  return Math.min(1300, Math.max(260, len * 15));
}

function fsTypewrite(el, text) {
  const body = document.getElementById('fs-chat-body');
  const len = text.length;
  if (!len) { el.textContent = ''; return; }
  const total = fsTypeDuration(text);
  const stepTime = total / len;
  el.classList.add('fs-typing-cursor');
  let i = 0;
  (function tick() {
    i++;
    el.textContent = text.slice(0, i);
    if (body) body.scrollTop = body.scrollHeight;
    if (i < len) {
      setTimeout(tick, stepTime);
    } else {
      el.classList.remove('fs-typing-cursor');
    }
  })();
}

function fsAddMsg(who, content, opts = {}) {
  const body = document.getElementById('fs-chat-body');
  if (!body) return null;
  const div = document.createElement('div');
  div.className = 'fs-msg ' + who + (opts.final ? ' prompt-final' : '') + (opts.wide ? ' fs-msg-wide' : '');
  const labelHtml = opts.label ? `<div class="fs-msg-label">${opts.label}</div>` : '';
  div.innerHTML = labelHtml + '<div class="fs-msg-content"></div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;

  const contentEl = div.querySelector('.fs-msg-content');
  if (opts.raw) {
    contentEl.innerHTML = content;
  } else if (who === 'bot' && !opts.skipTypewriter) {
    fsTypewrite(contentEl, content);
  } else {
    contentEl.textContent = content;
  }

  if (opts.final) {
    const actions = document.createElement('div');
    actions.className = 'fs-msg-actions';
    actions.innerHTML = `<button class="fs-copy-btn" type="button"><svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar prompt</button>`;
    actions.querySelector('button').addEventListener('click', () => fsCopy(opts.rawText || content));
    div.appendChild(actions);
  }
  body.scrollTop = body.scrollHeight;
  return div;
}

let fsFlowId = 0;

function fsBotSay(text, callback, opts = {}) {
  const flow = fsFlowId;
  fsShowTyping();
  const wait = FS_TYPING_DELAY_MIN + Math.random() * (FS_TYPING_DELAY_MAX - FS_TYPING_DELAY_MIN);
  setTimeout(() => {
    if (flow !== fsFlowId) return;
    fsHideTyping();
    fsAddMsg('bot', text, opts);
    const typeDur = (opts.skipTypewriter || opts.raw) ? 0 : fsTypeDuration(text);
    if (callback) setTimeout(() => { if (flow === fsFlowId) callback(); }, typeDur + 120);
  }, wait);
}

function fsQuickReplies(options, onPick) {
  const quick = document.getElementById('fs-quick-replies');
  quick.innerHTML = options.map(o => `<button type="button" class="fs-quick-reply">${fsEscape(o)}</button>`).join('');
  quick.querySelectorAll('.fs-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      if (onPick) onPick(btn.textContent);
      else fsHandleAnswer(btn.textContent);
    });
  });
}

let fsInputMode = 'text';

function fsEnsureTextarea() {
  if (document.getElementById('fs-chat-textarea')) return;
  const row = document.getElementById('fs-chat-inputrow');
  const sendBtn = document.getElementById('fs-send-btn');
  if (!row || !sendBtn) return;
  const ta = document.createElement('textarea');
  ta.id = 'fs-chat-textarea';
  ta.className = 'fs-chat-input fs-chat-textarea';
  ta.rows = 1;
  ta.style.display = 'none';
  ta.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      fsSendMessage();
    }
  });
  row.insertBefore(ta, sendBtn);
}

function fsSetInputMode(mode) {
  fsInputMode = mode;
  const input = document.getElementById('fs-chat-input');
  const textarea = document.getElementById('fs-chat-textarea');
  if (!input || !textarea) return;
  if (mode === 'textarea') {
    input.style.display = 'none';
    textarea.style.display = 'block';
    textarea.value = '';
    textarea.placeholder = 'Escreva com calma... (Ctrl+Enter para enviar)';
    textarea.focus();
  } else {
    textarea.style.display = 'none';
    input.style.display = 'block';
  }
}

function fsActiveInputEl() {
  return fsInputMode === 'textarea'
    ? document.getElementById('fs-chat-textarea')
    : document.getElementById('fs-chat-input');
}

function fsSetMode(mode) {
  fsMode = mode;
  fsFlowId++;
  document.querySelectorAll('.fs-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  const body = document.getElementById('fs-chat-body');
  const quick = document.getElementById('fs-quick-replies');
  const inputRow = document.getElementById('fs-chat-inputrow');
  const upload = document.getElementById('fs-upload-zone');
  const styleInput = document.getElementById('fs-style-input');
  const extractBtn = document.getElementById('fs-extract-btn');
  fsHideTyping();
  quick.innerHTML = '';
  body.innerHTML = '';
  upload.style.display = 'none';
  styleInput.style.display = 'none';
  extractBtn.style.display = 'none';
  fsSetInputMode('text');
  inputRow.style.display = 'flex';

  if (mode === 'imagem') {
    document.getElementById('fs-chat-input').placeholder = 'Descreva a imagem que você quer gerar...';
    fsBotSay('Esse é o gerador de imagem — ainda é só um protótipo. Descreva a imagem que você quer e clique em enviar pra ver como vai funcionar.');
  } else if (mode === 'video') {
    document.getElementById('fs-chat-input').placeholder = 'Escreva sua mensagem...';
    fsStartVideoFlow();
  } else if (mode === 'extrair') {
    inputRow.style.display = 'none';
    upload.style.display = 'block';
    styleInput.style.display = 'block';
    extractBtn.style.display = 'inline-flex';
    fsResetUpload();
    fsBotSay('Envie o vídeo viral que você quer usar de referência e descreva o estilo dele. A IA "extrai" o movimento e te devolve um prompt pronto.');
  }
}

let fsVideoPhase = 'avatar';
let fsVideoStep = 0;
let fsVideoAnswers = {};
let fsSelectedVideoAvatar = null;

const FS_VIDEO_QUESTIONS = [
  { key: 'produto', type: 'text', q: 'Qual é o produto ou tema do vídeo?' },
  { key: 'roteiro', type: 'longtext', optional: true,
    q: 'Quer me passar o roteiro do vídeo — a fala, as cenas, o texto que vai aparecer? Pode escrever com detalhes ou pular esta etapa.' },
  { key: 'tom', type: 'choice', q: 'Qual tom o vídeo deve ter?', options: ['Empolgado', 'Natural', 'Humorístico', 'Educativo'] },
  { key: 'formato', type: 'choice', q: 'Pra qual formato é o vídeo?', options: ['TikTok (9:16)', 'Reels (9:16)', 'YouTube Shorts', 'Outro'], allowOther: true, otherLabel: 'formato' },
  { key: 'duracao', type: 'choice', q: 'Quantos segundos o vídeo deve ter?', options: ['7s', '15s', '30s', '60s'] },
  { key: 'detalhes', type: 'longtext', optional: true,
    q: 'Tem algum detalhe mais específico que não pode faltar? Cenário, iluminação, ângulo de câmera, roupa, cores, expressão... Escreva ou pule.' }
];

function fsStartVideoFlow() {
  fsVideoPhase = 'avatar';
  fsVideoStep = 0;
  fsVideoAnswers = {};
  fsSelectedVideoAvatar = null;
  fsAwaitingAnswer = false;
  fsResetVideoInput();
  document.getElementById('fs-chat-inputrow').style.display = 'none';
  fsBotSay('Vamos montar seu prompt de vídeo! Primeiro, escolha um avatar pra estrelar (ou pule se preferir não usar avatar).', fsAskAvatarStep);
}

function fsAvatarStepList() {
  if (typeof avatars === 'undefined' || !Array.isArray(avatars)) return [];
  return avatars.slice(0, 8);
}

function fsAskAvatarStep() {
  const list = fsAvatarStepList();
  if (!list.length) {
    fsChooseVideoAvatar(null);
    return;
  }
  const gridHtml = '<div class="fs-avatar-step-grid">' + list.map(a =>
    '<div class="fs-avatar-step-card" data-id="' + a.id + '" onclick="fsChooseVideoAvatar(' + a.id + ')" role="button" tabindex="0">' +
    '<div class="fs-avatar-step-photo"><img src="' + a.img + '" alt="' + fsEscape(a.name) + '" loading="lazy"></div>' +
    '<div class="fs-avatar-step-name">' + fsEscape(a.name) + '</div></div>'
  ).join('') + '</div>';
  fsAddMsg('bot', gridHtml, { raw: true });
  fsQuickReplies(['Continuar sem avatar'], () => fsChooseVideoAvatar(null));
}

function fsChooseVideoAvatar(id) {
  if (fsMode !== 'video' || fsVideoPhase !== 'avatar') return;
  document.getElementById('fs-quick-replies').innerHTML = '';
  document.querySelectorAll('.fs-avatar-step-card').forEach(c => c.classList.remove('selected'));

  if (id === null || typeof avatars === 'undefined') {
    fsSelectedVideoAvatar = null;
    fsAddMsg('user', 'Continuar sem avatar');
  } else {
    const avatar = avatars.find(a => a.id === id) || null;
    fsSelectedVideoAvatar = avatar;
    const card = document.querySelector(`.fs-avatar-step-card[data-id="${id}"]`);
    if (card) card.classList.add('selected');
    fsAddMsg('user', avatar ? avatar.name : 'Avatar selecionado');
  }

  fsVideoPhase = 'questions';
  fsVideoStep = 0;
  document.getElementById('fs-chat-inputrow').style.display = 'flex';
  setTimeout(fsAskNextVideoQuestion, 250);
}

const FS_OTHER_MAX_CHARS = 20;
let fsAwaitingAnswer = false;
let fsOtherMode = false;

function fsResetVideoInput() {
  fsOtherMode = false;
  const input = document.getElementById('fs-chat-input');
  if (input) {
    input.removeAttribute('maxlength');
    input.placeholder = 'Escreva sua mensagem...';
  }
}

function fsAskNextVideoQuestion() {
  const quick = document.getElementById('fs-quick-replies');
  quick.innerHTML = '';
  fsAwaitingAnswer = false;
  fsResetVideoInput();
  if (fsVideoStep >= FS_VIDEO_QUESTIONS.length) {
    fsFinishVideoPrompt();
    return;
  }
  const step = FS_VIDEO_QUESTIONS[fsVideoStep];
  fsBotSay(step.q, () => {
    fsAwaitingAnswer = true;
    if (step.type === 'choice') {
      fsSetInputMode('text');
      fsQuickReplies(step.options);
    } else if (step.type === 'longtext') {
      fsSetInputMode('textarea');
      if (step.optional) fsQuickReplies(['Pular etapa'], () => fsHandleAnswer('', true));
    } else {
      fsSetInputMode('text');
    }
  });
}

function fsHandleAnswer(text, skipped) {
  if (fsMode !== 'video' || fsVideoPhase !== 'questions' || !fsAwaitingAnswer) return;
  if (!skipped && (!text || !text.trim())) return;
  const step = FS_VIDEO_QUESTIONS[fsVideoStep];
  const value = skipped ? '' : text.trim();
  fsAwaitingAnswer = false;
  document.getElementById('fs-quick-replies').innerHTML = '';
  fsAddMsg('user', skipped ? 'Pular etapa' : value);

  if (step && step.allowOther && !fsOtherMode && value === 'Outro') {
    fsBotSay('Qual ' + step.otherLabel + ' você quer? (máximo ' + FS_OTHER_MAX_CHARS + ' caracteres)', () => {
      fsOtherMode = true;
      fsAwaitingAnswer = true;
      fsSetInputMode('text');
      const input = document.getElementById('fs-chat-input');
      input.maxLength = FS_OTHER_MAX_CHARS;
      input.placeholder = 'Até ' + FS_OTHER_MAX_CHARS + ' caracteres';
      input.focus();
    });
    return;
  }

  if (step) fsVideoAnswers[step.key] = fsOtherMode ? value.slice(0, FS_OTHER_MAX_CHARS) : value;
  fsVideoStep++;
  fsSetInputMode('text');
  setTimeout(fsAskNextVideoQuestion, 300);
}

function fsFinishVideoPrompt() {
  fsVideoPhase = 'done';
  const a = fsVideoAnswers;
  const avatar = fsSelectedVideoAvatar;

  const avatarLine = avatar
    ? ` Featuring ${avatar.name}, ${avatar.age ? avatar.age + '-year-old ' : ''}${avatar.gender === 'f' ? 'female' : avatar.gender === 'm' ? 'male' : 'non-binary'} creator (${avatar.nicho || 'lifestyle'} niche, ${avatar.style || 'natural'} style).`
    : '';
  const detalhesLine = a.detalhes ? `\nAdditional details: ${a.detalhes}.` : '';
  const roteiroBlock = a.roteiro ? `\n\nSCRIPT:\n${a.roteiro}` : '';

  const prompt = `Vertical ${a.formato || 'TikTok (9:16)'} video, ${a.duracao || '15s'} long, ${(a.tom || 'natural').toLowerCase()} tone. Product/theme: ${a.produto || 'product'}.${avatarLine} Handheld selfie-style UGC shot, natural lighting, authentic delivery, quick hook in the first 2 seconds, clear call to action at the end.${detalhesLine}${roteiroBlock}`;

  fsBotSay('Prontinho! Seu prompt de vídeo está pronto.', () => {
    fsAddMsg('bot', prompt, { final: true, label: 'Prompt de vídeo', rawText: prompt, skipTypewriter: true, wide: true });
    fsQuickReplies(['Recomeçar'], () => fsSetMode('video'));
  });
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
let fsExtracting = false;

const FS_VIDEO_EXTS = ['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v', '3gp', 'wmv'];
const FS_UPLOAD_EMPTY_HTML = '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><div>Clique para enviar o vídeo de referência</div>';

function fsResetUpload() {
  fsExtractFile = null;
  const zone = document.getElementById('fs-upload-zone');
  const input = document.getElementById('fs-video-file-input');
  if (input) input.value = '';
  if (zone) { zone.classList.remove('has-file'); zone.innerHTML = FS_UPLOAD_EMPTY_HTML; }
}

// Confere o CONTEÚDO do arquivo (primeiros bytes), não só o nome/tipo — renomear um .exe ou .pdf para .mp4 não passa.
function fsDetectVideoSignature(b) {
  if (!b || b.length < 12) return false;
  const ascii = (from, to) => String.fromCharCode.apply(null, Array.from(b.slice(from, to)));
  const box = ascii(4, 8);
  if (['ftyp', 'moov', 'mdat', 'wide', 'free', 'skip'].indexOf(box) !== -1) return true;         // MP4 / MOV / M4V / 3GP
  if (b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return true;                // WebM / MKV
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'AVI ') return true;                               // AVI
  const asf = [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11];
  if (b.length >= 8 && asf.every((v, i) => b[i] === v)) return true;                                // WMV / ASF
  return false;
}

async function fsValidateVideoFile(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (FS_VIDEO_EXTS.indexOf(ext) === -1) return false;
  const type = (file.type || '').toLowerCase();
  // Alguns sistemas informam tipo vazio ou genérico para .mkv/.avi; a checagem dos bytes decide.
  if (type && type.indexOf('video/') !== 0 && type !== 'application/octet-stream') return false;
  try {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    return fsDetectVideoSignature(head);
  } catch {
    return false;
  }
}

function fsHandleUploadClick() {
  const input = document.getElementById('fs-video-file-input');
  input.click();
}
async function fsHandleUploadChange(e) {
  const input = e.target;
  const file = input.files && input.files[0];
  if (!file) return;
  fsExtractFile = null;
  const valid = await fsValidateVideoFile(file);
  if (!valid) {
    fsResetUpload();
    fsToast('Envie apenas arquivos de vídeo (MP4, MOV, WebM, MKV, AVI…)');
    return;
  }
  const zone = document.getElementById('fs-upload-zone');
  fsExtractFile = file;
  zone.classList.add('has-file');
  zone.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><div>${fsEscape(file.name)}</div>`;
}

function fsFormatWait(sec) {
  return sec < 60 ? `${sec}s` : `${Math.ceil(sec / 60)} min`;
}

async function fsRunExtract() {
  if (fsExtracting) return;
  if (!fsExtractFile) { fsToast('Envie um vídeo primeiro'); return; }
  const file = fsExtractFile;
  const style = (document.getElementById('fs-style-input').value || '').trim();

  // Rate limit no servidor (por licença). Só chega aqui com vídeo já validado.
  fsExtracting = true;
  const btn = document.getElementById('fs-extract-btn');
  if (btn) btn.disabled = true;
  let gate;
  try {
    gate = window.NexSession && window.NexSession.requestExtract
      ? await window.NexSession.requestExtract()
      : { ok: false, message: 'Sessão indisponível. Recarregue a página.' };
  } finally {
    fsExtracting = false;
    if (btn) btn.disabled = false;
  }
  if (!gate.ok) {
    if (gate.rateLimited) {
      fsBotSay(`Você atingiu o limite de extrações por agora. Tente novamente em ${fsFormatWait(gate.retryAfterSec)}.`);
    } else {
      fsToast(gate.message || 'Não foi possível extrair agora.');
    }
    return;
  }

  fsAddMsg('user', `Vídeo: ${file.name}${style ? ' · Estilo: ' + style : ''}`);
  fsBotSay('Analisando o movimento do vídeo de referência...', () => {
    let hash = 0;
    const key = (style || file.name);
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    const prompt = FS_EXTRACT_PROMPTS[hash % FS_EXTRACT_PROMPTS.length];
    fsBotSay('Movimento extraído com sucesso!', () => {
      fsAddMsg('bot', prompt, { final: true, label: 'Prompt extraído', rawText: prompt, skipTypewriter: true, wide: true });
    });
  });
}

function fsSendMessage() {
  const el = fsActiveInputEl();
  if (!el) return;
  const text = el.value.trim();
  if (!text) return;
  el.value = '';
  if (fsMode === 'imagem') {
    fsAddMsg('user', text);
    fsBotSay('🖼️ Protótipo — a geração de imagem ainda não está ativa nesta versão. Em breve sua imagem aparecerá aqui.');
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
  fsEnsureTextarea();

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
