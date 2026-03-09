'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LighthouseSVG from './ui/LighthouseSVG'

type LoaderProps = {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(30), 550),
      setTimeout(() => setProgress(70), 1450),
      setTimeout(() => setProgress(100), 2400),
    ]

    const doneTimer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 2800 + 400)

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--navy-deep)',
            zIndex: 9999,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--cream)',
          }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 140, margin: '0 auto 28px' }}>
              <LighthouseSVG size={120} showBeam animated />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.4rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              O PHAROL
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-great-vibes), cursive',
                color: 'var(--gold)',
                fontSize: '1.4rem',
                marginTop: 8,
              }}
            >
              Restaurante Gourmet
            </motion.div>

            <div
              style={{
                width: 220,
                height: 1,
                background: 'rgba(255,255,255,0.12)',
                margin: '24px auto 0',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                }}
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
