'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import LighthouseSVG from './ui/LighthouseSVG'

type LoaderProps = {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  // Ref para guardar o callback sem ele entrar nas deps do useEffect
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(30), 600)
    const t2 = setTimeout(() => setProgress(70), 1500)
    const t3 = setTimeout(() => setProgress(100), 2400)
    const tDone = setTimeout(() => {
      setVisible(false)
      // Pequeno delay para a animação de saída terminar antes de montar o site
      setTimeout(() => onCompleteRef.current(), 700)
    }, 2800)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(tDone)
    }
  }, []) // roda exatamente uma vez

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--navy-deep)',
            zIndex: 9999,
            display: 'grid', placeItems: 'center',
            color: 'var(--cream)',
          }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 140, margin: '0 auto 28px' }}>
              <LighthouseSVG size={120} showBeam animated />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
            >
              O PHAROL
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: '1.4rem', marginTop: 8 }}
            >
              Restaurante Gourmet
            </motion.div>

            <div style={{ width: 220, height: 1, background: 'rgba(255,255,255,0.12)', margin: '24px auto 0' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
                animate={{ width: `${progress}%` }}
                initial={{ width: '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
