import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const validEmail = process.env.ADMIN_EMAIL
  const validPassword = process.env.ADMIN_PASSWORD

  if (!validEmail || !validPassword) {
    return NextResponse.json({ error: 'Admin não configurado.' }, { status: 500 })
  }

  if (email.trim() === validEmail && password === validPassword) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
}
