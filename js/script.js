const products = [ {
  id: 25,
  name: "Vitamina C Pó Efervescente",
  cat: "saude",
  img: "./img25.png",
  rank: 1,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "effervescent vitamin C powder tube orange packaging"},
{id: 38,
  name: "Colágeno Hidrolisado Sabor Frutas",
  cat: "saude",
  img: "./img34.png",
  rank: 2,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "hydrolyzed collagen supplement pouch fruit flavor pastel packaging"},
{id: 6,
  name: "Blush em Bastão Multiuso",
  cat: "beleza",
  img: "./img6.png",
  rank: 3,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "cream blush stick coral shade in sleek tube packaging"} ];
const videos = [ {
  id: "51",
  title: "Jelly Blox ASMR",
  fmt: "unboxing",
  img: "./img10.png",
  grad: "grad-moda",
  views: "10.5M",
  likes: "465K",
  dur: "3:32",
  fmtClass: "fmt-unboxing",
  isNew: true,
  url: "https://www.tiktok.com",
  hook: "Olha esse som de Jelly Blox...",
  reveal: "Cortando e apertando cada bloquinho...",
  cta: "Kit completo com link na bio"},
{id: "50",
  title: "Hello Kitty, Care Bear e Stitch Blind Boxes ASMR",
  fmt: "unboxing",
  img: "./img10.png",
  grad: "grad-moda",
  views: "2.2M",
  likes: "303K",
  dur: "6:59",
  fmtClass: "fmt-unboxing",
  isNew: true,
  url: "https://www.tiktok.com",
  hook: "Comprei todas as blind boxes fofas...",
  reveal: "Abrindo uma por uma sem saber o que vem...",
  cta: "Coleção completa no link da bio"},
{id: "49",
  title: "Hello Kitty Blind Box de Arcade",
  fmt: "unboxing",
  img: "./img10.png",
  grad: "grad-moda",
  views: "2.3M",
  likes: "142K",
  dur: "12:44",
  fmtClass: "fmt-unboxing",
  isNew: true,
  url: "https://www.tiktok.com",
  hook: "Fui atrás da Hello Kitty rara do arcade...",
  reveal: "Jogando até conseguir a caixa surpresa...",
  cta: "Peça disponível no link da bio"} ];
const ICONS = {
  beleza: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4 5 7 8.5 7 12a7 7 0 01-14 0c0-3.5 3-7 7-12z"/></svg>',
  fitness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/><rect x="6" y="7" width="3" height="10" rx="1"/><rect x="15" y="7" width="3" height="10" rx="1"/></svg>',
  moda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a2 2 0 10-2 2"/><path d="M12 6l9 6.5a1.2 1.2 0 01-.7 2.2H3.7A1.2 1.2 0 013 12.5L12 6z"/><line x1="5" y1="18" x2="19" y2="18"/></svg>',
  tech: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20l-1.5-3h-17L2 19z"/></svg>',
  casa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/><path d="M10 20v-5h4v5"/></svg>',
  saude: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4S9 4 6 9c-3 5 0 10 5 10 6 0 9-5.5 9-11 0-1.5-.2-3-.2-4z"/><path d="M6 19c3-4 7-6 12-9"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/><path d="M10 20v-5h4v5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 015.5 4H12v16H5.5A1.5 1.5 0 014 18.5v-13z"/><path d="M20 5.5A1.5 1.5 0 0018.5 4H12v16h6.5a1.5 1.5 0 001.5-1.5v-13z"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5.5-5.5L3 21"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><line x1="8" y1="4" x2="8" y2="20"/><line x1="16" y1="4" x2="16" y2="20"/><line x1="3" y1="9" x2="8" y2="9"/><line x1="3" y1="15" x2="8" y2="15"/><line x1="16" y1="9" x2="21" y2="9"/><line x1="16" y1="15" x2="21" y2="15"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V19.5a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1-1.56 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H4.5a2 2 0 110-4h.09a1.7 1.7 0 001.56-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H10a1.7 1.7 0 001-1.55V4.5a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V10a1.7 1.7 0 001.55 1h.09a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="6" y2="6"/><line x1="18" y1="18" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="6" y2="18"/><line x1="18" y1="6" x2="19.8" y2="4.2"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1110 3a7 7 0 0010 11.5z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3-2 4.5-2 7.5a2 2 0 004 0c1 1 2 2.5 2 4.5a4 4 0 11-8 0c0-3 1.5-4 2-6.5C10.5 6 11 4 12 2z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.7A8 8 0 1121 12z"/></svg>',
  pointDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="18"/><polyline points="6 13 12 19 18 13"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 11c-2.5 4.6-9.5 9-9.5 9z"/></svg>',
  graduate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l10-4 10 4-10 4L2 8z"/><path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5"/><path d="M22 8v6"/></svg>'
};
const avatars = [ {
  id: 1,
  name: "Luna Ferreira",
  age: 24,
  nicho: "Beleza & Skincare",
  style: "Minimalista",
  gender: "f",
  emoji: ICONS.beleza,
  grad: "grad-beleza"
}, {
  id: 2,
  name: "Rafael Torres",
  age: 28,
  nicho: "Fitness & Nutrição",
  style: "Athletic",
  gender: "m",
  emoji: ICONS.fitness,
  grad: "grad-fitness"
}, {
  id: 3,
  name: "Isa Duarte",
  age: 22,
  nicho: "Moda & Lifestyle",
  style: "Streetwear",
  gender: "f",
  emoji: ICONS.moda,
  grad: "grad-moda"
}, {
  id: 4,
  name: "Pedro Nunes",
  age: 31,
  nicho: "Tech & Gadgets",
  style: "Minimalista",
  gender: "m",
  emoji: ICONS.tech,
  grad: "grad-tech"
}, {
  id: 5,
  name: "Theo Lima",
  age: 25,
  nicho: "Lifestyle & Casa",
  style: "Boho",
  gender: "m",
  emoji: ICONS.casa,
  grad: "grad-casa"
}, {
  id: 6,
  name: "Lara Silva",
  age: 20,
  nicho: "Saúde & Wellness",
  style: "Natural",
  gender: "f",
  emoji: ICONS.saude,
  grad: "grad-saude"
} ];

const cameras = [ {
  id: "mao",
  label: "Mão Segurando",
  iconPath: "M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8"
}, {
  id: "demo",
  label: "Demo Direta",
  iconPath: "M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.899L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
}, {
  id: "selfie",
  label: "Selfie",
  iconPath: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
}, {
  id: "espelho",
  label: "Espelho",
  iconPath: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
}, {
  id: "close",
  label: "Close Extremo",
  iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
} ];

const styles = [ {
  id: "ugc",
  label: "UGC Natural",
  sub: "autêntico",
  iconPath: "M12 20h9 M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
}, {
  id: "tiktok",
  label: "TikTok Viral",
  sub: "trending",
  iconPath: "M9 12A4 4 0 119 4a4 4 0 010 8z"
}, {
  id: "prox",
  label: "Proximidade",
  sub: "close-up",
  iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
}, {
  id: "corpo",
  label: "Corpo Inteiro",
  sub: "full body",
  iconPath: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z"
} ];

const modes = [ {
  id: "vestindo",
  label: "Vestindo",
  iconPath: "M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"
}, {
  id: "segurando",
  label: "Segurando",
  iconPath: "M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2"
}, {
  id: "selfie",
  label: "Selfie",
  iconPath: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
}, {
  id: "espelho",
  label: "Espelho",
  iconPath: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
} ];

const backgrounds = [ {
  id: "bedroom",
  label: "Quarto Estético",
  css: "linear-gradient(135deg,#2d1b4e,#1a1030)",
  desc: "cozy aesthetic bedroom with fairy lights, pastel bedding, soft warm ambiance, bokeh background"
}, {
  id: "bathroom",
  label: "Banheiro Luxo",
  css: "linear-gradient(135deg,#1a2a3a,#0d1a2a)",
  desc: "luxurious white marble bathroom, clean minimalist vanity, natural window light, editorial"
}, {
  id: "kitchen",
  label: "Cozinha Clean",
  css: "linear-gradient(135deg,#2a2a1a,#1a1a0d)",
  desc: "minimalist white kitchen counter, morning light, fresh flowers, clean aesthetic, lifestyle"
}, {
  id: "outdoor",
  label: "Externo Natural",
  css: "linear-gradient(135deg,#0d2a0d,#1a3a0d)",
  desc: "outdoor natural setting, lush green background, golden hour sunlight, soft bokeh"
}, {
  id: "studio",
  label: "Estúdio Branco",
  css: "linear-gradient(135deg,#2a2a2a,#1a1a1a)",
  desc: "clean white studio background, professional softbox lighting, seamless backdrop, minimal"
}, {
  id: "neon",
  label: "Neon Urbano",
  css: "linear-gradient(135deg,#1a0a2e,#0a0a1e)",
  desc: "neon lit urban environment, city lights bokeh, purple and pink neon reflections, night"
}, {
  id: "cafe",
  label: "Café Aesthetic",
  css: "linear-gradient(135deg,#2a1a0a,#1a0d00)",
  desc: "cozy aesthetic café table, warm morning light, coffee cup, blurred background, lifestyle"
}, {
  id: "gym",
  label: "Academia",
  css: "linear-gradient(135deg,#0a0a1a,#001a0a)",
  desc: "modern gym background, equipment blurred, dramatic lighting, fitness motivation atmosphere"
}, {
  id: "beach",
  label: "Praia & Mar",
  css: "linear-gradient(135deg,#001a2a,#002a3a)",
  desc: "tropical beach, golden sand, turquoise sea, sunny day, vacation vibes, travel lifestyle"
}, {
  id: "office",
  label: "Home Office",
  css: "linear-gradient(135deg,#1a1a2a,#0d0d1a)",
  desc: "modern home office setup, bookshelf, plants, natural light, productivity aesthetic"
}, {
  id: "gradient_purple",
  label: "Gradiente Lilás",
  css: "linear-gradient(135deg,#4a0a6a,#1a0a3a)",
  desc: "soft purple gradient studio background, ethereal glow, dreamy aesthetic, portrait"
}, {
  id: "gradient_gold",
  label: "Gradiente Dourado",
  css: "linear-gradient(135deg,#3a2a00,#1a1000)",
  desc: "warm golden hour gradient background, luxury aesthetic, soft amber tones, premium"
} ];

