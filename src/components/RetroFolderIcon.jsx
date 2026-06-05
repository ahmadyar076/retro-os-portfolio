/**
 * RetroFolderIcon — bold, brutalist folder glyph (custom SVG, no assets).
 *
 * Thick black outline + white fill + a per-project accent label bar, so icons
 * read as folders while staying distinguishable on the cream grid desktop.
 */
export default function RetroFolderIcon({ accent = '#888', size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      {/* Folder body */}
      <path
        d="M3 8 H12 L15 11 H29 V26 H3 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Accent label bar */}
      <rect x="6" y="15" width="9" height="3.5" fill={accent} />
    </svg>
  )
}
