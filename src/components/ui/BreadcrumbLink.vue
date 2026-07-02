<template>
  <a
    data-slot="breadcrumb-link"
    :class="cn('hover:text-foreground transition-colors', className)"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  [key: string]: any
}
defineProps<Props>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
