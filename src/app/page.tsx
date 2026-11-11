import Link from 'next/link'
import { profile, experience, education } from '@/content/profile'
import {
  projects,
  earlierWork,
  heroScreens,
  showCaseStudies,
  type EarlierProject
} from '@/content/projects'
import { ShowMore } from '@/components/ShowMore'
import { Gallery, GalleryTrigger } from '@/components/Gallery'
import { ScreenshotSlide } from '@/components/ScreenshotSlide'
import { ProjectMore } from '@/components/ProjectMore'
import { ProjectRow } from '@/components/ProjectRow'
import { ProjectPlaceholder, ProjectVisual } from '@/components/ProjectVisual'
import { ShotStrip } from '@/components/ShotStrip'
import { Laptop, Mockup, PhoneSvg, TabletSvg } from '@/components/Mockup'

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="display scroll-mt-20 text-[clamp(1.75rem,3.5vw,2.5rem)]">
      {children}
    </h2>
  )
}

// Featured projects first, then the rest in their listed order.
// The first three show by default; featured projects come next, then the rest.
const leading = ['veevoy-website', 'medihome-care', 'westlife-tour']
const otherWork = [
  ...leading.map((slug) => earlierWork.find((item) => item.slug === slug)!),
  ...earlierWork.filter((item) => item.highlight && !leading.includes(item.slug)),
  ...earlierWork.filter((item) => !item.highlight && !leading.includes(item.slug))
]

function OtherWorkCard({ item }: { item: EarlierProject }) {
  const shots = Array.from(
    { length: item.shots },
    (_, i) => `/images/earlier/${item.slug}/${i + 1}.jpg`
  )
  return (
    <li>
      {item.shots > 0 ? (
        <Gallery
          title={item.name}
          labels={shots.map((_, i) => `${item.name}, screenshot ${i + 1}`)}
          slides={shots.map((src, i) => (
            <ScreenshotSlide key={src} src={src} alt={`${item.name}, screenshot ${i + 1}`} />
          ))}
        >
          <GalleryTrigger index={0} label={`Open ${item.name} screenshots`} className="w-full">
            <Mockup
              shot={item.cover ?? { src: shots[0], frame: 'float' }}
              colors={item.colors}
              themes={item.themes}
              alt=""
            />
          </GalleryTrigger>
        </Gallery>
      ) : (
        <ProjectPlaceholder project={item} />
      )}
      <h3 className="ui mt-4 font-medium">
        <Link href={`/archive/#${item.slug}`} className="transition-colors hover:text-accent">
          {item.name}
        </Link>
      </h3>
      <p className="mt-1 text-muted">{item.blurb ?? item.description}</p>
      <p className="ui mt-2 text-sm text-muted">
        {[item.via, item.year].filter(Boolean).join(', ')}
      </p>
    </li>
  )
}

/**
 * Devices from several projects, layered on the page itself and running off its
 * right edge. The negative margin reaches past the page padding to the window edge.
 * Positions keep every screen inside the box, so nothing overlaps the facts below.
 */
