/**
 * Animates content open and closed by transitioning the grid row from 0fr to
 * 1fr, which needs no measured heights. Closed content is inert, so it can't
 * be focused or read out. `innerClassName` is applied inside the clipped area,
 * e.g. padding that restores a parent grid's gap only while open.
 */
export function Collapse({
  open,
  id,
  className = '',
  innerClassName = '',
  children
}: {
  open: boolean
  id?: string
  className?: string
  innerClassName?: string
  children: React.ReactNode
}) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      } ${className}`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={innerClassName}>{children}</div>
      </div>
    </div>
  )
}
