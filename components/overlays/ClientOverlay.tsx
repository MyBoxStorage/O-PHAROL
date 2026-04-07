'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type Reserva = {
  id: string; data: string; horario: string; pessoas: string
  mesa: string; observacoes: string | null
  status: 'pending' | 'confirmed' | 'cancelled'; created_at: string
}
type Avaliacao = {
  id: string; nota: number; comentario: string | null
  data_visita: string | null; created_at: string
}
type ClientOverlayProps = { open: boolean; onClose: () => void }

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

const QUEUE_KEY = 'opharol_fila_v1'
const inp: React.CSSProperties = {
  padding: '10px 14px', border: '1px solid var(--cream-dark)',
  width: '100%', background: 'white', fontFamily: 'inherit',
  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = {
  fontSize: '0.58rem', color: 'var(--gold)', textTransform: 'uppercase',
  letterSpacing: '0.18em', fontFamily: 'var(--font-montserrat), sans-serif',
}

/* ─── ReservCard ─── */
function ReservCard({ r, onCancel }: { r: Reserva; onCancel: (id: string) => void }) {
  const statusMap = {
    confirmed: { label: 'Confirmada', bg: 'rgba(27,43,107,0.1)',  color: 'var(--navy)' },
    pending:   { label: 'Aguardando', bg: 'rgba(201,168,76,0.22)', color: 'var(--gold-dark)' },
    cancelled: { label: 'Cancelada',  bg: 'rgba(200,16,46,0.15)',  color: 'var(--red-dark)' },
  }
  const s = statusMap[r.status]
  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: r.status !== 'cancelled' ? 10 : 0 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', color: r.status === 'cancelled' ? 'var(--text-light)' : 'var(--navy)', marginBottom: 4, textDecoration: r.status === 'cancelled' ? 'line-through' : 'none' }}>
            {r.data} · {r.horario}
          </div>
          <div style={{ color: 'var(--text-mid)', fontSize: '0.85rem' }}>{r.pessoas} · {r.mesa}</div>
          {r.observacoes && <div style={{ color: 'var(--text-light)', fontSize: '0.78rem', marginTop: 4 }}>{r.observacoes}</div>}
        </div>
        <span style={{ alignSelf: 'start', background: s.bg, color: s.color, padding: '5px 10px', fontSize: '0.7rem', flexShrink: 0 }}>{s.label}</span>
      </div>
      {r.status !== 'cancelled' && (
        <button onClick={() => onCancel(r.id)} style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(200,16,46,0.3)', color: 'var(--red-dark)', padding: '6px 14px', cursor: 'pointer' }}>
          Cancelar Reserva
        </button>
      )}
    </div>
  )
}

/* ─── NewReserveForm ─── */
function NewReserveForm({ userId, onCreated, onBack }: { userId: string; onCreated: () => void; onBack: () => void }) {
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('20h00')
  const [pessoas, setPessoas] = useState('2 pessoas')
  const [mesa, setMesa] = useState('Varanda (vista para o mar)')
  const [observacoes, setObs] = useState('')
  const [sending, setSending] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = async () => {
    if (!data) { setErro('Selecione uma data.'); return }
    setSending(true)
    const { error } = await supabase.from('reservas').insert({
      user_id: userId, data, horario, pessoas, mesa,
      observacoes: observacoes.trim() || null, status: 'pending',
    })
    if (error) { setErro('Erro ao salvar. Tente novamente.'); setSending(false); return }
    const msg = encodeURIComponent(`*Reserva — O Pharol*\n\n📅 ${data} · ${horario} · ${pessoas}\n🪑 ${mesa}${observacoes ? `\n📝 ${observacoes}` : ''}`)
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    setSending(false)
    onCreated()
  }

  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.2rem' }}>Nova Reserva</div>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.75rem' }}>← Voltar</button>
      </div>
      <div style={{ display: 'grid', gap: 14 }}>
        <div><label style={lbl}>Data *</label><input type="date" value={data} onChange={e => { setData(e.target.value); setErro('') }} style={{ ...inp, marginTop: 6 }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><label style={lbl}>Horário</label><select value={horario} onChange={e => setHorario(e.target.value)} style={{ ...inp, marginTop: 6 }}>{['11h30','12h00','13h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label style={lbl}>Pessoas</label><select value={pessoas} onChange={e => setPessoas(e.target.value)} style={{ ...inp, marginTop: 6 }}>{['1 pessoa','2 pessoas','3 pessoas','4 pessoas','5 pessoas','6+ pessoas'].map(t=><option key={t}>{t}</option>)}</select></div>
        </div>
        <div><label style={lbl}>Mesa</label><select value={mesa} onChange={e => setMesa(e.target.value)} style={{ ...inp, marginTop: 6 }}>{['Varanda (vista para o mar)','Salão interno (climatizado)','Sem preferência'].map(t=><option key={t}>{t}</option>)}</select></div>
        <div><label style={lbl}>Observações</label><textarea value={observacoes} onChange={e => setObs(e.target.value)} style={{ ...inp, marginTop: 6, minHeight: 72, resize: 'vertical' }} placeholder="Alergias, ocasião especial..." /></div>
        {erro && <div style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: 'var(--red-dark)', padding: '10px 14px', fontSize: '0.82rem' }}>{erro}</div>}
        <button className="btn-primary" onClick={handleSubmit} disabled={sending} style={{ opacity: sending ? 0.6 : 1 }}>
          {sending ? 'Salvando…' : 'Confirmar via WhatsApp'}
        </button>
      </div>
    </div>
  )
}

