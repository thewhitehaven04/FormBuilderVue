import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
export const DARK_MODE_SELECTOR_CLASS = 'app-dark'

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: `.${DARK_MODE_SELECTOR_CLASS}`,
            cssLayer: {
                name: 'primevue',
                order: 'app, primevue'
            }
        }
    },
} satisfies PrimeVueConfiguration)

app.mount('#app')
