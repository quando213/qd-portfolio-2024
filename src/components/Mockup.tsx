import { asset } from '@/lib/asset'
import { imageSize, imageSrcSet, smallImage } from '@/lib/images'

/** Names an SVG drawing for screen readers, or hides it when it only repeats a neighbour. */
const svgLabel = (alt: string) =>
  alt ? ({ role: 'img', 'aria-label': alt } as const) : ({ 'aria-hidden': true } as const)

/** How wide a screenshot is drawn: in a thumbnail on the page, or in the slideshow. */
const THUMB_SIZES = '(min-width: 1024px) 34rem, 90vw'
export const SLIDE_SIZES = 'min(92vw, 1400px)'

/* ------------------------------------------------------------------------ */
/* Options                                                                   */
/* ------------------------------------------------------------------------ */

export type Frame =
  | 'browser' // window rising from the bottom edge
  | 'corner' // window running off the bottom-right corner
  | 'float' // free-floating window, all corners rounded
  | 'tilt' // window turned in 3D
  | 'stack' // two overlapping windows (needs `second`)
  | 'laptop'
  | 'phone' // one phone, or two with `second`
  | 'detail' // zoomed, tilted crop (set `focus`)
  | 'devices' // laptop or browser with a phone in front (`second` is the phone screenshot)
  | 'cascade' // up to three overlapping windows (`second`, `third`)

/** A backdrop colour and the colour its pattern is drawn in. Any CSS colour works. */
export type Swatch = { bg: string; fg: string }

/** A project's identity colours. Backdrops are derived from these. */
export type BrandColors = { primary: string; secondary?: string }

export const patterns = [
  'plain',
  'dots', // dot matrix
  'grid',
  'lines', // fine diagonals
  'arc', // two large soft circles
  'waves', // liquid: drinks, dairy
  'curves', // soft contours: care, calm
  'pulse', // heartbeat line: clinical
  'columns', // solid vertical bands: banks, institutions
  'confetti', // scattered dots: children, play
  'rays', // light beams: lasers, stage lights
  'ripples', // water rings: spa, wellness
  'equalizer' // sound bars: music
] as const
export type Pattern = (typeof patterns)[number]

export type Shot = {
  src: string
  /** How the screenshot is presented. Defaults to 'browser'. */
  frame?: Frame
  /** A second screenshot, for 'stack', 'phone', 'cascade', and the phone in 'devices'. */
  second?: string
  /** A third screenshot, for 'cascade'. */
  third?: string
  /** For 'devices': what the phone sits in front of. Defaults to a laptop. */
  base?: 'laptop' | 'browser'
  /** For 'phone': the screenshot already includes an iOS status bar, so the frame adds none. */
  ownStatusBar?: boolean
  /** For 'phone': a landscape screenshot. */
  landscape?: boolean
  /** For 'detail': the point to zoom into, as [x%, y%] of the screenshot. */
  focus?: [number, number]
  /** Which of the project's backdrops to use (0–2), or a custom swatch. Picked automatically if left out. */
  backdrop?: number | Swatch
  pattern?: Pattern
  alt?: string
}

/* ------------------------------------------------------------------------ */
/* Backdrops                                                                 */
/* ------------------------------------------------------------------------ */

const mix = (color: string, pct: number, base: string) =>
  `color-mix(in oklab, ${color} ${pct}%, ${base})`

/**
 * Three light backdrops in a project's own colours: a tint of each brand
 * colour and a warm neutral with a brand-coloured pattern.
 */
export function brandSwatches({ primary, secondary }: BrandColors): Swatch[] {
  const second = secondary ?? primary
  return [
    { bg: mix(primary, 14, '#f6f6f3'), fg: primary },
    { bg: mix(second, 18, '#f7f7f4'), fg: second },
    { bg: '#ebebe6', fg: primary }
  ]
}

const neutral: BrandColors = { primary: '#3a3d42', secondary: '#6b7280' }

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

/**
 * Deterministic picks, so a given screenshot always looks the same.
 * `themes` limits patterns to ones that suit the project.
 */
export function pickLook(seed: string, colors: BrandColors = neutral, themes?: readonly Pattern[]) {
  const h = hash(seed)
  const pool = themes?.length ? themes : patterns
  return {
    swatch: brandSwatches(colors)[(h >>> 3) % 3],
    pattern: pool[(h >>> 7) % pool.length]
  }
}

