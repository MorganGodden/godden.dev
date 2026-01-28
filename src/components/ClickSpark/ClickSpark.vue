<template>
  <div ref="containerRef" class="relative w-full h-full" @mousedown="handleClick">
    <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, useTemplateRef } from 'vue'
import { getEasingFunction, type EasingFn } from '@/utils/easing'
import type { EasingFunction } from '@/types/index'

/**
 * Represents a single spark particle
 */
interface Spark {
  /** X coordinate of the spark origin */
  x: number
  /** Y coordinate of the spark origin */
  y: number
  /** Angle of the spark direction in radians */
  angle: number
  /** Timestamp when the spark was created */
  startTime: number
}

/**
 * Props for the ClickSpark component
 */
interface ClickSparkProps {
  /** Color of the spark particles */
  sparkColor?: string
  /** Size of each spark line (px) */
  sparkSize?: number
  /** Maximum radius of spark expansion (px) */
  sparkRadius?: number
  /** Number of sparks per click */
  sparkCount?: number
  /** Animation duration (ms) */
  duration?: number
  /** Easing function for animation */
  easing?: EasingFunction
  /** Additional scale multiplier for effect intensity */
  extraScale?: number
}

const props = withDefaults(defineProps<ClickSparkProps>(), {
  sparkColor: '#fff',
  sparkSize: 10,
  sparkRadius: 15,
  sparkCount: 8,
  duration: 400,
  easing: 'ease-out',
  extraScale: 1.0,
})

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
const sparks = ref<Spark[]>([])
const startTimeRef = ref<number | null>(null)
const animationId = ref<number | null>(null)

/**
 * Gets the easing function based on props
 */
const easeFunc = computed<EasingFn>(() => getEasingFunction(props.easing))

/**
 * Handles click events and creates sparks
 * @param e - Mouse event
 */
const handleClick = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const now = performance.now()
  const newSparks: Spark[] = Array.from({ length: props.sparkCount }, (_, i) => ({
    x,
    y,
    angle: (2 * Math.PI * i) / props.sparkCount,
    startTime: now,
  }))

  sparks.value.push(...newSparks)
}

/**
 * Animation loop - draws and updates all active sparks
 * @param timestamp - Current animation timestamp
 */
const draw = (timestamp: number) => {
  if (!startTimeRef.value) {
    startTimeRef.value = timestamp
  }

  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx || !canvas) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  sparks.value = sparks.value.filter((spark: Spark) => {
    const elapsed = timestamp - spark.startTime
    if (elapsed >= props.duration) {
      return false
    }

    const progress = elapsed / props.duration
    const eased = easeFunc.value(progress)

    const distance = eased * props.sparkRadius * props.extraScale
    const lineLength = props.sparkSize * (1 - eased)

    const x1 = spark.x + distance * Math.cos(spark.angle)
    const y1 = spark.y + distance * Math.sin(spark.angle)
    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

    ctx.strokeStyle = props.sparkColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    return true
  })

  animationId.value = requestAnimationFrame(draw)
}

/**
 * Resizes canvas to match parent element dimensions
 */
const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  const { width, height } = parent.getBoundingClientRect()
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
}

let resizeTimeout: ReturnType<typeof setTimeout>

/**
 * Throttled resize handler
 */
const handleResize = () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(resizeCanvas, 100)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(parent)

  resizeCanvas()

  animationId.value = requestAnimationFrame(draw)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  clearTimeout(resizeTimeout)

  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

watch(
  [
    () => props.sparkColor,
    () => props.sparkSize,
    () => props.sparkRadius,
    () => props.sparkCount,
    () => props.duration,
    easeFunc,
    () => props.extraScale,
  ],
  () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
    animationId.value = requestAnimationFrame(draw)
  },
)
</script>
