'use client'

type LogoPharolProps = {
  size?: number
  color?: string
  /** Quando true: farol branco c/ listras douradas, "Gourmet" em dourado — ideal p/ fundos escuros */
  goldAccent?: boolean
  variant?: 'full' | 'navbar'
}

export default function LogoPharol({
  size = 220,
  color = '#1B2B6B',
  goldAccent = false,
  variant = 'full',
}: LogoPharolProps) {
  // Cores derivadas do contexto
  const stripeColor  = goldAccent ? '#C9A84C' : color   // listras do farol
  const textMain     = goldAccent ? '#FFFFFF' : color   // O PHAROL
  const textSub      = goldAccent ? 'rgba(255,255,255,0.65)' : color  // RESTAURANTE
  const textScript   = goldAccent ? '#C9A84C' : color   // Gourmet
  const rayColor     = goldAccent ? 'rgba(255,255,255,0.55)' : color  // raios (só na full)
  const lighthouseColor = goldAccent ? '#FFFFFF' : color // corpo branco do farol
  const lineColor    = goldAccent ? 'rgba(201,168,76,0.5)' : color

  if (variant === 'navbar') {
    return (
      <svg
        viewBox="0 0 310 84"
        width={size}
        height={Math.round((size * 84) / 310)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <LighthousePart ox={2} oy={2} scale={0.34} bodyColor={lighthouseColor} stripeColor={stripeColor} />
        {/* Textos */}
        <text x="106" y="34"
          fontFamily="'Playfair Display',Georgia,serif"
          fontSize="22" fontWeight="700" letterSpacing="4" fill={textMain}>
          O PHAROL
        </text>
        <text x="108" y="50"
          fontFamily="'Montserrat',Arial,sans-serif"
          fontSize="7.5" fontWeight="500" letterSpacing="4" fill={textSub}>
          RESTAURANTE
        </text>
        {/* linha separadora */}
        <line x1="108" y1="56" x2="300" y2="56" stroke={lineColor} strokeWidth="0.6" />
        <text x="130" y="72"
          fontFamily="'Great Vibes',cursive"
          fontSize="20" fill={textScript}>
          Gourmet
        </text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 480 300"
      width={size}
      height={Math.round((size * 300) / 480)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <LighthousePart ox={10} oy={10} scale={1.2} bodyColor={lighthouseColor} stripeColor={stripeColor} />
      <SunRays cx={318} cy={145} color={rayColor} />
      <text x="318" y="130" textAnchor="middle"
        fontFamily="'Playfair Display',Georgia,serif"
        fontSize="40" fontWeight="700" letterSpacing="3" fill={textMain}>
        O PHAROL
      </text>
      <text x="318" y="153" textAnchor="middle"
        fontFamily="'Montserrat',Arial,sans-serif"
        fontSize="10.5" fontWeight="500" letterSpacing="6" fill={textSub}>
        RESTAURANTE
      </text>
      <line x1="228" y1="161" x2="408" y2="161" stroke={lineColor} strokeWidth="0.8" />
      <text x="318" y="194" textAnchor="middle"
        fontFamily="'Great Vibes',cursive"
        fontSize="36" fill={textScript}>
        Gourmet
      </text>
    </svg>
  )
}

/* ── Raios (sun-burst) ao redor do texto ── */
function SunRays({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  const total = 32
  return (
    <g>
      {Array.from({ length: total }).map((_, i) => {
        const angle = (i * 360) / total
        const isMain = i % 2 === 0
        const r1 = 66
        const r2 = isMain ? 86 : 74
        const w = isMain ? 1.7 : 1.1
        const rad = ((angle - 90) * Math.PI) / 180
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(rad)}
            y1={cy + r1 * Math.sin(rad)}
            x2={cx + r2 * Math.cos(rad)}
            y2={cy + r2 * Math.sin(rad)}
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

/* ── Farol fiel ao logo original ──
   bodyColor = corpo branco / stripeColor = listras coloridas  */
function LighthousePart({
  ox, oy, scale: S,
  bodyColor, stripeColor,
}: {
  ox: number; oy: number; scale: number
  bodyColor: string; stripeColor: string
}) {
  const x = (v: number) => ox + v * S
  const y = (v: number) => oy + v * S
  const s = (v: number) => v * S
  const pts = (...c: [number,number][]) => c.map(([a,b]) => `${x(a)},${y(b)}`).join(' ')
  const clipId = `lhc-${ox}-${oy}`

  // Torre: base larga, topo estreito
  const tBL:[number,number]=[18,198], tBR:[number,number]=[118,198]
  const tTL:[number,number]=[38,62],  tTR:[number,number]=[98,62]

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <polygon points={pts(tBL,tBR,tTR,tTL)} />
        </clipPath>
      </defs>

      {/* Fundo branco da torre */}
      <polygon points={pts(tBL,tBR,tTR,tTL)} fill={bodyColor} />

      {/* Listras diagonais ~45° */}
      {[-2,-1,0,1,2,3,4,5,6,7,8].map(i => (
        <polygon key={i}
          points={`${x(i*22-30)},${y(198)} ${x(i*22-8)},${y(198)} ${x(i*22+170)},${y(-5)} ${x(i*22+148)},${y(-5)}`}
          fill={stripeColor}
          clipPath={`url(#${clipId})`}
        />
      ))}

      {/* Contorno torre */}
      <polygon points={pts(tBL,tBR,tTR,tTL)} fill="none" stroke={stripeColor} strokeWidth={s(2)} strokeLinejoin="round" />

      {/* Plataforma intermediária ~70% */}
      <rect x={x(12)} y={y(148)} width={s(112)} height={s(6)} fill={stripeColor} />
      <rect x={x(14)} y={y(137)} width={s(108)} height={s(2.5)} fill={stripeColor} />
      {[16,23,30,37,44,51,58,65,72,79,86,93,100,107,114].map(bx=>(
        <rect key={bx} x={x(bx)} y={y(137)} width={s(1.8)} height={s(11)} fill={stripeColor} />
      ))}
      <rect x={x(14)} y={y(153)} width={s(108)} height={s(2)} fill={stripeColor} />

      {/* Varanda superior */}
      <rect x={x(30)} y={y(60)} width={s(76)} height={s(4)} fill={stripeColor} />
      <rect x={x(32)} y={y(50)} width={s(72)} height={s(2)} fill={stripeColor} />
      {[34,40,46,52,58,64,70,76,82,88,94].map(bx=>(
        <rect key={bx} x={x(bx)} y={y(50)} width={s(1.4)} height={s(10)} fill={stripeColor} />
      ))}
      <rect x={x(32)} y={y(62)} width={s(72)} height={s(1.5)} fill={stripeColor} />

      {/* Base de alvenaria */}
      <rect x={x(6)} y={y(215)} width={s(124)} height={s(7)} fill={stripeColor} rx={s(0.5)} />
      {[[6,205,29,10],[37,205,30,10],[69,205,30,10],[101,205,27,10]].map(([bx,by,bw,bh],i)=>(
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={stripeColor} stroke={bodyColor} strokeWidth={s(0.7)} />
      ))}
      {[[6,195,21,10],[29,195,28,10],[59,195,28,10],[89,195,28,10],[119,195,11,10]].map(([bx,by,bw,bh],i)=>(
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={stripeColor} stroke={bodyColor} strokeWidth={s(0.7)} />
      ))}
      <rect x={x(2)} y={y(222)} width={s(132)} height={s(5)} fill={stripeColor} rx={s(0.5)} />

      {/* Cúpula / lanterna */}
      <rect x={x(34)} y={y(30)} width={s(68)} height={s(30)}
        fill={bodyColor} stroke={stripeColor} strokeWidth={s(1.8)} />
      {[51,62,73,84].map(cx2=>(
        <line key={cx2} x1={x(cx2)} y1={y(30)} x2={x(cx2)} y2={y(60)}
          stroke={stripeColor} strokeWidth={s(1.5)} />
      ))}
      <line x1={x(34)} y1={y(45)} x2={x(102)} y2={y(45)}
        stroke={stripeColor} strokeWidth={s(1.3)} />

      {/* Telhado abaulado */}
      <path d={`M ${x(27)} ${y(32)} Q ${x(68)} ${y(3)} ${x(109)} ${y(32)} Z`}
        fill={stripeColor} />
      <circle cx={x(68)} cy={y(7)} r={s(5)} fill={stripeColor} />
      <line x1={x(68)} y1={y(2)} x2={x(68)} y2={y(0)} stroke={stripeColor} strokeWidth={s(2)} />
      <polygon points={`${x(68)},${y(0)} ${x(80)},${y(-4)} ${x(68)},${y(-8)}`} fill={stripeColor} />
    </g>
  )
}
