<script setup lang="ts">
import type { MemeImage } from '../types'
import LazyImage from './LazyImage.vue'

defineProps<{
  images: MemeImage[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <div
      v-for="(image, index) in images"
      :key="image.src"
      class="animate-fade-in-up"
      :style="{ animationDelay: `${index * 80}ms` }"
    >
      <LazyImage :src="image.src" :alt="image.alt" />
    </div>
  </div>
</template>
