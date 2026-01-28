/**
 * Utility functions for common operations
 */

/**
 * Opens a URL in a new browser tab
 * @param url - The URL to open
 * @param target - The target window/tab (default: '_blank')
 */
export function openUrl(url: string, target: string = '_blank'): void {
  if (!url) {
    console.warn('openUrl: No URL provided')
    return
  }
  window.open(url, target)
}

/**
 * Calculates the rotation angle for a given index in a circular arrangement
 * @param index - The index of the item
 * @param totalItems - Total number of items in the circle
 * @returns The rotation angle in degrees
 */
export function calculateRotationAngle(index: number, totalItems: number): number {
  return index * (360 / totalItems)
}

/**
 * Calculates the radius of a circle from its circumference
 * @param circumference - The circumference of the circle
 * @returns The radius of the circle
 */
export function calculateRadius(circumference: number): number {
  return circumference / (2 * Math.PI)
}

/**
 * Creates a transform string for 3D positioning
 * @param rotateY - Rotation around Y axis in degrees
 * @param translateZ - Translation along Z axis in pixels
 * @returns CSS transform string
 */
export function create3DTransform(rotateY: number, translateZ: number): string {
  return `rotateY(${rotateY}deg) translateZ(${translateZ}px)`
}

/**
 * Repeats an array to reach a minimum length
 * @param array - The source array to repeat
 * @param minLength - The minimum desired length
 * @returns A new array with repeated elements
 */
export function repeatArrayToLength<T>(array: T[], minLength: number): T[] {
  if (array.length === 0) return []
  if (array.length >= minLength) return array

  const result: T[] = []
  const repetitions = Math.ceil(minLength / array.length)

  for (let i = 0; i < repetitions; i++) {
    result.push(...array)
  }

  return result.slice(0, minLength)
}

/**
 * Clamps a number between a minimum and maximum value
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linearly interpolates between two values
 * @param start - The start value
 * @param end - The end value
 * @param t - The interpolation factor (0-1)
 * @returns The interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}
