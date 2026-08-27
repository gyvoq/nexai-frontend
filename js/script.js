const products = [ {
  id: 25,
  name: "Vitamina C Pó Efervescente",
  cat: "saude",
  img: "./img25.png",
  rank: 1,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "effervescent vitamin C powder tube orange packaging"
}, {
  id: 38,
  name: "Colágeno Hidrolisado Sabor Frutas",
  cat: "saude",
  img: "./img34.png",
  rank: 2,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "hydrolyzed collagen supplement pouch fruit flavor pastel packaging"
}, {
  id: 6,
  name: "Blush em Bastão Multiuso",
  cat: "beleza",
  img: "./img6.png",
  rank: 3,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "cream blush stick coral shade in sleek tube packaging"
}, {
  id: 39,
  name: "Protetor Solar Facial Toque Seco",
  cat: "beleza",
  img: "./img28.png",
  rank: 4,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "dry touch facial sunscreen tube matte finish minimal packaging"
}, {
  id: 34,
  name: "Suplemento Magnésio Dimalato",
  cat: "saude",
  img: "./img34.png",
  rank: 5,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "magnesium dimalate supplement bottle white and purple label"
}, {
  id: 13,
  name: "Colchonete Yoga Anti-slip",
  cat: "fitness",
  img: "./img13.png",
  rank: 6,
  grad: "grad-fitness",
  tag: "#fitness",
  prompt: "purple yoga mat anti-slip rolled up"
}, {
  id: 40,
  name: "Faixa Modeladora Pós-treino",
  cat: "fitness",
  img: "./img29.png",
  rank: 7,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "post workout compression waist band black breathable fabric"
}, {
  id: 21,
  name: "Creme Noturno Retinol",
  cat: "beleza",
  img: "./img21.png",
  rank: 8,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "retinol night cream glass jar dark packaging premium"
}, {
  id: 41,
  name: "Fone Bluetooth com Cancelamento Adaptativo",
  cat: "tech",
  img: "./img14.png",
  rank: 9,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "adaptive noise cancelling earbuds matte case premium tech"
}, {
  id: 28,
  name: "Kit Skincare Coreano 5 Passos",
  cat: "beleza",
  img: "./img28.png",
  rank: 10,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "5 step korean skincare kit pastel packaging set of bottles"
}, {
  id: 10,
  name: "Bolsa Baguete Couro Sintético",
  cat: "moda",
  img: "./img10.png",
  rank: 11,
  grad: "grad-moda",
  tag: "#moda",
  prompt: "baguette shoulder bag faux leather cream color gold hardware"
}, {
  id: 42,
  name: "Óculos Blue Light Anti-fadiga",
  cat: "moda",
  img: "./img4.png",
  rank: 12,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "blue light blocking glasses transparent frame minimal desk accessory"
}, {
  id: 23,
  name: "Mochila Runner Impermeável",
  cat: "fitness",
  img: "./img23.png",
  rank: 13,
  grad: "grad-fitness",
  tag: "#fitness",
  prompt: "waterproof running backpack compact black with reflective details"
}, {
  id: 30,
  name: "Carregador Magnético 3 em 1",
  cat: "tech",
  img: "./img30.png",
  rank: 14,
  grad: "grad-tech",
  tag: "#tech",
  prompt: "3 in 1 magnetic wireless charger white foldable stand"
}, {
  id: 27,
  name: "Luminária LED RGB Gamer",
  cat: "casa",
  img: "./img27.png",
  rank: 15,
  grad: "grad-casa",
  tag: "#casa",
  prompt: "RGB LED desk lamp gamer setup colorful glow"
}, {
  id: 43,
  name: "Organizador de Gavetas Modular",
  cat: "casa",
  img: "./img20.png",
  rank: 16,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "modular drawer organizer set clear plastic minimalist storage"
}, {
  id: 5,
  name: "Umidificador Portátil USB",
  cat: "casa",
  img: "./img5.png",
  rank: 17,
  grad: "grad-casa",
  tag: "#casa",
  prompt: "compact USB humidifier white with soft mist and LED light"
}, {
  id: 32,
  name: "Difusor Aromaterapia Bluetooth",
  cat: "casa",
  img: "./img32.png",
  rank: 18,
  grad: "grad-casa",
  tag: "#casa",
  prompt: "ceramic aromatherapy diffuser with bluetooth speaker soft glow"
}, {
  id: 33,
  name: "Óleo Capilar Reparador",
  cat: "beleza",
  img: "./img33.png",
  rank: 19,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "hair repair oil small glass bottle dropper packaging"
}, {
  id: 37,
  name: "Mini Projetor Portátil LED",
  cat: "tech",
  img: "./img24.png",
  rank: 20,
  grad: "grad-tech",
  tag: "#tech",
  prompt: "compact portable LED projector white mini home cinema device"
}, {
  id: 7,
  name: "Creatina Monohidratada 300g",
  cat: "saude",
  img: "./img7.png",
  rank: 21,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "creatine monohydrate powder tub white and blue label 300g"
}, {
  id: 26,
  name: "Óculos de Sol Polarizado Esportivo",
  cat: "moda",
  img: "./img26.png",
  rank: 22,
  grad: "grad-moda",
  tag: "#moda",
  prompt: "sporty polarized wraparound sunglasses black rubber frame"
}, {
  id: 1,
  name: "Sérum Bifásico Niacinamida",
  cat: "beleza",
  img: "./img1.png",
  rank: 23,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "dual-phase serum bottle clear and orange layers, niacinamide skincare packaging"
}, {
  id: 36,
  name: "Squeeze Térmico Motivacional 1L",
  cat: "fitness",
  img: "./img13.png",
  rank: 24,
  grad: "grad-fitness",
  tag: "#fitness",
  prompt: "motivational time-marked water bottle 1L matte pastel colors"
}, {
  id: 19,
  name: "Tênis Plataforma Chunky",
  cat: "moda",
  img: "./img19.png",
  rank: 25,
  grad: "grad-moda",
  tag: "#moda",
  prompt: "chunky platform sneaker white thick sole streetwear"
}, {
  id: 3,
  name: "Legging Térmica Yoga",
  cat: "fitness",
  img: "./img3.png",
  rank: 26,
  grad: "grad-fitness",
  tag: "#fitness",
  prompt: "thermal fleece lined leggings black athletic wear folded"
}, {
  id: 35,
  name: "Escova Secadora Alisadora Iônica",
  cat: "beleza",
  img: "./img15.png",
  rank: 27,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "ionic hot air brush styler pink and rose gold packaging"
}, {
  id: 31,
  name: "Bolsa Transversal Utilitária",
  cat: "moda",
  img: "./img31.png",
  rank: 28,
  grad: "grad-moda",
  tag: "#moda",
  prompt: "utility crossbody bag nylon black multiple pockets"
}, {
  id: 22,
  name: "Ômega 3 EPA DHA Premium",
  cat: "saude",
  img: "./img22.png",
  rank: 29,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "omega 3 supplement amber glass bottle 60 softgels"
}, {
  id: 24,
  name: "Teclado Mecânico RGB",
  cat: "tech",
  img: "./img24.png",
  rank: 30,
  grad: "grad-tech",
  tag: "#tech",
  prompt: "mechanical keyboard RGB backlit compact 65 percent layout"
}, {
  id: 9,
  name: "Fone Bluetooth Open-Ear",
  cat: "tech",
  img: "./img9.png",
  rank: 31,
  grad: "grad-tech",
  tag: "#tech",
  prompt: "open-ear clip bluetooth earphones matte black compact case"
}, {
  id: 15,
  name: "Base Líquida Full Cover 24h",
  cat: "beleza",
  img: "./img15.png",
  rank: 32,
  grad: "grad-beleza",
  tag: "#beleza",
  prompt: "liquid foundation pump bottle beige packaging"
}, {
  id: 16,
  name: "Whey Zero Lactose 1kg",
  cat: "saude",
  img: "./img16.png",
  rank: 33,
  grad: "grad-saude",
  tag: "#saude",
  prompt: "zero lactose whey protein 1kg white and blue bag"
}, {
  id: 18,
  name: "Mini Massageador de Pescoço",
  cat: "casa",
  img: "./img18.png",
  rank: 34,
  grad: "grad-casa",
  tag: "#casa",
  prompt: "portable neck massager device black ergonomic design"
}, {
  id: 2,
  name: "Anel Inteligente Smart Ring",
  cat: "tech",
  img: "./img2.png",
  rank: 35,
  grad: "grad-tech",
  tag: "#tech",
  prompt: "minimalist titanium smart ring black finish on display box"
}, {
  id: 8,
  name: "Tênis Corrida Carbon Plate",
  cat: "fitness",
  img: "./img8.png",
  rank: 36,
  grad: "grad-fitness",
  tag: "#fitness",
  prompt: "performance running shoe with visible carbon plate sole neon accents"
}, {
  id: 44,
  name: "Ômega 3 Cápsulas Ultra Concentrado",
  cat: "saude",
  rank: 37,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "fish oil omega 3 softgel bottle blue and white label"
}, {
  id: 45,
  name: "Probiótico 20 Bilhões UFC",
  cat: "saude",
  rank: 38,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "probiotic supplement bottle capsules pastel green packaging"
}, {
  id: 46,
  name: "Melatonina Sublingual Sabor Menta",
  cat: "saude",
  rank: 39,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "sublingual melatonin spray bottle mint flavor dark packaging"
}, {
  id: 47,
  name: "Whey Isolado Zero Lactose",
  cat: "saude",
  rank: 40,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "lactose free whey protein tub chocolate flavor label"
}, {
  id: 48,
  name: "Chá Detox 7 Ervas Sachês",
  cat: "saude",
  rank: 41,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "herbal detox tea box with sachets green packaging"
}, {
  id: 49,
  name: "Ashwagandha KSM-66 Cápsulas",
  cat: "saude",
  rank: 42,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "ashwagandha supplement bottle capsules earthy packaging"
}, {
  id: 50,
  name: "Multivitamínico Energia Diária",
  cat: "saude",
  rank: 43,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "daily multivitamin bottle bright orange and yellow label"
}, {
  id: 51,
  name: "Creatina Monohidratada Pura 300g",
  cat: "saude",
  rank: 44,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "pure creatine monohydrate tub white label minimal design"
}, {
  id: 52,
  name: "Zinco Quelato Imunidade",
  cat: "saude",
  rank: 45,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "zinc chelate supplement bottle small white capsules"
}, {
  id: 53,
  name: "Colágeno Verisol Skin Renew",
  cat: "saude",
  rank: 46,
  grad: "grad-saude",
  tag: "#saude",
  isNew: true,
  prompt: "collagen verisol powder jar pink skin renewal packaging"
}, {
  id: 54,
  name: "Sérum Ácido Hialurônico Facial",
  cat: "beleza",
  rank: 47,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "hyaluronic acid facial serum dropper bottle transparent"
}, {
  id: 55,
  name: "Máscara de Cílios Volume Extremo",
  cat: "beleza",
  rank: 48,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "extreme volume mascara black tube wand applicator"
}, {
  id: 56,
  name: "Iluminador Líquido Glow Skin",
  cat: "beleza",
  rank: 49,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "liquid highlighter bottle golden shimmer glow packaging"
}, {
  id: 57,
  name: "Base Fluida Alta Cobertura FPS30",
  cat: "beleza",
  rank: 50,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "liquid foundation bottle high coverage sleek packaging"
}, {
  id: 58,
  name: "Óleo Reparador de Pontas Capilar",
  cat: "beleza",
  rank: 51,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "hair oil repair bottle dropper amber glass"
}, {
  id: 59,
  name: "Gloss Labial Efeito Plumper",
  cat: "beleza",
  rank: 52,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "lip gloss plumper tube glossy pink packaging"
}, {
  id: 60,
  name: "Esfoliante Corporal Café e Coco",
  cat: "beleza",
  rank: 53,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "coffee coconut body scrub jar brown packaging"
}, {
  id: 61,
  name: "Paleta de Sombras Nude Editorial",
  cat: "beleza",
  rank: 54,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "nude eyeshadow palette compact editorial packaging"
}, {
  id: 62,
  name: "Creme Anti-idade Retinol Noturno",
  cat: "beleza",
  rank: 55,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "night retinol anti aging cream jar dark packaging"
}, {
  id: 63,
  name: "Delineador Líquido Ponta Fina",
  cat: "beleza",
  rank: 56,
  grad: "grad-beleza",
  tag: "#beleza",
  isNew: true,
  prompt: "fine tip liquid eyeliner black slim packaging"
}, {
  id: 64,
  name: "Faixa Elástica Kit 5 Níveis",
  cat: "fitness",
  rank: 57,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "resistance bands set five levels colorful packaging"
}, {
  id: 65,
  name: "Corda de Pular com Contador Digital",
  cat: "fitness",
  rank: 58,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "jump rope with digital counter handle black design"
}, {
  id: 66,
  name: "Luvas de Treino Anti-derrapante",
  cat: "fitness",
  rank: 59,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "anti slip workout gloves black gym gear"
}, {
  id: 67,
  name: "Shaker Proteico com Compartimento",
  cat: "fitness",
  rank: 60,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "protein shaker bottle with storage compartment"
}, {
  id: 68,
  name: "Rolo de Liberação Miofascial",
  cat: "fitness",
  rank: 61,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "foam roller myofascial release cylinder blue"
}, {
  id: 69,
  name: "Tênis de Corrida Leve Respirável",
  cat: "fitness",
  rank: 62,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "lightweight breathable running shoe mesh design"
}, {
  id: 70,
  name: "Cinta Modeladora Térmica Abdominal",
  cat: "fitness",
  rank: 63,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "thermal abdominal shaper belt black neoprene"
}, {
  id: 71,
  name: "Halteres Ajustáveis Neoprene",
  cat: "fitness",
  rank: 64,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "adjustable neoprene dumbbells set colorful weights"
}, {
  id: 72,
  name: "Garrafa Motivacional 2L com Marcadores",
  cat: "fitness",
  rank: 65,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "motivational water bottle 2 liters time markers"
}, {
  id: 73,
  name: "Step Aeróbico Ajustável 3 Alturas",
  cat: "fitness",
  rank: 66,
  grad: "grad-fitness",
  tag: "#fitness",
  isNew: true,
  prompt: "adjustable aerobic step platform three heights"
}, {
  id: 74,
  name: "Fone Bluetooth TWS Cancelamento de Ruído",
  cat: "tech",
  rank: 67,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "wireless earbuds noise cancelling charging case"
}, {
  id: 75,
  name: "Mini Projetor Portátil Full HD",
  cat: "tech",
  rank: 68,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "portable mini projector full hd compact design"
}, {
  id: 76,
  name: "Carregador Magnético 3 em 1",
  cat: "tech",
  rank: 69,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "magnetic wireless charger 3 in 1 station"
}, {
  id: 77,
  name: "Câmera de Segurança Wi-Fi 360°",
  cat: "tech",
  rank: 70,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "wifi security camera 360 degree white housing"
}, {
  id: 78,
  name: "Suporte Articulado para Celular Mesa",
  cat: "tech",
  rank: 71,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "articulated phone holder desk mount black"
}, {
  id: 79,
  name: "Power Bank 20000mAh Carga Rápida",
  cat: "tech",
  rank: 72,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "fast charging power bank 20000mah sleek design"
}, {
  id: 80,
  name: "Anel Inteligente Monitor de Saúde",
  cat: "tech",
  rank: 73,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "smart ring health monitor minimal metallic design"
}, {
  id: 81,
  name: "Luz de LED RGB para Quarto Gamer",
  cat: "tech",
  rank: 74,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "rgb led strip light gamer room setup"
}, {
  id: 82,
  name: "Teclado Mecânico Compacto Wireless",
  cat: "tech",
  rank: 75,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "compact wireless mechanical keyboard rgb backlight"
}, {
  id: 83,
  name: "Mouse Ergonômico Vertical Sem Fio",
  cat: "tech",
  rank: 76,
  grad: "grad-tech",
  tag: "#tech",
  isNew: true,
  prompt: "vertical ergonomic wireless mouse black design"
}, {
  id: 84,
  name: "Bolsa Transversal Couro Sintético",
  cat: "moda",
  rank: 77,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "crossbody bag synthetic leather minimal design"
}, {
  id: 85,
  name: "Óculos de Sol Polarizado Retrô",
  cat: "moda",
  rank: 78,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "polarized retro sunglasses tortoiseshell frame"
}, {
  id: 86,
  name: "Relógio Minimalista Aço Inoxidável",
  cat: "moda",
  rank: 79,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "minimalist stainless steel watch slim design"
}, {
  id: 87,
  name: "Conjunto Moletom Oversized Unissex",
  cat: "moda",
  rank: 80,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "oversized unisex sweatsuit set streetwear style"
}, {
  id: 88,
  name: "Tênis Casual Chunky Plataforma",
  cat: "moda",
  rank: 81,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "chunky platform casual sneaker trendy design"
}, {
  id: 89,
  name: "Cinto Reversível Fivela Dourada",
  cat: "moda",
  rank: 82,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "reversible belt gold buckle leather design"
}, {
  id: 90,
  name: "Brincos Argola Banhados a Ouro",
  cat: "moda",
  rank: 83,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "gold plated hoop earrings minimal jewelry"
}, {
  id: 91,
  name: "Jaqueta Corta-vento Impermeável",
  cat: "moda",
  rank: 84,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "waterproof windbreaker jacket lightweight design"
}, {
  id: 92,
  name: "Carteira Slim Anti-RFID",
  cat: "moda",
  rank: 85,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "slim rfid blocking wallet leather minimal"
}, {
  id: 93,
  name: "Lenço de Seda Estampado Multiuso",
  cat: "moda",
  rank: 86,
  grad: "grad-moda",
  tag: "#moda",
  isNew: true,
  prompt: "printed silk scarf multiuse colorful pattern"
}, {
  id: 94,
  name: "Umidificador de Ar Aromaterapia LED",
  cat: "casa",
  rank: 87,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "led aromatherapy air humidifier wood grain design"
}, {
  id: 95,
  name: "Organizador de Gavetas Modular",
  cat: "casa",
  rank: 88,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "modular drawer organizer set clear plastic"
}, {
  id: 96,
  name: "Luminária de Mesa Toque Regulável",
  cat: "casa",
  rank: 89,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "touch dimmable desk lamp modern minimal design"
}, {
  id: 97,
  name: "Jogo de Panelas Antiaderente 5 Peças",
  cat: "casa",
  rank: 90,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "nonstick cookware set five pieces black design"
}, {
  id: 98,
  name: "Aspirador Portátil Sem Fio 2 em 1",
  cat: "casa",
  rank: 91,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "cordless portable vacuum 2 in 1 handheld"
}, {
  id: 99,
  name: "Difusor de Aromas Ultrassônico",
  cat: "casa",
  rank: 92,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "ultrasonic aroma diffuser wood base minimal"
}, {
  id: 100,
  name: "Kit Organizador de Armário Cápsulas",
  cat: "casa",
  rank: 93,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "capsule wardrobe organizer kit clear boxes"
}, {
  id: 101,
  name: "Cortina Blackout Térmica Corta Luz",
  cat: "casa",
  rank: 94,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "thermal blackout curtain light blocking fabric"
}, {
  id: 102,
  name: "Tapete Antiderrapante para Banheiro",
  cat: "casa",
  rank: 95,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "non slip bathroom mat soft microfiber design"
}, {
  id: 103,
  name: "Suporte de Plantas Escalonado Madeira",
  cat: "casa",
  rank: 96,
  grad: "grad-casa",
  tag: "#casa",
  isNew: true,
  prompt: "tiered wooden plant stand minimal design"
} ];

