<template>
  <SectionReveal>
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <p class="font-mono text-sm text-accent mb-2">&gt; whoami</p>
        <div class="grid md:grid-cols-5 gap-12 mt-6">
          <div class="md:col-span-3 space-y-4">
            <h2 class="text-2xl font-bold tracking-tight font-sans">
              Backend engineer by trade
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
          <div class="md:col-span-2 border border-border rounded-lg p-5 bg-surface space-y-3">
            <div v-for="stat in stats" :key="stat.label" class="flex items-center justify-between">
              <span class="text-sm text-zinc-500 font-mono">{{ stat.label }}</span>
              <span class="text-sm font-medium">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SectionReveal>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const stats = [
  { label: 'focus', value: 'Backend / APIs' },
  { label: 'stack', value: 'Go, TypeScript, Postgres' },
  { label: 'location', value: 'Indonesia' },
]
</script>
