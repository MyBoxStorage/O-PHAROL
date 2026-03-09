'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type ClientOverlayProps = { open: boolean; onClose: () => void }

/* ─── Sub-components ─── */

function ReservCard({ title, subtitle, status, type, onCancel }: {
  title: string; subtitle: string; status: string;
  type: 'confirmed' | 'pending' | 'cancelled'; onCancel?: () => void
}) {
  const colors = {
    confirmed: { bg: 'rgba(27,43,107,0.1)', color: 'var(--navy)' },
    pending: { bg: 'rgba(201,168,76,0.25)', color: 'var(--gold-dark)' },
    cancelled: { bg: 'rgba(200,16,46,0.15)', color: 'var(--red-dark)' }
  }
  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', marginBottom: 4 }}>{title}</div>
          <div style={{ color: 'var(--text-mid)', fontSize: '0.85rem' }}>{subtitle}</div>
        </div>
        <span style={{ alignSelf: 'start', background: colors[type].bg, color: colors[type].color, padding: '5px 10px', fontSize: '0.7rem', flexShrink: 0 }}>{status}</span>
      </div>
      {type !== 'cancelled' && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid var(--cream-dark)', color: 'var(--navy)', padding: '6px 14px', cursor: 'pointer' }}>Editar Preferências</button>
          {onCancel && <button onClick={onCancel} style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(200,16,46,0.3)', color: 'var(--red)', padding: '6px 14px', cursor: 'pointer' }}>Cancelar</button>}
        </div>
      )}
    </div>
  )
}

function HistoryRow({ date, points, occasion }: { date: string; points: number; occasion: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
      <div>
        <div style={{ color: 'var(--navy)', fontWeight: 500, marginBottom: 3 }}>{date}</div>
        <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{occasion}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '1.3rem', lineHeight: 1 }}>+{points}</div>
        <div style={{ color: 'var(--text-light)', fontSize: '0.68rem' }}>pontos</div>
      </div>
    </div>
  )
}

function NewReserveForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'form' | 'prefs'>('form')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('20h00')
  const [pessoas, setPessoas] = useState('2 pessoas')
  const [mesa, setMesa] = useState('Varanda (vista para o mar)')
  const [pontoCarne, setPontoCarne] = useState('Ao ponto')
  const [massas, setMassas] = useState('Al dente')
  const [obs, setObs] = useState('')
  const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid var(--cream-dark)', background: 'white', marginTop: 6, fontSize: '0.9rem' }
  const lbl: React.CSSProperties = { fontSize: '0.58rem', color: 'var(--gold)', textTransform: 'uppercase' as const, letterSpacing: '0.18em', fontFamily: 'var(--font-montserrat), sans-serif' }
  const handleSubmit = () => {
    const msg = encodeURIComponent(`*Reserva — Área do Cliente*\n\n📅 ${data} · ${hora} · ${pessoas}\n🪑 ${mesa}\n🥩 Carne: ${pontoCarne} · Massa: ${massas}${obs ? `\n📝 ${obs}` : ''}`)
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    onBack()
  }
  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.2rem' }}>Nova Reserva</div>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.75rem' }}>← Voltar</button>
      </div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        {['Data & Mesa', 'Preferências'].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: 'center', paddingBottom: 10, borderBottom: `2px solid ${i === (step === 'form' ? 0 : 1) ? 'var(--gold)' : 'var(--cream-dark)'}`, fontSize: '0.6rem', textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: i === (step === 'form' ? 0 : 1) ? 'var(--navy)' : 'var(--text-light)' }}>{s}</div>
        ))}
      </div>
      {step === 'form' ? (
        <div style={{ display: 'grid', gap: 14 }}>
          <div><label style={lbl}>Data</label><input type="date" value={data} onChange={e => setData(e.target.value)} style={inp} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={lbl}>Horário</label><select value={hora} onChange={e => setHora(e.target.value)} style={inp}>{['11h30','12h00','13h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00'].map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label style={lbl}>Pessoas</label><select value={pessoas} onChange={e => setPessoas(e.target.value)} style={inp}>{['1 pessoa','2 pessoas','3 pessoas','4 pessoas','5 pessoas','6+ pessoas'].map(t => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div><label style={lbl}>Preferência de Mesa</label><select value={mesa} onChange={e => setMesa(e.target.value)} style={inp}>{['Varanda (vista para o mar)','Salão interno (climatizado)','Sem preferência'].map(t => <option key={t}>{t}</option>)}</select></div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 4 }} onClick={() => setStep('prefs')}>Próximo → Personalizar Prato</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', padding: '12px 16px', fontSize: '0.82rem', color: 'var(--text-mid)', fontStyle: 'italic' }}>✨ Como cliente cadastrado, sua cozinha já conhece seu perfil. Confirme ou ajuste:</div>
          <div><label style={lbl}>Ponto da Carne</label><select value={pontoCarne} onChange={e => setPontoCarne(e.target.value)} style={inp}>{['Mal passado','Ao ponto','Bem passado','Grelhado sem molho'].map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label style={lbl}>Ponto da Massa</label><select value={massas} onChange={e => setMassas(e.target.value)} style={inp}>{['Al dente','Bem cozida','Sem glúten (verificar disponibilidade)'].map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label style={lbl}>Observações para a cozinha</label><textarea value={obs} onChange={e => setObs(e.target.value)} style={{ ...inp, minHeight: 72 }} placeholder="Alergias, restrições, pedidos especiais..." /></div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep('form')} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--cream-dark)', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.12em' }}>← Voltar</button>
            <button className="btn-primary" style={{ flex: 2 }} onClick={handleSubmit}>Confirmar via WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  )
}