const videos = [ {
  id: "27",
  title: "Essa caneta chique viralizou no TikTok Shop",
  fmt: "review",
  img: "./img24.png",
  grad: "grad-tech",
  views: "2.7M",
  likes: "38.9K",
  dur: "0:25",
  fmtClass: "fmt-review",
  url: "https://vt.tiktok.com/ZS476GRtN/",
  hook: "Essa caneta parece cara de longe...",
  reveal: "Mostrando o design e a escrita de perto...",
  cta: "Caneta disponível no link da bio"
}, {
  id: "17",
  title: "IA criou esse tênis e ele parece 100% real",
  fmt: "ai",
  img: "./img8.png",
  grad: "grad-fitness",
  views: "3.2M",
  likes: "397K",
  dur: "0:16",
  fmtClass: "fmt-ai",
  url: "https://www.tiktok.com/@shiftrobotics/video/7660971169134185742",
  hook: "Você não vai acreditar que isso é IA...",
  reveal: "Comparando com o produto de verdade...",
  cta: "Já disponível, corre no link"
}, {
  id: "7",
  title: "Antes era assim... depois desse produto mudou tudo",
  fmt: "antes",
  img: "./img7.png",
  grad: "grad-beleza",
  views: "6.3M",
  likes: "780K",
  dur: "0:21",
  fmtClass: "fmt-antes",
  url: "https://www.tiktok.com",
  hook: "Isso era eu há 3 semanas atrás...",
  reveal: "Mostrando a transformação real...",
  cta: "Tem link direto nos comentários"
}, {
  id: "3",
  title: "Review honesta: comprei por impulso e me arrependi?",
  fmt: "review",
  img: "./img3.png",
  grad: "grad-fitness",
  views: "24.6M",
  likes: "770K",
  dur: "1:29",
  fmtClass: "fmt-review",
  url: "https://vt.tiktok.com/ZSxtnSVKn/",
  hook: "Será que funciona de verdade?",
  reveal: "Testando produto sem filtro",
  cta: "Minha conclusão final e onde comprar"
}, {
  id: "26",
  title: "Review da garrafa térmica do Homem-Aranha",
  fmt: "review",
  img: "./img13.png",
  grad: "grad-fitness",
  views: "12.6M",
  likes: "80K",
  dur: "0:11",
  fmtClass: "fmt-review",
  url: "https://vt.tiktok.com/ZS476gHhw/",
  hook: "Achei essa garrafa térmica do Homem-Aranha...",
  reveal: "Testando se mantém a temperatura...",
  cta: "Garrafa disponível no link da bio"
}, {
  id: "16",
  title: "Antes eu tinha dor nas costas, depois desse colchonete não mais",
  fmt: "antes",
  img: "./img13.png",
  grad: "grad-casa",
  views: "1.1M",
  likes: "63.1K",
  dur: "3:53",
  fmtClass: "fmt-antes",
  url: "https://www.tiktok.com/@getadjustednow/video/7663112670731717919",
  hook: "3 meses sem dormir direito...",
  reveal: "Foi só trocar o colchonete...",
  cta: "Link com frete grátis na bio"
}, {
  id: "23",
  title: "Ventilador de teto criado com IA parece real",
  fmt: "ai",
  img: "./img27.png",
  grad: "grad-casa",
  views: "34M",
  likes: "1.3M",
  dur: "0:14",
  fmtClass: "fmt-ai",
  url: "https://vt.tiktok.com/ZS476CPgJ/",
  hook: "Você não vai acreditar que isso é IA...",
  reveal: "Comparando com o ventilador real...",
  cta: "Já disponível, corre no link"
}, {
  id: "13",
  title: "Treino de 15 min viralizou, será que funciona mesmo?",
  fmt: "review",
  img: "./img29.png",
  grad: "grad-fitness",
  views: "4.6M",
  likes: "657K",
  dur: "0:11",
  fmtClass: "fmt-review",
  url: "https://www.tiktok.com/@raiccagutierrez08/video/7649898431665704212",
  hook: "Vi esse treino em todos os feeds...",
  reveal: "Testei por uma semana sem parar...",
  cta: "Kit de faixas com 20% off na bio"
}, {
  id: "20",
  title: "Minha melhor compra no TikTok Shop até agora",
  fmt: "antes",
  img: "./img8.png",
  grad: "grad-fitness",
  views: "2.3M",
  likes: "133K",
  dur: "1:06",
  fmtClass: "fmt-antes",
  url: "https://vt.tiktok.com/ZS476249q/",
  hook: "Essa foi minha melhor compra no TikTok Shop até agora...",
  reveal: "Mostrando o antes e depois lavando o tênis dentro do saco...",
  cta: "Link do saco de lavar tênis na bio"
}, {
  id: "1",
  title: "Testei esse sérum por 30 dias e minha pele nunca foi assim",
  fmt: "antes",
  img: "./img1.png",
  grad: "grad-beleza",
  views: "8M",
  likes: "385K",
  dur: "1:25",
  fmtClass: "fmt-antes",
  url: "https://vt.tiktok.com/ZSxtWR7HR/",
  hook: "Em quantos dias o sérum tira espinha?",
  reveal: "Apliquei o sérum todos os dias de manhã...",
  cta: "O link tá na bio com 30% off!"
}, {
  id: "9",
  title: "Vale mesmo? Produto viralizou no TikTok e testei",
  fmt: "review",
  img: "./img9.png",
  grad: "grad-fitness",
  views: "720K",
  likes: "58K",
  dur: "1:45",
  fmtClass: "fmt-review",
  url: "tiktok.com/@alexiasabrinaf/video/7512045250714602808",
  hook: "Vi esse produto no feed 10 vezes...",
  reveal: "Testei e vou contar a verdade...",
  cta: "Spoiler: link na bio com frete grátis"
}, {
  id: "10",
  title: "Maquiagem 5 minutos — resultado profissional sem sair de casa",
  fmt: "tutorial",
  img: "./img10.png",
  grad: "grad-tech",
  views: "2.1M",
  likes: "189K",
  dur: "3:15",
  fmtClass: "fmt-tutorial",
  url: "https://www.tiktok.com/@bellaayar/video/7548853143132589319",
  hook: "5 minutos para transformar seu look...",
  reveal: "Base, contorno, olho — passo a passo...",
  cta: "Kit completo no link da bio"
}, {
  id: "29",
  title: "Tudo que comprei no TikTok Shop: o que valeu a pena",
  fmt: "review",
  img: "./img10.png",
  grad: "grad-moda",
  views: "670K",
  likes: "74K",
  dur: "3:34",
  fmtClass: "fmt-review",
  url: "https://vt.tiktok.com/ZS472hoRh/",
  hook: "Tudo que comprei no TikTok Shop: o que foi bom e o que foi ruim.",
  reveal: "Mostra vários produtos e dá uma opinião sincera sobre cada um.",
  cta: "Sem CTA direto, mas abre espaço para uma parte 2."
}, {
  id: "2",
  title: "Unboxing da caixa mais cara que já pedi no TikTok Shop",
  fmt: "unboxing",
  img: "./img2.png",
  grad: "grad-saude",
  views: "1.9M",
  likes: "87K",
  dur: "3:46",
  fmtClass: "fmt-unboxing",
  url: "https://vt.tiktok.com/ZSxtn3A2k/",
  hook: "Gastei R$600 e não sei se valeu...",
  reveal: "Abrindo item por item ao vivo...",
  cta: "Link nos comentários — corra!"
}, {
  id: "25",
  title: "Antes e depois: essa tinta de cabelo mudou tudo",
  fmt: "antes",
  img: "./img35.png",
  grad: "grad-beleza",
  views: "19M",
  likes: "237K",
  dur: "0:26",
  fmtClass: "fmt-antes",
  url: "https://vt.tiktok.com/ZS476VJ5n/",
  hook: "Meu cabelo antes dessa tinta...",
  reveal: "Depois de uma aplicação, olha a transformação...",
  cta: "Tinta de cabelo com desconto na bio"
}, {
  id: "21",
  title: "Antes e depois: testei essa máscara de cabelo",
  fmt: "antes",
  img: "./img33.png",
  grad: "grad-beleza",
  views: "297K",
  likes: "9K",
  dur: "0:20",
  fmtClass: "fmt-antes",
  url: "https://vt.tiktok.com/ZS47jEaUA/",
  hook: "Meu cabelo antes de usar essa máscara...",
  reveal: "Depois de uma aplicação, olha a diferença...",
  cta: "Máscara de cabelo linkada na bio"
}, {
  id: "31",
  title: "Voltei de viagem e chegou um monte de caixa",
  fmt: "unboxing",
  img: "./img32.png",
  grad: "grad-casa",
  views: "3M",
  likes: "540K",
  dur: "1:26",
  fmtClass: "fmt-unboxing",
  url: "https://vt.tiktok.com/ZS472wArR/",
  hook: "Voltei de viagem e as marcas mandaram um monte de caixas...",
  reveal: "Abrindo pacote por pacote com vocês...",
  cta: "Fala nos comentários qual quer ver primeiro"
}, {
  id: "19",
  title: "Vale a pena o carregador magnético 3 em 1?",
  fmt: "review",
  img: "./img30.png",
  grad: "grad-tech",
  views: "1.4M",
  likes: "62K",
  dur: "0:11",
  fmtClass: "fmt-review",
  url: "https://www.tiktok.com/@jayko_art/video/7645716144719990030",
  hook: "Carrega celular, fone e relógio junto?",
  reveal: "Testei os 3 dispositivos ao mesmo tempo...",
  cta: "Minha opinião sincera no final"
}, {
  id: "14",
  title: "Como aplicar blush certo em 10 segundos",
  fmt: "tutorial",
  img: "./img6.png",
  grad: "grad-beleza",
  views: "5.1M",
  likes: "607K",
  dur: "0:11",
  fmtClass: "fmt-tutorial",
  url: "https://www.tiktok.com/@carlaswan15/video/7636021547504782610",
  hook: "Você tá aplicando blush errado...",
  reveal: "O truque que ninguém te conta...",
  cta: "Produto usado no vídeo, link na bio"
}, {
  id: "6",
  title: "Esse cortador de grama não parece real — e foi IA que fez",
  fmt: "ai",
  img: "./img6.png",
  grad: "grad-casa",
  views: "13M",
  likes: "144K",
  dur: "0:36",
  fmtClass: "fmt-ai",
  url: "https://vt.tiktok.com/ZSxtWmp3t/",
  hook: "Você está brincando comigo?",
  reveal: "Esse cortador de grama está bombando",
  cta: "Os primeiros 100 clientes ganham 50% de desconto"
}, {
  id: "11",
  title: "Substitui todo meu skincare por isso e virou rotina",
  fmt: "ugc",
  img: "./img28.png",
  grad: "grad-beleza",
  views: "412K",
  likes: "75.6K",
  dur: "0:25",
  fmtClass: "fmt-ugc",
  url: "https://www.tiktok.com/@of.swgmia/video/7651982366956702997",
  hook: "Troquei 5 produtos por só 1 kit...",
  reveal: "Minha pele depois de 2 semanas usando...",
  cta: "Kit completo com desconto no link"
}, {
  id: "8",
  title: "Unbox da coleção limitada que esgotou em 2 horas",
  fmt: "unboxing",
  img: "./img8.png",
  grad: "grad-saude",
  views: "1.9M",
  likes: "167K",
  dur: "0:55",
  fmtClass: "fmt-unboxing",
  url: "https://www.tiktok.com",
  hook: "Consegui uma das últimas unidades...",
  reveal: "Abrindo tudo ao vivo com vocês...",
  cta: "Avisa quando voltar ao estoque!"
}, {
  id: "22",
  title: "Testei esse pincel de maquiagem viral",
  fmt: "ugc",
  img: "./img6.png",
  grad: "grad-beleza",
  views: "1.5M",
  likes: "36K",
  dur: "0:18",
  fmtClass: "fmt-ugc",
  url: "https://vt.tiktok.com/ZS476pNdj/",
  hook: "Esse pincel de maquiagem tá em todo lugar...",
  reveal: "Testando na base e no pó...",
  cta: "Pincel disponível no link da bio"
}, {
  id: "5",
  title: "Conjunto feminino que virou obsessão: review completa",
  fmt: "ugc",
  img: "./img5.png",
  grad: "grad-moda",
  views: "7.3M",
  likes: "190K",
  dur: "0:38",
  fmtClass: "fmt-ugc",
  url: "https://vt.tiktok.com/ZSxtWRAeU/",
  hook: "Olha que perfeição desse conjunto",
  reveal: "Olha como ele é de perto",
  cta: "Clica no carrinho laranja"
}, {
  id: "30",
  title: "Recebidos acumulados",
  fmt: "ugc",
  img: "./img31.png",
  grad: "grad-moda",
  views: "175.7K",
  likes: "35.8K",
  dur: "6:00",
  fmtClass: "fmt-ugc",
  url: "https://vt.tiktok.com/ZS4727qeo/",
  hook: "Mostrando a quantidade de recebidos acumulados...",
  reveal: "Apresentação rápida das caixas e produtos, um por um...",
  cta: "Encerramento após mostrar todos os recebidos"
}, {
  id: "4",
  title: "Esse acessório brilha no escuro — DIY em 30 segundos",
  fmt: "tutorial",
  img: "./img4.png",
  grad: "grad-tech",
  views: "4M",
  likes: "202K",
  dur: "0:12",
  fmtClass: "fmt-tutorial",
  url: "https://vt.tiktok.com/ZSxtnV1CG/",
  hook: "Brilha no escuro de verdade?",
  reveal: "Mostrando o processo ao vivo",
  cta: "Tutorial completo no YouTube"
}, {
  id: "28",
  title: "Unboxing: coisas para casa que pedi na Amazon",
  fmt: "unboxing",
  img: "./img11.png",
  grad: "grad-casa",
  views: "480K",
  likes: "121K",
  dur: "2:40",
  fmtClass: "fmt-unboxing",
  url: "https://vt.tiktok.com/ZS47YsjCT/",
  hook: "",
  reveal: "",
  cta: ""
}, {
  id: "32",
  title: "Unboxing de produtos Apple",
  fmt: "unboxing",
  img: "./img14.png",
  grad: "grad-tech",
  views: "1.1M",
  likes: "189K",
  dur: "3:12",
  fmtClass: "fmt-unboxing",
  url: "https://vt.tiktok.com/ZS47jD68E/",
  hook: "Chegaram os produtos Apple que eu pedi...",
  reveal: "Abrindo cada um e mostrando os detalhes...",
  cta: "Qual produto Apple você quer ver primeiro?"
}, {
  id: "12",
  title: "Abri a caixa de tecnologia mais cara que já comprei esse mês",
  fmt: "unboxing",
  img: "./img30.png",
  grad: "grad-tech",
  views: "990K",
  likes: "74.8K",
  dur: "0:44",
  fmtClass: "fmt-unboxing",
  url: "https://www.tiktok.com/@mandyinrio/video/7643660370162289938",
  hook: "Gastei tudo que tinha nesse mês...",
  reveal: "Abrindo cada peça com vocês...",
  cta: "Link do carregador nos comentários"
}, {
  id: "24",
  title: "IA criou esse sapato de salto e ele parece 100% real",
  fmt: "ai",
  img: "./img19.png",
  grad: "grad-moda",
  views: "24.7M",
  likes: "430K",
  dur: "0:15",
  fmtClass: "fmt-ai",
  url: "https://vt.tiktok.com/ZS476XGhD/",
  hook: "Esse sapato de salto alto com dedos é real?",
  reveal: "Comparando com o produto de verdade...",
  cta: "Link do sapato na bio"
}, {
  id: "15",
  title: "Anel de Safira",
  fmt: "review",
  img: "./img2.png",
  grad: "grad-tech",
  views: "224K",
  likes: "27.4K",
  dur: "0:10",
  fmtClass: "fmt-review",
  url: "https://www.tiktok.com/@gems_magic/video/7661344587549625631",
  hook: "Um anel pode substituir meu relógio?",
  reveal: "Depois de 7 dias usando 24h por dia...",
  cta: "Meu resultado completo e onde comprar"
}, {
  id: "18",
  title: "Unboxing do kit skincare coreano que todo mundo tá usando",
  fmt: "unboxing",
  img: "./img28.png",
  grad: "grad-beleza",
  views: "9M",
  likes: "55K",
  dur: "0:24",
  fmtClass: "fmt-unboxing",
  url: "https://www.tiktok.com/@juliana.indicaa/video/7615441801658240277",
  hook: "Chegou o kit que tá em todo lugar...",
  reveal: "Abrindo os 5 passos com vocês...",
  cta: "Kit completo no link da bio"
} ];

