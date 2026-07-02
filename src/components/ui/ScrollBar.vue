<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    :class="cn(
      'flex touch-none p-px transition-colors select-none',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
    )"
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="bg-border relative flex-1 rounded-full"
    />
  </ScrollAreaScrollbar>
</template>

<script setup lang="ts">
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import { cn } from '@/lib/utils'

interface ScrollBarProps {
  orientation?: 'vertical' | 'horizontal'
}

withDefaults(defineProps<ScrollBarProps>(), {
  orientation: 'vertical',
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
