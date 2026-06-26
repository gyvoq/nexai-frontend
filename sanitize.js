/**
 * sanitize.js — Nex AI
 * ─────────────────────────────────────────────────
 * Regras:
 *  1. Nunca usar innerHTML com dados do usuário
 *  2. Usar textContent sempre que possível
 *  3. Quando precisar de HTML, chamar escapeHTML primeiro
 *  4. Sanitizar todo input antes de processar
 */

'use strict';

const Sanitize = (() => {

  /**
   * Escapa caracteres HTML especiais.
   * Usar APENAS quando innerHTML for absolutamente necessário.
   * Prefira textContent sempre.
   */
  function escapeHTML(raw) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    return String(raw).replace(/[&<>"'/]/g, ch => map[ch]);
  }

  /**
   * Define texto em elemento DOM com segurança (textContent).
   * NUNCA usa innerHTML.
   */
  function safeText(el, text) {
    if (el instanceof Element) el.textContent = String(text);
  }

  /**
   * Define HTML em elemento DOM quando HTML controlado é necessário.
   * Nunca passar dados do usuário diretamente — sempre escapar antes.
   * Bloqueia qualquer tentativa de injetar <script>.
   */
  function safeHTML(el, trustedHTML) {
    if (!(el instanceof Element)) return;
    if (/<script/i.test(trustedHTML)) {
      console.error('[Sanitize] Bloqueado: tentativa de injetar <script>');
      return;
    }
    el.innerHTML = trustedHTML;
  }

  /**
   * Sanitiza código de ativação: apenas A-Z e 0-9, maiúsculo, max 5 chars.
   */
  function sanitizeCode(raw) {
    return String(raw)
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 5);
  }

  /**
   * Sanitiza texto genérico de input do usuário.
   * Remove tags HTML e limita tamanho.
   */
  function sanitizeInput(raw, maxLen = 200) {
    return String(raw)
      .replace(/[<>]/g, '')   // remove < e > para evitar injeção HTML
      .trim()
      .slice(0, maxLen);
  }

  return { escapeHTML, safeText, safeHTML, sanitizeCode, sanitizeInput };
})();

window.Sanitize = Sanitize;
