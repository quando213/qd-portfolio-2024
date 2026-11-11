import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { profile } from '@/content/profile'
import { asset } from '@/lib/asset'

/** The CV link, checked at build time: it exists once the PDF is in /public. */
export const cvHref = existsSync(join(process.cwd(), 'public', profile.cvFile))
  ? asset(`/${profile.cvFile}`)
  : undefined
