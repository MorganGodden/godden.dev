<script setup lang="ts">
import '@/styles/main.css'
import 'primeicons/primeicons.css'

import { ref } from 'vue'
import { useResponsive } from '@/composables/useResponsive'

// Components
import Dither from './components/Dither/Dither.vue'
import ScrambleText from './components/ScrambleText/ScrambleText.vue'
import RollingGallery from './components/RollingGallery/RollingGallery.vue'
import ClickSpark from './components/ClickSpark/ClickSpark.vue'
import GButton from './components/GButton.vue'
import Header from './components/Header.vue'

// Configuration
import { showcases } from '@/config/showcases'
import { siteConfig } from './config/seo'
import { Carousel, Paginator } from 'primevue'
import ShowcaseItem from './components/ShowcaseItem.vue'
import type { Showcase } from './types'

/**
 * Controls when the header animation is complete
 */
const headerLoaded = ref<boolean>(false)

const { isScreenSizeSm } = useResponsive()

/**
 * Social media and contact links
 */
const socialLinks = [
  { icon: 'mdi:github', link: siteConfig.socialLinks.github, label: 'GitHub' },
  { icon: 'mdi:linkedin', link: siteConfig.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: 'mdi:email', link: `mailto:${siteConfig.authorEmail}`, label: 'Email' },
] as const
</script>

<template>
  <ClickSpark
    spark-color="#ff6b6b"
    :spark-size="12"
    :spark-radius="20"
    :spark-count="12"
    :duration="400"
    easing="ease-out"
    :extra-scale="2"
  >
    <Dither
      :color-num="4"
      :pixelSize="1"
      :waveSpeed="0.01"
      :enableMouseInteraction="false"
      class="fade-in-delayed"
    />

    <div
      class="flex flex-row gap-2 justify-center h-screen! w-full drop-shadow-lg pointer-events-none"
    >
      <div
        v-auto-animate
        class="flex flex-col w-full justify-center items-center pointer-events-none px-2 py-16 sm:px-8"
      >
        <Header @loaded="headerLoaded = true" />
        <div
          v-if="headerLoaded"
          class="flex flex-col w-full justify-center items-center pointer-events-none gap-0 lg:gap-2"
        >
          <ScrambleText
            className="px-2.5 font-medium text-white/70 text-center font-mono! pointer-events-auto wrap-break-word text-balance -mt-12 lg:-mt-10 text-lg"
            :radius="50"
            :duration="1.2"
            :speed="0.5"
            scrambleChars=".:"
          >
            <span>Full-Stack Software Engineer • Web Enthusiast</span>
          </ScrambleText>
          <div class="w-full flex items-center justify-center h-fit pointer-events-none">
            <Carousel
              v-if="isScreenSizeSm"
              :value="showcases"
              :num-visible="1"
              :wrap-around="true"
              :mouse-drag="true"
              :pt="{
                root: 'w-full max-w-xl mt-4',
                indicator: 'rounded-full! overflow-hidden',
                pcNextButton: 'bg-red-500! text-xl!',
                pcPrevButton: 'bg-red-500! text-xl!',
              }"
            >
              <template #item="{ data }: { data: Showcase }">
                <ShowcaseItem :showcase="data" class="mx-4" />
              </template>
            </Carousel>
            <RollingGallery
              v-else
              :autoplay="false"
              :pause-on-hover="true"
              :showcases="showcases"
            />
          </div>
          <div class="flex gap-2">
            <GButton
              v-for="social in socialLinks"
              :key="social.link"
              :icon="social.icon"
              :link="social.link"
              :aria-label="social.label"
            />
          </div>
        </div>
      </div>
    </div>
  </ClickSpark>
</template>

<style scoped>
.fade-in-delayed {
  animation: fadeIn 1s ease-in forwards;
  animation-delay: 1.5s;
  opacity: 0;
}
@keyframes fadeIn {
  to {
    opacity: 0.5;
  }
}
</style>
