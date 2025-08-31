import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { ToastService, Tooltip } from 'primevue'
import { configure } from 'vee-validate'

const app = createApp(App)
app.directive('tooltip', Tooltip)
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
                order: 'app, primevue',
            },
        },
    },
} satisfies PrimeVueConfiguration)
app.use(ToastService)

configure({
    validateOnBlur: true,
    validateOnChange: false,
    validateOnInput: false,
})

app.mount('#app')
