'use client'

import { motion } from 'framer-motion'
import LogoPharol from './ui/LogoPharol'
import { timeline } from '@/lib/timelineData'

export default function History() {
  return (
    <section id="history" className="section" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      {/* top / bottom gold lines */}
      <div style={{ position: 'absolute', insetInline: 0, top: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />

      {/* Background farol — subtil em navy sobre cream */}
      <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', opacity: 0.045, pointerEvents: 'none' }}>
        <LogoPharol variant="full" size={340} />
      </div>

      <div className="container" style={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 80 }}
        >
          <span className="section-label">Nossa Trajetória</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>
            Uma história de{' '}
            <em style={{ color: 'var(--gold)' }}>excelência</em>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="history-timeline" style={{ position: 'relative', paddingLeft: 52 }}>
          {/* Vertical line */}
          <div
            className="history-line"
            style={{
              position: 'absolute',
              left: 18, top: 8, bottom: 8, width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(27,43,107,0.25) 8%, rgba(201,168,76,0.4) 92%, transparent)',
            }}
          />

          {timeline.map((decade, di) => (
            <motion.div
              key={decade.decade}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: di * 0.05 }}
              style={{ marginBottom: 56 }}
            >
              {/* Decade header */}
              <div style={{ position: 'relative', marginBottom: 28 }}>
                {/* Diamond dot */}
                <div
                  className="history-decade-diamond"
                  style={{
                    position: 'absolute', left: -39, top: 8,
                    width: 16, height: 16, transform: 'rotate(45deg)',
                    background: 'var(--cream)',
                    border: '2px solid var(--gold)',
                    boxShadow: '0 0 10px rgba(201,168,76,0.2)',
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-playfair), serif',
                    color: 'var(--gold)',
                    fontSize: '1.4rem',
                    fontStyle: 'italic',
                    letterSpacing: '0.04em',
                  }}
                >
                  {decade.decade}
                </h3>
              </div>

              {/* Items */}
              {decade.items.map((item, index) => (
                <motion.div
                  className="history-item-content"
                  key={`${decade.decade}-${item.year}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                  style={{ position: 'relative', paddingLeft: 28, marginBottom: 22 }}
                >
                  {/* Dot */}
                  <div
                    className="history-item-dot"
                    style={{
                      position: 'absolute',
                      left: -45,
                      top: 7,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      opacity: 0.7,
                      boxShadow: '0 0 6px rgba(201,168,76,0.4)',
                    }}
                  />

                  {/* Year badge */}
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      padding: '2px 10px',
                      fontSize: '0.56rem',
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: 6,
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '1.08rem',
                      color: 'var(--text-mid)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
