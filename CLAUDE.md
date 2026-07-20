# CLAUDE.md — Governança do projeto Paddock 22

Documento permanente. Leia por completo antes de qualquer tarefa neste repositório.
Setup, build e deploy estão no `README.md`; aqui ficam as **regras de decisão**.

---

## 1. Filosofia do projeto

A Paddock 22 vende **competição séria**, não entretenimento casual. Regulamento
aplicado, replay revisado, comissários, telemetria. Tudo no produto deve reforçar
isso.

O slogan define o tom e **não deve ser alterado**:

> **Não criamos pilotos. Criamos vencedores.**

Assinatura secundária (manual de marca): *"Todo sonho merece a chance de acelerar."*

Critério de coerência: se um elemento visual transmite "joguinho de navegador"
enquanto o texto transmite "categoria profissional", o elemento está errado — não
o texto.

## 2. Objetivo comercial

Converter visitante em piloto inscrito. O caminho de conversão é o **WhatsApp**
(ver §7). Todo CTA principal existe para gerar essa conversa.

## 3. Público-alvo

Pilotos de sim racing brasileiros — do rookie ao veterano. Conhecem automobilismo
de verdade: reconhecem um traçado de pista errado, uma telemetria implausível ou
uma referência falsa. **Baixa fidelidade é percebida imediatamente.**

## 4. Design System

Tokens em `src/index.css` (bloco `@theme` do Tailwind v4). **Nunca escreva cor
crua em componente** — use os tokens.

| Token | Valor | Uso |
|---|---|---|
| `race-red` | `#E10600` | Ação primária, líder, destaque |
| `electric-blue` | `#0057FF` | Acento secundário, dados, setores |
| `asphalt` | `#0B0D10` | Fundo base |
| `carbon` / `carbon-2` | `#15181C` / `#1D2126` | Superfícies |
| `ivory` | `#F2F0E9` | Texto principal |
| `steel` / `steel-line` | `#8B94A3` / `#2A2F36` | Texto secundário / bordas |

Tipografia: **Oswald** (display/headlines), **Raleway** (corpo), **JetBrains
Mono** (dados, telemetria, labels).

Regras:
- **Sem amarelo.** O manual de marca é vermelho/azul/preto/branco.
- Exceções de cor crua são permitidas apenas quando a cor é de terceiros
  (ex.: blurple do Discord, verde do WhatsApp) ou identidade de equipe.
- Idioma da interface: **pt-BR**.
- `prefers-reduced-motion` deve ser respeitado em toda animação.

## 5. Política de assets

**Esta decisão vem ANTES da decisão de UI.** Inverter essa ordem já causou
retrabalho grande neste projeto (ver §10).

- ❌ **Não desenhar manualmente objetos cuja fidelidade seja requisito** —
  circuitos reais, carros, capacetes, logos de terceiros. Uma aproximação feita à
  mão em SVG será reconhecida como amadora pelo público (§3).
- ✅ Permitido: assets vetoriais próprios ou licenciados, renders próprios,
  texturas, fotografias autorizadas.
- Se o conceito **depende** de um asset premium, **declare isso antes de
  implementar**. Não comece o código na esperança de contornar depois.
- Se o asset não existir, **adapte o conceito** — não produza uma versão de baixa
  fidelidade do conceito original.
- Formas abstratas, HUD, gráficos, dados e tipografia **não** têm requisito de
  fidelidade: podem ser construídos em código à vontade.

## 6. Processo de desenvolvimento

Fluxo obrigatório. Nenhuma implementação começa sem passar pelas etapas
anteriores:

```
AUDITORIA → CONCEITO → WIREFRAME → DIREÇÃO DE ARTE → APROVAÇÃO
          → ARQUITETURA → IMPLEMENTAÇÃO → REFINO → DEPLOY
```

Para trabalho visual novo, entregue **conceito antes de código**: experiência
pretendida nos primeiros 5 segundos, storytelling, direção de arte, hierarquia,
movimento, referências reais e **conceitos distintos entre si** (não variações do
mesmo). Cada conceito com wireframe, prós, contras, complexidade e impacto
comercial.

Referências de qualidade: Fórmula 1, GT World Challenge, IMSA, WEC, Porsche
Motorsport, Fanatec, iRacing, Assetto Corsa Competizione, MoTeC/Bosch Motorsport.

## 6.1 Divisão de responsabilidades

**O versionamento é do usuário.** Ele faz commit, push, branch e PR pelo VS Code,
depois de revisar as mudanças.

O papel do Claude é **escrever código e resolver os problemas** — nunca rodar
`git commit`, `git push` ou `gh pr create`. Ao terminar uma entrega, apenas
**listar os arquivos criados/alterados** para revisão. Ler o estado do git
(`status`, `log`, `diff`) continua válido quando ajudar a orientar a decisão.

## 6.2 Desktop e mobile

Quando uma feature tiver comportamentos diferentes entre desktop e mobile, seguir
**nesta ordem**:

