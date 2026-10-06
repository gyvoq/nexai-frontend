  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView();
      }
    });
  });

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const navToggle = document.getElementById('navToggle');
  const navMobilePanel = document.getElementById('navMobilePanel');
  navToggle.addEventListener('click', () => {
    const open = navMobilePanel.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navMobilePanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMobilePanel.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  function faq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  }


(function () {
  var box = document.getElementById('imgLightbox');
  var big = box.querySelector('img');
  var closeBtn = document.getElementById('imgLightboxClose');
  var resetBtn = document.getElementById('zoomReset');
  var lastFocus = null;
  var MIN = 1, MAX = 6;
  var sc = 1, tx = 0, ty = 0;
  var pts = new Map();
  var pinch = null;
  var moved = false;
  var lastTap = 0, lastTapX = 0, lastTapY = 0;

  function clampPan() {
    var mx = big.offsetWidth * (sc - 1) / 2;
    var my = big.offsetHeight * (sc - 1) / 2;
    tx = Math.max(-mx, Math.min(mx, tx));
    ty = Math.max(-my, Math.min(my, ty));
  }

  function apply() {
    if (sc <= MIN) { sc = MIN; tx = 0; ty = 0; }
    clampPan();
    big.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + sc + ')';
    box.classList.toggle('zoomed', sc > MIN);
    resetBtn.textContent = Math.round(sc * 100) + '%';
  }

  function rel(cx, cy) {
    var r = box.getBoundingClientRect();
    return { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2) };
  }

  function zoomAt(ns, cx, cy) {
    ns = Math.max(MIN, Math.min(MAX, ns));
    var p = rel(cx, cy);
    tx = p.x - (p.x - tx) * ns / sc;
    ty = p.y - (p.y - ty) * ns / sc;
    sc = ns;
    apply();
  }

  function zoomCenter(f) {
    var r = box.getBoundingClientRect();
    zoomAt(sc * f, r.left + r.width / 2, r.top + r.height / 2);
  }

  function resetZoom() { sc = 1; tx = 0; ty = 0; apply(); }

  function openBox(img) {
    lastFocus = document.activeElement;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    resetZoom();
    box.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closeBox() {
    box.classList.remove('open', 'zoomed', 'dragging');
    document.body.classList.remove('lightbox-open');
    pts.clear();
    pinch = null;
    big.src = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.recurso-media').forEach(function (media) {
    var img = media.querySelector('img');
    media.addEventListener('click', function () { openBox(img); });
  });

  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  big.addEventListener('pointerdown', function (e) {
    big.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = false;
    if (pts.size === 2) {
      var a = Array.from(pts.values());
      pinch = { d: dist(a[0], a[1]), s: sc };
    }
    box.classList.add('dragging');
  });

  big.addEventListener('pointermove', function (e) {
    var prev = pts.get(e.pointerId);
    if (!prev) return;
    var cur = { x: e.clientX, y: e.clientY };
    if (pts.size === 2 && pinch) {
      pts.set(e.pointerId, cur);
      var a = Array.from(pts.values());
      var d = dist(a[0], a[1]);
      var mx = (a[0].x + a[1].x) / 2;
      var my = (a[0].y + a[1].y) / 2;
      zoomAt(pinch.s * d / pinch.d, mx, my);
      moved = true;
      return;
    }
    var dx = cur.x - prev.x, dy = cur.y - prev.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) moved = true;
    pts.set(e.pointerId, cur);
    if (sc > MIN) { tx += dx; ty += dy; apply(); }
  });

  function endPointer(e) {
    if (!pts.has(e.pointerId)) return;
    var wasSingle = pts.size === 1;
    pts.delete(e.pointerId);
    if (pts.size < 2) pinch = null;
    if (pts.size === 0) box.classList.remove('dragging');
    if (e.type === 'pointerup' && wasSingle && !moved) {
      var now = Date.now();
      var near = Math.hypot(e.clientX - lastTapX, e.clientY - lastTapY) < 30;
      if (now - lastTap < 320 && near) {
        if (sc > MIN) resetZoom(); else zoomAt(2.5, e.clientX, e.clientY);
        lastTap = 0;
      } else {
        lastTap = now; lastTapX = e.clientX; lastTapY = e.clientY;
      }
    }
  }
  big.addEventListener('pointerup', endPointer);
  big.addEventListener('pointercancel', endPointer);

  box.addEventListener('wheel', function (e) {
    e.preventDefault();
    zoomAt(sc * Math.exp(-e.deltaY * 0.0018), e.clientX, e.clientY);
  }, { passive: false });

  box.addEventListener('click', function (e) {
    if (e.target === box) closeBox();
  });

  document.getElementById('zoomIn').addEventListener('click', function (e) { e.stopPropagation(); zoomCenter(1.5); });
  document.getElementById('zoomOut').addEventListener('click', function (e) { e.stopPropagation(); zoomCenter(1 / 1.5); });
  resetBtn.addEventListener('click', function (e) { e.stopPropagation(); resetZoom(); });
  closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeBox(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') closeBox();
    else if (e.key === '+' || e.key === '=') zoomCenter(1.5);
    else if (e.key === '-') zoomCenter(1 / 1.5);
    else if (e.key === '0') resetZoom();
  });

  window.addEventListener('resize', apply);

  var track = document.getElementById('galeriaTrack');
  if (track) {
    Array.from(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelector('img').alt = '';
      track.appendChild(clone);
    });
  }
})();

document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.faq-trigger');
  if (b) faq(b);
});
