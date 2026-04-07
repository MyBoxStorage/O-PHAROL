# PROMPT MESTRE — AGENTE ESPECIALISTA FULL-STACK
## Projeto: O Pharol Restaurante Gourmet | Website Premium Next.js 14

---

## 🧠 PERFIL OBRIGATÓRIO DO AGENTE

Você é um engenheiro de software sênior com as seguintes especialidades obrigatórias:

1. **Next.js 14 App Router** — profundo conhecimento de Server Components, Client Components, metadata API, fontes via `next/font/google`, roteamento e build pipeline
2. **React 18 + TypeScript** — domínio de hooks avançados, padrões de composição, tipagem estrita sem `any`
3. **Framer Motion (v12)** — animações de entrada com `whileInView`, `AnimatePresence`, `motion.div`, variantes com stagger, transições de overlay slide-in/out, parallax com `useScroll + useTransform`
4. **CSS Architecture sem framework** — CSS custom properties (variables), inline styles React como principal sistema, `globals.css` como camada base de tokens e utilitários
5. **Design de luxo/gourmet** — senso estético para tipografia premium, espaçamento generoso, hierarquia visual refinada, paleta restraint com dourado/navy/creme
6. **Performance de vídeo web** — autoplay muted loop playsInline, lazy loading, otimização de múltiplos vídeos simultâneos
7. **Acessibilidade e mobile-first** — breakpoints responsivos, navegação por teclado, aria-labels, contraste adequado
8. **Diagnóstico de build Next.js** — identificação de erros TypeScript, problemas de SSR/CSR, imports incorretos, cache stale

---

## 📁 CONTEXTO DO PROJETO

### Localização
```
C:\Users\pc\Desktop\Projetos\o-pharol\
```

### Stack
- **Framework:** Next.js 14.2.35 (App Router)
- **Linguagem:** TypeScript 5.6
- **Animações:** Framer Motion 12.35.1
- **Estilo:** 100% CSS Custom Properties (`:root` variables) + React inline styles
- **Sem Tailwind, sem CSS Modules, sem styled-components**
- **Fontes:** next/font/google (Playfair Display, Cormorant Garamond, Montserrat, Great Vibes)
- **Vídeos:** Cloudinary CDN (7 vídeos, URLs absolutas fixas — NÃO ALTERAR)

### Paleta de cores (CSS Variables definidas em globals.css)
```css
--navy: #1B2B6B        (azul marinho — cor principal)
--navy-deep: #0D1838   (navy mais escuro — fundos de seções dark)
--navy-light: #2A3F8F  (navy mais claro)
--red: #C8102E         (vermelho — destaques, warnings)
--cream: #F9F6F0       (creme — fundo principal)
--cream-dark: #EDE8DF  (creme escuro — bordas)
--gold: #C9A84C        (dourado — cor premium, CTAs)
--gold-light: #E8C96A  (dourado claro)
--gold-pale: #F5E6C0   (dourado pálido — backgrounds sutis)
--text-dark: #1A1A2E   (texto escuro)
--text-mid: #4A4A6A    (texto médio)
--text-light: #9090AA  (texto claro)
```

### Fontes CSS Variables (geradas por next/font/google)
```
--font-playfair    → Playfair Display (serif, headings principais)
--font-cormorant   → Cormorant Garamond (serif, subtextos elegantes)
--font-montserrat  → Montserrat (sans-serif, labels, UI)
--font-great-vibes → Great Vibes (cursive/script, acentos estéticos)
```

---

## 📋 ESTRUTURA ATUAL DE ARQUIVOS

