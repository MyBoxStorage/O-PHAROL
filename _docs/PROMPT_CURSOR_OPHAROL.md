# PROMPT COMPLETO — REFATORAÇÃO O PHAROL PARA NEXT.JS PREMIUM

---

## CONTEXTO DO PROJETO

Você está recebendo um arquivo `index.html` completo (~2019 linhas) de um site single-file para o restaurante **O Pharol Restaurante Gourmet** de Balneário Camboriú, SC. Sua tarefa é converter este arquivo para um projeto Next.js 14 (App Router) com qualidade visual **premium de última geração**, corrigindo todos os problemas identificados abaixo e implementando cada melhoria com precisão absoluta.

**Não invente nada. Siga este documento linha por linha.**

---

## 1. SETUP DO PROJETO NEXT.JS

### Estrutura de pastas a criar:
```
opharol/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts.ts
├── components/
│   ├── Loader.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Credentials.tsx
│   ├── About.tsx
│   ├── Showcase.tsx
│   ├── Menu.tsx
│   ├── History.tsx
│   ├── Location.tsx
│   ├── ReserveSection.tsx
│   ├── Footer.tsx
│   ├── overlays/
│   │   ├── ReservationOverlay.tsx
│   │   ├── ClientOverlay.tsx
│   │   ├── QueueOverlay.tsx
│   │   └── AdminOverlay.tsx
│   └── ui/
│       ├── LighthouseSVG.tsx
│       └── CounterAnimate.tsx
├── lib/
│   ├── menuData.ts
│   ├── timelineData.ts
│   └── videoData.ts
├── hooks/
│   ├── useScrollReveal.ts
│   └── useCounter.ts
└── public/
```

### Dependências a instalar:
```bash
npm install framer-motion
npm install next@14
```

Não instale Supabase ainda — será configurado em etapa futura separada. **Não adicione nenhuma dependência além das listadas.**

### `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}
module.exports = nextConfig
```

---

## 2. DESIGN TOKENS — globals.css

Substitua os tokens atuais pelos seguintes **exatos**. Não altere nenhum valor:

```css
:root {
  --navy:        #1B2B6B;
  --navy-deep:   #0D1838;
  --navy-mid:    #162254;
  --navy-light:  #2A3F8F;
  --red:         #C8102E;
  --red-dark:    #9E0D24;
  --cream:       #F9F6F0;
  --cream-dark:  #EDE8DF;
  --cream-mid:   #F2EEE6;
  --gold:        #C9A84C;
  --gold-light:  #E8C96A;
  --gold-pale:   #F5E6C0;
  --gold-dark:   #9C7E2E;
  --white:       #FFFFFF;
  --black:       #080810;
  --text-dark:   #1A1A2E;
  --text-mid:    #4A4A6A;
  --text-light:  #9090AA;
}
```

### Fontes (fonts.ts):
```ts
import { Playfair_Display, Cormorant_Garamond, Montserrat, Great_Vibes } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})
```

No `layout.tsx`, aplique todas as 4 variáveis ao `<html>`.

---

## 3. DADOS EXTERNOS — lib/

### lib/videoData.ts
Crie este arquivo com os 7 vídeos. URLs exatas — **não altere nenhuma URL**:

```ts
export const videos = [
  {
    id: 'hero',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.mp4',
    label: 'O Pharol',
    sublabel: 'Excelência Gastronômica',
  },
  {
    id: 'almoco',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4',
    label: 'Almoço na Varanda',
    sublabel: 'Vista para a Orla',
  },
  {
    id: 'janta',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003536/janta-tainha_tmpikc.mp4',
    label: 'Jantar à Luz de Velas',
    sublabel: 'Tainha Especial',
  },
  {
    id: 'rose',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003545/servindo-rose_ucaubg.mp4',
    label: 'Pharol Wines',
    sublabel: 'Seleção de Vinhos',
  },
  {
    id: 'barman',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003984/barman-drinks_khd86e.mp4',
    label: 'Arte no Bar',
    sublabel: 'Drinks Exclusivos',
  },
  {
    id: 'feijoada',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003985/s%C3%A1bado-dia-de-feijoada_hiuwaj.mp4',
    label: 'Sábado de Feijoada',
    sublabel: 'Buffet Tradicional',
  },
  {
    id: 'petit',
    url: 'https://res.cloudinary.com/djhevgyvi/video/upload/v1773003974/petit-gateau-sobremesa-bc_tmp3gg.mp4',
    label: 'Pêtit Gâteau',
    sublabel: 'Sobremesas Especiais',
  },
]
```

### lib/menuData.ts
Migre **todo** o conteúdo do cardápio existente no HTML para este arquivo TypeScript estruturado. Preserve cada prato, número, descrição e preço **exatamente como estão**. Estrutura:

```ts
export type MenuItem = {
  num: string
  name: string
  nameEn?: string
  desc?: string
  price: string
}

