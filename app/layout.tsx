import type { Metadata } from 'next'
import './globals.css'
import { cormorant, greatVibes, montserrat, playfair } from './fonts'

export const metadata: Metadata = {
  metadataBase: new URL('https://o-pharol.vercel.app'),
  title: 'O Pharol Restaurante Gourmet — Excelência Gastronômica desde 1986',
  description:
    'Restaurante gourmet de frutos do mar na Avenida Atlântica de Balneário Camboriú. Tradição desde 1986. Reserve sua mesa.',
  openGraph: {
    title: 'O Pharol Restaurante Gourmet',
    description:
      'Excelência gastronômica na Avenida Atlântica de Balneário Camboriú desde 1986.',
    url: 'https://o-pharol.vercel.app',
    siteName: 'O Pharol Restaurante Gourmet',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/djhevgyvi/video/upload/so_2,w_1200,h_630,c_fill/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.jpg',
        width: 1200,
        height: 630,
        alt: 'O Pharol Restaurante Gourmet — Av. Atlântica, Balneário Camboriú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O Pharol Restaurante Gourmet',
    description: 'Excelência gastronômica na Avenida Atlântica de Balneário Camboriú desde 1986.',
    images: ['https://res.cloudinary.com/djhevgyvi/video/upload/so_2,w_1200,h_630,c_fill/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://o-pharol.vercel.app',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'O Pharol Restaurante Gourmet',
  description: 'Restaurante gourmet de frutos do mar na Avenida Atlântica de Balneário Camboriú. Tradição desde 1986.',
  url: 'https://o-pharol.vercel.app',
  logo: 'https://o-pharol.vercel.app/favicon.svg',
  image: 'https://res.cloudinary.com/djhevgyvi/video/upload/so_2,w_1200,h_630,c_fill/v1773003461/O_Pharol_convida_voc%C3%AA_a_explorar_nossa_incr%C3%ADvel_variedade_de_pratos_no_card%C3%A1pio._Temos_muitas_op_kp475z.jpg',
  telephone: '+55-47-3367-3800',
  email: 'opharol@opharol.com.br',
  foundingDate: '1986',
  servesCuisine: ['Frutos do Mar', 'Gourmet', 'Brasileiro'],
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Atlântica, 2554',
    addressLocality: 'Balneário Camboriú',
    addressRegion: 'SC',
    postalCode: '88330-010',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.9932,
    longitude: -48.6344,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:30',
      closes: '22:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '11:30',
      closes: '23:00',
    },
  ],
  hasMap: 'https://maps.google.com/?q=Av.+Atlântica,+2554,+Balneário+Camboriú',
  sameAs: [
    'https://www.instagram.com/opharolbc.oficial',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        {/* Schema.org — Restaurant (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* BC Connect Widget — captura de leads opt-in */}
        <script
          src="https://bc-connect-api-v2.fly.dev/widget.js"
          data-key="bcc_dbc12a78-6a51-4acd-a968-22f4b334d24a"
          data-primary="#8B1A1A"
          data-bg="#0f0a06"
          data-text="#f5f0e8"
          data-radius="4"
          data-font="Cormorant Garamond, Georgia, serif"
          data-auto="true"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
