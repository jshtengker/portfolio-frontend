<template>
  <div class="relative overflow-hidden bg-radial-glow">
    <div class="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

    <section class="px-6 py-12 lg:py-20 relative z-10">
      <div class="max-w-7xl mx-auto w-full lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-xs font-mono">
            <span class="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span>Available for new projects</span>
          </div>

          <div>
            <p class="font-mono text-sm text-accent mb-2">
              &gt; Hello, I'm
            </p>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-sans text-zinc-100">
              Joshua
            </h1>
            <div class="h-10 sm:h-12 mt-2 flex items-center gap-2">
              <span class="text-xl sm:text-2xl text-zinc-400 font-mono">
                {{ display }}
              </span>
              <span
v-if="cursor"
                class="inline-block w-0.5 h-6 sm:h-7 bg-accent animate-pulse" />
            </div>
          </div>

          <p class="max-w-lg text-zinc-400 leading-relaxed text-base sm:text-lg">
            Backend-focused software engineer. I build APIs, services, and systems
            that are reliable, observable, and actually ship.
          </p>

          <div class="pt-2 flex flex-wrap gap-4">
            <NuxtLink
to="/projects"
              class="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(200,134,74,0.3)] transition-all text-sm flex items-center gap-2">
              See my work &rarr;
            </NuxtLink>
            <NuxtLink
to="/about"
              class="px-6 py-3 border border-border text-zinc-300 rounded-lg hover:bg-surface hover:border-accent-dim transition-colors text-sm">
              About me
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-5 mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <ShellWidget />
        </div>
      </div>
    </section>

    <BioCard />

    <TechGrid />

    <SectionReveal>
      <section class="py-16 sm:py-24 px-6 border-t border-border">
        <div class="max-w-7xl mx-auto">
          <p class="font-mono text-sm text-accent mb-2">&gt; featured work</p>
          <h2 class="text-2xl font-bold tracking-tight mt-6 font-sans">
            Recent projects
          </h2>
          <div class="mt-8 grid md:grid-cols-2 gap-4">
            <ProjectCard v-for="p in featured" :key="p.title" :project="p" @select="onSelect" />
          </div>
          <NuxtLink
to="/projects"
            class="inline-block mt-8 text-sm text-zinc-500 font-mono hover:text-accent transition-colors">
            View all projects &rarr;
          </NuxtLink>
        </div>
      </section>
    </SectionReveal>

    <ProjectModal :project="selectedProject" :origin-rect="originRect" @close="onModalClose" />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project'
import { featuredProjects } from '#shared/data/projects'

const appConfig = useAppConfig()

const { display, cursor } = useTypeWriter([
  'Software Engineer',
  'Go & TypeScript',
  'Backend-focused',
  'API designer',
  'Open source contributor',
])

const selectedProject = ref<Project | null>(null)
const originRect = ref<DOMRect | null>(null)
const featured = featuredProjects

function onSelect(p: Project, rect: DOMRect) {
  originRect.value = rect
  selectedProject.value = p
}

function onModalClose() {
  selectedProject.value = null
  originRect.value = null
}

useSeoMeta({
  title: 'Joshua — Software Engineer',
  description: appConfig.portfolio?.tagline || 'Backend-focused software engineer building reliable APIs and distributed systems.',
  ogTitle: 'Joshua — Software Engineer Portfolio',
  ogDescription: appConfig.portfolio?.tagline || 'Backend-focused software engineer building reliable APIs and distributed systems.',
  twitterCard: 'summary_large_image',
})
</script>

