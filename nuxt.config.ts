// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@vee-validate/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**']
  },
})
