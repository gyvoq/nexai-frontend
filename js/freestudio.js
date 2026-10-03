'use strict';
function fsEscape(str) {
  return (window.Sanitize && Sanitize.escapeHTML) ? Sanitize.escapeHTML(str) : String(str);
}
function fsToast(msg) {
  if (typeof showToast === 'function') showToast(msg);
}
function fsCopy(text, btn) {
  const fail = () => fsToast('Não foi possível copiar');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => fsToast('Copiado!')).catch(fail);
  } else {
    fail();
  }
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
const FS_MAX_MESSAGES_PER_PROJECT = 1000;
const FS_MODES = ['imagem', 'video', 'extrair'];
const FS_DEFAULT_TITLE = 'Novo projeto';

function fsCleanId(id) {
  const c = String(id == null ? '' : id).replace(/[^\w-]/g, '').slice(0, 40);
  return c || 'p' + Date.now() + Math.floor(Math.random() * 1000);
}

function fsNormalizeMessage(m) {
  if (!m || typeof m !== 'object') return null;
  if (m.who !== 'bot' && m.who !== 'user') return null;
  if (typeof m.content !== 'string') return null;
  const ts = Number(m.ts);
  const out = { who: m.who, content: m.content.slice(0, 20000), ts: ts > 0 ? ts : Date.now() };
  if (typeof m.label === 'string') out.label = m.label.slice(0, 80);
  if (m.final) out.final = true;
  if (m.wide) out.wide = true;
  if (typeof m.rawText === 'string') out.rawText = m.rawText.slice(0, 20000);
  return out;
}

function fsNormalizeProject(p) {
  if (!p || typeof p !== 'object') return null;
  const chats = {};
  FS_MODES.forEach(mode => {
    const list = p.chats && Array.isArray(p.chats[mode]) ? p.chats[mode] : [];
    chats[mode] = list.map(fsNormalizeMessage).filter(Boolean);
  });
  const created = Number(p.createdAt) > 0 ? Number(p.createdAt) : 0;
  return {
    id: fsCleanId(p.id),
    title: (typeof p.title === 'string' && p.title.trim() ? p.title.trim() : FS_DEFAULT_TITLE).slice(0, 80),
    createdAt: created,
    updatedAt: Number(p.updatedAt) > 0 ? Number(p.updatedAt) : created,
    lastMode: FS_MODES.indexOf(p.lastMode) !== -1 ? p.lastMode : 'imagem',
    chats
  };
}

function fsLoadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(FS_PROJECTS_KEY) || 'null');
    if (Array.isArray(saved) && saved.length) return saved.map(fsNormalizeProject).filter(Boolean);
  } catch (e) {}
  return [
    { id: 'p1', title: 'Sérum Facial — vídeo UGC' },
    { id: 'p2', title: 'Ideias para o lançamento de verão' },
    { id: 'p3', title: 'Roteiro unboxing tech' },
    { id: 'p4', title: 'Prompt para avatar novo' }
  ].map(fsNormalizeProject);
}
let fsProjects = fsLoadProjects();

let fsStorageWarned = false;
function fsSaveProjects() {
  try {
    localStorage.setItem(FS_PROJECTS_KEY, JSON.stringify(fsProjects));
    return true;
  } catch (e) {
    if (!fsStorageWarned) {
      fsStorageWarned = true;
      fsToast('Armazenamento do navegador cheio. Gere um backup para não perder suas conversas.');
    }
    return false;
  }
}

let fsActiveProject = null;
let fsMode = 'imagem';

