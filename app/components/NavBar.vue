<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-[#0a0a0b]/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="font-mono text-sm tracking-tight hover:text-accent transition-colors">
        ~/portfolio
      </NuxtLink>
      <div class="flex items-center gap-8">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
          class="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
];
</script>
