import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import useWindowStore from '../store/windowStore.js'
import useIsMobile from '../hooks/useIsMobile.js'

/**
 * Window — draggable/resizable app shell, authentic Windows 95/98 chrome.
 *
 * Desktop (≥ md): `react-rnd` — drag restricted to the title bar, resize from
 * edges, clamped to the desktop. mousedown focuses (z-index).
 * Mobile (≤ 768px): react-rnd DISABLED; full-screen `inset-0` app panel.
 *
 * Styling: silver frame with a raised 3D "outset" bevel (.win95-outset), a navy
 * gradient title bar, a sunken (.win95-inset) content area, and raised square
 * window-control buttons that press in on :active. `win.bare` drops the body
 * padding (used by the DOS terminal so it can fill edge-to-edge).
 */
export default function Window({ win }) {
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const isMobile = useIsMobile()

  const anim = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 0.15, ease: 'easeOut' },
  }

  // Shared inner chrome (title bar + content).
  const Chrome = (
    <>
      {/* Title bar — navy gradient; the ONLY drag handle on desktop. */}
      <div className="window-titlebar m-0.5 flex shrink-0 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1.5 py-1 text-white md:cursor-move">
        <span className="truncate text-base font-bold uppercase tracking-wide">
          {win.title}
        </span>
        <div className="flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
          {!isMobile && (
            <TitleButton label="Minimize" onClick={() => minimizeWindow(win.id)}>
              _
            </TitleButton>
          )}
          <TitleButton label="Close" onClick={() => closeWindow(win.id)}>
            {isMobile ? '✕ CLOSE' : '✕'}
          </TitleButton>
        </div>
      </div>

      {/* Content area — sunken screen. */}
      <div
        className={`win95-inset m-0.5 mt-0 flex-1 overflow-auto bg-white ${
          win.bare ? 'p-0' : 'p-3'
        }`}
      >
        {win.component}
      </div>
    </>
  )

  // ── Mobile: full-screen app panel, no react-rnd ──────────────────────────
  if (isMobile) {
    return (
      <motion.div
        {...anim}
        onMouseDown={() => focusWindow(win.id)}
        style={{
          zIndex: win.zIndex + 100,
          display: win.isMinimized ? 'none' : 'flex',
        }}
        className="win95-outset fixed inset-0 flex-col bg-silver"
      >
        {Chrome}
      </motion.div>
    )
  }

  // ── Desktop: draggable / resizable react-rnd window ──────────────────────
  return (
    <Rnd
      default={{ x: win.x, y: win.y, width: win.width, height: win.height }}
      minWidth={240}
      minHeight={140}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      onDragStart={() => focusWindow(win.id)}
      onResizeStart={() => focusWindow(win.id)}
      style={{
        zIndex: win.zIndex,
        display: win.isMinimized ? 'none' : 'flex',
      }}
      className="win95-outset bg-silver"
    >
      <motion.div
        {...anim}
        onMouseDown={() => focusWindow(win.id)}
        className="flex h-full w-full flex-col"
      >
        {Chrome}
      </motion.div>
    </Rnd>
  )
}

/** Raised, square Win95 title-bar button (presses in on click). */
function TitleButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="win95-btn grid h-5 min-w-5 place-items-center bg-silver px-1 text-sm font-bold leading-none text-black"
    >
      {children}
    </button>
  )
}
