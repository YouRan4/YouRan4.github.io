<template>
  <div>
    <button
      id="search-toggle"
      title="搜索"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 size-9"
      @click="openSearch"
    >
      <Icon icon="lucide:search" class="h-4 w-4" />
      <span class="sr-only">搜索</span>
    </button>
    <Teleport to="body" v-if="isOpen">
      <div
        class="fixed inset-0 z-[9999] flex flex-col sm:flex sm:items-start sm:justify-center sm:pt-[15vh]"
        @click.self="closeSearch"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeSearch" />

        <div class="relative flex flex-col w-full h-full sm:h-auto sm:max-w-lg sm:mx-auto bg-background sm:border sm:border-border sm:rounded-xl shadow-2xl overflow-hidden">
          <div class="flex items-center border-b border-border px-4 shrink-0">
            <Icon icon="lucide:search" class="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="搜索文章..."
              class="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground/60"
              @keydown.escape="closeSearch"
              @keydown.down.prevent="highlightNext"
              @keydown.up.prevent="highlightPrev"
              @keydown.enter="goToHighlighted"
            />
            <button
              class="text-xs text-muted-foreground/60 hover:text-foreground px-2 py-1 rounded"
              @click="closeSearch"
            >
              <Icon icon="lucide:x" class="h-4 w-4" />
              <span class="sr-only">关闭</span>
            </button>
          </div>

          <div v-if="query.length > 0" class="flex-1 sm:max-h-[60vh] overflow-y-auto">
            <div v-if="results.length === 0" class="px-4 py-8 text-center text-sm text-muted-foreground">
              未找到相关文章
            </div>
            <a
              v-for="(post, index) in results"
              :key="post.id"
              :href="`/blog/${post.id}`"
              :ref="(el) => { if (el && index === highlightedIndex) highlightedEl = el as HTMLElement }"
              :class="[
                'block px-4 py-3 border-b border-border/50 last:border-0 transition-colors',
                index === highlightedIndex ? 'bg-muted' : 'hover:bg-muted/50'
              ]"
              @click="closeSearch"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium truncate">{{ post.title }}</span>
                <span class="text-xs text-muted-foreground/60 shrink-0">{{ post.date }}</span>
              </div>
              <p class="text-xs text-muted-foreground/80 mt-0.5 line-clamp-1">{{ post.description }}</p>
              <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1 mt-1.5">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="text-[10px] px-1.5 py-0.5 rounded font-medium bg-muted text-muted-foreground/70"
                >
                  {{ tag }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Icon } from '@iconify/vue'

interface PostData {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
}

interface Props {
  posts: PostData[]
}

const props = defineProps<Props>()

const isOpen = ref(false)
const query = ref('')
const results = ref<PostData[]>([])
const highlightedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const highlightedEl = ref<HTMLElement | null>(null)

let index: any = null
const postMap = new Map<string, PostData>()

function initIndex() {
  import('flexsearch').then((m) => {
    const FlexSearch = m.default
    index = new FlexSearch.Index({ tokenize: 'forward' })
    for (const post of props.posts) {
      postMap.set(post.id, post)
      const text = `${post.title} ${post.description} ${post.tags?.join(' ') || ''}`
      index.add(post.id, text)
    }
  })
}

function doSearch(q: string) {
  if (!index || q.length < 1) {
    results.value = []
    return
  }
  const ids: string[] = index.search(q, 20)
  results.value = ids.map((id: string) => postMap.get(id)).filter(Boolean) as PostData[]
  highlightedIndex.value = 0
}

watch(query, (val) => {
  doSearch(val)
})

function openSearch() {
  isOpen.value = true
  query.value = ''
  results.value = []
  highlightedIndex.value = 0
  nextTick(() => {
    inputRef.value?.focus()
    if (!index) initIndex()
  })
}

function closeSearch() {
  isOpen.value = false
}

function highlightNext() {
  if (results.value.length === 0) return
  highlightedIndex.value = (highlightedIndex.value + 1) % results.value.length
  nextTick(() => {
    highlightedEl.value?.scrollIntoView({ block: 'nearest' })
  })
}

function highlightPrev() {
  if (results.value.length === 0) return
  highlightedIndex.value = (highlightedIndex.value - 1 + results.value.length) % results.value.length
  nextTick(() => {
    highlightedEl.value?.scrollIntoView({ block: 'nearest' })
  })
}

function goToHighlighted() {
  const post = results.value[highlightedIndex.value]
  if (post) {
    window.location.href = `/blog/${post.id}`
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
