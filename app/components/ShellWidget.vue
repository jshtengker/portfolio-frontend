<template>
  <div
    class="border border-border rounded-lg bg-surface overflow-hidden font-mono text-sm w-full max-w-lg"
    :class="{ 'opacity-0': !mounted }"
    :style="{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }"
  >
    <div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-alt">
      <span class="w-2.5 h-2.5 rounded-full bg-zinc-600" />
      <span class="w-2.5 h-2.5 rounded-full bg-zinc-600" />
      <span class="w-2.5 h-2.5 rounded-full bg-zinc-600" />
      <span class="ml-2 text-xs text-accent-dim font-sans">terminal — ~/portfolio</span>
    </div>

    <div class="p-4 min-h-[180px] space-y-2 leading-relaxed">
      <div v-for="(line, i) in visibleLines" :key="i" class="flex flex-wrap">
        <template v-if="line.type === 'prompt'">
          <span class="text-accent shrink-0">$&nbsp;</span>
          <span class="text-zinc-200">{{ line.text }}</span>
        </template>
        <template v-else-if="line.type === 'output'">
          <span class="text-zinc-400 whitespace-pre-wrap">{{ line.text }}</span>
        </template>
        <template v-else-if="line.type === 'highlight'">
          <span class="text-accent whitespace-pre-wrap">{{ line.text }}</span>
        </template>
      </div>
      <span v-if="cursorVisible" class="inline-block w-[2px] h-4 bg-accent align-middle ml-0.5 animate-pulse" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ShellLine {
  type: 'prompt' | 'output' | 'highlight'
  text: string
}

const mounted = ref(false)
const visibleLines = ref<ShellLine[]>([])
const cursorVisible = ref(true)

const sessions: { lines: ShellLine[]; delay: number }[] = [
  {
    lines: [
      { type: 'prompt', text: 'whoami' },
      { type: 'output', text: 'Joshua — backend engineer' },
    ],
    delay: 2000,
  },
  {
    lines: [
      { type: 'prompt', text: 'curl -s localhost/api/v1/skills | jq .' },
      { type: 'output', text: '{' },
      { type: 'highlight', text: '  "languages": ["Go", "TypeScript", "Python"],' },
      { type: 'output', text: '  "frameworks": ["Gin", "Express", "FastAPI"],' },
      { type: 'output', text: '  "infrastructure": ["PostgreSQL", "Redis", "Docker"]' },
      { type: 'output', text: '}' },
    ],
    delay: 3000,
  },
  {
    lines: [
      { type: 'prompt', text: 'curl -s localhost/api/v1/status | jq .message' },
      { type: 'highlight', text: '"building reliable systems since 2023"' },
    ],
    delay: 2500,
  },
]

let currentSession = 0
let currentLine = 0
let charIndex = 0
let isTyping = false
let timer: ReturnType<typeof setTimeout> | null = null

function typeLine(lines: ShellLine[]) {
  if (currentSession >= sessions.length) {
    currentSession = 0
    currentLine = 0
    charIndex = 0
    visibleLines.value = []
    setTimeout(() => typeLine(sessions[0].lines), 1500)
    return
  }

  const session = sessions[currentSession]
  const line = session.lines[currentLine]
  const fullText = line.text

  isTyping = true

  function tick() {
    if (charIndex < fullText.length) {
      if (visibleLines.value.length <= currentLine) {
        visibleLines.value.push({ ...line, text: '' })
      }
      visibleLines.value[currentLine] = {
        ...line,
        text: fullText.slice(0, charIndex + 1),
      }
      charIndex++
      timer = setTimeout(tick, 25 + Math.random() * 20)
    } else {
      isTyping = false
      charIndex = 0
      currentLine++

      if (currentLine >= session.lines.length) {
        currentLine = 0
        currentSession++
        timer = setTimeout(() => {
          if (currentSession >= sessions.length) {
            visibleLines.value = []
            currentSession = 0
          }
          typeLine(sessions[currentSession].lines)
        }, session.delay)
      } else {
        timer = setTimeout(() => typeLine(sessions[currentSession].lines), 400)
      }
    }
  }

  tick()
}

onMounted(() => {
  mounted.value = true
  setTimeout(() => typeLine(sessions[0].lines), 800)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
