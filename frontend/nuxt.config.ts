// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
export default defineNuxtConfig({
   devtools: { enabled: true },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
   css: ['~/assets/css/main.css'],
   modules: ['nuxt-primevue', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt', 'nuxt-mdi'],
   colorMode: {
      classSuffix: '',
   },
   primevue: {
      unstyled: true,
      importPT: { from: path.resolve(__dirname, './presets/wind/') }, //import and apply preset
   },
   // css: ["primevue/resources/themes/aura-light-green/theme.css"],
})
