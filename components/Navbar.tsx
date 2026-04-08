'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LogoPharol from './ui/LogoPharol'
// LighthouseSVG mantido apenas se usado em outro lugar

type NavbarProps = {
  onReserve: () => void
  onQueue: () => void
  onClientArea: () => void
}

const navLinks = [
  { href: '#about', label: 'O Restaurante', id: 'about' },
  { href: '#menu', label: 'Cardápio', id: 'menu' },
  { href: '#history', label: 'Nossa História', id: 'history' },
  { href: '#location', label: 'Localização', id: 'location' },
  { href: '#', label: 'Fila Virtual', id: '' },
]

export default function Navbar({ onReserve, onQueue, onClientArea }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'menu', 'history', 'location', 'reserve-section']
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          left: 0, right: 0, top: 0,
          height: 76,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 52px)',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(27,43,107,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 32px rgba(27,43,107,0.06)' : 'none',
          transition: 'background 600ms ease, border-color 600ms ease, backdrop-filter 600ms ease',
        }}
      >
        {/* ── Logo ── */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }}>
            <LogoPharol variant="navbar" size={200} onDark={!scrolled} />
          </motion.div>
        </a>

        {/* ── Desktop links ── */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
          {navLinks.map((link) => {
            const active = activeSection === link.id
            const isHov = hovered === link.label
            return (
              <li key={link.label} style={{ position: 'relative' }}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => { if (link.label === 'Fila Virtual') { e.preventDefault(); onQueue() } }}
                  style={{
                    fontSize: '0.64rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    fontWeight: 600,
                    color: active ? 'var(--gold)' : isHov ? (scrolled ? 'var(--navy)' : '#fff') : scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.72)',
                    transition: 'color 0.25s',
                    paddingBottom: 2,
                    display: 'block',
                  }}
                >
                  {link.label}
                </a>
                <motion.div
                  animate={{ scaleX: active || isHov ? 1 : 0, opacity: active ? 1 : isHov ? 0.6 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', bottom: -2, left: 0, right: 0,
                    height: 1,
                    background: 'var(--gold)',
                    transformOrigin: 'left',
                  }}
                />
              </li>
            )
          })}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <motion.button
            onClick={onReserve}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative', overflow: 'hidden',
              background: 'var(--gold)', border: 'none',
              color: 'var(--navy-deep)',
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '10px 22px', cursor: 'pointer',
              fontFamily: 'var(--font-montserrat), sans-serif',
              boxShadow: '0 4px 20px rgba(201,168,76,0.22)',
            }}
          >
            Reservar Mesa
          </motion.button>

          {/* Minha Área */}
          <button onClick={onClientArea} style={{
            background: 'transparent', border: `1px solid ${scrolled ? 'rgba(27,43,107,0.25)' : 'rgba(255,255,255,0.18)'}`,
            color: scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.52)', fontSize: '0.58rem', letterSpacing: '0.13em',
            textTransform: 'uppercase', padding: '10px 14px', cursor: 'pointer',
            transition: 'all 0.25s', fontFamily: 'var(--font-montserrat), sans-serif',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.82)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = scrolled ? 'rgba(27,43,107,0.25)' : 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.52)' }}
          >
            Minha Área
          </button>
        </div>

        {/* ── Hamburger ── */}
        <button className="mobile-nav" onClick={() => setOpen(v => !v)}
          style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer' }}
          aria-label="Abrir menu"
        >
          <motion.div animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ width: 22, height: 1.5, background: scrolled ? 'var(--navy)' : 'white', marginBottom: 6 }} />
          <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} style={{ width: 16, height: 1.5, background: scrolled ? 'var(--navy)' : 'white', marginBottom: 6 }} />
          <motion.div animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ width: 22, height: 1.5, background: scrolled ? 'var(--navy)' : 'white' }} />
        </button>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 799, backdropFilter: 'blur(6px)' }}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, height: '100dvh', width: 290,
                background: 'rgba(6,11,32,0.97)', backdropFilter: 'blur(24px)',
                padding: '80px 32px 40px',
                zIndex: 801,
                borderLeft: '1px solid rgba(201,168,76,0.12)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ display: 'grid', gap: 0 }}>
                {navLinks.map((link, i) => (
                  <motion.a key={link.label} href={link.href}
                    initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.055 + 0.1 }}
                    onClick={(e) => { setOpen(false); if (link.label === 'Fila Virtual') { e.preventDefault(); onQueue() } }}
                    style={{ color: 'rgba(255,255,255,0.72)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600, padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.button onClick={() => { setOpen(false); onReserve() }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
                className="btn-primary" style={{ width: '100%', marginTop: 28 }}
              >
                Reservar Mesa
              </motion.button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