/* ─── TabReservas ─── */
function TabReservas({ userId, reservas, loading, showNew, onShowNew, onBack, onCancel, onCreated }: {
  userId: string; reservas: Reserva[]; loading: boolean; showNew: boolean
  onShowNew: () => void; onBack: () => void; onCancel: (id: string) => void; onCreated: () => void
}) {
  if (showNew) return <NewReserveForm userId={userId} onCreated={onCreated} onBack={onBack} />
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', fontFamily: 'var(--font-montserrat), sans-serif' }}>Suas Reservas</div>
        <button className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.6rem' }} onClick={onShowNew}>+ Nova Reserva</button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-mid)' }}>Carregando…</div>
      ) : reservas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', border: '1px solid var(--cream-dark)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📅</div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', marginBottom: 8 }}>Nenhuma reserva ainda</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: 20 }}>Faça sua primeira reserva e aproveite a experiência completa d&apos;O Pharol.</p>
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.6rem' }} onClick={onShowNew}>+ Fazer Primeira Reserva</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {reservas.map(r => <ReservCard key={r.id} r={r} onCancel={onCancel} />)}
        </div>
      )}
    </div>
  )
}

/* ─── TabEmBreve ─── */
function TabEmBreve({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', border: '1px solid var(--cream-dark)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🌟</div>
      <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 10 }}>{titulo}</div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', maxWidth: 400, margin: '0 auto' }}>{descricao}</p>
      <div style={{ marginTop: 20, display: 'inline-block', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', padding: '8px 18px', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-montserrat), sans-serif' }}>Em Breve</div>
    </div>
  )
}

/* ─── TabAvaliacoes ─── */
function TabAvaliacoes({ user, avaliacoes, rating, setRating, comentario, setComentario, sending, enviada, onEnviar, onNovaAvaliacao }: {
  user: User; avaliacoes: Avaliacao[]; rating: number; setRating: (n: number) => void
  comentario: string; setComentario: (s: string) => void; sending: boolean; enviada: boolean
  onEnviar: () => void; onNovaAvaliacao: () => void
}) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24 }}>
        {enviada ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌟</div>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: 8 }}>Obrigado pela avaliação!</div>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: 20 }}>Sua opinião é muito importante para nós.</p>
            <button onClick={onNovaAvaliacao} style={{ border: '1px solid var(--cream-dark)', background: 'transparent', color: 'var(--navy)', padding: '8px 20px', cursor: 'pointer', fontSize: '0.75rem' }}>Avaliar outra visita</button>
          </motion.div>
        ) : (
          <>
            <div style={{ color: 'var(--gold)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--font-montserrat), sans-serif' }}>Avalie sua visita</div>
            <div style={{ display: 'flex', gap: 8, fontSize: '1.8rem', marginBottom: 14 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)} style={{ border: 'none', background: 'transparent', color: i < rating ? 'var(--gold)' : 'var(--text-light)', cursor: 'pointer', fontSize: '1.8rem', padding: 0 }}>{i < rating ? '★' : '☆'}</button>
              ))}
            </div>
            <textarea value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Como foi sua experiência?" style={{ ...inp, minHeight: 80, resize: 'vertical' as const }} />
            <button onClick={onEnviar} disabled={rating === 0 || sending} style={{ marginTop: 12, border: 'none', background: rating === 0 ? 'var(--text-light)' : 'var(--navy)', color: 'white', padding: '10px 20px', cursor: rating === 0 ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: sending ? 0.7 : 1 }}>
              {sending ? 'Enviando…' : 'Enviar Avaliação'}
            </button>
            {rating === 0 && <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: 8 }}>Selecione uma nota para enviar.</p>}
          </>
        )}
      </div>
      {avaliacoes.length > 0 && (
        <div>
          <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', marginBottom: 10, fontFamily: 'var(--font-montserrat), sans-serif' }}>Suas Avaliações Anteriores</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {avaliacoes.map(a => (
              <div key={a.id} style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div style={{ color: 'var(--gold)', letterSpacing: 2 }}>{'★'.repeat(a.nota)}{'☆'.repeat(5 - a.nota)}</div>
                  {a.comentario && <div style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginTop: 4, fontStyle: 'italic' }}>&ldquo;{a.comentario}&rdquo;</div>}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.72rem', flexShrink: 0 }}>{a.data_visita ?? new Date(a.created_at).toLocaleDateString('pt-BR')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── QueueInline ─── */
