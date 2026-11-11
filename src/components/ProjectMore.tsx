import type { Project } from '@/content/projects'

/**
 * What I did on a project, shown under "Show more". Laid out in columns
 * across the full row, so opening it adds a short band, not a long column.
 */
export function ProjectMore({ project }: { project: Project }) {
  return (
    <>
      <ul className="grid gap-x-10 gap-y-3 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-3">
        {project.highlights.map((point) => (
          <li
            key={point}
            className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-accent"
          >
            {point}
          </li>
        ))}
      </ul>
      <p className="ui mt-4 text-sm text-muted">{project.tech}</p>
    </>
  )
}
