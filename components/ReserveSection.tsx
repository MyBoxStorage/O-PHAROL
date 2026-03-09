'use client'

import { useState } from 'react'

type ReserveSectionProps = {
  onOpenFullReservation: () => void
}

export default function ReserveSection({ onOpenFullReservation }: ReserveSectionProps) {
  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('11h30')
  const [pessoas, setPessoas] = useState('1 pessoa')
  const [whatsapp, setWhatsapp] = useState('')
  const [preferenciaMesa, setPreferenciaMesa] = useState('Varanda (vista para o mar)')
  const [observacoes, setObservacoes] = useState('')

  const handleSubmit = () => {
    if (!nome.trim() || !data || !whatsapp.trim()) {
      alert('Preencha nome, data e WhatsApp para continuar.')
      return
    }
    const msg = encodeURIComponent(
      `*Reserva — O Pharol*\n\n` +
      `👤 Nome: ${nome}\n` +
      `📅 Data: ${data}\n` +
      `🕐 Horário: ${hora}\n` +
      `👥 Pessoas: ${pessoas}\n` +
      `🪑 Mesa: ${preferenciaMesa}\n` +
      `📱 WhatsApp: ${whatsapp}` +
      (observacoes ? `\n📝 Obs: ${observacoes}` : '')
    )
    window.open(`https://wa.me/554733673800?text=${msg}`, '_blank')
  }

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', padding: '12px 16px' }
  const labelStyle: React.CSSProperties = { color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }

  return (
    <section id="reserve-section" className="section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="section-header">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.7)' }}>Reserve Sua Mesa</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Garanta sua <em style={{ color: 'var(--gold)' }}>experiência</em></h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>Reserve sua mesa com antecedência e personalize sua experiência.</p>
        </div>

        <div style={{ marginTop: 42, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', padding: 48, textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Nome completo</label><input value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Data</label><input type="date" value={data} onChange={(e) => setData(e.target.value)} style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>Horário</label>
              <select value={hora} onChange={(e) => setHora(e.target.value)} style={inputStyle}>
                {['11h30','12h00','12h30','13h00','19h00','19h30','20h00','20h30','21h00','21h30','22h00'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Pessoas</label>
              <select value={pessoas} onChange={(e) => setPessoas(e.target.value)} style={inputStyle}>
                {['1 pessoa','2 pessoas','3 pessoas','4 pessoas','5 pessoas','6+ pessoas'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>WhatsApp</label><input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>Preferência de mesa</label>
              <select value={preferenciaMesa} onChange={(e) => setPreferenciaMesa(e.target.value)} style={inputStyle}>
                {['Varanda (vista para o mar)','Salão interno (climatizado)','Sem preferência'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Observações (alergias, ocasião especial, etc.)</label>
              <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} style={{ ...inputStyle, minHeight: 90 }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>Para grupos acima de 20 pessoas, utilize a área completa de reservas.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleSubmit} className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                Enviar Reserva via WhatsApp
              </button>
              <button onClick={onOpenFullReservation} className="btn-secondary">Reserva Completa</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