const improvements = [ "Luz natural", "Ultra nitidez", "Textura de tecido", "Cabelo natural", "Realismo avançado", "Pele detalhada", "Bokeh suave", "Cores vibrantes" ];

const vidImprovements = [ "Estabilização", "Transições suaves", "Color grading", "Slow motion", "Texto animado", "Logo watermark" ];

const roteiroTypes = [ {
  id: "transformacao",
  label: "Transformação",
  hook: "Minha vida antes disso era...",
  reveal: "Depois de usar por X dias, olha o que aconteceu...",
  cta: "Link na bio — pega o seu!"
}, {
  id: "problema",
  label: "Problema-Solução",
  hook: "Quem mais tem esse problema?",
  reveal: "Esse produto resolveu em X dias o que eu sofria há anos...",
  cta: "Corre que tem desconto hoje!"
}, {
  id: "honesta",
  label: "Review Honesta",
  hook: "Vou ser honesta com vocês sobre esse produto...",
  reveal: "Testei por 2 semanas e olha o que achei...",
  cta: "Vale a pena? Spoiler: sim. Link na bio!"
}, {
  id: "unboxing",
  label: "Unboxing",
  hook: "Finalmente chegou! Vamos abrir juntos?",
  reveal: "Primeiras impressões ao vivo, sem filtro...",
  cta: "Já pedi o segundo, link nos comentários!"
}, {
  id: "pov",
  label: "POV / Rotina",
  hook: "POV: você achou o produto que mudou sua rotina",
  reveal: "Adicionei na minha rotina diária assim...",
  cta: "Salva esse vídeo pra não esquecer!"
}, {
  id: "tutorial",
  label: "Tutorial",
  hook: "Você sabia que dá pra usar isso assim?",
  reveal: "Vou te mostrar o passo a passo completo...",
  cta: "Dúvidas nos comentários, link do produto na bio!"
} ];

const hookPresets = [ "Minha pele estava horrível...", "Gastei e não me arrependo!", "Ninguém me contou sobre isso", "POV: você descobre o produto perfeito", "Não acreditei até testar...", "Isso mudou minha vida em 7 dias" ];

const revealPresets = [ "Mostrando resultado real", "Aplicando ao vivo", "Comparando antes x depois", "Testando sem filtro", "Step by step devagar" ];

const ctaPresets = [ "Link na bio", "Código desconto nos comentários", "Últimas unidades — corre!", "Segue pra mais dicas", "Salva esse vídeo!" ];

const tomOptions = [ "Empolgado", "Natural", "Sussurrado", "Educativo", "Humorístico", "Urgente", "Casual" ];

let selectedCamera = "mao", selectedStyle = "ugc", selectedMode = "segurando", selectedBg = "bedroom";

let selectedImprovements = new Set([ "Luz natural", "Ultra nitidez" ]);

let selectedVidImprovements = new Set([ "Estabilização", "Color grading" ]);

let currentStep = 1, currentVidStep = 1;

let maxImgStepReached = 1, maxVidStepReached = 1;

let selectedStudioProduct = null, selectedVidProduct = null;

let selectedStudioAvatar = null, selectedVidAvatar = null;

let selectedDuration = "15s", selectedTom = "Natural", selectedRoteiroType = null;

const FAV_KEY = "nex-favs", AVATARS_KEY = "nex-custom-avatars", PRODUCTS_KEY = "nex-custom-products", PROMPTS_KEY = "nex-prompts";

let favorites = {}, customAvatars = [], customProducts = [], promptHistory = [];

function safeGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

favorites = safeGet(FAV_KEY, {});

customAvatars = safeGet(AVATARS_KEY, []);

customProducts = safeGet(PRODUCTS_KEY, []);

promptHistory = safeGet(PROMPTS_KEY, []);

let toastTimer;

function showToast(msg, icon = ICONS.star) {
  clearTimeout(toastTimer);
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  t.classList.add("show");
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function updateCharCounter(inputId, counterId, max) {
  const len = document.getElementById(inputId).value.length;
  const el = document.getElementById(counterId);
  el.textContent = `${len} / ${max}`;
  el.className = "char-counter" + (len > max * .9 ? " warn" : "") + (len >= max ? " limit" : "");
}

function toggleFav(type, id, btn) {
  const key = `${type}-${id}`;
  if (favorites[key]) {
    delete favorites[key];
    btn.classList.remove("active");
  } else {
    favorites[key] = true;
    btn.classList.add("active");
  }
  safeSet(FAV_KEY, favorites);
  showToast(favorites[key] ? "Adicionado aos favoritos" : "Removido dos favoritos");
}

function isFav(type, id) {
  return !!favorites[`${type}-${id}`];
}

function heartSVG(active) {
  return `<svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:${active ? "#c084fc" : "var(--text2)"};fill:${active ? "#c084fc" : "none"};stroke-width:2;stroke-linecap:round;stroke-linejoin:round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
}

function savePrompt(type, content) {
  if (!content) return;
  promptHistory.unshift({
    type: type,
    content: content,
    date: (new Date).toISOString()
  });
  if (promptHistory.length > 100) promptHistory.pop();
  safeSet(PROMPTS_KEY, promptHistory);
  updateHistNotif();
  const numEl = document.getElementById("credit-num");
  if (numEl) {
    const n = Math.max(0, (parseInt(numEl.textContent) || 0) - 1);
    numEl.textContent = n;
    if (n < 50) numEl.style.color = "var(--accent2)";
  }
}

function exportData(fmt) {
  const data = {
    favorites: favorites,
    customAvatars: customAvatars,
    customProducts: customProducts,
    promptHistory: promptHistory
  };
  let content = "", mime = "text/plain", ext = fmt;
  if (fmt === "json") {
    content = JSON.stringify(data, null, 2);
    mime = "application/json";
  } else if (fmt === "csv") {
    content = promptHistory.map(p => `"${p.type}","${p.date}","${p.content.replace(/"/g, '""')}"`).join("\n");
    content = "type,date,content\n" + content;
    mime = "text/csv";
  } else {
    content = promptHistory.map(p => `[${p.type}] ${p.date}\n${p.content}\n${"─".repeat(40)}`).join("\n\n");
  }
  const blob = new Blob([ content ], {
    type: mime
  });
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(blob),
    download: `nex-ai-export.${ext}`
  });
  a.click();
  URL.revokeObjectURL(a.href);
  showToast(`Exportado como ${fmt.toUpperCase()}`);
}

const BACKUP_VERSION = 1;

function generateBackup() {
  const backup = {
    app: "nex-ai-backup",
    version: BACKUP_VERSION,
    createdAt: (new Date).toISOString(),
    data: {
      favorites: favorites,
      customAvatars: customAvatars,
      customProducts: customProducts,
      promptHistory: promptHistory,
      theme: function() {
        try {
          return localStorage.getItem("nex-theme") || "dark";
        } catch (e) {
          return "dark";
        }
      }()
    }
  };
  const content = JSON.stringify(backup, null, 2);
  const blob = new Blob([ content ], {
    type: "application/json"
  });
  const stamp = (new Date).toISOString().slice(0, 10);
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(blob),
    download: `nex-ai-backup-${stamp}.json`
  });
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("Backup gerado com sucesso!");
  const status = document.getElementById("backup-status");
  if (status) status.textContent = "Último backup gerado agora.";
}

function importBackup(event) {
  const input = event.target;
  const file = input.files && input.files[0];
  if (!file) return;
  const status = document.getElementById("backup-status");
  if (file.size > 10 * 1024 * 1024) {
    showToast("Arquivo muito grande para ser um backup válido.");
    input.value = "";
    return;
  }
  const reader = new FileReader;
  reader.onload = function(e) {
    let parsed;
    try {
      parsed = JSON.parse(e.target.result);
    } catch (err) {
      showToast("Arquivo inválido: não é um JSON válido.");
      if (status) status.textContent = "Falha ao importar: JSON inválido.";
      input.value = "";
      return;
    }
    const payload = parsed && parsed.app === "nex-ai-backup" && parsed.data ? parsed.data : parsed;
    if (!payload || typeof payload !== "object") {
      showToast("Arquivo de backup inválido.");
      if (status) status.textContent = "Falha ao importar: formato não reconhecido.";
      input.value = "";
      return;
    }
    showConfirm("Importar este backup vai substituir seus dados atuais (favoritos, avatares, produtos e histórico). Continuar?", () => {
      try {
        if (payload.favorites && typeof payload.favorites === "object") {
          favorites = payload.favorites;
          safeSet(FAV_KEY, favorites);
        }
        if (Array.isArray(payload.customAvatars)) {
          customAvatars = payload.customAvatars;
          safeSet(AVATARS_KEY, customAvatars);
        }
        if (Array.isArray(payload.customProducts)) {
          customProducts = payload.customProducts;
          safeSet(PRODUCTS_KEY, customProducts);
        }
        if (Array.isArray(payload.promptHistory)) {
          promptHistory = payload.promptHistory;
          safeSet(PROMPTS_KEY, promptHistory);
        }
        if (payload.theme && typeof payload.theme === "string") {
          applyThemeClass(payload.theme);
        }
        if (typeof renderProducts === "function") renderProducts();
        if (typeof renderVideos === "function") renderVideos();
        if (typeof renderStudioProducts === "function") renderStudioProducts();
        if (typeof renderVidProducts === "function") renderVidProducts();
        if (typeof renderAvatars === "function") renderAvatars("all");
        if (typeof updateHistNotif === "function") updateHistNotif();
        showToast("Backup importado com sucesso!");
        if (status) status.textContent = "Backup importado em " + (new Date).toLocaleString("pt-BR") + ".";
      } catch (err) {
        showToast("Erro ao aplicar o backup.");
        if (status) status.textContent = "Falha ao importar os dados.";
      } finally {
        input.value = "";
      }
    });
  };
  reader.onerror = function() {
    showToast("Erro ao ler o arquivo.");
    input.value = "";
  };
  reader.readAsText(file);
}

function openAddModal() {
  document.getElementById("add-product-modal").classList.add("open");
  document.getElementById("np-nome").focus();
}

function closeAddModal() {
  document.getElementById("add-product-modal").classList.remove("open");
}

const gradients = [ "grad-beleza", "grad-saude", "grad-fitness", "grad-tech", "grad-moda", "grad-casa" ];