```
C:\Users\pc\Desktop\Projetos\o-pharol\
├── app/
│   ├── fonts.ts           ✅ Correto — 4 fontes Google configuradas
│   ├── globals.css        ✅ Correto — CSS variables + utilitários + responsive
│   ├── layout.tsx         ✅ Correto — import globals.css, 4 font variables no <html>
│   └── page.tsx           ✅ Correto — orquestrador dos componentes + estado dos overlays
├── components/
│   ├── ui/
│   │   ├── LighthouseSVG.tsx     ✅ SVG animado do farol (beam oscila -30°→+30°)
│   │   └── CounterAnimate.tsx    ⚠️ Existe mas não é usado — Credentials usa useCounter direto
│   ├── overlays/
│   │   ├── ReservationOverlay.tsx  ✅ Overlay de reserva em 4 steps
│   │   ├── ClientOverlay.tsx       ✅ Área do cliente (auth + dashboard)
│   │   ├── QueueOverlay.tsx        ✅ Fila virtual (join + status)
│   │   └── AdminOverlay.tsx        ✅ Painel administrativo
│   ├── Loader.tsx          ✅ Loading screen com farol + barra de progresso
│   ├── Navbar.tsx          ✅ Navbar fixa com scroll effect + mobile drawer
│   ├── Hero.tsx            ✅ Hero full-screen com vídeo parallax
│   ├── Credentials.tsx     ✅ Barra de credenciais com counters animados
│   ├── About.tsx           ✅ Seção sobre — vídeo + texto
│   ├── Showcase.tsx        ✅ Carrossel horizontal de 6 vídeos drag-to-scroll
│   ├── Menu.tsx            ✅ Cardápio completo com 9 abas
│   ├── History.tsx         ✅ Timeline histórica 1986-2024
│   ├── Location.tsx        ✅ Mapa SVG customizado + informações
│   ├── ReserveSection.tsx  ✅ Formulário inline de reserva
│   └── Footer.tsx          ✅ Footer completo com 4 colunas
├── hooks/
│   ├── useCounter.ts       ✅ Hook counter animado por IntersectionObserver
│   └── useScrollReveal.ts  ✅ Variantes Framer Motion (fadeUp, fadeLeft, fadeRight, stagger)
├── lib/
│   ├── videoData.ts        ✅ 7 URLs Cloudinary — NÃO ALTERAR JAMAIS
│   ├── menuData.ts         ✅ Cardápio completo — 9 tabs, dados reais
│   └── timelineData.ts     ✅ Timeline histórica completa 1986-2024
├── next.config.js          ✅ Correto — apenas config de imagens Cloudinary
├── postcss.config.js       ✅ Correto — module.exports = {}
├── package.json            ✅ Dependências corretas
└── tsconfig.json           ✅ Correto — paths @/* mapeado para raiz
```

---

## 🔴 PROBLEMAS IDENTIFICADOS — PRIORIDADE CRÍTICA

### PROBLEMA #1 — CSS não está sendo aplicado (CAUSA RAIZ CONFIRMADA)
**Sintoma:** Site renderiza sem nenhum estilo visual — fundo branco, texto preto sem fontes, sem cores
**Causa:** O `next.config.js` tinha um header `Content-Type: text/html` aplicado a `/(.*)`  
que fazia o browser rejeitar todos os arquivos CSS e JS estáticos. Esse header FOI REMOVIDO.  
**Verificação necessária:** Confirmar que o `next.config.js` atual é SOMENTE:
```js
const nextConfig = {
  images: { domains: ['res.cloudinary.com'] },
}
module.exports = nextConfig
```
Se houver qualquer `async headers()` adicionando `Content-Type` — REMOVER imediatamente.

**Ação:** Deletar pasta `.next/` inteira e rodar `npm run dev` do zero.  
Comando: `Remove-Item -Recurse -Force .\.next\ ; npm run dev`

### PROBLEMA #2 — Textos da seção History invisíveis
**Sintoma:** Na seção #history, aparecem apenas os títulos das décadas (ex: "Década de 1990")  
mas os textos descritivos de cada `item.text` não aparecem.  
**Causa provável:** A animação `whileInView` do Framer Motion está fazendo os textos começarem  
com `opacity: 0` e a `transition.delay` com `index * 0.07` pode estar muito alto para itens  
que entram no viewport ao mesmo tempo. Além disso, o problema #1 (CSS) também afeta as cores.

**Ação:** Em `History.tsx`, alterar os motion.div items para:
```tsx
initial={{ opacity: 0, x: -24 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, amount: 0.05 }}  // ← amount menor
transition={{ duration: 0.5, delay: index * 0.05 }}  // ← delays menores
```

