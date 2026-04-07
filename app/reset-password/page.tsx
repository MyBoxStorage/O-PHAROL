'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import LogoPharol from '@/components/ui/LogoPharol'

function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Supabase redireciona com tokens no hash — precisamos trocar por sessão
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setHasSession(true)
    })
  }, [searchParams])

  async function handleReset() {
    if (password.length < 6) { setErro('Senha mínima: 6 caracteres.'); return }
    if (password !== confirm) { setErro('As senhas não coincidem.'); return }
    setLoading(true); setErro('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setErro('Erro ao redefinir senha. O link pode ter expirado.') }
    else { setSucesso(true); setTimeout(() => router.push('/'), 3000) }
    setLoading(false)
  }

  const inp: React.CSSProperties = {
    padding: '12px 16px', border: '1px solid rgba(255,255,255,0.15)',
    width: '100%', background: 'rgba(255,255,255,0.06)', color: 'white',
    fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ maxWidth: 420, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: 36 }}>
      {sucesso ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✅</div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--gold)', marginBottom: 8 }}>Senha redefinida!</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Redirecionando para o site…</p>
        </div>
      ) : !hasSession ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', marginBottom: 8 }}>Link inválido ou expirado</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: 20 }}>Solicite um novo link de recuperação pela Área do Cliente.</p>
          <button onClick={() => router.push('/')} style={{ background: 'var(--gold)', border: 'none', color: 'var(--navy-deep)', padding: '10px 24px', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Voltar ao site</button>
        </div>
      ) : (
        <>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 6 }}>Nova senha</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: 24 }}>Escolha uma senha com no mínimo 6 caracteres.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            <input type="password" placeholder="Nova senha *" value={password} onChange={e => { setPassword(e.target.value); setErro('') }} style={inp} />
            <input type="password" placeholder="Confirmar senha *" value={confirm} onChange={e => { setConfirm(e.target.value); setErro('') }} style={inp} />
          </div>
          {erro && <div style={{ marginTop: 12, background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.3)', color: '#ff8a80', padding: '10px 14px', fontSize: '0.82rem' }}>{erro}</div>}
          <button onClick={handleReset} disabled={loading} style={{ marginTop: 16, width: '100%', background: 'var(--gold)', border: 'none', color: 'var(--navy-deep)', padding: '12px', cursor: loading ? 'wait' : 'pointer', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Salvando…' : 'Redefinir Senha'}
          </button>
        </>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <main style={{ background: 'var(--navy-deep)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 32 }}>
      <LogoPharol variant="navbar" size={180} onDark />
      <Suspense fallback={<div style={{ color: 'rgba(255,255,255,0.5)' }}>Carregando…</div>}>
        <ResetForm />
      </Suspense>
    </main>
  )
}
