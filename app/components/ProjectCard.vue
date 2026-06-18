<template>
  <div
    @pointermove="onPointerMove" @pointerleave="onPointerLeave"
    @click="onClick"
    class="group block border border-border rounded-lg p-6 bg-surface hover:border-zinc-600 cursor-pointer"
    :style="{
      transform: cardTransform,
      transition: 'transform 0.4s ease-out, border-color 0.2s ease',
    }">
    <div class="flex items-start justify-between mb-3">
      <h3 class="font-semibold group-hover:text-accent transition-colors">
        {{ project.title }}
      </h3>
      <span class="text-xs font-mono text-zinc-600 shrink-0 ml-4">
        {{ project.year }}
      </span>
    </div>
    <p class="text-sm text-zinc-400 leading-relaxed mb-4">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-1.5">
      <span v-for="tag in project.tags" :key="tag"
        class="px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400 font-mono">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: {
    title: string;
    description: string;
    tags: string[];
    year: string;
    to: string;
  };
}>();

const emit = defineEmits(['select']);

function onClick(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  emit('select', props.project, el.getBoundingClientRect());
}

const tiltX = ref(0);
const tiltY = ref(0);

const cardTransform = computed(() =>
  `perspective(800px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`
);

function onPointerMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  tiltX.value = -(y - 0.5) * 10;
  tiltY.value = (x - 0.5) * 10;
  el.style.transitionDuration = '0.08s';
}

function onPointerLeave(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  tiltX.value = 0;
  tiltY.value = 0;
  el.style.transitionDuration = '0.4s';
}
</script>
