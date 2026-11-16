# Plano de rastreamento — GTM e leads

## Container conhecido
- GTM: `GTM-MXD52J3T` (ID informado pelo usuário/equipe).
- Não criar outro container.
- A inserção do snippet no HTML não comprova que o container esteja publicado, que tags existam ou que eventos estejam chegando ao Google Ads/GA4.

## Estado encontrado na LP original
- Snippet GTM comentado com placeholder `GTM-XXXXXXX`.
- Tag gtag/Google Ads e Meta Pixel eram blocos comentados com placeholders.
- Evento JavaScript genérico fazia push para dataLayer, mas não representava conversão de Google Ads configurada.
- Formulário usa Google Apps Script com `fetch` e `mode: 'no-cors'`. A resposta é opaca; o navegador não consegue confirmar o recebimento/registro no Apps Script. Um `.then()` não deve ser interpretado como confirmação do lead.

## Eventos sugeridos
- `whatsapp_click`: clique em link de WhatsApp, com `cta_location` (header, hero, CTA final, sticky). É intenção de contato, não lead validado.
- `form_submit_attempt`: tentativa de envio do formulário. Não contar como lead confirmado enquanto não houver retorno verificável.
- `lead_confirmed`: somente após implementar e testar mecanismo de confirmação real, como endpoint que retorne sucesso verificável ou integração de CRM com status confirmado.

## Checklist de configuração
- [ ] Conferir se GTM-MXD52J3T está publicado e pertence à propriedade correta.
- [ ] Abrir GTM Preview/Tag Assistant e confirmar carregamento do container na URL de teste.
- [ ] Verificar se há GA4 Configuration/Google tag e se o Measurement ID é o correto (não disponível neste contexto).
- [ ] Verificar se conversão Google Ads existe e obter Conversion ID/Label oficiais (não disponíveis neste contexto).
- [ ] Configurar acionadores para eventos reais, sem duplicidade entre GTM e gtag hardcoded.
- [ ] Testar clique WhatsApp em desktop/mobile.
- [ ] Testar envio de formulário em ambiente seguro sem inserir lead fictício na planilha comercial.
- [ ] Validar recebimento na planilha/CRM e revisar política de privacidade/consentimento aplicável.
- [ ] Confirmar deduplicação, atribuição e janela de conversão.

## Regra
Não declarar conversão funcionando apenas porque o evento aparece no dataLayer. Não criar IDs fictícios. Não disparar evento de lead confirmado em clique de WhatsApp ou tentativa de formulário.
