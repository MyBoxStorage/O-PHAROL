'use client'

import { motion } from 'framer-motion'

type CounterAnimateProps = {
  value: string
  label: string
  sublabel?: string
}

export default function CounterAnimate({ value, label, sublabel }: CounterAnimateProps) {
  return (
    <div>
      <motion.strong initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}>
        {value}
      </motion.strong>
      <div>{label}</div>
      {sublabel && <small>{sublabel}</small>}
    </div>
  )
}
