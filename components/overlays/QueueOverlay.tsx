'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type QueueSession = {
  nome: string
  telefone: string
  pessoas: string
  numero: number
  entradaEm: string
}

type QueueOverlayProps = {
  open: boolean
  onClose: () => void
}

const STORAGE_KEY = 'opharol_fila_v1'

export default function QueueOverlay({ open, onClose }: QueueOverlayProps) {
  const [screen, setScreen] = useState<'join' | 'status'>('join')
  const [session, setSession] = useState<QueueSession | null>(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [pessoas, setPessoas] = useState('2')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  // Restaura sessão do localStorage ao montar (válida por 3 horas)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const s: QueueSession = JSON.parse(saved)
        const elapsed = Date.now() - new Date(s.entradaEm).getTime()
        if (elapsed < 3 * 60 * 60 * 1000) {
          setSession(s)
          setScreen('status')
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Limpa campos ao fechar (mantém sessão ativa)
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        if (!session) { setNome(''); setTelefone(''); setPessoas('2'); setErro('') }
      }, 400)
      return () => clearTimeout(t)
    }
  }, [open, session])

  async function handleEntrar() {
    if (!nome.trim() || !telefone.trim()) return
    setLoading(true)
    setErro('')
    try {
      const res = await fetch('/api/fila/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), telefone: telefone.trim(), pessoas }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error || 'Erro ao entrar na fila.'); setLoading(false); return }

      const s: QueueSession = {
        nome: nome.trim(), telefone: telefone.trim(),
        pessoas, numero: data.numero, entradaEm: data.entradaEm,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
      setSession(s)
      setScreen('status')

      // Notifica o restaurante via WhatsApp
      const msg = encodeURIComponent(
        `*Fila Virtual — O Pharol*\n\n` +
        `🔢 Número: ${data.numero}\n👤 Nome: ${nome.trim()}\n` +
        `👥 Pessoas: ${pessoas}\n📱 WhatsApp: ${telefone.trim()}\n\n` +
        `Aguardando chamada para a mesa.`
      )
      window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    }
    setLoading(false)
  }

  function handleSair() {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
    setScreen('join')
    setNome(''); setTelefone(''); setPessoas('2')
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'white', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  }
  const pessoasOpts = ['1', '2', '3', '4', '5', '6', '7', '8+']

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ duration: 0.5 }} style={{ background: 'var(--navy-deep)', color: 'white', overflowY: 'auto' }}>

          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '20px 24px', borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'var(--navy-deep)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem' }}>Fila Virtual — O Pharol</div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 820, paddingBlock: 40 }}>
            {screen === 'join' ? (
              <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Fila Virtual</span>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', marginTop: 0 }}>Entre na fila</h2>
                <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)' }}>
                  Reserve seu lugar sem esperar na porta. O restaurante será notificado e você receberá aviso quando sua mesa estiver pronta.
                </p>
                <div style={{ display: 'grid', gap: 14, marginBottom: 22 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.7)', marginBottom: 6 }}>
                      Seu nome <span style={{ color: 'var(--red-dark)' }}>*</span>
                    </label>
                    <input value={nome} onChange={e => { setNome(e.target.value); setErro('') }} placeholder="Nome completo" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.7)', marginBottom: 6 }}>
                      WhatsApp <span style={{ color: 'var(--red-dark)' }}>*</span>
                    </label>
                    <input value={telefone} onChange={e => { setTelefone(e.target.value); setErro('') }} placeholder="(47) 99999-9999" type="tel" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.7)', marginBottom: 8 }}>
                      Número de pessoas
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                      {pessoasOpts.map((p) => (
                        <button key={p} onClick={() => setPessoas(p)} style={{ border: `1px solid ${pessoas === p ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: pessoas === p ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)', color: pessoas === p ? 'var(--gold)' : 'white', padding: '8px 10px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {erro && (
                  <div style={{ background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.3)', color: '#ff8a80', padding: '10px 14px', fontSize: '0.82rem', marginBottom: 14 }}>{erro}</div>
                )}
                <button className="btn-primary" style={{ width: '100%', opacity: !nome.trim() || !telefone.trim() || loading ? 0.55 : 1, cursor: !nome.trim() || !telefone.trim() || loading ? 'not-allowed' : 'pointer' }} disabled={!nome.trim() || !telefone.trim() || loading} onClick={handleEntrar}>
                  {loading ? 'Entrando na fila…' : 'Entrar na Fila'}
                </button>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 12, textAlign: 'center' }}>
                  Ao entrar, o restaurante será notificado via WhatsApp.
                </p>
              </div>
            ) : session && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Sua Posição na Fila</span>
                <div style={{ marginTop: 4, marginBottom: 12, fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>
                  Olá, <strong style={{ color: 'white' }}>{session.nome}</strong> — {session.pessoas} {session.pessoas === '1' ? 'pessoa' : 'pessoas'}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)', padding: 36 }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '5.5rem', lineHeight: 1 }}>{session.numero}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>Seu número na fila</div>
                  <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', margin: '24px 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', padding: '12px 18px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(37,211,102,0.85)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Avisaremos <strong style={{ color: 'rgba(37,211,102,0.9)' }}>{session.telefone}</strong> quando sua mesa estiver pronta</span>
                  </div>
                </div>
                <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 18px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                  Chegue ao restaurante alguns minutos antes de ser chamado. Nossa equipe confirmará sua chegada e reservará sua mesa imediatamente.
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                  <a href={`https://wa.me/554733673800?text=${encodeURIComponent(`Olá! Estou na fila virtual número ${session.numero}. Nome: ${session.nome} (${session.pessoas} pessoas). WhatsApp: ${session.telefone}`)}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: 'rgba(37,211,102,0.85)', padding: '12px 16px', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600, textDecoration: 'none' }}>
                    Falar com o Restaurante
                  </a>
                  <button className="btn-secondary" style={{ flex: 1, minWidth: 140 }} onClick={handleSair}>Sair da Fila</button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
