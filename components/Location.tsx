'use client'

import { motion } from 'framer-motion'

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.1 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.97a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const schedule = [
  { day: 'Segunda a Domingo', time: '11h30 — 00h30' },
  { day: 'Sábados', time: 'Buffet de Feijoada' },
  { day: 'Domingos', time: 'Buffet Frutos do Mar' },
]

const contacts = [
  { Icon: PhoneIcon, href: 'tel:+554733673800', label: '(47) 3367-3800' },
  { Icon: MailIcon, href: 'mailto:opharol@opharol.com.br', label: 'opharol@opharol.com.br' },
  { Icon: InstagramIcon, href: 'https://instagram.com/opharolbc.oficial', label: '@opharolbc.oficial', target: '_blank' },
]

export default function Location() {
  return (
    <section id="location" className="section" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 56, maxWidth: 520 }}
        >
          <span className="section-label">Como nos encontrar</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>
            No coração da{' '}
            <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Av. Atlântica</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-mid)' }}>Balneário Camboriú — SC</span>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="location-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 48, alignItems: 'start' }}>

          {/* ── Info card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
              {/* Gold top accent */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

              <div style={{ padding: '32px 36px' }}>
                {/* Address block */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 14, letterSpacing: '0.02em' }}>
                    O Pharol Restaurante Gourmet
                  </div>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.65)' }}>
                    Avenida Atlântica, 2554 — Sala 01<br />
                    Esquina com Rua 2000 · Centro<br />
                    Balneário Camboriú — SC · CEP 88330-906
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', marginBottom: 22 }} />

                {/* Schedule */}
                <div style={{ marginBottom: 26 }}>
                  <div style={{ fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Horário de Funcionamento
                  </div>
                  {schedule.map(({ day, time }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-montserrat), sans-serif' }}>{day}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 500 }}>{time}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', marginBottom: 22 }} />

                {/* Contacts */}
                <div style={{ display: 'grid', gap: 10 }}>
                  {contacts.map(({ Icon, href, label, target }) => (
                    <a key={label} href={href} target={target as '_blank' | undefined}
                      rel={target ? 'noreferrer' : undefined}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.56)', fontSize: '0.82rem', transition: 'color 0.25s', fontFamily: 'var(--font-montserrat), sans-serif' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.56)')}
                    >
                      <span style={{ color: 'var(--gold)', opacity: 0.7 }}><Icon /></span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href={`https://wa.me/554733673800?text=${encodeURIComponent('Olá! Gostaria de fazer uma reserva no O Pharol.')}`}
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.01 }}
              style={{
                marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: 'rgba(37,211,102,0.09)', border: '1px solid rgba(37,211,102,0.28)',
                color: 'rgba(37,211,102,0.85)', padding: '14px 24px',
                fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.15)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.09)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.28)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/>
              </svg>
              Reservar via WhatsApp
            </motion.a>
          </motion.div>

          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ position: 'relative' }}
          >
            {/* Decorative frame */}
            <div className="location-map-deco" style={{ position: 'absolute', top: -14, right: -14, bottom: 14, left: 14, border: '1px solid rgba(201,168,76,0.2)', zIndex: 0, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '12px 20px 60px rgba(13,24,56,0.15)' }}>
              {/* Gold top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))', zIndex: 2 }} />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.312!2d-48.63847!3d-26.9947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8e68e0f1c5e0b%3A0xa8c5c5c5c5c5c5c5!2sAv.+Atl%C3%A2ntica%2C+2554+-+Centro%2C+Balne%C3%A1rio+Cambori%C3%BA+-+SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05) brightness(0.96)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização O Pharol"
              />
            </div>

            {/* Caption bar */}
            <div style={{ background: 'var(--navy)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Av. Atlântica, 2554 · Balneário Camboriú
              </span>
              <a href="https://maps.google.com/?q=Av+Atlântica+2554+Balneário+Camboriú" target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gold)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Abrir no Maps
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
