'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { videos } from '@/lib/videoData'

const items = videos.filter((v) => v.id !== 'hero')

export default function Showcase() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startLeft, setStartLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)

  const onMove = (clientX: number) => {
    const track = trackRef.current
    if (!track || !dragging) return
    const walk = (clientX - startX) * 1.5
    track.scrollLeft = startLeft - walk
    setHintVisible(false)
  }

  return (
    <section id="showcase" className="section" style={{ background: 'var(--cream)', paddingBottom: 60, overflow: 'hidden' }}>
      {/* Header */}
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 48 }}
      >
        <div className="section-header" style={{ marginBottom: 0 }}>
          <span className="section-label">Experiências</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>
            Cada momento,{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>uma memória</em>
          </h2>
        </div>
      </motion.div>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: 16,
          padding: '0 calc((100vw - 1200px) / 2)',
          paddingLeft: 'max(40px, calc((100vw - 1200px) / 2))',
          paddingRight: 'max(40px, calc((100vw - 1200px) / 2))',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          cursor: dragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'none' as const,
          msOverflowStyle: 'none' as const,
        }}
        onMouseDown={(e) => {
          const track = trackRef.current
          if (!track) return
          setDragging(true)
          setStartX(e.pageX - track.offsetLeft)
          setStartLeft(track.scrollLeft)
        }}
        onMouseLeave={() => setDragging(false)}
        onMouseUp={() => setDragging(false)}
        onMouseMove={(e) => onMove(e.pageX - (trackRef.current?.offsetLeft || 0))}
        onTouchStart={(e) => {
          const track = trackRef.current
          if (!track) return
          setDragging(true)
          setStartX(e.touches[0].clientX)
          setStartLeft(track.scrollLeft)
        }}
        onTouchEnd={() => setDragging(false)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onScroll={(e) => {
          const t = e.currentTarget
          const ratio = t.scrollWidth > t.clientWidth ? t.scrollLeft / (t.scrollWidth - t.clientWidth) : 0
          setProgress(ratio * 100)
        }}
      >
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className="showcase-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.07 }}
            style={{
              flex: '0 0 clamp(260px, 28vw, 340px)',
              position: 'relative',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
              border: '1px solid rgba(201,168,76,0.08)',
            }}
          >
            {/* Index */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                zIndex: 3,
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'rgba(201,168,76,0.6)',
                fontWeight: 700,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Video */}
            <video
              muted loop playsInline autoPlay
              src={item.url}
              style={{
                display: 'block',
                width: '100%',
                aspectRatio: '9 / 13',
                objectFit: 'cover',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8,14,40,0.92) 0%, rgba(8,14,40,0.3) 45%, transparent 70%)',
                transition: 'opacity 0.4s',
              }}
            />

            {/* Gold line bottom accent */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s',
              }}
              className="card-gold-line"
            />

            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px 20px 20px',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  color: 'var(--white)',
                  fontSize: '1.08rem',
                  fontStyle: 'italic',
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  color: 'var(--gold)',
                  fontSize: '0.58rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                }}
              >
                {item.sublabel}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer: hint + progress */}
      <div className="container" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <motion.span
            animate={{ opacity: hintVisible ? [0.4, 0.9, 0.4] : 0 }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ color: 'var(--text-light)', fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
          >
            Arraste para explorar →
          </motion.span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.56rem', letterSpacing: '0.2em' }}>
            {items.length} experiências
          </span>
        </div>
        <div style={{ height: 1, background: 'rgba(27,43,107,0.1)', borderRadius: 1 }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', borderRadius: 1 }}
            animate={{ width: `${Math.max(progress, 4)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </section>
  )
}
