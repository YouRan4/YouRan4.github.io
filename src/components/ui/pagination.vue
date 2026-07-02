<template>
  <nav role="navigation" aria-label="pagination" data-slot="pagination" :class="cn('mx-auto flex w-full justify-center', className)">
    <ul data-slot="pagination-content" class="flex flex-row items-center gap-1">
      <li data-slot="pagination-item">
        <a
          aria-label="Go to previous page"
          data-slot="pagination-link"
          :href="prevHref"
          :data-disabled="currentPage === 1"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'default' }),
            'gap-1 px-2.5 sm:pl-2.5',
            currentPage === 1 && 'pointer-events-none opacity-50',
          )"
        >
          <Icon icon="lucide:chevron-left" />
          <span class="hidden sm:block">Previous</span>
        </a>
      </li>

      <li v-for="page in pages" :key="page" data-slot="pagination-item">
        <a
          data-slot="pagination-link"
          :href="getPageUrl(page)"
          :aria-current="page === currentPage ? 'page' : undefined"
          :data-active="page === currentPage"
          :class="buttonVariants({ variant: page === currentPage ? 'outline' : 'ghost', size: 'icon' })"
        >
          {{ page }}
        </a>
      </li>

      <li v-if="totalPages > 5" data-slot="pagination-item">
        <span
          aria-hidden
          data-slot="pagination-ellipsis"
          class="flex size-9 items-center justify-center"
        >
          <Icon icon="lucide:more-horizontal" class="size-4" />
          <span class="sr-only">More pages</span>
        </span>
      </li>

      <li data-slot="pagination-item">
        <a
          aria-label="Go to next page"
          data-slot="pagination-link"
          :href="nextHref"
          :data-disabled="currentPage === totalPages"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'default' }),
            'gap-1 px-2.5 sm:pr-2.5',
            currentPage === totalPages && 'pointer-events-none opacity-50',
          )"
        >
          <span class="hidden sm:block">Next</span>
          <Icon icon="lucide:chevron-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

interface Props {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
  [key: string]: any
}

const props = defineProps<Props>()

const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1))

const getPageUrl = (page: number) => {
  if (page === 1) return props.baseUrl
  return `${props.baseUrl}${page}`
}

const prevHref = computed(() => {
  return props.currentPage > 1 ? getPageUrl(props.currentPage - 1) : undefined
})

const nextHref = computed(() => {
  return props.currentPage < props.totalPages ? getPageUrl(props.currentPage + 1) : undefined
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
