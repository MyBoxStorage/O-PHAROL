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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          height: 80,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          background: scrolled
            ? 'rgba(8, 14, 40, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.3)' : 'none',
          transition: 'all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <LighthouseSVG size={42} showBeam={scrolled} variant="mini" />
          </motion.div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--white)', fontSize: '1rem', letterSpacing: '0.18em', fontWeight: 700 }}>O PHAROL</div>
            <div style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Gourmet</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => {
            const isActive = activeSection === sectionMap[link.href]
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  onClick={(e) => { if (link.label === 'Fila Virtual') { e.preventDefault(); onQueue() } }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['PT', 'EN', 'ES'] as const).map((l) => (
              <motion.button
                key={l}
                onClick={() => setLang(l)}
                whileHover={{ scale: 1.05 }}
                style={{
                  border: `1px solid ${lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.18)'}`,
                  color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  background: lang === l ? 'rgba(201,168,76,0.08)' : 'transparent',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {l}
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={onReserve}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'var(--gold)',
              border: 'none',
              color: 'var(--navy-deep)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '11px 24px',
              cursor: 'pointer',
              fontFamily: 'var(--font-montserrat), sans-serif',
            }}
          >
            Reservar Mesa
          </motion.button>
          <motion.button
            onClick={onClientArea}
            whileHover={{ borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '11px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-montserrat), sans-serif',
            }}
          >
            Minha Área
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          style={{ background: 'transparent', border: 'none', color: 'white', padding: 4 }}
          aria-label="Abrir menu"
        >
          <motion.div animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ width: 22, height: 2, background: 'white', marginBottom: 5, transformOrigin: 'center' }} />
          <motion.div animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} style={{ width: 22, height: 2, background: 'white', marginBottom: 5 }} />
          <motion.div animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ width: 22, height: 2, background: 'white', transformOrigin: 'center' }} />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 799, backdropFilter: 'blur(4px)' }}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: 'fixed', top: 0, right: 0, height: '100dvh', width: 300, background: 'rgba(8,14,40,0.97)', backdropFilter: 'blur(24px)', padding: '32px 28px', zIndex: 801, borderLeft: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div style={{ display: 'grid', gap: 6, marginTop: 64 }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={(e) => { setOpen(false); if (link.label === 'Fila Virtual') { e.preventDefault(); onQueue() } }}
                    style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => { setOpen(false); onReserve() }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 20 }}
                >
                  Reservar Mesa
                </motion.button>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  {(['PT', 'EN', 'ES'] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} style={{ border: `1px solid ${lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`, background: 'transparent', color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.6)', padding: '6px 12px', fontSize: '0.6rem', letterSpacing: '0.1em', cursor: 'pointer' }}>{l}</button>
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
