<template>
  <div>
    <section class="min-h-[calc(100vh-4rem)] flex items-center px-6">
      <div class="max-w-7xl mx-auto w-full">
        <p class="font-mono text-sm text-accent mb-4">
          &gt; Hello, I'm
        </p>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-sans">
          Joshua
        </h1>
        <div class="h-12 sm:h-14 mt-3 flex items-center gap-2">
          <span class="text-xl sm:text-2xl text-zinc-500 font-mono">
            {{ display }}
          </span>
          <span v-if="cursor"
            class="inline-block w-[2px] h-6 sm:h-7 bg-accent animate-pulse" />
        </div>
        <p class="mt-8 max-w-lg text-zinc-400 leading-relaxed">
          Backend-focused software engineer. I build APIs, services, and systems
          that are reliable, observable, and actually ship.
        </p>

        <div class="mt-8">
          <ShellWidget />
        </div>

        <div class="mt-10 flex gap-4">
          <NuxtLink to="/projects"
            class="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm">
            See my work
          </NuxtLink>
          <NuxtLink to="/about"
            class="px-6 py-3 border border-border text-zinc-400 rounded-lg hover:bg-surface transition-colors text-sm">
            About me
          </NuxtLink>
        </div>
      </div>
    </section>

    <BioCard />

    <TechGrid />

    <SectionReveal>
      <section class="py-24 px-6 border-t border-border">
        <div class="max-w-7xl mx-auto">
          <p class="font-mono text-sm text-accent mb-2">&gt; featured work</p>
          <h2 class="text-2xl font-bold tracking-tight mt-6 font-sans">
            Recent projects
          </h2>
          <div class="mt-8 grid md:grid-cols-2 gap-4">
            <ProjectCard v-for="p in featured" :key="p.title" :project="p" @select="onSelect" />
          </div>
          <NuxtLink to="/projects"
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

const { display, cursor } = useTypeWriter([
  'Software Engineer',
  'Go & TypeScript',
  'Backend-focused',
  'API designer',
  'open source contributor',
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

useHead({
  title: 'Joshua — Software Engineer',
})
</script>
