'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type ClientOverlayProps = {
  open: boolean
  onClose: () => void
}

export default function ClientOverlay({ open, onClose }: ClientOverlayProps) {
  const [screen, setScreen] = useState<'auth' | 'dashboard'>('auth')
  const [isRegister, setIsRegister] = useState(false)
  const [tab, setTab] = useState('reservas')
  const [rating, setRating] = useState(0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5 }} style={{ background: 'var(--cream)', overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', background: 'var(--cream)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Área do Cliente</div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div className="container" style={{ maxWidth: 980, paddingBlock: 28 }}>
            {screen === 'auth' ? (
              <div style={{ maxWidth: 460, margin: '0 auto', background: 'white', border: '1px solid var(--cream-dark)', padding: 26 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Bem-vindo</h2>
                <p style={{ color: 'var(--text-mid)' }}>Entre na sua conta O Pharol</p>

                <div style={{ display: 'grid', gap: 12 }}>
                  {isRegister && <input placeholder="Nome Completo" style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />}
                  <input placeholder="E-mail" style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />
                  {isRegister && (
                    <select style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }}>
                      <option>Masculino</option><option>Feminino</option><option>Prefiro não informar</option>
                    </select>
                  )}
                  {isRegister && <input placeholder="CPF" style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />}
                  {isRegister && <input placeholder="WhatsApp" style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />}
                  <input placeholder="Senha" type="password" style={{ padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />
                </div>

                <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => setScreen('dashboard')}>
                  {isRegister ? 'Criar Conta' : 'Entrar'}
                </button>
                <p style={{ textAlign: 'center', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                  {isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}
                  <button onClick={() => setIsRegister((prev) => !prev)} style={{ border: 'none', background: 'transparent', color: 'var(--navy)', cursor: 'pointer', fontWeight: 600 }}>
                    {isRegister ? 'Entrar' : 'Cadastre-se'}
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--navy)' }}>Olá, Carlos Andrade 👋</div>
                  <div style={{ color: 'var(--text-mid)' }}>Membro desde março de 2023 · Cliente Especial O Pharol</div>
                </div>

                <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--cream-dark)', marginBottom: 20, overflowX: 'auto' }}>
                  {['reservas', 'fidelidade', 'historico', 'avaliacoes'].map((t) => (
                    <button key={t} onClick={() => setTab(t)} style={{ border: 'none', background: 'transparent', padding: '10px 14px', color: tab === t ? 'var(--navy)' : 'var(--text-light)', fontWeight: tab === t ? 600 : 400, cursor: 'pointer' }}>
                      {t === 'reservas' ? 'Reservas' : t === 'fidelidade' ? 'Fidelidade' : t === 'historico' ? 'Histórico' : 'Avaliações'}
                    </button>
                  ))}
                </div>

                {tab === 'reservas' && (
                  <div style={{ display: 'grid', gap: 10 }}>
                    <ReservCard title="Sábado, 15 de Março de 2025" subtitle="20h00 · 4 pessoas · Varanda com vista para o mar" status="Confirmada" type="confirmed" />
                    <ReservCard title="Domingo, 22 de Março de 2025" subtitle="12h30 · 2 pessoas · Salão interno" status="Aguardando" type="pending" />
                  </div>
                )}

                {tab === 'fidelidade' && (
                  <div style={{ display: 'grid', gap: 16 }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--navy-deep), var(--navy))', color: 'white', padding: 24 }}>
                      <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>O Pharol Fidelidade</div>
                      <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2.8rem', color: 'var(--gold)' }}>1.240</div>
                      <div>Pontos acumulados</div>
                      <div style={{ marginTop: 12, height: 8, background: 'rgba(255,255,255,0.2)' }}>
                        <motion.div animate={{ width: '83%' }} transition={{ duration: 1, delay: 0.3 }} style={{ height: '100%', background: 'var(--gold)' }} />
                      </div>
                    </div>
                    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 20, fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem' }}>🎂 15% no aniversário · ⭐ 1.500 pts Sobremesa · ⭐⭐ 3.000 pts Entrada · ⭐⭐⭐ 5.000 pts Jantar</div>
                  </div>
                )}

                {tab === 'historico' && (
                  <div style={{ display: 'grid', gap: 10 }}>
                    <HistoryRow date="14 FEV 2025 · 20h30 · Jantar" dishes="Lagosta Grelhada × 2 · Vinho Rosé · Pêtit Gâteau" total="R$ 890,00" points="+89 pontos" />
                    <HistoryRow date="08 JAN 2025 · 13h00 · Almoço" dishes="Caldeirada de Frutos do Mar · Sangria" total="R$ 420,00" points="+42 pontos" />
                    <HistoryRow date="31 DEZ 2024 · 21h00 · Réveillon" dishes="Rodízio de Frutos do Mar × 4 · Champagne" total="R$ 1.240,00" points="+124 pontos" />
                  </div>
                )}

                {tab === 'avaliacoes' && (
                  <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 24 }}>
                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Avalie sua última visita</div>
                    <div style={{ marginBottom: 12, color: 'var(--text-mid)' }}>14 de Fevereiro, 2025</div>
                    <div style={{ display: 'flex', gap: 8, fontSize: '1.8rem', marginBottom: 16 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button key={i} onClick={() => setRating(i + 1)} style={{ border: 'none', background: 'transparent', color: i < rating ? 'var(--gold)' : 'var(--text-light)', cursor: 'pointer' }}>
                          {i < rating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                    <textarea placeholder="Como foi sua experiência?" style={{ width: '100%', minHeight: 90, padding: '10px 14px', border: '1px solid var(--cream-dark)' }} />
                    <button style={{ marginTop: 12, border: 'none', background: 'var(--navy)', color: 'white', padding: '10px 16px', cursor: 'pointer' }}>Enviar Avaliação</button>
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

function ReservCard({ title, subtitle, status, type }: { title: string; subtitle: string; status: string; type: 'confirmed' | 'pending' | 'cancelled' }) {
  const colors = { confirmed: { bg: 'rgba(27,43,107,0.1)', color: 'var(--navy)' }, pending: { bg: 'rgba(201,168,76,0.25)', color: 'var(--gold-dark)' }, cancelled: { bg: 'rgba(200,16,46,0.15)', color: 'var(--red-dark)' } }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, background: 'white', border: '1px solid var(--cream-dark)', padding: 14 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{title}</div>
        <div style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>{subtitle}</div>
      </div>
      <span style={{ alignSelf: 'start', background: colors[type].bg, color: colors[type].color, padding: '6px 10px', fontSize: '0.75rem' }}>{status}</span>
    </div>
  )
}

function HistoryRow({ date, dishes, total, points }: { date: string; dishes: string; total: string; points: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ color: 'var(--navy)', fontWeight: 500 }}>{date}</div>
        <div style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>{dishes}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ color: 'var(--navy)' }}>{total}</div>
        <div style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>{points}</div>
      </div>
    </div>
  )
}
