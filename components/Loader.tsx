'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import LogoPharol from './ui/LogoPharol'

type LoaderProps = { onComplete: () => void }

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'dark' | 'sweep' | 'reveal' | 'stable'>('dark')
  const logoRef = useRef<HTMLDivElement>(null)
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 })

  // Calcular posição exata da ponta do farol em coordenadas da viewport
  useEffect(() => {
    const calc = () => {
      if (!logoRef.current) return
      const rect = logoRef.current.getBoundingClientRect()
      // Ponta do farol: x=19.4% do SVG, y=0.6% do SVG (calculado do viewBox 420x262)
      const tipX = rect.left + rect.width * 0.194
      const tipY = rect.top  + rect.height * 0.006
      setTipPos({ x: tipX, y: tipY })
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('sweep'),  350)
    const t2 = setTimeout(() => setPhase('reveal'), 1000)
    const t3 = setTimeout(() => setPhase('stable'), 1900)
    const t4 = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 600)
    }, 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  // Posição da ponta em % da viewport para o conic-gradient
  const tipXpct = typeof window !== 'undefined' ? (tipPos.x / window.innerWidth)  * 100 : 20
  const tipYpct = typeof window !== 'undefined' ? (tipPos.y / window.innerHeight) * 100 : 40

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
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
          {/* ── FEIXE DE LUZ saindo da ponta do farol ── */}
          {/* Cone dourado que varre como holofote girando */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              // conic-gradient com origem exata na ponta do farol
              background: `conic-gradient(
                from 85deg at ${tipXpct.toFixed(1)}% ${tipYpct.toFixed(1)}%,
                transparent           0deg,
                rgba(201,168,76,0.04) 4deg,
                rgba(201,168,76,0.13) 10deg,
                rgba(255,248,210,0.20) 15deg,
                rgba(201,168,76,0.13) 20deg,
                rgba(201,168,76,0.04) 26deg,
                transparent           30deg,
                transparent           360deg
              )`,
            }}
            initial={{ opacity: 0, rotate: -25 }}
            animate={
              phase === 'dark'   ? { opacity: 0,   rotate: -25 } :
              phase === 'sweep'  ? { opacity: 1,   rotate: 0   } :
              phase === 'reveal' ? { opacity: 0.7, rotate: 18  } :
                                   { opacity: 0,   rotate: 35  }
            }
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Segundo feixe mais difuso, movimento ligeiramente diferente */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `conic-gradient(
                from 85deg at ${tipXpct.toFixed(1)}% ${tipYpct.toFixed(1)}%,
                transparent            0deg,
                rgba(201,168,76,0.03)  8deg,
                rgba(255,248,210,0.10) 18deg,
                rgba(201,168,76,0.03)  28deg,
                transparent            38deg,
                transparent            360deg
              )`,
            }}
            initial={{ opacity: 0, rotate: -35 }}
            animate={
              phase === 'dark'   ? { opacity: 0,   rotate: -35 } :
              phase === 'sweep'  ? { opacity: 0.8, rotate: -8  } :
              phase === 'reveal' ? { opacity: 0.5, rotate: 25  } :
                                   { opacity: 0,   rotate: 45  }
            }
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          />

          {/* ── CANTOS DECORATIVOS ── */}
          {(['top-left','top-right','bottom-left','bottom-right'] as const).map((pos, i) => (
            <motion.div
              key={pos}
              style={{
                position: 'absolute',
                ...(pos.includes('top')    ? { top: 28 }    : { bottom: 28 }),
                ...(pos.includes('left')   ? { left: 28 }   : { right: 28 }),
                width: 36, height: 36,
                borderTop:    pos.includes('top')    ? '1px solid rgba(201,168,76,0.45)' : undefined,
                borderBottom: pos.includes('bottom') ? '1px solid rgba(201,168,76,0.45)' : undefined,
                borderLeft:   pos.includes('left')   ? '1px solid rgba(201,168,76,0.45)' : undefined,
                borderRight:  pos.includes('right')  ? '1px solid rgba(201,168,76,0.45)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: phase === 'reveal' || phase === 'stable' ? 1 : 0,
                scale: 1,
              }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.16,1,0.3,1] }}
            />
          ))}

          {/* ── LOGO ── */}
          <motion.div
            ref={logoRef}
            style={{ position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={
              phase === 'dark'   ? { opacity: 0,    filter: 'blur(6px)'  } :
              phase === 'sweep'  ? { opacity: 0.55, filter: 'blur(2px)'  } :
              phase === 'reveal' ? { opacity: 0.88, filter: 'blur(0.5px)'} :
                                   { opacity: 1,    filter: 'blur(0px)'  }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Halo dourado na ponta do farol */}
            <motion.div
              style={{
                position: 'absolute',
                // ponta do farol: x=19.4%, y=0.6% do elemento
                top:  '0.6%',
                left: '19.4%',
                transform: 'translate(-50%, -50%)',
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.15) 35%, transparent 70%)',
                pointerEvents: 'none',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === 'sweep' || phase === 'reveal' || phase === 'stable'
                  ? { scale: [0, 1.4, 1], opacity: [0, 0.9, 0.6] }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], times: [0, 0.5, 1] }}
            />

            <LogoPharol variant="full" size={360} onDark={false} />
          </motion.div>

          {/* ── BARRA DE PROGRESSO ── */}
          <motion.div
            style={{
              position: 'absolute', bottom: 56,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || phase === 'stable' ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{
              width: 160, height: 1,
              background: 'rgba(27,43,107,0.1)',
              position: 'relative', overflow: 'hidden',
            }}>
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
                fontSize: '0.47rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(27,43,107,0.28)',
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