function HeroScreens() {
  const [frontPhone, backPhone] = heroScreens.phones
  return (
    <div
      role="img"
      aria-label={heroScreens.label}
      className="relative -mr-[var(--pad)] aspect-[6/5] lg:mr-[calc(-1*(var(--pad)+max(0px,(100vw-90rem)/2)))]"
    >
      <Laptop
        src={heroScreens.laptop}
        alt=""
        id="hero-laptop"
        crop="left"
        className="absolute top-[4%] left-[16%] w-[104%]"
      />
      <TabletSvg
        src={heroScreens.tablet}
        alt=""
        id="hero-tablet"
        crop="left"
        className="absolute bottom-[2%] left-0 w-[54%]"
      />
      <PhoneSvg
        src={backPhone}
        alt=""
        id="hero-phone-b"
        className="absolute top-[38%] left-[74%] h-[54%]"
      />
      <PhoneSvg
        src={frontPhone}
        alt=""
        id="hero-phone-a"
        className="absolute top-[44%] left-[52%] h-[54%]"
      />
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-x-clip">
        {/* On wide, short desktop screens the hero would end with the facts row
            cut off at the bottom edge. There, the facts row is moved to the
            bottom of a grid a little taller than the screen, so it starts just
            below the fold. Taller screens fit the whole hero and are left alone. */}
        <div className="wrap pt-16 pb-16 sm:pt-24 sm:pb-28 lg:pt-8">
          <div className="rise grid gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] short-desktop:min-h-[calc(100svh-var(--header-h)-2rem+8rem)] short-desktop:grid-rows-[auto_1fr_auto] lg:items-center lg:gap-x-12">
            <div>
              <p className="ui text-[0.95rem] text-muted">
                {/* Says who the "I" in the headline is. */}
                {profile.name} — {profile.role}
              </p>
              <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.4rem,7.5vw,4.75rem)] text-balance lg:text-[clamp(2.75rem,4.4vw,3.95rem)]">
                {/* Keep hyphenated words like "data-heavy" on one line. */}
                {profile.headline.split(' ').map((word, i) => (
                  <span key={i} className={word.includes('-') ? 'whitespace-nowrap' : undefined}>
                    {i > 0 && ' '}
                    {word}
                  </span>
                ))}
              </h1>
            </div>
            <HeroScreens />
            <dl className="ui grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 text-[0.95rem] lg:col-span-2 lg:mt-4 lg:grid-cols-4 short-desktop:row-start-3 lg:gap-x-10">
              {profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="mt-1">
                    {fact.href ? (
                      <a href={fact.href} className="link">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work" className="wrap">
        <SectionHeading id="work">Selected work</SectionHeading>
        <ul className="mt-12 divide-y divide-rule border-t border-rule">
          {projects.map((project) => {
            const href = showCaseStudies ? `/work/${project.slug}/` : undefined
            return (
              <ProjectRow
                key={project.slug}
                id={project.slug}
                text={
                  <>
                    <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                      {href ? (
                        <Link href={href} className="transition-colors hover:text-accent">
                          {project.name}
                        </Link>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {project.status && (
                      <p className="ui mt-3 inline-block rounded-full border border-rule px-3 py-0.5 text-sm text-muted">
                        {project.status}
                      </p>
                    )}
                    <p className="mt-3 max-w-[52ch] text-muted">{project.summary}</p>
                    <dl className="ui mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.95rem]">
                      <dt className="text-muted">For</dt>
                      <dd>{project.client}</dd>
                      <dt className="text-muted">Role</dt>
                      <dd>{project.role}</dd>
                      <dt className="text-muted">When</dt>
                      <dd>{project.period}</dd>
                    </dl>
                  </>
                }
                links={
                  <>
                    {href ? (
                      <Link href={href} className="link font-medium">
                        Read the {project.name} case study
                      </Link>
                    ) : (
                      project.href && (
                        <a
                          href={project.href}
                          className="link font-medium"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit{' '}
                          {project.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                        </a>
                      )
                    )}
                  </>
                }
                media={
                  <Gallery
                    title={project.name}
                    labels={project.images.map((_, i) => `${project.name}, image ${i + 1}`)}
                    slides={project.images.map((shot, i) => (
                      <ProjectVisual
                        key={i}
                        project={project}
                        shot={shot}
                        index={i}
                        aspect="16/10"
                        large
                      />
                    ))}
                  >
                    <ShotStrip label={`${project.name} screenshots`}>
                      {(project.images.length ? project.images : [undefined]).map((shot, i) => {
                        const visual = (
                          <ProjectVisual
                            project={project}
                            shot={shot}
                            index={i}
                            className="h-full"
                            aspect={shot ? undefined : 'auto'}
                          />
                        )
                        const size = `h-60 shrink-0 snap-start sm:h-80 lg:h-[23rem] ${shot ? '' : 'w-full'}`
                        return href ? (
                          <Link key={i} href={href} tabIndex={-1} aria-hidden className={size}>
                            {visual}
                          </Link>
                        ) : shot ? (
                          <GalleryTrigger
                            key={i}
                            index={i}
                            label={`Open ${project.name} image ${i + 1} of ${project.images.length}`}
                            className={size}
                          >
                            {visual}
                          </GalleryTrigger>
                        ) : (
                          <div key={i} className={size}>
                            {visual}
                          </div>
                        )
                      })}
                    </ShotStrip>
                  </Gallery>
                }
                more={project.highlights.length > 0 ? <ProjectMore project={project} /> : undefined}
              />
            )
          })}
        </ul>
      </section>

      {/* Earlier work */}
      <section aria-labelledby="earlier" className="wrap mt-32 rule-top pt-12">
        <SectionHeading id="earlier">Other work</SectionHeading>
        <div className="mt-10">
          <ShowMore
            className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            first={otherWork.slice(0, 3).map((item) => (
              <OtherWorkCard key={item.slug} item={item} />
            ))}
            rest={otherWork.slice(3).map((item) => (
              <OtherWorkCard key={item.slug} item={item} />
            ))}
            total={otherWork.length}
            after={
              <Link href="/archive/" className="link text-[0.95rem]">
                See every project with all its screenshots
              </Link>
            }
          />
        </div>
      </section>

      {/* Experience and education */}
      <section aria-labelledby="experience" className="wrap mt-24 rule-top pt-12">
        <SectionHeading id="experience">Experience</SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h3 className="ui text-[0.95rem] text-muted">Work</h3>
            <ol className="mt-3 divide-y divide-rule border-y border-rule">
              {experience.map((job) => (
                <li
                  key={job.title + job.period}
                  className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
                >
                  <span className="ui text-[0.95rem] text-muted tabular-nums">{job.period}</span>
                  <div>
                    <p className="ui font-medium">
                      {job.company ? `${job.title}, ${job.company}` : job.title}
                    </p>
                    {job.summary && <p className="mt-0.5 text-muted">{job.summary}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="ui text-[0.95rem] text-muted">Education</h3>
            <ol className="mt-3 divide-y divide-rule border-y border-rule">
              {education.map((study) => (
                <li key={study.school} className="py-4">
                  <span className="ui text-[0.95rem] text-muted tabular-nums">{study.period}</span>
                  <p className="ui mt-1 font-medium">{study.school}</p>
                  <p className="mt-0.5 text-muted">{study.programme}</p>
                  {study.note && <p className="mt-1 text-[0.95rem]">{study.note}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
