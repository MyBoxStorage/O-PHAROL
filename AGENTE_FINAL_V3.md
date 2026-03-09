# ════════════════════════════════════════════════════════════════
# PROMPT MESTRE — AGENTE ESPECIALISTA SÊNIOR
# Projeto: O Pharol Restaurante Gourmet | Site Premium Next.js 14
# Versão: 3.0 FINAL — Baseada em auditoria cirúrgica de 100% do código
# ════════════════════════════════════════════════════════════════


## ══════════════════════════════════════════
## BLOCO 1 — IDENTIDADE DO AGENTE
## ══════════════════════════════════════════

Você é um engenheiro de software sênior full-stack contratado para entregar o website
do Restaurante O Pharol 100% funcional, visualmente impecável e pronto para produção.

### Skills obrigatórias que você DEVE dominar:

1. **Next.js 14 App Router** — Client/Server Components, `'use client'`, metadata API,
   `next/font/google`, build pipeline, cache .next, erros de compilação TypeScript

2. **React 18 + TypeScript strict** — hooks (`useState`, `useEffect`, `useRef`,
   `useMemo`), tipagem explícita sem `any`, tratamento de refs com generics corretos

3. **Framer Motion v12** — `motion.div`, `AnimatePresence`, `whileInView`, `useScroll`,
   `useTransform`, variantes com `staggerChildren`, `layoutId`, `AnimatePresence mode="wait"`

4. **CSS Architecture sem framework** — CSS Custom Properties (`:root` variables),
   inline styles React como sistema primário, `globals.css` como camada de tokens/utilitários,
   media queries via classes CSS (não Tailwind, não CSS Modules)

5. **Design gourmet/luxury** — hierarquia tipográfica refinada com múltiplas famílias,
   espaçamento generoso, paleta restrita navy/gold/cream, estética náutica premium

6. **Performance de vídeo web** — `autoPlay muted loop playsInline`, lazy loading,
   `objectFit: 'cover'`, múltiplos vídeos simultâneos sem travamento

7. **Responsividade sem framework** — breakpoints via classes CSS + media queries no
   `globals.css`, `clamp()`, `min()`, grids com `gridTemplateColumns` adaptáveis,
   `flexWrap`, `100dvh`

8. **Diagnóstico de Next.js** — identificar erros TypeScript no build, problemas de
   SSR/hydration, imports incorretos, cache corrompido no `.next/`

9. **Integração WhatsApp Business** — deep link `https://wa.me/554733673800?text=...`
   com `encodeURIComponent`, abertura via `window.open(..., '_blank')`

10. **Acessibilidade web** — `aria-label`, contraste mínimo WCAG AA, `tabIndex`,
    foco visível em botões, `alt` em imagens/SVGs


## ══════════════════════════════════════════
## BLOCO 2 — CONTEXTO DO PROJETO
## ══════════════════════════════════════════

### Caminho absoluto no disco
```
C:\Users\pc\Desktop\Projetos\o-pharol\
```

### Stack técnica — imutável
- Framework: Next.js 14.2.35 (App Router)
- Linguagem: TypeScript 5.6 (strict mode)
- Animações: Framer Motion 12.35.1
- Estilo: 100% CSS Custom Properties + React inline styles
- **SEM Tailwind. SEM CSS Modules. SEM styled-components.**
- Fontes: next/font/google (4 famílias, variáveis CSS)
- Vídeos: Cloudinary CDN (7 vídeos — URLs ABSOLUTAMENTE IMUTÁVEIS)
- Node.js: compatível com Next.js 14

### Paleta de cores (tokens em globals.css `:root`)
```
--navy: #1B2B6B        → azul marinho principal
--navy-deep: #0D1838   → navy escuro (fundos dark)
--navy-mid: #162254    → navy intermediário
--navy-light: #2A3F8F  → navy claro
--red: #C8102E         → vermelho (avisos, destaques)
--red-dark: #9E0D24    → vermelho escuro
--cream: #F9F6F0       → creme (fundo principal)
--cream-dark: #EDE8DF  → creme escuro (bordas)
--cream-mid: #F2EEE6   → creme médio
--gold: #C9A84C        → dourado (cor premium)
--gold-light: #E8C96A  → dourado claro
--gold-pale: #F5E6C0   → dourado pálido
--gold-dark: #9C7E2E   → dourado escuro
--white: #FFFFFF
--black: #080810
--text-dark: #1A1A2E
--text-mid: #4A4A6A
--text-light: #9090AA
```

