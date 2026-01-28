<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { openUrl } from '@/utils'

/**
 * Props for the GButton component
 */
interface GButtonProps {
  /** Icon identifier from Iconify */
  icon?: string
  /** Button text label */
  text?: string
  /** URL to navigate to when clicked */
  link?: string
}

const props = defineProps<GButtonProps>()

/**
 * Handles button click - opens link in new tab
 */
function onClick() {
  if (props.link) {
    openUrl(props.link)
  }
}
</script>

<template>
  <Button :label="text" rounded text severity="secondary" :disabled="!link" @click="onClick">
    <template #icon>
      <Icon v-if="icon" :icon="icon" class="text-3xl" />
    </template>
  </Button>
</template>
