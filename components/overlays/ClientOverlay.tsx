'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const OPTIN_KEY = 'opharol_optin_v1'
const QUEUE_KEY = 'opharol_fila_v1'

type Reserva = {
  id: string; data: string; horario: string; pessoas: string
  mesa: string; observacoes: string | null
  status: 'pending' | 'confirmed' | 'cancelled'; created_at: string
}
type Avaliacao = {
  id: string; nota: number; comentario: string | null
  data_visita: string | null; created_at: string
}
type ClientOverlayProps = {
  open: boolean
  onClose: () => void
  prefill?: { email: string; nome: string }
}

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }

/* ── Estilos compartilhados ── */
const INP: React.CSSProperties = {
  padding: '11px 14px', border: '1px solid var(--cream-dark)',
  width: '100%', background: 'white', fontFamily: 'inherit',
  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
}
const LBL: React.CSSProperties = {
  display: 'block', fontSize: '0.58rem', color: 'var(--gold)',
  textTransform: 'uppercase', letterSpacing: '0.18em',
  fontFamily: 'var(--font-montserrat), sans-serif', marginBottom: 6,
}

/* ── ReservCard ── */
function ReservCard({ r, onCancel }: { r: Reserva; onCancel: (id: string) => void }) {
  const map = {
    confirmed: { label:'Confirmada', bg:'rgba(27,43,107,0.08)', color:'var(--navy)' },
    pending:   { label:'Aguardando', bg:'rgba(201,168,76,0.18)', color:'var(--gold-dark)' },
    cancelled: { label:'Cancelada',  bg:'rgba(200,16,46,0.1)',  color:'var(--red-dark)' },
  }
  const s = map[r.status]
  return (
    <div style={{ background:'white', border:'1px solid var(--cream-dark)', padding:18 }}>
      <div style={{ display:'flex', justifyContent:'space-between', gap:12, alignItems:'flex-start', marginBottom: r.status!=='cancelled'?12:0 }}>
        <div>
          <div style={{ fontFamily:'var(--font-playfair), serif', color: r.status==='cancelled'?'var(--text-light)':'var(--navy)', fontSize:'1.05rem', textDecoration: r.status==='cancelled'?'line-through':'none', marginBottom:4 }}>{r.data} · {r.horario}</div>
          <div style={{ color:'var(--text-mid)', fontSize:'0.82rem', fontFamily:'var(--font-cormorant), serif', fontStyle:'italic' }}>{r.pessoas} · {r.mesa}</div>
          {r.observacoes && <div style={{ color:'var(--text-light)', fontSize:'0.75rem', marginTop:4 }}>{r.observacoes}</div>}
        </div>
        <span style={{ background:s.bg, color:s.color, padding:'4px 10px', fontSize:'0.62rem', letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'var(--font-montserrat), sans-serif', flexShrink:0 }}>{s.label}</span>
      </div>
      {r.status !== 'cancelled' && (
        <button onClick={() => onCancel(r.id)} style={{ fontSize:'0.58rem', letterSpacing:'0.12em', textTransform:'uppercase', background:'transparent', border:'1px solid rgba(200,16,46,0.25)', color:'var(--red-dark)', padding:'6px 14px', cursor:'pointer', fontFamily:'var(--font-montserrat), sans-serif', transition:'all 0.2s' }}>
          Cancelar
        </button>
      )}
    </div>
  )
}

