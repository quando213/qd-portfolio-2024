import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Source_Serif_4 } from 'next/font/google'
import { profile } from '@/content/profile'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import './globals.css'

// Only the Latin files are preloaded; Czech and Vietnamese letters load on demand.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap'
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-source-serif',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name}, frontend developer`,
    template: `%s | ${profile.name}`
  },
  description: profile.intro,
  openGraph: {
    type: 'website',
    siteName: profile.name,
    title: `${profile.name}, frontend developer`,
    description: profile.intro
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f3ef' },
    { media: '(prefers-color-scheme: dark)', color: '#14161a' }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sourceSerif.variable}`}>
      <body>
        <a
          href="#main"
          className="ui sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
