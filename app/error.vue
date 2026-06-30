<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <p class="font-mono text-accent text-lg mb-2">
        &gt; {{ error?.statusCode || '404' }}
      </p>
      <h1 class="text-2xl font-bold tracking-tight mb-4">
        {{ error?.statusMessage || 'Page not found' }}
      </h1>
      <p class="text-zinc-400 leading-relaxed mb-8">
        {{ error?.statusCode === 404
          ? 'The resource you\'re looking for doesn\'t exist or has moved.'
          : 'Something went wrong on our end. Try again shortly.' }}
      </p>
      <div class="flex gap-4 justify-center">
        <NuxtLink to="/"
          class="px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm">
          Go home
        </NuxtLink>
        <button @click="handleError"
          class="px-5 py-2.5 border border-border text-zinc-300 rounded-lg hover:bg-surface transition-colors text-sm">
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: { statusCode?: number; statusMessage?: string }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
