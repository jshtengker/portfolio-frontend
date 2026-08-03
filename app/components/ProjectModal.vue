<template>
  <Teleport to="body">
    <div
      v-if="project || closing"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      :style="{ background: overlayBg, backdropFilter: 'blur(8px)', transition: 'background 0.2s ease' }"
      @click.self="onClose">
      <div
        ref="cardEl"
        class="w-full max-w-xl border-l-2 border-accent bg-zinc-950/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
        :style="{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
          transformOrigin: originCenter,
        }">
        <div class="flex items-center justify-between pb-3 border-b border-border/40 mb-5">
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span class="text-accent">&gt;</span>
            <span>project.quick_inspect("{{ project?.id }}")</span>
          </div>
          <button
            class="text-zinc-500 hover:text-accent transition-colors text-lg leading-none p-1"
            @click="onClose">
            &times;
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                v-if="project?.liveUrl || project?.status === 'live'"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                Live Demo Available
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border border-zinc-800 bg-zinc-900/60 text-zinc-400"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                {{ project?.status === 'in-dev' ? 'In Development' : 'Demo Coming Soon' }}
              </span>
            </div>
            <span class="text-xs font-mono text-zinc-600">{{ project?.year }}</span>
          </div>

          <h2 class="text-2xl font-bold tracking-tight font-sans text-zinc-100">
            {{ project?.title }}
          </h2>

          <p class="text-zinc-300 leading-relaxed text-sm">
            {{ project?.fullDescription || project?.description }}
          </p>

          <p v-if="project?.details" class="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-border/20">
            {{ project?.details }}
          </p>

          <div class="flex flex-wrap gap-2 pt-2">
            <span
              v-for="tag in project?.tags"
              :key="tag"
              class="py-0.5 px-2 text-xs font-mono text-zinc-400 border-b border-zinc-800 hover:text-accent transition-colors"
            >
              # {{ tag }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-6 mt-6 border-t border-border/40">
          <div class="flex items-center gap-3">
            <a
              v-if="project?.githubUrl !== undefined"
              :href="project?.githubUrl || '#'"
              :target="project?.githubUrl ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent transition-colors"
              :title="project?.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'">
              <Icon name="simple-icons:github" class="w-4 h-4" />
              <span>Source</span>
            </a>
            <a
              v-if="project?.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent transition-colors"
              title="View live demo">
              <Icon name="lucide:external-link" class="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          </div>

          <NuxtLink
            :to="project?.to || '#'"
            class="inline-flex items-center gap-2 px-4 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-all text-xs font-mono"
            @click="onClose">
            <span>Full Specs</span>
            <span>&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project'

const props = defineProps<{
  project: Project | null
  originRect: DOMRect | null
}>()

const emit = defineEmits<{
  close: []
}>()

const cardEl = ref<HTMLElement | null>(null)
const closing = ref(false)
const scale = ref(1)
const translateY = ref(0)
const opacity = ref(1)
const overlayBg = ref('rgba(13, 12, 10, 0.85)')
const originCenter = ref('center')

function onClose() {
  closing.value = true

  scale.value = 0.6
  translateY.value = 20
  opacity.value = 0
  overlayBg.value = 'rgba(13, 12, 10, 0)'

  setTimeout(() => {
    closing.value = false
    emit('close')
  }, 150)
}

watch(() => props.project, async (p: Project | null) => {
  if (!p) {
    closing.value = false
    return
  }

  scale.value = 1
  translateY.value = 0
  opacity.value = 1
  overlayBg.value = 'rgba(13, 12, 10, 0.85)'
  originCenter.value = 'center'

  if (props.originRect) {
    const cx = props.originRect.left + props.originRect.width / 2
    const cy = props.originRect.top + props.originRect.height / 2
    originCenter.value = `${cx - window.innerWidth / 2}px ${cy - window.innerHeight / 2}px`

    await nextTick()

    scale.value = 0.6
    translateY.value = 20
    opacity.value = 0
    overlayBg.value = 'rgba(13, 12, 10, 0)'

    requestAnimationFrame(() => {
      scale.value = 1
      translateY.value = 0
      opacity.value = 1
      overlayBg.value = 'rgba(13, 12, 10, 0.85)'
    })
  }
})
</script>