function saveNewProduct() {
  const nome = Sanitize.sanitizeInput(document.getElementById("np-nome").value, 60);
  if (!nome) {
    showToast("Informe o nome do produto!");
    document.getElementById("np-nome").focus();
    return;
  }
  const promptVisual = Sanitize.sanitizeInput(document.getElementById("np-prompt").value, 200);
  const newProd = {
    id: Date.now(),
    name: nome,
    price: "",
    cat: "custom",
    img: "",
    rank: products.length + customProducts.length + 1,
    grad: gradients[customProducts.length % gradients.length],
    tag: "#meu",
    prompt: promptVisual,
    custom: true
  };
  customProducts.unshift(newProd);
  safeSet(PRODUCTS_KEY, customProducts);
  document.getElementById("np-nome").value = "";
  document.getElementById("np-prompt").value = "";
  document.getElementById("np-counter").textContent = "0 / 200";
  closeAddModal();
  renderProducts();
  reapplyMiningFilter();
  renderStudioProducts();
  renderVidProducts();
  scrollToFirstProduct();
  showToast(`"${nome}" adicionado com sucesso!`);
}

/* Produtos personalizados aparecem primeiro, do mais novo para o mais antigo */
function allProducts() {
  return [ ...customProducts, ...products ];
}

/* Reaplica o filtro de categoria ativo depois de redesenhar a grade de mineracao */
function reapplyMiningFilter() {
  const chip = document.querySelector("#mining-filters .filter-chip.active");
  if (!chip) return;
  const val = chip.dataset.cat;
  document.querySelectorAll("#product-grid .product-card").forEach(card => {
    card.style.display = (val === "all" || card.dataset.cat === val) ? "" : "none";
  });
}

/* Leva o usuario ate o produto recem-adicionado, que agora fica no topo da grade */
function scrollToFirstProduct() {
  const grid = document.getElementById("studio-product-grid") || document.getElementById("vid-product-grid");
  const first = grid && grid.querySelector(".product-card");
  if (first && typeof first.scrollIntoView === "function") {
    first.scrollIntoView({ behavior: "smooth", block: "center" });
    first.classList.add("just-added");
    setTimeout(() => first.classList.remove("just-added"), 1600);
  }
}

function productCard(p, selectable, i = 0, clickFn = "selectStudioProduct") {
  const rankClass = p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "rank-other";
  const fav = isFav("prod", p.id);
  const imgContent = p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">` : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="opacity:.55"><path d="M21 8L12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`;
  const customBadge = p.custom ? `<span style="position:absolute;bottom:7px;right:7px;background:rgba(124,107,255,0.85);color:white;font-size:8px;padding:2px 6px;border-radius:7px;font-weight:700;backdrop-filter:blur(4px)">MEU</span>` : "";
  const promptBadge = p.prompt ? `<span style="position:absolute;bottom:7px;left:7px;background:rgba(168,85,247,0.18);color:#c4b5fd;font-size:8px;padding:2px 6px;border-radius:7px;border:1px solid rgba(168,85,247,0.3);font-weight:700;backdrop-filter:blur(4px)">PROMPT</span>` : "";
  const trendBadge = p.rank <= 5 ? `<div class="trending-badge" style="bottom:${p.prompt ? "28px" : "7px"}">TOP ${p.rank}</div>` : "";
  const newBadge = p.isNew ? `<span class="badge-new">NOVO</span>` : "";
  const safeName = Sanitize.escapeHTML(p.name);
  return `<div class="product-card" data-cat="${p.cat}" data-id="${p.id}" ${selectable ? `onclick="${clickFn}('${p.id}',this)" role="option" tabindex="0" aria-label="${safeName}"` : ""} role="listitem">\n    <div class="card-img ${p.grad}">${imgContent}<span class="rank-badge ${rankClass}" aria-label="Ranking ${p.rank}">#${p.rank}</span>${customBadge}${promptBadge}${trendBadge}${newBadge}\n      <button class="fav-btn ${fav ? "active" : ""}" onclick="event.stopPropagation();this.innerHTML=heartSVG(!this.classList.contains('active'));toggleFav('prod',${p.id},this)" aria-label="${fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}">${heartSVG(fav)}</button>\n    </div>\n    <div class="card-body">\n      <div class="card-name">${safeName}</div>\n      <div class="card-meta"><span class="card-tag">${p.tag}</span></div>\n      ${!selectable ? `<button class="card-btn" onclick="event.stopPropagation();window.open('https://www.google.com/search?q=${encodeURIComponent(p.name)}','_blank')"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Pesquisar</button>` : ""}\n    </div>\n  </div>`;
}

function renderProducts() {
  document.getElementById("product-grid").innerHTML = allProducts().map((p, i) => productCard(p, false, i)).join("");
}

function parseViews(str) {
  if (!str) return 0;
  const n = parseFloat(str);
  if (str.includes("M")) return n * 1e6;
  if (str.includes("K")) return n * 1e3;
  return n;
}

function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

const catLabels = {
  beleza: "Beleza",
  saude: "Saúde",
  fitness: "Fitness",
  moda: "Moda",
  casa: "Casa",
  tech: "Tech"
};

function renderMiningStats() {
  const bar = document.getElementById("stats-bar");
  if (!bar) return;
  const total = products.length;
  const novos = products.filter(p => p.isNew).length;
  const catCount = {};
  products.forEach(p => {
    catCount[p.cat] = (catCount[p.cat] || 0) + 1;
  });
  const catQtd = Object.keys(catCount).length;
  const catLider = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
  const catLiderLabel = catLider ? catLabels[catLider[0]] || catLider[0] : "—";
  const viralCount = videos.length;
  const maxViews = videos.reduce((max, v) => Math.max(max, parseViews(v.views)), 0);
  bar.innerHTML = `\n    <div class="stat-card">\n      <div class="stat-value">${total}</div>\n      <div class="stat-label">Produtos rastreados</div>\n      <div class="stat-delta">↑ ${novos} novos esta semana</div>\n    </div>\n    <div class="stat-card">\n      <div class="stat-value" style="background:linear-gradient(90deg,#a855f7,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${catQtd}</div>\n      <div class="stat-label">Categorias</div>\n      <div class="stat-delta">${catLiderLabel} lidera</div>\n    </div>\n    <div class="stat-card">\n      <div class="stat-value" style="background:linear-gradient(90deg,#c4b5fd,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${viralCount}</div>\n      <div class="stat-label">Vídeos virais</div>\n      <div class="stat-delta">↑ ${formatViews(maxViews)} views líder</div>\n    </div>`;
}

function parseViewsCount(str) {
  if (!str) return 0;
  const m = String(str).trim().match(/^([\d.,]+)\s*([KMB]?)$/i);
  if (!m) return 0;
  const num = parseFloat(m[1].replace(",", "."));
  const mult = {
    K: 1e3,
    M: 1e6,
    B: 1e9
  }[m[2].toUpperCase()] || 1;
  return num * mult;
}

function renderVideos() {
  document.getElementById("video-grid").innerHTML = videos.map((v, i) => {
    const fav = isFav("vid", v.id);
    const newBadgeV = v.isNew ? `<span class="badge-new">NOVO</span>` : "";
    return `<div class="video-card" data-fmt="${v.fmt}" role="listitem">\n      <div class="video-thumb">\n        <img src="${v.img}" alt="${v.title}" loading="lazy" onerror="this.style.display='none'">\n        <div class="play-overlay" aria-hidden="true"><div class="play-circle"><svg viewBox="0 0 24 24" style="width:32px;height:32px"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>\n        <span class="format-badge ${v.fmtClass}">${v.fmt.toUpperCase()}</span>\n        ${newBadgeV}\n        <button class="fav-btn ${fav ? "active" : ""}" style="top:7px;left:7px;right:auto" onclick="this.innerHTML=heartSVG(!this.classList.contains('active'));toggleFav('vid',${v.id},this)" aria-label="${fav ? "Remover dos favoritos" : "Favoritar vídeo"}">${heartSVG(fav)}</button>\n      </div>\n      <div class="video-body">\n        <button class="card-btn" onclick="window.open('${v.url}','_blank')" style="margin-bottom:8px"><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>Ver no TikTok</button>\n        <div class="video-title">${v.title}</div>\n        <div class="video-stats">\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${v.views}</span>\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>${v.likes}</span>\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${v.dur}</span>\n        </div>\n        <button class="accordion-btn" onclick="toggleAccordion(this)" aria-expanded="false"><span>Estrutura do Roteiro</span><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></button>\n        <div class="accordion-body" role="region">\n          <div class="script-step"><span>Hook (0–3s)</span><p>${v.hook}</p></div>\n          <div class="script-step"><span>Reveal (3–12s)</span><p>${v.reveal}</p></div>\n          <div class="script-step"><span>CTA</span><p>${v.cta}</p></div>\n        </div>\n      </div>\n    </div>`;
  }).join("");
}

/* Quantos produtos estao visiveis agora em cada aba */
const productPageState = { studio: 0, vid: 0 };

/* Lote inicial e passo de cada clique: 20 no celular, 30 no PC */
const PRODUCTS_LIMIT_MOBILE = 20;
const PRODUCTS_LIMIT_DESKTOP = 30;
const PRODUCTS_MOBILE_BREAKPOINT = 768;

function getProductPageLimit() {
  return window.innerWidth <= PRODUCTS_MOBILE_BREAKPOINT ? PRODUCTS_LIMIT_MOBILE : PRODUCTS_LIMIT_DESKTOP;
}

function productGridEl(which) {
  return document.getElementById(which === "studio" ? "studio-product-grid" : "vid-product-grid");
}

function resetProductPagination(which) {
  productPageState[which] = getProductPageLimit();
}

function applyProductPagination(which) {
  const grid = productGridEl(which);
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".product-card"));
  const total = cards.length;
  const passo = getProductPageLimit();

  if (!productPageState[which] || productPageState[which] < passo) productPageState[which] = passo;
  if (productPageState[which] > total) productPageState[which] = total;
  const visiveis = productPageState[which];

  cards.forEach((card, i) => {
    if (i >= visiveis) card.classList.add("page-hidden"); else card.classList.remove("page-hidden");
  });

  const moreBtn = document.getElementById(`${which}-more-btn`);
  const lessBtn = document.getElementById(`${which}-less-btn`);
  const row = document.getElementById(`${which}-more-row`);

  const restantes = total - visiveis;
  const proximoLote = Math.min(passo, restantes);
  const podeMais = restantes > 0;
  const podeMenos = visiveis > passo;

  if (moreBtn) {
    moreBtn.style.display = podeMais ? "flex" : "none";
    if (podeMais) {
      const countEl = document.getElementById(`${which}-more-count`);
      if (countEl) countEl.textContent = `+${proximoLote}`;
      moreBtn.setAttribute("aria-label", `Mostrar mais ${proximoLote} produtos. ${restantes} restantes de ${total}.`);
    }
  }
  if (lessBtn) {
    lessBtn.style.display = podeMenos ? "flex" : "none";
    lessBtn.setAttribute("aria-label", `Mostrar menos produtos, voltar para ${passo}`);
  }
  if (row) row.style.display = (podeMais || podeMenos) ? "flex" : "none";
}