const avatars = [ {
  id: 1,
  name: "Luna Ferreira",
  age: 24,
  nicho: "Beleza & Skincare",
  style: "Minimalista",
  gender: "f",
  emoji: "💆",
  grad: "grad-beleza"
}, {
  id: 2,
  name: "Rafael Torres",
  age: 28,
  nicho: "Fitness & Nutrição",
  style: "Athletic",
  gender: "m",
  emoji: "💪",
  grad: "grad-fitness"
}, {
  id: 3,
  name: "Isa Duarte",
  age: 22,
  nicho: "Moda & Lifestyle",
  style: "Streetwear",
  gender: "f",
  emoji: "👗",
  grad: "grad-moda"
}, {
  id: 4,
  name: "Pedro Nunes",
  age: 31,
  nicho: "Tech & Gadgets",
  style: "Minimalista",
  gender: "m",
  emoji: "💻",
  grad: "grad-tech"
}, {
  id: 5,
  name: "Maya Costa",
  age: 26,
  nicho: "Beleza & Luxo",
  style: "Glamour",
  gender: "f",
  emoji: "✨",
  grad: "grad-beleza"
}, {
  id: 6,
  name: "Theo Lima",
  age: 25,
  nicho: "Lifestyle & Casa",
  style: "Boho",
  gender: "m",
  emoji: "🏡",
  grad: "grad-casa"
}, {
  id: 7,
  name: "Lara Silva",
  age: 20,
  nicho: "Saúde & Wellness",
  style: "Natural",
  gender: "f",
  emoji: "🌿",
  grad: "grad-saude"
}, {
  id: 8,
  name: "Bruno Vaz",
  age: 29,
  nicho: "Moda Masculina",
  style: "Casual Luxo",
  gender: "m",
  emoji: "🕶",
  grad: "grad-moda"
}, {
  id: 9,
  name: "Nina Rocha",
  age: 23,
  nicho: "Fitness & Dança",
  style: "Energético",
  gender: "f",
  emoji: "💃",
  grad: "grad-fitness"
}, {
  id: 10,
  name: "Caio Melo",
  age: 27,
  nicho: "Tech & Gaming",
  style: "Gamer",
  gender: "m",
  emoji: "🎮",
  grad: "grad-tech"
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
  label: "✨ Transformação",
  hook: "Minha vida antes disso era...",
  reveal: "Depois de usar por X dias, olha o que aconteceu...",
  cta: "Link na bio — pega o seu!"
}, {
  id: "problema",
  label: "🔥 Problema-Solução",
  hook: "Quem mais tem esse problema?",
  reveal: "Esse produto resolveu em X dias o que eu sofria há anos...",
  cta: "Corre que tem desconto hoje!"
}, {
  id: "honesta",
  label: "💬 Review Honesta",
  hook: "Vou ser honesta com vocês sobre esse produto...",
  reveal: "Testei por 2 semanas e olha o que achei...",
  cta: "Vale a pena? Spoiler: sim. Link na bio!"
}, {
  id: "unboxing",
  label: "📦 Unboxing",
  hook: "Finalmente chegou! Vamos abrir juntos?",
  reveal: "Primeiras impressões ao vivo, sem filtro...",
  cta: "Já pedi o segundo, link nos comentários!"
}, {
  id: "pov",
  label: "📱 POV / Rotina",
  hook: "POV: você achou o produto que mudou sua rotina",
  reveal: "Adicionei na minha rotina diária assim...",
  cta: "Salva esse vídeo pra não esquecer!"
}, {
  id: "tutorial",
  label: "🎓 Tutorial",
  hook: "Você sabia que dá pra usar isso assim?",
  reveal: "Vou te mostrar o passo a passo completo...",
  cta: "Dúvidas nos comentários, link do produto na bio!"
} ];

