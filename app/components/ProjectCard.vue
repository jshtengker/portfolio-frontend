<template>
  <div
    class="group relative py-6 px-4 sm:px-6 border-b border-border/40 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer rounded-lg border-l-2 border-l-transparent hover:border-l-accent hover:translate-x-1"
    @click="onClick"
  >
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <!-- Left Column: Title & Status -->
      <div class="md:w-1/3 space-y-1.5">
        <div class="flex items-center gap-2.5">
          <span
            v-if="project.liveUrl || project.status === 'live'"
            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            Live
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-zinc-800 bg-zinc-900/60 text-zinc-400"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            {{ project.status === 'in-dev' ? 'In Dev' : 'Coming Soon' }}
          </span>
          <span class="text-xs font-mono text-zinc-600">
            {{ project.year }}
          </span>
        </div>
        <h3 class="font-semibold text-lg font-sans text-zinc-100 group-hover:text-accent transition-colors flex items-center gap-2">
          <span>{{ project.title }}</span>
          <span class="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm font-mono">&rarr;</span>
        </h3>
      </div>

      <!-- Middle Column: Description & Tags -->
      <div class="md:w-1/2 space-y-2">
        <p class="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-x-3 gap-y-1 items-center">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors"
          >
            <span class="text-accent/60 mr-0.5">#</span>{{ tag }}
          </span>
        </div>
      </div>

      <!-- Right Column: Quick Action Links -->
      <div class="md:w-1/6 flex items-center justify-end gap-3 shrink-0" @click.stop>
        <a
          v-if="project.githubUrl !== undefined"
          :href="project.githubUrl || '#'"
          :target="project.githubUrl ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-accent transition-all p-1.5 rounded hover:bg-zinc-800/50"
          :title="project.githubUrl ? 'View GitHub repository' : 'GitHub repo link coming soon'"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-accent transition-all p-1.5 rounded hover:bg-zinc-800/50"
          title="View live demo"
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </a>
        <span
          v-else
          class="text-zinc-600/40 p-1.5 rounded cursor-not-allowed"
          title="Live demo coming soon"
        >
          <Icon name="lucide:external-link" class="w-4 h-4 opacity-40" />
        </span>
      </div>
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
