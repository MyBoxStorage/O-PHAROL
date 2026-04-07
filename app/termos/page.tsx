import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso — O Pharol Restaurante Gourmet',
  description: 'Termos e condições de uso do site e dos serviços digitais d\'O Pharol Restaurante Gourmet.',
}

export default function TermosDeUso() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 820 }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 32, fontSize: '0.8rem', color: 'var(--text-light)' }}>
          <Link href="/" style={{ color: 'var(--navy)', textDecoration: 'none' }}>Início</Link>
          {' '}/{' '}
          <span>Termos de Uso</span>
        </div>

        {/* Header */}
        <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, marginBottom: 48 }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Contrato de Uso</div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', fontWeight: 400, lineHeight: 1.1 }}>
            Termos de Uso
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.1rem', marginTop: 10 }}>
            O Pharol Restaurante Gourmet LTDA — CNPJ 18.618.919/0001-09
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginTop: 6 }}>
            Última atualização: janeiro de 2025
          </p>
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gap: 40, fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-dark)' }}>

          <Section title="1. Aceitação dos termos">
            <p>
              Ao acessar e utilizar o site <strong>opharol.com.br</strong> e seus recursos — incluindo o sistema de reservas,
              fila virtual e área do cliente — você concorda com estes Termos de Uso. Caso não concorde com qualquer
              disposição aqui prevista, solicitamos que não utilize os serviços digitais d'O Pharol.
            </p>
          </Section>

          <Section title="2. Serviços disponíveis">
            <p>O site oferece os seguintes serviços digitais:</p>
            <ul>
              <li><strong>Sistema de reservas:</strong> permite ao usuário selecionar data, horário, número de pessoas e preferências para encaminhar uma solicitação de reserva via WhatsApp. A solicitação enviada não garante automaticamente a reserva — a confirmação é feita pelo restaurante por WhatsApp.</li>
              <li><strong>Fila virtual:</strong> permite ao usuário entrar em uma fila digital para aguardar disponibilidade de mesa, recebendo aviso pelo WhatsApp informado.</li>
              <li><strong>Área do cliente:</strong> espaço para gerenciamento de reservas, acúmulo de pontos de fidelidade e personalização de preferências gastronômicas.</li>
            </ul>
          </Section>

          <Section title="3. Reservas e cancelamentos">
            <p>
              As reservas realizadas via site têm caráter de <strong>solicitação</strong>. A confirmação definitiva
              é realizada pela equipe d'O Pharol por WhatsApp, no número (47) 3367-3800.
            </p>
            <p>
              O cancelamento de uma reserva confirmada deve ser feito com <strong>pelo menos 2 horas de antecedência</strong>
              pelo WhatsApp ou pela Área do Cliente. Reservas para grupos acima de 8 pessoas exigem cancelamento com
              <strong> 24 horas de antecedência</strong>.
            </p>
            <p>
              O restaurante se reserva o direito de cancelar ou realocar reservas em caso de eventos de força maior,
              obras, condições climáticas extremas ou capacidade esgotada, comunicando o cliente com a máxima antecedência possível.
            </p>
          </Section>

          <Section title="4. Programa de fidelidade">
            <p>
              O programa de fidelidade d'O Pharol acumula pontos com base no valor consumido nas visitas registradas.
              Os pontos são de uso exclusivo no próprio restaurante, não são transferíveis, não têm valor monetário
              e podem ser extintos caso o programa seja encerrado, mediante aviso prévio de 30 dias.
            </p>
          </Section>

          <Section title="5. Uso adequado do site">
            <p>O usuário compromete-se a:</p>
            <ul>
              <li>Não inserir informações falsas ou de terceiros nos formulários de reserva ou cadastro;</li>
              <li>Não utilizar os sistemas de reserva ou fila virtual de forma fraudulenta ou para prejudicar outros usuários;</li>
              <li>Não tentar acessar áreas restritas do site (como o painel administrativo) sem autorização;</li>
              <li>Não utilizar scripts automatizados para interagir com os serviços do site.</li>
            </ul>
          </Section>

          <Section title="6. Propriedade intelectual">
            <p>
              Todo o conteúdo do site — incluindo textos, fotografias, vídeos, logotipos e o design da interface —
              é de propriedade d'O Pharol Restaurante Gourmet LTDA ou de seus licenciantes, protegido pela Lei
              9.279/1996 (Propriedade Industrial) e Lei 9.610/1998 (Direitos Autorais).
            </p>
            <p>
              É vedada a reprodução, distribuição ou uso comercial de qualquer elemento do site sem autorização
              prévia e expressa por escrito.
            </p>
          </Section>

          <Section title="7. Limitação de responsabilidade">
            <p>
              O Pharol não se responsabiliza por danos decorrentes de falhas técnicas temporárias no site,
              interrupções de serviços de terceiros (como WhatsApp ou serviços de nuvem), ou uso indevido
              do site por terceiros.
            </p>
            <p>
              As informações do cardápio e preços exibidos no site têm caráter informativo e podem sofrer
              alterações sem aviso prévio. O menu vigente é o apresentado no restaurante no momento da visita.
            </p>
          </Section>

          <Section title="8. Menores de idade">
            <p>
              O site é destinado a pessoas maiores de 18 anos. Menores de idade devem utilizar os serviços
              somente com acompanhamento e consentimento dos responsáveis legais.
            </p>
          </Section>

          <Section title="9. Legislação aplicável e foro">
            <p>
              Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de
              Balneário Camboriú — SC para dirimir eventuais controvérsias, com renúncia expressa a qualquer outro,
              por mais privilegiado que seja.
            </p>
          </Section>

          <Section title="10. Contato">
            <p>
              Para dúvidas, sugestões ou reclamações relacionadas a estes termos:{' '}
              <a href="mailto:opharol@opharol.com.br" style={{ color: 'var(--navy)' }}>opharol@opharol.com.br</a>
              {' '}ou <a href="tel:+554733673800" style={{ color: 'var(--navy)' }}>(47) 3367-3800</a>.
            </p>
            <p>
              Veja também nossa{' '}
              <Link href="/privacidade" style={{ color: 'var(--navy)' }}>Política de Privacidade</Link>.
            </p>
          </Section>

        </div>

        {/* Back */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--navy)', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '0.08em' }}
          >
            ← Voltar ao site
          </Link>
        </div>

      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ margin: '0 0 14px', fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--navy)', fontWeight: 400, borderBottom: '1px solid var(--cream-dark)', paddingBottom: 10 }}>
        {title}
      </h2>
      {children}
    </section>
  )
}
