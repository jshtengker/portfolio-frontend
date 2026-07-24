<template>
  <div class="rounded-xl border border-border bg-[#0f0e0c] p-6 shadow-2xl space-y-6">
    <!-- Header Bar -->
    <div class="flex items-center justify-between pb-4 border-b border-border/40 font-mono text-xs text-zinc-500">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-accent-blue/60" />
        <span class="ml-2 text-zinc-400">architecture.interactive — pipeline flow</span>
      </div>
      <div class="flex items-center gap-2 text-accent-blue text-[11px]">
        <span class="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
        <span>Hover node to inspect data flow</span>
      </div>
    </div>

    <!-- Interactive Nodes Pipeline Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 relative py-2">
      <div
        v-for="(node, index) in activeNodes"
        :key="node.name"
        class="group relative p-4 rounded-lg border transition-all duration-300 cursor-pointer"
        :class="[
          selectedIndex === index
            ? 'border-accent-blue bg-accent-blue/10 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
            : 'border-border bg-surface/60 hover:border-accent-blue/50 hover:bg-surface'
        ]"
        @mouseenter="selectedIndex = index"
        @click="selectedIndex = index"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono text-zinc-500">0{{ index + 1 }} // node</span>
          <Icon
            :name="node.icon"
            class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            :class="selectedIndex === index ? 'text-accent-blue' : 'text-zinc-400'"
          />
        </div>
        <h4 class="font-mono text-xs font-bold text-zinc-100 mb-1">
          {{ node.name }}
        </h4>
        <p class="text-[11px] font-mono text-accent">
          {{ node.tech }}
        </p>

        <!-- Flow Connector Arrow -->
        <div v-if="index < activeNodes.length - 1" class="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
          <div class="w-3.5 h-3.5 rounded-full bg-surface border border-accent-blue/40 flex items-center justify-center text-accent-blue text-[10px]">
            &rarr;
          </div>
        </div>
      </div>
    </div>

    <!-- Active Node Inspector Details -->
    <div v-if="currentNode" class="p-4 rounded-lg border border-accent-blue/30 bg-accent-blue/5 font-mono text-xs transition-all duration-300">
      <div class="flex items-center justify-between mb-2">
        <span class="text-accent font-semibold flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Node Inspector: {{ currentNode.name }}
        </span>
        <span class="text-[10px] text-zinc-500">Protocol: {{ currentNode.protocol }}</span>
      </div>
      <p class="text-zinc-300 leading-relaxed text-xs">
        {{ currentNode.desc }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ArchNode {
  name: string
  tech: string
  icon: string
  protocol: string
  desc: string
}

const props = defineProps<{
  projectId?: string
}>()

const selectedIndex = ref(0)

const zetrynNodes: ArchNode[] = [
  {
    name: 'OTEL Receiver',
    tech: 'Go / gRPC',
    icon: 'lucide:radio',
    protocol: 'gRPC / HTTP Batching',
    desc: 'High-throughput OpenTelemetry collector handling continuous telemetry signal batches from microservices.',
  },
  {
    name: 'Task Stream Buffer',
    tech: 'Redis Streams',
    icon: 'lucide:layers',
    protocol: 'Asynchronous Queue',
    desc: 'Durable in-memory stream buffer preventing telemetry ingestion bottlenecks during traffic spikes.',
  },
  {
    name: 'Correlation Engine',
    tech: 'Go Worker Pool',
    icon: 'lucide:cpu',
    protocol: 'Span Correlation',
    desc: 'Asynchronous worker pool executing sub-15ms cross-service span ID matching and anomaly detection.',
  },
  {
    name: 'Operator Dashboard',
    tech: 'PostgreSQL / React',
    icon: 'lucide:monitor',
    protocol: 'Indexed Persistence & UI',
    desc: 'Optimized PostgreSQL storage and interactive React console for live incident root-cause visualization.',
  },
]

const speechToTextNodes: ArchNode[] = [
  {
    name: 'Web Audio Extractor',
    tech: 'Web Audio API',
    icon: 'lucide:file-audio',
    protocol: 'OfflineAudioContext (16kHz WAV)',
    desc: 'Extracts and compresses speech audio from multi-gigabyte videos down to <45MB 16kHz WAV inside browser memory in <1s before upload.',
  },
  {
    name: 'FastAPI SSE Stream API',
    tech: 'FastAPI / SSE',
    icon: 'lucide:server',
    protocol: 'Server-Sent Events (SSE)',
    desc: 'Async Python server endpoint managing memory-efficient audio chunking and real-time SSE event dispatching.',
  },
  {
    name: 'Hybrid Inference Engine',
    tech: 'faster-whisper / Groq',
    icon: 'lucide:zap',
    protocol: 'Local CTranslate2 / Groq Cloud API',
    desc: 'Runs local faster-whisper (CTranslate2) on GPU in local development, automatically switching to Groq Cloud API (Whisper Large-v3) in production.',
  },
  {
    name: 'Hybrid Translation Engine',
    tech: 'DeepL / NLLB-200',
    icon: 'lucide:languages',
    protocol: 'DeepL API / Local NLLB-200',
    desc: 'Translates completed transcriptions into target languages via DeepL API in production or Meta NLLB-200 locally, preserving subtitle timestamps.',
  },
]

const activeNodes = computed(() => {
  if (props.projectId === 'speech-to-text') return speechToTextNodes
  return zetrynNodes
})

const currentNode = computed(() => activeNodes.value[selectedIndex.value])
</script>
