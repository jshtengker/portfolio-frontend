<template>
  <div class="border border-dashed border-border/80 rounded-lg p-6 bg-surface/30 flex flex-col justify-between transition-all duration-300 hover:border-accent-dim/60 hover:bg-surface/50">
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-accent/30 bg-accent/10 text-accent">
          <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          In The Pipeline
        </span>
        <span class="text-xs font-mono text-zinc-600">Upcoming</span>
      </div>
      <h3 class="font-semibold text-zinc-200 font-sans mb-2">
        More Projects Coming Soon
      </h3>
      <p class="text-sm text-zinc-400 leading-relaxed">
        Currently architecting and building new distributed backend tools, APIs, and open-source packages. Check back soon for new releases!
      </p>
    </div>
    <div class="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
      <span class="text-xs font-mono text-zinc-500">Active engineering</span>
      <a
        href="https://github.com/jshtengker"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
      >
        <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
        Follow on GitHub &rarr;
      </a>
    </div>
  </div>
</template>
