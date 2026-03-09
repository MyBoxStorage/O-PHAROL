'use client'

/**
 * LogoPharol — Logo fiel ao original O Pharol Restaurante Gourmet
 *
 * A cor padrão é AZUL NAVY (#1B2B6B) — igual ao logo real.
 * Use onDark=true apenas para fundos escuros (navbar, footer navy).
 */
type LogoPharolProps = {
  size?: number
  /** onDark=true → farol branco c/ listras douradas, textos branco+dourado (para fundos escuros)
   *  onDark=false (padrão) → tudo em azul navy (#1B2B6B), igual ao logo original */
  onDark?: boolean
  variant?: 'full' | 'navbar'
}

export default function LogoPharol({
  size = 220,
  onDark = false,
  variant = 'full',
}: LogoPharolProps) {
  // Paleta AZUL (padrão — logo original)
  const NAVY   = '#1B2B6B'
  const GOLD   = '#C9A84C'
  const WHITE  = '#FFFFFF'

  // Cores baseadas no contexto
  const stripe   = onDark ? GOLD   : NAVY   // listras do farol
  const body     = onDark ? WHITE  : WHITE  // interior do farol (sempre branco)
  const txtMain  = onDark ? WHITE  : NAVY   // "O PHAROL"
  const txtSub   = onDark ? 'rgba(255,255,255,0.7)' : NAVY  // "RESTAURANTE"
  const txtScr   = onDark ? GOLD   : NAVY   // "Gourmet"
  const rays     = onDark ? 'rgba(255,255,255,0.5)' : NAVY
  const divider  = onDark ? `rgba(201,168,76,0.55)` : `rgba(27,43,107,0.4)`

  if (variant === 'navbar') {
    return (
      <svg viewBox="0 0 310 84" width={size} height={Math.round(size * 84 / 310)}
        xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <Lighthouse ox={2} oy={2} sc={0.34} body={body} stripe={stripe} />
        <text x="106" y="33" fontFamily="'Playfair Display',Georgia,serif"
          fontSize="22" fontWeight="700" letterSpacing="4" fill={txtMain}>O PHAROL</text>
        <text x="108" y="49" fontFamily="'Montserrat',Arial,sans-serif"
          fontSize="7.5" fontWeight="500" letterSpacing="4" fill={txtSub}>RESTAURANTE</text>
        <line x1="108" y1="55" x2="302" y2="55" stroke={divider} strokeWidth="0.6" />
        <text x="128" y="71" fontFamily="'Great Vibes',cursive"
          fontSize="20" fill={txtScr}>Gourmet</text>
      </svg>
    )
  }

  // Versão full com raios
  return (
    <svg viewBox="0 0 480 300" width={size} height={Math.round(size * 300 / 480)}
      xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <Lighthouse ox={10} oy={10} sc={1.2} body={body} stripe={stripe} />
      <Rays cx={318} cy={145} color={rays} />
      <text x="318" y="130" textAnchor="middle" fontFamily="'Playfair Display',Georgia,serif"
        fontSize="40" fontWeight="700" letterSpacing="3" fill={txtMain}>O PHAROL</text>
      <text x="318" y="153" textAnchor="middle" fontFamily="'Montserrat',Arial,sans-serif"
        fontSize="10.5" fontWeight="500" letterSpacing="6" fill={txtSub}>RESTAURANTE</text>
      <line x1="228" y1="161" x2="408" y2="161" stroke={divider} strokeWidth="0.8" />
      <text x="318" y="194" textAnchor="middle" fontFamily="'Great Vibes',cursive"
        fontSize="36" fill={txtScr}>Gourmet</text>
    </svg>
  )
}

/* Raios sun-burst */
function Rays({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g>
      {Array.from({ length: 32 }).map((_, i) => {
        const ang = (i * 360) / 32
        const main = i % 2 === 0
        const rad = ((ang - 90) * Math.PI) / 180
        return (
          <line key={i}
            x1={cx + 66 * Math.cos(rad)} y1={cy + 66 * Math.sin(rad)}
            x2={cx + (main ? 86 : 74) * Math.cos(rad)} y2={cy + (main ? 86 : 74) * Math.sin(rad)}
            stroke={color} strokeWidth={main ? 1.7 : 1.1} strokeLinecap="round" />
        )
      })}
    </g>
  )
}

