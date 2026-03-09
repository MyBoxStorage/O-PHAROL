'use client'

import { motion } from 'framer-motion'
import LighthouseSVG from './ui/LighthouseSVG'

type FooterProps = {
  onReserve: () => void
  onQueue: () => void
  onClientArea: () => void
  onAdmin: () => void
}

export default function Footer({ onReserve, onQueue, onClientArea, onAdmin }: FooterProps) {
  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'rgba(255,255,255,0.72)', padding: '90px 0 26px' }}>
      <div className="container">
        <motion.div initial={{ width: '0%' }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ height: 1, background: 'var(--gold)', marginBottom: 40 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <LighthouseSVG size={32} variant="mini" />
              <div>
                <div style={{ fontFamily: 'var(--font-playfair), serif', letterSpacing: '0.15em', color: 'white' }}>O PHAROL</div>
                <div style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)' }}>Restaurante Gourmet</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.02rem', color: 'rgba(255,255,255,0.65)' }}>Excelência gastronômica na Avenida Atlântica de Balneário Camboriú desde 1986. Um farol que guia aos melhores sabores do mar.</p>
          </div>

          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.6rem' }}>Navegação</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <a href="#about">O Restaurante</a>
              <a href="#menu">Cardápio</a>
              <a href="#history">Nossa História</a>
              <a href="#location">Localização</a>
              <button onClick={onReserve} style={{ all: 'unset', cursor: 'pointer' }}>Reservas</button>
              <button onClick={onQueue} style={{ all: 'unset', cursor: 'pointer' }}>Fila Virtual</button>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.6rem' }}>Área do Cliente</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <button onClick={onClientArea} style={{ all: 'unset', cursor: 'pointer' }}>Minha Área</button>
              <button onClick={onClientArea} style={{ all: 'unset', cursor: 'pointer' }}>Minhas Reservas</button>
              <button onClick={onClientArea} style={{ all: 'unset', cursor: 'pointer' }}>Fidelidade</button>
              <button onClick={onClientArea} style={{ all: 'unset', cursor: 'pointer' }}>Histórico de Visitas</button>
              <button onClick={onAdmin} style={{ all: 'unset', cursor: 'pointer' }}>Admin</button>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--gold)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.6rem' }}>Contato</div>
            <div style={{ display: 'grid', gap: 12 }}>
              <a href="tel:+554733673800">(47) 3367-3800</a>
              <a href="mailto:opharol@opharol.com.br">opharol@opharol.com.br</a>
              <div>Av. Atlântica, 2554<br />Balneário Camboriú — SC</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>© 2024 O Pharol Restaurante Gourmet LTDA · CNPJ 18.618.919/0001-09</div>
          <div style={{ display: 'flex', gap: 14 }}><a href="#">Política de Privacidade</a><a href="#">Termos de Uso</a></div>
          <a href="https://globallanding.com.br" target="_blank" rel="noreferrer">Desenvolvido por <span style={{ color: 'var(--gold)' }}>Global Landing</span></a>
        </div>
      </div>
    </footer>
  )
}
