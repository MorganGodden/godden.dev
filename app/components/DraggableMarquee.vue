<script setup lang="ts">
/**
 * A marquee the visitor can take hold of.
 *
 * `UMarquee` moves its content with a CSS animation, and an animation is not a
 * scroll position: there is nothing for a wheel, a swipe or a drag to act on.
 * This lays the same repeated content out in a real horizontal scroller and
 * drifts it by nudging `scrollLeft` each frame, which makes the drift one more
 * writer of a position the visitor can write to as well. Momentum, trackpads,
 * touch and the keyboard then all work because the platform already does them.
 *
 * The loop is the usual trick. The slot is repeated end to end, and since the
 * copies are identical, adding or subtracting exactly one copy's width from
 * the scroll position changes nothing on screen. Doing that whenever the
 * position leaves the second copy keeps a whole copy of slack on either side
 * of the view, so the strip never reaches an end to stop or bounce at.
 */

const props = withDefaults(defineProps<{
  /** How far the strip drifts on its own each second, in pixels. */
  speed?: number
  /** Whether the drift stops while a pointer rests on the strip. */
  pauseOnHover?: boolean
}>(), {
  speed: 40,
  pauseOnHover: true
})

/** How far a pointer travels before a press counts as a drag, not a click. */
const DRAG_THRESHOLD = 4

/** How long the drift waits out the visitor's own scrolling, in milliseconds. */
const RESUME_DELAY = 2000

const viewport = ref<HTMLElement | null>(null)

/**
 * Copies of the slot laid end to end. Three is the fewest that can hide a wrap
 * — one to look at, one either side to jump to — and `measure` asks for more
 * when the strip is wide enough to show more than one copy at a time.
 */
const copies = ref(3)

/** The width of one copy: the distance the scroll position wraps by. */
let period = 0

/** Drift the browser rounded away, saved so slow speeds still add up. */
let carry = 0

/* Everything that can hold the drift still. */

/**
 * A pointer resting on the strip, which holds the drift so that whatever
 * caught the visitor's eye stays where they can look at it.
 *
 * Taking hold of the strip ends that hold. Someone who has just dragged it has
 * said where they want it, and their pointer is left sitting wherever the drag
 * happened to end rather than over anything they meant to stop on; leaving the
 * strip and coming back to it arms the hold again.
 */
const resting = ref(false)
const dragging = ref(false)
const focusWithin = ref(false)
const onScreen = ref(true)
const reducedMotion = ref(false)
/** When the visitor last scrolled; long ago, until they have. */
let scrolledAt = Number.NEGATIVE_INFINITY

function drifting(now: number) {
  return onScreen.value
    && !reducedMotion.value
    && !dragging.value
    && !focusWithin.value
    && !(props.pauseOnHover && resting.value)
    && now - scrolledAt > RESUME_DELAY
}

/**
 * Return the scroll position to the second copy. Every copy holds the same
 * thing, so a shift of exactly one copy is invisible; it only buys back the
 * room to carry on in whichever direction the strip was going.
 */
function normalize() {
  const el = viewport.value
  if (!el || !period) return

  // While something inside holds focus, leave the position alone: the shift
  // would carry the focused link off screen even though nothing looks
  // different, and the browser would scroll back to it.
  if (focusWithin.value) return

  if (el.scrollLeft >= period * 2) el.scrollLeft -= period
  else if (el.scrollLeft < period) el.scrollLeft += period
}

/**
 * Mark every copy but the first as scenery. They hold the same links again,
 * which a screen reader should not read out three times over and the tab key
 * should not walk through three times over.
 *
 * `inert` is the tidy way to say that and the wrong one, because it also
 * refuses clicks — and the copy under the visitor's pointer is nearly always a
 * clone. Hiding the copy from assistive technology and taking its links out of
 * the tab order says the same thing while leaving them clickable.
 */
function hideClones() {
  const el = viewport.value
  if (!el) return

  for (const clone of [...el.children].slice(1)) {
    clone.setAttribute('aria-hidden', 'true')
    for (const link of clone.querySelectorAll('a, button, [tabindex]')) {
      link.setAttribute('tabindex', '-1')
    }
  }
}

function measure() {
  const el = viewport.value
  if (!el) return

  const width = el.scrollWidth / copies.value
  if (!width) return

  period = width
  copies.value = Math.max(3, Math.ceil(el.clientWidth / width) + 2)
  normalize()
}

/* Dragging.
 *
 * Only a mouse or a pen needs this. Touch already drags the strip natively,
 * with a momentum throw no hand-rolled version would match.
 *
 * Each move is applied as a delta rather than as an offset from where the
 * press began, because `normalize` can shift the scroll position mid-drag and
 * an offset measured against the old position would snap back by a whole copy.
 */

let pointer: number | null = null
let lastX = 0
let travelled = 0
let dragged = false