/* ── NewReserveForm ── */
function NewReserveForm({ userId, onCreated, onBack }: { userId: string; onCreated: () => void; onBack: () => void }) {
  const [data, setData] = useState(''); const [horario, setHorario] = useState('20h00')
  const [pessoas, setPessoas] = useState('2 pessoas'); const [mesa, setMesa] = useState('Varanda (vista para o mar)')
  const [observacoes, setObs] = useState(''); const [sending, setSending] = useState(false); const [erro, setErro] = useState('')

  const handleSubmit = async () => {
    if (!data) { setErro('Selecione uma data.'); return }
    setSending(true)
    const { error } = await supabase.from('reservas').insert({ user_id:userId, data, horario, pessoas, mesa, observacoes:observacoes.trim()||null, status:'pending' })
    if (error) { setErro('Erro ao salvar. Tente novamente.'); setSending(false); return }
    const msg = encodeURIComponent(`*Reserva — Área do Cliente*\n\n📅 ${data} · ${horario} · ${pessoas}\n🪑 ${mesa}${observacoes?`\n📝 ${observacoes}`:''}`)
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    setSending(false); onCreated()
  }
  return (
    <div style={{ background:'white', border:'1px solid var(--cream-dark)' }}>
      <div style={{ height:3, background:'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />
      <div style={{ padding:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontSize:'1.2rem' }}>Nova Reserva</div>
          <button onClick={onBack} style={{ background:'transparent', border:'none', color:'var(--text-light)', cursor:'pointer', fontSize:'0.72rem', letterSpacing:'0.08em' }}>← Voltar</button>
        </div>
        <div style={{ display:'grid', gap:16 }}>
          <div><label style={LBL}>Data *</label><input type="date" value={data} onChange={e=>{setData(e.target.value);setErro('')}} style={INP} /></div>
          <div className="client-new-reserve-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div><label style={LBL}>Horário</label><select value={horario} onChange={e=>setHorario(e.target.value)} style={INP}>{['11h30','12h00','13h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00'].map(t=><option key={t}>{t}</option>)}</select></div>
            <div><label style={LBL}>Pessoas</label><select value={pessoas} onChange={e=>setPessoas(e.target.value)} style={INP}>{['1 pessoa','2 pessoas','3 pessoas','4 pessoas','5 pessoas','6+ pessoas'].map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div><label style={LBL}>Mesa</label><select value={mesa} onChange={e=>setMesa(e.target.value)} style={INP}>{['Varanda (vista para o mar)','Salão interno (climatizado)','Sem preferência'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label style={LBL}>Observações para a cozinha</label><textarea value={observacoes} onChange={e=>setObs(e.target.value)} style={{...INP,minHeight:72,resize:'vertical'}} placeholder="Alergias, ponto da carne, ocasião especial…" /></div>
          {erro && <div style={{ background:'rgba(200,16,46,0.08)', border:'1px solid rgba(200,16,46,0.2)', color:'var(--red-dark)', padding:'10px 14px', fontSize:'0.82rem' }}>{erro}</div>}
          <button className="btn-primary" onClick={handleSubmit} disabled={sending} style={{ opacity:sending?0.6:1 }}>{sending?'Salvando…':'Confirmar via WhatsApp'}</button>
        </div>
      </div>
    </div>
  )
}

/* ── TabReservas ── */
function TabReservas({ userId, reservas, loading, showNew, onShowNew, onBack, onCancel, onCreated }: {
  userId: string; reservas: Reserva[]; loading: boolean; showNew: boolean
  onShowNew:()=>void; onBack:()=>void; onCancel:(id:string)=>void; onCreated:()=>void
}) {
  if (showNew) return <NewReserveForm userId={userId} onCreated={onCreated} onBack={onBack} />
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
        <div style={{ fontSize:'0.58rem', textTransform:'uppercase', letterSpacing:'0.18em', color:'var(--text-light)', fontFamily:'var(--font-montserrat), sans-serif' }}>Suas Reservas</div>
        <button className="btn-primary" style={{ padding:'9px 20px', fontSize:'0.58rem', letterSpacing:'0.14em' }} onClick={onShowNew}>+ Nova Reserva</button>
      </div>
      {loading ? (
        <div style={{ textAlign:'center', padding:40, color:'var(--text-mid)', fontFamily:'var(--font-cormorant), serif', fontStyle:'italic' }}>Carregando…</div>
      ) : reservas.length === 0 ? (
        <div style={{ textAlign:'center', padding:'56px 24px', background:'white', border:'1px solid var(--cream-dark)' }}>
          <div style={{ width:56, height:56, border:'1px solid var(--cream-dark)', background:'var(--cream)', display:'grid', placeItems:'center', margin:'0 auto 16px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontSize:'1.1rem', marginBottom:6 }}>Nenhuma reserva ainda</div>
          <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', fontSize:'1rem', color:'var(--text-mid)', marginBottom:20 }}>Faça sua primeira reserva e personalize sua experiência completa n&apos;O Pharol.</p>
          <button className="btn-primary" style={{ padding:'10px 28px', fontSize:'0.6rem' }} onClick={onShowNew}>+ Fazer Primeira Reserva</button>
        </div>
      ) : (
        <div style={{ display:'grid', gap:10 }}>
          {reservas.map(r => <ReservCard key={r.id} r={r} onCancel={onCancel} />)}
        </div>
      )}
    </div>
  )
}

/* ── TabEmBreve ── */
function TabEmBreve({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div style={{ textAlign:'center', padding:'64px 24px', background:'white', border:'1px solid var(--cream-dark)' }}>
      <div style={{ width:56, height:56, border:'1px solid rgba(201,168,76,0.3)', display:'grid', placeItems:'center', margin:'0 auto 20px' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontSize:'1.2rem', marginBottom:8 }}>{titulo}</div>
      <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', fontSize:'1rem', color:'var(--text-mid)', maxWidth:380, margin:'0 auto 20px', lineHeight:1.7 }}>{descricao}</p>
      <div style={{ display:'inline-block', background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.2)', padding:'7px 18px', fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', fontFamily:'var(--font-montserrat), sans-serif' }}>Em Breve</div>
    </div>
  )
}

/* ── TabAvaliacoes ── */
function TabAvaliacoes({ user, avaliacoes, rating, setRating, comentario, setComentario, sending, enviada, onEnviar, onNovaAvaliacao }: {
  user: User; avaliacoes: Avaliacao[]; rating: number; setRating:(n:number)=>void
  comentario: string; setComentario:(s:string)=>void; sending: boolean; enviada: boolean
  onEnviar:()=>void; onNovaAvaliacao:()=>void
}) {
  return (
    <div style={{ display:'grid', gap:16 }}>
      <div style={{ background:'white', border:'1px solid var(--cream-dark)' }}>
        <div style={{ height:3, background:'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />
        <div style={{ padding:28 }}>
          {enviada ? (
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', padding:'16px 0' }}>
              <div style={{ width:56, height:56, border:'1px solid rgba(201,168,76,0.3)', display:'grid', placeItems:'center', margin:'0 auto 16px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontSize:'1.3rem', marginBottom:6 }}>Obrigado pela avaliação!</div>
              <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-mid)', marginBottom:20 }}>Sua opinião é muito importante para nós.</p>
              <button onClick={onNovaAvaliacao} style={{ border:'1px solid var(--cream-dark)', background:'transparent', color:'var(--navy)', padding:'8px 20px', cursor:'pointer', fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--font-montserrat), sans-serif' }}>Avaliar outra visita</button>
            </motion.div>
          ) : (
            <>
              <div style={{ fontSize:'0.58rem', color:'var(--gold)', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:10, fontFamily:'var(--font-montserrat), sans-serif' }}>Avalie sua visita</div>
              <div style={{ display:'flex', gap:6, marginBottom:16 }}>
                {Array.from({length:5}).map((_,i) => (
                  <button key={i} onClick={() => setRating(i+1)} style={{ border:'none', background:'transparent', color:i<rating?'var(--gold)':'var(--cream-dark)', cursor:'pointer', fontSize:'2rem', padding:0, transition:'color 0.2s' }}>{i<rating?'★':'☆'}</button>
                ))}
              </div>
              <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="Como foi sua experiência?" style={{...INP, minHeight:80, resize:'vertical' as const}} />
              <button onClick={onEnviar} disabled={rating===0||sending} style={{ marginTop:14, border:'none', background:rating===0?'var(--text-light)':'var(--navy)', color:'white', padding:'10px 24px', cursor:rating===0?'not-allowed':'pointer', fontFamily:'var(--font-montserrat), sans-serif', fontSize:'0.62rem', letterSpacing:'0.14em', textTransform:'uppercase', opacity:sending?0.7:1, transition:'background 0.2s' }}>
                {sending?'Enviando…':'Enviar Avaliação'}
              </button>
              {rating===0 && <p style={{ fontSize:'0.72rem', color:'var(--text-light)', marginTop:8 }}>Selecione uma nota para enviar.</p>}
            </>
          )}
        </div>
      </div>
      {avaliacoes.length > 0 && (
        <div>
          <div style={{ fontSize:'0.58rem', textTransform:'uppercase', letterSpacing:'0.18em', color:'var(--text-light)', marginBottom:10, fontFamily:'var(--font-montserrat), sans-serif' }}>Avaliações Anteriores</div>
          <div style={{ display:'grid', gap:8 }}>
            {avaliacoes.map(a => (
              <div key={a.id} style={{ background:'white', border:'1px solid var(--cream-dark)', padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                <div>
                  <div style={{ color:'var(--gold)', letterSpacing:2, fontSize:'1.1rem' }}>{'★'.repeat(a.nota)}{'☆'.repeat(5-a.nota)}</div>
                  {a.comentario && <div style={{ color:'var(--text-mid)', fontSize:'0.88rem', marginTop:6, fontFamily:'var(--font-cormorant), serif', fontStyle:'italic' }}>&ldquo;{a.comentario}&rdquo;</div>}
                </div>
                <div style={{ color:'var(--text-light)', fontSize:'0.7rem', flexShrink:0, fontFamily:'var(--font-montserrat), sans-serif' }}>{a.data_visita ?? new Date(a.created_at).toLocaleDateString('pt-BR')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── QueueInline ── */
function QueueInline() {
  type Session = { nome:string; telefone:string; pessoas:string; numero:number; entradaEm:string }
  const [session, setSession] = useState<Session|null>(null)
  const [nome, setNome] = useState(''); const [telefone, setTelefone] = useState(''); const [pessoas, setPessoas] = useState('2')
  const [loading, setLoading] = useState(false); const [erro, setErro] = useState('')

  useEffect(() => {
    try {
      const s = localStorage.getItem(QUEUE_KEY)
      if (s) { const p:Session=JSON.parse(s); if(Date.now()-new Date(p.entradaEm).getTime()<3*60*60*1000) setSession(p); else localStorage.removeItem(QUEUE_KEY) }
    } catch { localStorage.removeItem(QUEUE_KEY) }
  }, [])

  async function handleEntrar() {
    if (!nome.trim()||!telefone.trim()) return
    setLoading(true); setErro('')
    const res = await fetch('/api/fila/entrar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome:nome.trim(),telefone:telefone.trim(),pessoas})})
    const data = await res.json()
    if (!res.ok) { setErro(data.error); setLoading(false); return }
    const s:Session={nome:nome.trim(),telefone:telefone.trim(),pessoas,numero:data.numero,entradaEm:data.entradaEm}
    localStorage.setItem(QUEUE_KEY,JSON.stringify(s)); setSession(s)
    window.open(`https://wa.me/554733673800?text=${encodeURIComponent(`*Fila Virtual*\n🔢 Nº ${data.numero}\n👤 ${nome.trim()}\n👥 ${pessoas}\n📱 ${telefone.trim()}`)}`, '_blank')
    setLoading(false)
  }

  function handleSair() { localStorage.removeItem(QUEUE_KEY); setSession(null); setNome(''); setTelefone('') }

  const qInp:React.CSSProperties = {...INP, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'white'}

  return (
    <div style={{ background:'var(--navy-deep)', border:'1px solid rgba(201,168,76,0.15)' }}>
      <div style={{ height:2, background:'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <div style={{ padding:28 }}>
        <div style={{ fontSize:'0.56rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16, fontFamily:'var(--font-montserrat), sans-serif' }}>Fila Virtual — Exclusivo Clientes</div>
        {session ? (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--gold)', fontSize:'4.5rem', lineHeight:1 }}>{session.numero}</div>
            <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.68rem', letterSpacing:'0.16em', textTransform:'uppercase', margin:'8px 0 16px', fontFamily:'var(--font-montserrat), sans-serif' }}>Seu número na fila · {session.pessoas} pessoas</div>
            <div style={{ background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.2)', padding:'10px 16px', fontSize:'0.78rem', color:'rgba(255,255,255,0.65)', marginBottom:16 }}>
              Aviso via WhatsApp para <strong style={{ color:'rgba(37,211,102,0.9)' }}>{session.telefone}</strong>
            </div>
            <button onClick={handleSair} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.5)', padding:'8px 22px', cursor:'pointer', fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-montserrat), sans-serif' }}>Sair da Fila</button>
          </div>
        ) : (
          <div style={{ display:'grid', gap:12, maxWidth:360 }}>
            <div><label style={{...LBL,color:'rgba(201,168,76,0.7)'}}>Nome *</label><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome completo" style={qInp} /></div>
            <div><label style={{...LBL,color:'rgba(201,168,76,0.7)'}}>WhatsApp *</label><input value={telefone} onChange={e=>setTelefone(e.target.value)} placeholder="(47) 9xxxx-xxxx" style={qInp} /></div>
            <div><label style={{...LBL,color:'rgba(201,168,76,0.7)'}}>Pessoas</label><select value={pessoas} onChange={e=>setPessoas(e.target.value)} style={qInp}>{['1','2','3','4','5','6','7','8+'].map(p=><option key={p}>{p}</option>)}</select></div>
            {erro && <div style={{ color:'#ff8a80', fontSize:'0.8rem' }}>{erro}</div>}
            <button className="btn-primary" onClick={handleEntrar} disabled={!nome.trim()||!telefone.trim()||loading} style={{ opacity:!nome.trim()||!telefone.trim()||loading?0.55:1 }}>{loading?'Entrando…':'Entrar na Fila'}</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── ClientOverlay principal ── */
export default function ClientOverlay({ open, onClose, prefill }: ClientOverlayProps) {
  const [user, setUser] = useState<User|null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isRegister, setIsRegister] = useState(false)
  const [authNome, setAuthNome] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authWhatsapp, setAuthWhatsapp] = useState('')
  const [authSending, setAuthSending] = useState(false)
  const [authError, setAuthError] = useState('')
  const [termosAceitos, setTermosAceitos] = useState(false)
  const [optinParceiros, setOptinParceiros] = useState(false)
  const [optinAlreadyAccepted, setOptinAlreadyAccepted] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
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
    setOptinAlreadyAccepted(localStorage.getItem(OPTIN_KEY) === 'true')
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user??null); setAuthLoading(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => { setUser(session?.user??null) })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (prefill && !user) {
      setAuthEmail(prefill.email)
      setAuthNome(prefill.nome)
      setIsRegister(true)  // Abre direto no cadastro, não no login
    }
  }, [prefill])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (user && open) { loadReservas(); loadAvaliacoes() } }, [user?.id, open])
  useEffect(() => { if (!open) { setTimeout(() => { setAuthError(''); setShowNewReserve(false); setAvaliacaoEnviada(false); setShowReset(false); setResetSent(false) }, 400) } }, [open])

  async function loadReservas() {
    if (!user) return; setReservasLoading(true)
    const { data } = await supabase.from('reservas').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
    setReservas(data??[]); setReservasLoading(false)
  }
  async function loadAvaliacoes() {
    if (!user) return
    const { data } = await supabase.from('avaliacoes').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
    setAvaliacoes(data??[])
  }

  async function handleAuth() {
    setAuthError(''); setAuthSending(true)
    if (isRegister) {
      if (!termosAceitos||!authNome.trim()||!isValidEmail(authEmail)||authPassword.length<6) { setAuthError('Preencha todos os campos. Senha mínima: 6 caracteres.'); setAuthSending(false); return }
      const { error } = await supabase.auth.signUp({ email:authEmail.trim(), password:authPassword, options:{ data:{ name:authNome.trim(), whatsapp:authWhatsapp.trim() } } })
      if (error) { setAuthError(error.message.includes('already')?'E-mail já cadastrado.':'Erro ao criar conta.') }
      else {
        if (optinParceiros) localStorage.setItem(OPTIN_KEY, 'true')
        fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventType:'SIGNUP',name:authNome.trim(),email:authEmail.trim(),phone:authWhatsapp.trim(),optinAccepted:termosAceitos,metadata:{partnerOptIn:optinParceiros}})}).catch(()=>{})
      }
    } else {
      if (!isValidEmail(authEmail)||!authPassword) { setAuthError('Preencha e-mail e senha.'); setAuthSending(false); return }
      const { error } = await supabase.auth.signInWithPassword({ email:authEmail.trim(), password:authPassword })
      if (error) setAuthError('E-mail ou senha incorretos.')
      else fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventType:'LOGIN',email:authEmail.trim(),optinAccepted:true})}).catch(()=>{})
    }
    setAuthSending(false)
  }

  async function handleResetPassword() {
    if (!isValidEmail(authEmail)) { setAuthError('Informe um e-mail válido.'); return }
    setAuthSending(true)
    await supabase.auth.resetPasswordForEmail(authEmail.trim(), { redirectTo:'https://o-pharol.vercel.app/reset-password' })
    setAuthSending(false); setResetSent(true)
  }

  async function handleLogout() { await supabase.auth.signOut(); onClose() }

  async function handleCancelReserva(id: string) {
    await supabase.from('reservas').update({status:'cancelled'}).eq('id',id)
    setReservas(prev => prev.map(r => r.id===id?{...r,status:'cancelled' as const}:r))
  }

  async function handleEnviarAvaliacao() {
    if (rating===0||!user) return; setAvaliacaoSending(true)
    const dataVisita = new Date().toLocaleDateString('pt-BR')
    const { error } = await supabase.from('avaliacoes').insert({user_id:user.id,nota:rating,comentario:comentario.trim()||null,data_visita:dataVisita})
    if (!error) {
      fetch('/api/avaliacao',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:user.email,nota:rating,comentario:comentario.trim()||undefined,data_visita:dataVisita})}).catch(()=>{})
      setAvaliacaoEnviada(true); setRating(0); setComentario(''); loadAvaliacoes()
    }
    setAvaliacaoSending(false)
  }

  const displayName = user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Cliente'

  /* ── Checkbox premium (reutilizado em 2 lugares) ── */
  function OptinBox({ checked, onToggle, obrigatorio }: { checked:boolean; onToggle:()=>void; obrigatorio?:boolean }) {
    return (
      <div onClick={onToggle} style={{ cursor:'pointer', border:`1px solid ${checked?(obrigatorio?'rgba(27,43,107,0.35)':'var(--gold)'):'var(--cream-dark)'}`, background:checked?(obrigatorio?'rgba(27,43,107,0.04)':'rgba(201,168,76,0.06)'):'transparent', padding:'14px 16px', display:'flex', gap:14, alignItems:'flex-start', transition:'all 0.2s' }}>
        <div style={{ width:18,height:18, border:`2px solid ${checked?(obrigatorio?'var(--navy)':'var(--gold)'):'var(--cream-dark)'}`, background:checked?(obrigatorio?'var(--navy)':'var(--gold)'):'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2, transition:'all 0.2s' }}>
          {checked && <svg width="10" height="8" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke={obrigatorio?'white':'var(--navy-deep)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <div>
          {obrigatorio ? (
            <div style={{ fontSize:'0.78rem', color:'var(--text-mid)', lineHeight:1.55, fontFamily:'var(--font-cormorant), serif', fontStyle:'italic' }}>
              Aceito os <a href="/termos" style={{ color:'var(--navy)' }}>Termos de Uso</a> e receber comunicações do O Pharol por WhatsApp e e-mail.{' '}
              <span style={{ color:'var(--gold-dark)' }}>*</span>
            </div>
          ) : (
            <span style={{ fontSize:'0.8rem', color:'var(--text-dark)', lineHeight:1.5 }}>
              <strong style={{ color: checked ? 'var(--gold-dark)' : 'var(--navy)', display:'block', marginBottom:3 }}>
                🎁 Quero participar dos sorteios semanais
              </strong>
              e receber ofertas exclusivas dos parceiros d&apos;O Pharol em Balneário Camboriú.{' '}
              <span style={{ color:'var(--text-light)', display:'block', marginTop:4, fontSize:'0.68rem' }}>
                Opcional. Autorizo o compartilhamento do meu perfil com parceiros para promoções personalizadas. Revogável a qualquer momento. LGPD — Lei 13.709/2018.
              </span>
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ duration:0.45 }} style={{ background:'var(--cream)', overflowY:'auto' }}>

          {/* ── Header ── */}
          <div style={{ position:'sticky', top:0, zIndex:2, borderBottom:'1px solid var(--cream-dark)', background:'var(--cream)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 28px' }}>
            <div style={{ fontFamily:'var(--font-playfair), serif', fontSize:'1.3rem', color:'var(--navy)' }}>Área do Cliente</div>
            <button onClick={onClose} style={{ background:'transparent', border:'none', fontSize:'1.3rem', cursor:'pointer', color:'var(--text-light)', lineHeight:1 }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth:980, paddingBlock:32 }}>
            {authLoading ? (
              <div style={{ textAlign:'center', padding:'80px 24px', fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-mid)', fontSize:'1.1rem' }}>Carregando…</div>
            ) : !user ? (

              /* ── AUTH SCREEN ── */
              <div style={{ maxWidth:440, margin:'0 auto' }}>
                {/* Hint sutil acima do card */}
                {!showReset && isRegister && (
                  <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-light)', fontSize:'0.95rem', textAlign:'center', marginBottom:18, lineHeight:1.6 }}>
                    Personalize seus pratos, acompanhe pontos de fidelidade e participe dos sorteios dos nossos parceiros.
                  </p>
                )}

                {/* Card */}
                <div style={{ background:'white', border:'1px solid var(--cream-dark)', boxShadow:'0 8px 40px rgba(27,43,107,0.06)' }}>
                  <div style={{ height:3, background:'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />
                  <div style={{ padding:'28px 32px' }}>

                    {showReset ? (
                      resetSent ? (
                        <div style={{ textAlign:'center', padding:'8px 0' }}>
                          <div style={{ width:52,height:52, border:'1px solid rgba(201,168,76,0.3)', display:'grid', placeItems:'center', margin:'0 auto 16px' }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                          </div>
                          <div style={{ fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontSize:'1.2rem', marginBottom:6 }}>Link enviado!</div>
                          <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-mid)', marginBottom:20 }}>Verifique sua caixa de entrada e clique no link para redefinir sua senha.</p>
                          <button onClick={()=>{setShowReset(false);setResetSent(false)}} style={{ border:'1px solid var(--cream-dark)', background:'transparent', color:'var(--navy)', padding:'8px 20px', cursor:'pointer', fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--font-montserrat), sans-serif' }}>Voltar ao login</button>
                        </div>
                      ) : (
                        <>
                          <h2 style={{ margin:'0 0 4px', fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontWeight:400 }}>Recuperar senha</h2>
                          <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-mid)', marginBottom:22, fontSize:'1rem' }}>Informe seu e-mail para receber o link de redefinição.</p>
                          <div><label style={LBL}>E-mail</label><input type="email" value={authEmail} onChange={e=>{setAuthEmail(e.target.value);setAuthError('')}} style={INP} /></div>
                          {authError && <div style={{ marginTop:10, background:'rgba(200,16,46,0.08)', border:'1px solid rgba(200,16,46,0.2)', color:'var(--red-dark)', padding:'10px 14px', fontSize:'0.82rem' }}>{authError}</div>}
                          <button className="btn-primary" style={{ width:'100%', marginTop:16, opacity:authSending?0.6:1 }} disabled={authSending} onClick={handleResetPassword}>{authSending?'Enviando…':'Enviar Link'}</button>
                          <p style={{ textAlign:'center', marginTop:14, fontSize:'0.82rem' }}><button onClick={()=>{setShowReset(false);setAuthError('')}} style={{ border:'none', background:'transparent', color:'var(--navy)', cursor:'pointer', fontWeight:600 }}>← Voltar</button></p>
                        </>
                      )
                    ) : (
                      <>
                        <h2 style={{ margin:'0 0 4px', fontFamily:'var(--font-playfair), serif', color:'var(--navy)', fontWeight:400, fontSize:'1.6rem' }}>{isRegister?'Criar Conta':'Bem-vindo'}</h2>
                        <p style={{ fontFamily:'var(--font-cormorant), serif', fontStyle:'italic', color:'var(--text-mid)', marginBottom:22, fontSize:'1rem' }}>{isRegister?'Crie sua conta O Pharol.':'Entre na sua conta O Pharol.'}</p>
                        <div style={{ display:'grid', gap:14 }}>
                          {isRegister && <div><label style={LBL}>Nome Completo *</label><input placeholder="Como devemos chamá-lo?" value={authNome} onChange={e=>{setAuthNome(e.target.value);setAuthError('')}} style={INP} /></div>}
                          <div><label style={LBL}>E-mail *</label><input type="email" placeholder="seu@email.com" value={authEmail} onChange={e=>{setAuthEmail(e.target.value);setAuthError('')}} style={INP} /></div>
                          <div><label style={LBL}>{isRegister?'Senha * (mínimo 6 caracteres)':'Senha *'}</label><input type="password" placeholder="••••••••" value={authPassword} onChange={e=>{setAuthPassword(e.target.value);setAuthError('')}} style={INP} /></div>
                          {isRegister && <div><label style={LBL}>WhatsApp</label><input type="tel" placeholder="(47) 9xxxx-xxxx" value={authWhatsapp} onChange={e=>setAuthWhatsapp(e.target.value)} style={INP} /></div>}
                        </div>
                        {isRegister && (
                          <div style={{ display:'grid', gap:8, marginTop:16 }}>
                            <OptinBox checked={termosAceitos} onToggle={()=>setTermosAceitos(v=>!v)} obrigatorio />
                            {!optinAlreadyAccepted && <OptinBox checked={optinParceiros} onToggle={()=>setOptinParceiros(v=>!v)} />}
                          </div>
                        )}
                        {authError && <div style={{ marginTop:12, background:'rgba(200,16,46,0.08)', border:'1px solid rgba(200,16,46,0.2)', color:'var(--red-dark)', padding:'10px 14px', fontSize:'0.82rem' }}>{authError}</div>}
                        <button className="btn-primary" style={{ width:'100%', marginTop:18, opacity:(isRegister&&!termosAceitos)||authSending?0.55:1, cursor:(isRegister&&!termosAceitos)||authSending?'not-allowed':'pointer' }} disabled={(isRegister&&!termosAceitos)||authSending} onClick={handleAuth}>
                          {authSending?'Aguarde…':isRegister?'Criar Conta':'Entrar'}
                        </button>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14, flexWrap:'wrap', gap:8 }}>
                          <p style={{ margin:0, color:'var(--text-mid)', fontSize:'0.82rem' }}>
                            {isRegister?'Já tem conta? ':'Não tem conta? '}
                            <button onClick={()=>{setIsRegister(v=>!v);setAuthError('')}} style={{ border:'none', background:'transparent', color:'var(--navy)', cursor:'pointer', fontWeight:700, fontSize:'0.82rem' }}>{isRegister?'Entrar':'Cadastre-se'}</button>
                          </p>
                          {!isRegister && <button onClick={()=>{setShowReset(true);setAuthError('')}} style={{ border:'none', background:'transparent', color:'var(--text-light)', cursor:'pointer', fontSize:'0.75rem' }}>Esqueci minha senha</button>}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

            ) : (
              /* ── DASHBOARD ── */
              <div>
                {/* Header premium */}
                <div className="client-dashboard-header" style={{ background:'var(--navy)', padding:'24px 28px', marginBottom:0, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-playfair), serif', fontSize:'1.6rem', color:'white', marginBottom:2 }}>Olá, {displayName}</div>
                    <div style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.45)', letterSpacing:'0.12em', fontFamily:'var(--font-montserrat), sans-serif' }}>{user.email}</div>
                  </div>
                  <button onClick={handleLogout} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.5)', padding:'8px 18px', cursor:'pointer', fontSize:'0.58rem', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-montserrat), sans-serif', transition:'all 0.2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.4)';e.currentTarget.style.color='rgba(255,255,255,0.8)'}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.18)';e.currentTarget.style.color='rgba(255,255,255,0.5)'}}>
                    Sair
                  </button>
                </div>
                {/* Gold accent line */}
                <div style={{ height:2, background:'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))', marginBottom:0 }} />

                {/* Tabs */}
                <div className="client-tabs-bar" style={{ background:'white', borderBottom:'1px solid var(--cream-dark)', marginBottom:24, display:'flex', overflowX:'auto' }}>
                  {[{id:'reservas',label:'Reservas'},{id:'fila',label:'Fila Virtual'},{id:'avaliacoes',label:'Avaliações'},{id:'historico',label:'Histórico'},{id:'fidelidade',label:'Fidelidade'}].map(t => (
                    <button key={t.id} onClick={()=>{setTab(t.id);setShowNewReserve(false)}} style={{ border:'none', background:'transparent', padding:'14px 20px', color:tab===t.id?'var(--navy)':'var(--text-light)', fontWeight:tab===t.id?600:400, cursor:'pointer', whiteSpace:'nowrap', borderBottom:tab===t.id?'2px solid var(--gold)':'2px solid transparent', marginBottom:-1, transition:'all 0.2s', fontFamily:'var(--font-montserrat), sans-serif', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>{t.label}</button>
                  ))}
                </div>

                {tab==='reservas' && <TabReservas userId={user.id} reservas={reservas} loading={reservasLoading} showNew={showNewReserve} onShowNew={()=>setShowNewReserve(true)} onBack={()=>setShowNewReserve(false)} onCancel={handleCancelReserva} onCreated={()=>{loadReservas();setShowNewReserve(false)}} />}
                {tab==='fila' && <QueueInline />}
                {tab==='avaliacoes' && <TabAvaliacoes user={user} avaliacoes={avaliacoes} rating={rating} setRating={setRating} comentario={comentario} setComentario={setComentario} sending={avaliacaoSending} enviada={avaliacaoEnviada} onEnviar={handleEnviarAvaliacao} onNovaAvaliacao={()=>setAvaliacaoEnviada(false)} />}
                {tab==='historico' && <TabEmBreve titulo="Histórico de Visitas" descricao="Após suas primeiras visitas ao O Pharol, seu histórico completo com pontos acumulados aparecerá aqui." />}
                {tab==='fidelidade' && <TabEmBreve titulo="Programa de Fidelidade" descricao="Acumule pontos a cada visita e resgate por entradas, sobremesas, vinhos e experiências VIP. Em breve disponível para todos os clientes." />}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
