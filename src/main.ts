import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'

import App from './App.vue'
import router from './router'
import { setupSEO } from './utils/seo'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      dark: false,
    },
  },
  ripple: true,
})

// Setup SEO meta tags and dynamic updates
setupSEO(app, router)

app.mount('#app')
