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
            {{ project.title }}
          </h2>
          <button @click="onClose"
            class="text-zinc-600 hover:text-accent transition-colors text-lg leading-none ml-4">
            &times;
          </button>
        </div>

        <p class="text-zinc-400 leading-relaxed mb-2">
          {{ project.fullDescription || project.description }}
        </p>

        <p class="text-sm text-zinc-500 leading-relaxed mt-3">
          {{ project.details }}
        </p>

        <div class="flex flex-wrap gap-1.5 mt-6 mb-8">
          <span v-for="tag in project.tags" :key="tag"
            class="px-2 py-0.5 text-xs rounded bg-surface-alt text-zinc-500 font-mono">
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-border">
          <span class="text-xs font-mono text-zinc-600">{{ project.year }}</span>
          <NuxtLink :to="project.to"
            class="px-5 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm">
            View project &rarr;
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

watch(() => props.project, async (p) => {
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
