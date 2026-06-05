/**
 * TerminalIcon — small CRT-monitor glyph for the MS-DOS Prompt desktop icon.
 */
export default function TerminalIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {/* Monitor body */}
      <rect
        x="3"
        y="4"
        width="26"
        height="20"
        fill="#c0c0c0"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Screen */}
      <rect x="6" y="7" width="20" height="14" fill="#000" />
      {/* Prompt text */}
      <text
        x="8"
        y="16"
        fontFamily="monospace"
        fontSize="7"
        fill="#22c55e"
      >
        {'>_'}
      </text>
      {/* Stand */}
      <rect x="12" y="24" width="8" height="3" fill="#808080" stroke="#000" strokeWidth="1" />
      <rect x="9" y="27" width="14" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
    </svg>
  )
}
