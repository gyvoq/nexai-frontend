'use strict';

const NexPlan = (() => {
  const UPGRADE_URL = 'https://viralyze-tok.vercel.app/landing/landing.html#pricing';
  const FREE_LIMIT = 4;
  const ONB_KEY = 'nex_onb_v1';
  const LOCK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>';
  const LOCKED_TABS = ['viralize', 'influencer'];

  let plan = 'pro';
  let expiresAt = null;
  let infTimer = null;

  function isFree() { return plan === 'free'; }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function upgradeLink(label, cls) {
    return `<a class="${cls || 'free-upgrade-btn'}" href="${UPGRADE_URL}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${label || 'Fazer upgrade'}</a>`;
  }

  function toast(msg) {
    if (typeof showToast === 'function') showToast(msg);
    else if (typeof fsToast === 'function') fsToast(msg);
  }

  function blocked(feature) {
    toast(`${feature} é exclusivo do plano Pro.`);
  }

  function daysLeft() {
    if (!expiresAt) return null;
    const ms = new Date(expiresAt).getTime() - Date.now();
    if (isNaN(ms)) return null;
    return Math.max(0, Math.ceil(ms / 86400000));
  }

  function daysLabel() {
    const d = daysLeft();
    if (d === null) return 'Recursos limitados';
    if (d <= 1) return 'Último dia de teste';
    return `${d} dias restantes`;
  }

  function applyPlanUi() {
    document.documentElement.classList.toggle('plan-free', isFree());

    document.querySelectorAll('.sidebar-item').forEach(item => {
      const oc = item.getAttribute('onclick') || '';
      const locked = isFree() && LOCKED_TABS.some(t => oc.indexOf(`switchTab('${t}'`) !== -1);
      item.classList.toggle('is-locked', locked);
    });

    document.querySelectorAll('.inv-link-btn, .backup-btn').forEach(b => {
      b.disabled = isFree();
      b.setAttribute('aria-disabled', isFree() ? 'true' : 'false');
    });

    const mini = document.querySelector('.plan-mini');
    if (!mini) return;
    const name = mini.querySelector('.plan-mini-name');
    const label = mini.querySelector('.plan-mini-label');
    const old = mini.querySelector('.free-upgrade-btn');
    if (old) old.remove();
    if (isFree()) {
      if (name) name.textContent = 'Plano Free';
      if (label) label.textContent = daysLabel();
      mini.insertAdjacentHTML('beforeend', upgradeLink('Fazer upgrade'));
    } else {
      if (name) name.textContent = 'Plano Pro';
      if (label) label.textContent = 'Todos os recursos ativos';
    }
  }

  function rerender() {
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof vvShowAll === 'function' && document.querySelector('#vv-grid .vv-card')) vvShowAll();
  }

  function set(p, exp) {
    plan = p === 'free' ? 'free' : 'pro';
    expiresAt = exp || null;
    applyPlanUi();
    rerender();
  }

  function reset() {
    plan = 'pro';
    expiresAt = null;
    applyPlanUi();
  }

  function lockedProductCard(p) {
    return `<div class="product-card locked" data-cat="${p.cat}" data-id="${p.id}" role="listitem" aria-label="Produto bloqueado" onclick="NexPlan.blocked('Este produto')">
      <div class="card-img ${p.grad}"><span class="lock-badge">${LOCK_SVG}</span></div>
      <div class="card-body">
        <div class="card-name">Disponível no Pro</div>
        ${upgradeLink('Fazer upgrade', 'card-btn free-upgrade-btn')}
      </div>
    </div>`;
  }

  function lockedCardHtml(kind) {
    const video = kind === 'video';
    return `<div class="fs-locked-card">
      <div class="fs-locked-visual${video ? ' is-video' : ''}"><span class="fs-locked-lock">${LOCK_SVG}</span></div>
      <div class="fs-locked-info">
        <div class="fs-locked-title">${video ? 'Vídeo bloqueado' : 'Imagem bloqueada'}</div>
        <div class="fs-locked-sub">${video ? 'Seu vídeo está pronto, mas só o plano Pro libera o resultado.' : 'Sua imagem está pronta, mas só o plano Pro libera o resultado.'}</div>
        ${upgradeLink('Fazer upgrade')}
      </div>
    </div>`;
  }

  function lockedUploadHtml() {
    return `${LOCK_SVG}<div>Upload bloqueado no plano Free</div>${upgradeLink('Fazer upgrade')}`;
  }

  function renderLockedInfluencer() {
    const box = document.getElementById('inf-render-locked');
    if (!box || box.dataset.busy === '1') return;
    const loading = document.getElementById('avatar-ai-loading');
    const bar = box.querySelector('.inf-render-bar span');
    const label = box.querySelector('.inf-render-label');
    const steps = ['Montando o rosto…', 'Ajustando a iluminação…', 'Aplicando estilo e roupas…', 'Finalizando o render…'];
    const total = 7000;
    const start = Date.now();

    box.dataset.busy = '1';
    box.hidden = false;
    box.classList.remove('is-done');
    box.classList.add('is-rendering');
    if (bar) bar.style.width = '0%';
    if (loading) loading.classList.add('visible');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    clearInterval(infTimer);
    infTimer = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / total);
      if (bar) bar.style.width = Math.round(p * 100) + '%';
      if (label) label.textContent = steps[Math.min(steps.length - 1, Math.floor(p * steps.length))];
      if (p >= 1) {
        clearInterval(infTimer);
        box.dataset.busy = '';
        box.classList.remove('is-rendering');
        box.classList.add('is-done');
        if (label) label.textContent = 'Resultado bloqueado';
        if (loading) loading.classList.remove('visible');
      }
    }, 120);
  }

  function resetInfluencerRender() {
    clearInterval(infTimer);
    const box = document.getElementById('inf-render-locked');
    if (!box) return;
    box.hidden = true;
    box.dataset.busy = '';
    box.classList.remove('is-done', 'is-rendering');
    const loading = document.getElementById('avatar-ai-loading');
    if (loading) loading.classList.remove('visible');
  }

  function buildClaimBanner(opts) {
    const wrap = el('div', 'free-claim');
    wrap.hidden = true;
    const text = el('div', 'free-claim-text');
    const btn = el('button', 'free-claim-btn');
    btn.type = 'button';
    const link = el('a', 'free-claim-btn', 'Ver planos');
    link.href = UPGRADE_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    wrap.append(text, btn, link);

    async function call(path) {
      const deviceId = await opts.getDeviceId();
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10000);
      try {
        const res = await fetch(opts.apiBase + path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId }),
          signal: ctrl.signal
        });
        if (!res.ok) throw new Error('http');
        return await res.json();
      } finally {
        clearTimeout(timer);
      }
    }

    function paint(s) {
      wrap.hidden = false;
      btn.hidden = true;
      btn.disabled = false;
      link.hidden = true;
      text.textContent = '';
      btn.onclick = null;

      if (s.status === 'available') {
        text.textContent = `Teste grátis por ${s.days || 7} dias, sem cartão.`;
        btn.textContent = 'Pegar minha chave free';
        btn.hidden = false;
        btn.onclick = async () => {
          btn.disabled = true;
          try { paint(await call('/api/free-key/claim')); }
          catch { btn.disabled = false; text.textContent = 'Não foi possível pegar a chave agora. Tente de novo.'; }
        };
      } else if (s.status === 'reserved') {
        text.append('Sua chave free é ', el('span', 'free-claim-key', s.key));
        btn.textContent = 'Resgatar';
        btn.hidden = false;
        btn.onclick = () => opts.redeem(s.key);
      } else if (s.status === 'expired') {
        text.textContent = 'Seu teste grátis terminou. Escolha um plano para continuar.';
        link.hidden = false;
      } else if (s.status === 'soldout') {
        text.textContent = 'As vagas gratuitas acabaram por enquanto.';
      } else {
        wrap.hidden = true;
      }
    }

    call('/api/free-key/status').then(paint).catch(() => { wrap.hidden = true; });
    return wrap;
  }

  const ONB = {
    goals: [
      ['afiliado', 'Vender como afiliado no TikTok Shop', 'afiliado'],
      ['proprio', 'Vender meus próprios produtos', 'loja própria'],
      ['agencia', 'Criar conteúdo para clientes', 'agência'],
      ['explorar', 'Só explorando por enquanto', 'explorando']
    ],
    niches: [
      ['beleza', 'Beleza', 'hydrating facial serum'],
      ['casa', 'Casa e cozinha', 'rotating kitchen organizer'],
      ['moda', 'Moda', 'viral midi dress'],
      ['tech', 'Tech e gadgets', 'glass desk mousepad'],
      ['fitness', 'Fitness e saúde', 'resistance band set']
    ],
    styles: [
      ['unboxing', 'Unboxing', 'unboxing shot: hands opening the package on a clean table, then a close-up reveal of the product'],
      ['mirror', 'Mirror selfie', 'mirror selfie style: phone in hand, full-body framing, showing the product in use'],
      ['antes', 'Antes e depois', 'before/after format: quick wipe transition between the problem and the result'],
      ['review', 'Review honesto', 'honest talking-head review: chest-up framing, product held close to the camera']
    ],
    objections: [
      ['ideia', 'Não sei o que postar', 'Falta de ideia é o que mais trava. Aqui você escolhe nicho e estilo e recebe o prompt pronto, sem começar do zero.'],
      ['tempo', 'Não tenho tempo', 'Tranquilo. O prompt sai em segundos, é só copiar e usar. Dá pra deixar um vídeo encaminhado no tempo de um café.'],
      ['tentei', 'Já tentei e não vendi', 'Acontece muito. Quase sempre o problema está no gancho dos 2 primeiros segundos e no jeito de mostrar o produto. Os prompts já vêm com gancho, ritmo e enquadramento prontos.'],
      ['dificil', 'Acho IA complicada', 'Você não precisa saber nada técnico. É só responder umas perguntas rápidas e o prompt vem pronto pra usar.'],
      ['medo', 'Tenho medo de não funcionar', 'Faz sentido ter cuidado. Por isso dá pra testar no plano Free e ver o resultado com os seus olhos antes de decidir qualquer coisa.']
    ],
    pains: {
      ideia: [
        n => `${n}ficar sem ideia é vídeo parado.`,
        (niche, style) => `Cada dia sem postar é um dia que o algoritmo entrega pra outra pessoa de ${niche}. Aqui você nunca mais começa do zero: o ${style} já sai pronto pra usar.`
      ],
      tempo: [
        n => `${n}tempo é o que você não tem.`,
        (niche, style) => `Enquanto você pensa no que gravar, outro criador de ${niche} já postou. Aqui o ${style} sai em segundos, sem enrolação.`
      ],
      tentei: [
        n => `${n}postar e não vender dói.`,
        (niche, style) => `Quase nunca é falta de esforço, é falta de gancho e de formato. O ${style} em ${niche} já vem com gancho nos 2 primeiros segundos, do jeito que prende.`
      ],
      dificil: [
        n => `${n}você não precisa entender de IA.`,
        (niche, style) => `O complicado é o que te fez adiar até agora. Aqui é responder, copiar e postar o seu ${style} de ${niche}.`
      ],
      medo: [
        n => `${n}medo de não funcionar é normal.`,
        (niche, style) => `Só que ficar sem testar também custa: mais um mês sem resultado em ${niche}. Entra, faz o seu ${style} e vê funcionando.`
      ]
    }
  };

  function onbDone() {
    try { return localStorage.getItem(ONB_KEY) === '1'; } catch { return false; }
  }

  function onbMarkDone() {
    try { localStorage.setItem(ONB_KEY, '1'); } catch {}
  }

  function startOnboarding() {
    if (document.getElementById('onboarding-overlay')) return;
    const answers = { name: '', goal: 'explorar', niche: 'beleza', obj: 'ideia', style: 'unboxing' };
    const TOTAL = 7;

    const ov = el('div');
    ov.id = 'onboarding-overlay';
    const card = el('div', 'act-card onb-card');
    ov.appendChild(card);
    document.body.appendChild(ov);

    function frame(step) {
      card.textContent = '';
      const prog = el('div', 'onb-progress');
      prog.setAttribute('role', 'progressbar');
      prog.setAttribute('aria-valuemin', '1');
      prog.setAttribute('aria-valuemax', String(TOTAL));
      prog.setAttribute('aria-valuenow', String(step));
      const bar = el('span');
      bar.style.width = Math.round((step / TOTAL) * 100) + '%';
      prog.appendChild(bar);
      card.appendChild(prog);
    }

    function heading(title, sub) {
      card.appendChild(el('div', 'act-title onb-title', title));
      if (sub) card.appendChild(el('div', 'act-sub onb-sub', sub));
    }

    function bubble(text) {
      card.appendChild(el('div', 'onb-bubble', text));
    }

    function question(step, title, sub, list, key, next) {
      frame(step);
      heading(title, sub);
      const box = el('div', 'onb-options');
      list.forEach(opt => {
        const b = el('button', 'onb-option', opt[1]);
        b.type = 'button';
        b.addEventListener('click', () => { answers[key] = opt[0]; next(); });
        box.appendChild(b);
      });
      card.appendChild(box);
      const first = box.querySelector('button');
      if (first) first.focus();
    }

    function firstName() { return answers.name ? answers.name.split(/\s+/)[0] : ''; }
    function goalLabel() { return (ONB.goals.find(g => g[0] === answers.goal) || ONB.goals[3])[2]; }
    function nicheLabel() { return (ONB.niches.find(n => n[0] === answers.niche) || ONB.niches[0])[1]; }
    function styleLabel() { return (ONB.styles.find(s => s[0] === answers.style) || ONB.styles[0])[1]; }

    function stepName() {
      frame(1);
      heading('Oi! Eu sou o Viralyze', 'Antes de começar, como você gosta de ser chamado?');
      const input = el('input', 'form-input onb-name');
      input.type = 'text';
      input.maxLength = 20;
      input.placeholder = 'Seu nome';
      input.autocomplete = 'given-name';
      input.setAttribute('aria-label', 'Seu nome');
      card.appendChild(input);
      const actions = el('div', 'onb-actions');
      const go = el('button', 'act-btn', 'Continuar');
      go.type = 'button';
      const apply = () => { answers.name = input.value.trim().slice(0, 20); stepGoal(); };
      go.addEventListener('click', apply);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });
      actions.appendChild(go);
      card.appendChild(actions);
      input.focus();
    }

    function stepGoal() {
      const n = firstName();
      question(2, n ? `Prazer, ${n}! O que você quer fazer aqui?` : 'Prazer! O que você quer fazer aqui?', 'Assim eu já adapto tudo pra você.', ONB.goals, 'goal', stepNiche);
    }

    function stepNiche() {
      question(3, 'E em qual nicho você quer viralizar?', 'Vou escolher um produto de exemplo desse nicho.', ONB.niches, 'niche', stepObjection);
    }

    function stepObjection() {
      question(4, `${nicheLabel()}, ótima escolha. Me conta uma coisa:`, 'O que mais te trava hoje na hora de vender com vídeo?', ONB.objections, 'obj', stepReply);
    }

    function stepReply() {
      frame(5);
      const o = ONB.objections.find(x => x[0] === answers.obj) || ONB.objections[0];
      const n = firstName();
      heading(n ? `Entendi, ${n}.` : 'Entendi.');
      bubble(o[2]);
      const actions = el('div', 'onb-actions');
      const next = el('button', 'act-btn', 'Me mostra na prática');
      next.type = 'button';
      next.addEventListener('click', stepStyle);
      actions.appendChild(next);
      card.appendChild(actions);
      next.focus();
    }

    function stepStyle() {
      question(6, 'Que estilo de vídeo você quer fazer?', `Escolhe um que combine com ${nicheLabel().toLowerCase()}.`, ONB.styles, 'style', stepFinal);
    }

    function close() {
      onbMarkDone();
      ov.classList.add('hiding');
      setTimeout(() => ov.remove(), 380);
    }

    function stepFinal() {
      frame(7);
      const n = firstName();
      const pain = ONB.pains[answers.obj] || ONB.pains.ideia;
      const t = pain[0](n ? `${n}, ` : '');
      heading(n ? t : t.charAt(0).toUpperCase() + t.slice(1));
      bubble(pain[1](nicheLabel().toLowerCase(), styleLabel().toLowerCase()));
      const actions = el('div', 'onb-actions');
      const next = el('button', 'act-btn', 'Entrar no Viralyze');
      next.type = 'button';
      next.addEventListener('click', close);
      actions.appendChild(next);
      card.appendChild(actions);
      next.focus();
    }

    stepName();
  }

  function onReady() {
    applyPlanUi();
    if (isFree() && !onbDone()) setTimeout(startOnboarding, 350);
  }

  return {
    UPGRADE_URL, FREE_LIMIT,
    isFree, set, reset, onReady, blocked, upgradeLink,
    lockedProductCard, lockedCardHtml, lockedUploadHtml,
    renderLockedInfluencer, resetInfluencerRender,
    buildClaimBanner
  };
})();

window.NexPlan = NexPlan;
