/**
 * AboutMe — MS-DOS / Command Prompt style "about" interface.
 *
 * Pure black screen, terminal-green text, strict monospace. Bio data is
 * presented as a sequence of command invocations and their outputs, ending in
 * a blinking cursor block. Opened "bare" (no window padding) so the black
 * screen fills the window's sunken content area edge-to-edge.
 */
export default function AboutMe() {
  return (
    <div className="h-full min-h-full bg-black p-3 font-mono text-[15px] leading-relaxed text-green-500 selection:bg-green-500 selection:text-black">
      {/* Boot banner */}
      <p className="text-green-600">
        Microsoft(R) Windows 98 [Version 4.10.1998]
      </p>
      <p className="mb-3 text-green-600">
        (C) Ahmad Yar Tariq Durrani. All rights reserved.
      </p>

      <Cmd cmd="whoami" />
      <Out>Name: Ahmad Yar Tariq Durrani</Out>
      <Out>Role: Software Engineering Undergrad @ GIKI (6th Semester)</Out>
      <Out>Loc : Peshawar, PK</Out>

      <Cmd cmd="get-skills --category devops" />
      <Out className="text-green-400">
        [Docker, Kubernetes, Ansible, Terraform]
      </Out>

      <Cmd cmd="get-skills --category web" />
      <Out className="text-green-400">
        [React, Next.js, Django, Node.js, Tailwind CSS]
      </Out>

      <Cmd cmd="get-skills --category ml" />
      <Out className="text-green-400">
        [Python, Scikit-Learn, Pandas, Flask]
      </Out>

      <Cmd cmd="list-projects" />
      <Out>- MacroBrain ......... PWA fitness tracker (Next.js, Supabase)</Out>
      <Out>- Netflix Clone ...... Full-stack streaming (React, Node, Firebase)</Out>
      <Out>- AI Fitness Coach ... ML recommender (Python, Flask)</Out>
      <Out>- School LMS ......... LMS for Ittefaq Model School</Out>
      <Out>- Library System ..... Catalogue + lending system</Out>

      <Cmd cmd="contact --list" />
      <Out>
        Email   :{' '}
        <a
          href="mailto:durraniahmadyar@gmail.com"
          className="underline hover:text-green-300"
        >
          durraniahmadyar@gmail.com
        </a>
      </Out>
      <Out>
        GitHub  :{' '}
        <a
          href="https://github.com/ahmadyar076"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300"
        >
          github.com/ahmadyar076
        </a>
      </Out>
      <Out>
        LinkedIn:{' '}
        <a
          href="https://www.linkedin.com/in/ahmad-yar-tariq-durrani-4466662a1"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300"
        >
          /in/ahmad-yar-tariq-durrani
        </a>
      </Out>

      <Cmd cmd="status" />
      <Out>Open to internships &amp; junior software engineering roles.</Out>

      {/* Prompt + blinking cursor */}
      <p className="mt-2 flex items-center">
        <span className="text-green-300">C:\&gt;</span>
        <span className="ml-1 inline-block h-4 w-2.5 animate-pulse bg-green-500" />
      </p>
    </div>
  )
}

/** A command line: `C:\> <cmd>` */
function Cmd({ cmd }) {
  return (
    <p className="mt-3">
      <span className="text-green-300">C:\&gt;</span>{' '}
      <span className="text-white">{cmd}</span>
    </p>
  )
}

/** A line of command output. */
function Out({ children, className = '' }) {
  return <p className={className}>{children}</p>
}
