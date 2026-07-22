<template>
  <div class="relative group w-full max-w-lg">
    <div
      class="absolute -inset-1 rounded-xl bg-accent/15 blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none"
      :class="{ 'opacity-0': !mounted }"
    />

    <div
      class="relative border border-border rounded-lg bg-surface overflow-hidden font-mono text-sm w-full shadow-[0_0_20px_rgba(200,134,74,0.12)] transition-all duration-300 group-hover:border-accent-dim/60 group-hover:shadow-[0_0_30px_rgba(200,134,74,0.22)]"
      :class="{ 'opacity-0': !mounted }"
      :style="{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }"
      @click="focusInput"
    >
      <div class="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-alt">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-accent-blue/70" />
          <span class="ml-2 text-xs text-accent-dim font-sans">terminal — ~/portfolio</span>
        </div>
        <span class="text-[10px] text-zinc-500 font-mono hidden sm:inline">type 'help' to interact</span>
      </div>

      <div ref="terminalBody" class="p-4 h-80 overflow-y-auto space-y-2 leading-relaxed custom-scrollbar">
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

        <form class="flex items-center" @submit.prevent="handleUserCommand">
          <span class="text-accent shrink-0">$&nbsp;</span>
          <input
            ref="inputEl"
            v-model="userCommand"
            type="text"
            class="bg-transparent border-none outline-none text-zinc-200 font-mono text-sm w-full p-0 focus:ring-0"
            placeholder="type a command..."
            @focus="onInputFocus"
            @input="onUserTyping"
            @blur="onInputBlur"
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ShellLine {
  type: 'prompt' | 'output' | 'highlight'
  text: string
}

interface ShellSession {
  lines: ShellLine[]
  delay: number
}

const mounted = ref(false)
const visibleLines = ref<ShellLine[]>([])
const userCommand = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const terminalBody = ref<HTMLElement | null>(null)
const interactiveMode = ref(false)

const sessions: ShellSession[] = [
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
let timer: ReturnType<typeof setTimeout> | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null

function focusInput() {
  inputEl.value?.focus()
}

function getActiveSession(): ShellSession {
  return sessions[currentSession % sessions.length] ?? sessions[0]!
}

function scheduleAutoResume(delayMs = 4000) {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    interactiveMode.value = false
    currentLine = 0
    charIndex = 0
    const active = getActiveSession()
    typeLine(active.lines)
  }, delayMs)
}

function onInputFocus() {
  interactiveMode.value = true
  if (timer) clearTimeout(timer)
  scheduleAutoResume(5000)
}

function onUserTyping() {
  interactiveMode.value = true
  if (timer) clearTimeout(timer)
  scheduleAutoResume(5000)
}

function onInputBlur() {
  scheduleAutoResume(2500)
}

function handleUserCommand() {
  const cmd = userCommand.value.trim().toLowerCase()
  if (!cmd) return

  interactiveMode.value = true
  if (timer) clearTimeout(timer)

  visibleLines.value.push({ type: 'prompt', text: cmd })
  userCommand.value = ''

  switch (cmd) {
    case 'help':
      visibleLines.value.push({ type: 'output', text: 'Available commands: whoami, skills, contact, clear, help' })
      break
    case 'whoami':
      visibleLines.value.push({ type: 'output', text: 'Joshua — Backend engineer focused on Go, TypeScript & Postgres' })
      break
    case 'skills':
      visibleLines.value.push({ type: 'highlight', text: 'Go, TypeScript, Python, Gin, Nuxt, Postgres, Redis, Docker' })
      break
    case 'contact':
      visibleLines.value.push({ type: 'output', text: 'Email: leonardotengker@gmail.com | GitHub: @jshtengker' })
      break
    case 'clear':
      visibleLines.value = []
      break
    default:
      visibleLines.value.push({ type: 'output', text: `command not found: ${cmd}. Type 'help' for options.` })
  }

  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })

  scheduleAutoResume(4000)
}

function typeLine(lines: ShellLine[]) {
  if (interactiveMode.value) return

  if (currentSession >= sessions.length) {
    currentSession = 0
    currentLine = 0
    charIndex = 0
    visibleLines.value = []
    const firstSession = sessions[0] ?? getActiveSession()
    timer = setTimeout(() => typeLine(firstSession.lines), 1500)
    return
  }

  const session = getActiveSession()
  const line = lines[currentLine] || session.lines[currentLine]
  if (!line) {
    currentLine = 0
    currentSession++
    const nextSess = getActiveSession()
    timer = setTimeout(() => typeLine(nextSess.lines), 1000)
    return
  }

  const lineType = line.type
  const fullText = line.text

  function tick() {
    if (interactiveMode.value) return

    if (charIndex < fullText.length) {
      const newLine: ShellLine = {
        type: lineType,
        text: fullText.slice(0, charIndex + 1),
      }
      if (visibleLines.value.length <= currentLine) {
        visibleLines.value.push(newLine)
      } else {
        visibleLines.value[currentLine] = newLine
      }
      charIndex++
      timer = setTimeout(tick, 25 + Math.random() * 20)
    } else {
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
          const nextSess = getActiveSession()
          typeLine(nextSess.lines)
        }, session.delay)
      } else {
        timer = setTimeout(() => typeLine(session.lines), 400)
      }
    }

    nextTick(() => {
      if (terminalBody.value) {
        terminalBody.value.scrollTop = terminalBody.value.scrollHeight
      }
    })
  }

  tick()
}

onMounted(() => {
  mounted.value = true
  const initial = sessions[0] ?? getActiveSession()
  timer = setTimeout(() => typeLine(initial.lines), 800)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (idleTimer) clearTimeout(idleTimer)
})
</script>


