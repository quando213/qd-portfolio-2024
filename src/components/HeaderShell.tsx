'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Keeps the header at the top of the screen, but out of the way: it slides up
 * after a deliberate scroll down and comes back as soon as you scroll up. It
 * stays put near the top of the page and whenever it holds keyboard focus.
 *
 * For smoothness, only `transform` and `opacity` are animated: the blurred
 * background is a separate layer that is always rendered and simply fades in,
 * so the browser never has to switch the blur on mid-scroll.
 */
const HIDE_AFTER = 24 // px scrolled down before hiding
const SHOW_AFTER = 8 // px scrolled up before showing
const TOP_ZONE = 64 // always shown this close to the top (about the header's height)
// The background and border only appear past this point. Scrolling down from
// the top, the header has already slid away by then, so it never flashes a
// border on its way out; scrolling back up, it returns with its background.
const BACKGROUND_FROM = 120

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [focused, setFocused] = useState(false)
  const anchor = useRef(0) // where the current scroll direction started

  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = Math.max(0, window.scrollY)
        setScrolled(y > BACKGROUND_FROM)

        if (y < TOP_ZONE) {
          setHidden(false)
        } else {
          const down = y > last
          const wasDown = last > anchor.current
          if (down !== wasDown) anchor.current = last // direction changed
          const travelled = Math.abs(y - anchor.current)
          if (down && travelled > HIDE_AFTER) setHidden(true)
          if (!down && travelled > SHOW_AFTER) setHidden(false)
        }
        last = y
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const show = !hidden || focused

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`sticky top-0 z-40 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
        show ? 'translate-y-0 duration-[260ms]' : '-translate-y-full duration-[380ms]'
      }`}
    >
      {/* Background layer: always present, fades in once the page is scrolled. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-rule bg-paper/85 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: scrolled ? 1 : 0 }}
      />
      {children}
    </div>
  )
}
