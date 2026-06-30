<template>
  <div
    @click="onClick"
    class="group block border border-border rounded-lg p-6 bg-surface hover:border-accent-dim cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="font-semibold group-hover:text-accent transition-colors font-sans">
        {{ project.title }}
      </h3>
      <span class="text-xs font-mono text-zinc-600 shrink-0 ml-4">
        {{ project.year }}
      </span>
    </div>
    <p class="text-sm text-zinc-400 leading-relaxed mb-4">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-1.5">
      <span v-for="tag in project.tags" :key="tag"
        class="px-2 py-0.5 text-xs rounded bg-surface-alt text-zinc-500 font-mono">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  select: [project: Project, rect: DOMRect]
}>()

function onClick(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  emit('select', props.project, el.getBoundingClientRect())
}
</script>