function QueueInline() {
  const [qScreen, setQScreen] = useState<'cta'|'waiting'>('cta')
  const [ahead] = useState(3)
  const myNumber = 7
  return (
    <div style={{ background: 'var(--navy-deep)', padding: 24, color: 'white' }}>
      <div style={{ fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 12 }}>Fila Virtual — Exclusivo Clientes</div>
      {qScreen === 'cta' && (
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', marginBottom: 8 }}>Prefere esperar sem sair de casa?</div>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Entre na fila virtual e receba aviso quando sua mesa estiver pronta. Benefício exclusivo para clientes cadastrados.</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>Espera hoje: ~25 min</span>
            </div>
            <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', padding: '8px 14px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>3 grupos à frente</div>
          </div>
          <button className="btn-primary" onClick={() => setQScreen('waiting')}>Entrar na Fila Agora</button>
        </div>
      )}
      {qScreen === 'waiting' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '4.5rem', color: 'var(--gold)', lineHeight: 1 }}>#{myNumber}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)' }}>Seu número</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2.5rem', lineHeight: 1 }}>{ahead}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>grupos à frente</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gold)', fontWeight: 600 }}>~{ahead * 8} min de espera</div>
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', marginBottom: 14 }}>
            <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))' }} animate={{ width: ['40%', '80%'] }} transition={{ duration: 45, ease: 'linear' }} />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Você será avisado por WhatsApp quando sua mesa estiver pronta.</p>
          <button onClick={() => setQScreen('cta')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '8px 20px', cursor: 'pointer', fontSize: '0.68rem', letterSpacing: '0.1em' }}>Sair da Fila</button>
        </motion.div>
      )}
    </div>
  )
}

