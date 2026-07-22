<template>
  <div>
    <button
      type="button"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface/95 border border-border text-zinc-200 backdrop-blur-xl shadow-2xl shadow-black/80 hover:border-accent-blue hover:text-accent-blue transition-all duration-300 group pointer-events-auto select-none"
      aria-label="Open Architectural Index"
      @click="isOpen = true"
    >
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
      </span>

      <span class="font-mono text-xs tracking-widest uppercase font-semibold text-zinc-400 group-hover:text-accent-blue transition-colors">
        INDEX <span class="text-zinc-600">//</span> <span class="text-accent-blue font-mono">{{ activeIndexNumber }}</span>
      </span>

      <div class="h-3 w-px bg-white/15" />

      <Icon name="lucide:layout-grid" class="w-4 h-4 text-zinc-400 group-hover:rotate-90 group-hover:text-accent-blue transition-all duration-300" />
    </button>

    <Transition name="overlay-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 backdrop-blur-3xl p-6 md:p-12 overflow-y-auto select-none"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none"
        />

        <div class="absolute top-6 left-8 right-8 flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-white/10 pb-4">
          <div class="flex items-center gap-2">
            <span class="text-accent-blue font-semibold">PORTFOLIO DIRECTORY</span>
            <span class="text-zinc-600">/</span>
            <span>EDITION 2026</span>
          </div>

          <button
            type="button"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-accent-blue hover:text-accent-blue transition-all duration-200"
            @click="isOpen = false"
          >
            <span>CLOSE</span>
            <span class="text-[10px] text-zinc-500 font-mono">[ESC]</span>
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          <div class="lg:col-span-7 space-y-4">
            <div
              v-for="(item, idx) in indexItems"
              :key="item.id"
              class="group relative py-3 border-b border-white/10 cursor-pointer transition-all duration-300"
              @mouseenter="hoveredIndex = idx"
              @click="handleNavigate(item)"
            >
              <div class="flex items-baseline justify-between">
                <div class="flex items-baseline gap-4 md:gap-6">
                  <span class="font-mono text-sm md:text-base font-semibold text-accent-blue/80 group-hover:text-accent-blue transition-colors">
                    {{ item.number }}
                  </span>

                  <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    {{ item.title }}
                  </h2>
                </div>

                <Icon
                  name="lucide:arrow-up-right"
                  class="w-6 h-6 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-accent-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </div>

              <p class="font-mono text-xs text-zinc-500 pl-10 md:pl-14 mt-1 group-hover:text-zinc-400 transition-colors">
                {{ item.subtitle }}
              </p>
            </div>
          </div>

          <div v-if="activePreviewItem" class="lg:col-span-5 hidden lg:block">
            <div class="relative w-full aspect-4/3 rounded-2xl bg-surface-alt/90 border border-border p-6 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between group/card">
              <div
                class="absolute -inset-1 rounded-2xl opacity-30 blur-xl transition-all duration-500 pointer-events-none"
                :class="activePreviewItem.glowClass"
              />

              <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-zinc-400">
                <span class="text-accent-blue uppercase tracking-wider font-semibold">PREVIEW // {{ activePreviewItem.number }}</span>
                <span>SYS_READY</span>
              </div>

              <div class="relative z-10 my-4 space-y-3">
                <div class="text-3xl font-bold text-zinc-100 tracking-tight">
                  {{ activePreviewItem.title }}
                </div>
                <p class="text-sm text-zinc-400 leading-relaxed">
                  {{ activePreviewItem.description }}
                </p>

                <div class="flex flex-wrap gap-2 pt-2">
                  <span
                    v-for="tag in activePreviewItem.tags"
                    :key="tag"
                    class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-300"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <div class="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span class="text-zinc-500">CLICK TO JUMP</span>
                <span class="text-accent-blue flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                  EXPLORE →
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-6 left-8 right-8 hidden md:flex items-center justify-between font-mono text-xs text-zinc-500 border-t border-white/10 pt-3">
          <span>JOSHUA TENGKER PORTFOLIO</span>
          <span>PRESS [ESC] OR CLICK ANYWHERE TO CLOSE</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const hoveredIndex = ref(0)

interface IndexItem {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  to?: string
  action?: () => void
  tags: string[]
  glowClass: string
}

const indexItems: IndexItem[] = [
  {
    id: 'home',
    number: '01',
    title: 'HOME & OVERVIEW',
    subtitle: 'Fullstack Developer & Systems Architect',
    description: 'Main landing page featuring background summary, featured skills, interactive terminal shell widget, and quick project highlights.',
    to: '/',
    tags: ['Overview', 'Vue3', 'Nuxt4', 'Tailwind'],
    glowClass: 'bg-linear-to-r from-accent to-accent-blue',
  },
  {
    id: 'projects',
    number: '02',
    title: 'SELECTED WORKS',
    subtitle: 'Case Studies, Web Apps & Open Source',
    description: 'Curated gallery of technical projects, web platforms, and engineering experiments with architecture breakdowns.',
    to: '/projects',
    tags: ['Projects', 'TypeScript', 'API', 'UI/UX'],
    glowClass: 'bg-linear-to-r from-accent-blue to-indigo-500',
  },
  {
    id: 'about',
    number: '03',
    title: 'ABOUT & SKILLS',
    subtitle: 'Experience, Tech Stack & Bio',
    description: 'Detailed breakdown of engineering experience, system architecture capabilities, bio card, and tech grid stack.',
    to: '/about',
    tags: ['Bio', 'Experience', 'Tech Grid'],
    glowClass: 'bg-linear-to-r from-cyan-500 to-accent-blue',
  },
  {
    id: 'contact',
    number: '04',
    title: 'GET IN TOUCH',
    subtitle: 'Email, GitHub & Social Links',
    description: 'Direct communication channels, email copy trigger, and social profile links for collaboration.',
    action: () => copyEmail(),
    tags: ['Email', 'GitHub', 'LinkedIn'],
    glowClass: 'bg-linear-to-r from-accent-blue to-cyan-400',
  },
]

const activeIndexNumber = computed(() => {
  if (route.path === '/') return '01'
  if (route.path.startsWith('/projects')) return '02'
  if (route.path.startsWith('/about')) return '03'
  return '01'
})

const activePreviewItem = computed<IndexItem>(() => {
  return indexItems[hoveredIndex.value] ?? indexItems[0]!
})

const handleNavigate = (item: IndexItem) => {
  if (item.to) {
    router.push(item.to)
  } else if (item.action) {
    item.action()
  }
  isOpen.value = false
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('hello@joshuatengker.com')
    alert('Email copied to clipboard!')
  } catch (e) {
    console.error(e)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