function showMoreProducts(which) {
  const grid = productGridEl(which);
  if (!grid) return;
  const total = grid.querySelectorAll(".product-card").length;
  productPageState[which] = Math.min(productPageState[which] + getProductPageLimit(), total);
  applyProductPagination(which);
}

function showLessProducts(which) {
  const passo = getProductPageLimit();
  productPageState[which] = passo;
  applyProductPagination(which);
  const grid = productGridEl(which);
  if (grid && typeof grid.scrollIntoView === "function") {
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* Reajusta o lote ao girar o celular ou redimensionar a janela */
let _productPageBreakpoint = null;
function refreshProductPagination() {
  const bp = getProductPageLimit();
  if (bp === _productPageBreakpoint) return;
  _productPageBreakpoint = bp;
  applyProductPagination("studio");
  applyProductPagination("vid");
}
(function () {
  let t = null;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(refreshProductPagination, 150);
  });
  window.addEventListener("orientationchange", () => setTimeout(refreshProductPagination, 250));
})();

function renderStudioProducts() {
  resetProductPagination("studio");
  document.getElementById("studio-product-grid").innerHTML = allProducts().map((p, i) => productCard(p, true, i, "selectStudioProduct")).join("");
  reapplySelection("studio-product-grid", "studio");
  applyProductPagination("studio");
}

function renderVidProducts() {
  resetProductPagination("vid");
  document.getElementById("vid-product-grid").innerHTML = allProducts().map((p, i) => productCard(p, true, i, "selectVidProduct")).join("");
  reapplySelection("vid-product-grid", "vid");
  applyProductPagination("vid");
}

function reapplySelection(gridId, which) {
  const sel = which === "studio" ? selectedStudioProduct : selectedVidProduct;
  if (!sel) return;
  document.querySelectorAll(`#${gridId} .product-card`).forEach(c => {
    if (Number(c.dataset.id) === Number(sel.id)) c.classList.add("selected");
  });
}

function renderAvatarSelectGrid(containerId, clickFn, selectedAvatar) {
  const all = [ ...avatars, ...customAvatars.map((a, i) => ({
    ...a,
    id: a.id || `c${i}`,
    emoji: ICONS.star,
    grad: gradients[i % gradients.length]
  })) ];
  document.getElementById(containerId).innerHTML = all.map(a => `<div class="avatar-select-card ${selectedAvatar && selectedAvatar.id === a.id ? "selected" : ""}" onclick="${clickFn}('${a.id}',this,'${a.custom ? "custom" : "builtin"}')" role="option" tabindex="0" aria-label="${a.name}, ${a.nicho}" aria-selected="${selectedAvatar && selectedAvatar.id === a.id}">\n    <div class="avatar-select-emoji" aria-hidden="true">${a.emoji || ICONS.star}</div>\n    <div class="avatar-select-name">${a.name}</div>\n    <div class="avatar-select-nicho">${a.nicho || a.niche || "—"}</div>\n  </div>`).join("");
}

function renderStudioAvatars() {
  renderAvatarSelectGrid("studio-avatar-grid", "selectStudioAvatar", selectedStudioAvatar);
}

function renderVidAvatars() {
  renderAvatarSelectGrid("vid-avatar-grid", "selectVidAvatar", selectedVidAvatar);
}

