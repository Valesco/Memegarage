<script setup lang="ts">
import { ref, computed } from 'vue'
import { categories } from './data'
import TabBar from './components/TabBar.vue'
import ImageGrid from './components/ImageGrid.vue'

const activeTab = ref(categories[0]!.id)

const activeCategory = computed(() =>
  categories.find((c) => c.id === activeTab.value) ?? categories[0]!
)

const tabKey = ref(0)

function selectTab(id: string) {
  if (id === activeTab.value) return
  activeTab.value = id
  tabKey.value++
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Header -->
    <header class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-zinc-950/50 to-zinc-950"
      />
      <div class="relative max-w-6xl mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12">
        <div class="flex flex-col items-center gap-4 animate-fade-in-up">
          <img
            src="/images/optimized/frog.webp"
            alt="MemeGarage mascot"
            draggable="false"
            class="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-3"
          />
          <h1
            class="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
          >
            MemeSpecRacing & MemeGarage
          </h1>
          <p class="text-zinc-400 text-sm md:text-base font-medium">
            The finest collection of automotive memes
          </p>
        </div>
      </div>
    </header>

    <!-- Tabs -->
    <div class="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-zinc-800/30">
      <div class="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-center">
        <TabBar
          :categories="categories"
          :active-id="activeTab"
          @select="selectTab"
        />
      </div>
    </div>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div class="mb-6 md:mb-8 animate-fade-in">
        <h2 class="text-2xl md:text-3xl font-bold text-white">
          {{ activeCategory.label }}
        </h2>
        <p class="text-zinc-500 text-sm mt-1">
          {{ activeCategory.images.length }} images
        </p>
      </div>

      <Transition name="grid" mode="out-in">
        <ImageGrid :key="tabKey" :images="activeCategory.images" />
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-800/30 mt-12">
      <div class="max-w-6xl mx-auto px-4 py-6 text-center text-zinc-600 text-sm">
        MemeGarage &mdash; Built with Vue, Tailwind & good vibes
      </div>
    </footer>
  </div>
</template>

<style scoped>
.grid-enter-active {
  transition: all 0.3s ease-out;
}
.grid-leave-active {
  transition: all 0.2s ease-in;
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.grid-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
