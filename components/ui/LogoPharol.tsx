'use client'

type LogoPharolProps = {
  size?: number
  color?: string
  /** 'full' = logo completa com farol + texto + raios (hero, footer)
   *  'navbar' = farol + texto inline compacto */
  variant?: 'full' | 'navbar'
}

export default function LogoPharol({
  size = 220,
  color = '#1B2B6B',
  variant = 'full',
}: LogoPharolProps) {
  if (variant === 'navbar') {
    return (
      <svg
        viewBox="0 0 320 88"
        width={size}
        height={Math.round((size * 88) / 320)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <LighthousePart ox={2} oy={4} scale={0.36} color={color} />
        <text x="108" y="36" fontFamily="'Playfair Display',Georgia,serif"
          fontSize="24" fontWeight="700" letterSpacing="5" fill={color}>O PHAROL</text>
        <text x="110" y="52" fontFamily="'Montserrat',Arial,sans-serif"
          fontSize="8.5" fontWeight="400" letterSpacing="4.5" fill={color}>RESTAURANTE</text>
        <text x="130" y="72" fontFamily="'Great Vibes',cursive"
          fontSize="22" fill={color}>Gourmet</text>
      </svg>
    )
  }

  // Full logo — mesma proporção das fotos (~4:3 landscape)
  return (
    <svg
      viewBox="0 0 480 320"
      width={size}
      height={Math.round((size * 320) / 480)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Farol — lado esquerdo */}
      <LighthousePart ox={10} oy={10} scale={1.28} color={color} />

      {/* Raios ao redor do bloco de texto */}
      <SunRays cx={320} cy={150} color={color} />

      {/* Bloco de texto */}
      <text x="320" y="134" textAnchor="middle"
        fontFamily="'Playfair Display',Georgia,serif"
        fontSize="42" fontWeight="700" letterSpacing="3" fill={color}>
        O PHAROL
      </text>
      <text x="320" y="157" textAnchor="middle"
        fontFamily="'Montserrat',Arial,sans-serif"
        fontSize="11" fontWeight="400" letterSpacing="6" fill={color}>
        RESTAURANTE
      </text>
      {/* linha decorativa fina */}
      <line x1="230" y1="165" x2="410" y2="165"
        stroke={color} strokeWidth="0.8" opacity="0.5" />
      <text x="320" y="196" textAnchor="middle"
        fontFamily="'Great Vibes',cursive"
        fontSize="38" fill={color}>
        Gourmet
      </text>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════
   RAIOS / SUN-BURST  —  idênticos ao logo original
   Traços alternados: longo / curto em volta do texto
═══════════════════════════════════════════════════ */
function SunRays({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  // Raios distribuídos em 360°, radius interno/externo alternando longo-curto
  const rays: Array<{ angle: number; r1: number; r2: number; w: number }> = []
  const total = 32
  for (let i = 0; i < total; i++) {
    const angle = (i * 360) / total
    const isMain = i % 2 === 0
    rays.push({
      angle,
      r1: isMain ? 68 : 68,
      r2: isMain ? 88 : 76,
      w: isMain ? 1.8 : 1.2,
    })
  }
  const toXY = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  return (
    <g>
      {rays.map(({ angle, r1, r2, w }, i) => {
        const p1 = toXY(angle, r1)
        const p2 = toXY(angle, r2)
        return (
          <line
            key={i}
            x1={p1.x} y1={p1.y}
            x2={p2.x} y2={p2.y}
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

/* ═══════════════════════════════════════════════════
   FAROL — fiel ao logo original O Pharol
   Características observadas nas fotos:
   • Torre alta afunilando levemente de baixo p/ cima
   • Listras diagonais largas ~45° azul/branco
   • Base: 2 camadas de blocos de alvenaria
   • Plataforma intermediária c/ corrimão (balaustres)
   • Varanda superior c/ grade
   • Cúpula esférica/abaulada c/ caixilhos verticais
   • Flâmula/pique no topo
   ox/oy = offset X/Y de posicionamento
   scale = escala uniforme
═══════════════════════════════════════════════════ */
function LighthousePart({
  ox, oy, scale, color,
}: { ox: number; oy: number; scale: number; color: string }) {
  const S = scale
  // Helper: converte coordenadas do espaço de desenho
  const x = (v: number) => ox + v * S
  const y = (v: number) => oy + v * S
  const s = (v: number) => v * S
  const pts = (...coords: [number, number][]) =>
    coords.map(([px, py]) => `${x(px)},${y(py)}`).join(' ')

  // ── Pontos da torre (trapézio levemente afunilando) ──
  // Base da torre: x=18..118, topo: x=38..98  height=0..195
  const towerBL: [number, number] = [18, 195]
  const towerBR: [number, number] = [118, 195]
  const towerTL: [number, number] = [38, 62]
  const towerTR: [number, number] = [98, 62]

  // ID único para clipPath (evita conflito se houver múltiplos SVGs)
  const clipId = `lh-clip-${ox}-${oy}`

  return (
    <g>
      {/* ─── CLIPPATH da torre (para as listras) ─── */}
      <defs>
        <clipPath id={clipId}>
          <polygon points={pts(towerBL, towerBR, towerTR, towerTL)} />
        </clipPath>
      </defs>

      {/* ─── FUNDO BRANCO da torre ─── */}
      <polygon
        points={pts(towerBL, towerBR, towerTR, towerTL)}
        fill="white"
      />

      {/* ─── LISTRAS DIAGONAIS (azul sobre branco) ─── */}
      {/* Geradas como faixas diagonais ~45° usando paralelogramos */}
      {[-3,-2,-1,0,1,2,3,4,5,6,7].map(i => {
        // Cada faixa tem largura ~20 no espaço original
        const W = 22   // largura da faixa
        const H = 200  // altura para garantir cobertura
        const ox2 = i * W * 2 - 40  // offset horizontal base
        return (
          <polygon
            key={i}
            points={`${x(ox2)},${y(195)} ${x(ox2+W)},${y(195)} ${x(ox2+W+H)},${y(-5)} ${x(ox2+H)},${y(-5)}`}
            fill={color}
            clipPath={`url(#${clipId})`}
          />
        )
      })}

      {/* ─── CONTORNO externo da torre ─── */}
      <polygon
        points={pts(towerBL, towerBR, towerTR, towerTL)}
        fill="none"
        stroke={color}
        strokeWidth={s(2)}
        strokeLinejoin="round"
      />

      {/* ─── PLATAFORMA INTERMEDIÁRIA (a ~2/3 da altura) ─── */}
      {/* Laje horizontal */}
      <rect x={x(12)} y={y(148)} width={s(112)} height={s(7)} fill={color} rx={s(0.5)} />
      {/* Grade / balaustres */}
      <rect x={x(14)} y={y(136)} width={s(108)} height={s(3)} fill={color} /> {/* corrimão superior */}
      {[16,23,30,37,44,51,58,65,72,79,86,93,100,107,114].map(bx => (
        <rect key={bx} x={x(bx)} y={y(136)} width={s(2)} height={s(12)} fill={color} />
      ))}
      <rect x={x(14)} y={y(152)} width={s(108)} height={s(2.5)} fill={color} /> {/* base balaustres */}

      {/* ─── VARANDA SUPERIOR (na base da lanterna) ─── */}
      <rect x={x(30)} y={y(60)} width={s(76)} height={s(5)} fill={color} />
      {/* Grade varanda superior — balaustres finos */}
      <rect x={x(32)} y={y(50)} width={s(72)} height={s(2.5)} fill={color} />
      {[34,40,46,52,58,64,70,76,82,88,94].map(bx => (
        <rect key={bx} x={x(bx)} y={y(50)} width={s(1.5)} height={s(10)} fill={color} />
      ))}
      <rect x={x(32)} y={y(63)} width={s(72)} height={s(2)} fill={color} />

      {/* ─── BASE DE ALVENARIA ─── */}
      {/* Plataforma larga */}
      <rect x={x(6)} y={y(215)} width={s(124)} height={s(8)} fill={color} rx={s(1)} />
      {/* 1ª camada blocos */}
      {[[6,205,30,10],[38,205,30,10],[70,205,30,10],[102,205,28,10]].map(([bx,by,bw,bh],i) => (
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={color} stroke="rgba(255,255,255,0.25)" strokeWidth={s(0.8)} />
      ))}
      {/* 2ª camada blocos (offset) */}
      {[[6,195,22,10],[30,195,28,10],[60,195,28,10],[90,195,28,10],[120,195,10,10]].map(([bx,by,bw,bh],i) => (
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={color} stroke="rgba(255,255,255,0.25)" strokeWidth={s(0.8)} />
      ))}
      {/* Pilar/plataforma base final */}
      <rect x={x(2)} y={y(223)} width={s(132)} height={s(6)} fill={color} rx={s(1)} />

      {/* ─── CÚPULA / LANTERNA ─── */}
      {/* Caixa retangular da lanterna */}
      <rect x={x(34)} y={y(30)} width={s(68)} height={s(30)} fill="white" stroke={color} strokeWidth={s(1.8)} />
      {/* Caixilhos verticais (4 divisórias) */}
      {[51,62,73,84].map(cx2 => (
        <line key={cx2} x1={x(cx2)} y1={y(30)} x2={x(cx2)} y2={y(60)} stroke={color} strokeWidth={s(1.6)} />
      ))}
      {/* Caixilho horizontal */}
      <line x1={x(34)} y1={y(45)} x2={x(102)} y2={y(45)} stroke={color} strokeWidth={s(1.4)} />

      {/* Telhado abaulado/esférico da cúpula */}
      {/* Curva principal do domo */}
      <path
        d={`M ${x(28)} ${y(32)} Q ${x(68)} ${y(4)} ${x(108)} ${y(32)}`}
        fill={color}
        stroke={color}
        strokeWidth={s(1)}
      />
      {/* Preenchimento triangular do telhado */}
      <polygon
        points={`${x(28)},${y(32)} ${x(108)},${y(32)} ${x(108)},${y(30)} ${x(28)},${y(30)}`}
        fill={color}
      />

      {/* Ornamento esférico no topo da cúpula */}
      <circle cx={x(68)} cy={y(8)} r={s(5)} fill={color} />
      {/* Haste */}
      <line x1={x(68)} y1={y(3)} x2={x(68)} y2={y(0)} stroke={color} strokeWidth={s(2)} />
      {/* Flâmula/pique */}
      <polygon points={`${x(68)},${y(0)} ${x(80)},${y(-3)} ${x(68)},${y(-7)}`} fill={color} />

      {/* Luz interna (glow sutil) */}
      <ellipse cx={x(68)} cy={y(44)} rx={s(7)} ry={s(5)} fill="rgba(255,220,80,0.25)" />
    </g>
  )
}
