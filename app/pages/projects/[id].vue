<template>
  <section class="py-20 px-6 sm:px-8 lg:px-12 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-sm text-zinc-500 font-mono hover:text-accent transition-colors group"
        >
          <span class="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>Back to projects</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <span
            v-if="project?.liveUrl || project?.status === 'live'"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            Live System
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-zinc-800 bg-zinc-900/60 text-zinc-400"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            In Development
          </span>
          <span class="text-xs font-mono text-zinc-600 ml-2">{{ project?.year }}</span>
        </div>
      </div>

      <div class="mb-12 border-b border-border pb-10">
        <div v-if="project?.role" class="inline-block px-2.5 py-0.5 rounded bg-surface-alt border border-border text-xs font-mono text-zinc-400 mb-3">
          {{ project.role }}
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans text-zinc-100 mb-4 leading-tight">
          {{ project?.title || id }}
        </h1>
        <p class="text-lg text-zinc-400 leading-relaxed max-w-3xl">
          {{ project?.fullDescription || project?.description }}
        </p>

        <div class="flex flex-wrap items-center gap-3 mt-6">
          <a
            v-if="project?.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-all text-sm shadow-[0_0_20px_rgba(200,134,74,0.25)]"
          >
            <Icon name="lucide:external-link" class="w-4 h-4" />
            <span>Launch Live Demo</span>
          </a>
          <a
            v-if="project?.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-zinc-300 rounded-lg hover:bg-surface-alt hover:text-accent transition-colors text-sm font-medium"
          >
            <Icon name="simple-icons:github" class="w-4 h-4" />
            <span>View Source Code</span>
          </a>
        </div>
      </div>

      <div v-if="project?.problemStatement" class="mb-14 relative pl-6 sm:pl-8 py-4 border-l-2 border-accent/60 group">
        <div class="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-amber-400 to-transparent group-hover:shadow-[0_0_12px_rgba(200,134,74,0.8)] transition-all duration-500" />
        <h2 class="text-xs font-mono text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>&gt; 01. Context & Objectives</span>
        </h2>
        <h3 class="text-xl font-bold font-sans text-zinc-100 mb-3">Problem Statement</h3>
        <p class="text-zinc-300 leading-relaxed text-base sm:text-lg font-sans">
          {{ project.problemStatement }}
        </p>
      </div>

      <div class="mb-14">
        <h2 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">&gt; 02. Interactive Workflow Preview</h2>
        <h3 class="text-2xl font-bold font-sans text-zinc-100 mb-4">Application Lifecycle Simulation</h3>
        <AppWorkflowSimulator :project-id="project?.id" />
      </div>

      <div v-if="project?.architecture" class="mb-14">
        <h2 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">&gt; 03. System Architecture</h2>
        <h3 class="text-2xl font-bold font-sans text-zinc-100 mb-4">Engineering Blueprint</h3>
        <p class="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
          {{ project.architecture.overview }}
        </p>

        <ProjectArchitectureDiagram :project-id="project?.id" class="mb-8" />

        <div v-if="project.architecture.components?.length" class="space-y-3 mt-6">
          <div
            v-for="(c, idx) in project.architecture.components"
            :key="c.name"
            class="group relative pl-6 py-3 border-l border-zinc-800 hover:border-accent hover:bg-zinc-900/30 transition-all duration-300 rounded-r-lg"
          >
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <h4 class="font-semibold font-mono text-sm text-zinc-200 group-hover:text-accent transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                <span class="text-xs text-zinc-500 font-mono">0{{ idx + 1 }}.</span>
                <span>{{ c.name }}</span>
              </h4>
              <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed sm:max-w-md pl-3.5 sm:pl-0 font-sans">
                {{ c.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-14">
        <h2 class="text-xs font-mono text-accent uppercase tracking-wider mb-3">&gt; 04. Technology Stack</h2>
        <div class="flex flex-wrap gap-2.5">
          <span
            v-for="tag in project?.tags"
            :key="tag"
            class="py-1 px-2.5 text-xs font-mono text-zinc-400 hover:text-accent border-b border-zinc-800 hover:border-accent transition-all duration-300 cursor-default select-none flex items-center gap-1 group"
          >
            <span class="text-accent/60 group-hover:text-accent transition-colors">#</span>
            <span>{{ tag }}</span>
          </span>
        </div>
      </div>

      <div v-if="project?.features?.length" class="mb-14">
        <h2 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">&gt; 05. Key Highlights</h2>
        <h3 class="text-2xl font-bold font-sans text-zinc-100 mb-6">Engineering Specifications</h3>
        <div class="divide-y divide-border/40 border-t border-b border-border/40">
          <div
            v-for="(f, idx) in project.features"
            :key="f.title"
            class="group py-5 px-3 hover:bg-zinc-900/40 transition-all duration-300 rounded-lg"
          >
            <div class="flex items-start gap-4">
              <span class="text-xs font-mono text-accent shrink-0 pt-1 group-hover:translate-x-1 transition-transform">
                // 0{{ idx + 1 }}
              </span>
              <div class="space-y-1">
                <h4 class="font-bold font-sans text-zinc-100 text-base group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                  <span>{{ f.title }}</span>
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h4>
                <p class="text-sm text-zinc-400 leading-relaxed font-sans">
                  {{ f.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Switcher Footer -->
      <div class="pt-8 border-t border-border flex items-center justify-between text-sm font-mono">
        <NuxtLink
          v-if="prevProject"
          :to="prevProject.to"
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors group"
        >
          <span class="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>{{ (prevProject.title ?? '').split('—')[0]?.trim() || prevProject.title }}</span>
        </NuxtLink>
        <div v-else />

        <NuxtLink
          v-if="nextProject"
          :to="nextProject.to"
          class="inline-flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors group"
        >
          <span>{{ (nextProject.title ?? '').split('—')[0]?.trim() || nextProject.title }}</span>
          <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '#shared/data/projects'

const route = useRoute()
const id = route.params.id as string

const projectIndex = computed(() => projects.findIndex(p => p.id === id))
const project = computed(() => projects[projectIndex.value] || projects.find(p => p.id === id))

const prevProject = computed(() => {
  if (projectIndex.value > 0) return projects[projectIndex.value - 1]
  return null
})

const nextProject = computed(() => {
  if (projectIndex.value >= 0 && projectIndex.value < projects.length - 1) {
    return projects[projectIndex.value + 1]
  }
  return null
})

useSeoMeta({
  title: computed(() => project.value?.title || 'Project Details'),
  description: computed(() => project.value?.description || 'Software project details by Joshua Tengker.'),
  ogTitle: computed(() => `${project.value?.title || 'Project'} | Joshua Tengker`),
  ogDescription: computed(() => project.value?.description || 'Software project details by Joshua Tengker.'),
  ogUrl: computed(() => `https://jshtngkr.pages.dev/projects/${id}`),
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: computed(() => `https://jshtngkr.pages.dev/projects/${id}`) },
  ],
})
</script>
