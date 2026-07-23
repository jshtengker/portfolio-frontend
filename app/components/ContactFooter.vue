<template>
  <footer class="border-t border-border mt-24">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-sm text-zinc-600 font-mono">
        ~/portfolio
      </span>
      <div class="flex items-center gap-4">
        <a 
          v-for="link in links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-400 hover:text-accent p-3 rounded-xl border border-transparent hover:border-accent/40 hover:bg-surface-alt hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 hover:scale-110 transition-all duration-300 ease-out flex items-center justify-center"
          :title="link.label"
          :aria-label="link.label"
        >
          <Icon :name="link.icon" class="w-5 h-5" />
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
  { label: 'GitHub', icon: 'simple-icons:github', url: appConfig.portfolio.social.github },
  { label: 'LinkedIn', icon: 'simple-icons:linkedin', url: appConfig.portfolio.social.linkedin },
  { label: 'Instagram', icon: 'simple-icons:instagram', url: appConfig.portfolio.social.instagram },
  { label: 'Email', icon: 'lucide:mail', url: `mailto:${appConfig.portfolio.social.email}` },
]
</script>
