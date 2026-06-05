import { useState, useRef, useEffect } from 'react'
import { projectsData } from '../data/projects.js'

/**
 * Terminal — a functional MS-DOS Prompt window.
 *
 * Black/green monospace screen with a text input at the bottom. Typed commands
 * are parsed by a small command map; output is appended to a scrolling history
 * that auto-scrolls like a real terminal. Opened "bare" so it fills the window.
 */
const PROMPT = 'C:\\PORTFOLIO>'

const BANNER = [
  'Microsoft(R) MS-DOS(R)  Version 6.22',
  '(C) Ahmad Yar Tariq Durrani.',
  '',
  "Type 'help' for a list of commands.",
  '',
]

export default function Terminal() {
  const [history, setHistory] = useState(() =>
    BANNER.map((text) => ({ kind: 'out', text })),
  )
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to the newest line whenever history grows.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  const print = (lines) =>
    setHistory((h) => [
      ...h,
      ...(Array.isArray(lines) ? lines : [lines]).map((text) => ({
        kind: 'out',
        text,
      })),
    ])

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    // Echo the command after the prompt.
    setHistory((h) => [...h, { kind: 'in', text: `${PROMPT} ${raw}` }])
    if (!cmd) return

    const handler = COMMANDS[cmd]
    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([])
      return
    }
    if (handler) print(handler())
    else
      print([
        `'${raw.trim()}' is not recognized as an internal or external command.`,
        "Type 'help' for a list of commands.",
        '',
      ])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  return (
    <div
      onMouseDown={() => inputRef.current?.focus()}
      className="flex h-full min-h-full flex-col bg-black p-3 font-mono text-[15px] leading-snug text-green-500 selection:bg-green-500 selection:text-black"
    >
      {/* Scrolling output */}
      <div className="flex-1">
        {history.map((line, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap break-words ${
              line.kind === 'in' ? 'text-white' : ''
            }`}
          >
            {line.text || ' '}
          </p>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input line */}
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <span className="shrink-0 text-green-300">{PROMPT}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 border-none bg-transparent text-green-500 caret-green-400 outline-none"
        />
      </form>
    </div>
  )
}

/* ── Command map ───────────────────────────────────────────────────────── */
const COMMANDS = {
  help: () => [
    'Available commands:',
    '  help        Show this list',
    '  whoami      Who is this',
    '  skills      List the tech stack',
    '  projects    List portfolio projects',
    '  macrobrain  Show the MacroBrain project details',
    '  contact     Show contact information',
    '  clear       Clear the screen',
    '',
  ],
  whoami: () => [
    'Ahmad Yar Tariq Durrani',
    'Software Engineering Undergrad @ GIKI (6th Semester), Peshawar PK.',
    'Full-stack web | DevOps | Machine Learning.',
    '',
  ],
  skills: () => [
    'WEB    : Next.js, React, Django, Node.js, Tailwind CSS, Supabase',
    'DEVOPS : Docker, Kubernetes, Ansible, Terraform',
    'ML     : Python, Scikit-Learn, Pandas, Flask',
    '',
  ],
  projects: () => [
    'PORTFOLIO PROJECTS:',
    ...projectsData.map((p) => `  - ${p.title} :: ${p.category}`),
    "Type a project id (e.g. 'macrobrain') for details.",
    '',
  ],
  contact: () => [
    'Email    : durraniahmadyar@gmail.com',
    'GitHub   : github.com/ahmadyar076',
    'LinkedIn : /in/ahmad-yar-tariq-durrani',
    '',
  ],
}

// Add a detail command for every project id (e.g. `macrobrain`, `netflix-clone`).
for (const p of projectsData) {
  COMMANDS[p.id] = () => [
    `== ${p.title} ==`,
    p.description,
    `Stack: ${p.techStack.join(', ')}`,
    ...(p.github ? [`Repo : ${p.github}`] : []),
    '',
  ]
}
