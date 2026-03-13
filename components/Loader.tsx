'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import LogoPharol from './ui/LogoPharol'

type LoaderProps = {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(30), 600)
    const t2 = setTimeout(() => setProgress(70), 1500)
    const t3 = setTimeout(() => setProgress(100), 2400)
    const tDone = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onCompleteRef.current(), 700)
    }, 2800)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(tDone)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--cream)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Cantos decorativos dourados */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 40, height: 40, borderTop: '1px solid rgba(201,168,76,0.35)', borderLeft: '1px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 28, right: 28, width: 40, height: 40, borderTop: '1px solid rgba(201,168,76,0.35)', borderRight: '1px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 40, height: 40, borderBottom: '1px solid rgba(201,168,76,0.35)', borderLeft: '1px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 40, height: 40, borderBottom: '1px solid rgba(201,168,76,0.35)', borderRight: '1px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />

          {/* Logo oficial — farol + raios + texto lado a lado */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <LogoPharol variant="full" size={380} onDark={false} />
          </motion.div>

          {/* Barra de progresso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 200, height: 1, background: 'rgba(27,43,107,0.12)' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
                animate={{ width: `${progress}%` }}
                initial={{ width: '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
            <div style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(27,43,107,0.3)',
            }}>
              Carregando
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
