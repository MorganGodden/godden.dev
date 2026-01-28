<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(SplitText, ScrambleTextPlugin)

/**
 * Props for the ScrambleText component
 */
interface ScrambleTextProps {
  /** Radius of effect around cursor (px) */
  radius?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Scramble animation speed */
  speed?: number
  /** Characters used for scrambling effect */
  scrambleChars?: string
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: Record<string, string | number>
}

const props = withDefaults(defineProps<ScrambleTextProps>(), {
  radius: 100,
  duration: 1.2,
  speed: 0.5,
  scrambleChars: '.:',
  className: '',
  style: () => ({}),
})

const rootRef = useTemplateRef<HTMLDivElement>('rootRef')

let splitText: SplitText | null = null
let handleMove: ((e: PointerEvent) => void) | null = null

/**
 * Initializes the scramble text effect
 * Splits text into characters and attaches pointer event listener
 */
const initializeScrambleText = () => {
  if (!rootRef.value) return

  const pElement = rootRef.value.querySelector('p')
  if (!pElement) return

  splitText = new SplitText(pElement, {
    type: 'chars',
    charsClass: 'inline-block will-change-transform',
  })

  splitText.chars.forEach((el) => {
    const c = el as HTMLElement
    gsap.set(c, { attr: { 'data-content': c.innerHTML } })
  })

  handleMove = (e: PointerEvent) => {
    if (!splitText) return

    splitText.chars.forEach((el) => {
      const c = el as HTMLElement
      const { left, top, width, height } = c.getBoundingClientRect()
      const dx = e.clientX - (left + width / 2)
      const dy = e.clientY - (top + height / 2)
      const dist = Math.hypot(dx, dy)

      if (dist < props.radius) {
        gsap.to(c, {
          overwrite: true,
          duration: props.duration * (1 - dist / props.radius),
          scrambleText: {
            text: c.dataset.content || '',
            chars: props.scrambleChars,
            speed: props.speed,
            oldClass: 'text-red-400',
          },
          ease: 'none',
        })
      }
    })
  }

  rootRef.value.addEventListener('pointermove', handleMove)
}

/**
 * Cleans up event listeners and GSAP instances
 */
const cleanup = () => {
  if (rootRef.value && handleMove) {
    rootRef.value.removeEventListener('pointermove', handleMove)
  }
  if (splitText) {
    splitText.revert()
    splitText = null
  }
  handleMove = null
}

onMounted(() => {
  initializeScrambleText()
})

onUnmounted(() => {
  cleanup()
})

watch(
  [() => props.radius, () => props.duration, () => props.speed, () => props.scrambleChars],
  () => {
    cleanup()
    initializeScrambleText()
  },
)
</script>

<template>
  <div ref="rootRef" :class="`scramble-text ${className}`" :style="style">
    <p>
      <slot></slot>
    </p>
  </div>
</template>
