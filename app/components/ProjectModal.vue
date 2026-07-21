<template>
  <Teleport to="body">
    <div v-if="project || closing"
      @click.self="onClose"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      :style="{ background: overlayBg, backdropFilter: 'blur(4px)', transition: 'background 0.15s ease' }">
      <div ref="cardEl"
        class="w-full max-w-lg border border-border rounded-xl p-8 bg-surface shadow-2xl"
        :style="{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.15s ease',
          transformOrigin: originCenter,
        }">
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-xl font-bold tracking-tight font-sans">
            {{ project?.title }}
          </h2>
          <button @click="onClose"
            class="text-zinc-600 hover:text-accent transition-colors text-lg leading-none ml-4">
            &times;
          </button>
        </div>

        <p class="text-zinc-400 leading-relaxed mb-2">
          {{ project?.fullDescription || project?.description }}
        </p>

        <p class="text-sm text-zinc-500 leading-relaxed mt-3">
          {{ project?.details }}
        </p>

        <div class="flex flex-wrap gap-1.5 mt-6 mb-8">
          <span v-for="tag in project?.tags" :key="tag"
            class="px-2 py-0.5 text-xs rounded bg-surface-alt text-zinc-500 font-mono">
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-border">
          <span class="text-xs font-mono text-zinc-600">{{ project?.year }}</span>
          <div class="flex items-center gap-3">
            <a v-if="project?.githubUrl !== undefined"
              :href="project?.githubUrl || '#'"
              :target="project?.githubUrl ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border text-zinc-300 rounded-lg hover:bg-surface-alt hover:text-accent transition-colors text-sm font-medium"
              :title="project?.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              GitHub
            </a>
            <NuxtLink :to="project?.to || '#'"
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