function onPointerdown(event: PointerEvent) {
  if (event.pointerType === 'touch' || event.button !== 0) return

  pointer = event.pointerId
  lastX = event.clientX
  travelled = 0
  dragged = false
}

function onPointermove(event: PointerEvent) {
  const el = viewport.value
  if (!el || pointer !== event.pointerId) return

  const delta = event.clientX - lastX
  lastX = event.clientX
  travelled += Math.abs(delta)
  if (travelled < DRAG_THRESHOLD) return

  if (!dragged) {
    dragged = true
    dragging.value = true
    resting.value = false
    // Capture only once this is definitely a drag. Capturing on the press
    // would re-target the click that a plain press produces, and the links
    // inside would stop working.
    el.setPointerCapture(event.pointerId)
  }

  el.scrollLeft -= delta
}

function onPointerup(event: PointerEvent) {
  const el = viewport.value
  if (pointer !== event.pointerId) return

  if (el?.hasPointerCapture(event.pointerId)) {
    el.releasePointerCapture(event.pointerId)
  }
  pointer = null
  dragging.value = false
  scrolledAt = performance.now()
}

/** Swallow the click that ends a drag, so a drag over a link is not a visit. */
function onClick(event: MouseEvent) {
  // A drag that ends outside the strip leaves no click to swallow, so this can
  // still be armed when the next one arrives. `detail` counts pointer clicks
  // and is zero for a link opened with the keyboard, which was never a drag.
  if (!dragged || event.detail === 0) return

  dragged = false
  event.preventDefault()
  event.stopPropagation()
}

/**
 * Hold the strip still for a visitor working through it with the tab key, so
 * the card they are on does not wander off while they read it.
 *
 * Only for them, though. Pressing on a card focuses it too, so counting every
 * focus would leave the strip stopped for good after a drag: the card the drag
 * began on keeps the focus long after the pointer has gone. `:focus-visible`
 * is the platform's own answer to which of the two just happened.
 */
function onFocusin(event: FocusEvent) {
  focusWithin.value = event.target instanceof Element
    && event.target.matches(':focus-visible')
}

function onScroll() {
  normalize()
}

function onUserScroll() {
  scrolledAt = performance.now()
}

/* The drift itself. */

let request = 0
let previous = 0

function tick(now: number) {
  request = requestAnimationFrame(tick)

  const elapsed = previous ? Math.min(now - previous, 100) : 0
  previous = now

  const el = viewport.value
  if (!el || !drifting(now)) return

  const target = el.scrollLeft + carry + props.speed * elapsed / 1000
  el.scrollLeft = target
  // Carry whatever the browser refused of a fractional step into the next
  // frame. Chrome snaps the offset to whole device pixels, so without this a
  // step under half a pixel rounds up every frame and the strip runs away, or
  // rounds down every frame and the strip never sets off at all.
  carry = Math.min(Math.max(target - el.scrollLeft, -1), 1)

  normalize()
}

onMounted(() => {
  const el = viewport.value
  if (!el) return

  const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = stillness.matches
  const onStillnessChange = (event: MediaQueryListEvent) => {
    reducedMotion.value = event.matches
  }
  stillness.addEventListener('change', onStillnessChange)

  // The strip's own box gives the width to fill; its first copy gives the
  // width to fill it with, and that one changes as images and fonts land.
  const resize = new ResizeObserver(() => measure())
  resize.observe(el)
  if (el.firstElementChild) resize.observe(el.firstElementChild)

  // Off screen there is nothing to drift, and a hero leaves the screen early.
  const intersection = new IntersectionObserver(([entry]) => {
    onScreen.value = entry?.isIntersecting ?? true
  })
  intersection.observe(el)

  measure()
  hideClones()
  watch(copies, hideClones, { flush: 'post' })

  request = requestAnimationFrame(tick)

  onBeforeUnmount(() => {
    cancelAnimationFrame(request)
    stillness.removeEventListener('change', onStillnessChange)
    resize.disconnect()
    intersection.disconnect()
  })
})
</script>

<template>
  <div
    ref="viewport"
    class="flex overflow-x-auto overflow-y-hidden overscroll-x-contain select-none cursor-grab active:cursor-grabbing [--gap:--spacing(16)] [scroll-behavior:auto] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_33%,black_67%,transparent)] [&::-webkit-scrollbar]:hidden"
    @pointerdown="onPointerdown"
    @pointermove="onPointermove"
    @pointerup="onPointerup"
    @pointercancel="onPointerup"
    @click.capture="onClick"
    @dragstart.prevent
    @scroll.passive="onScroll"
    @wheel.passive="onUserScroll"
    @touchmove.passive="onUserScroll"
    @pointerenter="resting = true"
    @pointerleave="resting = false"
    @focusin="onFocusin"
    @focusout="focusWithin = false"
  >
    <div
      v-for="copy in copies"
      :key="copy"
      class="flex shrink-0 items-center gap-(--gap) pe-(--gap)"
    >
      <slot />
    </div>
  </div>
</template>
