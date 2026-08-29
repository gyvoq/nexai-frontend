'use strict';

const VoiceOnboarding = (() => {
  const AUDIO_DIR = 'assets/audio/';
  const LS_DONE = 'nex_onboarding_done';
  const LS_PLAYED = 'nex_onboarding_played';
  const SS_TIPS = 'nex_onboarding_tips';

  const IDLE_MS = 5500;

  const TRACKS = {
    1: {
      file: 'voz 1.mp3',
      label: 'Boas-vindas',
      text: 'Oi! Eu sou a Nex, sua assistente aqui dentro do estúdio. Vou te mostrar em poucos minutos como encontrar produtos que estão bombando, montar o avatar que vai apresentar eles e gerar imagem e vídeo prontos pra publicar. Pode ir clicando junto comigo, eu acompanho.',
    },
    2: {
      file: 'voz 2.mp3',
      label: 'Mineração Viral',
      text: 'Essa é a Mineração Viral. Aqui ficam os produtos em alta no momento, atualizados em tempo real. Cada card mostra o quanto o produto está crescendo e o potencial dele de viralizar. Quando achar um que combina com você, é só adicionar e ele fica disponível no estúdio de criação.',
    },
    3: {
      file: 'voz 3.mp3',
      label: 'Biblioteca Viral',
      text: 'Essa é a Biblioteca Viral. São os formatos de vídeo que mais performam hoje: unboxing, antes e depois, review honesto, tutorial rápido. Use como ponto de partida pro seu roteiro em vez de começar do zero. Escolha o formato que faz sentido pro seu produto e siga a estrutura.',
    },
    4: {
      file: 'voz 4.mp3',
      label: 'Estúdio de Imagem',
      text: 'Bem-vindo ao estúdio de imagem. São cinco etapas rápidas.',
    },
    5: {
      file: 'voz 5.mp3',
      label: 'Etapa 1 — Produto',
      text: 'Primeiro escolha o produto que vai aparecer na foto. Pode ser um da mineração ou um seu.',
    },
    6: {
      file: 'voz 6.mp3',
      label: 'Etapa 2 — Avatar',
      text: 'Agora o avatar: a pessoa que vai apresentar o produto. Escolha um dos prontos ou crie o seu, definindo idade, nicho e estilo. Quanto mais específico, melhor o resultado.',
    },
    7: {
      file: 'voz 7.mp3',
      label: 'Etapa 3 — Câmera e estilo',
      text: 'Aqui você define o enquadramento e o clima da foto. Câmera mais fechada valoriza detalhe do produto; o estilo define o acabamento visual.',
    },
    8: {
      file: 'voz 8.mp3',
      label: 'Etapa 4 — Fundo',
      text: 'Escolha o fundo da cena, ou descreva o seu próprio no campo livre.',
    },
    9: {
      file: 'voz 9.mp3',
      label: 'Etapa 5 — Gerar',
      text: 'Última etapa. Confira o resumo das suas escolhas e clique em gerar. A IA monta o prompt completo, com prompt negativo e hashtags, pronto pra colar na ferramenta de imagem que você usa.',
    },
    10: {
      file: 'voz 10.mp3',
      label: 'Imagem pronta',
      text: 'Pronto! Seu prompt de imagem está gerado. Pode copiar e usar.',
    },
    11: {
      file: 'voz 11.mp3',
      label: 'Estúdio de Vídeo',
      text: 'O estúdio de vídeo segue a mesma lógica do de imagem, com uma diferença: aqui entra o roteiro. Você define o gancho dos primeiros três segundos, a revelação do produto e a chamada final. Esses três pedaços são o que decide se o vídeo segura a pessoa até o fim, então vale caprichar neles.',
    },
    12: {
      file: 'voz 12.mp3',
      label: 'Tour concluído',
      text: 'É isso! Você já viu o caminho completo: encontrar o produto, montar o avatar, ajustar a cena e gerar o material. Tudo que você criar fica salvo no histórico, então dá pra voltar e reaproveitar depois. Se quiser rever qualquer parte, é só clicar no meu botão lá no topo. Bom trabalho!',
    },
    13: {
      file: 'voz 13.mp3',
      label: 'Dica — nome do produto',
      text: 'Uma dica: use o nome real do produto, do jeito que aparece na embalagem. Ajuda a IA a acertar o formato.',
    },
    14: {
      file: 'voz 14.mp3',
      label: 'Dica — prompt visual',
      text: 'No prompt visual, descreva o que se vê: formato, cor, material, tamanho. Em inglês funciona melhor. Nada de adjetivo de venda aqui.',
    },
    15: {
      file: 'voz 15.mp3',
      label: 'Dica — descrição do avatar',
      text: 'Descreva o avatar como você descreveria uma pessoa real: traços, cabelo, tom de voz, jeito de falar.',
    },
    16: {
      file: 'voz 16.mp3',
      label: 'Dica — gerar com IA',
      text: 'O botão de gerar já está liberado. Se quiser mudar algo, dá pra voltar em qualquer etapa pelo topo, sem perder o que já preencheu.',
    },
    17: {
      file: 'voz 17.mp3',
      label: 'Configurações',
      text: 'Nas configurações você ajusta tema, cópia automática e faz backup dos seus dados.',
    },
  };

  const MAIN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const TIPS = [13, 14, 15, 16, 17];

  const IDLE_FIELDS = {
    'np-nome': 13,
    'np-prompt': 14,
    'av-desc': 15,
  };

  let audio = null;
  let root = null;
  let panel = null;
  let elLabel = null,
    elState = null,
    elCount = null;
  let btnPlay = null,
    btnSkip = null,
    btnStart = null;
  let trigger = null;

  let currentId = null;
  let queue = [];
  let active = false;
  let generated = false;
  const idleTimers = {};

  function readSet(storage, key) {
    try {
      const raw = storage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }

  function writeSet(storage, key, set) {
    try {
      storage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {}
  }

  let played = readSet(localStorage, LS_PLAYED);
  let tipsDone = readSet(sessionStorage, SS_TIPS);

  function isDone() {
    try {
      return localStorage.getItem(LS_DONE) === 'true';
    } catch (e) {
      return false;
    }
  }

  function markDone() {
    try {
      localStorage.setItem(LS_DONE, 'true');
    } catch (e) {}
    if (trigger) trigger.classList.remove('has-new');
  }

  const ICONS = {
    voice:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="12" x2="3" y2="12"/><line x1="7" y1="8" x2="7" y2="16"/><line x1="11" y1="4" x2="11" y2="20"/><line x1="15" y1="7" x2="15" y2="17"/><line x1="19" y1="10" x2="19" y2="14"/></svg>',
    play: '<svg class="vo-icon-play" viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/></svg>',
    pause:
      '<svg class="vo-icon-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/></svg>',
    skip: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };

  const WaveOrb = (() => {
    const VERTEX_SHADER = 'attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';

    const FRAGMENT_SHADER =
      'precision highp float;\n' +
      'uniform vec2 iResolution; uniform float iTime; uniform float iAmp;\n' +
      'const float PI = 3.14159265359;\n' +
      'const float AMPLITUDE   = 0.32;\n' +
      'const float FREQ        = 1.1;\n' +
      'const float ABER_FREQ   = 1.0;\n' +
      'const float SPEED       = 2.4;\n' +
      'const float WAVE_SCALE  = 0.6;\n' +
      'const float ABERRATION  = 2.6;\n' +
      'const float THICKNESS   = 3.0;\n' +
      'const float INTENSITY   = 2.;\n' +
      'const float FALLOFF     = 1.7;\n' +
      'const float EDGE_MASK   = 0.4;\n' +
      'const float EDGE_INSET  = 0.0;\n' +
      'const float BAND_FILL   = 30000.0;\n' +
      'const float BAND_THICK  = 0.08;\n' +
      'const float SOFTNESS    = 2.5;\n' +
      'const float LOW_AMP     = 6.0;\n' +
      'const float LOW_INT     = 1.5;\n' +
      'const float MID_ABER    = 0.8;\n' +
      'const float MID_ABAMP   = 0.05;\n' +
      'const float MID_SOFT    = 0.4;\n' +
      'const float HIGH_ABER   = 0.5;\n' +
      'const float HIGH_ABAMP  = 0.06;\n' +
      'const float RESOLVED    = 1.0;\n' +
      'const float UNRES_SCALE = 0.14;\n' +
      'vec3 rose4(int s){\n' +
      '    if(s == 0) return vec3(1.00, 0.01, 0.09);\n' +
      '    if(s == 1) return vec3(1.00, 0.09, 0.22);\n' +
      '    if(s == 2) return vec3(1.00, 0.22, 0.42);\n' +
      '    return vec3(1.00, 0.40, 0.62);\n' +
      '}\n' +
      'void mainImage(out vec4 fragColor, in vec2 fragCoord){\n' +
      '    vec2 R = iResolution.xy;\n' +
      '    float aspect = R.x / R.y;\n' +
      '    vec2 p = (fragCoord + 0.5) * 2.0 / R - 1.0;\n' +
      '    p.x *= aspect;\n' +
      '    float yScreen = p.y;\n' +
      '    p /= max(WAVE_SCALE, 0.1);\n' +
      '    float t   = iTime;\n' +
      '    float low  = clamp(0.45 + 0.45*sin(t*0.8)*sin(t*0.37+1.0), 0.0, 1.0);\n' +
      '    float mid  = clamp(0.40 + 0.40*sin(t*1.7+2.0)*sin(t*0.53), 0.0, 1.0);\n' +
      '    float high = clamp(0.30 + 0.30*sin(t*2.9+4.0)*sin(t*0.71+2.0), 0.0, 1.0);\n' +
      '    float res   = clamp(RESOLVED, 0.0, 1.0);\n' +
      '    float drift = mod(t, 20.0*PI) * SPEED;\n' +
      '    float xN  = p.x / max(aspect, 1.0);\n' +
      '    float env = cos(PI*0.5 * min(abs(0.9*xN), 1.0));\n' +
      '    env *= env;\n' +
      '    float amp   = clamp(iAmp, 0.0, 1.0);\n' +
      '    float A1    = (AMPLITUDE + 0.01*low*LOW_AMP) * amp;\n' +
      '    float A2    = A1 + (mid*MID_ABAMP + high*HIGH_ABAMP) * amp;\n' +
      '    float AB    = (ABERRATION + mid*MID_ABER + high*HIGH_ABER)*res;\n' +
      '    float th    = mix(0.1, 0.01*THICKNESS, res);\n' +
      '    float inten = mix(0.1, 0.01*(INTENSITY + low*LOW_INT), res);\n' +
      '    float soft  = 0.01*res*max(0.0, SOFTNESS + mid*MID_SOFT);\n' +
      '    float dUnres = max(length(p) - mix(0.14, UNRES_SCALE, res), 0.0);\n' +
      '    float yMain = A1 * env * res * sin(p.x*FREQ + drift);\n' +
      '    float bandFillTh = max(BAND_THICK, 1e-4);\n' +
      '    float bandAmt    = 1e-4 * BAND_FILL * inten;\n' +
      '    vec3 num = vec3(0.0), den = vec3(0.0);\n' +
      '    for(int s = 0; s < 4; s++){\n' +
      '        vec3 hue = mix(vec3(1.0), rose4(s), res);\n' +
      '        den += hue;\n' +
      '        float ab = mix(-AB, AB, float(s)/3.0);\n' +
      '        float yL = A2 * env * res * sin(p.x*ABER_FREQ + drift + ab);\n' +
      '        float d   = mix(dUnres, abs(p.y - yL), res);\n' +
      '        float lor = mix(1.0/(1.0 + (0.02*d)*(0.02*d)), 1.0, res);\n' +
      '        float line = inten / (sqrt(d*d + soft*soft) + th);\n' +
      '        float lo = min(yMain, yL), hi = max(yMain, yL);\n' +
      '        float dBand = max(0.0, max(p.y - hi, lo - p.y));\n' +
      '        float band  = bandAmt / (dBand + bandFillTh);\n' +
      '        num += hue * lor * (line + band);\n' +
      '    }\n' +
      '    vec3 col = num / den;\n' +
      '    float dM    = mix(dUnres, abs(p.y - yMain), res);\n' +
      '    float lorM  = mix(1.0/(1.0 + (0.02*dM)*(0.02*dM)), 1.0, res);\n' +
      '    float boost = (1.0 - res) * (14.0*low + 4.0);\n' +
      '    col += 0.5 * inten * (lorM + boost) / (sqrt(dM*dM + soft*soft) + th);\n' +
      '    col = pow(max(col, 0.0), vec3(1.5));\n' +
      '    float lum = max(max(col.r, col.g), col.b);\n' +
      '    vec3 tint = mix(vec3(1.00, 0.04, 0.16), vec3(1.00, 0.52, 0.66),\n' +
      '                    smoothstep(0.35, 1.60, lum));\n' +
      '    col *= tint * 1.25;\n' +
      '    float emT = clamp((abs(yScreen) - 1.0 + EDGE_INSET) / (-max(EDGE_MASK, 1e-4)), 0.0, 1.0);\n' +
      '    float em  = emT*emT*(3.0 - 2.0*emT);\n' +
      '    float gauss = exp(-pow(xN*FALLOFF, 2.0));\n' +
      '    col *= mix(1.0, em*gauss, res);\n' +
      '    col *= res;\n' +
      '    col = max(col, vec3(0.0588, 0.0588, 0.0745));\n' +
      '    fragColor = vec4(col, 1.0);\n' +
      '}\n' +
      'void main(){ mainImage(gl_FragColor, gl_FragCoord.xy); }';

    let canvas = null,
      gl = null,
      program = null;
    let uResolution = null,
      uTime = null,
      uAmp = null;
    let rafId = 0,
      running = false,
      ready = false;
    // Amplitude da onda: 1 = falando, 0 = flatline.
    // `amp` persegue `ampTarget` suavemente, então a onda não corta seco.
    let amp = 0,
      ampTarget = 0,
      lastFrameT = 0,
      sleeping = false;
    const RISE_TAU = 0.16; // segundos para "subir" a onda
    const FALL_TAU = 0.34; // um pouco mais lento para assentar na linha
    let w = 0,
      h = 0;
    const RENDER_SCALE = 0.85;
    const startTime = performance.now();

    function compile(type, src) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function init(canvasEl) {
      canvas = canvasEl;
      gl = canvas.getContext('webgl', { antialias: false, alpha: true });
      if (!gl) return false;

      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      uResolution = gl.getUniformLocation(program, 'iResolution');
      uTime = gl.getUniformLocation(program, 'iTime');
      uAmp = gl.getUniformLocation(program, 'iAmp');
      gl.clearColor(0, 0, 0, 0);

      ready = true;
      resize();
      return true;
    }

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth || 1;
      const ch = canvas.clientHeight || 1;
      w = Math.max(1, Math.round(cw * dpr * RENDER_SCALE));
      h = Math.max(1, Math.round(ch * dpr * RENDER_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    }

    function frame(now) {
      if (!running) return;

      // Interpolação por tempo (não por frame), para ficar igual em 60 e 120Hz
      const t = typeof now === 'number' ? now : performance.now();
      const dt = Math.min(Math.max((t - lastFrameT) / 1000, 0), 0.1);
      lastFrameT = t;

      const tau = ampTarget > amp ? RISE_TAU : FALL_TAU;
      amp += (ampTarget - amp) * (1 - Math.exp(-dt / tau));
      if (Math.abs(ampTarget - amp) < 0.001) amp = ampTarget;

      gl.uniform2f(uResolution, w, h);
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
      gl.uniform1f(uAmp, amp);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Flatline estável: a imagem não muda mais, então paramos de desenhar
      // (economiza GPU/bateria). Volta a rodar assim que a voz falar de novo.
      if (amp === 0 && ampTarget === 0) {
        sleeping = true;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(frame);
    }

    /** Define o alvo da amplitude: 1 = falando, 0 = flatline */
    function setAmplitude(v) {
      ampTarget = Math.min(1, Math.max(0, v));
      if (running && sleeping && ampTarget !== amp) {
        sleeping = false;
        lastFrameT = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }

    function start() {
      if (!ready || running) return;
      running = true;
      sleeping = false;
      resize();
      lastFrameT = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      sleeping = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    return { init, start, stop, resize, setAmplitude };
  })();

  function mountPanel() {
    root = document.getElementById('voice-orb-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'voice-orb-root';
      document.body.appendChild(root);
    }

    panel = document.createElement('section');
    panel.className = 'vo-panel idle';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Tour guiado por voz');
    panel.innerHTML =
      '<button type="button" class="vo-close" id="vo-close" aria-label="Fechar tour">' +
      ICONS.close +
      '</button>' +
      '<div class="vo-orb" aria-hidden="true">' +
      '<canvas class="vo-orb-canvas"></canvas>' +
      '</div>' +
      '<div class="vo-head">' +
      '<div>' +
      '<div class="vo-title" id="vo-label">Tour guiado</div>' +
      '<div class="vo-state" id="vo-state">Pronta quando você estiver</div>' +
      '</div>' +
      '</div>' +
      '<div class="vo-controls">' +
      '<button type="button" class="vo-btn primary" id="vo-start">Iniciar tour</button>' +
      '<button type="button" class="vo-btn vo-btn-icon" id="vo-play" aria-label="Pausar ou continuar">' +
      ICONS.play +
      ICONS.pause +
      '</button>' +
      '<button type="button" class="vo-btn" id="vo-skip" aria-label="Próximo trecho">' +
      ICONS.skip +
      'Pular</button>' +
      '<span class="vo-count" id="vo-count"></span>' +
      '</div>';

    root.appendChild(panel);

    WaveOrb.init(panel.querySelector('.vo-orb-canvas'));

    elLabel = panel.querySelector('#vo-label');
    elState = panel.querySelector('#vo-state');
    elCount = panel.querySelector('#vo-count');
    btnPlay = panel.querySelector('#vo-play');
    btnSkip = panel.querySelector('#vo-skip');
    btnStart = panel.querySelector('#vo-start');

    btnStart.addEventListener('click', start);
    btnPlay.addEventListener('click', toggle);
    btnSkip.addEventListener('click', skip);
    panel.querySelector('#vo-close').addEventListener('click', close);

    idleUI();
  }

  function mountTrigger() {
    trigger = document.getElementById('voice-onboarding-btn');

    if (!trigger) {
      const settings = document.getElementById('settings-btn');
      if (!settings || !settings.parentNode) return;

      const anchor = document.createElement('div');
      anchor.className = 'vo-anchor';
      settings.parentNode.insertBefore(anchor, settings);
      anchor.appendChild(settings);

      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'voice-trigger';
      trigger.id = 'voice-onboarding-btn';
      trigger.setAttribute('aria-label', 'Tour guiado por voz');
      trigger.setAttribute('title', 'Tour guiado por voz');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = ICONS.voice;
      anchor.appendChild(trigger);
    }

    if (!isDone()) trigger.classList.add('has-new');
    trigger.addEventListener('click', togglePanel);
  }

  function openPanel() {
    if (!panel) return;
    panel.classList.add('open');
    WaveOrb.start();
    if (trigger) {
      trigger.classList.add('active');
      trigger.classList.remove('has-new');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('open');
    WaveOrb.stop();
    if (trigger) {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  function togglePanel() {
    if (panel && panel.classList.contains('open')) close();
    else openPanel();
  }

  function setState(state) {
    panel.classList.remove('idle', 'speaking', 'paused');
    panel.classList.add(state);
    // A onda só ondula enquanto a voz fala; em idle/pausado vira flatline
    WaveOrb.setAmplitude(state === 'speaking' ? 1 : 0);
  }

  function idleUI() {
    setState('idle');
    btnStart.textContent = isDone() ? 'Recomeçar tour' : 'Iniciar tour';
    btnStart.hidden = false;
    btnPlay.hidden = true;
    btnSkip.hidden = true;
    elCount.textContent = '';
    elLabel.textContent = 'Tour guiado';
    elState.textContent = 'Pronta quando você estiver';
  }

  function playingUI() {
    btnStart.hidden = true;
    btnPlay.hidden = false;
    btnSkip.hidden = false;
  }

  function getAudio() {
    if (audio) return audio;
    audio = document.createElement('audio');
    audio.id = 'vo-audio';
    audio.preload = 'none';
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onEnded);
    // Rede de segurança: qualquer parada vinda do próprio <audio>
    // (pausa do sistema, buffer travando, fim da faixa) também flatlina.
    audio.addEventListener('pause', () => WaveOrb.setAmplitude(0));
    audio.addEventListener('waiting', () => WaveOrb.setAmplitude(0));
    audio.addEventListener('playing', () => WaveOrb.setAmplitude(1));
    if (root) root.appendChild(audio);
    return audio;
  }

  function play(id) {
    const track = TRACKS[id];
    if (!track) return;

    currentId = id;
    played.add(id);
    writeSet(localStorage, LS_PLAYED, played);
    if (TIPS.indexOf(id) !== -1) {
      tipsDone.add(id);
      writeSet(sessionStorage, SS_TIPS, tipsDone);
    }

    const a = getAudio();
    a.src = AUDIO_DIR + encodeURIComponent(track.file);
    a.currentTime = 0;

    elLabel.textContent = track.label;
    elState.textContent = 'Falando';
    updateCount(id);
    playingUI();
    openPanel();

    const p = a.play();
    if (p && typeof p.catch === 'function') {
      p.then(() => {
        setState('speaking');
      }).catch(() => {
        setState('paused');
        elState.textContent = 'Toque em play para ouvir';
      });
    } else {
      setState('speaking');
    }
  }

  function updateCount(id) {
    const i = MAIN.indexOf(id);
    elCount.textContent = i === -1 ? 'dica' : i + 1 + '/' + MAIN.length;
  }

  function onEnded() {
    if (queue.length) {
      play(queue.shift());
      return;
    }
    setState('idle');
    elState.textContent = 'Aguardando você';
    if (currentId === MAIN[MAIN.length - 1]) finish();
  }

  function fire(id, opts) {
    const once = !opts || opts.once !== false;
    if (!active) return;
    if (once && played.has(id)) return;
    if (TIPS.indexOf(id) !== -1 && tipsDone.has(id)) return;
    if (queue.indexOf(id) !== -1) return;

    const a = audio;
    const busy = a && !a.paused && !a.ended && a.src;
    if (busy) queue.push(id);
    else play(id);
  }

  function start() {
    active = true;
    queue = [];
    played = new Set();
    tipsDone = new Set();
    writeSet(localStorage, LS_PLAYED, played);
    writeSet(sessionStorage, SS_TIPS, tipsDone);
    generated = false;
    openPanel();
    play(1);
  }

  function toggle() {
    if (!audio || !currentId) return;
    if (audio.paused) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      setState('speaking');
      elState.textContent = 'Falando';
    } else {
      audio.pause();
      setState('paused');
      elState.textContent = 'Pausado';
    }
  }

  function skip() {
    if (!active) return;
    if (audio) {
      audio.pause();
    }

    if (queue.length) {
      play(queue.shift());
      return;
    }

    const i = MAIN.indexOf(currentId);
    if (i !== -1 && i < MAIN.length - 1) {
      play(MAIN[i + 1]);
      return;
    }

    finish();
  }

  function stop() {
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    queue = [];
    currentId = null;
  }

  function finish() {
    stop();
    markDone();
    idleUI();
  }

  function close() {
    stop();
    active = false;
    markDone();
    idleUI();
    closePanel();
  }

  function wrap(name, after) {
    const orig = window[name];
    if (typeof orig !== 'function') return;
    window[name] = function () {
      const result = orig.apply(this, arguments);
      try {
        after.apply(null, arguments);
      } catch (e) {}
      return result;
    };
  }

  const TAB_TRACK = {
    mining: 2,
    library: 3,
    studio: 4,
    video: 11,
    settings: 17,
  };

  function bindTriggers() {
    wrap('switchTab', function (tab) {
      const id = TAB_TRACK[tab];
      if (id) fire(id);
    });

    wrap('goStep', function (n) {
      const cur = document.querySelector('#img-stepper .step-item.active');
      if (!cur || cur.dataset.step !== String(n)) return;

      const id = { 1: 5, 2: 6, 3: 7, 4: 8, 5: 9 }[n];
      if (id) fire(id);
      if (n === 5) setTimeout(checkGenButton, 400);
    });

    wrap('generateImagePrompt', function () {
      fire(10);
      firstGeneration();
    });

    wrap('generateVideoPrompt', function () {
      firstGeneration();
    });

    bindIdleFields();
  }

  function firstGeneration() {
    if (generated) return;
    generated = true;
    fire(12);
  }

  function checkGenButton() {
    const btn = document.getElementById('gen-img-btn');
    if (!btn || btn.disabled) return;
    if (!isVisible(btn)) return;
    fire(16);
  }

  function bindIdleFields() {
    Object.keys(IDLE_FIELDS).forEach((id) => {
      document.addEventListener('focusin', (e) => {
        if (!e.target || e.target.id !== id) return;
        armIdle(id);
      });
      document.addEventListener('input', (e) => {
        if (!e.target || e.target.id !== id) return;
        armIdle(id);
      });
      document.addEventListener('focusout', (e) => {
        if (!e.target || e.target.id !== id) return;
        clearTimeout(idleTimers[id]);
      });
    });
  }

  function armIdle(id) {
    clearTimeout(idleTimers[id]);
    const trackId = IDLE_FIELDS[id];
    if (tipsDone.has(trackId)) return;
    idleTimers[id] = setTimeout(() => fire(trackId), IDLE_MS);
  }

  function init() {
    const hasHeader =
      document.getElementById('voice-onboarding-btn') || document.getElementById('settings-btn');
    if (!hasHeader) return;
    mountTrigger();
    mountPanel();
    bindTriggers();

    if (!isDone()) watchInvite();
  }

  const BLOCKERS = ['terms-overlay', 'activation-overlay', 'loading-overlay'];

  function isVisible(el) {
    if (!el) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function screenIsBlocked() {
    return BLOCKERS.some((id) => isVisible(document.getElementById(id)));
  }

  function watchInvite() {
    let tries = 0;
    let clear = 0;
    (function tick() {
      if (active) return;
      if (screenIsBlocked()) {
        clear = 0;
        closePanel();
      } else if (++clear >= 4) {
        openPanel();
      }
      if (++tries > 300) return;
      setTimeout(tick, 400);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    start,
    skip,
    close,
    fire,
    open: openPanel,
    toggle: togglePanel,
    tracks: TRACKS,
    reset() {
      try {
        localStorage.removeItem(LS_DONE);
        localStorage.removeItem(LS_PLAYED);
        sessionStorage.removeItem(SS_TIPS);
      } catch (e) {}
      played = new Set();
      tipsDone = new Set();
      idleUI();
    },
  };
})();

window.NexVoiceOnboarding = VoiceOnboarding;
