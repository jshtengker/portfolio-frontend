<template>
  <div
    ref="el"
    class="transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    :style="delay ? { transitionDelay: `${delay}ms` } : {}"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  delay?: number
}>()

const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => {})
</script>
