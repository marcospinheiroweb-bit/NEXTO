# NEXTO — Consultoria & Serviços

Site institucional responsivo recriado a partir do arquivo MONEY.zip e das referências visuais fornecidas.

## Como abrir

Abra `index.html` em um navegador para visualizar a página. Para testar instalação como PWA e funcionamento offline, use um servidor web HTTPS ou localhost (por exemplo, `python -m http.server 8000` na pasta NEXTO e abra `http://localhost:8000`). Não exige instalação de bibliotecas ou processo de build.

## Conteúdos implementados

- Marca NEXTO com versões do logotipo retiradas das referências encaminhadas, paleta azul-marinho, azul e ciano, layout responsivo.
- Apresentação empresarial, nove serviços, sistema de gestão, segmentos atendidos, metodologia e contatos.
- Agendamento por seleção de data e envio de uma mensagem pré-preenchida ao WhatsApp **(91) 99193-3479**. O agendamento não reserva horário automaticamente.
- Calendário de eventos salvo **somente no navegador local**. Não é um painel administrativo autenticado nem um calendário público compartilhado.
- Seção **Catálogos dos parceiros** restaurada com os três arquivos originais em PDF, imagens das capas e botões para visualizar ou baixar: Food Service, Furniture e Equipment.
- Ícones de PWA, manifesto, service worker e fallback offline; páginas legais atualizadas.
- Dados de contato: **nextoconsultoria@outlook.com** e Paragominas/PA, conforme material fornecido.

## Antes de publicar em produção

1. Validar textos, serviços, condições comerciais e contatos com a NEXTO.
2. Revisar a política de privacidade e os termos com assessoria responsável.
3. Caso deseje agenda de eventos pública ou agendamentos realmente confirmados, integrar backend, autenticação e banco de dados; o calendário atual é somente local.
4. As telas de ERP e números são **ilustrativos**, não conectados a sistema real.
5. Os catálogos são cópias íntegras dos três PDFs que acompanhavam o site anterior. Confira as autorizações de divulgação desses materiais antes de publicar. O repositório Git do ZIP original não está incluído. PDFs grandes não são mantidos no cache offline.

## Estrutura

`index.html`, `css/styles.css`, `js/main.js`, `assets/`, `imgs/` (capas), `pdfcatalogos/` (3 PDFs), `manifest.json`, `sw.js`, `offline.html`, páginas legais.

Site NEXTO — publicação GitHub Pages.
