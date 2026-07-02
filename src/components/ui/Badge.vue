<template>
  <span data-slot="badge" :class="cn(badgeVariants({ variant, className }))">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { badgeVariants, type BadgeVariants } from './badge'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: BadgeVariants['variant']
  className?: string
  [key: string]: any
}

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
