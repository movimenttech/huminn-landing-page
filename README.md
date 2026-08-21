# HUMINN — Landing Page

Site institucional da HUMINN. React + Vite + Tailwind CSS + Framer Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Gerar o build de produção

```bash
npm run build
```

Isso gera a pasta `dist/` — é só o conteúdo dessa pasta que precisa ir pro
seu domínio (não suba `src/`, `node_modules/`, `recursos/` nem
`WIREFRAME COMPLETO/`, são só material de desenvolvimento).

Para conferir o resultado antes de subir:

```bash
npm run preview
```

## Subir pro domínio

Como é um site 100% estático (sem back-end próprio — o formulário de
contato usa um iframe do CRM Alphaville, e as imagens são todas locais),
qualquer hospedagem estática serve. Alguns caminhos comuns:

- **Hospedagem compartilhada (cPanel, Hostinger, etc.):** suba todo o
  conteúdo de dentro de `dist/` (o `index.html` e a pasta `assets/`) direto
  na raiz do domínio via FTP/gerenciador de arquivos.
- **Vercel / Netlify:** conectar o repositório e configurar
  *build command* `npm run build` e *publish/output directory* `dist`.

O site assume que vai ficar na **raiz** do domínio (`https://seudominio.com.br/`).
Se for publicar dentro de uma subpasta (`https://seudominio.com.br/site/`),
avise que precisa ajustar o `base` no `vite.config.js` antes de gerar o
build, senão as imagens e o CSS não carregam.

## Estrutura

- `src/components/` — uma seção do site por arquivo (Header, Hero, About,
  Services, Portfolio, Brands, ContactForm, SocialSection, Footer).
- `src/data/` — conteúdo dos projetos do portfólio e das marcas parceiras.
- `public/images/` — todas as imagens usadas no site (já otimizadas em WebP).
- `recursos/` e `WIREFRAME COMPLETO/` — material de referência do design
  original, não faz parte do site publicado.

## Pendências conhecidas

- A legenda branca embaixo do nome de cada projeto em "Nossos Trabalhos"
  ainda é o placeholder "Breve descrição do projeto" — nunca foi pedido pra
  trocar por um texto real ali.
- Os links de Instagram, LinkedIn e Facebook (rodapé e seção "Quer
  acompanhar de perto?") já apontam pros perfis reais da HUMINN.