const svgTile = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`
  )}")`

function patternLayer(pattern: Pattern, fg: string): React.CSSProperties {
  const line = `color-mix(in srgb, ${fg} 13%, transparent)`
  const soft = `color-mix(in srgb, ${fg} 8%, transparent)`
  const strong = `color-mix(in srgb, ${fg} 18%, transparent)`
  switch (pattern) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(${line} 1.2px, transparent 1.7px)`,
        backgroundSize: '18px 18px'
      }
    case 'grid':
      return {
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: '44px 44px'
      }
    case 'lines':
      return {
        backgroundImage: `repeating-linear-gradient(-45deg, ${line} 0 1px, transparent 1px 13px)`
      }
    case 'arc':
      return {
        backgroundImage: `radial-gradient(circle at 88% 115%, ${soft} 0 34%, transparent 34.2%), radial-gradient(circle at 5% -10%, ${soft} 0 22%, transparent 22.2%)`
      }
    case 'waves':
      return {
        backgroundImage: svgTile(
          160,
          30,
          `<path d='M0 15 C20 4 60 4 80 15 S140 26 160 15' fill='none' stroke='${fg}' stroke-opacity='.16' stroke-width='1.5'/>`
        ),
        backgroundSize: '160px 30px'
      }
    case 'curves':
      return {
        backgroundImage: `repeating-radial-gradient(ellipse 160% 100% at 10% 120%, ${line} 0 1px, transparent 1px 28px)`
      }
    case 'pulse':
      return {
        backgroundImage: `${svgTile(
          360,
          80,
          `<path d='M0 40 H150 L162 40 L170 12 L181 68 L189 28 L196 40 H360' fill='none' stroke='${fg}' stroke-opacity='.22' stroke-width='2' stroke-linejoin='round'/>`
        )}, linear-gradient(${soft} 1px, transparent 1px)`,
        backgroundSize: '360px 80px, 100% 40px',
        backgroundRepeat: 'repeat-x, repeat',
        backgroundPosition: '0 64%, 0 0'
      }
    case 'columns':
      return {
        backgroundImage: `repeating-linear-gradient(90deg, ${soft} 0 64px, transparent 64px 128px)`
      }
    case 'confetti':
      return {
        backgroundImage: `radial-gradient(${strong} 3px, transparent 3.5px), radial-gradient(${line} 2px, transparent 2.5px), radial-gradient(${soft} 6px, transparent 6.5px)`,
        backgroundSize: '67px 59px, 41px 47px, 113px 97px',
        backgroundPosition: '0 0, 13px 21px, 37px 51px'
      }
    case 'rays':
      return {
        backgroundImage: `repeating-conic-gradient(from 180deg at 100% 0%, ${soft} 0deg 3deg, transparent 3deg 9deg)`
      }
    case 'ripples':
      return {
        backgroundImage: `repeating-radial-gradient(circle at 26% 64%, ${line} 0 1px, transparent 1px 30px)`
      }
    case 'equalizer':
      return {
        backgroundImage: svgTile(
          112,
          140,
          [36, 92, 58, 120, 28, 74, 104]
            .map(
              (h, i) =>
                `<rect x='${i * 16}' y='${140 - h}' width='9' height='${h}' rx='2' fill='${fg}' fill-opacity='.11'/>`
            )
            .join('')
        ),
        backgroundSize: '112px 140px',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 100%'
      }
    default:
      return {}
  }
}

type StageProps = {
  swatch: Swatch
  pattern: Pattern
  children: React.ReactNode
  className?: string
  /** CSS aspect-ratio, e.g. '16/10' or '4/5'. */
  aspect?: string
  align?: 'center' | 'bottom'
}

export function Stage({
  swatch,
  pattern,
  children,
  className = '',
  aspect = '16/10',
  align = 'center'
}: StageProps) {
  return (
    <div
      className={`relative isolate flex justify-center overflow-hidden rounded-[6px] [container-type:inline-size] ${
        align === 'bottom' ? 'items-end' : 'items-center'
      } ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: swatch.bg }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={patternLayer(pattern, swatch.fg)}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(110% 80% at 50% 0%, color-mix(in srgb, #fff 20%, transparent), transparent 65%)'
        }}
      />
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Frames                                                                    */
/* ------------------------------------------------------------------------ */

