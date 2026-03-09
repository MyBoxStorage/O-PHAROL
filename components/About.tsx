'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section id="about" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container about-grid">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          style={{ position: 'relative' }}
          className="about-video-wrap"        >
          <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', boxShadow: '-20px 20px 60px rgba(13,24,56,0.25)' }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              src="https://res.cloudinary.com/djhevgyvi/video/upload/v1773003521/almoco-orla_lehs7l.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: -16, border: '1px solid rgba(201,168,76,0.4)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: -16, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 22, height: 22, borderTop: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, width: 22, height: 22, borderTop: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, width: 22, height: 22, borderBottom: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: 22, height: 22, borderBottom: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -28, right: -28, background: 'var(--navy)', padding: 28, boxShadow: '0 20px 60px rgba(13,24,56,0.4), 0 0 0 1px rgba(201,168,76,0.2)' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontWeight: 900, fontSize: '2.8rem', lineHeight: 1 }}>38</div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Anos</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <span style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '2.8rem', color: 'var(--gold)' }}>O Pharol</span>
          <h2 style={{ margin: '6px 0 18px', fontFamily: 'var(--font-playfair), serif', fontSize: '2.2rem', color: 'var(--navy)', lineHeight: 1.15, fontWeight: 400 }}>
            Uma experiência <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>única</em> à beira-mar
          </h2>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--text-mid)' }}>
            Situado no coração da Avenida Atlântica, O Pharol ilumina o cenário gastronômico de Balneário Camboriú desde 1986. Como um farol que guia os navegantes ao porto seguro, nosso restaurante conduz cada hóspede a uma jornada gastronômica inesquecível.
          </p>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--text-mid)' }}>
            Especialistas em frutos do mar frescos, combinamos a riqueza do oceano com técnicas clássicas da culinária brasileira litorânea, criando pratos que contam a história de nossa terra e do nosso mar.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '28px 0' }}>
            {[
              ['🦞', 'Frutos do Mar', 'Ingredientes frescos, selecionados diariamente'],
              ['🌊', 'Vista para o Mar', 'Varanda privilegiada na Av. Atlântica'],
              ['🎵', 'Música ao Vivo', 'Ambiente sofisticado e acolhedor'],
              ['🏆', "Travellers' Choice", 'Top 10% Tripadvisor — +1.400 avaliações'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ display: 'flex', gap: 10 }}>
                <span>{icon}</span>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--text-mid)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <a href="#menu" style={{ display: 'inline-flex', border: '1px solid var(--navy)', color: 'var(--navy)', padding: '12px 24px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Explorar o Cardápio →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
