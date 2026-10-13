/*
 * i18n.js — Detecta o idioma do navegador e traduz o site para inglês.
 *
 * - Se o PRIMEIRO idioma do navegador (navigator.languages[0]) começar com "en",
 *   o site inteiro é traduzido para inglês. Qualquer outro idioma = português (original).
 * - Para testar: abra qualquer página com ?lang=en ou ?lang=pt (a escolha fica salva
 *   no navegador). Para voltar ao automático, rode no console: I18N.setLang(null)
 * - O dicionário de inglês fica em js/i18n.en.js e só é baixado por quem vai ver inglês.
 * - Funciona sem mexer no HTML original: troca textos, placeholder, title, aria-label,
 *   alt e meta tags, e também traduz tudo que o JS do app injeta depois (MutationObserver).
 * - No JS do app, use I18N.t("texto em pt") para traduzir uma string manualmente.
 */
(function () {
  'use strict';

  var STORE_KEY = 'viralyze-lang';
  var script = document.currentScript;

  function detectLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q) {
        q = q.toLowerCase().slice(0, 2);
        if (q === 'en' || q === 'pt') {
          try { localStorage.setItem(STORE_KEY, q); } catch (e) {}
          return q;
        }
      }
    } catch (e) {}
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'en' || saved === 'pt') return saved;
    } catch (e) {}
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    return String(langs[0] || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'pt';
  }

  var lang = detectLang();
  var api = window.I18N = {
    lang: lang,
    locale: lang === 'en' ? 'en-US' : 'pt-BR',
    t: function (s) { return s; },
    setLang: function (l) {
      try {
        if (l === 'en' || l === 'pt') localStorage.setItem(STORE_KEY, l);
        else localStorage.removeItem(STORE_KEY);
      } catch (e) {}
      location.reload();
    }
  };

  if (lang !== 'en') return; // português: não faz nada

  /* ---------- inglês ---------- */
  var root = document.documentElement;
  root.setAttribute('lang', 'en');
  root.style.visibility = 'hidden'; // evita "piscar" em português enquanto carrega o dicionário
  var revealed = false;
  function reveal() { if (revealed) return; revealed = true; root.style.visibility = ''; }
  setTimeout(reveal, 3000); // segurança: se o dicionário falhar, mostra o site em português

  // Datas/horas: o app usa 'pt-BR' fixo; no modo inglês formata como en-US
  ['toLocaleString', 'toLocaleDateString', 'toLocaleTimeString'].forEach(function (n) {
    var orig = Date.prototype[n];
    Date.prototype[n] = function (loc) {
      if (typeof loc === 'string' && /^pt\b/i.test(loc)) arguments[0] = 'en-US';
      return orig.apply(this, arguments);
    };
  });

  var D = null; // dicionário exato { "português": "english" }
  var has = Object.prototype.hasOwnProperty;

  function T(x) { var r = lookup(x); return r === null ? x : r; }
  function plural(n, one, many) { return Number(n) === 1 ? one : many; }

  // Frases com números/nomes dentro (geradas pelo JS com ${...})
  var P = [
    [/^Backup importado\. (\d+) item\(ns\) inválido\(s\) foram ignorados\.$/, function (m) { return 'Backup imported. ' + m[1] + ' invalid item(s) were ignored.'; }],
    [/^Backup importado em (.+?)(?: \((\d+) item\(ns\) ignorado\(s\)\))?\.$/, function (m) { return 'Backup imported on ' + m[1] + (m[2] ? ' (' + m[2] + ' item(s) ignored)' : '') + '.'; }],
    [/^"(.+)" adicionado com sucesso!$/, function (m) { return '"' + T(m[1]) + '" added successfully!'; }],
    [/^"(.+)" adicionado ao inventário!$/, function (m) { return '"' + T(m[1]) + '" added to inventory!'; }],
    [/^Influencer "(.+)" salvo com sucesso!$/, function (m) { return 'Influencer "' + m[1] + '" saved successfully!'; }],
    [/^↑ (\d+) novos esta semana$/, function (m) { return '↑ ' + m[1] + ' new this week'; }],
    [/^(.+) lidera$/, function (m) { return T(m[1]) + ' leads'; }],
    [/^↑ (.+) views líder$/, function (m) { return '↑ ' + m[1] + ' top views'; }],
    [/^Mostrar mais (\d+) produtos\. (\d+) restantes de (\d+)\.$/, function (m) { return 'Show ' + m[1] + ' more products. ' + m[2] + ' remaining of ' + m[3] + '.'; }],
    [/^Mostrar menos produtos, voltar para (\d+)$/, function (m) { return 'Show fewer products, go back to ' + m[1]; }],
    [/^(\d+|—) anos?$/, function (m) { return m[1] + ' years old'; }],
    [/^Excluir o avatar "(.+)"\?$/, function (m) { return 'Delete the avatar "' + m[1] + '"?'; }],
    [/^Apagar o chat "(.+)"\? Todas as mensagens deste projeto serão removidas e não dá para desfazer\.$/, function (m) { return 'Delete the chat "' + m[1] + '"? All messages in this project will be removed and this can\'t be undone.'; }],
    [/^Apagar chat (.+)$/, function (m) { return 'Delete chat ' + m[1]; }],
    [/^Limite de (\d+) influencers atingido\. Exclua um para criar outro\.$/, function (m) { return 'Limit of ' + m[1] + ' influencers reached. Delete one to create another.'; }],
    [/^Digite o que você quer \(até (\d+) caracteres\)$/, function (m) { return 'Type what you want (up to ' + m[1] + ' characters)'; }],
    [/^Você pode adicionar até (\d+) opções em "Outro"\.$/, function (m) { return 'You can add up to ' + m[1] + ' options in "Other".'; }],
    [/^Outro: (.+)$/, function (m) { return 'Other: ' + T(m[1]); }],
    [/^(\d+) palavras?$/, function (m) { return m[1] + ' ' + plural(m[1], 'word', 'words'); }],
    [/^Ativo até (.+)$/, function (m) { return 'Active until ' + m[1]; }],
    [/^Licença válida até (.+)$/, function (m) { return 'License valid until ' + m[1]; }],
    [/^Expira em (\d+)h · (.+)$/, function (m) { return 'Expires in ' + m[1] + 'h · ' + m[2]; }],
    [/^Expira em (\d+) dias · (.+)$/, function (m) { return 'Expires in ' + m[1] + ' days · ' + m[2]; }],
    [/^Sua licença expira em (\d+)(h| dias) · (.+)\. Renove para não perder o acesso\.$/, function (m) { return 'Your license expires in ' + m[1] + (m[2] === 'h' ? 'h' : ' days') + ' · ' + m[3] + '. Renew to keep your access.'; }],
    [/^(Hoje|Ontem)(, .+)$/, function (m) { return T(m[1]) + m[2]; }],
    [/^(\d+) (mensagem|mensagens) · (.+)$/, function (m) { return m[1] + ' ' + plural(m[1], 'message', 'messages') + ' · ' + T(m[3]); }],
    [/^Este projeto chegou ao limite de (\d+) mensagens\. Crie um novo projeto para continuar\.$/, function (m) { return 'This project has reached the limit of ' + m[1] + ' messages. Create a new project to continue.'; }],
    [/^Dígito (\d+) de 5$/, function (m) { return 'Digit ' + m[1] + ' of 5'; }],
    [/^Aguarde (\d+)s antes de tentar novamente\.$/, function (m) { return 'Wait ' + m[1] + 's before trying again.'; }],
    [/^Você atingiu o limite de extrações por agora\. Tente novamente em (.+)\.$/, function (m) { return 'You\'ve reached the extraction limit for now. Try again in ' + m[1].replace(/ min$/, ' min') + '.'; }],
    [/^Limite de extrações atingido\. Libera em (.+)$/, function (m) { return 'Extraction limit reached. Resets in ' + m[1]; }],
    [/^Restam só (\d+)(?: de (\d+))? (?:extração|extrações)(?: · renova em (.+))?$/, function (m) { return 'Only ' + m[1] + (m[2] ? ' of ' + m[2] : '') + ' ' + plural(m[1], 'extraction', 'extractions') + ' left' + (m[3] ? ' · resets in ' + m[3] : ''); }],
    [/^Extrações: (\d+)(?: de (\d+))? disponíveis(?: · renova em (.+))?$/, function (m) { return 'Extractions: ' + m[1] + (m[2] ? ' of ' + m[2] : '') + ' available' + (m[3] ? ' · resets in ' + m[3] : ''); }],
    [/^Vídeo: (.+?)(?: · Estilo: (.+))?$/, function (m) { return 'Video: ' + m[1] + (m[2] ? ' · Style: ' + m[2] : ''); }],
    [/^Capa do vídeo: (.+)$/, function (m) { return 'Video cover: ' + T(m[1]); }],
    [/^(\d+) vídeos? em alta encontrados?$/, function (m) { return m[1] + ' trending ' + plural(m[1], 'video', 'videos') + ' found'; }],
    [/^(\d+) vídeos? analisados?$/, function (m) { return m[1] + ' ' + plural(m[1], 'video', 'videos') + ' analyzed'; }],
    [/^versão (\d+)$/, function (m) { return 'version ' + m[1]; }],
    [/^Qual (.+) você quer\? \(máximo (\d+) caracteres\)$/, function (m) { return 'Which ' + T(m[1]) + ' do you want? (max ' + m[2] + ' characters)'; }],
    [/^Até (\d+) caracteres$/, function (m) { return 'Up to ' + m[1] + ' characters'; }],
    [/^(\d+) prévias grátis$/, function (m) { return m[1] + ' free previews'; }]
  ];

  function lookup(k) {
    if (has.call(D, k)) return D[k];
    for (var i = 0; i < P.length; i++) {
      var m = P[i][0].exec(k);
      if (m) return P[i][1](m);
    }
    if (k.indexOf(' · ') > -1) { // "Feminino · 28 anos · Latina/Latino": traduz cada pedaço
      var changed = false;
      var parts = k.split(' · ').map(function (p) {
        var r = lookup(p);
        if (r !== null) { changed = true; return r; }
        return p;
      });
      if (changed) return parts.join(' · ');
    }
    return null;
  }

  // ctx (opcional) = nome da tag pai; permite traduzir a mesma frase de jeitos
  // diferentes conforme o contexto, usando chaves "em::Texto" no dicionário.
  function tr(s, ctx) {
    if (typeof s !== 'string' || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (!m[2]) return s;
    var k = m[2].replace(/\s+/g, ' ');
    var out = (ctx && has.call(D, ctx + '::' + k)) ? D[ctx + '::' + k] : lookup(k);
    return out === null ? s : m[1] + out + m[3];
  }
  api.t = function (s) { return D ? tr(s) : s; };

  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, SVG: 0 };

  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (el.hasAttribute(a)) {
        var v = el.getAttribute(a), t = tr(v);
        if (t !== v) el.setAttribute(a, t);
      }
    }
    if (el.nodeName === 'META') {
      var c = el.getAttribute('content');
      if (c) {
        var n = (el.getAttribute('name') || '') + ' ' + (el.getAttribute('property') || '');
        if (/description|og:title|og:description|og:image:alt|twitter:title|twitter:description/.test(n)) {
          var tc = tr(c); if (tc !== c) el.setAttribute('content', tc);
        } else if (/og:locale/.test(n) && c === 'pt_BR') {
          el.setAttribute('content', 'en_US');
        }
      }
    } else if (el.nodeName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type)) {
      var iv = el.value, it = tr(iv); if (it !== iv) el.value = it;
    }
  }

  function doText(node) {
    var p = node.parentNode;
    if (p && SKIP[p.nodeName]) return;
    var v = node.nodeValue, t = tr(v, p ? p.nodeName.toLowerCase() : '');
    if (t !== v) node.nodeValue = t;
  }

  function walk(n) {
    var type = n.nodeType;
    if (type === 3) { doText(n); return; }
    if (type !== 1 && type !== 9 && type !== 11) return;
    if (type === 1) {
      if (n.hasAttribute('data-no-i18n')) return; // coloque data-no-i18n num elemento para NÃO traduzi-lo
      doAttrs(n);
      if (SKIP[n.nodeName]) return;
    }
    for (var c = n.firstChild; c; c = c.nextSibling) walk(c);
  }

  function inNoI18n(node) {
    var e = node.nodeType === 1 ? node : node.parentNode;
    return !!(e && e.closest && e.closest('[data-no-i18n]'));
  }

  function start() {
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var a = m.addedNodes[j];
            if (!inNoI18n(a)) walk(a);
          }
        } else if (m.type === 'characterData') {
          if (!inNoI18n(m.target)) doText(m.target);
        } else if (m.type === 'attributes') {
          if (!inNoI18n(m.target)) doAttrs(m.target);
        }
      }
    });
    walk(document);
    mo.observe(document, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS.concat(['content'])
    });
    document.addEventListener('DOMContentLoaded', function () { walk(document); reveal(); });
    if (document.readyState !== 'loading') reveal();
    // reveal imediato: o observer já traduz o que o parser ainda vai inserir
    reveal();
  }

  function onDict() {
    D = window.__I18N_EN__ || null;
    if (D) start();
    else reveal();
  }

  var base = script && script.src ? script.src.replace(/[^\/]*(\?.*)?$/, '') : 'js/';
  var s = document.createElement('script');
  s.src = base + 'i18n.en.js?v=1';
  s.onload = onDict;
  s.onerror = reveal;
  (document.head || root).appendChild(s);
})();
