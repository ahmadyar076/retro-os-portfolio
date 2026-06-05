import useWindowStore from '../store/windowStore.js'
import AboutMe from '../apps/AboutMe.jsx'
import SystemProperties from '../apps/SystemProperties.jsx'
import Terminal from '../apps/Terminal.jsx'
import SnakeGame from './SnakeGame.jsx'

/**
 * StartMenu — Windows 95/98 style menu panel above the Start button.
 *
 * Items dispatch real windows; "Shut Down…" is a stub. Selecting any item
 * closes the menu via `onClose`.
 */
export default function StartMenu({ open, onClose }) {
  const openWindow = useWindowStore((s) => s.openWindow)

  if (!open) return null

  const items = [
    {
      label: 'About Me',
      action: () =>
        openWindow({
          id: 'about',
          title: 'C:\\ABOUT.EXE',
          component: <AboutMe />,
          width: 460,
          height: 480,
          bare: true,
        }),
    },
    {
      label: 'MS-DOS Prompt',
      action: () =>
        openWindow({
          id: 'terminal',
          title: 'MS-DOS Prompt',
          component: <Terminal />,
          width: 540,
          height: 360,
          bare: true,
        }),
    },
    {
      label: 'System Properties',
      action: () =>
        openWindow({
          id: 'system',
          title: 'System Properties',
          component: <SystemProperties />,
          width: 380,
          height: 320,
        }),
    },
    {
      label: 'Snake.exe',
      action: () =>
        openWindow({
          id: 'snake',
          title: 'Snake.exe',
          component: <SnakeGame />,
          width: 460,
          height: 560,
          bare: true,
        }),
    },
    { label: 'Shut Down…' }, // stub
  ]

  const handle = (item) => {
    item.action?.()
    onClose?.()
  }

  return (
    <div className="win95-outset absolute bottom-12 left-0 z-50 w-60 bg-silver p-0.5">
      <div className="flex">
        {/* Vertical "RETRO OS" gutter, like the Windows logo stripe. */}
        <div className="flex w-8 items-end justify-center bg-gradient-to-b from-[#000080] to-[#1084d0] pb-3">
          <span className="origin-bottom-left -rotate-90 whitespace-nowrap text-base font-bold uppercase tracking-widest text-white">
            Retro&nbsp;OS
          </span>
        </div>

        <ul className="flex-1 py-1">
          {items.map((item) => (
            <li
              key={item.label}
              onClick={() => handle(item)}
              className="cursor-pointer px-3 py-1.5 text-lg text-black hover:bg-[#000080] hover:text-white"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
