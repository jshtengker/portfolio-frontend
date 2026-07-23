<template>
  <div class="fixed top-6 right-6 z-50 pointer-events-auto select-none">
    <div
      class="relative bg-surface/95 border border-border rounded-xl p-3 backdrop-blur-xl shadow-2xl shadow-black/90 transition-all duration-500 ease-out group"
      :class="isExpanded ? 'w-64 h-64' : 'w-44 h-24'"
    >
      <div class="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-[10px] font-mono text-zinc-400">
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
          </span>
          <span class="tracking-widest uppercase text-accent-blue font-semibold">GRID COMPASS</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-zinc-500">Y:{{ Math.round(scrollPercent) }}%</span>
          <button
            type="button"
            class="p-0.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            :title="isExpanded ? 'Minimize map' : 'Expand map'"
            @click="isExpanded = !isExpanded"
          >
            <Icon :name="isExpanded ? 'lucide:minimize-2' : 'lucide:maximize-2'" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div class="relative w-full h-[calc(100%-28px)] rounded-lg bg-surface-alt border border-border overflow-hidden p-1.5">
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[16px_16px]"
        />

        <div class="absolute inset-0 bg-linear-to-tr from-accent-blue/10 via-transparent to-transparent pointer-events-none animate-pulse" />

        <div class="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-1.5 z-10">
          <component
            :is="node.to ? 'NuxtLink' : 'button'"
            v-for="node in spatialNodes"
            :key="node.id"
            :to="node.to"
            class="group/node relative flex flex-col justify-between p-2 rounded-md border transition-all duration-300 text-left"
            :class="[
              copied && node.id === 'contact'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
                : activeNodeId === node.id
                  ? 'bg-accent-blue/20 border-accent-blue text-accent-blue shadow-md shadow-accent-blue/20'
                  : 'bg-surface/80 border-border text-zinc-400 hover:border-accent-blue/50 hover:text-zinc-200'
            ]"
            @click="handleNodeClick(node)"
          >
            <div class="flex items-center justify-between text-[10px] font-mono leading-none">
              <span class="text-zinc-500 font-semibold group-hover/node:text-accent-blue transition-colors" :class="{ 'text-emerald-400!': copied && node.id === 'contact' }">{{ node.coord }}</span>
              <Icon :name="node.icon" class="w-3 h-3 opacity-70 group-hover/node:opacity-100" />
            </div>

            <div class="text-[11px] font-medium tracking-tight truncate mt-1">
              {{ node.label }}
            </div>

            <div
              v-if="activeNodeId === node.id || (copied && node.id === 'contact')"
              class="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full shadow-sm"
              :class="copied && node.id === 'contact' ? 'bg-emerald-400 shadow-emerald-400' : 'bg-accent-blue shadow-accent-blue'"
            />
          </component>
        </div>

        <div
          class="absolute left-1.5 right-1.5 h-7 rounded border border-accent-blue/70 bg-accent-blue/10 pointer-events-none transition-all duration-200 ease-out flex items-center justify-between px-1"
          :style="viewportBoxStyle"
        >
          <span class="w-1 h-1 rounded-full bg-accent-blue" />
          <span class="text-[8px] font-mono text-accent-blue font-bold uppercase tracking-wider">CAM</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const isExpanded = ref(false)
const scrollPercent = ref(0)
const copied = ref(false)

interface SpatialNode {
  id: string
  label: string
  coord: string
  to?: string
  icon: string
  action?: () => void
}

const spatialNodes = computed<SpatialNode[]>(() => [
  { id: 'home', label: 'Home', coord: 'N-01', to: '/', icon: 'lucide:home' },
  { id: 'projects', label: 'Projects', coord: 'E-02', to: '/projects', icon: 'lucide:folder-git-2' },
  { id: 'about', label: 'About', coord: 'W-03', to: '/about', icon: 'lucide:user' },
  { id: 'contact', label: copied.value ? 'Copied!' : 'Contact', coord: 'S-04', icon: copied.value ? 'lucide:check' : 'lucide:mail', action: () => copyEmail() },
])

const activeNodeId = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/projects')) return 'projects'
  if (route.path.startsWith('/about')) return 'about'
  return 'home'
})

const viewportBoxStyle = computed(() => {
  const percent = scrollPercent.value
  const topPx = (percent / 100) * (isExpanded.value ? 170 : 42) + 6

  return {
    transform: `translateY(${topPx}px)`,
  }
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0
}

const handleNodeClick = (node: SpatialNode) => {
  if (node.action) {
    node.action()
  }
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(appConfig.portfolio.social.email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    console.error(e)
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
