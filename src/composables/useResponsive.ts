import { ref, onMounted, onUnmounted } from 'vue'
import { BREAKPOINTS } from '@/constants'

/**
 * Composable for responsive screen size detection
 * @returns Object containing screen size state and utilities
 */
export function useResponsive() {
  const isScreenSizeSm = ref(false)
  const isScreenSizeMd = ref(false)
  const isScreenSizeLg = ref(false)
  const isScreenSizeXl = ref(false)

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null

  /**
   * Updates all screen size flags based on current window width
   */
  const checkScreenSize = () => {
    const width = window.innerWidth
    isScreenSizeSm.value = width <= BREAKPOINTS.LG
    isScreenSizeMd.value = width > BREAKPOINTS.MD && width <= BREAKPOINTS.LG
    isScreenSizeLg.value = width > BREAKPOINTS.LG && width <= BREAKPOINTS.XL
    isScreenSizeXl.value = width > BREAKPOINTS.XL
  }

  /**
   * Throttled resize handler to optimize performance
   * @param throttleMs - Throttle delay in milliseconds
   */
  const throttledResize = (throttleMs: number = 100) => {
    if (resizeTimeout) return
    resizeTimeout = setTimeout(() => {
      checkScreenSize()
      resizeTimeout = null
    }, throttleMs)
  }

  onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', () => throttledResize(), { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => throttledResize())
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
  })

  return {
    isScreenSizeSm,
    isScreenSizeMd,
    isScreenSizeLg,
    isScreenSizeXl,
    checkScreenSize,
  }
}
