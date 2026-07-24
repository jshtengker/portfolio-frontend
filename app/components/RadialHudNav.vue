<template>
  <div class="fixed bottom-6 right-6 z-50 pointer-events-auto select-none">
    <div class="relative flex items-center justify-center">

      <!-- Laser Connecting Arc SVG -->
      <svg
        class="absolute -inset-23.75 w-61.5 h-61.5 pointer-events-none transition-all duration-700 ease-out"
        :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
        viewBox="-110 -110 220 220"
      >
        <path
          d="M 0,-95 A 95 95 0 0 0 -95,0"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="text-accent-blue/35 transition-colors duration-300"
        />
      </svg>

      <!-- HUD Nodes -->
      <div
        v-for="(node, index) in hudNodes"
        :key="node.id"
        class="absolute transition-all duration-500"
        :style="getNodeStyle(index)"
      >
        <NuxtLink
          v-if="node.to"
          :to="node.to"
          class="group relative flex items-center justify-center w-11 h-11 rounded-full bg-surface/95 border border-border text-zinc-300 backdrop-blur-xl shadow-xl shadow-black/80 hover:scale-115 hover:border-accent-blue hover:text-accent-blue transition-all duration-300"
          :class="[
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none',
            isNodeActive(node.to) ? 'border-accent! text-accent! bg-accent/15 shadow-[0_0_15px_rgba(200,134,74,0.3)]' : ''
          ]"
          :title="node.label"
          @click="isOpen = false"
        >
          <Icon :name="node.icon" class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

          <!-- Label Tooltip -->
          <div
            class="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-surface-alt/95 border border-border text-xs font-mono font-medium text-zinc-200 backdrop-blur-md shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            {{ node.label }}
          </div>
        </NuxtLink>

        <button
          v-else
          type="button"
          class="group relative flex items-center justify-center w-11 h-11 rounded-full bg-surface/95 border border-border text-zinc-300 backdrop-blur-xl shadow-xl shadow-black/80 hover:scale-115 hover:border-accent-blue hover:text-accent-blue transition-all duration-300"
          :class="[
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none',
            node.id === 'contact' && copied ? 'border-accent! text-accent! bg-accent/20 shadow-[0_0_15px_rgba(200,134,74,0.3)]' : ''
          ]"
          :title="node.label"
          @click="handleActionClick(node)"
        >
          <Icon :name="node.icon" class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

          <!-- Label Tooltip -->
          <div
            class="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-surface-alt/95 border text-xs font-mono font-medium backdrop-blur-md shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1.5"
            :class="node.id === 'contact' && copied ? 'border-accent/50 text-accent' : 'border-border text-zinc-200'"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="node.id === 'contact' && copied ? 'bg-accent' : 'bg-accent-blue'" />
            {{ node.label }}
          </div>
        </button>
      </div>



      <!-- Glowing Pulse Background -->
      <div
        class="absolute -inset-2 rounded-full bg-linear-to-tr from-accent/30 via-accent-blue/40 to-accent-blue/10 blur-xl transition-opacity duration-500 pointer-events-none"
        :class="isOpen ? 'opacity-100 scale-110' : 'opacity-30 scale-100'"
      />

      <!-- Main Reticle Trigger Button -->
      <button
        type="button"
        class="relative flex items-center justify-center w-14 h-14 rounded-full bg-surface/95 border border-border text-zinc-200 backdrop-blur-2xl shadow-2xl shadow-black/90 hover:scale-105 active:scale-95 transition-all duration-300 group"
        :class="isOpen ? 'border-accent text-accent bg-surface-alt shadow-[0_0_20px_rgba(200,134,74,0.4)]' : 'hover:border-accent-blue/80'"
        aria-label="Toggle Corner Radial HUD"
        @click="isOpen = !isOpen"
      >
        <Icon
          :name="isOpen ? 'lucide:x' : 'lucide:compass'"
          class="w-6 h-6 transition-transform duration-500"
          :class="isOpen ? 'rotate-90 text-accent' : 'group-hover:rotate-90 text-accent-blue'"
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
const appConfig = useAppConfig()

const isOpen = ref(false)
const copied = ref(false)

interface HudNode {
  id: string
  label: string
  to?: string
  icon: string
  action?: () => void
}

const hudNodes = computed<HudNode[]>(() => [
  { id: 'home', label: 'Home', to: '/', icon: 'lucide:home' },
  { id: 'projects', label: 'Projects', to: '/projects', icon: 'lucide:folder-git-2' },
  { id: 'about', label: 'About', to: '/about', icon: 'lucide:user' },
  { id: 'contact', label: copied.value ? 'Copied!' : 'Copy Email', icon: copied.value ? 'lucide:check' : 'lucide:mail', action: () => copyEmail() },
])

const getNodeStyle = (index: number) => {
  const total = hudNodes.value.length
  const startAngle = 180
  const endAngle = 270
  const step = (endAngle - startAngle) / (total - 1)
  const angleDeg = startAngle + index * step
  const angleRad = (angleDeg * Math.PI) / 180

  const radius = isOpen.value ? 95 : 0

  const x = Math.cos(angleRad) * radius
  const y = Math.sin(angleRad) * radius

  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: `transform ${isOpen.value ? '0.5s' : '0.35s'} cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${isOpen.value ? '0.35s' : '0.2s'} ease`,
    transitionDelay: `${isOpen.value ? index * 45 : 0}ms`,
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
  if (node.id === 'contact') {
    setTimeout(() => {
      isOpen.value = false
    }, 1200)
  } else {
    isOpen.value = false
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
    console.error('Failed to copy email', e)
  }
}
</script>
