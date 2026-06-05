import { useState } from 'react'
import profilePic from '../assets/profile.jpeg'

/**
 * SystemProperties — classic Windows "System Properties" dialog.
 *
 * Tabbed control (General / Network). General shows the profile image + a
 * system info readout; Network holds the contact links as classic grey 3D
 * buttons. Auto-opens on load and is reachable from the Start menu.
 */
const GENERAL = [
  ['System:', 'Software Engineering Workstation'],
  ['Registered to:', 'Ahmad Yar'],
  ['Education:', 'GIKI (Junior Year Completed)'],
  ['Uptime:', '19 Years'],
]

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ahmadyar076' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmad-yar-tariq-durrani-4466662a1',
  },
  { label: 'Email', href: 'mailto:durraniahmadyar@gmail.com' },
]

export default function SystemProperties() {
  const [tab, setTab] = useState('general')

  return (
    <div className="flex h-full flex-col text-[15px] text-black">
      {/* Tab strip */}
      <div className="flex gap-1 px-1">
        <Tab active={tab === 'general'} onClick={() => setTab('general')}>
          General
        </Tab>
        <Tab active={tab === 'network'} onClick={() => setTab('network')}>
          Network
        </Tab>
      </div>

      {/* Tab body — raised panel sitting under the tabs. */}
      <div className="win95-outset flex-1 bg-silver p-3">
        {tab === 'general' ? (
          <div className="flex gap-3">
            {/* Profile image — sunken frame. */}
            <div className="win95-inset shrink-0 bg-white p-1">
              <img
                src={profilePic}
                alt="Ahmad Yar"
                className="h-32 w-24 object-cover"
              />
            </div>
            {/* System info readout. */}
            <dl className="flex-1 space-y-2 leading-tight">
              {GENERAL.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-black/60">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="leading-snug">
              Network adapters &amp; external links for this workstation:
            </p>
            <div className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="win95-btn bg-silver px-3 py-2 text-center font-bold text-black"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/** A classic raised/sunken tab header. */
function Tab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-silver px-3 py-1 text-black ${
        active ? 'win95-outset font-bold' : 'win95-outset opacity-70'
      }`}
    >
      {children}
    </button>
  )
}
