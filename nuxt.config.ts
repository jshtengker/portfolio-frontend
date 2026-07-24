import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/eslint'],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  devServer: {
    port: 9000,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Joshua Tengker | Backend Software Engineer',
      titleTemplate: '%s | Joshua Tengker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#09090b' },
        { name: 'author', content: 'Joshua Tengker' },
        { name: 'google-site-verification', content: 'google373c6438e429bba0' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
  },
});