const shadow =
  'shadow-[0_1px_2px_rgba(16,18,22,0.10),0_10px_28px_-8px_rgba(16,18,22,0.25),0_40px_70px_-20px_rgba(16,18,22,0.35)]'

/** Browser chrome around a screenshot shown at its own aspect ratio, so nothing is cut from the sides. */
export function Window({
  src,
  alt,
  url,
  corners = 'top',
  className = '',
  sizes = THUMB_SIZES
}: {
  src?: string
  alt: string
  url?: string
  corners?: 'top' | 'all' | 'top-left'
  className?: string
  /** The `sizes` attribute, so the browser fetches the small copy for thumbnails. */
  sizes?: string
}) {
  const radius = {
    top: 'rounded-t-[1.4cqw]',
    all: 'rounded-[1.4cqw]',
    'top-left': 'rounded-tl-[1.4cqw]'
  }[corners]
  return (
    <div className={`overflow-hidden bg-white ${radius} ${shadow} ${className}`}>
      <div className="flex h-[3.4cqw] min-h-3 items-center gap-[0.8cqw] border-b border-black/5 bg-[#f4f4f2] px-[1.8cqw]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block size-[0.95cqw] min-h-1 min-w-1 rounded-full bg-black/12" />
        ))}
        {url && (
          // Drawn from CSS, not as text: it is decoration, and as real text it would
          // become part of the visible label of the thumbnail button around it.
          <span
            aria-hidden
            data-url={url}
            className="ui mx-auto max-w-[45%] truncate rounded-full bg-black/5 px-[1.4cqw] text-[1.15cqw] leading-[2.1cqw] text-black/65 after:content-[attr(data-url)]"
          />
        )}
      </div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(src)}
          srcSet={imageSrcSet(src)}
          sizes={sizes}
          {...imageSize(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      ) : (
        <div role="img" aria-label={alt} className="aspect-[16/9]" />
      )}
    </div>
  )
}

/**
 * Laptop with a real 16:10 screen. The top strip is browser chrome, the
 * part usually cropped out of a screenshot, so a 16:9 capture fills the rest.
 */