/* Farol fiel ao logo original */
function Lighthouse({ ox, oy, sc: S, body, stripe }:
  { ox: number; oy: number; sc: number; body: string; stripe: string }) {
  const x = (v: number) => ox + v * S
  const y = (v: number) => oy + v * S
  const s = (v: number) => v * S
  const p = (...c: [number,number][]) => c.map(([a,b]) => `${x(a)},${y(b)}`).join(' ')
  const id = `lhc${Math.round(ox * 100)}`

  return (
    <g>
      <defs>
        <clipPath id={id}>
          <polygon points={p([18,198],[118,198],[98,62],[38,62])} />
        </clipPath>
      </defs>
      {/* Fundo branco torre */}
      <polygon points={p([18,198],[118,198],[98,62],[38,62])} fill={body} />
      {/* Listras diagonais */}
      {[-2,-1,0,1,2,3,4,5,6,7,8].map(i => (
        <polygon key={i}
          points={`${x(i*22-30)},${y(198)} ${x(i*22-8)},${y(198)} ${x(i*22+170)},${y(-5)} ${x(i*22+148)},${y(-5)}`}
          fill={stripe} clipPath={`url(#${id})`} />
      ))}
      {/* Contorno torre */}
      <polygon points={p([18,198],[118,198],[98,62],[38,62])}
        fill="none" stroke={stripe} strokeWidth={s(2)} strokeLinejoin="round" />
      {/* Plataforma intermediária */}
      <rect x={x(12)} y={y(148)} width={s(112)} height={s(6)} fill={stripe} />
      <rect x={x(14)} y={y(137)} width={s(108)} height={s(2.5)} fill={stripe} />
      {[16,23,30,37,44,51,58,65,72,79,86,93,100,107,114].map(bx=>(
        <rect key={bx} x={x(bx)} y={y(137)} width={s(1.8)} height={s(11)} fill={stripe} />
      ))}
      <rect x={x(14)} y={y(153)} width={s(108)} height={s(2)} fill={stripe} />
      {/* Varanda superior */}
      <rect x={x(30)} y={y(60)} width={s(76)} height={s(4)} fill={stripe} />
      <rect x={x(32)} y={y(50)} width={s(72)} height={s(2)} fill={stripe} />
      {[34,40,46,52,58,64,70,76,82,88,94].map(bx=>(
        <rect key={bx} x={x(bx)} y={y(50)} width={s(1.4)} height={s(10)} fill={stripe} />
      ))}
      {/* Base de alvenaria */}
      <rect x={x(6)} y={y(215)} width={s(124)} height={s(7)} fill={stripe} rx={s(0.5)} />
      {[[6,205,29,10],[37,205,30,10],[69,205,30,10],[101,205,27,10]].map(([bx,by,bw,bh],i)=>(
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={stripe} stroke={body} strokeWidth={s(0.7)} />
      ))}
      {[[6,195,21,10],[29,195,28,10],[59,195,28,10],[89,195,28,10],[119,195,11,10]].map(([bx,by,bw,bh],i)=>(
        <rect key={i} x={x(bx)} y={y(by)} width={s(bw)} height={s(bh)}
          fill={stripe} stroke={body} strokeWidth={s(0.7)} />
      ))}
      <rect x={x(2)} y={y(222)} width={s(132)} height={s(5)} fill={stripe} rx={s(0.5)} />
      {/* Cúpula */}
      <rect x={x(34)} y={y(30)} width={s(68)} height={s(30)}
        fill={body} stroke={stripe} strokeWidth={s(1.8)} />
      {[51,62,73,84].map(cx2=>(
        <line key={cx2} x1={x(cx2)} y1={y(30)} x2={x(cx2)} y2={y(60)}
          stroke={stripe} strokeWidth={s(1.5)} />
      ))}
      <line x1={x(34)} y1={y(45)} x2={x(102)} y2={y(45)} stroke={stripe} strokeWidth={s(1.3)} />
      <path d={`M ${x(27)} ${y(32)} Q ${x(68)} ${y(3)} ${x(109)} ${y(32)} Z`} fill={stripe} />
      <circle cx={x(68)} cy={y(7)} r={s(5)} fill={stripe} />
      <line x1={x(68)} y1={y(2)} x2={x(68)} y2={y(0)} stroke={stripe} strokeWidth={s(2)} />
      <polygon points={`${x(68)},${y(0)} ${x(80)},${y(-4)} ${x(68)},${y(-8)}`} fill={stripe} />
    </g>
  )
}