function renderAvatars(filter = "all") {
  let list = avatars;
  if (filter === "custom") list = []; else if (filter !== "all") list = avatars.filter(a => a.gender === filter);
  document.getElementById("avatar-grid").innerHTML = list.map((a, i) => `<div class="avatar-card" data-gender="${a.gender}" role="listitem">\n    <div class="avatar-img ${a.grad}" aria-hidden="true">${a.emoji}</div>\n    <div class="avatar-body">\n      <div class="avatar-name">${a.name}</div>\n      <div class="avatar-meta">${a.age} anos · ${a.nicho}</div>\n      <span class="avatar-badge">${a.style}</span>\n      <button class="use-btn" onclick="useAvatar(${a.id})"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Usar Avatar</button>\n    </div>\n  </div>`).join("");
  const sect = document.getElementById("custom-avatars-section");
  const grid = document.getElementById("custom-avatar-grid");
  if (customAvatars.length > 0 && (filter === "all" || filter === "custom")) {
    sect.style.display = "";
    grid.innerHTML = customAvatars.map((a, i) => {
      const grad = gradients[i % gradients.length];
      const sName = Sanitize.escapeHTML(a.name || "");
      const sNicho = Sanitize.escapeHTML(a.nicho || "—");
      const sStyle = Sanitize.escapeHTML(a.style || "Personalizado");
      return `<div class="avatar-card" role="listitem"><div class="avatar-img ${grad}" aria-hidden="true">${ICONS.star}</div><div class="avatar-body"><div class="avatar-name">${sName}</div><div class="avatar-meta">${a.age || "—"} anos · ${sNicho}</div><span class="avatar-badge">${sStyle}</span><button class="use-btn" onclick="useCustomAvatar(${i})"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Usar</button><button class="delete-btn" onclick="deleteCustomAvatar(${i})" aria-label="Excluir avatar" title="Excluir avatar"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></button></div></div>`;
    }).join("");
  } else if (filter === "custom" && customAvatars.length === 0) {
    sect.style.display = "";
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><p>Nenhum avatar salvo ainda. Crie um abaixo!</p></div>`;
  } else {
    sect.style.display = "none";
  }
}

function renderStudioOptions() {
  document.getElementById("camera-opts").innerHTML = cameras.map(c => `<div class="option-card ${c.id === selectedCamera ? "selected" : ""}" onclick="selectCamera('${c.id}',this)" role="button" tabindex="0" aria-pressed="${c.id === selectedCamera}"><div class="opt-icon"><svg viewBox="0 0 24 24"><path d="${c.iconPath}"/></svg></div><span>${c.label}</span></div>`).join("");
  document.getElementById("style-opts").innerHTML = styles.map(s => `<div class="option-card ${s.id === selectedStyle ? "selected" : ""}" onclick="selectStyle('${s.id}',this)" role="button" tabindex="0" aria-pressed="${s.id === selectedStyle}"><div class="opt-icon"><svg viewBox="0 0 24 24"><path d="${s.iconPath}"/></svg></div><span>${s.label}</span><span class="opt-label">${s.sub}</span></div>`).join("");
  document.getElementById("mode-opts").innerHTML = modes.map(m => `<div class="option-card ${m.id === selectedMode ? "selected" : ""}" onclick="selectMode('${m.id}',this)" role="button" tabindex="0" aria-pressed="${m.id === selectedMode}"><div class="opt-icon"><svg viewBox="0 0 24 24"><path d="${m.iconPath}"/></svg></div><span>${m.label}</span></div>`).join("");
  document.getElementById("improve-opts").innerHTML = improvements.map(imp => `<div class="improve-chip ${selectedImprovements.has(imp) ? "selected" : ""}" onclick="toggleImprovement('${imp}',this)" role="checkbox" tabindex="0" aria-checked="${selectedImprovements.has(imp)}"><div class="check-dot" aria-hidden="true"></div>${imp}</div>`).join("");
  document.getElementById("vid-improve-opts").innerHTML = vidImprovements.map(imp => `<div class="improve-chip ${selectedVidImprovements.has(imp) ? "selected" : ""}" onclick="toggleVidImprovement('${imp}',this)" role="checkbox" tabindex="0" aria-checked="${selectedVidImprovements.has(imp)}"><div class="check-dot" aria-hidden="true"></div>${imp}</div>`).join("");
}

function renderBgOptions() {
  document.getElementById("bg-opts").innerHTML = backgrounds.map(bg => `<div class="bg-card ${bg.id === selectedBg ? "selected" : ""}" onclick="selectBg('${bg.id}',this)" role="radio" tabindex="0" aria-checked="${bg.id === selectedBg}" aria-label="${bg.label}"><div class="bg-preview" style="background:${bg.css}" aria-hidden="true"></div><div class="bg-card-label">${bg.label}</div></div>`).join("");
}

function renderRoteiroUI() {
  document.getElementById("roteiro-type-grid").innerHTML = roteiroTypes.map(r => `<div class="option-card ${selectedRoteiroType === r.id ? "selected" : ""}" onclick="selectRoteiroType('${r.id}',this)" role="radio" tabindex="0" aria-checked="${selectedRoteiroType === r.id}" style="padding:10px;gap:4px"><span style="font-size:12.5px;font-weight:700">${r.label}</span></div>`).join("");
  document.getElementById("hook-presets").innerHTML = hookPresets.map(p => `<span class="roteiro-preset" onclick="applyPreset('rot-hook',this)" role="button" tabindex="0">${p}</span>`).join("");
  document.getElementById("reveal-presets").innerHTML = revealPresets.map(p => `<span class="roteiro-preset" onclick="applyPreset('rot-reveal',this)" role="button" tabindex="0">${p}</span>`).join("");
  document.getElementById("cta-presets").innerHTML = ctaPresets.map(p => `<span class="roteiro-preset" onclick="applyPreset('rot-cta',this)" role="button" tabindex="0">${p}</span>`).join("");
  document.getElementById("roteiro-tom-chips").innerHTML = tomOptions.map(t => `<span class="dur-chip ${t === selectedTom ? "active" : ""}" onclick="selectTom('${t}',this)" role="radio" tabindex="0" aria-checked="${t === selectedTom}">${t}</span>`).join("");
}

const TABS = [ "mining", "library", "studio", "video", "influencer", "settings" ];

function switchTab(tab, el) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-item,.sidebar-item").forEach(n => n.classList.remove("active"));
  const tabEl = document.getElementById(`tab-${tab}`);
  if (tabEl) tabEl.classList.add("active");
  document.querySelectorAll(`[onclick*="switchTab('${tab}"]`).forEach(n => n.classList.add("active"));
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function toggleAccordion(btn) {
  document.querySelectorAll(".accordion-btn.open").forEach(b => {
    if (b !== btn) {
      b.classList.remove("open");
      b.nextElementSibling.classList.remove("open");
      b.setAttribute("aria-expanded", "false");
    }
  });
  const isOpen = btn.classList.toggle("open");
  btn.nextElementSibling.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", isOpen);
}

function updateImgStepGate() {
  document.querySelectorAll("#img-stepper .step-item").forEach(item => {
    const n = Number(item.dataset.step);
    const unlocked = n <= maxImgStepReached;
    item.classList.toggle("locked", !unlocked);
    item.classList.toggle("completed", n < currentStep && unlocked);
    item.setAttribute("aria-selected", n === currentStep);
  });
  const s1n = document.getElementById("img-step1-next");
  if (s1n) s1n.disabled = !selectedStudioProduct;
  const s2n = document.getElementById("img-step2-next");
  if (s2n) s2n.disabled = !selectedStudioAvatar;
}

function goStep(n) {
  if (n > maxImgStepReached && n === currentStep + 1) maxImgStepReached = n;
  if (n > maxImgStepReached) {
    showToast("Complete a etapa atual primeiro");
    return;
  }
  if (n === 2 && !selectedStudioProduct) {
    showToast("Selecione um produto primeiro");
    return;
  }
  if (n >= 3 && !selectedStudioAvatar) {
    showToast("Selecione um avatar primeiro");
    return;
  }
  currentStep = n;
  document.querySelectorAll(".step-panel").forEach((p, i) => p.classList.toggle("active", i + 1 === n));
  document.querySelectorAll("#img-stepper .step-item").forEach((s, i) => s.classList.toggle("active", i + 1 === n));
  if (n === 2) {
    renderStudioAvatars();
    if (selectedStudioAvatar) setTimeout(() => showAvatarPreview(selectedStudioAvatar, "studio-avatar-grid"), 50);
  }
  if (n === 5) renderImgSummary();
  updateImgStepGate();
  updateStepperProgress(5, n, "img-step-progress");
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function updateVidStepGate() {
  document.querySelectorAll("#vid-stepper .vid-step-item").forEach(item => {
    const n = Number(item.dataset.step);
    const unlocked = n <= maxVidStepReached;
    item.classList.toggle("locked", !unlocked);
    item.classList.toggle("completed", n < currentVidStep && unlocked);
  });
  const s1n = document.getElementById("vid-step1-next");
  if (s1n) s1n.disabled = !selectedVidProduct;
  const s2n = document.getElementById("vid-step2-next");
  if (s2n) s2n.disabled = !selectedVidAvatar;
}

function goVidStep(n) {
  if (n > maxVidStepReached && n === currentVidStep + 1) maxVidStepReached = n;
  if (n > maxVidStepReached) {
    showToast("Complete a etapa atual primeiro");
    return;
  }
  if (n === 2 && !selectedVidProduct) {
    showToast("Selecione um produto primeiro");
    return;
  }
  if (n >= 3 && !selectedVidAvatar) {
    showToast("Selecione um avatar primeiro");
    return;
  }
  currentVidStep = n;
  document.querySelectorAll(".vid-step-panel").forEach((p, i) => p.classList.toggle("active", i + 1 === n));
  document.querySelectorAll("#vid-stepper .vid-step-item").forEach((s, i) => s.classList.toggle("active", i + 1 === n));
  if (n === 2) {
    renderVidAvatars();
    if (selectedVidAvatar) setTimeout(() => showAvatarPreview(selectedVidAvatar, "vid-avatar-grid"), 50);
  }
  if (n === 5) renderVidSummary();
  updateVidStepGate();
  updateStepperProgress(5, n, "vid-step-progress");
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderImgSummary() {
  const p = selectedStudioProduct, a = selectedStudioAvatar, bg = backgrounds.find(b => b.id === selectedBg);
  const items = [ {
    l: "Produto",
    v: p ? p.name : "—"
  }, {
    l: "Avatar",
    v: a ? a.name : "—"
  }, {
    l: "Background",
    v: bg ? bg.label : "—"
  }, {
    l: "Câmera",
    v: cameras.find(c => c.id === selectedCamera)?.label || "—"
  } ];
  document.getElementById("img-config-summary").innerHTML = items.map(i => `<div class="selected-bar"><div class="selected-bar-dot" aria-hidden="true"></div><span class="selected-bar-label">${i.l}:</span><span class="selected-bar-value">${i.v}</span></div>`).join("");
}

function renderVidSummary() {
  const p = selectedVidProduct, a = selectedVidAvatar;
  const items = [ {
    l: "Produto",
    v: p ? p.name : "—"
  }, {
    l: "Avatar",
    v: a ? a.name : "—"
  }, {
    l: "Duração",
    v: selectedDuration
  }, {
    l: "Tom",
    v: selectedTom
  } ];
  document.getElementById("vid-config-summary").innerHTML = items.map(i => `<div class="selected-bar" style="border-color:rgba(168,85,247,0.22);background:linear-gradient(135deg,rgba(168,85,247,0.07),rgba(139,92,246,0.07))"><div class="selected-bar-dot" style="background:var(--accent2)" aria-hidden="true"></div><span class="selected-bar-label">${i.l}:</span><span class="selected-bar-value">${i.v}</span></div>`).join("");
}

function selectCamera(id, el) {
  selectedCamera = id;
  document.querySelectorAll("#camera-opts .option-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-pressed", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-pressed", "true");
}

function selectStyle(id, el) {
  selectedStyle = id;
  document.querySelectorAll("#style-opts .option-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-pressed", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-pressed", "true");
}

function selectMode(id, el) {
  selectedMode = id;
  document.querySelectorAll("#mode-opts .option-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-pressed", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-pressed", "true");
}

function toggleImprovement(imp, el) {
  selectedImprovements.has(imp) ? selectedImprovements.delete(imp) : selectedImprovements.add(imp);
  el.classList.toggle("selected");
  el.setAttribute("aria-checked", el.classList.contains("selected"));
}

function toggleVidImprovement(imp, el) {
  selectedVidImprovements.has(imp) ? selectedVidImprovements.delete(imp) : selectedVidImprovements.add(imp);
  el.classList.toggle("selected");
  el.setAttribute("aria-checked", el.classList.contains("selected"));
}

function selectBg(id, el) {
  selectedBg = id;
  document.querySelectorAll(".bg-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-checked", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-checked", "true");
}

function selectTom(t, el) {
  selectedTom = t;
  document.querySelectorAll("#roteiro-tom-chips .dur-chip").forEach(c => {
    c.classList.remove("active");
    c.setAttribute("aria-checked", "false");
  });
  el.classList.add("active");
  el.setAttribute("aria-checked", "true");
}

function selectRoteiroType(id, el) {
  selectedRoteiroType = id;
  document.querySelectorAll("#roteiro-type-grid .option-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-checked", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-checked", "true");
  const type = roteiroTypes.find(r => r.id === id);
  if (type) {
    document.getElementById("rot-hook").value = type.hook;
    document.getElementById("rot-reveal").value = type.reveal;
    document.getElementById("rot-cta").value = type.cta;
  }
}

function applyPreset(fieldId, el) {
  document.getElementById(fieldId).value = el.textContent.trim();
}

function selectStudioProduct(id, el) {
  selectedStudioProduct = allProducts().find(p => String(p.id) === String(id));
  document.querySelectorAll("#studio-product-grid .product-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedStudioAvatar = null;
  maxImgStepReached = Math.max(maxImgStepReached, 2);
  updateImgStepGate();
}

function selectVidProduct(id, el) {
  selectedVidProduct = allProducts().find(p => String(p.id) === String(id));
  document.querySelectorAll("#vid-product-grid .product-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedVidAvatar = null;
  maxVidStepReached = Math.max(maxVidStepReached, 2);
  updateVidStepGate();
}

function selectStudioAvatar(id, el, type) {
  if (type === "custom") {
    const idx = customAvatars.findIndex(a => a.id == id);
    selectedStudioAvatar = idx >= 0 ? {
      ...customAvatars[idx],
      isCustom: true
    } : null;
  } else {
    selectedStudioAvatar = avatars.find(a => a.id == id);
  }
  document.querySelectorAll("#studio-avatar-grid .avatar-select-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-selected", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-selected", "true");
  maxImgStepReached = Math.max(maxImgStepReached, 3);
  updateImgStepGate();
  if (selectedStudioAvatar) showAvatarPreview(selectedStudioAvatar, "studio-avatar-grid");
}

function selectVidAvatar(id, el, type) {
  if (type === "custom") {
    const idx = customAvatars.findIndex(a => a.id == id);
    selectedVidAvatar = idx >= 0 ? {
      ...customAvatars[idx],
      isCustom: true
    } : null;
  } else {
    selectedVidAvatar = avatars.find(a => a.id == id);
  }
  document.querySelectorAll("#vid-avatar-grid .avatar-select-card").forEach(c => {
    c.classList.remove("selected");
    c.setAttribute("aria-selected", "false");
  });
  el.classList.add("selected");
  el.setAttribute("aria-selected", "true");
  maxVidStepReached = Math.max(maxVidStepReached, 3);
  updateVidStepGate();
  if (selectedVidAvatar) showAvatarPreview(selectedVidAvatar, "vid-avatar-grid");
}

function useAvatar(id) {
  const av = avatars.find(a => a.id === id);
  selectedStudioAvatar = av;
  maxImgStepReached = Math.max(maxImgStepReached, 3);
  switchTab("studio", null);
  setTimeout(() => {
    selectedStudioProduct ? goStep(2) : (showToast("Selecione um produto primeiro!"), 
    goStep(1));
  }, 100);
  showToast(`Avatar ${av.name} selecionado!`);
}

function useCustomAvatar(idx) {
  const av = customAvatars[idx];
  selectedStudioAvatar = {
    ...av,
    isCustom: true
  };
  maxImgStepReached = Math.max(maxImgStepReached, 3);
  switchTab("studio", null);
  setTimeout(() => {
    selectedStudioProduct ? goStep(2) : (showToast("Selecione um produto primeiro!"), 
    goStep(1));
  }, 100);
  showToast(`Avatar "${av.name}" selecionado!`);
}

function deleteCustomAvatar(idx) {
  const name = customAvatars[idx].name;
  showConfirm(`Excluir o avatar "${name}"?`, () => {
    customAvatars.splice(idx, 1);
    safeSet(AVATARS_KEY, customAvatars);
    renderAvatars("custom");
    showToast(`Avatar "${name}" removido.`);
  });
}

function filterStudioProducts() {
  const q = document.getElementById("studio-search").value.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll("#studio-product-grid .product-card").forEach(card => {
    const show = card.querySelector(".card-name").textContent.toLowerCase().includes(q);
    card.style.display = show ? "" : "none";
    if (q) card.classList.remove("page-hidden");
    if (show) visible++;
  });
  document.getElementById("studio-empty").style.display = visible === 0 ? "block" : "none";
  if (q) {
    const btn = document.getElementById("studio-more-btn");
    const less = document.getElementById("studio-less-btn");
    const row = document.getElementById("studio-more-row");
    if (btn) btn.style.display = "none";
    if (less) less.style.display = "none";
    if (row) row.style.display = "none";
  } else {
    applyProductPagination("studio");
  }
}

function filterVidProducts() {
  const q = document.getElementById("vid-studio-search").value.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll("#vid-product-grid .product-card").forEach(card => {
    const show = card.querySelector(".card-name").textContent.toLowerCase().includes(q);
    card.style.display = show ? "" : "none";
    if (q) card.classList.remove("page-hidden");
    if (show) visible++;
  });
  document.getElementById("vid-studio-empty").style.display = visible === 0 ? "block" : "none";
  if (q) {
    const btn = document.getElementById("vid-more-btn");
    const less = document.getElementById("vid-less-btn");
    const row = document.getElementById("vid-more-row");
    if (btn) btn.style.display = "none";
    if (less) less.style.display = "none";
    if (row) row.style.display = "none";
  } else {
    applyProductPagination("vid");
  }
}

function selectDur(el) {
  document.querySelectorAll(".dur-chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  selectedDuration = el.textContent.trim();
}

function setupFilters(filterId, attr, gridSelector, cardSelector) {
  document.querySelectorAll(`#${filterId} .filter-chip`).forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(`#${filterId} .filter-chip`).forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const val = chip.dataset[attr];
      document.querySelectorAll(`${gridSelector} ${cardSelector}`).forEach(card => {
        const cardVal = card.dataset[attr];
        card.style.display = val === "all" || cardVal === val ? "" : "none";
      });
    });
  });
}

