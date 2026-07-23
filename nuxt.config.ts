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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
});
