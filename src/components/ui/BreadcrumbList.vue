<template>
  <ol
    data-slot="breadcrumb-list"
    :class="cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)"
  >
    <slot />
  </ol>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}
defineProps<Props>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
