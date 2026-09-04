

'use strict';

const Greeting = (() => {

  const BY_PERIOD = {
    morning: [
      'Bom dia! Pronto pra começar o dia?',
      'Bom dia, café e Nex AI?',
      'Manhã produtiva por aí?',
    ],
    afternoon: [
      'Boa tarde! Como tá indo o dia?',
      'Boa tarde, bora resolver algo?',
      'Tarde por aí, tudo certo?',
    ],
    evening: [
      'Boa noite! No que posso ajudar agora?',
      'Boa noite, sessão de fim de dia?',
      'Noite tranquila? Tô aqui.',
    ],
    night: [
      'Olá, coruja noturna!',
      'Ainda acordado por aí?',
      'Madrugada de ideias?',
    ],
  };

  const BY_WEEKDAY = {
    1: ['Segunda-feira — bora com tudo?'],
    2: ['Terça produtiva, hein?'],
    3: ['Quarta na metade da semana!'],
    4: ['Quinta chegando no fim de semana?'],
    5: ['Sextou! Como posso ajudar?'],
    6: ['Sábado de projetos?'],
    0: ['Domingo de organizar as ideias?'],
  };

  function getPeriod(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 23) return 'evening';
    return 'night';
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function pickPhrase(date = new Date()) {
    const period = getPeriod(date.getHours());
    const weekday = date.getDay();

    const pool = Math.random() < 0.5
      ? BY_PERIOD[period]
      : (BY_WEEKDAY[weekday] || BY_PERIOD[period]);

    return pick(pool);
  }

  function render(targetSelector = '.page-header') {
    const target = document.querySelector(targetSelector);
    if (!target || !target.parentNode) return;

    let el = document.getElementById('greeting-banner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'greeting-banner';
      el.className = 'greeting-banner';
      target.parentNode.insertBefore(el, target);
    }
    el.textContent = pickPhrase();
  }

  document.addEventListener('DOMContentLoaded', () => render());

  return { render, pickPhrase };
})();

window.NexGreeting = Greeting;