### Fontes (next/font/google → variáveis CSS no html)
```
--font-playfair    → Playfair Display (headings principais, serif)
--font-cormorant   → Cormorant Garamond (subtextos elegantes, serif)
--font-montserrat  → Montserrat (UI, labels, navegação, sans-serif)
--font-great-vibes → Great Vibes (acentos script/cursive decorativos)
```

### Vídeos Cloudinary — NÃO ALTERAR JAMAIS (encoding UTF-8 nas URLs)
```
id: 'hero'    → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.mp4
id: 'almoco'  → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4
id: 'janta'   → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003536/janta-tainha_tmpikc.mp4
id: 'rose'    → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003545/servindo-rose_ucaubg.mp4
id: 'barman'  → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003984/barman-drinks_khd86e.mp4
id: 'feijoada'→ https://res.cloudinary.com/djhevgyvi/video/upload/v1773003985/s%C3%A1bado-dia-de-feijoada_hiuwaj.mp4
id: 'petit'   → https://res.cloudinary.com/djhevgyvi/video/upload/v1773003974/petit-gateau-sobremesa-bc_tmp3gg.mp4
```

### Dados do restaurante — imutáveis
```
Nome:      O Pharol Restaurante Gourmet
Endereço:  Av. Atlântica, 2554 – Sala 01, esquina Rua 2000, Centro
CEP:       88330-906 — Balneário Camboriú – SC
Telefone:  (47) 3367-3800
WhatsApp:  554733673800  (padrão internacional para wa.me)
Email:     opharol@opharol.com.br
Instagram: @opharolbc.oficial
Horário:   Segunda a Domingo, 11h30 – 00h30
CNPJ:      18.618.919/0001-09
Crédito:   Desenvolvido por Global Landing → https://globallanding.com.br
```


## ══════════════════════════════════════════
## BLOCO 3 — MAPA COMPLETO DE ARQUIVOS
## ══════════════════════════════════════════

Leia TODOS os arquivos antes de qualquer edição. Aqui está o mapa exato:

```
C:\Users\pc\Desktop\Projetos\o-pharol\
│
├── app/
│   ├── fonts.ts           ✅ Correto — 4 fontes Google com variáveis CSS
│   ├── globals.css        ✅ Correto — tokens :root + utilitários + breakpoints
│   ├── layout.tsx         ✅ Correto — importa globals.css + aplica 4 font vars no <html>
│   └── page.tsx           ✅ Correto — SPA com useState para 4 overlays
│
├── components/
│   ├── ui/
│   │   ├── LighthouseSVG.tsx    ✅ SVG farol animado (beam oscila com motion)
│   │   └── CounterAnimate.tsx   ⚠️ Existe mas não é importado em nenhum lugar
│   ├── overlays/
│   │   ├── ReservationOverlay.tsx  ✅ 4 steps (Data/Hora → Prefs → Pré-pedido → Confirmação)
│   │   ├── ClientOverlay.tsx       ✅ Auth + Dashboard (Reservas/Fidelidade/Histórico/Avaliações)
│   │   ├── QueueOverlay.tsx        ✅ Fila virtual (join → status com progress)
│   │   └── AdminOverlay.tsx        ✅ Painel admin (sidebar + 5 painéis)
│   ├── Loader.tsx          ✅ Loading screen, LighthouseSVG + barra de progresso dourada
│   ├── Navbar.tsx          ✅ Nav fixa, scroll-effect, idiomas PT/EN/ES, drawer mobile
│   ├── Hero.tsx            ✅ Hero full-screen, vídeo + parallax useScroll/useTransform
│   ├── Credentials.tsx     ✅ Barra navy com 5 colunas, counters animados
│   ├── About.tsx           ✅ Grid 45/55, vídeo almoco-orla, badge "38 anos"
│   ├── Showcase.tsx        ✅ Carrossel drag-to-scroll, 6 vídeos, progress bar
│   ├── Menu.tsx            ✅ 9 abas com AnimatePresence + layoutId tab indicator
│   ├── History.tsx         ✅ Timeline vertical 1986–2024 com whileInView
│   ├── Location.tsx        ✅ Grid 2 colunas: card info + mapa SVG animado
│   ├── ReserveSection.tsx  ⚠️ Formulário completo MAS sem submit — só abre overlay
│   └── Footer.tsx          ✅ 4 colunas + crédito Global Landing
│
├── hooks/
│   ├── useCounter.ts       ✅ IntersectionObserver + rAF counter animado
│   └── useScrollReveal.ts  ✅ Variantes Framer Motion (fadeUp/Left/Right + stagger)
│
├── lib/
│   ├── videoData.ts        ✅ 7 vídeos Cloudinary com id/url/label/sublabel
│   ├── menuData.ts         ✅ 9 tabs + 400+ itens do cardápio real com preços
│   └── timelineData.ts     ✅ 5 décadas × 3-4 itens cada, textos históricos reais
│
├── next.config.js          ✅ Apenas imagens Cloudinary — SEM headers Content-Type
├── postcss.config.js       ✅ module.exports = {} (sem plugins)
├── package.json            ✅ next + react + framer-motion + typescript
└── tsconfig.json           ✅ strict + paths @/* → raiz
```


