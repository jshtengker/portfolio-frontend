<template>
  <SectionReveal>
    <section class="py-24 px-6 border-t border-border">
      <div class="max-w-7xl mx-auto">
        <p class="font-mono text-sm text-accent mb-2">&gt; which tech</p>
        <h2 class="text-2xl font-bold tracking-tight mt-6 font-sans">
          Tools I reach for
        </h2>
        <div class="mt-8 space-y-8">
          <div v-for="group in tech" :key="group.category">
            <h3 class="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-3">
              {{ group.category }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <button v-for="item in group.items" :key="item"
                @click="selected = selected === item ? null : item"
                class="px-4 py-2 text-sm rounded-lg border transition-all duration-200"
                :class="selected === item
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-zinc-500 hover:border-accent-dim hover:text-zinc-300'">
                {{ item }}
              </button>
            </div>
          </div>
        </div>
        <p v-if="selected" class="mt-6 text-sm text-zinc-500 font-mono">
          &gt; {{ selected }}
        </p>
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
</script>
