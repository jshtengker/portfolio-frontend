<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <p class="font-mono text-sm text-accent mb-2">&gt; projects</p>
      <h1 class="text-3xl font-bold tracking-tight mt-6">
        Things I've built
      </h1>
      <SectionReveal>
        <div class="mt-10 grid md:grid-cols-2 gap-4">
          <ProjectCard v-for="p in projects" :key="p.title" :project="p" @select="onSelect" />
        </div>
      </SectionReveal>
    </div>

    <ProjectModal :project="selectedProject" :origin-rect="originRect" @close="onModalClose" />
  </section>
</template>

<script setup lang="ts">
const selectedProject = ref<{
  title: string;
  description: string;
  fullDescription?: string;
  details?: string;
  tags: string[];
  year: string;
  to: string;
} | null>(null);

const originRect = ref<DOMRect | null>(null);

function onSelect(p: any, rect: DOMRect) {
  originRect.value = rect;
  selectedProject.value = p;
}

function onModalClose() {
  selectedProject.value = null;
  originRect.value = null;
}

const projects = [
  {
    title: 'Project Alpha',
    description: 'A RESTful API service for managing distributed task queues with real-time status updates.',
    fullDescription: 'A production-grade RESTful API service for managing distributed task queues with real-time status updates via WebSocket streams. Supports priority scheduling, retry logic, and dead-letter queues.',
    details: 'Built with Go for high concurrency, PostgreSQL for durable storage, and Redis for fast in-memory queue operations. Deployed with Docker and monitored via Prometheus metrics.',
    tags: ['Go', 'PostgreSQL', 'Redis'],
    year: '2026',
    to: '/projects/alpha',
  },
  {
    title: 'Project Beta',
    description: 'Authentication microservice supporting OAuth2, JWT, and session-based auth with rate limiting.',
    fullDescription: 'A modular authentication microservice that provides multiple auth strategies including OAuth2 (Google, GitHub), JWT-based tokens, and traditional session-based authentication.',
    details: 'Built with TypeScript and Express. Implements rate limiting, refresh token rotation, and comprehensive audit logging. Tested with 99% code coverage.',
    tags: ['TypeScript', 'Express', 'JWT'],
    year: '2025',
    to: '/projects/beta',
  },
  {
    title: 'Project Gamma',
    description: 'Real-time collaborative editing backend using WebSockets and operational transform.',
    fullDescription: 'A real-time collaborative editing backend that enables multiple users to edit documents simultaneously. Uses operational transform (OT) for conflict resolution.',
    details: 'Built with Go for low-latency WebSocket handling. Uses MongoDB for document storage and provides a CRDT-based sync protocol for offline support.',
    tags: ['Go', 'WebSocket', 'MongoDB'],
    year: '2025',
    to: '/projects/gamma',
  },
  {
    title: 'Project Delta',
    description: 'CLI tool for scaffolding backend project templates with built-in CI/CD pipelines.',
    fullDescription: 'A command-line tool that scaffolds production-ready backend project templates with pre-configured CI/CD pipelines, Docker Compose, and monitoring stacks.',
    details: 'Built with Python and Click. Generates projects for Go, TypeScript, and Python backends with optional PostgreSQL, Redis, and Prometheus integrations.',
    tags: ['Python', 'CLI', 'Docker'],
    year: '2024',
    to: '/projects/delta',
  },
];

useHead({
  title: 'Projects — Joshua',
});
</script>
