# Viralyze (Nex AI) — Frontend

Estúdio de marketing viral para TikTok Shop: descubra produtos e vídeos em alta, crie influencers IA e gere prompts de imagem e vídeo prontos para ferramentas como Midjourney, Runway e Kling.

## Funcionalidades

- **Inventário**: produtos virais por nicho, favoritos e importação por link de loja.
- **Vídeos Virais**: vídeos em alta no TikTok como referência.
- **Estúdio Livre**: chat para gerar prompts de imagem e vídeo e extrair o movimento de um vídeo de referência.
- **Viralize A.I**: escolha um avatar e receba um prompt de vídeo pronto.
- **Influencers**: avatares prontos ou criados em etapas.
- **Biblioteca de Imagens, histórico de prompts e backup** dos dados.
- **Português e inglês**: o idioma é detectado pelo navegador.

## Stack

HTML, CSS e JavaScript puro, sem build. Hospedado na Vercel (cabeçalhos de segurança em `vercel.json`). Os dados do usuário (favoritos, projetos, prompts) ficam só no navegador.

## Estrutura

```
index.html       App (acesso por chave de licença)
landing/         Landing page, termos de uso e política de privacidade
admin/           Painel administrativo
404.html         Página de erro
js/              Lógica do app, sessão, Estúdio Livre e tradução (i18n)
css/             Estilos
assets/          Imagens e mídia
```

## Backend

O frontend se comunica com um backend privado (Node.js, Express e MongoDB) que valida as licenças e atende as chamadas protegidas da API. Este repositório não contém chaves nem segredos.

## Rodar localmente

Não há dependências nem build. Sirva a pasta raiz com qualquer servidor estático:

```bash
npx serve .
```

Abra `http://localhost:3000`. Para testar o app completo é preciso um backend acessível e uma licença válida.

## Tradução (PT → EN)

`js/i18n.js` lê o primeiro idioma do navegador e, se for inglês, carrega o dicionário `js/i18n.en.js` e traduz o site, inclusive o que o JS insere depois.

| Ação | Como |
|---|---|
| Forçar idioma | `?lang=en` ou `?lang=pt` na URL (fica salvo no navegador) |
| Voltar ao automático | `I18N.setLang(null)` no console |
| Traduzir uma string no JS | `I18N.t("texto em pt")` |
| Não traduzir um elemento | atributo `data-no-i18n` |
| Adicionar ou corrigir tradução | edite `js/i18n.en.js` (`"texto em pt": "english text"`) |

Limitações: o `/admin` não está traduzido, o preço continua em R$, mensagens vindas do backend ficam no idioma original, e a tradução dos textos legais deve ser revisada por um advogado.
