<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:size-3.5', className)"
  >
    <Icon v-if="!$slots.default" icon="lucide:chevron-right" />
    <slot v-else />
  </li>
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
