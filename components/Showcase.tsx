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
    <section id="showcase" className="section" style={{ background: 'var(--navy-deep)', paddingBottom: 80 }}>
      <motion.div className="container" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="section-header">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Experiências</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Cada momento, <em style={{ color: 'var(--gold)' }}>uma memória</em></h2>
        </div>
      </motion.div>

      <motion.div
        ref={trackRef}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        style={{ display: 'flex', gap: 20, padding: '0 40px', overflowX: 'auto', scrollSnapType: 'x mandatory', cursor: dragging ? 'grabbing' : 'grab', scrollbarWidth: 'none' as const, msOverflowStyle: 'none' as const }}
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
          <motion.article key={item.id} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }} style={{ flex: '0 0 360px', position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start' }}>
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, color: 'var(--gold)', letterSpacing: '0.3em', fontSize: '0.58rem' }}>{String(index + 1).padStart(2, '0')}</div>
            <video muted loop playsInline autoPlay src={item.url} style={{ display: 'block', width: '100%', aspectRatio: '9 / 12', objectFit: 'cover', transition: 'transform .6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,24,56,0.8) 0%, transparent 60%)', display: 'grid', alignItems: 'end', padding: 24 }}>
              <motion.div whileHover={{ y: 0, opacity: 1 }} initial={{ y: 8, opacity: 0.7 }}>
                <div style={{ color: 'var(--white)', fontFamily: 'var(--font-playfair), serif', fontSize: '1.05rem', fontStyle: 'italic' }}>{item.label}</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{item.sublabel}</div>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="container" style={{ marginTop: 14 }}>
        {hintVisible && <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Arraste para explorar →</div>}
        <div style={{ marginTop: 12, height: 1, background: 'rgba(255,255,255,0.15)' }}>
          <motion.div style={{ height: '100%', background: 'var(--gold)' }} animate={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}
