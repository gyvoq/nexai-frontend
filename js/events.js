
(function () {
  'use strict';

  const ALLOWED = new Set([
    'addToInventory',
    'applyPreset',
    'clearAvatarSelection',
    'closeAddModal',
    'closeHistory',
    'closeLinkImport',
    'confirmLinkImport',
    'copyHistItem',
    'copyViralizeOutput',
    'deleteCustomAvatar',
    'deleteHistItem',
    'fetchProductFromLink',
    'fsBackToProjects',
    'fsCreateProject',
    'fsOpenProject',
    'fsRunExtract',
    'generateAvatarPromptAI',
    'generateBackup',
    'goInfStep',
    'goSearchResult',
    'hideSelf',
    'importBackup',
    'infNextStep',
    'infPhotoFailed',
    'infPhotoLoaded',
    'infPrevStep',
    'onAgeInput',
    'openBackupPicker',
    'openExternal',
    'openLinkImport',
    'openSearch',
    'saveGeneratedAvatar',
    'saveNewProduct',
    'selectBg',
    'selectCamera',
    'selectInfOption',
    'selectMode',
    'selectRoteiroType',
    'selectStudioAvatar',
    'selectStudioProduct',
    'selectStyle',
    'selectTom',
    'selectVidAvatar',
    'selectVidProduct',
    'switchTab',
    'toggleAccordion',
    'toggleChip',
    'toggleFavBtn',
    'toggleImprovement',
    'toggleNicheFilter',
    'toggleVidImprovement',
    'updateCharCounter',
    'updateInfSummary',
    'useAvatar',
    'useCustomAvatar'
  ]);

  window.hideSelf = function (el) {
    if (el && el.style) el.style.display = 'none';
  };

  window.infPhotoLoaded = function (el) {
    if (!el) return;
    el.classList.add('loaded');
    const card = el.closest('.inf-photo-card');
    if (card) card.classList.remove('loading');
  };

  window.infPhotoFailed = function (el) {
    const card = el && el.closest('.inf-photo-card');
    if (card) card.classList.remove('loading');
  };

  window.openBackupPicker = function () {
    const input = document.getElementById('backup-file-input');
    if (input) input.click();
  };

  window.onAgeInput = function (el) {
    const out = document.getElementById('av-idade-display');
    if (out && el) out.textContent = el.value;
    if (typeof window.updateInfSummary === 'function') window.updateInfSummary();
  };

  window.openExternal = function (url) {
    const safe = window.Sanitize ? Sanitize.safeHttpsUrl(url) : '';
    if (safe) window.open(safe, '_blank', 'noopener,noreferrer');
  };

  function run(el, name, event) {
    if (!name || !ALLOWED.has(name)) return;
    const fn = window[name];
    if (typeof fn !== 'function') return;

    let args = [];
    const raw = el.getAttribute('data-args');
    if (raw) {
      try { args = JSON.parse(raw); } catch (e) { return; }
      if (!Array.isArray(args)) return;
    }
    args = args.map(a => (a === '$el' ? el : a === '$ev' ? event : a));

    try {
      fn.apply(window, args);
    } catch (err) {
      console.error('[events] erro em ' + name + ':', err);
    }
  }

  function closestWith(target, attr) {
    return target && target.closest ? target.closest('[' + attr + ']') : null;
  }

  function bubble(e, attr) {
    const chain = [];
    let el = closestWith(e.target, attr);
    while (el) {
      chain.push(el);
      el = el.parentElement ? closestWith(el.parentElement, attr) : null;
    }
    for (const node of chain) {
      if (attr === 'data-click' && node.hasAttribute('data-stop')) e.stopPropagation();
      run(node, node.getAttribute(attr), e);
      if (e.cancelBubble) break;
    }
  }

  document.addEventListener('click', function (e) { bubble(e, 'data-click'); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') bubble(e, 'data-enter');
  });

  document.addEventListener('input', function (e) {
    const el = closestWith(e.target, 'data-input');
    if (el) run(el, el.getAttribute('data-input'), e);
  });

  document.addEventListener('change', function (e) {
    const el = closestWith(e.target, 'data-change');
    if (el) run(el, el.getAttribute('data-change'), e);
  });

  document.addEventListener('load', function (e) {
    const el = e.target;
    if (el && el.getAttribute && el.hasAttribute('data-load')) run(el, el.getAttribute('data-load'), e);
  }, true);

  document.addEventListener('error', function (e) {
    const el = e.target;
    if (el && el.getAttribute && el.hasAttribute('data-error')) run(el, el.getAttribute('data-error'), e);
  }, true);

  function sweepImages() {
    document.querySelectorAll('img[data-load], img[data-error]').forEach(function (img) {
      if (!img.complete || img.dataset.evDone) return;
      img.dataset.evDone = '1';
      if (img.naturalWidth > 0) {
        if (img.hasAttribute('data-load')) run(img, img.getAttribute('data-load'), new Event('load'));
      } else if (img.hasAttribute('data-error')) {
        run(img, img.getAttribute('data-error'), new Event('error'));
      }
    });
  }
  document.addEventListener('DOMContentLoaded', sweepImages);
  window.addEventListener('load', sweepImages);
})();
