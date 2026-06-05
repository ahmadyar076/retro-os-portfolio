import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Desktop from './components/Desktop.jsx'
import Taskbar from './components/Taskbar.jsx'
import BootScreen from './components/BootScreen.jsx'

/**
 * App — composes the global layout.
 *
 * A BIOS-style BootScreen overlays everything on first load, then unmounts
 * after ~2.5s and fades out to reveal the desktop. The CRT scanline overlay
 * sits above all UI but is non-interactive.
 */
export default function App() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2500)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Desktop />
      <Taskbar />
      <div className="crt-scanlines" aria-hidden="true" />
      <AnimatePresence>{booting && <BootScreen key="boot" />}</AnimatePresence>
    </>
  )
}
