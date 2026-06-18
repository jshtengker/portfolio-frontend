<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <NuxtLink to="/projects"
        class="inline-flex items-center gap-1 text-sm text-zinc-400 font-mono hover:text-accent transition-colors mb-8">
        &larr; Back to projects
      </NuxtLink>

      <div class="border border-border rounded-lg p-8 bg-surface">
        <div class="flex items-start justify-between mb-4">
          <h1 class="text-2xl font-bold tracking-tight">
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
          <span v-for="tag in project?.tags" :key="tag"
            class="px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400 font-mono">
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
const route = useRoute();
const id = route.params.id as string;

const allProjects = [
  { title: 'Project Alpha', description: 'A RESTful API service for managing distributed task queues with real-time status updates.', tags: ['Go', 'PostgreSQL', 'Redis'], year: '2026', id: 'alpha' },
  { title: 'Project Beta', description: 'Authentication microservice supporting OAuth2, JWT, and session-based auth with rate limiting.', tags: ['TypeScript', 'Express', 'JWT'], year: '2025', id: 'beta' },
  { title: 'Project Gamma', description: 'Real-time collaborative editing backend using WebSockets and operational transform.', tags: ['Go', 'WebSocket', 'MongoDB'], year: '2025', id: 'gamma' },
  { title: 'Project Delta', description: 'CLI tool for scaffolding backend project templates with built-in CI/CD pipelines.', tags: ['Python', 'CLI', 'Docker'], year: '2024', id: 'delta' },
];

const project = computed(() => allProjects.find(p => p.id === id));

useHead({
  title: `${project.value?.title || 'Project'} — Joshua`,
});
</script>