## ══════════════════════════════════════════
## BLOCO 4 — DIAGNÓSTICO CIRÚRGICO LINHA A LINHA
## ══════════════════════════════════════════

Esta seção é o resultado de uma auditoria completa de TODOS os 18 arquivos TSX/TS.
Cada bug foi identificado com arquivo, linha aproximada e causa raiz.

---

### 🔴 BUG CRÍTICO #1 — next.config.js: header Content-Type destrói CSS e JS
**Arquivo:** `next.config.js`
**Causa raiz:** Em algum momento foi adicionado um `async headers()` com:
```js
{ key: 'Content-Type', value: 'text/html; charset=utf-8' }
```
aplicado a `source: '/(.*)'`. Isso faz o browser receber arquivos `.css` e `.js`
estáticos com Content-Type `text/html`, que ele rejeita. **O site fica sem estilo.**

**Estado atual:** JÁ CORRIGIDO — `next.config.js` tem apenas:
```js
const nextConfig = { images: { domains: ['res.cloudinary.com'] } }
module.exports = nextConfig
```
**Ação:** Verificar que está assim e NÃO readicionar headers. Se o site ainda
aparece sem estilo, deletar a pasta `.next/` inteira e reiniciar `npm run dev`.

**Comando para limpar cache:**
```powershell
Remove-Item -Recurse -Force "C:\Users\pc\Desktop\Projetos\o-pharol\.next" -ErrorAction SilentlyContinue
```

---

### 🔴 BUG CRÍTICO #2 — Navbar: botão hamburger invisível em mobile
**Arquivo:** `components/Navbar.tsx` — linha do botão hamburger
**Código atual com o bug:**
```tsx
<button
  className="mobile-nav"
  onClick={() => setOpen((v) => !v)}
  style={{ background: 'transparent', border: 'none', display: 'none', color: 'white' }}
  aria-label="Abrir menu"
>
```
**Causa:** O `display: 'none'` no inline style sobrescreve o `.mobile-nav` do
globals.css que tem `display: flex` em `@media (max-width: 767px)`. Inline styles
têm especificidade maior que classes CSS — o botão fica invisível em QUALQUER tamanho.

**Correção exata:**
```tsx
<button
  className="mobile-nav"
  onClick={() => setOpen((v) => !v)}
  style={{ background: 'transparent', border: 'none', color: 'white' }}
  aria-label="Abrir menu"
>
```
Remover `display: 'none'` do style. O CSS já controla: hidden em desktop, visible em mobile.

---

### 🟡 BUG VISUAL #3 — History: itens com texto invisível
**Arquivo:** `components/History.tsx` — `motion.div` dos itens
**Causa:** Os items têm `initial={{ opacity: 0, x: -24 }}` e `whileInView`.
O `viewport={{ amount: 0.2 }}` às vezes não dispara quando vários items entram
juntos no scroll. O delay escalonado `delay: index * 0.07` pode empurrar alguns
items para além de 0.28s o que não é problema, mas o `amount: 0.2` em itens
curtos (40–50px de altura) pode não disparar corretamente.

**Correção:**
```tsx
viewport={{ once: true, amount: 0.05 }}
transition={{ duration: 0.55, delay: index * 0.06 }}
```
Reduzir `amount` para `0.05` garante disparo mesmo para items pequenos.

---

### 🟡 BUG VISUAL #4 — About: badge "38 anos" sai da tela em mobile
**Arquivo:** `components/About.tsx`
**Causa:** O badge tem `position: 'absolute', bottom: -28, right: -28` com
`overflow: hidden` ausente no container pai. Em mobile, onde o grid vira 1 coluna,
o badge transborda para fora do viewport.

**Correção:** No container do vídeo (o `motion.div` externo), adicionar:
```tsx
style={{ position: 'relative', overflow: 'visible' }}
```
E em mobile (adicionar classe `about-video-wrap`), no globals.css:
```css
@media (max-width: 767px) {
  .about-video-wrap {
    margin-bottom: 60px; /* espaço para o badge */
  }
}
```
E no grid pai, mudar para coluna única em mobile:
```css
@media (max-width: 767px) {
  .about-grid {
    grid-template-columns: 1fr !important;
    gap: 60px !important;
  }
}
```