### PROBLEMA #3 — Layout mobile do nav quebrado
**Sintoma:** Em mobile (< 768px), o hamburguer não aparece e os links ficam sobrepostos
**Causa:** As classes `.desktop-nav`, `.desktop-cta` e `.mobile-nav` estão no CSS mas  
o botão hamburguer no Navbar.tsx tem `display: 'none'` inline que sobrescreve o CSS.  
**Ação:** Em `Navbar.tsx`, remover o `display: 'none'` inline do botão hamburguer e  
deixar somente a classe `.mobile-nav` controlar a visibilidade via CSS media query.

---

## 🟡 MELHORIAS VISUAIS — PRIORIDADE ALTA

### MELHORIA #1 — Hero Section: vídeo muito escuro
O Hero tem `opacity: 0.45` no vídeo. O overlay tem gradiente duplo pesado.  
**Ajuste:** Aumentar opacity do vídeo para `0.55` e suavizar o overlay:
```tsx
// Vídeo
style={{ opacity: 0.55, ... }}

// Overlay
background: 'linear-gradient(to bottom, rgba(8,10,28,0.45) 0%, rgba(8,10,28,0.15) 45%, rgba(8,10,28,0.65) 100%)'
```

### MELHORIA #2 — Hero Section: farol decorativo quase invisível
O LighthouseSVG decorativo no Hero tem `opacity: 0.18` que é muito sutil.  
**Ajuste:** Aumentar para `opacity: 0.28` e adicionar animação sutil:
```tsx
<motion.div
  animate={{ opacity: [0.22, 0.32, 0.22] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  style={{ position: 'absolute', right: '6%', bottom: 0, pointerEvents: 'none' }}
>
  <LighthouseSVG size={280} showBeam animated variant="decoration" />
</motion.div>
```

### MELHORIA #3 — Seção About: grid assimétrico mobile
Em mobile, o grid `45% 55%` quebra feio. O badge "38 anos" sai da tela.  
**Ajuste:** Em `About.tsx`, adicionar responsividade:
```tsx
// No container principal:
style={{
  display: 'grid',
  gridTemplateColumns: 'clamp(300px, 45%, 520px) 1fr',
  gap: 'clamp(40px, 5vw, 80px)',
  alignItems: 'center',
}}
```
E em mobile (usar `useEffect` para detectar ou media query via className):
O badge `bottom: -28, right: -28` — garantir que não ultrapasse o container pai.

### MELHORIA #4 — Showcase: scroll não oculta scrollbar
O track de vídeos tem `overflowX: 'auto'` mas em Firefox/Chrome aparece scrollbar feia.  
**Ajuste:** Adicionar ao elemento do track:
```tsx
style={{
  ...estilos atuais...,
  scrollbarWidth: 'none',  // Firefox
  msOverflowStyle: 'none', // IE/Edge
}}
```
E no globals.css já tem `#showcase *::-webkit-scrollbar { display: none }` — confirmar que está ativo.

### MELHORIA #5 — Credentials: grid quebra em telas médias
O `gridTemplateColumns: 'repeat(5,1fr)'` quebra em tablets.  
**Ajuste:**
```tsx
style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(5,1fr)',
  // Adicionar:
  '@media (max-width: 900px)': undefined, // não funciona em inline
}}
```
Como inline styles não suportam media queries, criar uma solução com `useWindowSize` hook ou  
adicionar uma classe CSS `.credentials-grid` ao globals.css com os breakpoints adequados.

### MELHORIA #6 — Counters: ref tipagem TypeScript
Em `Credentials.tsx`, o `useCounter` retorna `ref: useRef<HTMLDivElement>` mas é usado em:
```tsx
ref={years.ref as React.RefObject<HTMLDivElement>}
```
O cast explícito é feio. Corrigir o tipo diretamente em `useCounter.ts`:
```ts
// Atual:
const ref = useRef<HTMLDivElement>(null)
// Corrigir o return type para:
return { count, ref }  // já é correto — remover o cast no Credentials.tsx
```

---

## 🟢 FUNCIONALIDADES A IMPLEMENTAR — PRIORIDADE MÉDIA