function QueueInline() {
  type Session = { nome: string; telefone: string; pessoas: string; numero: number; entradaEm: string }
  const [session, setSession] = useState<Session | null>(null)
  const [nome, setNome] = useState(''); const [telefone, setTelefone] = useState(''); const [pessoas, setPessoas] = useState('2')
  const [loading, setLoading] = useState(false); const [erro, setErro] = useState('')

  useEffect(() => {
    try {
      const s = localStorage.getItem(QUEUE_KEY)
      if (s) {
        const parsed: Session = JSON.parse(s)
        if (Date.now() - new Date(parsed.entradaEm).getTime() < 3 * 60 * 60 * 1000) setSession(parsed)
        else localStorage.removeItem(QUEUE_KEY)
      }
    } catch { localStorage.removeItem(QUEUE_KEY) }
  }, [])

  async function handleEntrar() {
    if (!nome.trim() || !telefone.trim()) return
    setLoading(true); setErro('')
    const res = await fetch('/api/fila/entrar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: nome.trim(), telefone: telefone.trim(), pessoas }) })
    const data = await res.json()
    if (!res.ok) { setErro(data.error); setLoading(false); return }
    const s: Session = { nome: nome.trim(), telefone: telefone.trim(), pessoas, numero: data.numero, entradaEm: data.entradaEm }
    localStorage.setItem(QUEUE_KEY, JSON.stringify(s)); setSession(s)
    window.open(`https://wa.me/554733673800?text=${encodeURIComponent(`*Fila Virtual*\n🔢 Nº ${data.numero}\n👤 ${nome.trim()}\n👥 ${pessoas}\n📱 ${telefone.trim()}`)}`, '_blank')
    setLoading(false)
  }

  function handleSair() { localStorage.removeItem(QUEUE_KEY); setSession(null); setNome(''); setTelefone('') }

  const qInp: React.CSSProperties = { ...inp, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }

  return (
    <div style={{ background: 'var(--navy-deep)', padding: 24, color: 'white' }}>
      <div style={{ fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, fontFamily: 'var(--font-montserrat), sans-serif' }}>Fila Virtual — Exclusivo Clientes</div>
      {session ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '4rem', lineHeight: 1 }}>{session.numero}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', marginTop: 6, marginBottom: 16 }}>Seu número na fila · {session.pessoas} pessoas</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Aviso via WhatsApp para <strong style={{ color: 'white' }}>{session.telefone}</strong></div>
          <button onClick={handleSair} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '8px 20px', cursor: 'pointer', fontSize: '0.68rem' }}>Sair da Fila</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12, maxWidth: 380 }}>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome *" style={qInp} />
          <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="WhatsApp * (47) 9xxxx-xxxx" style={qInp} />
          <select value={pessoas} onChange={e => setPessoas(e.target.value)} style={qInp}>{['1','2','3','4','5','6','7','8+'].map(p=><option key={p}>{p}</option>)}</select>
          {erro && <div style={{ color: '#ff8a80', fontSize: '0.8rem' }}>{erro}</div>}
          <button className="btn-primary" onClick={handleEntrar} disabled={!nome.trim() || !telefone.trim() || loading} style={{ opacity: !nome.trim() || !telefone.trim() || loading ? 0.55 : 1 }}>{loading ? 'Entrando…' : 'Entrar na Fila'}</button>
        </div>
      )}
    </div>
  )
}

