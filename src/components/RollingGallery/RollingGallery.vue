<script setup lang="ts">
import type { Showcase } from '@/types/index'
import { Icon } from '@iconify/vue'
import { Motion } from 'motion-v'
import { computed, onMounted, ref, watch } from 'vue'

// Import utilities and composables
import { useResponsive, useAutoplay, useDebounce } from '@/composables'
import {
  openUrl,
  calculateRotationAngle,
  calculateRadius,
  create3DTransform,
  repeatArrayToLength,
} from '@/utils'
import { StyleCache } from '@/utils/cache'
import { ANIMATION, GALLERY, TIMING } from '@/constants'

/**
 * Props for the RollingGallery component
 */
interface RollingGalleryProps {
  /** Enable automatic rotation */
  autoplay?: boolean
  /** Pause rotation on hover */
  pauseOnHover?: boolean
  /** Array of showcase items to display */
  showcases: Showcase[]
}

const props = withDefaults(defineProps<RollingGalleryProps>(), {
  autoplay: false,
  pauseOnHover: false,
  showcases: () => [],
})

// Use composables
const { isScreenSizeSm } = useResponsive()
const { debounce: debouncedHover } = useDebounce(ANIMATION.HOVER_DEBOUNCE_DELAY)

// State
const rotateYValue = ref(0)

/**
 * Ensures we have enough showcases to fill the gallery
 */
const displayShowcases = computed(() => {
  const sourceShowcases = props.showcases.length > 0 ? props.showcases : []
  return repeatArrayToLength(sourceShowcases, GALLERY.REFERENCE_FACE_COUNT_SPACING)
})

/**
 * Responsive cylinder width based on screen size
 */
const cylinderWidth = computed(() =>
  isScreenSizeSm.value ? GALLERY.CYLINDER_WIDTH_SM : GALLERY.CYLINDER_WIDTH_LG,
)

/**
 * Width of each face in the gallery
 */
const faceWidth = computed(
  () => (cylinderWidth.value / GALLERY.REFERENCE_FACE_COUNT_SIZING) * GALLERY.FACE_WIDTH_MULTIPLIER,
)

/**
 * Radius of the cylindrical gallery
 */
const radius = computed(() => calculateRadius(cylinderWidth.value))

/**
 * Style object for the gallery track container
 */
const trackStyle = computed(() => ({
  width: `${cylinderWidth.value}px`,
  transformStyle: 'preserve-3d' as const,
}))

/**
 * Animation properties for Motion component
 */
const animateProps = computed(() => ({
  rotateY: rotateYValue.value,
}))

/**
 * Spring transition configuration
 */
const springTransition = computed(() => ({
  duration: 0.8,
  ease: 'easeOut' as const,
}))

// Style cache for performance optimization
const styleCache = new StyleCache<{ width: string; transform: string }>(
  TIMING.CACHE_CLEANUP_THRESHOLD,
)

/**
 * Generates cached style for a gallery item
 * @param index - Index of the item
 * @returns Style object with width and transform
 */
const getItemStyle = (index: number) => {
  const cacheKey = `${index}-${faceWidth.value}-${radius.value}`

  if (styleCache.has(cacheKey)) {
    return styleCache.get(cacheKey)!
  }

  const yRot = calculateRotationAngle(index, GALLERY.REFERENCE_FACE_COUNT_SPACING)
  const style = {
    width: `${faceWidth.value}px`,
    transform: create3DTransform(yRot, radius.value * GALLERY.RADIUS_MULTIPLIER),
    position: 'absolute',
  }

  styleCache.set(cacheKey, style)
  return style
}

/**
 * Rotates the gallery to the left (counter-clockwise)
 */
function rotateLeft() {
  rotateYValue.value += 360 / GALLERY.REFERENCE_FACE_COUNT_SPACING
  autoplay.restartAutoplay()
}

/**
 * Rotates the gallery to the right (clockwise)
 */
function rotateRight() {
  rotateYValue.value -= 360 / GALLERY.REFERENCE_FACE_COUNT_SPACING
  autoplay.restartAutoplay()
}

// Setup autoplay with composable
const autoplay = useAutoplay(rotateRight, {
  interval: ANIMATION.AUTOPLAY_INTERVAL,
  restartDelay: ANIMATION.DRAG_RESTART_DELAY,
  enabled: props.autoplay,
  pauseOnHover: props.pauseOnHover,
})

/**
 * Handles mouse enter with debouncing
 */
function handleMouseEnter() {
  debouncedHover(() => {
    autoplay.handleHoverStart()
  })
}

/**
 * Handles mouse leave with debouncing
 */
function handleMouseLeave() {
  debouncedHover(() => {
    autoplay.handleHoverEnd()
  })
}

// Lifecycle hooks
onMounted(() => {
  if (props.autoplay) {
    autoplay.startAutoplay()
  }
})

// Watch for prop changes
watch(
  () => props.autoplay,
  (newVal) => {
    autoplay.stopAutoplay()
    if (newVal && (!props.pauseOnHover || !autoplay.isHovered.value)) {
      setTimeout(() => {
        if (!props.pauseOnHover || !autoplay.isHovered.value) {
          autoplay.startAutoplay()
        }
      }, ANIMATION.HOVER_RESTART_DELAY)
    }
  },
)

watch(
  () => props.pauseOnHover,
  () => {
    if (props.autoplay) {
      autoplay.stopAutoplay()
      if (!props.pauseOnHover || !autoplay.isHovered.value) {
        autoplay.startAutoplay()
      }
    }
  },
)
</script>

<template>
  <div class="relative w-fit">
    <!-- Navigation Buttons -->
    <button
      @click="rotateLeft"
      class="arrow-button left-[22.5%] pr-4!"
      aria-label="Previous showcase"
    >
      <Icon icon="fa:chevron-left" class="text-4xl opacity-50" />
    </button>
    <button
      @click="rotateRight"
      class="arrow-button right-[22.5%] pl-4!"
      aria-label="Next showcase"
    >
      <Icon icon="fa:chevron-right" class="text-4xl opacity-50" />
    </button>
    <div
      class="blur-gradient flex justify-center items-center h-fit w-fit py-12 transform-3d perspective-[1100px]"
    >
      <Motion
        tag="div"
        class="flex justify-center items-stretch w-fit h-52 min-h-52 lg:h-52 my-6 lg:min-h-52 transform-3d select-none will-change-transform"
        :style="trackStyle"
        :animate="animateProps"
        :transition="springTransition"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <ShowcaseItem
          v-for="(showcase, i) in displayShowcases"
          :key="`gallery-${i}`"
          :showcase="showcase"
          :style="{
            ...getItemStyle(i),
          }"
        />
      </Motion>
    </div>
  </div>
</template>

<style scoped>
/**
 * Gradient blur effect for the gallery container
 */
.blur-gradient {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  mask-image: linear-gradient(to right, transparent 25%, black 32%, black 68%, transparent 75%);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 25%,
    black 32%,
    black 68%,
    transparent 75%
  );
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.75rem;
  transition: all 200ms;
}

.arrow-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.05);
}

.arrow-button:active {
  transform: translateY(-50%) scale(0.95);
}
</style>
