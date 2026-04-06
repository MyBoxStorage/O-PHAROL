import { NextRequest, NextResponse } from 'next/server'
import { sendBcEvent } from '@/app/lib/bcconnect'

/**
 * POST /api/reserva
 * Captura nome, e-mail e WhatsApp e envia RESERVATION ao BC Connect.
 * O front-end chama antes de abrir o WhatsApp.
 */

function parseGroupSize(pessoas: unknown): number {
  if (pessoas == null) return 1
  const s = String(pessoas).trim()
  if (/^\d+\+/.test(s)) {
    const n = parseInt(s, 10)
    return Number.isFinite(n) && n > 0 ? n : 8
  }
  const digits = s.match(/\d+/)
  if (digits) {
    const n = parseInt(digits[0], 10)
    return Number.isFinite(n) && n > 0 ? n : 1
  }
  return 1
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, email, whatsapp, data, horario, pessoas, preferencias, restricoes, ocasiao } = body

    const emailTrim = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const nomeTrim = typeof nome === 'string' ? nome.trim() : ''

    if (!emailTrim || !nomeTrim) {
      return NextResponse.json({ success: true, sent: false })
    }

    const groupSizeNum = parseGroupSize(pessoas)
    const metadata: Record<string, unknown> = {
      groupSize: groupSizeNum,
      estimatedTicket: groupSizeNum * 130,
    }

    if (data) metadata.reservationDate = data
    if (horario) metadata.reservationTime = horario
    if (ocasiao) metadata.occasionType = ocasiao
    if (preferencias?.length) {
      metadata.preferences = preferencias.map((v: string) => ({ category: 'FOOD', value: v }))
    }
    if (restricoes?.length) metadata.restrictions = restricoes

    await sendBcEvent({
      eventType: 'RESERVATION',
      occurredAt: new Date().toISOString(),
      lead: {
        email: emailTrim,
        name: nomeTrim,
        phone: typeof whatsapp === 'string' ? whatsapp.replace(/\D/g, '') || undefined : undefined,
      },
      optinAccepted: true,
      metadata,
    })

    return NextResponse.json({ success: true, sent: true })
  } catch (error) {
    console.error('[API Reserva]', error)
    return NextResponse.json({ success: true, sent: false })
  }
}
