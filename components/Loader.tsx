'use client'

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import LogoPharol from './ui/LogoPharol'

type LoaderProps = { onComplete: () => void }

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'dark' | 'sweep' | 'reveal' | 'stable' | 'exit'>('dark')

  useEffect(() => {
    // Fase 1: escurece levemente (0ms)
    const t1 = setTimeout(() => setPhase('sweep'),  400)   // feixe começa a varrer
    const t2 = setTimeout(() => setPhase('reveal'),  900)  // logo revela
    const t3 = setTimeout(() => setPhase('stable'), 1800)  // estabiliza
    const t4 = setTimeout(() => {
      setPhase('exit')
      setTimeout(() => {
        setVisible(false)
        setTimeout(onComplete, 600)
      }, 700)
    }, 3200)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Fundo: creme com leve escurecimento inicial */}
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'var(--cream)' }}
            animate={{ backgroundColor: phase === 'dark' ? '#e8e4da' : 'var(--cream)' }}
            transition={{ duration: 0.4 }}
          />

          {/* ── FEIXE DE LUZ DO FAROL ── */}
          {/* Cone de luz que varre da esquerda para a direita */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '100%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            {/* Gradiente cônico simulando o feixe */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'conic-gradient(from 180deg at 15% 50%, transparent 0deg, rgba(201,168,76,0.07) 8deg, rgba(201,168,76,0.18) 14deg, rgba(255,248,220,0.22) 18deg, rgba(201,168,76,0.18) 22deg, rgba(201,168,76,0.07) 28deg, transparent 36deg)',
              }}
              initial={{ opacity: 0, rotate: -30 }}
              animate={
                phase === 'dark' ? { opacity: 0, rotate: -30 } :
                phase === 'sweep' ? { opacity: 1, rotate: 0 } :
                phase === 'reveal' ? { opacity: 0.6, rotate: 15 } :
                { opacity: 0, rotate: 30 }
              }
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Segundo feixe mais suave, ligeiramente atrasado */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'conic-gradient(from 180deg at 12% 50%, transparent 0deg, rgba(201,168,76,0.05) 10deg, rgba(255,248,220,0.15) 20deg, rgba(201,168,76,0.05) 30deg, transparent 40deg)',
              }}
              initial={{ opacity: 0, rotate: -45 }}
              animate={
                phase === 'dark' ? { opacity: 0, rotate: -45 } :
                phase === 'sweep' ? { opacity: 0.7, rotate: -5 } :
                phase === 'reveal' ? { opacity: 0.4, rotate: 20 } :
                { opacity: 0, rotate: 40 }
              }
              transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            />
          </motion.div>

          {/* ── REFLEXO NO "CHÃO" (ondas de luz) ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(201,168,76,0.04) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'stable' || phase === 'reveal' ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          {/* ── CANTOS DECORATIVOS ── */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos, i) => (
            <motion.div
              key={pos}
              style={{
                position: 'absolute',
                ...(pos.includes('top') ? { top: 28 } : { bottom: 28 }),
                ...(pos.includes('left') ? { left: 28 } : { right: 28 }),
                width: 36, height: 36,
                borderTop: pos.includes('top') ? '1px solid rgba(201,168,76,0.4)' : undefined,
                borderBottom: pos.includes('bottom') ? '1px solid rgba(201,168,76,0.4)' : undefined,
                borderLeft: pos.includes('left') ? '1px solid rgba(201,168,76,0.4)' : undefined,
                borderRight: pos.includes('right') ? '1px solid rgba(201,168,76,0.4)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: phase === 'stable' || phase === 'reveal' ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.06 }}
            />
          ))}

          {/* ── LOGO ── */}
          {/* O farol aparece primeiro, depois os raios e o texto emergem */}
          <div style={{ position: 'relative', zIndex: 2 }}>

            {/* Máscara de revelação: o feixe "ilumina" a logo da esquerda para direita */}
            <motion.div
              style={{ position: 'relative' }}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={
                phase === 'dark' ? { opacity: 0, filter: 'blur(8px)' } :
                phase === 'sweep' ? { opacity: 0.5, filter: 'blur(3px)' } :
                phase === 'reveal' ? { opacity: 0.85, filter: 'blur(1px)' } :
                { opacity: 1, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Halo dourado atrás da logo — como aureola do farol */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '30%', left: '55%',
                  transform: 'translate(-50%, -50%)',
                  width: 160, height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  phase === 'stable' || phase === 'reveal'
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />

              <LogoPharol variant="full" size={360} onDark={false} />
            </motion.div>
          </div>

          {/* ── BARRA DE PROGRESSO ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 60,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'stable' || phase === 'reveal' ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Linha com partícula correndo */}
            <div style={{ width: 180, height: 1, background: 'rgba(27,43,107,0.1)', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)',
                  width: 60,
                }}
                animate={{ x: [-60, 240] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
              />
            </div>
            <motion.span
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: '0.48rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(27,43,107,0.3)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Carregando
            </motion.span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
