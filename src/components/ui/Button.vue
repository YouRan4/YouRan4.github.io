<template>
  <button data-slot="button" :class="cn(buttonVariants({ variant, size, className }))">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonVariants, type ButtonVariants } from './button'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  className?: string
  [key: string]: any
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
