<template>
  <div class="mt-16 max-w-2xl mx-auto font-mono text-xs text-zinc-500 space-y-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
    <!-- Terminal Header Line (Dimmed, No card) -->
    <div class="flex items-center justify-between pb-2.5 border-b border-border/30 text-zinc-600 text-[11px]">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/50 inline-block" />
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500/50 inline-block" />
        <span class="w-2.5 h-2.5 rounded-full bg-accent-blue/50 inline-block" />
        <span class="ml-2 font-mono">status.log — zsh</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative flex items-center justify-center">
          <span class="absolute w-2.5 h-2.5 rounded-full bg-accent-blue/50 opacity-50 animate-ping" />
          <span class="w-2 h-2 rounded-full bg-accent-blue/70" />
        </div>
        <span class="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">Active Engineering</span>
      </div>
    </div>

    <!-- Terminal Content Area -->
    <div class="space-y-4 pt-1">
      <!-- Command line with active typing -->
      <div class="flex items-center gap-2 text-accent-dim">
        <span class="text-zinc-600">&gt;</span>
        <span class="text-accent-dim font-semibold tracking-wide">{{ typedCommand }}</span>
        <span v-if="activeStep === 0" class="inline-block w-2 h-3.5 bg-accent-dim animate-pulse" />
      </div>

      <!-- Live Typing Output Block -->
      <div v-if="activeStep >= 1" class="space-y-2 pl-4 border-l border-accent-blue/25 text-zinc-500 text-xs min-h-12">
        <p class="text-zinc-400 font-medium leading-relaxed">
          {{ typedLine1 }}
          <span v-if="activeStep === 1" class="inline-block w-1.5 h-3 bg-zinc-400 animate-pulse ml-0.5" />
        </p>
        <p v-if="activeStep >= 2" class="text-zinc-500 leading-relaxed">
          {{ typedLine2 }}
          <span v-if="activeStep === 2" class="inline-block w-1.5 h-3 bg-zinc-500 animate-pulse ml-0.5" />
        </p>
      </div>

      <!-- Active Prompt & GitHub Button -->
      <div
        v-if="activeStep >= 3"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/30 text-xs transition-all duration-500"
      >
        <div class="flex items-center gap-2 text-zinc-500">
          <span class="text-accent-dim">&gt;</span>
          <span class="text-zinc-400 font-mono">{{ typedPrompt }}</span>
          <span class="inline-block w-2 h-4 bg-accent-dim animate-pulse ml-0.5" />
        </div>
        <a
          href="https://github.com/jshtengker"
          target="_blank"
          rel="noopener noreferrer"
          class="group/btn inline-flex items-center gap-2 text-accent-dim hover:text-accent hover:underline text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <Icon name="simple-icons:github" class="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:rotate-12" />
          <span>Follow progress on GitHub</span>
          <span class="transition-transform duration-300 group-hover/btn:translate-x-1.5">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const commandText = 'system.status --watch'
const line1Text = 'More projects and open-source backend tools are currently in active development.'
const line2Text = 'New releases, system architecture specs, and live demos will be published here as they launch.'
const promptText = 'Awaiting next deployment'

const typedCommand = ref('')
const typedLine1 = ref('')
const typedLine2 = ref('')
const typedPrompt = ref('')

const activeStep = ref(0) // 0 = command, 1 = line1, 2 = line2, 3 = prompt

onMounted(() => {
  typeString(commandText, typedCommand, 35, () => {
    activeStep.value = 1
    setTimeout(() => {
      typeString(line1Text, typedLine1, 25, () => {
        activeStep.value = 2
        setTimeout(() => {
          typeString(line2Text, typedLine2, 20, () => {
            activeStep.value = 3
            typeString(promptText, typedPrompt, 30, () => {
              // Stays active with blinking cursor prompt
            })
          })
        }, 150)
      })
    }, 150)
  })
})

function typeString(target: string, refVar: Ref<string>, speed: number, onComplete: () => void) {
  let index = 0
  const timer = setInterval(() => {
    if (index < target.length) {
      refVar.value += target.charAt(index)
      index++
    } else {
      clearInterval(timer)
      onComplete()
    }
  }, speed)
}
</script>