export type MenuSection = {
  title: string
  subtitle?: string
  note?: string
  items: MenuItem[]
}

export type MenuTab = {
  id: string
  label: string
  warning?: string
  note?: string
  sections: MenuSection[]
  banners?: Array<{ title: string; info: string; price: string; bgColor?: string }>
}

export const menuTabs: MenuTab[] = [
  // 10 tabs completos com todos os dados do HTML atual
  // IDs: sugestoes | entradas | frutos | peixes | camarao | bovinos | aves | massas | saladas | bebidas
]
```

### lib/timelineData.ts
Migre todos os marcos históricos do HTML para:

```ts
export type TimelineItem = { year: string; text: string }
export type TimelineDecade = { decade: string; items: TimelineItem[] }
export const timeline: TimelineDecade[] = [ /* todos os dados do HTML */ ]
```

---

## 4. COMPONENT: Loader.tsx

### O que existe atualmente (PROBLEMÁTICO):
- SVG do farol correto mas o beam gira 360° continuamente como se fosse um relógio — parece robótico
- O ponto de luz (pulse) não está visualmente posicionado na lanterna do farol
- A barra de progresso usa `animation` CSS puro e não conecta ao estado real de carregamento

### O que implementar:
- Use `framer-motion` com `AnimatePresence` para a saída do loader com `opacity: 0` e `scale: 0.98` em 0.8s
- O SVG do farol deve ter **exatamente** esta estrutura (corrija o SVG atual):
  - Torre trapezoidal com 3 faixas horizontais alternadas (branco/navy)
  - Base retangular navy
  - Lantern room dourado no topo com luz âmbar pulsando
  - Capuz cônico navy sobre a lantern room
  - Porta arredondada na base
  - Duas janelas pequenas na torre
- O beam: use Framer Motion `animate={{ rotate: [-30, 30, -30] }}` com `transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}` — **não rotação contínua de 360°**
- Texto "O PHAROL" em Playfair Display, letter-spacing 0.3em, fade in com delay 0.5s
- "Restaurante Gourmet" em Great Vibes, fade in com delay 0.8s
- Barra de progresso: largura controlada por `useState` + `useEffect` simulando carregamento em 3 etapas (30% → 70% → 100%), duração total ~2.8s
- Ao atingir 100%, aguardar 400ms e disparar `onComplete()` prop para ocultar o loader

---

## 5. COMPONENT: Navbar.tsx

### O que existe atualmente (PROBLEMÁTICO):
- SVG do logo tem `rect x="15.5,28"` — sintaxe inválida de SVG que quebra o elemento
- O segundo botão CTA "Minha Área" tem `style` inline que sobrescreve a classe `.nav-cta` — deve ser uma variante
- Idiomas PT/EN/ES existem mas a lógica de tradução é mínima

### O que implementar:
- **Logo SVG**: Corrija o SVG do farol no logo. Use o mesmo SVG corrigido do Loader mas em miniatura (44×44px). Estrutura: torre + base + lantern room dourado + capuz + ponto de luz pulsante. Sem o `rect x="15.5,28"` inválido
- **Scroll effect**: use `useEffect` com `addEventListener('scroll')`. Quando `window.scrollY > 60`: adicione classe `scrolled` → `background: rgba(13, 24, 56, 0.97)`, `backdrop-filter: blur(20px)`, `box-shadow: 0 1px 0 rgba(201,168,76,0.2)`. Transition de 400ms
- **Links** (na ordem exata): O Restaurante | Cardápio | Nossa História | Localização | Fila Virtual
- **Botões direita**: [PT] [EN] [ES] → `Reservar Mesa` (borda dourada, hover fundo dourado) → `Minha Área` (borda `rgba(255,255,255,0.25)`, texto `rgba(255,255,255,0.65)`, menor, hover borda dourada)
- **Mobile**: hamburger com animação para X usando Framer Motion. Drawer deslizando da direita com overlay escuro. Dentro do drawer: links + botão Reservar Mesa + idiomas
- Props: `onReserve: () => void`, `onQueue: () => void`, `onClientArea: () => void`
- Use `'use client'`

---

## 6. COMPONENT: Hero.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Vídeo com `opacity: 0.35` — muito escuro, perde a textura visual do vídeo
- Overlay gradiente cobre 70% do topo — excessivo
- Farol decorativo `opacity: 0.12` — quase invisível, não agrega visualmente
- Animações são CSS puro `animation: fadeInUp` sem stagger real
- Sem parallax no vídeo ao scroll
- Hero scroll indicator funciona mas é simples demais

### O que implementar:

**Vídeo**: `opacity: 0.45`. Gradiente overlay: `linear-gradient(to bottom, rgba(8,10,28,0.55) 0%, rgba(8,10,28,0.25) 45%, rgba(8,10,28,0.75) 100%)`. Adicione layer de noise SVG `opacity: 0.035`.

**Parallax no vídeo**: Use Framer Motion `useScroll` + `useTransform`. Quando o usuário scrola de 0 → altura da viewport, o vídeo move de `translateY(0)` para `translateY(80px)`. O wrapper do vídeo deve ter `overflow: hidden` e o vídeo `height: 115%` para acomodar o parallax.

**Farol decorativo** (canto direito inferior): Aumente para `opacity: 0.18`. Aumente o SVG para 280px de largura. O beam deve ter `opacity: 0.06` no triângulo de luz. Use Framer Motion no beam com rotate -30° → +30° ease in-out.

**Conteúdo central** — Animações com Framer Motion stagger exatas:
1. Badge pill (delay 0.2s, fadeInDown 20px)
2. Título "O PHAROL" em Playfair Display 900 (delay 0.45s, fadeInUp 40px, duration 1s)
3. Subtitle "Restaurante Gourmet" em Great Vibes (delay 0.65s, fadeInUp 30px)
4. Tagline em Cormorant Garamond italic (delay 0.85s, fadeInUp 20px, opacity 0→0.8)
5. Divisor com linhas douradas e ornamento ✦ (delay 1.0s)
6. Botões (delay 1.1s, fadeInUp)

**Badge**: `border: 1px solid rgba(201,168,76,0.35)`, `padding: 8px 20px`, ponto dourado pulsante à esquerda, texto em Montserrat 0.62rem letter-spacing 0.25em uppercase dourado: "Excelência Gastronômica · Av. Atlântica · BC"

**Título**: `font-size: clamp(3.5rem, 9vw, 8rem)`, `font-weight: 900`, `line-height: 0.88`. "O" em `font-style: italic; color: var(--gold)`, "PHAROL" em branco

**Botão primário** "Reservar Mesa": background `var(--gold)`, cor `var(--navy-deep)`, font Montserrat 700 0.72rem letter-spacing 0.2em uppercase, padding `16px 44px`. Hover: background `var(--gold-light)`. Seta SVG inline após o texto.

**Botão secundário** "Ver Cardápio": transparent, borda `rgba(255,255,255,0.35)`, cor white. Hover: borda white, bg `rgba(255,255,255,0.06)`.

**Scroll indicator** (centralizado, bottom 32px): texto "Descobrir" em Montserrat 0.58rem letter-spacing 0.3em cor `rgba(255,255,255,0.35)`. Linha vertical de 48px animada com Framer Motion `scaleY: [0,1,0]` de cima para baixo em loop de 2s.

---

## 7. COMPONENT: Credentials.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Números estáticos — "38 anos" e "+1.400 avaliações" aparecem prontos instantaneamente
- Visual flat, sem profundidade

### O que implementar:
- Background `var(--navy-deep)`, padding `22px 40px`, `border-top: 1px solid rgba(201,168,76,0.15)`, `border-bottom: 1px solid rgba(201,168,76,0.15)`
- 5 itens com separadores `|` de `rgba(255,255,255,0.08)` entre eles
- **Counters animados** nos dois primeiros itens:
  - "38 anos" → use hook `useCounter` com IntersectionObserver: quando entrar na viewport, conta de 0 → 38 em 2s com easing easeOut
  - "+1.400 avaliações" → conta de 0 → 1400 em 2s com easeOut, prefixado com "+"
- Ícones SVG inline para cada item (estrela, localização, relógio, pessoas, troféu)
- TripAdvisor badge: owl em fundo dourado + "Travellers' Choice" + 5 estrelas douradas + "+1.400 avaliações Tripadvisor"
- Responsivo: em mobile, 2 colunas em grid, separadores desaparecem

### hook useCounter.ts:
```ts
import { useState, useEffect, useRef } from 'react'

