'use client'

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'

/**
 * An in-page slideshow. Wrap a set of thumbnails in <Gallery slides={…}>, and
 * make each thumbnail a <GalleryTrigger index={…}>. Slides are rendered on the
 * server and passed in. Uses the native <dialog>, so focus stays inside while it
 * is open and Esc closes it; arrow keys and swipes move between slides.
 */

type GalleryContext = { open: (index: number) => void }
const Context = createContext<GalleryContext | null>(null)

export function Gallery({
  slides,
  labels,
  title,
  children
}: {
  slides: React.ReactNode[]
  /** A description of each slide, read out and shown as the caption. */
  labels: string[]
  title: string
  children: React.ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const swipeStart = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const count = slides.length

  const open = useCallback((i: number) => {
    opener.current = document.activeElement as HTMLElement
    setIndex(i)
    setIsOpen(true)
    dialog.current?.showModal()
  }, [])

  const close = useCallback(() => dialog.current?.close(), [])
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count])

  // Lock page scroll while open; restore focus to the thumbnail on close.
  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onClose = () => {
      setIsOpen(false)
      opener.current?.focus()
    }
    el.addEventListener('close', onClose)
    return () => el.removeEventListener('close', onClose)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, go])

  return (
    <Context.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="gallery m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-[#0b0c0e]/90"
        onClick={(e) => {
          // A click on the dim area (not on the slide or the controls) closes it.
          if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop) close()
        }}
        onPointerDown={(e) => (swipeStart.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipeStart.current === null || count < 2) return
          const dx = e.clientX - swipeStart.current
          swipeStart.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}
      >
        {isOpen && (
          <div
            data-backdrop="1"
            className="flex h-full flex-col items-center justify-center gap-5 px-4 py-6 sm:px-20"
          >
            <div className="ui flex w-full max-w-[min(92vw,1400px)] items-center justify-between gap-4 text-sm">
              <p id={titleId} className="truncate text-white/80">
                <span className="font-medium text-white">{title}</span>{' '}
                {count > 1 && (
                  <span className="ml-3 tabular-nums">
                    {index + 1} of {count}
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>
            </div>

            <figure
              key={index}
              className="gallery-slide w-[min(92vw,1400px,calc((100dvh-10rem)*1.6))]"
              aria-roledescription="slide"
            >
              {slides[index]}
              <figcaption className="sr-only">{labels[index]}</figcaption>
            </figure>

            {count > 1 && (
              <div className="ui flex gap-3">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => go(dir)}
                    aria-label={dir < 0 ? 'Previous image' : 'Next image'}
                    className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
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
                        strokeWidth="1.6"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </Context.Provider>
  )
}

/** A thumbnail that opens its gallery at `index`. */
export function GalleryTrigger({
  index,
  label,
  className = '',
  children
}: {
  index: number
  label: string
  className?: string
  children: React.ReactNode
}) {
  const gallery = useContext(Context)
  return (
    <button
      type="button"
      onClick={() => gallery?.open(index)}
      aria-label={label}
      className={`block cursor-zoom-in text-left ${className}`}
    >
      {children}
    </button>
  )
}
