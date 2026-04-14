// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false
  },
  build: {
    transpile: ['@prisma/client']
  },
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true }
})