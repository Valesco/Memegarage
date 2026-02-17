<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'

defineProps<{
  src: string
  alt: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { isVisible } = useIntersectionObserver('300px', containerRef)
</script>

<template>
  <div ref="containerRef" class="relative overflow-hidden rounded-xl bg-zinc-800/50 aspect-[4/3]">
    <div
      v-if="!isVisible"
      class="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%]"
    />
    <img
      v-if="isVisible"
      :src="src"
      :alt="alt"
      draggable="false"
      loading="lazy"
      class="w-full h-full object-cover animate-scale-in transition-transform duration-500 hover:scale-105"
    />
  </div>
</template>
