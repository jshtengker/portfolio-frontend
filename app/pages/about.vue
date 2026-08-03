<template>
  <section class="py-20 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-radial-glow">
    <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <p class="font-mono text-xs text-accent mb-2">&gt; 01. overview</p>

      <SectionReveal>
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-4">
          <div class="lg:col-span-4 space-y-3 relative group">
            <div class="absolute -inset-2 rounded-3xl bg-accent/15 blur-xl opacity-40 group-hover:opacity-80 group-hover:blur-2xl transition-all duration-700 pointer-events-none animate-pulse-slow" />
            <div class="relative rounded-2xl overflow-hidden bg-zinc-950/90 shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(200,134,74,0.3)] hover:scale-[1.01]">
              <div class="aspect-[4/4.8] overflow-hidden relative">
                <img
                  src="/profile.png"
                  alt="Joshua Leonardo Tengker"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105 group-hover:brightness-100"
                >
                <div class="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-75" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-8 space-y-6">
            <div>
              <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans text-zinc-100 mb-2">
                Joshua Leonardo Tengker
              </h1>
              <p class="text-sm font-mono text-accent flex items-center gap-1.5">
                <span>&gt; Backend Software Engineer & Systems Architect</span>
                <span class="w-1.5 h-4 bg-accent animate-pulse inline-block" />
              </p>
            </div>

            <div class="space-y-4 pt-2 border-t border-border/30">
              <h2 class="text-xs font-mono text-zinc-500 uppercase tracking-wider">// Background</h2>
              <p class="text-zinc-300 leading-relaxed text-base sm:text-lg font-sans">
                I'm a backend-focused software engineer based in Jakarta, Indonesia. I care about building
                systems that are simple to reason about, easy to test, and hard to break. Most of my work lives on the server — APIs, microservices, data pipelines, authentication, and observability tooling.
              </p>
              <p class="text-zinc-400 leading-relaxed text-sm sm:text-base font-sans">
                I work primarily with Go, PHP, and TypeScript, building multi-tenant architectures, distributed event notifications, and OpenTelemetry monitoring systems.
              </p>
            </div>

            <div class="pt-2 flex flex-wrap gap-4">
              <a
                href="/joshua_tengker_cv.pdf"
                download="joshua_tengker_cv.pdf"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 font-mono text-xs shadow-[0_0_20px_rgba(200,134,74,0.3)] hover:shadow-[0_0_35px_rgba(200,134,74,0.5)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Icon name="lucide:download" class="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download Curriculum Vitae (CV)</span>
              </a>

              <a
                href="/Certificates.pdf"
                download="Certificates.pdf"
                class="inline-flex items-center gap-2 px-5 py-2.5 border border-border/80 text-zinc-300 hover:border-accent hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-300 font-mono text-xs hover:shadow-[0_0_20px_rgba(200,134,74,0.2)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Icon name="lucide:file-down" class="w-4 h-4 text-accent" />
                <span>Download Certificates (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal>
        <div class="mt-14 pt-8 border-t border-border/40">
          <p class="font-mono text-xs text-accent uppercase tracking-wider mb-4">&gt; 02. Quick Facts</p>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SectionReveal v-for="(fact, idx) in facts" :key="fact.label" :delay="idx * 100">
              <div class="group border-l-2 border-zinc-800 hover:border-accent pl-4 py-2 transition-all duration-300 hover:translate-x-1.5">
                <span class="block text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1">&gt; {{ fact.label }}</span>
                <span class="text-sm font-mono text-zinc-200 group-hover:text-accent transition-colors font-medium">{{ fact.value }}</span>
              </div>
            </SectionReveal>
          </div>
        </div>
      </SectionReveal>

      <section class="mt-20">
        <SectionReveal>
          <p class="font-mono text-xs text-accent mb-1">&gt; career trajectory</p>
          <h2 class="text-lg font-semibold mb-6 font-sans">Professional Experience</h2>
        </SectionReveal>
        <div class="space-y-6">
          <SectionReveal v-for="(exp, i) in experience" :key="i" :delay="i * 150">
            <div class="group border-l-2 border-border/60 hover:border-accent pl-5 pb-6 last:pb-0 relative transition-colors duration-300">
              <div class="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(200,134,74,0.9)]" />
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                <h3 class="font-semibold text-zinc-100 font-sans group-hover:text-accent transition-colors duration-300">{{ exp.role }}</h3>
                <span class="text-xs text-zinc-500 font-mono shrink-0">{{ exp.period }}</span>
              </div>
              <p class="text-xs text-accent font-mono mb-2">{{ exp.company }} &bull; <span class="text-zinc-500">{{ exp.location }}</span></p>
              <p class="text-sm text-zinc-400 leading-relaxed">{{ exp.description }}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section class="mt-20">
        <SectionReveal>
          <p class="font-mono text-xs text-accent mb-1">&gt; academic foundation</p>
          <h2 class="text-lg font-semibold mb-6 font-sans">Education</h2>
          <div class="group border-l-2 border-border/60 hover:border-accent pl-5 pb-2 relative transition-colors duration-300">
            <div class="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(200,134,74,0.9)]" />
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
              <h3 class="font-semibold text-zinc-100 font-sans group-hover:text-accent transition-colors duration-300">Bachelor of Computer Science, Informatics</h3>
              <span class="text-xs text-zinc-500 font-mono shrink-0">Aug 2021 — May 2025</span>
            </div>
            <p class="text-sm text-accent/90 font-mono mb-2">Universitas Klabat &bull; Airmadidi, North Sulawesi, Indonesia</p>
            <p class="text-xs font-mono text-zinc-400">
              GPA: <span class="text-zinc-200 font-semibold">3.90 / 4.00</span> &bull; Honor: <span class="text-accent font-semibold">Summa Cum Laude</span>
            </p>
          </div>
        </SectionReveal>
      </section>

      <section class="mt-20">
        <SectionReveal>
          <p class="font-mono text-xs text-accent mb-1">&gt; leadership & community</p>
          <h2 class="text-lg font-semibold mb-6 font-sans">Organization Experience</h2>
        </SectionReveal>
        <div class="space-y-6">
          <SectionReveal v-for="(org, i) in organizations" :key="i" :delay="i * 150">
            <div class="group border-l-2 border-border/60 hover:border-accent pl-5 pb-6 last:pb-0 relative transition-colors duration-300">
              <div class="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(200,134,74,0.9)]" />
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                <h3 class="font-semibold text-zinc-100 font-sans group-hover:text-accent transition-colors duration-300">{{ org.role }}</h3>
                <span class="text-xs text-zinc-500 font-mono shrink-0">{{ org.period }}</span>
              </div>
              <p class="text-xs text-accent font-mono mb-2">{{ org.name }}</p>
              <p class="text-sm text-zinc-400 leading-relaxed">{{ org.description }}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section class="mt-20">
        <SectionReveal>
          <p class="font-mono text-xs text-accent mb-1">&gt; credentials</p>
          <h2 class="text-lg font-semibold mb-6 font-sans">Certifications & Training</h2>
        </SectionReveal>
        <div class="divide-y divide-border/40 border-t border-b border-border/40">
          <SectionReveal v-for="(cert, i) in certificatesList" :key="cert.id" :delay="i * 100">
            <div class="group py-5 px-4 hover:bg-zinc-900/50 transition-all duration-300 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-2 border-transparent hover:border-accent">
              <div class="space-y-1.5 md:w-2/3">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span class="text-xs font-mono text-accent uppercase tracking-wider">{{ cert.issuer }}</span>
                  <span class="text-xs font-mono text-zinc-600">• {{ cert.issueDate }}</span>
                  <span v-if="cert.credentialId" class="text-[11px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">ID: {{ cert.credentialId }}</span>
                </div>
                <h3 class="font-semibold text-base font-sans text-zinc-100 group-hover:text-accent transition-colors">
                  {{ cert.title }}
                </h3>
                <div v-if="cert.skills?.length" class="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                  <span
                    v-for="s in cert.skills"
                    :key="s"
                    class="text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors"
                  >
                    # {{ s }}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <a
                  :href="cert.pdfUrl"
                  download
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-border/80 text-zinc-300 hover:border-accent hover:text-accent rounded-md transition-all duration-300 text-xs font-mono hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(200,134,74,0.2)] group-hover:translate-x-0.5"
                  title="Download Certificate PDF"
                >
                  <Icon name="lucide:download" class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section class="mt-20">
        <SectionReveal>
          <h2 class="text-lg font-semibold mb-6 font-sans">Interests & Focus Areas</h2>
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="i in interests" :key="i"
              class="px-3.5 py-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/40 border-l-2 border-accent/40 rounded-r hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(200,134,74,0.25)] transition-all duration-300 cursor-default">
              # {{ i }}
            </span>
          </div>
        </SectionReveal>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { facts, interests } from '#shared/data/about'
import { certificates as certificatesList } from '#shared/data/certificates'
import { experience } from '#shared/data/experience'
import { organizations } from '#shared/data/organizations'

useSeoMeta({
  title: 'About Joshua Leonardo Tengker',
  description: 'Learn more about Joshua Leonardo Tengker, a backend software engineer specializing in Go, PHP, microservices, and distributed observability.',
  ogTitle: 'About Joshua Leonardo Tengker | Backend Software Engineer',
  ogDescription: 'Learn more about Joshua Leonardo Tengker, a backend software engineer specializing in Go, PHP, microservices, and distributed observability.',
  ogUrl: 'https://jshtngkr.pages.dev/about',
  ogType: 'profile',
  twitterCard: 'summary',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://jshtngkr.pages.dev/about' },
  ],
})
</script>


