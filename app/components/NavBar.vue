<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="font-mono text-sm tracking-tight text-zinc-200 hover:text-accent transition-colors flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse" />
        ~/portfolio
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-zinc-400 hover:text-accent transition-colors"
          active-class="!text-accent font-medium"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <button
        class="md:hidden p-2 text-zinc-400 hover:text-accent transition-colors"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="md:hidden border-b border-border bg-surface px-6 py-4 space-y-3 transition-all duration-200"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block text-sm text-zinc-400 hover:text-accent transition-colors py-1"
        active-class="!text-accent font-medium"
        @click="isOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]
</script>

