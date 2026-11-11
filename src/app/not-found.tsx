import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap pt-24 pb-12">
      <h1 className="display text-[clamp(2.5rem,7vw,5rem)]">This page doesn’t exist.</h1>
      <p className="mt-6 text-lg text-muted">
        It may have moved when the site was rebuilt.{' '}
        <Link href="/" className="link text-ink">
          Go to the homepage
        </Link>
        .
      </p>
    </section>
  )
}