function autoFillRoteiro() {
  const prod = selectedVidProduct ? selectedVidProduct.name : "produto";
  const type = selectedRoteiroType ? roteiroTypes.find(r => r.id === selectedRoteiroType) : null;
  if (type) {
    document.getElementById("rot-hook").value = type.hook.replace("X", prod);
    document.getElementById("rot-reveal").value = type.reveal.replace("X", prod);
    document.getElementById("rot-cta").value = type.cta;
  } else {
    document.getElementById("rot-hook").value = `Você já ouviu falar em "${prod}"?`;
    document.getElementById("rot-reveal").value = `Testei por 30 dias e o resultado me surpreendeu. Olha o antes e depois...`;
    document.getElementById("rot-cta").value = "Link na bio com desconto! Corre que é por tempo limitado.";
  }
  showToast("Roteiro preenchido!");
}

function generateImagePrompt() {
  const prod = selectedStudioProduct?.name || "produto de beleza";
  const prodPrompt = selectedStudioProduct?.prompt || "";
  const avatar = selectedStudioAvatar || {
    name: "Luna Ferreira",
    age: 24,
    nicho: "Beleza",
    style: "Minimalista",
    gender: "f"
  };
  const cam = cameras.find(c => c.id === selectedCamera)?.label || selectedCamera;
  const sty = styles.find(s => s.id === selectedStyle)?.label || selectedStyle;
  const mod = modes.find(m => m.id === selectedMode)?.label || selectedMode;
  const energy = document.getElementById("energy-range").value;
  const imps = Array.from(selectedImprovements).join(", ");
  const bg = backgrounds.find(b => b.id === selectedBg);
  const bgCustom = document.getElementById("bg-custom-input").value.trim();
  const bgDesc = bgCustom || (bg ? bg.desc : "clean white studio background");
  const loading = document.getElementById("ai-loading");
  const btn = document.getElementById("gen-img-btn");
  loading.classList.add("visible");
  btn.disabled = true;
  const avatarPersonalidade = avatar.personalidade && avatar.personalidade !== "—" ? `\nPersonality: ${avatar.personalidade}.` : "";
  const avatarConteudo = avatar.conteudo && avatar.conteudo !== "—" ? `\nContent type: ${avatar.conteudo}.` : "";
  const avatarDesc = avatar.desc ? `\nPhysical/voice details: ${avatar.desc}.` : "";
  const result = `MAIN PROMPT:\nUltra-realistic product photography, 8K UHD, energy ${energy}/10.\n${avatar.name}, ${avatar.age}-year-old ${avatar.gender === "f" ? "female" : avatar.gender === "m" ? "male" : "non-binary"} influencer (${avatar.nicho}, ${avatar.style} style).${avatarPersonalidade}${avatarConteudo}${avatarDesc}\n${mod} the product: "${prod}".${prodPrompt ? `\nProduct visual: ${prodPrompt}.` : ""}\nBackground: ${bgDesc}.\nCamera: ${cam}. Content style: ${sty}. Enhancements: ${imps}.\nVertical 9:16, editorial, soft bokeh, sharp product focus, vibrant colors.\n\nNEGATIVE PROMPT:\nblurry, low quality, watermark, distorted hands, text overlay, logo, deformed fingers\n\nHASHTAGS:\n#${prod.replace(/\s/g, "")} #tiktokviral #produtosviral #linkbio #tendencia`;
  document.getElementById("prompt-output").value = result;
  savePrompt("imagem", result);
  document.getElementById("prompt-output-stats").style.display = "flex";
  updatePromptStats("prompt-output", "prompt-output-stats");
  showToast("Prompt de imagem gerado!");
  if (document.getElementById("toggle-autocopy")?.classList.contains("on")) {
    copyOutput("prompt-output");
  }
  loading.classList.remove("visible");
  btn.disabled = false;
}

function generateVideoPrompt() {
  const prod = selectedVidProduct?.name || "produto de beleza";
  const prodPrompt = selectedVidProduct?.prompt || "";
  const avatar = selectedVidAvatar || {
    name: "Luna Ferreira",
    age: 24,
    nicho: "Beleza",
    style: "Minimalista",
    gender: "f"
  };
  const vidFormat = document.getElementById("vid-format").value;
  const vidStyle = document.getElementById("vid-style").value;
  const vidQuality = document.getElementById("vid-quality").value;
  const vidLighting = document.getElementById("vid-lighting").value;
  const vidAudio = document.getElementById("vid-audio").value;
  const vidImps = Array.from(selectedVidImprovements).join(", ");
  const rotHook = document.getElementById("rot-hook").value.trim();
  const rotReveal = document.getElementById("rot-reveal").value.trim();
  const rotCta = document.getElementById("rot-cta").value.trim();
  const loading = document.getElementById("vid-ai-loading");
  const btn = document.getElementById("gen-vid-btn");
  loading.classList.add("visible");
  btn.disabled = true;
  const scriptSection = rotHook || rotReveal || rotCta ? `\n\nSCRIPT (${selectedTom} tone):\n- Hook (0-3s): "${rotHook || "—"}"\n- Reveal (3-20s): "${rotReveal || "—"}"\n- CTA: "${rotCta || "—"}"` : "";
  const avatarPersonalidade = avatar.personalidade && avatar.personalidade !== "—" ? `\nPersonality: ${avatar.personalidade}.` : "";
  const avatarConteudo = avatar.conteudo && avatar.conteudo !== "—" ? `\nContent type: ${avatar.conteudo}.` : "";
  const avatarDesc = avatar.desc ? `\nPhysical/voice details: ${avatar.desc}.` : "";
  const avatarStyle = avatar.style ? `, ${avatar.style} style` : "";
  const result = `MAIN PROMPT:\nCinematic ${vidQuality} vertical video, ${selectedDuration}, 9:16.\n${avatar.name}, ${avatar.age}-year-old ${avatar.gender === "f" ? "female" : avatar.gender === "m" ? "male" : "non-binary"} influencer (${avatar.nicho}${avatarStyle}).${avatarPersonalidade}${avatarConteudo}${avatarDesc}\nPresenting: "${prod}".${prodPrompt ? `\nProduct visual: ${prodPrompt}.` : ""}\nFormat: ${vidFormat}. Style: ${vidStyle}. Lighting: ${vidLighting}. Audio: ${vidAudio}.\nEnhancements: ${vidImps}.${scriptSection}\nSmooth camera movements, natural expressions, dynamic transitions.\n\nNEGATIVE PROMPT:\nblurry, shaky, low quality, watermark, distorted faces, bad lighting\n\nHASHTAGS:\n#${prod.replace(/\s/g, "")} #tiktokviral #produtosviral #linkbio #tendencia`;
  document.getElementById("vid-prompt-output").value = result;
  savePrompt("video", result);
  document.getElementById("vid-prompt-output-stats").style.display = "flex";
  updatePromptStats("vid-prompt-output", "vid-prompt-output-stats");
  showToast("Prompt de vídeo gerado!");
  if (document.getElementById("toggle-autocopy")?.classList.contains("on")) {
    copyOutput("vid-prompt-output");
  }
  loading.classList.remove("visible");
  btn.disabled = false;
}

function generateAvatarPromptAI() {
  const nome = document.getElementById("av-nome").value.trim() || "Avatar";
  const idade = document.getElementById("av-idade").value || "25";
  const genero = document.getElementById("av-genero").value;
  const estilos = [ ...document.querySelectorAll("#av-estilo .form-chip.selected") ].map(c => c.textContent).join(", ") || "—";
  const nichos = [ ...document.querySelectorAll("#av-nicho .form-chip.selected") ].map(c => c.textContent).join(", ") || "—";
  const personalidades = [ ...document.querySelectorAll("#av-personalidade .form-chip.selected") ].map(c => c.textContent).join(", ") || "—";
  const conteudos = [ ...document.querySelectorAll("#av-conteudo .form-chip.selected") ].map(c => c.textContent).join(", ") || "—";
  const desc = document.getElementById("av-desc").value.trim();
  const loading = document.getElementById("avatar-ai-loading");
  loading.classList.add("visible");
  const extraLine = desc ? `\nExtra details: ${desc}` : "";
  const result = `${idade}-year-old ${genero.toLowerCase()} digital influencer named ${nome}.\nStyle: ${estilos}. Niche: ${nichos}. Personality: ${personalidades}. Content: ${conteudos}.${extraLine}\nWearing trendy outfit matching ${estilos} aesthetic, confident engaging expression, looking at camera.\nProfessional portrait, soft studio lighting, sharp focus, 8K, vertical 9:16.\n\nHandles sugeridos:\n@${nome.toLowerCase().replace(/\s/g, "")}.oficial\n@sou.${nome.toLowerCase().replace(/\s/g, "")}\n@${nome.toLowerCase().replace(/\s/g, "")}creates`;
  document.getElementById("avatar-prompt-output").value = result;
  showToast("Prompt de avatar gerado!");
  loading.classList.remove("visible");
}

