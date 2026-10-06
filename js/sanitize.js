'use strict';

const Sanitize = (() => {

  function escapeHTML(raw) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
      '`': '&#x60;'
    };
    return String(raw == null ? '' : raw).replace(/[&<>"'`/]/g, ch => map[ch]);
  }

  const escapeAttr = escapeHTML;


  function args(...list) {
    return escapeHTML(JSON.stringify(list));
  }

  function safeText(el, text) {
    if (el instanceof Element) el.textContent = String(text);
  }

  const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR']);
  function sanitizeRichHTML(dirty) {
    const doc = new DOMParser().parseFromString('<body>' + String(dirty == null ? '' : dirty), 'text/html');
    const out = document.createDocumentFragment();
    (function walk(node, parent) {
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          parent.appendChild(document.createTextNode(child.nodeValue));
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (ALLOWED_TAGS.has(child.tagName)) {
            const el = document.createElement(child.tagName.toLowerCase());
            walk(child, el);
            parent.appendChild(el);
          } else if (!/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|TEMPLATE|NOSCRIPT)$/.test(child.tagName)) {
            walk(child, parent);
          }
        }
      });
    })(doc.body, out);
    return out;
  }

  function safeHTML(el, dirtyHTML) {
    if (!(el instanceof Element)) return;
    el.replaceChildren(sanitizeRichHTML(dirtyHTML));
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

  const DATA_IMG = /^data:image\/(png|jpe?g|webp|gif|avif);base64,[A-Za-z0-9+/]+=*$/i;
  const LOCAL_IMG = /^(\.\/)?assets\/[\w\-./ ]+$/;
  function safeImgUrl(raw) {
    if (typeof raw !== 'string') return '';
    const v = raw.trim();
    if (!v) return '';
    if (v.length > 600000) return '';
    if (DATA_IMG.test(v)) return v;
    if (v.length > 2048) return '';
    if (LOCAL_IMG.test(v) && v.indexOf('..') === -1) return v;
    try {
      const u = new URL(v);
      if (u.protocol === 'https:') return u.href;
    } catch (e) { /* inválida */ }
    return '';
  }

  function safeHttpsUrl(raw) {
    if (typeof raw !== 'string') return '';
    const v = raw.trim();
    if (!v || v.length > 2048) return '';
    try {
      const u = new URL(v);
      return u.protocol === 'https:' ? u.href : '';
    } catch (e) { return ''; }
  }

  const schema = (() => {
    const CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
    const CTRL_LINE = /[\u0000-\u001f\u007f]/g;

    function str(v, max, multiline) {
      if (typeof v !== 'string') return '';
      const t = v.replace(multiline ? CTRL : CTRL_LINE, ' ');
      return (multiline ? t : t.replace(/[<>]/g, '')).slice(0, max);
    }
    function id(v) {
      if (typeof v === 'number' && Number.isSafeInteger(v) && v >= 0) return v;
      if (typeof v === 'string' && /^[\w-]{1,40}$/.test(v)) return v;
      return null;
    }
    function int(v, min, max, dflt) {
      const n = typeof v === 'number' ? v : parseInt(v, 10);
      return Number.isFinite(n) ? Math.max(min, Math.min(max, Math.trunc(n))) : dflt;
    }
    function isoDate(v) {
      const d = new Date(v);
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    }

    function product(p) {
      if (!p || typeof p !== 'object') return null;
      const pid = id(p.id);
      const name = str(p.name, 80).trim();
      if (pid === null || !name) return null;
      const out = {
        id: pid,
        name,
        price: str(p.price, 20),
        cat: /^[a-z0-9_-]{1,24}$/i.test(p.cat) ? p.cat : 'custom',
        img: safeImgUrl(p.img),
        rank: int(p.rank, 0, 100000, 999),
        grad: /^grad-[a-z0-9-]{1,20}$/.test(p.grad) ? p.grad : 'grad-casa',
        tag: str(p.tag, 30),
        prompt: str(p.prompt, 200),
        custom: true
      };
      if (p.isNew === true) out.isNew = true;
      const source = str(p.source, 40);
      if (source) out.source = source;
      const url = safeHttpsUrl(p.url);
      if (url) out.url = url;
      return out;
    }

    function avatar(a) {
      if (!a || typeof a !== 'object') return null;
      const aid = id(a.id);
      const name = str(a.name, 60).trim();
      if (aid === null || !name) return null;
      const out = {
        id: aid,
        name,
        age: String(int(a.age, 1, 120, 28)),
        gender: a.gender === 'f' || a.gender === 'm' ? a.gender : 'nb',
        genero: str(a.genero, 30),
        etnia: str(a.etnia, 40),
        corpo: str(a.corpo, 40),
        altura: str(a.altura, 40),
        rosto: str(a.rosto, 40),
        olhos: str(a.olhos, 40),
        corCabelo: str(a.corCabelo, 40),
        estiloCabelo: str(a.estiloCabelo, 40),
        nicho: str(a.nicho, 500),
        style: str(a.style, 500),
        personalidade: str(a.personalidade, 500),
        conteudo: str(a.conteudo, 500),
        desc: str(a.desc, 400),
        prompt: str(a.prompt, 20000, true),
        custom: true
      };
      const img = safeImgUrl(a.img);
      if (img) out.img = img;
      return out;
    }

    const HIST_TYPES = ['imagem', 'video', 'avatar'];
    function historyItem(h) {
      if (!h || typeof h !== 'object') return null;
      const content = str(h.content, 20000, true);
      if (!content) return null;
      return {
        type: HIST_TYPES.indexOf(h.type) !== -1 ? h.type : 'imagem',
        content,
        date: isoDate(h.date)
      };
    }

    function favorites(f) {
      const out = {};
      if (!f || typeof f !== 'object' || Array.isArray(f)) return out;
      let n = 0;
      for (const k of Object.keys(f)) {
        if (n >= 1000) break;
        if (f[k] === true && /^[a-z]{1,10}-[\w-]{1,40}$/i.test(k)) { out[k] = true; n++; }
      }
      return out;
    }

    function list(arr, fn, max) {
      if (!Array.isArray(arr)) return [];
      const out = [];
      for (const item of arr) {
        if (out.length >= max) break;
        const v = fn(item);
        if (v) out.push(v);
      }
      return out;
    }

    function inventory(arr) {
      if (!Array.isArray(arr)) return [];
      return arr.map(id).filter(v => v !== null).slice(0, 500);
    }

    return {
      product, avatar, historyItem, favorites, inventory,
      products:     (arr, max = 500) => list(arr, product, max),
      avatars:      (arr, max = 10)  => list(arr, avatar, max),
      history:      (arr, max = 100) => list(arr, historyItem, max)
    };
  })();

  return {
    escapeHTML, escapeAttr, args, safeText, safeHTML, sanitizeRichHTML,
    sanitizeCode, sanitizeInput, safeImgUrl, safeHttpsUrl, schema
  };
})();

window.Sanitize = Sanitize;
