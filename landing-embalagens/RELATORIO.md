# Relatório — LP Design de Embalagens (Google Ads)

Arquivos entregues em `landing-embalagens/`:
- `index.html` — página completa, HTML/CSS/JS puro (sem build, sem React/Tailwind)
- `assets/` — imagens já copiadas e prontas (logo, 2 cases, 12 logos de marcas, favicon)

## O que foi usado, e de onde

**Design system** — replicado 1:1 do `src/index.css` do site atual: roxo `#6e28e0`, preto `#000000`, branco, cinza `#e9e8eb`; fontes Space Grotesk (títulos/corpo) e Roboto Condensed (formulário) via Google Fonts, mesmos pesos (400/500/700). Botões `rounded-full`, tipografia fluida com `clamp()`, mesma linguagem visual do site institucional.

**Textos** — todos os trechos citados são verbatim do site atual (não escrevi nenhuma alegação numérica nova):
- Hero e seção "Por que a HUMINN": *"Há mais de 13 anos colocamos os nossos projetos no mundo"* e *"conquiste espaço na gôndola e na memória do consumidor"* — ambos tirados literalmente de `src/components/About.jsx`.
- Case Casa Nonna e case Nutty — desafio/solução resumidos a partir de `src/data/projects.js` (que bate com os RTFs em `recursos/textos/`).
- "Marcas que já trabalhamos" — heading real de `src/components/Brands.jsx`, com os 12 logos reais de `public/images/brands/`.
- Seção "O problema", "Pra quem é" e "Como funciona" — texto escrito por mim (não existe conteúdo equivalente no site atual), seguindo o tom direto da marca, sem citar nenhum número.

**Imagens** — todas reais, puxadas de `public/images/` (já eram WebP otimizadas, não precisei tocar nos PSDs):
- Logo: `logo/logotipo-huminn-branco.png`
- Casa Nonna: `hero/casa-nonna.webp` (hero + case) e `portfolio-gallery/casa-nonna-02.webp` (detalhe)
- Nutty: `portfolio-gallery/nutty-02.webp` (case) e `nutty-03.webp` (detalhe) — troquei o `hero/nutty.webp` (268KB) por variantes de galeria menores para ficar dentro do limite de 200KB
- 12 logos de marcas de `public/images/brands/`
- Favicon: `public/favicon.png`

Tamanho final de cada imagem em `assets/`: entre 12KB (logo) e 190KB (nutty-detail) — todas ≤ 200KB.

**Formulário** — conectado de verdade ao mesmo endpoint que o site principal já usa (`SHEET_SCRIPT_URL` de `src/config.js`, Google Apps Script), replicando o `fetch(POST, no-cors, URLSearchParams)` do `ContactForm.jsx`. Testei o envio (interceptando o fetch para não sujar a planilha com dado de teste) e confirmei: URL, método e corpo da requisição batendo exatamente com o que o Apps Script já recebe do site. **Decisão de mapeamento**: como o formulário novo só tem Nome/WhatsApp/Tipo de produto (não tem e-mail/empresa/mensagem livre como o original), mandei `email` e `empresa` vazios e concatenei o tipo de produto + a origem do lead no campo `mensagem` (ex: `"Tipo de produto: Alimentos e bebidas | Origem: LP Embalagens (Google Ads)"`) — assim o lead cai na mesma planilha que a equipe já monitora, mas identificável. Vale conferir se a coluna "mensagem" da planilha comporta bem esse texto, ou se preferem uma coluna própria.

## O que faltou (não inventei nada no lugar)

- **Nenhuma foto real de embalagem em contexto de gôndola/prateleira** — só existem still-lifes de estúdio (fundo vermelho, padrão repetido) tanto para Casa Nonna quanto para Nutty. Usei as melhores fotos de estúdio disponíveis.
- **Nenhum número de "marcas atendidas"** — não existe essa contagem em lugar nenhum do site ou dos textos-fonte; mostrei só a faixa de logos, sem inventar quantidade.
- **A "LP base publicada em artifact"** citada no briefing como referência visual não estava disponível nesta conversa (sem link, sem histórico anterior) — segui a estrutura de seções exatamente como descrita no próprio briefing.
- **Canonical URL** (`https://huminn.com.br/embalagens`) é um placeholder — confirmar a URL final de publicação antes de subir a campanha.
- GTM / Google Ads conversion / Meta Pixel estão como blocos comentados no `<head>`, prontos para colar os IDs reais quando vocês tiverem as tags.

## Bugs que apareci e corrigi durante o teste

Ao testar a página no navegador encontrei e corrigi dois bugs reais de layout (imagem do hero e a miniatura de detalhe dos cases ficavam com altura desproporcional em alguns navegadores, por conflito entre `aspect-ratio` em CSS e os atributos `width`/`height` do HTML) — já corrigidos e reconferidos em desktop e mobile (375px), sem overflow horizontal, com o botão fixo de WhatsApp mostrando só o ícone no mobile como pedido.

## Sugestões de melhoria

1. **Fotografar (ou pedir aos clientes) uma foto real em gôndola/prateleira** da Casa Nonna ou da Nutty — reforça muito mais a promessa "vencer na gôndola" do que uma foto de estúdio, mesmo sendo esta última muito bem produzida.
2. Considerar registrar um número real de "marcas atendidas" ou "anos de mercado por segmento" para reforçar prova social sem depender só da citação institucional.
3. Depois de configurar o Google Ads, testar o formulário de verdade (sem interceptar) para confirmar que o lead está caindo certinho na planilha com o mapeamento de campos proposto.
