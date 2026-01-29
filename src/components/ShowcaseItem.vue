<script setup lang="ts">
import type { Showcase } from '@/types/index'
import { Icon } from '@iconify/vue'
import { openUrl } from '@/utils'
import { Button } from 'primevue'

/**
 * Props for the ShowcaseItem component
 */
interface ShowcaseItemProps {
  /** Showcase item data */
  showcase: Showcase
}

const props = defineProps<ShowcaseItemProps>()
</script>

<template>
  <div
    class="flex flex-row justify-center items-center h-full backface-hidden pointer-events-none will-change-transform"
  >
    <div
      class="flex shadow-inner bg-black/70 w-full min-h-52 h-full rounded-lg border-white/10 border drop-shadow-lg p-6 font-mono overflow-clip"
    >
      <div class="flex flex-col gap-2 w-full min-h-32">
        <h2 class="font-bold text-md leading-tight">{{ showcase.title }}</h2>
        <p class="text-pretty leading-snug text-[0.7rem]">
          {{ showcase.description }}
        </p>
        <div class="flex gap-1 items-center justify-between mt-auto">
          <div class="flex gap-1 items-center text-white/70">
            <Icon
              v-for="(icon, name) in showcase.techIcons"
              :key="name"
              v-tooltip.top="name"
              :icon="icon"
              mode="mask"
              class="text-xl pointer-events-auto"
            />
          </div>
          <Button
            v-if="showcase.link"
            :label="showcase.disabled ? 'Coming Soon' : 'View Work'"
            size="small"
            iconPos="right"
            icon="pi pi-arrow-right"
            text
            plain
            pt:root="h-8! bg-white/5! hover:bg-white/10! transition-all duration-200 pointer-events-auto"
            :disabled="showcase.disabled"
            @click="() => openUrl(showcase.link)"
          />
        </div>
      </div>
      <Icon
        :icon="showcase.icon"
        class="absolute text-white/10 text-[250px] blur-xs -left-5 top-5 rotate-20"
      />
    </div>
  </div>
</template>
