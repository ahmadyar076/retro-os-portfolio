import { useEffect, useState } from 'react'

/**
 * useIsMobile — true when the viewport is at or below the spec's mobile
 * breakpoint (max-width: 768px, i.e. below Tailwind's `md`).
 *
 * Used by the window manager to DISABLE react-rnd on touch/small screens
 * (drag + resize can't be turned off with CSS alone) and switch windows to a
 * full-screen, app-style layout. Icon layout itself is handled with pure
 * Tailwind media queries — this hook is only for the JS-driven rnd behavior.
 */
const QUERY = '(max-width: 768px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
