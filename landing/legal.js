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


  (function () {
    var params = new URLSearchParams(location.search);
    var ret = params.get('return');
    if (ret && /^[a-zA-Z0-9_-]+\.html$/.test(ret)) {
      var backLink = document.querySelector('.back-link');
      if (backLink) backLink.href = '../' + ret;
    }
  })();
