import { SLIDE_SIZES, Window } from '@/components/Mockup'

/** A raw screenshot in a plain browser frame, for the slideshow. */
export function ScreenshotSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="[container-type:inline-size]">
      <Window src={src} alt={alt} corners="all" className="w-full" sizes={SLIDE_SIZES} />
    </div>
  )
}
