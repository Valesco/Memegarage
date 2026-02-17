import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  rootMargin = '200px',
  elementRef?: Ref<HTMLElement | null>
): {
  isVisible: Ref<boolean>
} {
  const target = elementRef ?? ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible }
}