function saveGeneratedAvatar() {
  const nome = document.getElementById("av-nome").value.trim();
  if (!nome) {
    showToast("Informe o nome do avatar!");
    document.getElementById("av-nome").focus();
    return;
  }
  const idade = document.getElementById("av-idade").value || "25";
  const generoRaw = document.getElementById("av-genero").value;
  const gender = generoRaw === "Feminino" ? "f" : generoRaw === "Masculino" ? "m" : "nb";
  const estilos = [ ...document.querySelectorAll("#av-estilo .form-chip.selected") ].map(c => c.textContent).join(", ");
  const nichos = [ ...document.querySelectorAll("#av-nicho .form-chip.selected") ].map(c => c.textContent).join(", ");
  const personalidades = [ ...document.querySelectorAll("#av-personalidade .form-chip.selected") ].map(c => c.textContent).join(", ");
  const conteudos = [ ...document.querySelectorAll("#av-conteudo .form-chip.selected") ].map(c => c.textContent).join(", ");
  const desc = Sanitize.sanitizeInput(document.getElementById("av-desc").value, 400);
  const prompt = document.getElementById("avatar-prompt-output").value.trim();
  const newAvatar = {
    id: Date.now(),
    name: nome,
    age: idade,
    gender: gender,
    genero: generoRaw,
    nicho: nichos || "—",
    style: estilos || "Personalizado",
    personalidade: personalidades || "—",
    conteudo: conteudos || "—",
    desc: desc,
    prompt: prompt,
    custom: true
  };
  customAvatars.push(newAvatar);
  safeSet(AVATARS_KEY, customAvatars);
  showToast(`Avatar "${nome}" salvo com sucesso!`);
  renderAvatars("all");
}

function toggleChip(el) {
  el.classList.toggle("selected");
}

function toggleSwitch(el) {
  const on = el.classList.toggle("on");
  el.setAttribute("aria-checked", on);
}

function toggleSwitchKey(e, el) {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    toggleSwitch(el);
  }
}

function applyThemeClass(themeName) {
  document.body.classList.remove("theme-light");
  if (themeName === "light") document.body.classList.add("theme-light");
  try {
    localStorage.setItem("nex-theme", themeName);
  } catch (e) {}
  syncThemeSelectorUI(themeName);
}

function syncThemeSelectorUI(themeName) {
  document.querySelectorAll(".theme-opt").forEach(t => t.classList.remove("selected"));
  const map = {
    dark: ".theme-opt.theme-dark",
    light: ".theme-opt.theme-light"
  };
  document.querySelector(map[themeName] || map.dark)?.classList.add("selected");
}

function getCurrentTheme() {
  if (document.body.classList.contains("theme-light")) return "light";
  return "dark";
}

function runThemeVeil() {
  const veil = document.getElementById("theme-veil");
  if (!veil) return;
  veil.classList.remove("animating");
  void veil.offsetWidth;
  veil.classList.add("animating");
  setTimeout(() => veil.classList.remove("animating"), 420);
}

function selectTheme(el) {
  const themeName = el.classList.contains("theme-light") ? "light" : "dark";
  runThemeVeil();
  applyThemeClass(themeName);
  showToast("Tema aplicado!");
}

function toggleQuickTheme(btn) {
  const current = getCurrentTheme();
  const next = current === "light" ? "dark" : "light";
  runThemeVeil();
  applyThemeClass(next);
  if (btn) {
    btn.classList.remove("pulsing");
    void btn.offsetWidth;
    btn.classList.add("pulsing");
  }
  showToast(next === "light" ? "Modo claro ativado" : "Modo escuro ativado");
}

function showConfirm(msg, onConfirm) {
  let modal = document.getElementById("confirm-modal");
  if (!modal) return;
  document.getElementById("confirm-msg").textContent = msg;
  modal.classList.add("open");
  const yes = document.getElementById("confirm-yes");
  const no = document.getElementById("confirm-no");
  const close = () => modal.classList.remove("open");
  const handleYes = () => {
    close();
    yes.removeEventListener("click", handleYes);
    no.removeEventListener("click", close);
    onConfirm();
  };
  yes.addEventListener("click", handleYes, {
    once: true
  });
  no.addEventListener("click", close, {
    once: true
  });
}

/* ====== CARD EXPLICATIVO DO BACKUP ====== */
function openBackupInfo() {
  const m = document.getElementById("backup-info-modal");
  if (m) m.classList.add("open");
}

function closeBackupInfo() {
  const m = document.getElementById("backup-info-modal");
  if (m) m.classList.remove("open");
}

/* ====== EXCLUIR TUDO (confirmacao digitando a palavra) ====== */
const DELETE_ALL_WORD = "excluir";

function openDeleteAllModal() {
  const m = document.getElementById("delete-all-modal");
  if (!m) return;
  const input = document.getElementById("delete-all-input");
  const hint = document.getElementById("delete-all-hint");
  const btn = document.getElementById("delete-all-confirm");
  if (input) { input.value = ""; input.classList.remove("match"); }
  if (hint) { hint.textContent = ""; hint.classList.remove("match"); }
  if (btn) btn.disabled = true;
  m.classList.add("open");
  setTimeout(() => input && input.focus(), 120);
}

function closeDeleteAllModal() {
  const m = document.getElementById("delete-all-modal");
  if (m) m.classList.remove("open");
}

function isDeleteAllConfirmed() {
  const input = document.getElementById("delete-all-input");
  return !!input && input.value.trim().toLowerCase() === DELETE_ALL_WORD;
}

function validateDeleteAll() {
  const input = document.getElementById("delete-all-input");
  const hint = document.getElementById("delete-all-hint");
  const btn = document.getElementById("delete-all-confirm");
  if (!input) return;
  const typed = input.value.trim();
  const ok = isDeleteAllConfirmed();
  input.classList.toggle("match", ok);
  if (btn) btn.disabled = !ok;
  if (hint) {
    hint.classList.toggle("match", ok);
    if (ok) hint.textContent = "Confirmado. O botão está liberado.";
    else if (!typed) hint.textContent = "";
    else hint.textContent = 'Digite exatamente a palavra "excluir".';
  }
}

function confirmDeleteAll() {
  if (!isDeleteAllConfirmed()) {
    showToast('Digite a palavra "excluir" para confirmar.');
    const input = document.getElementById("delete-all-input");
    if (input) input.focus();
    return;
  }
  closeDeleteAllModal();
  wipeAllData();
  showToast("Tudo foi excluído.");
}

