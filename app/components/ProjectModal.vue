<template>
  <Teleport to="body">
    <div
v-if="project || closing"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      :style="{ background: overlayBg, backdropFilter: 'blur(4px)', transition: 'background 0.15s ease' }"
      @click.self="onClose">
      <div
ref="cardEl"
        class="w-full max-w-lg border border-border rounded-xl p-8 bg-surface shadow-2xl"
        :style="{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.15s ease',
          transformOrigin: originCenter,
        }">
        <div class="flex items-start justify-between mb-4">
          <div class="space-y-1">
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
            <h2 class="text-xl font-bold tracking-tight font-sans">
              {{ project?.title }}
            </h2>
          </div>
          <button
class="text-zinc-600 hover:text-accent transition-colors text-lg leading-none ml-4"
            @click="onClose">
            &times;
          </button>
        </div>

        <p class="text-zinc-400 leading-relaxed mb-2">
          {{ project?.fullDescription || project?.description }}
        </p>

        <p class="text-sm text-zinc-500 leading-relaxed mt-3">
          {{ project?.details }}
        </p>

        <div class="flex flex-wrap gap-2 mt-6 mb-8">
          <span
            v-for="tag in project?.tags"
            :key="tag"
            class="px-2.5 py-1 text-xs rounded-md border border-border/60 text-zinc-400 bg-surface-alt/50 font-mono transition-all duration-300 ease-out hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-[0_4px_12px_rgba(200,134,74,0.2)] hover:-translate-y-0.5 hover:scale-105"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-border">
          <span class="text-xs font-mono text-zinc-600">{{ project?.year }}</span>
          <div class="flex items-center gap-3">
            <a
              v-if="project?.githubUrl !== undefined"
              :href="project?.githubUrl || '#'"
              :target="project?.githubUrl ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border text-zinc-300 rounded-lg hover:bg-surface-alt hover:text-accent transition-colors text-sm font-medium"
              :title="project?.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'">
              <Icon name="simple-icons:github" class="w-4 h-4" />
              GitHub
            </a>
            <a
              v-if="project?.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border text-zinc-300 rounded-lg hover:bg-surface-alt hover:text-accent transition-colors text-sm font-medium"
              title="View live demo">
              <Icon name="lucide:external-link" class="w-4 h-4" />
              Live Demo
            </a>
            <span
              v-else
              class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border/50 text-zinc-600 rounded-lg cursor-not-allowed text-sm font-medium opacity-60"
              title="Live demo coming soon">
              <Icon name="lucide:external-link" class="w-4 h-4 opacity-50" />
              Live Demo
            </span>
            <NuxtLink
              :to="project?.to || '#'"
              class="px-5 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm">
              View project &rarr;
            </NuxtLink>
          </div>
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
