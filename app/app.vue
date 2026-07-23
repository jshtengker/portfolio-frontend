<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage :transition="{ name: 'fade' }" />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://jshtngkr.pages.dev/#person',
            name: 'Joshua Tengker',
            jobTitle: 'Backend Software Engineer',
            url: 'https://jshtngkr.pages.dev',
            sameAs: [
              'https://github.com/jshtengker',
            ],
            knowsAbout: [
              'Backend Engineering',
              'Distributed Systems',
              'API Design',
              'TypeScript',
              'Go',
              'Python',
              'Nuxt.js',
              'Cloudflare Pages'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://jshtngkr.pages.dev/#website',
            url: 'https://jshtngkr.pages.dev',
            name: 'Joshua Tengker | Backend Software Engineer',
            publisher: {
              '@id': 'https://jshtngkr.pages.dev/#person'
            }
          }
        ]
      })
    }
  ]
})
</script>
