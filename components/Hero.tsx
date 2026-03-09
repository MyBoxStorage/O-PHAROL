'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { videos } from '@/lib/videoData'
import LogoPharol from './ui/LogoPharol'

type HeroProps = {
  onReserve: () => void
}

const heroVideo = videos.find((item) => item.id === 'hero')

export default function Hero({ onReserve }: HeroProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [0, 80])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          src={heroVideo?.url}
          style={{ width: '100%', height: '115%', objectFit: 'cover', opacity: 0.52, y }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,10,28,0.52) 0%, rgba(8,10,28,0.18) 45%, rgba(8,10,28,0.72) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div style={{ position: 'absolute', right: '6%', bottom: 0, opacity: 0.18, pointerEvents: 'none' }}>
        <LogoPharol variant="full" size={320} onDark />
      </div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: 'min(900px, calc(100% - 40px))' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ display: 'inline-flex', gap: 8, alignItems: 'center', border: '1px solid rgba(201,168,76,0.35)', padding: '8px 20px', marginBottom: 28 }}>
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Excelência Gastronômica · Av. Atlântica · BC</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1 }} style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, lineHeight: 0.88, color: 'var(--white)' }}>
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>O</em> PHAROL
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.9 }} style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', marginTop: 4 }}>
          Restaurante Gourmet
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ delay: 0.85, duration: 0.85 }} style={{ margin: '16px 0 36px', fontFamily: 'var(--font-cormorant), serif', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}>
          "Excelência gastronômica desde 1986"
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 38 }}>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
          <span style={{ color: 'var(--gold)' }}>✦</span>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.85 }} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onReserve}>Reservar Mesa <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
          <a href="#menu" className="btn-secondary">Ver Cardápio</a>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 32, zIndex: 2, display: 'grid', gap: 8, justifyItems: 'center' }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Descobrir</span>
        <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--gold), transparent)', transformOrigin: 'top' }} />
      </div>
    </section>
  )
}
