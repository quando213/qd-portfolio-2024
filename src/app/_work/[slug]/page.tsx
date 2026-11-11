import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, getProject, type Project } from '@/content/projects'
import { ProjectVisual } from '@/components/ProjectVisual'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary }
  }
}

const hostname = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function Facts({ project }: { project: Project }) {
  const facts = [
    { label: 'For', value: project.client },
    { label: 'When', value: project.period },
    { label: 'Role', value: project.role },
    ...(project.team ? [{ label: 'Team', value: project.team }] : [])
  ]
  return (
    <dl className="ui mt-12 border-t border-rule grid gap-x-12 gap-y-6 pt-6 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="text-muted">{f.label}</dt>
          <dd className="mt-1">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** A heading on the left, content on the right, like the homepage sections. */
function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
      <h2 className="display text-[clamp(1.5rem,2.6vw,2rem)]">{title}</h2>
      <div className="max-w-[64ch]">{children}</div>
    </div>
  )
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const previous = projects[(index - 1 + projects.length) % projects.length]

  return (
    <article>
      <header className="wrap pt-12 pb-12 sm:pt-20">
        <Link
          href="/#work"
          className="ui text-[0.95rem] text-muted transition-colors hover:text-ink"
        >
          All work
        </Link>
        <h1 className="display mt-8 text-[clamp(2.75rem,9vw,7rem)]">{project.name}</h1>
        {project.status && (
          <p className="ui mt-4 inline-block rounded-full border border-rule px-3 py-1 text-sm text-muted">
            {project.status}
          </p>
        )}
        <p className="mt-6 max-w-[56ch] text-lg text-muted sm:text-xl">{project.summary}</p>
        <Facts project={project} />
        {project.href && (
          <a
            href={project.href}
            className="ui link mt-6 inline-block text-[0.95rem] font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Visit {hostname(project.href)}
          </a>
        )}
      </header>

      <div className="wrap">
        <ProjectVisual project={project} shot={project.images[0]} aspect="16/9" />
      </div>

      <div className="wrap mt-16">
        <Row title="Overview">
          <div className="space-y-5 text-lg">
            {project.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Row>
      </div>

      {project.chapters.map((chapter) => (
        <section key={chapter.title} className="mt-24">
          <div className="wrap rule-top pt-10">
            <Row title={chapter.title}>
              {chapter.body?.map((p) => (
                <p key={p} className="mb-4 text-lg last:mb-0">
                  {p}
                </p>
              ))}
              {chapter.items && (
                <ul className={`space-y-3 ${chapter.body ? 'mt-6' : ''}`}>
                  {chapter.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3 before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Row>
          </div>
          {chapter.shots && chapter.shots.length > 0 && (
            <div
              className={`wrap mt-10 grid gap-6 ${chapter.shots.length > 1 ? 'md:grid-cols-2' : ''}`}
            >
              {chapter.shots.map((shot, i) => (
                <ProjectVisual
                  key={i}
                  project={project}
                  shot={shot}
                  index={i}
                  aspect={chapter.shots!.length > 1 ? '16/11' : '16/9'}
                />
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="mt-24">
        <div className="wrap rule-top pt-10">
          <Row title="Built with">
            <dl className="ui grid gap-x-10 gap-y-5 text-[0.95rem] sm:grid-cols-2">
              {project.stack.map((group) => (
                <div key={group.label}>
                  <dt className="text-muted">{group.label}</dt>
                  <dd className="mt-1">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Row>
        </div>
      </section>

      {projects.length > 1 && (
        <nav aria-label="More case studies" className="wrap mt-24">
          <ul className="ui grid gap-6 border-t border-rule pt-8 text-[0.95rem] sm:grid-cols-2">
            <li>
              <Link href={`/work/${previous.slug}/`} className="group block">
                <span className="text-muted">Previous case study</span>
                <span className="mt-1 block text-lg font-medium transition-colors group-hover:text-accent">
                  {previous.name}
                </span>
              </Link>
            </li>
            <li className="sm:text-right">
              <Link href={`/work/${next.slug}/`} className="group block">
                <span className="text-muted">Next case study</span>
                <span className="mt-1 block text-lg font-medium transition-colors group-hover:text-accent">
                  {next.name}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </article>
  )
}
