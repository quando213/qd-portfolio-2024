// Makes a small WebP copy of every screenshot in public/images, for thumbnails,
// and records the pixel size of each original and copy in src/content/image-sizes.json.
// Run with `npm run images` after adding or replacing a screenshot. Only changed
// files are reprocessed. The originals stay as they are; the slideshow uses them.
import { readdir, stat, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import sharp from 'sharp'

const root = 'public'
const dir = join(root, 'images')
const out = 'src/content/image-sizes.json'
const BOX = 960 // the copy fits inside BOX × BOX
const small = (file) => file.replace(/\.(jpe?g|png)$/i, '.small.webp')

async function* walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const full = join(path, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full
  }
}

const sizes = {}
let made = 0
for await (const file of walk(dir)) {
  const copy = small(file)
  const fresh = await stat(copy)
    .then(async (s) => s.mtimeMs >= (await stat(file)).mtimeMs)
    .catch(() => false)
  if (!fresh) {
    await sharp(file)
      .resize({ width: BOX, height: BOX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(copy)
    made++
  }
  const [a, b] = await Promise.all([sharp(file).metadata(), sharp(copy).metadata()])
  sizes[`/${relative(root, file)}`] = {
    width: a.width,
    height: a.height,
    small: { src: `/${relative(root, copy)}`, width: b.width, height: b.height }
  }
}

const sorted = Object.fromEntries(Object.entries(sizes).sort(([x], [y]) => x.localeCompare(y)))
await writeFile(out, JSON.stringify(sorted, null, 2) + '\n')
console.log(`${Object.keys(sorted).length} images, ${made} copies made, sizes in ${out}`)