1. Resolver **perfeitamente o desktop**.
2. **Validar** a experiência.
3. Projetar o mobile como uma **experiência própria**.
4. **Nunca** adaptar automaticamente o desktop para caber no mobile se isso
   comprometer a qualidade.

O mobile não é uma versão espremida do desktop. Se a adaptação automática piorar a
experiência, **registrar em Design Debt (§12) e resolver na sprint de direção de
arte** — não improvisar, e não ocultar como solução definitiva.

## 7. Regras de arquitetura

- **Conteúdo fictício** vive em `src/data.ts` (ranking, hall da fama, depoimentos,
  parceiros, estatísticas). Está marcado como demonstração — não apresente como real.
- **Dados reais** (não substituir por fictícios):
  - WhatsApp centralizado em `src/wa.ts` (`wa(mensagem)`); número em um único lugar.
  - Instagram `@paddock.22` · YouTube `@paddock22tv` · `paddock22.oficial@gmail.com`
  - Calendário: **somente autódromos brasileiros**.
  - Comunidade: "mais de 200 pilotos".
- **Todo CTA principal aponta para o WhatsApp**, cada um com mensagem própria e
  contextual, via `wa()`.
- **Isole tickers**: qualquer componente que atualiza por segundo (contador,
  telemetria) fica em componente próprio. Estado que muda a cada segundo no topo
  de uma seção re-renderiza a árvore inteira e quebra animações (ver §10).
- Estado de UI: **uma única fonte de verdade**; derive o resto. Evite dois estados
  que precisem ficar sincronizados.

## 8. Restrições permanentes (armadilhas do ambiente)

Verificadas nesta base de código. Ignorar custa horas.

1. **O projeto está numa pasta do OneDrive.** O watcher do Vite perde alterações
   e o servidor passa a entregar **bundle antigo**. Sintoma: uma correção correta
   "não funciona" na verificação. Antes de concluir que algo falhou:
   `rm -rf node_modules/.vite` + reiniciar o dev server.
2. **O painel de preview renderiza com `document.hidden = true`.** Logo
   `requestAnimationFrame`, SMIL e animações CSS ficam **pausados**. É impossível
   verificar movimento ali — valide geometria/DOM estático e confirme o movimento
   em navegador real ou no deploy.
3. **`AnimatePresence` (framer-motion) + React StrictMode**: a animação de saída
   pode nunca disparar, deixando o nó montado para sempre. Para dispensar
   overlays, prefira desmontar por condicional simples + transição CSS de opacidade.
4. **`offset-path` / `offset-distance` (CSS Motion Path) não anima em elementos
   SVG** neste Chromium. Para mover algo ao longo de um path, use `rAF` +
   `getPointAtLength()`.
5. **Nunca use `animate={cond ? {...} : {}}`** no framer-motion — o objeto vazio
   deixa o elemento preso no `initial`. Declare valores explícitos nos dois ramos.
6. **Nunca use `clip-path` que zere a área visível no estado inicial de uma
   animação disparada por viewport** (`whileInView`, `IntersectionObserver`).
   `clip-path: inset(0 0 100% 0)` faz o observer reportar `isIntersecting: false`,
   o gatilho nunca dispara e o bloco fica **invisível para sempre** — o elemento
   não aparece porque está escondido, e não sai de escondido porque não aparece.
   Para revelar ao rolar, use apenas `opacity` + `transform`. *(Este bug deixou
   todas as seções abaixo do Hero em branco no mobile; no desktop o observer às
   vezes ganhava a corrida contra o clip, o que mascarava o problema.)*
7. **Cuidado com contêiner de largura total sobre elemento posicionado.** Um
   wrapper `w-full` que vem depois no DOM cobre o que está à direita e engole os
   eventos de mouse (matou o hover do mapa). Use `pointer-events-none` no
   contêiner e `pointer-events-auto` no conteúdo.
8. **`inset-0` ignora o `padding` do pai** — o bloco de contenção de um elemento
   absoluto é o *padding box*. Para margem real, use `inset-[valor]`.

## 9. Definição de qualidade

A régua é a **coluna esquerda do Hero** (tipografia + hierarquia + contador).
Componente novo que não chegue nesse nível **não entra**. É melhor não ter o
elemento do que ter uma versão fraca dele — ausência é neutra, baixa fidelidade
é negativa.

Antes de entregar: `npx tsc -b` limpo, sem erros de console, e verificação real
do comportamento (respeitando §8.2 quando envolver movimento). Relate o que **não**
foi possível verificar — não afirme que funciona sem ter visto.

## 10. Quando parar

Se durante uma implementação o resultado estiver convergindo para uma linguagem
visual diferente da desejada:

- **interromper a implementação;**
- **explicar por que não está convergindo;**
- **propor novos conceitos;**
- **não insistir em ajustes incrementais.**

Nunca gaste várias iterações tentando salvar um conceito inadequado.

