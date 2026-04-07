'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { menuTabs } from '@/lib/menuData'

type ReservationOverlayProps = {
  open: boolean
  onClose: () => void
}

const prefOptions = [
  ['Varanda com vista', 'Frente para a Av. Atlântica'],
  ['Salão climatizado', 'Ambiente interno confortável'],
  ['Mesa reservada', 'Mais privacidade'],
  ['Ocasião especial', 'Aniversário, pedido, etc.'],
]

const restrictions = ['Alergia a frutos do mar', 'Sem glúten', 'Sem lactose', 'Vegetariano']

function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function ReservationOverlay({ open, onClose }: ReservationOverlayProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState('11h30')
  const [selectedPeople, setSelectedPeople] = useState('2')
  const [cat, setCat] = useState<'frutos' | 'peixes' | 'carnes' | 'massas'>('frutos')
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({})
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([])
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [optinParceiros, setOptinParceiros] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Reseta todo o estado quando o overlay fecha
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(1)
        setSelectedDate(0)
        setSelectedTime('11h30')
        setSelectedPeople('2')
        setCat('frutos')
        setQtyMap({})
        setSelectedPrefs([])
        setSelectedRestrictions([])
        setNome('')
        setEmail('')
        setWhatsapp('')
        setOptinParceiros(false)
        setIsSending(false)
      }, 450) // após a animação de saída
      return () => clearTimeout(t)
    }
  }, [open])

  const dates = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const today = new Date()
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      return { idx: i, day: days[d.getDay()], num: d.getDate() }
    })
  }, [])

  const categories = {
    frutos: ['frutos', 'camarao'],
    peixes: ['peixes'],
    carnes: ['bovinos', 'aves'],
    massas: ['massas'],
  }

  const preItems = menuTabs
    .filter((tab) => categories[cat].includes(tab.id))
    .flatMap((tab) => tab.sections.flatMap((section) => section.items))
    .slice(0, 8)

  const times = ['11h30', '12h00', '12h30', '13h00', '13h30', '14h00', '14h30', '15h00', '19h00', '19h30', '20h00', '20h30', '21h00', '21h30', '22h00', '22h30']

  const handleConfirm = async () => {
    if (!nome.trim() || !isValidEmail(email)) return

    setIsSending(true)

    const isSpecialOccasion = selectedPrefs.includes('Ocasião especial')

    try {
      await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          data: `${dates[selectedDate]?.day} ${dates[selectedDate]?.num}`,
          horario: selectedTime,
          pessoas: selectedPeople,
          preferencias: selectedPrefs,
          restricoes: selectedRestrictions,
          ocasiao: isSpecialOccasion ? 'special_occasion' : undefined,
          optinAccepted: optinParceiros,
        }),
      })
    } catch {
      // Silencioso — não impede o fluxo via WhatsApp
    }

    setIsSending(false)

    const dateInfo = dates[selectedDate]
    const msg = encodeURIComponent(
      `*Reserva — O Pharol*\n\n` +
      `👤 Nome: ${nome.trim()}\n` +
      `📧 E-mail: ${email.trim()}\n` +
      (whatsapp.trim() ? `📱 WhatsApp: ${whatsapp.trim()}\n` : '') +
      `📅 Data: ${dateInfo?.day} ${dateInfo?.num}\n` +
      `🕐 Horário: ${selectedTime}\n` +
      `👥 Pessoas: ${selectedPeople}` +
      (selectedPrefs.length ? `\n🪑 Preferências: ${selectedPrefs.join(', ')}` : '') +
      (selectedRestrictions.length ? `\n⚠️ Restrições: ${selectedRestrictions.join(', ')}` : '')
    )
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5, ease: 'easeInOut' }} style={{ background: 'var(--cream)', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', background: 'var(--cream)' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Reservar Mesa — O Pharol</div>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 960, paddingBlock: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 24, gap: 8 }}>
              {[1, 2, 3, 4].map((n) => {
                const done = step > n
                const active = step === n
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', border: done || active ? 'none' : '1px solid var(--cream-dark)', background: done ? 'var(--gold)' : active ? 'var(--navy)' : 'transparent', color: done || active ? 'white' : 'var(--text-light)', fontSize: '0.8rem' }}>{done ? '✓' : n}</div>
                    <span style={{ fontSize: '0.74rem' }}>{['Data & Hora', 'Preferências', 'Pré-seleção', 'Confirmação'][n - 1]}</span>
                  </div>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.35 }}>
                {step === 1 && (
                  <>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--text-mid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Selecione a data</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
                        {dates.map((d) => (
                          <button key={d.idx} onClick={() => setSelectedDate(d.idx)} style={{ border: '1px solid var(--cream-dark)', background: selectedDate === d.idx ? 'var(--navy)' : 'white', color: selectedDate === d.idx ? 'white' : 'var(--text-dark)', padding: 10, cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.64rem' }}>{d.day}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{d.num}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--text-mid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Selecione o horário</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {times.map((time) => {
                          const unavailable = ['14h30', '15h00', '22h30'].includes(time)
                          return (
                            <button key={time} disabled={unavailable} onClick={() => setSelectedTime(time)} style={{ border: '1px solid var(--cream-dark)', padding: 10, background: selectedTime === time ? 'var(--navy)' : 'white', color: selectedTime === time ? 'white' : 'var(--text-dark)', opacity: unavailable ? 0.3 : 1, textDecoration: unavailable ? 'line-through' : 'none', cursor: unavailable ? 'not-allowed' : 'pointer' }}>
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--text-mid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Número de pessoas</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {['1', '2', '3', '4', '5', '6', '7', '8+'].map((p) => (
                          <button key={p} onClick={() => setSelectedPeople(p)} style={{ border: '1px solid var(--cream-dark)', padding: 10, background: selectedPeople === p ? 'var(--navy)' : 'white', color: selectedPeople === p ? 'white' : 'var(--text-dark)' }}>{p}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ marginBottom: 14, textTransform: 'uppercase', fontSize: '0.72rem', color: 'var(--text-mid)' }}>Preferência de assento</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {prefOptions.map((item) => (
                          <ToggleCard
                            key={item[0]}
                            title={item[0]}
                            subtitle={item[1]}
                            onToggle={(on) => setSelectedPrefs(prev => on ? [...prev, item[0]] : prev.filter(v => v !== item[0]))}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ marginBottom: 14, textTransform: 'uppercase', fontSize: '0.72rem', color: 'var(--text-mid)' }}>Restrições alimentares</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {restrictions.map((item) => (
                          <ToggleCard
                            key={item}
                            title={item}
                            onToggle={(on) => setSelectedRestrictions(prev => on ? [...prev, item] : prev.filter(v => v !== item))}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div style={{ background: 'var(--cream-mid)', border: '1px solid var(--cream-dark)', padding: 14, marginBottom: 16, fontSize: '0.9rem' }}>
                      A pré-seleção de pratos <strong>não conclui seu pedido</strong> — ela serve para agilizar seu atendimento.
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                      {(['frutos', 'peixes', 'carnes', 'massas'] as const).map((c) => (
                        <button key={c} onClick={() => setCat(c)} style={{ border: '1px solid var(--cream-dark)', padding: '8px 14px', background: cat === c ? 'var(--navy)' : 'white', color: cat === c ? 'white' : 'var(--text-dark)' }}>
                          {c === 'frutos' ? 'Frutos do Mar' : c === 'peixes' ? 'Peixes' : c === 'carnes' ? 'Carnes' : 'Massas'}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {preItems.map((item) => {
                        const key = `${item.num}-${item.name}`
                        const qty = qtyMap[key] || 0
                        return (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--cream-dark)', padding: '12px 14px', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{item.name}</div>
                              <div style={{ color: 'var(--red-dark)', fontSize: '0.9rem' }}>{item.price}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <button onClick={() => setQtyMap((prev) => ({ ...prev, [key]: Math.max(0, qty - 1) }))}>−</button>
                              <strong>{qty}</strong>
                              <button onClick={() => setQtyMap((prev) => ({ ...prev, [key]: qty + 1 }))}>+</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div style={{ maxWidth: 480, margin: '0 auto' }}>
                    <motion.svg width="80" height="80" viewBox="0 0 120 120" initial="hidden" animate="visible" style={{ display: 'block', margin: '0 auto 20px' }}>
                      <motion.circle cx="60" cy="60" r="52" stroke="var(--gold)" strokeWidth="3" fill="none"
                        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.7 } } }} />
                      <motion.path d="M35 63 L52 80 L86 45" stroke="var(--gold)" strokeWidth="4" fill="none"
                        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.6, delay: 0.3 } } }} />
                    </motion.svg>

                    <h3 style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.6rem', textAlign: 'center', marginBottom: 6 }}>Quase lá!</h3>
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1rem', textAlign: 'center', marginBottom: 24 }}>
                      Confirme seus dados para finalizar via WhatsApp.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 6, letterSpacing: '0.08em' }}>
                          Seu nome <span style={{ color: 'var(--red-dark)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Nome completo"
                          style={{ width: '100%', border: '1px solid var(--cream-dark)', padding: '10px 12px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 6, letterSpacing: '0.08em' }}>
                          E-mail <span style={{ color: 'var(--red-dark)' }}>*</span>{' '}
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>(obrigatório)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          style={{ width: '100%', border: '1px solid var(--cream-dark)', padding: '10px 12px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 6, letterSpacing: '0.08em' }}>
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+55 47 9xxxx-xxxx"
                          style={{ width: '100%', border: '1px solid var(--cream-dark)', padding: '10px 12px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', border: '1px solid var(--gold)', background: 'rgba(184,149,90,0.04)' }}>
                        <input
                          type="checkbox"
                          checked={optinParceiros}
                          onChange={e => setOptinParceiros(e.target.checked)}
                          style={{ marginTop: 2, flexShrink: 0, accentColor: 'var(--gold)', width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                          <strong style={{ color: 'var(--navy)' }}>🎁 Quero participar dos sorteios semanais</strong>{' '}
                          e receber ofertas exclusivas dos parceiros d'O Pharol em Balneário Camboriú.{' '}
                          <span style={{ color: 'var(--text-light)', display: 'block', marginTop: 4, fontSize: '0.68rem' }}>
                            Opcional. Autorizo o compartilhamento do meu perfil com parceiros para promoções personalizadas.
                            Revogável a qualquer momento. LGPD — Lei 13.709/2018.
                          </span>
                        </span>
                      </label>

                      <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.5 }}>
                        Ao confirmar, você concorda com nossa{' '}
                        <a href="/privacidade" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>política de privacidade</a>.
                        Seus dados são usados apenas para confirmação da reserva.
                      </p>

                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          className="btn-primary"
                          disabled={!nome.trim() || !isValidEmail(email) || isSending}
                          onClick={handleConfirm}
                          style={{ flex: 1, opacity: !nome.trim() || !isValidEmail(email) || isSending ? 0.6 : 1, cursor: !nome.trim() || !isValidEmail(email) || isSending ? 'not-allowed' : 'pointer' }}
                        >
                          {isSending ? 'Aguarde...' : 'Confirmar via WhatsApp'}
                        </button>
                        <button className="btn-secondary" onClick={onClose} style={{ color: 'var(--navy)', borderColor: 'var(--cream-dark)' }}>
                          Fechar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {step < 4 && (
            <div style={{ position: 'sticky', bottom: 0, background: 'var(--cream)', borderTop: '1px solid var(--cream-dark)', padding: 16, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
              <button onClick={() => setStep((prev) => Math.max(1, prev - 1))} style={{ border: '1px solid var(--cream-dark)', background: 'white', padding: '10px 16px' }}>Voltar</button>
              <button onClick={() => setStep((prev) => Math.min(4, prev + 1))} style={{ border: 'none', background: 'var(--navy)', color: 'white', padding: '10px 16px' }}>Próximo</button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ToggleCard({ title, subtitle, onToggle }: { title: string; subtitle?: string; onToggle?: (on: boolean) => void }) {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => {
        const next = !on
        setOn(next)
        onToggle?.(next)
      }}
      style={{ textAlign: 'left', border: `1px solid ${on ? 'var(--navy)' : 'var(--cream-dark)'}`, background: on ? 'rgba(27,43,107,0.04)' : 'white', padding: 14 }}
    >
      <strong style={{ display: 'block', color: 'var(--navy)' }}>{title}</strong>
      {subtitle && <small style={{ color: 'var(--text-mid)' }}>{subtitle}</small>}
    </button>
  )
}
