import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue,
  {
    theme: {
      preset: Lara,
      options: {
        dark: false
      }
    },
    ripple: true
  }
);

app.mount('#app')