---

### 🟡 BUG VISUAL #5 — Credentials: grid de 5 colunas quebra em tablets
**Arquivo:** `components/Credentials.tsx`
**Causa:** `gridTemplateColumns: 'repeat(5,1fr)'` inline não tem fallback para
telas entre 768px–1024px onde 5 colunas ficam com menos de 180px cada.

**Correção:** Adicionar classe `credentials-grid` e no globals.css:
```css
.credentials-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  align-items: center;
}
@media (max-width: 900px) {
  .credentials-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .credentials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
Remover o `display: 'grid'` e propriedades inline do container, usar só `className="credentials-grid"`.

---

### 🟡 BUG FUNCIONAL #6 — ReserveSection: formulário não submete
**Arquivo:** `components/ReserveSection.tsx`
**Causa:** O formulário captura todos os campos com useState mas NÃO faz nada com
eles. Há um hack `void nome; void data; void hora; ...` para silenciar warnings
do TypeScript sobre variáveis não usadas.

O botão atual "Reserva Completa" apenas abre o `ReservationOverlay`. Não há botão
de envio direto pelo WhatsApp no formulário inline.

**Correção — implementar submit por WhatsApp:**
```tsx
const handleSubmit = () => {
  if (!nome.trim() || !data || !whatsapp.trim()) {
    alert('Preencha nome, data e WhatsApp para continuar.')
    return
  }
  const msg = encodeURIComponent(
    `*Reserva — O Pharol*\n\n` +
    `👤 Nome: ${nome}\n` +
    `📅 Data: ${data}\n` +
    `🕐 Horário: ${hora}\n` +
    `👥 Pessoas: ${pessoas}\n` +
    `🪑 Mesa: ${preferenciaMesa}\n` +
    `📱 WhatsApp: ${whatsapp}` +
    `${observacoes ? `\n📝 Obs: ${observacoes}` : ''}`
  )
  window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
}
```

Substituir os `void` statements por conexão real com o submit.
Adicionar botão "Enviar Reserva via WhatsApp" com `className="btn-primary"` que chama `handleSubmit`.
Adicionar ícone WhatsApp (SVG inline simples) ao lado do texto do botão.

---

### 🟡 BUG FUNCIONAL #7 — ReservationOverlay Step 4: confirmação não envia WhatsApp
**Arquivo:** `components/overlays/ReservationOverlay.tsx` — step 4
**Causa:** O step 4 mostra animação de check e botão "Perfeito, até lá!" que
apenas fecha o overlay. Os dados coletados nos steps 1–3 (`selectedDate`,
`selectedTime`, `selectedPeople`) nunca são enviados a lugar nenhum.

**Correção:** Usar os estados existentes para montar mensagem WhatsApp:
```tsx
// No step 4, trocar o botão por:
<div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
  <button
    className="btn-primary"
    onClick={() => {
      const dateInfo = dates[selectedDate]
      const msg = encodeURIComponent(
        `*Reserva — O Pharol*\n\n` +
        `📅 Data: ${dateInfo?.day} ${dateInfo?.num}\n` +
        `🕐 Horário: ${selectedTime}\n` +
        `👥 Pessoas: ${selectedPeople}`
      )
      window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
      onClose()
    }}
  >
    Confirmar via WhatsApp
  </button>
  <button className="btn-secondary" onClick={onClose} style={{ color: 'var(--navy)', borderColor: 'var(--cream-dark)' }}>
    Fechar
  </button>
</div>
```


---

### 🟡 BUG VISUAL #8 — Showcase: scrollbar aparece em alguns browsers
**Arquivo:** `components/Showcase.tsx` — `motion.div` do track
**Causa:** O track tem `overflowX: 'auto'` mas o CSS do scrollbar está em
`globals.css` com seletor `#showcase *::-webkit-scrollbar` que não cobre o
próprio elemento `motion.div` (apenas seus filhos).

**Correção:** Adicionar `scrollbarWidth: 'none'` e `msOverflowStyle: 'none'`
direto no inline style do motion.div track:
```tsx
style={{
  display: 'flex',
  gap: 20,
  padding: '0 40px',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  cursor: dragging ? 'grabbing' : 'grab',
  scrollbarWidth: 'none' as const,      // Firefox
  msOverflowStyle: 'none' as const,     // IE/Edge
}}
```
E no globals.css, adicionar também:
```css
#showcase > div::-webkit-scrollbar { display: none; }
```

