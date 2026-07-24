<template>
  <div class="rounded-xl border border-border bg-[#0f0e0c] p-6 shadow-2xl space-y-6">
    <!-- Window Bar & Stage Control Tabs -->
    <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/40 font-mono text-xs">
      <div class="flex items-center gap-2 text-zinc-500">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-accent-blue/60" />
        <span class="ml-2 text-zinc-400 font-semibold">{{ activeAppTitle }}.simulator</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 text-accent text-[10px] font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/30">
          <span class="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>AUTO PLAYING</span>
        </div>
        <!-- Stage Selector Buttons -->
        <div class="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
          <button
            v-for="(s, idx) in activeStages"
            :key="s.title"
            type="button"
            class="px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-200 cursor-pointer"
            :class="[
              currentStep === idx
                ? 'bg-accent text-black font-bold shadow-[0_0_12px_rgba(200,134,74,0.3)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-alt'
            ]"
            @click="selectStep(idx)"
          >
            0{{ idx + 1 }}. {{ s.shortTitle }}
          </button>
        </div>
      </div>
    </div>

    <!-- Active Stage Viewer Box -->
    <div class="min-h-55 flex flex-col justify-center relative">
      <!-- STAGE CONTENT DISPLAY -->
      <div v-if="currentStepData" class="space-y-4">
        <!-- Stage Title & Status Indicator -->
        <div class="flex items-center justify-between font-mono text-xs">
          <span class="text-accent font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Stage 0{{ currentStep + 1 }}: {{ currentStepData.title }}
          </span>
          <span class="text-[10px] text-zinc-500 font-mono">{{ currentStepData.techTag }}</span>
        </div>

        <!-- SPEECH-TO-TEXT SIMULATION STAGES -->
        <template v-if="isSpeechToText">
          <!-- Stage 0: Upload -->
          <div v-if="currentStep === 0" class="p-8 border-2 border-dashed border-accent/40 rounded-xl text-center bg-accent/5 transition-all">
            <Icon name="lucide:file-video" class="w-10 h-10 text-accent mx-auto mb-2 animate-bounce" />
            <p class="font-mono text-xs text-zinc-200 font-bold mb-1">interview_recording_1080p.mp4 (1.4 GB)</p>
            <span class="text-[11px] font-mono text-accent">File ingested into memory dropzone &rarr;</span>
          </div>

          <!-- Stage 1: Web Audio Extraction -->
          <div v-else-if="currentStep === 1" class="space-y-3 p-6 bg-surface/50 rounded-xl border border-border font-mono text-xs">
            <div class="flex justify-between text-zinc-300">
              <span class="flex items-center gap-2">
                <Icon name="lucide:cpu" class="w-4 h-4 text-accent" />
                [Web Audio API] OfflineAudioContext Extraction
              </span>
              <span class="text-accent font-bold">{{ extractionProgress }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div class="h-full bg-accent transition-all duration-150" :style="{ width: `${extractionProgress}%` }" />
            </div>
            <p class="text-[11px] text-zinc-400 leading-relaxed">
              Downsampled 1.4 GB 1080p video into mono 16kHz PCM WAV (32 MB) in browser memory in &lt; 1 second.
            </p>
          </div>

          <!-- Stage 2: Real-time SSE Stream -->
          <div v-else-if="currentStep === 2" class="p-5 bg-surface/60 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="text-accent-blue flex items-center justify-between pb-2 border-b border-border/40 text-[11px]">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                Live SSE Stream: /api/transcribe/stream
              </span>
              <span class="text-zinc-500">groq-whisper-large-v3</span>
            </div>
            <div class="space-y-1.5 leading-relaxed text-zinc-300">
              <p><span class="text-zinc-500">[00:01.20]</span> Welcome to our distributed systems architecture review.</p>
              <p><span class="text-zinc-500">[00:04.50]</span> We process high-concurrency streams with sub-100ms lag. <span class="inline-block w-1.5 h-3 bg-accent animate-pulse" /></p>
            </div>
          </div>

          <!-- Stage 3: DeepL Translation -->
          <div v-else-if="currentStep === 3" class="p-5 bg-surface/60 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="text-accent flex items-center justify-between pb-2 border-b border-border/40 text-[11px]">
              <span class="flex items-center gap-1.5">
                <Icon name="lucide:languages" class="w-4 h-4 text-accent" />
                Target Language: Spanish (DeepL API)
              </span>
              <span class="text-accent-blue font-semibold">Timestamps Preserved</span>
            </div>
            <div class="space-y-1.5 leading-relaxed text-zinc-200">
              <p><span class="text-zinc-500">[00:01.20]</span> Bienvenido a nuestra revisión de arquitectura de sistemas.</p>
              <p><span class="text-zinc-500">[00:04.50]</span> Procesamos transmisiones de alta concurrencia con latencia mínima.</p>
            </div>
          </div>
        </template>

        <!-- ZETRYN SIMULATION STAGES -->
        <template v-else>
          <!-- Stage 0: Ingestion -->
          <div v-if="currentStep === 0" class="p-6 bg-surface/50 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="flex justify-between text-zinc-300">
              <span class="text-accent font-semibold">&gt; OpenTelemetry Collector (Go gRPC)</span>
              <span class="text-zinc-500">50,000 req/sec</span>
            </div>
            <div class="p-3 bg-bg rounded border border-border/60 text-[11px] text-zinc-400">
              Ingesting spans: service=payment-api, trace_id=8f3c2a1e, duration=12ms
            </div>
          </div>

          <!-- Stage 1: Redis Stream Buffer -->
          <div v-else-if="currentStep === 1" class="p-6 bg-surface/50 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="flex justify-between text-zinc-300">
              <span class="text-accent-blue font-semibold">&gt; Redis Stream Buffer Queue</span>
              <span class="text-zinc-500">0 dropped packets</span>
            </div>
            <div class="p-3 bg-bg rounded border border-border/60 text-[11px] text-zinc-400">
              Buffer queue length: 1,420 spans [Worker pool processing active]
            </div>
          </div>

          <!-- Stage 2: Span Correlation -->
          <div v-else-if="currentStep === 2" class="p-6 bg-surface/50 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="flex justify-between text-zinc-300">
              <span class="text-amber-400 font-semibold">&gt; Correlation Engine (Go errgroup)</span>
              <span class="text-amber-500">Latency: 12.4ms</span>
            </div>
            <p class="text-zinc-300 text-[11px]">
              Matched trace <code class="text-accent">#8f3c2a1e</code> across 4 microservice boundaries automatically.
            </p>
          </div>

          <!-- Stage 3: Incident Detection -->
          <div v-else-if="currentStep === 3" class="p-6 bg-surface/50 rounded-xl border border-border font-mono text-xs space-y-3">
            <div class="flex justify-between text-accent">
              <span class="font-semibold flex items-center gap-1.5">
                <Icon name="lucide:check-circle" class="w-4 h-4" />
                Root-Cause Isolated: Database Timeout
              </span>
              <span class="text-accent-blue font-semibold">Alert Sent</span>
            </div>
            <p class="text-zinc-400 text-[11px]">
              Webhook alert dispatched to PagerDuty/Slack. MTTD reduced by 65%.
            </p>
          </div>
        </template>

        <!-- Stage Description Footer -->
        <p class="text-xs text-zinc-400 font-sans leading-relaxed pt-2 border-t border-border/40">
          {{ currentStepData.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stage {
  title: string
  shortTitle: string
  techTag: string
  description: string
}

const props = defineProps<{
  projectId?: string
}>()

const currentStep = ref(0)
const extractionProgress = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

const isSpeechToText = computed(() => props.projectId === 'speech-to-text')
const activeAppTitle = computed(() => (isSpeechToText.value ? 'speech-to-text' : 'zetryn'))

const speechToTextStages: Stage[] = [
  {
    title: 'Media Drop & Pre-Processing',
    shortTitle: 'Upload',
    techTag: 'Drag & Drop',
    description: 'Heavy 1.4 GB media files are dropped into the browser for non-blocking local pre-processing.',
  },
  {
    title: 'Web Audio API Extraction',
    shortTitle: 'Web Audio',
    techTag: 'OfflineAudioContext',
    description: 'Web Audio API extracts and compresses the audio track to mono 16kHz PCM WAV (<45MB) in <1s.',
  },
  {
    title: 'Real-Time SSE Event Streaming',
    shortTitle: 'SSE Stream',
    techTag: 'FastAPI / SSE',
    description: 'Transcripts stream line-by-line in real time using Server-Sent Events from the Whisper engine.',
  },
  {
    title: 'DeepL / NLLB Multi-Language Translation',
    shortTitle: 'Translation',
    techTag: 'DeepL / NLLB',
    description: 'Completed transcripts are translated into target languages with segment timestamps preserved.',
  },
]

const zetrynStages: Stage[] = [
  {
    title: 'OpenTelemetry Signal Ingestion',
    shortTitle: 'Ingestion',
    techTag: 'Go / gRPC',
    description: 'Go HTTP/gRPC workers receive high-concurrency telemetry signal batches from microservices.',
  },
  {
    title: 'Redis Streams Buffer Queue',
    shortTitle: 'Redis Buffer',
    techTag: 'Redis Streams',
    description: 'In-memory stream queue buffers signals during high traffic spikes with zero dropped spans.',
  },
  {
    title: 'Sub-15ms Cross-Service Correlation',
    shortTitle: 'Correlation',
    techTag: 'Go Workers',
    description: 'Background worker pool matches span IDs across microservice boundaries asynchronously.',
  },
  {
    title: 'Automated Root-Cause Incident Alert',
    shortTitle: 'Incident Alert',
    techTag: 'Webhook Alerts',
    description: 'Evaluates anomaly thresholds and triggers automated webhook alerts before service failure.',
  },
]

const activeStages = computed(() => (isSpeechToText.value ? speechToTextStages : zetrynStages))
const currentStepData = computed(() => activeStages.value[currentStep.value])

function startAutoLoop() {
  stopAutoLoop()
  timer = setInterval(() => {
    currentStep.value = (currentStep.value + 1) % activeStages.value.length
    if (currentStep.value === 1 && isSpeechToText.value) {
      animateExtraction()
    }
  }, 3500)
}

function stopAutoLoop() {
  if (timer) clearInterval(timer)
  if (progressInterval) clearInterval(progressInterval)
}

function animateExtraction() {
  if (progressInterval) clearInterval(progressInterval)
  extractionProgress.value = 0
  progressInterval = setInterval(() => {
    extractionProgress.value += 20
    if (extractionProgress.value >= 100) {
      extractionProgress.value = 100
      if (progressInterval) clearInterval(progressInterval)
    }
  }, 100)
}

function selectStep(idx: number) {
  currentStep.value = idx
  if (idx === 1 && isSpeechToText.value) {
    animateExtraction()
  }
  // Restart auto-loop timer after user selection
  startAutoLoop()
}

onMounted(() => {
  startAutoLoop()
})

onUnmounted(() => {
  stopAutoLoop()
})
</script>
