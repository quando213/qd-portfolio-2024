'use client'

import { useId, useState } from 'react'
import { Collapse } from '@/components/Collapse'

/**
 * One Selected work row: text on the left, screenshots on the right. The
 * "Show more" toggle sits with the links in the text column, so it costs no
 * height when closed, and the extra detail opens across the full row.
 */
export function ProjectRow({
  id: anchor,
  text,
  links,
  media,
  more
}: {
  /** Anchor for links to this row. */
  id?: string
  text: React.ReactNode
  /** Shown on one line with the toggle, e.g. the live-site link. */
  links?: React.ReactNode
  media: React.ReactNode
  more?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <li
      id={anchor}
      className="grid scroll-mt-16 py-10 md:grid-cols-[minmax(0,3.6fr)_minmax(0,8.4fr)] md:gap-x-10 md:py-14"
    >
      <div>
        {text}
        {(links || more) && (
          <div className="ui mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
            {links}
            {more && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-ink"
              >
                {open ? 'Show less' : 'Show more'}
                <svg
                  viewBox="0 0 16 16"
                  className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      <div className="mt-8 min-w-0 md:mt-0">{media}</div>
      {more && (
        // No row gap here: the padding inside only takes space while open.
        <Collapse open={open} id={id} className="md:col-span-2" innerClassName="pt-8 md:pt-10">
          {more}
        </Collapse>
      )}
    </li>
  )
}
