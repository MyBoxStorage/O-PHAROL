import { NextRequest, NextResponse } from 'next/server'
import { sendBcEvent } from '@/app/lib/bcconnect'

/**
 * POST /api/avaliacao
 * Recebe avaliação do cliente e envia ao BC Connect como PREFERENCE_UPDATE.
 *
 * Body esperado:
 * {
 *   email: string          // obrigatório
 *   nome?: string
 *   nota: number           // 1–5
 *   comentario?: string
 *   data_visita?: string   // ex: "14 FEV 2025"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, nome, nota, comentario, data_visita } = body as {
      email?: string
      nome?: string
      nota?: number
      comentario?: string
      data_visita?: string
    }

    const emailTrim = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (!emailTrim) {
      return NextResponse.json({ success: false, error: 'E-mail obrigatório.' }, { status: 400 })
    }

    const notaNum = typeof nota === 'number' ? nota : parseInt(String(nota), 10)
    if (!Number.isFinite(notaNum) || notaNum < 1 || notaNum > 5) {
      return NextResponse.json({ success: false, error: 'Nota deve ser entre 1 e 5.' }, { status: 400 })
    }

    const metadata: Record<string, unknown> = {
      rating: notaNum,
      source: 'client_area_review',
    }

    if (comentario?.trim()) metadata.comment = comentario.trim()
    if (data_visita?.trim()) metadata.visitDate = data_visita.trim()

    await sendBcEvent({
      eventType: 'PREFERENCE_UPDATE',
      occurredAt: new Date().toISOString(),
      lead: {
        email: emailTrim,
        name: typeof nome === 'string' ? nome.trim() : undefined,
      },
      optinAccepted: true,
      metadata,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API Avaliação]', error)
    return NextResponse.json({ success: true }) // fail silently para não bloquear o UX
  }
}
