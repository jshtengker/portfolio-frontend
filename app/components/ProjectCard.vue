<template>
  <div
    @click="onClick"
    class="group block border border-border rounded-lg p-6 bg-surface hover:border-accent-dim cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
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
          @click.stop
          class="text-zinc-500 hover:text-accent transition-colors p-0.5 rounded"
          :title="project.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
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
