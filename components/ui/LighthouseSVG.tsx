'use client'

import { motion } from 'framer-motion'

type LighthouseSVGProps = {
  size?: number
  opacity?: number
  animated?: boolean
  showBeam?: boolean
  variant?: 'full' | 'mini' | 'decoration'
}

export default function LighthouseSVG({
  size = 120,
  opacity = 1,
  animated = true,
  showBeam = false,
  variant = 'full',
}: LighthouseSVGProps) {
  const tower = variant === 'mini' ? 'var(--cream)' : 'var(--white)'
  const beamOpacity = variant === 'decoration' ? 0.06 : 0.12

  return (
    <svg
      viewBox="0 0 120 180"
      width={size}
      height={(size * 180) / 120}
      style={{ opacity, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {showBeam && (
        <motion.g
          style={{ transformOrigin: '60px 42px' }}
          animate={animated ? { rotate: [-30, 30, -30] } : undefined}
          transition={animated ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <polygon points="60,42 6,170 114,170" fill={`rgba(201,168,76,${beamOpacity})`} />
        </motion.g>
      )}

      <rect x="34" y="156" width="52" height="18" fill="var(--navy)" />
      <rect x="30" y="148" width="60" height="8" fill="var(--gold)" />

      <polygon points="40,148 80,148 74,54 46,54" fill={tower} />
      <rect x="45" y="78" width="30" height="8" fill="var(--navy)" />
      <rect x="44" y="102" width="32" height="8" fill="var(--navy)" />

      <rect x="50" y="58" width="4" height="12" fill="var(--navy)" />
      <rect x="66" y="58" width="4" height="12" fill="var(--navy)" />

      <path d="M55 168 C55 160, 65 160, 65 168 L65 174 L55 174 Z" fill="var(--navy-deep)" />

      <rect x="47" y="40" width="26" height="14" rx="2" fill="var(--gold)" />
      <polygon points="47,40 73,40 60,26" fill="var(--navy)" />

      <motion.circle
        cx="60"
        cy="46"
        r="3.5"
        fill="rgba(255,220,100,0.9)"
        animate={animated ? { opacity: [0.6, 1, 0.6] } : undefined}
        transition={animated ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
    </svg>
  )
}
