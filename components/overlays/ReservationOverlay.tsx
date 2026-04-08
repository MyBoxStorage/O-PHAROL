'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { menuTabs } from '@/lib/menuData'

const OPTIN_KEY = 'opharol_optin_v1'

type ReservationOverlayProps = {
  open: boolean
  onClose: () => void
  onClientArea?: (prefill?: { email: string; nome: string }) => void
}

const prefOptions = [
  ['Varanda com vista', 'Frente para a Av. Atlântica'],
  ['Salão climatizado', 'Ambiente interno confortável'],
  ['Mesa reservada', 'Mais privacidade'],
  ['Ocasião especial', 'Aniversário, pedido, etc.'],
]
const restrictions = ['Alergia a frutos do mar', 'Sem glúten', 'Sem lactose', 'Vegetariano']
function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

export default function ReservationOverlay({ open, onClose, onClientArea }: ReservationOverlayProps) {
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
  const [optinAlreadyAccepted, setOptinAlreadyAccepted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    setOptinAlreadyAccepted(localStorage.getItem(OPTIN_KEY) === 'true')
  }, [])

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(1); setSelectedDate(0); setSelectedTime('11h30'); setSelectedPeople('2')
        setCat('frutos'); setQtyMap({}); setSelectedPrefs([]); setSelectedRestrictions([])
        setNome(''); setEmail(''); setWhatsapp(''); setOptinParceiros(false)
        setIsSending(false); setConfirmed(false)
      }, 450)
      return () => clearTimeout(t)
    }
  }, [open])

  const dates = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const today = new Date()
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today); d.setDate(today.getDate() + i)
      return { idx: i, day: days[d.getDay()], num: d.getDate() }
    })
  }, [])

  const categories = { frutos: ['frutos', 'camarao'], peixes: ['peixes'], carnes: ['bovinos', 'aves'], massas: ['massas'] }
  const preItems = menuTabs.filter(t => categories[cat].includes(t.id)).flatMap(t => t.sections.flatMap(s => s.items)).slice(0, 8)
  const times = ['11h30','12h00','12h30','13h00','13h30','14h00','14h30','15h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00','22h30']

  const handleConfirm = async () => {
    if (!nome.trim() || !isValidEmail(email)) return
    setIsSending(true)
    if (optinParceiros) localStorage.setItem(OPTIN_KEY, 'true')
    try {
      await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(), email: email.trim(), whatsapp: whatsapp.trim(),
          data: `${dates[selectedDate]?.day} ${dates[selectedDate]?.num}`,
          horario: selectedTime, pessoas: selectedPeople,
          preferencias: selectedPrefs, restricoes: selectedRestrictions,
          ocasiao: selectedPrefs.includes('Ocasião especial') ? 'special_occasion' : undefined,
          optinAccepted: optinParceiros || optinAlreadyAccepted,
        }),
      })
    } catch {}
    setIsSending(false)
    setConfirmed(true)
  }

  const waMsg = encodeURIComponent(
    `*Reserva — O Pharol*\n\n` +
    `👤 ${nome.trim()}\n📧 ${email.trim()}\n` +
    (whatsapp.trim() ? `📱 ${whatsapp.trim()}\n` : '') +
    `📅 ${dates[selectedDate]?.day} ${dates[selectedDate]?.num} · ${selectedTime} · ${selectedPeople} pessoas` +
    (selectedPrefs.length ? `\n🪑 ${selectedPrefs.join(', ')}` : '') +
    (selectedRestrictions.length ? `\n⚠️ ${selectedRestrictions.join(', ')}` : '')
  )

  const inp = { width: '100%', border: '1px solid var(--cream-dark)', padding: '10px 12px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' as const }
  const lbl = { display: 'block' as const, fontSize: '0.62rem', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 6, letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5, ease: 'easeInOut' }} style={{ background: 'var(--cream)', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', background: 'var(--cream)' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Reservar Mesa — O Pharol</div>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 960, paddingBlock: 28 }}>
            {/* ── Step indicator ── */}
            {!confirmed && (
              <div className="reservation-step-indicator" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 24, gap: 8 }}>
                {[1,2,3,4].map(n => {
                  const done = step > n; const active = step === n
                  return (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', border: done||active?'none':'1px solid var(--cream-dark)', background: done?'var(--gold)':active?'var(--navy)':'transparent', color: done||active?'white':'var(--text-light)', fontSize: '0.8rem' }}>{done?'✓':n}</div>
                      <span style={{ fontSize: '0.74rem', color: active?'var(--navy)':'var(--text-light)' }}>{['Data & Hora','Preferências','Pré-seleção','Confirmação'][n-1]}</span>
                    </div>
                  )
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={confirmed?'success':step} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.35 }}>

                {/* ── TELA DE SUCESSO ── */}
                {confirmed && (
                  <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
                    <motion.svg width="72" height="72" viewBox="0 0 120 120" initial="hidden" animate="visible" style={{ display: 'block', margin: '0 auto 20px' }}>
                      <motion.circle cx="60" cy="60" r="52" stroke="var(--gold)" strokeWidth="3" fill="none" variants={{ hidden:{ pathLength:0 }, visible:{ pathLength:1, transition:{ duration:0.7 } } }} />
                      <motion.path d="M35 63 L52 80 L86 45" stroke="var(--gold)" strokeWidth="4" fill="none" variants={{ hidden:{ pathLength:0 }, visible:{ pathLength:1, transition:{ duration:0.6, delay:0.4 } } }} />
                    </motion.svg>
                    <h3 style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.8rem', margin: '0 0 6px' }}>Reserva Registrada!</h3>
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.1rem', marginBottom: 8 }}>
                      {dates[selectedDate]?.day} {dates[selectedDate]?.num} · {selectedTime} · {selectedPeople} {selectedPeople === '1' ? 'pessoa' : 'pessoas'}
                    </p>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '20px 0' }} />

                    {/* CTA — Área do Cliente */}
                    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24, marginBottom: 16, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 36, height: 36, background: 'var(--navy)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.05rem' }}>Complete sua experiência</div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem', color: 'var(--text-mid)', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 16px' }}>
                        Na Área do Cliente você personaliza seu prato — ponto da carne, preparo das massas e observações especiais vão direto para a cozinha antes da sua chegada.
                      </p>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button
                          className="btn-primary"
                          style={{ flex: 1, minWidth: 160 }}
                          onClick={() => onClientArea?.({ email: email.trim(), nome: nome.trim() }) ?? onClose()}
                        >
                          Criar conta · completar experiência
                        </button>
                        <button
                          onClick={() => onClientArea?.({ email: email.trim(), nome: nome.trim() })}
                          style={{
                            flex: 1, minWidth: 120, background: 'transparent',
                            border: '1px solid var(--cream-dark)', color: 'var(--text-mid)',
                            padding: '10px 16px', cursor: 'pointer', fontSize: '0.62rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            fontFamily: 'var(--font-montserrat), sans-serif',
                          }}
                        >
                          Já tenho conta · entrar
                        </button>
                      </div>
                    </div>

                    {/* Botão WhatsApp opcional */}
                    <a href={`https://wa.me/554733673800?text=${waMsg}`} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: 'rgba(37,211,102,0.85)', padding: '12px 20px', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600, textDecoration: 'none', marginBottom: 10 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                      Confirmar pelo WhatsApp
                    </a>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', lineHeight: 1.5 }}>Nossa equipe entrará em contato para confirmar sua mesa.</p>
                  </div>
                )}

                {/* ── STEPS ── */}
                {!confirmed && step === 1 && (
                  <>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }}>Selecione a data</div>
                      <div className="reservation-dates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
                        {dates.map(d => (
                          <button key={d.idx} onClick={() => setSelectedDate(d.idx)} style={{ border: '1px solid var(--cream-dark)', background: selectedDate===d.idx?'var(--navy)':'white', color: selectedDate===d.idx?'white':'var(--text-dark)', padding: 10, cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.64rem' }}>{d.day}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{d.num}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }}>Selecione o horário</div>
                      <div className="reservation-times-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {times.map(time => {
                          const unavailable = ['14h30','15h00','22h30'].includes(time)
                          return <button key={time} disabled={unavailable} onClick={() => setSelectedTime(time)} style={{ border: '1px solid var(--cream-dark)', padding: 10, background: selectedTime===time?'var(--navy)':'white', color: selectedTime===time?'white':'var(--text-dark)', opacity: unavailable?0.3:1, textDecoration: unavailable?'line-through':'none', cursor: unavailable?'not-allowed':'pointer' }}>{time}</button>
                        })}
                      </div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 12, color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }}>Número de pessoas</div>
                      <div className="reservation-people-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {['1','2','3','4','5','6','7','8+'].map(p => <button key={p} onClick={() => setSelectedPeople(p)} style={{ border: '1px solid var(--cream-dark)', padding: 10, background: selectedPeople===p?'var(--navy)':'white', color: selectedPeople===p?'white':'var(--text-dark)', cursor: 'pointer' }}>{p}</button>)}
                      </div>
                    </div>
                  </>
                )}

                {!confirmed && step === 2 && (
                  <>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ marginBottom: 14, color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }}>Preferência de assento</div>
                      <div className="reservation-prefs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {prefOptions.map(item => <ToggleCard key={item[0]} title={item[0]} subtitle={item[1]} onToggle={on => setSelectedPrefs(prev => on?[...prev,item[0]]:prev.filter(v=>v!==item[0]))} />)}
                      </div>
                    </div>
                    <div>
                      <div style={{ marginBottom: 14, color: 'var(--gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-montserrat), sans-serif' }}>Restrições alimentares</div>
                      <div className="reservation-prefs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {restrictions.map(item => <ToggleCard key={item} title={item} onToggle={on => setSelectedRestrictions(prev => on?[...prev,item]:prev.filter(v=>v!==item))} />)}
                      </div>
                    </div>
                  </>
                )}

                {!confirmed && step === 3 && (
                  <>
                    {/* Badge OPCIONAL */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 14px', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600 }}>Completamente opcional</div>
                      <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '0.95rem' }}>Pré-selecione pratos para agilizar seu atendimento</span>
                    </div>
                    <div style={{ background: 'rgba(27,43,107,0.04)', border: '1px solid var(--cream-dark)', padding: 12, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-mid)', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
                      A pré-seleção <strong style={{ fontStyle: 'normal', color: 'var(--navy)' }}>não conclui seu pedido</strong> — você fará o pedido completo na mesa, como sempre. Isso apenas ajuda a cozinha a se preparar.
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                      {(['frutos','peixes','carnes','massas'] as const).map(c => (
                        <button key={c} onClick={() => setCat(c)} style={{ border: '1px solid var(--cream-dark)', padding: '8px 14px', background: cat===c?'var(--navy)':'white', color: cat===c?'white':'var(--text-dark)', cursor: 'pointer' }}>
                          {c==='frutos'?'Frutos do Mar':c==='peixes'?'Peixes':c==='carnes'?'Carnes':'Massas'}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {preItems.map(item => {
                        const key = `${item.num}-${item.name}`; const qty = qtyMap[key]||0
                        return (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--cream-dark)', padding: '12px 14px', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{item.name}</div>
                              <div style={{ color: 'var(--red-dark)', fontSize: '0.9rem' }}>{item.price}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <button onClick={() => setQtyMap(p=>({...p,[key]:Math.max(0,qty-1)}))} style={{ width: 28, height: 28, border: '1px solid var(--cream-dark)', background: 'white', cursor: 'pointer' }}>−</button>
                              <strong style={{ minWidth: 16, textAlign: 'center' }}>{qty}</strong>
                              <button onClick={() => setQtyMap(p=>({...p,[key]:qty+1}))} style={{ width: 28, height: 28, border: '1px solid var(--cream-dark)', background: 'white', cursor: 'pointer' }}>+</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {!confirmed && step === 4 && (
                  <div className="reservation-step4-form" style={{ maxWidth: 480, margin: '0 auto' }}>
                    <motion.svg width="72" height="72" viewBox="0 0 120 120" initial="hidden" animate="visible" style={{ display: 'block', margin: '0 auto 20px' }}>
                      <motion.circle cx="60" cy="60" r="52" stroke="var(--gold)" strokeWidth="3" fill="none" variants={{ hidden:{pathLength:0}, visible:{pathLength:1,transition:{duration:0.7}} }} />
                      <motion.path d="M35 63 L52 80 L86 45" stroke="var(--gold)" strokeWidth="4" fill="none" variants={{ hidden:{pathLength:0}, visible:{pathLength:1,transition:{duration:0.6,delay:0.3}} }} />
                    </motion.svg>
                    <h3 style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.6rem', textAlign: 'center', margin: '0 0 4px' }}>Quase lá!</h3>
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'var(--text-mid)', textAlign: 'center', marginBottom: 24 }}>Confirme seus dados para registrar a reserva.</p>

                    <div style={{ display: 'grid', gap: 14 }}>
                      <div><label style={lbl}>Seu nome <span style={{ color:'var(--red-dark)' }}>*</span></label><input type="text" value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome completo" style={inp} /></div>
                      <div><label style={lbl}>E-mail <span style={{ color:'var(--red-dark)' }}>*</span></label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" style={inp} /></div>
                      <div><label style={lbl}>WhatsApp</label><input type="tel" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="+55 47 9xxxx-xxxx" style={inp} /></div>

                      {!optinAlreadyAccepted && (
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '14px 16px', border: `1px solid ${optinParceiros?'var(--gold)':'rgba(201,168,76,0.25)'}`, background: optinParceiros?'rgba(201,168,76,0.06)':'transparent', transition: 'all 0.25s' }}>
                          <div style={{ width: 18, height: 18, border: `2px solid ${optinParceiros?'var(--gold)':'rgba(201,168,76,0.4)'}`, background: optinParceiros?'var(--gold)':'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'all 0.2s', cursor: 'pointer' }} onClick={()=>setOptinParceiros(v=>!v)}>
                            {optinParceiros && <svg width="10" height="8" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="var(--navy-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                            <strong style={{ color:'var(--navy)', display:'block', marginBottom: 3 }}>🎁 Quero participar dos sorteios semanais</strong>
                            e receber ofertas exclusivas dos parceiros d&apos;O Pharol em Balneário Camboriú.{' '}
                            <span style={{ color:'var(--text-light)', display:'block', marginTop:4, fontSize:'0.68rem' }}>Opcional. Autorizo o compartilhamento do meu perfil com parceiros para promoções personalizadas. Revogável a qualquer momento. LGPD — Lei 13.709/2018.</span>
                          </span>
                        </label>
                      )}

                      <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.5 }}>
                        Ao confirmar, você concorda com nossa <a href="/privacidade" style={{ color:'var(--navy)', textDecoration:'underline' }}>política de privacidade</a>. Seus dados são usados apenas para confirmação da reserva.
                      </p>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button className="btn-primary" disabled={!nome.trim()||!isValidEmail(email)||isSending} onClick={handleConfirm} style={{ flex:1, opacity:!nome.trim()||!isValidEmail(email)||isSending?0.6:1, cursor:!nome.trim()||!isValidEmail(email)||isSending?'not-allowed':'pointer' }}>
                          {isSending?'Aguarde…':'Confirmar Reserva'}
                        </button>
                        <button className="btn-secondary" onClick={onClose} style={{ color:'var(--navy)', borderColor:'var(--cream-dark)' }}>Fechar</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!confirmed && step < 4 && (
            <div style={{ position: 'sticky', bottom: 0, background: 'var(--cream)', borderTop: '1px solid var(--cream-dark)', padding: 16, display: 'flex', justifyContent: 'space-between', gap: 12, zIndex: 2 }}>
              <button onClick={() => setStep(p=>Math.max(1,p-1))} style={{ border: '1px solid var(--cream-dark)', background: 'white', padding: '12px 20px', cursor: 'pointer', minHeight: 44, minWidth: 80 }}>Voltar</button>
              <button onClick={() => setStep(p=>Math.min(4,p+1))} style={{ border: 'none', background: 'var(--navy)', color: 'white', padding: '12px 20px', cursor: 'pointer', minHeight: 44, flex: 1 }}>Próximo</button>
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
    <button onClick={() => { const next=!on; setOn(next); onToggle?.(next) }} style={{ textAlign: 'left', border: `1px solid ${on?'var(--navy)':'var(--cream-dark)'}`, background: on?'rgba(27,43,107,0.04)':'white', padding: 14, cursor: 'pointer' }}>
      <strong style={{ display: 'block', color: 'var(--navy)' }}>{title}</strong>
      {subtitle && <small style={{ color: 'var(--text-mid)' }}>{subtitle}</small>}
    </button>
  )
}
