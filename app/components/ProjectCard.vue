<template>
  <div
    class="group block border border-border rounded-lg p-6 bg-surface transition-all duration-300 hover:border-accent-dim/60 hover:shadow-[0_0_20px_rgba(200,134,74,0.15)] hover:-translate-y-1 cursor-pointer"
    @click="onClick"
  >
    <!-- Card Header: Top Left Status Badge & Top Right Action Icons -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span
          v-if="project.liveUrl || project.status === 'live'"
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          Live
        </span>
        <span
          v-else
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-zinc-800 bg-zinc-900/60 text-zinc-400"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
          {{ project.status === 'in-dev' ? 'In Dev' : 'Coming Soon' }}
        </span>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <a
          v-if="project.githubUrl !== undefined"
          :href="project.githubUrl || '#'"
          :target="project.githubUrl ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-accent transition-all p-0.5 rounded hover:scale-115"
          :title="project.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'"
          @click.stop
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-accent transition-all p-0.5 rounded hover:scale-115 hover:-translate-y-0.5"
          title="View live demo"
          @click.stop
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </a>
        <span
          v-else
          class="text-zinc-600/40 p-0.5 rounded cursor-not-allowed"
          title="Live demo coming soon"
          @click.stop
        >
          <Icon name="lucide:external-link" class="w-4 h-4 opacity-40" />
        </span>
        <span class="text-xs font-mono text-zinc-600">
          {{ project.year }}
        </span>
      </div>
    </div>

    <!-- Project Title -->
    <h3 class="font-semibold group-hover:text-accent transition-colors font-sans text-base mb-2">
      {{ project.title }}
    </h3>
    <p class="text-sm text-zinc-400 leading-relaxed mb-4">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="px-2.5 py-1 text-xs rounded-md border border-border/60 text-zinc-400 bg-surface-alt/50 font-mono transition-all duration-300 ease-out hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-[0_4px_12px_rgba(200,134,74,0.2)] hover:-translate-y-0.5 hover:scale-105"
      >
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
