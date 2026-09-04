

'use strict';

const Sanitize = (() => {

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

  function safeText(el, text) {
    if (el instanceof Element) el.textContent = String(text);
  }

  function safeHTML(el, trustedHTML) {
    if (!(el instanceof Element)) return;
    if (/<script/i.test(trustedHTML)) {
      console.error('[Sanitize] Bloqueado: tentativa de injetar <script>');
      return;
    }
    el.innerHTML = trustedHTML;
  }

  function sanitizeCode(raw) {
    return String(raw)
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 5);
  }

  function sanitizeInput(raw, maxLen = 200) {
    return String(raw)
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, maxLen);
  }

  return { escapeHTML, safeText, safeHTML, sanitizeCode, sanitizeInput };
})();

window.Sanitize = Sanitize;
