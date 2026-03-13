'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import LogoPharol from './ui/LogoPharol'

type LoaderProps = { onComplete: () => void }

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'dark' | 'sweep' | 'reveal' | 'stable'>('dark')
  const logoRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Posição da ponta do farol em coordenadas do container (px)
  const [tip, setTip] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const calc = () => {
      if (!logoRef.current || !containerRef.current) return
      const logoRect = logoRef.current.getBoundingClientRect()
      const contRect = containerRef.current.getBoundingClientRect()
      // Ponta do farol: x=19.4%, y=0.6% do SVG renderizado (viewBox 420x262, size=360)
      const tipX = (logoRect.left - contRect.left) + logoRect.width  * 0.194
      const tipY = (logoRect.top  - contRect.top)  + logoRect.height * 0.006
      setTip({ x: tipX, y: tipY })
    }
    // Calcular após render
    const raf = requestAnimationFrame(calc)
    window.addEventListener('resize', calc)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', calc) }
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('sweep'),  300)
    const t2 = setTimeout(() => setPhase('reveal'), 1100)
    const t3 = setTimeout(() => setPhase('stable'), 2000)
    const t4 = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 600)
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  // Comprimento do feixe — diagonal da tela
  const beamLen = typeof window !== 'undefined'
    ? Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 1.1
    : 1800

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            background: 'var(--cream)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* ── FEIXE DE LUZ — SVG com pivot FIXO na ponta do farol ── */}
          {tip.x > 0 && (
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <defs>
                {/* Gradiente do feixe: forte na origem, dissolve na ponta */}
                <linearGradient id="beamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="rgba(201,168,76,0.0)"/>
                  <stop offset="8%"   stopColor="rgba(201,168,76,0.22)"/>
                  <stop offset="30%"  stopColor="rgba(255,248,210,0.18)"/>
                  <stop offset="70%"  stopColor="rgba(201,168,76,0.08)"/>
                  <stop offset="100%" stopColor="rgba(201,168,76,0.0)"/>
                </linearGradient>
                <linearGradient id="beamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="rgba(201,168,76,0.0)"/>
                  <stop offset="5%"   stopColor="rgba(201,168,76,0.12)"/>
                  <stop offset="40%"  stopColor="rgba(255,248,210,0.10)"/>
                  <stop offset="100%" stopColor="rgba(201,168,76,0.0)"/>
                </linearGradient>

                {/* Máscara do feixe principal: triângulo cônico */}
                <clipPath id="beam1Clip">
                  {/* Triângulo com vértice na ponta do farol */}
                  <polygon
                    points={`
                      ${tip.x},${tip.y}
                      ${tip.x + beamLen * Math.cos(Math.PI * 0.08)},${tip.y + beamLen * Math.sin(Math.PI * 0.08)}
                      ${tip.x + beamLen * Math.cos(Math.PI * 0.22)},${tip.y + beamLen * Math.sin(Math.PI * 0.22)}
                    `}
                  />
                </clipPath>
                <clipPath id="beam2Clip">
                  <polygon
                    points={`
                      ${tip.x},${tip.y}
                      ${tip.x + beamLen * Math.cos(Math.PI * 0.04)},${tip.y + beamLen * Math.sin(Math.PI * 0.04)}
                      ${tip.x + beamLen * Math.cos(Math.PI * 0.26)},${tip.y + beamLen * Math.sin(Math.PI * 0.26)}
                    `}
                  />
                </clipPath>
              </defs>

              {/* Feixe principal — gira em torno da ponta do farol */}
              <motion.g
                style={{ transformOrigin: `${tip.x}px ${tip.y}px` }}
                initial={{ rotate: -30, opacity: 0 }}
                animate={
                  phase === 'dark'   ? { rotate: -30, opacity: 0   } :
                  phase === 'sweep'  ? { rotate:   0, opacity: 1   } :
                  phase === 'reveal' ? { rotate:  22, opacity: 0.7 } :
                                       { rotate:  40, opacity: 0   }
                }
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Triângulo de luz cônico */}
                <polygon
                  points={`
                    ${tip.x},${tip.y}
                    ${tip.x + beamLen * Math.cos(Math.PI * 0.08)},${tip.y + beamLen * Math.sin(Math.PI * 0.08)}
                    ${tip.x + beamLen * Math.cos(Math.PI * 0.22)},${tip.y + beamLen * Math.sin(Math.PI * 0.22)}
                  `}
                  fill="url(#beamGrad1)"
                  opacity={0.9}
                />
              </motion.g>

              {/* Feixe secundário mais difuso */}
              <motion.g
                style={{ transformOrigin: `${tip.x}px ${tip.y}px` }}
                initial={{ rotate: -45, opacity: 0 }}
                animate={
                  phase === 'dark'   ? { rotate: -45, opacity: 0   } :
                  phase === 'sweep'  ? { rotate:  -8, opacity: 0.6 } :
                  phase === 'reveal' ? { rotate:  30, opacity: 0.4 } :
                                       { rotate:  55, opacity: 0   }
                }
                transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
              >
                <polygon
                  points={`
                    ${tip.x},${tip.y}
                    ${tip.x + beamLen * Math.cos(Math.PI * 0.04)},${tip.y + beamLen * Math.sin(Math.PI * 0.04)}
                    ${tip.x + beamLen * Math.cos(Math.PI * 0.26)},${tip.y + beamLen * Math.sin(Math.PI * 0.26)}
                  `}
                  fill="url(#beamGrad2)"
                  opacity={0.7}
                />
              </motion.g>

              {/* Halo pontual na ponta do farol */}
              <motion.circle
                cx={tip.x} cy={tip.y} r={18}
                fill="rgba(201,168,76,0.35)"
                initial={{ opacity: 0, r: 0 }}
                animate={
                  phase === 'sweep' || phase === 'reveal' || phase === 'stable'
                    ? { opacity: 0.8, r: 14 }
                    : { opacity: 0,   r: 0  }
                }
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                cx={tip.x} cy={tip.y} r={32}
                fill="rgba(201,168,76,0.12)"
                initial={{ opacity: 0, r: 0 }}
                animate={
                  phase === 'sweep' || phase === 'reveal' || phase === 'stable'
                    ? { opacity: 1, r: 28 }
                    : { opacity: 0, r: 0  }
                }
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          )}

          {/* ── CANTOS DECORATIVOS ── */}
          {(['tl','tr','bl','br'] as const).map((pos, i) => (
            <motion.div key={pos} style={{
              position: 'absolute',
              ...(pos[0] === 't' ? { top: 28 } : { bottom: 28 }),
              ...(pos[1] === 'l' ? { left: 28 } : { right: 28 }),
              width: 34, height: 34,
              borderTop:    pos[0] === 't' ? '1px solid rgba(201,168,76,0.45)' : undefined,
              borderBottom: pos[0] === 'b' ? '1px solid rgba(201,168,76,0.45)' : undefined,
              borderLeft:   pos[1] === 'l' ? '1px solid rgba(201,168,76,0.45)' : undefined,
              borderRight:  pos[1] === 'r' ? '1px solid rgba(201,168,76,0.45)' : undefined,
            }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: phase === 'reveal' || phase === 'stable' ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
            />
          ))}

          {/* ── LOGO ── */}
          <motion.div
            ref={logoRef}
            style={{ position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={
              phase === 'dark'   ? { opacity: 0,    filter: 'blur(6px)'   } :
              phase === 'sweep'  ? { opacity: 0.55, filter: 'blur(2px)'   } :
              phase === 'reveal' ? { opacity: 0.9,  filter: 'blur(0.4px)' } :
                                   { opacity: 1,    filter: 'blur(0px)'   }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoPharol variant="full" size={360} onDark={false} />
          </motion.div>

          {/* ── BARRA DE PROGRESSO ── */}
          <motion.div
            style={{
              position: 'absolute', bottom: 56,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8, zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || phase === 'stable' ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ width: 160, height: 1, background: 'rgba(27,43,107,0.1)', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0,
                  height: '100%', width: 50,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.85), transparent)',
                }}
                animate={{ x: [-50, 210] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
              />
            </div>
            <motion.span
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: '0.47rem', letterSpacing: '0.4em',
                textTransform: 'uppercase', color: 'rgba(27,43,107,0.28)',
              }}
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Carregando
            </motion.span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
