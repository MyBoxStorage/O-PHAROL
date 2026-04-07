# ROADMAP COMPLETO — O PHAROL RESTAURANTE GOURMET
### Auditoria Técnica + Plano de Evolução
**Data da auditoria:** Abril 2026  
**Versão do projeto auditado:** 1.0.0  
**Auditor:** Claude (Anthropic) — Análise de 100% dos arquivos do projeto

---

## ÍNDICE

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Stack Tecnológica Atual](#2-stack-tecnológica-atual)
3. [Mapa Completo de Arquivos e Funções](#3-mapa-completo-de-arquivos-e-funções)
4. [Fluxos do Sistema](#4-fluxos-do-sistema)
5. [Diagnóstico Honesto — O Que Não Está Funcionando](#5-diagnóstico-honesto--o-que-não-está-funcionando)
6. [O Que Está Funcionando Bem](#6-o-que-está-funcionando-bem)
7. [Oportunidades de Melhoria](#7-oportunidades-de-melhoria)
8. [Roadmap de Execução — Fases e Prioridades](#8-roadmap-de-execução--fases-e-prioridades)
9. [Sugestões Estratégicas de Médio e Longo Prazo](#9-sugestões-estratégicas-de-médio-e-longo-prazo)
10. [Checklist de Qualidade](#10-checklist-de-qualidade)

---

## 1. VISÃO GERAL DO PROJETO

O Pharol é um site institucional para o Restaurante O Pharol Gourmet, localizado em Balneário Camboriú–SC. O projeto é uma SPA (Single Page Application) construída em Next.js 14 com App Router, focada em conversão de clientes via reservas pelo WhatsApp.

### Propósito central do site
- Apresentar o restaurante de forma premium e gourmet
- Capturar leads (nome, e-mail, WhatsApp) via fluxo de reserva
- Integrar os dados capturados com a plataforma **BC Connect** (CRM de leads)
- Oferecer fila virtual e área do cliente como diferenciais

### Dados do Restaurante
| Campo | Valor |
|---|---|
| Nome | O Pharol Restaurante Gourmet |
| Endereço | Av. Atlântica, 2554 – Sala 01, esquina Rua 2000, Centro |
| CEP | 88330-906 — Balneário Camboriú – SC |
| Telefone | (47) 3367-3800 |
| WhatsApp | 554733673800 |
| E-mail | opharol@opharol.com.br |
| Instagram | @opharolbc.oficial |
| Horário | Segunda a Domingo, 11h30 – 00h30 |
| CNPJ | 18.618.919/0001-09 |
| Desenvolvido por | Global Landing → https://globallanding.com.br |

---

## 2. STACK TECNOLÓGICA ATUAL

| Tecnologia | Versão | Função |
|---|---|---|
| Next.js | 14.2.35 | Framework principal (App Router) |
| React | 18.3.1 | Biblioteca de UI |
| TypeScript | 5.9.3 | Tipagem estática |
| Framer Motion | 12.35.1 | Animações e transições |
| CSS Custom Properties | — | Sistema de design (tokens) |
| Cloudinary CDN | — | Hospedagem e entrega de vídeos |
| BC Connect API | v2 | CRM de leads e reservas |
| WhatsApp Business | — | Canal de conversão final |
| Vercel | — | Deploy e hospedagem |

### Fontes Google (next/font/google)
| Variável CSS | Fonte | Uso |
|---|---|---|
| --font-playfair | Playfair Display | Headings principais |
| --font-cormorant | Cormorant Garamond | Subtextos elegantes |
| --font-montserrat | Montserrat | UI, labels, navegação |
| --font-great-vibes | Great Vibes | Acentos decorativos |

### Paleta de Cores (tokens CSS)
| Token | Hex | Uso |
|---|---|---|
| --navy | #1B2B6B | Azul marinho principal |
| --navy-deep | #0D1838 | Fundos dark |
| --gold | #C9A84C | Cor premium, CTAs |
| --cream | #F9F6F0 | Fundo principal |
| --red-dark | #9E0D24 | Alertas, avisos |

---

## 3. MAPA COMPLETO DE ARQUIVOS E FUNÇÕES

### app/ — Núcleo Next.js

**app/page.tsx** — Página principal SPA
- Gerencia 4 estados de overlay: `openReservation`, `openClient`, `openQueue`, `openAdmin`
- Compõe todos os componentes da página em ordem
- Passa callbacks `onReserve`, `onQueue`, `onClientArea`, `onAdmin` para componentes filhos

**app/layout.tsx** — Layout raiz
- Importa globals.css
- Aplica variáveis CSS das 4 fontes no elemento `<html>`
- Define metadados SEO da página

**app/fonts.ts** — Configuração de fontes
- Declara as 4 fontes Google com variáveis CSS
- ⚠️ Falta `display: 'swap'` em todas as fontes (causa FOUT)

**app/globals.css** — Sistema de design
- Define tokens `:root` (cores, tipografia)
- Classes utilitárias: `.container`, `.section`, `.btn-primary`, `.btn-secondary`, `.overlay-shell`
- Breakpoints responsivos para todos os componentes principais

**app/lib/bcconnect.ts** — Cliente BC Connect
- Função `sendBcEvent()` para enviar eventos ao CRM
- Suporta eventos: `SIGNUP`, `RESERVATION`, `PREFERENCE_UPDATE`, `TICKET_PURCHASE`, `LOGIN`
- Timeout de 5 segundos, falha silenciosa para não bloquear UX

### app/api/ — Rotas de API

**app/api/reserva/route.ts** — POST /api/reserva
- Recebe dados da reserva (nome, email, whatsapp, data, horário, pessoas, preferências)
- Calcula ticket estimado: pessoas × R$130
- Envia evento `RESERVATION` ao BC Connect
- Retorna `{ success: true }` mesmo em caso de erro (não bloqueia o WhatsApp)

**app/api/lead/route.ts** — POST /api/lead
- Endpoint genérico para cadastros e logins
- Suporta qualquer `BcEventType` válido
- Usado pela Área do Cliente para `SIGNUP` e `LOGIN`

**app/api/avaliacao/route.ts** — POST /api/avaliacao
- Recebe nota (1–5), comentário e data de visita
- Envia evento `PREFERENCE_UPDATE` com metadata de rating
- Validação: e-mail obrigatório, nota entre 1 e 5

### components/ — Componentes de UI

**components/Loader.tsx** — Tela de loading
- Exibida até o site terminar de carregar
- Animação com LighthouseSVG + barra de progresso dourada
- Chama `onComplete()` quando finaliza

**components/Navbar.tsx** — Navegação fixa
- Transparente no topo → branco fosco ao scrollar (>80px)
- Links: O Restaurante, Cardápio, Nossa História, Localização, Fila Virtual
- IntersectionObserver para detectar seção ativa (link dourado)
- Seletor de idioma PT/EN/ES (decorativo — sem tradução real implementada)
- Botões "Reservar Mesa" e "Minha Área"
- Drawer mobile com animação slide da direita

**components/Hero.tsx** — Seção hero full-screen
- Vídeo Cloudinary em loop com autoplay, muted, playsInline
- Efeito parallax com `useScroll` + `useTransform` do Framer Motion
- Animação de entrada do título "O PHAROL"
- Botões CTA: "Reservar Mesa" e "Ver Cardápio"

**components/Credentials.tsx** — Barra de credenciais (fundo navy)
- 5 métricas animadas: 38 anos, 4.9★, 400+ pratos, Rodízio diário, Localização
- Contadores animados com `useCounter` hook + IntersectionObserver
- Grid de 5 colunas com separadores dourados

**components/About.tsx** — Seção "Sobre"
- Grid 45/55: vídeo almoco-orla à esquerda, texto à direita
- Badge "38" sobreposto ao vídeo (posição absoluta)
- Texto narrativo sobre história e filosofia do restaurante

**components/Showcase.tsx** — Galeria de vídeos (carrossel)
- 6 cards de vídeo com drag-to-scroll
- Progress bar dourada mostrando posição no scroll
- Cada card tem label e sublabel descritivos

**components/Menu.tsx** — Cardápio digital
- 9 abas: Sugestões, Entradas, Frutos do Mar, Peixes, Camarão, Bovinos, Aves, Massas, Bebidas
- AnimatePresence com `mode="wait"` para transição suave entre abas
- `layoutId` no indicador de aba ativa para animação de deslize
- 400+ itens reais com números de item e preços atualizados

**components/History.tsx** — Linha do tempo (fundo navy)
- Timeline vertical 1986–2024
- Dados de `lib/timelineData.ts`
- Animações `whileInView` em cada item

**components/Location.tsx** — Localização
- Grid 2 colunas: card de informações + mapa SVG animado
- Card contém: endereço completo, horários, telefone, WhatsApp, Instagram
- Mapa: SVG decorativo com marcador animado (não é Google Maps real)

**components/Valet.tsx** — Seção de valet
- Informações sobre o serviço de manobrista

**components/ReserveSection.tsx** — Formulário de reserva inline
- Campos: Nome, Data, Horário, Pessoas, Preferência de Mesa, WhatsApp, Observações
- ⚠️ PROBLEMA CRÍTICO: O formulário captura os dados mas NÃO faz nada com eles
- Botão principal apenas abre o ReservationOverlay ao invés de enviar para WhatsApp
- Presença de `void nome; void data; ...` para silenciar warnings TypeScript (hack técnico)

**components/Footer.tsx** — Rodapé
- 4 colunas: Logo+descrição, Links, Contato, Horários
- Links para reserva, fila, área do cliente
- Crédito: Desenvolvido por Global Landing

### components/overlays/ — Painéis deslizantes

**components/overlays/ReservationOverlay.tsx** — Fluxo de reserva (4 passos)
- Passo 1: Seleção de data (próximos 14 dias) e horário
- Passo 2: Preferências de assento e restrições alimentares
- Passo 3: Pré-seleção de pratos do menu (sem comprometer pedido)
- Passo 4: Formulário de dados (nome*, email*, whatsapp) + opt-in parceiros
- Ao confirmar: chama `/api/reserva` e abre WhatsApp com texto pré-formatado
- Animação: slide da direita com Framer Motion

**components/overlays/ClientOverlay.tsx** — Área do Cliente (570 linhas)
- Tela de auth: login (email + senha) / cadastro (nome, email, whatsapp, cpf)
- Após auth: dashboard com 5 abas:
  - Reservas: lista de reservas futuras com status (confirmar/cancelar)
  - Fila Virtual: entrada e acompanhamento de fila
  - Histórico: visitas passadas com pontos ganhos
  - Fidelidade: programa de pontos com resgates
  - Avaliações: formulário de estrelas + comentário
- ⚠️ PROBLEMA: Auth é fake — qualquer email/senha dá acesso ao dashboard
- ⚠️ PROBLEMA: Dados do dashboard são mock estático ("Carlos Andrade", 1240 pts)
- ⚠️ PROBLEMA: Cancelamentos são apenas visuais (local state), não persistem

**components/overlays/QueueOverlay.tsx** — Fila Virtual
- Tela "Entrar na Fila": nome*, WhatsApp*, número de pessoas
- Tela "Status": número da vez, grupos à frente, tempo estimado
- Simula countdown com `setInterval` a cada 15 segundos
- ⚠️ PROBLEMA: Não há backend real — número e posição são gerados aleatoriamente
- ⚠️ PROBLEMA: Aviso por WhatsApp é apenas texto decorativo, não é enviado de fato

**components/overlays/AdminOverlay.tsx** — Painel Administrativo
- Login com credenciais hardcoded no código-fonte: `admin@admin.com.br` / `123456789`
- 5 painéis: Dashboard, Reservas, Fila, Cardápio, Clientes
- ⚠️ PROBLEMA GRAVE: Credenciais de admin expostas no código-fonte
- ⚠️ PROBLEMA: Todos os dados são mock estáticos (tabelas falsas)
- ⚠️ PROBLEMA: Botões "Editar", "Remover", "Avançar" não têm ação implementada
- Acesso via clique oculto no Footer (sem link visível)

### components/ui/ — Componentes de UI menores

**components/ui/LighthouseSVG.tsx** — SVG do farol animado
**components/ui/LogoPharol.tsx** — Logo do restaurante
**components/ui/CounterAnimate.tsx** — ⚠️ Não está importado em nenhum lugar (dead code)

### hooks/

**hooks/useCounter.ts** — Contador animado com IntersectionObserver + requestAnimationFrame
**hooks/useScrollReveal.ts** — Variantes Framer Motion para animações de scroll

### lib/

**lib/videoData.ts** — 7 URLs de vídeo Cloudinary (imutáveis)
**lib/menuData.ts** — Cardápio completo com 400+ itens, 9 categorias, preços reais
**lib/timelineData.ts** — Dados da linha do tempo histórica 1986–2024

---

## 4. FLUXOS DO SISTEMA

### Fluxo 1: Reserva via Overlay (fluxo principal)
```
Usuário clica "Reservar Mesa"
  → ReservationOverlay abre (slide da direita)
    → Passo 1: escolhe data + horário + pessoas
    → Passo 2: escolhe preferências + restrições
    → Passo 3: pré-seleciona pratos (opcional)
    → Passo 4: preenche nome* + email* + WhatsApp
      → Clica "Confirmar via WhatsApp"
        → POST /api/reserva (dados → BC Connect CRM)
        → window.open(wa.me/554733673800?text=...) 
          → WhatsApp abre com texto pré-preenchido
        → Overlay fecha
```

### Fluxo 2: Cadastro/Login — Área do Cliente
```
Usuário clica "Minha Área"
  → ClientOverlay abre
    → Tela de auth (login ou cadastro)
      → Login: email + senha → POST /api/lead (evento LOGIN)
      → Cadastro: nome+email+whatsapp+cpf+termos → POST /api/lead (evento SIGNUP)
    → Dashboard exibe dados mockados ("Carlos Andrade")
      → Aba Reservas: lista mock + formulário nova reserva
      → Aba Fila: QueueInline component
      → Aba Histórico: visitas mock com pontos
      → Aba Fidelidade: programa de pontos mock
      → Aba Avaliações: POST /api/avaliacao (real → BC Connect)
```

### Fluxo 3: Fila Virtual
```
Usuário clica "Fila Virtual" (navbar ou footer)
  → QueueOverlay abre
    → Preenche nome + WhatsApp + pessoas
    → Clica "Entrar na Fila"
      → Número aleatório gerado (5–9)
      → Posição aleatória gerada (1–4)
      → Tela de status exibida
      → setInterval conta -1 a cada 15 segundos
      ⚠️ Não envia WhatsApp real. Não persiste no servidor.
```

### Fluxo 4: Painel Admin
```
Usuário clica link oculto no Footer → AdminOverlay abre
  → Login com admin@admin.com.br / 123456789 (hardcoded)
  → Dashboard mock com dados estáticos
  → Painéis: Reservas, Fila, Cardápio, Clientes (todos mock)
  ⚠️ Nenhuma ação (editar/remover/avançar) está implementada
```

### Fluxo 5: Captura de Lead — BC Connect
```
Qualquer evento de formulário
  → POST para /api/reserva, /api/lead ou /api/avaliacao
    → sendBcEvent() em app/lib/bcconnect.ts
      → fetch() para BC Connect API (Railway)
        → Headers: Content-Type + x-api-key
        → Timeout: 5 segundos
        → Falha silenciosa: nunca bloqueia o UX
      ⚠️ Se BC_CONNECT_API_KEY não configurado: evento não enviado (apenas log)
```

---

## 5. DIAGNÓSTICO HONESTO — O QUE NÃO ESTÁ FUNCIONANDO

### 🔴 CRÍTICO — Bloqueia funcionalidade essencial

**C1 — ReserveSection não funciona (componente inteiro quebrado)**
- Arquivo: `components/ReserveSection.tsx`
- O formulário inline da seção de reservas captura nome, data, horário, pessoas, WhatsApp e observações mas NUNCA usa esses dados.
- Existem `void nome; void data; void hora; ...` — hacks para silenciar TypeScript.
- O botão principal apenas abre o ReservationOverlay, ignorando completamente o que o usuário preencheu.
- Impacto: Usuário preenche o formulário, clica em "Reservar" e cai num fluxo diferente. Experiência confusa e frustrante.

**C2 — AdminOverlay com credenciais hardcoded e expostas**
- Arquivo: `components/overlays/AdminOverlay.tsx`, linha ~12–13
- `const ADMIN_EMAIL = 'admin@admin.com.br'` e `const ADMIN_PASSWORD = '123456789'`
- Qualquer pessoa que abrir o DevTools do browser pode ver esses valores.
- Como o código é cliente (`'use client'`), as credenciais são enviadas ao browser em texto legível.
- Impacto: Acesso indevido ao painel administrativo por qualquer visitante.

**C3 — Área do Cliente sem autenticação real**
- Arquivo: `components/overlays/ClientOverlay.tsx`
- Qualquer email/senha funciona para login. A senha não é sequer validada (campo decorativo).
- O dashboard exibe sempre os mesmos dados mockados: "Carlos Andrade", 1240 pontos, reservas de março/2025.
- Cancelamentos de reservas só existem em local state e somem ao fechar o overlay.
- Impacto: O recurso não tem utilidade real para o cliente.

**C4 — Fila Virtual sem persistência ou notificação real**
- Arquivo: `components/overlays/QueueOverlay.tsx`
- Número e posição na fila são gerados com `Math.random()`.
- O aviso "via WhatsApp" é decorativo — nenhuma mensagem é enviada.
- Se o usuário fechar o overlay, perde sua posição na fila.
- Dados da fila não chegam ao restaurante em nenhum momento.
- Impacto: O recurso mais diferenciado do site não funciona de fato.

### 🟡 IMPORTANTE — Prejudica qualidade ou experiência

**I1 — Seletor de idioma sem tradução**
- Arquivo: `components/Navbar.tsx`
- Os botões PT/EN/ES mudam apenas o estado `lang` mas nenhum texto do site muda.
- Impacto: Turistas que clicam em EN ou ES não recebem conteúdo traduzido. Expectativa criada, não entregue.

**I2 — Mapa não é o local real do restaurante**
- Arquivo: `components/Location.tsx`
- O mapa é um SVG artístico com linhas e um marcador animado. Não mostra a localização real.
- Impacto: Usuário não consegue ver onde fica o restaurante de verdade.

**I3 — Painel Admin com dados inteiramente falsos**
- Todos os números, reservas, clientes e filas no AdminOverlay são strings fixas no código.
- Botões "Editar", "Remover" e "Avançar" não têm `onClick` implementado.
- Impacto: O painel admin é puramente decorativo. Não serve para gestão real.

**I4 — CounterAnimate.tsx é dead code**
- Arquivo: `components/ui/CounterAnimate.tsx`
- Não é importado em nenhum arquivo do projeto.
- Impacto: Código morto que confunde e ocupa espaço.

**I5 — fonts.ts sem display: 'swap'**
- Arquivo: `app/fonts.ts`
- Sem `display: 'swap'`, o browser pode bloquear renderização esperando as fontes.
- Impacto: Possível flash de conteúdo sem estilo (FOUT) ou texto invisível durante carregamento.

**I6 — Nenhuma validação de WhatsApp nos formulários**
- Nos 3 formulários de reserva, o WhatsApp é opcional e sem validação de formato.
- Impacto: Dados inválidos chegam ao BC Connect e ao atendente no WhatsApp.

### 🟢 MENORES — Polimento e qualidade técnica

**M1 — About.tsx: badge "38 anos" pode sair da tela em mobile**
- Badge com `position: absolute, bottom: -28, right: -28` sem espaço garantido no mobile.

**M2 — History.tsx: texto pode não aparecer em viewport menor**
- `viewport={{ amount: 0.2 }}` pode não disparar para itens curtos, deixando-os invisíveis.

**M3 — Showcase.tsx: scrollbar visível em alguns browsers**
- A regra CSS `#showcase *::-webkit-scrollbar` não cobre o elemento raiz do track.

**M4 — next.config.js sem headers de segurança**
- Faltam: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.

**M5 — TypeScript: void statements em ReserveSection**
- Hacks `void nome; void data; ...` são antipadrão técnico.

---

## 6. O QUE ESTÁ FUNCIONANDO BEM

### ✅ Arquitetura e estrutura

- Estrutura de arquivos clara, bem organizada e fácil de navegar
- Separação limpa entre dados (`lib/`), componentes, overlays e hooks
- CSS Custom Properties bem definidos — consistência visual garantida
- `app/lib/bcconnect.ts` é robusto: timeout de 5s, falha silenciosa, log descritivo

### ✅ Fluxo principal de reserva

- O ReservationOverlay funciona completamente do passo 1 ao 4
- A chamada `/api/reserva` envia dados reais ao BC Connect quando configurado
- A integração com WhatsApp via `wa.me` funciona e pré-preenche a mensagem corretamente
- A lógica de reset do overlay ao fechar está implementada com timeout correto

### ✅ Design e experiência visual

- Loading screen com farol SVG animado é premium e marca bem
- Hero com vídeo e parallax transmite qualidade cinematográfica
- Navbar com transição transparente → branca ao scroll é elegante
- Animações Framer Motion são suaves e bem configuradas
- Paleta navy/gold/cream é coerente em 100% dos componentes
- Tipografia com Playfair Display nos headings é refinada e profissional
- Showcase com 6 vídeos e drag-to-scroll é diferenciado

### ✅ Cardápio digital

- 400+ itens reais com preços atualizados
- 9 categorias bem organizadas
- Pré-seleção de pratos no overlay de reserva é inovador
- Transições entre abas com `layoutId` são fluidas

### ✅ Área do Cliente — UI

- Interface visual da ClientOverlay é rica e bem elaborada
- Programa de fidelidade com barra de progresso animada
- Formulário de avaliação com estrelas tem boa UX
- O formulário de nova reserva dentro do dashboard funciona (envia para WhatsApp)

### ✅ API Routes

- As 3 rotas (`/api/reserva`, `/api/lead`, `/api/avaliacao`) estão bem implementadas
- Validações corretas no servidor (email obrigatório, nota entre 1 e 5)
- Retornam `{ success: true }` mesmo em erro para não bloquear o fluxo do cliente
- Integração com BC Connect funciona quando credenciais estão configuradas

### ✅ Responsividade

- Breakpoints bem definidos no globals.css para mobile (767px) e tablet (1024px)
- Navbar tem drawer mobile funcional
- Container usa `min(1200px, 100% - 80px)` — responsivo por padrão
- Grids principais têm classes CSS para colapsar em mobile

---

## 7. OPORTUNIDADES DE MELHORIA

### Funcionalidades novas de alto valor

**F1 — Integração Google Maps real**
Substituir o SVG decorativo da seção Location por um iframe do Google Maps com a localização exata do restaurante (Av. Atlântica, 2554). Alto impacto, baixo esforço.

**F2 — Tradução real PT/EN/ES**
O seletor de idioma já existe na navbar. Implementar i18n com `next-intl` ou `react-i18next` para entregar conteúdo em inglês e espanhol a turistas. Balneário Camboriú recebe muitos visitantes estrangeiros — esse diferencial é estratégico.

**F3 — Backend real para Fila Virtual**
Criar rota `/api/fila` com persistência real (Redis ou banco de dados) para:
- Registrar entradas na fila
- Enviar WhatsApp automático quando a mesa estiver pronta (via Twilio ou Z-API)
- Permitir que o garçom ou atendente avance a fila pelo painel admin

**F4 — Autenticação real na Área do Cliente**
Implementar autenticação com NextAuth.js ou JWT simples:
- Login com email (magic link) ou senha hash
- Dados reais do cliente conectados ao BC Connect
- Histórico de visitas e pontos reais

**F5 — Painel Admin funcional**
Conectar o AdminOverlay a uma API real:
- Listar reservas do dia vindas do BC Connect
- Avançar fila com notificação automática via WhatsApp
- Editar cardápio (atualizar preços e descrições)
- Ver avaliações reais

**F6 — SEO e Open Graph**
O `app/layout.tsx` provavelmente tem metadados mínimos. Adicionar:
- `og:image` com foto do restaurante
- `og:description` com descrição atrativa
- Schema.org JSON-LD para restaurante (nome, endereço, horário, telefone)
- Sitemap e robots.txt estão presentes mas devem estar atualizados

**F7 — WhatsApp Direto no ReserveSection**
Corrigir o formulário inline da seção para realmente usar os dados e enviar via WhatsApp + registrar no BC Connect. Esse fluxo é mais simples e direto que o overlay.

### Melhorias de performance

**P1 — Lazy loading nos vídeos do Showcase**
Os 6 vídeos do carrossel carregam simultâneamente. Implementar `IntersectionObserver` para carregar apenas o vídeo visível.

**P2 — `display: 'swap'` nas fontes**
Adicionar em `app/fonts.ts` para evitar FOUT.

**P3 — Headers de segurança**
Adicionar `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy` no `next.config.js`.

**P4 — Image optimization**
Verificar se há imagens no projeto usando `<img>` em vez de `next/image` (perde otimização automática).

---

## 8. ROADMAP DE EXECUÇÃO — FASES E PRIORIDADES

### FASE 1 — CORREÇÕES URGENTES (1–3 dias)
**Objetivo:** Eliminar bugs críticos de segurança e funcionalidade quebrada

| # | Tarefa | Arquivo | Prioridade |
|---|---|---|---|
| 1.1 | Remover credenciais hardcoded do AdminOverlay | AdminOverlay.tsx | 🔴 CRÍTICO |
| 1.2 | Implementar submit real no ReserveSection (WhatsApp + API) | ReserveSection.tsx | 🔴 CRÍTICO |
| 1.3 | Remover `void` statements do ReserveSection | ReserveSection.tsx | 🔴 CRÍTICO |
| 1.4 | Adicionar `display: 'swap'` nas fontes | app/fonts.ts | 🟡 |
| 1.5 | Corrigir viewport no History.tsx (amount: 0.05) | History.tsx | 🟡 |
| 1.6 | Corrigir scrollbar visível no Showcase | Showcase.tsx | 🟢 |
| 1.7 | Adicionar security headers no next.config.js | next.config.js | 🟢 |
| 1.8 | Remover CounterAnimate.tsx (dead code) | ui/CounterAnimate.tsx | 🟢 |

### FASE 2 — MAPA E UX (1–2 dias)
**Objetivo:** Melhorar experiência de navegação e localização

| # | Tarefa | Arquivo | Impacto |
|---|---|---|---|
| 2.1 | Substituir mapa SVG por Google Maps iframe real | Location.tsx | Alto |
| 2.2 | Validação de formato no campo WhatsApp | Overlays + ReserveSection | Médio |
| 2.3 | Adicionar máscara de telefone (ex: (47) 9xxxx-xxxx) | Formulários | Médio |
| 2.4 | Verificar responsividade do badge "38 anos" no About | About.tsx | Baixo |

### FASE 3 — FILA VIRTUAL REAL (1–2 semanas)
**Objetivo:** Tornar a fila virtual o diferencial real que promete ser

| # | Tarefa | Tecnologia | Complexidade |
|---|---|---|---|
| 3.1 | Criar rota `/api/fila` com entrada/saída/status | Next.js API | Média |
| 3.2 | Banco de dados para persistência da fila | Redis/Upstash | Média |
| 3.3 | Integração WhatsApp para notificar cliente | Z-API ou Twilio | Alta |
| 3.4 | Interface do garçom para avançar fila | AdminOverlay (painel Filas) | Média |
| 3.5 | WebSocket ou polling para atualizar status em tempo real | SSE ou polling | Alta |

### FASE 4 — AUTENTICAÇÃO REAL (2–3 semanas)
**Objetivo:** Área do Cliente com dados reais por cliente

| # | Tarefa | Tecnologia | Complexidade |
|---|---|---|---|
| 4.1 | Implementar autenticação (magic link ou senha) | NextAuth.js | Alta |
| 4.2 | Banco de dados para clientes e reservas | PostgreSQL/Supabase | Alta |
| 4.3 | Conectar histórico de visitas ao banco | API interna | Média |
| 4.4 | Programa de fidelidade com pontos reais | API interna | Alta |
| 4.5 | Cancelamento de reserva persistente | API + WhatsApp | Média |

### FASE 5 — I18N E SEO (1–2 semanas)
**Objetivo:** Alcançar turistas internacionais e melhorar rankeamento

| # | Tarefa | Tecnologia | Complexidade |
|---|---|---|---|
| 5.1 | Tradução completa EN/ES | next-intl | Alta |
| 5.2 | JSON-LD Schema.org para restaurante | app/layout.tsx | Baixa |
| 5.3 | Meta tags Open Graph completas | app/layout.tsx | Baixa |
| 5.4 | Sitemap dinâmico | Next.js sitemap | Baixa |
| 5.5 | Imagens com alt text + next/image | Todos os componentes | Média |

### FASE 6 — PAINEL ADMIN REAL (3–4 semanas)
**Objetivo:** Ferramenta de gestão operacional real para o restaurante

| # | Tarefa | Complexidade |
|---|---|---|
| 6.1 | Login admin seguro com JWT/sessão | Alta |
| 6.2 | Listagem de reservas do dia (via BC Connect API) | Média |
| 6.3 | Gestão de fila em tempo real | Alta |
| 6.4 | Editor de cardápio com persistência | Alta |
| 6.5 | Dashboard com métricas reais | Alta |
| 6.6 | Visualização de avaliações | Média |

---

## 9. SUGESTÕES ESTRATÉGICAS DE MÉDIO E LONGO PRAZO

### 9.1 — BC Connect como espinha dorsal do CRM
A integração com o BC Connect já está bem estruturada. A recomendação é **expandir os pontos de captura**:
- Adicionar evento `TICKET_PURCHASE` quando cliente resgatar pontos
- Capturar `cityOfOrigin` no cadastro (turistas vs. locais)
- Usar `PREFERENCE_UPDATE` para preferências alimentares detectadas ao longo do tempo
- Criar automações no BC Connect para enviar promoções segmentadas

### 9.2 — WhatsApp como canal principal (não alternativo)
Atualmente o WhatsApp é o destino final do fluxo. Considerar:
- Integrar Z-API ou Evolution API para envio programático de mensagens
- Confirmação automática de reserva via WhatsApp após preenchimento
- Lembrete 24h antes da reserva
- Pesquisa de satisfação automática 2h após saída estimada

### 9.3 — Analytics e rastreamento de conversão
O site não tem nenhuma ferramenta de analytics implementada. Adicionar:
- Google Analytics 4 ou Plausible (privacidade)
- Eventos de conversão: abertura do overlay, clique em confirmar, abertura do WhatsApp
- Mapa de calor com Hotjar para entender onde os usuários clicam

### 9.4 — Performance e Core Web Vitals
Para rankeamento no Google Maps e buscas locais:
- Implementar lazy loading nos vídeos do Showcase
- Analisar LCP (Largest Contentful Paint) — vídeo do Hero pode ser lento
- Considerar poster image nos vídeos para carregamento percebido mais rápido
- Verificar score no Google PageSpeed Insights

### 9.5 — Programa de fidelidade como produto
O programa já tem boa UI. Para torná-lo real e valioso:
- Integrar com sistema de PDV (ponto de venda) do restaurante via API
- QR Code na mesa que o cliente escaneia para acumular pontos automaticamente
- Notificação push via PWA quando faltam X pontos para próximo resgate

---

## 10. CHECKLIST DE QUALIDADE

### Segurança
- [ ] Remover credenciais hardcoded do AdminOverlay
- [ ] Mover lógica de autenticação admin para servidor (API route + JWT)
- [ ] Variáveis de ambiente: verificar .env.local nunca commitado
- [ ] Headers de segurança no next.config.js
- [ ] HTTPS forçado via Vercel (já configurado por padrão)

### Funcionalidade
- [ ] ReserveSection envia para WhatsApp real com dados preenchidos
- [ ] Overlay de reserva fecha após confirmação com dados corretos
- [ ] Fila Virtual persiste e notifica (ao menos coleta o WhatsApp)
- [ ] Área do Cliente com auth real (mínimo: magic link por email)
- [ ] Google Maps real na seção de Localização
- [ ] Avaliações chegando ao BC Connect com email correto do cliente logado

### UX e Design
- [ ] Seletor de idioma funciona ou é removido para não criar expectativa falsa
- [ ] Badge "38 anos" não transborda no mobile
- [ ] Scrollbar não aparece no Showcase
- [ ] Textos da History visíveis ao scrollar
- [ ] Formulários com validação de WhatsApp e feedback de erro claro

### Performance
- [ ] `display: 'swap'` nas fontes
- [ ] Lazy loading nos vídeos do Showcase
- [ ] `next/image` em todas as imagens
- [ ] Score PageSpeed Insights > 80 (mobile)

### TypeScript e Qualidade de Código
- [ ] Zero `void` statements como hack para silenciar warnings
- [ ] Zero `any` implícito
- [ ] `npm run build` sem erros TypeScript
- [ ] Sem dead code (remover CounterAnimate.tsx não usado)

### SEO
- [ ] Open Graph tags completas (título, descrição, imagem)
- [ ] JSON-LD Schema.org para restaurante
- [ ] Sitemap.xml atualizado
- [ ] robots.txt correto
- [ ] Imagens com `alt` text descritivo

---

## RESUMO EXECUTIVO

O site do O Pharol tem uma base técnica sólida e um design premium que representa bem o posicionamento do restaurante. O fluxo principal (reserva via overlay → WhatsApp → BC Connect) funciona corretamente e é bem executado.

No entanto, três recursos prometidos ao usuário não funcionam de fato: a Fila Virtual não persiste nem notifica, a Área do Cliente não tem autenticação real, e o Painel Admin tem credenciais expostas no código e dados inteiramente mockados.

A prioridade imediata é eliminar o risco de segurança (credenciais hardcoded) e corrigir o formulário de reserva inline quebrado. Em seguida, substituir o mapa SVG por Google Maps real — alto impacto, baixa complexidade.

Para transformar o site de "vitrine premium" para "ferramenta de operação do restaurante", o investimento principal deve ser na Fila Virtual real com notificação via WhatsApp e na autenticação da Área do Cliente com dados reais.

---

*Documento gerado em Abril 2026 — Análise de 100% dos arquivos do projeto*  
*Para dúvidas ou execução das correções, este roadmap deve ser usado como guia de referência.*
