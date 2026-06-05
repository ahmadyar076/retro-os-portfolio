import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * BootScreen — fake BIOS / MS-DOS startup sequence shown on first load.
 *
 * Black screen, green monospace text. Lines print in rapidly one by one; the
 * parent (App) unmounts this after ~2.5s and framer-motion fades it out,
 * revealing the desktop underneath.
 */
const LINES = [
  'Starting MS-DOS...',
  'Initializing memory... 640K OK',
  'Loading AHMAD_YAR_OS.sys... OK',
  'Mounting portfolio data... OK',
  '',
  'Launching desktop environment...',
]

export default function BootScreen() {
  const [visible, setVisible] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((n) => (n >= LINES.length ? n : n + 1))
    }, 320)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] overflow-hidden bg-black p-6 font-mono text-[15px] leading-relaxed text-green-500"
    >
      <p className="mb-4 text-green-600">
        AHMAD-YAR BIOS v1.98 — (C) 2026 Energy Star Compliant
      </p>
      {LINES.slice(0, visible).map((line, i) => (
        <p key={i} className="whitespace-pre">
          {line || ' '}
        </p>
      ))}
      <span className="mt-1 inline-block h-4 w-2.5 animate-pulse bg-green-500 align-middle" />
    </motion.div>
  )
}