### FEATURE #1 — Formulário de Reserva: integração WhatsApp
Atualmente o `ReserveSection.tsx` tem campos mas não submete para lugar nenhum.  
**Implementar:** Ao clicar em "Reservar Mesa", formatar uma mensagem e abrir WhatsApp:
```tsx
const handleReserve = () => {
  const msg = encodeURIComponent(
    `Olá! Quero reservar uma mesa:\n` +
    `Nome: ${nome}\n` +
    `Data: ${data}\n` +
    `Horário: ${hora}\n` +
    `Pessoas: ${pessoas}\n` +
    `Mesa: ${preferenciaMesa}\n` +
    `WhatsApp: ${whatsapp}\n` +
    `Obs: ${observacoes || 'Nenhuma'}`
  )
  window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
}
```
Adicionar o botão "Confirmar Reserva" que chama essa função.  
**Número:** 554733673800 (padrão internacional, sem +)

### FEATURE #2 — ReservationOverlay: Step 4 também envia WhatsApp
No step 4 (confirmação), o botão "Perfeito, até lá!" deve também disparar a  
mensagem de WhatsApp com os dados coletados nos steps anteriores.  
Passar os dados via state para o step final.

### FEATURE #3 — Seção Location: iframe Google Maps real
Atualmente o mapa é um SVG customizado decorativo.  
**Implementar:** Adicionar um iframe do Google Maps como alternativa real:
```tsx
// Endereço: Av. Atlântica, 2554 - Balneário Camboriú, SC
// URL do Maps: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.6!2d-48.6368!3d-26.9905!...
```
Manter o SVG decorativo para o lado esquerdo e adicionar o Maps iframe no lugar do SVG abstrato.  
**Coordenadas exatas:** -26.9905° S, -48.6368° W (Av. Atlântica 2554, Balneário Camboriú)  
URL embed recomendada:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560!2d-48.6368!3d-26.9905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8e3e5d98c20e1%3A0x1234!2sAv.+Atl%C3%A2ntica%2C+2554+-+Balne%C3%A1rio+Cambori%C3%BA%2C+SC!5e0!3m2!1spt-BR!2sbr!4v1640000000000
```

### FEATURE #4 — Navbar: link ativo por scroll
Quando o usuário scrolla para uma seção, o link correspondente na navbar deve  
ficar com uma cor/estilo ativo.  
**Implementar:**
```tsx
// No Navbar, adicionar:
const [activeSection, setActiveSection] = useState('')

