import { NextRequest, NextResponse } from 'next/server'
import { sendBcEvent, type BcEventType } from '@/app/lib/bcconnect'

/**
 * POST /api/lead
 * Cadastro / leads genéricos (ex.: Área do Cliente) → BC Connect.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      eventType,
      email,
      name,
      phone,
      optinAccepted,
      metadata,
    } = body as {
      eventType?: BcEventType
      email?: string
      name?: string
      phone?: string
      optinAccepted?: boolean
      metadata?: Record<string, unknown>
    }

    const emailTrim = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (!emailTrim) {
      return NextResponse.json({ success: true, sent: false })
    }

    const ev: BcEventType =
      eventType && ['SIGNUP', 'RESERVATION', 'PREFERENCE_UPDATE', 'TICKET_PURCHASE', 'LOGIN'].includes(eventType)
        ? eventType
        : 'SIGNUP'

    await sendBcEvent({
      eventType: ev,
      occurredAt: new Date().toISOString(),
      lead: {
        email: emailTrim,
        name: typeof name === 'string' ? name.trim() : undefined,
        phone: typeof phone === 'string' ? phone.replace(/\D/g, '') || undefined : undefined,
      },
      optinAccepted: !!optinAccepted,
      metadata: metadata ?? { source: 'client_area' },
    })

    return NextResponse.json({ success: true, sent: true })
  } catch (error) {
    console.error('[API Lead]', error)
    return NextResponse.json({ success: true, sent: false })
  }
}
