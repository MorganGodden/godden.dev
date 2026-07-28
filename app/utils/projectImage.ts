/**
 * Where a project image sits when it has to be cropped.
 *
 * A centre crop suits a photo and rarely suits a screenshot, where the
 * wordmark and the primary action tend to sit against one edge.
 *
 * An anchor has to be expressed twice, because the two call sites are cropped
 * by different things. The home page marquee asks @nuxt/image for a square and
 * gets one already cropped, server-side, before CSS has any say — that needs
 * `projectImageAnchorModifiers`. The projects page takes the image whole and
 * lets `object-cover` crop it in the browser — that needs
 * `projectImageAnchorClass`.
 *
 * The classes are written out in full because Tailwind only emits utilities it
 * can find as literal strings; `object-${anchor}` compiles to nothing. The
 * corners use sharp's compass names rather than its `'left top'` spelling
 * because the modifier is placed in a URL, and IPX answers 500 to the space.
 */
const ANCHORS = {
  'center': { class: 'object-center', position: 'center' },
  'top': { class: 'object-top', position: 'top' },
  'bottom': { class: 'object-bottom', position: 'bottom' },
  'left': { class: 'object-left', position: 'left' },
  'right': { class: 'object-right', position: 'right' },
  'top-left': { class: 'object-top-left', position: 'northwest' },
  'top-right': { class: 'object-top-right', position: 'northeast' },
  'bottom-left': { class: 'object-bottom-left', position: 'southwest' },
  'bottom-right': { class: 'object-bottom-right', position: 'southeast' }
} as const

export type ProjectImageAnchor = keyof typeof ANCHORS

/** The accepted values, in the shape `z.enum()` wants. */
export const projectImageAnchors = Object.keys(ANCHORS) as [
  ProjectImageAnchor,
  ...ProjectImageAnchor[]
]

function resolve(anchor?: string) {
  return ANCHORS[anchor as ProjectImageAnchor] ?? ANCHORS.center
}

/** For a crop the browser performs, via `object-cover`. */
export function projectImageAnchorClass(anchor?: string): string {
  return resolve(anchor).class
}

/** For a crop @nuxt/image performs while resizing. */
export function projectImageAnchorModifiers(anchor?: string): { position: string } {
  return { position: resolve(anchor).position }
}
