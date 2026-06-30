<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <p class="font-mono text-sm text-accent mb-2">&gt; about</p>
      <h1 class="text-3xl font-bold tracking-tight mt-6 font-sans">Joshua</h1>

      <SectionReveal>
        <section class="mt-12 grid md:grid-cols-5 gap-12">
          <div class="md:col-span-3 space-y-4">
            <h2 class="text-lg font-semibold font-sans">Background</h2>
            <p class="text-zinc-400 leading-relaxed">
              I'm a backend-focused software engineer. I care about building
              systems that are simple to reason about, easy to test, and hard
              to break. Most of my work lives on the server — APIs, data
              pipelines, authentication, and infrastructure tooling.
            </p>
            <p class="text-zinc-400 leading-relaxed">
              I work primarily with Go and TypeScript, and I'm always exploring
              better ways to structure systems. I believe good architecture
              emerges from understanding trade-offs, not from following trends.
            </p>
          </div>
          <div class="md:col-span-2 border border-border rounded-lg p-5 bg-surface space-y-3">
            <h3 class="text-xs font-mono text-zinc-600 uppercase tracking-wider">Quick facts</h3>
            <div v-for="fact in facts" :key="fact.label" class="flex items-center justify-between">
              <span class="text-sm text-zinc-500 font-mono">{{ fact.label }}</span>
              <span class="text-sm">{{ fact.value }}</span>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section class="mt-20">
          <h2 class="text-lg font-semibold mb-6 font-sans">Experience</h2>
          <div class="space-y-6">
            <div v-for="(exp, i) in experience" :key="i"
              class="border-l-2 border-border pl-5 pb-6 last:pb-0 relative">
              <div class="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
              <div class="flex items-start justify-between mb-1">
                <h3 class="font-medium font-sans">{{ exp.role }}</h3>
                <span class="text-xs text-zinc-500 font-mono shrink-0 ml-4">{{ exp.period }}</span>
              </div>
              <p class="text-sm text-zinc-600 mb-2">{{ exp.company }}</p>
              <p class="text-sm text-zinc-400 leading-relaxed">{{ exp.description }}</p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section class="mt-20">
          <h2 class="text-lg font-semibold mb-6 font-sans">Interests</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="i in interests" :key="i"
              class="px-3 py-1.5 text-sm border border-border rounded-lg text-zinc-500">
              {{ i }}
            </span>
          </div>
        </section>
      </SectionReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
const facts = [
  { label: 'location', value: 'Indonesia' },
  { label: 'focus', value: 'Backend / APIs' },
  { label: 'languages', value: 'Go, TS, Python' },
  { label: 'editor', value: 'VS Code' },
]

const experience = [
  {
    role: 'Backend Engineer',
    company: 'Current Company',
    period: '2025 — Present',
    description: 'Building and maintaining microservices, designing APIs, and improving system reliability.',
  },
  {
    role: 'Software Developer',
    company: 'Previous Company',
    period: '2023 — 2025',
    description: 'Full-stack development with a focus on backend systems and database architecture.',
  },
]

const interests = [
  'Distributed systems',
  'API design',
  'Developer tooling',
  'Open source',
  'Go',
  'Rust (learning)',
  'Linux',
  'Self-hosting',
]

useHead({
  title: 'About — Joshua',
})
</script>
