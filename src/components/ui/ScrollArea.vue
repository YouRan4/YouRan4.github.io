<template>
  <ScrollAreaRoot
    v-bind="$attrs"
    data-slot="scroll-area"
    :class="cn('relative', className)"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      class="ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar :orientation="orientation" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner } from 'reka-ui'
import { cn } from '@/lib/utils'
import ScrollBar from './ScrollBar.vue'

interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
  [key: string]: any
}

withDefaults(defineProps<ScrollAreaProps>(), {
  orientation: 'vertical',
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
