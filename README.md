# HUMINN — site institucional e landing page de embalagens

Repositório com o site institucional (React/Vite) e uma landing page standalone para a oferta de design estratégico de embalagens.

## Pastas principais
- `src/` e `public/`: site institucional React + Vite.
- `landing-embalagens/`: versão original da LP, preservada como referência/backup.
- `landing-embalagens-v2/`: versão de trabalho otimizada, ainda não publicada.
- `docs/`: contexto, estratégia, análise de mídia, rastreamento, plano de otimização e QA.
- `CLAUDE.md`: regras e contexto operacional para Claude Code.

## Rodar o site institucional
```bash
npm install
npm run dev
npm run build
npm run lint
``

## Visualizar a landing page
A LP é HTML/CSS/JS puro. Sirva a raiz do repositório com um servidor estático e abra:
- Original: `/landing-embalagens/index.html`
- V2: `/landing-embalagens-v2/index.html`

A V2 reutiliza os arquivos de imagem de `landing-embalagens/assets/` por caminho relativo, evitando duplicação de binários.

## Git / segurança
- Branch de preparação: `preparacao-claude-code`.
- A `master` não deve ser alterada neste trabalho.
- A V2 não está autorizada para deploy ou substituição da página ativa. Comparar, validar e obter aprovação antes de qualquer publicação.
- Consulte `CLAUDE.md` antes de editar.
