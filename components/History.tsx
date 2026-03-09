'use client'

import { motion } from 'framer-motion'
import LighthouseSVG from './ui/LighthouseSVG'
import { timeline } from '@/lib/timelineData'

export default function History() {
  return (
    <section id="history" className="section" style={{ background: 'var(--navy-deep)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', insetInline: 0, top: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', opacity: 0.06 }}><LighthouseSVG size={320} variant="decoration" /></div>
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.03 }}><LighthouseSVG size={220} variant="decoration" /></div>

      <div className="container" style={{ maxWidth: 920, position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{ marginBottom: 70 }}>
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Nossa Trajetória</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Uma história de <em style={{ color: 'var(--gold)' }}>excelência</em></h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: 48 }}>
          <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, var(--gold) 5%, var(--gold) 95%, transparent)' }} />

          {timeline.map((decade) => (
            <div key={decade.decade} style={{ marginBottom: 48 }}>
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{ position: 'absolute', left: -34, top: 10, width: 14, height: 14, transform: 'rotate(45deg)', border: '2px solid var(--gold)', background: 'var(--navy-deep)' }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '1.3rem', fontStyle: 'italic' }}>{decade.decade}</h3>
              </div>

              {decade.items.map((item, index) => (
                <motion.div
                  key={`${decade.decade}-${item.year}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  style={{ position: 'relative', paddingLeft: 32, marginBottom: 20 }}
                >
                  <span style={{ position: 'absolute', left: -44, top: 8, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-pale)' }} />
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item.text}</div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
