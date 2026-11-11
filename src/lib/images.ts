import sizes from '@/content/image-sizes.json'
import { asset } from '@/lib/asset'

type Entry = {
  width: number
  height: number
  small: { src: string; width: number; height: number }
}
const table = sizes as Record<string, Entry>

/** The pixel size of a screenshot in /public, if `npm run images` has measured it. */
export const imageSize = (src: string) => {
  const entry = table[src]
  return entry ? { width: entry.width, height: entry.height } : undefined
}

/** The small WebP copy of a screenshot, for thumbnails; the original when there is none. */
export const smallImage = (src: string) => asset(table[src]?.small.src ?? src)

/** A srcset offering the small copy and the original, so the browser picks by size. */
export const imageSrcSet = (src: string) => {
  const entry = table[src]
  if (!entry) return undefined
  return `${asset(entry.small.src)} ${entry.small.width}w, ${asset(src)} ${entry.width}w`
}
