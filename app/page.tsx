'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Credentials from '@/components/Credentials'
import About from '@/components/About'
import Showcase from '@/components/Showcase'
import Menu from '@/components/Menu'
import History from '@/components/History'
import Location from '@/components/Location'
import Valet from '@/components/Valet'
import ReserveSection from '@/components/ReserveSection'
import Footer from '@/components/Footer'
import ReservationOverlay from '@/components/overlays/ReservationOverlay'
import ClientOverlay from '@/components/overlays/ClientOverlay'
import QueueOverlay from '@/components/overlays/QueueOverlay'
import AdminOverlay from '@/components/overlays/AdminOverlay'

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [openReservation, setOpenReservation] = useState(false)
  const [openClient, setOpenClient] = useState(false)
  const [openQueue, setOpenQueue] = useState(false)
  const [openAdmin, setOpenAdmin] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Navbar
        onReserve={() => setOpenReservation(true)}
        onQueue={() => setOpenQueue(true)}
        onClientArea={() => setOpenClient(true)}
      />

      <main>
        <Hero onReserve={() => setOpenReservation(true)} />
        <Credentials />
        <About />
        <Showcase />
        <Menu />
        <History />
        <Location />
        <Valet />
        <ReserveSection onOpenFullReservation={() => setOpenReservation(true)} />
      </main>

      <Footer
        onReserve={() => setOpenReservation(true)}
        onQueue={() => setOpenQueue(true)}
        onClientArea={() => setOpenClient(true)}
        onAdmin={() => setOpenAdmin(true)}
      />

      <ReservationOverlay open={openReservation} onClose={() => setOpenReservation(false)} />
      <ClientOverlay open={openClient} onClose={() => setOpenClient(false)} />
      <QueueOverlay open={openQueue} onClose={() => setOpenQueue(false)} />
      <AdminOverlay open={openAdmin} onClose={() => setOpenAdmin(false)} />
    </>
  )
}
