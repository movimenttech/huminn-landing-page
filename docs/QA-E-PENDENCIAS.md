# QA e pendências — preparação V2

## O que foi alterado nesta preparação
- Criada cópia de trabalho em `landing-embalagens-v2/index.html`.
- Caminhos de imagens apontam para os assets originais em `../landing-embalagens/assets/` para evitar cópia desnecessária de arquivos binários.
- Inserido o snippet do GTM informado: `GTM-MXD52J3T`.
- CTA WhatsApp passa a registrar evento de interação `whatsapp_click` no dataLayer.
- Tentativa de envio do formulário registrada como `form_submit_attempt`, sem classificá-la como lead confirmado.
- Texto do processo esclarece que a HUMINN entrega arquivos finais de design e não fabrica/imprime.
- Canonical foi deixado pendente na V2 até confirmação da URL final.

## Ainda não verificado
- Não foi executado navegador/servidor local, Lighthouse, PageSpeed, teste cross-browser ou teste visual automatizado nesta preparação.
- Não foi enviado formulário real; não foi validado o recebimento do Apps Script.
- Não foi validado GTM Preview/Tag Assistant, GA4 ou conversão Google Ads.
- Não foram confirmados os IDs de GA4/Google Ads nem as tags publicadas dentro do GTM.
- Não foi confirmada a URL final/canonical nem status de publicação.
- Não foi feita comparação A/B nem teste de conversão.

## Pendências prioritárias
1. Abrir V2 localmente e revisar visual em mobile/desktop.
2. Confirmar endpoint e fluxo de recebimento do formulário com teste controlado autorizado.
3. Validar GTM-MXD52J3T em Preview e mapear tags já existentes antes de criar novas.
4. Obter URL final antes de preencher canonical/og:url.
5. Confirmar com HUMINN se foco de campanha continua alimentos e bebidas ou inclui cosméticos/outros segmentos.
6. Revisar conteúdo de cases com responsável da HUMINN para garantir precisão de cada descrição.

**Status:** pacote de preparação documental e cópia V2. Não aprovado para publicação.