/* Apaga os dados do app. Nao mexe na sessao nem no aceite dos termos. */
function wipeAllData() {
  try {
    localStorage.removeItem(FAV_KEY);
    localStorage.removeItem(AVATARS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(PROMPTS_KEY);
  } catch (e) {}
  favorites = {};
  customAvatars = [];
  customProducts = [];
  promptHistory = [];
  selectedStudioProduct = null;
  selectedVidProduct = null;
  selectedStudioAvatar = null;
  selectedVidAvatar = null;
  resetProductPagination("studio");
  resetProductPagination("vid");
  renderProducts();
  reapplyMiningFilter();
  renderVideos();
  renderStudioProducts();
  renderVidProducts();
  renderAvatars("all");
  if (typeof renderHistoryPanel === "function") renderHistoryPanel();
  if (typeof updateHistNotif === "function") updateHistNotif();
  const status = document.getElementById("backup-status");
  if (status) status.textContent = "";
}

function clearAllData() {
  showConfirm("Isso vai remover favoritos, produtos e avatares personalizados. Continuar?", () => {
    wipeAllData();
    showToast("Dados removidos com sucesso!");
  });
}

function copyOutput(id) {
  const el = document.getElementById(id);
  if (!el.value) {
    showToast("Nenhum conteúdo para copiar ainda.");
    return;
  }
  navigator.clipboard.writeText(el.value).then(() => showToast("Copiado para a área de transferência!")).catch(() => {
    el.select();
    try {
      document.execCommand("copy");
      showToast("Copiado!");
    } catch (e) {
      showToast("Erro ao copiar — selecione manualmente");
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeSearch();
    closeHistory();
    return;
  }
  if (e.key === "/" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
    openSearch();
    return;
  }
  if (e.key === "h" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA" && !e.ctrlKey && !e.metaKey) {
    openHistory();
    return;
  }
  if ((e.key === "t" || e.key === "T") && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA" && !e.ctrlKey && !e.metaKey) {
    toggleQuickTheme(document.getElementById("theme-toggle-btn"));
    return;
  }
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT" || e.ctrlKey || e.metaKey) return;
  const tabMap = {
    1: "mining",
    2: "library",
    3: "studio",
    4: "video",
    5: "influencer"
  };
  if (tabMap[e.key]) {
    switchTab(tabMap[e.key], null);
    return;
  }
  if (e.key === "c" || e.key === "C") {
    const activeTab = document.querySelector(".tab-content.active");
    if (activeTab?.id === "tab-studio") copyOutput("prompt-output"); else if (activeTab?.id === "tab-video") copyOutput("vid-prompt-output");
  }
});

function openHistory() {
  document.getElementById("history-panel").classList.add("open");
  document.getElementById("history-overlay-bg").classList.add("open");
  renderHistoryPanel();
}

function closeHistory() {
  document.getElementById("history-panel").classList.remove("open");
  document.getElementById("history-overlay-bg").classList.remove("open");
}

function renderHistoryPanel() {
  const list = document.getElementById("history-list");
  if (!promptHistory.length) {
    list.innerHTML = `<div class="history-empty"><svg viewBox="0 0 24 24"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4.5"/><polyline points="3 4 3 11 10 11"/></svg><p>Nenhum prompt gerado ainda.</p></div>`;
    return;
  }
  const typeLabel = {
    imagem: "Imagem",
    video: "Vídeo",
    avatar: "Avatar"
  };
  const typeClass = {
    imagem: "hist-img",
    video: "hist-video",
    avatar: "hist-avatar"
  };
  list.innerHTML = promptHistory.map((item, i) => {
    const date = new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    const preview = Sanitize.escapeHTML(item.content.replace(/\n/g, " ").slice(0, 120) + "...");
    return `<div class="history-item">\n      <div class="history-item-meta">\n        <span class="history-item-type ${typeClass[item.type] || "hist-img"}">${typeLabel[item.type] || item.type}</span>\n        <span class="history-item-date">${date}</span>\n      </div>\n      <div class="history-item-preview">${preview}</div>\n      <div class="history-item-actions">\n        <button class="hist-copy-btn" onclick="copyHistItem(${i})">\n          <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>\n          Copiar\n        </button>\n        <button class="hist-copy-btn" onclick="deleteHistItem(${i})" style="flex:0;padding:5px 9px">\n          <svg viewBox="0 0 24 24" style="stroke:#c084fc"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>\n        </button>\n      </div>\n    </div>`;
  }).join("");
}

function copyHistItem(i) {
  const item = promptHistory[i];
  if (!item) return;
  navigator.clipboard.writeText(item.content).then(() => showToast("Prompt copiado!")).catch(() => {});
}

function deleteHistItem(i) {
  promptHistory.splice(i, 1);
  safeSet(PROMPTS_KEY, promptHistory);
  renderHistoryPanel();
  updateHistNotif();
}

function updateHistNotif() {
  const dot = document.getElementById("hist-notif-dot");
  if (dot) dot.classList.toggle("visible", promptHistory.length > 0);
}

let searchFocusIdx = -1;

function openSearch() {
  document.getElementById("search-overlay").classList.add("open");
  setTimeout(() => document.getElementById("search-main-input").focus(), 50);
  renderSearchResults("");
}

function closeSearch() {
  document.getElementById("search-overlay").classList.remove("open");
  document.getElementById("search-main-input").value = "";
}

function renderSearchResults(q) {
  const container = document.getElementById("search-results");
  const ql = q.toLowerCase();
  let results = [];
  const navItems = [ {
    label: "Mineração Viral",
    cat: "Seção",
    icon: ICONS.home,
    tab: "mining"
  }, {
    label: "Biblioteca Viral",
    cat: "Seção",
    icon: ICONS.book,
    tab: "library"
  }, {
    label: "Estúdio IA — Imagem",
    cat: "Seção",
    icon: ICONS.image,
    tab: "studio"
  }, {
    label: "Estúdio IA — Vídeo",
    cat: "Seção",
    icon: ICONS.film,
    tab: "video"
  }, {
    label: "Avatar",
    cat: "Seção",
    icon: ICONS.user,
    tab: "influencer"
  }, {
    label: "Configurações",
    cat: "Seção",
    icon: ICONS.gear,
    tab: "settings"
  } ];
  navItems.filter(n => !ql || n.label.toLowerCase().includes(ql)).forEach(n => {
    results.push({
      type: "nav",
      label: n.label,
      sub: n.cat,
      icon: n.icon,
      action: `switchTab('${n.tab}',null);closeSearch()`
    });
  });
  allProducts().filter(p => !ql || p.name.toLowerCase().includes(ql)).slice(0, 5).forEach(p => {
    results.push({
      type: "product",
      label: p.name,
      sub: p.cat,
      icon: ICONS.box,
      action: `switchTab('studio',null);closeSearch();setTimeout(()=>{selectStudioProduct(${p.id},document.querySelector('[data-id="${p.id}"]'))},300)`
    });
  });
  avatars.filter(a => !ql || a.name.toLowerCase().includes(ql) || a.nicho.toLowerCase().includes(ql)).slice(0, 4).forEach(a => {
    results.push({
      type: "avatar",
      label: a.name,
      sub: a.nicho,
      icon: a.emoji,
      action: `switchTab('influencer',null);closeSearch()`
    });
  });
  if (!results.length) {
    container.innerHTML = `<div style="padding:22px;text-align:center;color:var(--text3);font-size:13px">Nenhum resultado para "<strong style="color:var(--text)">${q}</strong>"</div>`;
    return;
  }
  const typeClass = {
    nav: "sri-nav",
    product: "sri-product",
    avatar: "sri-avatar"
  };
  container.innerHTML = results.slice(0, 10).map((r, i) => `<div class="search-result-item" tabindex="0" onclick="${r.action}" onkeydown="if(event.key==='Enter'){${r.action}}">\n    <div class="search-result-icon ${typeClass[r.type] || ""}">${r.icon}</div>\n    <div><div class="search-result-name">${r.label}</div><div class="search-result-cat">${r.sub}</div></div>\n    <span class="search-result-badge">${r.type === "nav" ? "Seção" : r.type === "product" ? "Produto" : "Avatar"}</span>\n  </div>`).join("");
}

function updateStepperProgress(totalSteps, current, progressId) {
  const fill = document.getElementById(progressId);
  if (fill) fill.style.width = `${Math.round((current - 1) / (totalSteps - 1) * 100)}%`;
}

function showAvatarPreview(avatar, containerId) {
  const existing = document.getElementById(containerId + "-preview");
  if (existing) existing.remove();
  if (!avatar) return;
  const chip = document.createElement("div");
  chip.className = "avatar-preview-chip";
  chip.id = containerId + "-preview";
  chip.innerHTML = `<span class="avatar-preview-emoji">${avatar.emoji || ICONS.star}</span>\n    <div><div class="avatar-preview-name">${avatar.name}</div><div class="avatar-preview-nicho">${avatar.nicho || "—"}</div></div>\n    <button class="avatar-preview-clear" onclick="clearAvatarSelection('${containerId}')" aria-label="Remover avatar selecionado">${ICONS.close}</button>`;
  const target = document.getElementById(containerId);
  if (target) target.parentNode.insertBefore(chip, target);
}

function clearAvatarSelection(containerId) {
  const preview = document.getElementById(containerId + "-preview");
  if (preview) preview.remove();
  if (containerId === "studio-avatar-grid") {
    selectedStudioAvatar = null;
    document.querySelectorAll("#studio-avatar-grid .avatar-select-card").forEach(c => {
      c.classList.remove("selected");
      c.setAttribute("aria-selected", "false");
    });
    updateImgStepGate();
  } else {
    selectedVidAvatar = null;
    document.querySelectorAll("#vid-avatar-grid .avatar-select-card").forEach(c => {
      c.classList.remove("selected");
      c.setAttribute("aria-selected", "false");
    });
    updateVidStepGate();
  }
}

function updatePromptStats(textareaId, statsId) {
  const val = document.getElementById(textareaId)?.value || "";
  const words = val.trim().split(/\s+/).filter(w => w).length;
  const el = document.getElementById(statsId);
  if (el) el.innerHTML = `<span>Prompt gerado</span><span class="prompt-stats-words">${words} palavras</span>`;
}

function showSkeletons(containerId, count = 8) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = Array(count).fill(0).map(() => `<div class="skeleton-card"><div class="skeleton-img skeleton"></div><div class="skeleton-body"><div class="skeleton-line skeleton w80"></div><div class="skeleton-line skeleton w50"></div><div class="skeleton-line skeleton w30"></div></div></div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-product-modal")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeAddModal();
  });
  document.querySelectorAll("#avatar-filters .filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#avatar-filters .filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderAvatars(chip.dataset.gender);
    });
  });
  const inp = document.getElementById("search-main-input");
  if (inp) inp.addEventListener("input", e => renderSearchResults(e.target.value));
  document.getElementById("search-overlay")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeSearch();
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAddModal();
    closeBackupInfo();
    closeDeleteAllModal();
  }
});

/* Clicar fora do card fecha os modais de ajuda e de exclusao */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backup-info-modal")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeBackupInfo();
  });
  document.getElementById("delete-all-modal")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeDeleteAllModal();
  });
});

let productPageResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(productPageResizeTimer);
  productPageResizeTimer = setTimeout(() => {
    if (!document.getElementById("studio-search")?.value.trim()) applyProductPagination("studio");
    if (!document.getElementById("vid-studio-search")?.value.trim()) applyProductPagination("vid");
  }, 200);
});

(function init() {
  showSkeletons("product-grid", 8);
  showSkeletons("video-grid", 6);
  showSkeletons("studio-product-grid", 8);
  showSkeletons("vid-product-grid", 8);
  renderMiningStats();
  setTimeout(() => {
    renderProducts();
    renderVideos();
    renderStudioProducts();
    renderVidProducts();
  }, 420);
  renderAvatars("all");
  renderStudioOptions();
  renderBgOptions();
  renderRoteiroUI();
  setupFilters("mining-filters", "cat", "#product-grid", ".product-card");
  setupFilters("library-filters", "fmt", "#video-grid", ".video-card");
  updateImgStepGate();
  updateVidStepGate();
  updateHistNotif();
  try {
    const savedTheme = localStorage.getItem("nex-theme") || "dark";
    if (savedTheme === "light") document.body.classList.add("theme-light");
    syncThemeSelectorUI(savedTheme);
  } catch (e) {}
  if (window.innerWidth >= 900) {
    document.getElementById("header-plan").style.display = "block";
    document.getElementById("search-label-desk").style.display = "inline";
    document.getElementById("search-kbd").style.display = "inline";
    document.getElementById("hist-label").style.display = "inline";
    const cfgLabel = document.getElementById("settings-label");
    if (cfgLabel) cfgLabel.style.display = "inline";
  }
  const imgStepper = document.getElementById("img-stepper");
  const vidStepper = document.getElementById("vid-stepper");
  if (imgStepper) {
    const bar = document.createElement("div");
    bar.className = "stepper-progress";
    bar.innerHTML = '<div class="stepper-progress-fill" id="img-step-progress" style="width:0%"></div>';
    imgStepper.appendChild(bar);
  }
  if (vidStepper) {
    const bar = document.createElement("div");
    bar.className = "stepper-progress";
    bar.innerHTML = '<div class="stepper-progress-fill" id="vid-step-progress" style="width:0%"></div>';
    vidStepper.appendChild(bar);
  }
  updateStepperProgress(5, 1, "img-step-progress");
  updateStepperProgress(5, 1, "vid-step-progress");
  [ "prompt-output", "vid-prompt-output" ].forEach(id => {
    const ta = document.getElementById(id);
    if (ta) {
      const observer = new MutationObserver(() => updatePromptStats(id, id + "-stats"));
      observer.observe(ta, {
        characterData: true,
        subtree: true,
        childList: true
      });
    }
  });
})();
