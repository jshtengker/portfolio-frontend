<template>
  <section class="py-24 px-6 sm:px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <p class="font-mono text-sm text-accent mb-2">&gt; projects</p>
      <h1 class="text-3xl font-bold tracking-tight mt-6 font-sans">
        Things I've built
      </h1>
      <SectionReveal>
        <div class="mt-10 grid md:grid-cols-2 gap-4">
          <ProjectCard v-for="p in projects" :key="p.title" :project="p" @select="onSelect" />
        </div>
        <ProjectsUpcomingBanner />
      </SectionReveal>
    </div>

    <ProjectModal :project="selectedProject" :origin-rect="originRect" @close="onModalClose" />
  </section>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project'
import { projects as allProjects } from '#shared/data/projects'

const selectedProject = ref<Project | null>(null)
const originRect = ref<DOMRect | null>(null)
const projects = allProjects

function onSelect(p: Project, rect: DOMRect) {
  originRect.value = rect
  selectedProject.value = p
}

function onModalClose() {
  selectedProject.value = null
  originRect.value = null
}

useSeoMeta({
  title: 'Projects',
  description: 'Featured software engineering projects, open-source work, and backend system designs by Joshua Tengker.',
  ogTitle: 'Projects | Joshua Tengker',
  ogDescription: 'Featured software engineering projects, open-source work, and backend system designs by Joshua Tengker.',
  ogUrl: 'https://jshtngkr.pages.dev/projects',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://jshtngkr.pages.dev/projects' },
  ],
})
</script>
