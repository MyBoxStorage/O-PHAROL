'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LighthouseSVG from './ui/LighthouseSVG'

type NavbarProps = {
  onReserve: () => void
  onQueue: () => void
  onClientArea: () => void
}

const sectionMap: Record<string, string> = {
  '#about': 'about',
  '#menu': 'menu',
  '#history': 'history',
  '#location': 'location',
  '#': 'reserve-section',
}

const navLinks = [
  { href: '#about', label: 'O Restaurante' },
  { href: '#menu', label: 'Cardápio' },
  { href: '#history', label: 'Nossa História' },
  { href: '#location', label: 'Localização' },
  { href: '#', label: 'Fila Virtual' },
]

export default function Navbar({ onReserve, onQueue, onClientArea }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'PT' | 'EN' | 'ES'>('PT')
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'menu', 'history', 'location', 'reserve-section']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          height: 80,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: scrolled ? 'rgba(13, 24, 56, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(201,168,76,0.2)' : 'none',
          transition: 'all 400ms ease',
        }}
      >
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LighthouseSVG size={44} showBeam={false} variant="mini" />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--white)', fontSize: '1.05rem', letterSpacing: '0.14em' }}>O PHAROL</div>
            <div style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: '0.85rem' }}>Gourmet</div>
          </div>
        </a>

        <ul className="desktop-nav" style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.label === 'Fila Virtual') {
                    e.preventDefault()
                    onQueue()
                  }
                }}
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: activeSection === sectionMap[link.href] ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['PT', 'EN', 'ES'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  border: `1px solid ${lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`,
                  color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                  background: 'transparent',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={onReserve} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer' }}>Reservar Mesa</button>
          <button onClick={onClientArea} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.65)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 16px', cursor: 'pointer' }}>Minha Área</button>
        </div>

        <button
          className="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          style={{ background: 'transparent', border: 'none', color: 'white' }}
          aria-label="Abrir menu"
        >
          <motion.div animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ width: 24, height: 2, background: 'white', marginBottom: 5 }} />
          <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} style={{ width: 24, height: 2, background: 'white', marginBottom: 5 }} />
          <motion.div animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ width: 24, height: 2, background: 'white' }} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 799 }}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ position: 'fixed', top: 0, right: 0, height: '100dvh', width: 300, background: 'var(--navy-deep)', padding: 28, zIndex: 801 }}
            >
              <div style={{ display: 'grid', gap: 18, marginTop: 56 }}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setOpen(false)
                      if (link.label === 'Fila Virtual') {
                        e.preventDefault()
                        onQueue()
                      }
                    }}
                    style={{ color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.76rem' }}
                  >
                    {link.label}
                  </a>
                ))}
                <button onClick={() => { setOpen(false); onReserve() }} className="btn-primary" style={{ width: '100%', marginTop: 8 }}>Reservar Mesa</button>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {(['PT', 'EN', 'ES'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      style={{
                        border: `1px solid ${lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.25)'}`,
                        background: 'transparent',
                        color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                        padding: '5px 10px',
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
