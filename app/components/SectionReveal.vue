<template>
  <div ref="el" class="transition-all duration-700"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
    <slot />
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null);
const visible = ref(true);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );
  if (el.value) observer.observe(el.value);
  onUnmounted(() => observer.disconnect());
});
</script>
