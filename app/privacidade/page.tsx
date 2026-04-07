import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade — O Pharol Restaurante Gourmet',
  description: 'Saiba como O Pharol coleta, usa e protege seus dados pessoais conforme a LGPD (Lei 13.709/2018).',
}

export default function PoliticaPrivacidade() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 820 }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 32, fontSize: '0.8rem', color: 'var(--text-light)' }}>
          <Link href="/" style={{ color: 'var(--navy)', textDecoration: 'none' }}>Início</Link>
          {' '}/{' '}
          <span>Política de Privacidade</span>
        </div>

        {/* Header */}
        <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, marginBottom: 48 }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>LGPD — Lei 13.709/2018</div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', fontWeight: 400, lineHeight: 1.1 }}>
            Política de Privacidade
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

          <Section title="1. Quem somos">
            <p>
              O Pharol Restaurante Gourmet LTDA, inscrito no CNPJ sob o n.º 18.618.919/0001-09, com sede na Av. Atlântica, 2554,
              Balneário Camboriú — SC, CEP 88330-010, é o <strong>controlador</strong> dos dados pessoais coletados por meio
              deste site (<strong>opharol.com.br</strong>) e dos canais digitais associados.
            </p>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail{' '}
              <a href="mailto:opharol@opharol.com.br" style={{ color: 'var(--navy)' }}>opharol@opharol.com.br</a>{' '}
              ou pelo telefone <a href="tel:+554733673800" style={{ color: 'var(--navy)' }}>(47) 3367-3800</a>.
            </p>
          </Section>

          <Section title="2. Quais dados coletamos">
            <p>Coletamos os seguintes dados pessoais nas situações indicadas:</p>
            <ul>
              <li><strong>Reservas:</strong> nome completo, e-mail e número de WhatsApp, data e horário desejados, número de pessoas, preferências de mesa e restrições alimentares.</li>
              <li><strong>Fila Virtual:</strong> nome completo e número de WhatsApp para aviso de disponibilidade de mesa.</li>
              <li><strong>Área do Cliente (cadastro):</strong> nome completo, e-mail, número de WhatsApp e CPF (opcional), além de preferências de pratos e histórico de visitas.</li>
              <li><strong>Avaliações:</strong> nota de 1 a 5 e comentário opcional, vinculados ao e-mail do cliente.</li>
              <li><strong>Dados de navegação:</strong> informações técnicas como endereço IP, tipo de navegador e páginas visitadas, coletados de forma automática para fins de segurança e melhoria do serviço.</li>
            </ul>
          </Section>

          <Section title="3. Para que usamos seus dados">
            <p>Os dados coletados são utilizados para as seguintes finalidades:</p>
            <ul>
              <li>Confirmar e gerenciar reservas de mesa via WhatsApp e e-mail;</li>
              <li>Operar o sistema de fila virtual e notificar o cliente quando a mesa estiver disponível;</li>
              <li>Oferecer experiência personalizada com base em preferências e histórico de visitas;</li>
              <li>Administrar o programa de fidelidade e acumular pontos;</li>
              <li>Enviar comunicações sobre novidades do cardápio, eventos e promoções exclusivas — <strong>somente se o cliente tiver dado consentimento expresso</strong>;</li>
              <li>Compartilhar perfil com parceiros comerciais selecionados para promoções personalizadas — <strong>somente com consentimento específico e revogável a qualquer momento</strong>;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </Section>

          <Section title="4. Base legal para o tratamento">
            <p>O tratamento de dados pessoais é fundamentado nas seguintes bases legais previstas na LGPD:</p>
            <ul>
              <li><strong>Execução de contrato (art. 7.º, V):</strong> dados necessários para concluir a reserva e prestar o serviço solicitado;</li>
              <li><strong>Consentimento (art. 7.º, I):</strong> comunicações de marketing e compartilhamento com parceiros, mediante opt-in livre, específico e informado;</li>
              <li><strong>Legítimo interesse (art. 7.º, IX):</strong> dados de navegação para segurança e melhoria do serviço;</li>
              <li><strong>Cumprimento de obrigação legal (art. 7.º, II):</strong> dados exigidos por legislação fiscal ou regulatória.</li>
            </ul>
          </Section>

          <Section title="5. Compartilhamento de dados">
            <p>Os dados pessoais <strong>não são vendidos</strong> a terceiros. Podemos compartilhá-los com:</p>
            <ul>
              <li><strong>Parceiros comerciais selecionados</strong> (como hotéis, agências de turismo e empresas de entretenimento de Balneário Camboriú) — exclusivamente quando o cliente tiver marcado o opt-in de parceiros;</li>
              <li><strong>Plataforma BC Connect</strong> (CRM utilizado pelo restaurante para gestão de leads e comunicação) — os dados são transmitidos de forma segura via API criptografada;</li>
              <li><strong>Autoridades públicas</strong> quando exigido por lei, decisão judicial ou regulação aplicável.</li>
            </ul>
          </Section>

          <Section title="6. Retenção dos dados">
            <p>
              Os dados são retidos enquanto houver relação ativa com o cliente ou necessidade legal de armazenamento.
              Dados de reservas são mantidos por até <strong>5 anos</strong> para fins fiscais e de auditoria.
              Dados de marketing são eliminados imediatamente após a revogação do consentimento.
            </p>
          </Section>

          <Section title="7. Seus direitos como titular">
            <p>Nos termos da LGPD, você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento dos seus dados;</li>
              <li>Acessar, corrigir ou atualizar seus dados a qualquer momento;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Revogar o consentimento a qualquer momento, sem prejuízo ao serviço principal;</li>
              <li>Solicitar a portabilidade dos seus dados a outro fornecedor;</li>
              <li>Ser informado sobre as entidades com as quais seus dados foram compartilhados;</li>
              <li>Peticionar à Autoridade Nacional de Proteção de Dados (ANPD).</li>
            </ul>
            <p>
              Para exercer qualquer desses direitos, envie um e-mail para{' '}
              <a href="mailto:opharol@opharol.com.br" style={{ color: 'var(--navy)' }}>opharol@opharol.com.br</a>{' '}
              com o assunto <em>"Direitos LGPD"</em>. Responderemos em até 15 dias úteis.
            </p>
          </Section>

          <Section title="8. Cookies e rastreamento">
            <p>
              Este site utiliza cookies técnicos essenciais para o funcionamento correto das funcionalidades de reserva
              e fila virtual. Não utilizamos cookies de rastreamento ou publicidade comportamental de terceiros sem
              o seu consentimento expresso.
            </p>
          </Section>

          <Section title="9. Segurança">
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado,
              perda ou destruição, incluindo comunicação criptografada (HTTPS/TLS) e controle de acesso aos sistemas internos.
            </p>
          </Section>

          <Section title="10. Alterações desta política">
            <p>
              Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no cabeçalho.
              Alterações relevantes serão comunicadas por e-mail aos clientes cadastrados.
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
