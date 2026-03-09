'use client'

export default function Location() {
  return (
    <section id="location" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 0 }}>
            <span className="section-label">Como nos encontrar</span>
            <h2 className="section-title">No coração da <em style={{ color: 'var(--red)' }}>Av. Atlântica</em></h2>
            <p className="section-sub">Balneário Camboriú — SC</p>
          </div>

          <div style={{ background: 'var(--navy)', padding: 40, marginTop: 28 }}>
            <div style={{ color: 'var(--gold)', marginBottom: 16 }}>📍</div>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--white)', marginBottom: 16 }}>O Pharol Restaurante Gourmet</div>
            <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', marginBottom: 22 }}>
              Avenida Atlântica, 2554 — Sala 01<br />
              Esquina com Rua 2000 · Centro<br />
              Balneário Camboriú — SC · CEP 88330-906
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18 }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Horário de Funcionamento</div>
              {[
                ['Segunda a Domingo', '11h30 — 00h30'],
                ['Sábados', 'Buffet de Feijoada'],
                ['Domingos', 'Buffet Frutos do Mar'],
              ].map(([day, time]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)' }}>
                  <span>{day}</span><span style={{ color: 'var(--gold)' }}>{time}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
              <a href="tel:+554733673800" style={{ color: 'rgba(255,255,255,0.8)' }}>(47) 3367-3800</a>
              <a href="mailto:opharol@opharol.com.br" style={{ color: 'rgba(255,255,255,0.8)' }}>opharol@opharol.com.br</a>
              <a href="https://instagram.com/opharolbc.oficial" target="_blank" style={{ color: 'rgba(255,255,255,0.8)' }}>@opharolbc.oficial</a>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', border: '1px solid var(--cream-dark)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.312!2d-48.63847!3d-26.9947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8e68e0f1c5e0b%3A0xa8c5c5c5c5c5c5c5!2sAv.+Atl%C3%A2ntica%2C+2554+-+Centro%2C+Balne%C3%A1rio+Cambori%C3%BA+-+SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)', display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização O Pharol Restaurante — Av. Atlântica 2554, Balneário Camboriú"
          />
        </div>
      </div>
    </section>
  )
}
