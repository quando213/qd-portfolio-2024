import type { Metadata } from 'next'
import Link from 'next/link'
import { earlierWork } from '@/content/projects'
import { Mockup, type Frame } from '@/components/Mockup'
import { ProjectPlaceholder } from '@/components/ProjectVisual'
import { Gallery, GalleryTrigger } from '@/components/Gallery'
import { ScreenshotSlide } from '@/components/ScreenshotSlide'

// Rotate presentations so a row does not repeat itself. Frames that crop the page (corner, detail) are left out: thumbnails are too small for them.
const archiveFrames: Frame[] = ['float', 'browser', 'tilt']

export const metadata: Metadata = {
  title: 'Other work',
  description: 'More projects by Quan Do, with screenshots.'
}

export default function Archive() {
  return (
    <>
      <header className="wrap pt-12 pb-16 sm:pt-20">
        <Link
          href="/#earlier"
          className="ui text-[0.95rem] text-muted transition-colors hover:text-ink"
        >
          Back to the homepage
        </Link>
        <h1 className="display mt-8 text-[clamp(2.75rem,9vw,7rem)]">Other work</h1>
      </header>

      <div className="wrap space-y-20">
        {earlierWork.map((item) => (
          <section
            key={item.slug}
            id={item.slug}
            aria-labelledby={`${item.slug}-title`}
            className="scroll-mt-20 border-t border-rule pt-8"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 id={`${item.slug}-title`} className="display text-[clamp(1.5rem,3vw,2.25rem)]">
                {item.name}
              </h2>
              <div>
                <p className="max-w-[60ch]">{item.description}</p>
                <dl className="ui mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[0.95rem]">
                  <dt className="text-muted">For</dt>
                  <dd>{item.via}</dd>
                  {item.year && (
                    <>
                      <dt className="text-muted">When</dt>
                      <dd>{item.year}</dd>
                    </>
                  )}
                  <dt className="text-muted">Role</dt>
                  <dd>{item.role}</dd>
                  <dt className="text-muted">Stack</dt>
                  <dd>{item.stack}</dd>
                  {item.href && (
                    <>
                      <dt className="text-muted">Live</dt>
                      <dd>
                        <a href={item.href} className="link" target="_blank" rel="noreferrer">
                          {item.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
            {item.shots === 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ProjectPlaceholder project={item} />
              </div>
            )}
            {item.shots > 0 && (
              <Gallery
                title={item.name}
                labels={Array.from(
                  { length: item.shots },
                  (_, i) => `${item.name}, screenshot ${i + 1}`
                )}
                slides={Array.from({ length: item.shots }, (_, i) => (
                  <ScreenshotSlide
                    key={i}
                    src={`/images/earlier/${item.slug}/${i + 1}.jpg`}
                    alt={`${item.name}, screenshot ${i + 1}`}
                  />
                ))}
              >
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: item.shots }, (_, i) => i + 1).map((n) => (
                    <li key={n}>
                      <GalleryTrigger
                        index={n - 1}
                        label={`Open ${item.name} screenshot ${n} of ${item.shots}`}
                        className="w-full transition-opacity hover:opacity-90"
                      >
                        <Mockup
                          shot={{
                            src: `/images/earlier/${item.slug}/${n}.jpg`,
                            frame: archiveFrames[(n - 1) % archiveFrames.length]
                          }}
                          colors={item.colors}
                          themes={item.themes}
                          alt=""
                        />
                      </GalleryTrigger>
                    </li>
                  ))}
                </ul>
              </Gallery>
            )}
          </section>
        ))}
      </div>
    </>
  )
}
