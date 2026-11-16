# Plano de otimização — V2

## Fase 1 — base técnica e integridade da oferta
- Preservar original e trabalhar na V2.
- Confirmar escopo: design/estratégia, sem fabricação/impressão.
- Corrigir canonical e OG URL apenas quando URL final estiver confirmada.
- Validar todos os caminhos de assets e links de WhatsApp.
- Confirmar formulário/Apps Script sem prometer confirmação técnica inexistente.

## Fase 2 — CRO e conteúdo
- Hero com público-alvo, resultado pretendido e CTA claro.
- Tornar explícito o que a HUMINN faz e o que não faz.
- Reescrever cases em estrutura desafio → decisão de design → entrega, com fatos existentes.
- Melhorar consistência dos CTAs.
- Reduzir fricção do formulário e esclarecer o próximo passo.
- Considerar segmentar a LP para alimentos/bebidas primeiro, se esse for o foco real da campanha; confirmar com responsável comercial.

## Fase 3 — mobile e acessibilidade
- Testar 360, 375, 390, 768, 1024 e desktop amplo.
- Verificar overflow, hierarquia, legibilidade, botões, foco visível, labels, contraste e áreas de toque.
- Respeitar prefers-reduced-motion nos efeitos de reveal.
- Testar teclado e leitores de tela em elementos principais.

## Fase 4 — performance e SEO
- Conferir peso e dimensões reais das imagens; lazy-load abaixo da dobra e prioridade do hero.
- Evitar carregar bibliotecas externas desnecessárias.
- Validar title, description, Open Graph, favicon, canonical e indexação.
- Confirmar se fontes externas são necessárias e prever fallback.

## Fase 5 — mensuração e experimento
- Validar GTM Preview e eventos.
- Não contar tentativa como lead confirmado.
- Só então iniciar comparação controlada entre versões, com URL/variante identificada e tráfego comparável.
- Medir leads confirmados e qualidade comercial, não apenas CTR/cliques.

## Critério de conclusão
A V2 só pode ser considerada pronta para aprovação quando os testes funcionais, responsivos, tracking e formulário estiverem documentados. Pronta para aprovação não significa autorizada para deploy.
