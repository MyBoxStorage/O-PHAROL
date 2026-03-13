'use client'

/**
 * LogoPharol — Logo oficial O Pharol Restaurante Gourmet
 * Coordenadas copiadas diretamente do preview3.html aprovado.
 *
 * onDark=false → farol navy + corpo branco (fundos claros)
 * onDark=true  → farol branco semiopaco + corpo transparente (fundos escuros)
 */
type LogoPharolProps = {
  size?: number
  onDark?: boolean
  variant?: 'full' | 'navbar'
}

export default function LogoPharol({
  size = 220,
  onDark = false,
  variant = 'full',
}: LogoPharolProps) {
  const NAVY  = '#1B2B6B'
  const WHITE = '#FFFFFF'

  // Farol: onDark=false → navy + branco | onDark=true → branco semiopaco + transparente
  const stripe  = onDark ? 'rgba(255,255,255,0.82)' : NAVY
  const body    = onDark ? 'transparent'            : WHITE

  // Textos e raios adaptam ao fundo
  const txtMain = onDark ? WHITE                    : NAVY
  const txtSub  = onDark ? 'rgba(255,255,255,0.75)' : NAVY
  const rays    = onDark ? 'rgba(255,255,255,0.55)' : NAVY
  const divider = onDark ? 'rgba(201,168,76,0.5)'   : 'rgba(27,43,107,0.4)'

  /* ─────────────────────────────────────────────────────────────
     FULL — logo oficial
     ViewBox: 420 × 262  (copiado do preview3.html aprovado)
  ───────────────────────────────────────────────────────────── */
  if (variant === 'full') {
    return (
      <svg
        viewBox="0 0 420 262"
        width={size}
        height={Math.round(size * 262 / 420)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          <clipPath id="lhc-full">
            <polygon points="28.9,217.9 133.9,217.9 112.9,75.1 49.9,75.1"/>
          </clipPath>
          {/* Máscara retangular — corta raios na área do texto */}
          <mask id="rm-full">
            <rect x="0" y="0" width="420" height="262" fill="white"/>
            <rect x="180.8" y="111.2" width="243.2" height="46.0" fill="black"/>
          </mask>
        </defs>

        {/* ── FAROL ── */}
        <polygon points="28.9,217.9 133.9,217.9 112.9,75.1 49.9,75.1" fill={body}/>

        {/* Listras diagonais */}
        <polygon points="-67.7,217.9 -44.6,217.9 142.3,4.8 119.2,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="-44.6,217.9 -21.5,217.9 165.4,4.8 142.3,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="-21.5,217.9 1.6,217.9 188.5,4.8 165.4,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="1.6,217.9 24.7,217.9 211.6,4.8 188.5,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="24.7,217.9 47.8,217.9 234.7,4.8 211.6,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="47.8,217.9 70.9,217.9 257.8,4.8 234.7,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="70.9,217.9 94.0,217.9 280.9,4.8 257.8,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="94.0,217.9 117.1,217.9 304.0,4.8 280.9,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="117.1,217.9 140.2,217.9 327.1,4.8 304.0,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="140.2,217.9 163.3,217.9 350.2,4.8 327.1,4.8" fill={stripe} clipPath="url(#lhc-full)"/>
        <polygon points="163.3,217.9 186.4,217.9 373.3,4.8 350.2,4.8" fill={stripe} clipPath="url(#lhc-full)"/>

        {/* Contorno torre */}
        <polygon points="28.9,217.9 133.9,217.9 112.9,75.1 49.9,75.1" fill="none" stroke={stripe} strokeWidth="2.1" strokeLinejoin="round"/>

        {/* Plataforma intermediária */}
        <rect x="22.6" y="165.4" width="117.6" height="6.3" fill={stripe}/>
        <rect x="24.7" y="153.8" width="113.4" height="2.6" fill={stripe}/>
        <rect x="26.8"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="34.2"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="41.5"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="48.9"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="56.2"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="63.6"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="70.9"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="78.2"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="85.6"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="93.0"  y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="100.3" y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="107.7" y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="115.0" y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="122.4" y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="129.7" y="153.8" width="1.89" height="11.6" fill={stripe}/>
        <rect x="24.7" y="170.7" width="113.4" height="2.1" fill={stripe}/>

        {/* Varanda superior */}
        <rect x="41.5" y="73.0" width="79.8" height="4.2" fill={stripe}/>
        <rect x="43.6" y="62.5" width="75.6" height="2.1" fill={stripe}/>
        <rect x="45.7"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="51.8"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="57.9"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="64.0"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="70.1"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="76.2"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="82.3"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="88.4"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="94.5"  y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="100.6" y="62.5" width="1.47" height="10.5" fill={stripe}/>
        <rect x="106.7" y="62.5" width="1.47" height="10.5" fill={stripe}/>

        {/* Base alvenaria */}
        <rect x="16.3" y="235.8" width="130.2" height="7.4" fill={stripe} rx="0.53"/>
        <rect x="16.3" y="225.3" width="30.5"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="48.9" y="225.3" width="31.5"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="82.5" y="225.3" width="31.5"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="116.1" y="225.3" width="28.4" height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="16.3" y="214.8" width="22.1"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="40.5" y="214.8" width="29.4"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="72.0" y="214.8" width="29.4"  height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="103.5" y="214.8" width="29.4" height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="135.0" y="214.8" width="11.5" height="10.5" fill={stripe} stroke={body} strokeWidth="0.74"/>
        <rect x="12.1" y="243.2" width="138.6" height="5.3" fill={stripe} rx="0.53"/>

        {/* Cúpula */}
        <rect x="45.7" y="41.5" width="71.4" height="31.5" fill={body} stroke={stripe} strokeWidth="1.89"/>
        <line x1="63.6"  y1="41.5" x2="63.6"  y2="73.0" stroke={stripe} strokeWidth="1.58"/>
        <line x1="75.1"  y1="41.5" x2="75.1"  y2="73.0" stroke={stripe} strokeWidth="1.58"/>
        <line x1="86.7"  y1="41.5" x2="86.7"  y2="73.0" stroke={stripe} strokeWidth="1.58"/>
        <line x1="98.2"  y1="41.5" x2="98.2"  y2="73.0" stroke={stripe} strokeWidth="1.58"/>
        <line x1="45.7"  y1="57.2" x2="117.1" y2="57.2" stroke={stripe} strokeWidth="1.37"/>
        <path d={`M 38.4 43.6 Q 81.4 13.1 124.4 43.6 Z`} fill={stripe}/>
        <circle cx="81.4" cy="17.4" r="5.3" fill={stripe}/>
        <line x1="81.4" y1="12.1" x2="81.4" y2="10.0" stroke={stripe} strokeWidth="2.1"/>
        <polygon points="81.4,10.0 93.9,5.8 81.4,1.6" fill={stripe}/>

        {/* ── RAIOS — coordenadas copiadas do preview3.html ── */}
        <g mask="url(#rm-full)" opacity={0.75}>
          <line x1="302.4" y1="73.2"  x2="302.4" y2="51.2"  stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="315.7" y1="74.5"  x2="317.6" y2="64.7"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="328.4" y1="78.4"  x2="336.8" y2="58.0"  stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="340.2" y1="84.6"  x2="345.7" y2="76.3"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="350.5" y1="93.1"  x2="366.0" y2="77.5"  stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="358.9" y1="103.4" x2="367.3" y2="97.8"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="365.2" y1="115.2" x2="385.5" y2="106.7" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="369.1" y1="127.9" x2="378.9" y2="126.0" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="370.4" y1="141.2" x2="392.4" y2="141.2" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="369.1" y1="154.4" x2="378.9" y2="156.4" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="365.2" y1="167.2" x2="385.5" y2="175.6" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="358.9" y1="179.0" x2="367.3" y2="184.5" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="350.5" y1="189.3" x2="366.0" y2="204.8" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="340.2" y1="197.7" x2="345.7" y2="206.0" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="328.4" y1="204.0" x2="336.8" y2="224.3" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="315.7" y1="207.9" x2="317.6" y2="217.7" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="302.4" y1="209.2" x2="302.4" y2="231.2" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="289.1" y1="207.9" x2="287.2" y2="217.7" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="276.4" y1="204.0" x2="268.0" y2="224.3" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="264.6" y1="197.7" x2="259.1" y2="206.0" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="254.3" y1="189.3" x2="238.8" y2="204.8" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="245.9" y1="179.0" x2="237.5" y2="184.5" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="239.6" y1="167.2" x2="219.3" y2="175.6" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="235.7" y1="154.4" x2="225.9" y2="156.4" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="234.4" y1="141.2" x2="212.4" y2="141.2" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="235.7" y1="127.9" x2="225.9" y2="126.0" stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="239.6" y1="115.2" x2="219.3" y2="106.7" stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="245.9" y1="103.4" x2="237.5" y2="97.8"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="254.3" y1="93.1"  x2="238.8" y2="77.5"  stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="264.6" y1="84.6"  x2="259.1" y2="76.3"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="276.4" y1="78.4"  x2="268.0" y2="58.0"  stroke={rays} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="289.1" y1="74.5"  x2="287.2" y2="64.7"  stroke={rays} strokeWidth="0.9" strokeLinecap="round"/>
        </g>

        {/* ── TEXTO ── */}
        <text x="302.4" y="139.2" textAnchor="middle"
          fontFamily="'Playfair Display',Georgia,serif"
          fontSize="30" fontWeight="700" letterSpacing="3"
          fill={txtMain}>O PHAROL</text>
        <line x1="240.4" y1="148.2" x2="364.4" y2="148.2" stroke={divider} strokeWidth="0.8"/>
        <text x="302.4" y="163.2" textAnchor="middle"
          fontFamily="'Montserrat',Arial,sans-serif"
          fontSize="8" fontWeight="500" letterSpacing="5"
          fill={txtSub}>RESTAURANTE</text>
      </svg>
    )
  }

  /* ─────────────────────────────────────────────
     NAVBAR — horizontal compacta, sem raios
     ViewBox: 310 × 84
  ───────────────────────────────────────────── */
  const nSc = 0.34
  const nOx = 2
  const nOy = 2
  const nfx = (v: number) => nOx + v * nSc
  const nfy = (v: number) => nOy + v * nSc
  const nfs = (v: number) => v * nSc

  const navPts = [[18,198],[118,198],[98,62],[38,62]]
    .map(([a,b]) => `${nfx(a).toFixed(1)},${nfy(b).toFixed(1)}`).join(' ')

  return (
    <svg
      viewBox="0 0 310 84"
      width={size}
      height={Math.round(size * 84 / 310)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id="lhc-nav">
          <polygon points={navPts}/>
        </clipPath>
      </defs>

      <polygon points={navPts} fill={body}/>
      {[-2,-1,0,1,2,3,4,5,6,7,8].map(i => (
        <polygon key={i}
          points={`${(nOx+(i*22-30)*nSc).toFixed(1)},${nfy(198).toFixed(1)} ${(nOx+(i*22-8)*nSc).toFixed(1)},${nfy(198).toFixed(1)} ${(nOx+(i*22+170)*nSc).toFixed(1)},${nfy(-5).toFixed(1)} ${(nOx+(i*22+148)*nSc).toFixed(1)},${nfy(-5).toFixed(1)}`}
          fill={stripe} clipPath="url(#lhc-nav)"/>
      ))}
      <polygon points={navPts} fill="none" stroke={stripe} strokeWidth={nfs(2)} strokeLinejoin="round"/>
      <rect x={nfx(12)} y={nfy(148)} width={nfs(112)} height={nfs(6)} fill={stripe}/>
      <rect x={nfx(14)} y={nfy(137)} width={nfs(108)} height={nfs(2.5)} fill={stripe}/>
      {[16,23,30,37,44,51,58,65,72,79,86,93,100,107,114].map(bx => (
        <rect key={bx} x={nfx(bx)} y={nfy(137)} width={nfs(1.8)} height={nfs(11)} fill={stripe}/>
      ))}
      <rect x={nfx(14)} y={nfy(153)} width={nfs(108)} height={nfs(2)} fill={stripe}/>
      <rect x={nfx(30)} y={nfy(60)} width={nfs(76)} height={nfs(4)} fill={stripe}/>
      <rect x={nfx(32)} y={nfy(50)} width={nfs(72)} height={nfs(2)} fill={stripe}/>
      {[34,40,46,52,58,64,70,76,82,88,94].map(bx => (
        <rect key={bx} x={nfx(bx)} y={nfy(50)} width={nfs(1.4)} height={nfs(10)} fill={stripe}/>
      ))}
      <rect x={nfx(6)} y={nfy(215)} width={nfs(124)} height={nfs(7)} fill={stripe} rx={nfs(0.5)}/>
      {[[6,205,29,10],[37,205,30,10],[69,205,30,10],[101,205,27,10]].map(([bx,by,bw,bh],i) => (
        <rect key={i} x={nfx(bx)} y={nfy(by)} width={nfs(bw)} height={nfs(bh)} fill={stripe} stroke={body} strokeWidth={nfs(0.7)}/>
      ))}
      {[[6,195,21,10],[29,195,28,10],[59,195,28,10],[89,195,28,10],[119,195,11,10]].map(([bx,by,bw,bh],i) => (
        <rect key={i} x={nfx(bx)} y={nfy(by)} width={nfs(bw)} height={nfs(bh)} fill={stripe} stroke={body} strokeWidth={nfs(0.7)}/>
      ))}
      <rect x={nfx(2)} y={nfy(222)} width={nfs(132)} height={nfs(5)} fill={stripe} rx={nfs(0.5)}/>
      <rect x={nfx(34)} y={nfy(30)} width={nfs(68)} height={nfs(30)} fill={body} stroke={stripe} strokeWidth={nfs(1.8)}/>
      {[51,62,73,84].map(cx2 => (
        <line key={cx2} x1={nfx(cx2)} y1={nfy(30)} x2={nfx(cx2)} y2={nfy(60)} stroke={stripe} strokeWidth={nfs(1.5)}/>
      ))}
      <line x1={nfx(34)} y1={nfy(45)} x2={nfx(102)} y2={nfy(45)} stroke={stripe} strokeWidth={nfs(1.3)}/>
      <path d={`M ${nfx(27)} ${nfy(32)} Q ${nfx(68)} ${nfy(3)} ${nfx(109)} ${nfy(32)} Z`} fill={stripe}/>
      <circle cx={nfx(68)} cy={nfy(7)} r={nfs(5)} fill={stripe}/>
      <line x1={nfx(68)} y1={nfy(2)} x2={nfx(68)} y2={nfy(0)} stroke={stripe} strokeWidth={nfs(2)}/>
      <polygon points={`${nfx(68)},${nfy(0)} ${nfx(80)},${nfy(-4)} ${nfx(68)},${nfy(-8)}`} fill={stripe}/>

      <text x="106" y="30" fontFamily="'Playfair Display',Georgia,serif"
        fontSize="22" fontWeight="700" letterSpacing="4" fill={txtMain}>O PHAROL</text>
      <line x1="106" y1="37" x2="302" y2="37" stroke={divider} strokeWidth="0.6"/>
      <text x="108" y="50" fontFamily="'Montserrat',Arial,sans-serif"
        fontSize="7.5" fontWeight="500" letterSpacing="5" fill={txtSub}>RESTAURANTE</text>
    </svg>
  )
}
