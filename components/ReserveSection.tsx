'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'

type ReserveSectionProps = {
  onOpenFullReservation: () => void
}

function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function ReserveSection({ onOpenFullReservation }: ReserveSectionProps) {
  const { t } = useLang()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('11h30')
  const [pessoasIdx, setPessoasIdx] = useState(1)
  const [whatsapp, setWhatsapp] = useState('')
  const [preferenciaMesa, setPreferenciaMesa] = useState<string>(() => t.reserve.tablePrefOptions[0])
  const [observacoes, setObservacoes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    setPreferenciaMesa((prev) => {
      const opts = t.reserve.tablePrefOptions
      return opts.includes(prev) ? prev : opts[0]
    })
  }, [t])

  useEffect(() => {
    setPessoasIdx((i) => Math.min(i, Math.max(0, t.reserve.peopleOptions.length - 1)))
  }, [t])

  const pessoas = t.reserve.peopleOptions[pessoasIdx] ?? t.reserve.peopleOptions[0]

  const handleSubmit = async () => {
    if (!nome.trim() || !data || !whatsapp.trim() || !isValidEmail(email)) {
      alert(t.reserve.validationAlert)
      return
    }
    setIsSending(true)
    try {
      await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          data,
          horario: hora,
          pessoas,
          preferencias: [preferenciaMesa],
          restricoes: observacoes ? [observacoes] : [],
          ocasiao: observacoes.toLowerCase().includes('anivers') || observacoes.toLowerCase().includes('especial')
            ? 'special_occasion'
            : undefined,
        }),
      })
    } catch {
      /* fluxo segue para o WhatsApp */
    }
    setIsSending(false)
    const msg = encodeURIComponent(
      `*Reserva — O Pharol*\n\n` +
      `👤 Nome: ${nome}\n` +
      `📧 E-mail: ${email.trim()}\n` +
      `📅 Data: ${data}\n` +
      `🕐 Horário: ${hora}\n` +
      `👥 Pessoas: ${pessoas}\n` +
      `🪑 Mesa: ${preferenciaMesa}\n` +
      `📱 WhatsApp: ${whatsapp}\n` +
      (observacoes ? `\n📝 Obs: ${observacoes}` : '') +
      `\n\n✨ Para personalizar seu prato, acesse sua área do cliente em: https://o-pharol.vercel.app`
    )
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', marginTop: 8,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--white)', padding: '12px 16px',
    fontSize: '0.88rem',
  }
  const labelStyle: React.CSSProperties = {
    color: 'var(--gold)', fontSize: '0.58rem',
    letterSpacing: '0.2em', textTransform: 'uppercase',
    fontFamily: 'var(--font-montserrat), sans-serif',
  }

  return (
    <section id="reserve-section" className="section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="section-header">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>{t.reserve.label}</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>{t.reserve.heading} <em style={{ color: 'var(--gold)' }}>{t.reserve.headingEm}</em></h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.reserve.sub}</p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '3rem', color: 'var(--gold)', marginBottom: 16 }}>{t.reserve.successTitle}</div>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginBottom: 24 }}>
                {t.reserve.successMsg}
              </p>
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '20px 28px', marginBottom: 28, textAlign: 'left' }}>
                <div style={{ color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--font-montserrat), sans-serif' }}>{t.reserve.nextStepLabel}</div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>
                  {t.reserve.nextStepText}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={onOpenFullReservation}>{t.reserve.clientAreaBtn}</button>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>{t.reserve.newReserveBtn}</button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="reserve-form-wrap" style={{ marginTop: 42, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: 48, textAlign: 'left' }}>
              <div className="reserve-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }}>
                <div><label style={labelStyle}>{t.reserve.fields.name}</label><input value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>{t.reserve.fields.email}</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder={t.reserve.emailPlaceholder} /></div>
                <div><label style={labelStyle}>{t.reserve.fields.date}</label><input type="date" value={data} onChange={(e) => setData(e.target.value)} style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>{t.reserve.fields.time}</label>
                  <select value={hora} onChange={(e) => setHora(e.target.value)} style={inputStyle}>
                    {['11h30','12h00','12h30','13h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t.reserve.fields.people}</label>
                  <select value={pessoasIdx} onChange={(e) => setPessoasIdx(Number(e.target.value))} style={inputStyle}>
                    {t.reserve.peopleOptions.map((label, i) => <option key={label} value={i}>{label}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>{t.reserve.fields.whatsapp}</label><input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>{t.reserve.fields.tablePref}</label>
                  <select value={preferenciaMesa} onChange={(e) => setPreferenciaMesa(e.target.value)} style={inputStyle}>
                    {t.reserve.tablePrefOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{t.reserve.fields.obs}</label>
                  <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} style={{ ...inputStyle, minHeight: 80 }} />
                </div>
              </div>

              <div className="reserve-form-actions" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>{t.reserve.groupWarning}</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={handleSubmit} className="btn-primary" disabled={isSending}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                    {isSending ? t.reserve.sendingBtn : t.reserve.sendBtn}
                  </button>
                  <button onClick={onOpenFullReservation} className="btn-secondary">{t.reserve.fullReserveBtn}</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