export default function ClientOverlay({ open, onClose }: ClientOverlayProps) {
  const [screen, setScreen] = useState<'auth' | 'dashboard'>('auth')
  const [isRegister, setIsRegister] = useState(false)
  const [consentimento, setConsentimento] = useState(false)
  const [tab, setTab] = useState('reservas')
  const [rating, setRating] = useState(0)
  const [showNewReserve, setShowNewReserve] = useState(false)
  const totalPoints = 1240
  const nextLevel = 1500
  const inp: React.CSSProperties = { padding: '10px 14px', border: '1px solid var(--cream-dark)', width: '100%', background: 'white' }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.45 }} style={{ background: 'var(--cream)', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', background: 'var(--cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Área do Cliente</div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-light)' }}>✕</button>
          </div>
          <div className="container" style={{ maxWidth: 980, paddingBlock: 28 }}>
            {screen === 'auth' ? (
              <div style={{ maxWidth: 460, margin: '0 auto', background: 'white', border: '1px solid var(--cream-dark)', padding: 28 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Bem-vindo</h2>
                <p style={{ color: 'var(--text-mid)', marginBottom: 20 }}>Entre na sua conta O Pharol</p>
                <div style={{ display: 'grid', gap: 12 }}>
                  {isRegister && <input placeholder="Nome Completo" style={inp} />}
                  <input placeholder="E-mail" style={inp} />
                  {isRegister && <input placeholder="WhatsApp" style={inp} />}
                  {isRegister && <input placeholder="CPF" style={inp} />}
                  <input placeholder="Senha" type="password" style={inp} />
                </div>
                {isRegister && (
                  <div style={{ marginTop: 14, padding: '14px 16px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                    🎁 Ao criar sua conta, você poderá personalizar seus pratos, acompanhar pontos de fidelidade e participar dos sorteios semanais dos nossos parceiros.
                  </div>
                )}
                {/* ── Box de consentimento CRM — só aparece no cadastro ── */}
                {isRegister && (
                  <div
                    onClick={() => setConsentimento(v => !v)}
                    style={{
                      marginTop: 14, padding: '16px 18px', cursor: 'pointer',
                      background: consentimento ? 'rgba(201,168,76,0.08)' : 'rgba(27,43,107,0.03)',
                      border: `1px solid ${consentimento ? 'rgba(201,168,76,0.4)' : 'var(--cream-dark)'}`,
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, border: `2px solid ${consentimento ? 'var(--gold)' : 'var(--cream-dark)'}`,
                      background: consentimento ? 'var(--gold)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 2, transition: 'all 0.25s',
                    }}>
                      {consentimento && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="var(--navy-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: consentimento ? 'var(--gold-dark)' : 'var(--navy)', letterSpacing: '0.04em', marginBottom: 4 }}>
                        🎁 Quero experiências exclusivas e vantagens especiais
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-mid)', lineHeight: 1.55 }}>
                        Ao marcar, você permite que O Pharol compartilhe suas preferências com parceiros selecionados — e participa automaticamente dos{' '}
                        <strong style={{ color: 'var(--gold-dark)', fontStyle: 'normal' }}>sorteios semanais</strong>{' '}
                        com prêmios exclusivos dos nossos parceiros.
                      </div>
                    </div>
                  </div>
                )}
                <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => setScreen('dashboard')}>{isRegister ? 'Criar Conta' : 'Entrar'}</button>
                <p style={{ textAlign: 'center', color: 'var(--text-mid)', fontSize: '0.85rem', marginTop: 14 }}>
                  {isRegister ? 'Já tem conta? ' : 'Não tem conta? '}
                  <button onClick={() => setIsRegister(v => !v)} style={{ border: 'none', background: 'transparent', color: 'var(--navy)', cursor: 'pointer', fontWeight: 600 }}>{isRegister ? 'Entrar' : 'Cadastre-se'}</button>
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--navy)' }}>Olá, Carlos Andrade 👋</div>
                    <div style={{ color: 'var(--text-mid)', fontSize: '0.85rem' }}>Membro desde março de 2023 · Cliente Especial O Pharol</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', padding: '10px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '1.5rem', lineHeight: 1 }}>{totalPoints}</span>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>pts</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--cream-dark)', marginBottom: 24, overflowX: 'auto' }}>
                  {[{id:'reservas',label:'Reservas'},{id:'fila',label:'Fila Virtual'},{id:'historico',label:'Histórico'},{id:'fidelidade',label:'Fidelidade'},{id:'avaliacoes',label:'Avaliações'}].map(t => (
                    <button key={t.id} onClick={() => { setTab(t.id); setShowNewReserve(false) }} style={{ border: 'none', background: 'transparent', padding: '10px 16px', color: tab === t.id ? 'var(--navy)' : 'var(--text-light)', fontWeight: tab === t.id ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent', transition: 'all 0.2s' }}>{t.label}</button>
                  ))}
                </div>

                {tab === 'reservas' && (
                  <div>
                    {showNewReserve ? <NewReserveForm onBack={() => setShowNewReserve(false)} /> : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                          <div style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)' }}>Suas Reservas</div>
                          <button className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.6rem' }} onClick={() => setShowNewReserve(true)}>+ Nova Reserva</button>
                        </div>
                        <div style={{ display: 'grid', gap: 10 }}>
                          <ReservCard title="Sábado, 15 de Março de 2025" subtitle="20h00 · 4 pessoas · Varanda com vista para o mar" status="Confirmada" type="confirmed" />
                          <ReservCard title="Domingo, 22 de Março de 2025" subtitle="12h30 · 2 pessoas · Salão interno" status="Aguardando" type="pending" onCancel={() => {}} />
                        </div>
                      </>
                    )}
                  </div>
                )}
                {tab === 'fila' && <QueueInline />}
                {tab === 'historico' && (
                  <div>
                    <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', padding: '14px 18px', marginBottom: 16, fontSize: '0.8rem', color: 'var(--text-mid)' }}>
                      Cada visita vale pontos acumulados pelo valor consumido. Use os pontos para resgatar benefícios exclusivos.
                    </div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <HistoryRow date="14 FEV 2025 · 20h30 · Jantar" points={89} occasion="Janta a dois — Jantar Especial" />
                      <HistoryRow date="08 JAN 2025 · 13h00 · Almoço" points={42} occasion="Almoço de domingo em família" />
                      <HistoryRow date="31 DEZ 2024 · 21h00 · Réveillon" points={124} occasion="Réveillon — Mesa especial" />
                      <HistoryRow date="15 NOV 2024 · 20h00 · Jantar" points={65} occasion="Aniversário — Jantar celebração" />
                      <HistoryRow date="03 OUT 2024 · 12h30 · Almoço" points={38} occasion="Almoço executivo" />
                    </div>
                    <div style={{ marginTop: 14, padding: '12px 16px', background: 'var(--navy)', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total acumulado:</span>
                      <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-playfair), serif', fontSize: '1.1rem' }}>{totalPoints} pts</span>
                    </div>
                  </div>
                )}
                {tab === 'fidelidade' && (
                  <div style={{ display: 'grid', gap: 16 }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--navy-deep), var(--navy))', color: 'white', padding: 24 }}>
                      <div style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>O Pharol Fidelidade</div>
                      <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2.8rem', color: 'var(--gold)', lineHeight: 1 }}>{totalPoints}</div>
                      <div style={{ marginBottom: 14, color: 'rgba(255,255,255,0.6)' }}>pontos acumulados · faltam {nextLevel - totalPoints} para o próximo nível</div>
                      <div style={{ height: 8, background: 'rgba(255,255,255,0.15)' }}>
                        <motion.div animate={{ width: `${(totalPoints/nextLevel)*100}%` }} transition={{ duration: 1.2, delay: 0.3 }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))' }} />
                      </div>
                    </div>
                    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 20, display: 'grid', gap: 10 }}>
                      {[{pts:500,label:'Entrada para 1 pessoa',done:true},{pts:1000,label:'Sobremesa especial',done:true},{pts:1500,label:'Garrafa de vinho selecionado',done:false},{pts:3000,label:'Jantar para 2 pessoas',done:false},{pts:5000,label:'Experiência VIP — Chef\'s Table',done:false}].map(({pts,label,done}) => (
                        <div key={pts} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--cream-dark)', opacity: done ? 1 : 0.65 }}>
                          <div><div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{label}</div><div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{pts} pontos</div></div>
                          {done ? <span style={{ background: 'rgba(27,43,107,0.1)', color: 'var(--navy)', padding: '5px 12px', fontSize: '0.65rem' }}>Disponível</span> : <span style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>Faltam {pts - totalPoints} pts</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'avaliacoes' && (
                  <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24 }}>
                    <div style={{ color: 'var(--gold)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>Avalie sua última visita</div>
                    <div style={{ color: 'var(--text-mid)', marginBottom: 14, fontSize: '0.85rem' }}>14 de Fevereiro, 2025</div>
                    <div style={{ display: 'flex', gap: 8, fontSize: '2rem', marginBottom: 18 }}>
                      {Array.from({length:5}).map((_,i) => (
                        <button key={i} onClick={() => setRating(i+1)} style={{ border: 'none', background: 'transparent', color: i < rating ? 'var(--gold)' : 'var(--text-light)', cursor: 'pointer', fontSize: '1.8rem' }}>{i < rating ? '★' : '☆'}</button>
                      ))}
                    </div>
                    <textarea placeholder="Como foi sua experiência?" style={{ width: '100%', minHeight: 90, padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />
                    <button style={{ marginTop: 12, border: 'none', background: 'var(--navy)', color: 'white', padding: '10px 20px', cursor: 'pointer', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Enviar Avaliação</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
