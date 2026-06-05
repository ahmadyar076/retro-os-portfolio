/**
 * DesktopIcon — a generic clickable desktop icon (Windows 95/98 behavior).
 *
 *  - single click → select (blue dotted focus border + navy label).
 *  - double click → open. On mobile (touch) a single tap opens.
 *
 * `icon` is the glyph node (folder, terminal, …); `label` is the caption.
 * mousedown stops propagation so clicking an icon doesn't clear the selection
 * via the desktop's background handler.
 */
export default function DesktopIcon({
  label,
  icon,
  isMobile,
  selected,
  onSelect,
  onOpen,
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={isMobile ? onOpen : onSelect}
      onDoubleClick={isMobile ? undefined : onOpen}
      className={`flex w-full flex-col items-center gap-1 p-1 text-center focus:outline-none md:w-20 ${
        selected ? 'border border-dotted border-blue-300' : 'border border-transparent'
      }`}
    >
      <span
        className={`grid h-12 w-12 place-items-center ${
          selected ? 'bg-[#000080]/40' : ''
        }`}
      >
        {icon}
      </span>
      <span
        className={`px-1 text-base leading-tight ${
          selected
            ? 'bg-[#000080] text-white'
            : 'text-white [text-shadow:1px_1px_0_#000]'
        }`}
      >
        {label}
      </span>
    </button>
  )
}
