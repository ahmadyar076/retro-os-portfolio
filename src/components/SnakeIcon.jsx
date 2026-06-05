/**
 * SnakeIcon — pixel-snake-on-a-screen glyph for the Snake.exe desktop icon.
 */
export default function SnakeIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {/* CRT screen */}
      <rect
        x="3"
        y="4"
        width="26"
        height="24"
        fill="#052e16"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Snake body (bright green squares) */}
      <rect x="7" y="9" width="4" height="4" fill="#4ade80" />
      <rect x="11" y="9" width="4" height="4" fill="#4ade80" />
      <rect x="11" y="13" width="4" height="4" fill="#4ade80" />
      <rect x="15" y="13" width="4" height="4" fill="#4ade80" />
      <rect x="15" y="17" width="4" height="4" fill="#4ade80" />
      {/* Food (red) */}
      <rect x="21" y="19" width="4" height="4" fill="#ef4444" />
    </svg>
  )
}