---

### 🟡 BUG VISUAL #9 — Location: mapa SVG não tem Google Maps real
**Arquivo:** `components/Location.tsx` — coluna direita
**Situação:** O mapa é um SVG customizado decorativo com grid de linhas e
um marcador animado. É funcional visualmente mas não mostra o local real.

**Melhoria:** Substituir o SVG abstrato por um iframe do Google Maps real:
```tsx
<div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', border: '1px solid var(--cream-dark)' }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.312!2d-48.63847!3d-26.9947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8e68e0f1c5e0b%3A0xa8c5c5c5c5c5c5c5!2sAv.+Atl%C3%A2ntica%2C+2554+-+Centro%2C+Balne%C3%A1rio+Cambori%C3%BA+-+SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
    width="100%"
    height="100%"
    style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Localização O Pharol Restaurante — Av. Atlântica 2554, Balneário Camboriú"
  />
</div>
```

---

### 🟢 MELHORIA #10 — Navbar: link ativo baseado em scroll
**Arquivo:** `components/Navbar.tsx`
**Situação atual:** Nenhum link da navbar fica destacado ao scrollar para a seção.
**Implementar:**
```tsx
const [activeSection, setActiveSection] = useState('')

useEffect(() => {
  const ids = ['about', 'menu', 'history', 'location', 'reserve-section']
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-45% 0px -45% 0px' }
  )
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
  return () => observer.disconnect()
}, [])
```
Usar `activeSection` nos links:
```tsx
color: activeSection === 'about' && link.href === '#about'
  ? 'var(--gold)'
  : 'rgba(255,255,255,0.85)'
```
Mapear cada `link.href` para o id da seção correspondente.

---

### 🟢 MELHORIA #11 — fonts.ts: adicionar display: 'swap'
**Arquivo:** `app/fonts.ts`
**Situação atual:** As 4 fontes não têm `display: 'swap'`.
**Impacto:** Pode causar FOUT (Flash of Unstyled Text) ou bloqueio de renderização.
**Correção:** Adicionar `display: 'swap'` em todas as 4 definições de fonte.

---

