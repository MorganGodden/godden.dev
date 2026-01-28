import { ref } from 'vue'

/**
 * Composable for managing a debounced state
 * @param delay - Debounce delay in milliseconds
 * @returns Object containing debounced utilities
 */
export function useDebounce(delay: number = 50) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  /**
   * Debounces a callback function
   * @param callback - Function to debounce
   */
  const debounce = (callback: () => void) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      callback()
      timeout = null
    }, delay)
  }

  /**
   * Clears any pending debounced callback
   */
  const clear = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return {
    debounce,
    clear,
  }
}
