'use client'

import { useRouter } from 'next/navigation'
import AdminOverlay from '@/components/overlays/AdminOverlay'

export default function AdminPage() {
  const router = useRouter()
  return <AdminOverlay open={true} onClose={() => router.push('/')} />
}
