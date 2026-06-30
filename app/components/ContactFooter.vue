<template>
  <footer class="border-t border-border mt-24">
    <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-sm text-zinc-600 font-mono">
        ~/portfolio
      </span>
      <div class="flex items-center gap-6">
        <a v-for="link in links" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer"
          class="text-sm text-zinc-500 hover:text-accent transition-colors">
          {{ link.label }}
        </a>
      </div>
      <span class="text-xs text-zinc-700">
        &copy; {{ year }}
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const year = new Date().getFullYear()

const links = [
  { label: 'GitHub', url: appConfig.portfolio.social.github },
  { label: 'LinkedIn', url: appConfig.portfolio.social.linkedin },
  { label: 'Email', url: `mailto:${appConfig.portfolio.social.email}` },
]
</script>
