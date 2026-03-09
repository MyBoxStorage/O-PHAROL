'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type AdminOverlayProps = {
  open: boolean
  onClose: () => void
}

export default function AdminOverlay({ open, onClose }: AdminOverlayProps) {
  const [panel, setPanel] = useState('dashboard')

  const nav = [
    ['dashboard', 'Dashboard'],
    ['reservas', 'Reservas'],
    ['filas', 'Fila'],
    ['cardapio', 'Cardápio'],
    ['clientes', 'Clientes'],
  ] as const

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay-shell" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5 }} style={{ background: 'var(--cream)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cream-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)' }}>Painel Administrativo — O Pharol</div>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ display: 'flex', height: 'calc(100dvh - 69px)' }}>
            <aside style={{ width: 240, background: 'var(--navy-deep)', color: 'white', overflowY: 'auto', flexShrink: 0 }}>
              <div style={{ padding: '16px 24px 22px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif' }}>O Pharol</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>Área Administrativa</div>
              </div>
              {nav.map(([id, label]) => (
                <button key={id} onClick={() => setPanel(id)} style={{ width: '100%', textAlign: 'left', border: 'none', background: panel === id ? 'rgba(201,168,76,0.08)' : 'transparent', color: panel === id ? 'var(--gold)' : 'rgba(255,255,255,0.75)', borderLeft: panel === id ? '2px solid var(--gold)' : '2px solid transparent', padding: '14px 20px', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </aside>

            <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {panel === 'dashboard' && (
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Dashboard</h2>
                  <p style={{ color: 'var(--text-mid)' }}>Visão geral de hoje — 8 de março de 2026</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                    {[
                      ['Reservas Hoje', '24', '↑ +6 vs ontem'],
                      ['Na Fila Agora', '7', '↑ Alta temporada'],
                      ['Clientes Esperados', '96', '↑ +12 vs semana passada'],
                      ['Avaliação Média', '4.8', '★ Excelente'],
                    ].map(([label, value, delta]) => (
                      <div key={label} style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 16 }}>
                        <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-light)' }}>{label}</div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', color: 'var(--navy)' }}>{value}</motion.div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gold)' }}>{delta}</div>
                      </div>
                    ))}
                  </div>
                  <AdminTable
                    headers={['Cliente', 'Horário', 'Pessoas', 'Mesa', 'Pré-pedido', 'Status']}
                    rows={[
                      ['Maria Silva', '19h00', '4', 'Varanda', 'Lagosta × 2', 'confirmed'],
                      ['João Pereira', '19h30', '2', 'Interno', '—', 'confirmed'],
                      ['Ana Rodrigues', '20h00', '6', 'Varanda', 'Moqueca × 3', 'pending'],
                    ]}
                  />
                </div>
              )}

              {panel === 'reservas' && (
                <AdminTable
                  title="Gestão de Reservas"
                  headers={['Nome', 'Data', 'Horário', 'Pessoas', 'Contato', 'Status']}
                  rows={[
                    ['Carlos Andrade', '15/03/2025', '20h00', '4', '(47) 99123-4567', 'confirmed'],
                    ['Maria Silva', '15/03/2025', '19h00', '2', '(47) 99234-5678', 'confirmed'],
                    ['Pedro García', '16/03/2025', '20h30', '3', '(47) 99345-6789', 'pending'],
                  ]}
                />
              )}

              {panel === 'filas' && (
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Fila Virtual</h2>
                  <p style={{ color: 'var(--text-mid)' }}>Gerenciamento em tempo real</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {['Aguardando (7)', 'Sentados (4)', 'Concluídos'].map((col) => (
                      <div key={col} style={{ background: 'white', border: '1px solid var(--cream-dark)', padding: 12 }}>
                        <strong style={{ color: 'var(--navy)' }}>{col}</strong>
                        <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                          <div style={{ border: '1px solid var(--cream-dark)', padding: 10, display: 'flex', justifyContent: 'space-between' }}>#4 — Família Santos <button>Avançar</button></div>
                          <div style={{ border: '1px solid var(--cream-dark)', padding: 10, display: 'flex', justifyContent: 'space-between' }}>#5 — Carlos &amp; Ana <button>Avançar</button></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {panel === 'cardapio' && (
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>Editor de Cardápio</h2>
                  <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                    {['Lagosta Grelhada p/ 2 pessoas', 'Caldeirada de Frutos do Mar p/ 2', 'Risoto de Frutos do Mar p/ 2', 'Lagosta Thermidor'].map((item) => (
                      <div key={item} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', border: '1px solid var(--cream-dark)', padding: 12 }}>
                        <span>{item}</span>
                        <div style={{ display: 'flex', gap: 8 }}><button>Editar</button> <button>Remover</button></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {panel === 'clientes' && (
                <AdminTable
                  title="Gestão de Clientes"
                  headers={['Nome', 'E-mail', 'WhatsApp', 'Pontos', 'Visitas', 'Cadastro']}
                  rows={[
                    ['Carlos Andrade', 'carlos@email.com', '(47) 99123-4567', '1.240', '12', 'Mar 2023'],
                    ['Maria Fernanda Silva', 'maria@email.com', '(47) 99234-5678', '3.450', '28', 'Jan 2022'],
                    ['Ana Paula Rodrigues', 'ana@email.com', '(47) 99456-7890', '5.120', '44', 'Jun 2021'],
                  ]}
                />
              )}
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AdminTable({ title, headers, rows }: { title?: string; headers: string[]; rows: string[][] }) {
  return (
    <div style={{ marginTop: 18, background: 'white', border: '1px solid var(--cream-dark)' }}>
      {title && <h3 style={{ margin: 0, padding: 14, borderBottom: '1px solid var(--cream-dark)', fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)' }}>{title}</h3>}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head} style={{ padding: 12, textAlign: 'left', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-light)', borderBottom: '1px solid var(--cream-dark)' }}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(27,43,107,0.06)' }}>
                {row.map((cell, idy) => (
                  <td key={idy} style={{ padding: 12, fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}>
                    {['confirmed', 'pending', 'cancelled'].includes(cell) ? <StatusBadge type={cell as 'confirmed' | 'pending' | 'cancelled'} /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ type }: { type: 'confirmed' | 'pending' | 'cancelled' }) {
  const map = {
    confirmed: { label: 'Confirmada', bg: 'rgba(27,43,107,0.12)', color: 'var(--navy)' },
    pending: { label: 'Aguardando', bg: 'rgba(201,168,76,0.22)', color: 'var(--gold-dark)' },
    cancelled: { label: 'Cancelada', bg: 'rgba(200,16,46,0.15)', color: 'var(--red-dark)' },
  }
  return <span style={{ background: map[type].bg, color: map[type].color, padding: '6px 10px', fontSize: '0.8rem' }}>{map[type].label}</span>
}
