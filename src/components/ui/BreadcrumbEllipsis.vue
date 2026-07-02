<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn('flex size-9 items-center justify-center', className)"
  >
    <Icon icon="lucide:more-horizontal" class="size-4" />
    <span class="sr-only">More</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
