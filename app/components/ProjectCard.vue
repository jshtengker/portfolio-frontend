<template>
  <div
    class="group block border border-border rounded-lg p-6 bg-surface transition-all duration-300 hover:border-accent-dim/60 hover:shadow-[0_0_20px_rgba(200,134,74,0.15)] hover:-translate-y-1 cursor-pointer"
    @click="onClick"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="font-semibold group-hover:text-accent transition-colors font-sans">
        {{ project.title }}
      </h3>
      <div class="flex items-center gap-2.5 shrink-0 ml-4">
        <a
          v-if="project.githubUrl !== undefined"
          :href="project.githubUrl || '#'"
          :target="project.githubUrl ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-accent transition-colors p-0.5 rounded"
          :title="project.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'"
          @click.stop
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <span class="text-xs font-mono text-zinc-600">
          {{ project.year }}
        </span>
      </div>
    </div>
    <p class="text-sm text-zinc-400 leading-relaxed mb-4">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-1.5">
      <span
v-for="tag in project.tags" :key="tag"
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