useEffect(() => {
  const sections = ['about', 'menu', 'history', 'location', 'reserve-section']
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )
  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
  return () => observer.disconnect()
}, [])
```
Então usar `activeSection` para destacar o link correto.

### FEATURE #5 — Seção Hero: botão "Ver Cardápio" com scroll suave
O link `<a href="#menu">` funciona mas deve fazer scroll suave e não tem feedback visual.  
**Verificar** que `globals.css` tem `scroll-behavior: smooth` no `html` — JÁ TEM. ✅  
**Adicionar** uma classe de hover no botão secundário.

---

## 🔵 AJUSTES DE QUALIDADE — PRIORIDADE BAIXA

### QUALIDADE #1 — TypeScript: remover todos os `void` statements desnecessários
Em `ReserveSection.tsx` existem:
```tsx
void nome; void data; void hora; // etc...
```
Esses são hacks para silenciar warnings de variáveis não usadas.  
**Solução correta:** Usar `_` prefix nas variáveis que são só para estado de UI:
```tsx
const [_nome, setNome] = useState('') // ou remover os void
```
Ou conectar os campos ao submit handler (melhor solução — ver Feature #1).

### QUALIDADE #2 — LighthouseSVG: remover BOM e 'use client' desnecessário
O `LighthouseSVG.tsx` pode rodar como Server Component se não usar hooks React.  
Verificar: usa `motion` do framer-motion → precisa de `'use client'`. Manter como está. ✅

### QUALIDADE #3 — Fonts: garantir `display: 'swap'` explícito
Em `fonts.ts`, adicionar `display: 'swap'` em todas as fontes para evitar FOUT:
```ts
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',  // ← adicionar
})
// Repetir para as outras 3 fontes
```

### QUALIDADE #4 — next.config.js: adicionar configuração de segurança de headers
Adicionar headers de segurança sem quebrar o CSS:
```js
const nextConfig = {
  images: { domains: ['res.cloudinary.com'] },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }]
  },
}
```
**ATENÇÃO CRÍTICA:** NÃO adicionar `Content-Type` aqui. Apenas esses 3 headers de segurança.

### QUALIDADE #5 — Metadata: adicionar favicon e OG image
Em `app/layout.tsx`, melhorar o metadata:
```tsx
export const metadata: Metadata = {
  ...atual...,
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```
Criar `public/favicon.ico` — pode ser um placeholder simples por ora.

---

## 📐 ESPECIFICAÇÕES DE DESIGN — NUNCA ALTERAR

### Identidade Visual — IMUTÁVEL
- **Logo:** LighthouseSVG (farol SVG animado) + "O PHAROL" em Playfair + "Gourmet" em Great Vibes
- **Slogan:** "Excelência gastronômica desde 1986"
- **Tom:** Sofisticado, premium, náutico vintage, familiar

### Tipografia — IMUTÁVEL
- Headings principais: `var(--font-playfair), serif`
- Subtítulos/corpo elegante: `var(--font-cormorant), serif`
- Labels/UI/Navigation: `var(--font-montserrat), sans-serif`
- Acentos estéticos: `var(--font-great-vibes), cursive`

### URLs de Vídeo — NÃO ALTERAR JAMAIS
```
Hero:     https://res.cloudinary.com/djhevgyvi/video/upload/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.mp4
Almoço:   https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4
Jantar:   https://res.cloudinary.com/djhevgyvi/video/upload/v1773003536/janta-tainha_tmpikc.mp4
Rosé:     https://res.cloudinary.com/djhevgyvi/video/upload/v1773003545/servindo-rose_ucaubg.mp4
Barman:   https://res.cloudinary.com/djhevgyvi/video/upload/v1773003984/barman-drinks_khd86e.mp4
Feijoada: https://res.cloudinary.com/djhevgyvi/video/upload/v1773003985/s%C3%A1bado-dia-de-feijoada_hiuwaj.mp4
Petit:    https://res.cloudinary.com/djhevgyvi/video/upload/v1773003974/petit-gateau-sobremesa-bc_tmp3gg.mp4
```

### Dados do Restaurante — IMUTÁVEIS
```
Nome:      O Pharol Restaurante Gourmet
Endereço:  Av. Atlântica, 2554 – Sala 01, esquina Rua 2000, Centro, Balneário Camboriú – SC
CEP:       88330-906
Tel:       (47) 3367-3800
WhatsApp:  554733673800
Email:     opharol@opharol.com.br
Instagram: @opharolbc.oficial
Horário:   Segunda a Domingo, 11h30 – 00h30
CNPJ:      18.618.919/0001-09
Crédito:   Desenvolvido por Global Landing → globallanding.com.br
```

---

## 🚀 PROTOCOLO DE EXECUÇÃO — ORDEM OBRIGATÓRIA

### FASE 0: Diagnóstico (EXECUTAR PRIMEIRO — não pular)
```powershell
# 1. Verificar estado atual dos arquivos críticos
Get-Content "C:\Users\pc\Desktop\Projetos\o-pharol\next.config.js"
Get-Content "C:\Users\pc\Desktop\Projetos\o-pharol\postcss.config.js"
Get-Content "C:\Users\pc\Desktop\Projetos\o-pharol\app\globals.css" | Select-Object -First 30

# 2. Verificar se .next existe (cache possivelmente corrompido)
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\.next"

# 3. Se .next existir, deletar para rebuild limpo
Remove-Item -Recurse -Force "C:\Users\pc\Desktop\Projetos\o-pharol\.next" -ErrorAction SilentlyContinue

# 4. Verificar node_modules
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\node_modules\next"
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\node_modules\framer-motion"
```

### FASE 1: Correções Críticas (BLOQUEANTES — resolver antes de qualquer outra coisa)
1. Confirmar `next.config.js` sem headers `Content-Type`
2. Confirmar `postcss.config.js` = `module.exports = {}`
3. Deletar `.next/` e rebuildar
4. Corrigir visibilidade de itens na seção History (viewport amount)
5. Corrigir mobile nav (remover `display: none` inline do hamburger)

### FASE 2: Melhorias Visuais
1. Hero: opacity do vídeo e overlay
2. Hero: farol decorativo com animação sutil
3. About: responsividade do grid
4. Showcase: esconder scrollbar cross-browser
5. Credentials: responsividade do grid em tablets

### FASE 3: Funcionalidades
1. WhatsApp integration no ReserveSection
2. WhatsApp no ReservationOverlay step 4
3. Google Maps iframe no Location
4. Navbar active section detection
5. Fonts display: 'swap'

### FASE 4: Qualidade e Polimento
1. TypeScript cleanup (remover void statements)
2. Security headers no next.config.js
3. Metadata completo + favicon
4. Teste completo mobile 375px
5. Teste completo desktop 1920px

---

## ✅ CRITÉRIOS DE ACEITAÇÃO — CHECKLIST FINAL

### Visual
- [ ] Loading screen aparece com farol animado e barra de progresso dourada sobre fundo navy
- [ ] Navbar transparente no topo, vira opaca navy ao scrollar
- [ ] Hero: vídeo visível em background, título "O PHAROL" gigante, farol decorativo visível no canto
- [ ] Barra de credenciais navy com contadores animando ao entrar na viewport
- [ ] About: vídeo no lado esquerdo, texto no direito, badge "38 anos" sobreposto
- [ ] Showcase: 6 vídeos em carrossel horizontal, drag funcional, barra de progresso
- [ ] Menu: 9 abas funcionais com todos os pratos e preços
- [ ] History: timeline vertical com textos visíveis e animações de entrada
- [ ] Location: informações de contato + mapa (SVG ou Google Maps iframe)
- [ ] ReserveSection: formulário completo com envio WhatsApp
- [ ] Footer: 4 colunas, links funcionais, crédito Global Landing
- [ ] Todos os overlays (Reserva, Cliente, Fila, Admin) abrem como slide-in da direita

### Técnico
- [ ] `npm run build` executa sem erros TypeScript
- [ ] Sem warnings de console no browser
- [ ] CSS variables funcionando (fundo navy nos locais corretos, dourado nos destaques)
- [ ] Fontes Playfair Display, Cormorant Garamond carregando corretamente
- [ ] Vídeos autoplay no hero e about
- [ ] Animações Framer Motion disparando ao scroll
- [ ] Mobile 375px: menu hamburguer funcional, seções sem overflow horizontal

### Conteúdo
- [ ] Sem caracteres corrompidos em nenhum lugar (ex: Ã£, Ã§, ðŸ)
- [ ] Todos os preços corretos conforme cardápio original
- [ ] Informações de contato corretas (telefone, endereço, horário)
- [ ] URLs dos vídeos intactas (não alteradas)

---

## ⚠️ REGRAS ABSOLUTAS — NUNCA VIOLAR

1. **NÃO adicionar Tailwind CSS** — o projeto usa exclusivamente CSS custom properties + inline styles
2. **NÃO alterar as URLs dos vídeos Cloudinary** — são imutáveis
3. **NÃO instalar dependências desnecessárias** — stack é next + react + react-dom + framer-motion + typescript apenas
4. **NÃO usar `<style>` tags inline no JSX** — usar `style={{}}` ou globals.css
5. **NÃO adicionar Content-Type header no next.config.js** — QUEBRA O CSS
6. **NÃO remover o arquivo `lib/menuData.ts`** — tem 400+ linhas de cardápio real
7. **NÃO alterar dados do restaurante** (nome, endereço, telefone, CNPJ, crédito)
8. **NÃO usar Tailwind classes** como `className="flex items-center"` — NÃO FUNCIONA SEM TAILWIND
9. **Salvar TODOS os arquivos em UTF-8 sem BOM** — encoding crítico para português
10. **Manter `'use client'`** em todos os componentes que usam hooks ou event handlers

---

## 🎯 RESULTADO ESPERADO

Um website de restaurante gourmet premium rodando em `localhost:3000` que:
- Carrega com uma loading screen elegante com o farol animado
- Tem um Hero cinematográfico com vídeo em background e parallax
- Apresenta o restaurante com sofisticação visual de nível internacional
- Tem um cardápio digital completo e navegável
- Permite reservas via WhatsApp integrado
- Tem uma área de cliente funcional (mesmo que mockada)
- Funciona perfeitamente em mobile e desktop
- Reflete 38 anos de tradição gastronômica de Balneário Camboriú
