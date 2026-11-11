'use client'

import { Children, useCallback, useEffect, useRef, useState } from 'react'

/**
 * A horizontal row of mockups that scrolls with touch, trackpad or the
 * buttons. Children should be fixed-height items whose width follows their
 * aspect ratio. The buttons step one item at a time, so each click lands on
 * the start of the next or previous screenshot.
 */
export function ShotStrip({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const items = [...el.children] as HTMLElement[]
    const origin = items[0]?.offsetLeft ?? 0
    const starts = items.map((item) => item.offsetLeft - origin)
    const max = el.scrollWidth - el.clientWidth
    const x = el.scrollLeft
    const target =
      dir > 0
        ? (starts.find((s) => s > x + 2) ?? max)
        : ([...starts].reverse().find((s) => s < x - 2) ?? 0)
    el.scrollTo({ left: Math.min(target, max), behavior: 'smooth' })
  }

  return (
    <div className="min-w-0">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {Children.count(children) > 1 && (
        <div className="ui mt-3 flex gap-2">
          {([-1, 1] as const).map((dir) => {
            const disabled = dir < 0 ? atStart : atEnd
            return (
              <button
                key={dir}
                type="button"
                onClick={() => step(dir)}
                disabled={disabled}
                aria-label={dir < 0 ? 'Previous screenshot' : 'Next screenshot'}
                className="grid size-9 place-items-center rounded-full border border-rule text-muted transition-colors enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 16 16"
                  className={`size-4 ${dir < 0 ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
