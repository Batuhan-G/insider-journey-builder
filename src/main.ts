import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initSentry } from './core/monitoring/sentry'

async function prepare(): Promise<void> {
  if (import.meta.env.DEV) {
    const { worker } = await import('./core/mocks/browser')
    await worker.start({ onUnhandledRequest: 'warn' })
  }
}

prepare().then(() => {
  const app = createApp(App)

  initSentry(app)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
