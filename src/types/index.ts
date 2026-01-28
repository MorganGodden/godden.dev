/**
 * Core type definitions for the application
 */

/**
 * Represents a portfolio showcase item
 */
export interface Showcase {
  /** Title of the project */
  title: string
  /** Detailed description of the project */
  description: string
  /** Icon identifier (from Iconify) */
  icon: string
  /** URL to the live project or demo */
  link: string
  /** Map of technology names to their icon identifiers */
  techIcons: Record<string, string>
  /** Whether the showcase is disabled or not */
  disabled?: boolean
}

/**
 * Animation keyframe snapshot for Motion animations
 */
export interface AnimationSnapshot {
  filter?: string
  opacity?: number
  y?: number
  x?: number
  scale?: number
  rotate?: number
  [key: string]: string | number | undefined
}

/**
 * Gallery rotation directions
 */
export type RotationDirection = 'left' | 'right'

/**
 * Animation easing functions
 */
export type EasingFunction = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'

/**
 * Text animation modes
 */
export type AnimateBy = 'words' | 'letters'

/**
 * Animation direction for text effects
 */
export type AnimationDirection = 'top' | 'bottom' | 'left' | 'right'

/**
 * 3D transform style cache entry
 */
export interface StyleCacheEntry {
  width: string
  transform: string
}
