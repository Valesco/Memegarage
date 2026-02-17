<script setup lang="ts">
import type { MemeCategory } from '../types'

defineProps<{
  categories: MemeCategory[]
  activeId: string
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 shadow-lg shadow-black/20 overflow-x-auto scrollbar-hide"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        @click="emit('select', category.id)"
        class="relative px-5 py-2.5 md:px-8 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer select-none"
        :class="[
          activeId === category.id
            ? 'text-white'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50',
        ]"
      >
        <span
          v-if="activeId === category.id"
          class="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 transition-all duration-300"
        />
        <span class="relative z-10">{{ category.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
