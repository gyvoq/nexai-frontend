/**
 * voice-onboarding.js — Nex AI
 * ─────────────────────────────────────────────────────────────────────────────
 * Tour guiado por voz: um orb animado narra o app usando os áudios de
 * `assets/audio/`, com legenda sincronizada, controles de reprodução e um
 * botão no header para iniciar ou repetir o tour a qualquer momento.
 *
 * COMO OS GATILHOS FUNCIONAM
 * ──────────────────────────
 * Tudo mora em duas estruturas, e é só nelas que você mexe pra reordenar,
 * trocar ou desligar um áudio:
 *
 *   1) TRACKS — mapa `id -> { file, label, text }`.
 *      `file` é o nome do arquivo em assets/audio/ (o espaço no nome é
 *      escapado na hora de montar o src, não precisa renomear nada).
 *      `text` é a legenda; ela é revelada palavra a palavra conforme o
 *      áudio avança, então basta o texto bater com a narração.
 *
 *   2) bindTriggers() — onde cada evento do app chama `fire(id)`.
 *      Os gatilhos funcionam envolvendo (wrap) as funções globais que já
 *      existem em script.js — switchTab, goStep, generateImagePrompt e
 *      generateVideoPrompt. A função original roda primeiro e o áudio é
 *      disparado depois, então nada do fluxo atual muda de comportamento.
 *
 * MAPA ATUAL
 * ──────────
 *   1  início do tour (só toca após clique do usuário)
 *   2  1ª vez em switchTab('mining')
 *   3  1ª vez em switchTab('library')
 *   4  1ª vez em switchTab('studio')
 *   5..9  goStep(1) .. goStep(5)
 *   10 fim da geração de imagem
 *   11 1ª vez em switchTab('video')
 *   12 após a 1ª geração concluída (imagem OU vídeo)
 *   13 ocioso em #np-nome        ─┐
 *   14 ocioso em #np-prompt       │ dicas contextuais:
 *   15 ocioso em #av-desc         │ no máximo 1x por campo por sessão
 *   16 botão "Gerar IA" liberado  │
 *   17 1ª vez em switchTab('settings') ─┘
 *
 * REGRAS
 * ──────
 * • Nada toca sem gesto do usuário (política de autoplay dos navegadores).
 * • Um áudio por vez; o que chegar durante a fala entra na fila.
 * • Áudio carregado sob demanda — nenhum preload dos 17 arquivos.
 * • `nex_onboarding_done` (localStorage) evita repetir o tour a cada visita.
 * • As dicas 13–17 usam sessionStorage: no máximo uma vez por sessão.
 */

'use strict';

