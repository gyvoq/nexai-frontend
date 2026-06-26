/**
 * session.js — Nex AI
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsabilidades:
 *  - Verificar token de sessão com o servidor em TODA página carregada
 *  - Redirecionar para ativação se token ausente ou inválido
 *  - Exibir overlay de ativação se não autenticado
 *  - ZERO lógica de validação de licença no client-side
 *
 * Segurança:
 *  - Token guardado em sessionStorage (some ao fechar o browser)
 *  - Verificação obrigatória no servidor a cada carregamento
 *  - Rate limiting tratado com mensagem amigável
 */

'use strict';

const Session = (() => {

  const API_BASE    = 'http://localhost:3000'; // ← trocar pela URL do seu backend em produção
  const TOKEN_KEY   = 'nex_session_token';
  const EXPIRY_KEY  = 'nex_session_expiry';

  /** Pega o token salvo no sessionStorage */
  function getToken() {
    try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
  }

  /** Salva token e data de expiração */
  function saveSession(token, expiresAt) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(EXPIRY_KEY, expiresAt);
    } catch (e) {
      console.warn('[Session] Erro ao salvar sessão:', e);
    }
  }

  /** Remove sessão do navegador */
  function clearSession() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(EXPIRY_KEY);
    } catch { /* ignore */ }
  }

  /** Formata data para exibição em pt-BR */
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('pt-BR'); } catch { return '—'; }
  }

  /**
   * Verifica token com o servidor.
   * Retorna { valid: bool, expiresAt? }
   */
  async function verifyWithServer(token) {
    try {
      const res = await fetch(`${API_BASE}/api/verify-session`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ token }),
      });
      return await res.json();
    } catch {
      // Se o servidor estiver offline, bloqueia por segurança
      return { valid: false, reason: 'offline' };
    }
  }

  /**
   * Envia a chave de ativação para o servidor.
   * Retorna { success, token, expiresAt, message? } ou { error }
   */
  async function activate(code) {
    const res = await fetch(`${API_BASE}/api/activate`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ key: code }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
    return data;
  }

  /**
   * Faz logout: invalida token no servidor e limpa sessionStorage.
   */
  async function logout() {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/api/logout`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ token }),
      });
    } catch { /* mesmo se falhar, limpa localmente */ }
    clearSession();
    showActivationOverlay();
  }

  // ─── UI DA TELA DE ATIVAÇÃO ──────────────────────────────────────────────

  /** Mostra overlay de ativação sobre o conteúdo */
  function showActivationOverlay() {
    let ov = document.getElementById('activation-overlay');
    if (!ov) {
      ov = buildOverlay();
      document.body.prepend(ov);
    }
    ov.style.display = '';
    const d0 = document.getElementById('d0');
    if (d0) d0.focus();
  }

  /** Constrói o overlay de ativação sem innerHTML de dados do usuário */
  function buildOverlay() {
    const ov = document.createElement('div');
    ov.id = 'activation-overlay';

    // ── Card ──
    const card = document.createElement('div');
    card.className = 'act-card';

    // Logo
    const logo = document.createElement('div');
    logo.className = 'act-logo';
    logo.innerHTML = `
      <div class="act-logo-icon">
        <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>`;
    const logoText = document.createElement('span');
    logoText.className = 'act-logo-text';
    logoText.textContent = 'Nex AI';
    logo.appendChild(logoText);

    // Título
    const title = document.createElement('div');
    title.className = 'act-title';
    title.textContent = 'Ativar Licença';

    const sub = document.createElement('div');
    sub.className = 'act-sub';
    sub.textContent = 'Insira seu código de ativação de 5 dígitos para acessar o painel.';

    // Inputs (5 dígitos)
    const inputsWrap = document.createElement('div');
    inputsWrap.className = 'act-inputs';
    inputsWrap.setAttribute('role', 'group');
    inputsWrap.setAttribute('aria-label', 'Código de ativação');

    const digits = [];
    for (let i = 0; i < 5; i++) {
      const inp = document.createElement('input');
      inp.className = 'act-digit';
      inp.id = `d${i}`;
      inp.maxLength = 1;
      inp.autocomplete = 'off';
      inp.spellcheck = false;
      inp.inputMode = 'text';
      inp.setAttribute('aria-label', `Dígito ${i + 1} de 5`);
      inp.setAttribute('placeholder', '·');
      inputsWrap.appendChild(inp);
      digits.push(inp);
    }

    // Mensagens de feedback — textContent apenas, nunca innerHTML com input
    const errorEl = document.createElement('div');
    errorEl.className = 'act-error-msg';
    errorEl.id = 'act-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('aria-live', 'polite');

    const successEl = document.createElement('div');
    successEl.className = 'act-success-msg';
    successEl.id = 'act-success';
    successEl.setAttribute('aria-live', 'polite');

    // Botão
    const btn = document.createElement('button');
    btn.className = 'act-btn';
    btn.id = 'act-submit-btn';
    btn.type = 'button';
    btn.textContent = 'Ativar Agora';
    btn.addEventListener('click', () => window.submitActivation());

    // Info de expiração
    const expiryInfo = document.createElement('div');
    expiryInfo.id = 'act-expiry-info';
    expiryInfo.style.display = 'none';
    const expiryText = document.createElement('div');
    expiryText.className = 'act-expiry';
    expiryText.textContent = 'Licença válida até ';
    const expiryDate = document.createElement('span');
    expiryDate.id = 'act-expiry-date';
    expiryText.appendChild(expiryDate);
    expiryInfo.appendChild(expiryText);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'act-footer';
    footer.textContent = 'Cada código é válido por até 1 mês após ativação';

    card.append(logo, title, sub, inputsWrap, errorEl, successEl, btn, expiryInfo, footer);
    ov.appendChild(card);

    // ── Eventos dos inputs ──
    _bindDigitEvents(digits);

    return ov;
  }

  /** Vincula eventos de navegação e paste nos campos de dígito */
  function _bindDigitEvents(digits) {
    // Contador de tentativas no client para feedback visual
    // (o rate-limit real está no servidor)
    let attempts = 0;
    const MAX_CLIENT_ATTEMPTS = 5;
    let blockedUntil = 0;

    digits.forEach((inp, i) => {
      inp.addEventListener('input', function () {
        // Sanitiza: só A-Z e 0-9
        const v = Sanitize.sanitizeCode(this.value);
        this.value = v ? v[v.length - 1] : '';
        this.classList.toggle('filled', !!this.value);
        if (this.value && i < 4) digits[i + 1].focus();
        clearMsg();
      });

      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !this.value && i > 0) {
          digits[i - 1].focus();
          digits[i - 1].value = '';
          digits[i - 1].classList.remove('filled');
        }
        if (e.key === 'Enter') window.submitActivation();
      });

      inp.addEventListener('paste', function (e) {
        e.preventDefault();
        const raw = (e.clipboardData || window.clipboardData).getData('text');
        // Sanitiza o texto colado
        const clean = Sanitize.sanitizeCode(raw).slice(0, 5);
        clean.split('').forEach((ch, j) => {
          if (digits[j]) {
            digits[j].value = ch;
            digits[j].classList.add('filled');
          }
        });
        digits[Math.min(clean.length, 4)].focus();
        clearMsg();
      });
    });

    // Expõe submitActivation globalmente
    window.submitActivation = async function () {
      const now = Date.now();

      // Bloqueio client-side temporário (complementa o rate-limit do servidor)
      if (now < blockedUntil) {
        const secsLeft = Math.ceil((blockedUntil - now) / 1000);
        showError(`Aguarde ${secsLeft}s antes de tentar novamente.`);
        return;
      }

      const code = digits.map(d => Sanitize.sanitizeCode(d.value)).join('');

      if (code.length < 5) {
        showError('Preencha todos os 5 dígitos.');
        digits.forEach(d => { if (!d.value) d.classList.add('error'); });
        return;
      }

      const btn = document.getElementById('act-submit-btn');
      if (btn) { btn.disabled = true; btn.textContent = 'Verificando...'; }

      try {
        const result = await activate(code);

        // Sucesso
        saveSession(result.token, result.expiresAt);
        digits.forEach(d => { d.classList.remove('error', 'filled'); d.classList.add('success'); });

        const successEl = document.getElementById('act-success');
        if (successEl) successEl.textContent = '✓ Licença ativada! Bem-vindo ao Nex AI.';
        successEl && successEl.classList.add('visible');

        const expiryDateEl = document.getElementById('act-expiry-date');
        if (expiryDateEl) expiryDateEl.textContent = fmtDate(result.expiresAt);

        const expiryInfo = document.getElementById('act-expiry-info');
        if (expiryInfo) expiryInfo.style.display = '';

        // Fecha overlay após animação
        setTimeout(() => {
          const ov = document.getElementById('activation-overlay');
          if (ov) { ov.classList.add('hiding'); setTimeout(() => ov.remove(), 600); }
        }, 1400);

        attempts = 0;

      } catch (err) {
        attempts++;

        // Após 5 falhas client-side, bloqueia por 60s localmente
        if (attempts >= MAX_CLIENT_ATTEMPTS) {
          blockedUntil = Date.now() + 60_000;
          showError('Muitas tentativas. Aguarde 60 segundos.');
          attempts = 0;
        } else {
          // Mensagem genérica — não revela se a chave existe ou não
          showError('Código inválido. Verifique e tente novamente.');
        }

        digits.forEach(d => d.classList.add('error'));

        setTimeout(() => {
          digits.forEach(d => { d.classList.remove('error'); d.value = ''; d.classList.remove('filled'); });
          const btn = document.getElementById('act-submit-btn');
          if (btn) { btn.disabled = false; btn.textContent = 'Ativar Agora'; }
          digits[0].focus();
        }, 900);
      }
    };

    function clearMsg() {
      const err = document.getElementById('act-error');
      const suc = document.getElementById('act-success');
      if (err) err.classList.remove('visible');
      if (suc) suc.classList.remove('visible');
      digits.forEach(d => d.classList.remove('error', 'success'));
    }

    function showError(msg) {
      const el = document.getElementById('act-error');
      if (el) {
        // textContent — nunca innerHTML com msg de erro (poderia conter input do usuário)
        el.textContent = msg;
        el.classList.add('visible');
      }
    }
  }

  // ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────

  async function init() {
    const token = getToken();

    if (!token) {
      // Sem token: mostra ativação
      showActivationOverlay();
      return;
    }

    // Com token: verifica no servidor
    const result = await verifyWithServer(token);

    if (!result.valid) {
      clearSession();
      showActivationOverlay();
      return;
    }

    // Sessão válida: atualiza data de expiração na sidebar se existir
    const expiryEl = document.getElementById('expiry-display');
    if (expiryEl) expiryEl.textContent = fmtDate(result.expiresAt);
  }

  // Vincula botão de logout se existir na página
  document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    init();
  });

  return { getToken, saveSession, clearSession, logout };
})();

window.NexSession = Session;
