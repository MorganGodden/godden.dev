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
      class="arrow-button absolute left-[27%] top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Previous showcase"
    >
      <Icon icon="mdi:chevron-left" class="text-2xl text-white" />
    </button>
    <button
      @click="rotateRight"
      class="arrow-button absolute right-[27%] top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Next showcase"
    >
      <Icon icon="mdi:chevron-right" class="text-2xl text-white" />
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
        <div
          v-for="(showcase, i) in displayShowcases"
          :key="`gallery-${i}`"
          :style="{
            ...getItemStyle(i),
          }"
          class="absolute flex flex-row justify-center items-center h-full backface-hidden pointer-events-none will-change-transform"
        >
          <div
            class="flex shadow-inner bg-black/70 w-full h-72 lg:h-full rounded-lg border-white/10 border drop-shadow-lg p-6 font-mono overflow-clip"
          >
            <Icon
              :icon="showcase.icon"
              class="absolute text-white/7 text-[250px] blur-xs -left-5 top-5 rotate-20"
            />
            <div class="flex flex-col gap-2 w-full min-h-32">
              <h2 class="font-bold text-md leading-tight">{{ showcase.title }}</h2>
              <p class="text-pretty leading-tight text-[0.7rem]">{{ showcase.description }}</p>
              <div class="flex gap-1 items-center justify-between mt-auto">
                <div class="flex gap-1 items-center text-white/70">
                  <Icon
                    v-for="(icon, name) in showcase.techIcons"
                    :key="name"
                    v-tooltip.top="name"
                    :icon="icon"
                    mode="mask"
                    class="text-xl pointer-events-auto"
                  />
                </div>
                <Button
                  v-if="showcase.link"
                  :label="showcase.disabled ? 'Coming Soon' : 'View Work'"
                  size="small"
                  iconPos="right"
                  icon="pi pi-arrow-right"
                  text
                  plain
                  class="h-8!"
                  :disabled="showcase.disabled"
                  @click="() => openUrl(showcase.link)"
                />
              </div>
            </div>
          </div>
        </div>
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
  mask-image: linear-gradient(to right, transparent 30%, black 45%, black 55%, transparent 70%);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 25%,
    black 32%,
    black 68%,
    transparent 75%
  );
}
</style>