const hookPresets = [ "Minha pele estava horrível...", "Gastei e não me arrependo!", "Ninguém me contou sobre isso", "POV: você descobre o produto perfeito", "Não acreditei até testar...", "Isso mudou minha vida em 7 dias" ];

const revealPresets = [ "Mostrando resultado real", "Aplicando ao vivo", "Comparando antes x depois", "Testando sem filtro", "Step by step devagar" ];

const ctaPresets = [ "Link na bio 👇", "Código desconto nos comentários", "Últimas unidades — corre!", "Segue pra mais dicas 💜", "Salva esse vídeo!" ];

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

function showToast(msg, icon = "✓") {
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
  return `<svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:${active ? "#ff6b8a" : "var(--text2)"};fill:${active ? "#ff6b8a" : "none"};stroke-width:2;stroke-linecap:round;stroke-linejoin:round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
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
  customProducts.push(newProd);
  safeSet(PRODUCTS_KEY, customProducts);
  document.getElementById("np-nome").value = "";
  document.getElementById("np-prompt").value = "";
  document.getElementById("np-counter").textContent = "0 / 200";
  closeAddModal();
  renderStudioProducts();
  renderVidProducts();
  showToast(`"${nome}" adicionado com sucesso!`);
}

function allProducts() {
  return [ ...products, ...customProducts ];
}

function productCard(p, selectable, i = 0, clickFn = "selectStudioProduct") {
  const rankClass = p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "rank-other";
  const fav = isFav("prod", p.id);
  const imgContent = p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">` : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="opacity:.55"><path d="M21 8L12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`;
  const customBadge = p.custom ? `<span style="position:absolute;bottom:7px;right:7px;background:rgba(124,107,255,0.85);color:white;font-size:8px;padding:2px 6px;border-radius:7px;font-weight:700;backdrop-filter:blur(4px)">MEU</span>` : "";
  const promptBadge = p.prompt ? `<span style="position:absolute;bottom:7px;left:7px;background:rgba(0,229,179,0.18);color:#00e5b3;font-size:8px;padding:2px 6px;border-radius:7px;border:1px solid rgba(0,229,179,0.3);font-weight:700;backdrop-filter:blur(4px)">PROMPT ✓</span>` : "";
  const trendBadge = p.rank <= 5 ? `<div class="trending-badge" style="bottom:${p.prompt ? "28px" : "7px"}">TOP ${p.rank}</div>` : "";
  const newBadge = p.isNew ? `<span class="badge-new">NOVO</span>` : "";
  const safeName = Sanitize.escapeHTML(p.name);
  return `<div class="product-card" data-cat="${p.cat}" data-id="${p.id}" style="animation-delay:${i * .035}s" ${selectable ? `onclick="${clickFn}('${p.id}',this)" role="option" tabindex="0" aria-label="${safeName}"` : ""} role="listitem">\n    <div class="card-img ${p.grad}">${imgContent}<span class="rank-badge ${rankClass}" aria-label="Ranking ${p.rank}">#${p.rank}</span>${customBadge}${promptBadge}${trendBadge}${newBadge}\n      <button class="fav-btn ${fav ? "active" : ""}" onclick="event.stopPropagation();this.innerHTML=heartSVG(!this.classList.contains('active'));toggleFav('prod',${p.id},this)" aria-label="${fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}">${heartSVG(fav)}</button>\n    </div>\n    <div class="card-body">\n      <div class="card-name">${safeName}</div>\n      <div class="card-meta"><span class="card-tag">${p.tag}</span></div>\n      ${!selectable ? `<button class="card-btn" onclick="event.stopPropagation();window.open('https://www.google.com/search?q=${encodeURIComponent(p.name)}','_blank')"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Pesquisar</button>` : ""}\n    </div>\n  </div>`;
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
  bar.innerHTML = `\n    <div class="stat-card">\n      <div class="stat-value">${total}</div>\n      <div class="stat-label">Produtos rastreados</div>\n      <div class="stat-delta">↑ ${novos} novos esta semana</div>\n    </div>\n    <div class="stat-card">\n      <div class="stat-value" style="background:linear-gradient(90deg,#00e5b3,#4facfe);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${catQtd}</div>\n      <div class="stat-label">Categorias</div>\n      <div class="stat-delta">${catLiderLabel} lidera</div>\n    </div>\n    <div class="stat-card">\n      <div class="stat-value" style="background:linear-gradient(90deg,#f5c542,#ff6b8a);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${viralCount}</div>\n      <div class="stat-label">Vídeos virais</div>\n      <div class="stat-delta">↑ ${formatViews(maxViews)} views líder</div>\n    </div>`;
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

function getHotVideoIds(n = 3) {
  return [ ...videos ].sort((a, b) => parseViewsCount(b.views) - parseViewsCount(a.views)).slice(0, n).map(v => v.id);
}

function renderVideos() {
  const hotIds = getHotVideoIds(3);
  document.getElementById("video-grid").innerHTML = videos.map((v, i) => {
    const fav = isFav("vid", v.id);
    const hotBadge = hotIds.includes(v.id) ? `<span class="badge-hot">Em alta 🔥</span>` : "";
    return `<div class="video-card" data-fmt="${v.fmt}" style="animation-delay:${i * .035}s" role="listitem">\n      <div class="video-thumb">\n        <img src="${v.img}" alt="${v.title}" loading="lazy" onerror="this.style.display='none'">\n        <div class="play-overlay" aria-hidden="true"><div class="play-circle"><svg viewBox="0 0 24 24" style="width:32px;height:32px"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>\n        <span class="format-badge ${v.fmtClass}">${v.fmt.toUpperCase()}</span>\n        ${hotBadge}\n        <button class="fav-btn ${fav ? "active" : ""}" style="top:7px;left:7px;right:auto" onclick="this.innerHTML=heartSVG(!this.classList.contains('active'));toggleFav('vid',${v.id},this)" aria-label="${fav ? "Remover dos favoritos" : "Favoritar vídeo"}">${heartSVG(fav)}</button>\n      </div>\n      <div class="video-body">\n        <button class="card-btn" onclick="window.open('${v.url}','_blank')" style="margin-bottom:8px"><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>Ver no TikTok</button>\n        <div class="video-title">${v.title}</div>\n        <div class="video-stats">\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${v.views}</span>\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>${v.likes}</span>\n          <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${v.dur}</span>\n        </div>\n        <button class="accordion-btn" onclick="toggleAccordion(this)" aria-expanded="false"><span>Estrutura do Roteiro</span><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></button>\n        <div class="accordion-body" role="region">\n          <div class="script-step"><span>Hook (0–3s)</span><p>${v.hook}</p></div>\n          <div class="script-step"><span>Reveal (3–12s)</span><p>${v.reveal}</p></div>\n          <div class="script-step"><span>CTA</span><p>${v.cta}</p></div>\n        </div>\n      </div>\n    </div>`;
  }).join("");
}

const productPageState = { studio: false, vid: false };

/* Limite inicial de produtos: 20 no celular, 30 no PC */
const PRODUCTS_LIMIT_MOBILE = 20;
const PRODUCTS_LIMIT_DESKTOP = 30;
const PRODUCTS_MOBILE_BREAKPOINT = 768;

function getProductPageLimit() {
  return window.innerWidth <= PRODUCTS_MOBILE_BREAKPOINT ? PRODUCTS_LIMIT_MOBILE : PRODUCTS_LIMIT_DESKTOP;
}

function applyProductPagination(which) {
  const gridId = which === "studio" ? "studio-product-grid" : "vid-product-grid";
  const btnId = which === "studio" ? "studio-more-btn" : "vid-more-btn";
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".product-card"));
  const limit = getProductPageLimit();
  const expanded = productPageState[which];
  cards.forEach((card, i) => {
    if (!expanded && i >= limit) card.classList.add("page-hidden"); else card.classList.remove("page-hidden");
  });
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const restantes = cards.length - limit;
  const mostrar = !expanded && restantes > 0;
  btn.style.display = mostrar ? "flex" : "none";
  if (mostrar) {
    const countEl = document.getElementById(`${which}-more-count`);
    if (countEl) countEl.textContent = `+${restantes}`;
    btn.setAttribute("aria-label", `Mostrar mais ${restantes} produtos`);
  }
}