const VoiceOnboarding = (() => {

  /* ─────────────────────────── CONFIGURAÇÃO ─────────────────────────── */

  const AUDIO_DIR = 'assets/audio/';
  const LS_DONE   = 'nex_onboarding_done';
  const LS_PLAYED = 'nex_onboarding_played';
  const SS_TIPS   = 'nex_onboarding_tips';

  /** Tempo de inatividade num campo antes de soltar a dica contextual. */
  const IDLE_MS = 5500;

  /**
   * As legendas abaixo são um rascunho do que cada áudio diz — troque pelo
   * texto exato da sua narração. Só o campo `text` precisa mudar.
   */
  const TRACKS = {
    1: {
      file: 'voz 1.mp3',
      label: 'Boas-vindas',
      text: 'Oi! Eu sou a Nex, sua assistente aqui dentro do estúdio. Vou te mostrar em poucos minutos como encontrar produtos que estão bombando, montar o avatar que vai apresentar eles e gerar imagem e vídeo prontos pra publicar. Pode ir clicando junto comigo, eu acompanho.'
    },
    2: {
      file: 'voz 2.mp3',
      label: 'Mineração Viral',
      text: 'Essa é a Mineração Viral. Aqui ficam os produtos em alta no momento, atualizados em tempo real. Cada card mostra o quanto o produto está crescendo e o potencial dele de viralizar. Quando achar um que combina com você, é só adicionar e ele fica disponível no estúdio de criação.'
    },
    3: {
      file: 'voz 3.mp3',
      label: 'Biblioteca Viral',
      text: 'Essa é a Biblioteca Viral. São os formatos de vídeo que mais performam hoje: unboxing, antes e depois, review honesto, tutorial rápido. Use como ponto de partida pro seu roteiro em vez de começar do zero. Escolha o formato que faz sentido pro seu produto e siga a estrutura.'
    },
    4: {
      file: 'voz 4.mp3',
      label: 'Estúdio de Imagem',
      text: 'Bem-vindo ao estúdio de imagem. São cinco etapas rápidas.'
    },
    5: {
      file: 'voz 5.mp3',
      label: 'Etapa 1 — Produto',
      text: 'Primeiro escolha o produto que vai aparecer na foto. Pode ser um da mineração ou um seu.'
    },
    6: {
      file: 'voz 6.mp3',
      label: 'Etapa 2 — Avatar',
      text: 'Agora o avatar: a pessoa que vai apresentar o produto. Escolha um dos prontos ou crie o seu, definindo idade, nicho e estilo. Quanto mais específico, melhor o resultado.'
    },
    7: {
      file: 'voz 7.mp3',
      label: 'Etapa 3 — Câmera e estilo',
      text: 'Aqui você define o enquadramento e o clima da foto. Câmera mais fechada valoriza detalhe do produto; o estilo define o acabamento visual.'
    },
    8: {
      file: 'voz 8.mp3',
      label: 'Etapa 4 — Fundo',
      text: 'Escolha o fundo da cena, ou descreva o seu próprio no campo livre.'
    },
    9: {
      file: 'voz 9.mp3',
      label: 'Etapa 5 — Gerar',
      text: 'Última etapa. Confira o resumo das suas escolhas e clique em gerar. A IA monta o prompt completo, com prompt negativo e hashtags, pronto pra colar na ferramenta de imagem que você usa.'
    },
    10: {
      file: 'voz 10.mp3',
      label: 'Imagem pronta',
      text: 'Pronto! Seu prompt de imagem está gerado. Pode copiar e usar.'
    },
    11: {
      file: 'voz 11.mp3',
      label: 'Estúdio de Vídeo',
      text: 'O estúdio de vídeo segue a mesma lógica do de imagem, com uma diferença: aqui entra o roteiro. Você define o gancho dos primeiros três segundos, a revelação do produto e a chamada final. Esses três pedaços são o que decide se o vídeo segura a pessoa até o fim, então vale caprichar neles.'
    },
    12: {
      file: 'voz 12.mp3',
      label: 'Tour concluído',
      text: 'É isso! Você já viu o caminho completo: encontrar o produto, montar o avatar, ajustar a cena e gerar o material. Tudo que você criar fica salvo no histórico, então dá pra voltar e reaproveitar depois. Se quiser rever qualquer parte, é só clicar no meu botão lá no topo. Bom trabalho!'
    },
    13: {
      file: 'voz 13.mp3',
      label: 'Dica — nome do produto',
      text: 'Uma dica: use o nome real do produto, do jeito que aparece na embalagem. Ajuda a IA a acertar o formato.'
    },
    14: {
      file: 'voz 14.mp3',
      label: 'Dica — prompt visual',
      text: 'No prompt visual, descreva o que se vê: formato, cor, material, tamanho. Em inglês funciona melhor. Nada de adjetivo de venda aqui.'
    },
    15: {
      file: 'voz 15.mp3',
      label: 'Dica — descrição do avatar',
      text: 'Descreva o avatar como você descreveria uma pessoa real: traços, cabelo, tom de voz, jeito de falar.'
    },
    16: {
      file: 'voz 16.mp3',
      label: 'Dica — gerar com IA',
      text: 'O botão de gerar já está liberado. Se quiser mudar algo, dá pra voltar em qualquer etapa pelo topo, sem perder o que já preencheu.'
    },
    17: {
      file: 'voz 17.mp3',
      label: 'Configurações',
      text: 'Nas configurações você ajusta tema, cópia automática e faz backup dos seus dados.'
    }
  };

  /** Sequência do tour principal — usada pelo botão "pular". */
  const MAIN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  /** Dicas contextuais: no máximo uma vez por sessão. */
  const TIPS = [13, 14, 15, 16, 17];

  /** Campo -> áudio disparado após IDLE_MS parado. */
  const IDLE_FIELDS = {
    'np-nome': 13,
    'np-prompt': 14,
    'av-desc': 15
  };

  /* ───────────────────────────── ESTADO ───────────────────────────── */

  let audio = null;        // elemento <audio> único, reaproveitado
  let root = null;         // container do painel
  let panel = null;
  let elCaption = null, elLabel = null, elState = null, elCount = null;
  let btnPlay = null, btnSkip = null, btnStart = null;
  let trigger = null;

  let currentId = null;
  let queue = [];
  let active = false;      // tour liberado por gesto do usuário
  let words = [];          // spans da legenda atual
  let revealed = -1;
  let raf = 0;
  let generated = false;   // já concluiu alguma geração?
  const idleTimers = {};

  const reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ──────────────────────────── PERSISTÊNCIA ──────────────────────────── */

  function readSet(storage, key) {
    try {
      const raw = storage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }

  function writeSet(storage, key, set) {
    try { storage.setItem(key, JSON.stringify(Array.from(set))); } catch (e) { /* quota */ }
  }

  let played = readSet(localStorage, LS_PLAYED);
  let tipsDone = readSet(sessionStorage, SS_TIPS);

  function isDone() {
    try { return localStorage.getItem(LS_DONE) === 'true'; } catch (e) { return false; }
  }

  function markDone() {
    try { localStorage.setItem(LS_DONE, 'true'); } catch (e) { /* quota */ }
    if (trigger) trigger.classList.remove('has-new');
  }

  /* ─────────────────────────────── ÍCONES ─────────────────────────────── */

  const ICONS = {
    voice: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="12" x2="3" y2="12"/><line x1="7" y1="8" x2="7" y2="16"/><line x1="11" y1="4" x2="11" y2="20"/><line x1="15" y1="7" x2="15" y2="17"/><line x1="19" y1="10" x2="19" y2="14"/></svg>',
    play:  '<svg class="vo-icon-play" viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/></svg>',
    pause: '<svg class="vo-icon-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/></svg>',
    skip:  '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };

  /* ──────────────────────────── MONTAGEM DOM ──────────────────────────── */

  function mountPanel() {
    root = document.getElementById('voice-orb-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'voice-orb-root';
      document.body.appendChild(root);
    }

    panel = document.createElement('section');
    panel.className = 'vo-panel idle';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Tour guiado por voz');
    panel.innerHTML =
      '<div class="vo-head">' +
        '<div class="vo-orb" aria-hidden="true">' +
          '<div class="vo-bars"><i></i><i></i><i></i><i></i><i></i></div>' +
        '</div>' +
        '<div>' +
          '<div class="vo-title" id="vo-label">Tour guiado</div>' +
          '<div class="vo-state" id="vo-state">Pronta quando você estiver</div>' +
        '</div>' +
        '<button type="button" class="vo-close" id="vo-close" aria-label="Fechar tour">' + ICONS.close + '</button>' +
      '</div>' +
      '<p class="vo-caption" id="vo-caption" aria-live="polite"></p>' +
      '<div class="vo-controls">' +
        '<button type="button" class="vo-btn primary" id="vo-start">Iniciar tour</button>' +
        '<button type="button" class="vo-btn vo-btn-icon" id="vo-play" aria-label="Pausar ou continuar">' + ICONS.play + ICONS.pause + '</button>' +
        '<button type="button" class="vo-btn" id="vo-skip" aria-label="Próximo trecho">' + ICONS.skip + 'Pular</button>' +
        '<span class="vo-count" id="vo-count"></span>' +
      '</div>';

    root.appendChild(panel);

    elCaption = panel.querySelector('#vo-caption');
    elLabel   = panel.querySelector('#vo-label');
    elState   = panel.querySelector('#vo-state');
    elCount   = panel.querySelector('#vo-count');
    btnPlay   = panel.querySelector('#vo-play');
    btnSkip   = panel.querySelector('#vo-skip');
    btnStart  = panel.querySelector('#vo-start');

    btnStart.addEventListener('click', start);
    btnPlay.addEventListener('click', toggle);
    btnSkip.addEventListener('click', skip);
    panel.querySelector('#vo-close').addEventListener('click', close);

    idleUI();
  }

  function mountTrigger() {
    trigger = document.getElementById('voice-onboarding-btn');

    // Fallback: se o botão não estiver no HTML, cria e ancora ao lado
    // do botão de Configurações.
    if (!trigger) {
      const settings = document.getElementById('settings-btn');
      if (!settings || !settings.parentNode) return;

      const anchor = document.createElement('div');
      anchor.className = 'vo-anchor';
      settings.parentNode.insertBefore(anchor, settings);
      anchor.appendChild(settings);

      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'voice-trigger';
      trigger.id = 'voice-onboarding-btn';
      trigger.setAttribute('aria-label', 'Tour guiado por voz');
      trigger.setAttribute('title', 'Tour guiado por voz');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = ICONS.voice;
      anchor.appendChild(trigger);
    }

    if (!isDone()) trigger.classList.add('has-new');
    trigger.addEventListener('click', togglePanel);
  }

  /* ──────────────────────────── PAINEL ──────────────────────────── */

  function openPanel() {
    if (!panel) return;
    panel.classList.add('open');
    if (trigger) {
      trigger.classList.add('active');
      trigger.classList.remove('has-new');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('open');
    if (trigger) {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  function togglePanel() {
    if (panel && panel.classList.contains('open')) close();
    else openPanel();
  }

  function setState(state) {
    panel.classList.remove('idle', 'speaking', 'paused');
    panel.classList.add(state);
  }

  function idleUI() {
    setState('idle');
    btnStart.textContent = isDone() ? 'Recomeçar tour' : 'Iniciar tour';
    btnStart.hidden = false;
    btnPlay.hidden = true;
    btnSkip.hidden = true;
    elCount.textContent = '';
    elLabel.textContent = 'Tour guiado';
    elState.textContent = 'Pronta quando você estiver';
    elCaption.textContent = active
      ? 'Tour encerrado. Pode recomeçar quando quiser.'
      : 'Um passeio rápido pelo estúdio, narrado. Você controla o ritmo.';
  }

  function playingUI() {
    btnStart.hidden = true;
    btnPlay.hidden = false;
    btnSkip.hidden = false;
  }

  /* ──────────────────────────── LEGENDA ──────────────────────────── */

  function renderCaption(text) {
    elCaption.textContent = '';
    words = [];
    revealed = -1;
    const parts = String(text || '').split(/\s+/).filter(Boolean);
    parts.forEach((word, i) => {
      const w = document.createElement('w');
      w.textContent = word;
      elCaption.appendChild(w);
      if (i < parts.length - 1) elCaption.appendChild(document.createTextNode(' '));
      words.push(w);
    });
  }

  /** Revela as palavras proporcionalmente ao progresso do áudio. */
  function syncCaption() {
    if (!audio || !words.length) return;
    const dur = audio.duration;
    if (!isFinite(dur) || dur <= 0) return;
    const ratio = Math.min(audio.currentTime / dur, 1);
    const upto = Math.floor(ratio * words.length);
    if (upto === revealed) return;
    for (let i = 0; i < words.length; i++) {
      words[i].classList.toggle('on', i < upto);
    }
    revealed = upto;

    // mantém a palavra atual visível dentro da caixa da legenda
    const cur = words[Math.min(upto, words.length - 1)];
    if (cur) {
      const alvo = cur.offsetTop - (elCaption.clientHeight - cur.offsetHeight) / 2;
      elCaption.scrollTop = Math.max(0, alvo);
    }
  }

  function loop() {
    syncCaption();
    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function stopLoop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  /* ──────────────────────────── REPRODUÇÃO ──────────────────────────── */

  function getAudio() {
    if (audio) return audio;
    audio = document.createElement('audio');
    audio.id = 'vo-audio';
    audio.preload = 'none';           // nada é baixado até o src ser pedido
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onEnded);
    // fica no DOM (sem controles, invisível) só para ser inspecionável
    if (root) root.appendChild(audio);
    return audio;
  }

  function play(id) {
    const track = TRACKS[id];
    if (!track) return;

    currentId = id;
    played.add(id);
    writeSet(localStorage, LS_PLAYED, played);
    if (TIPS.indexOf(id) !== -1) {
      tipsDone.add(id);
      writeSet(sessionStorage, SS_TIPS, tipsDone);
    }

    const a = getAudio();
    a.src = AUDIO_DIR + encodeURIComponent(track.file);
    a.currentTime = 0;

    elLabel.textContent = track.label;
    elState.textContent = 'Falando';
    renderCaption(track.text);
    updateCount(id);
    playingUI();
    openPanel();

    const p = a.play();
    if (p && typeof p.catch === 'function') {
      p.then(() => {
        setState('speaking');
        if (!reduceMotion) startLoop(); else syncCaption();
      }).catch(() => {
        // navegador bloqueou: espera o gesto no botão de play
        setState('paused');
        elState.textContent = 'Toque em play para ouvir';
      });
    } else {
      setState('speaking');
      if (!reduceMotion) startLoop();
    }
  }

  function updateCount(id) {
    const i = MAIN.indexOf(id);
    elCount.textContent = i === -1 ? 'dica' : (i + 1) + '/' + MAIN.length;
  }

  function onEnded() {
    stopLoop();
    if (words.length) words.forEach(w => w.classList.add('on'));
    if (queue.length) {
      play(queue.shift());
      return;
    }
    setState('idle');
    elState.textContent = 'Aguardando você';
    if (currentId === MAIN[MAIN.length - 1]) finish();
  }

  /** Enfileira sem interromper o que está tocando. */
  function fire(id, opts) {
    const once = !opts || opts.once !== false;
    if (!active) return;                                   // exige gesto do usuário
    if (once && played.has(id)) return;
    if (TIPS.indexOf(id) !== -1 && tipsDone.has(id)) return;
    if (queue.indexOf(id) !== -1) return;

    const a = audio;
    const busy = a && !a.paused && !a.ended && a.src;
    if (busy) queue.push(id);
    else play(id);
  }

  /* ──────────────────────────── CONTROLES ──────────────────────────── */

  function start() {
    active = true;
    queue = [];
    played = new Set();
    tipsDone = new Set();
    writeSet(localStorage, LS_PLAYED, played);
    writeSet(sessionStorage, SS_TIPS, tipsDone);
    generated = false;
    openPanel();
    play(1);
  }

  function toggle() {
    if (!audio || !currentId) return;
    if (audio.paused) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      setState('speaking');
      elState.textContent = 'Falando';
      if (!reduceMotion) startLoop();
    } else {
      audio.pause();
      stopLoop();
      setState('paused');
      elState.textContent = 'Pausado';
    }
  }

  function skip() {
    if (!active) return;
    stopLoop();
    if (audio) { audio.pause(); }

    if (queue.length) { play(queue.shift()); return; }

    const i = MAIN.indexOf(currentId);
    if (i !== -1 && i < MAIN.length - 1) { play(MAIN[i + 1]); return; }

    finish();
  }

  function stop() {
    stopLoop();
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();                 // libera o buffer do trecho atual
    }
    queue = [];
    currentId = null;
  }

  function finish() {
    stop();
    markDone();
    idleUI();
  }

  function close() {
    stop();
    active = false;
    markDone();
    idleUI();
    closePanel();
  }

  /* ──────────────────────────── GATILHOS ──────────────────────────── */

  /** Envolve uma função global: a original roda primeiro, o áudio depois. */
  function wrap(name, after) {
    const orig = window[name];
    if (typeof orig !== 'function') return;
    window[name] = function () {
      const result = orig.apply(this, arguments);
      try { after.apply(null, arguments); } catch (e) { /* nunca quebra o app */ }
      return result;
    };
  }

  const TAB_TRACK = {
    mining: 2,
    library: 3,
    studio: 4,
    video: 11,
    settings: 17
  };

  function bindTriggers() {
    wrap('switchTab', function (tab) {
      const id = TAB_TRACK[tab];
      if (id) fire(id);
    });

    wrap('goStep', function (n) {
      // goStep pode recusar a troca (produto/avatar não escolhido). Confere
      // no DOM se a etapa realmente mudou antes de narrar.
      const cur = document.querySelector('#img-stepper .step-item.active');
      if (!cur || cur.dataset.step !== String(n)) return;

      const id = { 1: 5, 2: 6, 3: 7, 4: 8, 5: 9 }[n];
      if (id) fire(id);
      if (n === 5) setTimeout(checkGenButton, 400);
    });

    wrap('generateImagePrompt', function () {
      fire(10);
      firstGeneration();
    });

    wrap('generateVideoPrompt', function () {
      firstGeneration();
    });

    bindIdleFields();
  }

  function firstGeneration() {
    if (generated) return;
    generated = true;
    fire(12);
  }

  /** Dispara a dica 16 quando o botão de gerar está visível e habilitado. */
  function checkGenButton() {
    const btn = document.getElementById('gen-img-btn');
    if (!btn || btn.disabled) return;
    if (!isVisible(btn)) return;   // ainda escondido
    fire(16);
  }

  /** Dicas por inatividade nos campos de texto. */
  function bindIdleFields() {
    Object.keys(IDLE_FIELDS).forEach(id => {
      document.addEventListener('focusin', e => {
        if (!e.target || e.target.id !== id) return;
        armIdle(id);
      });
      document.addEventListener('input', e => {
        if (!e.target || e.target.id !== id) return;
        armIdle(id);
      });
      document.addEventListener('focusout', e => {
        if (!e.target || e.target.id !== id) return;
        clearTimeout(idleTimers[id]);
      });
    });
  }

  function armIdle(id) {
    clearTimeout(idleTimers[id]);
    const trackId = IDLE_FIELDS[id];
    if (tipsDone.has(trackId)) return;
    idleTimers[id] = setTimeout(() => fire(trackId), IDLE_MS);
  }

  /* ───────────────────────────── BOOT ───────────────────────────── */

  function init() {
    const hasHeader = document.getElementById('voice-onboarding-btn')
                   || document.getElementById('settings-btn');
    if (!hasHeader) return;   // página sem header (landing, admin, 404)
    mountTrigger();
    mountPanel();
    bindTriggers();

    // Primeira visita: mostra o convite, mas sem tocar nada — o áudio
    // depende de um clique do usuário. E só depois que os overlays de
    // termos/ativação saírem da frente, senão o convite abre atrás deles.
    if (!isDone()) watchInvite();
  }

  /** Overlays do session.js que cobrem a tela inteira. */
  const BLOCKERS = ['terms-overlay', 'activation-overlay', 'loading-overlay'];

  /**
   * Visibilidade real de um elemento. Não dá pra usar offsetParent aqui:
   * ele é sempre null em elementos position:fixed, e os overlays do
   * session.js são fixed — a checagem passaria batido.
   */
  function isVisible(el) {
    if (!el) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function screenIsBlocked() {
    return BLOCKERS.some(id => isVisible(document.getElementById(id)));
  }

  /**
   * Mantém o convite em sincronia com os overlays do session.js enquanto o
   * usuário não iniciou o tour. O overlay de termos pode aparecer depois de
   * uma chamada ao backend, então não dá pra confiar num timer fixo: se ele
   * surgir, o convite recolhe; quando a tela ficar livre de novo, ele volta.
   */
  function watchInvite() {
    let tries = 0;
    let clear = 0;
    (function tick() {
      if (active) return;                    // usuário assumiu o controle
      if (screenIsBlocked()) {
        clear = 0;
        closePanel();
      } else if (++clear >= 4) {              // 4 × 400ms = 1,6s livre
        openPanel();
      }
      if (++tries > 300) return;              // desiste após ~2min
      setTimeout(tick, 400);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    start, skip, close, fire,
    open: openPanel,
    toggle: togglePanel,
    tracks: TRACKS,
    /** Zera as flags e recomeça do primeiro áudio (útil pra testar). */
    reset() {
      try {
        localStorage.removeItem(LS_DONE);
        localStorage.removeItem(LS_PLAYED);
        sessionStorage.removeItem(SS_TIPS);
      } catch (e) { /* ignore */ }
      played = new Set();
      tipsDone = new Set();
      idleUI();
    }
  };
})();

window.NexVoiceOnboarding = VoiceOnboarding;
