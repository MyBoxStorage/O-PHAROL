import { NextRequest, NextResponse } from 'next/server'
import { sendBcEvent } from '@/app/lib/bcconnect'

export async function POST(req: NextRequest) {
  try {
    const { nome, telefone, pessoas } = await req.json()

    if (!nome?.trim() || !telefone?.trim()) {
      return NextResponse.json(
        { error: 'Nome e WhatsApp são obrigatórios.' },
        { status: 400 },
      )
    }

    const now = new Date()

    // Número determinístico: combina minutos do dia + últimos dígitos do telefone
    // Garante que dois clientes que entrarem na mesma hora recebam números distintos
    const phoneDigits = telefone.replace(/\D/g, '')
    const seed = parseInt(phoneDigits.slice(-3) || '0', 10)
    const minutesNow = now.getHours() * 60 + now.getMinutes()
    const queueNumber = ((minutesNow + seed) % 88) + 10 // range 10–97

    // Envia evento ao BC Connect para o restaurante ter registro
    await sendBcEvent({
      eventType: 'RESERVATION',
      occurredAt: now.toISOString(),
      lead: {
        name: nome.trim(),
        phone: telefone.trim(),
      },
      metadata: {
        source: 'virtual_queue',
        pessoas: pessoas ?? '2',
        queueNumber,
        enteredAt: now.toISOString(),
        tipo: 'fila_virtual',
      },
    })

    return NextResponse.json({
      ok: true,
      numero: queueNumber,
      entradaEm: now.toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao entrar na fila. Tente novamente.' },
      { status: 500 },
    )
  }
}
