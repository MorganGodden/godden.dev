import { ref, onUnmounted } from 'vue'

/**
 * Configuration for autoplay behavior
 */
interface AutoplayConfig {
  /** Interval between autoplay actions in milliseconds */
  interval: number
  /** Delay before restarting autoplay after interaction in milliseconds */
  restartDelay: number
  /** Whether autoplay is enabled */
  enabled: boolean
  /** Whether to pause on hover */
  pauseOnHover: boolean
}

/**
 * Composable for managing autoplay functionality
 * @param callback - Function to execute on each autoplay tick
 * @param config - Autoplay configuration options
 * @returns Object containing autoplay control functions and state
 */
export function useAutoplay(callback: () => void, config: AutoplayConfig) {
  const isHovered = ref(false)
  const autoplayInterval = ref<ReturnType<typeof setInterval> | null>(null)
  const autoplayTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Starts the autoplay interval
   */
  const startAutoplay = () => {
    if (!config.enabled || (config.pauseOnHover && isHovered.value)) return

    stopAutoplay()

    autoplayInterval.value = setInterval(() => {
      if (!config.pauseOnHover || !isHovered.value) {
        callback()
      }
    }, config.interval)
  }

  /**
   * Stops the autoplay interval and clears any pending timeouts
   */
  const stopAutoplay = () => {
    if (autoplayInterval.value) {
      clearInterval(autoplayInterval.value)
      autoplayInterval.value = null
    }
    if (autoplayTimeout.value) {
      clearTimeout(autoplayTimeout.value)
      autoplayTimeout.value = null
    }
  }

  /**
   * Restarts autoplay after a delay
   */
  const restartAutoplay = () => {
    stopAutoplay()

    if (config.enabled && (!config.pauseOnHover || !isHovered.value)) {
      autoplayTimeout.value = setTimeout(() => {
        if (!config.pauseOnHover || !isHovered.value) {
          startAutoplay()
        }
      }, config.restartDelay)
    }
  }

  /**
   * Handles hover start - pauses autoplay if pauseOnHover is enabled
   */
  const handleHoverStart = () => {
    isHovered.value = true
    if (config.enabled && config.pauseOnHover) {
      stopAutoplay()
    }
  }

  /**
   * Handles hover end - restarts autoplay if enabled
   */
  const handleHoverEnd = () => {
    isHovered.value = false
    if (config.enabled && config.pauseOnHover) {
      restartAutoplay()
    }
  }

  onUnmounted(() => {
    stopAutoplay()
  })

  return {
    isHovered,
    startAutoplay,
    stopAutoplay,
    restartAutoplay,
    handleHoverStart,
    handleHoverEnd,
  }
}