/* ─── ClientOverlay principal ─── */
export default function ClientOverlay({ open, onClose }: ClientOverlayProps) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isRegister, setIsRegister] = useState(false)
  const [authNome, setAuthNome] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authWhatsapp, setAuthWhatsapp] = useState('')
  const [authSending, setAuthSending] = useState(false)
  const [authError, setAuthError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [termosAceitos, setTermosAceitos] = useState(false)
  const [consentimento, setConsentimento] = useState(false)
  const [tab, setTab] = useState('reservas')
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [reservasLoading, setReservasLoading] = useState(false)
  const [showNewReserve, setShowNewReserve] = useState(false)
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [rating, setRating] = useState(0)
  const [comentario, setComentario] = useState('')
  const [avaliacaoSending, setAvaliacaoSending] = useState(false)
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user && open) { loadReservas(); loadAvaliacoes() }
  }, [user, open])

  useEffect(() => {
    if (!open) { setTimeout(() => { setAuthError(''); setShowNewReserve(false); setAvaliacaoEnviada(false) }, 400) }
  }, [open])

  async function loadReservas() {
    if (!user) return
    setReservasLoading(true)
    const { data } = await supabase.from('reservas').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setReservas(data ?? [])
    setReservasLoading(false)
  }

  async function loadAvaliacoes() {
    if (!user) return
    const { data } = await supabase.from('avaliacoes').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setAvaliacoes(data ?? [])
  }

  async function handleResetPassword() {
    if (!isValidEmail(authEmail)) { setAuthError('Informe um e-mail válido.'); return }
    setAuthSending(true)
    await supabase.auth.resetPasswordForEmail(authEmail.trim(), {
      redirectTo: 'https://o-pharol.vercel.app/reset-password',
    })
    setAuthSending(false)
    setResetSent(true)
  }

  async function handleAuth() {
    setAuthError(''); setAuthSending(true)
    if (isRegister) {
      if (!termosAceitos || !authNome.trim() || !isValidEmail(authEmail) || authPassword.length < 6) {
        setAuthError('Preencha todos os campos. Senha mínima: 6 caracteres.')
        setAuthSending(false); return
      }
      const { error } = await supabase.auth.signUp({
        email: authEmail.trim(), password: authPassword,
        options: { data: { name: authNome.trim(), whatsapp: authWhatsapp.trim() } },
      })
      if (error) { setAuthError(error.message.includes('already') ? 'E-mail já cadastrado.' : 'Erro ao criar conta.') }
      else {
        fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventType: 'SIGNUP', name: authNome.trim(), email: authEmail.trim(), phone: authWhatsapp.trim(), optinAccepted: termosAceitos, metadata: { partnerOptIn: consentimento } }) }).catch(() => {})
      }
    } else {
      if (!isValidEmail(authEmail) || !authPassword) { setAuthError('Preencha e-mail e senha.'); setAuthSending(false); return }
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPassword })
      if (error) setAuthError('E-mail ou senha incorretos.')
      else fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventType: 'LOGIN', email: authEmail.trim(), optinAccepted: true }) }).catch(() => {})
    }
    setAuthSending(false)
  }

  async function handleLogout() { await supabase.auth.signOut(); onClose() }

  async function handleCancelReserva(id: string) {
    await supabase.from('reservas').update({ status: 'cancelled' }).eq('id', id)
    setReservas(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' as const } : r))
  }

  async function handleEnviarAvaliacao() {
    if (rating === 0 || !user) return
    setAvaliacaoSending(true)
    const dataVisita = new Date().toLocaleDateString('pt-BR')
    const { error } = await supabase.from('avaliacoes').insert({ user_id: user.id, nota: rating, comentario: comentario.trim() || null, data_visita: dataVisita })
    if (!error) {
      fetch('/api/avaliacao', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email, nota: rating, comentario: comentario.trim() || undefined, data_visita: dataVisita }) }).catch(() => {})
      setAvaliacaoEnviada(true); setRating(0); setComentario(''); loadAvaliacoes()
    }
    setAvaliacaoSending(false)
  }

  const displayName = user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Cliente'

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.45 }} style={{ background: 'var(--cream)', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', background: 'var(--cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Área do Cliente</div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-light)' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 980, paddingBlock: 28 }}>
            {authLoading ? (
              <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Carregando…</div>
              </div>
            ) : !user ? (
              /* ── TELA DE AUTH ── */
              <div style={{ maxWidth: 460, margin: '0 auto', background: 'white', border: '1px solid var(--cream-dark)', padding: 28 }}>
                {showReset ? (
                  resetSent ? (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <div style={{ fontSize: '2rem', marginBottom: 12 }}>📧</div>
                      <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', marginBottom: 8 }}>Link enviado!</div>
                      <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: 20 }}>Verifique sua caixa de entrada e clique no link para redefinir sua senha.</p>
                      <button onClick={() => { setShowReset(false); setResetSent(false) }} style={{ border: '1px solid var(--cream-dark)', background: 'transparent', color: 'var(--navy)', padding: '8px 20px', cursor: 'pointer', fontSize: '0.75rem' }}>Voltar ao login</button>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ margin: '0 0 6px', fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Recuperar senha</h2>
                      <p style={{ color: 'var(--text-mid)', marginBottom: 20, fontSize: '0.9rem' }}>Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
                      <input placeholder="E-mail *" type="email" value={authEmail} onChange={e => { setAuthEmail(e.target.value); setAuthError('') }} style={inp} />
                      {authError && <div style={{ marginTop: 10, background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: 'var(--red-dark)', padding: '10px 14px', fontSize: '0.82rem' }}>{authError}</div>}
                      <button className="btn-primary" style={{ width: '100%', marginTop: 14, opacity: authSending ? 0.6 : 1 }} disabled={authSending} onClick={handleResetPassword}>{authSending ? 'Enviando…' : 'Enviar Link de Recuperação'}</button>
                      <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.85rem' }}><button onClick={() => { setShowReset(false); setAuthError('') }} style={{ border: 'none', background: 'transparent', color: 'var(--navy)', cursor: 'pointer', fontWeight: 600 }}>← Voltar ao login</button></p>
                    </>
                  )
                ) : (
                <>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{isRegister ? 'Criar Conta' : 'Bem-vindo'}</h2>
                <p style={{ color: 'var(--text-mid)', marginBottom: 20, fontSize: '0.9rem' }}>{isRegister ? 'Crie sua conta O Pharol e acesse benefícios exclusivos.' : 'Entre na sua conta O Pharol'}</p>
                <div style={{ display: 'grid', gap: 12 }}>
                  {isRegister && <input placeholder="Nome Completo *" value={authNome} onChange={e => { setAuthNome(e.target.value); setAuthError('') }} style={inp} />}
                  <input placeholder="E-mail *" type="email" value={authEmail} onChange={e => { setAuthEmail(e.target.value); setAuthError('') }} style={inp} />
                  <input placeholder={isRegister ? 'Senha * (mínimo 6 caracteres)' : 'Senha *'} type="password" value={authPassword} onChange={e => { setAuthPassword(e.target.value); setAuthError('') }} style={inp} />
                  {isRegister && <input placeholder="WhatsApp" value={authWhatsapp} onChange={e => setAuthWhatsapp(e.target.value)} style={inp} />}
                </div>
                {isRegister && (
                  <>
                    <div style={{ marginTop: 14, padding: '14px 16px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>🎁 Ao criar sua conta, você personalizará seus pratos, acompanhará pontos de fidelidade e participará dos sorteios dos nossos parceiros.</div>
                    <div onClick={() => setTermosAceitos(v => !v)} style={{ marginTop: 12, padding: '12px 14px', cursor: 'pointer', border: `1px solid ${termosAceitos ? 'rgba(27,43,107,0.3)' : 'var(--cream-dark)'}`, display: 'flex', gap: 12, alignItems: 'flex-start', background: termosAceitos ? 'rgba(27,43,107,0.04)' : 'transparent', transition: 'all 0.2s' }}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${termosAceitos ? 'var(--navy)' : 'var(--cream-dark)'}`, background: termosAceitos ? 'var(--navy)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.2s' }}>{termosAceitos && <svg width="10" height="8" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.5 }}>Aceito receber comunicações de O Pharol por WhatsApp e e-mail. <span style={{ color: 'var(--gold-dark)' }}>*</span></span>
                    </div>
                    <div onClick={() => setConsentimento(v => !v)} style={{ marginTop: 8, padding: '12px 14px', cursor: 'pointer', border: `1px solid ${consentimento ? 'rgba(201,168,76,0.3)' : 'var(--cream-dark)'}`, display: 'flex', gap: 12, alignItems: 'flex-start', background: consentimento ? 'rgba(201,168,76,0.06)' : 'transparent', transition: 'all 0.2s' }}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${consentimento ? 'var(--gold)' : 'var(--cream-dark)'}`, background: consentimento ? 'var(--gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.2s' }}>{consentimento && <svg width="10" height="8" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="var(--navy-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.5 }}>🎁 Quero experiências exclusivas e participar dos sorteios com parceiros selecionados.</span>
                    </div>
                  </>
                )}
                {authError && <div style={{ marginTop: 12, background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: 'var(--red-dark)', padding: '10px 14px', fontSize: '0.82rem' }}>{authError}</div>}
                <button className="btn-primary" style={{ width: '100%', marginTop: 16, opacity: (isRegister && !termosAceitos) || authSending ? 0.55 : 1, cursor: (isRegister && !termosAceitos) || authSending ? 'not-allowed' : 'pointer' }} disabled={(isRegister && !termosAceitos) || authSending} onClick={handleAuth}>
                  {authSending ? 'Aguarde…' : isRegister ? 'Criar Conta' : 'Entrar'}
                </button>
                <p style={{ textAlign: 'center', color: 'var(--text-mid)', fontSize: '0.85rem', marginTop: 14 }}>
                  {isRegister ? 'Já tem conta? ' : 'Não tem conta? '}
                  <button onClick={() => { setIsRegister(v => !v); setAuthError('') }} style={{ border: 'none', background: 'transparent', color: 'var(--navy)', cursor: 'pointer', fontWeight: 600 }}>{isRegister ? 'Entrar' : 'Cadastre-se'}</button>
                </p>
                {!isRegister && (
                  <p style={{ textAlign: 'center', marginTop: 6 }}>
                    <button onClick={() => { setShowReset(true); setAuthError('') }} style={{ border: 'none', background: 'transparent', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.8rem' }}>Esqueci minha senha</button>
                  </p>
                )}
                </>
                )}
              </div>
            ) : (
              /* ── DASHBOARD ── */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--navy)' }}>Olá, {displayName} 👋</div>
                    <div style={{ color: 'var(--text-mid)', fontSize: '0.85rem' }}>{user.email}</div>
                  </div>
                  <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--cream-dark)', color: 'var(--text-light)', padding: '8px 16px', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat), sans-serif' }}>Sair</button>
                </div>
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--cream-dark)', marginBottom: 24, overflowX: 'auto' }}>
                  {[{id:'reservas',label:'Reservas'},{id:'fila',label:'Fila Virtual'},{id:'avaliacoes',label:'Avaliações'},{id:'historico',label:'Histórico'},{id:'fidelidade',label:'Fidelidade'}].map(t => (
                    <button key={t.id} onClick={() => { setTab(t.id); setShowNewReserve(false) }} style={{ border: 'none', background: 'transparent', padding: '10px 16px', color: tab === t.id ? 'var(--navy)' : 'var(--text-light)', fontWeight: tab === t.id ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent', transition: 'all 0.2s', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.75rem' }}>{t.label}</button>
                  ))}
                </div>
                {tab === 'reservas' && <TabReservas userId={user.id} reservas={reservas} loading={reservasLoading} showNew={showNewReserve} onShowNew={() => setShowNewReserve(true)} onBack={() => setShowNewReserve(false)} onCancel={handleCancelReserva} onCreated={() => { loadReservas(); setShowNewReserve(false) }} />}
                {tab === 'fila' && <QueueInline />}
                {tab === 'avaliacoes' && <TabAvaliacoes user={user} avaliacoes={avaliacoes} rating={rating} setRating={setRating} comentario={comentario} setComentario={setComentario} sending={avaliacaoSending} enviada={avaliacaoEnviada} onEnviar={handleEnviarAvaliacao} onNovaAvaliacao={() => setAvaliacaoEnviada(false)} />}
                {tab === 'historico' && <TabEmBreve titulo="Histórico de Visitas" descricao="Após suas primeiras visitas ao O Pharol, seu histórico completo com pontos acumulados aparecerá aqui." />}
                {tab === 'fidelidade' && <TabEmBreve titulo="Programa de Fidelidade" descricao="Acumule pontos a cada visita e resgate por entradas, sobremesas, vinhos e experiências VIP. Em breve disponível para todos os clientes." />}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
