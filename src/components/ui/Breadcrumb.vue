<template>
  <nav aria-label="breadcrumb" data-slot="breadcrumb">
    <slot />
  </nav>
</template>

<script setup lang="ts">
interface Props {
  [key: string]: any
}
defineProps<Props>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
