/**
 * Easing functions for animations
 */

export type EasingFn = (t: number) => number

/**
 * Linear easing (no easing)
 * @param t - Progress value (0-1)
 * @returns Eased value
 */
export const linear: EasingFn = (t: number): number => t

/**
 * Ease-in (accelerating from zero velocity)
 * @param t - Progress value (0-1)
 * @returns Eased value
 */
export const easeIn: EasingFn = (t: number): number => t * t

/**
 * Ease-out (decelerating to zero velocity)
 * @param t - Progress value (0-1)
 * @returns Eased value
 */
export const easeOut: EasingFn = (t: number): number => t * (2 - t)

/**
 * Ease-in-out (acceleration until halfway, then deceleration)
 * @param t - Progress value (0-1)
 * @returns Eased value
 */
export const easeInOut: EasingFn = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

/**
 * Gets an easing function by name
 * @param name - The name of the easing function
 * @returns The easing function
 */
export function getEasingFunction(name: string): EasingFn {
  switch (name) {
    case 'linear':
      return linear
    case 'ease-in':
      return easeIn
    case 'ease-out':
      return easeOut
    case 'ease-in-out':
      return easeInOut
    default:
      return easeOut
  }
}
