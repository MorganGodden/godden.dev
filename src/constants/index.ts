/**
 * Application-wide constants
 */

/**
 * Animation timing constants
 */
export const ANIMATION = {
  /** Interval between autoplay rotations (ms) */
  AUTOPLAY_INTERVAL: 4000,
  /** Delay before restarting autoplay after user interaction (ms) */
  DRAG_RESTART_DELAY: 1500,
  /** Delay before restarting autoplay after hover end (ms) */
  HOVER_RESTART_DELAY: 100,
  /** Debounce delay for hover events (ms) */
  HOVER_DEBOUNCE_DELAY: 50,
  /** Duration for fade-in animation (s) */
  FADE_IN_DURATION: 1,
  /** Delay before fade-in animation starts (s) */
  FADE_IN_DELAY: 1.5,
} as const

/**
 * Gallery configuration constants
 */
export const GALLERY = {
  /** Number of faces in the 3D cylinder for spacing calculations */
  REFERENCE_FACE_COUNT_SPACING: 6,
  /** Number of faces in the 3D cylinder for sizing calculations */
  REFERENCE_FACE_COUNT_SIZING: 6,
  /** Width of the cylinder on small screens (px) */
  CYLINDER_WIDTH_SM: 1100,
  /** Width of the cylinder on large screens (px) */
  CYLINDER_WIDTH_LG: 1600,
  /** Multiplier for face width calculation */
  FACE_WIDTH_MULTIPLIER: 1.5,
  /** Multiplier for radius adjustment */
  RADIUS_MULTIPLIER: 1.4,
} as const

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  /** Small screen breakpoint (px) */
  SM: 640,
  /** Medium screen breakpoint (px) */
  MD: 768,
  /** Large screen breakpoint (px) */
  LG: 1024,
  /** Extra large screen breakpoint (px) */
  XL: 1280,
  /** 2X large screen breakpoint (px) */
  XXL: 1536,
} as const

/**
 * Timing constants
 */
export const TIMING = {
  /** Throttle delay for resize events (ms) */
  RESIZE_THROTTLE: 100,
  /** Cache cleanup threshold */
  CACHE_CLEANUP_THRESHOLD: 50,
} as const