export function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}
```

---

## 8. COMPONENT: About.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Grid 50/50 simétrico — sem tensão visual
- Frame dourado ao redor do vídeo existe mas as bordas decorativas (`::before` e `::after`) são muito sutis (2px)
- Badge flutuante "38 anos" posicionado na borda inferior direita do vídeo mas sem sombra expressiva
- Botão "Ver Cardápio" no final não existe — seção termina sem CTA

### O que implementar:
- Grid **assimétrico**: coluna esquerda (vídeo) ocupa `45%`, coluna direita (texto) `55%`, gap `80px`
- **Vídeo**: aspect-ratio `3/4`. Ao entrar na viewport com IntersectionObserver, dar `play()`. Fora da viewport, `pause()`
- **Frame decorativo**: borda `1px solid rgba(201,168,76,0.4)` a `-16px` de distância. Quatro cantos decorativos com `border-width: 3px` (mais espessos que o atual). Adicionar sombra no container do vídeo: `box-shadow: -20px 20px 60px rgba(13,24,56,0.25)`
- **Badge flutuante**: posição `bottom: -28px; right: -28px`. Background `var(--navy)`. Padding `28px`. Número "38" em Playfair Display 900 `2.8rem` dourado. Linha "Anos" em Montserrat 0.58rem uppercase. `box-shadow: 0 20px 60px rgba(13,24,56,0.4), 0 0 0 1px rgba(201,168,76,0.2)`
- **Conteúdo textual**: 
  - Script em Great Vibes `2.8rem` dourado: "O Pharol"
  - Título em Playfair Display `2.2rem`: "Uma experiência **única** à beira-mar" — "única" em italic vermelho
  - 2 parágrafos em Cormorant Garamond `1.15rem` `line-height: 1.9`
  - 4 features em grid 2×2 com ícone emoji + label Montserrat uppercase + desc Cormorant
  - Botão CTA ao final: "Explorar o Cardápio →" estilo secundário navy (borda navy, texto navy, hover: fundo navy texto branco)
- **Animação de entrada**: vídeo entra da esquerda (`x: -50 → 0`), texto entra da direita (`x: 50 → 0`), ambos com `opacity: 0 → 1`, duração 0.9s, trigger por IntersectionObserver via Framer Motion `whileInView`

---

## 9. COMPONENT: Showcase.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Vídeos aparecem todos de uma vez sem entrada
- Drag to scroll funciona mas sem indicação visual de que é arrastável
- Overlay de hover existe mas texto aparece abruptamente
- Não há indicador de quantos vídeos existem nem de posição atual

### O que implementar:
- Fundo `var(--navy-deep)`, padding `0 0 80px`
- Header da seção com Framer Motion `whileInView` fadeInUp
- **Track de vídeos**: cada item `flex: 0 0 360px`, gap `20px`, padding `0 40px`, scroll-snap
- **Drag to scroll**: mouse events para desktop + touch events para mobile. Cursor `grab` em repouso e `grabbing` ao arrastar. Adicionar texto "Arraste para explorar →" em Montserrat 0.58rem letra abaixo do track, desaparecendo após o primeiro arraste
- **Cada item de vídeo**:
  - Borda-radius `0` (sem arredondamento)
  - Hover: escala `1.03` no vídeo (transition 0.6s ease)
  - Overlay permanente na base (gradiente de navy transparente → navy 80%), texto sempre visível mas com `translateY(8px → 0)` e `opacity(0.7 → 1)` no hover
  - Número do item no canto superior esquerdo: Montserrat `0.58rem` letra-spacing `0.3em` dourado, ex: "01", "02"...
- **Entrada stagger**: use Framer Motion `variants` com `staggerChildren: 0.08`. Cada item entra com `opacity: 0 → 1` e `y: 40 → 0` ao entrar na viewport
- **Indicador de progresso**: linha fina abaixo do track mostrando posição do scroll. Implementar com `onScroll` no track calculando `scrollLeft / (scrollWidth - clientWidth)` e animando a largura da linha de progresso dourada

---

## 10. COMPONENT: Menu.tsx

### O que existe atualmente (CORRETO, mas refinar):
- Toda a lógica de tabs está em JS vanilla → converter para `useState`
- Os dados do cardápio estão inline no HTML → usar `lib/menuData.ts`
- Os banners de promoção (Sábados, Domingos, Rodízio) estão com HTML ad-hoc → componentizar

### O que implementar:
- Estado `activeTab` com `useState<string>('sugestoes')`
- Tabs horizontais com scroll em mobile (`overflow-x: auto`, `scrollbar: none`)
- Tab ativa: cor `var(--navy)`, linha dourada de 2px na base com Framer Motion `layoutId="tab-indicator"` para animação suave de deslizamento
- Ao trocar de tab: `AnimatePresence mode="wait"` com `opacity: 0→1` e `y: 8→0` em 0.3s
- **Banner de promoção** (componente separado `MenuBanner`): recebe `title`, `info`, `price`, `bgColor`. Background escuro especificado, título em Great Vibes dourado, info em Montserrat pequeno, preço em Playfair Display dourado
- Aviso "NÃO FAZEMOS MEIO PRATO": badge vermelho fixo no topo de cada tab que exige, não inline
- Cada item de menu com hover `background: rgba(201,168,76,0.04)`, transition 0.2s
- Renderizar os dados de `menuData.ts` dinamicamente — não escrever HTML repetido

---

## 11. COMPONENT: History.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Farol decorativo de fundo `opacity: 0.03` — completamente invisível
- Timeline items entram com `translateX(-20px)` mas só 1 de cada vez sem stagger
- Sem nenhuma distinção visual entre décadas além do rótulo de texto

### O que implementar:
- Fundo `var(--navy-deep)`. Linha dourada de 1px no topo e bottom com gradiente (transparente → gold → transparente)
- **Farol decorativo de fundo**: aumente para `opacity: 0.06`. Posicione à direita, centralizado verticalmente. SVG com 480px de altura. Adicione um segundo farol menor à esquerda com `opacity: 0.03` e `transform: scaleX(-1)` para espelhar
- **Linha da timeline**: `left: 20px`, `width: 1px`, gradiente de `transparent → var(--gold) 5% → var(--gold) 95% → transparent`
- **Marcadores de década**: diamante (rotação 45°) de 14px com borda dourada 2px e fundo `var(--navy-deep)`, posicionado na linha. Label da década em Playfair Display italic dourado `1.3rem` com margin-left de `48px`
- **Cada item de timeline**: 
  - Ponto de `6px` círculo na linha (posição `left: -44px`)
  - Ano em Montserrat `0.6rem` bold letter-spacing `0.2em` uppercase dourado
  - Texto em Cormorant Garamond `1.05rem` `rgba(255,255,255,0.72)`
  - Entrada com Framer Motion `whileInView`: `opacity: 0→1`, `x: -24→0`, duração `0.6s`, `once: true`
  - **Stagger real**: cada item dentro de uma década com `delay = index * 0.07s` calculado dinamicamente

---

## 12. COMPONENT: Location.tsx

### O que existe atualmente (PROBLEMÁTICO):
- Mapa customizado SVG parece um placeholder de desenvolvimento — sem elementos visuais que remetam à orla de Balneário Camboriú
- Endereço, horários e contatos corretos — manter

### O que implementar:
- Grid 50/50, gap `80px`, alinhamento `start`
- **Coluna esquerda (informações)**:
  - Section label + título + divisor (padrão do projeto)
  - Card de endereço: fundo `var(--navy)`, padding `40px`. Ícone SVG de pin dourado. Título "O Pharol Restaurante Gourmet" em Playfair Display `1.3rem` branco. Endereço completo em Cormorant Garamond
  - Tabela de horários: borda top `rgba(255,255,255,0.08)`, cada linha: dia × horário, horário em dourado
  - Contatos clicáveis (tel, email, instagram) com ícone dourado + hover dourado
- **Coluna direita (mapa visual)**:
  - Mantenha o mapa SVG customizado mas **melhore-o dramaticamente**:
  - Background gradient: `linear-gradient(160deg, #081428 0%, #0d1f3d 40%, #091628 100%)`
  - Adicione linhas de ruas simuladas com `opacity: 0.12` (linha horizontal para Av. Atlântica mais larga, linhas secundárias para ruas transversais com `opacity: 0.06`)
  - Adicione silhueta estilizada do oceano na parte inferior (`opacity: 0.08`, gradiente azul-navy)
  - Adicione pontos de luz pequenos (`3px`, `opacity: 0.3`, dourado) representando outros estabelecimentos próximos
  - Pin animado com Framer Motion `animate={{ y: [0, -8, 0] }}` loop `2s easeInOut`. Ponto dourado `16px` com borda branca `3px` e glow `box-shadow: 0 0 0 6px rgba(201,168,76,0.2), 0 0 24px rgba(201,168,76,0.4)`. Linha vertical de `32px`. Label "O Pharol · Av. Atlântica, 2554" em card navy com borda dourada `0.5px`
  - Pulso expandindo: círculo de `rgba(201,168,76,0.15)` expandindo de `20px → 60px` com `opacity: 1→0`, loop 2s
  - Label "Av. Atlântica" na linha horizontal com Montserrat `0.45rem` dourado `opacity: 0.4`
  - Painel inferior com 3 infos de acesso (estacionamento, a pé, endereço) em row

---

## 13. COMPONENT: ReserveSection.tsx

### O que existe atualmente (CORRETO):
- Formulário rápido inline com os campos corretos
- Manter a estrutura, apenas converter para React com `useState` para os campos

### O que implementar:
- Campos controlados com `useState`: nome, data, hora, pessoas, whatsapp, preferenciaMesa, observacoes
- Submit chama `props.onOpenFullReservation()` (que abre o overlay completo)
- Botão "Reserva Completa" abre o `ReservationOverlay`
- Fundo `var(--navy)` com pattern SVG de losangos dourados `opacity: 0.025` no `::before` (manter do original)
- Sem alterações visuais estruturais

---

## 14. OVERLAYS — overlays/ReservationOverlay.tsx

### O que existe atualmente (CORRETO mas converter):
- 4 steps funcionando em vanilla JS
- Step 1: date grid + time grid + pessoas
- Step 2: preferências + restrições
- Step 3: pré-pedido de pratos
- Step 4: confirmação

### O que implementar:
- `useState<number>(1)` para step atual (1-4)
- `AnimatePresence mode="wait"` entre steps com `x: 40→0` e `opacity: 0→1` em 0.35s
- Overlay: `position: fixed`, `inset: 0`, `z-index: 900`, background `var(--cream)`, `overflow-y: auto`
- Entrada/saída do overlay: Framer Motion `x: '100%' → 0` em 0.5s ease
- **Step indicator**: 4 bolinhas numeradas com linha conectora. Ativa: fundo `var(--navy)` branco. Done: fundo `var(--gold)` com ✓. Inativa: borda `var(--cream-dark)` texto cinza
- **Date grid**: gerar os próximos 14 dias dinamicamente, 7 colunas. Célula selecionada: fundo `var(--navy)` texto branco
- **Time grid**: 4 colunas. Indisponível: `opacity: 0.3` + `text-decoration: line-through`. Selecionado: fundo `var(--navy)` branco
- **Pref cards**: 4 opções de assento + 4 restrições. Toggle on/off com borda navy e bg `rgba(27,43,107,0.04)` quando selecionado
- **Pré-pedido**: categorias como botões filtro (Frutos do Mar / Peixes / Carnes / Massas). Itens com controles +/− e quantidade. Dados dos pratos vêm de `menuData.ts`
- **Confirmação (step 4)**: grande ícone de check animado (Framer Motion draw SVG), mensagem de confirmação, botão fechar
- Navegação: botão Voltar (borda cinza) + botão Próximo (fundo navy). Sticky no fundo da página dentro do overlay

---

## 15. OVERLAYS — overlays/ClientOverlay.tsx

### O que existe atualmente (CORRETO, converter):
- Login form → Dashboard com tabs (Reservas / Fidelidade / Histórico / Avaliações)

### O que implementar:
- `useState<'auth' | 'dashboard'>` para controle de tela
- Auth: login form + register form com toggle. Campos: email + senha (login) ou nome + email + gênero + CPF + whatsapp + senha (cadastro)
- Dashboard com `useState<string>` para tab ativa. 4 tabs: Reservas | Fidelidade | Histórico | Avaliações
- **Loyalty card**: gradient `linear-gradient(135deg, var(--navy-deep), var(--navy))`. Pontos em Playfair Display `2.8rem` dourado. Barra de progresso animada com Framer Motion `animate={{ width: '83%' }}` com `transition={{ duration: 1, delay: 0.3 }}` quando a tab fidelidade ficar ativa
- Reservas: cards com data, horário, pessoas, status badge (confirmed/pending/cancelled)
- Histórico: lista de visitas com data, pratos, total e pontos ganhos
- Avaliações: stars clicáveis (hover/click) + textarea + submit

---

## 16. OVERLAYS — overlays/QueueOverlay.tsx

### O que existe atualmente (CORRETO, converter):
- Entrada na fila → status com número e posição

### O que implementar:
- `useState<'join' | 'status'>` para controle
- Background do overlay: `var(--navy-deep)`
- Status card: número da fila em Playfair Display `5rem` dourado. Grupos à frente em grande. Estimativa de tempo
- Barra de progresso animada Framer Motion: `width` indo de `10%` a `85%` em loop 30s linear
- Contador de grupos reduzindo: `useEffect` com `setInterval` a cada 15s decrementa +1

---

## 17. OVERLAYS — overlays/AdminOverlay.tsx

### O que existe atualmente (CORRETO, converter):
- Sidebar com 5 navegações: Dashboard / Reservas / Fila / Cardápio / Clientes
- Dashboard com stats cards + tabela de reservas do dia
- Painel de Reservas com tabela completa
- Painel de Fila: 3 colunas kanban (Aguardando / Sentados / Concluídos)
- Painel de Cardápio: lista editável de items
- Painel de Clientes: tabela com pontos e visitas

### O que implementar:
- `useState<string>('dashboard')` para painel ativo
- Sidebar: `width: 240px`, `background: var(--navy-deep)`. Item ativo: `border-left: 2px solid var(--gold)`, `color: var(--gold)`, `background: rgba(201,168,76,0.08)`
- Stats cards: 4 em grid 4×1 desktop / 2×2 tablet / 1×4 mobile. Valores com animação counter ao entrar no viewport
- Tabelas: header row com Montserrat `0.55rem` uppercase cinza. Body rows com Cormorant Garamond `1rem`. Hover row: `background: rgba(27,43,107,0.02)`
- Status badges: confirmed (navy bg/texto), pending (gold bg/texto), cancelled (red bg/texto)
- Painel de Fila: 3 colunas. Cards arrastáveis para mudança de status (opcional — se não implementar arrastar, use botão "Avançar Status" em cada card)
- **Em mobile (< 768px)**: sidebar vira menu hamburger na parte superior do painel admin

---

## 18. COMPONENT: Footer.tsx

### O que existe atualmente (CORRETO):
- Grid 4 colunas: marca + navegação + área cliente + contato
- Crédito "Desenvolvido por Global Landing → globallanding.com.br"

### O que implementar sem alterar estrutura:
- Adicionar linha dourada de separação de 1px horizontal animada: quando entrar no viewport, a linha cresce de `0% → 100%` da esquerda para a direita com Framer Motion, duração 1.2s
- Logo no footer: SVG farol corrigido pequeno (32px) + "O PHAROL" + "Restaurante Gourmet" em Great Vibes
- Manter exatamente: todos os links, contatos, crédito Global Landing, copyright, CNPJ 18.618.919/0001-09
- **Não remova**: `Desenvolvido por <span>Global Landing</span>` linkando para `https://globallanding.com.br`

---

## 19. HOOKS — hooks/useScrollReveal.ts

Substitua o IntersectionObserver vanilla por este hook reutilizável:

```ts
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

// Uso nos componentes:
// const ref = useRef(null)
// const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
// <motion.div ref={ref} animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} />

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
}
```

---

## 20. COMPONENT: ui/LighthouseSVG.tsx

Crie um componente SVG do farol **correto e reutilizável** que será usado no Loader, Navbar (miniatura), Hero (decorativo), History (background), Footer (logo miniatura):

```tsx
// Props: size, opacity, animated, showBeam, variant: 'full' | 'mini' | 'decoration'
```

O SVG **correto** do farol deve ter:
- Torre: trapézio com base mais larga que o topo, cor branca/creme
- 2 faixas navy horizontais na torre (listras alternadas)
- Base retangular navy mais larga
- Plataforma dourada separando torre da base
- Lantern room: retângulo dourado/âmbar no topo da torre
- Capuz cônico navy sobre a lantern room
- Luz na lantern: ponto `rgba(255,220,100,0.9)` com animação de pulse `opacity: 0.6→1` em loop 1s
- Porta: arco semi-circular na base
- Janelas: 2 retângulos pequenos na torre

**NÃO use** o SVG atual do arquivo original — ele tem o `rect x="15.5,28"` com vírgula no atributo `x` que é SVG inválido.

---

## 21. RESPONSIVE — Breakpoints

Implemente todos os breakpoints com Tailwind ou CSS modules. Os valores exatos:

| Breakpoint | Largura  | Mudanças críticas |
|------------|----------|-------------------|
| Desktop    | > 1024px | Layout completo |
| Tablet     | 768–1024 | About: 1 coluna; Location: 1 coluna; Footer: 2 colunas; Admin stats: 2×2 |
| Mobile     | < 768px  | Nav: apenas logo + hamburger; Hero: título 3rem; Seções: padding 20px; Showcase: cards 280px; Admin sidebar: ocultar |
| Small      | < 480px  | Hero título: 2.8rem; Section titles: 1.8rem |

---

## 22. CHECKLIST DE CONTEÚDO — NÃO OMITIR

Todo este conteúdo deve estar presente no projeto final. Confirme cada item:

**Cardápio (10 tabs completos)**:
- ✅ Sugestões da Casa (buffets sáb/dom, rodízio, sugestões 1 pessoa, sugestões 2 pessoas, super combo, King Krab R$749/kg)
- ✅ Entradas & Petiscos (petiscos, pratos 1 pessoa — todos os items numerados)
- ✅ Frutos do Mar (caldeirada, lagosta, risoto, rodízio, moquecas)
- ✅ Peixes (ao molho camarão, belle meunière, à pharol, à camboriú, à romana, moquecas, especiais — bacalhau Gadus Morhua R$369)
- ✅ Camarão (à grega, imperial, grelhado, tropical, à romana, risoto manga, marta rocha)
- ✅ Bovinos (filet mignon em 7 preparos, picanha)
- ✅ Aves (5 preparos de frango + 4 pratos kids)
- ✅ Massas (4 spaguettis)
- ✅ Saladas & Pizzas (7 saladas + 4 pizzas)
- ✅ Bebidas (whiskys importados, destilados litros, doses, coquetéis, cervejas, refrigerantes, sucos, licores)

**Timeline (30 marcos)**: 1980s → 1986 fundação → anos 90 → 2000s → 2013 reestruturação → 2019 → 2022 TripAdvisor → 2024

**Informações institucionais**:
- Endereço: Av. Atlântica, 2554 — Sala 01, esquina Rua 2000, Centro, Balneário Camboriú — SC, CEP 88330-906
- Tel: (47) 3367-3800
- Email: opharol@opharol.com.br
- Instagram: @opharolbc.oficial
- Horário: Seg–Dom 11h30–00h30
- CNPJ: 18.618.919/0001-09
- Crédito: Desenvolvido por Global Landing → globallanding.com.br

---

## 23. REGRAS ABSOLUTAS

1. **Não instale Supabase** — será integrado em etapa separada futura
2. **Não use `<form>` elements** — use `onSubmit` em `<div>` ou botões com `onClick`
3. **Não use `localStorage`** — estado apenas em memória (useState)
4. **Não altere nenhuma URL de vídeo** — use exatamente as URLs do `videoData.ts`
5. **Não omita nenhum item do cardápio** — todos os pratos com números, nomes, descrições e preços devem estar presentes
6. **Não invente novos campos** no formulário de reservas além dos que existem: nome, data, hora, pessoas, whatsapp, preferenciaMesa, observacoes
7. **Não altere a paleta de cores** — use exatamente os tokens definidos na seção 2
8. **Não use fonts diferentes** das 4 definidas: Playfair Display, Cormorant Garamond, Montserrat, Great Vibes
9. **Não crie páginas separadas** — tudo em `app/page.tsx` como single-page application com overlays (exceto estrutura de pastas do Next.js)
10. **Não omita o crédito** "Desenvolvido por Global Landing" com link para `globallanding.com.br`

---

## 24. ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

Execute nesta sequência exata para evitar erros de dependência:

1. Setup do projeto Next.js + dependências
2. `globals.css` com tokens + `fonts.ts`
3. `lib/menuData.ts` + `lib/videoData.ts` + `lib/timelineData.ts`
4. `hooks/useCounter.ts` + variantes Framer Motion em `hooks/useScrollReveal.ts`
5. `ui/LighthouseSVG.tsx`
6. `Loader.tsx`
7. `Navbar.tsx`
8. `Hero.tsx`
9. `Credentials.tsx`
10. `About.tsx`
11. `Showcase.tsx`
12. `Menu.tsx`
13. `History.tsx`
14. `Location.tsx`
15. `ReserveSection.tsx`
16. `Footer.tsx`
17. `overlays/ReservationOverlay.tsx`
18. `overlays/ClientOverlay.tsx`
19. `overlays/QueueOverlay.tsx`
20. `overlays/AdminOverlay.tsx`
21. `app/page.tsx` montando todos os componentes
22. `app/layout.tsx` com fontes + metadata

---

*Fim do prompt. Não tome nenhuma decisão criativa não especificada acima. Em caso de dúvida sobre qualquer detalhe, priorize o que está documentado aqui.*
