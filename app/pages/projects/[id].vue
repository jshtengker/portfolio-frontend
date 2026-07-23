<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <NuxtLink
to="/projects"
        class="inline-flex items-center gap-1 text-sm text-zinc-500 font-mono hover:text-accent transition-colors mb-8">
        &larr; Back to projects
      </NuxtLink>

      <div class="border border-border rounded-lg p-8 bg-surface">
        <div class="flex items-start justify-between mb-4">
          <h1 class="text-2xl font-bold tracking-tight font-sans">
            {{ project?.title || id }}
          </h1>
          <span class="text-xs font-mono text-zinc-600 shrink-0 ml-4">
            {{ project?.year }}
          </span>
        </div>

        <p class="text-zinc-400 leading-relaxed mb-6">
          {{ project?.description || 'Project details coming soon.' }}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-8">
          <span
v-for="tag in project?.tags" :key="tag"
            class="px-2 py-0.5 text-xs rounded bg-surface-alt text-zinc-500 font-mono">
            {{ tag }}
          </span>
        </div>

        <p class="text-sm text-zinc-600 italic">
          This page is a prototype — full content will be added later.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '#shared/data/projects'

const route = useRoute()
const id = route.params.id as string

const project = computed(() => projects.find(p => p.id === id))

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