/* ---- hora e data ---- */
function fsTimeStr(ts) {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function fsDayKey(ts) {
  const d = new Date(ts);
  return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
}
function fsDayLabel(ts) {
  const startOf = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((startOf(new Date()) - startOf(new Date(ts))) / 86400000);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  return new Date(ts).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function fsMaybeDateSep(body, ts) {
  const key = fsDayKey(ts);
  if (body.dataset.lastDay === key) return;
  body.dataset.lastDay = key;
  const sep = document.createElement('div');
  sep.className = 'fs-date-sep';
  sep.textContent = fsDayLabel(ts);
  body.appendChild(sep);
}

function fsChatHistory(mode) {
  if (!fsActiveProject) return [];
  if (!fsActiveProject.chats) fsActiveProject.chats = { imagem: [], video: [], extrair: [] };
  if (!Array.isArray(fsActiveProject.chats[mode])) fsActiveProject.chats[mode] = [];
  return fsActiveProject.chats[mode];
}
function fsProjectMessageCount(p) {
  if (!p || !p.chats) return 0;
  return FS_MODES.reduce((n, m) => n + (Array.isArray(p.chats[m]) ? p.chats[m].length : 0), 0);
}
function fsGuardLimit() {
  if (fsProjectMessageCount(fsActiveProject) >= FS_MAX_MESSAGES_PER_PROJECT) {
    fsToast('Este projeto chegou ao limite de ' + FS_MAX_MESSAGES_PER_PROJECT + ' mensagens. Crie um novo projeto para continuar.');
    return true;
  }
  return false;
}
function fsRecordMessage(mode, rec) {
  if (!fsActiveProject) return;
  fsChatHistory(mode).push(rec);
  fsActiveProject.updatedAt = rec.ts;
  fsSaveProjects();
}
function fsMaybeNameProject(text) {
  if (!fsActiveProject || fsActiveProject.title !== FS_DEFAULT_TITLE) return;
  const t = String(text || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  if (!t) return;
  fsActiveProject.title = t;
  const el = document.getElementById('fs-chat-title');
  if (el) el.textContent = t;
  fsSaveProjects();
}

function renderFsProjects() {
  const grid = document.getElementById('fs-project-grid');
  if (!grid) return;
  grid.innerHTML =
    `<div class="fs-new-project-card" onclick="fsCreateProject()" role="button" tabindex="0">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>Novo projeto</span>
    </div>` +
    fsProjects.map(p => {
      const n = fsProjectMessageCount(p);
      const meta2 = n
        ? `<div class="fs-project-card-meta">${n} ${n === 1 ? 'mensagem' : 'mensagens'} · ${fsEscape(fsDayLabel(p.updatedAt))}, ${fsEscape(fsTimeStr(p.updatedAt))}</div>`
        : '';
      return `<div class="fs-project-card" onclick="fsOpenProject('${p.id}')" role="button" tabindex="0">
      <div class="fs-project-card-title">${fsEscape(p.title)}</div>
      <div class="fs-project-card-meta">Estúdio Livre</div>${meta2}
    </div>`;
    }).join('');
}

function fsCreateProject() {
  const now = Date.now();
  const project = fsNormalizeProject({ id: 'p' + now, title: FS_DEFAULT_TITLE, createdAt: now, updatedAt: now });
  fsProjects.unshift(project);
  fsSaveProjects();
  fsOpenProject(project.id);
}

function fsOpenProject(id) {
  fsActiveProject = fsProjects.find(p => p.id === id) || null;
  if (!fsActiveProject) return;
  document.getElementById('fs-projects-view').style.display = 'none';
  document.getElementById('fs-chat-view').style.display = 'flex';
  document.getElementById('fs-chat-title').textContent = fsActiveProject.title;
  fsSetMode(fsActiveProject.lastMode || 'imagem');
}

function fsBackToProjects() {
  fsFlowId++;
  fsHideTyping();
  fsActiveProject = null;
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
  const ts = opts.ts || Date.now();
  fsMaybeDateSep(body, ts);
  const div = document.createElement('div');
  div.className = 'fs-msg ' + who + (opts.final ? ' prompt-final' : '') + (opts.wide ? ' fs-msg-wide' : '');
  const labelHtml = opts.label ? `<div class="fs-msg-label">${fsEscape(opts.label)}</div>` : '';
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

  const timeEl = document.createElement('time');
  timeEl.className = 'fs-msg-time';
  timeEl.dateTime = new Date(ts).toISOString();
  timeEl.textContent = fsTimeStr(ts);
  timeEl.title = new Date(ts).toLocaleString('pt-BR');
  div.appendChild(timeEl);

  if (opts.final) {
    const actions = document.createElement('div');
    actions.className = 'fs-msg-actions';
    actions.innerHTML = `<button class="fs-copy-btn" type="button"><svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar prompt</button>`;
    actions.querySelector('button').addEventListener('click', () => fsCopy(opts.rawText || content));
    div.appendChild(actions);
  }
  body.scrollTop = body.scrollHeight;

  if (!opts.raw && !opts.noSave && !opts.restore) {
    const rec = { who, content: String(content), ts };
    if (opts.label) rec.label = opts.label;
    if (opts.final) { rec.final = true; rec.rawText = opts.rawText || String(content); }
    if (opts.wide) rec.wide = true;
    fsRecordMessage(fsMode, rec);
  }
  return div;
}

function fsRestoreChat(history) {
  history.forEach(m => fsAddMsg(m.who, m.content, {
    label: m.label, final: m.final, rawText: m.rawText, wide: m.wide,
    skipTypewriter: true, restore: true, ts: m.ts
  }));
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
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.isComposing) {
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
  if (fsActiveProject) { fsActiveProject.lastMode = mode; fsSaveProjects(); }
  document.querySelectorAll('.fs-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  const body = document.getElementById('fs-chat-body');
  const quick = document.getElementById('fs-quick-replies');
  const inputRow = document.getElementById('fs-chat-inputrow');
  const upload = document.getElementById('fs-upload-zone');
  const styleInput = document.getElementById('fs-style-input');
  const extractBtn = document.getElementById('fs-extract-btn');
  fsHideTyping();
  fsAwaitingAnswer = false;
  fsResetVideoInput();
  quick.innerHTML = '';
  body.innerHTML = '';
  body.dataset.lastDay = '';
  upload.style.display = 'none';
  styleInput.style.display = 'none';
  extractBtn.style.display = 'none';
  fsSetInputMode('text');
  inputRow.style.display = 'flex';

  const history = fsChatHistory(mode);
  const hasHistory = history.length > 0;
  if (hasHistory) fsRestoreChat(history);

  if (mode === 'imagem') {
    document.getElementById('fs-chat-input').placeholder = 'Descreva a imagem que você quer gerar...';
    if (!hasHistory) fsBotSay('Descreva a imagem que você quer (produto, cenário, estilo...) e eu monto um prompt de imagem pronto pra você copiar.');
  } else if (mode === 'video') {
    document.getElementById('fs-chat-input').placeholder = 'Escreva sua mensagem...';
    if (hasHistory) {
      fsVideoPhase = 'idle';
      inputRow.style.display = 'none';
      fsQuickReplies(['Novo prompt de vídeo'], () => { if (!fsGuardLimit()) fsStartVideoFlow(); });
    } else {
      fsStartVideoFlow();
    }
  } else if (mode === 'extrair') {
    inputRow.style.display = 'none';
    upload.style.display = 'block';
    styleInput.style.display = 'block';
    extractBtn.style.display = 'inline-flex';
    fsResetUpload();
    if (!hasHistory) fsBotSay('Envie o vídeo viral que você quer usar de referência e descreva o estilo dele. A IA "extrai" o movimento e te devolve um prompt pronto.');
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
  fsFlowId++;
  document.getElementById('fs-quick-replies').innerHTML = '';
  fsVideoPhase = 'avatar';
  fsVideoStep = 0;
  fsVideoAnswers = {};
  fsSelectedVideoAvatar = null;
  fsAwaitingAnswer = false;
  fsResetVideoInput();
  document.getElementById('fs-chat-inputrow').style.display = 'none';
  fsBotSay('Vamos montar seu prompt de vídeo! Primeiro, escolha um avatar pra estrelar (ou pule se preferir não usar avatar).', fsAskAvatarStep);
}

function fsAllAvatars() {
  const builtin = (typeof avatars !== 'undefined' && Array.isArray(avatars)) ? avatars : [];
  const custom = (typeof customAvatars !== 'undefined' && Array.isArray(customAvatars))
    ? customAvatars.map((a, i) => Object.assign({}, a, { id: a.id != null ? a.id : 'c' + i, custom: true }))
    : [];
  return custom.concat(builtin);
}

function fsAvatarStepList() {
  const all = fsAllAvatars();
  return all.filter(a => a.custom).concat(all.filter(a => !a.custom).slice(0, 8));
}

const FS_AVATAR_PLACEHOLDER = '<svg viewBox="0 0 24 24" aria-hidden="true" style="width:55%;height:55%;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;opacity:.7"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
function fsAvatarPhotoHtml(a) {
  return a.img
    ? '<img src="' + fsEscape(a.img) + '" alt="' + fsEscape(a.name) + '" loading="lazy">'
    : '<span style="display:flex;width:100%;height:100%;align-items:center;justify-content:center;color:var(--accent3)">' + FS_AVATAR_PLACEHOLDER + '</span>';
}

function fsAskAvatarStep() {
  const list = fsAvatarStepList();
  if (!list.length) {
    fsChooseVideoAvatar(null);
    return;
  }
  const gridHtml = '<div class="fs-avatar-step-grid">' + list.map((a, i) =>
    '<div class="fs-avatar-step-card" data-idx="' + i + '" role="button" tabindex="0">' +
    '<div class="fs-avatar-step-photo">' + fsAvatarPhotoHtml(a) + '</div>' +
    '<div class="fs-avatar-step-name">' + fsEscape(a.name) + '</div></div>'
  ).join('') + '</div>';
  const msg = fsAddMsg('bot', gridHtml, { raw: true, noSave: true });
  if (msg) {
    msg.querySelectorAll('.fs-avatar-step-card').forEach(card => {
      const pick = () => fsChooseVideoAvatar(list[Number(card.dataset.idx)]);
      card.addEventListener('click', pick);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }
  fsQuickReplies(['Continuar sem avatar'], () => fsChooseVideoAvatar(null));
}

function fsChooseVideoAvatar(avatar) {
  if (fsMode !== 'video' || fsVideoPhase !== 'avatar') return;
  document.getElementById('fs-quick-replies').innerHTML = '';
  document.querySelectorAll('.fs-avatar-step-card').forEach(c => c.classList.remove('selected'));

  if (!avatar) {
    fsSelectedVideoAvatar = null;
    fsAddMsg('user', 'Continuar sem avatar');
  } else {
    fsSelectedVideoAvatar = avatar;
    const list = fsAvatarStepList();
    const idx = list.findIndex(a => String(a.id) === String(avatar.id));
    const card = idx >= 0 ? document.querySelector('.fs-avatar-step-card[data-idx="' + idx + '"]') : null;
    if (card) card.classList.add('selected');
    fsAddMsg('user', avatar.name || 'Avatar selecionado');
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
  if (fsGuardLimit()) return;
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
  if (step && step.key === 'produto') fsMaybeNameProject(value);
  fsVideoStep++;
  fsSetInputMode('text');
  setTimeout(fsAskNextVideoQuestion, 300);
}

function fsAvatarLine(avatar) {
  if (!avatar) return '';
  const ok = v => v && v !== '—';
  const gender = avatar.gender === 'f' ? 'female' : avatar.gender === 'm' ? 'male' : 'non-binary';
  const age = ok(avatar.age) ? avatar.age + '-year-old ' : '';
  let line = ` Featuring ${avatar.name}, ${age}${gender} creator (${ok(avatar.nicho) ? avatar.nicho : 'lifestyle'} niche, ${ok(avatar.style) ? avatar.style : 'natural'} style).`;
  const looks = [
    avatar.etnia, avatar.corpo,
    ok(avatar.altura) && avatar.altura + ' height',
    ok(avatar.rosto) && avatar.rosto + ' face',
    ok(avatar.olhos) && avatar.olhos + ' eyes',
    ok(avatar.corCabelo) && avatar.corCabelo + ' hair',
    ok(avatar.estiloCabelo) && avatar.estiloCabelo + ' hairstyle'
  ].filter(ok);
  if (looks.length) line += ` Appearance: ${looks.join(', ')}.`;
  if (ok(avatar.personalidade)) line += ` Personality: ${avatar.personalidade}.`;
  if (ok(avatar.conteudo)) line += ` Content style: ${avatar.conteudo}.`;
  if (ok(avatar.desc)) line += ` Extra details: ${avatar.desc}.`;
  return line;
}

function fsFinishVideoPrompt() {
  fsVideoPhase = 'done';
  const a = fsVideoAnswers;
  const avatarLine = fsAvatarLine(fsSelectedVideoAvatar);
  const detalhesLine = a.detalhes ? `\nAdditional details: ${a.detalhes}.` : '';
  const roteiroBlock = a.roteiro ? `\n\nSCRIPT:\n${a.roteiro}` : '';

  const prompt =
`Vertical ${a.formato || 'TikTok (9:16)'} video, ${a.duracao || '15s'} long, ${(a.tom || 'natural').toLowerCase()} tone.
Product/theme: ${a.produto || 'product'}.${avatarLine}

Camera & framing: handheld selfie-style UGC shot, chest-up framing with occasional close-ups of the product, subtle natural hand movement, no tripod feel.
Lighting: natural window light or a soft ring light, warm and flattering, no harsh shadows.
Pacing: strong hook in the first 2 seconds, a cut every 2-3 seconds, a clear product reveal in the middle, authentic and unscripted delivery.
Audio: clear, close-mic voice with light trending background music and natural room tone.
Call to action: close with a direct, friendly call to action (link in bio / tap the cart).${detalhesLine}${roteiroBlock}

Avoid: blurry footage, over-polished ad look, distorted faces or hands, watermarks, on-screen text that is hard to read.`;

  fsBotSay('Prontinho! Seu prompt de vídeo está pronto.', () => {
    fsAddMsg('bot', prompt, { final: true, label: 'Prompt de vídeo', rawText: prompt, skipTypewriter: true, wide: true });
    document.getElementById('fs-chat-inputrow').style.display = 'none';
    fsQuickReplies(['Novo prompt de vídeo'], () => { if (!fsGuardLimit()) fsStartVideoFlow(); });
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

function fsDetectVideoSignature(b) {
  if (!b || b.length < 12) return false;
  const ascii = (from, to) => String.fromCharCode.apply(null, Array.from(b.slice(from, to)));
  const box = ascii(4, 8);
  if (['ftyp', 'moov', 'mdat', 'wide', 'free', 'skip'].indexOf(box) !== -1) return true;
  if (b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return true;
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'AVI ') return true;
  const asf = [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11];
  if (b.length >= 8 && asf.every((v, i) => b[i] === v)) return true; 
  return false;
}

async function fsValidateVideoFile(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (FS_VIDEO_EXTS.indexOf(ext) === -1) return false;
  const type = (file.type || '').toLowerCase();
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
  if (fsGuardLimit()) return;
  const file = fsExtractFile;
  const flow = fsFlowId;
  const style = (document.getElementById('fs-style-input').value || '').trim();

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
  if (flow !== fsFlowId) return;
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

function fsBuildImagePrompt(desc) {
  const subject = String(desc || '').trim().replace(/[.\s]+$/, '');
  return `Subject: ${subject}.
Style: ultra-realistic commercial product photography with an authentic UGC look, sharp focus, rich detail, true-to-life textures.
Composition: main subject centered with rule-of-thirds balance, clean uncluttered background, shallow depth of field, vertical 9:16 framing.
Lighting: soft natural window light with gentle highlights and smooth shadows, warm and flattering.
Camera: 50mm lens, f/2.8, 4K resolution, professional color grading.
Colors: vibrant yet natural tones, accurate product colors.
Avoid: blur, distorted hands or faces, extra fingers, warped product shapes, watermarks, unreadable text, low resolution.`;
}

function fsSendMessage() {
  const el = fsActiveInputEl();
  if (!el) return;
  const text = el.value.trim();
  if (!text) return;
  if (fsGuardLimit()) return;
  if (fsMode === 'video' && (fsVideoPhase !== 'questions' || !fsAwaitingAnswer)) return;
  el.value = '';
  if (fsMode === 'imagem') {
    fsMaybeNameProject(text);
    fsAddMsg('user', text);
    const prompt = fsBuildImagePrompt(text);
    fsBotSay('Prontinho! Seu prompt de imagem está pronto.', () => {
      fsAddMsg('bot', prompt, { final: true, label: 'Prompt de imagem', rawText: prompt, skipTypewriter: true, wide: true });
    });
  } else if (fsMode === 'video') {
    fsHandleAnswer(text);
  }
}

const VIRALIZE_TEMPLATES = {
  beleza: {
    platform: 'TikTok', duration: '15s',
    setting: 'a bright bathroom with soft morning window light, clean counter, a few skincare items in the background',
    hook: 'minha pele nunca ficou assim tão rápido',
    shots: ['Close-up of the product texture on the fingertips, shallow depth of field.', 'Slow, natural application on the cheek, skin glowing under soft light.', 'Mirror check with a genuine smile, holding the product next to the face.'],
    audio: 'upbeat trending audio, soft satisfying tap sound when the product is opened',
    cta: 'salva esse vídeo e testa hoje'
  },
  fitness: {
    platform: 'TikTok', duration: '15s',
    setting: 'a well-lit gym with equipment softly out of focus, energetic and clean',
    hook: 'o que eu uso antes de todo treino',
    shots: ['Handheld shot of the product in hand right before the first set.', 'Quick cuts every 2 seconds of the workout, product visible on the bench or in the bag.', 'Post-workout selfie, confident and out of breath, showing the product to camera.'],
    audio: 'high-energy trending audio with a strong beat, natural gym ambience underneath',
    cta: 'link na bio pra garantir o seu'
  },
  moda: {
    platform: 'Reels', duration: '20s',
    setting: 'a bedroom or hallway with a full-length mirror and natural light',
    hook: 'isso tá bombando no TikTok',
    shots: ['Mirror shot: slow turn to show the full outfit or product from every angle.', 'Trendy transition cut into a second look, same location, new styling.', 'Close-up on fabric, fit and details, then back to a full-body pose.'],
    audio: 'trending beat-synced audio, transitions landing on the beat',
    cta: 'me conta qual look você escolheria'
  },
  tech: {
    platform: 'TikTok', duration: '25s',
    setting: 'a clean desk setup with warm ambient light and a dark, minimal background',
    hook: 'gadget que todo mundo devia ter',
    shots: ['Unboxing from above, hands only, satisfying slow reveal of the packaging.', 'Close-up detail shots of ports, buttons and materials.', 'Product in real use at the desk, then a final hero shot on a neutral surface.'],
    audio: 'satisfying ASMR unboxing sounds with a light lo-fi track under the voice',
    cta: 'corre que o estoque acaba rápido'
  },
  casa: {
    platform: 'Reels', duration: '20s',
    setting: 'a cozy, styled living space with warm natural light and soft textures',
    hook: 'transformou minha casa em 1 dia',
    shots: ['Slow pan across the room before, showing the problem or empty spot.', 'The product being placed or used, with a smooth handheld move.', 'Final wide shot of the result with a relaxed, happy reaction.'],
    audio: 'calm feel-good audio with light room tone',
    cta: 'salva pra decorar a sua casa também'
  },
  saude: {
    platform: 'TikTok', duration: '15s',
    setting: 'a bright kitchen or bathroom during a calm morning routine',
    hook: 'meu ritual de saúde matinal',
    shots: ['Morning light on the counter, product placed next to a glass of water.', 'Natural use of the product as part of the routine, unhurried pacing.', 'Relaxed selfie speaking to camera about how it fits into the day.'],
    audio: 'soft, calm trending audio with a gentle voiceover',
    cta: 'testa por uma semana e me conta'
  }
};
function fsNicheKeyFromAvatar(a) {
  const n = [a.nicho, a.conteudo, a.style].filter(v => v && v !== '—').join(' ').toLowerCase();
  if (n.includes('beleza') || n.includes('skincare')) return 'beleza';
  if (n.includes('fitness') || n.includes('nutri')) return 'fitness';
  if (n.includes('moda')) return 'moda';
  if (n.includes('tech')) return 'tech';
  if (n.includes('casa') || n.includes('lifestyle')) return 'casa';
  if (n.includes('saúde') || n.includes('saude') || n.includes('wellness')) return 'saude';
  return 'moda';
}
function fsBuildViralizePrompt(avatar, key) {
  const t = VIRALIZE_TEMPLATES[key] || VIRALIZE_TEMPLATES.moda;
  return [
    `Creator:${fsAvatarLine(avatar).replace(/^ Featuring /, ' ')}`,
    `Format: ${t.duration} vertical 9:16 UGC video for ${t.platform}.`,
    `Setting: ${t.setting}.`,
    `Hook (0-3s): "${t.hook}".`,
    'Shots:',
    ...t.shots.map((x, i) => `${i + 1}. ${x}`),
    `Audio: ${t.audio}.`,
    `Call to action (last 3s): "${t.cta}".`,
    'Look & feel: handheld, natural light, authentic UGC delivery, no over-polished ad look.',
    'Avoid: blurry footage, distorted faces or hands, watermarks, hard-to-read on-screen text.'
  ].join('\n');
}
function renderViralizeAvatars() {
  const grid = document.getElementById('viralize-avatar-grid');
  if (!grid) return;
  const list = fsAllAvatars();
  const current = grid.querySelector('.viralize-avatar-card.selected');
  const currentId = current ? current.dataset.id : null;
  const custom = list.filter(a => a.custom);
  const builtin = list.filter(a => !a.custom);
  const ordered = custom.concat(builtin);
  grid.innerHTML = ordered.map((a, i) => `<div class="viralize-avatar-card${currentId != null && String(a.id) === currentId ? ' selected' : ''}" data-id="${fsEscape(String(a.id))}" data-idx="${i}" role="button" tabindex="0">
      <div class="viralize-avatar-photo">${fsAvatarPhotoHtml(a)}</div>
      <div class="viralize-avatar-name">${fsEscape(a.name)}</div>
      <div class="viralize-avatar-nicho">${fsEscape(a.nicho || '')}</div>
    </div>`).join('');
  grid.querySelectorAll('.viralize-avatar-card').forEach(card => {
    const pick = () => selectViralizeAvatar(ordered[Number(card.dataset.idx)]);
    card.addEventListener('click', pick);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });
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

function selectViralizeAvatar(avatar) {
  if (!avatar) return;
  const id = String(avatar.id);

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

  document.querySelectorAll('.viralize-avatar-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
  const prompt = fsBuildViralizePrompt(avatar, fsNicheKeyFromAvatar(avatar));
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
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) fsSendMessage(); });
  }
  const sendBtn = document.getElementById('fs-send-btn');
  if (sendBtn) sendBtn.addEventListener('click', fsSendMessage);

  const uploadZone = document.getElementById('fs-upload-zone');
  if (uploadZone) uploadZone.addEventListener('click', fsHandleUploadClick);
  const fileInput = document.getElementById('fs-video-file-input');
  if (fileInput) fileInput.addEventListener('change', fsHandleUploadChange);
});


function fsExportProjects() {
  return JSON.parse(JSON.stringify(fsProjects));
}

function fsImportProjects(list) {
  if (!Array.isArray(list)) return false;
  const seen = new Set();
  const clean = [];
  list.forEach(raw => {
    const p = fsNormalizeProject(raw);
    if (!p) return;
    while (seen.has(p.id)) p.id = fsCleanId(p.id + Math.floor(Math.random() * 1000));
    seen.add(p.id);
    clean.push(p);
  });
  fsFlowId++;
  fsHideTyping();
  fsProjects = clean;
  fsActiveProject = null;
  fsSaveProjects();
  const chat = document.getElementById('fs-chat-view');
  const projects = document.getElementById('fs-projects-view');
  if (chat) chat.style.display = 'none';
  if (projects) projects.style.display = 'block';
  renderFsProjects();
  return true;
}

function fsResetProjects() {
  try { localStorage.removeItem(FS_PROJECTS_KEY); } catch (e) {}
  fsProjects = fsLoadProjects();
  fsActiveProject = null;
  renderFsProjects();
}
