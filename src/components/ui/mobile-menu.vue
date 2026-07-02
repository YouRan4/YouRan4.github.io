<template>
  <DropdownMenuRoot v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="md:hidden" title="Menu">
        <Icon icon="lucide:menu" class="h-5 w-5" />
        <span class="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      :side-offset="0"
      :align-offset="0"
      class="bg-background text-foreground z-50 min-w-[180px] overflow-hidden rounded-lg p-1.5 shadow-lg"
    >
      <DropdownMenuItem
        v-for="item in NAV_LINKS"
        :key="item.href"
        as-child
        @select="isOpen = false"
      >
        <a
          :href="item.href"
          :target="isExternalLink(item.href) ? '_blank' : '_self'"
          :rel="isExternalLink(item.href) ? 'noopener noreferrer' : undefined"
          :class="[
            'relative flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors select-none',
            'focus:bg-accent focus:text-accent-foreground',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            'w-full',
            isInsideLink(item)
              ? 'text-primary font-medium hover:bg-primary/10'
              : 'text-foreground/80 hover:text-foreground hover:bg-muted',
          ]"
          @click="isOpen = false"
        >
          <span class="flex-1 capitalize">{{ item.label }}</span>
          <Icon
            v-if="isExternalLink(item.href)"
            icon="lucide:external-link"
            class="h-3.5 w-3.5 opacity-60 shrink-0"
          />
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'reka-ui'
import Button from './Button.vue'
import { Icon } from '@iconify/vue'
import { NAV_LINKS } from '@/consts'

const isOpen = ref(false)

const isExternalLink = (href: string) => href.startsWith('http')
const isInsideLink = (item: { label: string }) => item.label.toLowerCase() === 'inside'

const handleViewTransitionStart = () => {
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('astro:before-swap', handleViewTransitionStart)
})

onBeforeUnmount(() => {
  document.removeEventListener('astro:before-swap', handleViewTransitionStart)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
