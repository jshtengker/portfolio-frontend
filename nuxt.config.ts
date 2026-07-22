import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/eslint'],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 9000,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss() as unknown as Plugin],
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
});