function showMoreProducts(which) {
  productPageState[which] = true;
  applyProductPagination(which);
}

/* Reajusta o limite ao girar o celular ou redimensionar a janela */
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
  productPageState.studio = false;
  document.getElementById("studio-product-grid").innerHTML = allProducts().map((p, i) => productCard(p, true, i, "selectStudioProduct")).join("");
  reapplySelection("studio-product-grid", "studio");
  applyProductPagination("studio");
}

function renderVidProducts() {
  productPageState.vid = false;
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
    emoji: "⭐",
    grad: gradients[i % gradients.length]
  })) ];
  document.getElementById(containerId).innerHTML = all.map(a => `<div class="avatar-select-card ${selectedAvatar && selectedAvatar.id === a.id ? "selected" : ""}" onclick="${clickFn}('${a.id}',this,'${a.custom ? "custom" : "builtin"}')" role="option" tabindex="0" aria-label="${a.name}, ${a.nicho}" aria-selected="${selectedAvatar && selectedAvatar.id === a.id}">\n    <div class="avatar-select-emoji" aria-hidden="true">${a.emoji || "⭐"}</div>\n    <div class="avatar-select-name">${a.name}</div>\n    <div class="avatar-select-nicho">${a.nicho || a.niche || "—"}</div>\n  </div>`).join("");
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
  document.getElementById("avatar-grid").innerHTML = list.map((a, i) => `<div class="avatar-card" data-gender="${a.gender}" style="animation-delay:${i * .035}s" role="listitem">\n    <div class="avatar-img ${a.grad}" aria-hidden="true">${a.emoji}</div>\n    <div class="avatar-body">\n      <div class="avatar-name">${a.name}</div>\n      <div class="avatar-meta">${a.age} anos · ${a.nicho}</div>\n      <span class="avatar-badge">${a.style}</span>\n      <button class="use-btn" onclick="useAvatar(${a.id})"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Usar Avatar</button>\n    </div>\n  </div>`).join("");
  const sect = document.getElementById("custom-avatars-section");
  const grid = document.getElementById("custom-avatar-grid");
  if (customAvatars.length > 0 && (filter === "all" || filter === "custom")) {
    sect.style.display = "";
    grid.innerHTML = customAvatars.map((a, i) => {
      const grad = gradients[i % gradients.length];
      const sName = Sanitize.escapeHTML(a.name || "");
      const sNicho = Sanitize.escapeHTML(a.nicho || "—");
      const sStyle = Sanitize.escapeHTML(a.style || "Personalizado");
      return `<div class="avatar-card" style="animation-delay:${i * .035}s" role="listitem"><div class="avatar-img ${grad}" aria-hidden="true">⭐</div><div class="avatar-body"><div class="avatar-name">${sName}</div><div class="avatar-meta">${a.age || "—"} anos · ${sNicho}</div><span class="avatar-badge">${sStyle}</span><button class="use-btn" onclick="useCustomAvatar(${i})"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Usar</button><button class="delete-btn" onclick="deleteCustomAvatar(${i})" aria-label="Excluir avatar" title="Excluir avatar"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></button></div></div>`;
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
  document.getElementById("vid-config-summary").innerHTML = items.map(i => `<div class="selected-bar" style="border-color:rgba(255,107,138,0.22);background:linear-gradient(135deg,rgba(255,107,138,0.07),rgba(255,140,90,0.07))"><div class="selected-bar-dot" style="background:var(--accent2)" aria-hidden="true"></div><span class="selected-bar-label">${i.l}:</span><span class="selected-bar-value">${i.v}</span></div>`).join("");
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
  const btn = document.getElementById("studio-more-btn");
  if (q) {
    if (btn) btn.style.display = "none";
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
  const btn = document.getElementById("vid-more-btn");
  if (q) {
    if (btn) btn.style.display = "none";
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
  document.body.classList.remove("theme-light", "theme-futuristic");
  if (themeName === "light") document.body.classList.add("theme-light");
  if (themeName === "futuristic") document.body.classList.add("theme-futuristic");
  try {
    localStorage.setItem("nex-theme", themeName);
  } catch (e) {}
  syncThemeSelectorUI(themeName);
}

function syncThemeSelectorUI(themeName) {
  document.querySelectorAll(".theme-opt").forEach(t => t.classList.remove("selected"));
  const map = {
    dark: ".theme-opt.theme-dark",
    light: ".theme-opt.theme-light",
    futuristic: ".theme-opt.theme-futuristic"
  };
  document.querySelector(map[themeName] || map.dark)?.classList.add("selected");
}

function getCurrentTheme() {
  if (document.body.classList.contains("theme-light")) return "light";
  if (document.body.classList.contains("theme-futuristic")) return "futuristic";
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
  const themeName = el.classList.contains("theme-light") ? "light" : el.classList.contains("theme-futuristic") ? "futuristic" : "dark";
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
  showToast(next === "light" ? "Modo claro ativado ☀️" : "Modo escuro ativado 🌙");
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

function clearAllData() {
  showConfirm("Isso vai remover favoritos, produtos e avatares personalizados. Continuar?", () => {
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
    renderProducts();
    renderVideos();
    renderStudioProducts();
    renderVidProducts();
    renderAvatars("all");
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
    return `<div class="history-item">\n      <div class="history-item-meta">\n        <span class="history-item-type ${typeClass[item.type] || "hist-img"}">${typeLabel[item.type] || item.type}</span>\n        <span class="history-item-date">${date}</span>\n      </div>\n      <div class="history-item-preview">${preview}</div>\n      <div class="history-item-actions">\n        <button class="hist-copy-btn" onclick="copyHistItem(${i})">\n          <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>\n          Copiar\n        </button>\n        <button class="hist-copy-btn" onclick="deleteHistItem(${i})" style="flex:0;padding:5px 9px">\n          <svg viewBox="0 0 24 24" style="stroke:#ff6b8a"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>\n        </button>\n      </div>\n    </div>`;
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
    icon: "🏠",
    tab: "mining"
  }, {
    label: "Biblioteca Viral",
    cat: "Seção",
    icon: "📚",
    tab: "library"
  }, {
    label: "Estúdio IA — Imagem",
    cat: "Seção",
    icon: "🖼️",
    tab: "studio"
  }, {
    label: "Estúdio IA — Vídeo",
    cat: "Seção",
    icon: "🎬",
    tab: "video"
  }, {
    label: "Avatar",
    cat: "Seção",
    icon: "👤",
    tab: "influencer"
  }, {
    label: "Configurações",
    cat: "Seção",
    icon: "⚙️",
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
      icon: "📦",
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
  chip.innerHTML = `<span class="avatar-preview-emoji">${avatar.emoji || "⭐"}</span>\n    <div><div class="avatar-preview-name">${avatar.name}</div><div class="avatar-preview-nicho">${avatar.nicho || "—"}</div></div>\n    <button class="avatar-preview-clear" onclick="clearAvatarSelection('${containerId}')" aria-label="Remover avatar selecionado">✕</button>`;
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
  if (e.key === "Escape") closeAddModal();
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
    if (savedTheme === "light") document.body.classList.add("theme-light"); else if (savedTheme === "futuristic") document.body.classList.add("theme-futuristic");
    syncThemeSelectorUI(savedTheme);
  } catch (e) {}
  if (window.innerWidth >= 900) {
    document.getElementById("header-plan").style.display = "block";
    document.getElementById("search-label-desk").style.display = "inline";
    document.getElementById("search-kbd").style.display = "inline";
    document.getElementById("hist-label").style.display = "inline";
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
