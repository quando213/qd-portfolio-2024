'use client'

import { useId, useRef, useState } from 'react'
import { Collapse } from '@/components/Collapse'

/**
 * A list that shows its first items and reveals the rest on request.
 * Items are rendered on the server and passed in, so the hidden ones cost
 * nothing until they are shown.
 */
export function ShowMore({
  first,
  rest,
  total,
  after,
  className = ''
}: {
  first: React.ReactNode[]
  rest: React.ReactNode[]
  total: number
  /** Shown next to the button, e.g. a related link. */
  after?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const controls = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const closing = open
    setOpen(!open)
    // After closing, bring the button back into view if the list collapsed past it.
    if (closing) {
      setTimeout(() => {
        const el = controls.current
        if (!el) return
        const { top, bottom } = el.getBoundingClientRect()
        if (top < 0 || bottom > window.innerHeight) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
      }, 320)
    }
  }

  return (
    <>
      <ul className={className}>{first}</ul>
      {rest.length > 0 && (
        <Collapse open={open} id={id} innerClassName="pt-10">
          <ul className={className}>{rest}</ul>
        </Collapse>
      )}
      <div ref={controls} className="ui mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        {rest.length > 0 && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={toggle}
            className="rounded-full border border-rule px-5 py-2.5 text-[0.95rem] font-medium transition-colors hover:border-ink"
          >
            {open ? 'Show fewer' : `Show all ${total} projects`}
          </button>
        )}
        {after}
      </div>
    </>
  )
}
