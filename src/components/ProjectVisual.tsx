import type { Project } from '@/content/projects'
import {
  Mockup,
  Stage,
  Window,
  pickLook,
  type BrandColors,
  type Pattern,
  type Shot
} from '@/components/Mockup'

/** What a placeholder needs to know about a project. */
export type PlaceholderSubject = {
  slug: string
  name: string
  colors: BrandColors
  themes: readonly Pattern[]
  href?: string
}

const hostname = (href?: string) => href?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

type Props = {
  project: Project
  shot?: Shot
  index?: number
  className?: string
  aspect?: string
  /** Drawn large, in the slideshow. */
  large?: boolean
}

/** One of the project's screenshots in a mockup, or a placeholder when it has none. */
export function ProjectVisual({ project, shot, index = 0, className, aspect, large }: Props) {
  if (shot) {
    return (
      <Mockup
        shot={shot}
        colors={project.colors}
        themes={project.themes}
        alt={`${project.name} screenshot ${index + 1}`}
        url={hostname(project.href)}
        className={className}
        aspect={aspect}
        large={large}
      />
    )
  }

  return <ProjectPlaceholder project={project} className={className} aspect={aspect} />
}

/** An empty browser window with the project name, on the project's own colours. */
export function ProjectPlaceholder({
  project,
  className,
  aspect
}: {
  project: PlaceholderSubject
  className?: string
  aspect?: string
}) {
  const look = pickLook(project.slug, project.colors, project.themes)
  return (
    <Stage {...look} aspect={aspect} align="bottom" className={className}>
      <div className="relative aspect-[16/9.6] h-[84%] max-w-[88%] translate-y-[5%]">
        <Window alt={`${project.name}: screenshots coming soon`} url={hostname(project.href)} />
        <span
          aria-hidden
          className="display absolute inset-x-0 top-[3.4cqw] bottom-0 flex items-center justify-center text-[6cqw]"
          style={{ color: project.colors.primary }}
        >
          {project.name}
        </span>
      </div>
    </Stage>
  )
}
