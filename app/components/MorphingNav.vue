<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-auto">
    <div
      class="relative flex items-center justify-between gap-3 bg-surface/95 backdrop-blur-xl border border-border rounded-full px-4 py-2.5 shadow-2xl shadow-black/80 transition-all duration-500 ease-out group"
      :class="[
        isCompact && !isHovered ? 'scale-95 py-2 px-3.5 bg-surface-alt border-border' : 'scale-100',
      ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        class="absolute -inset-0.5 rounded-full bg-linear-to-r from-accent/20 via-accent-blue/20 to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
      />

      <Transition name="fade-slide" mode="out-in">
        <div v-if="isCompact && !isHovered" key="compact" class="flex items-center gap-3 font-mono text-xs text-zinc-300">
          <NuxtLink to="/" class="flex items-center gap-2 font-medium hover:text-accent transition-colors">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
            </span>
            <span class="tracking-tight">{{ currentRouteName }}</span>
          </NuxtLink>

          <span class="text-zinc-600">/</span>

          <div class="flex items-center gap-1.5 text-zinc-400">
            <span class="text-[10px] font-semibold tracking-wider text-accent">{{ Math.round(scrollPercent) }}%</span>
          </div>

          <span class="text-zinc-600">|</span>

          <button
            class="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
            @click="scrollToTop"
          >
            <Icon name="lucide:arrow-up" class="w-3.5 h-3.5" />
          </button>

          <button
            class="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Expand menu"
            aria-label="Expand menu"
            @click="isHovered = true"
          >
            <Icon name="lucide:chevron-up" class="w-3.5 h-3.5" />
          </button>
        </div>

        <div v-else key="full" class="flex items-center gap-2 md:gap-4">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
            </span>
            <span class="font-medium tracking-tight">JT</span>
          </NuxtLink>

          <div class="h-4 w-px bg-white/10 hidden sm:block" />

          <nav class="flex items-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="relative px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              active-class="text-accent-blue! bg-white/10 border border-accent-blue/30 shadow-sm shadow-accent-blue/20"
            >
              <div class="flex items-center gap-1.5">
                <Icon :name="link.icon" class="w-3.5 h-3.5 opacity-80" />
                <span>{{ link.label }}</span>
              </div>
            </NuxtLink>
          </nav>

          <div class="h-4 w-px bg-white/10" />

          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-xs font-medium text-accent hover:bg-accent/30 hover:scale-105 active:scale-95 transition-all duration-200"
            @click="copyEmail"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:mail'" class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">{{ copied ? 'Copied!' : 'Contact' }}</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const isCompact = ref(false)
const isHovered = ref(false)
const scrollPercent = ref(0)
const copied = ref(false)
let lastScrollY = 0

const navLinks = [
  { label: 'Home', to: '/', icon: 'lucide:home' },
  { label: 'Projects', to: '/projects', icon: 'lucide:folder-git-2' },
  { label: 'About', to: '/about', icon: 'lucide:user' },
]

const currentRouteName = computed(() => {
  if (route.path === '/') return 'Home'
  if (route.path.startsWith('/projects')) return 'Projects'
  if (route.path.startsWith('/about')) return 'About'
  return 'Portfolio'
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  scrollPercent.value = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0

  if (scrollY > 120 && scrollY > lastScrollY) {
    isCompact.value = true
  } else if (scrollY < lastScrollY - 15 || scrollY <= 80) {
    isCompact.value = false
  }

  lastScrollY = scrollY
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('hello@joshuatengker.com')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy email', e)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.96);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}
</style>
