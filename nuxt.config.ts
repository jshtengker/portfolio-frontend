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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
});
