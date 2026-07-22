<template>
  <div class="fixed bottom-6 right-6 z-50 pointer-events-auto select-none">
    <div class="relative flex items-center justify-center">

      <div
        v-for="(node, index) in hudNodes"
        :key="node.id"
        class="absolute transition-all duration-500 ease-out-back"
        :style="getNodeStyle(index)"
      >
        <NuxtLink
          v-if="node.to"
          :to="node.to"
          class="group relative flex items-center justify-center w-11 h-11 rounded-full bg-surface/95 border border-border text-zinc-300 backdrop-blur-xl shadow-xl shadow-black/80 hover:scale-110 hover:border-accent-blue hover:text-accent-blue transition-all duration-300"
          :class="[
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none',
            isNodeActive(node.to) ? 'border-accent! text-accent! bg-accent/15 shadow-accent/20' : ''
          ]"
          :title="node.label"
          @click="isOpen = false"
        >
          <Icon :name="node.icon" class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

          <div
            class="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-surface-alt border border-border text-xs font-mono font-medium text-zinc-200 shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            {{ node.label }}
          </div>
        </NuxtLink>

        <button
          v-else
          type="button"
          class="group relative flex items-center justify-center w-11 h-11 rounded-full bg-surface/95 border border-border text-zinc-300 backdrop-blur-xl shadow-xl shadow-black/80 hover:scale-110 hover:border-accent-blue hover:text-accent-blue transition-all duration-300"
          :class="[
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none'
          ]"
          :title="node.label"
          @click="handleActionClick(node)"
        >
          <Icon :name="node.icon" class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

          <div
            class="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-surface-alt border border-border text-xs font-mono font-medium text-zinc-200 shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            {{ node.label }}
          </div>
        </button>
      </div>

      <div
        class="absolute -inset-3 rounded-full border border-dashed border-accent-blue/40 transition-all duration-700 pointer-events-none"
        :class="[
          isOpen ? 'rotate-90 scale-125 border-accent-blue/70' : 'rotate-0 scale-100 opacity-60'
        ]"
      />

      <div
        class="absolute -inset-2 rounded-full bg-linear-to-tr from-accent/30 via-accent-blue/30 to-accent-blue/10 blur-lg transition-opacity duration-500 pointer-events-none"
        :class="isOpen ? 'opacity-100' : 'opacity-30'"
      />

      <button
        type="button"
        class="relative flex items-center justify-center w-14 h-14 rounded-full bg-surface/95 border border-border text-zinc-200 backdrop-blur-2xl shadow-2xl shadow-black/90 hover:scale-105 active:scale-95 transition-all duration-300 group"
        :class="isOpen ? 'border-accent text-accent bg-surface-alt' : 'hover:border-accent-blue/80'"
        aria-label="Toggle Corner Radial HUD"
        @click="isOpen = !isOpen"
      >
        <Icon
          :name="isOpen ? 'lucide:x' : 'lucide:aperture'"
          class="w-6 h-6 transition-transform duration-500"
          :class="isOpen ? 'rotate-90 text-accent' : 'group-hover:rotate-45 text-accent-blue'"
        />

        <span class="absolute top-1 right-1 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
          <span class="relative inline-flex rounded-full h-3 w-3 bg-accent-blue" />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const isOpen = ref(false)
const copied = ref(false)

interface HudNode {
  id: string
  label: string
  to?: string
  icon: string
  action?: () => void
}

const hudNodes: HudNode[] = [
  { id: 'home', label: 'Home', to: '/', icon: 'lucide:home' },
  { id: 'projects', label: 'Projects', to: '/projects', icon: 'lucide:folder-git-2' },
  { id: 'about', label: 'About', to: '/about', icon: 'lucide:user' },
  { id: 'top', label: 'Scroll Top', icon: 'lucide:arrow-up', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { id: 'contact', label: 'Copy Email', icon: 'lucide:mail', action: () => copyEmail() },
]

const getNodeStyle = (index: number) => {
  const total = hudNodes.length
  const startAngle = 180
  const endAngle = 270
  const step = (endAngle - startAngle) / (total - 1)
  const angleDeg = startAngle + index * step
  const angleRad = (angleDeg * Math.PI) / 180

  const radius = isOpen.value ? 90 : 0

  const x = Math.cos(angleRad) * radius
  const y = Math.sin(angleRad) * radius

  return {
    transform: `translate(${x}px, ${y}px)`,
    transitionDelay: `${isOpen.value ? index * 40 : 0}ms`,
  }
}

const isNodeActive = (to?: string) => {
  if (!to) return false
  if (to === '/' && route.path === '/') return true
  if (to !== '/' && route.path.startsWith(to)) return true
  return false
}

const handleActionClick = (node: HudNode) => {
  if (node.action) {
    node.action()
  }
  isOpen.value = false
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('hello@joshuatengker.com')
    copied.value = true
    alert('Email copied to clipboard!')
  } catch (e) {
    console.error('Failed to copy email', e)
  }
}
</script>
