'use client'

import { motion } from 'framer-motion'
import LogoPharol from './ui/LogoPharol'

type FooterProps = {
  onReserve: () => void
  onQueue: () => void
  onClientArea: () => void
  onAdmin: () => void
}

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.55)',
  fontSize: '0.82rem',
  lineHeight: 1.8,
  transition: 'color 0.3s',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  textAlign: 'left',
  fontFamily: 'inherit',
}

export default function Footer({ onReserve, onQueue, onClientArea, onAdmin }: FooterProps) {
  return (
    <footer
      style={{
        background: 'var(--navy-deep)',
        color: 'rgba(255,255,255,0.6)',
        padding: '100px 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '40%', height: '100%', background: 'radial-gradient(ellipse at 0% 50%, rgba(27,43,107,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Animated gold line */}
        <div style={{ position: 'relative', height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 56, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }}
          />
        </div>

        {/* Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
              <LogoPharol variant="navbar" size={180} onDark />
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.02rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 260 }}>
              Excelência gastronômica na Avenida Atlântica de Balneário Camboriú desde 1986. Um farol que guia aos melhores sabores do mar.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['Instagram', 'TripAdvisor', 'WhatsApp'].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ y: -2, borderColor: 'var(--gold)' }}
                  style={{ border: '1px solid rgba(255,255,255,0.12)', padding: '6px 12px', fontSize: '0.56rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase' }}
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.56rem', fontWeight: 700 }}>Navegação</div>
            <div style={{ display: 'grid', gap: 2 }}>
              {[
                { label: 'O Restaurante', href: '#about' },
                { label: 'Cardápio', href: '#menu' },
                { label: 'Nossa História', href: '#history' },
                { label: 'Localização', href: '#location' },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >{label}</a>
              ))}
              <button onClick={onReserve} style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >Reservas</button>
              <button onClick={onQueue} style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >Fila Virtual</button>
            </div>
          </div>

          {/* Área do Cliente */}
          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.56rem', fontWeight: 700 }}>Área do Cliente</div>
            <div style={{ display: 'grid', gap: 2 }}>
              {[
                { label: 'Minha Área', fn: onClientArea },
                { label: 'Minhas Reservas', fn: onClientArea },
                { label: 'Fidelidade', fn: onClientArea },
                { label: 'Histórico de Visitas', fn: onClientArea },
                { label: 'Admin', fn: onAdmin },
              ].map(({ label, fn }) => (
                <button key={label} onClick={fn} style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.56rem', fontWeight: 700 }}>Contato</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <a href="tel:+554733673800" style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >(47) 3367-3800</a>
              <a href="mailto:opharol@opharol.com.br" style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >opharol@opharol.com.br</a>
              <div style={{ ...linkStyle, cursor: 'default' }}>
                Av. Atlântica, 2554<br />
                Balneário Camboriú — SC
              </div>
              <a
                href={`https://wa.me/554733673800`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(37,211,102,0.1)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  color: 'rgba(37,211,102,0.8)',
                  padding: '7px 14px',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.525 5.84L0 24l6.306-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.368l-.36-.214-3.741.893.942-3.648-.235-.374A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ marginTop: 56, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
          <div>© 2025 O Pharol Restaurante Gourmet LTDA · CNPJ 18.618.919/0001-09</div>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >Política de Privacidade</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >Termos de Uso</a>
          </div>
          <a href="https://globallanding.com.br" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Desenvolvido por <span style={{ color: 'var(--gold)' }}>Global Landing</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