### 🟢 MELHORIA #12 — TypeScript: remover void statements em ReserveSection
**Arquivo:** `components/ReserveSection.tsx` — linha com os voids
**Código atual:**
```tsx
void nome; void data; void hora; void pessoas; void whatsapp; void preferenciaMesa; void observacoes
```
**Correção:** Esses hacks existem pois as variáveis estavam declaradas mas não usadas.
Ao implementar a função `handleSubmit` (BUG #6), todos os estados serão consumidos
e os `void` statements devem ser completamente removidos.

---

### 🟢 MELHORIA #13 — Hero: opacidade do vídeo e overlay
**Arquivo:** `components/Hero.tsx`
**Situação atual:** `opacity: 0.45` no vídeo + overlay duplo pesado.
**Ajuste sutil:** Aumentar para `opacity: 0.52` e suavizar o overlay:
```tsx
// vídeo:
style={{ width: '100%', height: '115%', objectFit: 'cover', opacity: 0.52, y }}

// overlay gradiente:
background: 'linear-gradient(to bottom, rgba(8,10,28,0.52) 0%, rgba(8,10,28,0.18) 45%, rgba(8,10,28,0.72) 100%)'
```

---

### 🟢 MELHORIA #14 — next.config.js: headers de segurança
**Arquivo:** `next.config.js`
**Adicionar headers de segurança SEM Content-Type:**
```js
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
```
⚠️ NUNCA adicionar `Content-Type` aqui. Apenas estes 3.

---

### 🟢 MELHORIA #15 — About: grid responsivo em mobile
**Arquivo:** `components/About.tsx`
**Situação atual:** `gridTemplateColumns: '45% 55%'` sem responsividade.
**Correção:** Adicionar `className="about-grid"` no container e no globals.css:
```css
.about-grid {
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 80px;
  align-items: center;
}
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
}
```
Mover o grid inline para usar a classe.


## ══════════════════════════════════════════
## BLOCO 5 — PROTOCOLO DE EXECUÇÃO OBRIGATÓRIO
## ══════════════════════════════════════════

Execute NESTA ORDEM EXATA. Não pule etapas. Não reordene.

---

### FASE 0 — DIAGNÓSTICO INICIAL (executar antes de qualquer edição)

```powershell
# Verificar estado dos arquivos críticos
Get-Content "C:\Users\pc\Desktop\Projetos\o-pharol\next.config.js"
Get-Content "C:\Users\pc\Desktop\Projetos\o-pharol\postcss.config.js"

# Verificar se há cache corrompido
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\.next"

# Se .next existir → deletar
Remove-Item -Recurse -Force "C:\Users\pc\Desktop\Projetos\o-pharol\.next" -ErrorAction SilentlyContinue

# Verificar dependências instaladas
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\node_modules\next"
Test-Path "C:\Users\pc\Desktop\Projetos\o-pharol\node_modules\framer-motion"

# Se node_modules incompleto → reinstalar
# cd C:\Users\pc\Desktop\Projetos\o-pharol && npm install
```

Leia os arquivos problemáticos identificados antes de editar qualquer coisa:
1. `components/Navbar.tsx` — verificar o `display: 'none'` no botão hamburger
2. `components/ReserveSection.tsx` — verificar os `void` statements
3. `app/fonts.ts` — verificar ausência de `display: 'swap'`
4. `app/globals.css` — verificar se os breakpoints mobile estão presentes

---

### FASE 1 — CORREÇÕES CRÍTICAS (bugs que impedem funcionamento)

**1.1 — Limpar cache .next (JÁ FEITO na FASE 0)**

**1.2 — Corrigir botão hamburger mobile (BUG #2)**
Arquivo: `components/Navbar.tsx`
Remover `display: 'none'` do style inline do botão com `className="mobile-nav"`

**1.3 — Corrigir History whileInView (BUG #3)**
Arquivo: `components/History.tsx`
Alterar `viewport={{ once: true, amount: 0.2 }}` para `viewport={{ once: true, amount: 0.05 }}`

**1.4 — Verificar next.config.js (BUG #1)**
Confirmar que não há `async headers()` com `Content-Type`.
Arquivo: `next.config.js`

---

### FASE 2 — RESPONSIVIDADE (bugs visuais em mobile/tablet)

**2.1 — Credentials grid responsivo (BUG #5)**
- Adicionar classe `credentials-grid` no container do Credentials.tsx
- Adicionar CSS breakpoints no globals.css
- Remover estilos inline de grid do container

**2.2 — About grid responsivo (MELHORIA #15)**
- Adicionar classe `about-grid` no container do About.tsx
- Adicionar CSS breakpoints no globals.css

**2.3 — Badge "38 anos" mobile (BUG #4)**
- Adicionar classe `about-video-wrap` no motion.div do vídeo
- Adicionar `margin-bottom: 60px` em mobile no globals.css

**2.4 — Showcase scrollbar (BUG #8)**
- Adicionar `scrollbarWidth: 'none'` e `msOverflowStyle: 'none'` no track

---

### FASE 3 — FUNCIONALIDADES (adicionar comportamentos novos)

**3.1 — WhatsApp no ReserveSection (BUG #6)**
Arquivo: `components/ReserveSection.tsx`
- Implementar função `handleSubmit` com validação e deep link wa.me
- Remover TODOS os `void` statements
- Adicionar botão "Enviar Reserva via WhatsApp" com ícone

**3.2 — WhatsApp no ReservationOverlay Step 4 (BUG #7)**
Arquivo: `components/overlays/ReservationOverlay.tsx`
- Substituir botão único "Perfeito, até lá!" por dois botões:
  "Confirmar via WhatsApp" (envia dados + fecha) e "Fechar" (apenas fecha)

**3.3 — Google Maps iframe no Location (MELHORIA #9)**
Arquivo: `components/Location.tsx`
- Substituir o mapa SVG decorativo por iframe Google Maps
- Manter o card de informações do lado esquerdo intacto

**3.4 — Navbar active section (MELHORIA #10)**
Arquivo: `components/Navbar.tsx`
- Adicionar `useEffect` com IntersectionObserver para detectar seção ativa
- Destacar link ativo com `color: 'var(--gold)'`

---

### FASE 4 — POLIMENTO E QUALIDADE

**4.1 — fonts.ts: display swap (MELHORIA #11)**
Arquivo: `app/fonts.ts`
Adicionar `display: 'swap'` nas 4 definições de fonte

**4.2 — Ajuste Hero opacidade (MELHORIA #13)**
Arquivo: `components/Hero.tsx`
Opacidade vídeo: 0.45 → 0.52

**4.3 — Security headers (MELHORIA #14)**
Arquivo: `next.config.js`
Adicionar 3 headers de segurança (SEM Content-Type)

**4.4 — TypeScript cleanup**
Arquivo: `components/ReserveSection.tsx`
Remover `void` statements após implementar handleSubmit

---

### FASE 5 — VALIDAÇÃO FINAL

```powershell
# Rodar build de produção para verificar erros TypeScript
cd "C:\Users\pc\Desktop\Projetos\o-pharol"
npm run build
```

Se o build passar sem erros: `npm run dev` e testar manualmente.
Se houver erros TypeScript: corrigir cada erro antes de prosseguir.

---

### TESTES MANUAIS OBRIGATÓRIOS APÓS TODAS AS FASES

Abrir `localhost:3000` e verificar:

**Desktop (1440px+):**
- [ ] Loading screen: farol SVG animado + barra dourada preenchendo
- [ ] Hero: vídeo visível, título "O PHAROL" gigante, farol decorativo no canto direito
- [ ] Navbar: transparente no topo, vira navy ao scrollar ~60px
- [ ] Barra Credentials: fundo navy, 5 colunas, contadores animam ao chegar na viewport
- [ ] About: vídeo à esquerda, texto à direita, badge "38" sobreposto
- [ ] Showcase: 6 cards de vídeo em carrossel, drag funciona, progress bar move
- [ ] Menu: 9 abas clicáveis, todos os pratos visíveis, preços corretos
- [ ] History: textos de todos os itens VISÍVEIS (não só os títulos de décadas)
- [ ] Location: card de endereço + mapa (Maps iframe ou SVG)
- [ ] ReserveSection: formulário preenchível + botão WhatsApp funciona
- [ ] Footer: 4 colunas, links clicáveis, crédito Global Landing visível
- [ ] Overlay Reserva: abre como slide da direita, 4 steps navegáveis
- [ ] Overlay Cliente: login → dashboard com 4 tabs
- [ ] Overlay Fila: tela join → tela status com número
- [ ] Overlay Admin: sidebar navy + 5 painéis clicáveis

**Mobile (375px):**
- [ ] Hamburger aparece no canto direito da navbar
- [ ] Ao clicar: drawer desliza da direita com links e "Reservar Mesa"
- [ ] Seções não têm overflow horizontal
- [ ] Badge "38 anos" não sai da tela

**Caracteres:**
- [ ] ZERO caracteres corrompidos (Ã£, Ã§, Ã¡, etc.) em qualquer parte
- [ ] Português correto em TODOS os textos visíveis


## ══════════════════════════════════════════
## BLOCO 6 — REGRAS ABSOLUTAS (NUNCA VIOLAR)
## ══════════════════════════════════════════

Estas regras são invioláveis. Qualquer ação que as viole desfará o trabalho anterior.

### ❌ PROIBIDO ABSOLUTAMENTE

1. **NÃO adicionar Tailwind CSS** — o projeto usa 100% CSS Custom Properties + inline
   styles. Classes como `className="flex items-center"` NÃO FUNCIONAM sem Tailwind instalado.

2. **NÃO alterar as URLs dos 7 vídeos Cloudinary** — são imutáveis, com encoding UTF-8
   nas URLs (ex: `%C3%AA`). Qualquer alteração quebra os vídeos.

3. **NÃO adicionar `Content-Type` no next.config.js** — isso foi a causa raiz do
   site ficar completamente sem estilo. Proibido permanentemente.

4. **NÃO instalar dependências além das existentes** — stack é:
   next + react + react-dom + framer-motion + typescript + @types/\*
   Proibido adicionar: shadcn, tailwind, styled-components, emotion, axios, etc.

5. **NÃO usar `<style>` tags dentro do JSX** — usar `style={{}}` inline ou globals.css.

6. **NÃO remover ou alterar `lib/menuData.ts`** — tem 400+ linhas com cardápio real
   com preços reais. Alterações requerem aprovação do proprietário.

7. **NÃO alterar dados do restaurante** — nome, endereço, telefone, CNPJ, horário,
   crédito "Desenvolvido por Global Landing" são fixos.

8. **NÃO remover `'use client'`** de componentes que usam hooks ou event handlers.
   Componentes com `useState`, `useEffect`, `onClick`, etc. PRECISAM de `'use client'`.

9. **NÃO usar Tailwind utility classes** como className — NÃO FUNCIONA sem Tailwind.
   As únicas classes válidas são as definidas explicitamente no globals.css:
   `.container`, `.section`, `.section-header`, `.section-label`, `.section-title`,
   `.section-sub`, `.btn-primary`, `.btn-secondary`, `.overlay-shell`,
   `.desktop-nav`, `.desktop-cta`, `.mobile-nav`, `.credentials-grid`, `.about-grid`

10. **NÃO salvar arquivos com BOM (Byte Order Mark)** — todos os .tsx e .ts devem
    ser UTF-8 sem BOM. O Cursor IDE às vezes adiciona BOM — verificar encoding ao salvar.

11. **NÃO alterar o crédito no Footer** — deve permanecer:
    `Desenvolvido por Global Landing` com link para `https://globallanding.com.br`

---

## ══════════════════════════════════════════
## BLOCO 7 — ESTADO ATUAL CONFIRMADO
## ══════════════════════════════════════════

Esta seção documenta o que ESTÁ FUNCIONANDO e NÃO precisa ser reescrito:

### ✅ FUNCIONANDO CORRETAMENTE (NÃO MEXER)

- `app/page.tsx` — estrutura SPA com estados dos overlays funcionando
- `app/layout.tsx` — import do globals.css e fontes no html corretos
- `app/fonts.ts` — 4 fontes configuradas com variáveis CSS (falta só display:swap)
- `lib/videoData.ts` — URLs corretas, encoding UTF-8 preservado
- `lib/menuData.ts` — cardápio completo com 9 tabs e todos os preços
- `lib/timelineData.ts` — linha do tempo completa 1986-2024
- `hooks/useCounter.ts` — contador animado com IntersectionObserver funcionando
- `hooks/useScrollReveal.ts` — variantes Framer Motion exportadas
- `components/ui/LighthouseSVG.tsx` — SVG animado com beam oscilante
- `components/Loader.tsx` — loading screen com progresso animado
- `components/Hero.tsx` — parallax funciona, animações de entrada corretas
- `components/Showcase.tsx` — drag-to-scroll funciona, progress bar move
- `components/Menu.tsx` — 9 abas, AnimatePresence, layoutId tab indicator
- `components/Footer.tsx` — 4 colunas, links, crédito Global Landing
- `components/overlays/ClientOverlay.tsx` — auth + dashboard + 4 tabs
- `components/overlays/QueueOverlay.tsx` — join + status com progress
- `components/overlays/AdminOverlay.tsx` — sidebar + 5 painéis

### ⚠️ PRECISA DE CORREÇÃO (listado no Bloco 4)

- `components/Navbar.tsx` — hamburger mobile invisível (BUG #2)
- `components/History.tsx` — texto dos itens pode não aparecer (BUG #3)
- `components/ReserveSection.tsx` — formulário não submete (BUG #6)
- `components/overlays/ReservationOverlay.tsx` — step 4 não envia WhatsApp (BUG #7)
- `components/About.tsx` — grid sem responsividade (MELHORIA #15, BUG #4)
- `components/Credentials.tsx` — grid sem responsividade (BUG #5)
- `components/Location.tsx` — mapa genérico, pode ser melhorado (MELHORIA #9)
- `app/fonts.ts` — falta display: 'swap' (MELHORIA #11)
- `app/globals.css` — adicionar classes `.credentials-grid` e `.about-grid`
- `next.config.js` — adicionar security headers (MELHORIA #14)

---

## ══════════════════════════════════════════
## BLOCO 8 — RESULTADO ESPERADO FINAL
## ══════════════════════════════════════════

Ao completar todas as fases, o website deve apresentar:

**Experiência do usuário:**
→ Abre com loading screen elegante (farol + barra dourada, ~3 segundos)
→ Hero cinematográfico com vídeo em fundo e parallax suave
→ Navegação fixa que fica opaca ao scrollar, com link ativo destacado
→ Todas as seções com animações de entrada ao scroll (whileInView)
→ Cardápio digital completo e profissional com 9 categorias
→ Timeline histórica visível e legível em fundo navy
→ Mapa real do Google Maps com localização exata
→ Formulário de reserva que abre WhatsApp com dados preenchidos
→ 4 overlays funcionais deslizando da direita
→ Mobile 100% funcional com hamburger menu

**Qualidade técnica:**
→ `npm run build` sem erros TypeScript
→ Zero warnings de console no browser
→ CSS Custom Properties aplicadas corretamente em toda a página
→ Fontes premium carregadas (Playfair Display visível nos títulos)
→ Vídeos carregando e reproduzindo automaticamente
→ Português correto sem caracteres corrompidos

**Visual e marca:**
→ Paleta navy/gold/cream aplicada consistentemente
→ Fundo navy em: Navbar (após scroll), Credentials, Showcase, History, ReserveSection, Footer
→ Fundo creme em: About, Menu, Location
→ Dourado em: logos, CTAs, destaques, bordas decorativas
→ Tipografia Playfair nos headings, Montserrat no UI, Cormorant no corpo elegante
→ Estética premium de restaurante gourmet do nível de loroeats.com

