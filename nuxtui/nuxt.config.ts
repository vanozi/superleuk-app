import path from 'path'
// Load environment variables
import dotenv from 'dotenv'
console.log(process.cwd())
dotenv.config({ path: '.env' })

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  ui: {

    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: true
  },
  vite: {
    resolve: {
      alias: {
        utils: path.resolve(__dirname, './utils'),
        stores: path.resolve(__dirname, './stores'),
        components: path.resolve(__dirname, './components'),
        pages: path.resolve(__dirname, './pages'),
        plugins: path.resolve(__dirname, './plugins'),
        mytypes: path.resolve(__dirname, './my-types'),
        assets: path.resolve(__dirname, './assets'),

      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_BASE_URL
    }
  },
})
