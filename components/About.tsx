'use client'

import { motion } from 'framer-motion'

const features = [
  { icon: '🦞', label: 'Frutos do Mar', desc: 'Ingredientes frescos, selecionados diariamente' },
  { icon: '🌊', label: 'Vista para o Mar', desc: 'Varanda privilegiada na Av. Atlântica' },
  { icon: '🎵', label: 'Música ao Vivo', desc: 'Ambiente sofisticado e acolhedor' },
  { icon: '🏆', label: "Travellers' Choice", desc: 'Top 10% Tripadvisor — +1.400 avaliações' },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      {/* Texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.018,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231B2B6B' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v5h20v20.5h5V23h20v-5H25V2.5h-5z'/%3E%3C/g%3E%3C/svg%3E\")",
          pointerEvents: 'none',
        }}
      />

      <div className="container about-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Video Column */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative' }}
          className="about-video-wrap"
        >
          {/* Decorative offset frame */}
          <div style={{ position: 'absolute', top: -16, left: -16, right: 16, bottom: -16, border: '1px solid rgba(201,168,76,0.25)', pointerEvents: 'none', zIndex: 0 }} />

          <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', boxShadow: '-12px 24px 80px rgba(13,24,56,0.22)', zIndex: 1 }}>
            <video
              autoPlay muted loop playsInline
              src="https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
            />
            {/* Gradient overlay bottom */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,24,56,0.35) 0%, transparent 50%)', pointerEvents: 'none' }} />
          </div>

          {/* Corner accents */}
          {[
            { top: -16, left: -16 },
            { top: -16, right: -16 },
            { bottom: -16, left: -16 },
            { bottom: -16, right: -16 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 20,
                height: 20,
                borderTop: i < 2 ? '2px solid var(--gold)' : undefined,
                borderBottom: i >= 2 ? '2px solid var(--gold)' : undefined,
                borderLeft: i % 2 === 0 ? '2px solid var(--gold)' : undefined,
                borderRight: i % 2 === 1 ? '2px solid var(--gold)' : undefined,
                zIndex: 2,
                ...pos,
              }}
            />
          ))}

          {/* Badge 38 anos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: -28,
              right: -28,
              background: 'var(--navy)',
              padding: '24px 28px',
              boxShadow: '0 24px 60px rgba(13,24,56,0.45), 0 0 0 1px rgba(201,168,76,0.25)',
              zIndex: 3,
            }}
          >
            <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontWeight: 900, fontSize: '3rem', lineHeight: 1 }}>38</div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Anos</div>
          </motion.div>
        </motion.div>

        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '3rem', color: 'var(--gold)', display: 'block' }}
          >
            O Pharol
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ margin: '4px 0 22px', fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--navy)', lineHeight: 1.12, fontWeight: 400 }}
          >
            Uma experiência{' '}
            <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>única</em>{' '}
            à beira-mar
          </motion.h2>

          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 24 }} />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.18rem', lineHeight: 1.95, color: 'var(--text-mid)', marginBottom: 14 }}
          >
            Situado no coração da Avenida Atlântica, O Pharol ilumina o cenário gastronômico de Balneário Camboriú desde 1986. Como um farol que guia os navegantes ao porto seguro, nosso restaurante conduz cada hóspede a uma jornada gastronômica inesquecível.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.42 }}
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.18rem', lineHeight: 1.95, color: 'var(--text-mid)', marginBottom: 32 }}
          >
            Especialistas em frutos do mar frescos, combinamos a riqueza do oceano com técnicas clássicas da culinária brasileira litorânea, criando pratos que contam a história de nossa terra e do nosso mar.
          </motion.p>

          {/* Feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
            {features.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.08 }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '14px 16px',
                  border: '1px solid rgba(201,168,76,0.15)',
                  background: 'rgba(201,168,76,0.02)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 700, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: 1.4 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#menu"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid var(--navy)',
              color: 'var(--navy)',
              padding: '13px 28px',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 600,
            }}
          >
            Explorar o Cardápio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
