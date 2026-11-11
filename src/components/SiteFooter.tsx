import { profile } from '@/content/profile'
import { cvHref } from '@/lib/cv'

export function SiteFooter() {
  const links = [...profile.links, ...(cvHref ? [{ label: 'CV (PDF)', href: cvHref }] : [])]

  return (
    <footer className="mt-32">
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="wrap grid scroll-mt-20 gap-8 rule-top pt-12 md:grid-cols-[1fr_2fr] md:gap-12"
      >
        <h2 id="contact-title" className="display text-[clamp(1.75rem,3.5vw,2.5rem)]">
          Contact
        </h2>
        <div>
          <a
            href={`mailto:${profile.email}`}
            className="display inline-block text-[clamp(1.6rem,4vw,2.75rem)] break-all transition-colors hover:text-accent sm:break-normal"
          >
            {profile.email}
          </a>
          {links.length > 0 && (
            <ul className="ui mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link" target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <div className="wrap ui mt-20 flex flex-wrap items-baseline justify-between gap-4 rule-top py-6 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#main" className="transition-colors hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  )
}
