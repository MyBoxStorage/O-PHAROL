import type { Metadata } from 'next'
import './globals.css'
import { cormorant, greatVibes, montserrat, playfair } from './fonts'

export const metadata: Metadata = {
  title: 'O Pharol Restaurante Gourmet — Excelência Gastronômica desde 1986',
  description:
    'Restaurante gourmet de frutos do mar na Avenida Atlântica de Balneário Camboriú. Tradição desde 1986. Reserve sua mesa.',
  openGraph: {
    title: 'O Pharol Restaurante Gourmet',
    description:
      'Excelência gastronômica na Avenida Atlântica de Balneário Camboriú desde 1986.',
    url: 'https://opharol.com.br',
    siteName: 'O Pharol Restaurante Gourmet',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  )
}
