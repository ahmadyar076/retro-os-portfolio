import { useEffect, useState } from 'react'
import StartMenu from './StartMenu.jsx'
import useWindowStore from '../store/windowStore.js'

/**
 * Taskbar — fixed to the bottom of the desktop (Windows 95/98 chrome).
 *
 *  - A button per open window; clicking focuses (restores if minimized);
 *    clicking the active window minimizes it (shown pressed/sunken).
 *  - Start-menu open/close is local component state.
 */
export default function Taskbar() {
  const [startOpen, setStartOpen] = useState(false)
  const [time, setTime] = useState(() => formatTime())

  const windows = useWindowStore((s) => s.windows)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)

  const activeId = windows
    .filter((w) => !w.isMinimized)
    .reduce((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null)?.id

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!startOpen) return
    const close = () => setStartOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [startOpen])

  const handleTaskButton = (win) => {
    if (!win.isMinimized && win.id === activeId) minimizeWindow(win.id)
    else focusWindow(win.id)
  }

  return (
    <footer
      className="win95-outset fixed bottom-0 left-0 z-40 flex h-12 w-full items-center gap-1.5 bg-silver px-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setStartOpen((v) => !v)}
        className={`flex h-9 items-center gap-1.5 bg-silver px-2 text-lg font-bold text-black ${
          startOpen ? 'win95-inset' : 'win95-btn'
        }`}
      >
        <span className="grid h-5 w-5 place-items-center bg-[#000080] text-xs text-white">
          ▌
        </span>
        Start
      </button>

      {/* Open-window button tray. */}
      <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
        {windows.map((win) => {
          const active = !win.isMinimized && win.id === activeId
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => handleTaskButton(win)}
              className={`h-9 max-w-48 shrink-0 truncate bg-silver px-2 text-left text-base text-black ${
                active ? 'win95-inset font-bold' : 'win95-btn'
              }`}
            >
              {win.title}
            </button>
          )
        })}
      </div>

      {/* Clock. */}
      <div className="win95-inset h-9 bg-silver px-3 text-base leading-9 text-black">
        {time}
      </div>

      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
    </footer>
  )
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}
