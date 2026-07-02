<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('inline-flex items-center gap-1.5', className)"
  >
    <slot />
  </li>
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
