# Viralyze — Tradução automática (PT → EN)

Detecta o idioma do navegador e, se o primeiro idioma for inglês, traduz o site inteiro para inglês. Qualquer outro idioma continua em português.

## Como funciona

- `js/i18n.js` lê `navigator.languages[0]`. Se começar com `en`, baixa o dicionário e troca os textos, `placeholder`, `title`, `aria-label`, `alt` e meta tags.
- Um `MutationObserver` traduz também o que o JS do app insere depois (toasts, cards, chat do Estúdio Livre).
- `js/i18n.en.js` é o dicionário PT → EN (~775 entradas). Só é baixado por quem está em inglês.
- Datas e horas (`pt-BR` fixo no código) saem em `en-US` no modo inglês.
- Se o dicionário não carregar, o site aparece em português após 3 segundos.

## Instalação

1. Coloque `i18n.js` e `i18n.en.js` em `js/`.
2. Em cada HTML, adicione no `<head>` (antes do `<link rel="icon"`):
   - `index.html`: `<script src="js/i18n.js"></script>`
   - `landing/*.html` e `404.html`: `<script src="/js/i18n.js"></script>`
3. Em `404.html`, troque `script-src 'none'` por `script-src 'self'` no CSP.

## Uso

| Ação | Como |
|---|---|
| Forçar inglês ou português | Adicione `?lang=en` ou `?lang=pt` na URL (fica salvo no navegador) |
| Voltar ao automático | `I18N.setLang(null)` no console |
| Traduzir uma string no JS | `I18N.t("texto em pt")` |
| Não traduzir um elemento | Adicione o atributo `data-no-i18n` |

## Adicionar ou corrigir traduções

Edite `js/i18n.en.js`, no formato `"texto em português": "english text"`. A chave deve ser idêntica ao texto original (espaços extras são ignorados). Frases com números ou nomes variáveis ficam em `js/i18n.js`, na lista `P` (expressões regulares).

Para a mesma frase ter traduções diferentes conforme a tag pai, use a chave `tag::Texto` (ex.: `"em::Privacidade": "Policy"`).

## Alterações em arquivos existentes

- `js/script.js`: a busca global também procura pelo nome em inglês.
- `js/freestudio.js`: botões de resposta rápida usam `data-val` (valor original), o bot digita já em inglês e os prompts gerados usam nomes em inglês.

## Limitações

- O painel `/admin` não foi traduzido.
- Preço continua em R$.
- Mensagens de erro e respostas da IA vindas do backend continuam no idioma original.
- A tradução da política de privacidade e dos termos é literal e deve ser revisada por um advogado.
