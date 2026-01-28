<script setup lang="ts">
import BlurText from './BlurText/BlurText.vue'

/**
 * Emitted events from the Header component
 */
interface HeaderEmits {
  /** Emitted when the header animation is complete */
  (e: 'loaded'): void
}

const emit = defineEmits<HeaderEmits>()
</script>

<template>
  <div class="flex flex-col items-center justify-center lg:hidden!">
    <BlurText
      text="Morgan"
      :delay="70"
      className="font-bold header-text h-30"
      animateBy="letters"
      direction="top"
      :threshold="0.1"
      rootMargin="0px"
      :stepDuration="0.5"
    />
    <BlurText
      text="Godden"
      :delay="70"
      className="font-bold header-text"
      animateBy="letters"
      direction="bottom"
      :threshold="0.1"
      rootMargin="0px"
      :stepDuration="0.5"
    />
  </div>
  <BlurText
    text="Morgan Godden"
    :delay="70"
    className="font-bold header-text hidden lg:block!"
    animateBy="letters"
    direction="top"
    :threshold="0.1"
    rootMargin="0px"
    :stepDuration="0.5"
    @animation-complete="emit('loaded')"
  />
</template>

<style scoped>
/**
 * Styles for the header text
 */
.header-text {
  font-family: 'JBlack', sans-serif;
  font-weight: 900;
  font-size: 8rem;
}
</style>
