<template>
  <SectionReveal>
    <section class="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
      <div class="max-w-7xl mx-auto">
        <p class="font-mono text-sm text-accent mb-2">&gt; whoami</p>
        <div class="grid md:grid-cols-5 gap-12 mt-6">
          <div class="md:col-span-3 space-y-4">
            <h2 class="text-2xl font-bold tracking-tight font-sans">
              Backend Engineer
            </h2>
            <p class="text-zinc-400 leading-relaxed">
              I build the server-side of things — APIs, data pipelines,
              authentication, and the glue that makes frontends work.
              I prefer simple, correct code over clever abstractions.
            </p>
            <p class="text-zinc-400 leading-relaxed">
              Currently working with Go and TypeScript, designing systems
              that are testable, observable, and boring enough to trust in
              production.
            </p>
          </div>
          <div class="md:col-span-2 border-l border-zinc-800/80 pl-6 space-y-5 flex flex-col justify-center">
            <div v-for="stat in stats" :key="stat.label" class="group">
              <span class="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-0.5">&gt; {{ stat.label }}</span>
              <span class="text-sm font-mono text-zinc-200 group-hover:text-accent transition-colors font-medium">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SectionReveal>
</template>

<script setup lang="ts">
const stats = [
  { label: 'focus', value: 'Backend / APIs' },
  { label: 'stack', value: 'Go, TypeScript, Postgres' },
  { label: 'location', value: 'Indonesia' },
]
</script>
