import Link from 'next/link'
import { profile } from '@/content/profile'
import { HeaderShell } from '@/components/HeaderShell'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' }
]

export function SiteHeader() {
  return (
    <HeaderShell>
      <header className="wrap ui flex items-baseline justify-between gap-6 py-4 text-[0.95rem]">
        <Link href="/" className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-5 sm:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </HeaderShell>
  )
}
