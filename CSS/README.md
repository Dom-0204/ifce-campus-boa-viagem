# Organização do CSS — Portal ADS IFCE Boa Viagem

O CSS do projeto é dividido em arquivos menores e específicos, em vez de um único
`style.css` monolítico. Isso facilita manutenção, evita conflitos ao editar em
equipe e deixa claro o que cada arquivo afeta.

## Estrutura

```
CSS/
├── base.css            -> Reset, variáveis (design tokens) e tipografia.
│                          Tudo aqui é compartilhado por TODAS as páginas.
├── layout.css          -> Header, Hero, Página Inicial (main da Home) e Footer.
│                          Compartilhado por todas as páginas (header/footer)
│                          e exclusivo da Home (hero/página inicial).
├── componentes.css      -> Cards, botões, dropdowns, busca, FAQ, tema (dark mode).
│                          Componentes reutilizáveis em múltiplas páginas.
└── paginas/
    ├── universal.css        -> cidts.html, bolsas.html, cursos.html, ingresso.html
    │                          (páginas que usam o layout de sidebar + cards)
    ├── institucional.css    -> institucional.html
    ├── professores.css      -> professores.html
    ├── links-uteis.css      -> links-uteis.html
    ├── extensao.css         -> extensao.html, ifinternacional.html
    ├── contato.css          -> contato.html
    ├── noticias.css         -> noticias.html
    ├── pesquisas.css        -> pesquisas.html
    └── ads.css              -> ads.html
```

## Regra de uso em cada página HTML

Toda página carrega, nesta ordem, no `<head>`:

```html
<link rel="stylesheet" href="../CSS/base.css">
<link rel="stylesheet" href="../CSS/layout.css">
<link rel="stylesheet" href="../CSS/componentes.css">
<link rel="stylesheet" href="../CSS/paginas/NOME-DA-PAGINA.css">
```

A ordem importa: `base` define as variáveis que todos os outros arquivos usam;
`layout` e `componentes` vêm depois porque podem sobrescrever estilos genéricos;
o CSS específico da página vem por último, para poder ajustar qualquer coisa
sem precisar de `!important`.

## Onde adicionar um novo estilo

- **Mudou uma cor, espaçamento padrão ou fonte do site inteiro?** → `base.css`
- **Mudou o header, footer, hero ou algo que aparece em todas as páginas?** → `layout.css`
- **Criou um novo tipo de card, botão ou componente reaproveitável?** → `componentes.css`
- **É uma seção que só existe em uma página específica?** → o arquivo dela em `CSS/paginas/`
- **Criou uma página nova?** → crie um novo arquivo em `CSS/paginas/` com o nome da página

## Dark mode

As variáveis de dark mode (`body.dark-mode { --cor-fundo: ...; }`) ficam em
`base.css`, junto com as variáveis normais — assim qualquer página que carregue
`base.css` já tem o dark mode funcionando para os tokens padrão. Ajustes finos
de dark mode específicos de uma página (ex: corrigir o contraste de um card
que não usa as variáveis padrão) ficam no arquivo CSS daquela página mesmo,
em uma seção comentada como "DARK MODE — Nome da Página".
