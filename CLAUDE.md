# Instruções do projeto — HUMINN Landing Page

## Papel do agente
Atue como engenheiro front-end sênior e especialista em CRO/SEO técnico. Trabalhe com cautela, explique decisões e não invente fatos, resultados, depoimentos, credenciais, IDs ou integrações.

## Regras obrigatórias
- A branch de trabalho é `preparacao-claude-code`; nunca altere `master` sem autorização expressa.
- A versão original em `landing-embalagens/` é referência e backup. Não sobrescreva seus arquivos.
- A V2 está em `landing-embalagens-v2/`. Faça alterações nela, salvo instrução explícita.
- Não publicar, fazer deploy, configurar domínio, alterar campanha, mesclar branches ou trocar a LP ativa sem autorização expressa.
- Antes de editar, inspecione o arquivo e o histórico. Faça alterações pequenas e verificáveis.
- Não crie métricas, resultados de cases, quantidade de clientes ou alegações não comprovadas.
- A HUMINN presta estratégia e design de embalagens; não fabrica nem imprime embalagens. A gráfica/produção é responsabilidade do cliente/fornecedor contratado.
- O único container GTM informado é `GTM-MXD52J3T`. Não invente outro. Não presuma que GA4/Google Ads já estejam configurados dentro dele.
- Não declarar lead como conversão confirmada quando o formulário usa `fetch` com `mode: no-cors`, pois a resposta não permite verificar o recebimento real.
- Não exibir mensagens de sucesso que afirmem confirmação do servidor sem mecanismo de confirmação verificável.
- Não remover ou alterar o endpoint do Apps Script sem validação e autorização.

## Como executar
- O site institucional usa React + Vite. A LP em `landing-embalagens/` é HTML/CSS/JS puro, independente do build principal.
- A V2 é HTML/CSS/JS puro e reutiliza imagens originais por caminhos relativos para `../landing-embalagens/assets/`; não duplicar binários sem necessidade.
- Para o site institucional: `npm install`, `npm run dev`, `npm run build`, `npm run lint`.
- Para a LP standalone, abrir `landing-embalagens-v2/index.html` localmente ou servir a pasta com servidor estático.

## Processo de trabalho
1. Ler `docs/CONTEXTO-DO-PROJETO.md`, `docs/ESTRATEGIA-DE-CONVERSAO.md`, `docs/ANALISE-GOOGLE-ADS.md`, `docs/RASTREAMENTO-GTM.md` e `docs/PLANO-DE-OTIMIZACAO.md`.
2. Conferir diferenças entre original e V2 antes de propor mudanças.
3. Priorizar clareza da oferta, aderência da intenção de busca, CTA, formulário e experiência mobile.
4. Validar links, assets, acessibilidade básica, console, responsividade e fluxo de formulário sem enviar leads fictícios à planilha real.
5. Registrar testes realmente executados e limitações em `docs/QA-E-PENDENCIAS.md`.
6. Ao concluir, apresentar resumo, arquivos alterados, testes realizados, riscos e próximos passos. Não alegar teste que não executou.
