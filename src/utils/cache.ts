/**
 * Cache utility for storing computed values
 */
export class StyleCache<T> {
  private cache = new Map<string, T>()
  private maxSize: number

  /**
   * Creates a new StyleCache instance
   * @param maxSize - Maximum number of entries before cleanup (default: 50)
   */
  constructor(maxSize: number = 50) {
    this.maxSize = maxSize
  }

  /**
   * Gets a value from the cache
   * @param key - The cache key
   * @returns The cached value or undefined
   */
  get(key: string): T | undefined {
    return this.cache.get(key)
  }

  /**
   * Sets a value in the cache
   * @param key - The cache key
   * @param value - The value to cache
   */
  set(key: string, value: T): void {
    // Clear cache if it exceeds max size
    if (this.cache.size >= this.maxSize) {
      this.cache.clear()
    }
    this.cache.set(key, value)
  }

  /**
   * Checks if a key exists in the cache
   * @param key - The cache key
   * @returns True if the key exists
   */
  has(key: string): boolean {
    return this.cache.has(key)
  }

  /**
   * Clears all entries from the cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Gets the current size of the cache
   * @returns The number of entries
   */
  get size(): number {
    return this.cache.size
  }
}