export function Laptop({
  src,
  alt,
  id,
  url,
  large = false,
  crop = 'center',
  className = 'w-[84%] translate-y-[3%]'
}: {
  src: string
  alt: string
  id: string
  url?: string
  large?: boolean
  /** Which part of a wider screenshot stays visible: the middle, or the left edge with the logo and nav. */
  crop?: 'center' | 'left'
  className?: string
}) {
  const href = large ? asset(src) : smallImage(src)
  // Screen: 740 × 462.5 (16:10). Toolbar: 46.25. Page area: 740 × 416.25 (16:9).
  return (
    <svg viewBox="0 0 1000 570" className={`overflow-visible ${className}`} {...svgLabel(alt)}>
      <defs>
        <clipPath id={`${id}-s`}>
          <rect x="130" y="34" width="740" height="462.5" rx="6" />
        </clipPath>
        <linearGradient id={`${id}-b`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f0f1f3" />
          <stop offset="0.5" stopColor="#d4d7dc" />
          <stop offset="1" stopColor="#a3a8af" />
        </linearGradient>
        <filter id={`${id}-f`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <ellipse
        cx="500"
        cy="548"
        rx="430"
        ry="14"
        fill="#101216"
        opacity="0.28"
        filter={`url(#${id}-f)`}
      />
      {/* Lid with an even bezel */}
      <rect
        x="116"
        y="20"
        width="768"
        height="490"
        rx="22"
        fill="#17191c"
        stroke="#45484e"
        strokeWidth="2"
      />
      <circle cx="500" cy="27" r="3" fill="#33363b" />
      <g clipPath={`url(#${id}-s)`}>
        {/* Browser chrome */}
        <rect x="130" y="34" width="740" height="46.25" fill="#f4f4f2" />
        <rect x="130" y="79.25" width="740" height="1" fill="#e2e2de" />
        {[150, 166, 182].map((cx) => (
          <circle key={cx} cx={cx} cy="57" r="5" fill="#d6d6d2" />
        ))}
        <rect x="370" y="46" width="260" height="22" rx="11" fill="#e7e7e3" />
        {url && (
          <text
            x="500"
            y="61"
            textAnchor="middle"
            fontSize="11"
            fill="#8b8b87"
            fontFamily="system-ui, sans-serif"
          >
            {url}
          </text>
        )}
        {/* Page */}
        <rect x="130" y="80.25" width="740" height="416.25" fill="#fff" />
        <image
          href={href}
          x="130"
          y="80.25"
          width="740"
          height="416.25"
          preserveAspectRatio={crop === 'left' ? 'xMinYMin slice' : 'xMidYMin slice'}
        />
      </g>
      {/* Base directly under the lid */}
      <path
        d="M24 508 H976 Q982 508 982 514 V518 Q982 534 950 538 H50 Q18 534 18 518 V514 Q18 508 24 508 Z"
        fill={`url(#${id}-b)`}
      />
      <path d="M430 508 H570 V512 Q570 517 564 517 H436 Q430 517 430 512 Z" fill="#b3b7bd" />
    </svg>
  )
}

/** Phone for a 390-wide screenshot, with a status bar above the page so the notch never covers it. */
export function PhoneSvg({
  src,
  alt,
  id,
  ownStatusBar = false,
  large = false,
  className = ''
}: {
  src: string
  alt: string
  id: string
  ownStatusBar?: boolean
  large?: boolean
  className?: string
}) {
  const href = large ? asset(src) : smallImage(src)
  return (
    <svg
      viewBox="0 0 420 844"
      className={`overflow-visible ${className.includes('h-[') ? '' : 'h-[86%]'} ${className}`}
      {...svgLabel(alt)}
    >
      <defs>
        <clipPath id={`${id}-p`}>
          <rect x="24" y="24" width="372" height="796" rx="50" />
        </clipPath>
        <filter id={`${id}-f`} x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect
        x="30"
        y="60"
        width="360"
        height="776"
        rx="60"
        fill="#101216"
        opacity="0.32"
        filter={`url(#${id}-f)`}
      />
      <rect x="4" y="190" width="8" height="56" rx="3" fill="#2a2c30" />
      <rect x="4" y="262" width="8" height="56" rx="3" fill="#2a2c30" />
      <rect x="408" y="230" width="8" height="96" rx="3" fill="#2a2c30" />
      <rect
        x="10"
        y="10"
        width="400"
        height="824"
        rx="66"
        fill="#17191c"
        stroke="#45484e"
        strokeWidth="3"
      />
      {ownStatusBar ? (
        // The screenshot draws its own status bar and notch.
        <image
          href={href}
          x="24"
          y="24"
          width="372"
          height="796"
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${id}-p)`}
        />
      ) : (
        <>
          <g clipPath={`url(#${id}-p)`}>
            {/* Status bar: the screenshot's top rows stretched, so it matches the page header. */}
            <svg
              x="24"
              y="24"
              width="372"
              height="46"
              viewBox="0 0 390 2"
              preserveAspectRatio="none"
            >
              <image href={href} width="390" height="844" preserveAspectRatio="xMidYMin slice" />
            </svg>
            {/* Page, below the status bar */}
            <image
              href={href}
              x="24"
              y="70"
              width="372"
              height="750"
              preserveAspectRatio="xMidYMin slice"
            />
          </g>
          <rect x="165" y="38" width="90" height="26" rx="13" fill="#000" />
        </>
      )}
    </svg>
  )
}

/** A tablet on its side, like an 11-inch iPad in landscape, for desktop screenshots. */
export function TabletSvg({
  src,
  alt,
  id,
  large = false,
  crop = 'center',
  className = ''
}: {
  src: string
  alt: string
  id: string
  large?: boolean
  /** Which part of a wider screenshot stays visible: the middle, or the left edge with the logo and nav. */
  crop?: 'center' | 'left'
  className?: string
}) {
  const href = large ? asset(src) : smallImage(src)
  // Body 1000 × 716. Screen 940 × 656, about the 1.43 ratio of an iPad display.
  return (
    <svg viewBox="0 0 1000 716" className={`overflow-visible ${className}`} {...svgLabel(alt)}>
      <defs>
        <clipPath id={`${id}-t`}>
          <rect x="30" y="30" width="940" height="656" rx="24" />
        </clipPath>
        <filter id={`${id}-f`} x="-20%" y="-30%" width="140%" height="170%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <rect
        x="40"
        y="76"
        width="920"
        height="660"
        rx="60"
        fill="#101216"
        opacity="0.3"
        filter={`url(#${id}-f)`}
      />
      <rect x="800" y="-5" width="80" height="8" rx="3" fill="#2a2c30" />
      <rect
        x="2"
        y="2"
        width="996"
        height="712"
        rx="54"
        fill="#17191c"
        stroke="#45484e"
        strokeWidth="3"
      />
      <rect x="30" y="30" width="940" height="656" rx="24" fill="#fff" />
      <image
        href={href}
        x="30"
        y="30"
        width="940"
        height="656"
        preserveAspectRatio={crop === 'left' ? 'xMinYMin slice' : 'xMidYMin slice'}
        clipPath={`url(#${id}-t)`}
      />
      <circle cx="500" cy="16" r="4.5" fill="#2a2c30" />
    </svg>
  )
}

/** A phone on its side, for landscape apps and games. */
function LandscapePhone({
  src,
  alt,
  id,
  large = false
}: {
  src: string
  alt: string
  id: string
  large?: boolean
}) {
  const href = large ? asset(src) : smallImage(src)
  return (
    <svg viewBox="0 0 844 420" className="w-[86%] overflow-visible" {...svgLabel(alt)}>
      <defs>
        <clipPath id={`${id}-l`}>
          <rect x="24" y="24" width="796" height="372" rx="50" />
        </clipPath>
        <filter id={`${id}-f`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect
        x="60"
        y="40"
        width="776"
        height="360"
        rx="60"
        fill="#101216"
        opacity="0.32"
        filter={`url(#${id}-f)`}
      />
      <rect x="190" y="4" width="56" height="8" rx="3" fill="#2a2c30" />
      <rect x="262" y="4" width="56" height="8" rx="3" fill="#2a2c30" />
      <rect x="230" y="408" width="96" height="8" rx="3" fill="#2a2c30" />
      <rect
        x="10"
        y="10"
        width="824"
        height="400"
        rx="66"
        fill="#17191c"
        stroke="#45484e"
        strokeWidth="3"
      />
      <image
        href={href}
        x="24"
        y="24"
        width="796"
        height="372"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id}-l)`}
      />
      <rect x="38" y="165" width="26" height="90" rx="13" fill="#000" />
    </svg>
  )
}

function Detail({
  src,
  alt,
  focus = [30, 30]
}: {
  src: string
  alt: string
  focus?: [number, number]
}) {
  const [x, y] = focus
  return (
    <div className="absolute inset-0 [perspective:1600px]">
      <div
        className={`absolute top-[16%] left-[12%] h-[110%] w-[110%] overflow-hidden rounded-[1.4cqw] bg-white ${shadow} [transform:rotateX(18deg)_rotateZ(-8deg)_rotateY(-6deg)]`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute max-w-none"
          style={{ width: '240%', left: `${-x * 2.4 + 20}%`, top: `${-y * 1.35 + 10}%` }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Mockup                                                                    */
/* ------------------------------------------------------------------------ */

/** The natural aspect ratio for a frame, for layouts that let it vary. */
export const naturalAspect = (shot: Shot) =>
  shot.frame === 'phone' && !shot.landscape ? (shot.second ? '5/4' : '4/5') : '16/10'

type MockupProps = {
  shot: Shot
  alt: string
  /** The project's identity colours; backdrops are drawn from these. */
  colors?: BrandColors
  /** Patterns that suit the project; the automatic pick comes from these. */
  themes?: readonly Pattern[]
  url?: string
  className?: string
  /** Override the stage's aspect ratio, e.g. to keep a grid even. */
  aspect?: string
  /** Drawn large, in the slideshow: use the full-size screenshots. */
  large?: boolean
}

export function Mockup({ shot, alt, colors, themes, url, className, aspect, large }: MockupProps) {
  const sizes = large ? SLIDE_SIZES : THUMB_SIZES
  const frame = shot.frame ?? 'browser'
  const auto = pickLook(`${shot.src}|${frame}`, colors, themes)
  const swatch =
    typeof shot.backdrop === 'object'
      ? shot.backdrop
      : typeof shot.backdrop === 'number'
        ? brandSwatches(colors ?? neutral)[shot.backdrop % 3]
        : auto.swatch
  const pattern = shot.pattern ?? auto.pattern
  const label = shot.alt ?? alt
  const id = `m${hash(`${shot.src}|${frame}|${shot.second ?? ''}`).toString(36)}`

  return (
    <Stage
      swatch={swatch}
      pattern={pattern}
      aspect={aspect ?? naturalAspect(shot)}
      align={frame === 'browser' ? 'bottom' : 'center'}
      className={className}
    >
      {frame === 'browser' && (
        <Window
          sizes={sizes}
          src={shot.src}
          alt={label}
          url={url}
          className="w-[84%] translate-y-[5%]"
        />
      )}
      {frame === 'corner' && (
        <Window
          sizes={sizes}
          src={shot.src}
          alt={label}
          url={url}
          corners="top-left"
          className="absolute top-[14%] left-[12%] w-[100%]"
        />
      )}
      {frame === 'float' && (
        <Window
          sizes={sizes}
          src={shot.src}
          alt={label}
          url={url}
          corners="all"
          className="w-[74%]"
        />
      )}
      {frame === 'tilt' && (
        <div className="flex h-full w-full items-center justify-center [perspective:1400px]">
          <Window
            sizes={sizes}
            src={shot.src}
            alt={label}
            url={url}
            corners="all"
            className="w-[74%] [transform:rotateY(-20deg)_rotateX(10deg)_rotateZ(2deg)]"
          />
        </div>
      )}
      {frame === 'stack' && (
        <>
          <Window
            sizes={sizes}
            src={shot.second ?? shot.src}
            alt=""
            corners="all"
            className="absolute top-[9%] left-[7%] w-[60%]"
          />
          <Window
            sizes={sizes}
            src={shot.src}
            alt={label}
            url={url}
            corners="all"
            className="absolute right-[7%] bottom-[9%] w-[60%]"
          />
        </>
      )}
      {frame === 'devices' && (
        <div className="relative flex h-full w-full items-center justify-center">
          {shot.base === 'browser' ? (
            <Window
              sizes={sizes}
              src={shot.src}
              alt={label}
              url={url}
              corners="all"
              className="w-[74%] -translate-x-[7%]"
            />
          ) : (
            <Laptop
              large={large}
              src={shot.src}
              alt={label}
              id={id}
              url={url}
              className="w-[78%] -translate-x-[7%] translate-y-[2%]"
            />
          )}
          {shot.second && (
            <PhoneSvg
              large={large}
              src={shot.second}
              alt=""
              id={`${id}p`}
              ownStatusBar={shot.ownStatusBar}
              className="absolute right-[6%] bottom-[8%] h-[68%]"
            />
          )}
        </div>
      )}
      {frame === 'cascade' && (
        <>
          {shot.third && (
            <Window
              sizes={sizes}
              src={shot.third}
              alt=""
              corners="all"
              className="absolute top-[7%] left-[5%] w-[56%]"
            />
          )}
          <Window
            sizes={sizes}
            src={shot.second ?? shot.src}
            alt=""
            corners="all"
            className={`absolute w-[56%] ${shot.third ? 'top-[24%] left-[22%]' : 'top-[9%] left-[7%]'}`}
          />
          <Window
            sizes={sizes}
            src={shot.src}
            alt={label}
            url={url}
            corners="all"
            className={`absolute w-[56%] ${shot.third ? 'top-[41%] left-[39%]' : 'right-[7%] bottom-[9%]'}`}
          />
        </>
      )}
      {frame === 'laptop' && <Laptop large={large} src={shot.src} alt={label} id={id} url={url} />}
      {frame === 'phone' &&
        (shot.landscape ? (
          <LandscapePhone large={large} src={shot.src} alt={label} id={id} />
        ) : shot.second ? (
          <div className="flex h-full w-full items-center justify-center gap-[6%]">
            <PhoneSvg
              large={large}
              src={shot.src}
              alt={label}
              id={`${id}a`}
              ownStatusBar={shot.ownStatusBar}
              className="-translate-y-[4%]"
            />
            <PhoneSvg
              large={large}
              src={shot.second}
              alt=""
              id={`${id}b`}
              ownStatusBar={shot.ownStatusBar}
              className="translate-y-[6%]"
            />
          </div>
        ) : (
          <PhoneSvg
            large={large}
            src={shot.src}
            alt={label}
            id={id}
            ownStatusBar={shot.ownStatusBar}
          />
        ))}
      {frame === 'detail' && <Detail src={shot.src} alt={label} focus={shot.focus} />}
    </Stage>
  )
}
