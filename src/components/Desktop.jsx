import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import useWindowStore from '../store/windowStore.js'
import useIsMobile from '../hooks/useIsMobile.js'
import Window from './Window.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import RetroFolderIcon from './RetroFolderIcon.jsx'
import TerminalIcon from './TerminalIcon.jsx'
import SnakeIcon from './SnakeIcon.jsx'
import ProjectViewer from './ProjectViewer.jsx'
import SystemProperties from '../apps/SystemProperties.jsx'
import Terminal from '../apps/Terminal.jsx'
import SnakeGame from './SnakeGame.jsx'
import { projectsData } from '../data/projects.js'

/** Per-project accent color for the folder's label bar. */
const ACCENTS = {
  fitness: '#ff4a22',
  video: '#5b8def',
  ai: '#9b59b6',
  mobile: '#2ecc71',
  calendar: '#e67e22',
  lms: '#1abc9c',
  library: '#c0392b',
}

/**
 * Desktop — the classic teal OS surface.
 *
 * Icon grid (system apps + project folders) over solid teal. Single-click
 * selects, double-click opens. Windows render above via the store. System
 * Properties auto-opens on load.
 */
export default function Desktop() {
  const windows = useWindowStore((s) => s.windows)
  const openWindow = useWindowStore((s) => s.openWindow)
  const isMobile = useIsMobile()
  const [selectedId, setSelectedId] = useState(null)

  const openProject = (project) =>
    openWindow({
      id: project.id,
      title: project.title,
      component: <ProjectViewer project={project} />,
      width: 380,
      height: 360,
    })

  const openTerminal = () =>
    openWindow({
      id: 'terminal',
      title: 'MS-DOS Prompt',
      component: <Terminal />,
      width: 540,
      height: 360,
      bare: true,
    })

  const openSnake = () =>
    openWindow({
      id: 'snake',
      title: 'Snake.exe',
      component: <SnakeGame />,
      width: 460,
      height: 560,
      bare: true,
    })

  // Auto-open System Properties once on load (idempotent by id).
  useEffect(() => {
    openWindow({
      id: 'system',
      title: 'System Properties',
      component: <SystemProperties />,
      width: 380,
      height: 320,
      x:
        typeof window !== 'undefined'
          ? Math.max(120, window.innerWidth - 440)
          : 600,
      y: 64,
    })
  }, [openWindow])

  // System apps + project folders, as a single selectable icon list.
  const icons = [
    {
      id: 'terminal',
      label: 'MS-DOS Prompt',
      icon: <TerminalIcon size={36} />,
      open: openTerminal,
    },
    {
      id: 'snake',
      label: 'Snake.exe',
      icon: <SnakeIcon size={36} />,
      open: openSnake,
    },
    ...projectsData.map((project) => ({
      id: project.id,
      label: project.title,
      icon: <RetroFolderIcon accent={ACCENTS[project.icon] ?? '#888'} size={36} />,
      open: () => openProject(project),
    })),
  ]

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-teal">
      <main
        className="absolute inset-0 pb-12"
        onMouseDown={() => setSelectedId(null)}
      >
        {/* Icon layer — responsive grid on mobile, absolute column on desktop. */}
        <div
          className="grid w-full grid-cols-3 content-start gap-3 p-3 sm:grid-cols-4
                     md:absolute md:left-1 md:top-1 md:flex md:max-h-full md:w-auto
                     md:flex-col md:flex-wrap md:gap-0.5 md:p-1"
        >
          {icons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              isMobile={isMobile}
              selected={selectedId === item.id}
              onSelect={() => setSelectedId(item.id)}
              onOpen={item.open}
            />
          ))}
        </div>

        {/* Window layer */}
        <AnimatePresence>
          {windows.map((win) => (
            <Window key={win.id} win={win} />
          ))}
        </AnimatePresence>
      </main>
    </div>
  )
}
