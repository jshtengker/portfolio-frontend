<template>
  <SectionReveal>
    <section class="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-t border-border">
      <div class="max-w-7xl mx-auto">
        <p class="font-mono text-sm text-accent mb-2">&gt; which tech</p>
        <h2 class="text-2xl font-bold tracking-tight mt-6 font-sans">
          Tools I reach for
        </h2>
        <div class="mt-8 space-y-8">
          <div v-for="group in tech" :key="group.category">
            <h3 class="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
              {{ group.category }}
            </h3>
            <div class="flex flex-wrap gap-2.5">
              <button
v-for="item in group.items" :key="item"
                class="px-4 py-2 text-sm rounded-lg border font-mono transition-all duration-300 ease-out transform hover:-translate-y-1.5 hover:scale-105 active:translate-y-0 active:scale-95 cursor-pointer"
                :class="selected === item
                  ? 'border-accent bg-accent/15 text-accent shadow-[0_6px_20px_rgba(200,134,74,0.3)] -translate-y-1 scale-105'
                  : 'border-border text-zinc-400 bg-surface/40 hover:border-accent-dim/80 hover:text-zinc-100 hover:bg-surface hover:shadow-[0_8px_20px_-4px_rgba(200,134,74,0.28)]'"
                @click="selected = selected === item ? null : item">
                {{ item }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="selected" class="mt-8 p-4 rounded-lg border border-accent/30 bg-accent/5 font-mono text-sm text-zinc-300 flex items-start gap-3 transition-all duration-300 hover:border-accent-dim/60 hover:shadow-[0_0_20px_rgba(200,134,74,0.18)]">
          <span class="text-accent shrink-0">&gt;</span>
          <div>
            <span class="text-accent font-semibold">{{ selected }}:</span>
            <span class="ml-2 text-zinc-400">{{ techDetails[selected] || 'Primary tool in production stack.' }}</span>
          </div>
        </div>
      </div>
    </section>
  </SectionReveal>
</template>

<script setup lang="ts">
const selected = ref<string | null>(null)

const tech = [
  {
    category: 'Languages',
    items: ['Go', 'TypeScript', 'Python', 'SQL'],
  },
  {
    category: 'Frameworks',
    items: ['Gin', 'Express', 'FastAPI', 'Nuxt'],
  },
  {
    category: 'Infrastructure',
    items: ['PostgreSQL', 'Redis', 'Docker', 'Linux'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub Actions', 'Prometheus', 'Swagger'],
  },
]

const techDetails: Record<string, string> = {
  Go: 'Building high-concurrency microservices, CLI tools, and robust REST APIs.',
  TypeScript: 'Creating type-safe frontend apps and Node.js backend services.',
  Python: 'Data automation scripts, prototyping, and AI/ML model integrations.',
  SQL: 'Complex query optimization, indexing strategies, and database migrations.',
  Gin: 'Lightweight, fast HTTP web framework for Go microservices.',
  Express: 'Standard backend REST API routing for Node.js services.',
  FastAPI: 'Asynchronous Python APIs with automatic OpenAPI schema generation.',
  Nuxt: 'Fullstack Vue framework for responsive server-side rendered UIs.',
  PostgreSQL: 'Relational data modeling, JSONB fields, indexing, and transactional safety.',
  Redis: 'In-memory caching layer, session storage, and pub/sub message queues.',
  Docker: 'Containerizing services for consistent development and deployment environments.',
  Linux: 'Server administration, bash scripting, systemd service management.',
  Git: 'Version control workflow, branching strategies, and interactive rebasing.',
  'GitHub Actions': 'CI/CD pipeline automation for testing, linting, and automated deployments.',
  Prometheus: 'Metrics collection, observability, and system health alerting.',
  Swagger: 'OpenAPI specification and interactive API documentation.',
}
</script>

