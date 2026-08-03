<template>
  <SectionReveal>
    <section class="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-t border-border">
      <div class="max-w-7xl mx-auto">
        <p class="font-mono text-sm text-accent mb-2">&gt; stack.matrix</p>
        <h2 class="text-2xl font-bold tracking-tight mt-6 font-sans">
          Tools I reach for
        </h2>
        <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="group in tech" :key="group.category" class="space-y-3">
            <h3 class="text-xs font-mono text-accent/80 uppercase tracking-wider border-b border-border/40 pb-2">
              // {{ group.category }}
            </h3>
            <ul class="space-y-1">
              <li v-for="item in group.items" :key="item">
                <button
                  class="w-full text-left py-1.5 px-2 text-sm font-mono transition-all duration-200 cursor-pointer flex items-center justify-between group rounded"
                  :class="selected === item
                    ? 'text-accent bg-accent/10 border-l-2 border-accent pl-3'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 hover:pl-3'"
                  @click="selected = selected === item ? null : item"
                >
                  <span class="flex items-center gap-2">
                    <span class="text-xs opacity-40 group-hover:opacity-100 text-accent transition-opacity font-mono">&gt;</span>
                    <span>{{ item }}</span>
                  </span>
                  <span v-if="selected === item" class="text-xs text-accent animate-pulse">&bull;</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="selected" class="mt-8 py-3 px-4 border-l-2 border-accent bg-zinc-900/50 font-mono text-sm text-zinc-300 flex items-start gap-3 transition-all duration-300">
          <span class="text-accent shrink-0">&gt;</span>
          <div>
            <span class="text-accent font-semibold">stack.inspect("{{ selected }}"):</span>
            <span class="ml-2 text-zinc-300 leading-relaxed">{{ techDetails[selected] || 'Primary tool in production stack.' }}</span>
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