Sinais de que é hora de parar: o mesmo componente recebeu 3+ rodadas de ajuste; o
feedback é sobre *linguagem visual* ("parece amador", "parece jogo") e não sobre
parâmetros; ou a fidelidade exigida depende de um asset que não existe (§5).

> **Caso de referência — o mapa de Interlagos (2026).** Um traçado do circuito foi
> desenhado à mão em SVG e recebeu quatro rodadas de refino (fidelidade, espessura,
> velocidade, HUD). O problema nunca foi de implementação: era de conceito e de
> política de assets. Desenhar um circuito real à mão não alcança a referência
> pretendida. O correto teria sido interromper na primeira rodada, declarar a
> limitação de asset e propor outro conceito.

## 11. Princípios de produto

Antes de implementar qualquer **feature nova ou trabalho visual**, responder:

1. Isso aumenta a percepção premium?
2. Isso ajuda a vender campeonatos?
3. Isso reduz atrito do usuário?
4. Isso reforça a identidade da Paddock 22?
5. Isso seria mostrado com orgulho numa apresentação para um patrocinador?

A pergunta 5 é a mais decisiva — é o teste de vergonha. Se a resposta for "não",
o elemento não deveria existir na página.

Se **qualquer** resposta for "não", interromper e reavaliar antes de codar.

*Escopo:* estes princípios se aplicam a feature nova e trabalho visual. **Não** se
aplicam a correção de bug, acessibilidade, performance, refactor ou dívida técnica
— essas não precisam justificar impacto comercial para serem feitas.

## 12. Design Debt

Registro do que é **provisório**. Toda vez que entrar um placeholder, mock,
animação temporária, SVG simplificado ou solução "por enquanto", **anotar aqui** —
caso contrário o provisório vira permanente por esquecimento.

| Item | Onde | Situação |
|---|---|---|
| **Mapa no mobile** | `Hero.tsx` · `InterlagosMap.tsx` | O mapa atual foi pensado para **desktop**. O mobile terá solução própria de UX e direção de arte. Hoje está oculto abaixo de `lg` — **medida provisória, não definitiva**. Não improvisar adaptação nem manter oculto para sempre. Resolver **apenas na Sprint 04 (Design System)**. Possibilidades a avaliar: mapa abaixo do Hero; largura total; versão simplificada sem callouts; expansível ao toque; animação independente do Hero. Nenhuma escolhida ainda. |
| Mockup de referência não usado | `src/assets/ChatGPT Image ….png` (~2 MB) | Imagem de direção de arte gerada por IA. Não é usada em código. Mover para fora do repositório ou remover. |
| Galeria sem fotos reais | `GalleryPartnersTestimonials.tsx` | Tiles gráficos com ícone no lugar de imagens. A estrutura já aceita fotos — trocar quando houver material. |
| Conteúdo fictício | `src/data.ts` | Ranking, hall da fama, depoimentos, parceiros e estatísticas são demonstração. Substituir por dados reais antes do lançamento. |
| Botão da comunidade aponta para WhatsApp | `DiscordFooter.tsx` | Provisório ("por enquanto"). Voltar para convite real do Discord quando existir, restaurando rótulo e cor. |
| Link "Regulamento" sem destino | `DiscordFooter.tsx` | `href="#"`. Precisa de página ou documento. |
| Aviso "PROJETO FICTÍCIO · CONTEÚDO DE DEMONSTRAÇÃO" | rodapé | Remover quando o conteúdo real entrar. |
| `hero.png` não utilizado | `src/assets/` | Placeholder herdado do template Vite. Remover. |

## 13. Roadmap (sprints)

Um objetivo por sprint. Não misturar escopos — foi misturar "melhorar o mapa" com
"definir a linguagem visual" que gerou o retrabalho do §10.

| Sprint | Objetivo | Status |
|---|---|---|
| 01 · Fundação | Stack, deploy, estrutura de seções | ✅ concluído |
| 02 · Identidade | Manual de marca aplicado (paleta, tipografia, logo) | ✅ concluído |
| 03 · Conversão | CTAs para WhatsApp, dados reais de contato | ✅ concluído |
| 04 · **Design System** | Direção de arte da plataforma: conceito, referências, linguagem de movimento e componentes. **Sem código.** | ⏳ **próximo** |
| 05 · Hero 2.0 | Implementar o Hero segundo o conceito aprovado na Sprint 04 | 🔒 bloqueado pela 04 |
| 06 · Conteúdo real | Substituir `src/data.ts` por dados verdadeiros | ⬜ |
| 07 · Mobile | Revisão completa em telas pequenas | ⬜ |
| 08 · Performance | Bundle, fontes, animações, Lighthouse | ⬜ |
| 09 · SEO & social | Metadados, OG, sitemap, favicon definitivo | ⬜ |
| 10 · Lançamento | Domínio, analytics, revisão final | ⬜ |

A Sprint 04 **bloqueia** a 05: nenhum componente visual novo entra antes da
direção de arte aprovada.
